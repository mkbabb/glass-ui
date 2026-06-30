# BG Coherence Re-Spec — PASS 1 SYNTHESIS (research + proto/crit agglomeration)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD (verified):** `6c1f5386` · **Pass:** 1 of N
**Author:** agglomeration agent · **Scope:** READ-MOSTLY; findings only (no src/demo/scripts/CLAUDE.md edits)
**Inputs:** the 8 research lenses → `pass-1-spec.md` (research baseline) + the 6 prototype/critique pairs (PT-1…PT-6)
**Siblings:** verified intact (exit 0) before + after. No path outside glass-ui touched.

> **Baseline re-anchor.** The prior synthesis ran at `4c761b64` (66%, old C1–C14 numbering). This pass re-anchors
> to HEAD `6c1f5386` (+3 commits) and the `pass-1-spec.md` §2.X numbering (8 HIGH / 16 MED / 15 LOW). The proto/crit
> set was re-run at the new baseline; three resolutions materially CHANGE vs the prior pass because the build
> frontier MOVED (now 44 DONE / 7 PAINT-PENDING / 130 PENDING) and two named owner-waves (BH B1-W2/B1-W3) LANDED.

---

## 0. WHAT THIS PASS DID

PASS-1 ran in two halves. The **research half** (8 lenses → `pass-1-spec.md`) established the coherence baseline:
20 friction classes (A–U) with per-class repeat-risk, 39 cross-wave coherence issues (8 HIGH / 16 MED / 15 LOW),
every HIGH claim re-verified directly against `src/` at `6c1f5386`. The **proto/crit half** took the 6
highest-severity issues, drafted a corrected-approach spec (or a worktree spike) for each, and ran an adversarial
critique over each. This synthesis agglomerates both and posts the honest aggregate.

**The single load-bearing result:** every one of the 6 resolutions is **FEASIBLE in direction** (all 6 critiques
confirm the diagnosis and fix-path; NO feasibility restart anywhere), but **none is amend-ready as written** —
every critique surfaced material `mustResolve` opens. Four results carry a verdict that changes the picture vs the
prior pass:

- **PT-1** (DAG/paint-decouple keystone): the §2.D3 "frontier deadlocked NOW" framing is **over-stated** — the
  build has empirically progressed (44 DONE), no build-map wave preconds on a PAINT-PENDING [P] wave today. The
  real live failures are the ungraceful empty-batch terminal + that Part B's OWN new `G4→3.6(PAINT-PENDING)` edge
  would deadlock under the old `=== 'DONE'` code — so Part A (the `doneBuilding` widen) is a **prerequisite for**
  Part B's edge, not a current-freeze cure. The decoupled paint-FAIL recovery path is **undefined across three
  artifacts** (the in-cycle fix loop is dead code; bg-paint leaves FAILs PAINT-PENDING; engine-design.md still
  documents a live fixLoop) → an infinite build-complete↔run-bg-paint ping-pong on any paint FAIL.

