# R-prompts — full recap of EVERY user prompt/request across the AX engagement

Lane R-prompts of the 32-lane step-back inventory (HEAD c72d2ac == master, 3.8.0 published).
PLANNING ONLY — read-only audit, no code edits. This is the ADDRESSED / PARTIAL / UNADDRESSED
matrix across the WHOLE engagement, sourced from the four binding prompt-capture artefacts:

- `REQUIREMENTS.md` §0-§22 — the verbatim-faithful master directive ledger (AU→AV→AW→AX-open).
- `USER-DEFECTS-2026-06-08.md` (pass-1, D1-D19 + P-process) — first live monitoring pass.
- `USER-DEFECTS-2026-06-08-pass2.md` (G/DK/T/P) — post-W52 glass-first/squircle/Apple-SOTA pivot.
- `USER-DEFECTS-2026-06-08-pass3.md` (RE-NOTED + Q1-Q9) — glass-first-as-ROOT + page-redesign.

Wave-status truth read from `PROGRESS.md` (63 rows) + the two CONVERGENCE-PLAN ledgers + the
A-tranche-wave-audit. Status legend mirrors PROGRESS: `live-verified`/`complete` = audited GREEN on
the real device; `dev-complete`/`DEVELOPED` = code landed, live audit pending; `planned` = spec
authored, no code. A prompt is **ADDRESSED** only when its owning wave is live-verified; **PARTIAL**
when developed-but-not-live-verified OR only-some-sub-asks landed; **UNADDRESSED** when its wave is
still `planned`/un-owned.

---

## A. THE HEADLINE ASKS (the brief's named items) — matrix

