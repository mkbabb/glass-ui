# BG Coherence Re-Spec — PASS 1 (Baseline)

**Synthesis agent · COHERENCE audit · PASS 1 of N**
HEAD: `6c1f5386` (re-anchored this pass; the prior baseline ran at `4c761b64`, the tree has moved +3) · siblings-intact: exit 0 · scope: READ-MOSTLY, writes only under `docs/tranches/BG/audit/RESPEC-COHERENCE/`
Inputs: 8 research lenses (friction-history, wave-dag, page↔wave coverage, token-spine, gate-composition, BG↔BH interleave, consumer-constellation, sota-light) + independent on-disk re-verification of every HIGH claim at `6c1f5386`.

---

## 0. The one-paragraph verdict

The BG plan is the **most friction-aware tranche in the A→BG corpus** — the 7 folded gap-waves ARE the canonical proxy-killers, and the close-machine chronics (E/F/H), dep/submodule/uniform corrections (S/T/U), and the rate-wall (P) are well-defended and mostly verified on disk. There is **no feasibility restart** anywhere: every lens independently reports "none is a design unknown." BUT the plan is **develop-ready in DESIGN, not in EXECUTION-COHERENCE.** Three structural defects are **live-blocking the build frontier right now** (PAINT-PENDING≠DONE deadlock, G4 unbound + already-violated, 2 live `proof:ba-gestalt` G8 violations growing toward 61), and **8 HIGH cross-wave coherence issues** must be reconciled before a resumed execution would do the right thing rather than mis-execute or stall. Repeat-risk concentrates in **three under-reached surfaces** — the decoupled-paint engine, the glass-ui-specific token/binding traps riding the new-token waves, and the C-SAFARI on-device leg — none a restart, all reconcilable by spec/spike.

### Ground-truth re-verified directly against source @ 6c1f5386 (not trusted from prose)

- `glass/ladder.css` = **527L**, `dock/shell.css` = **510L** (both >500 — R1/R2 close-reds LIVE; G4 carve targets absent).
- `dock/shell.css:29` already reads `--dock-surface-blur: var(--glass-blur-resting)`, consumed at `:159` — **WS3 3.6 pre-empted G4's dock-blur re-point**. The `--glass-blur-dock` chain survives (`tokens/glass.css:103,166`, `dark-arm.css:286`, `bridges.css:334`) with 0 live readers off the comment at `shell.css:26`.
- `package.json` kf PEER = `^5.0.0` (line 1078); `^5.1.0` only in devDeps (1116). value.js peer = `^1.0.0` (1080, admits npm-latest 1.1.1). The `snap` binding ships in kf 5.1.0 → a `^5.0.0` consumer no-ops it.
- **8 gate files reference `glass-lens`** (`proof-button-glass`, `-visual-reconcile`, `-glass-prune`, `-glass-material-sota`, `-lensing`, `-no-retired-survivor`, `-no-dead-token`, `-safari-webgl`) — the WS8 retire matrix names 3.
- `bg-bh-execute.wf.js`: `allDone` (L87), the precond `ready` check (L100), `cutReady` (L243) all test literal `=== 'DONE'`, while the DAG-loader prose (L136) says "a PAINT-PENDING row STAYS PAINT-PENDING … MUST NOT re-enter the build frontier" — the contradiction is live.
- `bg-paint.wf.js`: derefs `pp.waves`/`pipe.chromeOk`; the `batched(pp.waves, 2, w => agent(...))` judge has NO per-agent `.catch`.
- `uChromatic` **absent** from `src/`; shipped Tier-2 `glassShader.wgsl:13/130-132` uses `chromatic_aberration` at `*0.003` (planned `uChromatic·0.0045`).
- `.claude/settings.local.json` **gitignored** (lose-able belt); `scripts/verify-siblings-intact.mjs` **tracked** (durable tripwire).

---

## 1. The complete friction taxonomy + per-class repeat-risk verdict

20 classes, A–U. `recurs` = the friction-history verdict (re-verified on disk where claimed). **Repeat-risk** = this synthesis's forward verdict for the BG/BH execution.