- **PT-2** (W-REFLECT3 re-home + G8 re-green): **PROVEN** — the G8a arm reds 2 violations at
  `EXECUTION-PROGRESS.md:38,113`; the re-home flips it GREEN (the operative born-RED 0/10 is separate by design);
  the transcription-safety mechanism (re-home the SOURCE notes in build-map) prevents growth to 61. Adjudication
  = **KEEP-DECOUPLED-WITH-GUARDS** (bg-paint is a per-wave non-authoring engine, NOT BB's single terminal wave).
  BUT a one-file scrub manufactures a NEW multi-source contradiction (EXEC-PROGRESS says per-wave-close while
  build-map D-G2 still defers the 10-roster sweep to WS12); and "W-REFLECT3" is named as the D-G4/D-G6 **proving
  wave** despite NOT being a node in the BG DAG — so the re-home is a semantic reconcile, not a find-replace.

- **PT-3** (WS8 glass-lens fan-out + bg-paint guards): **CONFIRMED + SHARPENED** — 24 unique readers (the build-map
  retire matrix names 3); `proof:button-glass` `[local,ci,release]` (a release CUT-BLOCKER) + `proof:visual-reconcile`
  red on the naive delete; 3 build/published breaks (index.css @import, css-critical manifest, the PUBLISHED
  GlassPanel.vue) are absent from the WS8 *Files*. The bg-paint null-guards are SOLID. BUT the atomic unit is
  WS8.4-SPECIFIC (the retire is ALREADY a 4-wave WS8 decomposition, not one commit); the DEFINITION-ABSENT grep
  scope is unpinned (the surviving gate scripts literally contain the strings); and the proposed independent
  per-gate re-points **re-create the fan-out disease** — they should route through WS8.2's already-minted
  `proof:glass-refract-fence` single-source roster.

- **PT-6** (cut-time checklist): the CT-1..CT-6 **mechanism is sound** and 3 of 5 legs (G3/G4/L15) verify exactly,
  but the **two lead legs analyze a moved tree** — BH B1-W2/B1-W3 are ALREADY in HEAD (`0d6b9f8a`, `ba23c086`).
  C1 is **WORSE than framed** (the glass-ui retarget re-roll is EXCISED; on a kf-5.0.0 consumer the drag NEVER
  snaps to a detent — a broken core gesture, not a degraded refinement), and its named owner (B1-W2) already ran
  WITHOUT the peer bump → the bump must re-home onto an UNRUN wave. C2 is **MOOT** (executed value peer is `^1.0.0`,
  peer-conformance GREEN; `wcagContrastRatio` has zero in-tree callers → the `^1.1.1` floor is unjustified).

PT-4 and PT-5 (both spec, the token-spine single-source decisions) are FEASIBLE with a known direction, but PT-4
**read superseded passes** and would regress the authoritative `SPEC-pass4-converged §0E-1` (it exempts a phantom
`liquid-morph 135deg` that is brand album-art, and proposes a WEAKER sign-coherence invariant than the shared-sourcing
one §0E-1 already mandates). PT-5 is the strongest of the spec four (core claims verify; residual is the build-phase
uniform-value calibration honestly carried over) but recurses its OWN friction once: the supersede instructs a
single-panel WGSL twin while the same wave's M6 gate demands `array<vec4f,8>`.

**Overall aggregate: 68%** (up from 64% research baseline — proto+crit confirmed feasibility, sharpened all 6, and
corrected two over-stated headlines; discounted by 3 live-blocking-class structural issues + 8 HIGH coherence issues
still owed an amend-ready spec).

---

## 1. GROUND TRUTH — re-verified against source this pass (@ 6c1f5386)

| Fact | Verified value | Where |
|---|---|---|
| HEAD (live tip) | `6c1f5386` | `git rev-parse HEAD` |
| HEAD declared in plan | `6369ad6e` (trails by ~3, growing) | AMENDED §10 / FINAL §10 — class-B drift (§2.L2) |
| build progress | **44 DONE / 7 PAINT-PENDING / 130 PENDING** | `EXECUTION-PROGRESS.md` (NOT frozen at 30 — moved this pass) |
| `ladder.css` | **527L** (>500 → R1 close-red LIVE; G4 carve absent) | `wc -l` |
| `dock/shell.css` | **510L** (>500 → R2 close-red LIVE; G4 carve absent) | `wc -l` |
| `dock/shell.css:29` | `--dock-surface-blur: var(--glass-blur-resting)`, consumed `:159` | WS3 3.6 (cd9ce46) **shipped G4's deliverable** |
| `--glass-blur-dock` chain | present in src (`glass.css`, `dark-arm.css`, `bridges.css`); **0 occurrences in `dist/glass-ui.css`** | grep — retirement is dist-neutral |
| `proof:ba-gestalt` G8 | **2 DEFERRAL HITS** (`EXECUTION-PROGRESS.md:38,113`) + operative born-RED 0/10; self-test 16 checks OK | live `node scripts/proof-ba-gestalt.mjs` |
| `rides/W-REFLECT` mentions | EXEC-PROGRESS 10, build-map 7, AMENDED 8, FINAL 4 (~29 TOTAL; only :38/:113 are G8a-form) | grep |
| `glass-lens` reader files | **9 scripts** read `glass-lens`, **13** read `glass-refract`; **24 unique readers** total (gates + src + demo) | grep — WS8 matrix names 3 |
| kf PEER | `^5.0.0` (1078); `^5.1.0` only in devDeps (1116). `DragOptions.snap` ships in 5.1.0 | package.json |
| value.js PEER | `^1.0.0` (1080) — admits npm-latest 1.1.1; peer-conformance GREEN; NOT `^1.2.0` | package.json |
| `useDragMorph.ts:26` | "glass-ui owns NO `decayRest`+nearest-center+`spring.target` re-roll" — relies ENTIRELY on kf-5.1.0 native snap | C1 = LIVE HEAD defect on `^5.0.0` |
| `glassShader.wgsl:13/132` | `chromatic_aberration` `*0.003` (consumer-less pilot, 0 importers) | C-SAFARI ship operator (NOT `uChromatic`) |
| `uChromatic` in `src/` | **ABSENT** (converge-prototype `glass-field-shaders.json` only) | grep |
| `--glass-edge-dispersion` | a CSS **box-shadow** value (`glass-fx.css:305`), consumed AS box-shadow (`surfaces.css:417`) | §2.M4 token-TYPE collision |
| `proof:glass-idiom-factor` | 2 refs in `gates.mjs` (ci-tagged), **0** in `.github/workflows/ci.yml` | §2.G3 drift LIVE |
| BH B1-W2 / B1-W3 | **already in HEAD** (`0d6b9f8a` destraddle, `ba23c086` snap-excise) | git log — re-grounds PT-6 C1/C2 |
| `bg-paint.wf.js` | 4 un-guarded `agent(`/derefs; batched judge no per-agent `.catch` | §2.A2 LIVE crash gap |
| `verify-siblings-intact.mjs` | **tracked** (durable tripwire) · `.claude/settings.local.json` **gitignored** | git ls-files / check-ignore |

---

## 2. FRICTION TAXONOMY — repeat-risk verdict (carried from the spec)

20 classes (A–U); 14 flagged `recurs=true`. The cardinal close-machine + process classes (E/F/H/M/P/S/T) are
well-defended. Repeat-risk concentrates in **three under-reached surfaces**:

1. **The decoupled-paint engine** (class A/Q) — `bg-paint.wf.js` is structurally adjacent to the cured BB
   single-terminal-reflect disease AND un-null-guarded. ADJUDICATED keep-decoupled-with-guards; the residual risk
   is the FAIL-recovery path (undefined) + the cadence (must fire interleaved per-band, never one terminal sweep).
2. **The glass-ui-specific token/binding traps** (class C/K/L/U, all MOD-HIGH) riding the WS3/6/8/9 new-token &
   retire waves — the dead-knob (`--dock-surface-blur` = the exact `--glass-bg-dock` AZ shape), the kf-peer↔snap
   silent no-op, the `.glass-lens` retire fan-out, the `uChromatic`/`chromatic_aberration` dual-stack drift.
3. **C-SAFARI ★★★** (class A/U) — on-device-Metal-bound by design; DE-RISKED by Safari 26.2/26.5, not removed.

CLEAN (no repeat-risk): **P** (rate-wall — all workflows batch ≤3 build / ≤2 paint), **E** (`--emit-ci` codegen
makes drift impossible-not-detected; symptom = the `glass-idiom-factor` un-emit R3 clears), **F** (disposition-live
+ NDA-DECIDE + RESTAMP), **M** (oklab paint-arm tooling fixed; G6 chroma-sensitive), **S** (dep-floor registry-CONFIRMED;
the live crossover is the kf-peer bump owner re-home, not a floor miscalc).

Full per-class table: `COHERENCE.md §2`.

---

## 3. THE 6 RESOLUTIONS — state after proto + critique

Each resolution is FEASIBLE; each carries open `mustResolve` items. Sorted by remaining residual (lowest convergence
= most open). Per-PT convergence is the critique's number.

### PT-1 — DAG re-anchor + paint-decouple deadlock fix (§2.D1/D2/D3 [HIGH, live-blocking class]) — **conv 70%** · SPEC
**Verdict:** core-correct + feasible; every load-bearing wf.js line ref verified exact (byId:86, allDone:87,
ready:100, pendingLeft:153, cutReady:241-247); the `--glass-blur-dock` chain is dist-neutral (0 src readers, 0 dist
occurrences) so G4's retirement arm is genuinely byte-identical; the central reframe is RIGHT — **WS3 3.6 is G4's
PREREQUISITE, not its victim** (3.6's `--dock-surface-blur: var(--glass-blur-resting)` ORPHANS the chain G4 retires,
so G4 lands AFTER 3.6, BEFORE 3.5/WS6/WS9). The five control-flow edits (add `doneBuilding(w)={DONE,PAINT-PENDING}`;
route `allDone`/`ready`/`pendingLeft` through it; split `cutReady` into buildComplete ∧ paintComplete) resolve the
build-ordering + the terminal signal. G4 re-seq 12.0→0.7 + explicit precond edges (belt-and-suspenders: seq controls
pick-priority, precond edges control exclusion) re-anchor the wave.
**Open (mustResolve):**
- **O1 [model gap, dominant]: the paint-FAIL recovery path is undefined and incoherent across three artifacts.**
  bg-bh-execute's in-cycle fix loop is DEAD code (`paintWaves=[]`, L205-233 unreachable); bg-paint on FAIL leaves
  the wave PAINT-PENDING + a `mustFix` DELTA for an UNSPECIFIED external agent; `engine-design.md` STILL documents a
  live in-cycle fixLoop re-entering at BUILDING. Under Part A's two-phase terminal a paint FAIL produces an INFINITE
  build-complete↔run-bg-paint ping-pong with no automated fix injection. A5's terminal log MUST carry an explicit
  FAIL branch (external root re-implement → integrator re-commit → resume) + reconcile engine-design.md. Soften
  "correct either way" → "correct for build-ordering + the terminal signal; paint-FAIL recovery is a PT-2/external
  dependency, not closed here."
- **O2 [honesty]: the frontier is NOT deadlocked now** (44 DONE / 7 PAINT-PENDING / 130 PENDING; NO build-map wave
  preconds on the [P] set). Part A3 is a PREREQUISITE for Part B's new `G4→3.6` edge (it would deadlock G4 under the
  old `=== 'DONE'` code) + cleans the ungraceful empty-batch terminal; `cutReady` fires once bg-paint flips the [P]
  rows, not "never." Re-state §0/§1 + label V-A's deadlock-repro latent/induced.