| # | Headline ask | Owning wave(s) | Status | Note |
|---|---|---|---|---|
| H1 | **Drive AX to completion** (end-to-end, one-shot, 12+hr autonomous) | §0b/§21 EXECUTION MANDATE; M-close W33 | PARTIAL | 19 complete + 9 live-verified + 5 live-pending + 35 planned of 63 rows. The autonomous DRIVE is in flight; FINAL.md (W33) not reached → closes `complete_with_misses` per the mandate until all legs met. |
| H2 | **Max parallelism + workflows** (32-agent, batched 4; triumvirate research→harden→plan→author) | process directive (all passes) | ADDRESSED (ongoing) | Convergence-1 (23 lanes) + convergence-2 (24 lanes) + this 32-lane inventory ran read-only. Cadence constraint LEARNED + recorded (pass-3: ONE big workflow at a time — concurrent 32-agent trips the server throttle). |
| H3 | **Real-device visual truth** (cardinal lesson; chrome-devtools-mcp + playwright in lanes) | W00 π lane; every visual wave's close | ADDRESSED (structural) | W00 complete (fail-CLOSED π lane). `live-pending`/`live-verified` status institutionalized. The cardinal re-verify list is enumerated (W15/W16, W23, dock band). |
| H4 | **No quick fixes / gestalt / no-legacy / architectural transpositions** | §0 mandate (every wave) | ADDRESSED (binding) | Recapitulated in every charter §0 + §2b precept map. Landed waves (W52 liquid-glass, W53 tabs-unify, W56 squircle, W59 slider) are clean-break redesigns, no alias. |
| H5 | **Dock-first** (top of tranche, first principles) | A-band W01-W06, W42, W45 | PARTIAL | W01-W04 live-verified; W45 DEVELOPED+live-verified (region-model, separator, --dock-scale, DK-band folds). REMAINING planned: W06 (storybook + css split + DELETE token-ladder), W42 (liquid-morph substrate), + pass-3 Q1 (collapsed-pill mis-size) + DK-unify-root. |
| H6 | **PUBLISH** (3.8.0 to npm, provenance) | §0b leg-1; W33 | **ADDRESSED** | glass-ui 3.8.0 PUBLISHED to npm with provenance; master consolidated (195+ commits FF). The one fully-closed end-state leg. |
| H7 | **Glass first-class** (default glass everywhere; the pass-3 ROOT default) | W52 (material) → W54 (--glass-level) → pass-3 page-redesign umbrella | PARTIAL → AT-RISK | W52 liquid-glass material DEVELOPED+live-verified. **W54 (--glass-level scalar + opaque escape) is `planned` — NOT started.** Pass-3 bumped this to TOP precedence ("the default for ALL items is their glass variants — fix at the ROOT"); it BLOCKS the Q4/Q7/Q9 page-redesign waves. This is the single highest-leverage UNADDRESSED headline. |
| H8 | **Squircles** (superellipse design-language pivot) | W56 (G3, foundational) | ADDRESSED | W56 DEV-COMPLETE + live-verified. `corner-shape: superellipse()` token axis (`--corner-k-*` + `--corner-shape-*`), re-homed OFF cards/buttons (round by policy) → onto big-dock; round border-radius cross-engine fallback. W42 dock-morph reads the same band. |
| H9 | **Apple-SOTA** (mirror apple.com/os liquid + squishy) | G4 — cross-cutting research INPUT (not a wave) | PARTIAL | Folded as a research input into W52 (liquid), W05 (squish-spring), W53 (segmented spring), W23 (carousel). The CONFIRMED Apple preset numbers pinned in conv-2. Not a standalone deliverable — verify each consuming wave absorbed it. |
| H10 | **The prunes** (P1-P5 / §7 primitive prune) | W19, W21, W23, W29 | PARTIAL | W19 DEVELOPED+live-verified (excised glass-carousel/disco-glyph/glyph-face; KEPT useTokenColor as a constellation consumer — diverges from P1/pass-3 "remove use-token-color"). Header-ribbon/glass-panel retire → W20 (`planned`). Chassis retire (D12, CONFIRMED in pass-3) → W28/W29 (`planned`). |
| H11 | **Slides-perfection** (deploy slides.friday.institute, live-validated) | L-band W30-W32; §12 | UNADDRESSED (in-AX) | All of W30/W31/W32 are `planned`. Separate repo (slides @ deck/feedback-coder 1461683), coordinated/tracked. The §0b leg-2 end-state (CF-Pages deploy + prod validation) is not reached. |
| H12 | **The slider redesign** (§9 — two sliders: glass-scrubber + spectrum; fully-rounded iOS knob) | W59 | ADDRESSED | W59 DEVELOPED+live-verified — integrated-cylinder glass default + squircle-thumb spectrum. NOTE: the §9 "rename standard → glass-scrubber" key-rename may not have landed (W59 doc says "integrated-cylinder glass standard"); verify the rename + all-consumers-port sub-ask. |
| H13 | **The storybook-language** (strip WCAG citations + impl-note code-comments) | W58 (P10/P11) | ADDRESSED | W58 dev-complete (`proof:story-language` born-RED→GREEN; 49 SFCs swept). The de-superfluity + meta-language strip. NOTE the broader page-redesign half (P8 grid idiom, Q4/Q7 glass containers) is the SEPARATE un-owned umbrella. |

---

## B. §1-§22 master ledger — per-section ADDRESSED matrix

