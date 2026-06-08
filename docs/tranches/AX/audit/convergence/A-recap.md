# A-recap — precept + prompt recapitulation (ADDRESSED/PARTIAL/UNADDRESSED matrix)

**Lane** A-recap · **Verdict** audit-note (one precept-violation flag, already wave-covered) ·
**id** A-recap

This lane is the meta-audit: did the AX session honor every binding precept (CLAUDE.md design
axes + the 14 memory-feedback files) and address the user's recurring asks? It does NOT re-derive
any defect's source fix — it cross-checks the SESSION against its own governing rules, flags any
violation, and confirms each flag is either already wave-covered or net-new. Read in full: all 14
memory feedback files, CLAUDE.md design axes, the AX defect ledger, PROGRESS.md, the project_ax_tranche
memory, and the sibling convergence files (A-waves-dock as the wave-set exemplar).

---

## 1. Precept matrix — CLAUDE.md design axes + memory feedback

| Precept | Source | Session status | Evidence |
|---|---|---|---|
| **Token-first** (var(--token), never hsl(var())) | CLAUDE.md axis 1 | **PARTIAL — ONE violation, wave-covered** | 3 live `hsl(var(--background) / α)` reads in `animations.css:354,361,363`; `--background`→`--neutral-0`=`hsl(48 12% 98%)` (a COMPLETE color) → nested-hsl is invalid CSS, the dialog scrim NEVER dims. Already owned by **W20 RED-witness-1** with the exact `color-mix(in srgb, var(--background) …, transparent)` fix. See §3. |
| **Component-over-class** | CLAUDE.md axis 2 | ADDRESSED in plan | D13's `<DockSeparator>` promotion (A-waves-dock), W20 card-toggles, W21 metric reconcile all honor it. |
| **Visual-load-bearing-ness (≥2 consumers OR exported OR demo-private)** | CLAUDE.md axis 3 + overfitting-audit | ADDRESSED in plan | W19/W20/W21 prune the substrate-without-consumer primitives (glass-panel, header-ribbon, native-top-layer 1-consumer orphan); W33 runs the closing overfitting audit. |
| **No tranche-letter shadow execution** | CLAUDE.md axis 4 | ADDRESSED | All work under `docs/tranches/AX/` with plan + PROGRESS + per-wave specs. |
| **Hardened agent git clause (agents never stage/commit/checkout)** | CLAUDE.md axis 5 + tranche-format | **PARTIAL — 2 self-reported breaches, recovered** | W10+W17 agents "left work UNCOMMITTED in worktrees (misread the git clause)"; orchestrator committed in-place + cherry-picked clean (project_ax_tranche). No clobber of `docs/precepts` (held invariant). The breach was orchestrator-absorbed, not shipped. |
| **vueuse-FREE root barrel** | CLAUDE.md axis 6 | ADDRESSED (no regression) | No AX wave re-exported a vueuse-bearing symbol into the root barrel; `proof:resolution` GREEN through the bands. |
| **No backwards-compat / clean breaks** | feedback_no_backwards_compat | ADDRESSED | W05 EXCISED `--ease-apple-spring` (no alias); W20 ROOT-FIXES the bad token (no shim); W14 EXCISE (no legacy WebGPU path). |
| **Presets in consumers** | feedback_presets_in_consumer | ADDRESSED | Library defaults evolved in `src/styles/*` (W22 font register, W17 constellation tokens, W09 specular); no preset menagerie added to the lib. |
| **Writing style (no grandiloquence, em-dash unspaced, name the thing)** | feedback_writing_style | PARTIAL | Wave specs + PROGRESS are dense/jargon-heavy ("engine", "ledger", "quiet" appear as prose nouns the style note flags) but this is internal tranche scaffolding, not a shipped doc; READMEs (dock/aurora/blob) are the shipped surface and want the W33 conformance pass. Not a blocker. |
| **Gestalt redesigns over patches** | feedback_architectural_approach | ADDRESSED (headline) | W01 ONE `--dock-morph-t` scalar (not "add transitions to 3 classes"); W02 one-orchestrator DI; W07 var<storage> not a per-field workaround. The two cardinal cases are textbook transpositions. |
| **Tailwind-first (@theme/@utility, never raw CSS)** | feedback_tailwind_first | ADDRESSED | W22 font register via @theme; no raw-CSS bundle paste observed. |
| **Analyze in full** | feedback_analyze_in_full | ADDRESSED | 4 SOTA research corpora (liquidglass 492KB, aurora 457KB, blob 495KB, dock-facilities 192KB) + 4 audit corpora read before spec-seal. |
| **Tranche format** | feedback_tranche_format | ADDRESSED | AX.md plan + PROGRESS.md + per-wave `waves/W<N>.md` + audit/ corpora; FINAL.md owed at W33 close (not yet — tranche mid-flight). |
| **Overfitting audit at close** | feedback_overfitting_audit | DEFERRED-correctly | W33 carries the closing overfitting audit; not yet run (tranche open). Not a violation — the audit is a CLOSE ceremony. |
| **Greenfield no-meta** | feedback_greenfield_no_meta | **PARTIAL — tension, wave-covered** | The whole tranche scaffolding is meta-language by nature (W-letters, "carry-forward", baselines) — but that's tranche-internal. The SHIPPED `src/` surface carries tranche-letter refs in `api/index.ts`+`src/index.ts` (W24 RED at base) → owned by **W27b** (legacy-commentary full-tree sweep). Correctly routed. |
| **glass-ui binding verification (stale prop/emit silent no-op)** | feedback_glass_ui_binding_verification | **PARTIAL — risk live, π-lane mitigates** | The cardinal AX lesson IS this class generalized (headless-green/visually-broken). W04's `scroll-on-overflow` dead-attr and the W01 live-snap are exactly the "e2e-only catch." The π visual-runtime lane (W00) is the structural mitigation, but it is WebGL2-only (no headless WebGPU) and the orchestrator's manual real-Metal pass is the actual catch-net — NOT a gate. See §4 (residual risk). |