- **O3 [coverage]:** the spec re-derives only the carve+retire arms (2 of G4's 9 sites). Sites 5-9 + R3 + R4 are
  LIVE-on-disk (no drift) — incl. `proof-glass-cal.mjs:177`'s OWN self-test fixtures that model the dock reading the
  retired chain. State the scope explicitly.
- **O4 [robustness]:** the loader derives `seq` from structural map position, NOT the EXEC-PROGRESS cell — B1/B2 do
  not relocate G4's row out of the Band-0.5/WS7 region, so B3's prompt-pin "seq 0.7" is the SOLE load-bearing source
  (LLM-behavior dependency). Make V-B #1 (dry-run `seq===0.7`) a HARD pre-pick gate; enumerate the surviving
  `G4→P-CLOSE→P-SWEEP` edge so the re-anchor doesn't drop it.
- **O5 [self-consistency]:** §0 "already violated on disk" CONTRADICTS §1's corrected ordering (under "G4 after 3.6"
  the disk state is CONSISTENT, G4 just not-yet-run) — state "at risk once 3.5/WS6/WS9 run." De-literalize V-C's
  exact 470/459 + "all 15 gates"; flip the cursor EXECUTION-ORDER note + build-map ordering prose to "lands early —
  after 3.6, before 3.5/WS6/WS9" (the "before WS1" prose is over-broad; WS1 is file-disjoint and landed).

