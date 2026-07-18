# BJ formation — the finding-family REGISTRY

Maintained by the team lead (Fable). Round 1: 11 lenses, 66 findings, 0 errors (digests at
`round-1/`). Families are keyed by underlying MECHANISM; members cite `lens:finding-family`.
Reconciled against the lead's visual read (`VISUAL-GESTALT.md`) and the full feedback ledger
(`../FEEDBACK-LEDGER.md`) — including the 10 rows the prompt-recap lens caught the gestalt seed
omitting (F02/F07/F13/F14/F19/F23, A07/A10/A11/A14; all assigned below).

Stability rule: the registry is stable when two consecutive rounds surface nothing new.
Status after Round 1: NOT STABLE (first sweep; verification + new lenses pending).

---

## Adjudications by the lead (round-1 findings resolved at synthesis)

- `chronic:green-over-red-release-dating` + `plan:premature-version-finalization` — **RETIRED
  (user order)**. The fleet ran narrative-withheld: the user's 2026-07-17 order "First, publish
  7.0.0" resolved Decision-0 as CUT-NOW and superseded the V-A95 hold. The dating is authorized.
- `recap:registry-outside-committed-record` — **CURED during the round**: the BJ corpus was
  committed at 701fed5c before synthesis.
- `crossrepo:stale-cross-repo-pin-evidence` — **partially retires a blocker**: sci-report pins
  glass `6.0.0` EXACT (no auto-resolve hazard); the row-6 "HARD pre-publish blocker" premise is
  false at HEAD. The roster rewrite still rides family B.
- `chronic:chronic-decision-rerouted-to-gated-ask` — **partially resolved by the same order**:
  Q051 rows 2/3/4/9/10 self-ratify at the tag; rows 1/11-16 are LIVE BJ inputs (family I).
- `deadcode:css-partial-orphaned-by-component-fold` — **CONFIRMED SHIPPING DEFECT riding the
  7.0.0 tag** (like V-A95, by order): Chip/Badge glass styling dead in dist. Born-RED BJ row;
  reported plainly in the publish record.

---

## Family A — gate-reformation (the 40-60 collapse)
**Verdict: the census supports ~45-55 keeps vs ~1032 enforced assertions; the only sound pixel
gate is wired to nothing.**
Members: gate:pin-implementation-literal · gate:unwired-gate-non-execution (π suite + canon-doc) ·
gate:mirror-implementation-self-fixture · gate:vacuous-no-assertion (6 zero-assert specs) ·
gate:testing-the-tooling-fixture-mirror · gate:redundant-surface-snapshot ·
gate:gate-count-overshoot · chronic:liveness-enforcement-abrogated ·
canon:unenforced-token-system · surface:absent-gate-over-declared-enforcement ·
deadcode (the orphan-CSS gate gap).
Wave-candidates: (1) the invariant-set collapse (keep-list already drafted in the gate digest);
(2) wire substrate-paints-color pixel floors into CI; (3) NEW static hygiene gates that CAN fail:
token-hygiene (raw radius/blur/font-size literals), orphan-CSS-partial (index.css import
closure), prop-granularity dead-config check. Feeds the user's gates-abrogation mandate directly.