---

## 2. Recurring-ask matrix — the user's standing directives

| Recurring ask | Status | Evidence / gap |
|---|---|---|
| **Drive-to-completion (autonomous, end-to-end, one-shot)** | IN-PROGRESS | §21 execution mandate active; 17 of 46 waves complete (W00-W05/W07-W13/W15-W17/W22-W24/W37) + 3.8.0 published. ~29 waves remain (the convergence-audit batch this lane rides is the re-plan checkpoint before the next drive leg). |
| **Max parallelism + workflows (Workflow tool, ≤4 concurrent)** | ADDRESSED-with-throttle | Banded fan-outs (A/B headline, C/D/E, fourth band) ran as parallel lanes; the server-throttle cap (≤4 concurrent, never 2 workflows at once) was learned + honored (W16 died on a concurrency overrun, re-ran solo). The stale-worktree trap (project_workflow_stale_worktree_trap) hit TWICE — mitigated by the mandatory step-0 `git reset --hard <REAL_HEAD>` + `baseConfirmed`. |
| **Real-device visual-truth (live audit, not green proof)** | ADDRESSED (headline mechanism) | The cardinal lesson is the tranche's reason for being. W00 π-lane on real Metal (ANGLE-Metal, not SwiftShader); every "complete" wave live-verified by the orchestrator's own eyes. The 16-defect ledger (2026-06-08) IS the proof the mechanism works — it's the live-truth pass catching what headless missed. |
| **No quick fixes / no workarounds / no legacy** | ADDRESSED | See gestalt-redesign + no-backwards-compat rows. The ledger's directive ("NO quick solutions … architectural transpositions … NO legacy code") is restated per-defect in the convergence files. |
| **Dock-first** | ADDRESSED | Dock band W01-W06 is the spine; W01/W02/W03/W04 complete, W06 carve-last planned, the net-new dock-structural wave (A-waves-dock) sequenced before W06. Dock sits at the top of the plan. |
| **Publish** | ADDRESSED (3.8.0) | 3.8.0 shipped via release.yml provenance (c075467 + f2fc614 unblocked the gates). Final publish (visually-true, all features) owed at W33 close. |

---

## 3. The ONE precept violation this lane flags — and it is already wave-covered

**Finding:** CLAUDE.md's hardest token rule ("NEVER `hsl(var(--token))` — the token is already a
color, double-wrapping is invalid and never paints") is VIOLATED in 3 live lines:

```
src/styles/animations.css:354   background-color: hsl(var(--background) / 0);
src/styles/animations.css:361   background-color: hsl(var(--background) / var(--top-layer-backdrop-dim, 0.5));
src/styles/animations.css:363       background-color: hsl(var(--background) / 0);   (@starting-style)
```

