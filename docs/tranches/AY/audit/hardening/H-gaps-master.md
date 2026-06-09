# H-gaps-master — the synthesized master gap list (AY + L hardening)

**Lane** H-gaps-master · **Mode** SYNTHESIS of the 24 sibling hardening lanes under
`docs/tranches/AY/audit/hardening/` · **HEAD** `at-dock-convergence` · **Date** 2026-06-09
· **Verdict** GAPS-FOUND (the AY/L plans are PLANNING-INCOHERENT against HEAD — the single
biggest defect is a STALE-LEDGER class that mis-routes ~7 waves to RE-BUILD shipped code, plus
a ZERO-AUTHORED-WAVE-SPEC class: `AY/waves/` and the three `L.W-*` waves do not exist as specs).

> The library code is in genuinely good shape. The **plan** is the defect. Two meta-diseases
> dominate: (1) **stale-base drift** — the AUDIT-LEDGER was authored at a session-limit and never
> re-grounded to AX HEAD, so it marks ≥6 shipped-and-gated features UNADDRESSED/DEFERRED, which
> would dispatch agents to re-implement (churn-and-regress on green gates); (2) **phantom waves +
> phantom gates** — the headline waves (`L.W-ADOPT`, `AY.W-CON3`, `W-SB1/2/3`, `L.W-MOB`,
> `L.W-CHR`) have NO authored spec, and the hard gates they cite (`proof:no-bespoke-constellation`,
> `proof:touch-target`, the L "axe pass", the L "pptx-200 in CI") DO NOT EXIST.

All 24 lanes verified, plus 12 cross-lane claims spot-checked against live source this pass (god-module
gate RED with the exact 4 files; `AY/waves/` absent; `proof:no-bespoke-constellation`/`proof:touch-target`
absent; `.glass-drawer` opaque `background-color: var(--background)`; constellation warp shipped 27 refs;
slider two-variant; `--ui-scale` 37 refs; fourier `OUTLINE_PEAK_ALPHA` still 5 refs; `proof:no-god-module`
NOT in CI; slides bespoke `constellation.ts` = 547 lines present).

---

## §0 — The lane roll-call (verdict per sibling)

| lane | verdict | headline |
|---|---|---|
| H-constellation | GAPS-FOUND | warp/tokens/export SHIPPED; resize re-fit lives ONLY in the slides copy (adopting REGRESSES it) |
| H-proto-constellation-warp | GAPS-FOUND | warp shipped; eggs 100% unbuilt; ω-derivation defect; auto-drift source unbuilt |
| H-dock | GAPS-FOUND | the "lockstep" gate is TAUTOLOGICAL (box vs its own scalar); entering-child onset never asserted |
| H-motion-cohesion | GAPS-FOUND | dock lockstep SOLVED+gated; `proof:animation-coherence` RED + NOT in CI; off-doctrine survivors |
| H-aurora | GAPS-FOUND | OKLAB/atoms DONE (W-AUR2 partly no-op); "stunning" bar unfalsifiable; WebGPU scope-confused |
| H-research-aurora | NEEDS-RESEARCH | authored the falsifiable arresting bar (colorfulness/structure-tensor/−5/3 spectrum) + the 32-agent brief |
| H-blob | GAPS-FOUND | default renders DARK coffee-bean not "warm-cream"; no consumer #2; 50-knob sprawl unsimplified |
| H-fourier | GAPS-FOUND | W43 NEVER landed (visibly broken); live ≥2nd consumer (fourier-analysis) duplicates the math |
| H-slider | GAPS-FOUND | collapse SHIPPED (AX.W59); DESIGN CONTRADICTION: user wants "rounded knob", gate LOCKS "not a circle" |
| H-touch-scale | GAPS-FOUND | system SHIPPED (AX.W51); residue = form-atom floors + desktop-fluid type; axe gate phantom |
| H-storybook | GAPS-FOUND | W-SB unauthored; ~half the route list already actioned; gates already green |
| H-godmodule | GAPS-FOUND | 4 god-modules CONFIRMED RED; gate `tags:local` NOT in CI; `.css`-blind; legacy gates unwritten |
| H-glass-cohesion | GAPS-FOUND | `.glass-drawer` is OPAQUE (BLOCKER); Slider off `--glass-level`; no enforcing wave |
| H-a11y-perf | GAPS-FOUND | W55 adaptive-glass DORMANT (0 opt-in); unprefixed backdrop-filter Safari trap; specular layout-thrash |
| H-overfitting | GAPS-FOUND | `evalFourier` dead export; header-ribbon/glass-panel/useTokenColor library-orphans; route-prune ≠ component-retire |
| H-precept-drift | GAPS-FOUND | ledger mis-states ≥4 shipped items; keeps (in-srgb/cn/focus-ring/cartoon/easing) correctly undisturbed |
| H-chronic-defer | CHRONIC-MISS | carry-closure gate covers 3 of ~25 booked rows; G-4/G-5/G-6 promised-not-encoded; slides has NO carry gate |
| H-cardinal | GAPS-FOUND | live-verified gate AX-hardcoded; `complete` rows exempt; AY+slides UNGUARDED; shallow PNG binding |
| H-past-conversation | GAPS-FOUND | 5 ledger rows mis-marked; 2 recent directives (per-component convergence, colocation) have NO AY home |
| H-slides-567 | GAPS-FOUND | xray-redolent rebuild under-specced (no tokens); resolved-bookend on TWO slides; eyeball gates |
| H-slides-mobile-chrome | GAPS-FOUND | L.W-MOB/CHR unauthored; verify against STALE 11-slide set; chrome largely already shipped |
| H-slides-backlog | GAPS-FOUND | grep-count gates can't see paraphrase; L.W4 gate self-contradictory; ~$5M decision circular |
| H-slides-adopt-deploy | GAPS-FOUND (severe) | L.W-ADOPT phantom; constellation swap is a RE-ARCHITECTURE; `?freeze` seam missing; L.W5 gates fictional |
| H-feedback-coder | GAPS-FOUND | 0.72 is macro-F1 not "balanced accuracy"; retracted floor still live; L.W7 option-B ratifies stranding |