| Class | Name | recurs | Repeat-risk | Live BG vector @ 6c1f5386 |
|---|---|---|---|---|
| **A** | headless-green / cardinal (master) | yes | **HIGH** (C-SAFARI sub-instance) | General class cured (ba-gestalt reads pixels, tag coupled 0/10). C-SAFARI ★★★ bound to the on-device Metal/WebKit leg BY DESIGN; the decoupled-paint engine re-creates a concentration point (§2.A1). |
| **B** | orphaned-wave-claim (doc-says-done/tree-says-no) | yes | LOW | Plan header HEAD `6369ad6e` trails tip `6c1f5386` by 3, growing. Cursor honest (30 DONE / 7 PAINT-PENDING / 123 PENDING). |
| **C** | clean-break rename misses a consumer | yes | **MOD-HIGH** | Delete-dense (DOCK-CUT, VIZ-SUBSTRATE-DELETE, DEAD-COMPOSABLE-CUT, CHIP-ALIAS-KILL, DEAD-TOKEN-SWEEP, /api-fold). TINT-UNIFY rename names 2 of 5 carriers (§2.T3); WS8 `.glass-lens` retire names 3 of 8 reader gates (§2.G2). |
| **D** | budget-rebaseline ratchet | yes | MOD | WS8 refraction + WS6 siri GL chunks ADD; WS5 VIZ-SUBSTRATE-DELETE re-pins DOWN; net cut-lift un-tracked-as-one-number. kf/value bumps move the dep graph. |
| **E** | ci.yml↔manifest drift | no | LOW | `--emit-ci` codegen makes drift impossible-not-detected; but `proof:glass-idiom-factor` IS in registry, MISSING from emitted ci.yml now (§2.G3). |
| **F** | BOOK/ARCHIVE/NAMED-FORWARD re-label | no | LOW | DISPOSITION-RESTAMP DONE (31 rows, 0 stale/phantom) + Band-0 ledger + BB.W-NDA-DECIDE. |
| **G** | structural / god-module / legacy-commentary | yes | MOD | R1/R2 LIVE (ladder 527, shell 510). WS2/3/4/8/9 add CSS into the leaves G4 carves; the post-WS9 re-carve owner is verbal, not a scheduled wave (§2.M1). |
| **H** | close-never-runs / provenance | no | LOW | Most-hardened (the 7 gaps cure it). W-CUT fires LAST after `--run ship` siblings+precepts-absent + real-Safari + user gate. Residual reaches it only via the Class-A paint chokepoint. |
| **I** | user-directive-contradicts-spec | yes | MOD | 12-LAWS-UNIVERSAL routes the broad liquid-weight directive to ONE wave (narrowing risk). Goo-morph worm owner RESOLVED (ships+carved) but its carve had a live undefined-props near-miss + paint deferred to WS11/12 (§2.P5). |
| **J** | capability-without-adoption (overfit inversion) | yes | MOD | BG mints SIRI-ISLAND/-WAVEFORM, GLASS-REFRACT-WEBGL, useDockSpring, useFlip; the ≥2 bar must be PRODUCTION. G2 names SiriIsland the orphan-decision; siri/glass-refract are the live overfit-candidates. |
| **K** | substitution-vs-inheritance / dead-knob | yes | **MOD-HIGH (biggest glass-specific exposure)** | `--dock-surface-blur: var(--glass-blur-resting)` (shell.css:29) = the exact `--glass-bg-dock` AZ shape. Plus `--siri-island-t` (WS6), `--glass-depth`/`--glass-btn-press-t` (WS8), `--glass-key-direction` (WS9). 3rd-4th recurrence; no single gate; only live-π under scope emulation (§2.T1). |
| **L** | reka/kf binding silent no-op | yes | **MOD-HIGH** | kf 5.1.0 ambient-collision renames + value bumps + heavy reka re-wires (SHEET-INSET-ROOT, DESHADCN-MATERIAL, SPECIMEN-PER-STORY). No dedicated bump-sweep gate; paint-π (decoupled) is the only catcher. PLUS the cut-time kf-peer↔snap crossover (§2.C1). |
| **M** | live-π oklab paint-arm / grey-by-L | no | LOW | reflect-capture-verify parses oklab; G6 leaf chroma-sensitive (pngMedianRgbStddev). Re-opens only on an L-only regression. |
| **N** | light-dark/hsl/scoped-global/slotted | yes | MOD | WS8 glass-deep dark + WS9 paper light-dark (N1); SFC-CSS WS4/9/11 (scoped `:global()` drop risk). Dual-mode dual-engine paint catches; device-free misses. |
| **P** | rate wall (parallel >3) | no | LOW | CLEAN: all workflows batch ≤3 build / ≤2 paint; no un-batched `parallel()` >3. |
| **Q** | session-limit null-crash | yes | **HIGH (LIVE GAP)** | `bg-paint.wf.js` derefs `pp.waves`/`pipe.chromeOk`; the `batched(...)` judge has NO per-agent `.catch` (one throw rejects the batch) vs `bg-bh-execute.wf.js`'s guards. The longest, most session-wall-exposed workflow is the un-hardened one (§2.A2). |
| **R** | foreign-tree catastrophe | yes | LOW-MOD | `.claude/settings.local.json` gitignored + `bypassPermissions` + allow=0 → deny=8 literal-prefix patterns are the SOLE belt, evaded by cd-prefixed mv / find -delete / git clean / node fs. Durable protection = prose fence + tracked tripwire. |
| **S** | dependency-floor miscalculation | no | LOW (one live crossover) | Registry-CONFIRMED: npm-latest kf 5.1.0, value 1.1.1; planned floors admit latest. Live crossover: peer bumps not yet on disk — kf peer still `^5.0.0`, BH B1-W2 still says value `^1.2.0` (§2.C1, §2.C2). |
| **T** | submodule mistake | no | LOW | `docs/precepts` IS a submodule (VERIFIED); G3/G5 moved canon homes OUT to parent-tracked. Watch: G3's chosen home conflicts with the realized scaffold (§2.I1). |
| **U** | wrong-uniform / wrong-anchor | yes | **MOD-HIGH** | G1 re-points to ship `uChromatic` — but it exists ONLY in the converge prototype; shipped Tier-2 WGSL uses `chromatic_aberration @ 0.003` vs planned `uChromatic @ 0.0045` (§2.T2). Plus the WS8←WS9 `--glass-key-direction` DAG inversion (§2.T4). The class the RESPEC G1 claimed FIXED, recurring one level up. |

**Per-class headline:** the canonical close-machine + process classes (E/F/H/M/P/S/T) are well-defended. Repeat-risk concentrates in the glass-ui-specific authoring classes — **C, K, L, U (all MOD-HIGH)** riding the WS3/6/8/9 new-token/retire waves — plus the **A/Q** decoupled-paint exposure and the **G** carve-regrow fragility.

---

## 2. Cross-wave coherence issues (deduped, severity-ranked)

Consolidated across the 8 lenses (deduped where the same defect surfaced in ≥2). **8 HIGH, 16 MEDIUM, 15 LOW.** Each: severity · exact waves · defect · fix-direction.

### HIGH