| § | Topic | Owning wave(s) | Status | Gap / note |
|---|---|---|---|---|
| §0 | Mandate (no-quick/gestalt/DRY/KISS/idiomatic-TW/visual-truth) | all | ADDRESSED | binding, recapitulated everywhere |
| §1.1 | Dock animation broken (box-before-items / one clock) | W01 | ADDRESSED | live-verified; single-scalar `--dock-morph-t` |
| §1.2 | Dock first-principles + keyframes-oracle reference | W01/W02 | ADDRESSED | re-derived 479→~130 lines; VT fork retired |
| §1.3 | Dock-with-slider broken (keepDockOpen) | W03 | ADDRESSED | live-verified; `useDockHold(rootRef)` native listeners |
| §1.4 | Dock overflow/wrap natural+shadowed | W04 | ADDRESSED | live-verified; valid `max-inline-size` fix |
| §1.5 | Dock items scattered → consolidate | W06/W18 | UNADDRESSED | W06 + W18 both `planned`; dock-home consolidation un-shipped |
| §1.6 | Rail refinement | W06; W45 (DK8/DK9) | PARTIAL | W45 folded rail bg (DK8); honest-rail variant → W06 planned |
| §1.7 | Remove `/dock/icon-button-token-ladder` story | W06 (DELETE dock-active-tokens) | UNADDRESSED | W06 `planned` |
| §1.8 | Dock springiness perfected (iOS) | W01/W05 | ADDRESSED | one iOS-spring vocabulary; live-verified |
| §2.1 | Aurora core black-canvas | W07 | ADDRESSED | live-verified; WGSL int-in-float fix |
| §2.2 | Simplify options (wispy-sky default) | W10 | ADDRESSED | atoms-door converge |
| §2.3 | Derive-color + FULL OKLAB/OKLCH | W11 | ADDRESSED | OKLCh catchlight palette-ramp twin |
| §2.4 | Modern WebGPU | W14 | UNADDRESSED | W14 `planned` (painterly parity OR excise) |
| §2.5 | Oil-pastel painterly mode | W13 | ADDRESSED | live-verified; first-class medium |
| §2.6 | Van-Gogh atomic brush strokes | W13 | ADDRESSED | live-verified; comma-stroke grammar |
| §2.7 | Procedural gradient-art from atoms | W12/W13 | ADDRESSED | StrokeProfile substrate |
| §2.8 | Fully dynamic/interactive | W10/W16 | PARTIAL | aurora atoms wired; interactivity per-surface |
| §2.9 | Research-backed README (aurora) | W33 / band READMEs | UNADDRESSED | §13 flags "no research-backed READMEs exist"; W33 `planned` |
| §3.1-3.4 | Blob totally-broken + style/integration/perf | W08/W15/W16 | PARTIAL | W08 core-unblock live-verified; W15/W16 DEVELOPED but D4/D5/D7 RE-OPENED them → W46 (`planned`). On the cardinal re-verify list. |
| §3.5 | Blob README | W33 | UNADDRESSED | same as §2.9 |
| §4.1 | Constellation abstracted to component | W17 | ADDRESSED | ships as `/constellation` |
| §4.2 | Constellation visibility (dark+light) | W17 | ADDRESSED | `--constellation-*` tokens |
| §4.3 | Constellation dynamic/interactive (§15 warp) | W17 | ADDRESSED | `warpTo` + drawOverlay seam; slides adopt |
| §4.4 | Constellation README | W17/W33 | PARTIAL | W17 had a README; band-wide research-README still §13-flagged |
| §5.1 | Specular too extreme → subtle | W09 → W52 (D11/D19) | PARTIAL | W09 was the cardinal-lesson RE-OPEN (marked complete on headless-green; live-pending). D11 radials ABSORBED by W52. D19 (egregious central bloom) → W52 DEVELOPED. Pass-3 Q3 (hover not noticeable) suggests still-not-fully-right. |
| §6.1-6.6 | Storybook ground-up reinvention + every section + prune + dock-home + grouping + perfect-every-component | W18, W40, W19 | PARTIAL | W19 prunes live-verified; W18 (IA reinvention) + W40 (demo-shell) both `planned`. The full re-invention is UNADDRESSED. |
| §7 | Primitives audit/prune/fix (the 14-item wtf list) | W19/W20/W21/W36/W37 | PARTIAL | W19 (prune A) + W37 (canvas2d) live-verified. W20 (native-top-layer fix, card toggles, GlassPanel retire), W21 (recategorize), W36 (forced-colors) → `planned`. native-top-layer BROKEN (§7) still un-fixed. |
| §8 | Speedtest ownership repatriation | W28/W29 | UNADDRESSED | both `planned`. Chronic muster-block; the dirty-sibling wall. |
| §9 | Sliders consolidate (2 kinds; rounded knob; consumers port; carousel bar) | W59 + W23 | PARTIAL | W59 slider redesign live-verified. W23 carousel-indicator live-verified BUT P5 (Apple-glass carousel) says still-not-glassy → augment. The "rename → glass-scrubber" + "all consumers port" sub-asks unverified. |
| §10 | Slides bottom progress-bar at page-bottom (not in dock) | W24 + W32 | PARTIAL | W24 deck-progress LIBRARY-side live-verified (`/deck-progress`); the SLIDES-side port (page-bottom placement) → W32 `planned`. |
| §11 | Encapsulation/architecture (legacy-excise, no-god-module, DI, library-optimum) | W25a/b, W26, W27a/b | UNADDRESSED | all five `planned` + born-RED. The 3-file god-module FAIL (useMetaballRenderer/GlassDock/constellationField) carry-forwarded, un-split. |
| §12 | Slides content (til-briefing, $5M, xray, conclusion, mobile, modal, etc.) | W30/W31/W32 | UNADDRESSED | all `planned`; separate repo. |
| §13 | Deferred + chronically-deferred (fold ALL into AX) | distributed | PARTIAL | enumerated + routed in the charter; many targets still `planned` (W29 prune, W32 lighthouse, W33 close, the band READMEs). |
| §14 | Audit original AU/AV/AW plan vs delivery | deep-audit-corpus + A-tranche-wave-audit | ADDRESSED | the 32-slice deep audit + the prior-tranche relevance check ran. |
| §15 | Constellation click-to-warp generalized | W17 | ADDRESSED | `warpTo(point)` on `/constellation`. |
| §16 | Cross-constellation analysis + idiom-max + zero-loss | W34 | PARTIAL | the §16 ANALYSIS ran (constellation-analysis-corpus.json + converge-digest); W34 (the receiver + adoption ledger) is `planned`. |
| §17 | Spec-formation + hardening discipline | charter + waves/ | ADDRESSED | every wave has a `waves/AX.Wnn-*.md`; §2b precept map authored. |
| §18 | Liquid-glass morphing facility (unified morph substrate) | W42 | UNADDRESSED | W42 (`useLiquidMorph`/`--morph-t`/`MorphGroup`) is `planned`. The "every element morphs" idiom un-built. |
| §19 | Dock full-facility prototype/harden matrix (12 lines) | W01-W06/W42; DOCK-FACILITIES.md | PARTIAL | the matrix is authored (DOCK-FACILITIES.md + PROTOTYPE-HARDEN.md); several facilities (big-dock, layer-first-class, rail-identity, morph-into-arbitrary-shapes) ride still-`planned` waves. |
| §20 | Cross-session handoffs (USF + keyframes.js) | W09/W06/W21/W33/W34/W35 | PARTIAL | routed (specular handoff → W09/W52; DarkModeToggle optical-size → W06; LabeledField/Drawer/cartoon API asks → W21; VT-types verify → W33). Most owning waves `planned`. |
| §21/§0b | Execution mandate (end-to-end one-shot, full-auth) | all legs | PARTIAL | leg-1 publish DONE; leg-2 slides-deploy UNADDRESSED; leg-3 consumer-adoptions UNADDRESSED. |
| §22 | Autonomous-resilience operating frame | session-level | ADDRESSED | rate-limit/roadblock/clobber rituals recorded; the stale-worktree trap learned + mandated step-0 reset. |