24 lanes: 22 GAPS-FOUND, 1 CHRONIC-MISS, 1 NEEDS-RESEARCH. Zero SOLID. Zero BLOCKER-verdict at the
lane level, but TWO BLOCKER-class FINDINGS surface inside GAPS-FOUND lanes (the opaque Drawer; the
constellation resize re-fit regression).

---

## §1 — THE RANKED MASTER GAP LIST (severity × leverage)

Ranked by `severity × leverage`. **Severity** = does it break the plan / regress a shipping surface /
ship a falsehood. **Leverage** = how many waves/lanes it touches, how cheaply it unblocks.
Tier S = must land first (blocks correct dispatch). Tier A = blocker-class within a wave.
Tier B = real gap, scoped. Tier C = polish/minor.

### TIER S — META-BLOCKERS (block the entire plan's correctness; land in a step-0 AY.W0 + L.W0)

**G1 — STALE-LEDGER: the AUDIT-LEDGER marks ≥6 shipped+gated features UNADDRESSED/DEFERRED/CHRONIC.**
The single highest-leverage defect — it mis-routes ~7 waves to RE-BUILD. Confirmed mis-marked rows
(spot-checked at HEAD this pass):
- Row 2 (constellation warp) "UNADDRESSED" → SHIPPED AX.W17 (27 `warpOnClick`/`warpTo`/`warpStep` refs;
  `proof:constellation-warp-live` green).
- Row 4 (touch/type-scale) "DEFERRED — no system" → SHIPPED AX.W51 (`--ui-scale` 37 refs; `proof:ui-scale`).
- Row 9 (slider zoo) "DEFERRED — no consolidation" → SHIPPED AX.W59 (`standard`+`spectrum`; `proof:slider-two-only`).
- Row 14 (READMEs) "DEFERRED" → all 4 READMEs EXIST (aurora 702, blob 422, dock 299, constellation 381 lines).
- Item 25 (access modal) "DEFERRED — not done" → `DeckGate.vue` ALREADY glass-ui-styled.
- Item 1 (constellation first-class) "PARTIAL" → exported `/constellation` subpath + api types.
Cross-cited by 6 lanes (H-constellation, H-touch-scale, H-slider, H-precept-drift, H-past-conversation,
H-chronic-defer §3, H-overfitting F1). **The fix is a MANDATED step-0 re-ground** (the AT W0-L4 ledger
HEAD-verification format): cross-walk every row to `AX/PROGRESS.md` + the named gate + file:line, re-stamp
DONE/PARTIAL with the precise NARROW residue named. Without it every downstream wave inherits the drift.
→ **AY.W0-REGROUND** (net-new; blocks all Band A) + the L.W0 twin.

**G2 — PHANTOM WAVES: 6 headline waves have NO authored spec; `AY/waves/` and `L.W-{ADOPT,MOB,CHR}` are absent.**
Verified: `AY/waves/` does not exist (all 22 AY waves are one-line table rows); `L/waves/` carries L.W1-W7
only. The SINGLE-MOST-CITED directive in the engagement (slides consume glass-ui, delete bespoke
`constellation.ts`, "the exemplar to KILL") is carried by `L.W-ADOPT` — a one-line row in `L.md` that the
DRAFT and `waves/` do not contain, gated on `AY.W-CON3` which is ALSO unauthored, whose gate
`proof:no-bespoke-constellation` does NOT exist in either repo. The gate-chain bottoms out in a void.
Cross-cited by H-slides-adopt-deploy (F1/F2), H-storybook (F1), H-slides-mobile-chrome (§1),
H-precept-drift (F5), H-chronic-defer. → author **L.W-ADOPT**, **AY.W-CON3**, **L.W-MOB**, **L.W-CHR**,
**W-SB1/2/3** as real specs; reconcile `L.md` ↔ `L-DRAFT.md` ↔ `waves/`.