**§2.A1 — Decoupled-paint engine re-creates the cured BB single-terminal-reflect chokepoint + is un-null-guarded.**
*Waves:* `bg-paint.wf.js` · `BG.W-PAINT-IS-THE-GATE` · the 61 [P] paint-gated waves.
`bg-paint.wf.js` runs OUT-OF-BAND as a global paint sweep — structurally adjacent to the cured BB disease (the project's worst incident). SAFE-by-stall (cursor honest PAINT-PENDING; tag coupled to ba-gestalt 0/10) BUT it re-creates the exact paint-concentration chokepoint `gestalt-first-capture P1-P5` forbids, AND it is un-null-guarded (§2.A2). Needs explicit PASS-2 **adjudication** (keep decoupled-with-guards vs re-couple per-wave) + the guards. → PT-2 + PT-3.

**§2.A2 — `bg-paint.wf.js` session-limit null-crash (LIVE GAP, Class Q).**
*Waves:* `bg-paint.wf.js`.
VERIFIED: `pp.waves` (L51) and `pipe.chromeOk` (L45) dereferenced with no upstream null-guard; the `batched(pp.waves, 2, w => agent(...))` judge has NO per-agent `.catch`, so one throw rejects the whole batch. `bg-bh-execute.wf.js` carries `.catch(()=>null)` guard sites + `paintWaves=[]` decoupling. A session-limit null/throw mid-sweep crashes the longest workflow and stalls the entire visual close. Trivial fix unapplied. → PT-3.

**§2.D1 — G4 `BG.W-CLOSEFIX-9SITE` mis-positioned: declared LANDS-FIRST, seq-ordered LAST, precond-unbound, ALREADY VIOLATED.**
*Waves:* `BG.W-CLOSEFIX-9SITE (12.0)` · `BG.W-ROUTE-TRANSITION (2.1)` · `BG.W-GLASS-BLUR-PEER (3.6)` · `BG.W-DEMO-STYLE-REHOME (3.11)` · `BG.W-CLOSE-SWEEP (G3)`.
VERIFIED: ladder.css=527L + shell.css=510L (carve targets absent), zero G4 commits, while WS1 (2.1-2.7) + partial WS3 + WS4 (10.25) landed. No WS1/WS3 successor lists G4 as a precond; the EXECUTION-PROGRESS note "the DAG encodes it as a predecessor of WS1" is **FALSE**. The DAG is LLM-re-derived from prose each boot (`bg-bh-execute.wf.js` encodes zero static edges), so G4's "lands first" prose has no machine signal. → PT-1 (re-seq G4 to ~0.7 AND/OR bind it as an explicit precond of every ladder.css/shell.css-touching WS1/WS3 wave).

**§2.D2 — Forward-reference inversion: WS3 3.6 already shipped G4's `--dock-surface-blur` deliverable, staling G4's atomic-diff spec.**
*Waves:* `BG.W-CLOSEFIX-9SITE (12.0)` · `BG.W-GLASS-BLUR-PEER (3.6)`.
VERIFIED: `--dock-surface-blur: var(--glass-blur-resting)` lives at shell.css:29, consumed at :159. G4's "9-site / dist byte-identical-to-HEAD" spec was computed against 4.2.0 HEAD and is now stale against the moved frontier (3.1/3.6/3.7/10.25/WS1 moved compiled CSS). "Byte-identical to HEAD" is ambiguous. → PT-1 (re-derive G4's site-count + dist-identity invariant against the LIVE frontier before G4 runs).

**§2.D3 — PAINT-PENDING ≠ DONE: the build frontier deadlocks (LIVE NOW).**
*Waves:* `bg-bh-execute.wf.js` · `BG.W-CARTOON-INK-GAMUT (3.1)` · `BG.W-GLASS-BLUR-PEER (3.6)` · `BG.W-DOCK-MORPH-UNIFY (4.1)` · `BH.B5a-deps-currency (9.1)`.
VERIFIED contradiction: the DAG-loader prose (L136) says "a PAINT-PENDING row STAYS PAINT-PENDING … MUST NOT re-enter the build frontier" (treat-as-done-building), but `allDone` (L87), the precond `ready` check (L100), and `cutReady` (L243) ALL test literal `=== 'DONE'`. A wave gated on a PAINT-PENDING [P] precond NEVER becomes ready; `bg-paint.wf.js` runs out-of-band so the build loop never flips them. 3.1/3.6 are PAINT-PENDING now and block all of WS2 (via 4.1) + BH[WS3] (via `allDone(WS3)`). `cutReady` cannot fire until the out-of-band paint workflow flips EVERY [P] wave — a hard prerequisite the build engine never triggers. → PT-1 (treat PAINT-PENDING as DONE-for-build-ordering; gate `cutReady` on the union OR wire `bg-paint.wf.js` interleaved).