### PT-2 — W-REFLECT3 re-home + G8 re-green + decoupled-paint adjudication (§2.G1/A1 [HIGH]) — **conv 70%** · IMPLEMENT
**Verdict:** **PROVEN feasible.** Born-RED reproduced (G8 2 hits at :38/:113); the re-home onto BG's per-wave
self-close model flips G8 GREEN (avoids G8b — corpus clean of `gestalt verdict staged|deferred`); a throwaway
`waves/*.md` fixture proved the re-homed phrasings produce 0 hits while a control flags — so re-homing the SOURCE
notes is the structural fix that prevents growth to 61. **ADJUDICATION = KEEP-DECOUPLED-WITH-GUARDS**: bg-paint.wf.js
is a per-wave NON-AUTHORING verdict engine (fresh dual-engine captures, own DELTA, own cursor-flip; P1/P2/P5-compliant),
DIFFERENT in kind from BB's single terminal W-REFLECT3 wave; re-coupling would yield a serialized, Safari-harness-hostage,
agent-doubled build — a WORSE failure surface. Residual chokepoint risk lives in CADENCE + CUT-GATE (fire interleaved
per-band; gate cutReady on the painted union; the null-guards) — NOT the verdict structure.
**Open (mustResolve):**
- **H1 [cross-file lockstep]:** re-homing EXEC-PROGRESS:38 ALONE strips its "WS12 late capture sweep" target while
  `bg-build-map.md` D-G2 (:952) + :544 STILL defer the 10-roster sweep to WS12 → after a one-file edit the two files
  CONTRADICT (a NEW instance of the multi-source-disagreement friction the fix kills). Apply the re-home **atomically
  across both files**.
- **H2 [build-map source semantic reconcile]:** the build-map carries 7 W-REFLECT3 refs (the transcription source for
  the 61 forward [P] waves) and names "W-REFLECT3" as the D-G4/D-G6 **proving wave** — but NO W-REFLECT3 node exists
  in the BG DAG (WS1→…→WS12). Re-home ALL 7 (rides forms + proving-wave refs); decide which REAL wave proves each
  deferral — a semantic reconcile, not a verbatim swap.
- **H3 [WS12 disambiguation]:** §4 guard(b) "interleaved per-band, never one terminal end-sweep" CONTRADICTS the
  build-map's WS12 `BG.W-PAGE-COMPONENT-AUDIT` (480-capture POST-INTEGRATION, precond "WS1–WS11 ALL LANDED") + D-G2.
  Declare whether WS12 is a final whole-congruence audit (legitimate, ON TOP of per-wave paint) or a roster-paint
  backlog-drain (the BB disease) + reconcile D-G2 to match guard(b).
- **H4 [mint ONE canonical phrase]:** the hand-off cites "PT-1's Bucket A/B/C/D table" as authoritative, but PT-1's
  proto SUPERSEDED that table and handed re-home ownership to PT-2 → no canon exists on disk; ≥3 benign variants
  already float below the G8a teeth ("the wave's own paint-close", "the wave's OWN close", "decoupled-paint close").
  Pick one, retire the stale citation, apply it across EXEC-PROGRESS + build-map + AMENDED + FINAL (leave forensic
  citations in `converge/**` SPEC docs — G8a-exempt).
- **filing collision:** `pass-1-proto-PT-2.md` holds a STALE prior-pass G4 spec; PT-2's actual content is in
  `pass-1-proto-PT-2-reflect3-rehome.md` (worktree) — PASS-2 must reconcile the filename slot.

### PT-3 — WS8 glass-lens fan-out + bg-paint null-guards (§2.G2/A2 [HIGH]) — **conv 82%** · IMPLEMENT
**Verdict:** **CONFIRMED + SHARPENED against the actual build-map gate clause.** 24 unique readers (12 gate scripts +
9 src + 3 demo; gates.mjs is a 13th note-bearing reader the resolver itself missed). The naive `glass-refract.css`
delete REDs `proof:button-glass` `[local,ci,release]` (a release CUT-BLOCKER — B4 `filterSupportsGated` proven
true→false on delete) + `proof:visual-reconcile` (a1), AND breaks the build (live index.css `@import`), the
css-critical partition manifest, and the PUBLISHED `GlassPanel.vue` (imports the §4-deleted `useGlassRenderer.ts`).
The re-point target `useGlassRefraction.ts` IS minted (WS8.2 *Files*) and sequenced BEFORE the retire (WS8.4) — the
atomicity precond HOLDS, NO restart. The `bg-paint.wf.js` null-guards are CONFIRMED solid at all 4 cited sites (L40
pp, L43/45 pipe, L51 batched judge, L54 report) — patch mirrors bg-bh-execute, needs no further hardening.
**Open (mustResolve):**
- **H1 [atomic-unit re-scope]:** the retire is ALREADY a 4-wave WS8 decomposition (8.1 SUFFUSE-UNIVERSAL retires the
  3-gate matrix + folds useSpecularPointer; 8.2 REFRACT-WEBGL mints useGlassRefraction; 8.4 SOTA-LADDER deletes the
  files). State the precise atomic unit = {glass-refract.css delete + Button/surfaces re-point + proof:button-glass
  B4 + proof:visual-reconcile a1 + index.css @import + critical-partition + GlassPanel + useGlassRenderer/useSpecularPointer
  deletes + barrel} co-landing in **WS8.4 specifically** — so the §2.P3 transient-red argument scopes correctly and
  WS8.1's retire is not dragged forward.