---

## C. PASS-1 defect ledger (D1-D19) — matrix

| D | Defect | Wave | Status |
|---|---|---|---|
| D1 | Aurora configurator non-idiomatic (hand-rolled chrome) | W38 (+pass-3 "faster/springy") | UNADDRESSED — W38 `planned` |
| D2 | "Where are the van-Gogh items?" (not discoverable) | W47 | UNADDRESSED — W47 `planned` |
| D3 | BouncyTabs egregious/jarring | W05 carry-row → W53 | ADDRESSED — W53 SegmentedTabs live-verified (spring glide+squish), subsumes BouncyTabs |
| D4 | Blob too skeuomorphic (lighting down) | W46 | UNADDRESSED — W46 `planned` |
| D5 | Blob hover broken + too dramatic | W46 | UNADDRESSED — W46 `planned` (BLOCKER) |
| D6 | Consolidate 3-4 blob pages → ONE | W18 | UNADDRESSED — W18 `planned` |
| D7 | blob-mood totally broken (no moods work) | W46 | UNADDRESSED — W46 `planned` (BLOCKER) |
| D8 | glass-material totally broken | W48 | UNADDRESSED — W48 `planned` (BLOCKER) |
| D9 | Dock red-underline too prominent | W40 / W45 | PARTIAL — W45 folded dock-control state; W40 (subtle/none underline) `planned` |
| D10 | Destructive/alert unreadable in dark | W44 | UNADDRESSED — W44 `planned` (AA floor) |
| D11 | Specular radial corner-glow egregious (thought-fixed) | W09 re-open → W52 | PARTIAL — D11 radials absorbed by W52 (DEVELOPED); the live-pending re-verify outstanding |
| D12 | InstrumentChassis still ships (thought-removed) | W28/W29 | UNADDRESSED — pass-3 CONFIRMED "REMOVE, yes"; W29 `planned` |
| D13 | Dock controls should persist + proportion + dividers | W45 | ADDRESSED — W45 region-model + DockSeparator live-verified |
| D14 | Dedicated dock SECTION (morph/anim/layers/variants/rail) | W06/W18 | UNADDRESSED — both `planned` |
| D15 | Dock ~1.5x bigger on mobile | W45 (--dock-scale) | ADDRESSED — W45 `--dock-scale` coarse-pointer multiplier live-verified |
| D16 | math-paper should leverage latex-paper | W49 (+pass-3 search/virtualization) | UNADDRESSED — W49 `planned` |
| D17 | Dropdown/select/menu inconsistent type-scale | W50 | UNADDRESSED — W50 `planned` |
| D18 | All components too small (touch+font) → --ui-scale umbrella | W51 (umbrella; W45/W50 specialize) | UNADDRESSED — W51 `planned` |
| D19 | Specular central bloom EGREGIOUS (whole material overhaul) | W52 | PARTIAL — W52 DEVELOPED+live-verified; pass-3 Q3 (hover still not noticeable) re-flags |