**§2.G1 — `proof:ba-gestalt` G8 forbids the "rides W-REFLECT3" deferral the RESPEC fold wrote ~29× for a NON-EXISTENT wave (2 live violations, blast radius 61).**
*Waves:* all 61 [P] paint-gated waves · `BG.W-PAINT-IS-THE-GATE` · the build-phase deferral table · the gap-wave vacuity gates.
The BB/BC "rides W-REFLECT3" idiom resurfaced ~29× across BG docs (build-map 7 / EXECUTION-PROGRESS 10 / AMENDED 8 / FINAL 4) for a wave that does not exist (no `BG/waves/*reflect*`). `proof:ba-gestalt` G8 — which abolished the terminal-reflect funnel for BG — REDs the un-quoted occurrences; 2 live violations at EXECUTION-PROGRESS.md:38,113. The vacuity teeth of the gap-wave gates (gestalt-cursor-parity PARITY-A vacuous 82/105, field-aurora-aa F-AA-ROSTER frozen-literal, glass-refract-fence F1/F4 op-count proxies) ALL defer their binding completion THROUGH the same forbidden wave — C1 and the vacuities are one disease from two ends. The count grows monotonically as the engine transcribes each [P] note into a `waves/*.md` row. → PT-2 (re-home onto BG's per-wave self-close, fix the 2 live, re-run G8 to PROVE 0).

**§2.G2 — WS8 `.glass-lens`/`glass-refract.css` deletion breaks the surviving battery gates that assert it; the retire matrix names 3 of 8 reader files (G4 "9-sites-not-6" recurring un-costed).**
*Waves:* `BG.W-GLASS-SUFFUSE-UNIVERSAL` · `BG.W-GLASS-SOTA-LADDER` · `BG.W-GLASS-REFRACT-WEBGL`.
VERIFIED: 8 gate files reference `glass-lens`; `proof-button-glass.mjs` (B4, `[local,ci,release]`) + `proof-visual-reconcile.mjs` (a1, `[local,ci]`) assert the Button COMPOSES `.glass-lens` and will RED on deletion. The build-map names only 3 retire gates and excludes Button.vue. The exact frozen-string-identity-reader under-enumeration G4 found at `--glass-blur-dock`, recurring at WS8 un-costed. → PT-3 (enumerate the FULL reader set, classify by tag, draft the WS8 atomic re-point — G4's discipline applied to WS8).

**§2.T2 — C-SAFARI ship-operator `uChromatic` exists only in the converge prototype; the shipped Tier-2 WGSL uses `chromatic_aberration @ 0.003` (planned `·0.0045`) and is unfenced — dual-stack parity break on the ★★★ chronic.**
*Waves:* `BG.W-GLASS-REFRACT-WEBGL (WS8 §2)` · `BG.W-GLASS-BACKDROP-SAMPLE (WS8 §3)` · `BG.W-SAFARI-PARITY-GATE (WS7)`.
The fence/gate/token re-pointed onto `uChromatic`, a name ONLY in `glass-field-shaders.json` (converge phase); the genuinely-shipped `glassShader.wgsl:13/130-132` uses `chromatic_aberration` at `*0.003` (+ `refraction_strength*0.02`). The gate's F3 operator-scan reads only the NEW Tier-1 GLSL; the Tier-2 WGSL is unreconciled + unfenced. The RESPEC swapped one non-ship name (`uDispersion`) for another absent from `src/` without examining the actual shipped uniform. C-SAFARI-adjacent (missed 3 running). PLUS §2.M4: `--glass-edge-dispersion` (glass-fx.css:305) is a two-inset-ring `box-shadow` consumed AS box-shadow at surfaces.css:417 — "maps DIRECTLY to `uChromatic`" is a token-TYPE collision. → PT-5.

**§2.T4 — `--glass-key-*` spine: dual source-of-truth + banned-angle re-introduction + WS8←WS9 DAG inversion.**
*Waves:* `WS9 §0 GU-1` · `WS8 §1 BG.W-GLASS-SUFFUSE-UNIVERSAL` · `WS12 §5 BG.W-GLASS-PAPER-CONGRUENCE (A6)` · `BD.W-GLASS-KEY-EDGE (landed)`.
WS9 GU-1 mints a single `--glass-key-direction` AZIMUTH while the existing per-axis sign family `--glass-key-{lit,shade}-{x,y}` (BD.W-GLASS-KEY-EDGE, glass-fx.css:114-117, read DIRECTLY by rim.css:81-93) stays canonical and is not re-derived from it — a dead-knob (re-pointing the azimuth won't move the rim catch-light). The azimuth re-introduces the angle representation the glass-fx.css:106-109 comment explicitly BANS ("the glass-material sign trap — banned here"). AND the WS9 header claims "WS8 bevel reads it" while the DAG orders WS8 BEFORE WS9 and WS8 §1 lists no GU-1 precond/file → WS8 reads an undefined custom property. WS12 A6 is the named spine owner but runs LAST and would reconcile a never-wired bevel read. → PT-4 (single-key-source decision BEFORE WS8/WS9 build + DAG-edge correction).

**§2.I1 — G3 canon-home path inconsistent with the realized BH scaffold; fragments the close-machine canon.**
*Waves:* `BG.W-CLOSE-SWEEP (G3, WS7)` · `BH-B4b-content` · `BH-B5c-gate-rehome`.
The fold's chosen G3 canon-home `docs/tranches/BG/canon/close-disease-sweep.md` (EXEC-PROG 12.4b) is inconsistent with the already-realized BH scaffold `docs/canon/` + the `canon-doc.mjs` resolver (no close-disease key; build-and-gates.md already lists the close-battery canon). G5 calls it "shared with G3's canon home" yet the two homes are different paths — contradictory on disk. Left unreconciled, B5c re-homes close-battery-parity to one home while G3 writes close-disease-sweep to another, and `canon-doc.mjs` cannot resolve it. → convergence gap G-6 (reconcile to `docs/canon/` + register the G3→B4b edge; prose-reconciliation, bounded).

### MEDIUM

**§2.C1 — Cut-time kf peer-bump↔snap crossover (no device-free gate catches it).**
*Waves:* `BG.W-CUT` · `BH.B1 W3-dragmorph-snap-excise` · `proof:peer-conformance`.
VERIFIED: BH B1 W3 wired kf 5.1.0 `DragOptions.snap` (DONE) but `package.json` kf PEER is still `^5.0.0`. `snap` first ships in 5.1.0 → a `^5.0.0` consumer gets a silently no-op snap. The cut MUST bump the kf peer beside value.js; the installed dist resolves 5.1.0 so no device-free gate sees it. → PT-6.

**§2.C2 — value.js floor literal conflict (BH B1-W2 ^1.2.0 vs audit-corrected ^1.1.1).**
*Waves:* `BH-B1-W2-value-destraddle` · `BG.W-GATE-FIELD-AURORA (G6)`.
BH B1-W2 says value.js →`^1.2.0`; the BG audit CORRECTED it to `^1.1.1` (^1.2.0 excludes npm-latest 1.1.1 + reds `proof:peer-conformance`'s admits-latest clause). B1-W2 is an EARLY [C] `package.json` edit → the stale string re-introduces the exact red the audit fixed. → PT-6.

**§2.T1 — Substitution/dead-knob class rides WS3/6/8/9 new-token waves with no single catching gate.**
*Waves:* `BG.W-CLOSEFIX-9SITE` · `BG.W-GLASS-BLUR-ENGAGE` · `BG.W-SIRI-ISLAND (WS6)` · `BG.W-GLASS-TINT-UNIFY (WS3)` · `WS8 glass-deep` · `WS9 paper`.
The build-map one-liners do not state the `inherits:true` / read-at-element / re-declare-on-scope discipline for `--siri-island-t`, `--glass-depth`, `--glass-key-direction`. No single gate; only live-π under scope/coarse emulation detects a dead consumer knob. → convergence gap G-2 (each new `@property` token owes the substitution-trap note + a live-π-under-scope check; `--glass-key-direction` absorbed by PT-4).

**§2.T3 — GLASS-TINT-UNIFY rename file-incompleteness (2 of 5 carriers; @property de-registration + silent-no-op risk).**
*Waves:* `WS3 BG.W-GLASS-TINT-UNIFY` · `WS3 BG.W-DEMO-STYLE-REHOME` · `WS1 (useGlassBackdropLuminance)`.
The `--glass-ambient-*`→`--glass-tint-bias-*` rename touches FIVE carriers (glass.css:391/401 @property registration, liquid-morph.css:34-69 consumer, bloomUpField.ts:64-85 writer, useGlassBackdropLuminance.ts:440 2nd writer, useBloomUp.ts) but the build-map *Files* names 2 of 5, and the named `useBloomUp.ts:340/343` anchor is the PRM-snap branch not the writer. Executed literally → name-desync silent-no-op + `@property` de-registration (bare var snaps). The prior pass marked this CLEAN — it verified the TARGET, not SOURCE completeness. → convergence gap G-2 (re-enumerate the 5 carriers; @property registration moves with the rename).

**§2.T5 — D-2 paper-grain demo-local warm substrate collides with WS9 GRAIN-REAL (double-warm; no retire owner).**
*Waves:* `BG.W-PAPER-GRAIN-WARM-SUBSTRATE (D-2, e40e5095)` · `WS9 §1 BG.W-PAPER-GRAIN-REAL`.
D-2 added a demo-local warm substrate behind the still-GRAY library grain (paper.css:44, feColorMatrix saturate=0, library BYTE-UNTOUCHED). WS9 GRAIN-REAL warms the LIBRARY `--paper-grain-tooth` → double-warm on the surfaces D-2 patched, no WS9 retire/retune owner. → convergence gap G-5 (WS9 owns the D-2 hand-off).

**§2.T6 — D-3 directional `--dock-expand-t` read lives in the orchestrator WS2 DOCK-MORPH-UNIFY rewrites; the WS2 per-wave gate is blind.**
*Waves:* `BG.W-DOCK-COLLAPSE-DIR (D-3)` · `WS2 BG.W-DOCK-MORPH-UNIFY`.
D-3's directional read (protected by `proof:dock-engine` E1) lives in `dockMorphContext`/`dockMorphMeasure` — the orchestrator WS2 rewrites. WS2's per-wave gate is the narrow `proof:dock-orchestrator-single`, NOT `proof:dock-engine` (`[local,ci,release]`), so the cut nets a regression but LATE (WS2 build is blind). → convergence gap G-5 (add `proof:dock-engine` to WS2's per-wave gate set — one-line known fix).

**§2.T7 — D-1 constellation parallax-default wired in a file WS5 VIZ-DEMIGRATE rewrites; ZERO standing gate.**
*Waves:* `BG.W-D1-CONSTELLATION` · `WS5 §3 BG.W-VIZ-DEMIGRATE`.
D-1 wires `parallax: DEFAULT_PARALLAX` in Constellation.vue:50 (DEFAULT_PARALLAX=0). WS5 rewrites the constellation substrate incl. Constellation.vue (WGPU→Canvas2D) with no preservation note, and grep of scripts/ finds NO standing gate asserting the parallax default → a re-wire regression is headless-invisible until the 480-capture/W-REFLECT3. → convergence gap G-5 (WS5 preservation note + a one-assert parallax-default gate; the lattice-cursor defect is high-visibility).

**§2.P1 — liquid-morph.css (850L) whole-file rehome double-owned.**
*Waves:* `BG.W-DEMO-STYLE-REHOME (3.11, WS3)` · `BG.W-SPIKE-DELETE (12.1, WS7)` · `BG.W-GLASS-TINT-UNIFY (3.5)`.
Both 3.11 and 12.1 claim the whole-file rehome to demo/; the later wave is a stale no-op (or a conflict). → convergence gap G-7 (pick one owner).

**§2.P3 — WS5 6.3 + 6.7 "ONE atomic gate edit" unenforceable under the file-disjoint batcher.**
*Waves:* `BG.W-VIZ-DEMIGRATE (6.3)` · `BG.W-VIZ-SUBSTRATE-DELETE (6.7)`.
The "ONE atomic gate edit" of `proof-gpu-substrate-single.mjs:177-181` across 6.3+6.7 lands in separate commits under `composeBatch`'s file-disjoint batcher; the gate can transiently RED between them, failing the integrator's per-wave gate-re-run and spuriously reverting 6.3. → convergence gap G-7 (merge the waves OR precond-sequence with no-transient-red authoring).

**§2.P5 — Goo-morph worm carve (BH B2.4a) had a live silent-no-op near-miss; paint deferred to WS11/12.**
*Waves:* `BH.B2.4a W-bh-carves` · `WS11` · `WS12` · `BG.W-12-LAWS-UNIVERSAL`.
The "remember this always" liquid-weight worm SHIPS (usePagerWorm/useCarouselWorm/BD.W-GOO-CAROUSEL-DECK); BG/BH only carve it. The carve had a LIVE undefined-props near-miss (centerOf/restSize/tokenPrefix/neckGap left on `useCarouselWorm()` that NO gate caught — only a human integrator), paint deferred to WS11/12. A subtler break surfaces only at that deferred paint. → convergence gap G-7 (a binding-presence assert on the carve's prop surface; don't defer the worm paint to the very end).

**§2.L1 — No dedicated reka/kf binding-verification sweep on the version bumps.**
*Waves:* `BG.W-SHEET-INSET-ROOT` · `BG.W-DESHADCN-MATERIAL` · `BG.W-SPECIMEN-PER-STORY` · `BG.W-DESHADCN-TOKEN-REPLACE` · `BG.W-CUT`.
MEMORY "sweep on version bumps": kf 5.1.0 + value bumps + deshadcn/sheet re-wires device-free-green; only the dual-engine paint-π catches a stale `:pressed`/`v-model:search-term`/`tag=` binding. reka 2.9→2.10.1 a11y fixes warrant the sweep too. → convergence gap G-7 (a binding-verification sweep step at the bump waves + the cut).

**§2.G3 — ci.yml drift: `proof:glass-idiom-factor` in registry, MISSING from emitted CI.**
*Waves:* `BG.W-CLOSEFIX-9SITE (R3 gates:emit-ci regen)`.
Registry ≠ emitted CI; `verify-ci` is release-tagged so it reds `--run release/full` not `--run ci`. CLOSEFIX-9SITE's R3 must pick up a gate it did NOT add (landed pre-CLOSEFIX) to clear it. → PT-6 (note in CLOSEFIX-9SITE that R3 re-emits a pre-existing un-emitted gate).

**§2.M1 — ladder/shell carve→WS9-grain-re-point chain; WS9 *Files* names pre-carve locations; no post-WS9 re-carve owner.**
*Waves:* `BG.W-CLOSEFIX-9SITE (G4)` · `BG.W-GLASS-TINT-UNIFY` · `BG.W-VT-ROUTE-ENHANCE` · `BG.W-PAPER-GRAIN-REAL (WS9)` · `BG.W-DEMO-STYLE-REHOME`.
ladder.css/shell.css are carved by G4 FIRST then re-edited LAST by WS9 PAPER-GRAIN-REAL, whose *Files* still lists the PRE-carve locations. The carve-regrow guard is WS3-scoped; a WS9 regrow past 500 has no downstream re-carve owner → R1/R2 could silently re-open between WS9 and the cut, re-blocking the 5.0.0 tag. → convergence gap G-7 (re-point WS9's *Files* to the carved leaves + assign a post-WS9 re-carve owner).

**§2.M2 — 5 phantom dock owner-waves in P-historical-coverage.md (incl. ★★ dock-gallery directive).**
*Waves:* `BG.W-DOCK-GALLERY/SHRINK/OVERLAY-SCOPE/DEEP-TRANSMIT/DRAG (phantom)` · `BG.W-DOCK-STORY-MODULARIZE` · `WS2 dock-convergence (11 real waves)`.
The coverage matrix assigns 5 dock directives (A4-A12) to owner-waves that do NOT EXIST in the build map, and the directive substance (draggable, dropdown-recolor, hue-bleed, blur-too-long) is absent under any name. dock-gallery (NEW route, ★★ PARTIAL) is captured (WS12) + component-converged (WS2) but its directive content is homeless. The project's own "all-prompts-addressed" matrix cannot be trusted as a coverage source. → convergence gap G-7 (reconcile each phantom owner-name to a real wave OR declare it a genuine orphan).

**§2.G4 — Three stale AZ freshness hashes red gate-manifest-sound's FRESHNESS arm; no re-stamp owner.**
*Waves:* `BG.W-CLOSE-SWEEP` · `BG.W-CUT`.
W-DOCK1/W-DOCK2/W-CON1 AZ deltas recompute stale → red the FRESHNESS arm at HEAD. The BG plan names no re-capture/re-stamp; may ride red into `--run release/full` at the cut. → PT-6 (name a re-stamp owner in the close sweep).

**§2.U1 — bbnf-buddy `--glass-blur-dock` external override silent no-op (G4 introduces an unrecorded consumer break).**
*Waves:* `BG.W-CLOSEFIX-9SITE`.
G4 fully retires the `--glass-blur-dock` chain on a "0 orphan readers" basis that was glass-ui-internal only; bbnf-buddy reads it as a deliberate LIVE cartoon-dock override (preset.css:230). bbnf's dock silently loses `blur(22px) saturate(1.6)` while keeping bg/border/shadow — an insidious single-token no-op a human re-baseline misses. The exact inv-11 / `--ring` blind spot, run again WITHOUT the constellation-grep that caught `--ring`. → convergence gap G-7 (owe a B7-style migration row `bbnf-glass-blur-dock-retune-no-op` + an exact-name deep-grep of `--glass-blur-dock-radius`/`--blur-dock`/`--glass-saturate-dock`).

### LOW

- **§2.L2** Plan-header HEAD `6369ad6e` trails tip `6c1f5386` by 3, growing (Class B). *Waves:* AMENDED-WAVE-PLAN.md, FINAL.md §10.
- **§2.L3** Foreign-tree deny-backstop gitignored + bypassPermissions + literal-prefix-narrow (Class R). *Waves:* .claude/settings.local.json, scripts/verify-siblings-intact.mjs.
- **§2.L4** B4f not gated on `BG.W-CUT`; safety rests on WS12-LAST + cutReady + user gate; the :93 comment is misleading. *Waves:* BH.B4f, BG.W-CUT.
- **§2.L5** AppShell.vue double-edit WS1 ROUTE-TRANSITION ↔ WS2 morph-stage carve, unsequenced. *Waves:* BG.W-ROUTE-TRANSITION, WS2 morph-stage carve.
- **§2.L6** D-G2 doc conflation — 480-capture (all-120) vs "all 10 roster surfaces" are two instruments; 11 /cat routes sit outside the 480. *Waves:* BG.W-PAGE-COMPONENT-AUDIT, BG.W-GESTALT-ROSTER-RE-POINT.
- **§2.L7** PaletteLayer.vue zero-importer dead file UNSCHEDULED in any cleanup wave. Fold into BG.W-DEMO-CHASSIS-CONSOLIDATE. *Waves:* BG.W-DEMO-CHASSIS-CONSOLIDATE.
- **§2.L8** ~106/120 pages have binding paint ONLY in the late local-only WS12 sweep; ci ba-gestalt covers ~14. A quota cut to WS12 evaporates the per-page net while CI stays green. *Waves:* BG.W-PAGE-COMPONENT-AUDIT.
- **§2.L9** WS3 GLASS-DYNAMICS strengthens W-LENSING squircle refraction which WS8 §1/§4 then retires/deletes — wasted-work/ambiguous edit target. *Waves:* WS3 BG.W-GLASS-DYNAMICS, WS8 §1/§4.
- **§2.L10** BH B7 frozen "203 symbols / 96 keys" drift vs WS6 SiriIsland (+/siri-island key → 97). Self-correcting via derive-from-source regen. *Waves:* BG.W-SIRI-ISLAND, BH-B7.
- **§2.L11** speedtest `.glass-refract` class binding (CompleteBadge.vue:16, renamed to .glass-lens at 4.1.0) omitted from the roster's speedtest impact; G1 SOTA-LADDER deletes the backing CSS. *Waves:* BG.W-GLASS-SOTA-LADDER.
- **§2.L12** `.githooks/commit-msg` shared B0(done)→G3(WS7) writer missing from the §2 collision table; G3 must EXTEND the ledger arm, not clobber. *Waves:* BH-B0, BG.W-CLOSE-SWEEP.
- **§2.L13** B4f naive-grep delete-gate scope ≠ B5c hard-reader cleanup (~7 soft mentions unowned; crossrepo-asks double-touched by a stale WAVE_BOUNDS entry + a new G7-WS5 clause). Reconcile to proof:claude-deletable's C2 receiver-scope OR widen B5c. *Waves:* BH-B4f, BH-B5c, proof:crossrepo-asks.
- **§2.L14** `proof:claude-deletable` (G5 born-RED safety gate) absent from both BH B4f wave specs. *Waves:* BH-B4f, BH-B5c.
- **§2.L15** Budget net-lift at the cut un-tracked-as-one-number (WS8 refraction + WS6 siri ADD vs WS5 down-ratchet). *Waves:* WS8, WS6, WS5, BG.W-CUT.
- **§2.L16** contrast-color() doc-window "Chrome 147+/Safari 26+" omits Firefox 146 (Baseline Newly Available Apr 2026); reka 2.10.1 + Tailwind v4.3 first-party idioms (scrollbar-*/`@container-size`) are WS10 awareness, not defects. *Waves:* adaptive-glass canon, WS10.

---

## 3. Convergence gaps (what PASS-2 must resolve before develop-ready)

**G-1 · The structural DAG / paint-decouple keystone (LIVE-BLOCKING).** §2.D1+D2+D3+G1+A1+A2 are ONE entangled cluster: G4 is unbound + already-violated + stale-spec'd; PAINT-PENDING≠DONE deadlocks the frontier NOW; "rides W-REFLECT3" violates the close gate ~29×; the decoupled-paint engine re-creates the cured BB chokepoint AND is un-null-guarded. A resumed execution as-is stalls at the WS2 frontier and grows G8 violations. **The single most important PASS-2 deliverable.** → PT-1 + PT-2 + PT-3.

**G-2 · The token-spine single-source decisions owed BEFORE WS8/WS9 build.** §2.T2 (uChromatic dual-stack), §2.T4 (--glass-key-* dual-source), §2.T3 (TINT-UNIFY rename completeness), §2.M4 box-shadow→scalar collision, §2.T1 (the dead-knob discipline for the new @property tokens). Authoring decisions that must land in the wave specs before the build agents reach WS8/WS9, or they mis-execute (silent no-op / dead knob / parity break). → PT-4 + PT-5.

**G-3 · The WS8 retire reader fan-out (the G4 discipline owed at WS8).** §2.G2 — enumerate the full `.glass-lens`/`glass-refract.css` reader set (8 gate files + Button.vue), classify by tag, draft the atomic re-point. The build-map's 3-gate cost is wrong. → PT-3.

**G-4 · The cut-time, device-free-gate-blind omissions.** §2.C1 (kf peer ^5.0.0→^5.1.0), §2.C2 (value ^1.2.0 vs ^1.1.1), §2.G3 (ci.yml glass-idiom-factor re-emit), §2.G4 (3 stale AZ freshness hashes), §2.L15 (net-lift-as-one-number). None caught by a device-free gate; all ride to the irreversible tag. → PT-6.

**G-5 · The live-fix regression protectors (headless-invisible).** §2.T6 (add proof:dock-engine to WS2 gate set), §2.T7 (D-1 constellation parallax-default gate + WS5 preservation note), §2.T5 (D-2→WS9 grain hand-off). These guard ALREADY-LANDED, USER-REPORTED defects (collapse-balloon, lattice-cursor, paper-grain) from silent re-regression. Known fix directions; PASS-2 direct-edit, not a spike.

**G-6 · The canon-home + interleave prose reconciles.** §2.I1 (G3 canon-home → docs/canon/), §2.L13 (B4f grep scope), §2.L14 (proof:claude-deletable into B4f specs), §2.L12 (.githooks/commit-msg writer), the unregistered BG→BH edges (G3→B4b, B0→G3, G7→crossrepo-asks). All bounded/owned/ordering-safe — prose-reconciliation, not sequencing.

**G-7 · The coverage-matrix + dead-file + carve-chain + consumer reconciles.** §2.M2 (5 phantom dock owner-waves + ★★ dock-gallery), §2.L7 (PaletteLayer.vue), §2.L8 (88%-late-paint exposure), §2.U1 (bbnf migration row + sub-token sweep), §2.M1 (ladder/shell carve→WS9 chain re-carve owner), §2.P1 (liquid-morph double-owner), §2.P3 (WS5 atomic-gate), §2.P5 (worm carve assert), §2.L1 (binding-sweep step).

**Not gaps (verified clean / confirmatory):** the WS8-refraction-reads-a-dead-carved-blur worry is FALSE (WS8 samples the field FBO, reads no backdrop-filter token); the `--glass-blur-dock` chain has 0 live internal readers; SOTA shows no shift contradicts the plan (Safari 26.5/26.2 DE-RISK C-SAFARI; value registry confirms the ^1.1.1 floor); the BH [WSn] interleave edges all survive the fold at workstream granularity; `docs/precepts` submodule handling is correct; all workflows batch ≤3.

---

## 4. Prototype tasks (≤6, highest-severity / highest-uncertainty first)

| ID | Mode | Title | Targets |
|---|---|---|---|
| **PT-1** | spec | DAG re-anchor + paint-decouple deadlock fix | §2.D1, §2.D2, §2.D3 (HIGH, live-blocking) |
| **PT-2** | implement | "rides W-REFLECT3" re-home + G8 re-green spike + decoupled-paint adjudication | §2.G1, §2.A1 (HIGH) |
| **PT-3** | implement | WS8 `.glass-lens` reader fan-out enumeration + atomic re-point spike + bg-paint null-guards | §2.G2, §2.A2 (HIGH) |
| **PT-4** | spec | `--glass-key-*` single-source decision + DAG-edge correction | §2.T4, §2.T1 (HIGH) |
| **PT-5** | spec | C-SAFARI `uChromatic` dual-stack reconcile | §2.T2, §2.M4 (HIGH) |
| **PT-6** | spec | Cut-time correctness checklist (device-free-gate-blind) | §2.C1, §2.C2, §2.G3, §2.G4, §2.L15 (MED-at-tag) |

**PT-1 · [spec]** Corrected-approach spec resolving §2.D1 (re-seq G4 to ~0.7 + bind it as an explicit precond of every ladder.css/shell.css-touching WS1/WS3 wave) + §2.D2 (re-derive G4's site-count/dist-identity invariant against the LIVE frontier, accounting for the already-shipped `--dock-surface-blur`) + §2.D3 (make `ready`/`allDone` treat PAINT-PENDING as DONE-for-build-ordering, gate `cutReady` on the union). The structural keystone; un-deadlocks the live frontier and re-anchors G4. Needs a design decision, not a spike.

**PT-2 · [implement]** Worktree spike (`.claude/worktrees/`, docs-only): re-home the ~29 deferral notes onto BG's per-wave self-close model, fix the 2 live G8 violations (EXECUTION-PROGRESS.md:38,113), run `proof:ba-gestalt` to PROVE 0 G8 violations, AND record the adjudication of the decoupled-paint engine vs the gestalt-first-capture P1-P5 precept (keep-decoupled-with-guards vs re-couple). Proves the highest-blast-radius gate contradiction (blast radius 61) is clearable.

**PT-3 · [implement]** Worktree spike: (a) grep the FULL `.glass-lens`/`glass-refract.css` reader set across scripts/ + src/ + demo/ (8 gate files confirmed + Button.vue), classify each by gate tag, draft the WS8 atomic diff that retires the class AND re-points/retires every reader green in one batch — the G4 "9-site" discipline applied to WS8; (b) apply the trivial `bg-paint.wf.js` null-guards (mirror `bg-bh-execute`'s `.catch(()=>null)` + the batched-judge guard). Removes the un-costed WS8 retire risk + the live crash-loop on the longest workflow.

**PT-4 · [spec]** Corrected-approach spec: decide the canonical key representation (KEEP the BD per-axis `--glass-key-{lit,shade}-{x,y}` family the rim reads directly, vs DERIVE per-axis from one `--glass-key-direction` azimuth), eliminate the dual source-of-truth + the banned-angle re-introduction, and correct the WS8←WS9 DAG inversion (WS8 must not read a WS9-minted token). Owed BEFORE WS8/WS9 build; absorbs the §2.T1 dead-knob discipline for this token.

**PT-5 · [spec]** Corrected-approach spec, C-SAFARI-adjacent: reconcile the Tier-1 GLSL operator name + the genuinely-shipped Tier-2 WGSL `chromatic_aberration @ 0.003` (vs planned `uChromatic @ 0.0045` — name AND magnitude), widen the F3 gate fence to cover the WGSL stack, and resolve the §2.M4 `--glass-edge-dispersion` box-shadow→float-uniform type collision. Examines the ACTUAL shipped uniform (`glassShader.wgsl:13/130-132`), not the converge prototype.

**PT-6 · [spec]** Corrected-approach spec for the omissions that ride silently to the irreversible tag: kf peer `^5.0.0`→`^5.1.0` (§2.C1, beside the value.js floor bump) + reconcile BH B1-W2 value floor `^1.2.0`→`^1.1.1` (§2.C2) + the ci.yml `proof:glass-idiom-factor` re-emit (§2.G3) + the 3 stale AZ freshness re-stamp owner (§2.G4) + the budget net-lift-as-one-number (§2.L15). A single cut-time checklist no device-free gate can catch on its own.

**Deferred to PASS-2 direct-edit (not spikes — known fixes):** §2.T6/T7/T5 live-fix protectors (G-5), the §2.I1 canon-home reconcile (G-6), and the §2.M2/U1/M1/P1/P3/P5/L1 reconciles (G-7) are bounded prose/gate-set edits.

---

## 5. passConvergence

**64%.** PASS-1 baseline. The DESIGN is develop-ready (~95% feasible — every lens reports no restart, no feasibility unknown; the friction-awareness is the best in the corpus). EXECUTION-COHERENCE is materially below that: **3 live-blocking structural defects** (PAINT-PENDING≠DONE deadlock, G4 unbound+violated, 2 live G8 violations growing toward 61) + **8 HIGH cross-wave coherence issues** that would mis-execute or stall a resumed run, all reconcilable by spec/spike but none yet reconciled. The 64% reflects strong design + friction-awareness, discounted by the structural-coherence work owed before a resumed execution is safe, with honest PASS-1 headroom for PASS-2 to converge.