- **H2 [grep scope pin]:** the SOTA-LADDER "DEFINITION-ABSENT grep (src+demo+scripts)" is unpinned, but the surviving
  gate scripts LITERALLY contain `glass-refract`/`glass-lens` as paths+regexes → decide whether the grep reds on them
  (forcing the gate-script re-points as a side-effect) or excludes scripts/ (a false-green on source absence too).
  Reconcile the grep with the explicit gate-set add.
- **H3 [canonical roster, no self-repeat]:** produce ONE canonical disk-grep reader roster as source of truth; fold
  gates.mjs (4 surviving `note:` strings) into the §4 doc-reconcile; fix the resolver's internal count inconsistency
  (§0 "17 unique files" vs §1 "24 enumerated"). The enumeration cannot itself repeat the under-enumeration disease.
- **H4 [NEW friction-class repeat — the explicit harden]:** route the surviving consumer-gates' refraction assert
  THROUGH WS8.2's already-minted single-source-of-truth (`proof:glass-refract-fence`'s "5 GL refraction sites
  enumerated at build" roster), NOT independently frozen-string-matching per gate — so WS8.5 LIQUID-TRANSITION (adds
  a 2nd `--glass-btn-press-t` reader) and future GL evolution do not re-trigger the multi-gate fan-out.
- **H5 [build-map *Gate* set]:** add proof:button-glass, proof:visual-reconcile, proof:safari-webgl,
  proof:liquid-glass-tokens, proof:css-critical, proof:no-dead-token, typecheck to the WS8.4 *Gate* — the published
  "§3.1 retire matrix GREEN + DEFINITION-ABSENT grep" is necessary-not-sufficient (proof:button-glass [release]
  reds on the deleted file while the declared gate greens). proof:button-glass + proof:visual-reconcile appear
  NOWHERE in the build-map today.

### PT-4 — `--glass-key-*` single-source + WS8←WS9 DAG-edge correction (§2.T4/T1 [HIGH]) — **conv 55%** · SPEC
**Verdict:** diagnosis SPINE is sound + on-disk-verified (the R = per-axis sign family `--glass-key-{lit,shade}-{x,y}`
read DIRECTLY by the rim vs F = `--glass-key-direction` cast-RATIO feeding under-shadow/grain are genuinely-distinct
conventions; the DAG-edge correction — strike the false "WS8 bevel reads F" prose at build-map:692 + FINAL.md:418,
WS8 runs BEFORE WS9 — is the single highest-value bounded fix; anchor drift 430-432→434-436 confirmed; F is
plain-custom not @property; the banned-angle claim is overstated, F:-0.375 applies via `calc(px*ratio)` with no CSS
trig). **BUT the spec read SUPERSEDED passes** and 3 amendments would REGRESS the authoritative `SPEC-pass4-converged §0E-1`:
**Open (mustResolve) — three would land WRONG:**
- **FAIL-1 [phantom]:** the `liquid-morph 135deg` "third azimuth" DOES NOT EXIST — `liquid-morph.css:190/463/734`
  are `.liquid-pill-album` FAKE ALBUM-ART brand-gradient fills, NOT key-light registers (§0E-1 already grep-DEMOTED
  them). DROP the entire §3.D EXEMPT + §6/§8 liquid-morph thread.
- **FAIL-2 [the friction-class REPEAT]:** PT-4's proposed A6 invariant (hemisphere-SIGN coherence: signs agree,
  magnitudes may differ) is WEAKER than + CONTRADICTS §0E-1's shared-SOURCING invariant (each register calc-derives
  from ONE canonical `--glass-key-*` spine). PT-4's sign-check PASSES an un-sourced literal with the right sign —
  re-opening the exact split-brain fork it claims to fix. REPLACE with §0E-1's shared-sourcing form.
- **FAIL-3 [fabricated wiring]:** §3.A's "bevel upper-edge ← `--glass-key-lit-y`, lower-edge ← `--glass-key-shade-y`"
  FIGHTS WS8's M7 bottom-edge DEcoupling (WS8 re-points `--glass-rim-bottom` UNDER the new bright-bloom `--glass-bevel-*`
  tokens, AWAY from `--glass-key-shade-y`). DROP the positive clause; keep only the negative "bevel does NOT read F."
- **DECISION (keepable):** KEEP-BOTH-as-siblings bound by a shared-sourcing invariant (NOT the false KEEP-vs-DERIVE
  binary — R needs an edge-SELECT sign at cel-45°, F encodes the fill-lean magnitude at 20.56°; neither cleanly
  derives the other). Add the §2.T1 substitution-trap note (under-shadow composed at :root → descendant override
  needs re-declaration; F plain-custom = no @property de-registration risk).
- **cross-wave:** note THREE waves touch glass-fx.css in disjoint regions (WS3 TINT-UNIFY tint-bias, WS8 bevel, WS9
  key spine), WS3 first. Re-target ALL WS12 edits from SPEC-pass4 §0 to the authoritative §0E-1. Reconcile the
  redundancy with the WS9 M3 numeric lock (azimuth==token). Resolve the `crit-PT-4-pass1.md` filing collision (it
  still holds the mis-filed uChromatic/PT-5 crit).