## C2. PASS-2 ledger (G/DK/T/P) — matrix

| Item | Ask | Wave | Status |
|---|---|---|---|
| G1 | Glass first-class / default | W54 | UNADDRESSED — `planned` (pass-3 bumped TOP) |
| G2 | Adaptive glass over light (iOS27 backdrop-luma darken) | W55 | UNADDRESSED — `planned` |
| G3 | Squircle design-language | W56 | ADDRESSED — live-verified |
| G4 | Apple-SOTA liquid+squishy mirror | research input | PARTIAL — folded into W52/W05/W53/W23 |
| DK1 | Collapsed-icon appears with no added delay | W45 | ADDRESSED — W45 DK1 fold (DK7 second-clock deleted) |
| DK2 | Hover/select state for dock icons+dropdowns wrong | W45 / W52 | PARTIAL — W45 DK2 fold; pass-3 Q3 says hover STILL not noticeable |
| DK3 | Collapsible dock shouldn't modify page-flow; icon missing | W45/W01 | PARTIAL — region-model; pass-3 Q1 collapsed-pill mis-size outstanding |
| DK4 | Big-dock icons not aligned | W45 | ADDRESSED — W45 DK4 fold |
| DK5 | Dock separators when befitting | W45 DockSeparator | ADDRESSED — live-verified |
| DK6/DK7 | Dock layers laggy/un-first-class | W01/W45 | ADDRESSED — W45 DK7 second-clock deleted; layer on one clock |
| DK8 | Rail bgs wrong/misaligned | W45 | ADDRESSED — W45 DK8 fold |
| DK9 | Differentiate vertical dock vs rail | W45 | PARTIAL — rail-identity; verify the vertical-vs-rail distinction landed |
| DK10 | Dedicated vertical dock section | W06/W18 | UNADDRESSED — `planned` |
| T1-T4 | Bouncy=default, BouncyToggle merge, responsive subsume, broken pages | W53 | ADDRESSED — SegmentedTabs unified, live-verified |
| P1 | use-token-color remove → darkmode toggle | W19/W21 | DIVERGENCE — W19 KEPT useTokenColor (constellation consumer); pass-3 re-asks "replace in vertical dock with darkmode toggle" → unresolved |
| P2 | disco-glyph remove | W19 | ADDRESSED — live-verified |
| P3 | glyph-face remove | W19 | ADDRESSED — live-verified |
| P4 | glass-carousel remove | W19 | ADDRESSED — live-verified |
| P5 | carousel more Apple-like/glassy | W23 augment | UNADDRESSED — augment not shipped |
| P6 | pulse radial bg too egregious | W57 | ADDRESSED — W57 pulse-aura 0.55→0.22 live-verified |
| P7 | heros leverage aurora/constellation | W57 (+pass-3 fourier, glassy hero) | PARTIAL — W57 four hero radials→Aurora live-verified; pass-3 Q9 (glassy hero card over full-page bg) + fourier-hero extend it |
| P8 | speedtest grid idiom on pages | W18/W40 | UNADDRESSED — `planned` |
| P9 | glass-material broken (re-confirm) | W48 | UNADDRESSED — `planned` |
| P10 | story text de-superfluity | W58 | ADDRESSED — live-verified |
| P11 | strip storybook internal meta-language | W58 | ADDRESSED — `proof:story-language` GREEN, 49 SFCs |