**G3 — PHANTOM GATES: ≥5 named hard gates do not exist; ≥2 existing gates are NOT in CI.**
`proof:no-bespoke-constellation` (AY.W-CON3) — absent both repos. `proof:touch-target` (W-SCALE1) — absent.
The L.W-MOB "axe pass" — no `@axe-core` in slides. The L.W5 "pptx-200 in CI" — no CI step produces it.
The L "axe target-size" (touch-scale) — no axe harness in glass-ui either. Conversely `proof:no-god-module`
(`tags:local`, RED now, NOT in `ci.yml`), `proof:animation-coherence` (RED + NOT in CI),
`proof:no-orphan-demo-route` (exists, un-wired) — gates that exist but never run. A wave cannot CLOSE on a
gate that doesn't exist or doesn't run (TRANCHE-AND-WAVE-SPEC §"Hard gate"). Cross-cited by H-overfitting
F5, H-touch-scale F4, H-a11y-perf H-5, H-godmodule F2, H-motion-cohesion F5, H-slides-mobile-chrome §6,
H-slides-adopt-deploy F5. → author each missing gate; CI-promote the RED-but-local ones (in the owning waves).

**G4 — CARDINAL-LESSON GATE IS AX-HARDCODED + `complete`-EXEMPT; AY and slides are entirely UNGUARDED.**
`proof:live-verified-ledger` hardcodes `docs/tranches/AX/PROGRESS.md` + `AX/audit/visual/` and only checks
`live-verified` rows (its own protocol promises `complete` too). AY has no PROGRESS.md / audit/visual/;
slides has NO capture gate at all. So EVERY AY/L "captured DELTA" hard-gate cell is unenforced PROSE — the
exact condition that birthed the chronic miss (7 AX waves inflated live-verified with 0 PNG). 6 visual
AX `complete` rows (W05/W08/W15/W16/W17/W23 — blob the largest) hold no DELTA and are gate-invisible.
Cross-cited by H-cardinal (the whole lane), H-past-conversation (the META chronic), H-blob, H-dock D6,
H-motion-cohesion F8. → tranche-parameterize the gate; mint `AY/PROGRESS.md` + `AY/audit/visual/`; port to
`slides/scripts/`; extend to `complete` + filename-match + protocol-depth. → **AY.W-LIVE1** + **L.W4**.

### TIER A — BLOCKER-CLASS FINDINGS (within a wave; regress a surface or ship a falsehood)

**G5 — `.glass-drawer` is OPAQUE: the one "glass" surface that paints no glass (cohesion BLOCKER).**
`src/styles/drawer.css:49` `background-color: var(--background)` — NO `backdrop-filter`, NO `--glass-bg-*`
tier, NO `--glass-level`, NO oklab tint, NO rim, NO WHC skin restoration. Under the MAXIMAL glass-first
canon (AX.W54 — overlay band IS the glass band) the Drawer should be the MOST glass; every overlay sibling
(Dialog/Sheet/Popover/Toast) is `glass-floating`, the Drawer alone is opaque. It also misses the W55
bright-bucket (a live-behind drawer over a bright page is the canonical over-light case). Re-author onto
`glass-floating`/`glass-overlay` + ladder shadow, the W54 flip Dialog/Sheet already got. (H-glass-cohesion F5.)
→ a net-new **W-GLASS-COHESION** wave.

**G6 — Constellation resize RE-FIT lives ONLY in the slides bespoke copy; adopting the lib REGRESSES it.**
Slides `constellation.ts:144-162` rescales every node proportionally on RO size-change (the "no drift-out"
fix); glass-ui `Constellation.vue:149-162` only updates `field.w/h/k` and seeds nodes ONCE — it HAS the
drift-out lag. So L.W-ADOPT "delete bespoke + import" would ship a visible slide-enter regression. The
intelligence must transpose UP first (a `refitField(field, prevW, prevH)` engine free-fn) — the chronic
"fix at the ROOT" precept inverted. (H-constellation F1.) → **AY.W-CON1** (this IS its real content).

**G7 — Fourier-field W43 NEVER landed: the shipped, exported, live-consumed element is VISIBLY BROKEN.**
`OUTLINE_PEAK_ALPHA = 0.24` survives (5 refs, confirmed); the trail decays QUADRATICALLY
(`globalAlpha = 0.24 * age*age`); the `final` preset renders as a tiny corner comet stub (captured
`W18-fourier-field-*.png`). The AX.W43 born-RED spec (56 KB, two gates) is 100% absent from source. AND a
LIVE ≥2nd consumer (`fourier-analysis`, `@mkbabb/glass-ui@^3.1.0`) maintains a byte-equivalent copy of the
exact math glass-ui exports — the constellation-class bespoke-copy AY exists to close. AY.W-FF1 "fold the
research" is the wrong verb; the path forward exists twice — the wave must RE-LAND the RED spec + the
intensity prop + thread `StoryHero :intensity` (3-substrate parity) + decide the cross-repo math promotion.
(H-fourier 1-8, H-overfitting F4.) → **AY.W-FF2** (re-land, not re-research).

**G8 — Blob DEFAULT renders a dark coffee-bean, not the "warm-cream living bead" every doc claims.**
`color="var(--primary)"` + `rimColor: "var(--foreground)"` (both near-black warm-ink in light mode) → the
canonical default paints a charcoal mass with a near-black rim (captured `W46/blob-default-AFTER-calm.png`).
The README↔reality lie ("lit warm-cream bead") is the headless-green/visually-broken trap. Two AX passes
(W15 lit:true, W46 calm-retune) and the dark default persists. A default-identity decision, not more
research — ship a light OKLCh default base, or correct every doc. Born-RED at HEAD via a default-warmth
π readback. (H-blob F2, H-cardinal §6.) → **W-BLOB2**.