### PT-5 — C-SAFARI uChromatic dual-stack reconcile (§2.T2/M4 [HIGH]) — **conv 74%** · SPEC
**Verdict:** **the strongest of the spec four.** Every load-bearing on-disk claim verifies: shipped
`glassShader.wgsl:13/132` = `chromatic_aberration @ 0.003` (consumer-less pilot, 0 importers); GLSL source-of-truth
= `uChromatic @ 0.0045`; stray `glassShader-tier2.wgsl` = `0.004`; `--glass-edge-dispersion` IS a box-shadow consumed
AS box-shadow (the §2.M4 type collision is real); `--glass-chromatic-strength` absent (token to mint, the §18
@property convention); `proof-safari-webgl.mjs` scans ZERO WGSL (the WGSL stack is genuinely unfenced); prior G1
carries "maps directly to uChromatic" + never examines shipped 0.003. The fix (canonical concept "thin-rim chromatic
dispersion" + per-language spelling map + a NAMED `CHROMATIC_SCALE` const pinned 0.0045 in BOTH shaders + F3 widened
dual-stack F3a-d + mint the scalar `--glass-chromatic-strength` separate from the Tier-0 box-shadow + WS8 §4 supersede
of the stale pilot) is genuine +substance and amend-ready in the main. The build-phase uniform-value/ε calibration +
on-device Metal parity are honestly carried over as deferred (as prior G1 recorded).
**Open (mustResolve):**
- **[the friction-class REPEAT]:** §6's supersede instructs authoring the WGSL twin "fresh from the GLSL
  source-of-truth" (single-panel) while the SAME wave's M6 WGSL-shape gate (build-map:652-653) requires
  `array<vec4f,8>` → executed literally the supersede builds a single-panel WGSL that REDS its own M6 gate. Specify
  the twin is authored MULTI-panel (looping the single-panel GLSL rim+chromatic math), declare the panel-iteration
  divergence INTENTIONAL, scope the cross-stack rim-fringe parity π to a single panel rendered both ways.
- **[path pin]:** §1 Inputs + §7 amendment table cite bare `bg-build-map.md` under an `audit/` Inputs list, but the
  file is at `execution/bg-build-map.md`; the near-twin defect sentence in the archived G1 (`resolve-G1-csafari.md:35`)
  must be left as-is so an agent doesn't amend the superseded pass. Also fix the Files-path defect (build-map:649
  names `src/glassShader.wgsl`; the real path is `src/composables/glass/webgpu/glassShader.wgsl`).
- **[honesty seam]:** §4 bakes `--glass-chromatic-strength` initial-value 0.25 as "the K2-centre" though the algebra
  is valid ONLY at `uRefractionStrength=1` and §10 defers exactly that calibration. Set initial-value 0 (the
  no-fringe degrade floor, mirroring `--glass-level`) OR mark 0.25 PROVISIONAL/keystone-owned.

### PT-6 — Cut-time checklist for the device-free-gate-blind omissions (§2.C1/C2/G3/G4/L15 [MED-at-tag]) — **conv 45%** · SPEC
**Verdict:** the CT-1..CT-6 **mechanism + the 3 sound legs (G3/G4/L15) are amend-ready**; the two LEAD legs (C1/C2)
are built on **stale plan text the execution already overtook** — the proto commits the very friction-class it exists
to kill. G3 CONFIRMED (`--emit-ci` adds exactly `proof:glass-idiom-factor`, ci-tagged @1503, absent from ci.yml;
build-map:451 OVER-claims emit also adds `proof:category-card-warm` which is `[local]`-tagged so it can't). G4
CONFIRMED EXACT (3 AZ delta hashes stale, gate `[local]` exit 1 reds `--run full`; RETIRED-SUPERSEDED banner discharge
correct, gated AFTER WS2∧WS5). L15 CONFIRMED (BUDGETS walks 6 chunks; WS6 siri + WS8 refract chunks absent).
**Open (mustResolve) — the two lead legs are WRONG vs HEAD:**
- **C1 RE-GROUND [load-bearing]:** BH B1-W2 + B1-W3 are ALREADY in HEAD (`0d6b9f8a`, `ba23c086`). The proto's benign
  framing ("snap silently no-ops, the C1 fling still works") is the BB-era code — at HEAD `useDragMorph.ts:26` says
  glass-ui owns NO retarget re-roll, relying ENTIRELY on kf-5.1.0 native snap → on a kf-5.0.0 consumer the drag NEVER
  snaps to a detent (a BROKEN core gesture). Re-home the kf peer bump (`^5.0.0`→ floor ≥5.1.0) onto an UNRUN wave
  (BG close-fix / BG.W-CUT) — B1-W2 is CLOSED and cannot be the owner. Treat C1 as a LIVE HEAD defect.
- **C2 MOOT/UNSUPPORTED:** the executed value peer is `^1.0.0` and peer-conformance is GREEN; `wcagContrastRatio` has
  ZERO in-tree callers → the `^1.1.1` floor is unjustified. DROP C2-fix-#1 (no `^1.2.0` peer exists) + C2-fix-#3 (no
  `proof-field-aurora` gate exists). Decide explicitly: leave `^1.0.0` (recommended) or justify any narrowing against
  a real in-tree API call. The PINNED_LATEST.value=1.2.0 vs dist-tag 1.1.1 is INERT at `^1.0.0` (pre-emptive hygiene,
  not a current defect).