## C3. PASS-3 ledger (RE-NOTED bumps + Q1-Q9) — matrix

| Item | Ask | Wave | Status |
|---|---|---|---|
| RE: G1/W54 | "Default for ALL items is glass variants — fix at the ROOT" | W54 | UNADDRESSED — TOP precedence, blocks page-redesign |
| RE: P1 | use-token-color → darkmode toggle in VERTICAL dock | W19/W21 | UNADDRESSED — diverges from W19 keep |
| RE: D16/W49 | latex-paper SEARCH + VIRTUALIZATION (not just MathBlock) | W49 ext | UNADDRESSED — `planned` |
| RE: D12/W29 | instrument-chassis REMOVE — CONFIRMED | W29 | UNADDRESSED — decision resolved (remove); wave `planned` |
| RE: P7/W57 | hero items unique aurora/constellation/fourier in TRUE full-page bg + glassy card | W57 ext | PARTIAL — W57 base landed; full-page + glassy-card + fourier extension `planned` |
| RE: DK/W45 | ALL docks SAME root: home-left, navs, dividers | W45 ext (dock-unify-root) | UNADDRESSED — net-new W45 extension |
| RE: D1/W38 | configurator animate FASTER/smoother/springy | W38 ext | UNADDRESSED — `planned` |
| RE: W43 | fourier-field SOTA research execute NOW (not mid-tranche) | W43 | UNADDRESSED — PULL-UP directive; research not yet executed |
| Q1 | Collapsed dock pill mis-sized in demo | W45 follow | UNADDRESSED |
| Q2 | Aurora preview BLACK BAR in top thumbnail | W47/usePresetThumbnails | UNADDRESSED |
| Q3 | Hover effect not noticeable (only on click) — dock+buttons | W52 hover / DK2 | UNADDRESSED — still-wrong re-flag |
| Q4 | Pages structured in GLASS CONTAINER + paper+grid bg | page-redesign umbrella | UNADDRESSED — net-new, blocked on W54 |
| Q5 | /motion/transitions union with /foundations/motion | demo IA dedup | UNADDRESSED |
| Q6 | motion section broken + needs interesting bg (paper/constellation/fourier/aurora) | demo fix | UNADDRESSED |
| Q7 | ALL pages re-designed: glass cards + hierarchy | page-redesign umbrella | UNADDRESSED — blocked on W54 |
| Q8 | gate-pattern literally locks you out (broken) | demo fix | UNADDRESSED — BLOCKER |
| Q9 | Hero card itself glassy over full-page bg | W57/page-redesign | UNADDRESSED |

---

## D. UNADDRESSED — the flag list (the prompts with NO live-verified close)

Sorted by the user's stated precedence (pass-3 bumps first):

1. **W54 glass-first-class as ROOT default (G1/H7, pass-3 TOP)** — the single highest-leverage gap.
   `planned`. Blocks the entire Q4/Q7/Q9 page-redesign cohort. The pass-3 headline pivot.
2. **The page-redesign / demo-IA-hierarchy umbrella (Q4/Q7/Q9 + P8/P10)** — un-owned net-new wave
   (the inventory index flags it likely subsumes/extends W18+W40+W57+W58). No wave exists yet.
3. **W43 fourier-field SOTA research PULL-UP** — pass-3 directive to execute NOW; not yet run.
4. **Slides L-band entirely (W30/W31/W32, §10/§12, H11)** — leg-2 of the end-state. All `planned`.
5. **Blob live-truth (D4/D5/D7 → W46) + glass-material (D8/P9 → W48)** — three BLOCKERS, all `planned`;
   on the cardinal re-verify list.
6. **W18 storybook IA reinvention + W40 demo-shell + W06 dock storybook** — §6 full re-invention,
   D6/D14/DK10 dock+blob sections, §1.5/§1.7 dock-home + token-ladder DELETE. All `planned`.
7. **The aurora/demo cohort: W38 (configurator, D1+pass-3 springy) + W47 (van-Gogh roster D2, Q2
   black-bar) + W14 (WebGPU §2.4)** — all `planned`.