**G9 — Slider DESIGN CONTRADICTION: the user's "FULLY ROUNDED iOS knob" vs the shipped+GATE-LOCKED "not a circle".**
PROMPT-CORPUS:51 demands a "FULLY ROUNDED iOS knob continuous with the track, not pill/offset"; AX.W59
shipped an integrated-cylinder slim CAP and `proof-slider-two-only.mjs:124-128` literally REDDENS a rounded
circle. The user keeps re-stating "rounded knob"; the code+gate FORBID it. One of three is true (supersede /
revert+invert-gate / reconcile) and the wave must DECIDE with a user-judged captured delta — it is the exact
divergence-from-stated-intent AY exists to catch. (H-slider F2, H-precept-drift F3, H-chronic-defer §3.)
→ **AY.W-SLD1** (re-scope from "collapse" to "reconcile design intent").

**G10 — The dock "lockstep" hard gate is TAUTOLOGICAL; it cannot witness the user's defect.**
`proof:dock-animation-live` asserts the box-width onset co-occurs with `--dock-morph-t` — but the box width
IS `calc(... --dock-morph-t)` by construction (a tautology, can never red, can never see a box-leads-CONTENT
desync). The ENTERING child opacity (the thing the user says lags) is sampled but NEVER asserted; the gate
samples only the LEAVING pane. Meanwhile the entering children DO lag by design: the stagger window
(`step 0.08 × window 0.4`) means child 6 reaches full opacity at `t=0.8` while the box is at `t≈1.0` — ~150ms
trail, the "few ms" the user perceives. The architecture's "lockstep" and the user's "lockstep" are different
claims, never reconciled. (H-dock HEADLINE+D1, H-motion-cohesion F9.) → **AY.W-DOCK2** (real gate asserting
the LAST entering child's onset ≤ a DECIDED budget; retire the tautology; DECIDE the stagger reconciliation).

**G11 — feedback-coder 0.72 is MISLABELED (macro-F1, called "balanced accuracy") + the RETRACTED floor is still LIVE.**
Source-of-truth: 0.72 = L2 macro-F1 (`REPORT.md:28,77`); the deck calls it "a balanced score/measure"
(reads as balanced-accuracy, a DIFFERENT statistic). The "two humans also land at 0.72" framing — flagged
RETRACTED in slides-I, marked LANDED in I.W6 — is STILL live (`BRIEF.md:66-67`, `PRESENTATION.md:42-43,67-69`),
and L.W6's defect ledger doesn't even cite it (a 3-tranche chronic: flagged I → marked-done I → still-live → not-relisted L).
L.W6's gate #4 would bless the wrong metric name. (H-feedback-coder F1/F2.) → **L.W6** (correct the metric
name; cite + decide the retracted-floor sites; grep gates not "adversarial read").

### TIER B — REAL GAPS (scoped within a wave)

**G12 — Constellation easter-eggs: 100% unbuilt + UNDER-SPECCED + overfitting-unaddressed.**
Zero egg code anywhere; AY.W-CON2 lists 3 ("e.g.") with no algorithm, no token surface, no ≥2-consumer
decision, no live gate. RUTHLESS read (both constellation lanes converge): AT MOST 2 engine props
(auto-drift target-source [the unbuilt 2nd half of the warp thesis, unblocks slides] + pointer-held
gravity-well [extends the existing steer]); supernova = demo-only; konami-flock = CUT (global keydown,
boids, zero 2nd consumer). Each shipped egg: transient force in `stepField` (no new rAF), velocity
cool-down + no-slingshot clamps, PRM-listener-not-registered, a `proof:constellation-egg-live` π readback.
(H-proto-constellation-warp B, H-constellation F3.) → **AY.W-CON2**.

**G13 — Aurora "stunning" bar is UNFALSIFIABLE; W-AUR2 partly a NO-OP; WebGPU scope-confused.**
OKLAB/OKLCH migration + atoms-door + derive-color are LANDED (W-AUR2 triple-counts done work). The unmet bar
is artistic and the AY plan re-states it unfalsifiably over the same NOT-FLAT statistics floors. The
H-research-aurora lane AUTHORED the falsifiable fix: 3 reference-anchored metrics (Hasler-Süsstrunk
colorfulness band; structure-tensor coherence; −5/3 Kolmogorov power-spectrum slope ∈ [−1.85,−1.45] off
`starry-night-crop.png`) + the captured painterly-medium DELTA (none exists — every committed screenshot is
the SMOOTH preset). WebGPU: AX.W14 de-facto excised the multi-pass scaffold; the WGSL twin is medium-less;
re-run the retire-or-resurrect decision against the NEW Baseline-Jan-2026 fact (name a W60 consumer or
DELETE the twin). (H-aurora, H-research-aurora.) → **AY.W-AUR1** (consume the authored brief) → **W-AUR-PAINTERLY** +
**W-AUR-WEBGPU-DECIDE** (supersede W-AUR3); strike the done items from **W-AUR2**.