- **CT-2 self-contradiction:** the grep "no `^1.2.0` literal in package.json scripts/" would FALSE-RED on
  `PINNED_KEYFRAMES_VALUE_DEP=^1.2.0` (`proof-peer-conformance.mjs:46`) the proto itself says to KEEP. Re-scope CT-2
  to the value.js peer/dev KEYS only.
- **mechanism KEEP:** the checklist + the gate-hardening (fold CT-1/CT-3/CT-6 INTO `proof:peer-conformance` /
  `profile:budget` so they are machine-enforced, not a human remember-list) + C1's gate-blindness root cause
  (peer-conformance checks `satisfies(latest, range)`, never floor≥API-version) + the honest per-cause-not-aggregate
  precondition (the full `--run ship` is blocked at HEAD by UNRELATED reds outside PT-6's scope).

---

## 4. THE LOWER-SEVERITY ISSUES (the §2 MED/LOW + the convergence gaps) — diagnosed, routed, NOT prototyped

These were not in the 6-PT set; PASS 2 owes them a resolution prototype or a PASS-2 direct-edit. Grouped by the
spec's convergence-gap buckets:

- **G-5 · live-fix regression protectors (PASS-2 direct-edit, known fixes):** §2.T6 — add `proof:dock-engine` to
  WS2's per-wave gate set so DOCK-MORPH-UNIFY can't silently kill D-3's directional `--dock-expand-t` read; §2.T7 —
  D-1 constellation parallax-default preservation note in WS5 VIZ-DEMIGRATE + a one-assert standing gate; §2.T5 —
  WS9 GRAIN-REAL owns the D-2 demo-local warm-substrate hand-off (double-warm). These guard ALREADY-LANDED,
  USER-REPORTED defects (collapse-balloon, lattice-cursor, paper-grain) from silent re-regression.
- **G-6 · canon-home + interleave reconciles (bounded, ordering-safe):** §2.I1 — reconcile G3 canon-home to
  `docs/canon/` (not `docs/tranches/BG/canon/`) + register the G3→B4b edge; §2.L13 — B4f naive-grep delete-gate
  scope ≠ B5c hard-reader cleanup (crossrepo-asks double-touched); §2.L14 — `proof:claude-deletable` absent from BH
  B4f specs; §2.L12 — `.githooks/commit-msg` shared B0→G3 writer (G3 EXTENDS, doesn't clobber) + the unregistered
  BG→BH edges.
- **G-7 · coverage-matrix + dead-file + carve-chain + consumer reconciles:** §2.M2 — 5 phantom dock owner-waves
  incl. the ★★ dock-gallery directive homeless in the executable plan; §2.L7 — PaletteLayer.vue dead file
  unscheduled; §2.L8 — ~106/120 pages have binding paint ONLY in the late local-only WS12 sweep; §2.U1 — bbnf-buddy
  `--glass-blur-dock` external override silent no-op owed a B7 migration row + sub-token deep-grep; §2.M1 —
  ladder/shell carve→WS9-grain re-point chain with no post-WS9 re-carve owner (R1/R2 re-open risk); §2.P1 —
  liquid-morph.css double-owned (3.11 vs 12.1); §2.P3 — WS5 6.3/6.7 "ONE atomic gate" transient-RED under the
  file-disjoint batcher; §2.P5 — goo-morph worm carve binding-presence assert + don't defer the paint to the very
  end; §2.L1 — a reka/kf binding-verification sweep on the bumps.
- **LOW residue (§2.L2-L16):** plan-header HEAD drift; foreign-tree deny-belt gitignored; B4f not gated on W-CUT
  (safe by WS12-LAST + user gate); D-G2 conflation (480-capture vs 10-roster); WS3 GLASS-DYNAMICS squircle
  strengthen then WS8 retire (wasted-work); BH B7 frozen symbol/key count vs SiriIsland (+/siri-island → self-correcting);
  speedtest `.glass-refract` 4.1.0-stale binding; contrast-color() doc-window omits Firefox 146.

---

## 5. CONVERGENCE — honest aggregate

| Component | Conv | Note |
|---|---|---|
| Diagnosis (§2 issues, friction A–U) | ~88% | independent lenses cross-confirm; every HIGH claim verified vs `src/` @ 6c1f5386; 2 over-stated headlines (D3-deadlock, C1-benign) corrected |
| HIGH resolutions (PT-1…PT-5) | ~70% avg | (70+70+82+55+74)/5; PT-4 would regress §0E-1 as written; PT-1's FAIL-recovery undefined; PT-3 strongest |
| Cut-time checklist (PT-6) | 45% | mechanism + G3/G4/L15 sound; C1/C2 lead legs analyze a moved tree |
| Lower-severity (G-5/6/7 + LOW) | ~50% | diagnosed + routed; G-5 are PASS-2 direct-edits, the rest owe a prototype |
| **Overall aggregate** | **68%** | up from 64% research baseline — proto+crit confirmed feasibility, sharpened all 6, corrected 2 over-stated headlines + re-grounded PT-6's lead legs; every resolution still carries material opens |

**readyToDevelop = FALSE.** Three structural defects of the live-blocking class (G4 mis-anchoring, the
PAINT-PENDING≠DONE build-ordering + undefined paint-FAIL recovery, the 2 live G8 violations) + 8 HIGH cross-wave
coherence issues are owed an amend-ready spec. NO coherence issue is a feasibility blocker — all are addressable
plan-amendments — but a resumed execution as-is would mis-execute (PT-4's regression, the WS8 fan-out, the
kf-peer no-op) or stall (the empty-batch terminal, the paint-FAIL ping-pong).

---

## 6. PASS 2 FOCUS (the handoff)

Re-spec each resolution with the crit `mustResolve` items folded in, **priority order by residual + blast radius**:

1. **PT-6 / §2.C1+C2** — RE-GROUND against HEAD: B1-W2/B1-W3 are landed; re-home the kf-peer bump onto an UNRUN wave
   (C1 is a LIVE broken-gesture defect, not a degrade); DROP the moot value `^1.1.1` floor (executed `^1.0.0` is
   GREEN, no in-tree caller); re-scope CT-2 off the KEEP'd `PINNED_KEYFRAMES_VALUE_DEP`; keep the mechanism + the
   3 sound legs (G3/G4/L15) + the gate-hardening fold.
2. **PT-4 / §2.T4** — DROP the phantom liquid-morph thread; REPLACE the sign-coherence A6 invariant with §0E-1's
   shared-SOURCING form; DROP §3.A's fabricated bevel-reads-R wiring (keep the negative); re-target ALL WS12 edits
   to the authoritative `SPEC-pass4-converged §0E-1`; KEEP the DAG-edge deletion + anchor corrections + KEEP-BOTH
   decision + substitution-trap note; resolve the `crit-PT-4-pass1.md` filing collision.
3. **PT-1 / §2.D1+D2+D3** — add A5's explicit paint-FAIL branch + reconcile engine-design.md's stale fixLoop (soften
   "correct either way"); re-state the frontier is NOT deadlocked now (Part A3 is a prereq for Part B's edge); make
   the dry-run `seq===0.7` a HARD pre-pick gate; reconcile §0 "already violated" vs §1's corrected ordering; flip the
   over-broad "before WS1" prose.
4. **PT-2 / §2.G1** — LOCKSTEP the re-home across EXEC-PROGRESS + build-map (D-G2/:544); semantically reconcile the 7
   build-map W-REFLECT3 refs (the D-G4/D-G6 proving wave is a phantom — name the real wave); disambiguate WS12
   (final congruence audit vs roster backlog-drain) + reconcile D-G2 to guard(b); mint ONE canonical phrase under
   PT-2 ownership; reconcile the proto filename slot.
5. **PT-5 / §2.T2** — specify the WGSL twin MULTI-panel (`array<vec4f,8>`) so it doesn't red its own M6 gate; pin
   the build-map amendment path (`execution/bg-build-map.md`) + leave the archived G1 as-is; mark
   `--glass-chromatic-strength` initial-value 0/provisional; KEEP the dual-stack name-map + CHROMATIC_SCALE const +
   F3a-d + the §2.M4 scalar/box-shadow split.
6. **PT-3 / §2.G2** — re-scope the atomic unit to WS8.4 specifically (not the whole 24-reader fan-out in one commit);
   pin the DEFINITION-ABSENT grep scope; produce ONE canonical reader roster (fold gates.mjs); route the surviving
   consumer-gates THROUGH `proof:glass-refract-fence`'s roster (don't re-scatter frozen strings); add the WS8.4
   *Gate* set. (Highest conv — folds fastest.)

**Plus prototype/direct-edit the un-prototyped:** G-5 (the 3 live-fix protectors — PASS-2 direct-edit), G-6 (canon-home
→ `docs/canon/`, the interleave reconciles), G-7 (the coverage-matrix/dead-file/carve-chain/consumer reconciles).

**Method note:** sibling-greps use arrays + `--exclude-dir` for consumer `dist`/`test-results`/`trace` from the
start. Verify shader-fence uniforms + WGSL targets against `src/` AND the file WS8 §2 actually lands, never the
converge-prototype JSON. Verify every "owner wave" against `git log` — two PT-6 legs analyzed a wave already in HEAD.

---

## 7. VERDICT

PASS-1 is complete: the coherence baseline is established at HEAD `6c1f5386` and the 6 highest-severity resolutions
are feasibility-confirmed + one critique-round deep, lifting the aggregate to **68%**. The BG plan remains the most
friction-aware tranche in the corpus; **no coherence issue is a feasibility blocker** — all are addressable
plan-amendments. The work that remains is to fold the critique `mustResolve` items into a second-pass re-spec, with
two threads leading because they re-bit the friction classes they target: **PT-6** (its two lead legs analyze a moved
tree — B1-W2/B1-W3 already landed, C1 is a live broken-gesture defect, C2 is moot) and **PT-4** (would regress the
authoritative `SPEC-pass4-converged §0E-1`). PT-2's G8 re-green is PROVEN; PT-3's diagnosis is CONFIRMED + sharpened;
PT-1's reframe holds but its paint-FAIL recovery is undefined; PT-5 is the strongest spec and amend-ready bar one
self-recursion. The decoupled-paint engine is ADJUDICATED keep-decoupled-with-guards (interleaved cadence + union
cut-gate + null-guards), NOT re-couple.

Living master: `COHERENCE.md`. Baseline + proto/crit established for PASS 2.
