# 32-agent cogency-harden deep audit (all lanes)

NOTE: lanes 0-4 re-surfaced STALE charter-divergence findings (verified already-fixed in the convergence commits). The genuine value is the new-scope (23-28), the assay (12-22), overfit/deferred (6-11), naming (5).

## Lane 0 — cogency-aw-whole

Perfect. Now I have the complete picture. Let me synthesize the audit findings:

---

## AW/H COGENCY AUDIT — FINDINGS + FOLD/WAVE SEEDS

### SYNOPSIS

The AW/H tranche drafts are **architecturally sound** but exhibit **pervasive planning-layer divergence** between the charter (AW.md, H.md) and the realized wave files. The engineering substance (structure-tensor aurora, SDF-normal blob, iOS-spring dock, warm-cream-glass design language, convergence primitives, glass-atoms DRY-consolidation) traces cleanly to research digests and HEAD source. **The cogency verdict: ARCHITECTURE ✓ · ENGINEERING ✓ · PLANNING-INTEGRITY ✗**. Five charter-promised deliverables have no wave file, gate names are fabricated in the charter, wave numbering collides across documents, and the glass-atoms band carries three material cross-wave contradictions (W22→W24 write collision, W22 unify mechanism outside file bounds, W26 false disjointness).

---

### CRITICAL FINDINGS (22 blockers per harden-fixlist.md)

**CHARTER↔WAVE-FILE DIVERGENCE (foundational)**

- **AW.md §2 gate names fabricated** (`proof:dock-collapse-live`, `-lockstep-live`, `-spring-unify` do not exist; wave files reuse `proof:dock-animation-live` + mint `proof:dock-layering-polish`) → file:AW.md:102-104 vs wave-file ids
- **W16↔W17 swapped** (charter W16=Constellation, W17=DeckProgress; files inverted) → file:AW.md:117-118
- **Three charter file-cites broken** (`AW.W14-datatable-split-hygiene.md`, `AW.W15-styling-composable-assay.md`, `AW.W18-gate-pattern-close.md` do not exist) → file:AW.md:115-119
- **H cross-arm hinges cite phantom AW.W24** (31 occurrences; AW tops W27) → file:H.md:§0 + all H disposition rows

**FIVE MISSING CHARTER DELIVERABLES** (breaking retire-gating discipline)

1. **AW.W0 spot-verify ledger** — charter mandates DEV gate `proof:aw-w0-reground` (∃ spot-verify ledger: EXISTS+rg-count+alias-resolved per retire candidate); no PROGRESS.md, no W0 wave file → file:AW.md:25,101
2. **Orphan resolution (D-10)** — charter folds into W14; real W14 is DataTable-split only → file:AW.md:45,115
3. **Metric-cell/stack prune** — charter folds into W14; absent entirely → file:AW.md:115
4. **Styling assay** — charter W15 scope (brittle-calc→tokens, Tabs pill-track, ToggleGroup re-roll, gate `proof:styling-hygiene`); real W15 is colocation/naming-hygiene only → file:AW.md:116
5. **Close ceremony (W27 delivered, but charter W18)** — register gates, 4 READMEs (dock/aurora/blob/constellation), π-lane, FINAL.md; charter §2 row W18 says "CLOSE + READMEs (LAST)" but actual W18 is gate-pattern access-modal → file:AW.md:119,§0 D-11

**GLASS-ATOMS BAND (W22-W26) MATERIAL CONTRADICTIONS**

- **W22→W24 write collision** (W22 carves `Card.vue:77 glass-specular-track` class; W24 wires pointer seam on that exact class → W24 reads a deleted seam) — file:AW.W22:39 vs AW.W24:21,47
- **W22 dock unify mechanism outside file bounds** (charter promises `.glass-dock` composes `.glass-material` rim inheritance; `dock.css` absent from W22 File Bounds) → file:AW.W22:18,31-40 vs dock.css:52-91
- **W26 false disjointness** (`badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue` written by BOTH W25 + W26; `transition-colors`→`transition-control` vs `transition-all` semantic contradiction) — file:AW.W26:74 claims "fully disjoint" + "shares NO modify path"

**AW DOCK-BAND DEFECTS**

- **W1 root-cause falsified** (charter: "stacked-grid MAX of two layers"; source: `dock.css:589` sets inactive layer `position:absolute` out-of-flow; only active layer counted) → file:AW.md:70, AW.W1:91-95 vs src/styles/dock.css:589-592
- **W1 born-RED premise inverted** (charter: prior gate unsampled collapse path; reality: `proof-dock-animation-live.mjs:80-83` already samples `.glass-dock.collapsed` + the demo has zero `DockLayerGroup` → existing gate covers W1 path) → file:AW.W1:166-168 vs scripts/proof-dock-animation-live.mjs
- **W3 dropped slider scope** (charter D-3 + §2 task W3 with dock-with-slider `keepDockOpen`; wave file zero mention) → file:AW.md:38,104 vs AW.W3 (no grep hits)
- **W10 phantom symbol** (`useSpringOrchestrator` does not exist; real: `useSpring`) → file:AW.W10:24,103

**AW CONVERGENCE BAND DEFECTS**

- **W16 scope overreach** (charter: `.glass-progress-rail` CSS recipe; wave: full `DeckProgress.vue` component + `/deck` subpath + math helper; `/deck` squats the deck-engine namespace) → file:AW.md:158 vs AW.W16
- **W17 ≥2-consumer muster repeats AV.W8 trap** (consumer #2 = cross-repo-pending; does not count toward in-repo ≥2 per standing rule) → file:AW.W17 vs RECAP §0 P5
- **W13 goo-blob throw orphaned** (charter D-8 tasks W13 with `defaultBlobColorResolver`→`cssToOklch(var(--primary))` console-clean fix; wave zero mention) → file:AW.md:114 vs AW.W13 (no grep hits)

**H-SIDE DEFECTS** (cross-arm)

- **H §2 cites phantom `proof:*` gates** (H names `proof:xray-spine`, `-mobile`, `-deck-copy-conformance`, `-figure-dedup`; slides has zero `proof:*` scripts) → file:H.md:§2
- **H.W10 third pulse-dot undercounted** (W10 de-dups SlideXray + SlideNutrition; `Slide09.vue:147-156` carries a third `.live-tag .dot` + `@keyframes pulse-dot`) → file:H.W10 + Slide09.vue
- **H.W2 2nd-consumer ledger disagreement** (H.W2: carousel `Progress.vue` + deck bar; AW.W16: glass-ui Deck story + slides bar; carousel is latent, not live) → file:H.W2 vs AW.W16

**BORN-RED DEFECTS**

- **W12 born-GREEN no-op** (charter scope 3: collapse double-nested `light-dark(light-dark())`; reality: does not exist at HEAD; grep returns 0 trivially) → file:AW.W12:19,59
- **W23 `.glass-refract` re-home unspecified** (HEAD: `.glass-refract` bound to compound `.glass-specular-track.glass-refract`; W22 folds the left operand; W23 does not re-home the rule) → file:AW.W23:16 vs glass-specular-track.css:146

---

### BAND STRUCTURE — SPOT-VERIFY GATE COHERENCE

**AW bands (6 bands + convergence + close):**

| Band | Waves | Status | Gate coherence |
|---|---|---|---|
| A (dock) | W1-W3 | FILES ✓ | GATE NAMES ✗ (fabricated in charter); W1 premise inverted (born-RED empirically unverified); W3 gate SKIP-on-harnessless (needs MCP/dev env witness) |
| B (aurora) | W4-W8 | FILES ✓ | OPEN-ORDER ✗ (charter says W5 after W4; files say W4 after W5); W7 WGSL equivalence gate lacks explicit file path |
| C (blob) | W9-W11 | FILES ✓ | SCRIPT-PATHS ✗ (proof-scripts use non-existent `scripts/proof/` subdir; should be flat `scripts/proof-blob-*.mjs`) |
| D (components) | W12-W15 | FILES ✓ | W12 born-GREEN no-op; W13 orphaned goo-blob fix; W15 scope split (colocation/naming-only in file vs charter's styling+brittle+ToggleGroup) |
| E (convergence) | W16-W20 | FILES ✗ (FIVE MISSING) | W16 scope overreach; W17 ≥2-consumer muster repeats AV.W8 trap; W18 charter scope moved to W19 (close ceremony missing from W18 file); orphan-prune + styling-assay have no wave files |
| F (glass-atoms) | W22-W26 | FILES ✓ | W22 unify outside bounds + Card carve collision; W26 false disjointness + digest off-by-one; W27 gate-attribution off-by-one |

**Dependency DAG (open-order) — VIOLATIONS:**

- Charter says "W5 opens after W4"; files say W5 opens before W4 (W4 consumes W5's OKLCh jitter seam) → file:AW.md:106 vs AW.W4:1, AW.W5:1
- Charter says "W4 opens after W5" correctly; but the disposition legend is inverted (§2 row 4 cites aurora "§0" → non-existent) → file:AW.md:39

**§0 D-row→wave map — GAPS:**

| # | Directive | Charter wave | Reality | Status |
|---|---|---|---|---|
| D-1 | Dock simple-collapse | W1 | W1 exists | ✓ (gate names fabricated, premise inverted) |
| D-2 | Dock lockstep | W2 | W2 exists | ✓ (gate names fabricated) |
| D-3 | Dock springiness + slider | W3 | W3 exists + `keepDockOpen` orphaned | ✗ |
| D-4 | Aurora painterly | W4 | W4 exists | ✓ (file scope differs; LIC dropped silently) |
| D-5 | Aurora OKLCh + derive | W5 | W5 exists | ✓ |
| D-6 | Aurora options + WebGPU + interactivity | W6+W7+W8 | W6/W7/W8 exist (W6=additive, not prune) | ✓ (charter scope misnamed as prune) |
| D-7 | Blob visual + interaction + mood | W9-W11 | W9/W10/W11 exist | ✓ (W10 phantom symbol, W11 color.ts write conflict) |
| D-8 | Glass-panels + toggles + DataTable | W12-W15 | W12/W13/W14/W15 exist (W13 goo-blob orphaned, W15 scope split) | ✗ |
| D-9 | DeckProgress + Constellation | W16+W17 | Swapped (W16=Deck, W17=Const); swapped in charter | ✗ (consumer gate matters, W17 ≥2 muster unmet) |
| D-10 | Orphan resolution | W19 | No charter §0 row; W0 spot-verify prerequisite missing | ✗ BLOCKER |
| D-11 | READMEs | W27 | No charter row for W27; close ceremony promised W18 but W18 is gate-pattern | ✗ BLOCKER |

**Gate registry completeness — HOLES:**

- `proof:aw-w0-reground` — promised W0 (no file)
- `proof:orphan-resolved` + `proof:no-god-module` — promised W19 (gate mismatch: real is W14)
- `proof:styling-hygiene` — promised W15 (real W15: colocation only)
- `proof:aw-final` — promised W18 (W18 is gate-pattern; belongs in close W27)
- Five `proof-blob-*.mjs` scripts — promised but path wrong (`scripts/proof/blob-*.mjs` non-existent)

---

### DESIGN-LANGUAGE COGENCY ✓ (verified)

The three-axis spine (warm-cream glass `hsl(48 12% 98%)`, iOS-26 Liquid Glass rim/specular, consumer-layered NCSU-red) is **coherent and traces cleanly** across all waves:

- **Dock (W1-W3)**: spring physics + rim grammar apply
- **Aurora (W4-W8)**: OKLCh palette + derive-color + jitter complete the color core; painterly mediums use shared `procedural-color.glsl.ts` (no fork)
- **Blob (W9-W11)**: SDF-normal specular + Fresnel rim + OKLCh iridescence reuse shared chunks
- **Components (W12-W15)**: glass-panel tier collapse, affordance lifts (8%α border, cream legibility), DataTable split (colocation)
- **Convergence (W16-W17)**: `DeckProgress` composes `<Progress>`, `Constellation` consumes `useCanvas2D` + `prng`
- **Glass-atoms (W22-W26)**: `.glass-material` mixin routes every floating surface onto rim/specular grammar; `--card-spacing`, `--radius-field`, `--text-shadow-*` tokens DRY-consolidate; `<ToggleGroup>` replaces raw buttons

**H arm clean**: slides consumes 3.4.0 published surface, reads glass-ui as npm artifact (never branch), writes only `src/`+`docs/tranches/H/`.

---

### FOLD/WAVE SEEDS — EXECUTION ROADMAP

**MUST-FIX BEFORE DISPATCH (integrity blockers):**

1. **AW.W0 — AUTHOR** (gates `proof:aw-w0-reground`; create PROGRESS.md + spot-verify ledger: EXISTS + rg-count + alias-resolved for every retire candidate) — prerequisite for W19/W20
2. **Charter↔wave reconciliation** (rewrite AW.md §0/§2/§3/§4; correct gate names to file-ids; swap W16↔W17 numbering; strike non-existent file-cites; add §0 rows for missing deliverables)
3. **Glass-atoms band resolution** (W22: add `dock.css` to bounds OR drop dock from band matrix; carve only Button+DockIconButton, NOT Card; W26: drop false "fully disjoint" claim; B5 fix token conflict; W27: correct gate attribution)
4. **AW.W1 root-cause re-diagnosis** (run `proof:dock-animation-live` against 3.3.0 build; empirically verify born-RED premise)
5. **Orphan-resolution wave (AW.W19)** — EXPAND from charter fold (surface metric-cell/stack hidden dep born-RED gate; resolve each candidate per W0 ledger verdict)
6. **Styling-assay wave (AW.W20)** — CLARIFY scope (tokenize brittle calc/magic-numbers; Tabs pill-track; ToggleGroup re-roll; `use-token-color` doc; born-RED gate `proof:styling-hygiene`)
7. **Close ceremony (AW.W27)** — RENAME from W18 (gate-fleet registration; 4 READMEs: dock, aurora, blob, constellation; π-lane ≥3 viewports + AA contrast + per-story consumption; overfitting audit; FINAL.md + green run-id per wave)
8. **H cross-repo hinges** (rewrite all 31 `AW.W24` → correct wave: W16/W17/W18; drop phantom `proof:*` gates; reconcile 2nd-consumer ledgers)

**FOLD/ADD DECISIONS (per RECAP/digest precedent):**

| Directive | Current state | Fold into | OR Add new wave |
|---|---|---|---|
| **W3 dock-with-slider `keepDockOpen`** | Orphaned (charter §0 D-3 + §2 row; file zero mention) | W3 scope + gate → "the in-dock slider drag holds dock open" | — |
| **W13 goo-blob `cssToOklch(var())` throw** | Orphaned (charter D-8; file zero mention) | W13 scope + console-clean gate → "render without per-frame throw" | — OR blob band |
| **W15 styling-assay scope split** | Charter splits (colocation + styling both named W15); file only colocation | Clarify W15 = colocation/naming-hygiene ONLY | New **AW.W-21** = styling-assay (tokenize, Tabs, ToggleGroup, gate `proof:styling-hygiene`) |
| **W18 gate-pattern vs close ceremony** | Charter W18 = close (READMEs + gates + π lane); file W18 = access-modal gate-pattern | Rename W18 file to `AW.W-gate-pattern` (add §0 row) | New **AW.W-27** = close ceremony (must follow glass-atoms band) |
| **W21 retirement** | Charter: "W21 retired in renumber"; no file | Confirm: skip W21 numbering (W20→W22) | — |
| **W/H drawer-live-behind audit** | RECAP §1 :28 ("wtf" composition); charter zero mention; wave zero mention | Add AW.md §0 disposition row → fold into W20 OR W12 | — (minor, may close as no-defect) |

**RENUMBER-READY WAVES** (if new W-21 is added):

- Current: W0-W20, skip W21, W22-W27 (27 files, W21 retired)
- Proposed: W0-W20, **NEW W21** (styling-assay), **NEW W22** (close ceremony, formerly W27), **W23-W27** shifted up by 1
- Rationale: W27 close MUST open after glass-atoms band; glass-atoms are W22-W26 (post-component W12-W20 band); styling-assay (W21) logically precedes glass-atoms

---

### SUMMARY TABLE — FINDINGS + REMEDIATION

| Finding | File | Line(s) | Severity | Remediation |
|---|---|---|---|---|
| Charter gate-names fabricated | AW.md | 102-104 | BLOCKER | Rewrite to wave-file ids (`proof:dock-animation-live`, `-layering-polish`, etc.) |
| W16↔W17 swapped | AW.md | 117-118 | BLOCKER | Renumber; correct §3 + §4 cross-references |
| Three broken file-cites | AW.md | 115-119 | BLOCKER | Correct paths (W14-datatable, W15-hygiene, W18-gate-pattern) |
| H hinges cite phantom AW.W24 | H.md | all §0 + wave rows | BLOCKER | Rewrite to W16/W17/W18 |
| W0 spot-verify ledger missing | AW.md | 25, 101 | BLOCKER | Author W0 wave file + PROGRESS.md + ledger (EXISTS + rg-count + alias-resolved) |
| Orphan-resolution scope orphaned | AW.md | 45, 115 | BLOCKER | Author W19 wave file OR expand W14 (surface metric hidden dep; resolve per W0 ledger) |
| Styling-assay scope orphaned | AW.md | 116 | BLOCKER | Clarify W15 scope + author W20 wave file OR new W21 (tokenize, Tabs, ToggleGroup, gate) |
| Close ceremony missing from W18 | AW.md | 119 | BLOCKER | Author W27 wave file (gate-fleet, 4 READMEs, π-lane, FINAL); move W18 to gate-pattern |
| W1 root-cause falsified | AW.W1 | 91-95, 166-168 | BLOCKER | Re-diagnose; run `proof:dock-animation-live` on 3.3.0; verify born-RED witness |
| W3 slider scope orphaned | AW.W3 + AW.md | 38, 104 | BLOCKER | Restore W3 scope + gate (in-dock slider; keepDockOpen interaction) |
| W22 dock unify outside bounds | AW.W22 | 18, 31-40 | BLOCKER | Add `dock.css` to bounds OR drop dock from band matrix; resolve specular ownership |
| W22↔W24 Card carve collision | AW.W22 + AW.W24 | 39 vs 21, 47 | BLOCKER | Drop Card from W22 carve; W22 Button/DockIconButton only; W24 adds pointer-write seam |
| W26 false disjointness | AW.W26 | 6, 74 | BLOCKER | Remove false claims; decide `badge`/`toggle` `transition-control` owner (recommend W25); sequence Toast.vue |
| W27 gate-attribution off-by-one | AW.W27 | 17, 66, 79 | BLOCKER | Correct attributions to wave-file ids (W22 unified, W23 sota, W24 cards, W25 affordance, W26 idiom) |
| W13 goo-blob throw orphaned | AW.md, AW.W13 | 114 | REFINE | Add resolver fix + console-clean gate to W13 (or blob band) |
| W10 phantom `useSpringOrchestrator` | AW.W10 | 24, 103 | REFINE | Replace with `useSpring` |
| W16 scope overreach | AW.W16 + AW.md | 158 | REFINE | Demote to `.glass-progress-rail` CSS recipe OR escalate to triumvirate; drop `/deck` subpath |
| W17 ≥2-consumer muster unmet | AW.W17 | (cross-check H.W4) | REFINE | Land H.W4 landing first (2nd-consumer evidence); gate AW.W17 on H.W4 landing BEFORE ship |
| W12 born-GREEN no-op | AW.W12 | 19, 59 | REFINE | Strike double-nested `light-dark()` scope (does not exist at HEAD) |
| W23 `.glass-refract` re-home | AW.W23 | 16 | REFINE | Specify compound re-home (`.glass-specular-track.glass-refract` → `.glass-material.glass-refract`) |
| H.W10 third pulse-dot | H.W10 + Slide09 | (lines TBD) | REFINE | Add Slide09 to de-dup scope + File Bounds OR scope grep to named files |

---

**COGENCY VERDICT:**

✓ **ARCHITECTURE**: The six bands + convergence + close structure is sound; precepts (no-legacy, gestalt, KISS, DRY, ≥2-consumer, design-language cogency, gated-Baseline, spot-verify-gate binding) are in force and coherent.

✓ **ENGINEERING**: Structure-tensor aurora, SDF-normal blob, iOS-spring dock, warm-cream-glass spine, procedural-color shared chunks, DRY-consolidation glass-atoms, H pure-consumer — all verified against source and digests.

✗ **PLANNING-INTEGRITY**: 22 blockers (charter↔file divergence, five missing deliverables, glass-atoms cross-wave contradictions, dock-band falsified premise, gate-attribution off-by-one, H cross-repo hinges broken, born-RED discipline gaps). **NOT CONVERGED; authoring the five missing waves + reconciling charters to realized file set is the prerequisite for lock-in.**

**RECOMMENDED GATE BEFORE CLOSE**: The W0 spot-verify ledger + the revised AW.md/H.md charters + author-and-file all five missing waves. Then run a final integrity audit (< 6 hours for a clean eye) to catch any residual file-bounds races or gate-attribution errors. This is NOT implementation drift — it is the planning layer catching up to the engineering reality.

---

## Lane 1 — inter-wave-visual

Based on my comprehensive audit of the AW/H tranches—reading the charter, RECAP, H.md, audit digests, and 27 wave specs—I can now synthesize the inter-wave coherence findings.

## FINDINGS: AW/H TRANCHE INTER-WAVE VISUAL COHERENCE AUDIT

### BANDS & COHERENCE SUMMARY

Three visual bands are defined: **dock (W1–W3, Band A)**, **aurora/blob (W4–W11, Bands B+C)**, and **glass-atoms (W22–W26, Band F)**. Intra-band waves sequence tightly with named dependencies. Analysis follows the lane "inter-wave-visual":

---

### BAND A (DOCK — W1–W3): COHERENCE + OWNERSHIP

**Dependency chain:** W1 → W2 → W3 (strict sequence).

**File ownership (single-writer guarantee):**
- `src/components/custom/dock/composables/useLayerTransition.ts` — W1 measures → W2 opacity/driver seat → W3 VT/stagger (three writes, sequential only)
- `src/styles/dock.css` — W1 does NOT touch (line 96 explicit: "Do NOT touch… the lockstep/opacity contract is AW.W2's surface"); W2 owns the opacity/CSS atom; W3 owns the rail/wrap choreography
- `demo/stories/navigation/dock.vue` — W1 adds start-collapsed showcase, W3.b adds wrap/hover showcase (sequential, no parallel write)

**Coherence verdict:** ✓ CLEAN. No overlap, no gap. W1 restores width morph (measurement), W2 unifies opacity onto same clock (driver), W3 orchestrates the rail + wrap on the unified motion. All three touch the same files but in dependency order (no parallel contention). The three dock waves form a coherent "one spring, one timeline, full orchestration" arc (AW.md §1).

**Finding 1 — Dock spring token retuning (W2):** Wave W2 must synchronize TWO edits per `useLayerTransition.ts:19` comment:
- Modify `DOCK_SPRING = {response, ζ}` (the JS const)
- Update `scripts/regen-spring-tokens.mjs` presets row (the 48-stop token regeneration)

**AW.md §1 lane "ios-spring-physics" names this.** W2 owns BOTH edits (the "dual-write contract"). If W2 ships only the JS const without the token regen, the opacity CSS `linear()` at `tokens.css:163` diverges — the clock drifts mid-flight (non-bit-identical ODE vs sampled-easing). **Seeded in final audit: ensure the W2 spec cites both touches** (`useLayerTransition.ts:19` + `regen-spring-tokens.mjs:57-58`). ✓ Already correct in AW.W2 spec (line 126 names "re-seat opacity from its live value"). No fix needed.

**Finding 2 — Dock W3.b wrap reflow:** The spec names "multi-row wrap morph" but the scope item (Scope §2, "Graceful wrap") defers to W3 the choice between (a) height-spring morph and (b) PRM-gated snap fallback. No contradiction; the dependency is W2 first (the unified motion timeline must exist before wrap orchestrates onto it). ✓ COHERENT.

---

### BAND B+C (AURORA/BLOB — W4–W11): COHERENCE + SHARED SHADER OWNERSHIP

**Aurora sub-band (W4–W8):** W5 (color core) opens FIRST (independent), W4 (painterly) opens after W5, W6–W8 follow W4/W5.

**Blob sub-band (W9–W11):** W9 (droplet surface) opens at tranche open, W10 (interaction) may parallel W9 (file-disjoint), W11 (mood) opens after W9+W10.

**Shared file:** `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — the OKLCh/FBM/matrix chunk.

| Access | Wave | Detail |
|--------|------|--------|
| **W5** | Read + **splice OKLCh matrices** | `OKLCH_MATRICES_GLSL` spliced into the TS source; the W5 file-bounds table cites it explicitly as "modify" (line 51) |
| **W4** | Read + consume W5's OKLCh jitter seam | Per-stroke broken-color on the van-Gogh medium (W4.3) consumes W5's `brokenColorJitter` in OKLCh space |
| **W9** | Read + consume for Fresnel/SSS terms | The blob iridescence + SSS in `metaball.frag.ts` read the OKLCh/OETF matrices; the shared chunk is READ-ONLY on W9 (line 73 "Do NOT touch: … procedural-color.glsl.ts") |
| **W11** | Read + **consume shared `ColorHarmony`** | The blob mood consumes the glass-ui `ColorHarmony` from the shared chunk (W11 scope 4, "no forked `deriveHue`") |

**Coherence verdict:** ✓ CLEAN. W5 splices and authors the chunk ONCE. W4/W9/W11 read it (no re-writes). W5 explicitly files the `modify` bound (AW.W5-aurora-color-derive.md §4, line 51). W4 names W5 as a dependency (AW.W4 line 8: "Opens after: AW.W5"). W9 and W11 correctly tag it READ-ONLY.

**Finding 3 — Aurora W4/W5 numbering inversion:** The charter §2 wave table lists W4 before W5, but BOTH wave specs carry a **numbering note** (AW.W4 line 3–4, AW.W5 line 5–7) saying W5 opens BEFORE W4 because W4 consumes W5's color seam. The charter text (§1, line 79) correctly names "W5 opens FIRST in the band." **The table's row order does NOT match execution order.** This is intentional per AW.md (the charter and the wave specs are documents of record; the per-wave specs carry the execution ordering; the table is a scanning reference).

Implication: **The close/orchestrator MUST read the wave specs' "Opens after" clauses, not the table row order, to sequence the aurora band.** No fix needed — the specs are correct. ✓ Coherent by intent.

**Finding 4 — Blob W9/W10 parallelism:** W10 spec (line 5) says "Opens after: AW tranche open (blob arm; parallel-eligible with AW.W9 — disjoint file bounds)." The file-bounds tables confirm: W9 touches blob shaders, W10 owns `useBlobInteraction.ts`/pointer state. **They CAN run in parallel.** However, W10 spec line 7 also says "Blocks: AW.W11 (Blob Mood) consumes the spring + pointer/idle state from W10." This is correct — W11 MUST read W10's pointer/idle state in the mood model. ✓ Coherent.

---

### BAND D (COMPONENTS — W12–W15): COHERENCE + SHARED FILE BOUNDS

| Wave | File | Ownership |
|------|------|-----------|
| **W12** | `src/components/custom/glass-panel/GlassPanel.vue` + `src/styles/tokens.css` (backdrop tokens) | Owns the glass-panel tier collapse; opens at tranche open |
| **W13** | `src/styles/tokens.css` (affordance tokens: border alpha, gold-audacious text) + `src/components/custom/goo-blob/` (colorResolver story) | Owns the 8%-α border, the CTA-text contrast lifts |
| **W14** | `src/components/custom/data-table/` (the split) | Owns the DataTable colocation |
| **W15** | `src/styles/utilities.css` + multiple composable public returns | Owns the composable naming/injection audit; `twin-line-divider` utility |

**Shared `tokens.css` write:** W12 edits backdrop tokens (e.g., `--glass-bg-*`), W13 edits affordance tokens (e.g., `--input-border-alpha`). **Different token subsets, sequential opening.**

**Coherence verdict:** ✓ CLEAN. No two waves write the identical token; W12 and W13 open "at tranche open" (independent of each other, per spec lines 13, 14). The glass-panel (W12) provides backdrop staging for the affordance proof (W13 proof:affordance-contrast requires the backdrop). W14 and W15 are fully disjoint from W12/W13 and from each other. ✓ No overlap.

**Finding 5 — W13 goo-blob color story:** W13 spec (Scope 3, line 46-47) cites the `defaultBlobColorResolver` story throw (a CSS-var-to-value.js bug in the goo-blob story, not the component itself). This is a DEMO BUG, not a W13-owned component edit. The spec correctly names it as a story fix, not a blob-component inversion. ✓ Correctly scoped.

---

### BAND E (CONVERGENCE — W16–W17): COHERENCE + THE 2ND-CONSUMER GATE

| Wave | Scope | Dependency |
|------|-------|----------|
| **W16** | `DeckProgress` composition over existing `Progress.vue` | Independent of dock/aurora/blob; opens at tranche open |
| **W17** | `Constellation` + `useCanvas2D` substrate | Gated on H.W4 (constellation RAF-swap adoption = 2nd consumer) |

**Coherence verdict:** ✓ CLEAN. W16 is file-disjoint (new file: `src/components/custom/deckprogress/`, composes existing Progress). W17 is new (creates `useCanvas2D.ts`, `Constellation.vue`). Both cite their 2nd consumer explicitly (AW.md §4 table, rows 3–4). The H (slides) tranche provides the 2nd consumers (H.W1 consumes DeckProgress, H.W4/W10 consume Constellation). This is the inter-tranche dependency recorded in the cross-repo shape (AW.md §4).

**Finding 6 — W17 color harmony fork:** W11 spec (Scope 4) names "the blob consumes the shared `ColorHarmony`, no forked `deriveHue`." AW.W17 (Constellation) does NOT mention a color fork — it adopts the glass-ui `prng`/`useRAFLoop` (line 3 "consumes glass-ui's `prng`"). **The Constellation VISUAL color (the red anomaly) is a consumer-side overlay (H.W10 draws it).** The engine mechanism owns the palette-read on dark-flip (per AW.md §4 table), not the red-specific palette. ✓ No fork conflict.

---

### BAND F (GLASS-ATOMS — W22–W26): COHERENCE + SERIAL DEPENDENCY CHAIN

**Sequence: W22 → W23 → W24 → W25 → W26 (strict order, four shared file touches).**

| Wave | File | Access | Blocks |
|------|------|--------|--------|
| **W22** (material unify) | `src/styles/glass.css` + `.glass-material` mixin | create (new mixin) | W23 (the mixin is the spine) |
| **W23** (SOTA folds) | `src/styles/glass.css` + `src/styles/theme.css` | modify (`#glass-refract`, `corner-shape:squircle`, chromatic dispersion) | W24 (the backdrop is staged) |
| **W24** (cards) | `src/components/custom/card/` + `src/styles/glass.css` | modify (card surface ride the material) | nothing |
| **W25** (primitives) | `ui/` primitives + `src/styles/` | modify (.tap-squish, `.focus-ring`, tone parity) + shared `toast/Toast.vue` | W26 (three shared files) |
| **W26** (idiom) | `src/styles/`, `ui/` roots, `toast/Toast.vue` (parallel-eligible after W25) | modify (`data-slot`, CVA modernization) | W27 (close) |

**Shared file contention:**

- `src/styles/glass.css` — W22 creates `.glass-material` → W23 extends (refract/squircle/dispersion) → W24 references (card surface rides it) → W25 references (press-spring). **Four reads, one create, two extends; sequential.**
- `toast/Toast.vue` — W25 lands `.glass-floating` tier + tone parity → W26 refactors to `useForwardPropsEmits` + modernizes CVA. **Sequential.**

**Coherence verdict:** ✓ CLEAN. The specs name every dependency. W22 is the spine (new mixin). W23 stacks on it. W24 and W25 both read the glass-material but touch disjoint atoms (Card vs Checkbox/Switch/Button). W26 is parallel-eligible AFTER W25's tone parity but BEFORE W27 because it shares Toast with W25.

**Finding 7 — W25 vs W26 toast parallelism:** The specs (W25 line 7; W26 line 3) say W26 "SHARES three modify paths with W25: `badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue` … runs strictly SERIAL." This is EXPLICIT in the wave docs. ✓ Correct.

**Finding 8 — W26 CVA modernization:** W26 spec (Scope 6, line 121-124) names "Button/Badge/Toggle CVA base modernization… icon-sizing, gap, `has-[>svg]` padding) verified against the `cn()` bucket table." This is a **DRY refactor of existing CVA definitions**, not a new component. The proof reads the `cn()` logic and asserts no false-merge (a color/size override that silently no-ops). ✓ Coherent within the idiom band.

---

### INTER-BAND SEAMS (VISUAL LOAD-BEARING OVERLAPS)

**1. Dock W3 + Glass-atoms W22:** Both touch dock styling. W3 spec (line 6 §4a) says "Do NOT touch… tokens.css (the spring retune is AW.W2)." Glass-atoms W22 owns `.glass-material` specular/rim in `glass.css`, not dock-specific. **Disjoint scopes.** ✓

**2. Aurora/Blob W4–W11 + Glass-atoms W22–W26:** Procedural-color is aurora/blob owned; glass-atoms touch the glass-panel/card/primitives material, not the procedural shaders. **Disjoint.** ✓

**3. Component W12–W15 + Glass-atoms W22–W26:** W12 (glass-panel) precedes W22 (material unify). W22 then "unifies" the glass-panel + card + primitive materials onto ONE spine. **W12 establishes the tier collapse; W22 establishes the spine.** The W27 close (line 2, `proof:glass-panel-tiers`) verifies the visual distinction persists after W22/W23 consolidate. ✓ **Dependent, not parallel.**

---

### THE π VISUAL-RUNTIME LANE (BINDING COVERAGE)

AW.md §6 (inv precept, line 295–299) names the π lane requirement: "≥3 viewports, ≥5 animation frames per state-toggle, WCAG-AA contrast-vs-background, per-story consumption sweep." The lane runs AFTER visual-change waves (W1–W3 dock, W4–W11 aurora/blob, W12–W13 component, W16–W17 convergence, W22–W26 glass-atoms).

**Each visual wave cites the π gate in its Hard Gate section.** Example:
- W1: `proof:dock-animation-live` (behavioral Playwright gate, rAF-sample the start-collapsed dock)
- W4: four `proof:aurora-*` gates (snapshot-bless the painterly mediums)
- W9: three blob gates (`proof:blob-smin-normalized` etc., the lit droplet)
- W22: `proof:glass-material-unified` (the specular + rim resolve on the mounted matrix)

**Coherence verdict on π lane:** ✓ **BINDING.** Every visual wave has a render-matrix or behavioral gate. The gates are registered in `scripts/gates.mjs` at the W27 close. No visual wave ships without proof. The π lane is per-wave, not cross-band.

---

### SUMMARY OF FINDINGS + FOLD/WAVE SEEDS

**Coherence verdict: ✓ SOUND.** The three main visual bands (dock, aurora/blob, glass-atoms) form clean dependency chains with NO overlapping file ownership, NO gaps, and CLEAR entry/exit gates per wave.

**The nine findings above require NO remediation:** they are either already correctly scoped in the wave specs or are intentional inversions (like W4/W5 numbering not matching execution order — the docs are explicit about it).

---

### FOLD/WAVE-SEED LIST

**No new waves needed.** The 27-wave structure (W0–W27, with W21 retired) is COHERENT. Each wave owns its file bounds, sequences after its dependencies, and publishes its hard gate.

**Recommendations (non-blocking; for future tranches):**

1. **The dock spring token sync (already correct):** W2 spec already cites both `DOCK_SPRING` + `regen-spring-tokens.mjs`. No change.

2. **π lane documentation:** Record the gate registry in `FINAL.md` so the close certifies WHICH gates ran per wave and links to the CI run ids. (Already required by AW.md §6 close precept; the FINAL.md format is the proof.)

3. **Inter-tranche H dependency:** The H.W1 dock-consume gate depends on AW.W1 fix. The H.md §1 correctly notes "Gated on 3.4.0 publish." ✓ Correct.

4. **Aurora color-core sequencing:** Add a brief note to the AW charter noting that **the wave-file table row order is NOT execution order** — the per-wave specs' "Opens after" clauses are canonical. (Useful for future orchestrators.)

**No fold candidates: each wave is load-bearing and file-distinct within its band.**

---

**FINAL REPORT: AW/H tranches COHERE cleanly across three visual bands with ZERO overlap and clear dependency chains. The 27-wave structure (minus W21 retired) is SOUND. All seams are documented. No new waves required. The π visual-runtime lane is BINDING and per-wave. Ready for synthesis dispatch.**

---

## Lane 2 — inter-wave-structural

Excellent. Now I have the full context. Let me compile the comprehensive audit findings:

---

## AW/H COGENCY-HARDEN AUDIT — FINDINGS + FOLD/WAVE-SEED LIST

**Audit scope**: Read /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md + RECAP.md + the 3 addenda (ADDENDUM 2-3, the two hardening rounds) + /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/avg-deep-audit-digest.md + final-harden-fixlist.md + harden-partial.md + glass-atoms-digest + all research digests. Read /Users/mkbabb/Programming/slides/docs/tranches/H/H.md. Verified all AW waves W0-W27 + H waves W1-W10 against live file paths at /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/ and /Users/mkbabb/Programming/slides/docs/tranches/H/waves/.

**Scope of the audit**: inter-wave coherence of the AW glass-atoms band (W22-W26) against the committed component band (W12/W13/W18/W20) + cross-repo H consumer + the DRY/≥2-consumer rule + the precepts (no-legacy, gestalt, KISS, DRY, design-cogency).

---

## FINDINGS — 5 BLOCKERS, 9 REFINES + H-CONVERGED

### BLOCKER FIXES — WAVE-INTERNAL (glass-atoms band W22-W26)

**B1 — W22.file:line:39 + W24.file:line:21 (specular-seam ownership collision)**
- **Finding**: W22 §4 File Bounds (line 39) carves `glass-specular-track` class string OUT of `Card.vue:77`; W24 §3 (line 21) wires the dormant pointer seam *on that exact class* after W22 deletes it. The proximate cause is W22:39 saying the pointer seam is "owned by **W23** card work" — but W23 is `glass-material-sota` (refraction/squircle/tint, NO card work); the card wave is **W24**. 
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W22-glass-material-unify.md:39 + AW.W24-glass-cards.md:21,47
- **Fix**: (a) W22:39 — change "owned by W23 card work" → "owned by W24 card work"; (b) W22 must NOT carve Card `glass-specular-track` string — drop `Card.vue` from W22's §3.4, File Bounds, and gate-4 carve. W22 retires only Button + DockIconButton opt-ins. The Card class stays until W24 owns the Card material holistically.

**B2 — W22.file:line:18,35 + dock.css:52-91 (dock-rim-inheritance impossible within file bounds)**
- **Finding**: W22 §3.3 asserts "The dock tier's rim becomes a `.glass-material` inheritance," and §2a assumes dock "composes whichever ladder rung they already carry." FALSE: `dock.css:52-91` shows `.glass-dock` hand-rolls its own `background: var(--glass-bg-dock)`, `backdrop-filter: var(--dock-surface-blur)`, border, and `box-shadow` as a PARALLEL SIXTH SURFACE with its own `--glass-*-dock` token family. For dock to inherit `.glass-material`, it must either (a) add `.glass-material` to `.glass-dock` selectors, OR (b) W22 edits `dock.css` — but `dock.css` is **absent from W22's File Bounds table** (§4:31-40). W22's gate 2/3 mount the dock in the band matrix; the gate cannot pass without write access W22 doesn't declare.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W22-glass-material-unify.md:18,35,31-40 + /Users/mkbabb/Programming/glass-ui/src/styles/dock.css:52-91
- **Fix**: EITHER add `src/styles/dock.css` to W22 File Bounds as `modify-carve` (compose `.glass-material` onto `.glass-dock`, retire its local rim at dock.css:90), OR drop the dock from the band-uniformity matrix (gates 2/3) and acknowledge the dock keeps its parallel surface.

**B3 — W22.file:line:28,352 + dock.css (dock `::before` pseudo-collision with instrument-strip engraving)**
- **Finding**: W22 §3a (line 28) names triumvirate trigger for rung `::after`/content-`::before` collision, but misses the live `.glass-dock.variant-instrument-strip::before` (the engraved-bezel inner stroke at dock.css:352). If the dock is brought under `.glass-material` (B2 path a), the mixin's specular `::before` collides head-on with the existing instrument-strip `::before` on the same element — not a triumvirate-recoverable diagnostic. DockIconButton avoids this by carrying the specular on the button, not the shell.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W22-glass-material-unify.md:28 + /Users/mkbabb/Programming/glass-ui/src/styles/dock.css:352
- **Fix**: W22 must decide the dock specular lives on `.dock-icon-button` (the control, as today), NOT `.glass-dock` (the shell). Gate 2's "dock" matrix target must mount `dock-icon-button`, not the dock shell. (If B2 path b — drop the dock — this resolves itself.)

**B4 — W27.file:line:17,66,79 (glass-atoms gate→wave attribution off-by-one in close manifest)**
- **Finding**: W27 close registration (§3) maps gates → waves with the wrong wave numbers. Lines 17/66/79 register `proof:glass-material-unified + -sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. Realized wave-file ids are: **W22**=`proof:glass-material-unified`, **W23**=`proof:glass-material-sota`, **W24**=`proof:glass-card-tiers`, **W25**=`proof:primitive-affordance`. W27 collapses W22+W23's gates onto W22, slides card-tiers to W23, folds W24/W25. Since the close contract is "a green run-id PER WAVE" (inv-27), the FINAL.md D-row→wave→gate crosswalk is built on a wrong map.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W27-close.md:17,66,79
- **Fix**: Correct attributions to `unified(W22) / sota(W23) / card-tiers(W24) / primitive-affordance(W25) / reka-binding-idiom(W26)`.

**B5 — W26.file:line:6,47,48,43,74 (false disjointness conceals real same-file/same-token write conflict with W25)**
- **Finding**: W26 line 6 ("fully disjoint file bounds from W22-W25") and line 74 ("shares NO modify path with W25") are contradicted by both File Bounds tables. Three files collide with W25, one with contradictory target values:
  - `badge/index.ts` — W25:60 sets `transition-colors`→`transition-control`; W26:47 sets `transition-colors`→`transition-all`. **Same token, mutually-exclusive target values**.
  - `toggle/index.ts` — W25:59 vs W26:48, same base CVA string.
  - `toast/Toast.vue` — W25:61 vs W26:43. W25's own §3a:37 flags this collision; W26 denies it.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W26-reka-shadcn-tailwind-idiom.md:6,47,48,43,74
- **Fix**: (a) Delete false "fully disjoint"/"shares NO modify path" assertions; (b) Decide one owner of badge/toggle `transition-colors` — recommend **W25 owns** (it owns the transition-discipline sweep), so W26 drops badge `transition-colors`→`transition-all`, adds ONLY icon-sizing/gap composing onto W25's `transition-control`; (c) Sequence Toast.vue explicitly (W26.a after W25's material carve); (d) Re-label W26:74's wave-number map to the realized roles.

### REFINE FIXES — WAVE-SCOPED (W12, W23, W24, W26)

**R1 — W12.file:line:19,59 (born-GREEN no-op gate; strike it)**
- **Finding**: W12 scope item 3 + Hard Gate condition 3 demand collapsing a double-nested `light-dark(light-dark())`. **Verified: that construct does NOT exist at HEAD** — the grep returns 0 trivially. This is born-GREEN, violating born-RED discipline. W24:104 explicitly struck this three times; the digest struck it. W12's other four conditions (svg-filter per-rung collapse) are real and born-RED.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W12-glass-panel-fix.md:19,59
- **Fix**: Strike W12 scope item 3 + Hard Gate condition 3 + the §4 `tokens.css` modify-carve line if it exists only for this.

**R2 — W23.file:line:16,146 (`.glass-refract` re-home off W22-folded compound + filter-id source reconcile)**
- **Finding**: At HEAD `glass-specular-track.css:146` binds `.glass-refract` to compound `.glass-specular-track.glass-refract`. W22 folds `glass-specular-track` → `.glass-material`, so the compound's left operand goes stale and the refraction rule stops matching. W23 §3.1 treats `.glass-refract` as standalone but doesn't name the re-home. Also HEAD generates `glass-refract-${counter}` ids at runtime in `useGlassRenderer.ts:146`; W23 ships a *static* `#glass-refract` node — two filter-id sources.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W23-glass-material-sota.md:16 + /Users/mkbabb/Programming/glass-ui/src/styles/glass-specular-track.css:146
- **Fix**: (a) W23 must re-home `.glass-specular-track.glass-refract` → `.glass-material.glass-refract` (or standalone `.glass-refract`), and gate must probe the *consuming selector* resolves; (b) Reconcile static asset against runtime generator (one source).

**R3 — W23.file:line:18,59 (strike inconsistent `@supports`-gating on chromatic fringe)**
- **Finding**: W23 State (line 8) gates fringe on `prefers-reduced-transparency`; §3.3 says "`@supports`-feasible AND dropped under reduce." No specific `@supports` feature needed; `color-mix(in oklab)` + gradient ring are both Baseline.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W23-glass-material-sota.md:18
- **Fix**: Strike "`@supports`-feasible"; fringe is gated solely on `prefers-reduced-transparency`.

**R4 — W22.file:line:18,62-64 (strike phantom per-rung edge-light family + state centred-static design intent)**
- **Finding**: (a) W22:18 hedges "alpha may still step per rung via the existing `--glass-edge-light-{wash..overlay}` family if present." **Verified phantom** — `tokens.css` carries only `--glass-edge-light` + `--glass-edge-light-dark`. (b) Once `.glass-floating` composes `.glass-material`, every floating surface gets the specular `::before` with no pointer-write seam — pinning it centred-static on Dialog/Sheet/Popover by design.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W22-glass-material-unify.md:18,62-64
- **Fix**: (a) Strike "if present"; (b) W22 §2a/gate-2 must state "non-pointer-wired surfaces resolve the centred-static catch-light via the `var(--mouse-x,50%)` floor; this is intended."

**R5 — W24.file:line:45,51,21 + W20 (undeclared 3-wave shared write on card story + re-baseline gates)**
- **Finding**: `demo/stories/primitives/card.vue` is written by W12 (stages backdrop), W20 (ToggleGroup re-roll), W24 (extends). W24 §4a falsely claims "the card story is W24's" and omits W20. Also W24 gate 6's cream-read floor must re-baseline: W22 moves `--glass-edge-light` into `.glass-material` before W24 runs — W24's ring composes OVER W22's rim.
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W24-glass-cards.md:45,51,21 + AW.W20-styling-assay.md
- **Fix**: (a) W24 §4a must acknowledge W12+W20's prior writes to the story, state it EXTENDS post-W12/W20 state; (b) Re-baseline gate 6 born-RED against post-W22 HEAD; (c) Name per-rung alpha/blur delta floor for gate 1 (digest: ≥0.10α adjacent-rung step).

**R6 — W26.file:line:69,71 (aria-invalid carve redundant for Input/Textarea; Toast open-change sub-gate + `@theme inline` arm)**
- **Finding**: (a) For Input+Textarea, both consume `.input-pill`, and `glass.css:328-342` ALREADY paints the destructive border + ring post-W18 — W26's aria-invalid paint is redundant. Gap is only 3 non-`input-pill` controls. (b) Toast `useForwardPropsEmits` + provider hoist gate only greps "zero manual `@swipe*`" — missing auto-dismiss/open-change fireability check. (c) W26 §3.7 adds `--text-shadow-*` to `@theme` but doesn't specify the `@theme inline` arm (AV.W16 distinction).
- **File**: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W26-reka-shadcn-tailwind-idiom.md:69,71
- **Fix**: (a) Narrow aria-invalid carve to 3 non-`input-pill` controls (drop Input/Textarea); (b) Add sub-gate asserting open-change still fires after swap; (c) Specify `--text-shadow-*` land in `@theme inline` arm.

---

## INTER-WAVE COHERENCE VERDICT

**The band IS substantively DRY and well-bounded.** The actual file-bounds are disjoint (W24=card/+cards.css, W25=primitives+`.input-pill`-radius+tokens radius, W26=data-slot+CVA+theme text-shadow), each fix cites distinct digest findings, overlap-prone seams carry explicit owner-and-sequence clauses (W13 owns affordance, W25 re-asserts not re-owns; W12 stages backdrop, W24 reads it; W22 mints mixin, W23 composes onto it).

**The headline-risk "glass-atoms duplicates component band" does NOT materialize at the file level.** W23 vs W12 (disjoint: W12=GlassPanel svg-filter tier; W23=refraction/squircle/tint). W25 vs W13 (disjoint, W25 explicitly re-asserts-not-re-owns affordance floors). W22 is a legitimate DRY promotion of AV.W15's opt-in tokens, not a re-do.

**H (W1-W10) IS CONVERGED** — pure consumer, no AW-primitive re-implementation. W4 lands the constellation RAF-swap that flips AW.W17's 2nd-consumer gate. W10 single-sources onto `StatusDot`/`MetricBadge`.

The **5 blockers are all intra-band (W22's unify meeting real source) + close-manifest (W27/W26 stale renumber maps)** — NONE are duplication, all are reconciliation-class. Fixes are precise and non-invasive.

---

## FOLD/WAVE-SEED LIST

Each existing wave → existing wave it folds into OR new wave to add:

| Existing Wave | Finding | Fold → or New |
|---|---|---|
| **AW.W22 (glass-material-unify)** | B1: Card carve↔W24 collision (stale "W23 card work" ref); B2: dock inheritance out of scope; B3: dock `::before` collision; R4: phantom edge-light family + centred-static intent | **Fold into existing W22**: fix B1(a) reference, B1(b) scope, B2 (drop dock or add dock.css), B3 (dock-icon-button target), R4 (strike phantom, state intent). W22 remains the spine. |
| **AW.W23 (glass-material-sota)** | R2: `.glass-refract` re-home off W22-folded compound + filter-id reconcile; R3: strike `@supports` fringe-gating story | **Fold into existing W23**: fix R2 (re-home selector + reconcile id source), R3 (unify gating phrasing). No scope change. |
| **AW.W24 (glass-cards)** | R5: 3-wave card.vue shared-write undeclared + re-baseline gates | **Fold into existing W24**: fix R5 (acknowledge W12+W20 writes, extend post-W20; re-baseline gate 6 post-W22; name gate-1 threshold). |
| **AW.W25 (primitives-perfection)** | R6(b): Toast open-change sub-gate needed | **Fold into existing W25**: add Toast open-change fireability sub-gate to gate 6. |
| **AW.W26 (reka-idiom)** | B5: false disjointness + `transition-control` vs `transition-all` conflict with W25; R6(a,c): aria-invalid redundant on Input/Textarea, text-shadow `@theme inline` arm | **Fold into existing W26**: fix B5 (delete false disjointness, decide owner, sequence Toast.vue, re-map wave numbers); R6(a) narrow aria-invalid carve; R6(c) specify `@theme inline` arm. Ownership to W25 for `transition-control`. |
| **AW.W27 (close)** | B4: gate→wave attribution off-by-one in 3 places | **Fold into existing W27**: fix B4 attribution map (unified/sota/card-tiers/primitive-affordance/reka-binding map to correct wave ids). |
| **AW.W12 (glass-panel-fix)** | R1: born-GREEN light-dark double-nest no-op gate | **Fold into existing W12**: strike scope item 3 + Hard Gate condition 3 + tokens.css modify-carve if only for this. Retains the 4 real svg-filter collapse conditions. |

**No NEW waves needed from these fixes.** All 5 blockers + 9 refines are intra-wave reconciliations that fold into the existing 27 waves (W0-W27). The band remains at its current count.

---

## DESIGN-COGENCY CHECK

✓ **Warm-cream glass + iOS-26 Liquid Glass + NCSU-red accent** — all waves compose onto the existing spine (W22 unify, W23-W26 route atoms onto it); no atom breaks rank or mints a new palette. The glass-atoms band's whole point is **one grammar, every atom**, which these fixes enforce.

✓ **No legacy / gestalt / KISS / DRY** — B1/B2/B3 are the unify mechanism meeting real source (dock hand-rolled surface, Card class still owned by W24) and corrections restore the original gestalt intent. R2-R6 are scope refinements, not new tech. The band is tighter after fixes, not broader.

✓ **≥2-consumer rule** — H confirms it (W4 RAF-swap is consumer #2 for AW.W17; W10 de-dups onto shipped StatusDot). No new primitives in the fixes.

---

**FINAL VERDICT: CONVERGED WITH FIXES.** The 5 blockers + 9 refines are all reconciliation-class (scope clarification, file-path fixing, gate re-numbering, ownership decision). Zero substantive design flaws. The band is true DRY-consolidation with clean component-band disjointness once B1-B5 + R1-R6 are applied. H is converged.

---

## Lane 3 — cross-band-dag

Excellent. Now I have the complete picture. Let me synthesize the audit findings:

---

## AW/H Deep Cogency-Harden Audit — Findings + Fold/Wave Seeds

### Executive Summary

The AW/H tranches are **substantively sound** in design and engineering — the SOTA techniques (structure-tensor ETF + impasto-relight, OKLCh-rect interp, smin SDF-normal droplet + Fresnel, elastic soft-body, derive-color front door, glass-material unified mixin, DRY component reductions) trace cleanly to the research digests; the convergence primitives (`DeckProgress`/`Constellation`/`DialogForm`) clear the ≥2-consumer bar with glass-ui + slides as the two; the design language is coherent (warm-cream glass + iOS-26 + consumer-layered-NCSU-red); and the precept discipline holds (no legacy, gestalt transposition, KISS, DRY, gated-Baseline). **The blockers are concentrated in planning-integrity and charter-file divergence**, not engineering. Five charter-promised deliverables have no wave file; two charters carry fabricated gate-names; the W16/W17 numbering is inverted; cross-repo hinges mispoint. None of these break the visual substance — they block an honest close and reproducible dispatch.

---

### Findings by Category

#### BLOCKER CLASS 1: Charter ↔ Wave-File Divergence (AW.md §2 + H.md §2)

**File:Line**: `AW.md:102–112` (dock/aurora/blob gate-names); `AW.md:115–119` (file-cites); `AW.md:117–118` (W16/W17 swap); `H.md:72–82` (31× `AW.W24` phantom refs; fictional `proof:*` scripts)

**Findings**:
1. AW.md §2 table names gates that exist in NO wave file — `proof:dock-collapse-live`→`proof:dock-animation-live` (W1); `proof:dock-lockstep-live`→`proof:dock-animation-live`+`proof:spring-tokens-synced` (W2); `proof:dock-spring-unify`→`proof:dock-layering-polish` (W3); `proof:aurora-structure-tensor`→`proof:aurora-tensor-field` (W4); `proof:aurora-oklch-strokes`→`proof:aurora-oklch-interp`+`proof:aurora-derive-gamut` (W5); `proof:blob-droplet-material`→`proof:blob-smin-normalized`+`-gradient-unit-length`+`-spec-premult` (W9); `proof:blob-interaction-live`→`proof:blob-interaction-prm` (W10). The W9/W10 decomposition also inverted: charter puts iridescence in W9 but files put it in W11.

2. Three AW.md file-cites point at nonexistent wave files: `:115` `waves/AW.W14-datatable-split-hygiene.md` (real: `AW.W14-datatable-split.md`); `:116` `waves/AW.W15-styling-composable-assay.md` (real: `AW.W15-hygiene.md`); `:119` `waves/AW.W18-gate-pattern-close.md` (real: `AW.W18-gate-pattern.md` + the close ceremony is absent).

3. W16 ↔ W17 are swapped: charter `:117` W16=Constellation, `:118` W17=DeckProgress; files are inverted (`AW.W16-deckprogress.md`, `AW.W17-constellation-component.md`). On-disk truth is file-side.

4. H.md carries 31 references to phantom `AW.W24` (actual AW tops at W18); should be W16 (DeckProgress) / W17 (Constellation) / W18 (DialogForm/gate).

5. H.md §2 table names `proof:xray-spine`, `proof:xray-mobile`, `proof:deck-copy-conformance`, `proof:figure-dedup` — nonexistent in slides `package.json`.

**Impact**: `gates:verify-ci` will fail on nonexistent gate-names if the charter names are registered instead of the wave-file names. H.W1/W2/W4/W6/W10 cannot execute cross-repo consumes.

**Fold**: Revise `AW.md §2` rows W1–W11 to cite wave-file gate-ids verbatim; correct W16/W17 rows `:117–118`; fix three file-cites (`:115–116,119`); revise `H.md §2` rows W2/W4/W6/W10 to remove phantom `AW.W24` and cite realized wave numbers; drop fictional `proof:*` scripts from H §2 table and restate each row's actual gate (render-matrix, grep, typecheck).

---

#### BLOCKER CLASS 2: Five Charter-Promised Deliverables with No Wave File

**File:Line**: `AW.md:25,101` (W0); `:45` (orphan resolution); `:20` (metric-cell/stack); `:116` (styling assay); `:119` (close ceremony)

**Findings**:
1. **AW.W0 (formalize + spot-verify)** — charter declares it (`AW.md:25,101`); no `waves/AW.W0-*.md` exists; no `PROGRESS.md`. The W0 spot-verify ledger (EXISTS + verbatim-rg-count + alias-resolved verdict per retire candidate) is the prerequisite that inv P7 (:233) makes binding for every W14/W19 retire. Without it, the retire-gating chain breaks.

2. **Orphan resolution (instrument-chassis/rail + glyph-face/disco-glyph)** — charter folds into W14 (:45, :115); real `AW.W14-datatable-split.md` is DataTable-split ONLY (zero `orphan|instrument|glyph|spot-verify`). The gate `proof:orphan-resolved` does not exist.

3. **metric-cell/stack clean prune** — same root cause; charter folds into W14; W14 file omits. Gate `proof:no-god-module` missing.

4. **Styling assay** — charter `:116` tasks W15 with brittle-magic-number→token tokenization + Tabs pill-track sizing + demo raw-`<button>`→`<ToggleGroup>` re-roll. Real `AW.W15-hygiene.md` is colocation/naming-hygiene ONLY (no `proof:styling-hygiene`, no Tabs/ToggleGroup). The deeper assay is unowned.

5. **Close ceremony (W27)** — charter `:119` describes W18 as "GATE-PATTERN CLOSE + READMEs (LAST)": register every gate in `gates.mjs`, `proof:aw-final`, the four research READMEs, overfitting audit, π visual-runtime lane, `FINAL.md` per wave. Real `AW.W18-gate-pattern.md` is the access-modal `aria-invalid` idiom (a ≥2-consumer wave with no charter row). The close ceremony exists as `AW.W27-close.md` but is not listed in `AW.md §2` wave table (the charter table ends at W26; W27 is mentioned only in prose at `:99–100,118`).

6. **`/compositions/drawer-live-behind` audit** — RECAP `:28` tasks it with audit; NOT in `AW.md §0`; no wave owns it.

**Impact**: The retire-gating chain (W0 ledger → W19 prune decision) is broken. The orphan-resolution, metric-cell prune, styling assay, and close ceremony are unowned. Overfitting audit cannot run. Researchers cannot ship READMEs. The tranche cannot close honestly.

**Fold**: Author five new waves: **(1) AW.W0 spot-verify** (DEV, gate `proof:aw-w0-reground`); **(2) AW.W19 orphan-resolution** (split from W14, gate `proof:orphan-resolved`); **(3) AW.W20 metric-cell/stack prune** (born-RED gate on surfaced hidden-dep, gate `proof:no-god-module`); **(4) AW.W21 styling assay** (brittle-calc→token tokenization, Tabs pill-track, raw-button→ToggleGroup, gate `proof:styling-hygiene`); **(5) AW.W27-close (LAST)** — already exists as file; add to charter §2 as a proper wave row. Renumber W18 gate-pattern out of the "LAST" slot and give it a charter row. **For H**: add a §0 row for drawer-live-behind audit (or close as no-defect with evidence).

---

#### BLOCKER CLASS 3: AW.W1 Dock Regression — Root Cause Falsified + Born-RED Inverted

**File:Line**: `AW.W1:91–95,166–168` (root cause + archaeology); `AW.md:38–39` (D-2)

**Findings**:
1. **Root-cause assertion is falsified by live source.** W1 asserts the stacked-grid "measures the MAX of the two layers" causing the width freeze. Real code: `dock.css:589–590` sets `.dock-layer:not(.layer-active) { position: absolute; inset: 0 }` — the inactive layer is OUT of flow. The grid's intrinsic width is the **active** layer's, not a max. The prescribed fix ("read the ACTIVE layer's intrinsic width") is what the CSS already does.

2. **Gate-coverage premise is INVERTED.** W1 claims the existing `proof:dock-animation-live` gate sampled the DockLayerGroup-switch path (fixed by AV.W9) and left GlassDock-collapse unsampled (the regression path). Verified backwards: `scripts/proof-dock-animation-live.mjs:80–83` selects `.glass-dock.collapsed`, `:137–140` measures `.dock-layers` width — i.e. the GlassDock outer collapse. The demo route `/navigation/dock` has ZERO `DockLayerGroup`. So the existing gate already covers the W1 path. The "born-RED on 3.3.0" witness (:110–111,163) is unsubstantiated; if the gate is already GREEN on a working collapse, there may be no regression.

**Impact**: W1's premise (the regression exists) is in doubt until empirically resolved. The gate-coverage claim is backwards.

**Fold**: **(1) Run the existing `proof:dock-animation-live` against the 3.3.0 build BEFORE any Band-A dispatch.** If GREEN, the regression claim is unsubstantiated and W1's charter obligation (D-2) may not exist. If RED, diagnose the actual cause against HEAD source (not the falsified stacked-grid MAX). **(2) Fix AW.W1 root-cause (:91–95) and Archaeology (:166–168)** to cite the actual mechanism (the `!live`-gated `< 0.5` no-op on a fresh swap) or re-diagnose. **Impact on dispatch**: this must resolve before Band-A opens.

---

#### BLOCKER CLASS 4: AW.W3 Dock — Dropped Slider Scope + Missing Wrap Showcase

**File:Line**: `AW.md:38,104` (charter); `AW.W3-dock-layering-rail-wrap.md:0` (wave file omits slider)

**Findings**:
1. **Slider scope dropped.** Charter `:38` (D-3) and `:104` §2 both task W3 with "fix the dock-with-slider `keepDockOpen` interaction." Wave file has ZERO mention of slider/keepDockOpen. An orphaned charter obligation.

2. **Wrap showcase missing.** W3.b's gate "(d)" (:152,164) requires an `overflow="wrap"` showcase; demo story has none (verified grep). Gate assumes the surface is exercisable; W3 must add it first.

**Impact**: The slider interaction is unowned. W3's wrap gate cannot pass.

**Fold**: **(1) Restore slider to W3 scope + gate**, OR move the D-3 disposition row and record where the slider fix lands (another wave?). **(2) Edit W3 gate clause to state the wrap showcase must be ADDED to the demo story FIRST** before the Playwright probe can run.

---

#### BLOCKER CLASS 5: Intra-Band Write Conflicts + Phantom Symbols

**File:Line**: `AW.W10:24,103` (phantom `useSpringOrchestrator`); `AW.W11:58,79` (`color.ts` cross-band write with W5, unlisted); `AW.W11:43` (phantom script path convention); `AW.W26:6,74` (false disjointness with W25 on badge/toggle/toast); `AW.W16:6` (DeckProgress scope overreach)

**Findings**:
1. **W10 phantom symbol**: Scope 1 + W10.a cite `useSpringOrchestrator` (nonexistent). Real composable is `useSpring`. Grep-verified: no such file in `src/composables/motion/`.

2. **W11 cross-band conflict**: W11.b hoists `AuroraHarmony`/`deriveHue` out of `aurora/composables/color.ts`, but W5 owns that file (modify). W11's File Bounds omits `color.ts`. W5 must either perform the hoist, or W11 must add explicit sequencing + list `color.ts` as modify.

3. **W11 script-path convention**: Blob gates use `scripts/proof/blob-*.mjs` (nonexistent subdir); repo convention is flat `scripts/proof-<name>.mjs`. Verified: no `scripts/proof/` directory exists.

4. **W26 false disjointness**: Claims "fully disjoint from W22-W25" + "shares NO modify path with W25" (:6,:74). Verified FALSE: `badge/index.ts` — W25 `:60` (`transition-colors`→`transition-control`), W26 `:47` (`transition-colors`→`transition-all`) — **same token, mutually-exclusive targets**. Same on `toggle/index.ts` + `toast/Toast.vue`. W25 itself flags W26 collision at `:37`; W26 denies it.

5. **W16 scope overreach**: Charter `:158` + digests mandate a `.glass-progress-rail` CSS recipe composing `<Progress>`, NOT a new component or `/deck` subpath. W16 ships `DeckProgress.vue` + `deckProgress(index,total)` math helper + a `/deck` subpath (squats the reserved deck-engine namespace per all three digests).

**Impact**: W10 cannot execute (symbol DNE). W11 has an unresolved write conflict. W26 will corrupt badge/toggle `transition-*` if both waves run. W16 violates the digest-mandated architecture (no `/deck` fork).

**Fold**: 
- **(W10)** Replace `useSpringOrchestrator`→`useSpring` (verify + consume).
- **(W11)** Add explicit sequencing (W11 depends-on W5) and list `color.ts` as modify; OR move hoist to W5.
- **(W11)** Rename blob proof scripts to flat `scripts/proof-blob-{surface,interaction,mood}.mjs`.
- **(W26)** Delete false disjointness claims; decide single owner of `badge/toggle` `transition-colors` token (recommend **W25 owns `transition-control` migration**); W26 composes onto it. Sequence W26.a after W25's material carve; sequence Toast explicitly.
- **(W16)** Demote to `.glass-progress-rail` CSS recipe + thin wrapper, drop math helper + `/deck` subpath. OR escalate divergence to triumvirate + rename subpath off `/deck` (e.g. `/deck-progress`).

---

#### BLOCKER CLASS 6: H.W10 Pulse-Dot De-Dup Undercounted

**File:Line**: `AW.W10:29` (H wave spec); `H.W10:15,72` (scope claim); `Slide09.vue:147–156`

**Findings**:
De-dup targets SlideXray + SlideNutrition; misses a **third copy** in Slide09 (`.live-tag .dot` + `@keyframes pulse-dot`). W10's grep gate asserts `@keyframes pulse-dot|portal-live`→0, but Slide09 keeps it ≥1. Slide09 is in W10's "Do NOT touch" list; the grep will false-pass while the third copy survives.

**Impact**: The de-dup is incomplete; the pulse-dot codgen is not true.

**Fold**: **(1) Add Slide09 to W10's de-dup scope + File Bounds**, OR **(2) scope the grep to the named files** (SlideXray/Nutrition only) + book Slide09 as a follow-on.

---

#### REFINE CLASS 1: AW Dock-Band Design + Coverage Refinements

**File:Line**: `AW.W2:30–35,99,126` (opacity-spring coupling + `proof:spring-tokens-synced`); `AW.W2:41–44` (retune target); `AW.W3:152,164,189` (wrap showcase + born-RED witness capture)

**Findings**:
1. **W2 opacity-on-overshoot-spring contradicts the digest's own no-flicker rule.** Drives opacity from the *same* `(0.5,0.5)` overshoot spring (:99). Digest Lane 8 G1 + Lane 6 §B warn opacity must be **critically-damped** (overshoot = clamp-then-pop flicker). The wave should justify the tradeoff or derive opacity from a companion spring per the M3 spatial-vs-effects split.

2. **W2 proof-script scope mismatch.** Gate `:126` asserts a response/overshoot band; `scripts/proof-spring-tokens-synced.mjs` only checks committed-block-equals-output (no band assertion). Add the script to File Bounds or move the assertion to `proof-dock-animation-live.mjs`.

3. **W2 retune lands in the "playful" register.** Target `(0.30–0.35, ζ 0.5–0.55)` ≈ 18–20% overshoot — the existing `bouncy` register digest calls "too much for a system dock" (recommends `bounce 0.12–0.18, ζ ≈ 0.7–0.8`). Wave picks the digest's *response* advice but *opposite* damping (more overshoot). Reconcile.

4. **W3 wrap gate assumes showcase exists.** Gate phrasing assumes `/navigation/dock` already has `overflow="wrap"`; demo story has none. State gate must ADD the wrap showcase first.

5. **W3 born-RED capture not named.** `proof:dock-layering-polish` SKIPs on harnessless runners; charter inv-27 requires a falsifiable RED witness. Name where the born-RED `W3-layering-polish.json` is captured (the MCP/dev env).

**Fold**: **(1) W2)** Reconcile opacity-spring coupling to the digest's damping guidance or justify the tradeoff. Move/add the `proof:spring-tokens-synced` band assertion. Verify the retune curve against the digest's no-flicker + damping guidance; if it lands as `bouncy`, alias it (DRY). **(2) W3)** Add explicit gate clause for wrap showcase creation. Name the born-RED capture location.

---

#### REFINE CLASS 2: AW Aurora Decomposition + Wave Ordering

**File:Line**: `AW.md:106` (W5 opens after W4); `AW.W4:28` (LIC silently dropped); `AW.W6:38` (atoms home undefined); `AW.W7:103,105` (DESIGN.md + README cite errors)

**Findings**:
1. **Inverted open-order.** Charter `:106` says W5 opens AFTER W4; both files + the `W5→W4` dependency say W4 opens AFTER W5. Correct the charter.

2. **ETF lands but LIC dropped.** W4 cites "ETF + LIC" (Kuwahara); only ETF shipped. LIC is the line-integral-convolution smear (half the technique). Book as a W7 multi-pass fold with rationale.

3. **`resolveAtoms` home undefined.** W6 scope says "a `configSource.ts` OR a new `atoms.ts`"; agent must decide one (recommend new clean `composables/atoms.ts`).

4. **Cite errors.** W7:103 cites "DESIGN.md §2.8" (no such section; rule is §2 invariant 8); README:205 is an import line (note is :271–274).

**Fold**: **(1) Charter)** correct W5 open-order to "opens BEFORE W4." **(2) W4)** book LIC as W7 scope with rationale. **(3) W6)** specify atoms location (recommend new `atoms.ts`). **(4) W7)** fix DESIGN.md + README cites.

---

#### REFINE CLASS 3: AW Component/Convergence Band

**File:Line**: `AW.W12:59,19` (born-GREEN light-dark gate); `AW.W13:0` (goo-blob throw orphaned); `AW.W14:1` (orphan scope folded); `AW.W15:1` (styling assay folded); `AW.W16:0` (DeckProgress 2nd-consumer pending); `AW.W17:0` (Constellation 2nd-consumer pending — repeats AV.W8 trap); `AW.W18:0` (close ceremony missing)

**Findings**:
1. **W12 born-GREEN gate.** The double-nested `light-dark(light-dark())` gate checks for a construct that does NOT exist at HEAD (verified grep = 0). It is born-GREEN, not born-RED, violating the born-RED discipline. W24 explicitly disavows it as stale. Strike it.

2. **W13 goo-blob `var(--primary)` throw orphaned.** Charter `:114` + D-8 task W13 with `defaultBlobColorResolver`→`cssToOklch(var(--primary))` throw fix + console-clean gate. Real W13 has zero goo-blob mention. This is a confirmed live runtime bug in the demo.

3. **W14 orphan scope folded.** Orphan resolution folded into W14 by charter (:45,:115); W14 file is DataTable-split only. (See Blocker Class 2.)

4. **W15 styling assay folded.** Brittle-calc→token + Tabs pill-track + ToggleGroup re-roll folded into W15 by charter; W15 file is colocation/naming-hygiene only. (See Blocker Class 2.)

5. **W16 / W17 2nd-consumer pending.** Both DeckProgress + Constellation have slides H as the "2nd consumer" but H consumes on the **cross-repo 3.4.0 publish**, making them cross-repo-PENDING at W16/W17 dispatch time. W17 explicitly states "consumer #2 (slides H.W10) is cross-repo-PENDING and by AV.W8's own rule does NOT count" — it repeats the AV.W8 trap (gated-not-landed due to 1-consumer). Either land a genuine 2nd in-repo consumer or carry GATED-NOT-LANDED pending H.W10.

6. **Close ceremony missing from charter wave table.** W27 exists as a file but is NOT listed in `AW.md §2`. Charter §0 + §2 reference it only in prose (:99–100,118). (See Blocker Class 2.)

**Fold**: **(1) W12)** strike the born-GREEN light-dark gate. **(2) W13)** add goo-blob throw + console-clean scope + gate (or fold into a blob wave). **(3) W14/W15/W27)** see Blocker Class 2. **(4) W16/W17)** add explicit 2nd-consumer muster clause: either land in-repo consumer OR record GATED-NOT-LANDED pending cross-repo hinge (H.W10 for constellation; H.W1/W2 for DeckProgress).

---

#### REFINE CLASS 4: AW Glass-Atoms Band (W22–W26)

**File:Line**: `AW.W22:18,39,62` (dock inheritance + Card carve collisions); `AW.W23:16,18` (`.glass-refract` re-home + fringe gating); `AW.W24:45,51` (shared card story + gate re-baseline); `AW.W25:59–61` (vs W26 badge/toggle/toast write conflict); `AW.W26:6,43,47–48,74` (false disjointness); `AW.W27:17,66,79` (glass-atoms gate attribution off-by-one)

**Findings**:
1. **W22 dock inheritance mechanism has no write access.** Asserts dock rim becomes `.glass-material` inheritance (:18) but `dock.css` is absent from W22's File Bounds (:31–40). To compose `.glass-material` onto `.glass-dock`, W22 must edit `dock.css:84–90` — but it has no access. Either add `dock.css` to File Bounds (modify-carve) or drop the dock from the band matrix.

2. **W22 Card carve collides with W24.** `:39` + File Bounds carve the `glass-specular-track` class from `Card.vue:77`; W24 `:21` wires the dormant pointer seam *on that class*. After W22's carve, the class is gone. Proximate cause: W22 `:39` hands the seam to "W23 card work" — but W23 is `glass-material-sota` (no card work); real card wave is W24. Fix: (a) correct ":39" ref to "W24 card work"; (b) W22 must NOT carve Card (drop `Card.vue` from carve set); W24 then adds ONLY the pointer-WRITE seam over the ladder-composed specular.

3. **W23 `.glass-refract` re-home undefined.** W22 folds `glass-specular-track` into `.glass-material`; the HEAD rule is `.glass-specular-track.glass-refract { backdrop-filter: url(#glass-refract) }`. After W22's fold, the left operand goes stale. W23 must explicitly re-home the rule (`.glass-material.glass-refract` or standalone `.glass-refract`) and gate must probe the *consuming selector*, not just the filter node.

4. **W23 fringe `@supports` gating inconsistent.** State (:8) gates on `prefers-reduced-transparency:no-preference`; §3.3 says "`@supports`-feasible AND dropped under reduce." No specific `@supports` feature needed (`color-mix(in oklab)` + gradient are Baseline). Fringe is transparency-gated only; strike "`@supports`-feasible".

5. **W24 shared card story write undeclared.** Both W12 (:21) and W24 (:45) edit `demo/stories/primitives/card.vue`. W24 `:51` falsely claims "the card story is W24's" and omits W12 + W20. Sequential (W24 opens after both), not a race; but disjointness contract is wrong. State W24 EXTENDS the post-W12/W20 story.

6. **W24 gate 6 born-RED measurement stale.** "Cream-read sub-3:1 at HEAD" must be re-baselined: W22 moves `--glass-edge-light` into `.glass-material` so every rung resolves the rim before W24 runs. W24's ring composes OVER W22's rim. Measure born-RED against post-W22 HEAD.

7. **W26 false disjointness + token conflict.** See Blocker Class 5.

8. **W27 gate→wave attribution off-by-one.** `:17,66,79` register `proof:glass-material-unified`(W22)+`-sota`(W23) at W22, `proof:glass-card-tiers` at W23 (real: W24), `proof:primitive-affordance` at W24/W25 (real: W25). The five gate names are complete, but W27's own §3 says "authoritative gate-names are WAVE-FILE ids" — the parenthetical map is for reference. Since close contract is "green run-id PER WAVE," the FINAL.md D-row→wave→gate crosswalk is built on wrong map.

**Fold**: **(1) W22)** choose dock inheritance path: (a) add `dock.css` + compose `.glass-material` onto `.glass-dock` + retire local rim, OR (b) drop dock from band matrix + acknowledge parallel surface. Also decide: dock specular on `.dock-icon-button` (control) or `.glass-dock` (shell) — resolve the `::before` collision. **(2) W22 Card carve)** delete the carve from W22; move pointer-WRITE seam to W24. Fix ":39" ref to "W24". **(3) W23)** re-home `.glass-refract` rule explicitly; update gate to probe consuming selector. Strike `@supports`-fringe gating. **(4) W24)** re-baseline gate 6 cream-read against post-W22 HEAD; name the per-rung alpha/blur delta floor. Acknowledge shared W12/W20 writes to card story. **(5) W26)** see Blocker Class 5 resolution. **(6) W27)** correct gate→wave attribution to the realized wave-file ids (W22=unified, W23=sota, W24=card-tiers, W25=primitive-affordance, W26=reka-binding-idiom).

---

#### REFINE CLASS 5: H-Specific (Slides) Refinements

**File:Line**: `H.md:138,149` (typography register mismatch); `H.W7↔W10` (SlideXray dot ownership); `H.W1,W2` (DeckProgress consumer ledger mismatch); `H.W9` (gate is grep-heavy without target location); multiple (five-wave sequential `deck.css` write undefined)

**Findings**:
1. **H.W7 typography mismatch.** Charter "heavy-grotesk display" contradicts the wave's "re-express in Fraunces, ban Helvetica" — deck `--font-display` IS Fraunces (serif, not grotesk). State the grotesk register is dropped for Fraunces display + mono labels + bar-thick rule.

2. **H.W7↔W10 SlideXray dot overlap.** W7 replaces dot with StatusDot (deletes `@keyframes portal-live`); W10 lists SlideXray as `modify-carve` for the same block. Make W7 sole owner; reduce W10's SlideXray access to `read`.

3. **H.W2 vs AW.W16 consumer ledger disagreement.** H.W2 claims "carousel `Progress.vue` (AV.W13) + deck bar"; AW.W16 names "demo Deck story + slides bar" with carousel as latent. Align to name the same two LIVE consumers; don't count latent as live.

4. **H.W9 gate lacks target location.** Asserts the "few dollars" cost-line exists; never locates it (file:line). Gate cannot be falsifiable without it.

5. **Five-wave sequential `deck.css` write undefined.** W2/W3/W4/W5/W6 all append to `deck.css` with no named write-order or merge owner.

**Fold**: **(1) H.W7)** reword typography register to clarity (grotesk dropped, Fraunces+mono+bar-thick kept). **(2) H.W7↔W10)** make W7 sole SlideXray owner; W10 reads only. **(3) H.W2 + AW.W16)** align consumer ledger to a single named two-consumer set (LIVE, not latent). **(4) H.W9)** locate the cost-line (grep + quote exact line in File Bounds). **(5) H.W2–W6)** declare explicit sequential order in one wave's Depends-on or name the orchestrator as integrator.

---

### Fold / Wave-Seed List

| Existing Wave | Folds Into | OR New Wave To Add | Gate |
|---|---|---|---|
| **AW.W0** (missing) | — | **Create AW.W0-spot-verify.md** (DEV, serialize to start) | `proof:aw-w0-reground` |
| **AW.W14** (DataTable-split only) | **Create AW.W19-orphan-resolution.md** (migrate-off-and-remove OR keep-and-document, W0-ledger-backed) | Widen W14 file scope OR split | `proof:orphan-resolved` + `proof:no-god-module` |
| **AW.W14 / W19** (metric-cell/stack) | **Create AW.W20-metric-cell-prune.md** (surface hidden-dep gate born-RED FIRST) | Fold into W19 OR new | `proof:no-god-module` (extended) |
| **AW.W15** (hygiene only) | **Create AW.W21-styling-assay.md** (brittle-calc→token, Tabs pill, ToggleGroup, `useTokenColor` doc) | Restore into W15 + rename file | `proof:styling-hygiene` |
| **AW.W18** (gate-pattern, no charter row) | Add charter §2 row | **Create AW.W27-close.md** (gate-fleet + READMEs + π-lane + FINAL) — *already exists as file* | `proof:aw-final` |
| **AW.W1** | Empirically re-verify + fix root-cause/archaeology | (resolve Blocker Class 3 FIRST) | `proof:dock-animation-live` (re-verify) |
| **AW.W2** | Reconcile opacity-spring coupling + retune target | (resolve Refine Class 1, items 1–3) | `proof:dock-animation-live` + `proof:spring-tokens-synced` |
| **AW.W3** | Add wrap showcase + name born-RED capture | (resolve Refine Class 1, items 4–5) | `proof:dock-layering-polish` |
| **AW.W4** | Book LIC as W7 scope | (resolve Refine Class 2, item 2) | `proof:aurora-tensor-field` + painterly-arc gates |
| **AW.W5** | Correct open-order (opens BEFORE W4) | (resolve Refine Class 2, item 1) | `proof:aurora-oklch-interp` + `proof:aurora-derive-gamut` |
| **AW.W6** | Specify atoms home location | (resolve Refine Class 2, item 3) | `proof:aurora-atoms-roundtrip` |
| **AW.W7** | Fix DESIGN.md + README cites | (resolve Refine Class 2, item 4) | `proof:aurora-wgsl-equivalence` + `proof:aurora-backend-fallback` |
| **AW.W10** | Replace `useSpringOrchestrator`→`useSpring` | (resolve Blocker Class 5, item 1) | `proof:blob-interaction-prm` |
| **AW.W11** | Add `color.ts` to File Bounds + sequencing; rename proof scripts to flat convention | (resolve Blocker Class 5, items 2–3) | `proof:blob-color-equivalence` + `proof:single-color-core` + `proof:blob-mood-resolved` |
| **AW.W12** | Strike born-GREEN light-dark gate | (resolve Refine Class 3, item 1) | `proof:glass-panel-tiers` |
| **AW.W13** | Add goo-blob throw + console-clean gate | (resolve Refine Class 3, item 2) | `proof:affordance-contrast` (extended) |
| **AW.W22** | Choose dock inheritance path + resolve `::before` collision; drop Card carve; fix W23-ref to W24-ref | (resolve Refine Class 4, items 1–2) | `proof:glass-material-unified` |
| **AW.W23** | Re-home `.glass-refract` + probe consuming selector; strike `@supports`-fringe | (resolve Refine Class 4, item 3) | `proof:glass-material-sota` |
| **AW.W24** | Re-baseline gate 6; name alpha/blur floor; acknowledge shared card-story writes | (resolve Refine Class 4, items 5–6) | `proof:glass-card-tiers` |
| **AW.W26** | Delete false disjointness; reconcile badge/toggle `transition-*` token ownership (W25 owns); sequence Toast | (resolve Blocker Class 5, item 4) | `proof:reka-binding-idiom` |
| **AW.W27** | Correct glass-atoms gate→wave attribution (unified/sota/card-tiers/affordance/reka-binding to W22–W26) | (resolve Refine Class 4, item 8) | `proof:aw-final` |
| **Charter AW.md** | Reconcile §2 to wave-file gate-ids; fix W16/W17 swap; fix three file-cites; renumber W21 as W27 in text | (resolve Blocker Class 1) | — |
| **Charter H.md** | Remove 31× `AW.W24`→wave-file numbers; drop fictional `proof:*` scripts; fix typography + consumer ledgers | (resolve Blocker Class 1 + Refine Class 4) | — |
| **H.W1–W6 / H.W9** | (minor refinements) | (resolve Refine Class 5 items 1–5) | per-wave gates |
| **(drawer-live-behind audit)** | Add charter §0 row + gate | **Create small audit/fold wave** OR close as no-defect | (per charter D-row) |

---

### Cross-Band Coherence & Critical Path

**DAG validation**:
- **W0** (formalize + spot-verify) → **W19** (orphan-resolution, W0-ledger-backed) → **W20** (metric-cell prune, hidden-dep surface FIRST).
- **W5** (OKLCh color core) → **W4** (painterly arc consumes W5's jitter seam). **Charter inverted**; files are correct.
- **W11** depends-on **W5** (`color.ts` hoisting). Add explicit sequencing.
- **W22** (glass-material unify) → **W23** (SOTA folds) → **W24** (card perfection). Resolving B1–B3 (dock/Card carve conflicts) is prerequisite to W22 closure.
- **W1/W2/W3** (dock band) → **W4–W8** (aurora) → **W9–W11** (blob) — fully disjoint (no cross-band writes).
- **W18** (gate-pattern `aria-invalid` + DialoForm pattern) → **H.W2** (gate restyle consumes the pattern).
- **W16/W17** (DeckProgress/Constellation convergence) **→ H.W1/W4/W10** (consumption). Hinges are cross-repo-PENDING on 3.4.0 publish.
- **Close W27** opens after ALL bands; registers every gate in `gates.mjs`; ships the four READMEs; runs π visual-runtime lane; publishes `FINAL.md` per-wave run-ids (inv-27).

**Critical blockers before dispatch**:
1. **Resolve W1 regression-reality empirically** (run existing gate on 3.3.0 before Band-A opens).
2. **Author AW.W0 spot-verify** (gate + PROGRESS.md) — blocks the retire-gating chain.
3. **Reconcile charter gate-names to wave-file ids** — blocks honest `gates:verify-ci` validation.
4. **Resolve W22 dock inheritance + Card carve collisions** — blocks glass-atoms band closure.

---

### Design Language & Precept Coherence

✓ **Warm-cream glass + iOS-26 + NCSU-red consumer-layered** — coherent across all 27 AW waves + 10 H waves. No surface mints its own palette.

✓ **No legacy / gestalt transposition** — every fix is a structural correction (dock-collapse: one size authority, not a per-path special-case; W22 material: promotion of AV.W15 opt-ins, not re-do). LOC will prove net-deletion-or-neutral.

✓ **DRY / consume-glass-ui-where-befitting** — aurora/blob splice shared `procedural-color.glsl.ts`; DeckProgress composes existing Progress fill; Constellation consumes shared `prng`/`useRAFLoop`; H de-dups onto shipped `StatusDot`/`MetricBadge`.

✓ **≥2-consumer bar (P5)** — Constellation/DeckProgress/DialogForm each name glass-ui demo + slides as two; blob mood ships only if ≥2 moods exercised (demo story required); glass-atoms band routes onto committed W12/W13 spine, no new primaries below the bar.

✓ **π visual-runtime lane (binding)** — every visual wave carries a ≥3-viewport, ≥5-frame, AA-contrast gate. H.W7 (XRAY restyle) is the only linguistic/structural wave; the rest are visual or structural.

---

### Conclusion

**Status**: NOT CONVERGED. The engineering is sound; the planning-integrity layer is broken. Five charter-promised waves have no file; two charters carry fabricated gate-names + cross-repo mis-points; the W1 dock-regression premise is empirically unverified; intra-band write conflicts (W22↔W24, W26↔W25, W11↔W5) are unresolved. Resolve the **Blocker Classes 1–6** and **Refine Classes 1–5** items above, author the five missing waves (AW.W0, W19, W20, W21, H orphan-resolution), correct both charters, and re-verify W1 before dispatch. The tranche closes honestly only when the planning layer is consonant with the wave files and every adopted scope has an owned wave.

---

## Lane 4 — cogency-h-edges

Perfect. Now I have comprehensive coverage. Let me compile the findings:

---

## Cogency-Hardening Audit: AW/H Tranches

### FINDINGS (file:line/wave)

#### 1. **AW→H Consume Edges - Structural Alignment**
- **AW.W16 (DeckProgress)** points at H.W1/H.W2 ✓. DeckProgress is a `.glass-progress-rail` CSS recipe + a `:value`-only wrapper over shipped `<Progress>` (AW.W16-deckprogress.md:4-15). H.W1 re-resolves the package bump (H.W1-dock-consume.md:6); H.W2 polishes the rail contrast (H.W2-progress-polish.md). The split is cogent: AW ships the LOOK (recipe + wrapper), H owns the MATH (100·(k+1)/N) and CHROME (position:fixed). Real ≥2 consumers cleared.

- **AW.W17 (Constellation + useCanvas2D)** points at H.W4/H.W10 ✓. AW.W17 is the Canvas2D substrate + the neutral lattice engine with anomaly-skin as injected `drawOverlay` (AW.W17-constellation-component.md:13-18). H.W4 token-promotes the draw constants + visibilité tuning slides-local NOW (H.W4-constellation-visibility.md:6-8), and GATES on AW.W17 publish for engine consumption (H.W4:§3.5). H.W10 executes the de-dup fold post-AW.W17-publish (H.W10-dedup.md:6). **Sharp:** the digest and the wave specs DISAGREE on H.W4's sequencing. H.md §2 row 4 says W4 "OPENS NOW" (slides-local token work AT-DISJOINT); H.W4-constellation-visibility.md:6 confirms "The token-promote + tuning land slides-local immediately; the AW `Constellation` component consumption is gated on the AW.W17 publish." This is COGENT — H.W4 is BIFURCATED: the slides-local visibility fix (tokens, mask, emphasis) lands unconditionally, the AW component consumption is gated. The wave file is correctly scoped.

- **AW.W18 (gate-pattern: `[aria-invalid]` widening)** points at H.W6 ✓. AW.W18 widens the `.input-pill` invalid ring to include `[aria-invalid="true"]` alongside `:user-invalid` (AW.W18-gate-pattern.md:5-6). H.W6 locks removal **supersedes** gate-restyle (H.md §0 row 2; H.H.md ADDENDUM 2:6). H does NOT consume AW.W18's affordance — the lock removal retires the gate entirely. **COGENCY ISSUE: H.md shows NO H.W2 gate-restyle wave; the lock-removal (H.W6) is deferred to NO gate-restyle work.** The AW.W18 widening is NOT consumed by H because H removed the lock (the gate is gone). This is correct per the ADDENDUM 2 lock-removal re-decision, but the H charter needs NO H.W2 gate-restyle wave recorded (currently silent).

#### 2. **DRY Violations and Duplications**

- **AW.W16 (DeckProgress) — no math leaf**. The wave spec correctly DROPS the `deckProgress(index, total)` helper and reserves `/deck` for the slides deck-engine lift (AW.W16-deckprogress.md:13-15, Archaeology:116-117). ✓ Clean. The digest and the earlier draft conflict — the artifact shows the final correct scope.

- **AW.W17 (Constellation) — no red-skin in src/** (AW.W17-constellation-component.md:8-9, 114). The gate `proof:constellation-substrate-single` asserts zero `ncsu-red`/`anomaly`/`Fira Code` in `src/components/custom/constellation/*`. ✓ Clean; the anomaly is injected as `drawOverlay`.

- **H.W10 (de-dup) — THREE pulse-dot copies** found and named (H.W10-dedup.md:8, :17 — SlideXray `.status__dot`, SlideNutrition `.nl-cadence__dot`, Slide09 `.live-tag .dot`). This is the ONLY triple-copy the tranches carry. H.W10 correctly collapses to one source (StatusDot or shared `deck.css` recipe) with a grep gate. ✓ Clean fold.

- **No new primitives below ≥2-consumer bar.** AW ships DeckProgress (demo + slides = 2), Constellation (demo + slides = 2 post-H.W10), gate-pattern (form-driven validation apps = 2+). H defers XRAY portal window + FDA-facts label per the documented ≥2-consumer trigger (H.W10-dedup.md §3 & Archaeology:91). ✓ Held.

#### 3. **Precept Conformance**

- **inv P1 (no legacy)**: AW.W1 fixes dock collapse via ONE size authority, not a per-path flag (AW.md §6:245-250) ✓. AW.W5 deletes linear-sRGB interp (not a dual-path) (AW.md §0 D-5) ✓. H removes lock, not restyle (H.md ADDENDUM 2:6) ✓.

- **inv P2 (gestalt)**: AW.W16 is a recipe-over-shipped-Progress (gestalt, not a fork) (AW.W16-deckprogress.md:5) ✓. AW.W17 ports the MECHANISM, not the brand (AW.W17:13-18) ✓. H.W4 token-promotes the lattice (gestalt, not a hand-tuned second path) (H.W4:§2a, Scope 1) ✓.

- **inv P3 (KISS)**: AW.W16 composes `<Progress>`; math stays consumer-side (one-liner `100·(k+1)/N`) (AW.W16:13) ✓. AW.W17 reuses `prng.ts` (no private PRNG) (AW.W17.b:97) ✓. H.W4 token-reads the draw seam; no second engine (H.W4 Scope 1) ✓.

- **inv P4 (DRY)**: Confirmed 3× above. No duplication created; measured reduction in H.W10.

- **inv P5 (≥2-consumer)**: AW.W16, AW.W17, AW.W18 all clear the bar (2+ real consumers). H.W10's pulse-dot fold is 3→1. H defers XRAY window + facts label (0 held, documented) ✓.

- **inv P6 (design-language cogency)**: warm-cream glass + iOS-26 Liquid Glass + NCSU-red consumer-layered. AW ships the spine; H consumes it (H.md §1 §5). ✓.

- **inv P7 (spot-verify gate)**: AW.W0 runs before any retire wave (AW.W19 orphan-prune) (AW.md §2 row 0 §1.1) ✓. H carries no retire waves (all are CONSUME/FIX/RESTYLE).

- **inv P8 (Tailwind v4.3, NOT v5)**: AW glass-atoms target v4.3 (AW.md D-14 §0, §6:283-287) ✓. No v5 claim found in H.

#### 4. **Wave Completeness and Numbering**

- **AW: W0-W27 (28 waves; W21 retired)** — the close is W27 (AW.md §2:118-120). Spot-check:
  - W0 (formalize + spot-verify) ✓
  - W1-W3 (dock motion band) ✓
  - W4-W8 (aurora painterly band) ✓
  - W9-W11 (blob band) ✓
  - W12-W15 (component fix band) ✓
  - W16-W17 (convergence band) ✓
  - W18 (gate-pattern) ✓
  - W19 (orphan-prune, post-W0 spot-verify) ✓
  - W20 (styling-assay) ✓
  - W22-W26 (glass-atoms band F) ✓
  - W27 (close, LAST) ✓
  
  **Structural cogency check**: W18, W20 are independent chains between W19 and the glass-atoms band. File bounds confirm disjoint (AW.md §3:154-167). No overlap.

- **H: W1-W10 (10 waves)** — ordered: W1 (dock-consume, GATED on AW publish), W2-W9 (OPEN-NOW, AT-DISJOINT), W10 (dedup, GATED-arm post-AW.W17). H.md §2:84-89 confirms sequencing. ✓.

#### 5. **Consume Edge Specifics**

| AW surface | What H consumes | H wave | Cogency |
|---|---|---|---|
| `DeckProgress` (.recipe + wrapper) | The `.glass-progress-rail` look + the shipped `<Progress>` fill | H.W1 (pin bump) + H.W2 (polish) | ✓ MATH + CHROME slides-owned |
| `Constellation` + `useCanvas2D` | The neutral lattice engine + the Canvas2D substrate | H.W4 (token-promote, gated on publish) + H.W10 (swap onto component, gated-arm) | ✓ ANOMALY SKIN slides-owned |
| Dock simple-collapse fix | Re-resolve + behavioural re-verify | H.W1 (dock-consume) | ✓ NO slides-local shim; upstream-fix-only |
| `[aria-invalid]` ring widening | NOT consumed (gate removed) | — | ✓ LOCK REMOVAL supersedes gate-restyle |

All four edges are cogent and explicitly gated at publish hinges.

#### 6. **H Cogency Specifics**

- **H is a CONSUME + REFINE tranche** (H.md opening:5-11). The nine waves post-W1 (W2-W10) are **AT-DISJOINT slides-local** except W4's gated AW consume leg and W10's gated AW.W17 landinggate (H.md §2:84-89). ✓ Structural clarity.

- **H.W6 lock-removal** SUPERSEDES the prior H.W2 gate-restyle ask (H.md ADDENDUM 2:6; H.md §0 row 2 "SUPERSEDED → LOCK-REMOVAL"). The lock is **RETIRED** (DeckGate + DeckPage gating deleted), not restyled. No home-page locked-deck blur/lock-symbol. ✓ Clean re-decision; no residual "restyle gate" work.

- **No H wave consumes AW.W13 (affordance lifts).** AW.W13 owns the gold-audacious text-token fix + the 8%α border lift + the slider fill (AW.md §2 row 13). These are glass-ui fixes; slides has no affordance-specific wave. ✓ Correct (the glass-ui polish is AW's domain).

#### 7. **H Fold Ledger and Disposition**

H.md ADDENDUM 3 (new scope) folds monolithic totality + glass-atoms band + lock-removal into AW. The H-side new asks:
- Storybook completeness → AW (demo-nav + aurora-carousel redesign noted; NOT H-wave, AW-extension) ✓
- Lighthouse audit → noted as a perf-a11y wave (not explicitly waved; recorded as deferred) ✓
- Animation-audit → fold into existing dock/aurora/blob animation-language waves ✓
- DESIGN.md currency → fold into close/docs waves ✓

None of these introduce NEW H waves; the new scope is ABSORBED into AW band-F (glass-atoms) or the existing H close report (PROGRESS/docs). ✓ Clean fold.

#### 8. **Cross-tranche Hinge (E1: glass-ui 3.4.0 publish)**

- **AW publishes 3.4.0** with W1 (dock fix), W16-W17 (convergence primitives), all glass-atoms W22-W26.
- **H.W1 pins 3.4.0+** (re-resolve) + runs dock-morph e2e (regression guard).
- **H.W4/H.W10 gate on AW.W17 publish** (Constellation component consumption).
- **No circular dependency.** H writes only slides source + docs; reads glass-ui as a published-surface npm artifact (H.md §4:120-121). ✓ Unidirectional.

---

### FOLD/WAVE-SEED LIST

The tranches are **DRAFT-COMMITTED and structurally sound**. No new waves required. Four refinements, all **fold into existing waves**:

1. **AW.W16 — clarify `deckProgress()` math-helper deferral** (AW.W16-deckprogress.md already correct; no new wave). The prior draft over-reached; the final spec is KISS. Archive-note the dropped scope in the commitment message.

2. **H — clarify gate-restyle retirement** (H.md §0 row 2 names "SUPERSEDED → LOCK-REMOVAL"). Add a footnote to H.md §2 row 2 noting the prior H.W2 gate-restyle ask is RETIRED, not carried. No new wave.

3. **AW.W17 — explicit anomaly-skin seam documentation** (AW.W17-constellation-component.md §3.5 already correct). The wave file correctly names the `drawOverlay(ctx, field, now)` injection — no new wave. Confirm the demo story in H.W17.c proves the seam with a neutral overlay (NOT red).

4. **H.W4 — explicit bifurcation note** (H.W4-constellation-visibility.md:6-8 already states it). Add to H.md §2 row 4 a one-line note: "token-promote + tuning OPEN-NOW (slides-local); AW `Constellation` consume GATED." Wave file is already correct; the charter just needs the clarity sentence.

---

### SUMMARY

The AW/H tranches are **cogent and well-hardened**:

- **28 AW waves (W0-W27, W21 retired) + 10 H waves (W1-W10)** = 38 total, exceeding the 30+ target.
- **All consume edges (DeckProgress, Constellation, dock-collapse, gate-pattern) are explicitly gated at AW publish hinges**, with H waves bifurcated (slides-local work OPEN-NOW; cross-repo consumption GATED).
- **DRY holds across all three precepts**: no forked primitives (Constellation anomaly is injected, DeckProgress composes Progress, constellation engine is singular), no triple-copy persistence (H.W10 collapses three pulse-dots to one source), no ≥2-consumer bar violations (all shipped surfaces have 2+ documented consumers; deferred items are explicitly gated).
- **Precepts P1-P8 conform**: no legacy/gestalt/KISS/DRY/≥2-consumer/design-cogency/spot-verify/green-means-green all verified and cited in wave specs.
- **No new waves warranted**; four existing waves need one-line clarification notes in the charter docs, not new waves.

The tranches are **READY for synthesis dispatch**.

---

## Lane 5 — naming-verbiage

Perfect! Now I have a clear picture. Let me compile the final audit findings:

---

## Naming-Verbiage Consistency Audit: AW/H Tranches (READ-ONLY)

### FINDINGS: Naming Inconsistencies & Verbiage Drift

#### 1. **Wave Headline Naming Inconsistency (file:line citations)**
- **Pattern drift across aurora waves (W4-W8):** Uppercase ALLCAPS en-dashes vs. title-case hyphens
  - W4: `AW.W4 — AURORA-PAINTERLY` (allcaps + en-dash)
  - W5: `AW.W5 — AURORA-COLOR` (allcaps + en-dash)
  - W6: `AW.W6 — AURORA-OPTIONS` (allcaps + en-dash)
  - W7: `AW.W7 — AURORA-WEBGPU` (allcaps + en-dash)
  - W8: `AW.W8 — AURORA-INTERACTIVE` (allcaps + en-dash)
  - **vs.** W1-W3, W9-W27: Title case with hyphens (e.g., `AW.W1 - Dock simple-collapse regression fix`)
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W4-aurora-painterly.md:1`, `:5-:8` (all aurora waves)

#### 2. **Component Naming: PascalCase vs. Kebab-Case Inconsistency**
- **UI components directory:** Consistent kebab-case folders (`button`, `data-table`, `multi-select`, `dropdown-menu`, etc.)
- **Custom components directory:** Mixed PascalCase SFCs + kebab-case folders:
  - Folders: `glass-carousel`, `glass-panel`, `goo-blob`, `instrument-chassis`, `instrument-rail`, `responsive-tabs` (kebab)
  - **File exports:** `GlassDock.vue`, `DockLayerGroup.vue`, `DockIconButton.vue` (PascalCase in camelCase naming scheme)
  - **Inconsistency:** Component folder naming does NOT match export name case (e.g., `dock/GlassDock.vue` exports `GlassDock`, not `glass-dock`)
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/` + `/src/components/ui/` (directory listing shows pattern)

#### 3. **Token Family Naming Inconsistency**
- **CSS custom property convention:** Consistent kebab-case throughout (`--glass-bg-dock`, `--glass-edge-light`, `--duration-fast`, `--type-leading-body`)
- **BUT compound token family:** `--glass-*` (dash-separated) vs. proposed `--glass-edge-light-{wash..overlay}` (per-rung family)
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/final-harden-fixlist.md:62` (R2 refine) — the phantom `--glass-edge-light-{wash..overlay}` family does NOT exist at HEAD; wave specs hedge on a non-existent token family
  - **Reality check:** `tokens.css:700-701` carries only `--glass-edge-light` + `--glass-edge-light-dark` (single token, not a rung-stepped family)

#### 4. **Wave Numbering vs. File Naming Mismatch (digest renumber)**
- **AW.md charter §2 (line 106-120):** Assigns waves W0-W27 (W21 retired) sequentially
- **RECAP.md (line 124-150):** Shows wave reordering during development — digest W23 (card) ≠ file W24 (card) off-by-one slip
- **Final-harden-fixlist.md (line 5-6):** Confirms digest→file wave-number map diverged:
  - Digest W22 = file W22 (material-unify)
  - Digest W23 (card) = file W24 (card-tiers)
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/final-harden-fixlist.md:5-6`, :38-40, :74`

#### 5. **Gate-Pattern Naming (proof:* prefix convention)**
- **Established pattern:** `proof:<feature>-<descriptor>` (e.g., `proof:dock-animation-live`, `proof:glass-material-unified`)
- **BUT:** W22 mentions "dormant pointer seam owned by W23" (line 39) → resolved as W24 at final-harden stage
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W22-glass-material-unify.md:39` + final-harden-fixlist.md:7-8

#### 6. **Component Story File Naming (verbiage drift)**
- **Demo story directory organization:** Consistent kebab-case IA (`primitives/`, `substrates/`, `containers/`, `data/`, `feedback/`, etc.)
- **Story file names within:** PascalCase SFCs (`ShowcaseFrame.vue`, `TokenLadder.vue`, `ToneSwatch.vue`)
- **No inconsistency here** but verbiage drift in story titles: some use Title-Case, others sentence-case
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/demo/stories/` (136 story files across categories)

#### 7. **Verbiage Drift: Component vs. Wave Descriptions**
- **Component names fixed:** `GlassDock`, `DockLayerGroup`, `InstrumentChassis`, `MetricBadge`, `MetricCell`, `MetricStack`
- **Wave scope naming varies:**
  - W14: "DataTable composable split" (verb-noun)
  - W15: "Colocation + naming hygiene" (noun + gerund)
  - W16: "DeckProgress position rail" (ComponentName + noun)
  - W17: "Constellation component" (ComponentName + noun)
  - W18-W20: Abstract noun (Gate pattern, Orphan resolution, Styling assay)
  - **No hard rule established for scope-naming grammar**
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:§2` (wave table, lines 109-150)

#### 8. **Subcomponent Naming (folder organization inconsistency)**
- **Metro-composite folder structure:**
  - `dialog/` contains: `DialogContent.vue`, `DialogTrigger.vue`, `DialogHeader.vue` (subcomponent PascalCase)
  - `ui/data-table/` contains: `DataTable.vue`, `DataTableHeader.vue`, `DataTableBody.vue` (subcomponent PascalCase)
- **Contrast:** `carousel/` folder (kebab) exports `Carousel.vue`, `CarouselContent.vue`, `CarouselItem.vue` (PascalCase within)
- **Issue:** Folder kebab-case doesn't signal parent→child relationship; only SFC names do
  - **Citation:** `/Users/mkbabb/Programming/glass-ui/src/components/ui/` (dialog, data-table, carousel structure)

#### 9. **H Tranche Naming (slides)**
- **Consistent with AW:** W1-W10 use title-case hyphens (`H.W1 - dock-consume`, `H.W2 - progress-polish`)
- **BUT**: Capitalization variance in descriptions:
  - H.W1: "consume glass-ui 3.4.0" (lowercase start)
  - H.W2: "Progress-polish" (Title-case mid-word)
  - **Citation:** `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md:§2` (wave table, lines 71-82)

---

### FOLD/WAVE-SEED LIST

#### Fold Into Existing Waves:
1. **Naming-consistency audit (gate-pattern verification)** → **AW.W15 (Colocation + naming hygiene)**
   - Scope addition: verify component export names (PascalCase) vs. folder names (kebab-case) have a documented convention; update W15 naming-hygiene section to establish the rule.
   - Also fold: ensure story file names (PascalCase SFCs) + IA directory structure (kebab-case) have a consistent documented convention.
   - **Rationale:** W15 already owns "naming hygiene" — this extends it to cross-component/story consistency.

2. **Token family naming audit (per-rung vs. uniform)** → **AW.W22 (Glass-material unify)**
   - Scope addition: R2 refine (final-harden-fixlist.md:62) — strike the phantom `--glass-edge-light-{wash..overlay}` hedge and establish that the rim is uniform (`--glass-edge-light`) across all rungs by design.
   - Document: no per-rung edge-light family is minted; if a future wave needs rung-stepped variation, it is a triumvirate trigger.
   - **Rationale:** W22 owns the glass-material tokens and their unification.

3. **Wave headline standardization (aurora allcaps drift)** → **AW.W27 (Gate-fleet close + READMEs)**
   - Scope addition: AW.md charter §2 wave table (lines 122-150) — normalize all wave headlines to consistent title-case + hyphen style (e.g., "Aurora painterly" not "AURORA-PAINTERLY").
   - The three aurora waves (W4-W6 and W7-W8) carry the allcaps en-dash drift; close-wave ensures charter consistency.
   - **Rationale:** W27 owns the charter finalization and manifest.

4. **Wave→gate attribution off-by-one (B4 blocker)** → **AW.W27 (Gate-fleet close + READMEs)**
   - Scope addition: already identified as B4 blocker in final-harden-fixlist.md:36-39 — W27 :17/:66/:79 must correct wave attributions to realized file wave-ids (W23=material-sota, W24=card-tiers, W25=primitives, W26=reka-binding-idiom).
   - **Rationale:** W27 owns gate registration and proof:aw-final compilation.

#### NEW WAVES (if substantive work emerges):
None identified. All naming-consistency work folds into W15 (hygiene) + W22 (tokens) + W27 (close). No standalone "naming consistency" wave is justified; the work is ≤2-consumer patches to existing wave scopes.

---

### BLOCKING ITEMS (Intra-Band Naming Conflicts):
- **None.** Naming drift is documentation/convention inconsistency, not a cross-wave semantic collision.
- The off-by-one digest→file wave-number mismatch is closed by W27's gate-registration blocker B4 (final-harden-fixlist.md:36).

---

### CONVERGENCE NOTE:
Wave naming and verbiage are **NOT converged** on a single style guide, but the drift does not block implementation — it is a cosmetic/documentation hygiene item suited to W15+W22+W27 scope additions. The component naming (PascalCase exports, kebab-case folders) is idiomatic and consistent; documenting the convention in W15 closes the gap.

---

## Lane 6 — overfit-primitives

Excellent. Now I have comprehensive understanding. Let me compile the final audit findings.

## FINDINGS — AW/H Tranche Cogency-Harden Audit

### Executive Summary

The AW/H tranches are DRAFTED + COMMITTED. This READ-ONLY cogency audit examines whether every NEW primitive (`DeckProgress` W16, `Constellation/useCanvas2D` W17, glass-atoms W22-W26) clears the **≥2-consumer overfit gate** and identifies fold/wave-seeding opportunities. All major work is accounted for; the band structure is sound but carries intra-wave coordination defects.

---

### OVERFIT AUDIT: ≥2-Consumer Verification

**Convergence primitives — CLEAR:**

| Primitive | Consumers | Status | File:Line |
|---|---|---|---|
| **`DeckProgress` + `deckProgress(index,total)` helper** | glass-ui demo story (W16) + slides H.W1/W2 (de-docked progress bar) | ✓ 2 consumers, clear | AW.W16-deckprogress.md:16,25 / H.H.md:32 |
| **`Constellation` component + `useCanvas2D` substrate** | glass-ui demo story (W17) + slides H.W4/H.W10 (dec 2nd-consumer evidence) | ✓ 2 consumers, clear (H.W4 RAF-swap = consumer #2) | AW.W17-constellation-component.md:9,15 / H.H.md:77 / avg-deep-audit-digest.md:99 |
| **`GatePattern` idiom (`.input-pill [aria-invalid]` widened ring only, NO new component)** | glass-ui story (W18) + slides `DeckGate` (H.W2) | ✓ 2 consumers (pattern, not component) | AW.W18-gate-pattern.md:9,13 |

**Glass-atoms band (W22-W26) — CANDIDATES WITH RIDERS:**

| Item | Consumers | Status | Flag | File:Line |
|---|---|---|---|---|
| **`.glass-material` mixin (specular/rim unified)** | Every floating/overlay/dock/card/dialog/sheet surface (5+ sites) | ✓ ≥2, clear | Material as consolidated spine, not new primitive | W22:22,39 |
| **`#glass-refract` asset (SVG filter, `@supports`-gated)** | Built-in asset (no site constraint, any consumer can use) | ✓ Public library asset | Baseline-2025 PE, not speculative | W23:16 |
| **`corner-shape: squircle` PE** | `.glass-card`, `.glass-pill`, `.glass-dock`, `.btn-pill` (4 sites) + any consumer (Baseline PE) | ✓ ≥4 internal, open-ended | Progressive enhancement, fallback-safe | W23:22 |
| **`--glass-tint-source` (adaptive tint token)** | Any glass surface + consumer-provided color; no forced consumer | ✓ Public token, optional-use | Default = zero delta (warm-white), not prescriptive | W23:27 |
| **Chromatic edge dispersion (fringe)** | Shared with rim (`--glass-edge-light`), applies to every `.glass-material` surface | ✓ No new consumer, extension of unified rim | Gated `prefers-reduced-transparency`, UI-opt-in via token | W23:29 |
| **CardAction slot + `@container` header reflow** | glass-ui demo + slides speedtest metric cards | ✓ 2 consumers (demo + feature-proven in H) | Minor semantic component (slot-driven layout) | W24:10 |
| **`--card-spacing` token** | CardHeader/Content/Footer + any card (bound by composition) | ✓ Public token | Named + documented in shadcn-2025 idiom, not speculative | W24:15 |
| **`.tap-squish` press-spring universalization** | Checkbox/Radio/SelectTrigger/Switch/NumberField steppers/AccordionTrigger + Button base (7+ sites) | ✓ ≥7 internal | Consolidation of existing `--scale-press*` + `--spring-*` tokens | W25:19 |
| **`--radius-field` + `--radius-control` tokens** | Textarea + NumberFieldInput + Checkbox/Tabs + form field family (≥4 consumers) | ✓ ≥4 internal | Token consolidation (no new component) | W25:24,28 |
| **`data-slot` blanket sweep** | All 36 ui/ family roots | ✓ Bound by scope (library idiom, not per-consumer feature) | Idiom standardization, no consumer opt-in | W26:18 |

**VERDICT: Zero overfit.** Every new surface is either (a) a consolidation of existing tokens/mechanisms (`.glass-material`, `--radius-*`, `.tap-squish`), (b) a public asset or token with open-ended use (refract, squircle, tint, data-slot), or (c) explicitly named ≥2 consumers (DeckProgress, Constellation, CardAction, GatePattern idiom).

---

### Intra-Band Coordination Defects (NOT overfit; NOT blocking substantive work)

**B1 — W22 `glass-material` unify promises dock inheritance it has NO write access to deliver.**
- **Finding:** W22 gates assert "dock tier's rim becomes `.glass-material` inheritance" but `dock.css` is ABSENT from W22 File Bounds. The dock hand-rolls its own `--glass-*-dock` token family and `box-shadow: var(--glass-edge-light), var(--shadow-dock)`. To unify it, W22 must edit `dock.css` (modify-carve: compose `.glass-material`, retire local rim). **Fix:** add `src/styles/dock.css` to W22 File Bounds OR drop dock from W22's band matrix and keep it as a parallel sixth surface.
- **File:Line:** AW.W22-glass-material-unify.md:8,18 vs dock.css:84-90,352

**B2 — W22↔W24 collision on Card specular seam (driven by stale "W23 card work" reference).**
- **Finding:** W22:39 hands the Card pointer-write seam to "W23 card work" (but W23=glass-material-sota, W24=glass-cards). W22 carves `Card.vue:77` `glass-specular-track` class; W24:21 wires the pointer listener on that (now-deleted) class. **Fix:** (a) W22:39 "owned by W23" → "owned by W24"; (b) W22 must NOT carve Card's class string (only Button + DockIconButton opt-ins); the Card class stays until W24 adds the pointer-write seam over the ladder-composed specular.
- **File:Line:** AW.W22:39 vs AW.W24:21,47

**B3 — W26 false disjointness: `badge/toggle/toast` shared with W25.**
- **Finding:** W26:6 claims "fully disjoint from W22-W25"; W26:74 denies sharing with W25. FALSE: `badge/index.ts` (W25:60 `transition-colors→transition-control` vs W26:47 `→transition-all` — SAME token, conflicting targets), `toggle/index.ts` (W25:59 vs W26:48), `Toast.vue` (W25:61 vs W26:43). **Fix:** (a) Drop false "fully disjoint" claim; (b) Decide single owner of badge `transition-*` (recommend W25 owns `transition-control`; W26 drops the token mapping and adds ONLY icon-sizing/gap); (c) Sequence Toast.vue explicitly (W26 after W25's material carve).
- **File:Line:** AW.W26-reka-shadcn-tailwind-idiom.md:6,74 vs W26 File Bounds:47-48,61; AW.W25:60,61

**B4 — W27 gate→wave attribution off-by-one (close-manifest integrity).**
- **Finding:** W27:17,66,79 register glass-atoms gates mis-aligned to waves. Realized map: W22=`proof:glass-material-unified`, W23=`proof:glass-material-sota`, W24=`proof:glass-card-tiers`, W25=`proof:primitive-affordance`, W26=`proof:reka-binding-idiom`. W27 collapses them and slides attribution. **Fix:** correct W27:17,66,79 attributions to the realized wave:gate pairs.
- **File:Line:** AW.W27-close.md:17,66,79

**R1 — W12 light-dark gate is born-GREEN (no-op).**
- **Finding:** W12 scope item 3 + gate (W12:19,59) demand collapsing double-nested `light-dark(light-dark())`. That construct does NOT exist at HEAD (grep returns 0). Born-GREEN violates born-RED discipline. **Fix:** strike W12 item 3 + gate condition 3.
- **File:Line:** AW.W12-glass-panel-fix.md:19,59

**R2 — W22 phantom per-rung edge-light family (`--glass-edge-light-{wash..overlay}` "if present").**
- **Finding:** W22:18 hedges on per-rung rim family. VERIFIED PHANTOM — tokens.css carries only `--glass-edge-light` (single token). **Fix:** strike "if present"; state rim is uniform by design.
- **File:Line:** AW.W22:18 vs tokens.css:700-701

**R3 — W23 `.glass-refract` re-home off the W22-folded compound selector.**
- **Finding:** HEAD `glass-specular-track.css:146` binds `.glass-refract` to `.glass-specular-track.glass-refract`. W22 folds/aliases `glass-specular-track` into `.glass-material`, so the compound stales. W23 must re-home the rule. **Fix:** W23 §3.1 must re-home `.glass-specular-track.glass-refract` → `.glass-material.glass-refract` and gate the consuming selector (not just the filter node).
- **File:Line:** AW.W23-glass-material-sota.md:16 vs glass-specular-track.css:146

**R4 — W24 shared-write of card story not disclosed (sequential, not concurrent).**
- **Finding:** `demo/stories/primitives/card.vue` is modified by W12 (stages backdrop), W20 (ToggleGroup re-roll), W24 (extends with affordances). W24:51 falsely claims "the card story is W24's" and omits W20. Sequencing serializes them; false claim violates WAVE_SPEC §4a. **Fix:** W24 §4a must name card.vue as shared with W12+W20, state it EXTENDS post-W20 state, add W20 to Depends-on.
- **File:Line:** AW.W24-glass-cards.md:45,51 vs AW.W20-styling-assay.md:46

---

### Fold/Wave-Seed Disposition

**NO NEW WORK REQUIRED.** Every request from RECAP is carried into an existing wave with explicit consumer claim. Stale items already struck (light-dark double-nest, per-rung rim family). Deferred ≥2-consumer items properly marked KEEP-BOOK (NutritionLabel, `/deck` lift, Drawer `:native`).

**For close (W27):** Post-B1-B4 fixes, run W27 reconciliation (gate registry, README cite cross-checks, overfitting audit tally). All five blockers are intra-band wiring + close-manifest, not new wave-scope.

---

## TIGHT BRIEF

**AW/H Tranches — Cogency Audit Findings**

The AW/H tranche briefs are complete, well-researched, and coherent. Glass-atoms band (W22-W26) is **true DRY consolidation**: every new primitive clears the ≥2-consumer overfit gate; the band routes onto committed component spines (W12/W13/W18/W20) with disjoint file-bounds. H is a clean consumer (no AW-primitive re-implementation; Constellation RAF-swap is W17's 2nd-consumer evidence).

**5 intra-band blockers (W22↔W24 card collision driven by stale "W23 card work" ref; W22 dock-unify no-write-access; W26 false disjointness on badge/toggle/toast; W27 gate→wave off-by-one; W12 born-GREEN light-dark gate)** + **4 refines (phantom rim family, W23 `.glass-refract` re-home, W24 card-story shared-write undisclosed, aria-invalid scope redundancy)** must be reconciled before dispatch.

**File:Lines:** AW.W22:8,18,39 (dock/Card); AW.W24:21,47,51; AW.W26:6,47,74; AW.W27:17,66,79; AW.W12:19,59; AW.W23:16; glass-specular-track.css:146; dock.css:84-90,352.

**No overfit, no fold/wave-seeds, no new work.** Fix the five blockers + four refines in the identified waves and re-submit for final harden.

---

## Lane 7 — overfit-waves-scope

Now I have a comprehensive READ-ONLY audit picture. Let me compile the findings into a tight markdown report.

---

## AUDIT FINDINGS — AW/H COGENCY-HARDEN ROUND

**Scope:** Deep READ-ONLY audit of AW (glass-ui) + H (slides) tranches, final-harden integrity verification. Examined: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md`, `RECAP.md`, all audit digests, wave specs (W0–W18), plus `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md` and H wave files (W1–W10).

**Verdict: NOT CONVERGED.** Engineering substance is sound; the blockers are **charter↔wave-file divergence** and **five missing wave files** promised by AW.md that implement no scope.

---

### BLOCKER CLUSTERS

#### **CLUSTER 1: AW.md Charter Gate Names Are Fabricated**

The §2 wave table names gates that exist in no wave file or script:

| Wave | Charter gate name | Actual wave file gates |
|------|---|---|
| W1 | `proof:dock-collapse-live` | `proof:dock-animation-live` |
| W2 | `proof:dock-lockstep-live` | `proof:dock-animation-live`, `proof:spring-tokens-synced` |
| W3 | `proof:dock-spring-unify` | `proof:dock-layering-polish` |
| W4 | `proof:aurora-structure-tensor` | `proof:aurora-tensor-field`, `-impasto-relight`, `-vangogh-preset`, `-oilpastel-medium` |
| W5 | `proof:aurora-oklch-strokes` | `proof:aurora-oklch-interp`, `proof:aurora-derive-gamut` |
| W6 | `proof:aurora-options-slim` | `proof:aurora-atoms-roundtrip` |
| W7 | `proof:aurora-webgpu-gated` | `proof:aurora-wgsl-equivalence`, `proof:aurora-backend-fallback` |
| W16 | `proof:deckprogress-consumer` | `proof:deck-progress-math` |
| W17 | `proof:canvas2d-substrate-consumer` | `proof:constellation-substrate-single` |
| W18 | `proof:aw-final` | `proof:input-invalid-aria` |

**Fix:** Reconcile `AW.md:102-119` §2 gate column to the wave-file ids (wave files are the authoritative source).

#### **CLUSTER 2: W16↔W17 Numbering Inverted**

`AW.md:117–118` assigns W16=Constellation, W17=DeckProgress. The wave **files** are inverted:
- `AW.W16-deckprogress.md` (file W16 = DeckProgress)
- `AW.W17-constellation-component.md` (file W17 = Constellation)

The §3 ownership table (`AW.md:131`) and §4 crosswalk (`AW.md:155–158`) inherit the wrong numbering. H.W4 correctly cites `AW.W16` for Constellation, which now matches **neither** the charter **nor** the file.

**Fix:** Re-number the charter §2/§3/§4 rows to **W16=DeckProgress, W17=Constellation**.

#### **CLUSTER 3: Charter W18 Close Wave Has No File; Actual W18 File Has Wrong Content**

**AW.md:119** defines W18 as the **close ceremony**: register every AW gate in `gates.mjs`, gate `proof:aw-final`, the **four research-backed READMEs (dock/aurora/blob/constellation)**, the overfitting audit, the π visual-runtime lane, `FINAL.md` with a green run-id per wave.

The actual `AW.W18-gate-pattern.md` is a **brand-new access-modal gate-idiom wave** — the `.input-pill [aria-invalid]` ring widening + a pattern doc, gate `proof:input-invalid-aria`. This content appears **nowhere** in the charter (no `input-invalid`, `aria-invalid`, `gate-pattern`, `show-close` row).

**Two integrity failures:**
1. The gate-pattern/aria-invalid is legitimate (convergence-digest Lane 4 F1/F2; ≥2-consumer: demo + slides DeckGate) but has **no charter row** — it must be added as a numbered wave.
2. The charter's **real W18 (gate-fleet close + 4 READMEs + π lane + FINAL)** has **no wave file**. The tranche has no close wave.

**Fix:** Split into two waves — give the gate-pattern its own number (recommend renaming actual W18 to W19: **new W18 = gate-pattern idiom**, add it to charter §2; **author the real close as AW.W19** carrying gate-fleet registration + π lane + 4 READMEs + FINAL).

#### **CLUSTER 4: H.md Cross-Repo Hinges Fire on Phantom `AW.W24`**

The H wave files cite **`AW.W24`** for the DeckProgress publish hinge — **31 occurrences**. AW has no W24 (max is W18 post-reorg). H.W2-progress-polish.md lines: 6, 9, 12, 14, 29, 32 (and more).

DeckProgress is actually `AW.W16` (post-swap). Meanwhile `H.md:30,89,90` correctly cite `AW.W17` for the same hinge context (confusing but in the Charter).

**Fix:** Re-point every `AW.W24` → `AW.W16` in H wave files; grep `AW.W24` → 0.

#### **CLUSTER 5: Five Charter-Promised Deliverables Have No Wave File**

| Deliverable | Charter cite | Reality | Wave home |
|---|---|---|---|
| AW.W0 spot-verify ledger + `PROGRESS.md` | `AW.md:25,101` | No `waves/AW.W0-*.md`, no `PROGRESS.md` | **Author AW.W0 spec** |
| Orphan resolution (D-10: instrument/glyph/metric prune) | `AW.md:45,115` | W14 file is DataTable-split only; zero orphan/instrument/glyph mention | **New wave or fold into W14** |
| `proof:orphan-resolved` + `proof:no-god-module` gates | `AW.md:115` | No wave implements these gates | **Attach to orphan wave** |
| Metric-cell/metric-stack hidden-dep surface + clean prune | `AW.md:45,116` | No wave carries it | **New prune wave or fold into orphan** |
| Styling assay (brittle calc→token, Tabs pill-track, ToggleGroup re-roll) | `AW.md:116` | W15 file is colocation/naming-hygiene only; zero Tabs/ToggleGroup mention | **New styling-assay wave or restore into W15** |

---

### MAJOR REFINES

#### **AW.W1 Regression Reality Disputed**

`AW.W1-dock-collapse-regression.md:91–95` asserts the root cause: "stacked-grid measures MAX of the two layers' content, collapsing `toSize == fromSize`."

**Reality:** `dock.css:589–590` sets `.dock-layer:not(.layer-active) { position: absolute }` — the inactive layer is **out of flow**, so the grid's intrinsic width is the **active** layer's width, not a max.

The `<0.5` no-op the wave anchors (`useLayerTransition.ts:285`) is additionally `!live`-gated (fires only on fresh swap).

**Fix:** Run the existing `proof:dock-animation-live` against the 3.3.0 build **before dispatch**. If GREEN on a working collapse, the "born-RED on 3.3.0" regression witness is unsubstantiated.

#### **AW.W1 Gate-Coverage Premise Inverted**

W1 claims the existing gate sampled DockLayerGroup-switch (AV.W9's fix path) and left GlassDock-collapse unsampled.

**Reality:** `proof-dock-animation-live.mjs:80–81` selects `.glass-dock.collapsed`, measures `.dock-layers` width — i.e. the GlassDock outer collapse. The demo route `/navigation/dock` has **zero** `DockLayerGroup` (verified: `grep -c DockLayerGroup demo/stories/navigation/dock.vue` = 0).

**So the existing gate already covers the W1 path.** The "widening" may be a no-op.

**Fix:** Empirically verify before Band A dispatch.

#### **AW.W3 Drops Slider Scope**

Charter D-3 (`AW.md:38`) + §2 row W3 (`AW.md:104`) task W3 with "dock-with-slider `keepDockOpen` interaction" + gate "`keepDockOpen` holds the dock open."

The actual `AW.W3-dock-layering-rail-wrap.md` has **zero** slider/keepDockOpen mention (verified: grep → 0).

**Fix:** Restore slider arm to W3 scope + gate, or move the disposition row and record where it lands.

#### **AW.W16 (DeckProgress) Overshoots Its Cited Digest Mandate**

`convergence-digest Lane 4 F3:386–388` explicitly mandates: *"a `.glass-progress-rail` CSS recipe… **NOT a second progress component**. Defer unless a second consumer appears."*

`AW.W16-deckprogress.md:19–22` ships instead:
- Full `DeckProgress.vue` component
- `deckProgress(index, total)` math helper
- **New `src/subpaths/deck.ts` `/deck` subpath**
- `package.json` exports + `api/index.ts` entries

The `/deck` subpath name **squats the reserved deck-engine namespace** — every cited digest flags `/deck` as the slides-local engine-lift that STAYS slides-local (convergence-digest:79, 411, 423).

**Fix:** Either (a) demote to `.glass-progress-rail` CSS recipe + `:value`-only thin wrapper, drop the math helper + `/deck` subpath, **OR** (b) escalate to triumvirate and rename the subpath off `/deck` (e.g., `/deck-progress`).

#### **AW.W17 (Constellation) 2nd-Consumer Muster Repeats AV.W8's Trap**

AV.W8 gate: "slides consumer is cross-repo PENDING; does NOT count toward ≥2 until it resolves; the in-repo ≥2 must be met by TWO resolving-at-HEAD glass-ui consumers."

W17 names consumer #1 = demo story (in-repo, resolves) + consumer #2 = H.W10 (cross-repo, **PENDING** — not landed).

**That is one resolving-at-HEAD consumer — the same condition that gated AV.W8.** By AV.W8's own binding rule, W17 cannot assert "bar clears" while consumer #2 is pending.

**Fix:** Land a genuine 2nd in-repo consumer, OR carry the wave GATED-NOT-LANDED pending H.W10 (matching AV.W8's original gate).

#### **AW.W13 Goo-Blob `var()` Throw Is Orphaned**

Charter D-8 (`AW.md:114`) + §2 W13 row (`AW.md:113`) task W13 with "fix the goo-blob `var(--primary)` throw (`defaultBlobColorResolver`→`cssToOklch(var(--primary))` per-frame throw) + console-clean gate."

The actual `AW.W13-affordance.md` has **zero** goo-blob/resolver/cssToOklch mention (verified: grep → 0). This is a confirmed live runtime bug (code-quality-digest Lane 2; `cssToOklch` throws on `var()` every frame).

**Fix:** Add resolver/story fix to W13 scope + console-clean gate, or assign it to a blob wave.

---

### FOLD/WAVE SEEDS

**Recommended wave reorg to converge:**

1. **AW.W0** — Formalize + spot-verify ledger (EXISTS/rg-count/alias-resolved for every retire candidate)
2. **AW.W1–W18** — Keep as-is but reconcile charter gate names to wave-file ids
3. **AW.W18 (RENAME)** → Gate-pattern idiom (`[aria-invalid]` ring + pattern doc) · `proof:input-invalid-aria`
4. **AW.W19 (NEW)** → Orphan resolution (instrument/glyph/metric migrate-off-and-remove OR keep-document, post W0 ledger) · `proof:orphan-resolved`
5. **AW.W20 (NEW, renamed from W19)** → Gate-fleet close + 4 READMEs (dock/aurora/blob/constellation) + π lane + FINAL · `proof:aw-final`
6. **Styling-assay (NEW)** → Brittle calc→token, Tabs pill-track token, ToggleGroup re-roll · `proof:styling-hygiene` (EITHER fold into W15 or rename W15, or add as W21)

**Cross-arm:**
- **Rename `H.W2-progress-polish.md`** line 31+ all `AW.W24` → `AW.W16`
- **Reconcile H §0/§2 to refer to actual AW numbers** (post-swap: DeckProgress=W16, Constellation=W17, gate-pattern=W18, close=W20)

---

### DESIGN-LANGUAGE COGENCY

**Verdict: SOUND.** The warm-cream-glass + iOS-26-Liquid-Glass + consumer-layered NCSU-red spine is consistently applied across AW dock/aurora/blob/glass-panel and H deck/XRAY. The AI-Nutrition-Label idiom is correctly scoped to SlideXray (H.W7) with FDA-broadsheet brutalism preserved. No design dissonance found.

**W12 light-dark born-GREEN gate is a no-op** (struck per digest) — `light-dark(light-dark())` does NOT exist at HEAD.

**WebGPU aurora W7 "staged" not "landed"** — correct per AV.SOTA; the wave gates on navigator.gpu-detection fallback.

**No overfit springs:** the dock regression is a real behavioral gate; the aurora OKLCh + derive-color + painterly arc are research-backed; the blob surface-normal + Fresnel rim are digest-faithful; the component fixes (glass-panel tier collapse, cream affordances, DataTable split) are targeted. The only overfit risk is **AW.W16 DeckProgress (shipping a `/deck` namespace + math helper against a CSS-recipe-only mandate)**.

---

**FINAL:** Reconcile the two charters to the realized 20-wave set (AW: W0–W20 post-reorg; H: W1–W10), author the five missing waves, and resolve the seven localized defects (W1 regression-reality, W3 slider, W13 goo-blob, W16 DeckProgress scope, W17 2nd-consumer, H.W10 third pulse-dot, H proof:* missing scripts). The engineering substance is execution-ready once the planning-integrity layer closes.

---

## Lane 8 — duplication-cross-wave

Now let me synthesize the findings systematically by analyzing the actual cross-wave patterns:

Based on my deep audit of the AW/H tranches (37 waves across glass-ui and slides), here are the DUPLICATION findings and fold/wave seeds:

---

## CROSS-WAVE DUPLICATION AUDIT — AW/H TRANCHES (37 WAVES)

### FINDING SUMMARY

The AW/H tranches are largely **well-delineated and non-duplicative** at the file-ownership level. However, three concrete duplication patterns emerge across wave boundaries:

#### 1. **SHARED SHADING COLOR CORE — spreads AW.W4/W5/W9/W11 (file:line)**

**Duplication:** AW.W4 (aurora painterly), W5 (aurora OKLCh), W9 (blob droplet), and W11 (blob mood/iridescence) all reference `procedural-color.glsl.ts` as the single source for OETF/FBM/OKLCh matrices — **but duplicate application at the shader call-site.**

- **AW.W4:128** — aurora van-Gogh medium consumes OKLCh jitter at paint-over stage
- **AW.W5:129** — aurora OKLCh interp migrates palette interpolation onto shared core
- **AW.W9:133** — blob specular/Fresnel/iridescence reuse shared `procedural-color.glsl.ts`
- **AW.W11:135** — blob mood iridescence + SSS splice the same chunk again

**Root cause:** W4 and W9/W11 each independently reference the matrix but do NOT coordinate on jitter seam timing or premultiplication correctness across the two GLSL contexts.

**ONE-OWNER FIX:** Fold W5 (aurora OKLCh core) to open **FIRST** (already planned), so W4's van-Gogh medium consumes W5's jitter constants without re-splicing. W9 and W11 then consume W5's constants read-only. **Move the jitter-seam coordination into W5's gate** (`proof:aurora-oklch-interp`), where it belongs.

**Fold/wave-seed:** No new wave; **W5 opens before W4** (already spec'd); W9/W11 reference W5's landed constants, not re-splice.

---

#### 2. **PRNG DUPLICATION — AW.W17 vs H.W4 (file:line)**

**Duplication:** Both `Constellation` (AW.W17) and slides' local `constellation.ts` (H.W4) hand-roll `mulberry32` PRNG.

- **AW.W17:141** — `Constellation` component on `useCanvas2D` substrate "consumes glass-ui's `prng` (`mulberry32`/`hashString`, **NO private copy**)"
- **H.W4:77** — constellation-visibility refactor "replace local `mulberry32` with `prng.ts`"

**Root cause:** The audit specifies AW.W17 should consume the **existing** `src/utils/prng.ts`, but H.W4 (slides-local constellation token refactor) independently copies the function.

**ONE-OWNER FIX:** AW.W17 establishes `useCanvas2D` consuming glass-ui's canonical `prng.ts` (mulberry32 + hashString, no fork). H.W4 then **reads** that landing and de-dupes onto it. This is a **sequential dependency, not a parallel duplication** — the fix is ordering: **W17 lands before H.W4 consumes it**.

**Fold/wave-seed:** No new wave. **H.W4 depends on AW.W17 landing**; H.W4's "replace local `mulberry32`" folds into H.W4's existing scope once W17 ships.

---

#### 3. **GLASS-BG TOKEN SHADOWING — H vs AW design-language (file:line)**

**Duplication:** Slides' `deck.css:373–375` **redeclares** glass-ui's token names `--glass-bg-wash/quiet/resting` with hardcoded `hsl()` values, breaking the single-source-of-truth precept.

- **AW.W22:145** — "glass-material unify" routes every atom onto the spine (`--glass-bg-{variant}` tiers)
- **H.W7:79** — "xray-restyle" is H's largest token re-map

**Root cause:** The code-quality digest (`code-quality-digest.md:125`) flags: "slides `deck.css:373–375` redeclares glass-ui's exact token names (`--glass-bg-wash/quiet/resting`) with hardcoded `color-mix(in srgb, hsl(30 14% 22%) 40%, transparent)` — silently shadowing glass-ui's parameterized recipe."

**ONE-OWNER FIX:** Remove the hardcoded redeclarations from `deck.css`. Slides' `.dark`/`.slide--dark` arm **overrides glass-ui's inputs** (`--card` + `--glass-opacity-*`) on the cascade cascade, NOT the output names. This is an **H.W-fix wave** (deferred to H, not AW scope).

**Fold/wave-seed:** **New H wave: `H.W-glass-token-fix`** (small, styling-only) — `grep -c 'glass-bg-wash\|glass-bg-quiet\|glass-bg-resting' deck.css == 0`; remove the three hardcoded lines; dark-arm glass surfaces render at parity. Opens after H.W6 (lock-removal), before H.W7 (xray-restyle).

---

#### 4. **CONSTELLATION GATE-NAME SHARED FIX — AW.W17 + H.W4/H.W10 (coordination)**

**Duplication (soft):** The "2nd-consumer unblock" for `Constellation` is split across three waves with a subtle gate-name coordination issue.

- **AW.W17:141** — `proof:constellation-substrate-single` (the glass-ui component lands)
- **H.W4:76** — constellation-visibility refactor (slides-local RAF swap proves 2nd consumer)
- **H.W10:83** — constellation-component consumption (optional consume, gated on 3.4.0)

**Root cause:** The audit (avg-deep-audit-digest.md §2, row 10) states: "H.W4 lands the constellation token refactor + the RAF-composable swap (the 2nd-consumer evidence) BEFORE H.W10's optional `Constellation`-component consume, so the **AW.W17 gate flips on H.W4's landing regardless of the publish timing**."

This is **intentional sequencing**, not duplication, but the gate-naming could align: AW.W17's `proof:constellation-substrate-single` names H.W4's RAF swap as consumer #2 evidence.

**ONE-OWNER FIX:** Coordinate gate-naming: **H.W4's gate includes the phrase "2nd-consumer evidence for AW.W17"** in the test assertion, so the two waves' gates reference each other bidirectionally.

**Fold/wave-seed:** No new wave. Document in the H.md §2 wave table that **H.W4 closes the AW.W17 ≥2-consumer gate**; the "hard gate" for H.W4 explicitly notes this.

---

#### 5. **DECK-PROGRESS CONSUMPTION — AW.W16 + H.W1/H.W2 (ordering)**

**Duplication (soft):** Two H waves consume the AW.W16 `DeckProgress` composition without clear ownership split.

- **AW.W16:140** — "`DeckProgress` composition" over existing `Progress` fill
- **H.W1:73** — dock-consume (pins glass-ui ^3.4.0, the `DeckProgress` consumer)
- **H.W2:75** — progress-polish (contrast + tokenization, the `DeckProgress` tuning)

**Root cause:** H.W1 fires the pin bump + consumes the generic `DeckProgress` math; H.W2 polishes the deck-specific chrome (track contrast, fill identity, token-ization). This is **clean separation** (generic math vs slides-local styling), but could be clearer.

**ONE-OWNER FIX:** The wave split is correct — W1 consumes, W2 perfects. No change needed. **Document in H.md §2**: "H.W1 consumes the AW.W16 `DeckProgress` composition via the 3.4.0 pin bump; H.W2 tunes the slides-specific chrome (contrast, fill identity, tokenization) over that composition."

**Fold/wave-seed:** No new wave. Clarify the dependency in wave table: H.W2 "Opens after H.W1" + "depends on AW.W16 landing."

---

#### 6. **GLASS-PANEL TIER COLLAPSE — AW.W12 + H-arm feedback loop (design-language)**

**Duplication:** The glass-panel tier-honoring fix (AW.W12) targets a bug the H arm may inherit if not coordinated.

- **AW.W12:136** — GlassPanel tier-collapse fix (the five-rung ladder collapses to wash on default svg-filter tier)
- **H.W7:79** — xray-restyle (pulls shared cream spine, but XRAY has orphaned `.glass-panel` fork in `main.css:13-16`)

**Root cause:** The frontend-convergence-digest (code-quality-digest.md:103–104) flags XRAY's "dead `.glass-panel` orphan (`main.css:13-16`) from a retired glassmorphic layer, contradicting `tokens.css:8` ('Glassmorphism intentionally omitted')."

The AW.W12 fix lands on glass-ui; XRAY's local orphan stays orphaned unless H explicitly removes it.

**ONE-OWNER FIX:** H.W7 (xray-restyle) includes a **delete step**: remove XRAY's dead `.glass-panel` from `main.css`. This prevents XRAY from shadowing glass-ui's fixed tier after 3.4.0 ships.

**Fold/wave-seed:** **Fold into H.W7** — add to the restyle scope: "Delete the dead `.glass-panel` orphan from `main.css:13-16`; XRAY uses glass-ui's tier system if it needs glass (via Dialog, not local panel)."

---

#### 7. **AURORA JITTER SEAM TIMING — AW.W4 re-reads W5 constant (coordination)**

**Duplication:** The aurora van-Gogh medium (W4) consumes the OKLCh jitter seam from W5, but the seam's "timing" (when jitter applies in the paint-over pass) is not unified across the smooth and van-Gogh mediums.

- **AW.W4:128** — "van-Gogh medium (tensor strokes + impasto + **OKLCh jitter**)"
- **AW.W5:129** — "OKLCh jitter seam" defined and consumed by painterly arc

**Root cause:** The spec says W5 "opens FIRST in the band" and W4 "consumes its jitter seam," but the **application context** (smooth vs van-Gogh vs oil-pastel) is not locked to one jitter function signature.

**ONE-OWNER FIX:** W5's gate (`proof:aurora-oklch-interp`) must include a **jitter-signature assertion** that proves every medium (smooth, oil-pastel, van-Gogh) applies the same jitter function with the same uniform parameterization. Lock the seam's API at W5 close, so W4 consumes it read-only.

**Fold/wave-seed:** No new wave. **Strengthen W5's gate** to include jitter-signature parity: `proof:aurora-jitter-signature` — every medium's `uOklchJitter` parameter is identical in type and range across all render paths.

---

### SUMMARY TABLE: CROSS-WAVE DUPLICATION + FIXES

| Duplication | Waves involved | Fix type | Fold/seed |
|---|---|---|---|
| Shared GLSL color matrices (jitter, OKLCh, premult) | AW.W4, W5, W9, W11 | Coordination | W5 opens first; W4/W9/W11 consume W5's constants read-only (no re-splice) |
| PRNG hand-roll (mulberry32) | AW.W17, H.W4 | Ordering | AW.W17 lands useCanvas2D/prng.ts first; H.W4 consumes it, no fork |
| Glass-bg token shadowing | H.W7 (deck.css) | Cleanup | **New H wave: H.W-glass-token-fix** — remove hardcoded `--glass-bg-*` redeclarations; override inputs on cascade instead |
| Constellation 2nd-consumer gate | AW.W17, H.W4, H.W10 | Gate naming | H.W4's gate explicitly notes "2nd-consumer evidence for AW.W17"; coordinate gate reference |
| DeckProgress consumption | AW.W16, H.W1, H.W2 | Docs clarity | No new wave; document H.W2 depends on H.W1/AW.W16 in wave table |
| Glass-panel orphan in XRAY | AW.W12, H.W7 | Cleanup | Fold into H.W7: delete dead `.glass-panel` from XRAY `main.css:13-16` |
| Aurora jitter seam timing | AW.W4, W5 | Specification | Strengthen W5's gate: add `proof:aurora-jitter-signature` for uniform parity |

---

### FINAL FOLD/WAVE-SEED LIST

**No AW changes** — all duplication is handled by design (W5 opens first, W4/W9/W11 read-only) or ordering (AW.W17 before H.W4).

**H additions (slides):**

1. **H.W-glass-token-fix** (NEW, small, styling-only) — Remove glass-ui token shadowing from `deck.css:373–375`. Opens after H.W6, before H.W7. Gate: `grep -c 'glass-bg-' deck.css == 0` (except in `@theme` lines).

2. **H.W7 (xray-restyle)** — Existing wave; add deletion: remove XRAY `main.css:13-16` dead `.glass-panel` orphan as part of the restyle scope.

3. **H.md §2 clarification** — Document dependency chain for W1/W2/W4/W10 on AW publishing and cross-wave gates (H.W4 = AW.W17 2nd-consumer proof).

4. **AW.W5 gate enhancement** — Add jitter-signature assertion (`proof:aurora-jitter-signature`) to lock the OKLCh jitter function signature before W4 consumes it.

**Result:** All 37 waves (AW W0-W27 = 28, H W1-W10 = 10, minus W21 retired = 37) are **non-duplicative** after these seeds land. The shared `procedural-color.glsl.ts` remains the single source; the PRNG is canonical; token names are not forked; gates are coordinated across repos.

---

## Lane 9 — duplication-src-dry

Perfect. Now I have all the information I need. Let me compile the DRY findings from my analysis of the source code and the tranche documentation.

---

## DRY AUDIT BRIEF — AW/H Tranches (READ-ONLY; Lane "duplication-src-dry")

### Findings Summary

The AW/H glass-atoms band (W22-W26) and component band (W12-W15/W20) demonstrate **substantive DRY-consolidation with disjoint file-bounds**, but harbor several **internal cross-wave duplications and false-positive DRY claims** rooted in stale wave-number references. H (slides) is a pure consumer with no primitive re-implementation. Below: findings mapped to source + fold/wave-seed list.

---

### FINDINGS (file:line / wave)

#### Category 1: Specular & Rim Token Duplication

**F1.1 — Dock rim is a parallel-surface singleton, not a glass-ladder rung**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:52-91`
- Issue: `.glass-dock` hand-rolls `background: var(--glass-bg-dock)`, `backdrop-filter: var(--dock-surface-blur)`, and `box-shadow: var(--glass-edge-light), var(--shadow-dock)` as a **parallel sixth surface** with its own `--glass-*-dock` token family (not composing `.glass-wash`/`-quiet`/`-resting`/etc). W22 promises dock inherits the `.glass-material` mixin but does not add `dock.css` to its file bounds (W22:31-40 omits it).
- Wave: **AW.W22** (glass-material-unify). Blocker B1: requires `dock.css` write or scope drop.

**F1.2 — Card specular opt-in carve contradicts W24's pointer-seam wiring**
- File: `/Users/mkbabb/Programming/glass-ui/src/components/ui/card/Card.vue:77`
- Issue: W22:39 carves the `glass-specular-track` class string out of Card (states "owned by W23 card work"), but W23 is `glass-material-sota` (NOT card work; card wave is W24). W24:21,47 then reads that class as still present to wire the pointer-write seam. After W22's carve, W24's mechanism references a deleted seam.
- Wave: **AW.W22** (stale "W23 card work" ref) → **AW.W24** (inherits broken premise). Blocker B3 + stale cross-ref.

**F1.3 — Dock `::before` collision: instrument-strip + specular both claim the same pseudo**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:352` (instrument-strip `.glass-dock.variant-instrument-strip::before` engraved-bezel stroke) vs folding specular `::before` from mixin
- Issue: W22 §3a names triumvirate trigger for `::after`/content-`::before` collision but misses the live instrument-strip `::before` at line 352. Folding specular onto dock via `.glass-material` collides head-on.
- Wave: **AW.W22** (unify mechanism). Blocker B2: requires pseudo-ownership clarification (specular on `.dock-icon-button` control, not dock shell).

#### Category 2: Phantom / Stale Token Family Claims

**F2.1 — Per-rung `--glass-edge-light-{wash..overlay}` family does not exist**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:700-701`
- Issue: W22:18 hedges "alpha may still step per rung via the existing `--glass-edge-light-{wash..overlay}` family if present." Grep confirms only `--glass-edge-light` + `--glass-edge-light-dark` exist (no per-rung family).
- Wave: **AW.W22** (phantom family). Refine R2: strike hedge; state rim is uniform by design.

**F2.2 — Born-GREEN no-op gate on double-nested `light-dark()`**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` (search returns 0 matches)
- Issue: W12:19,59 targets collapsing double-nested `light-dark(light-dark())` with gate `grep -c 'light-dark(\s*light-dark(' … returns 0`. Construct does NOT exist at HEAD; gate is born-GREEN, not born-RED (violates born-RED discipline).
- Wave: **AW.W12** (glass-panel-fix). Refine: strike scope item 3 + gate clause.

#### Category 3: Radius Token Over-Use (No Deduplicated Field Rung)

**F3.1 — `--radius-pill: 9999px` used universally across form controls without `--radius-field` rung**
- Files: `/Users/mkbabb/Programming/glass-ui/src/styles/theme.css` (definition), `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css` (multiple uses), `/Users/mkbabb/Programming/glass-ui/src/components/ui/switch/Switch.vue:29`, `/Users/mkbabb/Programming/glass-ui/src/components/ui/slider/Slider.vue` (css border-radius)
- Issue: Every rounded form control (Switch, Slider, Textarea, Input, Select, Button-pill, Toggle-pill) reaches for `--radius-pill` (9999px) or `rounded-pill` utility. No `--radius-field` semantic rung exists at HEAD (W25:§4 born-RED confirms this). Hard-coded 9999px creates brittle field-radius literals across the family instead of a unified token.
- Wave: **AW.W25** (primitives-perfection). Born-RED gate 1 requires minting `--radius-field`/`--radius-control` rungs to consolidate these uses.

#### Category 4: Press & Motion Spring Token Duplication

**F4.1 — `--scale-press` unified but `--scale-press-dock` still shadows the canon**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` (multiple definitions)
- Issue: Tokens define `--scale-press: 0.96` (the canonical iOS Liquid Glass value), then immediately define `--scale-press-dock: var(--scale-press)`. AT.W7 dock-b re-unified these (previously dock had a separate `0.92` value). The separate token exists but now points to the canon — no actual duplication at execution, but the alias pattern is a mild DRY smell (one source being read through an alias).
- Wave: **AV.W15** (shipped). No AW action needed (canon is unified now).

**F4.2 — `--dock-press-spring` and `--spring-dock` are separate tokens that should be one**
- File: `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css`
- Issue: Tokens define both `--dock-press-spring: var(--duration-fast) var(--spring-bouncy)` (composite: duration + spring) and separately reference `--spring-dock` (spring only). The dock-controls consume both independently (see dock-controls.css). No semantic difference; should be one authored token.
- Wave: **AW.W3** (dock-motion-unify). W2 scope item 3 (W2:26) cites re-tuning `DOCK_SPRING` + `--spring-dock` together — fold the composite `--dock-press-spring` alias into that retuning.

#### Category 5: Focus-Ring & Invalid-Aria Paint Duplication

**F5.1 — `.focus-ring:focus-visible` rule exists; `.input-pill` rule already paints `[aria-invalid]`**
- Files: `/Users/mkbabb/Programming/glass-ui/src/styles/utilities.css:140-144` (`.focus-ring` class) vs `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css:328-342` (`.input-pill:user-invalid` paint)
- Issue: W26 claims `.input-pill` and other controls lack aria-invalid paint and W26 must supply it. Verified: `glass.css:328-342` ALREADY paints destructive border + `color-mix` bg + ring on `.input-pill:where(:user-invalid, .user-invalid-fallback)`. W18 widens the selector to `[aria-invalid="true"]`. For Input/Textarea (both consume `.input-pill`), the paint is redundant post-W18. Only three non-`input-pill` controls (SelectTrigger, NumberFieldInput, ComboboxInput) need aria-invalid paint in W26.
- Wave: **AW.W26** (reka-idiom). Refine: narrow aria-invalid carve to the three non-`input-pill` controls.

**F5.2 — Checkbox + Switch + Textarea lack focus-ring but use `:focus-visible` in reka**
- Files: `/Users/mkbabb/Programming/glass-ui/src/components/ui/checkbox/Checkbox.vue:24` (no `.focus-ring` class), `/Users/mkbabb/Programming/glass-ui/src/components/ui/switch/Switch.vue:29` (no `.focus-ring` class), `/Users/mkbabb/Programming/glass-ui/src/components/ui/textarea/Textarea.vue` (off-label Textarea uses `input-pill`)
- Issue: Checkbox + Switch hand-roll reka focus styling rather than composing the `.focus-ring` utility class. If AW.W25 universalizes `.focus-ring` on ALL interactive atoms, these must be updated to use it.
- Wave: **AW.W25** (primitives-perfection). Gate-1 born-RED target confirms this (missing `.focus-ring` on Accordion/Collapsible triggers; Checkbox/Switch must also inherit).

#### Category 6: Card-Story 3-Wave Shared Write (Hidden DRY Collision)

**F6.1 — `demo/stories/primitives/card.vue` is modified by W12, W20, AND W24**
- File: `/Users/mkbabb/Programming/glass-ui/demo/stories/primitives/card.vue`
- Issue: W12:38 modifies the file to stage the backdrop. W20:46 modifies it to re-roll ToggleGroup tier controls. W24:45 modifies it to extend with four new affordance rows. The three waves are sequenced (W20 after W12, W24 after W12) so it's not a concurrent race, but W24:51 falsely claims "the card story is W24's" and makes no mention of W12/W20.
- Wave: **AW.W24** (glass-cards). Refine: acknowledge shared 3-wave write; update §10 Depends-on to list W12+W20.

#### Category 7: Stale Wave-Number Maps in Digests

**F7.1 — W27 close registers glass-atoms gates with wrong wave attribution (off-by-one)**
- Files: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W27-close.md:17,66,79`
- Issue: W27 registers `proof:glass-material-unified + -sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. Realized wave files own: W22=unified, W23=sota, W24=card-tiers, W25=primitive-affordance, W26=reka-binding. W27's own §3 states "wave-FILE ids are authoritative" but the parenthetical map is the digest synthesis order (digest W23=card, W24/W25=primitives), not the realized file order. Closes `FINAL.md` will mis-cite which gate proves which wave if this map is wrong.
- Wave: **AW.W27** (close). Blocker B4: correct wave→gate attribution at lines 17, 66, 79.

**F7.2 — W26 §4a carries the digest's stale wave-number roles**
- File: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W26-reka-shadcn-tailwind-idiom.md:74`
- Issue: W26:74 asserts "W26 shares NO modify path with W23 (card subcomponents + cards.css), W24 (radius/Switch/Checkbox geometry)." The realized files are W23=material-sota, W24=card-subcomponents, W25=radius/Switch/Checkbox. W26's boundary note has roles shifted by one (echoing the digest's synthesis order). The disjointness *conclusion* is correct, but the labels mis-map for a reader.
- Wave: **AW.W26** (reka-idiom). Refine R2: re-label to realized wave roles (W23=sota, W24=cards, W25=primitives).

#### Category 8: Transition-Control Conflict (False Disjointness)

**F8.1 — Badge + Toggle `transition-colors` target value conflict between W25 and W26**
- Files: `/Users/mkbabb/Programming/glass-ui/src/components/ui/badge/index.ts` + `/Users/mkbabb/Programming/glass-ui/src/components/ui/toggle/index.ts`
- Issue: W25:60 edits Badge to change `transition-colors` → `transition-control`. W26:47 edits Badge to change `transition-colors` → `transition-all`. Same token, mutually exclusive target values. W26:74 falsely claims "shares NO modify path with W25."
- Wave: **AW.W25** (primitives-perfection) vs **AW.W26** (reka-idiom). Blocker B5: decide single owner (recommend W25 owns the `transition-control` migration; W26 drops the `transition-all` on Badge, adds only icon-sizing/gap).

**F8.2 — Toast.vue material + refactor collision between W25 and W26**
- File: `/Users/mkbabb/Programming/glass-ui/src/components/ui/toast/Toast.vue`
- Issue: W25:61 modifies Toast to compose `glass-floating` material + tone rows. W26:43 modifies Toast to refactor to `useForwardPropsEmits` + drop provider nesting. Both write the same file. W25 §3a:37 flags this; W26:74 denies disjointness.
- Wave: **AW.W25** vs **AW.W26**. Blocker B5: sequence explicitly (W26.a after W25's Toast material carve).

---

### FOLD/WAVE-SEED LIST

#### Into Existing Waves (DRY folds)

| Existing Wave | Fold/Consolidation | Rationale |
|---|---|---|
| **AW.W22 (glass-material-unify)** | **Dock rim consolidation: drop dock from band matrix OR add `dock.css` to file bounds** | F1.1/B1: dock is not a ladder rung; cannot inherit `.glass-material` without touching `dock.css`. Choose: (a) compose `.glass-material` onto `.glass-dock` + retire `dock.css:90` local rim, OR (b) drop dock from the band-uniformity gates and acknowledge it stays a parallel surface. Current promise has no write access. |
| **AW.W22 (glass-material-unify)** | **Card specular opt-in: do NOT carve `Card.vue:77` class; hand ownership to W24** | F1.2/B3: W22:39 carves the class W24 needs. Fix: drop `Card.vue` from W22's carve set; W22 retires only Button + DockIconButton opt-ins. Card class stays until W24 owns the Card material pass holistically. |
| **AW.W22 (glass-material-unify)** | **Dock `::before` collision: clarify pseudo ownership (specular on button, not dock shell)** | F1.3/B2: instrument-strip `::before` + folded specular `::before` collide. Gate 2 must mount `.dock-icon-button`, not `.glass-dock`, for the specular assertion. |
| **AW.W22 (glass-material-unify)** | **Strike phantom per-rung edge-light family; confirm rim is uniform by design** | F2.1/R2: `--glass-edge-light-{wash..overlay}` doesn't exist. Strike hedge "if present"; state rim uniform across all rungs. |
| **AW.W12 (glass-panel-fix)** | **Drop scope item 3 + born-GREEN light-dark gate (no-op on HEAD)** | F2.2/R: double-nested `light-dark()` doesn't exist; grep returns 0 trivially. Born-GREEN violates discipline. Strike the scope item + gate clause. |
| **AW.W25 (primitives-perfection)** | **Mint `--radius-field` / `--radius-control` semantic rungs; consolidate 9999px form-control uses** | F3.1: every rounded form control (Switch, Slider, Textarea, Input) reaches for `rounded-pill` (9999px) rather than a unified field rung. Born-RED gate 1 requires these tokens. |
| **AW.W3 (dock-motion-unify)** | **Fold `--dock-press-spring` alias into `DOCK_SPRING` + `--spring-dock` retuning** | F4.2: composite token `--dock-press-spring: var(--duration-fast) var(--spring-bouncy)` shadows the canon. W2 scope item 3 cites retuning both together; unify into one authored source. |
| **AW.W18 (gate-pattern / aria-invalid selector)** | **Extend selector widening to include `:user-invalid` + `.user-invalid-fallback` alongside `[aria-invalid="true"]`** | F5.1: `.input-pill` rule already paints on `:user-invalid`; W18 must widen to all three members for uniformity. |
| **AW.W26 (reka-idiom)** | **Narrow aria-invalid paint carve to three non-`input-pill` controls (SelectTrigger, NumberFieldInput, ComboboxInput)** | F5.1: Input/Textarea already paint post-W18 widened rule. Only the three need W26 paint. |
| **AW.W25 (primitives-perfection)** | **Universalize `.focus-ring` onto Checkbox, Switch, all interactive atoms; remove hand-rolled focus styling** | F5.2: Checkbox + Switch lack `.focus-ring` class; must inherit gate-1's universalization. |
| **AW.W24 (glass-cards)** | **Acknowledge `demo/stories/primitives/card.vue` as 3-wave shared write with W12 + W20; add to Depends-on** | F6.1: W24 modifies the same story W12 stages and W20 re-rolls. Correct disjointness statement to reflect sequence. |
| **AW.W27 (close)** | **Correct glass-atoms gate→wave attribution (off-by-one map): unified(W22), sota(W23), card-tiers(W24), primitive-affordance(W25), reka-binding(W26)** | F7.1/B4: W27 maps gates to wrong waves. Affects `FINAL.md` run-id citation. Must match wave-FILE ids. |
| **AW.W26 (reka-idiom)** | **Re-label stale wave-number map in §4a to realized roles (W23=sota, W24=cards, W25=primitives)** | F7.2/R2: digest synthesis order ≠ realized file order. Boundary note mis-maps for readers tracing back to files. |
| **AW.W25 (primitives-perfection)** | **Own `transition-control` migration; W26 composes onto it, not competing with `transition-all`** | F8.1/B5: Badge/Toggle both claim `transition-colors`; single owner needed. W25 owns the transition-discipline sweep. |
| **AW.W26 (reka-idiom)** | **Sequence Toast.vue refactor after W25's material carve (W26.a); do NOT clobber W25's `glass-floating` + tone rows** | F8.2/B5: Toast is shared between W25 (material) + W26 (refactor). Must serialize explicitly. |

#### New Waves to Add (DRY deficits)

| New Wave | Scope | Rationale |
|---|---|---|
| **AW.W.X — Radius semantic rungs (slots W24.5 or Band-F extension)** | Mint `--radius-field` + `--radius-control` tokens; consolidate all form-control hardcoded 9999px uses onto these tokens; remove `rounded-pill` brittleness from Textarea, Input, Select, Switch, NumberField. | F3.1: No semantic rung at HEAD. W25 gate-1 born-RED requires these. Recommend: author as a styling-assay extension or slot between W24+W25. |
| **AW.W.Y — Transition-discipline unify (extends W26)** | Move all `transition-colors`/`transition-*` form-control overrides into a single `transition-control` family; audit every UI atom for brittle transition literals (see F4.2 pattern). Retire the composite `--dock-press-spring` alias; author one canonical source. | F4.2/F8.1: `transition-colors` is repeated across Badge, Toggle, Toast; `--dock-press-spring` shadows `--spring-dock`. Single-source these under one discipline. Recommend: fold into AW.W26 or a dedicated motion-tokens-unify wave. |

---

### Summary

The glass-atoms band (W22-W26) achieves **substantive DRY consolidation with correct file-bound disjointness** (W24 != W12, W25 != W13) — no duplication of committed work. However, the band carries **5 blocking and 9 refining defects**, all rooted in:
1. **Stale wave-number cross-references** (digest synthesis ≠ realized file order) leaking into three docs (W22:39, W26:74, W27:17/66/79).
2. **W22's unify mechanism meeting real source constraints** (dock is not a ladder rung, Card carve contradicts W24).
3. **Hidden multi-wave shared writes** (card.vue, Toast.vue, Badge/Toggle tokens) with false disjointness claims.

**No new duplication of the component band** (W12/W13/W14/W15/W20) materializes. **H is converged and clean** (pure consumer, no AW re-implementation).

Fold/wave-seed list targets: 14 folds into existing waves (wave-level tweaks + scope reachings), 2 new waves to add (radius rungs, transition unify). All rooted in DRY violations spanning files and token declarations.

---

## Lane 10 — chronic-deferred

Now I have everything I need. Let me produce the final audit report:

## AW/H Tranche Cogency-Harden Round — READ-ONLY Audit Findings

### EXECUTIVE SUMMARY

The AW/H tranches are **NOT convergent**. The engineering is sound (the research digests, the SOTA techniques, the DRY discipline, and the warm-cream + iOS-26 + consumer-red design spine all trace cleanly to the live source), but the **planning integrity layer is broken:** both charter documents (AW.md and H.md) diverge sharply from their wave files, fabricating gate-names that do not exist, swapping wave numbering (W16↔W17), citing phantom files, and failing to author five charter-promised deliverables. Additionally, AW carries seven localized content defects (including a falsified W1 root-cause and a dropped W3 scope). The tranches cannot dispatch in this state.

---

## FINDINGS (File:Line)

### BLOCKER CLUSTER A — Charter ↔ Wave-File Divergence (Spanning All Bands)

**1. Fabricated Gate Names (All Dock, Aurora, Blob bands)**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:102–104` — The §2 table cites gates that do NOT exist in any wave file or scripts:
  - W1 charter gate `proof:dock-collapse-live` → real gate: `proof:dock-animation-live` (file: `AW.W1-dock-collapse-regression.md:8,99,106`)
  - W2 charter gate `proof:dock-lockstep-live` → real gate: `proof:dock-animation-live` + `proof:spring-tokens-synced` (file: `AW.W2-dock-motion-unify.md:8,109,116`)
  - W3 charter gate `proof:dock-spring-unify` → real gate: `proof:dock-layering-polish` (file: `AW.W3-dock-layering-rail-wrap.md:8,134,156`)
  - W4 charter gate `proof:aurora-structure-tensor` → real gates: `proof:aurora-tensor-field`, `proof:aurora-impasto-relight`, `proof:aurora-vangogh-preset`, `proof:aurora-oilpastel-medium` (file: `AW.W4-aurora-painterly.md:8`)
  - W5 charter gate `-oklch-strokes` → real gates: `proof:aurora-oklch-interp`, `proof:aurora-derive-gamut` (file: `AW.W5-aurora-color-derive.md:8`)
  - W9/W10/W11 blob gates similarly fabricated (file: `/docs/tranches/AW/audit/harden-fixlist.md:225–232`)

**2. Aurora Decomposition Reversed**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:106–110` — The §2 rows contradict the wave files on the aurora band structure:
  - Charter W4 = "structure-tensor + Kuwahara" (should be the four-fold painterly arc per file)
  - Charter W5 = "van-Gogh + OKLCh + derive" (should be OKLCh color core per file)
  - Charter W6 = "DELETE overfit knobs" (PRUNING) — real W6 is ADDITIVE `resolveAtoms` door (opposite)
  - Correct to: W4 = four-fold painterly (tensor + impasto + van-Gogh + oil-pastel), W5 = OKLCh + derive, W6 = additive atoms

**3. Three Non-Existent File Citations**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:115` — cites `waves/AW.W14-datatable-split-hygiene.md` (real file: `AW.W14-datatable-split.md`)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:116` — cites `waves/AW.W15-styling-composable-assay.md` (real file: `AW.W15-hygiene.md`)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:119` — cites `waves/AW.W18-gate-pattern-close.md` (real file: `AW.W18-gate-pattern.md`)

### BLOCKER CLUSTER B — W16↔W17 Swap + Missing Close Wave

**4. Wave Numbering Inverted**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:117–118` — Charter assigns W16=Constellation, W17=DeckProgress; files are inverted:
  - Real: `AW.W16-deckprogress.md`, `AW.W17-constellation-component.md`
  - §3 ownership rows (`:131`) and §4 crosswalk (`:155–158`) inherit the swap
  - Fix: Renumber charter rows to W16=DeckProgress, W17=Constellation

**5. Close Wave Content Swapped Away**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:119` — Charter W18 row declares "(the close wave, LAST): gate-fleet registration + `proof:aw-final` + four research-backed READMEs (dock/aurora/blob/constellation) + overfitting audit + π visual-runtime lane + `FINAL.md`"
- Real `AW.W18-gate-pattern.md` is an access-modal `aria-invalid` ring idiom — a legitimate wave but with no charter row
- **Blocker:** The entire close ceremony (gate registration, READMEs, FINAL.md, π lane) has NO wave file

### BLOCKER CLUSTER C — Five Charter Deliverables Without Wave Files

**6. AW.W0 Spot-Verify DEV Wave Missing**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:101,124` — Charter declares AW.W0 (DEV, "formalize + spot-verify") with gate `proof:aw-w0-reground`
- No `waves/AW.W0-*.md` file exists; no `PROGRESS.md` exists
- Status: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/` directory lists no W0 files
- **Blocker:** The W0 spot-verify ledger is the prerequisite for all retirement waves (inv P7: `:233`)

**7. Orphan Resolution Wave Missing**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:45,115` — Charter D-10 + §2 row fold instrument-chassis/rail + glyph-face/disco-glyph orphan resolution into W14
- Real `AW.W14-datatable-split.md` is DataTable-split ONLY (grep: zero `orphan|instrument|glyph|spot-verify`), gate `DataTable.vue ≤380`
- **Blocker:** No wave owns `proof:orphan-resolved` + `proof:no-god-module`

**8. metric-cell/stack Prune Wave Missing**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/RECAP.md:20` — Cites "hidden dep must be surfaced before the prune"
- AW.md folds into W14; real W14 omits entirely
- **Blocker:** No wave addresses the metric-cell/stack hidden dependency

**9. Styling Assay Wave Missing**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:116,120` — Charter W15 = brittle-magic-number→token + Tabs pill-track + demo raw-`<button>`→`<ToggleGroup>` + `use-token-color` public-vs-reference doc
- Real `AW.W15-hygiene.md` is colocation/naming-hygiene only (return-types + `twin-line-divider` + `useTokenColor` injection seam) — NO tokenization, NO Tabs/ToggleGroup
- **Blocker:** No wave ships `proof:styling-hygiene`

**10. drawer-live-behind Audit Silently Dropped**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/RECAP.md:28` — Lists it as FOLD
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md` grep `drawer|live-behind` → 0 (no charter row, no wave)
- **Blocker:** No disposition recorded; audit is orphaned

### BLOCKER CLUSTER D — AW Dock-Band Root-Cause Falsified

**11. W1 Root Cause Does Not Match Source**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W1-dock-collapse-regression.md:91–95` — Wave asserts "stacked-grid measures the MAX of the two layers' content"
- Real source: `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:589–590` sets `.dock-layer:not(.layer-active) { position: absolute; inset: 0 }` — inactive layer is OUT of flow; grid measures only the active layer
- **Blocker:** The prescribed fix ("read the ACTIVE layer's intrinsic width") targets a cause the CSS already implements; diagnosis is falsified

**12. W1 Born-RED Witness Is Inverted**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W1-dock-collapse-regression.md:166–168` — Archaeology claims "prior gate sampled DockLayerGroup-switch path while GlassDock-collapse went unsampled"
- Real: `scripts/proof-dock-animation-live.mjs:80–83` selects `.glass-dock.collapsed` (GlassDock own collapse); `:137–140` measures `.dock-layers` width (outer pair); demo route has zero `DockLayerGroup` (verified: grep)
- Existing gate already covers W1's target path
- **Blocker:** The "born-RED on 3.3.0" claim is unsubstantiated; must run the existing gate against 3.3.0 build to verify the regression exists

**13. W3 Dropped Scope: dock-with-slider keepDockOpen**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:38,104` — Charter D-3 + §2 W3 row task W3 with "fix the dock-with-slider `keepDockOpen` interaction"
- Real `AW.W3-dock-layering-rail-wrap.md`: zero slider/keepDockOpen mention (verified: grep)
- **Blocker:** Orphaned charter obligation

### BLOCKER CLUSTER E — Blob-Band Phantom Symbols

**14. useSpringOrchestrator Phantom**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W10-blob-interaction.md:24,103` — Scope 1 + W10.a cite "reuse `useSpringOrchestrator`"
- No such file exists; real composable is `useSpring` (wraps `SpringProgress`, exposes value+velocity)
- **Blocker:** Phantom reference

**15. Proof-Script Path Convention Mismatch**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W9-blob-droplet.md:71`, `AW.W10:117`, `AW.W11:101` — All place blob gates at `scripts/proof/blob-*.mjs`
- Repo convention: flat `scripts/proof-<name>.mjs` (verified: `proof-dock-animation-live.mjs`, `proof-aurora-capture.mjs` at root, no `proof/` subdir)
- **Blocker:** Path convention mismatch

**16. W11 Cross-Band Write Conflict Unlisted**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W11-blob-mood.md:79` — Scope hoists `AuroraHarmony`/`deriveHue`/`gamutMapStop` from `aurora/composables/color.ts`
- AW.W5 already owns `color.ts` as `modify` (real: `AW.W5-aurora-color-derive.md` color-core work)
- W11's File Bounds does not list `color.ts`
- **Blocker:** Unlisted cross-wave write conflict; explicit dependency + modified file must be added to W11 File Bounds

### BLOCKER CLUSTER F — Component-Band Orphaned Fixes

**17. goo-blob var() Throw Fix Orphaned**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md:44,114` — Charter D-8 + W13 task "fix the goo-blob `var()` throw (`defaultBlobColorResolver`→`cssToOklch` feeds `var(--primary)` to value.js which throws)"
- Real `AW.W13-affordance.md`: zero goo-blob/resolver/cssToOklch mention
- **Blocker:** Live runtime bug, no wave owns it

### BLOCKER CLUSTER G — DeckProgress Scope Overreach

**18. W16 Violates Cited Digest Mandate**
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/waves/AW.W16-deckprogress.md:1` — Cited authority (convergence-digest Lane 4 F3; charter `:158`) mandates "a `.glass-progress-rail` CSS recipe composing `<Progress>`, NOT a second progress component"
- Real: Ships `DeckProgress.vue` component + `deckProgress(index,total)` helper + NEW `/deck` subpath (File Bounds: `:59`, `:74`)
- `/deck` name squats the reserved slides-local deck-engine namespace (flagged across all three digests as stay-local)
- **Blocker:** Scope overreach; violates ≥2-consumer rule (slides consumer is cross-repo PENDING, only demo story consumer is in-repo)

### BLOCKER CLUSTER H — Slides H Charter Divergence

**19. 31 Cross-Repo Consume Hinges Cite Phantom AW.W24**
- `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md` — Multiple H waves (H.W2, H.W4, H.W6, H.W10) cite `AW.W24` for DeckProgress/Constellation/DialogForm
- Real: AW tops at W18 (W16=DeckProgress, W17=Constellation, W18=gate-pattern)
- **Blocker:** 31 forward references are broken

**20. H §2 Cites Fictional proof:* Scripts**
- `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md:§2` — Gates cite `proof:xray-spine`, `proof:xray-mobile`, `proof:deck-copy-conformance`, `proof:figure-dedup`
- slides `package.json`: zero `proof:*` scripts exist
- **Blocker:** No gate scripts to run

**21. H.W10 De-Dup Misses Third Pulse-Dot**
- `/Users/mkbabb/Programming/slides/docs/tranches/H/waves/H.W10-dedup.md` — De-dups SlideXray + SlideNutrition pulse-dot
- `/Users/mkbabb/Programming/slides/src/components/Slide09.vue:147–156` — Carries a third `.live-tag .dot` + `@keyframes pulse-dot` copy
- **Blocker:** Incomplete de-dup; third copy survives

---

## CHRONIC-DEFER LEDGER (Existing KEEP-BOOK Items)

These items are explicitly carried in the audit digest with stated triggers. They should be formally tracked in the fold/wave-seed list:

| Item | Trigger | Status |
|---|---|---|
| `proof:webgl-golden` (blob pixel-golden headless capture) | Stable headless WebGL2-live frame runner lands | KEEP-BOOK (audit: `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/avg-deep-audit-digest.md:49`) |
| OffscreenCanvas + Worker (RAF main-thread contention) | Profiled LoAF regression | KEEP-BOOK |
| `text-box-trim` SFC consumer | A real SFC consuming component surfaces | KEEP-BOOK (0 consumers at HEAD) |
| anchor-positioning (dock popovers) | A consumer needing native anchor (not blocker) | KEEP-BOOK (reka PopperContent is sufficient) |
| Drawer `:native` / `GlassNativeDrawer` | A TRUE 2nd native consumer (not vaul-vue) | KEEP-BOOK (slides `mode="live-behind"` partially discharged) |
| role-typed `<Role>Dock` base | A 2nd consumer surfaces | KEEP-BOOK (no current demand) |
| `interpolate-size` / `calc-size()` native size morph | Cross-engine support lands | KEEP-BOOK (Chromium-only, FLIP+spring is sole path) |
| Scroll-driven `scroll()`/`view()` native | Firefox unflips | KEEP-BOOK (flag-gated, `@supports`-primary posture correct) |

---

## FOLD/WAVE-SEED LIST

**Missing waves that must be authored before tranche close:**

1. **AW.W0 — Spot-Verify DEV Wave** (PREREQUISITE for W14/W19/W20 retirement gates)
   - Fold into: NEW wave (prerequisite rank)
   - Carries: PROGRESS.md + spot-verify ledger (EXISTS + verbatim-rg-count + alias-resolved verdict for instrument-chassis/glyph-face/metric-cell/metric-stack orphan candidates)
   - Gate: `proof:aw-w0-reground`

2. **Orphan Resolution Wave** (D-10 charter obligation)
   - Fold into: NEW wave (rename W14 to include, or dedicated wave post-W0)
   - Carries: migrate-off-and-remove OR keep-and-document verdict per W0 ledger (instrument-chassis/rail, glyph-face/disco-glyph)
   - Gate: `proof:orphan-resolved` + `proof:no-god-module`

3. **metric-cell/stack Prune Wave** (D-10 charter obligation)
   - Fold into: Orphan-resolution wave OR new dedicated prune wave
   - Carries: surface the metric-cell/stack hidden dependency FIRST (born-RED), then clean removal
   - Gate: Born-RED hidden-dep gate + zero-residue verification

4. **Styling Assay Wave** (D-15 charter obligation)
   - Fold into: NEW wave (or restore into W15 + rename the file to `-styling-assay`)
   - Carries: brittle calc/magic-number→token tokenization + Tabs pill-track sizing + demo raw-`<button>`→`<ToggleGroup>` re-roll + `use-token-color` public-vs-reference documentation
   - Gate: `proof:styling-hygiene`

5. **Close Wave** (W27 in charter, no W18)
   - Fold into: NEW wave (W19 or `AW.W-close.md`)
   - Carries: gate-fleet registration in `gates.mjs` + `proof:aw-final` + four research-backed READMEs (dock/aurora/blob/constellation) + overfitting audit + π visual-runtime lane + `FINAL.md` citing green run-id per wave
   - Rename current W18 gate-pattern OUT of the "LAST" slot and author its own §2 row in charter

6. **drawer-live-behind Composition Audit** (RECAP §7, orphaned)
   - Fold into: NEW §0 disposition row + covering wave OR fold into W12 with explicit gate, OR close as no-defect-found with evidence

**Corrections/refolds for existing waves:**

7. **W1 (dock-collapse-regression)** — REFOLD
   - Blocker: Verify the regression exists by running `proof:dock-animation-live` against the 3.3.0 build
   - If GREEN: the regression may not exist; re-diagnosis required before dispatch
   - If RED: the fix stands but the root-cause diagnosis (`dock.css:589` already handles it) must be corrected
   - Fix charter gate name: `proof:dock-collapse-live` → `proof:dock-animation-live`

8. **W2 (dock-lockstep)** — REFOLD
   - Refine: Opacity-on-spring-driver contradicts digest's own no-overshoot rule; justify via either critically-damped companion OR override the digest rule explicitly
   - Refine: `proof:spring-tokens-synced` assertion (overshoot band) is new work not in File Bounds; add to bounds or move to `proof-dock-animation-live.mjs`
   - Refine: Retune target lands in existing "bouncy" register (digest calls it "playful, too much for system dock"); either alias to bouncy (DRY) or justify the difference

9. **W3 (dock-layering-rail-wrap)** — REFOLD
   - Blocker: Restore the slider scope (`keepDockOpen` + slider-in-dock) or move the charter D-3 disposition row
   - Refine: Add the `overflow="wrap"` showcase to demo story BEFORE the gate can sample it
   - Refine: Name where the born-RED `W3-layering-polish.json` is captured (MCP/dev env) — mirror W1/W2's explicit capture clauses

10. **W5 (aurora-color-derive)** — REFOLD
    - Blocker: Fix charter open-order: W5 opens BEFORE W4 (not after), per both wave files and dependency

11. **W10 (blob-interaction)** — REFOLD
    - Blocker: Replace phantom `useSpringOrchestrator` → `useSpring` (File Bounds + Scope)
    - Blocker: Change proof-script path to flat convention `scripts/proof-blob-*.mjs`
    - Refine: "hardcoded repulsion" is imprecise; real defect is zero default (`pointerAttraction=0.0`); reword scope

12. **W11 (blob-mood)** — REFOLD
    - Blocker: Add `src/composables/color.ts` (modify) to File Bounds; declare dependency on W5
    - Blocker: Change proof-script paths to flat convention
    - Blocker: Extend the `proof:single-color-core` gate to NEW detection class (deriveHue-fork grep + blob-consumes-`ColorHarmony` import check)

13. **W13 (affordance)** — REFOLD
    - Blocker: Add goo-blob `var()` throw fix + console-clean gate (or fold to blob wave)

14. **W15 (hygiene)** — REFOLD
    - Refine: `twin-line-divider` is NOT a clean single-`@utility` extraction (child vs pseudo-element geometry); target is `--divider-catch-light`/`--divider-under-shadow` token pair instead
    - Refine: `use-token-color` public-vs-reference split is only PARTIALLY covered; add doc scope + gate clause

15. **W16 (deckprogress)** — REFOLD
    - Blocker: Demote to `.glass-progress-rail` CSS recipe + thin wrapper, dropping math helper and `/deck` subpath; OR escalate scope divergence to triumvirate + rename subpath off `/deck` (e.g. `/deck-progress`)
    - Refine: Fold 2nd-consumer ledger into gate (verify both live consumers at close, not cross-repo-pending)

16. **W17 (constellation)** — REFOLD
    - Refine: Land a genuine 2nd in-repo consumer OR carry GATED-NOT-LANDED pending H.W10 (do not claim ≥2-consumer bar cleared pre-ship)
    - Refine: Clarify `Canvas2DSuspendReason` — extract backend-agnostic union OR commit to local twin with rationale

17. **W18 (gate-pattern)** — REFOLD
    - Charter row mismatch: Add explicit §2 row in AW.md (currently buried as "W18" close placeholder)

18. **H.W1** — REFOLD
    - Blocker: Specify whether `tests/e2e/dock-collapse.spec.ts` is new or addition to existing `deck.spec.ts`

19. **H.W2–H.W10** — REFOLD (Cross-arm hinges)
    - Blocker: Replace 31 occurrences `AW.W24` → correct wave number (W16 for DeckProgress, W17 for Constellation, W18 for DialogForm)
    - Blocker: Replace fictional `proof:*` scripts with actual evidence checks (render-matrix, greps, typecheck, build)
    - Blocker: Complete pulse-dot de-dup to include Slide09 third copy

---

## SUMMARY

The **engineering substance is sound** across both tranches. The SOTA techniques, the DRY discipline, the design language coherence, and the ≥2-consumer vetting all trace cleanly to the digests and the source. However, the **planning-integrity layer is fractured:**

- **Blocker Count: 21** (Charter↔wave divergence, 5 missing waves, 7 localized content defects, W1 falsified root-cause, W3 dropped scope, 3 cross-repo hinge errors, H de-dup undercount)
- **Refine Count: ~30** (Opacity driver, spring-token path, dock-layer collisions, aurora LIC drop, blob precision, component story overlap, canvas suspend-reason, styling assay scope, H.W7 typeface contradiction, etc.)

Neither tranche can close until the **five missing waves are authored**, the **charter↔file divergences are reconciled** (gate-names, W16↔W17 swap, file-cites, aurora decomposition), and the **seven localized defects are resolved** (W1 diagnosis re-verified empirically, W3 slider restored, W10 phantom symbol fixed, W11 cross-band write conflict listed, W13 goo-blob throw addressed, W16 scope reined to digest mandate, H cross-repo hinges re-pointed).

The fold/wave-seed list above delineates each item and its target — whether it folds into a new wave, an existing wave with a renamed file, or carries as a formal KEEP-BOOK trigger.

---

## Lane 11 — deferred-aw-h

Perfect. Now let me synthesize this comprehensive audit into a concise report for the user:

## AW/H COGENCY-HARDEN AUDIT — FINDINGS + FOLD/WAVE SEEDS

### FINDINGS BY CATEGORY

**HIGH-PRIORITY CONVERGENCE BLOCKERS (5)**

1. **W22 dock-inheritance mechanism has NO write access** (`glass-material-unify.md:18,35` vs source `dock.css:52-91`)
   - W22 promises "dock tier's rim becomes `.glass-material` inheritance" but `dock.css` is absent from W22 File Bounds (W22:31-40). Dock hand-rolls its own `--glass-*-dock` token family + `--glass-edge-light`/`--shadow-dock` box-shadow — a parallel sixth surface, not a ladder rung.
   - **Fix:** Add `src/styles/dock.css` to W22 File Bounds as `modify-carve` (compose `.glass-material` onto `.glass-dock`, retire local rim at `dock.css:90`), OR drop dock from band-uniformity matrix (gates 2/3).

2. **W22 dock `::before` pseudo-element collision** (`dock.css:352` + `dock.css:231`)
   - `.glass-dock.variant-instrument-strip::before` (engraved-bezel inner stroke) collides with W22's specular `::before`. W22's triumvirate trigger names `::after`/content-`::before` but misses live `::before`.
   - **Fix:** Dock specular must live on `.dock-icon-button` (control), not `.glass-dock` (shell); re-home Gate 2 matrix target accordingly.

3. **W22→W24 Card specular carve contradicts W24 specular wiring** (`AW.W22:39` vs `AW.W24:21,47`)
   - W22 carves `glass-specular-track` class from `Card.vue:77` (W22 File Bounds:39); W24 wires pointer seam "on that exact class." W22:39 hands pointer seam to "W23 card work" — but W23 is `glass-material-sota` (refraction/squircle/tint, NO card work); card wave is W24.
   - **Fix (two coupled):** (a) W22:39 change "owned by W23 card work" → "owned by W24 card work"; (b) W22 must NOT carve Card's `glass-specular-track` string — drop `Card.vue` from W22's carve set. W22 retires Button + DockIconButton opt-ins only. Card class stays until W24 holistically owns Card material pass.

4. **W26 false disjointness + token contradiction with W25** (`AW.W26:6,74` vs File Bounds tables)
   - `badge/index.ts`: W25:60 sets `transition-colors`→`transition-control`; W26:47 sets `transition-colors`→`transition-all`. Same token, mutually-exclusive values.
   - **Fix:** W25 owns `transition-control` migration (it owns transition-discipline sweep); W26 drops `transition-colors`→`transition-all` on badge, adds ONLY icon-sizing/gap composing onto W25's `transition-control`.

5. **W27 gate→wave attribution off-by-one** (`AW.W27:17,66,79`)
   - W27 registers `proof:glass-material-sota(W22)` + `proof:glass-card-tiers(W23)` + `proof:primitive-affordance(W24/W25)`. Realized files: W22=`unified`, W23=`sota`, W24=`card-tiers`, W25=`primitive-affordance`, W26=`reka-binding-idiom`.
   - **Fix:** Correct W27:17/:66/:79 to `unified(W22) / sota(W23) / card-tiers(W24) / primitive-affordance(W25) / reka-binding-idiom(W26)`.

**DEFERRED ITEMS (EXPLICIT TRIGGERS)**

**W7 (Aurora WebGPU, gated)** — Line:131, AW.md §0 row D-6
- **Trigger:** Limited Baseline status per AV's SOTA crosswalk; `navigator.gpu` detection lands.
- **Disposition:** FOLD into W7 (born-RED, real blocker today — WebGL2 single-pass cannot afford multi-tap tensor + per-stroke compute; W7 is the only path for Gaussian-smoothed tensor).
- **Status:** AW-COMMITTED; no re-litigation.

**Orphan resolution (W0 spot-verify → W19 execution)** — Line:45 (D-10), Line:124 (W0 gate)
- **Items deferred:** instrument-chassis (real consumers: GlassDock `variant="instrument-strip"`, InstrumentChassis←InstrumentRail); glyph-face/disco-glyph (provide/inject silhouette + demo consumers); metric-cell/metric-stack (true orphans but hidden dep restoring them in AV.W10).
- **Trigger:** Mandatory W0 spot-verify (every path EXISTS, every rg-count re-run verbatim, all re-export aliases resolved). Surface metric-cell/stack hidden dep FIRST.
- **Disposition:** FOLD into W19 (post-W0 verdict, either migrate-off+remove OR keep+document with one-line rationale).
- **Status:** W0 gate binding; W19 executes ledger, does not re-adjudicate.

**Drawer-live-behind composition audit** — Line:28 (RECAP :28), Line:144 (W20)
- **Trigger:** The "wtf" composition route audit.
- **Disposition:** FOLD into W20 (styling-assay wave; W20:144 notes "drawer-live-behind + native-top-layer dropped-audits are dispositioned").
- **Status:** Disposition stated at W20; no separate wave needed.

**Glass-atoms band (W22-W26) convergence blockers** — NOT converged (summary: 5 blockers, 9 refines)
- **Core issue:** W22's unify mechanism (dock-not-a-ladder-rung + Card-carve↔W24 collision) + digest→file renumber off-by-one (W26/W27 stale wave-number maps).
- **Sound:** band↔component DRY is clean (W22-W26 compose OVER W13/W18/W12 on disjoint declarations); W23's four SOTA folds are genuinely born-RED; H is converged (pure consumer).
- **Status:** 5 blockers are intra-band (W22→W24) + close-manifest (W27) mis-wirings, NOT the W12/W13 duplication feared.

---

### FOLD/WAVE SEED LIST

Each entry: the existing wave it folds into OR a new wave to add.

| Deferred item | Folds into | Trigger | Status |
|---|---|---|---|
| **W7 Aurora WebGPU** | **Fold into W7** | Limited Baseline unflips (WebGL2 fallback path blocks W7 close) | AW-COMMITTED (born-RED) |
| **Orphan: instrument-chassis/rail** | **Fold into W19 (orphan-prune)** | W0 spot-verify + consumer-count re-run | AW-GATED on W0 |
| **Orphan: glyph-face/disco-glyph** | **Fold into W19** | W0 spot-verify + alias-resolution | AW-GATED on W0 |
| **Orphan: metric-cell/stack + hidden dep** | **Fold into W19** | W0 spot-verify (surface dep FIRST, then prune) | AW-GATED on W0 |
| **Drawer-live-behind audit** | **Fold into W20 (styling-assay)** | No separate wave (W20:144 dispositions it) | AW-COMMITTED |
| **Glass-atoms W22 dock-inheritance blocker** | **REWORK W22 File Bounds + gate scope** | Fix B1 (add `dock.css` to W22 OR drop dock from matrix) | BLOCKING |
| **Glass-atoms W22 dock `::before` collision** | **REWORK W22 gate 2 target** | Fix B2 (dock specular on control, not shell) | BLOCKING |
| **Glass-atoms W22→W24 Card carve collision** | **REWORK W22 File Bounds carve set** | Fix B3 (drop Card from W22 carve; W24 owns Card material) | BLOCKING |
| **Glass-atoms W26 badge/toggle token contradiction** | **REWORK W26 File Bounds + W25 sequencing** | Fix B5 (W25 owns `transition-control`; W26 composes onto it) | BLOCKING |
| **Glass-atoms W27 gate attribution off-by-one** | **REWORK W27 §3 close-manifest map** | Fix B4 (correct wave-number annotations at W27:17/:66/:79) | BLOCKING |

---

### H (SLIDES) DEFERRED ITEMS

**Converged: H.W1-W10 is PURE CONSUMER + locally-sound.**
- H.W4 (constellation RAF-swap + `prng.ts` adoption) is the 2nd-consumer evidence that flips AW.W17 gate (H.W4 lands before H.W10's optional Constellation-component consume).
- H.W10 de-dups onto SHIPPED glass-ui primitives (`StatusDot`/`MetricBadge`) only; forbids any glass-ui `src/` edit.
- Lock-removal (H.W6, supersedes earlier gate-restyle ask) is explicit, no ambiguity.

No H deferred items; H is ready to proceed once AW.W1/W2/W16/W17 (the dock fix + DeckProgress + Constellation) publish.

---

### PRECEPT VIOLATIONS + INTEGRITY CHECKS

- **P2 (gestalt transposition):** W22's dock inheritance promise is structurally false against source (dock.css reveals dock is NOT a ladder rung). This is a SOURCE-vs-SPEC mismatch, not a design error — **FIX required before W22 gate can pass.**
- **P1 (no legacy/alias):** W22→W24 Card carve + W26→W25 token contradiction violate the no-double-declare principle (the same surface/token claimed by two waves with incompatible targets). **FIX required before band closes.**
- **π visual-runtime lane:** All visual waves (W1-W3 dock, W4-W11 aurora/blob, W12-W13 component, W22-W26 glass-atoms) carry π render-matrix gates (≥3 viewports, ≥5 frames, WCAG-AA contrast) — **binding at close; tooling-contingency clause applies if headless automation unavailable.**

---

### CONVERGENCE VERDICT

**NOT CONVERGED (5 blockers, 9 refines).** Glass-atoms band (W22-W26) is genuinely DRY-consolidation on verified disjoint declarations — **NO re-implementation of W12/W13 feared.** But W22's unify mechanism (dock-not-a-ladder-rung + Card-carve↔W24 collision, rooted in stale "W23 card work" ref) and W26/W27 digest→file renumber off-by-one must reconcile. H is **CONVERGED** — pure consumer, no glass-ui re-implementation; H.W4 solves AW.W17's 2nd-consumer gate at HEAD before optional H.W10 component consume.

---

## Lane 12 — fe-encapsulation

Perfect. Now I have everything I need to compile the findings. Let me create the final audit report:

---

## FINDINGS: AW/H TRANCHE FRONTEND ENCAPSULATION AUDIT

### Executive Summary

The AW/H tranches are **DRAFTED + COMMITTED** with comprehensive audit digests. The lane **"fe-encapsulation"** focuses on composables, useX patterns, state/store management, and consistency across glass-ui. Key findings:

**Encapsulation & Composable Consistency: GAPS IDENTIFIED**
- **Return-type naming inconsistency:** ≥9 public composables lack `Use<Name>Return` interface exports (e.g., `useCountup` returns `Countup`, `useAnimatedNumber` returns `AnimatedNumber`, `useNumericTransition` / `useGlobalDark` / `useGlassRenderer` return inline objects, `useScrollProgress` returns bare `Ref<number>`). Breaks discoverability and violates Vue convention.
- **Reference-hygiene gap:** `useTokenColor.ts:69` implicitly reads `document.documentElement` with no injection seam for SSR/testing — DI closure incomplete.
- **State/Store cohesion:** Dock state machine (353 lines) sits at boundary; click-away logic is orthogonal and extractable.
- **Colocation:** Exemplary discipline — component composables properly nested under `composables/` subdirs. No orphans.
- **DI pattern:** Canonical `createStrictContext`/`createOptionalContext` factories (AV.W14) are textbook — 6 call sites consistent, type-safe, Readonly enforcement proven by test.

**Specifics with file:line:**

| Category | Finding | File:line | Wave |
|---|---|---|---|
| **Return-type naming** | `useCountup` exports `Countup` (not `UseCountupReturn`) | `/src/composables/motion/useCountup.ts:27` | AW.W21 |
| **Return-type naming** | `useAnimatedNumber` exports `AnimatedNumber` (not `UseAnimatedNumberReturn`) | `/src/composables/motion/useAnimatedNumber.ts:22+` | AW.W21 |
| **Return-type naming** | `useNumericTransition` returns inline object (no interface) | `/src/composables/motion/useNumericTransition.ts` | AW.W21 |
| **Return-type naming** | `useGlobalDark` returns inline object (no interface) | `/src/composables/dark/useGlobalDark.ts` | AW.W21 |
| **Return-type naming** | `useGlassRenderer` returns inline object (no interface) | `/src/composables/glass/useGlassRenderer.ts:246` | AW.W21 |
| **Return-type naming** | `useScrollProgress` returns bare `Ref<number>` (idiomatic primitive but undiscoverable) | `/src/composables/motion/useScrollProgress.ts:111` | AW.W21 |
| **Return-type naming** | `useKeyboardShortcuts` returns cleanup fn + `useRegisteredShortcuts` returns `ComputedRef` (no interface) | `/src/composables/keyboard/useKeyboardShortcuts.ts` | AW.W21 |
| **Return-type naming** | `useSidebarState` exports generic `GenericSidebarState<T>` + `SidebarState` (non-prefixed) | `/src/composables/sidebar/useSidebarState.ts:56-59` | AW.W21 |
| **Reference-hygiene** | `useTokenColor.ts:69` reads `document.documentElement` directly; no injection seam for SSR | `/src/composables/dom/useTokenColor.ts:69` | AW.W21 (hygiene fold) |
| **Size & cohesion** | `useAurora.ts` at 339 LOC; scheduler + lifecycle (lines 74-126) extractable to `scheduleAuroraArm.ts` | `/src/composables/glass/aurora/useAurora.ts:74-126` | AW.W7-W12 (aurora research) |
| **Size & cohesion** | `useMetaballRenderer.ts` at 370 LOC; uniform-config logic (UNIFORM_NAMES, POS_SCALE) extractable to `metaballConfig.ts` | `/src/composables/custom/goo-blob/useMetaballRenderer.ts:55-70` | AW.W13-W15 (blob research) |
| **DI Pattern** | Dock click-away logic (lines 250-314 of `useDockState.ts`, ~65 lines) is orthogonal; extractable to `useClickAwayDismissal()` | `/src/components/custom/dock/composables/useDockState.ts:250-314` | AW.W15 (colocation) |
| **Suffix convention** | `UseResizeObserverControls`, `UseTokenColorControls`, etc. (5 dom composables) use "Controls" suffix; undocumented; not standard Vue | `/src/composables/dom/*.ts` | AW.W21 (document or unify) |

**Verdict:**

The **DI pattern is exemplary**; colocation is **consistently applied**; state reactivity is **clean and DAG-structured**. The **gap is naming consistency**, which is a **naming/discovery issue, not a functional one**. The return-type interfaces are implementable without breaking changes (export aliases), and the reference-hygiene fix is a non-breaking optional param.

### Fold/Wave Seeds

| Finding | Fold into existing wave | OR | New wave |
|---|---|---|---|
| Return-type naming (9 composables) | — | → | **AW.W21 Component-Colocation + Composable Assay** (EXISTING) |
| Reference-hygiene (`useTokenColor` DI) | AW.W21 hygiene fold | → | — |
| Controls-vs-Return suffix rationalization | AW.W21 documentation lane | → | — |
| Aurora scheduler extract (339→~240 LOC) | — | → | **Deferred to AW.W7-W12 aurora research** (triggered by research needs, not a separate wave) |
| Blob uniform-config extract (370→~330 LOC) | — | → | **Deferred to AW.W13-W15 blob research** |
| Dock click-away extract (353→~285 LOC) | — | → | **Folds into AW.W15 Colocation + naming hygiene** |
| Sidebar state generic naming (`GenericSidebarState<T>`) | — | → | **AW.W21 (alias pattern, backward-compat documented)** |
| useScrollProgress wrapping (`Ref<number>` discoverability) | AW.W21 optional wrap | → | **Document as idiomatic primitive (no forced wrap)** |

---

**Final Status**: The AW.md charter **already names AW.W21** as "Component-Colocation + Composable Assay" with the named hygiene/return-type scope. The audit confirms the wave is load-bearing and the findings are fold-ready with zero misalignment.

---

## Lane 13 — fe-large-colocate

Excellent. Now I have comprehensive audit findings. Let me synthesize the complete report:

---

## AUDIT FINDINGS: AW/H TRANCHES (GLASS-UI + SLIDES)

**Status:** NOT CONVERGED. The engineering is sound; the planning layer has structural defects requiring immediate hardening before dispatch.

---

### COMPONENT STRUCTURE FINDINGS (GLASS-UI)

**> 500-line files (post-AV.W13 re-check):**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/tabs/BouncyToggle.vue:475`
- `/Users/mkbabb/Programming/glass-ui/src/components/ui/data-table/DataTable.vue:442`
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue:421`

**Colocation status:** Already sound. The three >400-line files have existing composable siblings in subdirs (BouncyToggle has `composables/useBouncySlider.ts`; DataTable has `DataTablePagination.vue` + `types.ts`; GlassDock has 5 composables under `dock/composables/`). The dock structure is exemplary: `GlassDock.vue` (421) + `useDockState.ts` (353) + `useLayerTransition.ts` (369) split concerns; aurora/blob follow the pattern (Aurora.vue 9.8KB + 11 composables/constants; GooBlob 5.7KB + 7 composables/shaders). **No additional fold/split needed.**

**Orphan composables:** `code-quality-digest §1` affirms zero orphaned composables at HEAD.

---

### CHARTER ↔ WAVE-FILE RECONCILIATION (22 BLOCKERS)

**CLUSTER A — Gate-name divergence (5 blockers):**
- AW.md §2 fabricates gate names matching NO wave file. W1: `proof:dock-collapse-live` (real: `proof:dock-animation-live`); W2: `proof:dock-lockstep-live` (real: `proof:dock-animation-live` + `proof:spring-tokens-synced`); W3: `proof:dock-spring-unify` (real: `proof:dock-layering-polish`); W5: `-oklch-strokes` (real: `proof:aurora-oklch-interp` + `proof:aurora-derive-gamut`); W9: `proof:blob-droplet-material` (real: `proof:blob-smin-normalized` + `-gradient-unit-length` + `-spec-premult`).
  - **Fold-seed:** W27 (gate-fleet close) registers wave-file gate ids, not charter names. Rewrite AW.md §2 gate column to wave-file truth.

**CLUSTER B — Numbering swap + missing close (2 blockers):**
- AW.md §2 swaps W16 ↔ W17 vs actual files: charter W16=Constellation (file: DeckProgress), W17=DeckProgress (file: Constellation). On-disk truth = file-side.
  - **Fold-seed:** W0 (formalize) renumbers charter §2/§3/§4 to W16=DeckProgress, W17=Constellation.
- AW.md §2 W18 promised "GATE-PATTERN CLOSE + READMEs (LAST)" — but actual W18 file is the access-modal `aria-invalid` idiom with no gate-fleet/close ceremony. The 4 research-backed READMEs (dock/aurora/blob/constellation) + `FINAL.md` + π visual-runtime lane exist in no wave file.
  - **Fold-seed:** Author a new **AW.W-CLOSE** wave (or W19) carrying gate-fleet registration in `gates.mjs` + the 4 READMEs + FINAL.md + π lane audits. Renumber the gate-pattern wave OUT of the W18/"LAST" slot and add its own charter §2 row (digest: frontend-convergence Lane 4 F1/F2; gate: `proof:input-invalid-aria`).

**CLUSTER C — Five charter-promised deliverables with NO wave file (5 blockers):**
- **AW.W0 (spot-verify ledger)** missing entirely. AW.md:25,101 declare W0; inv P7 makes the W0 ledger binding for all retires. No `waves/AW.W0-spot-verify.md`, no `PROGRESS.md`.
  - **Fold-seed:** Author **AW.W0** (DEV wave) — write charter formalization, re-ground to HEAD, bind zero-deferral, run spot-verify on every retire candidate (instrument/glyph/metric-cell/stack) with EXISTS+verbatim-rg-count+alias-resolved verdicts.
- **Orphan resolution (D-10)** — instrument-chassis/rail + glyph-face/disco-glyph has no wave. Charter folds into W14; actual W14 is DataTable-split only (grep: zero `orphan|glyph|instrument`), gate `DataTable.vue ≤380` NOT `proof:orphan-resolved`.
  - **Fold-seed:** New wave **AW.W-ORPHAN** (or widen W14) — migrate-off-and-remove OR keep-and-document, verdicts backed by W0 ledger.
- **metric-cell/metric-stack prune** — no wave (same cause as orphan).
  - **Fold-seed:** Fold into **AW.W-ORPHAN** with born-RED "surface hidden dep FIRST" gate.
- **Styling assay (brittle calc/magic-number → token, Tabs pill-track, raw-`<button>` → `<ToggleGroup>`)** — no wave. Charter assigns to W15; actual W15 is colocation/naming-hygiene only (return-types + `twin-line-divider` + `useTokenColor` seam).
  - **Fold-seed:** New wave **AW.W-STYLING** (or fold into W15, rename file) — brittle-literal tokenization + Tabs/ToggleGroup re-roll + `proof:styling-hygiene` gate.
- **Drawer-live-behind audit** — silently dropped, zero §0 row, zero wave.
  - **Fold-seed:** One-line §0 disposition (verified-clean, or fold into W12's component-pass).

**CLUSTER D — AW dock-band root-cause + gate defects (2 blockers):**
- **W1 root-cause falsified** — wave claims "stacked-grid MAX of the two layers" causes the freeze. Reality: `dock.css:589-592` sets `.dock-layer:not(.layer-active) { position: absolute }` — inactive layer is OUT of flow, so grid reads the ACTIVE width only, not a max. The `<0.5` no-op is `!live`-gated (fires only on fresh swap). **Re-diagnose empirically before dispatch.**
- **W1 gate-coverage inverted** — wave claims existing gate sampled DockLayerGroup (AV.W9 fix) but left GlassDock collapse unsampled. Backwards: `proof-dock-animation-live.mjs:80-83` selects `.glass-dock.collapsed`, samples collapse path; demo has zero DockLayerGroup. Existing gate already covers the W1 path. **Either the "born-RED on 3.3.0" regression is unsubstantiated, or the gate is already green on a working collapse. Run the existing gate against 3.3.0 build before dispatch.**
  - **Fold-seed:** W1 (or W0) empirically verifies the regression on 3.3.0 before fix authoring.

**CLUSTER E — Phantom symbols + conventions (2 blockers):**
- **W10 cites phantom `useSpringOrchestrator`** — does not exist. Real: `useSpring` (wraps `SpringProgress`, exposes value+velocity, exactly what W10 needs).
  - **Fold-seed:** W10 replaces both cites with `useSpring`.
- **W9/W10/W11 proof-script paths use non-existent `scripts/proof/` subdir** — convention is flat `scripts/proof-<name>.mjs`.
  - **Fold-seed:** W9/W10/W11 rename all gates to `scripts/proof-blob-*.mjs`.

**CLUSTER F — Component-band orphans (2 blockers):**
- **W13 goo-blob `var(--primary)` throw fix orphaned** — charter tasks it; actual W13 (affordance-lifts) omits it, no other wave owns it. Live runtime bug confirmed.
  - **Fold-seed:** W13 adds the resolver/story fix + console-clean gate.
- **W15 Tabs pill-track + ToggleGroup re-roll orphaned** — charter assigns them to W15; actual W15 is colocation-only, no Tabs/ToggleGroup/tokenization.
  - **Fold-seed:** Fold into **AW.W-STYLING** (or restore into W15, rename).

**CLUSTER G — W16 scope overreach (1 blocker):**
- **DeckProgress ships full component + `/deck` subpath + math helper** — digests mandate CSS recipe only. Squats the reserved `/deck` deck-engine namespace.
  - **Fold-seed:** W16 demotes to `.glass-progress-rail` CSS recipe + thin wrapper (no math helper, no `/deck` subpath); OR escalate to triumvirate, re-baseline AW.md, rename subpath to `/deck-progress`.

**CLUSTER H — Slides H cross-arm hinges (3 blockers):**
- **31 H.W2/W4/W6/W10 cites fire on phantom `AW.W24`** (AW tops at W18). DeckProgress = AW.W16, Constellation = AW.W17, gate-pattern = AW.W18.
  - **Fold-seed:** H charter re-points all cites: H.W2→AW.W16, H.W4→AW.W17, H.W6→AW.W18.
- **H §2 names fictional `proof:*` scripts** (proof:xray-spine/mobile/deck-copy-conformance/figure-dedup) — zero exist in slides. Restate gates as actual evidence checks (render-matrix, greps, typecheck).
  - **Fold-seed:** H.W0 (formalize) reconciles §2 to wave-file gates.
- **H.W10 de-dup misses THIRD pulse-dot copy** — SlideXray + SlideNutrition (listed); Slide09.vue:147-156 carries a third (in "Do NOT touch" list). Grep gate self-fails.
  - **Fold-seed:** H.W10 adds Slide09 to de-dup scope + File Bounds, or scope grep to named files + book Slide09 follow-on.

---

### DESIGN-COHERENCE FINDINGS (REFINEMENTS)

**AW.W2 opacity-on-overshoot contradiction:** Drives opacity off the (0.5,0.5) overshoot spring — hard-couples fade to size overshoot, exactly the no-flicker anti-pattern the digest flags. Needs either critically-damped companion (M3 spatial-vs-effects) or explicit justification.
  - **Fold-seed:** W2 reconciles opacity derivation to no-flicker rule (or documents tradeoff).

**AW.W3 dropped slider scope:** Charter D-3 + §2 row assign dock-with-slider `keepDockOpen` to W3; wave file has zero slider mention.
  - **Fold-seed:** W3 restores slider arm + gate, or move disposition to its real wave.

**AW.W3 missing wrap showcase:** Gate requires `overflow="wrap"` demo on dock route; demo has no wrap usage.
  - **Fold-seed:** W3 adds wrap showcase to demo story before gate.

**H.W7 typeface register contradiction:** Charter says "heavy-grotesk display" (sans); wave says "Fraunces display" (serif). Deck `--font-display` is Fraunces.
  - **Fold-seed:** H.W7 clarifies: grotesk register is dropped for Fraunces display + mono labels + bar-thick rule (the idiom is the composition, not the face).

---

### FOLD/WAVE-SEED LIST

**AW new/reorganized waves needed:**
1. **AW.W0 (NEW—DEV)** — Formalize charter, spot-verify ledger (EXISTS/rg/alias-resolved per retire candidate), PROGRESS.md
2. **AW.W-ORPHAN (NEW)** — instrument-chassis/rail + glyph-face/disco-glyph resolution (migrate OR keep+doc), verdict from W0 ledger; `proof:orphan-resolved` + `proof:no-god-module`
3. **AW.W-PRUNE (NEW or fold into W-ORPHAN)** — metric-cell/stack hidden-dep surface (born-RED) + clean removal
4. **AW.W-STYLING (NEW or fold into W15)** — brittle-literal → token, Tabs pill-track, raw-`<button>` → ToggleGroup; `proof:styling-hygiene`
5. **AW.W1 (REFINE)** — Empirically verify regression on 3.3.0; reconcile root-cause vs dock.css:589-592 reality
6. **AW.W2 (REFINE)** — Opacity derivation to no-flicker rule or explicit tradeoff; spring-tokens band assertion to File Bounds
7. **AW.W3 (REFINE)** — Restore slider scope + gate; add wrap showcase to demo; name born-RED artefact capture location
8. **AW.W13 (REFINE)** — Add goo-blob resolver throw fix + console-clean gate
9. **AW.W16 (REFINE or escalate)** — Demote to CSS recipe + thin wrapper (no math helper, no `/deck` subpath); OR triumvirate re-baseline
10. **AW.W17 (REFINE)** — Resolve ≥2-consumer muster: either land genuine 2nd in-repo consumer OR carry GATED-NOT-LANDED pending H.W10
11. **AW.W-CLOSE (NEW)** — Gate-fleet registration in gates.mjs, 4 READMEs (dock/aurora/blob/constellation), FINAL.md, π visual-runtime lane audits, overfitting audit
12. **AW.W18 (FOLD)** — Rename to explicit gate-pattern wave (not "CLOSE"), add charter §2 row; gate remains `proof:input-invalid-aria`

**H new/reorganized waves needed:**
1. **H.W0 (NEW—DEV, or fold into H.W1)** — Formalize charter, pin AW dependencies, reconcile §2 gates to wave-file evidence checks
2. **H.W-LOCK-REMOVAL (RENAME H.W6)** — DeckGate access-key + homepage lock affordance DELETED (not restyled); zero residue; `proof:no-til-lock` grep
3. **H.W-DEDUP (or refocus H.W10)** — Fix third pulse-dot copy in Slide09; scope grep or add Slide09 to File Bounds

**Cross-charter re-points:**
- All H references to `AW.W24` → AW.W16 (DeckProgress), AW.W17 (Constellation), AW.W18 (gate-pattern)
- Rewrite AW §2 gate column to match wave-file ids (source-of-truth)
- Renumber AW W16 ↔ W17 in charter §2/§3/§4 to file-side truth

---

**Summary:** The 27-wave AW structure and 10-wave H structure are sound in engineering discipline. **The 22 blockers live in the charter/wave-file alignment layer** (fabricated gate names, swapped numbering, five missing wave files that are promised in the charter, phantom symbols, cross-arm hinge cites on nonexistent waves). **The fold/wave-seed list above routes every blocker into an existing wave (W0 spot-verify, W-ORPHAN/W-PRUNE/W-STYLING refinements, W1–W18 targeted refines) OR a new wave (W-CLOSE for gate-fleet+READMEs, W0/H.W0 for formalization).** No wave carries content defects; all are alignment/scope/gate-name reconciliations with empirical verification gates (run 3.3.0 dock regression test, surface metric-cell hidden dep, verify Slide09 pulse-dot copy). The design language (warm-cream glass + iOS-26 + NCSU-red consumer-layered) is coherent; colocation is already sound.

---

## Lane 14 — fe-brittle-selectors

Excellent! Now I have comprehensive information. Let me compile the brittle-selector audit findings:

---

## COGENCY-HARDEN AUDIT BRIEF: AW/H TRANCHES — "fe-brittle-selectors" LANE

### FINDINGS

**CSS Deep-Penetration Chains (:deep)**

1. **GlassCarousel.vue:267, 271, 281, 285** — deeply-nested :deep() selectors on carousel item layout.
   - `.glass-carousel--expanded .glass-carousel__content--vertical > :deep(.glass-carousel-item)` (4 instances)
   - These chain state + orientation + flex layout across SFC boundary; fragile to component reorganization or parent class renames.
   - Fold: parameterize item layout via scoped CSS properties (e.g., `--carousel-item-flex`) so carousel-item style is decoupled from parent state class.

2. **DeckGate.vue:118** — :deep() invalid-ring selector piercing Dialog/Input boundary.
   - `.deck-gate :deep(input[aria-invalid="true"])` — hardcoded destructive ring re-implements glass-ui's affordance.
   - AW.W18 widens the `.input-pill` invalid ring to include `[aria-invalid="true"]` (already in audit), making this :deep() redundant.
   - Fold: AW.W18 lands, H.W1 (dock-consume) deletes the :deep() reach.

**Brittle Calc/Magic Numbers**

3. **tokens.css:645-650** — nested calc() inside color-mix() + nested `calc()` on registered @property.
   - `--glass-bg-*: color-mix(in srgb, var(--card) calc(var(--glass-opacity-*) * 100%), transparent)`
   - Six instances of multiplied opacity inside calc(); if opacity token refactors (e.g., 0-1 → 0-100 renormalization), all six break in lockstep.
   - Fold: AW.W20 (styling-assay) — rename opacity tokens to remove the *100% scaling; let the token carry the final value.

4. **dock.css:60-61, 356, 914** — viewport-width, separator-height, border-radius calc chains.
   - `--dock-separator-height: calc(var(--dock-h, var(--size-icon-btn)) * 0.5)`
   - Two-level var() nesting (fallback to fallback); if `--dock-h` is removed, separator height silently recomputes off `--size-icon-btn`.
   - Fold: AW.W20 — simplify calc chains to single-level lookups; surface all needed tokens explicitly.

5. **instrument-rail.css:27, 46, 58** — ratio calc for flex and border-radius.
   - `flex: 0 0 calc(var(--instrument-rail-ratio, 0.382) * 100%)`
   - Hard-coded 0.382 ratio constant; if design revises the golden-ratio variant, six places need edits.
   - Fold: AW.W20 — extract ratio into a named token `--instrument-rail-ratio-default`.

**Deeply-Nested Pseudo-Element Chains**

6. **instrument-rail.css:75, 84, 93, 102, 110** — pseudo-element stack on :not() chains.
   - `> :not(:first-child):not(.instrument-rail-status)::before`
   - Multiple :not() chains + pseudo-element; high DOM fragility if status-class renames or if first-child logic shifts.
   - Fold: AW.W15 (hygiene) — surface the divider/separator as an explicit component with a data-attribute slot, not a :not()-derived ::before.

7. **dock.css:231, 244, 352, 362** — .glass-dock grain ::after overlay + variant-scoped ::before.
   - Grain texture ::after + instrument-strip engraved-bezel ::before — two pseudo-element layers per dock variant.
   - If variant logic refactors, the ::after/::before wiring is implicit and easy to accidentally remove.
   - Fold: AW.W22 (glass-material-unify) — explicit `.glass-material::before` + `.glass-material::after` mixin so the specular + grain stack is documented.

**Deep Reactive Chains (computed-of-computed, watcher-of-watcher)**

8. **GlassCarousel.vue:29-30, 52-55** — computed() refs + watch on computed result.
   ```typescript
   const orientationRef = computed(() => props.orientation);
   const expandedRef = computed(() => props.expanded);
   // ...
   watch(scrollAreaViewportRef, (comp) => {
       viewportEl.value = comp?.$el ?? null;
       updateOverflow();
   }, { immediate: true });
   ```
   - Four computed refs + immediate watch on viewport child component; if useGlassCarousel's watch chain inside adds another computed layer, the reaction graph becomes untraced.
   - Fold: AW.W15 (hygiene, composable refactor) — flatten to direct prop forwarding; computed() only where necessary (e.g., derived state that is not a 1:1 map).

9. **useSidebarFollow.ts:210-232** — three watch() callbacks on different dependencies, all calling nextTick + queue().
   - Three separate watch statements watching `[activeId, activeRootId]`, `sidebarEl`, and `scrollSource`, each triggering a `queue()` side-effect.
   - Brittle: if the order of watches changes or one watcher is accidentally removed, the sidebar follow-scroll loses coherence.
   - Fold: AW.W15 (composables refactor) — merge into ONE watchEffect listening to all three, single queue call.

10. **useIntersectionPause.ts:99-130** — watch on target element + conditional nested watch for visibility.
    - `const stopTargetWatch = watch(...)` followed by conditional `watch(hidden, ...)` inside `if (pauseWhenHidden)`.
    - If pauseWhenHidden logic refactors, the nested watch may not dispose properly.
    - Fold: AW.W15 (composables refactor) — hoist both watches into a single reactive effect, one dispose path.

11. **useTokenColor.ts:109-120** — two sequential watch() calls on token + element.
    - `watch(() => toValue(token), refresh)` then `watch(() => toValue(options.element), refresh)`.
    - Duplicate refresh logic; if refresh logic changes, must update both.
    - Fold: AW.W15 — merge into ONE watch([token, element]) with a single refresh callback.

12. **DeckPage.vue:21-37, SlideXray.vue:46-59** — watch on route.params / slide-active prop, debounced side-effect.
    - `watch(active, (on) => { if (debounce) clearTimeout(debounce); debounce = setTimeout(...) })` — manual debounce wiring.
    - If active prop's parent refactors, the debounce state becomes orphaned.
    - Fold: H.W1/H.W4 (slides visual-refinement) — replace with Vue's `watchDebounced` from @vueuse/core (already a dep).

---

### FOLD/WAVE-SEED LIST

**AW waves (glass-ui library)**

- **AW.W12 (existing)** — `.input-pill` invalid ring widens to `[aria-invalid="true"]`. Fixes finding #2.
  
- **AW.W15 (hygiene + composables, REFACTOR)** — Collapse computed-ref chains and multi-watch patterns.
  - Flatten unnecessary computed() layers in GlassCarousel (#8).
  - Merge three sidebar-follow watches into one (#9).
  - Merge useIntersectionPause's nested watches (#10).
  - Merge useTokenColor's two sequential watches (#11).
  - Gate: `vue-tsc --noEmit` green; Playwright composables-integration suite green.

- **AW.W20 (styling-assay, EXISTING)** — Tokenize brittle calc/magic-numbers.
  - Extract opacity * 100% scale into unit-normalized tokens (#3).
  - Flatten calc() chains (dock-h fallback, separator height) to single-level lookups (#4).
  - Extract golden-ratio constant to named token (#5).
  - Gate: no raw `calc(N*var(--glass-opacity-*) * 100%)` survives; instrument-rail-ratio is named.

- **AW.W22 (glass-material-unify, EXISTING)** — Explicit pseudo-element mixin for dock + glass surfaces.
  - Document `.glass-material::before` (specular) + `.glass-material::after` (grain) so stack is codified, not implicit (#7).
  - Gate: every glass surface (`--svg`/`--fallback`/dock variants) lists both pseudo-elements; no orphaned grain ::after.

- **AW.W25 (primitives-perfection, EXISTING)** — Re-structure instrument-rail dividers as explicit component slot, not :not() pseudo-chain.
  - Replace `:not(:first-child):not(.instrument-rail-status)::before` with a named divider-slot data-attribute (#6).
  - Gate: `.instrument-rail-divider` is explicitly mounted; :not() pseudo chains are gone.

**H waves (slides consumer)**

- **H.W1 (dock-consume, EXISTING)** — Delete the redundant `.deck-gate :deep(input[aria-invalid])` ring after AW.W12 lands (finding #2).
  - Gate: `grep -rn "deck-gate :deep" src/` = 0.

- **H.W4/W5 (constellation-visibility / complex-graphs, REFACTOR)** — Replace manual debounce with @vueuse watchDebounced (#12).
  - Slides already imports @vueuse; replace `if (debounce) clearTimeout(debounce); debounce = setTimeout()` pattern with `const probe = watchDebounced(...)`.
  - Gate: watch-source callback is composable-owned, not manual state.

**No new waves:**
- Findings #1 (GlassCarousel :deep) and #6 (instrument-rail :not()) fold into existing AW.W25 (primitives-perfection) as part of the comprehensive affordance/geometry sweep.
- Finding #8 (computed nesting in GlassCarousel) folds into AW.W15 (composables refactor).

---

**Summary:** The brittle-selector lane identifies 12 load-bearing fragilities across CSS calc chains, :deep() scope piercing, nested pseudo-elements, and reactive chains (computed-of-computed, watcher-of-watcher). All 12 fold into existing AW/H waves (AW.W12/W15/W20/W22/W25 + H.W1/W4) already scheduled for cogency-harden. No new waves needed; every finding is a hygiene consolidation on the existing closure path.

---

## Lane 15 — fe-tailwind-idiom

Based on my comprehensive audit of the AW/H tranches and the documented Tailwind idiom scope, here are the findings:

---

## AW/H Cogency-Harden Round: Tailwind-Idiom Findings + Fold/Wave Seed List

### Findings Summary

**SCOPE: Lane "fe-tailwind-idiom" (W26 + post-AV.W16 residue)**

Post-AV.W16 (the Tailwind v4.3 idiom landing), glass-ui ships NO critical non-idiomatic arbitrary-value bloat. The residue is **minimal and already owned**:

1. **Arbitrary max-height literals** (non-idiomatic, should be @theme/@utility):
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/dropdown-menu/DropdownMenuContent.vue:7` — `max-h-[60vh]`
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/combobox/ComboboxViewport.vue:5` — `max-h-[300px]`
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/command/CommandList.vue:2` — `max-h-[300px]`

2. **Per-component arbitrary grid/spacing** (should tokenize to @theme or collapse to utility):
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/data-table/DataTable.vue:line~mt-2` — `grid-cols-[auto_1fr] gap-x-3 gap-y-1` (hardcoded grid template via arbitrary, not a reusable utility)
   - `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue` — `bottom-[var(--dock-pos)]`, `left-1/2 -translate-x-1/2` (correct: CSS variable-driven, idiomatic)

3. **Modal/searchbox positioned arbitrary translate** (idiomatic; CSS-var fallback correctly applied):
   - `/Users/mkbabb/Programming/glass-ui/src/components/custom/search/FuzzySearch.vue` — `!top-[12vh]`, `!translate-y-0`, `!max-w-[36rem]` (idiomatic override pattern)
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/carousel/Carousel*.vue` — `[calc(-1*var(--carousel-nav-offset))]` (correct CSS-var usage)

4. **Command.vue selector-driven styling** (complex but idiomatic under reka's cmdk structure):
   - `/Users/mkbabb/Programming/glass-ui/src/components/ui/command/Command.vue:line~[&_[cmdk-group-heading]]` — 12+ reka-cmdk-specific child selectors with arbitrary sizing (correct: no tokcn exists for cmdk widget internals; this is a bounded exception per reka's contract)

5. **Slides non-idiomatic Tailwind (no search results — slides uses local CSS override pattern)**:
   - No arbitrary-value class strings found in slides `src/` components; slides uses deck-local `deck.css` + token overrides (idiomatic per H charter).

**POST-AV.W16 VERDICT**: Glass-ui's class strings are **highly idiomatic**. The three `max-h-[Xvh/px]` literals are THE residue — low-risk but explicit W26 scope targets (tokenize to `@theme` or mint a `--popover-max-height` utility). No false-merge risk, no arbitrary-color/arbitrary-opacity creep, no `9999px` stadium-rounding bugs (Textarea and Input both use `.input-pill` → 9999px is TOKEN-bound, not arbitrary — owned by W24's `--radius-field` fix).

---

## Fold/Wave-Seed List

| Finding | Fold Target | Notes |
|---------|------------|-------|
| `max-h-[60vh]` DropdownMenuContent | **W26 (section §8 "oklab-tint rationale")** OR **new @utility `max-h-popover`** | Mint `--popover-max-height: 60vh` in tokens.css, define `max-h-popover` in utilities.css; affects 3 sites (DropdownMenu, Combobox, Command all use same 60vh/300px pair). If minting one token, fold into W26 §6 text-shadow companion work. |
| `grid-cols-[auto_1fr] gap-x-3 gap-y-1` DataTable | **W20 (styling-assay)** OR **new grid utility** | This is non-`@theme` grid-template — either (a) mint a reusable `.data-table-summary-grid` utility if ≥2 consumers, or (b) document why DataTable inlines it (single-consumer, scoped; OK per KISS). Verify via `grep -r 'grid-cols-\[auto_1fr\]'` — if zero other consumers, leave as-is (idiomatic scoped arbitrary). Current: leave (single consumer, load-bearing DataTable layout). |
| Command.vue reka-cmdk selectors | **W26 reference note** — KEEP-BOOK | These are REQUIRED (reka's cmdk structure has no token hooks). Document the exception in CLAUDE.md: "Command styling targets reka-cmdk internals which have no public token surface; arbitrary child selectors are load-bearing and justified." No fold. |
| Carousel/FuzzySearch CSS-var translate | **Already idiomatic** — no fold | CSS-var-driven arbitrary values are canonical when no static token exists (the var fallback covers degrade). No action. |
| Slides deck.css class strings | **H charter (pure deck-local)** — no fold | Slides uses deck-owned CSS register (warm-cream + NCSU-red tokens, cartoon-shadow vocabulary). No glass-ui port needed. |

---

## Consolidated Recommendation

**No new W22-W26 fold needed**. The three `max-h-[Xvh]` sites are **optional-polish scope**:

- **Option A (tight fit)**: Tokenize the three to `@theme max-h-popover: 60vh; max-h-dropdown: 300px;` + one `@utility max-h-{popover,dropdown}` in W26 §8 (the "oklab-tint rationale" / "Tailwind-v4.3 folds" section already touches `theme.css`/`utilities.css`). Three-line fold, zero blocker risk.
- **Option B (defer)**: Accept as-is (idiomatic fallback pattern: CSS-var or arbitrary when token doesn't exist). These 60vh/300px are reka popover-family standard — minting them is a convenience, not a blocker.

**Recommend: Option A** — the three lines cost zero and perfect the idiom sweep (every hardcoded max-height resolves through `@theme` + no arbitrary-size literal survives). Add to W26 scope as a sub-item of §8 (text-shadow tokenization companion work; same file-bounds surface).

---

## Lane 16 — fe-monolithic-css

Perfect! Now I have all the information I need. Let me create the final audit report:

---

## COGENCY-HARDEN AUDIT: AW/H TRANCHES · FE-MONOLITHIC-CSS LANE

**READ-ONLY deep-audit of glass-ui 3.3.0 (HEAD `afdc485`) + slides G (published).**  
**Scope:** Global CSS cascade (`src/styles/*.css`) vs SFC scoped styles. Identify monolithic patterns that should be component-scoped + fold/wave seeds.

---

## FINDINGS

### 1. MONOLITHIC-GLOBAL PATTERNS (INTENTIONAL, WELL-JUSTIFIED)

#### glass.css (433 lines)
- **Lines 1-106:** Five-tier surface ladder (wash/quiet/resting/floating/overlay) + under-shadow rungs + Liquid Glass rim + grain overlay — **CORRECTLY GLOBAL**. The tier system is the foundational material contract; every glass surface in the library references these. Monoolithic ≠ wrong; this is the shared tier substrate.
- **Lines 144–168:** Grain noise overlay (pseudo-element on all tiers) — **CORRECTLY GLOBAL**. Applied uniformly across all glass rungs via `::after` rule set. Zero component-specific tuning.
- **Lines 170–252:** Convenience shorthands (`.glass-card`, `.glass-btn`, `.btn-pill`, `.input-pill`) — **HYBRID PATTERN**. The utility classes themselves belong in global cascade (they are consumed by multiple components + consumers), BUT the per-class state rules (hover/active/focus/invalid) could migrate to component-scoped sheets IF components owned their own interactive rules. Currently: `.glass-btn:hover` defined globally (line 225); the GlassBtn.vue component has NO scoped style and **relies entirely on the global rules**. Same for `.input-pill` (lines 283–363).
- **File:line issues:** 
  - `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css:225,232,236,241` — `.glass-btn` press/hover/focus/disabled rules are NOT colocated with any component SFC.
  - `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css:312–342` — `.input-pill` validity/focus rules are global; the `useUserInvalidAria` fallback class `.user-invalid-fallback` is also keyed here, binding the global rule to the composable contract.

#### dock.css (979 lines)
- **Lines 8–91:** `.glass-dock` core + `.dock-*` control family state rules — **MONOLITHIC + INTENTIONALLY COHESIVE**. The dock is the complex motion + layering choreography; all selector groups are orchestrated together (lines 36–50 the four-state contract for dock controls, lines 52–100 the dock root, lines 103–200+ the density rungs). This is NOT accidental bloat — the motion vocabulary (`--dock-motion-fast/standard/resize`) and the density rungs are authored as ONE coherent system.
- **VERDICT:** Keep monolithic. The dock.css file is the style authority for the dock family; splitting would fragment the motion contract. The AW.W20 wave (styling assay) records this decision per the code-quality digest (`code-quality-digest.md §3 AW-8`): "Do NOT split dock.css, move floating-panel/hover-popover/drawer to SFC (78–216 lines, low ROI — briefs converged on 'keep global, public-class contract'), or fold density out of dock.css (shared `:where()` groups are load-bearing)."

#### utilities.css (1095 lines)
- **Lines 1–24:** Popover animation utilities (`@utility popover-animate`, `@utility slide-in-from-side`) — **CORRECTLY GLOBAL**. Used by PopoverContent, DropdownMenuContent, SelectContent, Tooltip, HoverCard, etc. across multiple unrelated families.
- **Lines 26–100:** Component recipes (`.section-description`, `.labeled-field-label`, `.labeled-field`, `.popover-content`) — **MIXED PATTERN**. Some recipes are genuinely shared (`.labeled-field` is used by LabeledInput, LabeledSelect, LabeledSwitch, LabeledSlider — 4+ consumers), others (`.section-description`) are simpler utility-layer sugar that COULD live in `Section.vue`'s scoped block. However, the AW.W20 decision is surgical extraction only: split utilities.css by domain into `utilities-animation.css` + `utilities-components.css` for clarity, but keep recipes that have ≥2 distinct consumers in the global layer.

#### tokens.css (1693 lines)
- **Lines 13–400+:** Design token definitions (colors, durations, springs, z-index, focus ring, shadows, radii, etc.). **CORRECTLY GLOBAL**. These are inputs to the cascade; no scope boundary applies.

#### cards.css (49 lines)
- **Lines 1–48:** `.paper-texture`, `.cartoon-surface` utilities + CardHeader.vue shrink animation CSS. **HYBRID**.
  - Lines 10–19 (paper texture) — shared, global.
  - Lines 33–48 (cartoon-surface hover/lift) — shared animation utility; correct to be global.
  - **BUT:** CardHeader.vue has its own `<style scoped>` block (`CardHeader.vue:61–146`) declaring `@keyframes card-header-shrink`, `card-title-shrink`, `card-desc-shrink`. These keyframes are **colocated correctly** in the SFC scoped block (only CardHeader uses them). The `.card-header--shrink` class name convention binds the global class to the SFC's scoped animation rules. ✓ PATTERN IS CORRECT.

#### floating-panel.css, hover-popover.css, instrument-chassis.css, etc. (78–216 lines each)
- Each is **intentionally monolithic-global** because it governs a family of related surfaces (floating panels, hovers, instrument chassis) with shared state contracts. The AW.W20 decision is explicit: keep these global (code-quality digest §AW-8: "keep global, public-class contract").

### 2. COMPONENT-SCOPED PATTERNS (CORRECTLY COLOCATED)

#### CardHeader.vue scoped block (`/Users/mkbabb/Programming/glass-ui/src/components/ui/card/CardHeader.vue:61–146`)
- Lines 79–105: `.card-header--shrink` modifier + descendant rules for `[data-slot="card-title"]` + `[data-slot="card-description"]` (scroll-timeline shrink choreography).
- Lines 106–137: Three `@keyframes` animations (card-header-shrink, card-title-shrink, card-desc-shrink) specific to CardHeader.
- **VERDICT:** ✓ CORRECT COLOCATION. The class name convention (`.card-header--shrink` as a modifier) allows the component to use a global class hook while the animations remain scoped. Zero pollution of the global cascade.

#### Custom components (timeline, aurora, blob, dock, configurator) 
- ContinuousMarkers.vue, ScrubberTimeline.vue, SegmentedTimeline.vue, ContinuousRail.vue — all have scoped `<style>` blocks with layout + animation rules specific to that component's structure.
- **VERDICT:** ✓ CORRECT PATTERN. Scoped CSS where the styling is component-specific; global utilities where shared.

#### GlassBtn.vue (button/Button.vue)
- **FINDING:** GlassBtn.vue has **NO `<style>` scoped block**. All styling is delegated to the global `.glass-btn` class in glass.css.
- **FILE:** `/Users/mkbabb/Programming/glass-ui/src/components/ui/button/Button.vue` (the main button SFC).
- **IMPACT:** If Button.vue needs a variant-specific hover/press behavior, it cannot override globally-defined `.glass-btn:hover` without using CSS specificity fights (`:deep()` or classes). This is a **MONOLITHIC-GLOBAL PATTERN** that works but creates a variant-lock.

---

## FOLD/WAVE SEED LIST

### Existing Waves to Fold Into

| Seed | Existing Wave | Rationale |
|------|---|---|
| **Lift `.glass-btn` state rules into Button.vue scoped style** | AW.W25 (primitives-perfection) | The four-state contract (hover/active/focus/disabled) belongs colocated with the Button component for clarity. glass.css retains only `.glass-btn` base (the glassmorphic icon-button recipe, shared across dock/nav), while Button.vue owns its interactive semantics. |
| **Lift `.input-pill` state rules into Input.vue scoped style** | AW.W25 (primitives-perfection) | Same pattern: the validity/focus/disabled rules colocate with the Input component. The `.input-pill` recipe (geometry + base glass tier) stays global. Binding contract preserved: `useUserInvalidAria` fallback class still keyed in global scope. |
| **Extract `utilities.css` animation utilities** | AW.W20 (styling-assay) | Split `utilities.css` into `utilities-animation.css` (popover-animate, slide-in-from-side, existing @utilities) + `utilities-components.css` (@layer components recipes). Cascade order preserved via `index.css` import sequence. No behavioral change; pure organizational clarity. |
| **Extract `.twin-line-divider` utility** | AW.W20 (styling-assay) | The catch-light-top + under-shadow-bottom idiom is duplicated in `instrument-chassis.css` + `instrument-rail.css` (two sites). Promote to a shared `@utility twin-line-divider` in utilities.css. Real DRY violation. |
| **Document dock.css monolithic rationale** | AW.W15 (colocation-hygiene) | Add a one-line comment at the top of dock.css: "Intentionally monolithic; the dock motion/layering choreography is orchestrated across all selectors. Splitting would fragment the spring vocabulary." This records the deliberate choice per precept P2 (gestalt over patch). |
| **Record glass.css tier-system rationale** | AW.W15 (colocation-hygiene) | Add a comment explaining the five-tier surface ladder is the foundational glass-ui material contract; every floating/overlay surface in the library references it. Monolithic is correct here. |

### New Waves

| Seed | New Wave | Scope | Rationale |
|---|---|---|---|
| **Button variant state-rule colocation** | AW.W25-button-scope (micro-wave) | Migrate `.glass-btn:hover/active/focus/disabled` from glass.css to Button.vue `<style scoped>`. The `.glass-btn` base class (the recipe for the 44px glassmorphic icon button) remains global; the interactive state contract moves into the component. `:is()` grouping for focus-ring cross-component styling (dock controls all share it) preserved in global via alias-rule. | The interactive state rules belong next to the component that defines their visual semantics. This is the AW.W25 primitives-perfection micro-refinement that completes the four-state contract work. |
| **Input variant state-rule colocation** | AW.W25-input-scope (micro-wave) | Migrate `.input-pill:focus-visible/user-invalid/user-valid/disabled` from glass.css to Input.vue `<style scoped>`. The `.input-pill` recipe (geometry + base glass tier) remains global. Binding contract (`useUserInvalidAria` fallback) documented in a global comment. | Correctness over consistency: Input owns its validity styling; glass.css provides the shared tier/glass vocabulary. |

---

## DESIGN-COGENCY ASSESSMENT

**Monolithic-Global Patterns Found:**  
1. **glass.css tiers (wash/quiet/resting/floating/overlay)** — ✓ JUSTIFIED. The shared material substrate.  
2. **dock.css choreography** — ✓ JUSTIFIED. The motion/layering orchestration is load-bearing.  
3. **utilities.css recipes** — ✓ JUSTIFIED (mostly). The labeled-field, popover-content patterns are genuinely shared.  
4. **glass.css `.glass-btn` + `.input-pill` state rules** — ⚠ HYBRID. The base recipes are correct to be global; the interactive state rules could be component-scoped for clarity.  

**Scoped-Correctly Patterns:**  
- CardHeader.vue shrink choreography (scroll-timeline keyframes) — ✓ correct.  
- Timeline components (ContinuousMarkers, ScrubberTimeline, etc.) — ✓ correct.  
- Custom components (aurora, blob, configurator, dock) — ✓ correct.  

**Cross-Cascade Coherence:**  
- The design language (warm-cream glass + iOS-26 Liquid Glass + NCSU-red) is coherently expressed through the tokens (the true source of truth). No monolithic CSS files break the design language; the tier system enforces visual discipline.  
- One DRY violation: `.twin-line-divider` idiom duplicated in two instrument files (seed above).

---

## SUMMARY FOR AW/H SYNTHESIS

**No breaking refactors needed.** The codebase demonstrates strong discipline: monolithic CSS is intentional and serves load-bearing purposes (the glass tier system, the dock motion vocabulary). Recommended actions are surgical refinements:

1. **Extract utilities.css by domain** (cascade order preserved) — AW.W20 (styling-assay).  
2. **Promote `.twin-line-divider`** to shared utility (real DRY fix) — AW.W20.  
3. **Migrate `.glass-btn` + `.input-pill` state rules into component scopes** (two micro-waves under AW.W25) for clarity + component ownership of interactivity.  
4. **Document the dock.css + glass.css monolithic rationale** in comments — AW.W15 (colocation-hygiene).  

All changes preserve cascade semantics + design language. Zero impact on consumer APIs.

---

## Lane 17 — fe-deprecated-css

Perfect. Now let me create a comprehensive report on the deprecated CSS findings across the fe-deprecated-css lane. Let me gather all the findings systematically.

Based on my READ-ONLY deep audit of the AW/H tranches focusing on the fe-deprecated-css lane, here are the findings:

---

## DEPRECATED/ARCHAIC CSS AUDIT — fe-deprecated-css lane

### Findings Summary

**Total deprecated patterns found: 8 items across 6 files**

#### Load-bearing `-webkit-` cruft (feature-tested, not speculative)

1. **`-webkit-backdrop-filter` fallback (glass.css:398)**
   - File: `/Users/mkbabb/Programming/glass-ui/src/styles/glass.css`
   - Pattern: `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))`
   - Status: INTENTIONAL — load-bearing Safari ≤16 fallback, documented as single-source-of-truth discipline (see glass.css:40–47 rationale).
   - **Action**: KEEP. The charter explicitly preserves this in AV.W15 token edits and notes Lightning CSS auto-prefixes the main form. The double-test pattern (modern + legacy) is correct for older Safari.

2. **`-webkit-backdrop-filter` on ContinuousRail.vue:89**
   - File: `/Users/mkbabb/Programming/glass-ui/src/components/custom/timeline/ContinuousRail.vue`
   - Pattern: `-webkit-backdrop-filter: var(--glass-blur-wash);` (paired with unprefixed backdrop-filter:88)
   - Status: REDUNDANT — the unprefixed form on line 88 is the source; the -webkit companion is auto-prefixed by Lightning CSS in production per glass.css policy.
   - **Action**: REMOVE on next styling pass (W20/W26). This is scoped CSS noise (Tailwind/Lightning CSS handles the matrix).

3. **`-webkit-background-clip` on utilities.css:337**
   - File: `/Users/mkbabb/Programming/glass-ui/src/styles/utilities.css`
   - Line: 337 (in `.gold-shimmer` rule)
   - Pattern: `-webkit-background-clip: text;` + `background-clip: text;`
   - Status: LOAD-BEARING — `background-clip: text` requires the -webkit vendor prefix in all browsers for text-gradient rendering (Baseline 2015-ish, still unflagged in some contexts). The paired form is idiomatic.
   - **Action**: KEEP. This is a documented compatibility pair for the gradient-text feature.

#### Deprecated selector/pseudo-patterns

4. **`-webkit-mask-image` on ScrollingText.vue:80–86**
   - File: `/Users/mkbabb/Programming/glass-ui/src/components/custom/scrolling-text/ScrollingText.vue`
   - Pattern: dual `-webkit-mask-image` + `mask-image`
   - Status: REDUNDANT — per utilities.css:262–268 comment, Tailwind v4's Lightning CSS auto-prefixes `mask-image` per browserslist. The -webkit companion here is hand-coded noise.
   - **Action**: REMOVE the `-webkit-mask-image` lines; keep `mask-image` only. The AV.W16 principle (single-source) applies here.

5. **Redundant `-webkit-user-select` in two SFCs**
   - Files:
     - `/Users/mkbabb/Programming/glass-ui/src/components/custom/sortable-list/SortableItem.vue:57`
     - `/Users/mkbabb/Programming/glass-ui/src/components/custom/sortable-list/SortableHandle.vue:65`
     - `/Users/mkbabb/Programming/glass-ui/src/components/custom/timeline/ScrubberTimeline.vue:114`
   - Pattern: `user-select: none;` + `-webkit-user-select: none;` (paired)
   - Status: REDUNDANT — `user-select` is well-supported Baseline; the -webkit companion is unnecessary noise in scoped styles.
   - **Action**: REMOVE all `-webkit-user-select` lines; `user-select: none;` alone suffices (Lightning CSS auto-prefixes if needed).

#### Deprecated/fragile selector patterns

6. **`vertical-align: -0.05em` on typography.css:426**
   - File: `/Users/mkbabb/Programming/glass-ui/src/styles/typography.css`
   - Pattern: `vertical-align: -0.05em;` on an icon baseline fix
   - Status: FRAGILE — `vertical-align` only works on inline/inline-block elements; the -0.05em magic number is brittle. The modern idiom uses `transform: translateY()` or flexbox alignment.
   - **Action**: REFACTOR (W26 idiom wave) — replace with `transform: translateY(-0.05em)` or check if the target is flex/grid and use `align-self`.

#### Load-bearing modern patterns (not deprecated, but audit-relevant)

7. **`backdrop-filter: url(#glass-refract)` (gated Baseline-2025)**
   - File: `/Users/mkbabb/Programming/glass-ui/src/styles/glass-specular-track.css:144`
   - Pattern: `@supports (backdrop-filter: url("#glass-refract")) { backdrop-filter: var(--glass-blur-resting) url("#glass-refract"); }`
   - Status: LOAD-BEARING & INTENTIONAL — Baseline 2025 SVG displacement lens. Correctly `@supports`-gated; fallback is `backdrop-filter: blur()` only.
   - **Action**: KEEP.

8. **Dual-form `mask-image` in utilities.css (Baseline 2023 + older-Safari fallback)**
   - File: `/Users/mkbabb/Programming/glass-ui/src/styles/utilities.css:269–283`
   - Pattern: Four utility classes using `mask-image: linear-gradient(…)` with an explicit `@supports` fallback documented at lines 262–268.
   - Status: CORRECT — the comment explains the single-source discipline ("the `-webkit-` companion is dropped … [auto-prefixed by Tailwind v4]… this does NOT conflict with W15's `@supports`-gated older-Safari mask fallback").
   - **Action**: KEEP.

---

### Fold/Wave-Seed List

| Finding | Type | Fold into existing wave | OR New wave | Rationale |
|---------|------|------------------------|-------------|-----------|
| ContinuousRail.vue:89 `-webkit-backdrop-filter` | Redundant manual prefix | **W26** (reka/shadcn/idiom wave) | — | Scoped-CSS cleanup; Lightning CSS handles auto-prefix. |
| ScrollingText.vue:80 `-webkit-mask-image` | Redundant manual prefix | **W26** (reka/shadcn/idiom wave) | — | Single-source principle (utilities.css :262 policy). |
| SortableItem.vue:57, SortableHandle.vue:65, ScrubberTimeline.vue:114 `-webkit-user-select` | Redundant manual prefixes (3 sites) | **W26** (reka/shadcn/idiom wave) | — | User-select well-supported; auto-prefixed if needed. |
| typography.css:426 `vertical-align: -0.05em` | Fragile magic-number | **W26** (reka/shadcn/idiom wave) | — | Refactor to `transform: translateY()` or flexbox align-self. |

**New dedicated wave:** NOT needed. The four deprecations (3 redundant prefixes + 1 fragile baseline) are minor cleanup items that fold into **AW.W26** (the reka/shadcn/Tailwind-v4.3/mwg idiom + binding guard wave), which already owns scoped-CSS modernization + the `data-slot` + CVA modernization scope.

---

### Summary Brief

**fe-deprecated-css lane findings:**
- **No load-bearing legacy** — the `-webkit-backdrop-filter` fallback in glass.css is intentional Safari ≤16 coverage; `-webkit-background-clip: text` is idiomatic for gradients; `backdrop-filter: url(#…)` is correctly gated Baseline-2025.
- **Four manual redundant prefixes** (ContinuousRail, ScrollingText, SortableItem/Handle, ScrubberTimeline) — auto-prefixed by Lightning CSS per AV.W16 + Tailwind v4 policy; safe removal.
- **One fragile baseline pattern** (vertical-align magic-number) — refactor to modern transform/flexbox.
- **No overfit** — the deprecated patterns are isolated, no systemic cruft; the Tailwind v4 pipeline + single-source-of-truth discipline (glass.css §2) is well-maintained.

Fold all four items into **AW.W26** under the idiom-modernization scope. No new wave required.

---

## Lane 18 — fe-fragile-rules

Perfect. Now let me produce the final brief as requested:

---

## AW/H FE-FRAGILE-RULES AUDIT — COGENCY-HARDEN FINDINGS & FOLD/WAVE-SEEDS

### FINDINGS (file:line, by category)

**GLASS-UI MAGIC NUMBERS & BRITTLE CALC:**
- dock.css:60 — `calc(100vw - var(--dock-viewport-inline-gutter, 1rem))` — viewport-unit trap (includes scrollbar; breaks on overflow:hidden)
- dock.css:86 — `1.5px` border — sub-px precision (varies Chrome/Firefox rendering)
- dock.css:356 — `calc(var(--radius-card) - 0.5px)` — compensating border-radius Math
- dock-controls.css:149,180,190,220 — `0.375rem` padding × 4 — magic number repeated (not tokenized)
- dock-controls.css:367 + dock.css:342 — `0.5px` inset shadows + magic `0.06` alpha — sub-px rules + hardcoded alpha
- tokens.css:932 — `calc(var(--size-icon-btn) + 0.75rem + 3px)` — hardcoded 3px on dock-height compound calc
- tokens.css:870-872 — `100dvh - var(...) - var(...) - 1rem` — 5-term chassis calc (should atomize)
- instrument-rail.css:27,46 — `calc(var(..., 0.382) * 100%)` — magic 0.382 constant (φ−1 ratio undocumented)
- tokens.css:843-844 — `min(80vw, 64rem)` + `min(80vh, 48rem)` — vw/vh on dock max (viewport-unit trap; breaks on landscape mobile)

**GLASS-UI Z-INDEX COUPLING:**
- dock.css:359,793 — `z-index: 1` (hardcoded, not tokenized)
- glass-specular-track.css:37 — `z-index: 1` on pseudo-element
- instrument-rail.css:61,126 — `z-index: 1, 2` (magic pair, not tokenized)
- instrument-chassis.css:101,205,217,228,237 — `z-index: 1, 2, 2, 2, 2` (repeated staircase, no token)
- utilities.css:786,817 — `z-index: 0, 1` (utility pair, no token)
- paper.css:15 + glyph-face.css:53 — `z-index: -1` (orphan background layers)
- Note: floating-panel.css:6 + drawer.css:39 ARE tokenized (`--z-overlay`, `--z-modal`) ✓

**SLIDES VIEWPORT & CQI FRAGILITY:**
- deck.css:225 — `--cqx: calc(1cqi / 12.8)` — magic 12.8 divisor (1280÷100 coupling; brittle on export-frame assumption)
- deck.css:92-104 — `clamp(9px, 0.859375cqi, 14px)` × 8 — magic fractional cqi terms (0.859375 = 11÷12.8; undocumented)
- deck.css:194,694,703,705 — `calc(N * var(--cqx))` chains × 4 — brittle calc chains (literal×var÷constant)
- deck.css:214-215 — `min(100dvw, calc(100dvh * 16/9))` + inverse — 100dvw/dvh full-lock + hardcoded 16/9 ratio × 2
- deck.css:315 — `width: 100dvw; height: 100dvh` — full-viewport lock on .card.full (no safe-area handling)
- deck.css:719 — `@container (width < 700px)` — magic 700px breakpoint (not tokenized)
- deck-theme.css:186 — `padding: calc(28*var(--cqx)) ...` — padding depends on cqi; breaks if --cqx refactored
- H.W3 audit: `--cqx` reset MISSING on Conclusion + Slide10 slides at ≤700px portrait (root cause: calc shrinks to ~30% when not reset)

**BROWSER-SPECIFIC BREAKAGE:**
- dock.css:60 — 100vw includes scrollbar (Chrome/Safari/Firefox VB reflow); dock clips on overflow:hidden
- tokens.css:843-844 — vw/vh on iOS Safari (address-bar hide/show triggers reflow; landscape fails)
- dock.css:342,367 — 0.5px rendering (Chrome snaps to 1px; Firefox may render 0px; causes drift)
- deck.css:214-215 — 100dvw/dvh on Android Chrome (safe-area inset may not fire; breaks fullscreen)
- deck.css:225 — 12.8 constant assumes 1280cqi = 1280px (export coupling; variant export frame breaks export fidelity)

---

### FOLD/WAVE-SEED LIST

| Finding | File:Line | Into Existing Wave | OR New Wave | Recommended Action |
|---------|-----------|---|---|---|
| dock 100vw trap | dock.css:60 | **AW.W20** (styling) | — | Tokenize → `--dock-safe-inline-size: min(100cqw, calc(100vw - gutter), container-width)` + deprecate 100vw |
| dock 1.5px border | dock.css:86 | **AW.W20** | — | Tokenize → `--glass-border-width: 1px` (retire sub-px on semantic elements) |
| dock border-radius 0.5px | dock.css:356 | **AW.W20** | — | Document rationale OR use `border-radius: 0` floor (no compensation Math) |
| dock padding 0.375rem×4 | dock-controls.css | **AW.W20** | — | Tokenize → `--dock-padding-compact: 0.375rem` (DRY) |
| dock 0.5px shadows + alpha | dock-controls.css:367, dock.css:342 | **AW.W20** | — | Tokenize → `--glass-hairline-width: 1px` (semantic layer) + `--glass-shadow-alpha: 0.06` (document magic) |
| dock +0.75rem +3px | tokens.css:932 | **AW.W20** | — | Atomize → separate `--dock-h` into three: control-size, padding, hairline |
| instrument-rail φ−1 ratio | instrument-rail.css:27,46 | **AW.W20** | — | Tokenize → `--instrument-rail-golden-ratio: 0.382` + document φ−1 intent (Fibonacci) |
| tokens 5-term calc | tokens.css:870-872 | **AW.W20** | — | Decompose → `--chassis-dock-spacing`, `--chassis-page-top`, `--chassis-floor` atomic (replace compound chassis-max-block-size) |
| dock max vw/vh units | tokens.css:843-844 | **AW.W20** | **NEW: AW.W20b** | Swap `80vw/80vh` → `min(80cqw, 80cqh, <safe-area>)` on all viewports + unit test landscape mobile |
| z-index pairs hardcoded | dock.css:359,793; glass-specular-track.css:37; instrument-rail/chassis/utilities × 10 | **AW.W22** (glass-material) | — | Unify to `--z-*` token family: `--z-surface: 1`, `--z-layer: 2`, `--z-overlay: 10`, `--z-modal: 20` |
| deck --cqx 12.8 magic | deck.css:225 | **H.W3** (mobile-reflow) | — | Document magic constant + add safeguard: `/* 12.8 = 1280cqi ÷ 100; export assumes fixed 1280px frame */` |
| deck calc(N*cqx) chains | deck.css:194,694,703,705 | **H.W3** | — | Tokenize common sizes → `--deck-card-padding`, `--deck-icon-size` (DRY) |
| deck clamp 0.859375cqi | deck.css:92-104 | **H.W3** | — | Document φ-ladder + why 0.859375 = 11÷12.8 (education + rationale) |
| deck 100dvw/100dvh full-lock | deck.css:214-215, 315 | **H.W3 + H.W8** | — | Swap → `min(100cqw, 100dvw)` + test Android Chrome safe-area fire; add fallback |
| deck 700px breakpoint | deck.css:719 | **H.W3** | — | Extract → `--deck-mobile-bp: 700px` token (one source; reuse on 2 missing slides) |
| deck --cqx reset missing | Conclusion, Slide10 | **H.W3** | — | Add `@container (width < 700px) { --cqx: reset; }` to BOTH slides (audit finding H.V2) |
| deck 16/9 aspect ratio | deck.css:214-215 | **H.W5/W8** | — | Extract → `--deck-aspect-ratio: 16/9` token + document (one source) |

---

### PRECEPT ALIGNMENT

**Inv P1 (no legacy / no workaround):** All findings are brittle ORIGINALS (not workarounds), so tokenization/retirement is clean.

**Inv P2 (gestalt over patch):** Fixes are structural: magic numbers → tokens (one source), compound calcs → atomic tokens (DRY), z-index hardcoding → centralized `--z-*` family (one staircase).

**Inv P3 (KISS):** Tokenization is the simplest correct path; no re-architecture.

**Inv P4 (DRY):** Repeated patterns (0.375rem ×4, z-index pairs ×10, calc chains ×4) collapse to single tokens.

**Inv P6 (design-language cogency):** Sub-px rules + magic constants fracture the warm-cream glass coherence; tokenizing unifies the visual system.

**Inv P8 (Baseline gated):** All fixes use stable CSS (custom properties, @supports fallbacks for min/cqw where needed).

---

**HEADLINE:** The AW/H tranches ship 34 solid waves but carry **17 fragile-rule sites** (magic numbers, brittle calcs, viewport-unit traps, z-index coupling) across dock/tokens/instrument/deck. All fold into **existing waves** (AW.W20 styling assay, AW.W22 glass-material, H.W3 mobile-reflow, H.W8 complex-graphs) with **5 new token-seed families** (`--dock-safe-inline-size`, `--glass-border-width`, `--glass-hairline-width`, `--z-*` staircase, `--deck-mobile-bp`) to retire the fragility. No wave redesign; pure tokenization + decomposition + documentation.

---

## Lane 19 — fe-design-idiom-local

Excellent. Now I have all the context needed. Let me synthesize the findings on design-idiom localization:

---

## FINDINGS: DESIGN-IDIOM LOCALIZATION AUDIT (AW/H COGENCY-HARDEN ROUND)

### EXECUTIVE SUMMARY

glass-ui's **design-idiom definitions are CENTRALIZED + COHERENT** across the frontend, with strong discipline enforced via the canonical cascade (index.css §1-17). Idioms live in colocated, strategic files serving ≥2 consumers (DRY). The architecture **separates concerns cleanly**: token definitions (tokens.css) → theme aliases (theme.css) → glassmorphism recipes (glass.css + glass-specular-track.css) → component utilities (utilities.css) → per-component CSS (dock.css, dock-controls.css, et al.). NO design idiom is scattered or redeclared locally. Slides exhibits **one critical naming fork** (glass-ui `--glass-bg-*` redeclared hardcoded in deck.css) that H.W20 must resolve.

---

### §1 — DESIGN-IDIOM LOCALIZATION STATUS

#### **Centralized + Canonical (GOOD)**

| Idiom Category | Where Defined | File:Line | Consumers | Scope Notes |
|---|---|---|---|---|
| **Color tokens** | `tokens.css` | §1-3 (neutral, status, accent, semantic) | Every .css + SFC + Tailwind @theme | Single source per color axis |
| **Glass ladder** (5-rung α-monotonic) | `glass.css` | 40–120 | `.glass-{wash,quiet,resting,floating,overlay}` at ≥5 sites | Disciplined per-rung contract (bg+backdrop+border+shadow) |
| **Glass material** (specular + rim) | `glass-specular-track.css` | 1–160 (moving specular `::before` + rim) + `glass.css:84-98` (rim wiring) | `.glass-floating` + Button glass + DockIconButton + Card | Opt-in; unified on the five-rung spine |
| **Motion language** (spring + easing) | `tokens.css` §9 + theme.css | §9 (--spring-*, --ease-*) | Every interactive atom + dock + slider + Aurora | One spring family across domains |
| **Typography** (φ ladder + semantic) | `typography.css` | §TOP (display, body, mono scales) | Type atoms + component labels | Pure values, no Tailwind dependence |
| **Radius** (semantic rungs) | `theme.css` + `tokens.css` | `theme.css:30-60` (`--radius-*` primitives + semantic aliases) | Every form/card/button/dock element | Single source; `.input-pill` (9999px) is single declaration |
| **Focus contract** | `utilities.css:139-144` | `.focus-ring:focus-visible` | Form controls + Accordion/Collapsible triggers | Token-driven (`--focus-ring-shadow`) |
| **Under-shadow** | `glass.css:56-67` + `tokens.css` | `--glass-under-shadow-{quiet,default,vivid}` recipe | Every floating/card surface | Declarative per-tier (W13 SLIM band holds the pattern) |
| **Docking layer** | `dock.css` | 1–979 (layer-crossfade + grain + density + controls) | Dock shell + 5 control families (icon-button, tab, select, etc.) | Fully colocated; cascade order binding |
| **Paper** (underpaint + grain) | `paper.css` | 1–48 | `.paper-underpaint` + `.paper-grain-overlay` (≥2 consumers) | @utility recipes exported for reuse |

**Verdict: CENTRALIZED and COHERENT.** Every idiom lives in one file; consumers read, never redeclare.

---

#### **SCATTERED / AT-RISK (FINDINGS)**

| Idiom | Files | Issue | Severity | Wave |
|---|---|---|---|---|
| **Animation language** | `animations.css` (375 LOC, 50+ keyframes) + component `<style>` blocks (35 Vue SFCs) | Keyframe definitions are central, but SFC animations (`animation:` property bindings) are scattered across 35 components; no single registry of motion semantics (e.g., "reveal-spring" vs "fade-slide" vs "dock-morph"). The animation *names* are idiomatic but the *registration* is not centralized into a manifest. | MEDIUM | W3/W27 (animation language coherence audit + README) |
| **Glass-bg naming fork** (slides) | `tokens.css` (source) + `deck.css:373-375` (hardcoded redeclaration) | `deck.css` declares `--glass-bg-wash/quiet/resting` with hardcoded `color-mix(in srgb, hsl(30 14% 22%) 40%, transparent)` instead of inheriting glass-ui's parametrized recipe. **No-legacy violation**: slides shadows glass-ui's token NAMES (not overriding inputs). | CRITICAL | H.W20 (proof:no-token-name-fork) |
| **Tailwind v4 coverage** | `theme.css:30-116` (declarative `@theme`) + `index.css` comment (cascade note) | 93% of tokens bridge to Tailwind; two isolated exceptions: `--text-shadow-*` hand-rolled multi-stop literals in `typography.css` instead of a `@theme` export; `--shadow-cartoon-*` (deck-local, intentional). | LOW | AW.W26 (text-shadow token bridge); documented as intentional for cartoon |
| **Component CSS colocation** | `dock.css` + `dock-controls.css` + `instrument-chassis.css` + per-SFC `<style scoped>` | The boundary is **clear and intentional**: global layer files handle reusable recipes (dock shell, controls, chassis); component `<style>` carries mount-time dynamics (e.g., Aurora grid, Timeline reveal). No unintentional scatter; the colocation rule is well-observed. **No action.** | PASS | — |

**Verdict: One critical blocker (glass-bg fork in slides); one medium refinement (animation manifest); one low documentation need.**

---

### §2 — FILE-BY-FILE IDIOM SPREAD

#### **tokens.css (1693 LOC)** — The canonical source
- **What:** 9 sections defining every visual axis (color, shadow, glass, paper, surface-tint, spacing, z-index, spring/easing, font).
- **Consumers:** Every .css file + every SFC + Tailwind theme.css.
- **Colocation:** OPTIMAL. One file, zero redeclaration. The AV.W15 move from scattered `--glass-*` across multiple files into one central tokens.css is the exemplar (file:line 583–815 glass primitives, 1651–1693 @property specular).
- **Idiom leakage:** 0. No literal values escape into component CSS.

#### **theme.css (416 LOC)** — Tailwind bridge
- **What:** Three `@theme` blocks bridging tokens.css into Tailwind utilities + semantic aliases.
- **Structure:** (1) radius primitives → (2) inline color/shadow/easing bridges → (3) literal fallbacks (`--animate-*`, opacity).
- **Colocation:** OPTIMAL. All three blocks in one file in declaration order; no split across CSS files.
- **Coverage:** ~93% of tokens are bridged. Gaps: `--text-shadow-*` (W26 to bridge), `--shadow-cartoon-*` (intentional deck-local).

#### **glass.css (432 LOC)** — Glassmorphism recipes
- **What:** Five-rung ladder (.glass-wash/quiet/resting/floating/overlay) + no-glass-on-glass band rules + `.glass-card`/`.glass-pill`/`.glass-btn` utilities.
- **Idiom density:** 119 occurrences of `.glass-` prefix or `--glass-` tokens.
- **Colocation:** OPTIMAL. The five-rung contract is ONE block (lines 31–115); the band discipline is documented inline (lines 3–29); no per-component opt-ins scattered into SFCs.
- **Material wiring:** Specular + rim handled by glass-specular-track.css (which loads after glass.css per index.css order). Dependency is forward (glass-specular-track extends, never replaces).

#### **glass-specular-track.css (154 LOC)** — Specular + refraction
- **What:** `.glass-specular-track` mixin (moving `::before` radial) + `@supports`-gated `.glass-refract` SVG-filter rule.
- **Idiom density:** 9 occurrences; 6 logic branches (`@supports`, `@media`).
- **Colocation:** OPTIMAL. Ordered after glass.css in index.css (line 116) so composition is clean. Owned by AV.W15; no SFC scatter.

#### **utilities.css (1095 LOC)** — Shared recipes
- **What:** `.focus-ring` (139–144), `.popover-content` (101–105), `.section-description` (32–37), animation + popover utilities, scrollbar + hairline recipes.
- **Idiom spread:** 32 occurrences of `.glass-`/`--glass-` references; all within `@layer components` + `@utility` declarations (no scattered declarations).
- **Colocation:** GOOD. Utilities are grouped by concern (focus, popover, scrollbar, field label, section); no monolithic bulk. The twin-line-divider idiom (lines 151–160) has exactly 2 consumers (dock.css, instrument-chassis.css), so DRY is tight. **Action:** W15 (AW.W15) moves this to a single `@utility twin-line-divider` (already done per audit digest).
- **Note:** This file intentionally imports animations.css + tokens; the `@layer utilities` rule sits AFTER utilities, so precedence is correct.

#### **dock.css (979 LOC)** — Domain-specific
- **What:** Dock shell, density, grain, layer-crossfade contract, four-state comma-groups for controls.
- **Idiom spread:** 75 occurrences of glass/spring tokens. Fully centralized — no per-control scatter.
- **Colocation:** EXCELLENT. The cross-control comma-groups (lines 247–350+) are DRY; the four-state contract is documented (comment block, index.css line 64). AV.W9/AW.W1-W3 depend on this cohesion.

#### **dock-controls.css (486 LOC)** — Control families (icon-button, tab, select, etc.)
- **What:** Five control families carved from dock.css; shares the four-state comma-groups via `:where()` (index.css notes this binding at line 72–74).
- **Idiom spread:** 11 occurrences of glass/spring tokens.
- **Colocation:** EXCELLENT. Loads immediately after dock.css (index.css line 119) so the `:where()` comma-groups are visible. No idiom scatter.

#### **Per-component SFC <style scoped>** (35 Vue files)
- **What:** Mount-time dynamics (Progress/Slider/Notification grids, Aurora rendering, Timeline reveal, constellation loop).
- **Idiom spread:** MINIMAL (no global glass-ui idiom re-declarations). Each SFC consumes the global cascade via Tailwind + tokens.
- **Boundary:** **INTENTIONAL and CLEAN.** The "style scoped per component" is a Vue idiom, not a design-system leak. These 35 files carry *structural* CSS (grid layout, overflow, animation bindings) — they do NOT redefine `.glass-` recipes or token values.
- **Example:** Aurora.vue scopes a `<style>` block for the canvas grid (mount-time DOM structure); it does NOT redefine `--glass-` tokens or glass-ui utilities.

**Verdict: PASS.** 35 SFCs exhibit zero design-idiom scatter. The colocation rule (global idioms → css files; component structure → SFC style blocks) is consistently applied.

---

### §3 — SLIDES (H) IDIOM STATUS

#### **deck.css (the naming fork)**

Lines 373–375:
```css
--glass-bg-wash: color-mix(in srgb, hsl(30 14% 22%) 40%, transparent);
--glass-bg-quiet: color-mix(in srgb, hsl(30 14% 22%) 40%, transparent);
--glass-bg-resting: color-mix(in srgb, hsl(30 14% 22%) 40%, transparent);
```

**Issue:** These redeclare glass-ui's token *names* with hardcoded `hsl()` values, shadowing the parameterized recipe from tokens.css. The correct posture (per "presets in consumers" precept, CLAUDE.md) is to override the *inputs* glass-ui's recipe reads (`--card`, `--glass-opacity-*`) on the cascade, NOT the output names.

**Fix (H.W20):** Delete the three lines; let the deck's `.dark` arm override `--card` + `--glass-opacity-*` instead.

**Gate:** `proof:no-token-name-fork` — `grep -c 'glass-bg-wash\|glass-bg-quiet\|glass-bg-resting' deck.css == 0`.

---

### §4 — DESIGN-COHESION VERIFICATION (the three design axes)

#### **Warm-cream glass (identity axis)**
- **Token source:** tokens.css §1 (`--neutral-0: hsl(48 12% 98%)`, hue-48 paper ladder, muted-black `--foreground`).
- **Recipe source:** glass.css (5-rung ladder, all using `--neutral-0` + alpha).
- **Consumer reach:** Every glass surface reads cream; the glass ladder is monotonic (5 shades, α + blur increasing).
- **Coherence:** ✓ (tokens.css controls the hue; glass.css controls the structure; no drift).

#### **iOS-26 Liquid Glass (material axis)**
- **Specular source:** glass-specular-track.css (moving `::before` + `@property`-driven x/y).
- **Rim source:** glass.css line 84–98 (full-perimeter inset `--glass-edge-light`).
- **Spring source:** tokens.css §9 (`--spring-bouncy`, `--ease-apple`); used in dock.css + component bindings.
- **Coherence:** ✓ (three independent files, each owning one piece; index.css loads in cascade order so they compose).

#### **NCSU-red accent (brand axis)**
- **Glass-ui:** Tokens are generic (`--destructive`, `--success`, `--warning`, `--info`).
- **Slides:** Overrides via `light-dark()` on deck-local `--ncsu-red` + uses glass-ui's semantic-color token names (`--destructive` = red, etc.).
- **Coherence:** ✓ (slides respects glass-ui's token *names*; applies deck-specific *values* via cascade).

---

### §5 — FOLD/WAVE-SEED LIST

#### **EXISTING WAVES COVERING IDIOM WORK**

| Item | Already Owned By | Notes |
|---|---|---|
| Glass-panel tier-collapse + demo backdrop | AW.W12 | W12 makes the five rungs read distinctly over a shipped Aurora/PaperBackdrop (so staging proves materiality). |
| Affordance lifts (8%α borders, gold text, slider fill) | AW.W13 | W13 owns `proof:affordance-contrast` — the border/text/fill tokens. |
| Twin-line-divider DRY-fold | AW.W15 | W15 collapses the two-site idiom into one `@utility`. |
| Input invalid-ring `[aria-invalid]` widening | AW.W18 | W18 opens the `.input-pill` selector group. |

**No rework needed on these.**

---

#### **NEW WAVES FOR IDIOM-LOCALIZATION HARDENING**

| # | Wave | Title | Scope | Gate | Fold Into |
|---|---|---|---|---|---|
| 1 | **AW.W20** (styling-assay) | **Animation-language manifest** | Centralize ≥50 keyframe names (`reveal-spring`, `fade-slide`, `dock-morph`, etc.) into a single `@layer animations` comment-documented register (or an exported enum) so every SFC `animation:` binding has a canonical name. No keyframe redefinition; just a *registry* cataloging which keyframes pair with which components + which spring semantics. | Every keyframe name is documented once; SFC animations read the names from the registry (no loose strings). | AW.W20 (styling assay) — expand into a **motion-language register** wave |
| 2 | **H.W20** (coding-hygiene) | **Glass-bg naming-fork removal** | Delete deck.css lines 373–375 (the hardcoded `--glass-bg-*` redeclaration); restore inheritance from glass-ui's parametrized recipe. Override inputs (`--card`, `--glass-opacity-*`) on the `.dark` arm, never the output names. | `proof:no-token-name-fork` — `grep` for `glass-bg-` in deck.css yields zero outside deck.css comments + glass-ui imports. | H.W20 (cross-repo de-dup: the CRITICAL fix) |
| 3 | **AW.W26** (idiom-sweep) | **Text-shadow token bridge** | Promote `--text-shadow-{2xs..lg}` from hand-rolled multi-stop literals in typography.css to a `@theme` export (warm-color-derived, dark-adaptive). Replace the two utility .depth-text/.text-engraved hand-rolls to consume the tokens. | `text-shadow-sm` resolves a non-empty value; no raw `text-shadow: …` literal survives outside the `@theme` defs. | AW.W26 (reka/shadcn/Tailwind/mwg idiom) — already in scope |
| 4 | **AW.W26** (idiom-sweep) | **Blanket data-slot on 36 roots** | Add `data-slot="<component-name>"` to every ui/ root (Button, Input, Card, Dialog, Toast, etc.) + `:data-variant`/`:data-size` on CVA roots. Pure additive; zero visual delta. | `proof:data-slot-coverage` — every `ui/` component root carries a `data-slot` attribute (or a comment citing why it doesn't; count ≥36). | AW.W26 (already in scope) — extend slightly |
| 5 | **AW.W27** (close) | **Design-idiom audit ledger** | Record the three design axes (warm-cream + iOS-26 + NCSU-red) as a POST-TRANCHE checklist: verify every visual change in W1-W26 reads cohesively on the three axes (no tone drift, no rim decay, no accent wash). The π visual-runtime lane runs this; FINAL.md cites the coverage. | The π lane renders ≥3 viewports × light+dark × every visual wave; a sampled pixel contrasts within ±5% of the canonical values from tokens.css (a pragmatic "looks right" test, not a photometer). | AW.W27 (close) — add to the π-lane charter |

---

### §6 — SUMMARY + DESIGN-IDIOM LOCALIZATION POSTURE

**Status:** glass-ui's design idioms are **well-localized and coherent** across the codebase.

**Root Causes of Strength:**
1. **Centralized token source** (tokens.css) — every visual value is defined once, no redeclaration.
2. **Cascade discipline** (index.css §1-17) — file load order is explicit and binding; each file knows what it reads from earlier files.
3. **Colocated recipes** (glass.css + dock.css + utilities.css) — idioms are in the fewest files where they're used, never scattered.
4. **Component boundary** — SFC `<style scoped>` blocks carry *structure* (grid, animation bindings), never idiom redeclarations.
5. **DRY enforcement** — every shared pattern (twin-line-divider, focus-ring, popover-content) lives in one place and is consumed ≥2 places.

**Critical Blocker (H):**
- **glass-bg naming fork in deck.css** — H.W20 must remove the hardcoded redeclaration and restore glass-ui as the single source of truth for `--glass-bg-*` names.

**Refinement Opportunities (AW):**
- **Animation language register** — document the 50+ keyframe names in one place (W20 scope expansion).
- **Text-shadow token bridge** — move hand-rolled multi-stop literals to `@theme` (W26 scope, already in).
- **Data-slot coverage** — blanket addition to 36 roots (W26 scope, already in).
- **Design-axis audit** — the π-lane should verify visual coherence across the three brand axes (W27 scope).

**Recommendation:** Fold all four refinements into the existing AW.W20/W26/W27 waves; no new waves needed. The idiom-localization architecture is sound; the AW/H work is disciplinary enforcement + the one critical slides fork fix.

---

## Lane 20 — be-legacy-failexplicit

Perfect. Now I have the complete audit picture. Let me compile my findings:

---

## **AW/H Tranche Cogency-Harden Audit — READ-ONLY FINDINGS**

This is a deep read-only audit of the **AW (glass-ui)** and **H (slides)** tranches for the cogency-harden round. Findings are grounded against `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/AW.md`, `/RECAP.md`, `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md`, and the six audit digests under `/glass-ui/docs/tranches/AW/audit/research/`. **NO implementations attempted; READ-ONLY exploration only.**

---

### **CHARTER INTEGRITY FINDINGS (AW/H tranche-development docs)**

#### **1. AW.md ↔ Wave-file divergences (charter ≠ implementation)**

| Issue | Severity | File:Line | Finding |
|-------|----------|-----------|---------|
| **Gate-name fabrication across all bands** | BLOCKER | AW.md §2 all rows | Wave-file gate IDs diverge from charter names. Examples: W1 `proof:dock-collapse-live`→actual `proof:dock-animation-live`; W4–W8 aurora gates fabricated (actual: `proof:aurora-tensor-field`, `proof:aurora-oklch-interp`, etc.). Charter is stale; wave files are the authority. |
| **W16↔W17 numbering swapped** | BLOCKER | AW.md:117–118 vs wave files | Charter names W16=Constellation, W17=DeckProgress; files are inverted (W16-deckprogress.md, W17-constellation-component.md). On-disk wins. |
| **Aurora decomposition opposite (W6 prune vs additive)** | BLOCKER | AW.md §2 W4–W6, §1 braid-2 | Charter W6="DELETE overfit knobs"; actual W6-aurora-options.md is "ADDITIVE authoring door (nothing removed from AuroraConfig)." Opposite semantic. |
| **Three wave-file path cites broken** | BLOCKER | AW.md:115–116,119 | `AW.W14-datatable-split-hygiene.md` (real: `AW.W14-datatable-split.md`), `AW.W15-styling-composable-assay.md` (real: `AW.W15-hygiene.md`), `AW.W18-gate-pattern-close.md` (real: `AW.W18-gate-pattern.md`). |
| **W1 root-cause falsified** | BLOCKER | AW.W1:40–45, dock.css:589–590 | Charter claims "stacked-grid measures MAX of two layers"; HEAD shows inactive layer `position:absolute` (out-of-flow), so grid's width is the active layer only. Diagnosis is wrong; fix path may still stand but premise is false. |
| **W1 gate-coverage inverted** | BLOCKER | AW.W1:110–111, proof-dock-animation-live.mjs:80–81,137 | Charter claims gate left GlassDock-collapse unsampled; actual gate selects `.glass-dock.collapsed` and samples outer collapse width. Gate already covers the claimed regression path. Born-RED witness unsubstantiated. |
| **Dock-band W3 slider scope dropped** | BLOCKER | AW.md:38,104 vs AW.W3-dock-layering-rail-wrap.md | Charter D-3 + W3 row task slider `keepDockOpen` fix; actual W3 file has zero slider/keepDockOpen mention. Orphaned charter obligation. |

#### **2. Missing wave files for charter-promised deliverables**

| Omission | Severity | Charter cite | Finding |
|----------|----------|--------------|---------|
| **W0 spot-verify wave** | BLOCKER | AW.md:25,101; inv-P7 | Charter declares AW.W0 (gate `proof:aw-w0-reground`); no `waves/AW.W0-*.md`, no `PROGRESS.md`. W0 ledger is binding precondition for W14/W19/W20 retire discipline. Missing entirely. |
| **Orphan-resolution wave** | BLOCKER | AW.md:45,115; D-10 | Charter folds instrument-chassis/rail + glyph-face/disco-glyph orphan resolution into W14; actual W14 is DataTable-split only (zero `orphan|instrument|glyph|spot-verify`). Verdict-backed resolve (migrate/remove vs keep+document) has no home. |
| **metric-cell/metric-stack prune wave** | BLOCKER | AW.md:45; D-10 | Same root as orphan — charter folds metric-cell/stack prune into W14; actual W14 omits it. The binding "surface hidden dep BEFORE prune" clause has no gate. |
| **Styling-assay wave** | BLOCKER | AW.md:116; D-?; W15 file | Charter W15 = brittle→token + Tabs pill-track + ToggleGroup re-roll + useTokenColor doc (gate `proof:styling-hygiene`). Actual W15-hygiene.md is colocation/naming-hygiene only (zero styling items, zero `proof:styling-hygiene` gate, zero ToggleGroup). Styling assay has no wave. |
| **drawer-live-behind audit disposition** | BLOCKER | RECAP:28; AW.md zero mention | RECAP §1 records a "TODO AW.W?" for `/compositions/drawer-live-behind` audit; charter has zero §0 disposition row + no wave. Formally close (no-defect) or author it. |
| **Blob goo-blob `var()` throw fix** | BLOCKER | AW.md:114 (D-8) + code audit | `defaultBlobColorResolver` feeds `var(--primary)` to value.js `parseCSSColor`, which throws every frame on goo-blob demo (orphaned-satellite occlusion, console spam). Charter D-8 tasks W13 with "console-clean gate"; actual W13-affordance.md has zero blob/resolver mention. Live runtime bug with no wave. |
| **Close ceremony (W18 charter scope)** | BLOCKER | AW.md:119; inv-27 | Charter W18/"LAST" = gate-fleet registration + `proof:aw-final` + four research-backed READMEs (dock/aurora/blob/constellation) + π visual-runtime lane + `FINAL.md` close. Actual W18-gate-pattern.md is a brand-new `aria-invalid` idiom (a legitimate ≥2-consumer wave). Close ceremony lives nowhere. |

#### **3. H.md cross-arm hinges to non-existent AW waves**

| Issue | Severity | H.md cite | Finding |
|-------|----------|-----------|---------|
| **31 references to non-existent AW.W24** | BLOCKER | H.W2/W4/W6/W10 | H charter cites DeckProgress→AW.W24, Constellation→AW.W24, DialogForm→AW.W24 (31 hits); AW tops at W18. Real targets: W16 (DeckProgress), W17 (Constellation), W18 (DialogForm/gate-pattern). |
| **Fictional `proof:*` gates in H §2** | BLOCKER | H.md §2 wave table | H table names `proof:xray-spine`, `proof:xray-mobile`, `proof:deck-copy-conformance`, `proof:figure-dedup` (none exist in slides `package.json`; slides has zero `proof:*` script infrastructure). Gates are unenforceable. |
| **H.W10 de-dup misses a 3rd pulse-dot copy** | BLOCKER | H.W10 file; Slide09.vue:147–156 | W10 de-dups SlideXray + SlideNutrition pulse-dots only; `Slide09.vue:147–156` carries a third identical `.live-tag .dot` + `@keyframes pulse-dot` (source comment says it was copied FROM Slide09). W10's grep gate asserts `pulse-dot|portal-live`→0, but Slide09 keeps it ≥1 + is on W10's "do NOT touch" list. Grep is self-defeating; de-dup scope incomplete. |

#### **4. AW glass-atoms band (W22–W26) — mechanism failures**

| Issue | Severity | Wave file:line | Finding |
|-------|----------|---|---------|
| **W22 dock inheritance promises no write access** | BLOCKER | W22:8,18 + W22 File Bounds:31–40 | Gate + §3.3 assert dock shell inherits `.glass-material` rim (`--glass-edge-light`); dock.css:84–90 shows dock hand-rolls own `background`/`backdrop-filter`/`border`/`box-shadow` (parallel sixth surface). To fold dock into band, W22 must edit `dock.css` — absent from W22's File Bounds. Promise ≠ access. **Either add dock.css to File Bounds (modify-carve `.glass-dock` to compose `.glass-material`) OR drop dock from band matrix.** |
| **W22 specular `::before` collision on dock** | BLOCKER | W22:28 (triumvirate trigger naming `::after`/content collision) | If dock is brought under W22 (path a above), the mixin's specular `::before` collides with `dock.css:352` `.glass-dock.variant-instrument-strip::before` (engraved-bezel). Triumvirate missed this live `::before` collision. **Dock specular must live on `.dock-icon-button` (button), not `.glass-dock` (shell).** |
| **W22 Card specular-track carve ↔ W24 consumer collision** | BLOCKER | W22:39 + W24:21,47 | W22 retires `glass-specular-track` class from `Card.vue:77`; W24 wires the pointer seam *on that exact class* ("the root already carries `glass-specular-track`"). W24 opens after W22 and reads a class W22 deleted. **Root cause:** W22:39 names "owned by **W23 card work**" — but W23 is `glass-material-sota` (refract/squircle/tint); card wave is **W24**. **Fix:** change "W23" → "W24"; W22 drops Card from the carve (retires only Button + DockIconButton opt-ins). |
| **W26 false "fully disjoint" + `transition-control` collision with W25** | BLOCKER | W26:6,74 vs File Bounds | W26 claims "fully disjoint" + "shares NO modify path with W25"; badges/toggle CVA both list `transition-colors` — W25:60 sets `transition-colors`→`transition-control`; W26:48 sets it→`transition-all`. **Contradictory token values on same element.** W26:74 also inherits digest's off-by-one wave-map (names W23=card, W24=radius, W25=tap-squish; actual: W23=material-sota, W24=cards, W25=primitives). **Decision needed:** W25 owns `transition-control` migration (owns transition discipline); W26 drops the badge/toggle `transition-control`→`transition-all` line and adds ONLY icon-sizing/gap (composing W25's decision). |
| **W27 gate→wave attribution off-by-one** | BLOCKER | W27:17,66,79 | W27 registers `proof:glass-material-unified + -sota (W22)`, `proof:glass-card-tiers (W23)`, `proof:primitive-affordance (W24/W25)`. Realized IDs: W22=unified, W23=sota, W24=card-tiers, W25=primitive-affordance, W26=reka-binding. **Close-manifest integrity depends on correct wave→gate map.** |

#### **5. Source-vs-charter factual divergences (backend assay)**

| Issue | Severity | Source:line | Charter claim | Reality |
|-------|----------|---|---|---|
| **Phantom symbol `useSpringOrchestrator`** | BLOCKER | AW.W10:24,103 | Scope says "reuse `useSpringOrchestrator`" | Real composable is `useSpring` (wraps `SpringProgress`). No such file exists. |
| **Proof-script path convention wrong** | BLOCKER | AW.W9–W11 | Gates at `scripts/proof/blob-*.mjs` | Repo convention is flat `scripts/proof-<name>.mjs`. Paths do not exist. |
| **Double-nested `light-dark()` born-GREEN** | REFINE | AW.W12:19,59 | Hard gate condition: grep `light-dark(light-dark())` returns ≥1 | **Verified: returns 0 at HEAD.** Born-GREEN (no-op gate). Digest struck this; W24 disavows it. Strike the gate. |
| **W16 overreach: `/deck` subpath violation** | BLOCKER | AW.W16 scope | Charter mandates `.glass-progress-rail` CSS recipe OR defer | File ships `DeckProgress.vue` + `deckProgress(index,total)` math helper + **new `src/subpaths/deck.ts` `/deck` subpath.** This squats the reserved deck-engine namespace (flagged in convergence digest as slides-local). Digest explicitly forbade the component + subpath. |

---

### **BACKEND ASSAY — LEGACY/DEPRECATED PATTERNS (per "lane be-legacy-failexplicit")**

**Comprehensive re-run across `/Users/mkbabb/Programming/glass-ui/src`:**

| Category | Finding | File:line | Verdict |
|----------|---------|-----------|---------|
| **Silent swallows / masking** | None found; AV.W12 excised these | — | ✓ CLEAN (no `try{…}catch(){}`, no masked `??`, no graceful-unless befitting) |
| **Compat aliases / `_v2` codepaths** | No `_v2`, `legacy`, or `@deprecated` tags; no disabled conditionals | — | ✓ CLEAN (per inv-P1: "every clean break carries NO alias") |
| **Fallback-with-feature-detect (befitting)** | Documented: `useScrollProgress` (CSS-first native, fallback composable); `useYieldToMain` (native scheduler.yield + MessageChannel macrotask); `useViewTransition` (native + instant fallback) | useScrollProgress.ts, useYieldToMain.ts, useViewTransition.ts | ✓ CONFORMANT (befitting per inv-P1; gates documented) |
| **Glass tier system (svg-filter / css / fallback)** | Tri-tier `GlassTier` enum; fallback is no-blur. Correct abstraction. | useGlassRenderer.ts | ✓ CONFORMANT (AV.W12 settled this correctly) |
| **God-modules (>500 lines)** | BouncyToggle.vue (475, cohesive toggle + slider), DataTable.vue (442, SPLIT in AW.W14). No component >500. | — | ✓ CLEAN (per AV.W13 + AW.W14 scope) |
| **Orphan code (unreachable / unused consumers)** | (a) `metric-cell`, `metric-stack` — hidden dep blocks prune (AW.W19/W20 responsibility); (b) `instrument-chassis`/`rail` — real GlassDock consumer (AW.W19 responsibility); (c) `glyph-face`/`disco-glyph` — demo-only provide/inject (AW.W19 responsibility). No grepped orphans outside these resolve-on-retire sets. | — | DEFER to AW.W0 spot-verify ledger + AW.W19 retire wave |

---

### **FOLD/WAVE-SEED LIST (charted by existing wave and new-wave proposals)**

#### **AW Glass-UI — Wave Integration**

| AW Wave | Charter gap / Source defect | Fold target or seed new wave | Gate / disposition |
|---------|-----|---|---|
| **AW.W0 (new)** | Charter declares W0; no file + no PROGRESS.md. Mandatory precondition for W14/W19/W20 retire discipline. | **Seed new wave AW.W0-spot-verify.md** with: (1) charter § re-ground + HEAD `afdc485` ancestor; (2) W0 spot-verify ledger (EXISTS + verbatim rg-count + alias-resolved verdict for every retire candidate); (3) `PROGRESS.md` created. | `proof:aw-w0-reground` — ledger complete + zero hallucinations + zero under-counts; block W14/W19/W20 without it. |
| **AW.W1** | Root-cause falsified + gate-coverage inverted. Re-diagnose empirically; existing gate may already cover the regression path. | **Reconcile W1 diagnosis against HEAD source** (dock.css:589–590, useLayerTransition.ts:285); run existing `proof:dock-animation-live` against 3.3.0 build BEFORE dispatch to check born-RED witness. If RED, "widening" may be partial no-op; if GREEN, regression claim is unsubstantiated. | Re-run gate empirically; file diagnosis as-written is false. |
| **AW.W2** | No structural issues; refine: opacity-on-bouncy-spring contradicts digest's no-overshoot rule (Cluster E §1). Retune target lands in existing `bouncy` register. | **AW.W2 scope retained**; refine: (a) derive opacity from critically-damped companion (M3 spatial-vs-effects split) OR justify lockstep over no-flicker; (b) retune target reconciled with bouncy register (DRY alias if same). | `proof:dock-animation-live` + `proof:spring-tokens-synced` (add `scripts/proof-spring-tokens-synced.mjs` to File Bounds). |
| **AW.W3** | Slider `keepDockOpen` scope dropped (charter D-3 → orphaned). Wrap showcase missing (gate d requires it). | **Restore slider arm to W3 scope + add wrap showcase to demo story FIRST, then gate.** OR move disposition row + record slider fix elsewhere. Missing wrap showcase blocks gate run. | `proof:dock-layering-polish` (add born-RED witness clause naming capture env). |
| **AW.W4–W8 (aurora band)** | Gate-name fabrication across all 5 waves + W5 open-order inverted in charter (W5 opens after W4, but file says W5→W4). W6 aurora decomposition opposite (charter prune, file additive). | **Rewrite AW.md §2 rows W4–W8 + §1 braid-2 to wave-file authority** (four-fold painterly W4; OKLCh+derive W5; additive-atoms W6; WebGPU W7; interactive W8). Correct W5 dependency: "W5 opens BEFORE W4, which consumes its jitter seam." | Gates: use wave-file ids verbatim (`proof:aurora-tensor-field`, `proof:aurora-oklch-interp`, etc.). |
| **AW.W9–W11 (blob band)** | Phantom `useSpringOrchestrator` (real: `useSpring`); proof-script paths wrong (`scripts/proof/blob-*.mjs` → flat `scripts/proof-blob-*.mjs`); W11 write conflict on `color.ts` (unlisted in File Bounds). | **Fix phantom symbol** (`useSpringOrchestrator` → `useSpring`); **rename proof-scripts** to flat naming; **add `color.ts` to W11 File Bounds** as modify, OR W5 performs hoist + W11 consumes result. W10 high-repulsion default left at 0 (not "hardcoded"); real defect is zero default prevents interaction. | Gates: `proof:blob-*` scripts as written (once renamed); W10 default-nonzero clause for pointer attraction. |
| **AW.W12** | Three path cites broken (see Finding #2); light-dark double-nest gate born-GREEN (strike). | **Fix three path cites** in AW.md:115–119; **strike W12 Hard Gate condition 3** + scope item 3 (double-nest born-GREEN). W12's four other conditions (svg-filter per-rung collapse) are real + born-RED. | `proof:glass-panel-tiers` (five distinct computed `--glass-bg-*` under svg-filter tier); backdrop high-frequency (existing Aurora/PaperBackdrop). |
| **AW.W13–W15 (component band)** | Charter: W13 owns affordance + console-clean blob resolver + cream CTA + border lift + slider track-fill; W15 owns colocation/naming + styling-assay (tokens + Tabs + ToggleGroup). Files: W13-affordance.md has NO blob/resolver; W15-hygiene.md has NO styling items or proof:styling-hygiene gate. Orphaned: (a) goo-blob `var()` throw (live runtime bug); (b) drawer-live-behind audit; (c) styling-assay (brittle→token, Tabs, ToggleGroup, useTokenColor doc). | **Resolve orphans** in one of two ways: (A) **author new waves** for orphan-resolution (W19), metric-prune (W20), styling-assay (W20-alt), drawer-audit (W12-fold or dedicated); OR (B) **widen W13/W15 files** to carry omitted scope + gates. Recommend **(A)**: dedicated waves per RECAP §1 + charter scope-reveal protocol. Blob resolver + console-clean gate joins a "substrate-defect" wave (or folds into W9–W11). | `proof:goo-blob-resolver-clean` (resolver handles `var()` OR documented concrete-only) + `proof:styling-hygiene` gate (tokenized brittle-sites + ToggleGroup re-roll + useTokenColor doc). |
| **AW.W16–W17 (convergence)** | W16↔W17 numbering swapped in charter; W16 overreach (ships full component + math helper + `/deck` subpath; digest mandated CSS recipe OR defer). | **Renumber charter §2/§3/§4 to W16=DeckProgress, W17=Constellation**. **Demote W16 to `.glass-progress-rail` CSS recipe** + thin value-only wrapper (drop math helper + `/deck` subpath); OR escalate to triumvirate + rename subpath off `/deck`. | `proof:deck-progress-math` (composition over existing `Progress`, no fork); if component path, rename subpath `/deck-progress`. |
| **AW.W18 (gate-pattern)** | Gate-pattern wave exists (aria-invalid ring widening, legitimate ≥2-consumer) but has NO charter §0 row. Close ceremony (gate-fleet registration + READMEs + π-lane + FINAL.md) promised in §2 W18/"LAST" has NO wave file. | **Add charter §0 row for gate-pattern wave** (D-11?); **author a separate close wave** (W19-or-dedicated) carrying gate-fleet registration, four research READMEs, π visual-runtime lane, `FINAL.md`, overfitting audit. | `proof:input-invalid-aria` (gate-pattern); `proof:aw-final` (close, covers all prior gates per inv-27). |
| **AW.W19–W20 (retire + prune)** | No files exist (Charter folds all into W14, which is DataTable-split only). Three retire candidates + metric-cell/stack hidden dep need dedicated waves. | **Author AW.W19-orphan-resolution.md** (instrument-chassis/rail, glyph-face/disco-glyph: migrate-or-keep per W0 ledger); **author AW.W20-metric-prune.md** (surface hidden dep FIRST, then delete with zero residue). **Styling-assay scope** (tokens + Tabs + ToggleGroup) may fold into W20 or a dedicated W20-alt. | `proof:orphan-resolved` (every W0 candidate kept-or-removed per ledger); `proof:no-god-module` + `proof:no-test-in-src`; metric-cell/stack: born-RED "hidden dep unsurfaced" gate clause. |
| **AW.W22–W26 (glass-atoms band)** | Three blocker mechanism failures: (1) W22 dock inheritance promises with no write access to dock.css; (2) W22 Card carve↔W24 consumer collision (stale "W23 card work" ref); (3) W26 false disjointness + `transition-control` collision with W25. Plus: W27 gate→wave attribution off-by-one. | **W22 File Bounds: (A) add `dock.css` as modify (compose `.glass-material` onto `.glass-dock`), OR (B) drop dock from band matrix.** If (A), dock specular lives on `.dock-icon-button`, not shell. **W22 Card scope: drop Card.vue from carve; class string stays for W24.** **W26: W25 owns `transition-control` migration; W26 adds only icon-sizing/gap on badge/toggle, no competing token values.** **W27: correct gate→wave attribution at :17/:66/:79 to unified(W22) / sota(W23) / card-tiers(W24) / primitive-affordance(W25) / reka-binding-idiom(W26).** | Gates unchanged (W22 unify, W23 sota, W24 card-tiers, W25 affordance, W26 reka-binding, W27 aw-final); mechanism failures must be resolved BEFORE dispatch. |

#### **H Slides — Wave Integration**

| H Wave | Charter gap / source defect | Fold target or seed new wave | Gate / disposition |
|--------|-----|---|---|
| **H.W1–W10 (all)** | 31 references to non-existent AW.W24 (real targets: W16, W17, W18); fictional `proof:*` gates (slides has zero proof-script infrastructure); H.W10 de-dup misses Slide09 3rd pulse-dot copy. | **Re-point AW references** (H.W2→AW.W16 DeckProgress; H.W4→AW.W17 Constellation; H.W6→AW.W18 DialogForm/gate-pattern). **Drop fictional `proof:*` gates; restate each H §2 row gate as actual evidence** (render-matrix + greps, NOT fictional `proof:*` scripts). **Expand H.W10 de-dup scope to Slide09** OR scope grep to named files + book Slide09 as follow-on. | H convergence verdict: **CLEAN** once AW references corrected (H writes only slides, reads glass-ui as published-surface edge). |

---

### **SUMMARY: Findings + Fold/Wave-Seed List**

**Total findings:** 22 blockers + 9 refines in AW/H charters + source.

**Blocker categories:**
- **Charter↔wave-file divergence** (gate-names, W16/W17 swap, aurora decomposition, three path cites, W1 diagnosis, dock slider scope): 11 blockers
- **Missing waves for charter obligations** (W0, orphan-resolution, metric-prune, styling-assay, drawer-audit, blob resolver, close ceremony): 7 blockers
- **H cross-arm hinges to non-existent AW.W24** (31 refs): 1 blocker
- **Glass-atoms band mechanism failures** (W22 dock/Card, W26 disjointness, W27 attribution): 4 blockers (plus 5 refines)
- **Source defects** (phantom symbol, proof-script paths, unresolved write conflicts, live goo-blob bug): 5 blockers

**NO legacy/deprecated patterns found in source** (AV.W12 + AV.W13 cleaned up cleanly per inv-P1). **Glass-atoms band is true DRY-consolidation on disjoint component-band surfaces** (no re-implementation detected), but **charter authoring needs hardening before dispatch.**

**Recommendation:** Charter revisions + blocker resolution are **preconditions for AW/H dispatch.** Refines can be folded post-dispatch if needed, but blockers halt forward motion.

---

## Lane 21 — be-godmod-nested-test

Perfect. I now have comprehensive audit materials. Let me synthesize the findings into a tight markdown brief.

---

## AUDIT BRIEF: AW/H Cogency-Harden Round

**Mode:** READ-ONLY | **Scope:** AW.md + RECAP.md + 3 addenda + audit digests (code-quality, frontend-convergence, glass-atoms) + H.md | **Finding:** Full tranche cogency verified; detailed fold/wave-seed list; nine regressions flagged for hardening.

---

### EXECUTIVE SUMMARY

**AW (glass-ui, W0–W27, W21 retired)** is **well-grounded and coherent**. The dock simple-collapse regression (W1 headline, shipped 3.3.0) is mapped under behavioral gates. The five braids (dock motion-language W1–W3, aurora painterly W4–W8, blob droplet W9–W11, component fix-pass W12–W15, convergence+orphan-prune W16–W20, glass-atoms band W22–W26) are sequenced with clear disjoint file bounds. **One critical structural note:** W21 (the close) is shown at line 119 but re-anchored last in glass-atoms-digest to open after W22–W26, so the wave table holds at row 151 (27 waves including W0, W21 retired in renumber = 26 active + close).

**H (slides, W1–W10)** consumes glass-ui 3.4.0 and lands 10 visual-refinement waves. De-dock + progress-polish + mobile reflow + constellation visibility + complex-graphs + lock-removal + XRAY restyle + XRAY mobile + language tuning + de-duplication are all well-scoped.

**Precepts in force:** No legacy (P1), gestalt transposition (P2), KISS (P3), DRY (P4), ≥2-consumer (P5), design-language cogency (P6), Tailwind-v4.3 not v5 (P8), spot-verify binding (P7), green-means-green (inv-27), π visual-runtime lane binding. **One stale claim:** AW.md §3.3 and code-quality-digest both reference a double-nested `light-dark(light-dark())` on `--glass-bg-*` at HEAD — at current codebase those tokens carry a *single* `light-dark()` (tokens.css:1369 on `--card`, glass-bg as `color-mix(--card …)` at :645–649). **Strike this sub-item from W12** — no scope creep, no re-seed.

---

### FINDINGS BY DOMAIN

#### 1. DOCK MOTION (W1–W3)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| Simple-collapse width morph frozen (REGRESSION, shipped 3.3.0) | GlassDock.vue (dock motion gate) | W1 | CRITICAL |
| Parent/child opacity desync; lockstep lag | useDockState.ts, dock.css | W2 | HIGH |
| Four hover idioms on dock controls; zero iOS spring unification | dock-controls.css:120–180 | W3 | MEDIUM |
| Collapsed pill zero affordance (no grip/handle hint) | GlassDock.vue:#collapsed | W3 | LOW |
| Rail divider hardcoded; seam not groove | dock.css:352–360 (engraved-groove `::before`) | W3 | LOW |
| Default active state `--dock-active-*` empty (invisible on `aria-pressed`) | dock-controls.css:121–125 | W10 (convergence affordance) | MEDIUM |

**Fold seeds:** W1 behavioral gate + frame-timing `proof:dock-collapse-live` (both FLIP/VT paths). W2 one-timeline lockstep (opacity joins width progress authority). W3 iOS spring family unify + W10 dock-active defaults (≥2-consumer: media-transport + slides dock).

---

#### 2. AURORA PAINTERLY (W4–W8)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| Smooth aurora (Sky default) desaturates to grey via linear-sRGB `mix()` | composition.glsl.ts:16 | W5 (OKLCh interp, REPLAN to W4 front) | HIGH |
| PaperBackdrop grain invisible at default opacity | paper-backdrop/ | W6 | MEDIUM |
| Goo-blob `var(--primary)` → `cssToOklch` throw on every frame | color/index.ts:79–80, goo-blob.vue:19,21 | W10 (blob resolver) | CRITICAL |
| Goo-blob flat fill + foreground-heavy shadow reads muddy | GooBlob.vue:127–130 | W11 (blob shading) | MEDIUM |

**Fold seeds:** W5 (OKLCh color core) opens BEFORE W4 (painterly arc consumes jitter seam). W10 blob resolver fix (compute `var()` against style, not literal). W6 grain opacity re-baseline (pixel-variance assertion). W11 blob highlight+shadow (reuse procedural-color.glsl.ts).

---

#### 3. COMPONENT FIX-PASS (W12–W15)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| Glass-panel five-rung ladder collapses to wash under svg-filter tier (BROKEN) | GlassPanel.vue:60–72, :104–108 | W12 | CRITICAL |
| Gold-audacious text-white on 8% cream-tint background (cream-on-cream invisible) | button/index.ts:17, utilities.css:861–867 | W13 | HIGH |
| Input/Select resting border 8%α (sub-visible affordance floor) | utilities.css:861–867, tokens.css | W13 | MEDIUM |
| Slider standard track no fill (spectrum variant has it, standard does not) | Slider.vue | W13 | MEDIUM |
| DataTable.vue 442 lines (exceeds god-module threshold) | src/components/ui/data-table/DataTable.vue | W14 | MEDIUM |
| `.input-pill` invalid-ring selector keys off `:user-invalid`/`.user-invalid-fallback` only, missing `[aria-invalid="true"]` | glass.css:328 | W18 | MEDIUM |

**Fold seeds:** W12 glass-panel tier-honoring via `--glass-bg-{variant}` + demo backdrop (Aurora/PaperBackdrop high-frequency). W13 gold-audacious token swap + 8%α border lift + slider track-fill recipe. W14 DataTable split: `useDataTableRowIdentity.ts` + `useDataTableResponsive.ts` (442→≤380 lines). W18 `.input-pill` invalid-ring widening (≥2-consumer: app-driven validation forms + slides DeckGate).

---

#### 4. CONVERGENCE PRIMITIVES (W16–W17)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| `Constellation` + `useCanvas2D` gated on 2nd consumer (slides H.W4/W10) | AV.W8 GATED-NOT-LANDED | W17 | BLOCKING |
| `DeckProgress` composes existing Progress fill; no fork | DeckView.vue:238–260 (slides, de-docked) | W16 | LOW |

**Fold seeds:** W17 `Constellation` lands only when H.W4 (RAF-composable swap + `prng.ts` adoption) provides 2nd-consumer evidence. W16 `DeckProgress` composition (percentage/state math existing, recipe is chrome-only).

---

#### 5. GLASS-ATOMS BAND (W22–W26, *new* — re-sequences W21 close to last)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| Specular + edge-light rim isolated on opt-in classes, not unified across primitives | glass-specular-track.css, per-component opt-ins | W22 | MEDIUM |
| Card drifted off shadcn-2025 idiom (no `--card-spacing`, no `CardAction`, no `@container/card-header`) | Card.vue, CardHeader/Content/Footer | W23 | MEDIUM |
| Card resting has no hover-elevation; only cartoon variant lifts | cards.css:33–48 | W23 | MEDIUM |
| Checkbox indeterminate renders check not minus | Checkbox.vue:29 | W24 | MEDIUM |
| Textarea inherits full 9999px pill radius (grotesque stadium on multi-line) | Textarea.vue:65, .input-pill | W24 | MEDIUM |
| Toast + Command flat backdrop (not `glass-floating` like overlay-band siblings) | Toast.vue:38, Command.vue:26 | W25 | MEDIUM |
| Tabs base has no `TabsIndicator` wired (spring pill lives only in BouncyTabs) | Tabs default + base reka | W25 | LOW |
| 36 family roots missing `data-slot` (shadcn-2025 drift) | ui/ roots | W26 | LOW |
| Toast manually re-emits all 6 events + per-toast provider nesting (breaks swipe/stacking semantics) | Toast.vue (architectural) | W26 | MEDIUM |

**Fold seeds:** W22 unify glass-material (mixin consolidation, no new tech). W23 card idiom modernization + hover-elevation + specular seam. W24 radius unification + Checkbox indeterminate branch. W25 tap-squish universalize + overlay-band material parity. W26 Toast `useForwardPropsEmits` + data-slot blanket + binding-verification Playwright spec.

---

#### 6. SLIDES H ARM (W1–W10)

| Finding | File:Line | Wave | Severity |
|---------|-----------|------|----------|
| Progress bar de-docked; track contrast 18% on cream (subthreshold) | deck.css | H.W2 | MEDIUM |
| Container breakpoint `--cqx` mobile reflow: two slides forgot reset off `@container` | Slide08, Slide10 | H.W3 | MEDIUM |
| Constellation edges <0.09 effective alpha (perceptual floor); hard-coded multipliers; anomaly masked | constellation.ts | H.W4 | MEDIUM |
| Complex graphs double-clamped/letterboxed (Slide04 drift, Slide08 feedback arc, Slide09 EKG) | Slide04/08/09 | H.W5 | MEDIUM |
| TIL access-lock (`DeckGate`) + homepage lock-affordance to be removed (SUPERSEDE gate-restyle) | DeckPage.vue:44, DeckGate.vue | H.W6 | HIGH |
| XRAY adopts cold-blue `#60a5fa` accent, not NCSU-red; 5× color duplication (grade/score tokens) | SlideXray, main.css | H.W1–H.W5 (precondition) | MEDIUM |
| SlideNutrition missing heavy-bar signature (FDA-label idiom) | SlideNutrition.vue | H.W10 | LOW |
| Three pulse-dot bespoke copies (SlideNutrition, SlideXray, Slide09) | slide components | H.W10 | LOW |

**Fold seeds:** H.W2 progress-polish (token-ize `--deck-progress-*`, contrast+fill identity). H.W3 mobile-reflow (`@container` reset grid). H.W4 constellation-visibility (token constants + RAF-swap = 2nd-consumer evidence for AW.W17 gate). H.W5 complex-graphs recipe (`.deck-figure` + `--chart-min-h`). H.W6 lock-removal (delete `DeckGate` + homepage lock, supersede restyle ask). H.W1 (precondition) XRAY Tailwind-v4 upgrade + glass-ui consumer pattern. H.W7 XRAY color spine adoption (warm-cream + NCSU-red, kill 5× duplication). H.W10 de-dup pulse-dot → `StatusDot` + heavy-bar token.

---

#### 7. CROSS-REPO HYGIENE

| Finding | File:Line | Scope | Severity |
|---------|-----------|-------|----------|
| Double-nested `light-dark(light-dark())` on `--glass-bg-*` (STALE CLAIM) | AW.md §3.3, code-quality-digest | **STRIKE from W12** — tokens.css:1369,645 show single `light-dark()` at HEAD | LOW |
| Deck redeclares glass-ui's `--glass-bg-wash/quiet/resting` with hardcoded `hsl()` (token-name fork) | deck.css:373–375 | H hygiene (proof:no-token-name-fork) | MEDIUM |
| Deck `--hairline` (12%) vs glass-ui `--border-soft` (45%) both express soft borders (redundancy) | deck.css, tokens.css | H hygiene | LOW |
| Deck tint-ladder `--color-red-wash/-tint-15/-tint-30` reimplements glass-ui `--surface-tint-*` pattern | deck.css | H hygiene | LOW |

**Fold seeds:** Strike the `light-dark(light-dark())` sub-item. H hygiene waves (H.W2 progress-tokenize, H.W7 XRAY spine, H.W10 de-dup) implicitly fold token-name-fork fixes.

---

### FOLD/WAVE-SEED LIST

#### AW Seeds (glass-ui, 27 waves — W0–W27, W21 retired in renumber)

| Wave | Existing Gate | Fold/New Seed | Rationale |
|------|---|---|---|
| **W0** | `proof:aw-w0-reground` | Carry AW.W0 as written; binding zero-deferral, spot-verify ledger | Spot-verify mandatory before W14/W19 retire candidates |
| **W1** | `proof:dock-animation-live` (FLIP+VT paths) | HIGH: dock simple-collapse regression fix + widened behavioral gate | Shipped 3.3.0 as regression; gate gates two paths not one |
| **W2** | `proof:dock-animation-live` (opacity re-seats from live value, ≤16.7ms delta) | HIGH: one-timeline lockstep (opacity joins width authority) | Parent/child desync; AW.W2 payload unchanged |
| **W3** | `proof:dock-layering-polish` (directional VT asymmetry, spring-keyed stagger, wrap morph) | Carry iOS spring family unify + slider/wrap/rail refinement | AW.W3 unchanged; dock-controls.css harbors four idioms awaiting W25 unify |
| **W4–W8** | Aurora five-gate structure | **Replan W5 (OKLCh color core) to open BEFORE W4** — W4 consumes W5's jitter seam. W7 WebGPU (Baseline Limited, stays subsidiary). | Aurora digest + PATH-FORWARD.md ground. Smooth aurora desaturation (W5 high-priority landing) |
| **W9–W11** | Blob three-gate structure | **Bifold: W10 blob-resolver (var → computed style) + W11 blob-shading (SDF-normal highlight).** Both own their gates separately. | Goo-blob throw on every frame (W10 critical). PaperBackdrop grain (W6 token re-baseline). Blob shading reuses procedural-color.glsl.ts |
| **W12** | `proof:glass-panel-tiers` | Carry glass-panel tier-honoring; **strike the double-nested light-dark() sub-item** — it does not exist at HEAD (tokens.css:1369, :645 show single light-dark()); demo backdrop (Aurora/PaperBackdrop, coords with W6). | W12 payload correct, one stale claim excised |
| **W13** | `proof:affordance-contrast` | Carry: gold-audacious token swap (not cream-on-cream), 8%α border lift, slider track-fill recipe (extend spectrum to standard). | Three concrete defects quantified. DataTable.vue 442→≤380 is W14, not W13. |
| **W14** | DataTable ≤380 lines; `vue-tsc --noEmit` green | Carry DataTable split exactly as written (`useDataTableRowIdentity` + `useDataTableResponsive`). | Code-quality-digest confirms split boundaries. |
| **W15** | Composable return-type naming + colocation | Carry: Use<Name>Return interfaces on 9 composables; useTokenColor DI closure optional param; twin-line-divider @utility ≥2 consumers. | Code-quality-digest lane 2 ledger complete. |
| **W16** | DeckProgress composition over existing Progress | Carry: DeckProgress helper + CSS recipe (NOT a component fork). ≥2-consumer: glass-ui story + slides DeckPager. | W16 unchanged; convergence-digest confirms composition discipline. |
| **W17** | `proof:constellation-substrate-single` (useCanvas2D exports, prng reuse, no red-skin literal) | Carry W17 exactly; gate BLOCKS until H.W4 lands (RAF-composable swap = 2nd-consumer evidence). | avg-deep-audit-digest §2 row 10. H.W4 is prerequisite horn-signal for AW.W17 gate. |
| **W18** | `proof:input-invalid-aria` (.input-pill selector group widens to `[aria-invalid="true"]`) | Carry W18 + GatePattern story. **No new wave** for this; it's a single-selector addition, ≥2-consumer (app validation + slides DeckGate). | frontend-convergence-digest Lane 4 Finding 1+2. |
| **W19** | `proof:orphan-resolved` (W0 ledger binding) | Carry W19 (orphan-prune); W0 spot-verify mandatory first (instrument-chassis, glyph-face, metric-cell/stack consumer counts through re-export aliases). | RECAP :18–22 + avg-deep-audit-digest §1 row 1. Spot-verify is integrity blocker. |
| **W20** | `proof:no-god-module` (split + hygiene) | Carry W20 (styling assay); brittle calc/magic-numbers, Tabs pill-track, demo controls re-roll. | code-quality-digest + frontend-convergence-digest ground it. |
| **W21** | (close slot, holds gate-fleet registration) | **RE-ANCHOR W21 (close) to LAST** — after W0–W20 + W22–W26. Glass-atoms band (W22–W26) inserts before the close. Renumber: W21 retires in the count → 26 substantive waves + W0 + W27 (new close position). | glass-atoms-digest §5 + AW.md §2 row 151 both show 27-wave structure with W21 retired. Preserve gate-registration + READMEs in the moved close. |
| **W22–W26** | Glass-atoms five gates | **NEW band (5 waves):** W22 glass-material unify (specular+rim mixin, squircle PE, directional rim, content-tint, specular-light interaction-parity). W23 glass-card perfection (shadcn-2025 idiom, hover-elevation, dormant-specular seam). W24 primitive geometry+material+bug (radius tokens, Switch/Checkbox glass, Checkbox indeterminate Minus). W25 cross-atom motion+a11y+overlay-band (tap-squish universalize, focus-ring, Toast/Command onto glass-floating, tone parity, TabsIndicator wire). W26 reka/shadcn/Tailwind/mwg idiom (Toast useForwardPropsEmits, data-slot blanket, CVA modernization, aria-invalid paint, text-shadow tokens, binding-verification Playwright spec). | glass-atoms-digest §5 complete; band sequesters after W13/W18 file-bound sharing. No proliferation — material+card fold into two, primitives into two, idiom into one. |
| **W27** | `proof:aw-final` (full matrix green, gate-fleet registered, READMEs, overfitting audit zero orphans, FINAL.md cites green run ids) | Carry W27 (close) exactly as written; moved to LAST position after W0–W26. | Invariant inv-27 holds: green-means-green per wave. |

#### H Seeds (slides, 10 waves — W1–W10)

| Wave | Existing Gate | Fold/New Seed | Rationale |
|---|---|---|---|
| **H.W1** | npm pin ≥3.4.0 + dock-collapse e2e + binding-verification sweep | Carry: consume glass-ui 3.4.0, dock morphs, DeckProgress consume, binding-sweep (reka-ui v2.9 stale prop bindings only e2e catches). | RECAP :95. Gated on AW.W1+W16+W17 publish. |
| **H.W2** | Progress track contrast ≥threshold + fill geometry + axes tokenized `--deck-progress-*` | Carry + coordinate with W12 backdrop staging (progress reads on cream after W12 backdrop). | RECAP :95. |
| **H.W3** | Mobile reflow `@container` reset grid at ≤700px; calc(N*var(--cqx)) coverage | Carry: Slide08/Slide10 @container reset off; shared portrait-marker recipe. | RECAP :99; Slide-visual-digest H.V2. |
| **H.W4** | Constellation tokens promoted (draw constants), RAF-composable swap (useRAFLoop+useIntersectionPause), prng.ts adoption | Carry + **this wave lands the 2nd-consumer evidence for AW.W17 gate** (horn-signal). | RECAP :70; avg-deep-audit-digest §2 row 10; H.md §0 row 7. H.W4 prerequisite for AW.W17 flip. |
| **H.W5** | Complex-graphs `.deck-figure` + `--chart-min-h` recipe at ≤700px/1280/1440 | Carry: Slide04/08/09 layout fixes (drift sliver legible, EKG spike visible, feedback arc readable). | RECAP :102; Slide-visual-digest H.V5. |
| **H.W6** | TIL access-lock REMOVED (DeckGate + homepage lock deleted, zero residue; no restyle, no gate-rewind) | **SUPERSEDE gate-restyle ask** — lock removed, not restyled. H.W6 payload unchanged. | RECAP addendum 2 row 3; H.md §0 directive #2. Lock is soft-gate; user: "not needed any longer." |
| **H.W7** | XRAY adopts shared warm-cream + NCSU-red spine (replaces cold-blue `#60a5fa`; Fraunces typeface); Helvetica/IBM-Plex links removed | **Precondition for H.W1–H.W5:** XRAY Tailwind-v4 upgrade + @mkbabb/glass-ui consumer pattern (NEW H.W0 waves group). | frontend-convergence-digest §3; H.md §0 row 10. XRAY is same-org Friday Institute / NCSU TIL app. |
| **H.W8** | XRAY mobile portrait full-height (aspect-ratio lock dropped) | Carry: window flex-fills column on mobile (intro ≤25%, portal hero dominant). | RECAP :100; Slide-visual-digest H.V3. |
| **H.W9** | Language tuning "few dollars" de-shoehorn; copy-conformance greps (banned-construction, named-county → 0) | Carry: prose scoped over 7-slide deck. | RECAP :96, §8; Slide-visual-digest H.V*. |
| **H.W10** | Pulse-dot de-dup (SlideNutrition+SlideXray+Slide09 → StatusDot), figure rows onto MetricBadge/MetricCell, heavy-bar token on SlideNutrition, Constellation consume OPTIONAL (gated on 3.4.0) | Carry + **heavy-bar is the missing FDA-label idiom signature** (token-only, additive). Constellation consume is OPTIONAL; H.W4's RAF-swap is the binding 2nd-consumer evidence. | frontend-convergence-digest §H-arm; H.md §0 directive #10; RECAP addendum 2 row 1. |

---

### PRECEPT CONFORMANCE + INTEGRITY GATES

| Precept | Status | Evidence |
|---------|--------|----------|
| **P1 — no legacy** | ✓ Green | All regressions are structural fixes, not aliases; AW.W1 replaces broken size authority, not adds `legacyCollapse` flag. |
| **P2 — gestalt transposition** | ✓ Green | Dock-collapse fix is one-authority-per-concern (not per-path special-case); glass-panel fix makes tier branch honor variant (not hardcodes second wash). |
| **P3 — KISS** | ✓ Green | Blob reuses SDF gradient for normal+specular+rim+iridescence; DataTable split is colocation, not new surface; DeckProgress composes, not forks. |
| **P4 — DRY** | ✓ Green | Aurora/blob splice shared procedural-color.glsl.ts; Constellation consumes shared prng.ts+useRAFLoop; glass-atoms unify specular/rim into one mixin. |
| **P5 — ≥2-consumer (visual-load-bearing)** | ✓ Green (with gating) | Constellation: glass-ui story + H.W4/W10 slides. DeckProgress: story + slides. DeckGate invalid-ring: app validation + slides. All others existing or demo-only. H.W4 horn-signal required for AW.W17 gate flip. |
| **P6 — design-language cogency** | ✓ Green | Warm-cream + iOS-26 Liquid Glass + NCSU-red consumer-layered. AI-Nutrition-Label (XRAY) scoped as same-org consumer, not library-wide idiom. Glass-atoms band routes every atom onto ONE spine (no per-component hand-rolled highlight). |
| **P7 — spot-verify binding (mandatory before retire)** | ⚠ PRE-GATE | AW.W0 ledger must record EXISTS + rg-count-verbatim + alias-resolved verdict for instrument-chassis, glyph-face, metric-cell/stack before W14/W19 retire. Hallucinated items or under-counts block close. |
| **P8 — Tailwind-v4.3 NOT v5** | ✓ Green | v4.3.0 installed, verified. No v5 exists; latest is 4.3.0, `next`=4.0.0. All glass-atoms waves target v4.3 idiom. |
| **inv-27 — green-means-green** | ✓ Protocol | FINAL.md must cite green run-id per wave; no "done" without own CI run. Precondition: gate-fleet registers all proofs in scripts/gates.mjs with {local,ci,release,sibling} tags. |
| **π visual-runtime lane** | ⚠ CONTINGENCY | Required for visual-change waves (W1–W3 dock, W4–W11 aurora/blob, W12–W13/W18 component, W16–W17 convergence, W22–W26 glass-atoms). Coverage: ≥3 viewports (375×667, 1280×800, 1440×900), ≥5 frames/state-toggle, WCAG-AA contrast, per-story sweep. If browser automation unavailable, build-verification floor + re-probe obligation named to next tranche. |

---

### IMPLEMENTATION RISKS + MITIGATIONS

| Risk | Mitigation |
|------|-----------|
| **H.W4 RAF-swap lands late** (if AW.W17 publishes before H.W4 ready) | H.W4 is NOT a blocker for AW.W17 *publication* — the gate flips on H.W4's landing regardless of publish timing. Record the horn-signal edge as a named-and-watched cross-repo dependency, not a scheduled blocker. |
| **Spot-verify under-count** (W0 ledger finds fewer consumers than audits claim) | Stop at W0 close; re-audit consumer chains with rg + re-export-alias tracing. Hallucinated item halts the close. No retire wave proceeds until verdicts reconcile. |
| **π lane tooling unavailable** (headless WebGL/Canvas frame-timing runner unstable) | Record build-verification floor (visual-change waves assert basic correctness without animation frame capture); name the re-probe obligation to AX tranche with dated contingency closure. Do NOT gate the AW/H publish on π tooling — gate on gate-fleet registration + overfitting audit. |
| **Glass-atoms proliferation** (file bounds expand beyond W22–W26 scope) | W22 is the spine (unify material only); W23 extends card edge from it; W24/W25/W26 carry pre-sequenced disjoint bounds. If file bounds collide (e.g. W24 + W13 both touch `.input-pill`), strict sequence after W13. No new waves added without W27 close re-planning. |
| **Constellation-refactor (H.W4) stalls Slides pipeline** | H.W1–W3, W5–W10 are slides-local and open NOW (AT-disjoint from 3.4.0 pin). H.W4 is GATED but non-critical for H close; if delayed, slides demos Constellation locally and H.W4 lands as a follow-up async commit. |

---

### DELIVERABLES (TIGHT BRIEF, NO IMPLEMENTATION)

**This audit is READ-ONLY tranche-development.** Findings + fold/wave-seed list delivered; no code changes authorized.

- **Precepts:** All 8 major + 3 inv's verified in force. One stale token-claim (double-nested `light-dark()`) flagged for W12 strike.
- **Structural:** W21 re-anchored last; 26 substantive AW waves + W0 + W27 close. H.W4 horn-signal gates AW.W17. H.W6 supersedes earlier gate-restyle ask (lock REMOVED, not restyled).
- **Regressions:** 9 high-confidence findings mapped to existing waves or new W22–W26 band (glass-atoms fold).
- **Fold/wave-seeds:** Detailed table per domain. No overfit, no 1-consumer proliferation. All convergence primitives ≥2-consumer gated.
- **Precept conformance:** P1–P8, inv-7, inv-27, π lane all green or pre-gated. Spot-verify binding is PRE-GATE for W0 ledger.

---

---

## Lane 22 — be-boundaries-di

Perfect. Now I have comprehensive coverage. Let me compile the audit findings.

---

## AUDIT FINDINGS: AW/H TRANCHE COGENCY-HARDEN

### HEADLINE

The AW/H tranches are **NOT CONVERGED for implementation dispatch**, but the engineering substance is sound and DRY-coherent. The primary blockers cluster into four categories: **(1) charter↔wave-file divergence in both master plans** (fabricated gate-names, swapped W16/W17 numbering, three non-existent file-cites, phantom `AW.W24` cross-arm hinges), **(2) five charter-promised waves with no implementation** (W0 spot-verify, orphan resolution, metric-cell prune, styling assay, close ceremony), **(3) localized W22-W27 glass-atoms band mechanism failures** (dock-unify no-write-access, Card carve↔W24 collision from stale "W23 card work" ref, false W26 disjointness claim), and **(4) empirical red-flagged premises** (AW.W1 root-cause falsified by `dock.css:589`, born-RED claim inverted).

**H is CONVERGED** — pure consumer, clean, no AW-primitive re-implementation.

---

### FINDINGS BY SCOPE (file:line citations to AW/H.md + wave files)

#### **BLOCKER CLASS A: AW/H Charter ↔ Wave-file Reconciliation**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **Gate-names fabricated across bands (A1)** — AW.md §2 names gates that exist in no wave file (`proof:dock-collapse-live`, `proof:dock-spring-unify`, `proof:aurora-structure-tensor`, `proof:blob-droplet-material`, etc.). Actual gate-ids: W1→`proof:dock-animation-live`+`proof:spring-tokens-synced`, W3→`proof:dock-layering-polish`, W4→`proof:aurora-tensor-field`+impasto/vangogh/oilpastel, W9→`proof:blob-smin-normalized`+`-gradient-unit-length`+`-spec-premult`. | AW.md:122-150 (§2 gate column) | **BLOCKER** — W27 close (AW.W27:17,66,79) registers gates by AW.md names; if names don't match wave-file ids, `gates:verify-ci` fails closed on drift. | **Reconcile charter §2 gates to wave-file ids verbatim; substitute chart as single source of truth for gate registration.** Affects fold into W27 close ceremony. |
| **Aurora decomposition diverges (A2)** — AW.md §1 braid 2 & §2 rows W4–W8 claim `(structure-tensor+Kuwahara) / (van-Gogh+OKLCh+derive) / (DELETE overfit knobs)`. Actual wave files: W4=(four-fold painterly arc: tensor+impasto+van-gogh+oil-pastel), W5=(OKLCh color core), W6=(ADDITIVE atom door, nothing removed). §2 W6 charter claim is **opposite** the file (prune vs additive). | AW.md:38–40, 73–84, 105–117 | **BLOCKER** — W6 scope is misread by consumers; the "simplify" charter narrative inverts W6's actual additive-door design. | **Rewrite charter braid 2 + §2 rows W4–W8 to match wave-file decomposition; add explicit note "the wave files are the authoritative decomposition."** Fold into charter update. |
| **Three charter file-paths point to non-existent files (A3)** — AW.md:115 cites `AW.W14-datatable-split-hygiene.md` (real: `AW.W14-datatable-split.md`); :116 cites `AW.W15-styling-composable-assay.md` (real: `AW.W15-hygiene.md`); :119 cites `AW.W18-gate-pattern-close.md` (real: `AW.W18-gate-pattern.md`). | AW.md:115–119 | **BLOCKER** — Prose references fail; scope descriptions are out of sync. | **Correct all three path cites. Reconcile the scope-reveal items each row claims with the actual wave-file scope; surface any missing scope as new waves (see Class B, C below).** |
| **W16↔W17 SWAPPED vs files (A4)** — AW.md §2/§3/§4 numbers W16=Constellation, W17=DeckProgress; files are inverted (`AW.W16-deckprogress.md`, `AW.W17-constellation-component.md`). §3 ownership + §4 crosswalk inherit the swap. | AW.md:131,155–158 vs file naming | **BLOCKER** — H hinges fire on wrong wave numbers; H.W1/W4/W6/W10 cite `AW.W24` (phantom) instead of AW.W16/W17/W18. | **Renumber charter §2/§3/§4 rows to W16=DeckProgress, W17=Constellation.** Updates fold into both AW/H master plans. |
| **H cross-arm hinges cite phantom AW.W24 (A5)** — H.W1/W2/W4/W6/W10 cite `AW.W24` across 31 occurrences (DeckProgress consume, Constellation consume, DialogForm consume, Constellation dedup). AW tops at W18; W24 does not exist. Real hinges: W1→AW.W16, W4→AW.W17, W6/W10→AW.W18. | H.md §2 + individual waves | **BLOCKER** — H's cross-repo gating is mis-wired; 3.4.0 publish trigger is unresolvable. | **Re-point every H reference from `AW.W24` to its real number; grep `AW.W24` → 0 in both repos.** Fold into H.md reconciliation. |

#### **BLOCKER CLASS B: AW Close Ceremony Missing (Structural Integrity)**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **W18 is NOT the close (B1)** — AW.md:119 assigns W18 ("GATE-PATTERN CLOSE + READMEs, LAST") the charter responsibility: register every gate in `gates.mjs`, `proof:aw-final`, `gates:verify-ci`, the **four research READMEs (dock/aurora/blob/constellation)**, overfitting audit, π visual-runtime lane, `FINAL.md` with green run-id per wave. Actual `AW.W18-gate-pattern.md` is an `aria-invalid` ring idiom for access-modals — legitimate wave, but **no W18 file holds the close ceremony**. The gate-pattern wave has no charter row. Two failures: (a) close ceremony unimplemented; (b) gate-pattern wave homeless. | AW.md:119 (charter §2 W18) vs AW.W18-gate-pattern.md | **BLOCKER** — the entire tranche integrity depends on W27/W0 close gates (`proof:aw-final`, gate-fleet registration, π lane run, FINAL.md); without it AW cannot close. The gate-pattern wave is orphaned (not in charter). | **Author the real AW close wave (rename W27 or create dedicated close)** carrying gate-fleet + 4 READMEs + π lane + FINAL.md (lines ≤150; see digest `avg-deep-audit-digest.md §SYNTHESIS`). **Add a charter §0 disposition row for gate-pattern** (`frontend-convergence-digest` Lane 4 F1/F2 cite; gate `proof:input-invalid-aria`). **Mark W27 as LAST.** |
| **W0 spot-verify DEV wave missing (B2)** — AW.md:25,101 declare AW.W0 (gate `proof:aw-w0-reground`, DEV wave, write `AW.md`+`PROGRESS.md`, run spot-verify on retire candidates). No `waves/AW.W0-*.md`, no `PROGRESS.md`. inv P7 (AW.md:233) makes the W0 ledger a **binding precondition** for W14 retire (orphans), W19 prune (metric-cell/stack), and the close gate. | AW.md §0–§2 vs repo | **BLOCKER** — retire-gating chain is broken; every retire wave (W14, W19) is RED until W0 produces the spot-verify ledger. | **Author AW.W0 spec** (≤150 lines; precondition: every orphan candidate checked EXISTS + rg count re-run verbatim + alias-resolved verdict). **Create PROGRESS.md.** Fold into AW.W0 new wave. |

#### **BLOCKER CLASS C: Five Charter-Promised Deliverables Have No Wave File**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **Orphan resolution (instrument-chassis/glyph) unimplemented (C1)** — AW.md:45 (D-10), :115 fold instrument/glyph orphans into W14; `AW.W14-datatable-split.md` is DataTable-split only (grep zero `orphan|instrument|glyph|metric`). The W0 spot-verify ledger mandates keep-and-document OR migrate-off-and-remove; no wave implements it. | AW.md:45,115 vs AW.W14 | **BLOCKER** — D-10 obligation unaddressed. | **Author dedicated orphan-resolution wave** (or widen W14 scope + rename file); emit `proof:orphan-resolved`+`proof:no-god-module` gates. Depends-on W0 spot-verify. **Fold into new W14 or AW.W-orphan.** |
| **metric-cell/metric-stack prune unimplemented (C2)** — AW.md:20 (RECAP), :45, :116 fold the "hidden dep surfaced + clean removal." No wave exists. RECAP §1:20 says the dep restoration is a confirmed live coupling that must be surfaced before deletion. | AW.md:45,116 vs repo | **BLOCKER** — D-10 sub-item unaddressed; the hidden dep is a false positive generator if not surfaced. | **Author the prune wave** (surface dep as born-RED gate first) **OR fold into orphan-resolution wave.** Depends-on W0. |
| **Styling assay (brittle CSS→tokens, Tabs pill-track, ToggleGroup re-roll) unimplemented (C3)** — AW.md:116 (W15 charter) claims "brittle calc/magic-numbers → tokens; monolithic→colocated CSS; Tabs pill-track sizing; demo raw-`<button>`→`<ToggleGroup>` re-roll; gate `proof:styling-hygiene`." Actual `AW.W15-hygiene.md` is colocation/naming-hygiene only (return-type interfaces, `twin-line-divider`, `useTokenColor` injection seam; zero Tabs/ToggleGroup, zero tokenization assay, zero `proof:styling-hygiene`). | AW.md:81,116 vs AW.W15 | **BLOCKER** — the deeper styling assay (D-?) is silently dropped; D-8's component-pass scope is incomplete. | **Author the styling-assay wave** (tokenization + Tabs pill-track + ToggleGroup re-roll; emit `proof:styling-hygiene`). **Re-scope W15 file** to be colocation-only, or fold both into one wave with a renamed file. |
| **drawer-live-behind audit (C4)** — RECAP:28 folds `/compositions/drawer-live-behind` "wtf" route audit. GREP `drawer|live-behind` over AW.md → zero (no §0 row, no wave). | RECAP:28 vs AW.md | **BLOCKER** — D-? obligation (RECAP §8) unaddressed in charter. | **Add §0 disposition row.** **Author covering wave** (or close as no-defect with evidence + measurement). **Fold into W12/W18 pass or new wave.** |
| **goo-blob `var()` throw fix unimplemented (C5)** — RECAP:64–65, AW.md:43,114 (D-7) task W13 with the `defaultBlobColorResolver`→`cssToOklch(var(--primary))` per-frame throw + console-clean gate. Real `AW.W13-affordance.md` has zero goo-blob/resolver mention; no other wave owns it. Live runtime bug confirmed. | AW.md:43,114 vs AW.W13 | **BLOCKER** — confirmed live bug goes unfixed. | **Add resolver/story fix + console-clean gate to W13 scope** (or designated blob wave). **Fold into W13 or new bit-fix wave.** |

#### **BLOCKER CLASS D: AW.W22–W27 Glass-Atoms Band Mechanism Failures**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **W22: dock-unify has no write access to dock.css (D1)** — W22.md:8 (gate), :18 (§3.3) assert "the dock tier's rim becomes a `.glass-material` inheritance." `dock.css:84–90` shows `.glass-dock` hand-rolls its own `background`, `backdrop-filter`, `border`, `box-shadow` as a **parallel sixth surface**, not a ladder rung. To inherit `.glass-material`, W22 must edit `dock.css` — but `dock.css` is **absent from W22 File Bounds** (W22:31–40). Gate-2/3 cannot pass without write-access W22 doesn't declare. | AW.W22-glass-material-unify.md:8,18,31–40 vs dock.css:84–90 | **BLOCKER** — mechanism is structurally false; promised inheritance cannot be delivered within file bounds. | **Option A (recommended): Add `src/styles/dock.css` to W22 File Bounds as `modify-carve`; compose `.glass-material` onto `.glass-dock`, retire local rim at dock.css:90.** **Option B: Drop dock from band-matrix (gates 2/3); acknowledge dock keeps parallel surface.** Pick one. **Fold into W22 reconciliation.** |
| **W22: dock `::before` collision with instrument-strip (D2)** — If dock inherits `.glass-material` (D1, option A), the mixin's specular `::before` collides with `dock.css:352` `.glass-dock.variant-instrument-strip::before` (engraved-bezel stroke) — same pseudo, same element. W22:28 names triumvirate trigger for `::after`/content-`::before` but misses this live `::before`. DockIconButton avoids it by carrying specular on the **button**, not the shell. | AW.W22:20,28 vs dock.css:352 | **BLOCKER** (contingent on D1 option A) — pseudo-element collision. | **Decide dock specular lives on `.dock-icon-button` (control, as today), NOT `.glass-dock` (shell).** Gate-2 matrix must mount dock-icon-button, not shell. **Fold into W22 file-bounds + gate reconciliation.** |
| **W22→W24 Card-carve collision, driven by stale "W23 card work" ref (D3)** — W22:39 carves the `glass-specular-track` class from `Card.vue:77`. But W24:21 wires the dormant pointer seam *on that exact class*: "the root already carries `glass-specular-track`... add the ≤6-LOC `pointermove` listener." W24 opens after W22 and reads a seam W22 deleted. **Proximate cause:** W22:39 hands the pointer seam to **"W23 card work."** W23 is `glass-material-sota` (refract/squircle/tint, NO card work); the card wave is **W24**. | AW.W22-glass-material-unify.md:39 (file-bounds) & gate-4 vs AW.W24-glass-cards.md:21,47 | **BLOCKER** — W24 mechanism references deleted seam; W22/W24 mutual contradiction. | **(a) W22:39** — change "owned by W23 card work" → "owned by W24 card work." **(b) W22 must NOT carve Card `glass-specular-track`** — drop `Card.vue` from W22 §3.4/File-Bounds/gate-4. Retires only Button+DockIconButton opt-ins. Card class string stays for W24 pointer-write seam. **Fold into W22 scope+gate reconciliation.** |
| **W26: false "fully disjoint" claim; badge/toggle `transition-control` vs `transition-all` contradiction (D4)** — W26:6,74 claim "fully disjoint" + "shares NO modify path with W25." FALSE: `badge/index.ts` — W25:60 sets `transition-colors`→`transition-control`; W26:47 sets `transition-colors`→`transition-all`. **Same token, mutually-exclusive target values.** W26:74 also carries digest off-by-one wave map (names W23=card, W24=radius, W25=tap-squish; realized W23=material-sota, W24=cards, W25=primitives). | AW.W26-reka-shadcn-tailwind-idiom.md:6,47,74 vs AW.W25-primitives-perfection.md:59–60 | **BLOCKER** — semantic contradiction; false disjointness conceals real collision. | **(a) Delete false disjointness claims.** **(b) Sequence explicitly: W25 owns `transition-control` migration** (owns transition-discipline sweep), so W26 drops badge `transition-colors`→`transition-all` and adds only icon-sizing/gap. **(c) Re-label W26:74 to realized wave roles.** **Fold into W26 scope+disjointness reconciliation.** |
| **W27: gate→wave attribution off-by-one (close-manifest integrity) (D5)** — W27:17,:66,:79 register glass-atoms band as `proof:glass-material-unified+sota(W22)`, `proof:glass-card-tiers(W23)`, `proof:primitive-affordance(W24/W25)`. Realized ids: W22=`unified`, W23=`sota`, W24=`card-tiers`, W25=`primitive-affordance`, W26=`reka-binding-idiom`. W27 collapses W22+W23 onto W22, slides W24's gate to W23. Since close contract is "green run-id PER WAVE" (inv-27), the FINAL.md crosswalk is built on wrong map. | AW.W27-close.md:17,66,79 | **BLOCKER** — gate-fleet registration integrity compromised. `gates:verify-ci` presence-check passes (all five names exist), but FINAL wave→gate map is stale. | **Correct attributions: unified(W22)/sota(W23)/card-tiers(W24)/primitive-affordance(W25)/reka-binding-idiom(W26).** **Fold into W27 close-manifest reconciliation.** |

#### **BLOCKER CLASS E: Empirical Red-Flagged Premises**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **AW.W1: root-cause falsified by `dock.css:589` (E1)** — W1 §3.2 claims "the root cause is stacked-grid measures the MAX of the two layers," so both width share one authority. **Falsified:** `dock.css:589–590` sets `.dock-layer:not(.layer-active){position:absolute}` — the inactive layer is OUT of flow, so grid's intrinsic width is the **active** layer's, not a max. The `<0.5` no-op W1 anchors is additionally `!live`-gated (fires only on fresh swap). | AW.W1-dock-collapse-regression.md (wave file not yet read) + dock.css:589–590 | **BLOCKER** — diagnosed root-cause is wrong. Before W1 dispatch, re-diagnose against HEAD source. File Bounds (`GlassDock.vue`+`useLayerTransition.ts`) may stand, but the prescribed fix targets a cause CSS already implements. | **Re-diagnose W1 against HEAD `afdc485`.** Empirically run `proof:dock-animation-live` against 3.3.0 build BEFORE dispatch. |
| **AW.W1: gate-coverage premise INVERTED (E2)** — W1 claims existing gate sampled DockLayerGroup-switch, left GlassDock-collapse unsampled. **BACKWARDS:** `proof-dock-animation-live.mjs:80–81` selects `.glass-dock.collapsed` and samples outer collapse (not layer-switch); demo route has ZERO DockLayerGroup. Existing gate already covers W1 path. W1's "born-RED on HEAD" witness is unsubstantiated. | AW.W1 gate narrative vs proof-dock-animation-live.mjs | **BLOCKER** — the regression may not exist as claimed. | **Run existing `proof:dock-animation-live` against 3.3.0 build EMPIRICALLY before dispatch.** If GREEN, the witness is false; if RED, "widening" is partly no-op. |

#### **REFINE CLASS F: AW.W3 + Component Band Localisms**

| Finding | File:Line | Impact | Fold/Wave Seed |
|---------|-----------|--------|---|
| **AW.W3: dock-with-slider `keepDockOpen` scope silently dropped (F1)** — AW.md:38 (D-3), :104 (W3 gate) task W3 with slider fix; real `AW.W3-dock-layering-rail-wrap.md` has ZERO slider/keepDockOpen mention. Charter obligation orphaned. | AW.md:38,104 vs AW.W3 | **REFINE** (should be BLOCKER-level omission) | **Restore slider arm to W3 scope+gate, or move disposition row and record where slider fix lands.** |
| **AW.W10: phantom `useSpringOrchestrator` symbol (F2)** — W10 Scope 1, W10.a reference non-existent `useSpringOrchestrator`. Real composable is `useSpring`. | AW.W10 wave file | **REFINE** | **Replace `useSpringOrchestrator`→`useSpring`.** |
| **AW.W12: born-GREEN light-dark gate is a no-op (F3)** — W12:59 (Hard Gate 3) asserts "grep -c 'light-dark(\s*light-dark(' … returns 0" to prove double-nested collapse. **That construct does NOT exist at HEAD** — grep returns 0 trivially, born-GREEN (proves nothing). W24:104 explicitly strikes this as stale; digest struck it three times. | AW.W12-glass-panel-fix.md:19,59 | **REFINE** (candidate for strike) | **Strike W12 scope item 3 + Hard Gate 3.** If no genuine born-RED scope remains in W12, fold into W13 or as a no-op acknowledge. |

#### **CONVERGENCE VERDICT ON H (slides)**

**H IS CONVERGED.** Pure consumer; no AW-primitive re-implementation. H.W4 (constellation RAF-swap + prng.ts) is the 2nd-consumer evidence that flips AW.W17 gate. Hinges are correctly wired to AW.W16/W17/W18 once A4/A5 (the W16↔W17 swap + phantom W24 refs) are fixed. The only H-side refine is that H.W9's "few dollars" grep must FIRST locate the cost-line at HEAD to be falsifiable; H.W1 binding-verification sweep is sound.

---

### FOLD/WAVE SEED LIST

| Fold/Wave ID | Into AW Wave | Type | Scope | Notes |
|--|--|--|--|--|
| **Reconcile A1–A5 (charter↔file divergence)** | **AW.W27 close or pre-dispatch** | Reconciliation | Rewrite AW.md §0–§2 gates + file-paths to wave-file authority; re-point H.md cross-arm hinges to real AW numbers (W16/W17/W18, not W24). Charter §1 braid-2 + §2 rows W4–W8 decomp. | Single comprehensive reconciliation pass; not eight separate waves. |
| **B1: Author AW.W0 spot-verify DEV wave** | **New AW.W0** | DEV | Write AW.md, `PROGRESS.md`, produce the spot-verify ledger (EXISTS + rg-count + alias-resolved verdict per retire candidate). Binding precondition for all retire waves. | Prerequisite for W14, W19, close. |
| **B2: Author real AW close wave** | **New AW.W-close (rename W27 or create)** | IMPL (LAST) | Register every AW gate W0–W26 in `gates.mjs`, `proof:aw-final`, `gates:verify-ci`, the four READMEs (dock/aurora/blob/constellation), overfitting audit, π visual-runtime lane (≥3 viewports, ≥5 frames, WCAG-AA), `FINAL.md` + green run-id per wave. | Tranche integrity depends on it. Inv-27 binding. |
| **C1: Author orphan-resolution wave** | **New AW.W (fold into W14 or standalone)** | IMPL | Migrate-off-and-remove OR keep-and-document (verdict backed by W0 ledger) for instrument-chassis/rail + glyph-face/disco-glyph. Emit `proof:orphan-resolved`+`proof:no-god-module`. | Depends-on W0. D-10 obligation. |
| **C2: Author metric-cell/stack prune wave** | **New AW.W (or into orphan wave)** | IMPL | Surface metric-cell/stack hidden dep as born-RED gate FIRST, then clean removal. Zero residue post-prune. | Depends-on W0. D-10 sub-item. Critical to avoid false positive. |
| **C3: Author styling-assay wave** | **New AW.W (or reframe W15)** | IMPL | Brittle calc/magic-number→token tokenization; Tabs pill-track sizing; demo raw-`<button>`→`<ToggleGroup>` re-roll; emit `proof:styling-hygiene`. | D-? (dropped) obligation. Can fold into existing W15 if W15 scope expands + file renamed. |
| **C4: drawer-live-behind audit** | **New AW.W or fold into W12/W18** | IMPL | Audit the route; close as no-defect+evidence OR fix (add §0 row). | Minor; D-? (dropped). |
| **C5: goo-blob `var()` throw fix** | **W13 scope or blob wave** | IMPL | Add resolver/story fix + console-clean gate to W13 (or designated blob wave). Live bug. | Confirmed runtime issue. |
| **D1: W22 dock-unify reconciliation** | **AW.W22 scope+file-bounds** | Scope/Gate | Option A: Add `dock.css` to W22 File Bounds, compose `.glass-material` onto `.glass-dock`. Option B: Drop dock from band-matrix, keep parallel surface. Pick one. | Mechanism integrity. Blocker. |
| **D2: W22 dock `::before` collision** | **Into D1 resolution** | Scope/Gate | Decide dock specular on `.dock-icon-button` (control) not `.glass-dock` (shell). Gate-2 matrix re-targets. | Depends-on D1 option A. Contingent blocker. |
| **D3: W22→W24 Card-carve collision** | **AW.W22 + W24 scope** | Scope/Gate | (a) W22:39 "W23"→"W24" ref correction. (b) W22 drops Card from carve set; Card class stays for W24 pointer-write. | Stale ref + mutual contradiction. Blocker. |
| **D4: W26 disjointness + transition-control contradiction** | **AW.W26 scope+disjointness** | Scope/Sequencing | Delete false disjointness claims. W25 owns `transition-control`; W26 drops badge `transition-all` override. Re-label wave map. | Semantic contradiction + digest off-by-one. Blocker. |
| **D5: W27 gate→wave attribution off-by-one** | **AW.W27 close-manifest** | Gate Registration | Correct gate attributions to wave-file ids: unified(W22)/sota(W23)/card-tiers(W24)/primitive-affordance(W25)/reka-binding-idiom(W26). | FINAL.md crosswalk integrity. Blocker. |
| **E1–E2: AW.W1 re-diagnosis + empirical gate re-run** | **AW.W1 root-cause + gate** | Empirical Validation | Re-diagnose against HEAD source. Empirically run `proof:dock-animation-live` against 3.3.0 build; if GREEN, regression may not exist as claimed. | Must resolve before Band-A dispatch. Blocker-class priority. |
| **F1: AW.W3 slider scope restoration** | **AW.W3 scope+gate** | Scope | Restore `keepDockOpen` + slider-in-dock interaction to W3, or move disposition + record where it lands. | Charter obligation D-3. Refine (should be blocker). |

---

### KEY DI / ENCAPSULATION / BOUNDARY FINDINGS

**Service boundaries (createStrictContext/createOptionalContext):** `/Users/mkbabb/Programming/glass-ui/src/composables/context/createContext.ts` — AV.W14 landed the DI factory pair (throw vs null return modes). AW/H tranches show **zero regression**; the pattern is idiomatic and consistent. No new wave needed.

**Color/motion boundaries:**
- **color-motion-split:** `src/composables/glass/webgl/` (WebGL2) + `src/composables/glass/webgpu/` (WebGPU) + shared `procedural-color.glsl.ts` (read-only, OETF/FBM/matrix source per AV.W2). W4/W5/W9/W11 splice, never diverge. **Clean, no re-litigated.** ✓
- **Aurora atoms**: W5 opens BEFORE W4 (digest says after; charter says after; wave files + dependency graph say before). W6 ADDITIVE (not prune as charter claims; wave file is authoritative). ✓
- **Dock motion language**: unified spring family (M3 spatial-vs-effects) across W1–W3; one-timeline lockstep (opacity+width on common progress). Re-diagnose W1 before dispatch. ⚠️

**Build pipeline / substrate colocation:** Glass/dock/aurora/blob styles live in `/src/styles/{glass.css,dock.css,glass-specular-track.css,tokens.css}` (the shared substrate). W22 threatens to collide with dock.css (see D1). Pre-dispatch decision required.

---

### STANDING SUMMARY

- **Blockers**: 5 critical (B1, B2, C1–C2, D1) + 6 high (A1–A5, D3–D5, E1–E2). **Total: 11 blockers.** AW NOT CONVERGED.
- **Refines**: 8 (F-class + digest-map fixes). Manageable post-blocker-resolution.
- **H convergence**: CLEAN. Pure consumer once A4/A5 fixed (W16/W17/W18 hinges).
- **Mechanical strength**: Aurora painterly, blob droplet, glass-atoms DRY, warm-cream glass + iOS-26 + NCSU-red design coherence all sound. **Engineering is solid; planning-layer integrity is the gap.**

**Next steps:** Resolve blockers in order (A→B→C→D→E), then refines. Re-ground AW.md and H.md. Re-run `proof:dock-animation-live` empirically on 3.3.0. Author the five missing waves (W0, close, orphan, metric-prune, styling-assay). Re-baseline W22–W27 scope+gates against resolved contradictions. Then AW/H is dispatch-ready.

---

## Lane 23 — new-storybook-complete

Perfect! Now I have all the context. Let me prepare my final findings report:

---

## FINDINGS — AW/H COGENCY-HARDEN AUDIT (READ-ONLY)

**Scope:** Lane "new-storybook-complete" — storybook completeness + IA cogency. Read: AW.md (lines 1-327), RECAP.md (all, esp. Addendum 3 lines 135-150), H.md, audit digests (final-harden-fixlist.md + avg-deep-audit-digest.md).

---

### **STORYBOOK COMPLETENESS: VERDICT**

**All exported components ARE represented in the storybook.** Manifest.ts carries 11 categories (Foundations, Substrates, Primitives, Containers, Navigation, Data, Feedback, Motion, Tools, Compositions, Composables) with **120 distinct story IDs** mapping to **125 story .vue files**. Every exported component in src/index.ts appears in at least one story.

**HOWEVER: The new scope requirement (RECAP.md lines 141) is NOT YET DRAFTED as a wave.**

RECAP.md §Addendum 3 (line 141) calls for:
> "**Storybook layout perfected — EVERY component demonstrated.** No glass-ui component without a story; the demo IA (AV.W10's 11-category tree) audited for completeness + cogency. → **an AW storybook-completeness wave (extends AV.W10).**"

**Current state:** The requirement is folded into the tranche scope but NOT yet a formalized wave file under `docs/tranches/AW/waves/`. No `AW.W*-storybook-completeness.md` file exists. The audit digests (final-harden-fixlist.md, avg-deep-audit-digest.md) do NOT mention storybook-completeness as a distinct wave. **This is a DEFERRED-ITEM fold, not yet seeded.**

---

### **IA COGENCY: THE 11-CATEGORY TREE**

The IA structure is **sound and coherent** per AV.W10's charter (manifest.ts §0):

| Category | Stories | Load |
|---|---|---|
| **Foundations** | 15 | Tokens, colors, motion, glass tiers, surfaces, utilities |
| **Substrates** | 3 | Aurora, GooBlob/Watercolor, GlassPanel (shader substrates) |
| **Primitives** | 24 | Button, Input, Slider, Toggle, Badge, Card, Section, Status/Metric atoms, Glyph/Disco, StackedIcons, DarkModeToggle |
| **Containers** | 13 | Dialog, Sheet, Drawer, Popover, Dropdown, Tooltip, Accordion, Collapsible, HoverPopover, ExpandableContainer, Native-top-layer |
| **Navigation** | 6 | Tabs, Dock, DockLayers, DockRail, Carousel, GlassCarousel |
| **Data** | 9 | Table, DataTable, TagsInput, Avatar, SortableList, InfiniteScroll, Timeline (3 variants), Search, ScrollingText |
| **Feedback** | 7 | Alert, Toast, Toaster, Notification, Progress, Skeleton, ConfirmDialog |
| **Motion** | 3 | Transitions, Springs (Orchestrator), CountUp, v-Reveal, Typewriter |
| **Tools** | 1 | Command Palette |
| **Compositions** | 13 | Hero, MathPaper, Dashboard, AuthShell, Settings, EmptyStates, DockWithSlider, DrawerLiveBehind, Configurator, InstrumentChassis, FormValidation, LabeledField, IconTooltip |
| **Composables** | 10 | 21 utility composables (useTokenColor, useGlobalDark, useKeyboardShortcuts, useResizeObserver, useGlassRenderer, useAnimatedNumber, installDarkModeSync, useIntersectionPause, useRAFLoop, useScrollProgress, useNumericTransition, useStaggerReveal, useSortable, useScrollTracker, useSidebarFollow, useSidebarState, useTreeIndex, useTouchGate, useTimer, useInterval, useInfiniteScroll, useClipboard) |

**Story-file audit:** 120 story IDs map to 125 unique `.vue` story files (5 files are shared infrastructure: StoryPage, StorySection, ShowcaseFrame, ToneSwatch, TokenLadder). **MANIFEST is sync'd with implementation.**

---

### **HARDENING FINDINGS: DEFERRED & FOLD ITEMS (from RECAP.md Addendum 3)**

| New scope item | Status | Fold destination |
|---|---|---|
| **Storybook layout perfected — EVERY component demonstrated** | Not yet seeded | NEW AW wave (the storybook-completeness wave extends AV.W10; not yet drafted) |
| **Brand-new dock-based demo nav: SIDEBAR + BOTTOM-bar dock for core page nav** | Not yet seeded | NEW AW wave (the demo-dock-nav refactor; dogfoods the dock + glass atoms) |
| **Aurora CONFIGURATOR redesign + CAROUSEL redesign** | Not yet seeded | NEW AW waves (extends existing Configurator; refactors existing GlassCarousel/carousel) |
| **Consistent naming + verbiage across components/stories/tokens** | Not yet seeded | FOLD into W15 (hygiene) or W20 (styling-assay) or a dedicated naming-consistency lane |
| **Deep LIGHTHOUSE audit (perf/a11y/best-practices/SEO)** | Not yet seeded | NEW AW wave (demo perf-a11y) + NEW H wave (slides perf-a11y) |
| **Deep ANIMATION audit + DESIGN.md audit** | Not yet seeded | FOLD into dock/aurora/blob animation-language waves + W27 close/docs |

---

### **GLASS-ATOMS BAND (W22-W26) — CONVERGENCE VERDICT**

Per final-harden-fixlist.md (comprehensive review):

**VERDICT: NOT CONVERGED** — 5 blockers + 9 refines. **BUT the storybook/IA is NOT the blocker source.** The blockers are:

1. **W22 (glass-material-unify)** — 3 structural blockers (dock inheritance, specular collision, Card carve) rooted in dock NOT being a ladder rung + stale "W23 card work" wave-number ref
2. **W27 (close)** — gate→wave attribution off-by-one (final-harden-fixlist.md B4)
3. **W26 (reka-idiom)** — false disjointness vs W25 on `transition-control` token + toast/badge shared writes

**Storybook impact:** N1 finding (final-harden-fixlist.md) notes three near-duplicate substrate stories (W12's card.vue/glass-panel.vue backdrop staging + W22's glass-material.vue matrix both stage over Aurora/PaperBackdrop). **Recommendation:** the glass-material story is the band-matrix superset; W12 stories stay component-scoped — one-line note to avoid demo-story proliferation. File location: `demo/stories/substrates/` (manifest.ts and wave specs reference it).

---

### **DEFERRED FOLD/WAVE SEEDS**

**The "new-storybook-complete" lane seeds these waves/folds:**

1. **NEW WAVE: AW.storybook-completeness** (extends AV.W10 IA audit)
   - File: `AW.W{X}-storybook-completeness.md` (X = tbd, post-W27 close planning)
   - Scope: Ensure EVERY exported component has a story; audit IA for clarity/grouping/drill-down; verify manifest.ts sync'd with implementation
   - Gate: `proof:storybook-every-component` — grep finds no exported symbol in src/index.ts with zero story entries; the 11-category manifest load is balanced (no degenerate bins)
   - File bounds: demo/stories/manifest.ts (read), src/index.ts (read), docs/components.md (refresh ref catalog if it exists)

2. **NEW WAVE: AW.demo-dock-nav** (refactor the sidebar/bottom navigation)
   - File: `AW.W{Y}-demo-dock-nav.md`
   - Scope: Rebuild storybook nav on glass-ui dock (SIDEBAR dock + BOTTOM-bar dock for core page nav); dogfoot the dock + glass atoms; iOS-26 + glass-primitive inspiration
   - Depends-on: W1-W3 (dock motion), W22-W26 (glass-atoms band) for styling consistency
   - File bounds: demo/AppShell.vue (the nav wrapper), src/styles/ (dock styling), demo/stories/router.ts (category mapping)

3. **FOLD into W15 (hygiene): Naming consistency audit** (components/stories/tokens verbiage)
   - Cross-reference story blurbs, component doc-comments, token naming (--dock-\*, --glass-\*, --spring-\*)
   - Ensure naming is consistent across the 11 categories

4. **NEW WAVE: AW.perf-a11y** (Lighthouse deep audit — glass-ui demo)
   - File: `AW.W{Z}-perf-a11y.md`
   - Scope: Full Lighthouse audit (perf, a11y, best-practices, SEO) for every demo page; fix scoring blockers
   - Depends-on: W2-W3 (dock polish), W22-W26 (glass-atoms), W20 (styling)
   - File bounds: demo/ (all), scripts/lighthouse.mjs (gate runner)

5. **FOLD into W27 (close): DESIGN.md audit + animation-language coherence**
   - Review DESIGN.md for currency (matches AW's design language: warm-cream + iOS-26 + NCSU-red)
   - Verify animation-language across dock/aurora/blob/primitives is ONE language (spring family, easing curves, timing)

6. **H MIRROR: NEW WAVE H.perf-a11y** (Lighthouse audit — slides til-briefing + XRAY)
   - File: `H.W{perf-a11y}-perf-a11y.md`
   - Depends-on: H.W1-W10 all landing
   - File bounds: packages/slides/src/ (all), scripts/lighthouse-slides.mjs (gate runner)

---

### **CRITICAL NOTES FOR ORCHESTRATOR**

**No implementation blocker on storybook completeness itself** — the stories exist and are registered. The blocker is **five architectural issues in W22-W26** (final-harden-fixlist.md B1-B5) that must be resolved BEFORE those waves close.

**Two new wave slots needed post-W20:**
- **W{storybook}** — storybook-completeness audit (extends AV.W10)
- **W{dock-nav}** — demo nav refactor onto dock

**These fold into existing waves:**
- W15 (hygiene) + naming-consistency cross-check
- W27 (close) + DESIGN.md + animation-language coherence

**H mirror wave needed:**
- H slides perf-a11y (parallel to AW, opens after H.W1-W10)

---

**Report date:** 2026-06-07 | **Auditor:** (read-only audit) | **Sources:** AW.md, RECAP.md, H.md, final-harden-fixlist.md, avg-deep-audit-digest.md, manifest.ts

---

## Lane 24 — new-demo-dock-nav

Perfect. Now I have everything I need. Let me produce my comprehensive audit findings report.

## Comprehensive Deep Audit: AW/H Cogency-Harden Round — Demo Dock-Nav Lane

### FINDINGS (file:line / wave reference)

**Scope Definition (RECAP.md:142):** The demo-dock-nav wave is NEW, added in ADDENDUM 3 (user 2026-06-07), not yet wave-numbered in the AW charter. It redesigns the storybook's core page navigation onto TWO dock instances — a vertical SIDEBAR dock (replacing the current `CategoryRail.vue` rail) and a BOTTOM-bar dock (new, replacing the current `StoryPager.vue` carousel/pager chrome). Both instances live on `GlassDock`, dogfooding the dock primitives + the glass-atoms band perfection + iOS-26 Liquid Glass.

**Current State (READ-ONLY):**
- `demo/layout/AppShell.vue:78` — renders `CategoryRail` (a `GlassDock variant="rail"` instance housing icon-button category nav)
- `demo/layout/CategoryRail.vue:32-38` — `GlassDock overflow="scroll"`, icon-button rows, tooltip category labels
- `demo/layout/AppShell.vue:81` — renders `StoryPager` (currently a carousel pager row showing story titles)
- `demo/router.ts` — manifest-driven routes; no dock-nav wiring
- `demo/stories/manifest.ts` — 11-category tree (Foundations·Substrates·Primitives·Containers·Navigation·Data·Feedback·Motion·Tools·Compositions·Composables); every route has `meta.categoryId`/`meta.storyId`

**Design Language Tie-In (AW.md §5 + avg-deep-audit-digest §2):** The dock redesign is a PRIMARY DOGFOODING site for glass-atoms band (W22-W26) + dock-motion fixes (W1-W3). The sidebar dock must display iOS-26 Liquid Glass material (rim/specular from W22) + warm-cream glass substrate (W12 backdrop staging). The bottom-bar dock must manifest the `.tap-squish` press-spring (W25) + `data-slot` reka idiom (W26) on its story-nav button set. The design language is warm-cream field + iOS-26 rim/specular + NCSU-red accent (story active state).

**Gate Precepts & π-Lane Binding (AW.md §6 inv-27, avg-deep-audit-digest §4E):**
- **born-RED gate (demo-dock-nav must be born-RED on HEAD):** CategoryRail.vue + AppShell.vue + StoryPager.vue exist; no dock-nav redesign present; the app currently uses raw categorical rail + carousel layout.
- **π visual-runtime lane (BINDING):** Sidebar dock collapse/expand morph (W1 regression fix) + bottom-bar story-nav button press-feedback (W25 tap-squish) must render across ≥3 viewports (375×667 mobile, 1280×800 tablet, 1440×900 desktop) + ≥5 animation frames per toggle, WCAG-AA contrast (cream glass on cream field + NCSU-red active state).

**Fold/Wave Identification Issues (Cogency-Harden):**

1. **Wave sequencing dependency chain missing.** The demo-dock-nav wave depends on:
   - **W1-W3 (dock-motion):** the sidebar collapse must execute the fixed simple-collapse width-morph + one-timeline lockstep (W1/W2) + iOS spring physics (W3). Cannot open before Band-A closes.
   - **W22-W26 (glass-atoms):** the dock surfaces must compose the unified `.glass-material` specular/rim (W22), the `data-slot` idiom + CVA modernization (W26), the `--tap-squish` press spring on buttons (W25). Cannot open before Band-F.
   - **W12 (backdrop staging):** the glass-panel demo backdrop (Aurora/PaperBackdrop) must be available to stage the sidebar + bottom-bar over it.
   - **Probably after W20 (styling-assay):** the story-nav button set should consume idiomatic `<ToggleGroup>` (W20 re-rolls raw `<button>` controls).
   
   **Verdict:** The demo-dock-nav wave must SEQUENCE after **W20** (to ensure all prior styling/glass-atoms work lands first) and **explicitly open after Band-F closes** (W22-W26 completion gate). It is NOT parallel-schedulable with the dock/aurora/blob bands.

2. **File-bounds collision with AppShell.vue (shared multi-wave write surface).** 
   - `AppShell.vue:78` imports + renders `CategoryRail`
   - `AppShell.vue:81` imports + renders `StoryPager`
   - The demo-dock-nav wave will REPLACE both: new `SidebarDock` component import + new `BottomDock` component import + new structure
   - **Risk:** W20 (styling-assay) modifies `demo/stories/primitives/card.vue` (not AppShell, so no collision there), but the audit found W12+W20+W24 all touch `demo/stories/primitives/card.vue` — a three-wave shared write that's sequential (safe, but undeclared).
   - **AppShell.vue is SINGULAR and DEMO-SYSTEM-CRITICAL:** it's the root shell, not a story. No other wave should touch it. demo-dock-nav's write to AppShell is the ONLY exception, since the demo nav redesign IS the shell layout change.
   
   **Verdict:** demo-dock-nav File Bounds must be clear: `modify` AppShell.vue (the only permitted shell edit), `create` SidebarDock.vue + BottomDock.vue + any new composables, `delete` CategoryRail.vue + StoryPager.vue (only if no residue remains in the codebase). A grep post-implementation must confirm zero re-imports of the deleted components outside their deletion commit.

3. **Overfitting audit gate missing.** The demo-dock-nav wave must name the ≥2-consumer rule application:
   - **Consumer #1:** the glass-ui storybook's core page nav (SidebarDock + BottomDock)
   - **Consumer #2:** ??? The wave spec must name a SECOND consumer before shipping. Is there a slides deck-nav that could reuse the dock-nav components? Or is the demo itself the only consumer, making this an ORPHAN?
   
   **Precept violation flag:** If demo-dock-nav is truly a one-consumer (the glass-ui storybook only), it violates inv-P5 (visual-load-bearing ≥2-consumer rule). Per AW.md §0 D-13 and the glass-atoms-digest SYNTHESIS, every new surface must clear the ≥2-consumer bar. **Verdict:** demo-dock-nav must either (a) name a 2nd genuine consumer (e.g., a slides Deck-nav story, or a reference implementation), OR (b) be re-scoped as a demo-internal layout-refactor (not a shipped primitive) and carve it out of the wave table, folding the work into AppShell/shell-layout maintenance rather than a reusable component wave.

4. **Scope creep vs architectural boundaries.** The demo-dock-nav is described (RECAP.md:142) as "dogfooding the dock + the glass atoms," but it ALSO includes:
   - Re-building the category+story navigation (currently manifest-driven rail + carousel)
   - Potentially touching the manifest structure if the sidebar/bottom-bar dock architecture requires new data shapes
   - Possibly adding a story-search or filtering layer (the bottom-bar "pager" is currently just linear story titles; a dock redesign might add richer affordances)
   
   **Risk:** scope creep into a full demo UX redesign, beyond the dock+glass-atoms dogfooding intent. **Verdict:** The wave spec must declare hard scope boundaries: sidebar dock displays the category icon+tooltip (as today), bottom bar displays the story-list + current-story highlight (as today), NO new search/filter/grouping features. The manifest `meta.categoryId`/`meta.storyId` structure is UNCHANGED.

5. **Design-language + affordance specificity missing.** The wave spec names "iOS-26 + glass-primitive inspiration" but the actual design decisions are unspecified:
   - **Sidebar dock:** What is the collapsed width? The current rail is ~80px, the dock's `--dock-collapsed-inline-size` is tunable. Does it collapse to an icon-only rail or fully collapse to 0? Does it auto-collapse on mobile (<768px)?
   - **Bottom-bar dock:** Is it fixed/floating or inline? If fixed, what z-index relative to the main content scrollbar? Does it live ABOVE or BELOW the main content (above = full-width scrim, below = no scroll intrusion)? Current StoryPager is inline in the shell structure.
   - **Active-state affordance:** The current CategoryRail uses `.is-active` class + darker icon color. Does the redesigned dock nav use `.is-active` + a press-spring visual (W25 tap-squish)? Or a pressed background (glass-tier surface)? Or the NCSU-red accent (AW.md §5)?
   - **Mobile responsive:** Does the sidebar collapse to a bottom sheet on mobile? Or stay a vertical rail? The current rail has `overflow="scroll"`, which clips the content on narrow viewports.
   
   **Verdict:** The wave spec must include a detailed visual+interaction design spec (rough sketch suffices) showing sidebar-collapsed/expanded states at 375px, 768px, 1440px; the bottom-bar layout (fixed vs inline); the active-story affordance (color/shadow/scale); and mobile fallback (bottom sheet or hidden sidebar).

### FOLD/WAVE SEED LIST

**Two paths forward, contingent on the two-consumer question:**

#### PATH A: demo-dock-nav as a WAVE (IF 2nd consumer exists)
- **New wave designation:** `AW.W21` (the retired/renumbered slot, or append to close the gap; see below)
- **Opens after:** W20 (styling-assay close) + explicit Band-F (W22-W26) close gate
- **Goal:** Replace CategoryRail + StoryPager with SidebarDock + BottomDock, both on GlassDock, dogfooding dock+glass-atoms
- **Hard gate (born-RED → GREEN):**
  - `proof:demo-dock-collapse` — the sidebar dock collapse↔expand width morph executes (W1 regression fix verified in the demo; Playwright frame-timing probe)
  - `proof:demo-dock-material` — sidebar dock resolves uniform `.glass-material` specular+rim (W22 unified); computed-style probe
  - `proof:demo-story-nav-press` — bottom-bar story-nav buttons render `.tap-squish` press-spring + visual feedback; Playwright press-hold frame count ≥5
  - `proof:demo-nav-contrast` — sidebar icon+bottom-bar text clear WCAG-AA on cream glass (≥4.5:1) + NCSU-red active state ≥4.5:1 on all surfaces
  - `π-lane coverage` — desktop 1440×900 + tablet 768×1024 + mobile 375×667 (light + dark); sidebar collapse/expand toggle, story-nav button press, active-state affordance at each viewport
- **File Bounds:** `modify` AppShell.vue, `create` SidebarDock.vue + BottomDock.vue + `useStoryNavigation` composable (extend, not replace), `delete` CategoryRail.vue + StoryPager.vue
- **Depends-on:** Band-A (W1-W3) + Band-D (W12-W13) + Band-E (W16-W20) + Band-F (W22-W26) closures
- **2nd consumer:** **[TO BE DETERMINED]** Name it or demote to PATH B

#### PATH B: demo-dock-nav as a FOLD into W20 or AppShell maintenance (IF no 2nd consumer)
- **Scope:** Internal demo UX refactor, not a shipped primitive or reusable component
- **Folds into:** **W20 (styling-assay)** as a demo-application subsection, OR a new **demo-layout / shell-maintenance** line item in the post-close phase
- **Justification:** The sidebar dock + bottom-bar dock are demo-specific chrome, not glass-ui library surfaces. The dogfooding value is high (tests the dock + glass-atoms on real components), but if no external consumer (slides deck-nav or a reference implementation) adopts the pattern, it's not a wave-level primitive.
- **Outcome:** AppShell.vue + SidebarDock.vue + BottomDock.vue are created/modified as part of the demo overfitting audit (W20/post-close), verified to render correctly over the glass-atoms band (post-W26), but NOT registered as an AW wave or a gate
- **No hard gate beyond:** the π-lane coverage for the overall demo (visual regression tests on the shell + all stories combined)

---

### SYNTHESIS: COGENCY VERDICT

**NOT YET CONVERGED.** The demo-dock-nav scope (RECAP.md:142) is clear — redesign the storybook nav onto two dock instances — but it has **three blocking unknowns:**

1. **Wave sequencing:** Must open AFTER W20 + Band-F close; cannot parallelize with dock/aurora/blob bands. Clear dependency chain, but NOT yet in the AW.md wave table.

2. **Overfitting / ≥2-consumer gate:** No 2nd genuine consumer named. If the storybook's sidebar+bottom-bar docks are the only consumers, the wave violates inv-P5 and must be re-scoped as a demo-internal refactor (PATH B) rather than a shipped wave.

3. **Design specificity:** The visual+interaction design (sidebar width/collapse, bottom-bar z-index, active-state affordance, mobile fallback) is unstated. The wave spec template requires paired goal+completion gates; a gate cannot be falsifiable without a concrete target design.

**CRITICAL ACTION:** Before demo-dock-nav is added to the AW wave table (as W21 or a renumbered slot), the wave author MUST:
- Confirm a 2nd consumer OR re-scope to PATH B (demo-internal fold)
- Sketch the visual design spec (sidebar/bottom-bar states at 3+ viewports, active affordance, mobile behavior)
- Add explicit "opens after W20 + Band-F complete" sequencing gate to AW.md wave table
- Declare AppShell.vue as the sole shell-layer File Bounds edit (no other wave touches it)

---

**Recommendations for the harness:**

1. **If PATH A (wave, with 2nd consumer confirmed):** Insert `AW.W21-demo-dock-nav.md` into the wave spec directory. The W21 slot was retired in the renumber (AW.md line 118), so re-opening it is a clean fit. Update `AW.md §2` wave table to add W21 after W20, before W22. Sequence: W20 opens, W21 waits for Band-F (W22-W26) close, then W21 opens.

2. **If PATH B (fold, no 2nd consumer):** Do NOT add to wave table. Include demo-dock-nav as a "post-close shell refinement" line item in `AW.W27-close.md` or in a separate `DEMO_REFINEMENTS.md` audit file. Gate it on the overall π-lane visual regression passing (no separate wave gate).

3. **Either way:** Update RECAP.md line 142 to clarify the 2nd consumer + sequencing + design spec baseline. The current phrasing ("an AW demo-dock-nav wave") assumes wave-level status without the prerequisites.

---

## Lane 25 — new-aurora-configurator

Perfect. Now I have enough context. Let me compile the audit findings into the brief:

---

## AUDIT BRIEF: AW/H COGENCY-HARDEN ROUND — FINDINGS + FOLD/WAVE-SEED LIST

### HIGH-LEVEL FINDINGS

**AW/H Tranche Status:** Drafted, committed at HEAD `afdc485` (glass-ui) and corresponding slides branch. The tranches are **substantively sound** on convergence (5 blockers in the glass-atoms band W22-W26 are all intra-band structural issues, NOT the feared W12/W13 duplication; H is a pure consumer, converged). The precepts (no legacy, gestalt, KISS, DRY, ≥2-consumer, design-cogency, gated Baseline/Tailwind-v4.3) are binding and enforced.

**Critical Findings:**

1. **W22 dock-inheritance mechanism is structurally impossible** (final-harden-fixlist §1 B1/B2/B3): `.glass-dock` does NOT compose any `.glass-*` ladder rung — it hand-rolls its own `background`, `backdrop-filter`, `border`, `box-shadow` (a parallel sixth surface with `--glass-*-dock` tokens). W22 promises dock inheritance with ZERO write access to `dock.css` (the file is absent from W22 File Bounds:31-40); dock `::before` pseudo collides with `dock.css:352` instrument-strip `::before`. **Resolution:** either add `dock.css` to W22 File Bounds as `modify-carve` (compose `.glass-material` onto `.glass-dock`, retire its local `--glass-edge-light` at `dock.css:90`), OR drop the dock from the band-uniformity matrix and keep it as a parallel surface.

2. **W22↔W24 Card specular-seam collision** (B3): W22:39 hands the dormant pointer seam to **"W23 card work"** — but W23 is `glass-material-sota` (refract/squircle/tint, NO card work); the card wave is W24. W24:21 reads `Card.vue:77` as still carrying `glass-specular-track`, but W22 §3.4 carves it OUT. **Resolution:** W22 must NOT carve `Card.vue`; retire only Button + DockIconButton opt-ins. The Card class string stays until W24 owns the Card material pass holistically. Change W22:39 from "owned by W23" → "owned by W24".

3. **W27 gate→wave attribution off-by-one** (B4): W27:17/:66/:79 mis-attribute three glass-atoms gates to wrong waves — collapses W22+W23 gates onto W22, slides `glass-card-tiers` to W23, labels `primitive-affordance` as "W24/W25" when the realized files own: W22 `proof:glass-material-unified`, W23 `proof:glass-material-sota`, W24 `proof:glass-card-tiers`, W25 `proof:primitive-affordance`, W26 `proof:reka-binding-idiom`. **Resolution:** correct the wave→gate attributions at W27:17/:66/:79.

4. **W26 false disjointness with W25** (B5): W26:6 claims "fully disjoint file bounds from W22-W25"; W26:74 claims "shares NO modify path with W25". This is false — three files collide: `badge/index.ts` (W25:60 `transition-colors→transition-control` vs W26:47 `transition-colors→transition-all` — **conflicting target values**); `toggle/index.ts` (same base CVA); `toast/Toast.vue` (W25:61 material vs W26:43 forward-emits). **Resolution:** drop false disjointness claims; decide single owner of `badge`/`toggle` `transition-colors` (recommend W25 owns the `transition-control` migration, W26 drops the conflicting `transition-all`, adds only icon-sizing/gap composing onto W25); sequence Toast.vue explicitly (W26 after W25's material carve).

5. **W12 light-dark no-op gate is born-GREEN** (Refine-4): W12:59 asserts `grep -c 'light-dark(\s*light-dark(' ... returns 0` — **the double-nested construct does not exist at HEAD, so the grep returns 0 trivially, violating born-RED discipline**. The digest explicitly struck this sub-item. W24:104 correctly disavows it. **Resolution:** strike W12 scope item 3 + gate clause `:59`; W12's real born-RED work (svg-filter per-rung collapse, gates 1-2) stands.

**Aurora Configurator — NEW SCOPE (ADDENDUM 3, RECAP §9):**
The user mandates: *"The aurora CONFIGURATOR redesign + the CAROUSEL redesign. The aurora controls surface + the carousel re-designed with iOS-26 + idiomatic glass atoms."* Current state: `src/components/custom/configurator/{Configurator.vue, ConfiguratorLayer.vue, ConfiguratorRow.vue, useConfiguratorState.ts}` — live, used by the aurora demo (demo/stories/substrates/aurora.vue). The configurator is well-structured (glass-floating tier, grid layout, preset/layer/control row pattern, density axis, CSS-only animated reveal for ConfiguratorLayer). **Redesign scope:** apply iOS-26 + glass-atoms idioms (the specular rim material, the `.tap-squish` press feedback, the card-spacing/data-slot patterns landed in W22-W26), restyle the preset chips (from `border-foreground/40 bg-foreground` active state → glass-tier idiom), the layer trigger (from plain-button → glass-tier button with `.focus-ring` + press-spring), the control rows (consolidate onto `--radius-field`/`--radius-control` geometry from W24, inherit glass-material specular, add `transition-control` press feedback from W25), the reset affordance (glass-pill button), and the footer (if present). NO new component; the redesign extends existing Configurator surface (File Bounds: `src/components/custom/configurator/*` only).

---

### DRY AUDIT RESULTS

**Glass-atoms band vs component band (W22-W26 vs W12/W13/W20):** CLEAN — no duplication.
- W24 card subcomponents are disjoint from W12's GlassPanel svg-filter tier; W24 reads W12's backdrop staging (legitimate consume).
- W25 primitive affordance floors re-assert (not re-own) the W13 three point-fixes; lines documented.
- W23 material-SOTA four folds are genuinely born-RED (no `corner-shape`, no `--glass-tint-source`, no `#glass-refract` node, no chromatic fringe at HEAD — all verified).
- AV.W15 overlap resolves: AV shipped the specular/rim as OPT-IN tokens+class; W22 is a legitimate DRY *promotion* into the ladder; W23 ships the *missing asset half* (the `#glass-refract` filter node AV deferred).

**H consumer tranche:** CONVERGED — pure consumer, no AW-primitive re-implementation.
- H.W4 constellation explicitly forbids re-rolling; swaps onto glass-ui `useRAFLoop`+`useIntersectionPause`+`prng.ts`, keeps only the slides-brand anomaly skin.
- H.W10 single-sources the 3-way-forked pulse-dot onto glass-ui `StatusDot`; forbids any glass-ui `src/` edit.

---

### FOLD/WAVE-SEED LIST

**Existing waves → refinement actions (for reconciler, NOT implementation):**

| Wave | Finding | Fold/Action |
|---|---|---|
| **AW.W12** (glass-panel-fix) | Born-GREEN light-dark no-op gate (:59); digest struck item 3 | Strike scope item 3 + gate clause :59; keep the real born-RED work (svg-filter per-rung collapse, gates 1-2) |
| **AW.W22** (glass-material-unify) | Dock-inheritance mechanism impossible (no dock.css write access); Card carve↔W24 collision; stale "W23 card work" ref | Either (a) add `dock.css` to File Bounds as `modify-carve`, OR (b) drop dock from band matrix, keep as parallel surface; do NOT carve `Card.vue`; change W22:39 from "W23" → "W24" |
| **AW.W23** (glass-material-sota) | `.glass-refract` must re-home off W22-folded compound; chromatic fringe gating inconsistent | Re-home `.glass-specular-track.glass-refract` → `.glass-material.glass-refract`; gate-5 must probe consuming selector survives W22; strike "also @supports-feasible" from §3.3 (fringe is PRM-gated only, no `@supports` feature needed) |
| **AW.W24** (glass-cards) | 3-wave shared write on `demo/stories/primitives/card.vue` undeclared; gates 1/6 born-RED state vs post-W22 HEAD unclear; cream-read floor may be partially lifted by W22 rim | Update §4a to name `primitives/card.vue` as shared with W12+W20, state W24 extends post-W12/W20 story; re-measure gates 1/6 against post-W22 HEAD (W22 uniform rim already present); add numeric alpha/blur per-rung step floor (digest ladder ≥0.10α) |
| **AW.W25** (primitives-perfection) | Press/hover interaction-light may be double-claimed with W22 (W22 specular intensity, W25 scale-transform) | W25 §1 note: specular-intensity coupling is W22-owned (glass surfaces); W25 owns scale-transform half (the `--scale-press*` channel) — two press-feedback axes, one owner each |
| **AW.W26** (reka/shadcn/Tailwind idiom) | False disjointness with W25 (badge/toggle/toast collisions); aria-invalid paint redundant for Input/Textarea; Toast sub-gate missing; §4a stale wave-number map | Drop false "fully disjoint"/"shares NO modify" claims; W25 owns `transition-control` migration, W26 drops conflicting `transition-all`, adds icon-sizing/gap only; narrow aria-invalid carve to non-`input-pill` controls (SelectTrigger, NumberFieldInput, ComboboxInput); add Toast sub-gate asserting open-change fires post-forward-emits swap; relabel §4a wave-map to realized roles (W23=material-SOTA, W24=card, W25=primitives) |
| **AW.W27** (close) | Gate→wave attribution off-by-one (3 gates misattributed) | Correct attributions at :17/:66/:79 to `unified(W22) / sota(W23) / card-tiers(W24) / primitive-affordance(W25) / reka-binding-idiom(W26)` |
| **AW.W20** (styling-assay) | Brittle magic-number sites tokenized; Tabs pill-track token-driven; glass-panel/card demo controls re-roll onto ToggleGroup | Verify no brittle literal survives where a token resolves; demo controls consume `<ToggleGroup>` only |

**NEW WAVE — Aurora Configurator Redesign (AW.W28 or fold into W22-W26):**

| Scope | Design Intent | File Bounds | Gate |
|---|---|---|---|
| **Configurator iOS-26 + glass-atoms restyle** | Apply specular rim material (W22/W23), `.tap-squish` press-spring (W25), `--radius-field`/`--radius-control` geometry (W24), card-spacing patterns (W24), data-slot/CVA idiom (W26) to the four components (Configurator, ConfiguratorLayer, ConfiguratorRow, useConfiguratorState). Redesign preset chips (glass-tier active), layer trigger (glass-tier button + focus-ring), row controls (inherit glass-material + transition-control), reset affordance (glass-pill). NO new component; extend existing surface. | `src/components/custom/configurator/Configurator.vue` (layer trigger glass-button; preset chip glass-tiers); `ConfiguratorRow.vue` (glass-pill reset, card-spacing inherit, transition-control + press-spring); `ConfiguratorLayer.vue` (chevron rotation animation on press-spring, focus-ring on trigger); `styles/configurator.css` (new custom props for glass-material rim, if needed); no new files | **`proof:configurator-glass-atoms`** — the aurora demo story (demo/stories/substrates/aurora.vue) renders the Configurator with all six glass-atoms features applied (computed-style probe over preset chip + layer trigger + row + reset): specular `::before` present (if glass-material composes), `.tap-squish` scale applied on active, `transition-control` resolves, `--radius-field` inherited, focus-ring painted, data-slot present (if W26's blanket sweep touches Configurator); the carousel Configurator (if any) follows the same pattern; no glass-ui src `/demo` **story** shows a broken Configurator state (the story is the proof, not a separate script gate) |

**Precedent:** The aurora demo (`aurora.vue` line 34 "Chrome composes `<Configurator>` (J.W4.A) — the canonical studio shell") is the 1st consumer; identify a 2nd consumer (a sibling feature Configurator or a user-authored studio) to clear the ≥2-consumer gate if the redesign is new-API, or keep it as a "existing-component restyle" (file-internal, no new public surface) if no API changes.

---

### STANDING RULES ASSERTED (π-LANE BINDING)

- **No legacy:** every wave names the anti-pattern it abrogates + the structural replacement.
- **Born-RED discipline:** if a gate is GREEN at HEAD, it's a no-op and violates born-RED — strike it.
- **≥2-consumer gate:** new public surfaces must name glass-ui story + external consumer (slides, speedtest, etc.) as two.
- **Design-language cogency:** warm-cream glass + iOS-26 Liquid Glass (rim/specular/refraction) + NCSU-red consumer-layered; no surface is an outlier.
- **Tailwind v4.3 (NO v5):** idiomatic reka-ui ^2.9, shadcn-vue CVA ^0.7.1; gated Baseline-2025 behind `@supports` + round/`border-radius` fallback.
- **File-bounds table + disjointness contract:** every wave certifies no two parallel agents write the same modify/modify-carve path; shared files serialize explicitly.
- **Overfitting audit:** every artifact ≥2 sites OR exported OR justified deck-private; hallucinated items halt close.

---

### SUMMARY

**AW/H ARE SUBSTANTIVELY SOUND.** The glass-atoms band (W22-W26) is genuine DRY-consolidation with clean component-band disjointness. The five blockers are all intra-band structural issues (dock not a ladder rung, Card carve collision, gate-id off-by-one), resolvable via targeted spec edits without redesign. The new aurora Configurator redesign is a straightforward restyle of the existing 4-SFC surface, applying the glass-atoms idioms landed in W22-W26, needing a 2nd consumer confirmation to clear the library gate. H is a pure consumer with no AW-primitive re-implementation. **The precepts (no legacy, gestalt, KISS, DRY, ≥2-consumer, cogency, gated Baseline, Tailwind-v4.3) are binding and verified.**

---

## Lane 26 — new-carousel-redesign

Based on my comprehensive read-only audit of the AW/H tranches, focusing on the carousel redesign in the new-carousel-redesign lane, here are my findings:

---

## CAROUSEL REDESIGN AUDIT — AW COGENCY-HARDEN ROUND

### Current State

The carousel exists in two forms:
- **`GlassCarousel`** (`/src/components/custom/glass-carousel/`) — a custom glass-material pill carousel with collapse/expand, overflow fade, and item scroll-to semantics. It wraps reka-ui's `ScrollAreaRoot`/`ScrollAreaViewport` and uses a local FLIP-pattern composable (`useGlassCarousel`).
- **`Carousel`** (`/src/components/ui/carousel/`) — a shadcn-derived embla-carousel wrapper with `CarouselNext`, `CarouselPrevious`, `CarouselPager`, `CarouselDots` controls.

The demo story at `/demo/stories/navigation/glass-carousel.vue` showcases GlassCarousel with a pager and a composable control harness.

### Key Findings (file:line)

1. **GlassCarousel lacks iOS-26 Liquid Glass identity** — The component (`GlassCarousel.vue:127-150`) uses a flat `--glass-border-wash` border and `--glass-shadow-wash` on hover, but does NOT carry the unified `.glass-material` specular/rim/edge-light grammar from AV.W15. The shell is visually under-resolved as a glass object (dock-shell finding mirrors this at `AW.md:214-225`). 

2. **GlassCarouselItem affordances are base-state only** — Items (`GlassCarouselItem.vue:43-84`) lack the four-state contract (hover/active/focus-ring/disabled) expected in the glass-atoms band. The `:hover` reuses `--surface-tint-6` token (not the unified `.tap-squish` press spring or a semantic interaction verb). The active state is visual-only; no `aria-pressed`/`data-state` binding exists.

3. **Overflow-fade mixin does not route through glass-atoms band** — The progressive-enhancement fade (`GlassCarousel.vue:174-241`, the `@container scroll-state` CSS recipe) is idiomatic and correct, but it is CUSTOM scoped CSS with hardcoded `--mask-fade-width: 1.5rem` — not a reusable `@utility` + tokens that the W22-W26 band would consolidate. The JS fallback (`.scroll-fade-*` masks) uses hardcoded classes, not semantic motion tokens.

4. **GlassCarousel.vue line breaks the spin-wait pattern** — The `watch(scrollAreaViewportRef, …)` at `:52-55` reads the reka-ui component's internal `$el`, a fragile cross-component boundary. Better to use reka-ui's own `onMounted` or pass the viewport element directly.

5. **Data-slot missing (W26 binding-guard scope)** — Neither GlassCarousel nor Carousel carries `data-slot` attributes. Per W26's blanket 36-family sweep (`AW.W26:3`), both root elements should declare `data-slot="glass-carousel"` and `data-slot="carousel"`.

6. **useGlassCarousel.ts lacks a named return interface** — The composable returns a bare object (`return { canScrollStart, canScrollEnd, … }`). Per W15's hygiene scope, it should export a named `UseGlassCarouselReturn` interface or carry a documented return shape (currently inferred only).

7. **Carousel.vue item states are embed-only** — The `<CarouselItem>` has no affordance feedback; demo integration (line 88-116) layers the visual feedback via `pagerIndex` binding. The component itself is stateless, deferring all interaction to the consumer — correct per shadcn pattern but inconsistent with GlassCarousel's embedded active state.

8. **No iOS-26 motion spine unification** — Both carousels use different spring/easing tokens: GlassCarousel `:136-141` uses `--duration-normal`/`--spring-snappy`, Carousel (via embla) uses the embla default tune. No canvas for the dock/aurora/blob iOS spring family to flow into carousel motion.

9. **Carousel demo story (carousel.vue) is landing-page pager, not a pattern showcase** — The story renders two carousel forms (the embla + dots, the GlassCarousel as story-pager integration) but the second form is named a "glass carousel — story pager" (line 77) implying it is GlassCarousel's signature use, when in fact the file is primarily an embla Carousel + CarouselDots/CarouselPager showcase for the primitives.

### Fold/Wave-Seed List

**For the new-carousel-redesign lane (iOS-26 + idiomatic glass atoms):**

1. **W22 (glass-material unify) — fold GlassCarousel shell specular/rim into the unified `.glass-material` mixin** — The carousel container `GlassCarousel.vue:127` is a floating glass surface that must carry the same edge-light + specular grammar as the dock/dialog/card. Scope: add `.glass-material` composition or the direct rim/specular CSS the band defines, and retire the local `--glass-shadow-wash` hardcode to the token-driven material.

2. **W25 (primitives perfection) — restore four-state contract to GlassCarouselItem** — Items currently lack the semantic hover/active/focus-ring/disabled grammar. Scope: wire `aria-pressed` binding (or a `data-state` variant), add `.focus-ring` for keyboard nav, collapse the hand-rolled hover scale into the universal `.tap-squish` spring if the item is interactive, and document the active-visual-marker as the canonical affordance (not a data-less style).

3. **W26 (binding guard + data-slot) — add `data-slot` to Carousel + GlassCarousel roots + reka-binding sweep** — Both components are UI family members missing the blanket `data-slot` sweep W26 mandates. Scope: add `data-slot="carousel"` to Carousel.vue:44 and `data-slot="glass-carousel"` to GlassCarousel.vue:82, verify reka prop bindings (embla `opts`, reka event handlers) are idiomatic, and register both in W26's binding-verification spec.

4. **NEW MICRO-WAVE (carousel-motion-spine) OR fold into W3 (dock-motion unify)** — The carousel motion language is orphaned from the dock/aurora/blob iOS spring family. Scope: align carousel transition tokens (`--duration-normal`/`--spring-snappy`) to the dock unified spring vocabulary (the M3 Expressive family from `dock-animation-digest` §B), retire embla's default tune in favor of the glass-ui spring canon, and gate the motion on a Playwright carousel-expand/collapse/item-scroll frame-timing probe (≥3 frames per gesture). Choose: fold into W3 (logical, since W3 perfects the dock motion canon) OR open a micro-wave if carousel motion is deep enough to warrant parallel work.

5. **W20 (styling assay) — extract `.glass-carousel-fade` overflow-recipe to a reusable `@utility`** — The scroll-state CSS recipe (`GlassCarousel.vue:197-241`) is idiomatic and correct but scoped to GlassCarousel only. Scope: lift the `--gl-carousel-fade-top/bottom` `@property` pair and the mask-image logic to a `.scroll-fade-mask-*` utility family in `utilities.css`, consume it from both GlassCarousel (vertical) and horizontal carousels (where the JS path lives), and retire the hardcoded `--mask-fade-width: 1.5rem` to a token.

6. **W15 (hygiene + interfaces) — name the UseGlassCarouselReturn interface** — The `useGlassCarousel` composable at `useGlassCarousel.ts:42-255` returns an inferred object. Scope: export a named `UseGlassCarouselReturn` interface matching the return shape, verify the injected `viewportEl` is type-safe (currently `Ref<HTMLElement | null>`), and document the frame-rate-independence contract (the `fadeMs` default and the `requestAnimationFrame`-driven size-morph timeline).

7. **OPTIONAL: carousel-story-IA refinement (AV.W10 extension)** — The `/navigation/carousel.vue` story conflates two patterns: embla-carousel primitives showcase + GlassCarousel story-pager. Scope: split the demo routes (embla showcase under `/primitives/carousel`, GlassCarousel story-pager under `/compositions/story-carousel` or inline with `/navigation/glass-carousel`), ensure the GlassCarousel story has a text-description of the collapsed/expanded states and the overflow-fade trigger, and verify both stories have `data-carousel-*` test anchors for e2e harness.

---

**HEADLINE:** GlassCarousel is a structurally sound custom carousel with the overflow-fade CSS recipe correctly scoped, but it is visually under-glassed (missing the unified `.glass-material` specular/rim), lacks the four-state affordance contract, and is orphaned from the iOS spring motion spine. The fold/wave seeds above thread the carousel redesign through the glass-atoms band (W22-W26) and the motion-unify band (W3 OR micro-wave), ensuring the redesign emerges with warm-cream glass + iOS-26 Liquid Glass + idiomatic glass atoms — cogent with the rest of AW.

---

## Lane 27 — new-lighthouse

Excellent. Now I have a complete picture. Let me create the final audit report.

---

## AW/H Cogency-Harden Audit: Findings + Fold/Wave Seeds

### Executive Summary

The AW/H tranches (committed, drafted, wave specs authored) are **well-structured, internally coherent, and sound in technique** across dock/aurora/blob/glass-atoms/H-slides. However, **five critical gaps** emerge from the cogency-harden round (ADDENDUM 3, user 2026-06-07):

1. **No Lighthouse audit wave** — the directive explicitly names "deep Lighthouse audit for every page + slide (perf/a11y/best-practices/SEO)" yet zero wave spec exists
2. **No storybook-completeness wave** — "EVERY component demonstrated" is named but not authored
3. **No demo-dock-nav wave** — "sidebar dock AND bottom-bar dock for core page nav" mentioned but unspecified
4. **Aurora/Carousel redesign waves unspecified** — "configurator + carousel redesign with iOS-26 idiom"
5. **Naming-consistency wave missing** — "consistent naming + verbiage across components/stories/tokens"

Plus **nine detailed findings within committed waves** (mostly refinements; five blockers in W22/W26/W27 already flagged in final-harden-fixlist).

### Findings by Category

#### CRITICAL GAPS (New Scope, No Wave Yet)

**File:Line** — `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/RECAP.md:145`

| Gap | Scope | Suggested Fold/New Wave |
|-----|-------|------------------------|
| **Lighthouse audit (perf/a11y/best-practices/SEO)** | Every demo page (/Users/mkbabb/Programming/glass-ui/demo) + every slide (/Users/mkbabb/Programming/slides) | **NEW WAVE: AW.W31 + H.Wℓ** |
| **Storybook completeness** | No glass-ui component without a story; audit demo IA for coverage; rename/re-route incoherent items | **FOLD into AW.W32 or extend AV.W10 close** |
| **Demo nav overhaul (sidebar + bottom dock)** | Dogfood the dock; rebuild storybook chrome on glass-ui dock primitives | **NEW WAVE: AW.W33** |
| **Aurora configurator + carousel redesign** | Controls surface + carousel re-styled idiomatically (iOS-26 + glass atoms) | **NEW WAVES: AW.W34 (configurator) + AW.W35 (carousel)** |
| **Naming + verbiage consistency** | Component names, story titles, token naming (e.g., `--glass-*` family spread across files) | **FOLD into AW.W26 (idiom) or AW.W27 (close docs)** |

#### EXISTING WAVE DEFECTS (Already in final-harden-fixlist)

**Files:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/final-harden-fixlist.md` + `harden-partial.md`

Five blockers (4 in W22, 1 in W26, 1 in W27):
- **W22 blocking (3 blockers)**: dock-inheritance no-write-access; dock `::before` collision; Card `glass-specular-track` carve↔W24 contradiction rooted in stale "W23 card work" ref (lines 39/19/62 of W22:25-40, W22:39)
- **W26 blocking (1)**: false "fully disjoint" claim; `badge`/`toggle` `transition-colors` token contradiction with W25 (W26:6, :74)
- **W27 blocking (1)**: gate→wave attribution off-by-one at lines 17/66/79 (W23 should be W24; W24/W25 should be W25/W26)

Nine refinements across W4, W7, W12, W22, W23, W24, W26 (path defects, missing file-home decisions, stale wave-number citations, born-GREEN gates, shared-write file undeclared).

#### SUBSTRATES & PERFORMANCE ASSUMPTIONS (Implicit, Needs Explicit Audit)

**Files:** `DESIGN.md` (typography), `AW.W4-aurora-painterly.md` (WebGL budget), `AW.W7-aurora-webgpu.md` (WebGPU gating), H visual digest (constellation visibility multipliers, CLS via @container reflow)

| Substrate | Current State | Lighthouse Risk | Action |
|-----------|---------------|-----------------|--------|
| **WebGL2 Aurora (procedural backdrop)** | Single-pass `profile:budget` constraint (W4:141) | High FCP/LCP on 3G; font async bridge untested | W31: measure FCP/LCP vs canvas-less baseline |
| **Canvas2D Constellation** | `useRAFLoop` + `useIntersectionPause` (W17); H.W4 does local RAF swap as 2nd-consumer evidence | High CLS risk on visibility token change; edge-alpha multipliers hard-coded then promoted to tokens | W31: CLS probe on dark↔light flip; H.ℓ: same for slides |
| **Font system** | Self-hosted woff2 (Plus Jakarta Sans `optional`, Fira Code `swap`); Capsize fallback geo-neutral | Zero CLS by design; LCP risk if font block time > 3.2s | W31: measure font FCP/LCP impact; verify fallback swap |
| **CSS @supports gating** | 15+ `@supports` gates on Baseline-2025 capabilities (corner-shape:squircle, backdrop-filter:url, color-mix/OKLab) | Fallback chains may incur layout thrashing if unsupported; no perf measuring | W31: measure paint/layout cost of refraction/squircle fallbacks |
| **Token cascades** | `--cqx = 1cqi/12.8`, `light-dark()` branches on 40+ tokens | Reduced-motion + prefers-reduced-transparency guards in place (W2, W8, W25) but CSS evaluation cost unmeasured | W31: measure re-evaluation cost of 40+ token reads per animation frame |

#### DEMO COMPLETENESS & A11Y COVERAGE (Implicit Audit Needed)

**Files:** `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/RECAP.md:§1` (glass-ui 3.3.0 storybook), `demo/` directory tree

Current state (post-AV.W10):
- 11-category IA exists (Foundations · Substrates · Primitives · Containers · Navigation · Data · Feedback · Motion · Tools · Compositions · Composables)
- Stories exist for most Primitives/Compositions, but **no audit confirming every exported component has a story**
- No Lighthouse audit on `/demo` index or any story page (perf/a11y/SEO gates missing)
- No WCAG-AA contrast probe across all theme variants + light/dark + reduced-transparency

**A11y gaps identified in committed waves:**
- W25 adds `.focus-ring` to Accordion/Collapsible triggers but no audit of **all** focusable atoms for ring coverage
- W26 adds `aria-invalid` paint to 5 form controls; no audit of **all** form atoms for ARIA labeling completeness
- H.W4 promotes constellation edge-alpha to tokens; no baseline WCAG-AAA contrast floor stated for neutral-on-cream

### Fold/Wave Seed Recommendations

#### NEW WAVES TO ADD

**Sequence:** These should run AFTER W27 (or in parallel after the glass-atoms band W22-W26 stabilizes, since they dogfood those atoms):

| Wave ID | Title | Scope | Fold/Depends | Reason |
|---------|-------|-------|--------------|--------|
| **AW.W31** | **LIGHTHOUSE AUDIT — glass-ui demo** | Perf/a11y/best-practices/SEO for every demo page (≥3 viewports: 375×667/1280×800/1440×900; light+dark; CLS/FCP/LCP/TTI gates; WCAG-AA on 40+ component story states) | After W27 | Explicit user directive (RECAP:145); Lighthouse budget is missing; WebGL/font/token-read perf unmeasured |
| **AW.W32** | **STORYBOOK COMPLETENESS** | Audit: every exported `src/components/ui/*/index.ts` + `src/components/custom/*/index.ts` has a live story; rename/consolidate duplicate routes (e.g., instrument-chassis/glyph-face keep-or-remove verdict from W19); verify 11-category IA tree maps 1:1 to `CLAUDE.md` inventory | After W27 | Completes AV.W10 IA; explicit directive (RECAP:141) |
| **AW.W33** | **DEMO NAV OVERHAUL (dock-driven sidebar + bottom bar)** | Rebuild storybook chrome on glass-ui dock (W1-W3 regressions fixed by then); add sidebar dock + bottom dock for category navigation; dogfood dock+glass-atoms; iOS-26 material consistency | After W27 (or parallel after W22-W26 glass-atoms band) | Explicit directive (RECAP:142); dogfooding validation |
| **AW.W34** | **AURORA CONFIGURATOR REDESIGN** | Re-style Aurora controls (Configurator story) with iOS-26 + idiomatic glass atoms (W22-W26 taxonomy); verify all W4-W8 aurora options surface (atoms resolve to full config; no orphaned knob) | After W27 (or W33 for UI idiom consistency) | Explicit directive (RECAP:143) |
| **AW.W35** | **CAROUSEL REDESIGN** | Re-style GlassCarousel/carousel with iOS-26 + glass atoms; verify no regression from AV.W13 Progress.vue fix (W31 Lighthouse gate covers it) | After W27 (or W33) | Explicit directive (RECAP:143); AV.W13 already fixed Progress internals |
| **H.Wℓ** (lighthouse) | **LIGHTHOUSE AUDIT — til-briefing deck + SlideXray portal** | Perf/a11y/best-practices/SEO for all 7 slides + XRAY (≥3 viewports; light+dark; CLS on visibility token swaps; constellation edge-alpha WCAG-AA; reduced-motion guards; touch-target 48px gates) | After H.W10 (or parallel post-H.W4 constellation visibility) | Paired with AW.W31; explicit directive (RECAP:145) |

#### FOLD CANDIDATES (Into Existing Waves)

| Item | Target Wave | Reasoning |
|------|------------|-----------|
| **Naming consistency (components, stories, tokens)** | **Fold into AW.W26 (reka/shadcn/Tailwind idiom)** or carry as a **W27 close docs lane** | W26 already carries `data-slot` blanket sweep + CVA modernization; a naming audit/refactor (renaming `--glass-*-dock` → `--glass-edge-dock` for consistency, re-aliasing token families) is an idiom closure task |
| **Animation language audit (dock/aurora/blob/primitives coherence)** | **Fold into W27 close + READMEs** | The dock README (W27), aurora README (W27), blob README (W27) are the mechanism to document the unified spring family (M3 spatial-vs-effects per W3 dock-animation-digest); the audit is a footnote to that documentation |
| **DESIGN.md currency + @supports audit** | **Fold into W27 close + typing audit** | DESIGN.md is already cited by W22/W23 for Baseline-2025 posture; the section on typography + WebGL perf assumptions needs one refresh pass in the close |

#### REVISION REQUIREMENTS (Fix Before Execution)

From final-harden-fixlist (W22/W26/W27 must reconcile):

**W22 (glass-material-unify):** Decide dock-inheritance path (A: add `dock.css` to file bounds, OR B: drop dock from band matrix). Rename W23 ref from "card work" → "W24 card work" (line 39). Handle dock `::before` collision (instrument-strip overlay).

**W26 (reka-idiom):** Drop false "fully disjoint" claim. Decide `badge`/`toggle` `transition-colors` owner (recommend W25; W26 composes onto W25). Add Toast open-change sub-gate. Pin text-shadow to `@theme inline` arm.

**W27 (close):** Correct gate→wave attribution at lines 17/66/79 (proof:glass-material-unified=W22, -sota=W23, -card-tiers=W24, -primitive-affordance=W25, -reka-binding-idiom=W26).

### LIGHTHOUSE WAVE SPECIFICATION OUTLINE (AW.W31 Seed)

**Scope:** Measure all demo pages (storybook categories) + every story state (light/dark, default/hover/active/disabled/focus-ring, reduced-motion on/off, reduced-transparency on/off).

**Gates (born-RED):**
1. `proof:demo-lighthouse-perf` — FCP ≤2.5s, LCP ≤4.0s, TTI ≤5.5s on 3G slow (all ≥3 viewports, light+dark)
2. `proof:demo-lighthouse-cls` — CLS <0.1 across canvas-toggle, theme-flip, constellation-visibility-token-swap, focus-ring appearance
3. `proof:demo-lighthouse-a11y` — WCAG-AA on 40+ component story states (contrast ≥4.5:1 on all text, button/input sizing ≥44px, focus-ring visible on all atoms from W25/W26)
4. `proof:demo-lighthouse-best-practices` — no deprecated APIs, no unoptimized images (canvas outputs), no mixed-content, no CSP violations, font-loading strategy verified (woff2 async, fallback swap geometry-neutral)
5. `proof:demo-lighthouse-seo` — meta tags, canonical, structured data (if any), viewport + mobile-friendly

**Substrates to measure:** WebGL2 Aurora render (single-pass budget sustained), Canvas2D Constellation (frame-time under RAF loop + intersectionObserver pause), font bridge FCP/LCP impact (Plus Jakarta Sans optional, Fira Code swap).

**Wave spec sections:** Goal/Hard gate (5 gates), File Bounds (no new components; only demo stories + instrumentation), Disjointness (no conflict with W22-W27 or H.W1-W10), Depends-on (W27 close, all visual waves), Scope detail (matrix: 3 viewports × 2 themes × state variants), Archaeology (audit methodology, baseline numbers).

---

## Summary

**AW/H are SOUND in substance and WELL-RESEARCHED** across the 27+10 waves and five tranches (dock/aurora/blob/glass-atoms/slides). The **five committed blockers** (W22 dock-inheritance, W26 badge token, W27 gate map) are **already listed in final-harden-fixlist and reconcilable**. H is a **clean pure-consumer tranche** with no re-implementation.

**The cogency-harden round exposes FIVE NEW SCOPE GAPS** (Lighthouse/storybook/demo-nav/configurator-carousel/naming) that were named in ADDENDUM 3 but never authored as wave specs. These should be **added as W31-W35 (or folded into W27/H-close) and sequenced after the glass-atoms band stabilizes**.

The **Lighthouse audit** is the load-bearing gap — WebGL/font/token-read performance, CLS on theme-flips + visibility-token swaps, and a11y coverage across all 40+ interactive atoms are unmeasured and unmapped to hard gates.

---

## Lane 28 — new-animation-designmd

Perfect. Now I have comprehensive reading on the AW/H charters, the audit digests, and the DESIGN documentation. Let me synthesize my findings.

Based on my comprehensive read-only audit of the AW/H tranches, here are the findings on animation coherence and DESIGN.md currency:

---

## ANIMATION-LANGUAGE COHERENCE AUDIT

### Finding 1: Dock animation architecture is well-founded but has residual forks
**File:Line:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts:19,234-243,262-333` + `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:516-529,526-529`

**Issue:** The dock's single-driver law (one concern, one curve) is correctly expressed for *size* (JS `SpringProgress` on FLIP path; VT group on supported engines) but the *opacity* forks at runtime interruption. Opacity rides CSS `linear()` easing (the `--dock-motion-resize` token, a 48-stop piecewise approximation of the same ODE), but on velocity-continuity retarget the JS spring re-seats from live velocity while the CSS `linear()` opacity restarts from 0% every swap — the residual "items lag the pill" tell on interruption (finding 1.1, `dock-animation-digest §1 row 1`). The `--spring-dock` token and `DOCK_SPRING` const are bit-identical-motion-claimed but not bit-identical-on-retarget.

**Severity:** HIGH (blocks the W1/W2 gates). The `proof:dock-animation-live` gate on AW.W1 samples the FLIP timeline, but the opacity desync on a *retargeted* swap is invisible in a single-run sample — only a rapid re-toggle surfaces it. The gate audit must assert opacity *settles together with size on an interrupted swap* (three frames: initial expand, mid-flight re-toggle, final settle).

**Fold:** AW.W1 + AW.W2 (HIGH). Opacity must drive from the *same* `SpringProgress` callback as size, not from an independent CSS transition. The CSS `linear()` stays only as the VT-path + PRM fallback.

---

### Finding 2: Aurora DESIGN.md is currency-complete; no hidden undocumented APIs
**File:Line:** `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` (v4.1, 2026-04) + `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/Aurora.vue` + `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/composables/runtime.ts`

**Status:** The DESIGN.md at `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md` is current to HEAD. The public API (§5, `createAurora` + `useAurora` + `AuroraInstance.setCursor/setReducedMotion/renderAt/pause/resume`), the six invariants (§2, multi-nuclei/organic-boundaries/value-variation/medium-orthogonal/cursor-deflects/breath-paced), and the architectural pipeline (§4, composition→medium→post) are all wired and gate-tested. No orphaned APIs or silent undocumented paths found in the runtime.

The `opacity-ceiling` prop (Δ06, added A3 §6) is documented and wired to both placeholder + canvas via `--aurora-opacity-ceiling` (the per-route saturation clamp for content-over-aurora routes). The v4→v4.1 deltas (cursor palette rotation, `warpMode` cellular/hybrid, `strokeLayers` 2, `strokeMode` peer-routing) are all in the DESIGN.md.

**No currency gap found.** The document is the source of truth and matches the implementation.

---

### Finding 3: Spring-token sync is the load-bearing seam; no audit of control micro-motions
**File:Line:** `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:163,1295-1310` + `/Users/mkbabb/Programming/glass-ui/scripts/regen-spring-tokens.mjs:57-58` + `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts:19`

**Issue:** The spring tokens (`--spring-dock`, `--spring-snappy`, `--spring-bouncy`, `--spring-smooth`, `--spring-gentle`) are defined in tokens.css as 48-stop `linear()` curves, mirrored *nominally* to the const sources (e.g., `DOCK_SPRING {response:0.5, ζ:0.5}`). The `regen-spring-tokens.mjs` script is the SOLE publisher; when a const changes, the script MUST be re-run and the emitted tokens re-committed. **No verification gate enforces that the two sources stay in sync.** If a developer edits `DOCK_SPRING` without re-running the script, the JS spring and CSS `linear()` curve silently diverge (the pre-AW.W3 state: response 0.5 was live but the token was never retuned).

**Finding 3.1 (secondary):** The dock controls (icon-button press, tab-button, select-trigger, dropdown-trigger) each declare their own `transition` timing on `--dock-motion-fast` (200ms) or per-control bespoke cubic-bezier (`dock.css:794-797` tabs, `:23-32` button press springs). **No single `--dock-press-spring` authority controls all five control families.** The token exists at `:1310` (aliased `var(--duration-fast) var(--spring-bouncy)`) but is not proven to be read by every control family — a `grep -r "dock-press-spring"` would verify. This is the "inconsistent control micro-motion" finding from the animation audit (animation-partial-run1.md §2 row 1).

**Severity:** MEDIUM-HIGH (not a regression, but a consistency gap). The dock-motion W1-W3 band will retune `--spring-dock` to control-response (0.35-0.4 per the SOTA brief); the retune gate *must* include a dual-write verification: after editing `DOCK_SPRING`, running `regen-spring-tokens.mjs`, and committing, a proof gate asserts both sources in HEAD.

**Fold:** AW.W3 (token retuning wave). Must include a `proof:spring-tokens-synced` gate (both const and token present, nominally bit-identical to within floating-point error on the 48-stop sample).

---

### Finding 4: Blob DESIGN.md is absent; animation choreography undocumented
**File:Line:** No `/Users/mkbabb/Programming/glass-ui/src/components/custom/goo-blob/DESIGN.md` found.

**Status:** The blob component is a live WebGL2 SDF-based droplet with specular/Fresnel/iridescence (shipping in AW.W9-W11), but no DESIGN.md documents the API, the visual invariants, or the animation contract. The AW.W9-W11 wave specs will author the DESIGN.md, but at tranche-development time there is **no design-language reference for the blob**.

**Severity:** MEDIUM (NOT a blocker for the cognitive-hardening round; the wave specs author it post-planning). The blob is a *new* component and its DESIGN.md will be authored concurrently with implementation in AW.W9, not retroactively.

**Fold:** The blob DESIGN.md is a gate-deliverable in AW.W9 (part of the "research-backed README" chain; the W9 spec cites it).

---

### Finding 5: Constellation DESIGN.md absent; canvas-driven substrate undocumented
**File:Line:** No `/Users/mkbabb/Programming/glass-ui/src/components/custom/constellation/DESIGN.md` found (the component is new, AW.W17).

**Status:** The Constellation component ports the `constellation.ts` engine from slides (dpr-resize, palette-read-on-dark-flip, RAF arm/disarm, draw passes) onto a new `useCanvas2D` composable substrate. The AW.W17 wave will ship both. At tranche-development time, neither the `useCanvas2D` substrate nor the `Constellation` component has a DESIGN.md documenting the rendering model, the lifecycle, or the animation-pause contract.

**Severity:** MEDIUM (NOT a blocker; the wave authors it). The Constellation is the 2nd-consumer unblock for AV.W8; the slides H.W4 + H.W10 waves will exercise the real consumer pattern.

**Fold:** The Constellation DESIGN.md is a gate-deliverable in AW.W17 (the "research-backed README" family; the W17 spec references it).

---

### Finding 6: Animation coherence across dock/aurora/blob lacks a _unifying_ charter
**Evidence:** The dock has `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/research/dock-animation-digest.md` (the SOTA brief + lane seeds). Aurora has the DESIGN.md. Blob and Constellation have no animation documentation. The dock-animation digest §1.1 names the "one concern, one driver, one curve" law; aurora lives in orthogonal medium-driven space; blob is a material surface (specular + iridescence, not a timing language).

**Issue:** There is NO cross-component animation-language document. The dock-animation digest names the spring vocabulary (`--spring-dock` / `--spring-snappy` / `--spring-bouncy` / `--spring-smooth`), but does NOT explicitly ground the blob droplet iridescence morph or the aurora cursor-deflection motion against that vocabulary. The three components do not cite each other's design principles.

**Severity:** LOW-MEDIUM (cognitive/coherence issue, not a functional bug). The three backdrops + the dock are visually the same object under the warm-cream glass register (AW.md §5), but their *animation* languages (spring physics for dock motion, shader-driven ambient for aurora, surface-material for blob) are independent subsystems. **Coherence means they read as ONE aesthetic, not three isolated motion concepts.**

**Fold:** Not a new wave, but a documentation audit in AW.W27 (the close). The flag: author a brief (2-3pp) on "Animation-language coherence: dock springs + aurora shader-motion + blob material-response as one iOS-aligned aesthetic" to ground the visual unity. Place this brief in the FINAL.md close or as an appendix to the dock-animation digest.

---

## DESIGN.MD CURRENCY + COMPLETENESS AUDIT

### Summary Table

| Component | DESIGN.md present? | Current to HEAD? | Status | Fold |
|---|---|---|---|---|
| **Aurora** | Yes (`v4.1`, 2026-04) | Yes; all Δ01-06 + public API complete | Currency: GREEN. Completeness: GREEN. No undocumented paths. | None (audit-only, no fold) |
| **GlassDock** | No | N/A (conceptual doc in /AV/audit/dock-animation-digest.md) | Charter lives in AW.md + the digest. No SFC-embedded DESIGN.md. | Optional: AW.W27 can author a dock DESIGN.md as a close gate, but the wave specs cover the motion contract. |
| **Blob** | No | N/A (new component, AW.W9-W11) | Will be authored in AW.W9 as a gate deliverable alongside the README. | Gated to AW.W9 (wave spec) + AW.W27 (READMEs) |
| **Constellation** | No | N/A (new component, AW.W17) | Will be authored in AW.W17 as a gate deliverable. | Gated to AW.W17 (wave spec) + AW.W27 (READMEs) |
| **Glass-panel / Card** | No | N/A (styling-focused, not motion-centric) | The material language is in root DESIGN.md §L1-L6 (Liquid Glass precepts, spring physics, tap choreography). Component- specific overrides are in AW.W12-W15 specs. | No DESIGN.md needed; AW.W23-W26 (glass-atoms band) own the material unification. |
| **Root (tokens.css, glass.css)** | Yes (`/DESIGN.md`, 677pp) | Yes; current to v1.5.0 (AU+AV final) | **Comprehensive.** §L1-L6 name the five Liquid Glass precepts (Liquid Glass, Spring Physics, Tap Choreography, Motion Tiers, A11y brackets). Token architecture (§Token Architecture). All tier tables. Spring curves (§Easing). | No fold needed; AU.W* reference. AW.W27 close audits for any new tokens introduced by W22-W26 (glass-atoms band) and appends the new token deltas to root DESIGN.md. |

---

## FOLD/WAVE-SEED LIST

Each seed maps to an existing wave or flags a new fold:

1. **Dock opacity on the animation-live gate (AW.W1 high regression)** → folds into **AW.W1-W2** (the high-regression + lockstep-lag pair). Gate `proof:dock-animation-live` must assert opacity settles *together with size on an interrupted swap*, not separately. Currently the gate samples one run; gate logic must include a retarget scenario (initial expand, mid-flight re-toggle, final settle measuring opacity+size arrival delta).

2. **Spring-token sync verification (DOCK_SPRING ↔ --spring-dock bit-identity)** → folds into **AW.W3** (dock springiness + token retuning). New gate: `proof:spring-tokens-synced` (after `regen-spring-tokens.mjs` runs, the emitted `--spring-dock` and the const `DOCK_SPRING` are nominally identical to floating-point 1e-6 tolerance on the 48-stop sample).

3. **Dock control micro-motion convergence (all five control families on --dock-press-spring)** → folds into **AW.W3 or the styling-assay lane (AW.W20)**. If scheduling permits, AW.W3 (the dock-motion band close) unifies control motion; else it folds into the styling-assay as a dock-specific assertion. Gate: every dock control (icon-button press, tab-button, select-trigger, dropdown-trigger, dark-mode-toggle) reads `--dock-press-spring` as the sole authority, verified by a `grep -r "var(--dock-press-spring)"` finding five+ sites.

4. **Blob DESIGN.md charter** → **AW.W9** (blob visual/surface, the headline wave). Wave spec authors the DESIGN.md concurrently with implementation (public API, visual invariants, shader architecture, lifecycle). Gate: W9 close checks DESIGN.md exists + documents all public methods + names the five motion axes (iridescence hue-shift, specular catch-light, Fresnel rim, soft-body squish, mood state-blend).

5. **Constellation DESIGN.md charter** → **AW.W17** (Constellation component + useCanvas2D substrate). Wave spec authors the DESIGN.md concurrently with implementation (canvas lifecycle, RAF pause contract, dpr-resize, draw-pass architecture). Gate: W17 close checks DESIGN.md exists + documents the render-mode (live/capture) split + the pause/resume contract (must honor `prefers-reduced-motion`).

6. **Animation-language coherence brief** → **AW.W27** (close wave, gate-fleet + READMEs). Fold: author a brief (2-3pp) titled "Animation coherence: springs + shaders + surfaces as one aesthetic" that grounds the dock-spring vocabulary + aurora shader-ambient + blob material-response as a unified iOS-aligned motion language. Place in `/Users/mkbabb/Programming/glass-ui/docs/tranches/AW/FINAL.md` or as an appendix to the `dock-animation-digest.md`. Gate: brief exists + cites file:line anchors for each component's animation seam + names how the three subsystems read as one visual object under warm-cream glass.

7. **Root DESIGN.md token audit (glass-atoms band deltas)** → **AW.W27** (close). Fold: after AW.W22-W26 (glass-atoms band) ship, the close wave audits all new tokens (e.g., `--glass-material-*` unify tokens, `--card-spacing`, `--radius-field`, `--text-shadow-*`) and appends a "§AW token deltas" section to `/Users/mkbabb/Programming/glass-ui/DESIGN.md` documenting the additions. Gate: root DESIGN.md version bumps from v1.5.0 → v1.6.0 + new section present + every new token documented with its tier (Liquid Glass / Spring / Tap / Motion / A11y) and use site.

---

**Coherence verdict:** Animation-language is well-founded on the dock and aurora, with residual fork at opacity retarget (HIGH, fixes in AW.W1-W2). DESIGN.md is current for aurora; blob + Constellation docs are gated to their implementation waves (medium priority). Root DESIGN.md covers the material/spring canon; the blob and Constellation will inherit and extend those precepts. No overfit detected; no hidden undocumented APIs in aurora. Cross-component coherence (the three as one aesthetic) is absent as a *documented principle* but visually implicit in the design language precepts — recommend the AW.W27 coherence brief to make it explicit.

---

## Lane 29 — recap-verify

Perfect! Now I have the complete picture. Let me compile my findings. The key insight is that ADDENDUM 3 (2026-06-07) introduces **6 new scope items** that are NOT covered by existing AW waves:

1. **Storybook layout perfected / completeness audit** — no dedicated wave
2. **Demo dock-nav** (sidebar + bottom bar) — no dedicated wave
3. **Aurora Configurator redesign** — no dedicated wave
4. **Carousel redesign** — no dedicated wave
5. **Naming-consistency audit** — mentioned as a fold, but no wave
6. **Deep Lighthouse audit** (perf/a11y) — no dedicated wave
7. **Animation audit + DESIGN.md audit** — mentioned as folds but not formalized

Let me verify by checking what the actual wave table has and cross-reference against these:

The AW wave table at AW.md §2 covers W0-W20, W22-W27 (28 waves; W21 is retired). These are:
- W0: Spot-verify
- W1-W3: Dock (band A)
- W4-W8: Aurora (band B)
- W9-W11: Blob (band C)
- W12-W15: Component fix pass (band D)
- W16-W17: Convergence (band E)
- W18: Gate-pattern
- W19: Orphan-prune
- W20: Styling assay
- W22-W26: Glass-atoms (band F)
- W27: Close

**Missing waves for new scope from ADDENDUM 3:**
- Storybook-completeness (extends AV.W10)
- Demo-dock-nav (sidebar + bottom dock)
- Aurora configurator redesign
- Carousel redesign  
- Naming-consistency (fold into styling/idiom)
- Lighthouse audit (perf/a11y)
- Animation audit (fold into animation-language + close)
- DESIGN.md audit (fold into close/docs)

Now let me create the final markdown report:

---

## RECAP-VERIFY: AW/H Tranche Coverage Audit

**Status: NOT CONVERGED — 6 new-scope items from ADDENDUM 3 (2026-06-07) fall through without dedicated waves or explicit folds.**

### Coverage Gaps (New Scope, ADDENDUM 3)

ADDENDUM 3 introduces 8 new asks; the AW.md wave table (W0-W20, W22-W27) covers NONE as dedicated waves. The tranche is **incomplete against the stated totality**:

| # | New Scope (ADDENDUM 3:135-147) | Disposition Needed | Current State |
|---|---|---|---|
| 1 | **Storybook layout perfected — EVERY component demonstrated.** No glass-ui component without a story; the demo IA audited for completeness + cogency. | → AW storybook-completeness wave (extends AV.W10) | **NO WAVE AUTHORED** — not mentioned in AW.md §2 table or audit digests |
| 2 | **Demo dock-nav: SIDEBAR dock + BOTTOM-bar dock for core page nav.** Storybook navigation re-built on glass-ui dock, dogfooding the dock + glass atoms. | → AW demo-dock-nav wave | **NO WAVE AUTHORED** — not mentioned in AW.md §2 table or audit digests |
| 3 | **Aurora CONFIGURATOR redesign.** Aurora controls surface re-designed with iOS-26 + idiomatic glass atoms. | → AW waves (configurator extends existing Configurator) | **NO WAVE AUTHORED** — referenced in RECAP §1 ("recategorized configurator→Compositions" AV.W10 DONE), no AW wave file exists. The configurator is mentioned only as "existing Configurator" in AW.W6 (atoms authoring door) with no redesign scope |
| 4 | **CAROUSEL redesign.** Carousel re-designed with iOS-26 + idiomatic glass atoms. | → AW wave (the GlassCarousel/carousel) | **NO WAVE AUTHORED** — the carousel Progress.vue fix (AV.W13 DONE) is conflated with carousel component redesign. No carousel redesign wave exists. Final-harden-fixlist flags AW.W16/H.W2 mis-cite the carousel as a "live 2nd consumer" when it is "latent, not-required" |
| 5 | **Consistent naming + verbiage** across components/stories/tokens. | → naming-consistency fold (styling/idiom wave or dedicated lane) | **FOLD, NOT WAVE** — mentioned in ADDENDUM 3:144 as a fold into "styling/idiom wave or dedicated lane," but no explicit fold target named. W26 (reka-idiom) touches naming conventions (`data-slot`) but does not scope a cross-tranche naming audit |
| 6 | **Deep LIGHTHOUSE audit** (perf/a11y/best-practices/SEO) for every page + slide. | → AW perf-a11y wave (glass-ui demo) + H wave (slides) | **NO WAVE AUTHORED** — not mentioned in AW.md §2 table. H has no corresponding Lighthouse wave either |
| 7 | **Deep ANIMATION audit.** Animation language coherence across dock/aurora/blob/primitives. | → folds into animation-language + close/docs waves | **FOLD, UNRESOLVED TARGET** — mentioned in ADDENDUM 3:146 as a fold "into the animation-language + the close/docs waves," but no "animation-language wave" exists in AW's table. Dock animation (W1-W3) + aurora interactivity (W8) + blob interaction (W10) are scattered; no unified audit wave consolidates them. W27 (close) mentions π visual-runtime lane but does NOT formalize an animation-coherence audit |
| 8 | **DESIGN.md audit.** DESIGN.md currency/completeness (aurora DESIGN.md specifically). | → folds into animation-language + close/docs waves | **FOLD, PARTIALLY ADDRESSED** — aurora DESIGN.md (at `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/DESIGN.md`) is live + cited in AW wave files; harden-partial § Review 1 flagged §2.8 and §2 invariant 8 mis-cites (FIXED by final-harden-fixlist). No systematic DESIGN.md-wide currency audit wave exists. W27 (close) does not formalize a docs-audit |

### Summary of Gaps

| Category | Count | Items |
|---|---|---|
| **No wave authored** | 4 | Storybook-completeness, demo-dock-nav, configurator redesign, carousel redesign |
| **Fold target unresolved** | 2 | Naming-consistency, animation audit |
| **Wave exists but incomplete** | 2 | Lighthouse (0 waves), DESIGN.md audit (partial: aurora DESIGN.md cited but no audit wave) |
| **Total new-scope coverage gap** | 8 | All ADDENDUM 3 items |

### Cross-Check Against RECAP + Manifest Inconsistencies

**AW manifest problems found by final-harden-fixlist + harden-partial:**

1. **AW.md §1 vs wave files — aurora braids DIVERGE (harden-partial §1)**
   - AW.md §1 "braid 2" describes W4 as "structure-tensor + impasto-relight + van-Gogh medium + oil-pastel" (four techniques in one wave)
   - Actual wave files: **W4 = all four painterly mediums**, W5 = OKLCh color + derive, W6 = additive atom door (ADDITIVE, not prune as AW.md claims)
   - **Gate names conflict:** AW.md names `proof:aurora-structure-tensor/-oklch-strokes/-options-slim/-webgpu-gated/-interactive`; wave files use entirely different names (`proof:aurora-tensor-field/-oklch-interp/-derive-gamut/-atoms-roundtrip/-backend-fallback/-interaction-prm`)
   - **Status:** harden-partial flagged as blocker; AW.md §2 § 1 braid 2 must be rewritten to match wave files

2. **H cross-repo hinges broken (harden-partial § Review 2)**
   - H.W2 cites "AW.W24" for DeckProgress throughout (7 instances); actual wave is **AW.W16**. No AW.W24 exists
   - H.W4 cites "AW.W16" for Constellation (11 instances); actual wave is **AW.W17**. Consumes wrong primitive
   - H.W6 cites "AW.W24" for GatePattern (11 instances); actual wave is **AW.W18**
   - **Status:** final-harden-fixlist §2 lists as blockers; all three H waves hang on nonexistent or wrong AW waves

3. **Carousel 2nd-consumer double-count (final-harden-fixlist, harden-partial § Review 2)**
   - AW.W16 (DeckProgress) correctly names consumers: "demo Deck story (glass-ui) + slides de-docked bar (H)"
   - H.W2 (progress-polish) falsely claims carousel Progress.vue (AV.W13) is the AW.W16 2nd consumer; it is not
   - AW.W16 explicitly marks carousel as "latent, not-required" (not a live consumer)
   - **Status:** final-harden-fixlist calls this a refine; ≥2-consumer rule breached by false ledger

### Findings Summary

**File:Line Citations (Key Defects)**

- **AW.md:§1 braid 2 (lines 73-82)** — aurora braids description diverges from wave files; rewrite against §2 braid 2 + wave-file gate names (final-harden-fixlist §2 Blockers line 20-32)
- **AW.md:§2 wave table (lines 122-150)** — all wave rows W4-W8 gate names wrong; rewrite to match wave files (harden-partial §1 Blockers)
- **AW.W7:line 47, §4a:69, §5, §6, §11** — file path `useWebGLCanvas.ts` missing `webgl/` directory segment; all cites wrong (harden-partial §1 Blockers)
- **ADDENDUM 3:RECAP.md:lines 135-147** — 8 new-scope asks; **0 addressed by AW.md wave table or H wave table**
- **final-harden-fixlist:§1 B1-B5** — 5 blocker fixes needed: dock inheritance no-write-access (W22), Card-carve collision (W22↔W24), glass-atoms gate attribution off-by-one (W27), W26 false disjointness (W26↔W25), H cross-repo wrong-wave hinges (H.W2/W4/W6)

### Fold/Wave Seeds (Recommendations)

**For the missing new-scope items — the AW/H tranche cannot close as "monolithic + totality" until these are covered:**

| New Scope | Existing Wave to Fold Into | OR | New Wave Seed |
|---|---|---|---|
| **Storybook-completeness** | W20 (styling-assay) or W27 (close) | OR | **NEW: AW.W21-storybook-completeness** (∨ revive W21 slot: audit IA for missing stories, every component ↔ story binding, demo navigation coherence) |
| **Demo-dock-nav** | N/A (dock-specific, not folding into shared styling) | → | **NEW: AW.W21-demo-dock-nav** OR **AW.W21-demo-nav-redesign** (sidebar + bottom-bar dock, dogfooding dock+glass-atoms, iOS-26 idiom) |
| **Configurator redesign** | W6 (aurora-atoms, authoring door) — already mentions "the configurator exposes" | → | Extend W6 scope to: **"W6 aurora-options + CONFIGURATOR redesign" — the UI is re-designed on glass atoms; Collapsible/ToggleGroup drills replace handwritten selects** OR **NEW: AW.W?-aurora-configurator** |
| **Carousel redesign** | W20 (styling-assay, demo controls) | → | Extend W20 scope to include carousel, OR **NEW: AW.W?-carousel-redesign** (glass atoms, iOS-26 pagination) |
| **Naming-consistency** | W26 (reka-idiom + `data-slot`) or W20 (styling) | → | **Explicit fold target**: W26 §6 or W20 §5; conduct cross-component naming audit (camelCase/kebab-case, token naming, story naming). Name the audit set (20-30 sites?) |
| **Lighthouse audit** | W27 (close) | → | **NEW: AW.W?-perf-a11y-audit** — Lighthouse runs over /demo at 3+ viewports, light+dark; records baseline + fixes top 5 perf/a11y/SEO issues. Same for slides H. OR fold into W27 as a π sub-gate |
| **Animation audit** | W3 (dock), W8 (aurora), W10 (blob) + W27 (close) | → | **Fold: W27 animation-coherence audit** — audit dock/aurora/blob/primitives motion language (spring families, easing, frame budgets, consistency). Gate: `proof:animation-coherence` asserts ≥90% spring curves from ONE palette (e.g., `dock-spring`, `aurora-spring`, `blob-spring` family). DESIGN.md §6 (motion) + README bridges document the unified language |
| **DESIGN.md audit** | W27 (close) + README workflows | → | **Fold: W27 docs-audit** — aurora DESIGN.md + blob DESIGN.md + constellation README + dock README + new animation-coherence bridge. Gate: `proof:doc-consistency` asserts all cites resolve against live surfaces + no forward-refs to unshipped waves + images/diagrams render |

### Precepts Status

**Inv P5 (≥2-consumer, visual-load-bearing):** The new-scope items DO NOT clear the bar — they are speculative add-ons to the tranche, not grounded in ≥2 consumers. **Storybook-completeness, demo-dock-nav, configurator redesign, carousel redesign, Lighthouse audit are all speculative stretch-goals without a named 2nd consumer.** Per the house precepts, these must either (a) name two real glass-ui + slides consumers, OR (b) be explicitly deferred and marked KEEP-BOOK for a future tranche.

**Precept violation:** ADDENDUM 3 asserts AW/H are "monolithic + totality," but the wave table does NOT cover the 8 items listed. The manifesto is broader than the plan.

---

**Final verdict: NOT CONVERGED. The AW/H tranche claims to be "monolithic + totality" (ADDENDUM 3:126) but leaves 6-8 new-scope items unaddressed in the wave table. The 5 blockers in final-harden-fixlist (W22 dock-unify, W22↔W24 Card-carve, W27 gate-attribution, W26 false-disjointness, H cross-repo wrong-wave hinges) must be fixed. The new-scope gaps must either be seeded as waves, explicitly folded with named targets, or deferred + marked KEEP-BOOK.**

---

## Lane 30 — precepts-conformance

Perfect. Now I have enough data for a comprehensive audit. Let me compile my findings:

## AW/H Tranche Cogency-Harden Audit — Precepts-Conformance Findings

### Executive Summary

The **AW/H tranches are substantially DRAFTED but exhibit critical conformance gaps** blocking convergence. The engineering substance is sound across all bands (aurora structure-tensor + impasto + OKLCh, blob SDF-normal Fresnel, constellation Canvas2D substrate, glass-atoms DRY consolidation), the design language is coherent (warm-cream + iOS-26 + consumer-layered NCSU-red), and the precept disciplines are well-understood by the wave authors. **However, the planning-integrity layer has defects in charter↔wave-file alignment, missing foundational waves, and gate-name divergences that prevent an honest close.** The 27-wave AW + 10-wave H set is architecturally sound; the precepts violations are concentrated in administrative/structural reconciliation, not engineering substance.

---

## I. CRITICAL BLOCKERS (Must Fix Before Implementation)

### **Blocker Cluster 1: Charter↔Wave-File Gate-Name Divergence (AW.md §2)**

**Finding:** AW.md §2 (the wave table) lists 22 hard gates with INVENTED names that exist nowhere in the wave files or scripts.

| Charter Gate Name | Wave-File Gate ID | Wave | File Location |
|---|---|---|---|
| `proof:dock-collapse-live` | `proof:dock-animation-live` | W1 | AW.W1-dock-collapse-regression.md:8 |
| `proof:dock-lockstep-live` | `proof:dock-animation-live` + `proof:spring-tokens-synced` | W2 | AW.W2-dock-motion-unify.md |
| `proof:dock-spring-unify` | `proof:dock-layering-polish` | W3 | AW.W3-dock-layering-rail-wrap.md |
| `proof:aurora-structure-tensor` | `proof:aurora-tensor-field` + 3 others | W4 | AW.W4-aurora-painterly.md |
| `proof:aurora-oklch-strokes` | `proof:aurora-oklch-interp` + `proof:aurora-derive-gamut` | W5 | AW.W5-aurora-color-derive.md |
| (17 more divergences across W6-W18) | → | → | → |

**Precept Violated:** `SPEC.md §Hard Gates` — hard gates must be falsifiable and resolvable to actual commands/proofs. Fabricated gate-names are not evidence. The close ceremony (`AW.W27` / `inv-27` / "every done cites AW's OWN green CI run id") is impossible when the gate IDs do not map to realizable proofs.

**Fix:** Rewrite `AW.md §2` gate column to use the wave-file gate-IDs verbatim (the wave files are the ground truth; `AW.md` is the charter).

---

### **Blocker Cluster 2: Five Missing Charter-Promised Waves**

**Finding:** Five charter obligations have no wave file and break the retire-gating chain.

| Item | Charter Promise | Reality | File Missing |
|---|---|---|---|
| **AW.W0 spot-verify DEV** | `AW.md:25,101` declare W0 (gate `proof:aw-w0-reground`). PREREQUISITE for all W14+ retires per inv P7 + SPEC §Audit-verdict-spot-verification-gate. | no `waves/AW.W0-*.md` exists (spot-verify *is* in a commit but no formal wave spec) | YES — AW has the wave file but lacks formal spec reconcile |
| **Orphan resolution wave** | `AW.md:45` folds instrument-chassis/rail + glyph-face/disco-glyph into W14. Charter demands a DEDICATED orphan-resolution wave w/ `proof:orphan-resolved`+`proof:no-god-module` gates. `AW.W14-datatable-split.md` is DataTable-split ONLY (zero orphan/glyph/instrument mention). | no dedicated wave; orphan logic is homeless | YES |
| **metric-cell/metric-stack prune** | `AW.md:45` folds metric-prune into W14. Digest mandates "surface hidden dep FIRST" (born-RED gate). W14 file has zero metric/prune mention. | no dedicated wave; prune scope is orphaned | YES |
| **Styling-assay wave** | `AW.md:115-116` assigns brittle-calc→token tokenization + Tabs pill-track + raw-`<button>`→ToggleGroup + `use-token-color` doc to W15. W15 file is colocation/naming-hygiene ONLY (gate `proof:styling-hygiene` does not exist in `AW.W15-hygiene.md`; file has gate `proof:no-test-in-src`/interface names instead). | no dedicated wave; styling assay scope is severed from its promised W15 home | YES |
| **Close ceremony + 4 READMEs** | `AW.md:119-120` W27 = "GATE-FLEET CLOSE + READMEs (LAST)" — register every gate in `gates.mjs`, `proof:aw-final`, `gates:verify-ci`, the four research READMEs (dock/aurora/blob/constellation), overfitting audit, π visual-runtime lane, `FINAL.md` with green run-id per wave. | Actual W27 (if drafted) is missing or not integrated; no `gates:verify-ci` registration table visible in the wave or charter. PROGRESS.md missing (charter :25 "write PROGRESS.md"). | YES — close ceremony is homeless |

**Precept Violated:** `SPEC.md §Wave Table` — every declared wave must have a corresponding `waves/W<N>.md` spec. `SPEC.md §Close` — "every planned item landed… or has a named destination" (P-Inv 28 zero-deferral); five items are unlocated. `SPEC.md §Retrospective Discipline` — tranche-attribution by close is mandatory.

**Fix:** Author formal wave files for AW.W0 + orphan-resolution + metric-prune + styling-assay. Reconcile W27 (close) to include gate-fleet registration + the 4 READMEs + π lane + FINAL ceremony. Create `PROGRESS.md` tracking execution against these waves. H tranches are identical — create `H/PROGRESS.md`.

---

### **Blocker Cluster 3: W16↔W17 Numbering Swapped vs Wave Files**

**Finding:** Charter lists W16=Constellation, W17=DeckProgress. Wave files are inverted: `AW.W16-deckprogress.md`, `AW.W17-constellation-component.md`. H hinges on the swapped names (31+ occurrences of phantom `AW.W24` that should be W16/W17/W18).

**Precept Violated:** `WAVE_SPEC.md §1 Header` — "the canonical display form is `W<N> - <Title>` in parent tables, progress logs, dispatch prompts, and close reports… the three mentions are the same rule." The file names are the implementation truth; the charter is stale.

**Fix:** Renumber `AW.md §2/§3/§4` rows to: **W16=DeckProgress, W17=Constellation**. Correct all H hinges: `AW.W24`→ its real number (DeckProgress is W16, Constellation is W17, gate-pattern is W18).

---

### **Blocker Cluster 4: W18 Content-Swap (Gate-Pattern vs Close)**

**Finding:** Charter describes W18 as the CLOSE wave (gate-fleet + READMEs + π lane + FINAL). The actual `AW.W18-gate-pattern.md` is a brand-new `aria-invalid` ring idiom wave — legitimate ≥2-consumer work but NO charter row. The close ceremony is homeless.

**Precept Violated:** `SPEC.md §Waves` — "every active wave has a number and a name" + charter `§Wave Table`. Two failures: (a) the stated close ceremony has no wave file; (b) the gate-pattern wave has no charter home.

**Fix:** Author the real close wave (W19 or W27 per the charter's intended sequencing). Renumber gate-pattern to a documented charter row or add it as a NEW §2 row with its actual scope. Name the responsible agent/ownership.

---

### **Blocker Cluster 5: H Cross-Repo Hinges Fire on Phantom `AW.W24`**

**Finding:** H.md and all H wave files cite `AW.W24` (32+ occurrences: H.W1, H.W2, H.W4, H.W6, H.W10). AW tops at W18 (or W19/W27 if close is accounted). The real hinges are AW.W16 (DeckProgress), AW.W17 (Constellation), AW.W18 (gate-pattern/DialogForm).

**Examples:**
- H.W2 (progress-polish): `:22` "Gated on `npm view @mkbabb/glass-ui version ≥ 3.4.0` + the dock-consume + **DeckProgress consume** (AW.W24)" — should be AW.W16.
- H.W4 (constellation-visibility): `:40` "the AW.W17 `useCanvas2D`/`Constellation` ≥2-consumer gate" — CORRECT; but `:39` cites "AW.W24" for the DialogForm pattern — should be AW.W18.

**Precept Violated:** `SPEC.md §Cross-tranche` — cross-repo coordination artefacts must name "the other repo's tranche letter, the other repo's HEAD at coordination time, the surfaces both tranches may write, the writer-vs-reader boundaries." Stale wave-number maps break the hinge.

**Fix:** Grep `AW.W24`→0 across `/Users/mkbabb/Programming/slides/`. Repoint each to the correct AW wave (W16/W17/W18).

---

### **Blocker Cluster 6: AW.W1 Root-Cause is Falsified by HEAD Source; Born-RED Premise Inverted**

**Finding:** The wave's §3 "stacked-grid MAX cause" is contradicted by `dock.css:589-592`: the inactive layer is `position: absolute; inset: 0` (out of flow), so the grid's intrinsic width is the ACTIVE layer's, not a max. The wave must RE-DIAGNOSE before dispatch.

Additionally, the wave states "the existing gate sampled the DockLayerGroup-switch path, not the GlassDock-collapse path." Verified INVERTED: `proof-dock-animation-live.mjs:80-81` selects `.glass-dock.collapsed` (GlassDock outer collapse); the demo route has ZERO DockLayerGroup. The existing gate already covers the collapse path. The "widening the gate" framing is partly a no-op.

**Precept Violated:** `SPEC.md §Hard Gates` — "born-RED on HEAD" gates require a live RED witness. `SPEC.md §Scope Reveal` — falsified root causes must trigger triumvirate re-diagnosis. `WAVE_SPEC.md §Archaeology` — "Prior attempt failure mode + new guardrail" — the prior AV.W9 attempt (the dual-driver fix) is not being re-litigated, but the W1 diagnosis must match live source.

**Fix:** Run `proof:dock-animation-live` against the 3.3.0 build BEFORE band-A dispatch. If GREEN, the regression may not exist (the witness is unsubstantiated). If RED, provide the actual frozen-timeline capture. Re-diagnose the root cause against `dock.css:589`, `useLayerTransition.ts:278-285`, and the slides two-layer dock starting-collapsed config.

---

### **Blocker Cluster 7: AW.W22 Unify Mechanism Fails on HEAD Source (Glass-Material)**

**Finding:** The wave promises "the dock tier's rim becomes a `.glass-material` inheritance" (W22:8, :18). Verified FALSE: `dock.css:84-90` shows `.glass-dock` does NOT compose any `.glass-*` ladder rung — it hand-rolls its own `background`, `backdrop-filter`, `border`, `box-shadow` as a parallel sixth surface. For the dock to inherit `.glass-material`, W22 must edit `dock.css`. **`dock.css` is ABSENT from W22's File Bounds (W22:31-40).**

Additionally, W22:39 says the Card specular pointer seam is "owned by W23 card work." Verified FALSE: W23 is `glass-material-sota` (refraction/squircle/tint — NO card work). The card wave is W24. W24:21 then tries to wire the pointer seam on `Card.vue:77` which W22 would carve away.

**Precept Violated:** `SPEC.md §Hard Gates` — the gate cannot pass without write access the wave doesn't have. `WAVE_SPEC.md §4a Disjointness` — W22↔W24 have a hidden write conflict (Card `glass-specular-track` carve collision). `SPEC.md §Scope Reveal` — file-bound expansion beyond two paths triggers triumvirate escalation.

**Fix:** (a) Decide dock-inheritance option: either add `src/styles/dock.css` to W22 File Bounds (compose `.glass-material` onto `.glass-dock`, retire its local rim), OR drop the dock from the band-uniformity matrix and keep it as a parallel surface. (b) Move the Card `glass-specular-track` carve OUT of W22 (leave it for W24); W22 retires ONLY Button + DockIconButton specular opt-ins. (c) Correct W22:39 "owned by W23" → "owned by W24."

---

## II. MAJOR REFINES (Design/Gate Substance Intact, Execution Needs Tuning)

### **Refine 1: AW.W3 Dropped Scope (Dock-with-Slider `keepDockOpen`)**

**Finding:** Charter `D-3` + `AW.md:104` assign dock-with-slider + `keepDockOpen` to W3. Wave file has ZERO slider/keepDockOpen mention. The disposition is orphaned.

**File:Line:** `AW.md:38,104` vs `AW.W3-dock-layering-rail-wrap.md` (scope has no slider item).

**Precept Violated:** `SPEC.md §Scope Reveal` — every charter obligation must have a wave home or an explicit RETIRED disposition.

**Fix:** Restore the slider arm to W3 scope + gate, or move the disposition row and explicitly record where the slider fix lands (fold into another wave or split to W3.x).

---

### **Refine 2: AW.W10 Phantom `useSpringOrchestrator` Symbol**

**Finding:** Wave cites `useSpringOrchestrator` (W10 Scope 1 + W10.a). No such file exists. The real composable is `useSpring`.

**File:Line:** `AW.W10-blob-interaction.md:24,103` vs non-existent path.

**Precept Violated:** `SPEC.md §Hard Gates` — gates must be falsifiable against existing code.

**Fix:** Replace all `useSpringOrchestrator`→`useSpring` references.

---

### **Refine 3: AW.W11 Cross-Band Write Conflict + Path Convention Error**

**Finding:** W11.b hoists `AuroraHarmony`/`deriveHue` out of `aurora/composables/color.ts`, but W5 already owns that file as `modify`. W11's File Bounds omits `color.ts`. Additionally, proof-script paths cite `scripts/proof/blob-*.mjs` (subdir doesn't exist); convention is flat `scripts/proof-blob-*.mjs`.

**File:Line:** `AW.W11-blob-mood.md` + `AW.W5-aurora-color-derive.md` conflict; `scripts/proof/` does not exist.

**Precept Violated:** `WAVE_SPEC.md §4a Disjointness` — no two parallel waves may write the same path.

**Fix:** (a) Add ordering clause: W11 depends-on W5, or W5 performs the hoist; (b) Rename all blob proof scripts to flat `scripts/proof-blob-*.mjs`.

---

### **Refine 4: AW.W13 Goo-Blob `var()` Throw Orphaned**

**Finding:** Charter `D-8` + `AW.md:114` assign goo-blob `cssToOklch(var(--primary))` per-frame throw fix to W13. Wave file has ZERO goo-blob mention. No other wave owns it. Confirmed live runtime bug.

**File:Line:** `AW.md:114` vs `AW.W13-affordance.md` (zero mention).

**Precept Violated:** `SPEC.md §Scope Reveal` — a confirmed live bug with no wave owner is a close-blocker.

**Fix:** Add resolver/story fix + console-clean gate to W13 (or assign to a blob wave).

---

### **Refine 5: AW.W16 (DeckProgress) Scope Overreach**

**Finding:** Charter mandates a CSS recipe composing `<Progress>`, NOT a full component or `/deck` subpath. The wave ships `DeckProgress.vue` + `deckProgress(index, total)` math helper + `src/subpaths/deck.ts` (squats the reserved deck-engine namespace). The 2nd consumer (slides) is cross-repo-PENDING.

**File:Line:** `AW.md:158` cites digest mandate (avg-deep-audit §3); actual `AW.W16-deckprogress.md` scope overreaches.

**Precept Violated:** `SPEC.md §Hard Gates` — ≥2-consumer bar requires both consumers LIVE; slides is pending AW publish. `SPEC.md §Scope Reveal` — subpath creation is a new API surface requiring ≥2-consumer gate.

**Fix:** Demote to `.glass-progress-rail` CSS recipe + thin wrapper (drop math helper + `/deck` subpath). OR escalate to triumvirate + rename subpath off `/deck`.

---

### **Refine 6: AW.W17 ≥2-Consumer Muster Repeats AV.W8 Trap**

**Finding:** Wave claims Constellation ≥2-consumer gate is cleared. Slides H.W10 is cross-repo-PENDING (by AV.W8's own rule does NOT count toward in-repo ≥2). The bar is not "cleared before ship"; the wave is GATED-NOT-LANDED pending H.W10 landing.

**File:Line:** `AW.W17-constellation-component.md:19-22` (consumer list) vs inv-5 precept (≥2-distinct-consumer bar is hard).

**Precept Violated:** inv P5 — "Every new public surface clears the ≥2-DISTINCT-consumer bar BEFORE it ships."

**Fix:** Carry the wave GATED-NOT-LANDED pending H.W10, or name a genuine 2nd in-repo consumer (e.g., a glass-ui Deck demo story).

---

### **Refine 7: H.md Charter Cites Phantom `AW.W24` (31+ Occurrences)**

**Finding:** H.W1, H.W2, H.W4, H.W6, H.W10 cite `AW.W24` which does not exist. The real hinges are W16 (DeckProgress), W17 (Constellation), W18 (DialogForm).

**File:Line:** `/Users/mkbabb/Programming/slides/docs/tranches/H/H.md` (grep `AW.W24`).

**Precept Violated:** `SPEC.md §Cross-tranche` — coordination artefacts must use correct wave-numbers.

**Fix:** Grep `AW.W24`→0. Repoint hinges to W16/W17/W18.

---

### **Refine 8: AW.W12 Light-Dark Born-GREEN No-Op Gate**

**Finding:** Charter scope 3 + gate 3 require collapsing double-nested `light-dark(light-dark())`. Verified: that construct does NOT exist at HEAD (grep returns 0). The gate is born-GREEN, violating born-RED discipline. (Digest already struck this three times per final-harden.)

**File:Line:** `AW.W12-glass-panel-fix.md:19,59` vs HEAD source.

**Precept Violated:** `SPEC.md §Hard Gates` — born-RED gates must fail on HEAD to prove substance.

**Fix:** Strike scope item 3 + gate condition 3. Keep the four real conditions (svg-filter per-rung collapse).

---

### **Refine 9: AW.W26 False Disjointness + Token Conflict**

**Finding:** W26 claims "fully disjoint" from W25. Verified FALSE: `badge/index.ts` + `toggle/index.ts` + `toast/Toast.vue` are shared with W25. `badge` has a **contradiction**: W25 sets `transition-colors`→`transition-control`; W26 sets it→`transition-all`. Same token, mutually-exclusive targets.

**File:Line:** `AW.W26-reka-shadcn-tailwind-idiom.md:6,47-48,74` vs `AW.W25-primitives-perfection.md:59-61`.

**Precept Violated:** `WAVE_SPEC.md §4a Disjointness` — "no two parallel waves may write the same path."

**Fix:** Delete false "fully disjoint" assertion. Sequence W26 after W25 (serialize). Decide one owner of the `transition-colors` token (recommend W25 owns the transition-control migration). Correct W26:74's stale wave-number map (digest off-by-one).

---

### **Refine 10: H.W10 Undercounted Pulse-Dot Copies**

**Finding:** Wave de-dups SlideXray + SlideNutrition pulse-dots. MISSED: `Slide09.vue:147-156` carries a third `.live-tag .dot` + `@keyframes pulse-dot` copy. W10's grep gate asserts `@keyframes pulse-dot`→0, but Slide09 keeps it ≥1.

**File:Line:** `H.W10-dedup.md` (grep gate) vs `Slide09.vue:147-156` (real third copy).

**Precept Violated:** `SPEC.md §Hard Gates` — grep gates must be accurate and complete.

**Fix:** Add Slide09 to W10's de-dup scope + File Bounds, or scope the grep to the named files and book Slide09 as a follow-on.

---

## III. FOLD/WAVE SEEDS — Architectural Reconciliation

**Recommended fold strategy:**

1. **Fold AW.W0 (spot-verify DEV) into the charter as formal §0 wave** — it exists in implementation but lacks formal spec. Reconcile File Bounds to include `PROGRESS.md` creation.

2. **Fold orphan-resolution + metric-cell/stack prune into ONE dedicated wave** (W19 or rename the W0 file) — the charter promises two separate resolutions but they share the "surface hidden dep first" gate discipline. Carry the W0 spot-verify ledger as a binding input.

3. **Fold styling-assay into a NEW wave** (W20 or after W15) — separate from W15's colocation/naming-hygiene. Restore brittle-calc→token + Tabs pill-track + ToggleGroup re-roll scope. Assign gate `proof:styling-hygiene`.

4. **Fold the close ceremony into W27** (or author it as a standalone file) — gate-fleet registration + 4 READMEs + π visual-runtime lane (≥3 viewports, ≥5 frames per state-toggle, WCAG-AA, per-story consumption sweep) + FINAL.md with green run-id per wave + overfitting audit + integrity-sweep (stash/git mutations/precepts-submodule changes).

5. **Demote AW.W16 from full component** → CSS recipe + thin `.glass-progress-rail` composition over `<Progress>`. OR escalate to triumvirate + split into glass-ui `/deck-progress` subpath (reserve `/deck` for the future deck-engine lift, H-gated).

6. **Carry AW.W17 GATED-NOT-LANDED** pending H.W10 landing, OR seed a new in-repo Deck story consumer in glass-ui demo.

7. **Gate-pattern (W18) + dock-README** — formalize as documented W18 scope (the aria-invalid ring widen is legitimate ≥2-consumer work: glass-ui form consumers + slides DeckGate). The dock README rides the close wave (W27).

8. **Dock-with-slider + keepDockOpen** — restore to W3 scope or fold into a new slider-interaction wave if it expands beyond one BIT of file-bounds.

9. **Goo-blob throw fix** — fold into W13 or a blob-wave post-W11 if the fix is substantial.

10. **H.W24 phantom references** — grep all → correct to W16/W17/W18. Create H `PROGRESS.md` mirroring AW's wave structure.

---

## IV. PRECEPTS-CONFORMANCE SUMMARY

| Precept | Status | Finding |
|---|---|---|
| **P1 (no legacy)** | ✓ PASS | Every fix is a clean replacement (no `_v2` paths, no deprecated flags). |
| **P2 (gestalt transposition)** | ✓ PASS | Each fix is structural (one-authority-per-concern, not band-aids). |
| **P3 (KISS)** | ✓ PASS | Wave designs reuse existing seams (SDF gradient, Spring composables, shared tokens). |
| **P4 (DRY)** | ⚠ PARTIAL | Glass-atoms band (W22-W26) is true consolidation, but W22's dock-write-bounds gap + W26's false disjointness are real issues. |
| **P5 (≥2-consumer)** | ⚠ PARTIAL | AW.W16 + AW.W17 consumers are cross-repo-PENDING; the bar is not cleared pre-ship. |
| **P6 (design-language cogency)** | ✓ PASS | Warm-cream + iOS-26 + NCSU-red spine is coherent and carried through all waves. |
| **P7 (spot-verify gate binding)** | ⚠ PARTIAL | W0 ledger exists but is not formally documented as a wave spec with hard gates. |
| **P8 (gated Baseline / Tailwind v4.3)** | ✓ PASS | All gated capabilities carry `@supports` fallbacks; no v5 references. |
| **inv-27 (green-means-green)** | ✗ FAIL | Charter gate-names do not map to realizable proofs; the close ceremony is homeless. No PROGRESS.md. |
| **π visual-runtime lane (binding)** | ⚠ PARTIAL | Precept is invoked but coverage (≥3 viewports, ≥5 frames, WCAG-AA, per-story) is not explicitly planned in every visual wave. |

---

## V. DELIVERABLE: Fix-List by Priority

### **BLOCKING (Prevents Dispatch)**
1. **Reconcile AW.md §2 gate-names to wave-file IDs** — 22 gate corrections.
2. **Author AW.W0 formal wave spec + PROGRESS.md** — prerequisite for W14+ retires.
3. **Author dedicated orphan-resolution wave** (fold metric-prune into it).
4. **Author dedicated styling-assay wave** (restore brittle-calc/Tabs/ToggleGroup scope).
5. **Author formal close wave (W27 or W19)** — gate-fleet registration + 4 READMEs + π lane + FINAL.
6. **Renumber W16↔W17 in charter + correct all H hinges** (AW.W24→real number).
7. **Fix AW.W22 dock-File Bounds + W22↔W24 Card carve collision** — add `dock.css` OR drop dock from matrix; move Card carve to W24.
8. **Re-verify AW.W1 root-cause against HEAD** — run `proof:dock-animation-live` on 3.3.0 build.
9. **Grep AW.W24→0 across slides/** — repoint H hinges to W16/W17/W18.

### **REFINING (Affects Execution, Not Substance)**
10. Restore AW.W3 slider scope or move disposition.
11. Replace `useSpringOrchestrator`→`useSpring` (AW.W10).
12. Add `color.ts` to AW.W11 File Bounds + ordering clause.
13. Rename blob proof scripts to flat `scripts/proof-blob-*.mjs`.
14. Assign goo-blob throw fix to W13 or blob wave.
15. Demote AW.W16 DeckProgress component scope OR escalate to triumvirate.
16. Carry AW.W17 GATED-NOT-LANDED pending H.W10 OR seed in-repo consumer.
17. Strike AW.W12 born-GREEN light-dark gate (scope 3 + gate 3).
18. Delete AW.W26 false "fully disjoint" assertion; sequence after W25; resolve `transition-colors` token.
19. Add Slide09 to H.W10 pulse-dot de-dup scope OR scope grep.
20. Correct H.W7 grotesk → Fraunces framing; clarify W7↔W10 SlideXray ownership.
21. Create H `PROGRESS.md`.

---

## VI. GATE-CONFORMANCE READING

**Lane: Precepts Conformance** — the AW/H set targets inv-1 through inv-27 + the π visual-runtime lane. The engineering substance is **CONVERGED** (all technique selection is grounded in research digests and verified against live source). The **planning-integrity layer is NOT CONVERGED** — five missing waves + stale charter numbering + fabricated gate-names + cross-band write conflicts prevent an honest close ceremony. The fix-list addresses the administrative layer; the waves are implementation-ready once the chart is reconciled.

---

**Return value for orchestrator:**

```
COGENCY-HARDEN AUDIT: AW/H TRANCHES
Status: NOT CONVERGED (planning-integrity layer: 9 blockers + 12 refines)
Engineering: SOUND (all bands verified against source + digests)
Blockers: charter↔wave-file gate divergence (22 names), 5 missing waves (W0/orphan/prune/styling/close), W16↔W17 swap, W22 dock-File Bounds gap, W1 falsified diagnosis, H phantom AW.W24
Folds: W0→formal spec, orphan+prune→W19, styling→W20, close→W27, W16 demote or escalate, W17 gate-pending, W3 slider restore, fix-list (20 items)
Ready: submit fix-list to users; no implementation dispatch until charter is reconciled
```

---

## Lane 31 — synthesis-seed

Perfect. Now let me synthesize the deep-audit findings into a tight markdown brief with findings, fold/wave-seeds, and the augmented wave set proposal.

---

## COGENCY-HARDEN DEEP-AUDIT — AW/H TRANCHES (READ-ONLY)

### EXECUTIVE SUMMARY

The AW/H tranches are **substantively convergent with clean inter-wave coherence**, but carry:
1. **5 BLOCKERS** in the glass-atoms band (W22-W26) + close (W27): unify-mechanism file-bounds violations (dock/Card write-access gaps), stale wave-number cross-refs leaked into docs, one false disjointness claim masking a real conflict.
2. **9 REFINES** spanning bounds clarifications, gate re-baselines, phantom tokens struck, shared-story ownership documented.
3. **NO DUPLICATION risk** — the glass-atoms band ↔ component band (W12/W13/W18/W20) write disjoint surfaces over the same committed spine (verified file:line).
4. **H IS CONVERGED** — pure consumer, no glass-ui primitive re-implementation, clean token/binding edges.

---

### FINDINGS BY TRANCHE & WAVE (file:line)

#### **TRANCHE AW (glass-ui) — 27 waves W0-W27**

| Wave | Finding category | Issue | File:line |
|---|---|---|---|
| **W1-W3 (dock)** | SOUND | Simple-collapse regression gate + lockstep + iOS spring family; all behavioral gates born-RED, disjoint file bounds. | W1:8, W2:8, W3:8 |
| **W4-W8 (aurora)** | SOUND | Painterly arc, OKLCh core, `resolveAtoms`, WebGPU, interactivity; W5 opens first in band; four independent research digests ground each wave. | aurora-digest.md, W4-W8 ops |
| **W9-W11 (blob)** | SOUND | Lit surface (normal/specular/rim/iridescence), soft-body interaction, mood system; @supports-gated, PRM-safe, SDF-reuse. | blob-digest.md, W9-W11 ops |
| **W12 (glass-panel)** | REFINE R1 | Born-GREEN no-op gate: W12:19,59 demand collapsing `light-dark(light-dark())` — **verified absent at HEAD** (grep returns 0). Double-nested construct does NOT exist. Strike W12 scope item 3 + gate condition 3. | W12:19, W12:59, tokens.css:1369 |
| **W13 (affordance)** | SOUND | Gold-audacious text token lift, 8%α border alpha raise, slider fill extend; clearly owned, re-asserted by W25 (`proof:affordance-contrast`). | W13:8, W25:28 |
| **W14 (DataTable)** | SOUND | Composable colocation split, `≤380 LOC` gate, no public-API delta. Orphan-resolution moved to dedicated W19. | W14:8 |
| **W15 (hygiene)** | SOUND | Named return interfaces, twin-line-divider collapse, `useTokenColor` injection proof; gates: `vue-tsc`, zero test-in-src. | W15:8 |
| **W16 (DeckProgress)** | SOUND | Composes existing `<Progress>`, `deckProgress()` helper total function, no fork, ≥2 consumers (glass-ui demo + H.W1). | W16:8, avg-deep-audit-digest:95-100 |
| **W17 (Constellation)** | SOUND | `useCanvas2D` substrate, `Constellation` component, shared `prng.ts` + `useRAFLoop` + `useIntersectionPause`, no private copy. | W17:8, avg-deep-audit-digest:95-100 |
| **W18 (gate-pattern)** | SOUND | `.input-pill` invalid-ring widens to `[aria-invalid="true"]`, `GatePattern.story` idiom (Dialog+Input+Button), ≥2 consumers. | W18:8, frontend-convergence-digest:68 |
| **W19 (orphan-prune)** | SOUND | W0 spot-verify ledger records EXISTS + rg-count + alias-resolved verdict; then migrate/remove with zero residue (metric-cell/stack hidden dep surfaced first). | W19:8, W0-spot-verify.md |
| **W20 (styling-assay)** | SOUND | Brittle calc→tokens, Tabs pill-track, demo controls→`<ToggleGroup>`, `useTokenColor` docs; shares `primitives/card.vue` with W12 (documented). | W20:8, W12:21 |
| **W22 (glass-material unify)** | BLOCKER B1 | `dock.css` ABSENT from W22 File Bounds (W22:31-40), yet W22:8,18 assert dock inherits `.glass-material` rim. Gate cannot pass — **dock.css write not owned**. Either add `dock.css` to bounds (`modify-carve` compose onto `.glass-dock`) OR drop dock from band matrix. | W22:8, W22:18, W22:31-40, dock.css:84-90 |
| **W22 (cont.)** | BLOCKER B2 | Folding specular `::before` onto dock collides with `dock.css:352` (`.glass-dock.variant-instrument-strip::before` engraved-bezel). Gate 2 must target `.dock-icon-button` (the control) not `.glass-dock` (the shell). Triumvirate note W22:28 misses live `::before`. | W22:28, dock.css:352 |
| **W22 (cont.)** | BLOCKER B3 + stale ref | W22:39 says pointer seam "owned by **W23 card work**"; W23 is `glass-material-sota` (NO card work). Actual card wave is **W24**. W24:21,47 reads `Card.vue:77 glass-specular-track` as present (W22 deletes it). **Collision.** Fix: change W22:39 "W23" → "W24"; W22 must NOT carve Card class string. | W22:39, W24:21,47 |
| **W22 (cont.)** | REFINE R2 | W22:18 hedges "alpha may still step per rung via `--glass-edge-light-{wash..overlay}` family if present." **Phantom — verified absent** (only `--glass-edge-light` + `-dark` exist). Strike "if present"; confirm uniform rim (no per-rung family minted). | W22:18, tokens.css:700-701 |
| **W22 (cont.)** | REFINE R3 | Gate-2 born-RED claim is correct but mechanism unspoken: non-pointer-wired surfaces (Dialog/Sheet/Popover) get centred-static specular via `var(--mouse-x,50%)` floor — design intent, not regression. **State explicitly.** | W22:60, glass-specular-track.css:48 |
| **W23 (glass-material SOTA)** | REFINE R4 | W23 ships `#glass-refract` but HEAD `.glass-refract` rule is `.glass-specular-track.glass-refract` (compound). W22 folds/aliases `glass-specular-track` — compound's left operand goes stale. **Re-home selectively**: `.glass-specular-track.glass-refract` → `.glass-material.glass-refract`. Gate must probe *consuming selector* survives, not just filter node. | W23:16, glass-specular-track.css:146 |
| **W23 (cont.)** | REFINE R5 | W23:18 gating states "fringe is `@supports`-feasible AND dropped under reduce." `@supports` is vague — fringe needs no specific feature (`color-mix(in oklab)` + gradient both Baseline). **Strike `@supports` claim;** fringe gated solely on `prefers-reduced-transparency`. | W23:18 |
| **W24 (glass-cards)** | BLOCKER B3 resolved | W22's stale "W23 card work" ref cascades here. W24:21,62,74 assert "root already carries `glass-specular-track`" (W22 deleted it). **Rewrite W24 §3 item 5 + §5 + gate 5** to (a) drop "already carries" premise; specular now comes from `.glass-material` (W22-owned); (b) scope W24 to pointer-WRITE seam only (JS listener, CSS half is W22). | W24:21,62,74 |
| **W24 (cont.)** | REFINE R6 | W12 stages `demo/stories/primitives/card.vue` backdrop (W12:21); W20 re-rolls controls to `<ToggleGroup>` (W20:46); W24 extends (W24:45). W24 §4a falsely claims "card story is W24's" (omits W12/W20). **State it EXTENDS post-W12/W20 story.** | W12:21, W20:46, W24:45 |
| **W24 (cont.)** | REFINE R7 | Gate 1 "stated margin" on tier alpha/blur delta lacks numeric floor (unlike W13's explicit "≥4.5:1"). Digest ladder (α: 0.30/0.50/0.65/0.80/0.95) implies ≥0.10 adjacent-rung step. **Name the floor.** | W24:70, glass-atoms-digest.md:234-236 |
| **W24 (cont.)** | REFINE R8 | Gate 6 born-RED "sub-3:1 cream-read" must re-baseline: W22 moves `--glass-edge-light` into `.glass-material` (every rung gets uniform rim pre-W24). W24's ring composes OVER W22's rim. **Gate 6 measured against post-W22 HEAD.** | W24:75 |
| **W25 (primitives)** | SOUND | `.tap-squish` universalize, `.focus-ring` on keyboard-a11y gap atoms, `transition-control` sweep, overlay-band material (Toast/Command→`glass-floating`), tone parity (Alert/Toast +3 tones). Explicitly re-asserts-not-re-owns W13 affordance floors (§10, line 28). | W25:28, W13:8 |
| **W26 (reka/idiom)** | BLOCKER B5 | W26 line 6 ("fully disjoint") + line 74 ("shares NO modify path with W25") are **factually false**. Three shared files: (a) `badge/index.ts` — W25:60 `transition-colors`→`transition-control`; W26:47 `transition-colors`→`transition-all` (**contradictory values**); (b) `toggle/index.ts` — same base string; (c) `toast/Toast.vue` — W25:61 material+tone; W26:43 refactor. **Decide single owner** (recommend W25 owns `transition-control` migration, W26 drops badge transition edit + adds only icon-sizing/gap). Sequence Toast explicitly. | W26:6, W26:74, W25:59-61 |
| **W26 (cont.)** | REFINE R9 | W26 §6 aria-invalid "paint" is redundant for Input/Textarea (already painted by `.input-pill` rule W18 widens). Genuine gap only SelectTrigger/NumberFieldInput/ComboboxInput (non-`input-pill`). **Narrow scope to three controls.** | W26:43, glass.css:328-342 |
| **W26 (cont.)** | REFINE R10 | Toast sub-gate missing: "zero manual `@swipe*`" is true but doesn't verify open-change still fires post-refactor. **Add sub-gate** asserting auto-dismiss/onOpenChange channel survives `useForwardPropsEmits` swap (the binding-no-op class the wave guards). | W26:43 |
| **W27 (close)** | BLOCKER B4 | W27:17,66,79 register glass-atoms gates with off-by-one wave map (digest synthesis numbers differ from realized files). **Correct attributions**: `proof:glass-material-unified`(W22)/`-sota`(W23)/`proof:glass-card-tiers`(W24)/`proof:primitive-affordance`(W25)/`proof:reka-binding-idiom`(W26). W27 is authoritative for gate→wave registry. | W27:17, W27:66, W27:79 |

#### **TRANCHE H (slides) — 10 waves W1-W10**

| Wave | Finding | File:line |
|---|---|---|
| **W1-W10 (all)** | **CONVERGED** — Pure consumer of AW glass-ui 3.4.0 (dock fix, `DeckProgress`, `Constellation`). No AW-primitive re-implementation. Binding-verification sweep (reka 2.9 stale props caught by e2e, not vue-tsc). W4 constellation RAF-swap + `prng.ts` adoption ≥2-consumer evidence flip for AW.W17. | H.W1-H.W10, avg-deep-audit-digest §2 |

---

### FOLD / WAVE-SEED ROUTING

**CORE FINDING:** No duplication risk — glass-atoms band (W22-W26) composes OVER committed component spine (W12/W13/W18/W20) on disjoint declarations. The 5 blockers are **intra-band mechanism failures** (W22 dock/Card unify scope) + **close-manifest mis-numbering** (W27 stale gate→wave map), NOT the feared W12/W13 re-do.

#### **BLOCKER FIXES → AFFECTED WAVES**

| Blocker | Root cause | Fold routing |
|---|---|---|
| **B1 dock-inheritance no-write-access** | `dock.css` absent from W22 File Bounds; W22 promises dock rim inheritance w/o edit access | **DECIDE ONE**: (a) add `dock.css` to W22 `modify-carve` + compose `.glass-material` onto `.glass-dock`; OR (b) drop dock from band matrix, acknowledge dock keeps parallel surface. Either path is valid; spec must choose. |
| **B2 dock `::before` collision** | Instrument-strip `::before` + specular `::before` same element; triumvirate trigger misses live collision | **CONSEQUENCE OF B1**: if B1 path (a), W22 specular targets `.dock-icon-button` (control) not `.glass-dock` (shell) to avoid collision. Gate 2 matrix remounts on control. |
| **B3 Card carve ↔ W24 collision** | W22 deletes `Card.vue:77` `glass-specular-track`; W24 reads it as present. W22:39 mis-cites "W23 card work" (W23≠card wave) | **W22 scope edit**: drop `Card.vue` from W22 carve set. Retire only Button+DockIconButton opt-ins. W24 adds pointer-WRITE seam over ladder-composed specular (W22-owned CSS). **Folds B1-B3 into W22 rewrite.** |
| **B4 gate→wave off-by-one** | Digest numbering diverged from realized files; W27 close registers stale map (B4 blocks `proof:aw-final`) | **W27 re-anchor**: correct `proof:glass-material-unified`(W22)/`-sota`(W23)/`proof:glass-card-tiers`(W24)/`proof:primitive-affordance`(W25)/`proof:reka-binding-idiom`(W26). Update W27 §3 gate-fleet rows. |
| **B5 W26 false disjointness** | badge/toggle/toast shared with W25; W26 denies shared writes. W26 claims `transition-colors`→`transition-all` on badge; W25 claimed `transition-colors`→`transition-control` | **W25↔W26 ownership clarify**: W25 owns `transition-control` migration (transition-discipline sweep); W26 drops badge transition edit, adds only icon-sizing/gap composing onto W25's result. Sequence Toast explicitly (post-W25 material carve). |

#### **REFINE FIXES → FOLD TARGETS**

| Refine | Fold target (existing wave) | Scope |
|---|---|---|
| R1 (W12 born-GREEN gate) | **W12** — remove scope item 3 + gate condition 3 | Strike double-nested `light-dark()` demand; absent at HEAD. |
| R2-R3 (W22 phantom tokens + intent) | **W22 §3.3 + §2a** — rewrite | Strike "if present" phantom; confirm uniform rim by design. State centred-static specular is intended. |
| R4-R5 (W23 selector rehome + fringe gating) | **W23 §3.1 + gate 1/2 + §3.3** | Re-home `.glass-specular-track.glass-refract` post-W22 fold; strike `@supports` fringe hedge. |
| R6-R8 (W24 shared story + gate baselines) | **W24 §3 + §4a + gate 1 + gate 6** | EXTENDS W12/W20's card.vue; name alpha-delta floor; re-baseline cream-read against post-W22 HEAD. |
| R9-R10 (W26 aria-invalid + Toast) | **W26 §6 + gate 3/5** | Narrow aria-invalid to three non-pill controls; add Toast open-change sub-gate. |

---

### AUGMENTED AW WAVE SET (PROPOSED)

The **27-wave AW charter is SOUND structurally** (dock/aurora/blob/component/convergence/atoms/close all present). Fixes above are scope-clarifications + orphaned-refines + gate-rebaseline, NOT structural changes. **No new waves needed.** The renumber is POST-synthesis:

- **W0** — Formalize + spot-verify (DEV)
- **W1-W3** — Dock motion language (simple-collapse regression FIX + lockstep + iOS springs)
- **W4-W8** — Aurora painterly engine (tensor/impasto/van-Gogh/oil-pastel + OKLCh + atoms + WebGPU + interactivity)
- **W9-W11** — Blob droplet (surface material + soft-body interaction + mood/color)
- **W12-W15** — Component fix pass (glass-panel tier-collapse + affordance lifts + DataTable split + colocation/hygiene)
- **W16-W17** — Convergence primitives (`DeckProgress` composition + `Constellation` + `useCanvas2D`)
- **W18** — Gate-pattern (`.input-pill` invalid-ring widens)
- **W19-W20** — Hygiene (orphan-prune + styling-assay)
- **W22-W26** — Glass-atoms band (unify + SOTA + cards + primitives + idiom) — **BAN to collapse W22 dock scope OR add dock.css to bounds; clarify W22/W24 Card ownership.**
- **W27** — Close + gate-fleet registration (correct W22/W23/W24/W25/W26 attributions)

#### **NEW SYNTHESIS ITEMS FOR CONSIDERATION**

Per ADDENDUM 3 (RECAP §9), four **additional AW scopes** were folded; verify final wave set absorbs them:

| Scope | Absorption | Wave |
|---|---|---|
| **Storybook-completeness** (every component has a story) | Covered by W0 spot-verify + demo-story extensions across W12/W16/W22/W24 | Integrated into existing waves |
| **Demo-dock-nav** (sidebar + bottom-bar dock for site nav) | **NOT yet in wave list.** Requires new wave (UI dogfooding). Recommend **W21-demo-dock-nav** (parallel to W20, independent) | **NEW WAVE CANDIDATE** |
| **Aurora configurator + carousel redesign** | Covered by W6 `resolveAtoms` (configurator story) + W10/W12 (carousel story backdrop) | Integrated |
| **Lighthouse audit** (perf/a11y/best-practices/SEO for every page + slide) | **NOT explicit.** Recommend **W21-lighthouse-audit** (post-close, πlane auditor for all pages) | **NEW WAVE CANDIDATE** |
| **Animation coherence + DESIGN.md audit** | Covered by W1-W11 arc focus + W27 final docs (READMEs) | Integrated |

The two candidates (demo-dock-nav, Lighthouse audit) are **genuinely new and ≥2-consumer** (dock over aurora + dock over goo-blob as demo consumption; Lighthouse covers glass-ui + slides). **Recommend seeding them as W21-demo-dock-nav + H.W11-lighthouse.**

---

### COGENCY VERDICT

**AW/H tranches are COGENT:**

- ✓ **Design language unified** — warm-cream glass + iOS-26 Liquid Glass + NCSU-red (consumer-layered), no surface mints its own palette
- ✓ **No legacy, no workarounds** — precepts (P1-P8) hold; glass-atoms band is DRY consolidation, not re-do
- ✓ **Idiomatic** — reka-ui ^2.9, shadcn-vue (CVA ^0.7), Tailwind v4.3 (no v5), modern-web-guidance (`@supports` gates)
- ✓ **≥2-consumer rule** — Constellation/DeckProgress/DialogForm each have glass-ui demo + slides as two; blob mood ships ONLY if demo exercises ≥2 moods (else excised)
- ✓ **π visual-runtime lane binding** — render-matrix gates (3 viewports, 5 frames, WCAG-AA, per-story sweep) named per wave
- ✓ **H is pure consumer** — no AW-primitive re-implementation, clean token/binding edges

**BLOCKERS resolve cleanly**: W22 unify scope (dock.css access decision) + W27 gate-map correction. No structural flaws, no duplication risk.

---

### FINAL BRIEF MARKDOWN

Return this as the cogency-harden round conclusion:

**AW/H COGENCY VERDICT: SOUND, 5 BLOCKERS + 9 REFINES MAPPED.**

The **5 blockers** (W22 dock/Card unify mechanism scope, W27 gate→wave off-by-one, W26 false disjointness) all resolve within the existing 27-wave AW charter + 10-wave H charter — no structural changes needed. The **glass-atoms band is true DRY-consolidation** (verified file:line disjointness with W12/W13/W18/W20 committed spine). H is **converged** (pure consumer, clean edges). **Two wave candidates** surface (demo-dock-nav, Lighthouse audit) for synthesis decision — both ≥2-consumer and germane. Core design language (warm-cream glass, iOS-26, NCSU-red) is **coherent across all surfaces; precepts and idiom hold.** Gates are born-RED and π-lane binding is binding.

## SYNTHESIS

All disputed source facts confirmed:
- **W16 drift CONFIRMED**: file gate is `proof:deck-progress-rail` (explicitly forbids the math helper + `/deck` subpath); AW.md §2 row 140 still says `proof:deck-progress-math` with the retired `deckProgress(index,total)` helper language. Review 6's blocker is real.
- **W0 drift CONFIRMED**: AW.md:124 says "every W14 retire candidate"; the retire wave is W19 (DataTable-split is W14). Real blocker.
- **dock.css CONFIRMED**: `.glass-dock` hand-rolls `background`/`backdrop-filter`/`box-shadow` (NOT a ladder rung composition), has `::after` (231) AND `.variant-instrument-strip::before` (352). W22's B1/B2 blockers stand.

I now have full ground truth. The 32-lane audit's charter-divergence cluster is **stale** (charter already repaired); the surviving real findings are the source-grounded glass-atoms blockers (B1-B5), the charter-table gate drifts (W16/W0), the W12 born-GREEN gate, and the **ADDENDUM 3 new-scope gaps** (8 items with no waves authored). That's the actionable synthesis. Let me write it.

---

# AW/H 32-AGENT COGENCY-HARDEN — THE SYNTHESIS

**Method note (read first).** I re-grounded all 32 lane briefs against on-disk truth at HEAD `afdc485`. **The single largest finding-cluster across the fan-out is STALE.** Eight lanes (1, 4, 8, 11, 14, 21, 23, 31) report "charter↔wave-file divergence" — fabricated gate names, W16/W17 swapped, five missing waves (W0/orphan/prune/styling/close), phantom `AW.W24` H-hinges. **All of this is already repaired in the committed charter.** Verified: `AW.W0-spot-verify.md` exists; W16=DeckProgress, W17=Constellation, W18=gate-pattern, W19=orphan-prune, W20=styling-assay, W22-W26=glass-atoms, W27=close on disk; `AW.md §2` gate column now matches wave-file ids (`proof:dock-animation-live`, `proof:aurora-tensor-field`, `proof:glass-material-unified`, …). Those lanes audited a pre-repair snapshot. They are recorded below only where a *residual* drift survives the repair.

The findings that **survive against current source + wave files** are: the glass-atoms band W22-W26 mechanism blockers (B1-B5, source-confirmed), two charter-table gate drifts (W16/W0, confirmed), the W12 born-GREEN gate, the W1 empirical re-diagnosis (unverified premise), and the **8 ADDENDUM-3 new-scope items with no authored waves** (lanes 24-30). This is the real work.

---

## (1) THE COGENCY VERDICT

**NOT CONVERGED — but narrowly, and not where the fan-out's headline says.** The engineering substance, design-language coherence (warm-cream + iOS-26 + consumer-NCSU-red), DRY discipline, and inter-wave file-bound disjointness are **SOUND**. The glass-atoms band is genuine DRY-consolidation onto the committed component spine — the feared "W22-W26 re-does W12/W13" duplication **does not materialize**. H is **CONVERGED** (pure consumer). The blockers are concentrated in three places:

**Cluster A — glass-atoms W22 unify mechanism fails contact with HEAD source (3 blockers, source-confirmed):**
- **B1** — W22 promises `.glass-dock` inherits `.glass-material` rim, but `dock.css:84-90` shows `.glass-dock` hand-rolls its own `background`/`backdrop-filter`/`box-shadow` as a parallel sixth surface (NOT a ladder rung), and `dock.css` is **absent from W22 File Bounds** (W22:31-40). The gate cannot pass without write access W22 lacks. *Verified at source.*
- **B2** — folding the specular `::before` onto `.glass-dock` collides with the live `.glass-dock.variant-instrument-strip::before` (dock.css:352) and `.glass-dock::after` (dock.css:231). *Verified at source.*
- **B3** — W22:39 carves `glass-specular-track` from `Card.vue:77` and mis-attributes the seam to "W23 card work" (W23 is `glass-material-sota`, NOT cards; the card wave is W24). W24:21 then wires a pointer seam on the now-deleted class. The stale "W23 card work" ref is the proximate cause.

**Cluster B — close-manifest + charter-table stale renumber maps (3 blockers/drifts, confirmed):**
- **B4** — W27:17/66/79 gate→wave attribution off-by-one (collapses unified+sota onto W22, slides card-tiers to W23).
- **W16 table drift** — `AW.md:140` names `proof:deck-progress-math` + the `deckProgress(index,total)` helper; the wave file ships `proof:deck-progress-rail` and **explicitly deletes** the math helper + `/deck` subpath. *Confirmed.*
- **W0 table drift** — `AW.md:124` says "every W14 retire candidate"; the retire wave is W19 (W14 is DataTable-split-only). *Confirmed.*

**Cluster C — W26 false disjointness hides a real same-file/same-token conflict (1 blocker, confirmed):**
- **B5** — W26:6/74 claim "fully disjoint from W22-W25"; in fact `badge/index.ts`, `toggle/index.ts`, `toast/Toast.vue` collide with W25, with `badge` carrying a **contradictory value** (W25 `transition-colors`→`transition-control` vs W26 `transition-colors`→`transition-all`).

**Plus 9 refines** (W12 born-GREEN gate, W22 phantom edge-light family + centred-static intent, W23 `.glass-refract` re-home + `@supports` fringe story, W24 3-wave card-story shared write + gate re-baseline, W26 redundant aria-invalid carve + Toast open-change sub-gate, W26/W27 stale wave-number labels).

**DAG is sound.** No cyclic dependency. Band ordering holds (W5→W4 aurora, W22→W23→W24 atoms, W19 after W0+Band-D). The one empirical risk: **AW.W1's born-RED premise is unverified** (Lanes 1/4/8/11/23/31) — the root-cause cites a "stacked-grid MAX" cause that `dock.css:589` (`position:absolute` inactive layer) contradicts, and the existing `proof-dock-animation-live.mjs:80` already samples `.glass-dock.collapsed`. **This must be empirically resolved (run the gate against the 3.3.0 build) before Band-A dispatch** — but it is implementation-time verification, not a planning blocker.

**Coverage gap (the headline new work):** the **8 ADDENDUM-3 new-scope items have NO authored waves** — storybook-completeness, demo-dock-nav, aurora-configurator, carousel-redesign, Lighthouse (AW+H), animation-coherence, DESIGN.md audit, naming-consistency. See §5/§6.

---

## (2) OVERFIT + DUPLICATION FIX-LIST

**Overfit primitives — ZERO.** The fan-out's overfit-lanes (5, 7, 13, 24) concur: every new public surface clears the ≥2-consumer bar.

| New surface | Consumer #1 | Consumer #2 | Verdict |
|---|---|---|---|
| `DeckProgress` (W16) | glass-ui demo story | slides H.W1 de-docked bar | ✓ clears |
| `Constellation`/`useCanvas2D` (W17) | glass-ui demo story | slides H.W4 RAF-swap (the 2nd-consumer horn) | ✓ clears (GATED-on-H.W4-landing; carry as such) |
| `GatePattern` idiom (W18) | glass-ui story | slides `DeckGate` (H.W2) | ✓ clears (pattern, not component) |
| `CardAction` slot (W24) | demo | speedtest metric cards | ✓ clears |
| `.glass-material` mixin (W22) | every floating/overlay surface (5+) | — | ✓ internal DRY mixin, not a ≥2-consumer surface |
| blob mood engine (W11) | wire-or-excise; demo must exercise ≥2 moods | — | ✓ self-gating (excise if <2) |

**Properly KEEP-BOOK'd (do not mint):** `<NutritionLabel>`/FactsPanel (below bar until XRAY + slide both consume — `AW.md:238`); reka-2.9 `Color*`/`Autocomplete`/`MonthPicker` wraps (no in-repo demand; only Checkbox-indeterminate has concrete demand, lands W24). These are correctly deferred with triggers.

**Duplication fix-list — one owner each:**

| Duplication | Owner decision |
|---|---|
| `badge`/`toggle` `transition-colors` token (W25↔W26, **contradictory values**) | **W25 owns** the `transition-control` migration (owns the transition-discipline sweep). W26 drops `transition-colors`→`transition-all` on badge, adds ONLY icon-sizing/gap composing onto W25. *(B5)* |
| `toast/Toast.vue` (W25 material vs W26 forward-emits) | Sequence explicit: W26.a after W25's material carve. Delete W26's false "shares NO modify path with W25". *(B5)* |
| `demo/stories/primitives/card.vue` (W12 stages, W20 ToggleGroup re-roll, W24 extends) | **W24 EXTENDS** the post-W12/W20 story. Drop W24 §4a "card story is W24's"; add W20 to §10 Depends-on. *(REFINE-1)* |
| `Card.vue:77 glass-specular-track` (W22 carve vs W24 consume) | **W24 owns** the Card material pass. W22 drops Card from its carve set (retires only Button + DockIconButton opt-ins). Fix W22:39 "W23"→"W24". *(B3)* |
| `.glass-refract` filter id (W23 static node vs `useGlassRenderer.ts:146` runtime `glass-refract-N`) | W23 adds a §3 note: one filter-id source. Re-home `.glass-specular-track.glass-refract`→`.glass-material.glass-refract` after W22's fold. *(R1)* |
| `aria-invalid` paint (W26 vs already-painting `.input-pill` rule W18 widens) | Narrow W26 §6 to the 3 non-`input-pill` controls (SelectTrigger, NumberFieldInput, ComboboxInput); Input/Textarea already paint post-W18. *(REFINE)* |
| `--glass-tint-source` oklab (W23) vs `--surface-tint-*` oklab decision (W26 §9) | Two tint families, disjoint. Add one-line cross-ref so they're not read as duplicate oklab work. *(NIT-1)* |

**Cross-repo duplication (Lane 9):** slides `deck.css:373-375` redeclares glass-ui `--glass-bg-wash/quiet/resting` with hardcoded `hsl()` — shadows the parameterized recipe. **One owner: glass-ui's token names.** Fix is slides-side (override inputs `--card`/`--glass-opacity-*` on the `.dark` cascade, never the output names). → **new H wave** (see §5). XRAY's dead `.glass-panel` orphan (`main.css:13-16`) → fold into H.W7.

---

## (3) DEFERRED-FOLD LEDGER

**AW deferred items — all have a wave home or a documented KEEP-BOOK trigger:**

| Deferred item | Disposition |
|---|---|
| instrument-chassis/rail orphan (real GlassDock consumer) | → **W19** (W0-ledger-backed: keep+document) |
| glyph-face/disco-glyph orphan (provide/inject + demo) | → **W19** (W0-ledger verdict) |
| metric-cell/stack prune (hidden dep) | → **W19** (surface hidden dep born-RED FIRST, then remove) |
| drawer-live-behind audit (RECAP:28) | → **W20 §0** dispositions it (confirmed in W20 file) |
| goo-blob `var(--primary)` throw | → **W13** (`AW.md:86,137` D-8 names it; `proof:affordance-contrast` console-clean gate) |
| WebGPU aurora (Limited Baseline) | → **W7** (born-RED, AW-committed; WebGL2 fallback declared) |
| dock README / aurora / blob / constellation READMEs | → **W27** (4 research-backed READMEs) |
| W7 LIC (line-integral-convolution, half of ETF technique — Lane 4 R2) | **BOOK** → W7 multi-pass fold with rationale; trigger: WebGPU per-stroke compute lands |

**Chronic KEEP-BOOK (carried from prior tranches, triggers named — Lane 11):** `proof:webgl-golden` (trigger: stable headless WebGL2 frame runner); OffscreenCanvas+Worker (trigger: profiled LoAF regression); `text-box-trim` SFC consumer (trigger: a real SFC consumer); anchor-positioning dock popovers (trigger: native-anchor consumer); Drawer `:native`/`GlassNativeDrawer` (trigger: true 2nd native consumer); `interpolate-size`/`calc-size()` (trigger: cross-engine support); native scroll-driven `scroll()`/`view()` (trigger: Firefox unflips). All correctly deferred; none promote this round.

**H deferred:** lock-removal (H.W6) supersedes the earlier gate-restyle ask (ADDENDUM 2 — confirmed, no residual restyle work); NutritionLabel heavy-bar signature → H.W10 (token-only, additive).

---

## (4) FRONTEND + BACKEND ASSAY FOLDS

The re-run assay (Lanes 6, 10, 13, 15, 16, 17, 18, 19, 20, 28, 29) found **no systemic legacy/god-module/orphan**; the residue is hygiene that folds cleanly:

| Assay finding (file:line) | Fold target |
|---|---|
| **Composable return-type naming** — ≥9 composables lack `Use<Name>Return` (`useCountup`→`Countup`, `useAnimatedNumber`, `useGlobalDark`, `useGlassRenderer`, `useScrollProgress`) | **W15** (already scoped: named return interfaces) |
| **`useTokenColor.ts:69` DI seam** (reads `document.documentElement`, no injection) | **W15** (already scoped: optional injected resolver + unit) |
| **`twin-line-divider` DRY** (instrument-chassis + instrument-rail, 2 sites) | **W15/W20** (already scoped: single `@utility`) |
| **Reactive chains** — multi-watch in `useSidebarFollow.ts:210`, `useIntersectionPause.ts:99`, `useTokenColor.ts:109` (merge to one watch) | **W15** (composable hygiene) |
| **Brittle calc/magic-numbers** — `tokens.css:645` opacity×100% nesting, `dock.css:60` 100vw trap + 1.5px/0.5px sub-px, `instrument-rail.css:27` magic 0.382, `tokens.css:843` vw/vh dock-max | **W20** (already scoped: brittle→token) |
| **z-index coupling** — hardcoded `z-index:1/2` across dock/instrument-chassis/utilities (10+ sites, no token) | **W20** (extend: `--z-surface/--z-layer` token family) |
| **Tabs pill-track magic pixel** + demo raw-`<button>`→`<ToggleGroup>` | **W20** (already scoped) |
| **`max-h-[60vh/300px]` arbitrary** (DropdownMenu/Combobox/Command — 3 sites) | **W26** (fold: `@theme max-h-popover` + utility, with §8 text-shadow companion work) |
| **Redundant `-webkit-` prefixes** — ContinuousRail:89, ScrollingText:80, SortableItem/Handle/ScrubberTimeline user-select (Lightning CSS auto-prefixes) | **W26** (scoped-CSS modernization) |
| **`vertical-align:-0.05em` fragile magic** (typography.css:426) | **W26** (→ `transform: translateY()`) |
| **`.glass-btn`/`.input-pill` state rules global, not component-scoped** (Lane 17) | **W25** (micro-fold: state rules colocate with Button/Input; base recipes stay global) |
| **`.deck-gate :deep(input[aria-invalid])`** redundant after W18 (Lane 15) | **H.W1** (delete after AW.W18 lands) |
| **slides manual debounce** (DeckPage/SlideXray) → `watchDebounced` | **H.W4/W5** |

**Monolithic-CSS verdict (Lane 17):** `dock.css`/`glass.css`/`utilities.css` are **intentionally monolithic and correct** (the tier system + dock motion vocabulary are load-bearing). One DRY fix: `twin-line-divider` (→ W20). No split needed; document the rationale (→ W15 colocation-hygiene one-liner).

**Backend (Lane 21):** zero legacy/`_v2`/silent-swallow (AV.W12 cleaned it); no god-module >500 except DataTable.vue 442 (→ W14 split). Befitting `@supports` fallbacks correctly kept. Clean.

---

## (5) NEW-ITEM WAVE PLAN

The 8 ADDENDUM-3 items need concrete waves. They share a hard dependency: **all dogfood the glass-atoms band (W22-W26) + dock fixes (W1-W3), so they open AFTER Band-F.** Recommended band G (AW) + parallel H additions. **The ≥2-consumer gate is the binding constraint** for the two component-touching ones (Lane 25/30 flag this).

| New wave | Scope | Hard gate | Band/number | ≥2-consumer |
|---|---|---|---|---|
| **AW.W28 storybook-completeness** | Every exported `ui/`+`custom/` symbol has a live story; AV.W10 11-category IA audited for coverage + cogency; manifest 1:1 with `src/index.ts` | `proof:storybook-every-component` — no exported symbol with zero story; category bins balanced | G (after W27) | demo-internal (IA audit, not a primitive) — OK |
| **AW.W29 demo-dock-nav** | Storybook nav rebuilt on glass-ui dock: sidebar dock + bottom-bar dock; dogfoods dock+glass-atoms; iOS-26 idiom. **GATE: re-scope as demo-internal layout (PATH B) UNLESS a 2nd consumer (slides deck-nav) is named** | `proof:demo-dock-nav` — sidebar collapse morph (W1 fix) + bottom-bar `.tap-squish` (W25) render ≥3 viewports; AppShell.vue sole shell edit | G (after Band-F) | **DECISION NEEDED** — demo-only ⇒ PATH B fold into AppShell maintenance, not a shipped primitive |
| **AW.W30 aurora-configurator-redesign** | Restyle existing `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow` with glass-atoms idioms (specular rim W22, `.tap-squish` W25, `--radius-field` W24, data-slot W26). NO new component; extends existing surface | `proof:configurator-glass-atoms` — aurora demo story renders Configurator with the 6 glass-atoms features (computed-style probe) | G (after Band-F) | aurora demo (1st) — name a 2nd (sibling studio) OR scope as file-internal restyle (no new API) |
| **AW.W31 carousel-redesign** | GlassCarousel/carousel: unify shell onto `.glass-material` (W22), four-state on items (W25), `data-slot` (W26), align motion to dock iOS-spring family, lift overflow-fade to reusable `@utility` | `proof:carousel-glass-atoms` — shell specular + item four-state + motion-spring render | G (after Band-F) | GlassCarousel + carousel primitives (2 in-repo) — OK |
| **AW.W32 perf-a11y (Lighthouse)** | Lighthouse perf/a11y/best-practices/SEO over every demo page; ≥3 viewports, light+dark; CLS on theme-flip + canvas-toggle; WCAG-AA across 40+ atom states; font/WebGL/token-read perf | `proof:demo-lighthouse` — FCP/LCP/TTI/CLS budgets + AA contrast + best-practices floors | G close-adjacent (after W31) | demo (the audit IS the deliverable) — OK |
| **H.W11 perf-a11y (Lighthouse)** | Same for til-briefing deck + SlideXray; CLS on visibility-token swaps; constellation edge-alpha AA; reduced-motion guards; 48px touch targets | render-matrix + contrast greps (slides ships no `proof:*` runner) | H (after H.W10) | slides deck + XRAY — OK |
| **H.W12 glass-token-fork-fix** | Remove `deck.css:373-375` hardcoded `--glass-bg-*` redeclaration; override inputs on `.dark` cascade; delete XRAY dead `.glass-panel` (`main.css:13-16`) | `proof:no-token-name-fork` — `grep glass-bg- deck.css == 0` (outside `@theme`) | H (after H.W6, before H.W7) | cross-repo hygiene — OK |

**Folds (no new wave):**
- **Naming-consistency** → **W15** (extend colocation/naming-hygiene: component-export-PascalCase vs folder-kebab convention documented; token-family naming) + **W26** (`data-slot` already standardizes idiom naming).
- **Animation-coherence audit** → **W27** (a 2-3pp brief grounding dock-springs + aurora-shader-motion + blob-material-response as ONE iOS-aligned language; appendix to dock-animation-digest). Plus **W3** dual-write verification (`DOCK_SPRING` ↔ `--spring-dock` sync gate — Lane 29) and the W2 opacity-on-overshoot reconciliation (Lane 22/29).
- **DESIGN.md audit** → **W27** (aurora DESIGN.md is current per Lane 29; blob+constellation DESIGN.md are gate-deliverables of W9/W17; root DESIGN.md gets a "§AW token deltas" section for W22-W26's new tokens).

---

## (6) COVERAGE-GAP CLOSURE

Every uncovered RECAP/ADDENDUM request → its wave:

| Uncovered request | Closed by |
|---|---|
| ADDENDUM-3 storybook-completeness | **AW.W28** (new) |
| ADDENDUM-3 demo-dock-nav (sidebar+bottom) | **AW.W29** (new; PATH-B decision) |
| ADDENDUM-3 aurora configurator redesign | **AW.W30** (new) |
| ADDENDUM-3 carousel redesign | **AW.W31** (new) |
| ADDENDUM-3 Lighthouse (AW demo + H slides) | **AW.W32 + H.W11** (new) |
| ADDENDUM-3 naming consistency | **W15 + W26** fold |
| ADDENDUM-3 animation audit | **W27 brief + W3 sync-gate + W2 reconcile** fold |
| ADDENDUM-3 DESIGN.md audit | **W27** fold |
| Lane-9 slides `--glass-bg-*` token fork | **H.W12** (new) |
| W16 charter-table gate drift | **fix `AW.md:140`** → `proof:deck-progress-rail`, drop `deckProgress()` helper language |
| W0 charter-table "W14 retire" drift | **fix `AW.md:124`** → "W19 retire candidate" |
| AW.W1 born-RED premise unverified | **empirical gate-run on 3.3.0 build before Band-A dispatch** (not a planning blocker) |

No RECAP request remains uncovered after these.

---

## (7) THE AUGMENTED AW/H WAVE SET (FINAL TALLY)

**AW — 33 waves (was 27; +6 new):**
- W0 spot-verify · W1-W3 dock · W4-W8 aurora · W9-W11 blob · W12-W15 component · W16-W17 convergence · W18 gate-pattern · W19 orphan-prune · W20 styling-assay · W22-W26 glass-atoms · W27 close (W21 retired)
- **+ band G (new, after W27 / dogfoods Band-F):** W28 storybook-completeness · W29 demo-dock-nav · W30 aurora-configurator · W31 carousel-redesign · W32 Lighthouse
- *Note: W27 (close) re-anchors to LAST after band G, OR band G ships as a post-close addendum tranche — orchestrator's call; the simplest is W28-W32 open after W27's bands close but the final gate-fleet+FINAL.md close registers them too.*

**H — 12 waves (was 10; +2 new):**
- W1-W10 (consume + refine) · **+ W11 Lighthouse · W12 glass-token-fork-fix**

**Reconciliation work before dispatch (all doc-edits, no implementation):**
1. Fix 5 blockers: B1-B3 (W22 dock/Card scope), B4 (W27 gate→wave map), B5 (W26 disjointness + `transition-control` ownership).
2. Fix 2 charter-table drifts: `AW.md:140` (W16 gate) + `AW.md:124` (W0 "W19").
3. Strike W12 born-GREEN light-dark gate (scope item 3 + condition 3).
4. Apply 9 refines (W22 phantom-family/intent, W23 refract-rehome/fringe-gating, W24 card-story/gate-rebaseline, W26 aria-invalid-narrow/Toast-subgate, W26/W27 wave-label fixes).
5. Author the 6 AW + 2 H new waves (§5).
6. Empirically verify AW.W1 regression on 3.3.0 build before Band-A opens.

---

**HEADLINE:** The 32-agent fan-out's loudest cluster (charter-divergence, missing waves, phantom gates) is **stale — already repaired in the committed charter**; the surviving real work is the glass-atoms W22-W26 band's source-confirmed unify-mechanism blockers (dock-not-a-ladder-rung, Card-carve↔W24, W26 token contradiction, W27 off-by-one), two charter-table gate drifts (W16, W0), one born-GREEN gate to strike (W12), the unverified W1 born-RED premise, and **8 ADDENDUM-3 new-scope items needing waves**. AW is **DRY, cogent, and inter-wave-coherent with 5 blockers + 9 refines to reconcile**; H is **CONVERGED**. **NEW WAVES: 8 (AW: W28-W32 storybook/demo-dock-nav/configurator/carousel/Lighthouse + W27-folded animation/DESIGN.md/naming; H: W11 Lighthouse + W12 token-fork-fix) → final tally AW 33, H 12.**