## Family B — consumer-truth / cross-repo relay
**Verdict: the close's "no consumer" claims were structurally vacuous (in-repo-only probes);
real sibling imports exist for retired surfaces; two sentences carry wrong provenance; one
relayed successor API is phantom.**
Members: dag:in-repo-scoped-consumer-probe-vacuous · dag:consumer-provenance-misattribution ×2
(completion-seal→sci-report NOT speedtest; deck→atlas NOT slides) ·
dag:surface-cut-ahead-of-consumer-relay (metric granular subpaths) ·
dag:incomplete-consumer-census (slides hover-card + controls) ·
dag:sentence-blast-radius-confirmed (instrument-chassis = speedtest+muster ×7 sites) ·
crossrepo:phantom-successor-api-adopted-by-consumer (`Tooltip preset="icon"` DOES NOT EXIST;
speedtest already booked it) · crossrepo:deferred-behavioral-contract-relay (atlas #22b/c) ·
crossrepo:deferred-consumer-ruling-on-masking-fallback (atlas pre-stage) ·
crossrepo:stale-cross-repo-pin-evidence.
IMMEDIATE (publish-adjacent, Q060): the enumerated per-repo ask roster (sheet, confirm-dialog,
toggle-chip, metric-badge/cell/stack, hover-card, controls→dark-mode-toggle) with corrected
provenance + the Tooltip correction sent NOW (compose TooltipTrigger/Content — no preset prop) +
the atlas #22b/c note (PEEK non-native) + the pre-stage ruling. Round-2 verify lens re-proves
every sibling file:line before the outbound is written.
BJ wave: replace the vacuous probe class with an enumerated sibling-import census discipline.

## Family C — surface-reduction (the ruthless purge; F04/F18/F25/F26/F30/F32/F33/F42/F44/A05)
**Verdict: 73% of bespoke props (298/408) have ≤1 setter; 20 components carry ≥6; prime deletes
and single-consumer relocations identified with blast radii.**
Members: surface:algorithm-knob-leak ×4 (HandMark 11 dead knobs, Typewriter 11, FourierField 5,
AnimatedDigit/WatercolorDot) · surface:single-consumer-shipped-surface ×3 (DataTable 458 LOC/1
consumer, Constellation, easing family) · surface:decorative-flag-proliferation ×2 (Card
metal:'gold' grain:true defaults!, DialogContent stage axis) · surface:variant-axis-proliferation
(GlassDock 16 props/5 axes, dead position axis) · surface:leaky-cross-component-coupling (Slider
keepDockOpen) · surface:demo-device-shipped-as-component (Configurator public) ·
surface:wrapper-surface-duplication (Labeled* 7/12 dead) · surface:passthrough-surface-inflation
(Progress reka passthroughs) · dag:reduction-candidate-inventory (liquid-grid + header-ribbon =
ZERO consumers, prime deletes; handmark/watercolor-dot/timeline/scroll-progress-rim
single-external) · deadcode:dead-obsolete-config-duplicate (fourier presets.ts) ·
deadcode:dead-aggregation-barrel ×5 · deadcode:unverified-external-consumer-claim (useStagger) ·
recap:recap-carry-unexecuted-at-close (UF-K1 metric/chassis removal now THIRD-asked — disease).
Ledger rows: F04, F16 (timeline ground-up), F18, F25, F26, F30, F32, F33, F42, F44, F45
(compositions prune), A05 (the DAG), A14 (procedural codification umbrella).
BJ band: the component-DAG reduction band + the QUESTIONS-IN-REDUCTION ASK (user-ordered; the
per-component kill/keep/merge table with evidence). The UF-K1 carry is a DISEASE row — deciding
it is a wave of its own per the charter.

## Family D — story meta-framework (A06 + the copy canon)
**Verdict: the root chassis IS standardized (100 routes through StoryPage) but per-type variants
are 6 parallel unnamed wrappers + 23 bespoke-CSS pages; copy leaks internals; the width token is
an undefined no-op; hero hierarchy is inverted by hardcodes.**
Members: story:per-type-variant-fragmentation · story:undefined-layout-token-noop
(--story-article-w undefined → uncapped articles) · story:dead-scale-data-render-contradiction
(landing heroScale dead, D0 renders at two sizes) · story:studio-idiom-fork (liquid-grid
hand-reimplements VizStudio) · story:hero-variant-heading-duplication ·
story:unadopted-standardized-subsystem (StoryBody 3/88) · visual family 2
(meta-caption-jargon-leak: F03/F40/F41 + mono-caption idiom + fake SOC2/12k claims F43) ·
visual family 7 (configurator-cramp: F09/F10/F11/F29/F31) · visual family 3
(preview-card-vacancy: F01/F02/F46 — joins family E for the perf half).
Ledger rows: F03, F05 (missing section aurora), F07 (story-page transitions — new
sub-mechanism: transition choreography), F10, F11, F13 (sortable-list horizontal), F14
(**cross-cutting responsive/mobile-first owner — first-class wave, not absorbed**), F29, F31,
F40, F41, F46, A06.
BJ band: the story reformation — page-type taxonomy (~7 types the census supports), variant
registry on the manifest, configurator standard, copy canon (kill the jargon/meta-caption
class), width/hierarchy truth, transition choreography, preview-card redesign (masonry +
LIVE miniatures), F14 as its own responsive audit wave.

## Family E — demo/story performance (A17)
**Verdict: mechanisms identified statically with high confidence; live-trace confirmation owed.**
Members: perf:eager-boot-graph-bloat (~1.1MB before first paint; PresetEditor + Aurora +
reka floating stack eager in AppShell; mount gated on all of it) ·
perf:content-visibility-deferred-paint (blank 19rem boxes; F02's blank-white cards) ·
perf:persistent-webgl-shell-loop (fixed inset-0 Aurora; pause guard unreachable) ·
perf:svg-turbulence-paint-cost (13 live feTurbulence on /foundations/colors) ·
perf:blocking-nav-no-feedback (beforeResolve awaits chunks; no skeleton — F06's flash/slow
transitions likely co-caused).
Ledger rows: F01 (stutter), F02, F06, F46, A17.
BJ band: perf remediation with born-RED trace gates (async configurator/dock imports, shell
field gating, above-fold content-visibility exemption, shared filter def, route-pending
affordance). Round-3 browser lens captures the RED baseline trace.

## Family F — material/token canon (radius · blur · type)
**Verdict: the token systems exist and are NOT enforceable; ladder defects explain the reported
inconsistency.**
Members: canon:unenforced-token-system (raw blur(14px)/999px/5px at HEAD) ·
canon:blur-ladder-collision-and-mode-divergence (quiet==resting==7px, floating==overlay==11px,
overlay silently 17px at 2dppx — the F28/F48 mechanism) · canon:semantic-alias-points-at-wrong-
surface (--radius-input not used by Input) · canon:stale-gate-rationale-over-dead-token
(--corner-k-* dead, guarded by a gate that no longer exists) · visual family 1
(radius-canon-collapse: F09/F12/F15/F17/F45/F48) · visual family 5 (glass-material-heaviness:
F48/F49/F50 progressive-blur target).
Ledger rows: F12, F15 (rounding + TYPOGRAPHY audits), F17, F19 (alert glassiness), F23
(slider/progress DRY — the track-family dedup is its own wave-candidate), F28, F48, F49, F50,
A10 (aristotelian proportion audit).
BJ band: the token-canon reformation — one radius role-scale enforced, blur ladder collapsed +
subtler + documented, typography audit, gradient-backdrop-blur experiment wave
(adopt-or-retire the landed --glass-halo-* cohort: `chronic:experiment-frozen-into-major`
folds here), aristotelian proportion pass. Round-2 typography lens supplies the census.

## Family G — greenfields + born-RED defects
**Verdict: four user-named greenfields + two live defects + one motion family.**
Members: visual family 4 (handmark-total-failure → GREENFIELD w/ pencil-boil) · visual family 6
(dock-overflow-affordance → dock GREENFIELD: F47 occlusion signaling + auto-advance, F27
interior scroll, F04/F05 shape grammar, F06 transitions) · visual family 8 + F08/A13 (aurora
preset reduction + REAL van-Gogh/oil-pastel/crayon modes or nothing) · A12 (blob greenfield —
reference the OLD value.js implementation) · V-A95 aurora reverse-drag slab (ACTIVE RED,
carried) · deadcode:css-partial-orphaned (chip/glass-atom dead in dist — born-RED fix wave) ·
visual family 9 (feedback-motion-brokenness: F20 toast≡dialog, F21 rim, F22 loop easing, F24
skeleton) · A01/A11 engagement (ENGAGE-AFFORD/SLIDER-ENGAGE waves registered;
`chronic:phantom-bank-landing-vehicle` demands the bank be NAMED: the rim-only branch =
worktree-agent-ad45af8a27c9ce531 per EXEC-STATE — name it in the wave doc or land Tier-1 GROW).
Each greenfield runs the design-loop charter (PROMPTS/design-loop-prompt.md) with Fable
portfolio/critique and DesignSync.

## Family H — structure/colocation (A07)
**Verdict: canon describes a dead layout; the colocation edict needs a census + enforcement.**
Members: canon:canon-describes-dead-file-layout (design-idioms §3/§7 point at 6 nonexistent
files; §7 now mandates the INVERSE of reality) · deadcode:dead-aggregation-barrel (the barrel
hygiene half) · A07 (recursive colocation edict, module-level composables/ only, long-dir
breakup, backend equivalents).
BJ band: colocation census (Round 2) → restructure waves + precepts rewrite.

## Family I — chronic-discipline (the disease ledger)
**Verdict: the anti-re-booking machinery was itself circumvented; enforcement died with the gate
ruling.**
Members: chronic:chronic-decision-rerouted-to-gated-ask (AX books ~10 closes, inline-edit ~10,
dock fission 3+, aurora-medium-lazy 4+ — now partially self-ratified; rows 1/11-16 live) ·
chronic:deferral-to-invented-future-window (LADDER-DERIVE "structural window", ENGAGE-AFFORD
Tier-2 "7.x", GRADED-BACKDROP "later minor/major") · chronic:phantom-bank-landing-vehicle ·
chronic:untracked-watch-item (breath-of-life edge-channel WATCH has no ledger row) ·
chronic:vacuous-acceptance-and-artifact-mismatch (LADDER-DERIVE seat-2 status) ·
recap:family-seed-omission (cured in this registry) · recap:recap-carry-unexecuted (the UF-K1
third-ask → family C's disease row).
BJ band: the DECIDED-rows wave — every chronic/deferred/invented-window item gets build / fold /
retire with rationale, disease rows as standalone waves; liveness invariants re-expressed as
executable one-time RED→GREEN differentials (the gate ruling's lawful substitute).

## Family J — doc-truth sweep
**Verdict: prose drifted from landed reality in named places; one truth-up wave clears it.**
Members: plan:stale-mirror-comment-desync (scheme-spring.css dock row still 0.68/ζ0.64 +
transient missing — named-owed, never done) · plan:meta-reintroduction-post-scrub
(placement.css:93 "BI.W-ENGAGE-AFFORD" post-zero) · canon:stale-canon-default (tunable-anim 4px
reveal-blur fiction) · canon:canon-describes-dead-file-layout (shared with H) · the roster/
MIGRATION contradictions from family B (metric row 15 vs MetricBadge deletion; row 14 phantom
preset).
BJ wave: one truth-up sweep, enumerated targets, no re-drift (the sweep list IS the spec).

---

## Round-2 staffing (dispatched)

1. `verify:consumer-truth` (opus) — adversarially re-prove every family-B sibling claim on disk;
   deliver the exact per-repo ask table for the Q060 outbound.
2. `lens:a11y` (opus) — NEW lens (round-1 gap): focus/inert/aria/reduced-motion across
   dialog/dock/menu/drawer.
3. `lens:typography` (opus) — the F15 typography audit census: scale usage, raw literals,
   mono-caption idiom sites (feeds D+F).
4. `lens:colocation` (opus) — the A07 census: current tree vs the recursive colocation edict,
   violation table (feeds H).
5. `lens:aurora-presets` (opus) — quantify F08: preset config vectors, pairwise similarity,
   reduction table (feeds G).
6. `codex:ios27-A` + 7. `codex:ios27-B` (fable ×2) — the A02 frame-by-frame marks over the
   extracted corpus + stills (feeds F/G + A03 triumvirate).

Held for Round 3 (browser seat frees when the Q002 suite exits): live-paint verification of the
chip defect + F02 blank cards + F06 transition flash; the perf RED baseline trace; the
engagement audit (A01/A11); V-A95 live probe. Design-loop passes for the four greenfields form
Rounds 4+ after the registry stabilizes.

---

## Round-2 fold (13 seats returned: 7 original + 6 confirmation; digests at round-2/ and
round-2b-confirm/; chronic compiler = Round 2C, pending)

**Stability signal:** all 8 round-1 headline claims CONFIRMED by the adversarial re-proof (the
only corrections were file paths — demo/ not src/demo/). The chip orphan is proven in SHIPPED
dist: 0 `.glass-chip`/`.glass-atom` rules in dist/glass-ui.css — upgraded CRITICAL. Independent
gate census: 180 files / 1055 it-blocks / 248 describes. The duplicated 2B batch-1/2 seats act
as an unplanned second independent pass over five lenses — their agreement is banked as a
stability data point. Registry still NOT STABLE: round 2 surfaced material new findings.

**Family B corrections (the Q060 roster truth, from verify-consumer-truth):** round-1's census
was wrong in FIVE places — (1) /controls→/dark-mode-toggle is consumed by EIGHT repos (~11
sites: speedtest, muster, words, value.js-demo ×2, bbnf, atlas ×2, sci-report, slides ×2), not
two; (2) /metric-badge is imported across the ENTIRE fourier-analysis repo (7 files) + speedtest
SurveyResultDock + muster CommandDock; (3) **header-ribbon "prime delete" REFUTED** — keyframes.js
EditorShell.vue:116 imports it and MIGRATION.md:115 marks the subpath KEPT (keyframes.js is an
UNDECLARED glass-ui consumer — the census class that in-repo probes structurally miss); (4) the
hover-card "atlas ×1" row is PHANTOM (atlas: 0) while real consumers speedtest MapTooltip.vue:36
+ fourier-analysis ×2 were missed; (5) completion-seal adds atlas ×2 (completion.ts:5,
category.ts:2) beside sci-report. All consumer pins sit BEHIND 7.0.0 — every break is
prospective on the bump. The corrected break table in round-2/adversarial-verification digest is
the Q060 mail source.

**Family F additions (typography lens):** CRITICAL enforceability fact — the Tailwind default
ramp is never reset (`--text-*: initial` absent), so text-sm/text-xs (251 sites) silently bypass
the √φ fluid scale; no lint can work until the default ramp is cleared. Mono-caption idiom
saturates 65/128 story pages (126× text-mono-caption + 57× text-admin-label + structural
injection via StorySection.vue:29). Story hierarchy is typographically flat: ~335 flat carriers
vs ~34 ladder carriers — the F10 mechanism. Even the canon files don't dogfood their own tokens.

**Family G additions (aurora lens):** the WGSL primary maps mediums 3/5/6/7 (oil, vangogh,
oil-pastel, kuwahara) ALL to mediumKuwahara (aurora-mediums.wgsl.ts:399-400) — the user's
"almost identical" verdict is mechanically true on WebGPU; oil-pastel is a constants-skin of oil
even on WebGL; crayon IS genuinely distinct (own body both backends). 17 presets → 9-10 proposal:
kill VIVID_SETTING_SUN / OILPASTEL_RAINBOW / OILPASTEL_OCEAN / OIL_GESTURAL / one watercolor;
relocate SPEEDTEST to its consumer; a PROPER van-Gogh mode requires porting real stroke bodies
to WGSL — the aurora greenfield's central technical fact. uniformBridge.ts:76-79 comment is
stale (family J).

**Family H additions (colocation census):** edict ~70% realized; dock/ is the gold standard;
`index.css @import position IS the cascade order` — §7's central-partial doctrine refuted by 15
shipped counter-examples. Fewest-move migration: glass/wave→liquid-grid, textureUpload→aurora,
**src/composables/sidebar (7 files, public ./sidebar export) → demo/** (zero library consumers),
accent-tone.css→chip, carve _shared/ (21 flat) into 5 submodules, normalize handmark helpers.

**NEW family K — component a11y defects (a11y lens):** SidebarDock's aria-label lands on a
role-less div with no nav landmark (BottomDock has the correct pattern — divergence, not
ignorance); DockControl emits aria-pressed only when ON; center-spring dialogs orphan focus on
body through the exit spring (the side-sheet/drawer guard never covers centerSpringActive);
two placeholder registers fall below 4.5:1 by different mechanisms; dock has no roving
tabindex/toolbar role (ruling needed); the hero h1/h2 duplication corroborated. Reduced-motion
substrate is genuinely strong — carve that as a confirmed KEEP.

**The iOS-27 codex (both Fable seats):** unified at ios27/IOS27-CODEX.md — 13 laws in three
groups (material: progressive blur / adaptive tint / edge caustic / radius-role grammar; motion:
origin-anchored morph / goo-morph nav / detent sheets / staggered reactive entry / axis-morph;
identity: type ladder without meta-captions / restraint floor / fill-pill progress / liquid-metal
blob) + the five BEST-iOS-27 vectors. Full marks at ios27/MARKS-A.md + MARKS-B.md. This is the
design authority for families F and G and the A03 triumvirate.

**Round-3 plan unchanged** (browser lenses, post-suite). Round 2C (chronic DECIDED-row compiler)
pending → family I adjudication. After Round 3 + 2C fold: the wave-shaping synthesis begins
(bands from families A-K), then the two-consecutive-clean stability passes.

---

## Round-3a fold (the live paint-verify fable browser seat; digest at round-3-live/R3A-DIGEST.md,
30 captures + readback JSONs in the same dir; live WebGPU apple/metal-3, localhost:5199)

Five carried claims driven live. ONE confirms as a shipped defect; the other four clear or
drift-explain — a materially better outcome than the registry assumed:

1. **chip-css-orphan CONFIRMED-DEFECT (major)** — the one live-proven regression. glass-chip.css
   imported nowhere; a selectable chip toggled to aria-pressed=true paints ZERO accent feedback
   (invisible selection), ::after flood absent (`--chip-flood-t` unregistered => file not in
   bundle), remove button unstyled (10×23px block, radius 0). .glass-capsule saves the base
   lozenge, which is why it slipped. Family A's born-RED fix wave stands with live evidence:
   import glass-chip.css in glass.css after glass-capsule.css (or fold into the partials),
   clean break.
2. **F02 preview cards CLEARED as paint defect** — the /foundations cards are the DELIBERATE
   identity-fallback rung (dark translucent slab + section name; /display proves richer tiles
   render where authored). Family C's wave REFRAMES: not "fix blank paint" but "author tiles +
   masonry redesign" (the F46/A17 design work) — the defect reading is retired.
3. **F06 white-flash CLEARED** — root bg min-channel never exceeds 9/255 across every dock
   transition. The real cost: ONE-TIME ~186ms cold-nav stall (lazy-chunk import + GL mount),
   settling to 32-52ms warm. Family E's wave reframes to chunk-prefetch/context-warm, minor.
4. **V-A95 NOT REPRODUCED on live WebGPU** — three reverse-drag variants (single R→L, mid-drag
   reverse, two rapid successive) each reshape the field with NO black slab; sweep residual
   healthy. CRITICAL confound discovered: the seat's own first probe called
   canvas.getContext('webgl2'), STOLE the single-context canvas, and produced a false
   "WebGPU unavailable" fallback — the only black-ish state seen was self-inflicted. The
   original V-A95 claim is now suspect as the same instrumentation artifact. Disposition:
   the BJ wave inverts from "cure the slab" to "re-repro under real CDP pointer input with a
   NEVER-getContext discipline; close V-A95 if it does not reproduce." **The live-π
   context-steal trap is now a standing lesson: never call getContext on a live WebGPU canvas.**
5. **dock-material DRIFT-EXPLAINED** — root .glass-dock transparent by design; .dock-plate
   child carries the material (blur(7px) saturate(1.3) brightness(1.14)); trays paint correctly
   across all 14 docks. Intentional layering indirection, not a defect; the suite reformation
   (family A) asserts .dock-plate, and "should .glass-dock self-paint" is a design decision row,
   not a bug.

R3b (perf DEV-baselines + the A01/A11 engagement sample table) still running on the same
browser seat; its fold follows.

---

## Round-3b fold (perf DEV-baselines + A01/A11 engagement audit; digest at
round-3-live/R3B-DIGEST.md; raw traces local-only per the gitignore rule)

**Perf (all DEV-server numbers, product gates re-measure on a build):** cold LCP healthy
(root 391ms / foundations 405ms / blob 488ms, CLS 0.00 at load, zero console errors) and
render-delay-dominated (~99%) — the lever is boot JS, not network. The two-boot-long-task
signature is stable (~208-210ms TBT light pages, 283ms blob). **The dominant cost is
main-thread churn (MAJOR): the live glass/WebGL fields run rAF continuously at idle — ~40k
RunTasks / ~1.6-1.7s task time in a 5.3s window on light pages, nearly doubling to ~52k /
~3.11s on /substrates/blob, which also trips a ForcedReflow insight.** Family E's headline
gate becomes a rAF-budget / idle-frame-cost gate + the blob forced-reflow fix; LCP gates seed
from these baselines. Route transition into blob: 119ms freeze (one 83ms long-task) then
immediate settle, but the swap injects CLS 0.04 — the transition should reserve space.

**Engagement (the A01/A11 presence/absence table = the ENGAGE-AFFORD wave scope):**
idle-breath — progress (indeterminate/loop) YES, substrate/section fields YES, slider NO,
button NO, collapsed dock NO. Interaction — dock STRONG (hover-to-expand morph verified live,
the engagement exemplar), slider STRONG (focus ring + spring fill + live label), button WEAK
(1.5% scale + faint rim — MAJOR, the edict's weakest link). The wave: (a) idle breath for
every atom, buttons first; (b) hover/press affordance strengthened well past 1.5% so it reads
grow/glow/lift.

**Two riders:** (1) interaction-robustness — the slider's role=slider node is NOT the hittable
target (zero-width thumb span; synthetic pointer no-ops; only trusted CDP keyboard moved it):
slider tests must target the track or use keyboard — joins the binding-verification lesson
class. (2) visual-landing — root bento preview areas render empty dark panels + a detached
yellow goo-blob floats right of the hero: routed to family C (preview/tile work) for
intended-vs-regression confirmation.

---

## Truth-up (JUDGE.md, 2026-07-17)

**T1 — overlay role-split (INFER truth-up).** `role:overlay` splits PRINCIPLED into **floating**
(the tooltip/popover/menu family on `_shared/floating.ts`, 8 consumers) vs **modal** (the DialogRoot
family); the `*Content` divergence between them is JUSTIFIED variation, not drift. No factoring is
owed — the split is a real role boundary, not a duplication defect.