8. **The sizing cohort: W51 (--ui-scale umbrella D18) + W50 (dropdown type-scale D17)** — `planned`;
   D18 is the modern-comfortable library-wide axis the user explicitly wanted.
9. **W44 dark-contrast (D10), W55 adaptive-glass (G2), W36 forced-colors** — accessibility/legibility,
   all `planned`.
10. **W42 liquid-morph substrate (§18) + W20 primitive-fix (native-top-layer §7, card toggles, GlassPanel
    retire) + W21 recategorize** — the morph idiom + the primitive-fix backbone, all `planned`.
11. **Encapsulation J-band (W25a/b, W26, W27a/b, §11) — god-module splits, legacy sweeps** — `planned`,
    born-RED, the 3-file god-module FAIL un-split.
12. **Speedtest repatriation (W28/W29, §8) + chassis retire (D12 CONFIRMED)** — chronic muster-block.
13. **W33 close (gate-fleet, the research-backed band READMEs §2.9/§3.5/§4.4, overfitting audit, FINAL)
    + W39 lighthouse + W34/W35/W41 cross-repo** — the close cohort.
14. **Demo fixes: Q2 aurora black-bar, Q5 motion-page union, Q6/Q8 broken sections (gate-pattern locks
    out — BLOCKER), Q3 hover-not-noticeable** — un-owned demo defects.

## E. DIVERGENCES / NEEDS-USER-DECISION (where a wave drifted from a prompt)

- **P1 use-token-color** — the user asked twice (pass-2 P1, pass-3 RE-NOTED) to REMOVE it (→ darkmode
  toggle in the vertical dock). W19 KEPT it ("constellation consumer"). The pass-3 restatement is
  more specific (replace it IN THE VERTICAL DOCK with a darkmode toggle, not delete the composable) —
  reconcile: the composable can stay AND the demo story be replaced. Surface for adjudication.
- **§9 slider rename → `glass-scrubber`** — W59 shipped "integrated-cylinder glass standard" but the
  charter named the rename + "all consumers port." Verify the key-rename + consumer-port landed or
  flag as a residual.
- **Specular default `subtle` vs `off`** (§20 USF-1 RATIFY) — the Card `specular="off|subtle|full"`
  prop default needs a ratify; flat-data consumers want `off` trivially declarable.
- **Pass-3 Q3 hover-not-noticeable** — W52 marked DEVELOPED+live-verified, yet the user re-flags the
  hover reads only on click. This is a cardinal-lesson candidate (a "complete" contradicted live) —
  re-verify W52's hover channel on the real device before closing.

---

## F. Synthesis

The engagement decomposes into THREE prompt strata, each captured verbatim: (1) the §0-§22 master
ledger (the AU→AV→AW arc + the AX-open directives — dock-first, aurora/blob/constellation perfection,
the morph substrate, the encapsulation sweep, slides, the execution mandate); (2) the pass-1 D1-D19
live defects (the cardinal-lesson surface the headless gates missed); (3) the pass-2 + pass-3 glass-
first-class / squircle / Apple-SOTA / page-redesign pivot. Of the 13 named headline asks, ONE is fully
closed (H6 publish 3.8.0), SIX are PARTIAL (dock-first, prunes, sliders, glass-first material-half,
Apple-SOTA, storybook-language), and the rest carry significant UNADDRESSED remainder — above all
**H7 glass-first-class as ROOT (W54)**, which pass-3 bumped to TOP precedence and which BLOCKS the
page-redesign cohort, and **H11 slides-perfection** (leg-2 of the end-state, entirely `planned`).

The path forward is precedence-ordered by the user's own pass-3 bumps: W54 glass-first ROOT FIRST
(it unblocks the page-redesign umbrella Q4/Q7/Q9), then the W43 fourier SOTA pull-up, then the
blocker re-opens (W46 blob, W48 glass-material, Q8 gate-pattern), then the dock-unify-root + page-
redesign waves, then the aurora/sizing/a11y cohorts, then the L-band slides deploy (leg-2), then the
J/K encapsulation+repatriation, then W33 close (leg-3 consumer adoptions + the research READMEs +
FINAL). The cardinal re-verify list (W52 hover Q3, W15/W16 blob, W23 carousel, the dock band) must
run on the real device BEFORE any "complete" is trusted — the institutionalized lesson. No wave
closes on headless-green.