**G14 — Blob: NO consumer #2 (the AX-named value.js repatriation never landed) + 50-knob sprawl + 694-line god-module.**
GooBlob is exported, DI-elaborate (the ColorResolver throw/inject ceremony built for value.js), but has ONE
real consumer (its demo). value.js has no goo-blob reference. `BlobConfig` carries ~50 fields (the aurora
"simplify to atoms" mandate never applied to blob). `useMetaballRenderer` is 694 lines (4 jobs). The 32-agent
re-sweep (W-BLOB1) re-runs a settled question (the AX synthesis said "no algorithm changes needed"). Re-scope
W-BLOB1 to a TARGETED audit of the OPEN items; bind a real consumer #2 OR formally book demo-only + strip the
speculative DI; simplify to atoms; carve the god-module gated on render byte-identity. (H-blob F1/F3/F4/F5/F6.)
→ **W-BLOB1/2/3** re-scope + **W-GOD1**.

**G15 — Touch/type-scale RESIDUE: form-atoms off the axis + NO desktop-fluid type + axe gate phantom.**
System shipped (G1), but Switch 24px / Checkbox+Radio 16px / MultiSelect remove-X 8-12px / Slider thumb /
TagsInput / picker menu-rows have NO coarse touch floor (the floor targets only 3 selectors). The desktop
half of the ask ("font-size general increase on DESKTOP") is UNMET — only the φ-display ladder is fluid; the
body/control rungs are fixed rem (14px on a 27" display). Fix: a SHARED coarse-gated `@utility touch-hit-area`
(`::before` overlay, the timeline pattern generalized — hit-area decoupled from visual size, NOT
min-h-balloons) + a fluid `clamp()` on the body/control ladder (reconciling the φ-display exclusion + the
`--ui-scale` double-vw trap) + a REAL axe target-size harness (none exists). Do NOT fork a parallel
`--touch-target` axis — EXTEND `--ui-scale`/`--control-floor`. (H-touch-scale, H-a11y-perf H-5, H-precept-drift F2.)
→ **W-SCALE1/2** re-scope.

**G16 — Storybook: W-SB unauthored + scope STALE (half already actioned) + gates already green + orphan COMPONENTS survive.**
disco-glyph/glyph-face excised, useTokenColor kept, blob consolidated, speedtest boundary locked, slider zoo
collapsed — all DONE; the claimed gates all PASS at HEAD. The REAL open work: per-route disposition table
(header-ribbon RETIRE-or-book; native-top-layer FOLD into Dialog; scattered-dock triage; metric badge/pill
co-locate; carousel/deck-progress disambiguate). CRITICAL: a route prune ≠ a component retire — `header-ribbon`,
`glass-panel`, `useTokenColor` are library-ORPHANS (exported, 0 src + 0 external consumers) that survive a
route delete; each needs a RETIRE-or-keep verdict (L invariant 8). Plus `evalFourier` is a dead export on the
`/fourier-field` subpath. (H-storybook, H-overfitting F2/F3.) → **W-SB1/2/3** re-author + **W-CLOSE1** orphan-scan.

**G17 — Carry-closure (G-3): the disposition register covers 3 of ~25 booked rows; slides has NO carry gate.**
`proof:disposition-live` is genuine but its register is a 3-row SAMPLE; ~22 AT-named BOOK rows + the promised
G-4/G-5/G-6 (AX PROGRESS:282) live in prose no machine reads — "deferral wearing a gate's clothing." No gate
audits register COMPLETENESS. Slides has nothing equivalent. → onboard the full BOOK backlog; add a
completeness clause; give slides a carry gate (the constellation-consume cross-repo trigger its first row).
(H-chronic-defer.) → net-new **AY.W-CARRY** (Band E, before W-CLOSE1).

**G18 — Motion cohesion: off-doctrine survivors + `proof:animation-coherence` RED + NOT in CI + too-narrow scope.**
`--dock-press-spring` root default is `--spring-bouncy` (off-doctrine, shadowed by a local re-point — the exact
fork the doctrine claims to have killed); `cartoon-surface` hover violates BOTH legs; hardcoded-ms/bare-keyword
survivors (Aurora.vue:223, MetricRow, transitions.css) are gate-invisible; Toast rides tw-animate-css not the
spring vocabulary. The gate is RED (speedtest reads the EXCISED `--ease-apple-spring` at 3 sites → instant
transitions NOW), excluded from CI, scans only 3 CSS files + 2 SFCs, and checks no-fork not register-assignment.
`--scale-hover-btn` value/comment drift (1.05 vs documented 1.035). NO AY wave owns motion cohesion. (H-motion-cohesion.)
→ net-new **W-MOTION-COHESION**.

**G19 — Glass cohesion has NO enforcing wave; `proof:glass-one-model` is an 8-file canary, not an inventory.**
Beyond the opaque Drawer (G5): Slider is OFF `--glass-level` (literal `blur(2px)`, defeats the level-0 flatten),
hand-rolls its specular, 0-refs in the unified `.glass-material` group; Notification rides the lightest wash
rung + an off-ladder shadow; the dock SHELL carries no edge-gleam (a "by design" exemption that reads as 2
different materials next to a Dialog); the keyframes-I.W6 19-bloom-track non-cohesion (always-wired specular
`::before` transition) was MISDIAGNOSED (folded to W54 which CANNOT clear it — specular is the orthogonal W52
axis) and ORPHANED (zero "specular" hits in AY.md). NO AY wave enforces total cohesion. → net-new
**W-GLASS-COHESION** with an inventory-complete `proof:glass-cohesion`. (H-glass-cohesion F1-F6.)

**G20 — Constellation adoption is a RE-ARCHITECTURE (DOM-scan controller → N declarative SFCs) + the `?freeze` deploy seam is MISSING.**
The bespoke `createConstellations(root)` is ONE shared-RAF DOM scanner across 3 SFCs; glass-ui is per-instance
declarative SFCs with no `data-anomaly`/`data-resolved` props and no `?export/?print/?freeze`
deterministic-capture seam (the pptx + shoot pipeline DEPENDS on it). "No behavior delta" is FALSE — N
independent RAF loops (perf), the anomaly skin must re-author as a `drawOverlay`, and the deploy chain
REGRESSES without the freeze seam. glass-ui must GROW the freeze seam + the anomaly props BEFORE slides can
consume. (H-slides-adopt-deploy F3/F4, H-constellation F2.) → **AY.W-CON2/CON3** (pre-reqs) + **L.W-ADOPT** (port).

**G21 — Slides 5/6/7: the xray-redolent rebuild is UNDER-SPECCED (no tokens) + the resolved-bookend is BROKEN + eyeball gates.**
The headline ask (dark cool-ink rail, mono numbered nav, blue KNOCKOUT-block highlight, nutrition-facts table)
has no token/composition spec; the real site reads "Nutrition facts for the models you rely on" (every doc says
"for LLMs" — a redolence-gate self-defeat). `data-anomaly-label="resolved"` is on BOTH Handoff AND Ask (the
bookend the K restructure claimed to move — the gate greps the WRONG attribute). 3 of 6 hard gates are
eyeball-screenshot (violating L.md §6 "the gate counts, it does not eyeball"). (H-slides-567 F1-F8.) → **L.W1**.

**G22 — Slides backlog: grep-count gates can't see paraphrase + L.W4 gate self-contradictory + ~$5M decision circular.**
L.W3's `grep -c = 1` thesis gate can't detect the 4× PARAPHRASED restatement; "an adversarial read finds X"
is not a gate. L.W4 asks the conformance gate to BOTH strip `{{ }}` (correct) AND scan inside them
(false-positives) — the inline-wrapper-collapse + em-dash-pre-scan is the un-explored KISS fix; the negative
fixtures have no harness home. The ~$5M scope fact (the deck's most-probable on-stage failure) is routed
circularly to a LATER wave — but `PROMPT-CORPUS §F` already constrains it. OQ25 is STALE (K committed @
3765d52). (H-slides-backlog F1-F5.) → **L.W2/W3/W4**.

**G23 — Slides L.W5 deploy gates are FICTIONAL; L.W7 option-B ratifies the J-stranding.**
"pptx-200 in CI" + "deploy-pages.yml CI green (e2e flake retries)" name machinery that does not exist (no pptx
step, no e2e in CI). The glass-ui pin is a CARET `^3.9.0` (not a pin) with no re-pin-to-AY-publish sequence.
L.W7's option-B (a J→I-FOLD pointer) memorializes a PHANTOM tranche — `git log` confirms J = 2 doc commits,
ZERO code, an unexecuted plan; the honest binary is A-clean (path-scoped cherry-pick marked unexecuted) or
delete the branch. (H-slides-adopt-deploy F5/F6/F7, H-feedback-coder F6.) → **L.W5** (decompose gates) + **L.W7**.

**G24 — Slides mobile: L.W-MOB verifies against a STALE 11-slide set; position-pinned gates fragile to L.W1.**
"Slide 10/11 mobile OK" verdicts are against slides that no longer exist (deck winnowed 11→7); mobile e2e prose
names renamed slides; hash-position gates (`#2`=PROBLEM) break if L.W1 inserts a slide. The chronic mechanism:
real CSS fixes land, declared done against a stale capture, re-reported next look. Need a manifest↔position
contract gate + per-slide portrait captures against the CURRENT manifest. L.W-CHR's three surfaces are LARGELY
ALREADY SHIPPED (DeckGate modal, pptx popover) — the ONE real defect is the at-rest locked-blur INVERSION (blurs
on hover, not at rest). (H-slides-mobile-chrome.) → **L.W-MOB** + **L.W-CHR** (re-scope to live gaps).

### TIER C — POLISH / MINOR (real, low-leverage)

**G25 — a11y/perf: W55 adaptive-glass DORMANT (0 opt-in) + unprefixed backdrop-filter Safari trap + specular layout-thrash + maximal-glass cost ungated + stale dark-contrast oracle.**
W55 fires only on `--glass-backdrop: light` and NOBODY sets it (0 hits in slides + glass-ui demo) — the G2
legibility floor is decorative. glass-ui ships unprefixed `backdrop-filter` (Safari ≤17 → transparent text, no
fallback, because `@supports not` never fires). `useSpecularTracking` calls `getBoundingClientRect` + mints a
fresh matchMedia per pointermove, no rAF coalescing. Maximal-glass glass-in-glass nesting is ungated. The
dark-contrast oracle computes vs solid `--card` but W54 made the surface translucent. (H-a11y-perf H-1..H-6.)
→ fold across **W-GLASS-COHESION** + **W-SCALE2** + **AY.W-LIVE1/CLOSE1**.

**G26 — Overfitting: `evalFourier` dead export; the bespoke-copy precept is single-instance not a CLASS.**
`evalFourier` on `/fourier-field`, 0 call sites — a library-orphan (delete or wire). The L plan names only
`constellation.ts`; the slides feedback-coder Fourier deck arm (`--m-red: var(--viz-fourier)` + DESIGN-FOURIER
docs) is a second divergence surface. Extend the precept to "NO deck reimplements a befitting glass-ui visual;
token re-points are documented PRESETS." (H-overfitting F2/F4.) → **W-CLOSE1** + **L.W-ADOPT**.

**G27 — Two recent directives have NO AY home: per-component frontend-design convergence + colocation restructure.**
The transcript-tail asks "deploy 6 frontend-design agents to analyze every major glass-ui component … converge
on a library optimum for what slides uses" (W-SB3's story-language is a thin proxy, not the component-vs-consumer
FIT) and "break >500 components into sub-component DIRS (components+composables+constants+skeletons colocated)"
(W-GOD1's line-count split is the SMALL reading). → net-new **W-CONVERGE** + widen **W-GOD1** / net-new **W-COLOCATE**.
(H-past-conversation §"Two recent directives".)

**G28 — god-module nuances: SegmentedTabs is a FALSE logic-god-module (267 of 689 lines are `<style>`); return-shape byte-identity has no enforcement; `.css`-blind gate; ~690 legacy survivors; var-in-arbitrary idiom split.**
The gate counts SFC `<style>` as logic bloat — SegmentedTabs' script is 307 lines (under bound). The "byte-identical
return shape" gate has no machine check (the AW.W15 `proof:composable-return-types` is a wired-nowhere ORPHAN;
`useMetaballRenderer` returns a bare inline object). tokens.css (2281) / utilities.css (1170) / glass.css (1071)
have ZERO `.css`-gate coverage and a naive chop breaks cascade order. W-LEG1 "folds AX W27a/b" — those gates were
"planned" and NEVER written (~690 `[A-Z].W` survivors src-wide). var-in-arbitrary: the library MIXES `(--x)` and
`[var(--x)]` in one string; the fallback-bearing cases are a legitimate keep (no blanket rewrite). (H-godmodule F4/F5/F3/F6/F7.)
→ **W-GOD1** + **W-CSS1** + **W-LEG1** (author, decide the disposition).

**G29 — Squircle panel-membership contradiction + corner-shape aliases (precept-drift seed AY inherits via the close).**
W56b amendment (dated today) RATIFIES squircle for panels; `proof-squircle-language.mjs:178` + the W56 body say
panels stay ROUND. The new `--corner-shape-{dialog,sheet,panel,hero}` aliases must clean-break (no shadow keyword).
(H-precept-drift F6/F7.) → **W-CLOSE1** / a W56-reconcile fold.

---

## §2 — THE CHRONIC-MISS REGISTER (carried ≥2 tranches/passes — the things that MUST land)

Cross-lane synthesis of every CHRONIC flag, deduped:

| # | chronic | depth | the SLIP mechanism | lands in |
|---|---|---|---|---|
| C1 | **Cardinal-lesson captured DELTA** (the #1 meta-chronic) | keyframes.js→AX→AY (3+) | claim-done over headless-green; gate AX-hardcoded + `complete`-exempt; AY/slides unguarded | G4 → AY.W-LIVE1 + L.W4 + EVERY impl wave's gate |
| C2 | **Dock items-lag perceptual lockstep** | keyframes.js→AX→AY (3+) | code landed but the gate is tautological; the perceptual DELTA never captured (still-frames only) | G10 → AY.W-DOCK1/2 |
| C3 | **Stale-base/greenfield-no-meta as a CLASS** | AY (the ledger drift) | ledger authored at session-limit, never re-grounded; ≥6 shipped items mis-marked undone | G1 → AY.W0-REGROUND |
| C4 | **Constellation-as-consumed-glass-ui** (+bespoke kill) | slides H→I→K→L; glass-ui AW.W17→AX→AY | swap gated on a publish that keeps not happening; the gate (`proof:no-bespoke-constellation`) is named-but-unbuilt | G2/G6/G20 → L.W-ADOPT + AY.W-CON1/2/3 |
| C5 | **Aurora/Blob "stunning" artistic bar** | AS→AT→AU→AW→AX→AY (5+) | core unblocked, bar never operationalized; no captured painterly DELTA | G13/G8 → AY.W-AUR* + W-BLOB* |
| C6 | **Touch/type-scale RESIDUE** (mislabeled "no system") | AX→AY | the too-broad "DEFERRED" hides the narrow residue + the phantom gate | G15 → W-SCALE1/2 |
| C7 | **Storybook route-prune SPECIFICS** | AX.W18→AY | framed as a ROUTE prune so the orphan COMPONENTS persist tranche-after-tranche | G16 → W-SB1 |
| C8 | **Slides mobile polish** | F→H→AX→L (4) | real fixes land, declared done vs a stale capture, re-reported; no manifest-bound gate | G24 → L.W-MOB |
| C9 | **feedback-coder retracted-floor + J-strand** | I→J(branch)→L | flagged-then-marked-LANDED-then-still-live; not re-listed in the owning wave | G11/G23 → L.W6 + L.W7 |
| C10 | **The BOOK backlog is gate-invisible** (3 of ~25 in register) + G-4/G-5/G-6 promised-not-encoded | AT→AX→AY | the closure mechanism has no closure check; promise relapsed inside the wave that built the gate | G17 → AY.W-CARRY |
| C11 | **Fourier W43 intensity model** | AX.W43(stopped)→AY | the path-forward doc exists TWICE; re-producing a doc instead of LANDING the fix | G7 → AY.W-FF2 |
| C12 | **Slider design-intent (rounded-knob)** | P.W3→AV.W11→AX.W23→AX.W59→AY | re-stated each tranche's corpus, never reconciled against the shipped cap | G9 → AY.W-SLD1 |
| C13 | **keyframes-I.W6 specular non-cohesion** | keyframes I.W6→AX(W54 fold)→AY (orphaned) | misdiagnosed (folded to the wrong axis), then dropped from AY entirely | G19 → W-GLASS-COHESION |

---

## §3 — THE NET-NEW WAVES THE LANES DEMAND (not in AY.md / L.md today)

The synthesis surfaces waves NO existing plan row covers:

- **AY.W0-REGROUND** (Tier-S, blocks all) — HEAD-re-ground the ledger; the AT W0-L4 format. (G1/C3.)
- **AY.W-CARRY** (Band E, before W-CLOSE1) — onboard the full BOOK backlog + a completeness clause + the slides carry gate. (G17/C10.)
- **W-GLASS-COHESION** — the opaque Drawer + Slider-on-level + Notification + dock edge-gleam + the always-wired specular + `proof:glass-cohesion`. (G5/G19/G25.)
- **W-MOTION-COHESION** — the off-doctrine survivors + CI-promote-and-green `proof:animation-coherence` + the register-assignment assertion + the speedtest `--ease-apple-spring` fix. (G18.)
- **W-CONVERGE** — the per-major-component glass-ui↔slides FIT audit (the un-homed transcript directive). (G27.)
- **W-COLOCATE** (or widen W-GOD1) — the sub-component-dir colocation restructure + the localized design-idiom home. (G27.)
- **L.W0** (slides step-0 re-ground) — the L twin of AY.W0; reconcile `L.md` ↔ `L-DRAFT.md` ↔ `waves/`.
- Authored specs for the 6 PHANTOM waves: **L.W-ADOPT, AY.W-CON3, L.W-MOB, L.W-CHR, W-SB1/2/3**. (G2.)
- Aurora re-shape: **W-AUR-PAINTERLY** + **W-AUR-WEBGPU-DECIDE** supersede the unfalsifiable W-AUR3. (G13.)

---

## §4 — Convergence criteria (what "the master gap list is DISCHARGED" means)

The AY+L tranches are perfected against this master list ONLY when ALL hold:

1. **The ledger is HEAD-re-grounded** (G1/C3): no row marks undone what ships live-verified; every DEFERRED/CHRONIC
   row carries a HEAD file:line + the precise NARROW residue. A fresh auditor re-running the grep finds ZERO
   ask whose plan-status contradicts source.
2. **Every wave has an authored spec** (G2): `AY/waves/` + `L/waves/L.W-{ADOPT,MOB,CHR}` exist with
   defect→objective→edit-sites→evidence-backed-HARD-GATE; `L.md`↔`L-DRAFT.md`↔`waves/` reconciled.
3. **Every named gate EXISTS, is GREEN, and (where it guards a CI invariant) is IN CI** (G3): `proof:no-bespoke-constellation`,
   `proof:touch-target`, `proof:glass-cohesion`, the slides axe + capture gates authored; `proof:no-god-module`,
   `proof:animation-coherence`, `proof:no-orphan-demo-route` CI-promoted-and-green.
4. **The cardinal-lesson gate is tranche-parameterized + covers `complete` + filename-matches + lives in slides too** (G4/C1),
   and EVERY AY/L visual wave names it (not prose "capture") with an own-surface DELTA at ≥2 viewports × light/dark.
5. **The blocker-class surfaces are fixed on captured DELTAs**: the Drawer paints glass (G5); the constellation
   re-fit + freeze seam + anomaly props land in the LIB before slides adopts (G6/G20); fourier W43 re-lands and
   reads (G7); the blob default is a light bead (G8); the slider design intent is resolved by a user-judged delta (G9);
   the dock lockstep gate asserts the entering-child onset (G10); the feedback-coder metric is correctly named (G11).
6. **The artistic bar is falsifiable** (G13/C5): the 3 reference-anchored aurora metrics + the captured painterly-medium
   DELTA; the blob default-warmth π readback born-RED-at-HEAD.
7. **The ≥2-consumer bar holds**: orphans (header-ribbon/glass-panel/useTokenColor/evalFourier) retired-or-evidenced;
   NO consumer carries a bespoke copy of a befitting visual (constellation + fourier as a CLASS).
8. **The carry-closure register = the deferral set** (G17/C10), G-4/G-5/G-6 encoded-or-retired, and slides has a carry gate.

The bar: a fresh adversarial re-run of all 24 lanes finds ZERO stale plan-status, ZERO phantom wave/gate, ZERO
"done" without a captured DELTA, and ZERO Tier-S/Tier-A finding open.
