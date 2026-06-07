# AW/H harden — surviving lanes (4/11: aurora+README, h-visual, cross-precepts, cross-traceability)

## Review 1

All README line-number citations verified accurate against HEAD. The README is factually correct and matches the dock/blob idiom (research-backed, planned-AW markers, the gate table, cited references, warm-cream-glass + NCSU-red language, the blob-sibling framing).

I now have everything for the fix-list. Let me compile the adversarial review.

---

## Adversarial review — AW aurora waves (W4–W8) + README

**Verdict on the techniques:** the four core SOTA techniques are SOUND and research-faithful. I verified each against the digest and the live source: structure-tensor minor-eigenvector ETF (digest Lane 8 §2, Lane 2 §7), height-field→normal→relit impasto (Lane 9 §8 — correctly retires the verified `vec3(0.18,0.15,0.11)` rim at `brush.glsl.ts:173-178`), OKLab-rectangular interpolation with OKLCh-hue reserved for rainbow (Lane 2 §6 — W5's §3a triumvirate guards exactly this nuance), and derive-color harmonies/temperature (Lane 3). The Aras cbrt-LMS precompute pattern is correctly preserved. WebGPU is appropriately STAGED (capability-gated, not default), and the options-simplification (≤7 atoms, full schema preserved) is real and DRY (consumes glass-ui `Configurator`/`Collapsible`, no new primitive). All wave line-citations into the live shaders are accurate.

But the planning artifacts have real defects. Fix-list:

```markdown
### BLOCKERS

- {wave: AW.md (master plan) vs all five wave files, severity: blocker} The AW.md §2 wave
  table (lines 105–109) is a COMPLETELY DIFFERENT decomposition than the wave files and was
  never reconciled. AW.md W4="structure-tensor + anisotropic Kuwahara", W5="van-Gogh + OKLCh
  + derive", W6="slim/DELETE overfit knobs", with gates `proof:aurora-structure-tensor` /
  `-oklch-strokes` / `-options-slim` / `-webgpu-gated` / `-interactive`. The wave files put
  ALL four painterly mediums in W4 (gates `-tensor-field`/`-impasto-relight`/`-vangogh-preset`/
  `-oilpastel-medium`), color+derive in W5 (`-oklch-interp`/`-derive-gamut`), and an ADDITIVE
  atom door in W6 (`-atoms-roundtrip`). Every gate name and the W6 philosophy DIVERGE. W6 is
  the sharpest: AW.md says "delete the overfit knobs no preset reads" (a pruning wave); the
  wave file says "nothing removed from AuroraConfig, the atoms are a thin surface over the full
  schema." These are opposite. FIX: rewrite AW.md §2 rows W4–W8 + §1 braid 2 to match the wave
  files (gate names, the four-fold W4 painterly arc, the additive-atom W6), or add an explicit
  "the wave files supersede this table" reconciliation note. A reader cannot trust the plan.

- {wave: AW.W7, severity: blocker} File Bounds path defect. The table (line 47), scope (line
  22, 94), §4a (69), §5, §6, and §11 all cite `src/composables/glass/useWebGLCanvas.ts`, but
  the file is at `src/composables/glass/webgl/useWebGLCanvas.ts` (missing the `webgl/` segment).
  CLAUDE.md confirms the `webgl/` path; the procedural-color row (line 51) correctly HAS
  `webgl/shaders/...`, so the table is internally inconsistent. The `:267` `getContext("webgl2")`
  line is verified correct, only the directory is wrong. FIX: insert `webgl/` into every
  `useWebGLCanvas.ts` citation. An agent given the table path cannot find the file.
```

```markdown
### REFINES

- {wave: AW.W4, severity: refine} ETF lands but LIC is silently dropped. W4's scope-source
  line 12 cites the digest "Lanes ... 8 ... — ETF + LIC", and Lane 8 §2 names "ETF + LIC = the
  real van-gogh mechanism" (the line-integral-convolution noise smear ALONG the flow lines is
  half the cited technique). W4 implements only the ETF orientation half; "LIC" never reappears
  in W4's scope, mechanism, or gate. This may be defensible (LIC is arguably a multi-pass /
  WebGPU operator), but the drop is undocumented — a reviewer reads "ETF + LIC" in the source
  citation and finds no LIC. FIX: add one sentence to W4 §3 (or §10 deferred-folds) explicitly
  booking the LIC smear as a W7 multi-pass fold with rationale, so the citation is honest. (The
  README I wrote already flags this; the wave should too.)

- {wave: AW.W4 / AW.W5 numbering, severity: refine} Inverted open-order. W4 "Opens after AW.W5"
  while W5 is the dependency (W5 lands the OKLCh broken-color seam W4 consumes). The dependency
  direction is sound (W5→W4), but the lower wave number opening AFTER the higher one violates the
  read-order convention and is confusing across the tranche (W6/W7/W8 all also "open after W4+W5").
  The wave-seeds.md had it numbered correctly (OKLCh=W1, tensor=W4). FIX: either renumber so color
  precedes painterly (color=W4, painterly=W5) or add a one-line "numbering note: W5 lands before
  W4 by dependency; the numbers track the painterly-arc grouping, not open order" to both headers.

- {wave: AW.W4 §2 State, severity: refine} Agent-count vs the no-multi-writer rule. §2 declares
  "Agents: 4" but §4a/§4b correctly state they SERIALIZE in ONE worktree (.1→.2→.3→.4, not
  file-disjoint). The WAVE_SPEC §5 form is fine for serial sub-units, but "4 [agents]" without the
  serial qualifier in the State line reads as 4 parallel. FIX: change to "4 serial" in §2 State to
  match §4a (W7 already does this correctly: "3 serial").

- {wave: AW.W6, severity: refine} The `resolveAtoms` home is left unresolved in the spec. §4 line
  51 and §5 both say "`configSource.ts` modify — OR a new co-located `atoms.ts` if configSource.ts
  is the wrong home; record the choice." Leaving the file decision to the agent is a soft scope
  edge — `configSource.ts` exists and is the natural home, but an undeclared create vs modify is the
  kind of ambiguity §4 Disjointness is meant to foreclose. FIX: pick one (recommend a new
  `composables/atoms.ts` — `resolveAtoms` is a pure mapper, not a config-source) and make it a clean
  create, so File Bounds is deterministic.

- {wave: AW.W7, severity: refine} DESIGN.md §2.8 citation is wrong. §2 (precepts), §11, and the
  README-line cite "DESIGN.md §2.8" for the zero-dep posture and "README.md:205" for the WebGPU
  anticipation. DESIGN.md has no §2.8 — the zero-dep rule is §2 invariant 8 ("Single draw, single
  shader, zero deps"); README:205 is an import line inside a code block (the real WebGPU note is
  README:271–274). FIX: cite "DESIGN.md §2 invariant 8" and the correct README anchor.
```

```markdown
### NITS

- {wave: AW.W5 §2 line 11 / AW.W6 line 11, severity: nit} "back-compatible" / "additive on
  DeriveAuroraOptions" framing brushes against the house no-back-compat rule. The waves correctly
  ARE clean (the bell-chroma default is the NEW default; the old linear falloff is a NAMED choice
  `chromaEasing:"linear"`, not a compat shim), but the word "back-compatible" in the Type line
  invites a memory-rule flag. FIX: reword to "the signature is a superset; the prior behavior is the
  named `chromaEasing:"linear"` branch, not a compat alias."

- {wave: AW.W7, severity: nit} "Baseline" wording vs AW.md. The wave file says WebGPU is
  "production-deployable but not yet Baseline widely available" (accurate per web.dev). AW.md W7
  says "Limited Baseline per AV's SOTA crosswalk." Both are defensible but they use different
  Baseline-status vocabulary for the same fact. FIX: unify the phrasing (pick "Limited
  availability / not Baseline-widely-available") across AW.md and the wave so the load-bearing
  deployment fact reads identically.

- {wave: AW.W10 seed (README wave), severity: nit} The seed claimed "the README at README.md
  already reflects this scope" — it did NOT: the pre-existing README forward-referenced
  `deriveScene`/`resolveAtoms`/van-gogh/oil-pastel as shipped-adjacent without "(planned)"
  markers, and `proof:doc-consistency` (which the seed names as the gate) would flag the
  unshipped exports against the live `index.ts`. RESOLVED by this lane: the rewritten README
  marks every unshipped surface "(planned — AW.Wn)", carries the gate table, fixes the §2.8/
  README:205 mis-cites, and adds the blob-sibling framing — all line-refs re-verified against HEAD.
```

**Soundness summary:** techniques CONVERGED (analytic-deriv fBM / curl correctly relegated to perf levers per PATH-FORWARD §6; ETF, impasto, OKLCh+Aras, derive-color, WebGPU-staging, options-atoms all sound and research-faithful). Gates are real and falsifiable — each names a concrete bite-check that re-reds it (verified against the `proof:aurora-space-gamma` template idiom). The two blockers are PLAN-CONSISTENCY defects (AW.md vs wave files; W7 file path), not technique flaws. Fix those two and the arc is execution-ready.

The README is delivered at `/Users/mkbabb/Programming/glass-ui/src/components/custom/aurora/README.md`.

---

## Review 2

Confirmed. H.W3 line 35 says "The XRAY portal hero scale is H.W5/SlideXray's lane" — but SlideXray's mobile/restyle work is owned by **W7/W8**, not W5 (W5 line 50 explicitly disclaims SlideXray as "a separate concern"). This is a stale routing reference: H.W3 misroutes the reader to a wave that disclaims the work. The actual owner is W8.

Also confirmed: H.W1 (dock-consume) is grounded in AW RECAP line 39 + digest line 215 (the dock collapse regression is noted as adjacent/out-of-lane in the digest, but it IS a real cited issue). H.W1 is legitimately a tranche wave even though it's not one of the digest's V1-V6 visual lanes — it's the cross-repo dock-fix consume that the digest flags raises the stakes on.

I have everything I need. Writing the fix-list.

## Fix-list — H VISUAL waves (H.W1–H.W6) adversarial review

**SCOPE NOTE:** The prompt framed this as "six H VISUAL waves," but the tranche has **10 waves (H.W1–H.W10)**. The digest's HIGH-priority XRAY work (H.V3 + the ADDENDUM: H.xray-1/2/3 AI-Nutrition-Label restyle, H.nutrition-mobile) is owned by **H.W7/W8/W9/W10**, not by the assigned six. The six are well-bounded against that split, but the findings below include cross-references into W7/W8 where the assigned waves route the reader.

---

**{H.W2, BLOCKER}** — The cross-repo consume hinge points at a **nonexistent AW wave**. H.W2 cites "AW.W24" for the DeckProgress primitive throughout (`H.W2:6,9,29,31,50,80,105,106` + commit plan). The actual wave is **AW.W16** (`glass-ui/docs/tranches/AW/waves/AW.W16-deckprogress.md`). There is no AW.W24 (AW tops out at W18). A born-RED "consume when AW.W24 publishes" trigger can never fire. Fix: global replace AW.W24 → AW.W16 in H.W2.

**{H.W2, REFINE}** — The 2nd-consumer justification is inconsistent with the AW.W16 it consumes. H.W2 repeatedly claims the ≥2-consumer evidence is "carousel `Progress.vue` (AV.W13) + this deck bar" (`:32,:80,:106,:110`). But AW.W16's actual consumer pair is "a glass-ui demo Deck story (consumer #1) + the slides bar (consumer #2)"; AW.W16's triumvirate trigger explicitly names the carousel as a *latent, not-required* consumer ("named for justification, not a required port this wave"). Fix: restate the muster as "demo Deck story + slides deck bar" per AW.W16's Goal criterion; drop the carousel-as-2nd-consumer framing. (Also note AW.W16 mis-cites slides "H.W1" as the consumer when the progress wave is H.W2 — flag back to AW for symmetry.)

**{H.W4, BLOCKER}** — Same nonexistent-wave class, inverted. H.W4 cites "AW.W16" for the Constellation component (`:6,:9,:30,:32,:53,:84,:99,:104,:109,:110,:114`). The actual Constellation wave is **AW.W17** (`AW.W17-constellation-component.md`); AW.W16 is DeckProgress. So H.W4 hinges on the wrong primitive entirely. Fix: replace AW.W16 → AW.W17 throughout H.W4.

**{H.W4, REFINE}** — The "Do NOT touch the seeded mulberry32 PRNG" bound (`H.W4:55`) collides with the AW.W17 consume direction. AW.W17's hard gate requires the engine to consume **glass-ui's `prng` (`mulberry32`/`hashString`), NOT a private copy**. When the gated consume lands, the slides side MUST drop its local PRNG and read glass-ui's. The current "UNCHANGED — the visibility fix is colours/alphas/anchor" framing is correct for the *unconditional* slides-local arm but contradicts the gated consume arm. Fix: scope the "do not touch PRNG" to the slides-local arm only, and note that the §3.5 consume arm replaces the local mulberry32 with the glass-ui `prng` leaf per AW.W17's gate.

**{H.W6, BLOCKER}** — Third instance of the nonexistent-wave error. H.W6 cites "AW.W24" for the DialogForm/GatePattern (`:6,:9,:32,:34,:36,:57,:75,:89,:106,:111,:116,:117`). The actual wave is **AW.W18** (`AW.W18-gate-pattern.md`, "GatePattern.story.vue ... non-dismissable form-in-dialog idiom"). Fix: replace AW.W24 → AW.W18 throughout H.W6. (AW.W18 also ships an `[aria-invalid="true"]` `.input-pill` ring fix relevant to the gate's invalid state — worth threading into H.W6's consume scope.)

**{H.W1, REFINE}** — `tests/e2e/dock-collapse.spec.ts` is named as **create** (`H.W1:49,66`), but the repo has no `tests/e2e/dock-collapse.spec.ts` and the existing dock-collapse coverage lives in `tests/e2e/deck.spec.ts` / `mobile-layout.spec.ts`. The wave doesn't reconcile the new spec against the existing harness, risking a duplicate. Fix: state whether the morph assertion is a new spec file or an addition to `deck.spec.ts`; if new, justify why it isn't folded into the existing deck e2e (which already drives the dock).

**{H.W1, NIT}** — Header is non-canonical per WAVE_SPEC §1. WAVE_SPEC mandates `# {LETTER}.W<N> - <Title>`; H.W1's header is a descriptive sentence (`# H.W1 — bump to the AW-fixed dock; the slides two-layer collapse works again`) with no `- <Title>` form, and the file opens at `## 2. State` with no §1 header line and no §2a/§Goal label matching the spec's section numbering (it has the content but mislabels). H.W2–W6 follow the same `## 2. State` opening (also technically missing the `# {LETTER}.W<N> - <Title>` canonical header — they use em-dash prose headers). Fix: normalize all six headers to `# H.W<N> - <Title>`.

**{H.W3, REFINE}** — Stale lane routing. `H.W3:35` says "The XRAY portal hero scale is **H.W5/SlideXray's lane**" — but H.W5 explicitly disclaims SlideXray (`H.W5:50`: "SlideXray ... the XRAY mobile full-height is a separate concern; this wave is the complex-GRAPH slides"). The actual owner is **H.W8** (XRAY mobile full-height). `H.W3:55` repeats "SlideXray is H.W5's." Fix: reroute both references to H.W8 (mobile) / H.W7 (restyle).

**{H.W3, NIT}** — The shared portrait-marker recipe (scope 3) offers itself to "Slide08's lane-nodes" as an *optional, must-not-regress* swap. Since Slide08 already correctly converts to `cqi` and is the protected reference, naming it a 3rd consumer is speculative — at HEAD the recipe has exactly 2 real consumers (Conclusion + Slide10). This is fine under the ≥2 rule, but the "consumed by Conclusion, Slide10, AND Slide08's lane-nodes" phrasing (`:32,:44,:69`) overstates the consumer count. Fix: state the recipe ships with 2 real consumers; Slide08 adoption is a non-binding follow-on that must not regress the reference.

**{H.W5, REFINE}** — The Hard Gate's "Slide08 mobile portrait ... **byte-identical** to HEAD" (`:18,:80`) over-constrains. Scope 4 edits Slide08's *landscape* arm in the same SFC; a "byte-identical" file-level diff is impossible (the file changes). The intent is "the `@container (width < 700px)` portrait block is unchanged." Fix: reword to "the Slide08 portrait `@container` block is unchanged (a scoped-block diff, not a file-level byte diff)."

**{H.W5, REFINE}** — Falsifiability gap on the figure-legibility gate. The hard gate asserts "the drift sliver / EKG spike clear a measured minimum figure height" (`:75,:76`) but never states the **born-RED** baseline (the current 14×14px desktop / 40px mobile that must fail the new threshold). WAVE_SPEC §6 + the tranche discipline want the gate falsifiable against the known-broken state. H.W3 does this well ("was 12px"); H.W5 should match. Fix: pin the threshold (e.g. min figure height ≥ Npx per breakpoint) and assert it reddens against the pre-wave geometry.

**{H.W6, REFINE}** — The `deck.css §8` scrim-piercing approach (`:25,:55,:72`) is asserted as the mechanism without confirming `§8` exists / is the right rule. The wave is the 5th serial writer of `deck.css` and the only one piercing a teleported reka-ui overlay node via `:global()`. If `deck.css §8` is not a portal rule, this is a workaround-shaped scope reveal. Fix: verify `deck.css §8` is a portal/close-button rule before asserting it as the pierce site; otherwise name the `:global()` overlay selector as the mechanism and book the §8 claim.

**{H.W2/W3/W4/W5/W6, REFINE}** — The shared-`deck.css`-writer serialization is asserted in each wave ("disjoint regions, one file, serialize") but no wave owns the **ordering contract**. Five waves append disjoint regions to one file with no named sequence or merge owner; "serialize" without a declared order is a latent write-conflict (WAVE_SPEC §4a/Prohibitions: "No hidden cross-wave write conflicts"). Fix: declare the explicit `deck.css` write order (e.g. W2→W3→W4→W5→W6) in one place, or name the orchestrator as the integrator that merges the five regions, in each wave's §4a.

---

**Sound on substance (no blocker):** All six correctly consume rather than re-implement (H.W1 pure re-resolve, H.W2/W4/W6 gate the primitive consume behind AW with a slides-local fallback, no speculative slides-local copies). The de-dock IS correctly treated as already-shipped polish (verified: `DeckView.vue:238` `position:fixed`, `:247` 18%-mix track, `:257` 6px glow — all line-cites accurate). The mobile-reflow, constellation-visibility, graph-aspect, and gate/homepage-lock fixes all trace to real digest findings with accurate file:line evidence (constellation `0.17`/`0.26 t+0.07` edge multipliers, `r=4.2` anomaly, the `4/3` XRAY lock, the portal scheme-leak). DRY discipline and the ≥2-consumer rule are respected. The AI-Nutrition-Label idiom is correctly confined to SlideXray (W7's SCOPE GUARDRAIL) and does NOT leak into the assigned six.

**The blockers are all the same defect:** three wrong/nonexistent AW cross-repo wave numbers (W2→should be W16, W4→should be W17, W6→should be W18; cited "AW.W24" does not exist). Every gated consume hinge in W2/W4/W6 is unfalsifiable until corrected. Fix those three and the gated arms become real.

---

## Review 3

The H tranche (this is the OLD/CLOSED glass-ui H tranche, distinct from the NEW slides H that AW references as its consumer) is internally consistent: its wave table matches its wave files exactly, it has FINAL.md, and it is closed. The H tranche referenced in AW's cross-repo plan (slides H.W1/W2/W4/W10) is a DIFFERENT, slides-repo H tranche — a name collision but not a glass-ui defect. The H tranche under `docs/tranches/H/` is conformant.

I have everything. Compiling the fix-list.

## Conformance fix-list — Tranche AW (the H tranche under `docs/tranches/H/` is CONVERGED; the slides-H referenced by AW lives in another repo and is out of this lane's read scope)

The aurora README obligation assigned to this lane is already discharged: `src/components/custom/aurora/README.md` exists (24.5 KB, research-backed, consumer-facing, correctly cites AW.W4-W8 with the wave-file gate names). No write needed. Findings below are READ-ONLY review output.

---

**{wave: AW.W16 / AW.W17, severity: blocker}** — The charter §2 table and the wave files are SWAPPED. `AW.md:117` defines **W16 = "CONSTELLATION COMPONENT + useCanvas2D"** but `waves/AW.W16-deckprogress.md:1` is **DeckProgress**. `AW.md:118` defines **W17 = "DECKPROGRESS COMPOSITION"** but `waves/AW.W17-constellation-component.md:1` is **Constellation**. The charter's "2nd-consumer unblock" and dependency prose at `AW.md:153-162` ride the swapped numbers. Fix: renumber one pair so charter and files agree (the on-disk dir state — `src/components/custom/constellation/README.md` exists, `deck-progress/` does not — suggests the file-side numbering is the live truth; align `AW.md` §2/§4 to W16=DeckProgress, W17=Constellation).

**{wave: AW.W18, severity: blocker}** — The charter promises a CLOSE wave that does not exist as written. `AW.md:119` defines W18 = "GATE-PATTERN CLOSE + READMEs (LAST)" with `proof:aw-final`, `gates:verify-ci`, the four READMEs, the π visual-runtime lane, and `FINAL.md` citing a green run per wave. The actual `waves/AW.W18-gate-pattern.md` is the access-modal `[aria-invalid]` ring idiom only — it carries NO `proof:aw-final`, NO `gates:verify-ci`, NO π lane, NO README registration, NO `FINAL.md`. No wave file anywhere carries the close ceremony (verified by grep). Per SPEC §Close + AW.md §6 inv-27/π-lane, the tranche cannot close. Fix: author a real close wave (e.g. a W19/close-wave file) carrying `proof:aw-final` + `gates:verify-ci` + the π lane (≥3 viewports, ≥5 frames/toggle, AA contrast, per-story sweep) + `FINAL.md`, and renumber the gate-pattern wave off the "LAST/close" slot.

**{wave: AW.W14, severity: blocker}** — The orphan resolution (D-10, P-inv-7) has NO HOME. `AW.md:115` makes W14 = "DATATABLE SPLIT + ORPHAN RESOLUTION + hygiene" with gate `proof:orphan-resolved` and points at `waves/AW.W14-datatable-split-hygiene.md`. The real file is `AW.W14-datatable-split.md` — DataTable split ONLY (grep confirms zero `orphan`/`instrument`/`glyph`/`metric-cell` content), no `proof:orphan-resolved` gate, and the file does not exist at the cited path. The spot-verified orphan prune (instrument-chassis/rail, glyph-face/disco-glyph, metric-cell/stack) that P-inv-7 + the W0 spot-verify ledger gate is binding for is carried by NO wave. Fix: either restore the orphan-resolution scope + `proof:orphan-resolved` gate into the W14 file (and fix the charter path cite), or open a dedicated orphan wave; the metric-cell/stack hidden-dep surface must precede any prune.

**{wave: AW.W0, severity: blocker}** — The DEV/formalize wave is missing its artefacts. `AW.md:23-25,101` declares AW.W0 as the only DEV wave with gate `proof:aw-w0-reground` requiring `AW.md`+`PROGRESS.md` to exist and the spot-verify ledger recorded. There is NO `waves/AW.W0-*.md`, NO `PROGRESS.md`, and NO spot-verify ledger artefact on disk. The W14 orphan gate explicitly depends on "the W0 spot-verify ledger" that does not exist. Fix: author the W0 wave file + `PROGRESS.md`, and produce the spot-verify ledger (EXISTS + verbatim-rg-count + alias-resolved verdict for every retire candidate) before any retire wave dispatches.

**{wave: charter §2 table (all rows), severity: blocker}** — Every hard-gate NAME in the `AW.md:99-119` table is divergent from the wave files. Examples: W1 charter `proof:dock-collapse-live` vs file `proof:dock-animation-live`; W3 charter `proof:dock-spring-unify` vs file `proof:dock-layering-polish`; W4 charter `proof:aurora-structure-tensor` vs file `proof:aurora-tensor-field`; W6 charter `proof:aurora-options-slim` vs file `proof:aurora-atoms-roundtrip`; W7 charter `proof:aurora-webgpu-gated` vs file `proof:aurora-backend-fallback`+`proof:aurora-wgsl-equivalence`; W9 charter `proof:blob-droplet-material` vs file `proof:blob-smin-normalized`+`-gradient-unit-length`+`-spec-premult`; W16 charter `proof:canvas2d-substrate-consumer` vs file `proof:deck-progress-math`; W17 charter `proof:deckprogress-consumer` vs file `proof:constellation-substrate-single`. SPEC item 5 + WAVE_SPEC §6 require the charter row gate to match the wave's Hard-Gate. Fix: reconcile the §2 table gate column to the canonical wave-file gate ids (the wave files are the more-detailed, born-RED-specified source of truth).

**{wave: AW.W4 ↔ AW.W5 dependency, severity: refine}** — Dependency direction contradicts the charter. `AW.md:106` states "AW.W5 … Opens after W4"; but `AW.W4-aurora-painterly.md:6` states W4 "Opens after AW.W5 (OKLCh color core) lands" and `AW.W5-aurora-color-derive.md:175` lists W4 under **Blocks**. The wave files are self-consistent (W5→W4) and correct (W4's van-Gogh/oil-pastel jitter consumes W5's OKLCh seam). Fix: correct `AW.md:106` to "W5 opens before W4 / W4 opens after W5" and reorder the §2 table narrative.

**{wave: AW.W3, severity: refine}** — Dangling forward-reference to a non-existent wave. `AW.W3-dock-layering-rail-wrap.md:213` lists **Blocks: AW.W23** (the dock README). AW has no W23 — the README is a charter-§2-W18 concern and the README already ships at `src/components/custom/dock/README.md`. Fix: drop the `AW.W23` reference (it is a stale artefact of the digest's 24-wave numbering at `avg-deep-audit-digest.md:199`).

**{wave: AW.W4/W5/W6/W7/W8 vs W1/W2/W3/W9-W18, severity: refine}** — Two incompatible wave-spec section schemas coexist. The five aurora waves use NUMBERED headers (`## 2. State`, `## 3. Scope`, `## 4. File Bounds`, `## 2a.`, `## 3a.`, `## 4a.`) and em-dash titles (`# AW.W4 — …`); the other 13 waves use BARE headers (`## State`, `## Scope`) and hyphen titles (`# AW.W1 - …`). WAVE_SPEC §1 mandates `# {LETTER}.W<N> - <Title>` (hyphen). All sections are present in both forms, so this is cosmetic, not a missing-section defect. Fix: normalize the five aurora headers to the hyphen title + bare-header house form for one canonical schema.

**{wave: AW.W11 / AW.W14, severity: refine}** — Two waves claim the SAME gate name `proof:blob-mood-resolved` with DIFFERENT meaning across the charter/file boundary, and the charter cross-wires it. The charter §2 lists `proof:blob-mood-resolved` for **W11** (AW.md:112) AND the wave file W11 also uses it (consistent). But the charter's W14 row uses `proof:no-god-module`+`proof:orphan-resolved` while the file W14 has neither — so the W14 charter gate names resolve to no wave. Confirm gate-name uniqueness holds in the FILE set (it does — each `proof:blob-*` is single-owned); the defect is only the charter mis-citation already captured above. No separate fix beyond the §2 reconciliation.

**{wave: AW.W15, severity: nit}** — `AW.W15-hygiene.md` exists as a standalone wave, but `AW.md:116` titles W15 "STYLING + COMPOSABLE HYGIENE" pointing at `waves/AW.W15-styling-composable-assay.md` (a path that does not exist) with gate `proof:styling-hygiene` (the file uses grep-based hygiene gates, no single named id). Fix: align the charter cite to the actual `AW.W15-hygiene.md` filename and either add a `proof:styling-hygiene` named gate to the file or drop the charter's named-gate claim.

**{wave: AW.W12, severity: nit}** — Born-RED falsifiability is asserted in prose but the gate is unnamed. `AW.W12-glass-panel-fix.md` Hard Gate is a behavioral computed-style probe ("five distinct `--glass-bg-*`") with no `proof:*` id, while charter §2 names `proof:glass-panel-tiers`. Per AW.md inv-27 (every born-RED gate reddens on inject) the gate should be a registered, named, falsifiable script. Fix: name the W12 gate `proof:glass-panel-tiers` and register it like the other waves' gates so `gates:verify-ci` (the missing close wave) can enforce it.

---

**Adversarial verdict on substance (a-f) for the waves that ARE internally sound:** The aurora arc (W4-W8), blob arc (W9-W11), and component/convergence waves (W12-W18) each (a) trace to a cited RECAP/digest finding, (b) are gestalt/no-legacy (explicit "no parallel path", "RETIRED not flagged-off", "supersedes not keeps-alongside"), (c) are DRY (splice `procedural-color.glsl.ts`, compose `<Progress>`, consume `prng`/`useRAFLoop`/`useIntersectionPause`, no forked fill/PRNG), (d) bind to warm-cream-glass + iOS-26 with NCSU-red consumer-layered and the AI-Nutrition-Label correctly scoped to SlideXray only, (e) carry all WAVE_SPEC sections, (f) are born-RED falsifiable with a stated bite per gate. The ≥2-consumer rule is correctly enforced on every new primitive (DeckProgress, Constellation/useCanvas2D, the gate-pattern-as-composition-not-component, the `twin-line-divider` utility) with named consumer ledgers. **The waves' CONTENT is sound; the defects are charter↔file reconciliation (numbering swap, gate-name divergence, missing W0/close/orphan/PROGRESS/FINAL artefacts) — process-failure-class blockers that prevent an honest close, not substantive design flaws.**

---

## Review 4

I now have a complete and rigorous picture. The traceability has multiple genuine gaps. Let me compile the final fix-list.

Summary of my verification of every FOLD→AW RECAP item:

| RECAP FOLD→AW item | Covering wave | Status |
|---|---|---|
| Dock simple-collapse regression | W1 | COVERED |
| Dock lockstep lag | W2 | COVERED |
| Dock springy/iOS + slider + wrap + rail + README | W3 (README dangling) | COVERED (README orphaned) |
| Aurora van-gogh/oil-pastel/painterly | W4 | COVERED |
| Aurora OKLCh + derive-color | W5 | COVERED |
| Aurora simplify options | W6 | COVERED |
| Aurora WebGPU | W7 | COVERED |
| Aurora interactive | W8 | COVERED |
| Blob droplet (visual) | W9 | COVERED |
| Blob interaction | W10 | COVERED |
| Blob mood | W11 | COVERED |
| Glass-panel "suck" | W12 | COVERED |
| Card toggles broken | W12 | COVERED |
| DeckProgress de-dock | W16 | COVERED |
| Constellation component + visibility/interactive | W17 | COVERED (library half) |
| Gate/DeckGate | W18 | COVERED (bonus, not in RECAP §1 directly) |
| **instrument/glyph orphan resolution** | **NONE** (charter says W14, file doesn't) | **GAP** |
| **metric-cell/stack clean prune** | **NONE** (charter says W14, file doesn't) | **GAP** |
| **W0 spot-verify (prereq for all retires)** | **NONE** (no W0 file, no PROGRESS.md)| **GAP** |
| **styling assay (brittle calc/magic#→tokens, Tabs pill-track, raw-button→ToggleGroup)** | **NONE** (charter W15, file is hygiene-only) | **GAP** |
| **use-token-color real-public-vs-reference split** | **PARTIAL** (W15 adds injection seam only, not the public-vs-reference documentation) | **PARTIAL GAP** |
| **drawer-live-behind audit** | **NONE** | **GAP** |
| **native-top-layer (conditional re-fold)** | **NONE** | minor (conditional) |
| **The 4 READMEs (dock/aurora/blob/constellation) + close-wave** | **NONE** (charter W18=close+READMEs, file W18=DeckGate) | **GAP** |
| **gate-fleet registration + overfitting audit + π lane + FINAL** | **NONE** | **GAP** |

Here is my fix-list.

---

# AW traceability adversarial review — fix-list

The dock band (W1-W3), the aurora band (W4-W8), the blob band (W9-W11), and W12/W13/W16/W17/W18 are each **CONVERGED** against their cited RECAP/digest findings — they trace, are gestalt/no-legacy, DRY (splice the shared chunk / compose `<Progress>` / consume `prng`+`useRAFLoop`), design-cogent, canonical WAVE_SPEC shape, and carry born-RED falsifiable gates. The gaps are concentrated in the **convergence-band numbering collapse** and the **component/orphan/close band (D-10, D-11, styling-assay)**.

### BLOCKERS — uncovered user requests (no wave addresses them)

- **{wave: NEW (charter calls it W19), severity: blocker}** — The **instrument-chassis/instrument-rail + glyph-face/disco-glyph orphan resolution** (RECAP :18-19, digest rows 20-21 → digest names **AW.W19**) has **no covering wave**. Charter `AW.md:115` (§2 W14 row) and `AW.md:45` (§0 D-10) assign it to W14, but the actual `waves/AW.W14-datatable-split.md` scope is the DataTable split ONLY — `grep -in "orphan\|instrument\|glyph\|spot-verify" AW.W14-datatable-split.md` returns **zero**. Fix: author a dedicated orphan-resolution wave (the digest's AW.W19) — migrate-off-and-remove OR keep-and-document each, verdict backed by the spot-verify ledger; OR widen `AW.W14`'s scope + file to actually carry it and rename the file to match the charter's cited `waves/AW.W14-datatable-split-hygiene.md`.

- **{wave: NEW (charter calls it W20), severity: blocker}** — The **metric-cell/metric-stack clean prune** (RECAP :20, digest row 22 → digest names **AW.W20**, with the binding "surface the hidden dep BEFORE the prune" precondition) has **no covering wave**. Same root cause as above: charter folds it into W14, the W14 file omits it entirely. Fix: author the prune wave (or fold into the orphan wave) and make the "hidden dep surfaced first" a born-RED gate clause.

- **{wave: AW.W0 (missing entirely), severity: blocker}** — The **spot-verify DEV wave** that the whole tranche's retire-discipline hangs on does not exist. `AW.md:25` declares "AW.W0 (formalize + spot-verify) is the only DEV wave"; `AW.md:101` gives it a `proof:aw-w0-reground` gate; `inv P7` (`AW.md:233`) makes the W0 spot-verify ledger a binding precondition for every W14 retire — yet there is **no `waves/AW.W0-*.md` file and no `PROGRESS.md`** (`ls docs/tranches/AW/waves/` starts at W1; `ls AW/PROGRESS.md` → No such file). With W19/W20 also missing, the entire retire-gating chain (W0 ledger → W19/W20 prune) is absent. Fix: author the AW.W0 wave spec + create `PROGRESS.md`; it is the prerequisite for the orphan/prune waves.

- **{wave: AW.W18 / charter W18 mismatch, severity: blocker}** — The **close wave (gate-fleet registration + 4 research READMEs + overfitting audit + π visual-runtime lane + FINAL.md) has no covering wave.** Charter `AW.md:119` (§2 W18 row) defines W18 as "GATE-PATTERN CLOSE + READMEs (LAST)" with `proof:aw-final`, `gates:verify-ci`, the four READMEs, the π lane, and `FINAL.md cites a green run id per wave`. But the actual `waves/AW.W18-gate-pattern.md` is a **completely different wave** — the non-dismissable DeckGate access-modal idiom (`proof:input-invalid-aria`). The two share only the string "gate pattern." Consequently: (a) no wave registers the AW gates in `gates.mjs` with `{local,ci,release,sibling}` tags; (b) the **four research-backed READMEs (dock, aurora, blob, constellation)** — an explicit RECAP ask (:45, :69, §4 "the research-backed READMEs", and the user prompt's "the aurora README" lane) — have no producer; (c) no overfitting audit, no π lane, no `AW.FINAL`. Confirmation of the orphaning: `AW.W3:212` dangling-references **"AW.W23"** for the dock README, `AW.W6:145`/`AW.W8:152` reference "the AW aurora README" with no owning wave, `AW.W17:23` defers the constellation README to "the constellation-README brief (NOT this wave's diff)" with no brief-owner wave. Fix: author the real close wave (the charter's W18 / digest-numbering's terminal wave); the DeckGate wave (current W18) is legitimate but must be renumbered out of the W18 slot, and the dock/aurora/blob/constellation READMEs each assigned an explicit producing wave.

- **{wave: NEW styling-assay wave (charter conflates with W15), severity: blocker}** — The **deeper styling assay** (RECAP :81: "brittle calc/magic-numbers, monolithic-vs-colocated, design-idiom localization") has **no covering wave**. Charter `AW.md:116` (§2 W15 row) describes W15 as "STYLING + COMPOSABLE HYGIENE" with a `proof:styling-hygiene` gate covering brittle-magic-number→token tokenization, the **Tabs pill-track sizing**, and the **demo raw-`<button>`→`<ToggleGroup>` re-roll** — and cites a file `waves/AW.W15-styling-composable-assay.md`. The actual file is `AW.W15-hygiene.md`, titled "Colocation + naming hygiene," whose scope is Return-interface naming + `twin-line-divider` DRY + `useTokenColor` injection + DO-NOT-SPLIT comments. The styling half (brittle calc/magic-numbers, Tabs pill-track, raw-button→ToggleGroup, design-idiom localization) is entirely absent; there is no `proof:styling-hygiene` gate anywhere. Fix: author the styling-assay scope as its own wave (or restore it into W15 and rename the file to the charter's cited name).

- **{wave: NONE, severity: blocker}** — The **`/compositions/drawer-live-behind` audit** (RECAP :28, "FOLD→AW — the live-behind composition audit") has **no covering wave** and is **not even named in the charter §0 disposition table** (`grep -in "drawer\|live-behind" AW.md` → zero). It is a silently-dropped user request. Fix: add a disposition row + a covering wave (or fold the audit into W12's component-fix pass with an explicit scope bullet + gate), OR formally close it as no-defect-found with evidence.

### REFINES

- **{wave: AW.W15, severity: refine}** — The **`use-token-color` real-public-vs-reference split** (RECAP :27: "composables-IA refinement — the real-public vs reference split") is only **partially** covered. The actual W15 (`AW.W15-hygiene.md:24`) adds a `useTokenColor` *injection seam* (an optional `resolver` param) — useful, but NOT the asked-for deliverable. The RECAP ask + charter `AW.md:116` ("`use-token-color` documents its public-vs-reference status… name the return shapes, document the reference-only leaves") is the composables-IA disambiguation, which the W15 file's scope and gate omit (`grep "real-public\|reference-only\|public-vs-reference" AW.W15-hygiene.md` → zero). Fix: add a scope bullet + gate clause to W15 (or the new styling-assay wave) that documents `useTokenColor`'s public-vs-reference status, matching the charter §2 W15 gate text.

- **{wave: AW.W3, severity: refine}** — `AW.W3-dock-layering-rail-wrap.md:212` lists `**Blocks**: AW.W23 (the dock README documents the finished animation language)` — a **dangling reference to a non-existent wave** (no W23 exists; max wave is W18). This is the smoking gun that the dock README lost its owning wave in the convergence-band renumber. Fix: repoint to whichever wave actually produces the dock README once the close wave is authored.

- **{wave: charter AW.md §0/§2, severity: refine}** — The charter's **§0 disposition table and §2 wave table assign numbers that do not match the wave files** for the entire convergence band: charter says W16=Constellation, W17=DeckProgress, W18=close+READMEs; files say W16=DeckProgress, W17=Constellation, W18=DeckGate. The charter also folds W19/W20 (orphans) into W14 and W15-styling into W15-hygiene. This is the index/file divergence underlying every blocker above. Fix: reconcile the charter to the realized wave set (re-number, add the missing W0/W19/W20/styling/close rows) — or re-number the files to the charter. Until reconciled, `AW.md:25` ("W1-W18 are IMPL") and `AW.md:91` ("18 waves · 4 bands + close") are both false (there is no close wave; the orphan/spot-verify/styling waves are unwritten).

### NITS

- **{wave: AW.W14, severity: nit}** — The charter §2 W14 row cites the file as `waves/AW.W14-datatable-split-hygiene.md` (`AW.md:115`); the actual file is `AW.W14-datatable-split.md`. Cosmetic path-citation drift, but it compounds the impression that the orphan/hygiene scope "lives" in W14 when it does not.

- **{wave: RECAP :24, severity: nit}** — `/foundations/native-top-layer` is a **conditional fold** ("FOLD→AW *if the demo itself still misbehaves*"). No wave re-verifies it. Low severity (conditional), but a one-line disposition (verified-clean or folded) should close the conditional rather than leaving it open.