`--background` → `--neutral-0` → `hsl(48 12% 98%)` (verified, tokens.css:311/327). So the
`[open]::backdrop` rule expands to `hsl(hsl(48 12% 98%) / 0.5)` — an invalid nested `hsl()` that
computes to nothing. **The native `<dialog>` glass scrim never dims** — the page floats undimmed,
only blurred. This is the precept's own canonical failure mode, shipped at HEAD (3.8.0).

**Aggravating sub-finding (writing-style + greenfield tension):** `tokens.css:1340-1343` BLESSES the
broken form in a comment — "Backdrop dim uses the `hsl(var(--background) / α)` channel form — the
legitimate single-token alpha case." That comment is FALSE under the house rule (the channel form is
only legitimate when the token is a bare `H S L` triplet, which `--background` is not) and actively
mis-documents a bug as a feature. It must die WITH the fix.

**Dedup verdict: already-covered by W20** (`AX.W20`, RED-witness-1). W20 names these exact 3 lines,
root-causes the invalid-nested-hsl, prescribes the gestalt fix
(`color-mix(in srgb, var(--background) calc(var(--top-layer-backdrop-dim) * 100%), transparent)`),
AND flags `tokens.css:1288` (the blessing comment — note W20's line ref is stale vs HEAD's 1342, a
one-line freshness drift worth noting in W20). NO net-new wave. The only augment W20 wants: confirm
its scope deletes/corrects the tokens.css blessing comment, not just the animations.css rule (W20's
F0 line-113 fix targets the rule; the comment correction should be explicit in F0's FileBounds).

This is the cleanest possible vindication of the precept-recap exercise: the design system's own
hardest rule was violated, shipped, AND mis-blessed in a comment — and the tranche already has the
gestalt fix queued. The recap's job was to confirm coverage, not to re-prescribe.

---

## 4. Residual risk the recap surfaces (NOT a new wave — a standing-watch note for W33)

**The binding-verification precept is structurally under-covered.** The π-lane (W00) is the AX answer
to headless-green/visually-broken, but it has two acknowledged blind spots that mean the
orchestrator's manual real-device pass remains the only true catch-net — and a manual pass is not a
gate:

1. **No headless WebGPU** — `navigator.gpu === false` in Playwright headless; W07's WebGPU-black
   defect can only be exercised on a real Dawn/Metal device or the Claude browser extension. The
   16-defect ledger (D4/D5 blob skeuomorphism+hover, D7 blob-mood, D8 glass-material all "totally
   broken") is the evidence that visually-broken surfaces STILL slipped past the headless bands and
   were only caught by the user's own live monitoring pass. The π-lane caught the FLOOD class
   (coverage readPixels) but not the lighting/mood/material classes.

2. **No structural consumer-binding gate** — the feedback_glass_ui_binding_verification mitigation
   ("a structural gate that greps consumer call-sites for `:prop`/kebab-attrs not in the component's
   `defineProps`") is NOT implemented. W04's `scroll-on-overflow` dead-attr is the live proof this
   class is unguarded. This belongs as a **W33-close gate ask** (or a W27a hardening fold) — flag it,
   don't author it here.

**Recap recommendation:** W33's close ceremony should add (a) a born-RED `proof:no-stale-binding`
structural gate (consumer-call-site `:prop`/kebab vs `defineProps` diff) and (b) an explicit
real-device/extension WebGPU + blob-material visual pass as a close criterion, since the headless
π-lane provably under-covers the very classes the 16-defect ledger is made of. Both are W33 scope, not
net-new waves — the recap routes them, does not duplicate.

---

## 5. Verdict

**audit-note.** The session is broadly precept-compliant: the two cardinal fixes (W01 dock scalar,
W07 aurora storage-buffer) are exactly the gestalt transpositions the architectural-approach precept
demands; no-backwards-compat / tailwind-first / presets-in-consumers / analyze-in-full / tranche-format
are all honored. ONE hard precept violation is live at HEAD (the invalid `hsl(var(--background))`
dialog-scrim, +its false blessing comment) — and it is ALREADY owned by **W20 RED-witness-1** (the
only augment: make W20-F0 explicitly correct the `tokens.css:1342` blessing comment, and refresh
W20's stale `:1288` line ref). Two precept-tensions (agent-git-clause breach, greenfield meta-language)
were orchestrator-absorbed or correctly routed to W27b. The standing residual is the
binding-verification under-coverage (no headless WebGPU, no structural stale-binding gate) — routed to
**W33 close** as gate asks, not net-new waves. No wave is duplicated; no net-new wave is warranted from
the recap.
