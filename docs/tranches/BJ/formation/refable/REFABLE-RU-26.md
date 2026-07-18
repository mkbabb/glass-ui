# REFABLE RU-26—the breath-of-life design layer (redo, retrospective adjudication)

- **Unit**: RU-26 BREATH-OF-LIFE—the convergent design loop (7-family portfolio, pass-1
  research/synthesis/prototypes/critiques, pass-2 paint riders, the rim-vs-body A/B, the
  graded-backdrop experiments) whose design layer shipped into the BI engagement/affordance
  waves, judged against the standing edict ("every component always displays engagement, in
  aristotelian proportion") and the suffusion matrix as the Fable-derived answer to the same
  question.
- **Verified model**: this seat is powered by `claude-fable-5`—read verbatim from this seat's
  system context ("The exact model ID is claude-fable-5"). The scrutinized loop corpus is
  census-presumed opus-begat per `CENSUS-CLASSIFICATION.md` (the settings-level
  `CLAUDE_CODE_SUBAGENT_MODEL=opus` override; 332/349 seats), its "(Fable)" seat declarations
  notwithstanding.
- **Protocol trace**: (1) ANEW at HEAD `454f6d64`—canon (IOS27-CODEX 18 laws, SUFFUSION-MATRIX,
  BJ PLAN §3 laws) + src/ + demo/ + git history read with every opus-era wave/design doc unread;
  the ANEW findings below were fixed first. (2) Boundary moment recorded at the first wave-doc
  Read (`BI.W-ENGAGE-AFFORD.md` + `BI.W-GRADED-BACKDROP.md`, 2026-07-18 morning, before which
  no BI wave doc, no `bi-addenda/reports/breath-of-life/` file, and no sibling REFABLE sidecar
  had been opened). (3) SCRUTINY assume-incorrect—the two wave docs, `BI.W-AFFORDANCE-REDESIGN.md`,
  and the breath-of-life `REGISTRY.md` + pass-2 riders read; every deterministic claim re-verified
  on disk and in history. Paint-only severity claims are LIVE-DEFER throughout (no browser this
  seat, per fence).

---

## 1. ANEW—the shipped design layer at HEAD, judged against edict + matrix

What the breath-of-life layer actually IS at HEAD `454f6d64` (7.0.0):

- **On-interaction half, partial.** Press-charge (`useLiquidPress`, volume-preserving reciprocal
  squish on a spring `--press-t`) has exactly four JS consumers—Button, DarkModeToggle,
  DockControl, ScrubberTimeline—plus the CSS `.tap-squish` 0.96 floor on binary atoms
  (checkbox, switch root). The pointer catch-light + angle-keyed rim glint (one `::before`,
  rest intensity 0, press-coupled to the ONE `--glass-btn-press-t` channel with spring
  release-settle) is wired on Button, DockControl, DockTrigger, Surface, ScrubberTimeline.
  This matches the matrix A-row APPLIED script nearly verbatim and honors the idle law (no
  light event on a static surface—`--glass-specular-intensity-rest` defaults 0).
- **At-rest half, absent.** Zero idle animation on any component atom: no restraint-floor
  ambient (codex law 11), no licensed ~8s idle specular sweep on any selection lens (matrix
  G-row's one idle light—dock, tabs: no such animation exists in their CSS), no breath
  anywhere outside loading surfaces. The edict's "always displays engagement" is met at HEAD
  only by static material presence. This is the largest edict divergence and is already the
  BJ carry (`BJ.W-IDLE-BREATH` born-RED names it: "the three atoms return zero idle
  animation")—ratified as carried, under-scoped as specced (§4 routings 1-2).
- **Loading vocabulary diverges from the matrix.** Skeleton ships a traveling 105° shimmer
  scan (`skeleton-scan`, translate3d, 2.4s); the matrix's ONE library-wide loading vocabulary
  is "the slow luminance drift on the component's own surface." A sweep is not a drift.
  Pulse (FeedbackMark `data-motion`, 1.8s, active-only, PRM-gated) and the completion-seal
  draw+shimmer license conform.
- **State-flip vocabulary diverges.** Checkbox/radio marks are static lucide mounts—instant
  appear on reka indicator mount. Matrix B-row: "the mark DRAWS (handmark stroke, ~150ms),
  never fades in." No draw exists at HEAD (draw-in.css serves completion-seal/fourier only).
- **Tooltip is near-zero-dose, trace off.** `data-reveal="tooltip"`: ease-out-expo, 0.2s,
  scale 0.97→1, blur 0, no overshoot—vs the matrix's "ONE clock, sub-150ms, fade + 4px rise,
  no glass bloom." Same spirit, two trace deviations (clock 200ms; scale-bloom not rise).
- **The graded halo shipped both forms with co-applied luminance**—FORM 1 side-sheet
  directional ramp (default on placed glass sheets; mask 0.325→1 over 120px + luminance
  gradient), FORM 2 centred box-following bloom (opt-in `backdrop="graded"`, scrim default;
  intersect double-ramp mask + `--glass-bg-overlay` dim on the same plate). Codex law 1's
  central invariant (blur never without a luminance layer) HOLDS in both shipped forms.
  Verdict ownership of the subtlety/graded layer is RU-24's; this unit takes only the
  engagement-side seams (§3 W3, §4 routing 5).
- **Scalar roster truth.** `--motion-weight` (73 refs), `--flex-vel` (15), `--atom-drag-v`
  (14) exist as the matrix says; the pass-2 scalars (`--engage-t`, `--overpull`, `--impulse`,
  `--scrub-t`, `--medium-t`) are absent at HEAD as specced—no phantom claims found in source.
- **The `--glass-engage` layer is NOT at HEAD.** Zero refs in src/ + demo/. The engaged-rim
  work (register scalar → rim ink lift → silhouette ramp → JND retune → body channel mounted
  then retired → slider engage-rim mount fix) lives entirely on the banked branch
  `worktree-agent-ad45af8a27c9ce531`, post-tag. Likewise ENGAGE-AFFORD: no `.engage-grow`,
  no `--scale-engage`, no `engage` prop, no `useEngageModal` anywhere at HEAD.

## 2. SCRUTINY—the opus-era corpus, assume-incorrect, re-verified

Corpus read at the boundary: `BI.W-ENGAGE-AFFORD.md`, `BI.W-GRADED-BACKDROP.md`,
`BI.W-AFFORDANCE-REDESIGN.md`, `bi-addenda/reports/breath-of-life/REGISTRY.md` (round-zero +
pass-1 + pass-2 verdicts), `pass2/CHARTER.md`, `pass2/research-F6-riderB.md`, the pass-2
artifact roster, and the banked branch's diff.

Deterministic re-verification results:

- ENGAGE-AFFORD's load-bearing source citations are TRUE at HEAD: the slider weight-train
  keys off `:active`/`[data-held]` (Slider.vue:431/444-445), the keyboard read is
  `:focus-within` on `.slider-track` (:416), the root is not the focus target (the
  `:has(:focus-visible)` delegate arm is correct against shipped reka topology), Switch
  composes `.tap-squish` (Switch.vue:38), the immersive scrim is 14px (drawer/styles.css:379,
  row-9 16→14 landed), the side-sheet deep-frost is 34px (row-10 40→34 landed), the halo ink
  is the `--glass-bg-overlay` mix.
- The `data-held`/`data-touch-active` rename STRIKE, the dock-defer fence, the `vivid`-shadow
  strike, and the discrete-promotion ruling all check out against shipped topology.
- AFFORDANCE-REDESIGN (B68) shipped as claimed: `demo/stories/data/search.vue` carries no
  `buildIndex`/`searchIndex`/`fuzzyMatch`/`data-testid` (AF1), sortable-list carries no
  SORTABLE_CONTEXT readout, avatar.vue composes StorySection ×9 (AF3).
- The banked branch's rim mechanism matches the pass-2 verdict exactly:
  `--glass-engage-rim: calc(2 * var(--glass-specular-intensity-active))` (rim.css:105 on the
  branch), body channel retired at `224024c3`, slider engage-rim mount fixed at `820828d4`.
- The pass-1 self-refutations (the φ-costume: semitone `2^(1/12)=1.0595` fits shipped 1.06
  4× closer than `φ^(1/8)`; the −7 token ledger manufactured; F7's derivation never built)
  are honest and internally evidenced.
- F6 (Living Breath) `research-F6-riderB.md` is a PROTOCOL, not a verdict: its own closing
  language forbids the perceptual claim ("verdict language stays 'the breath WITH ignition
  was probed'… until the delta artifact shows it") and no riderB judgment artifact exists.
  F6's "ADVANCE" is therefore an un-adjudicated thesis.
- The pass-2 paint verdicts (Phase A "ALIVE not muddy," Phase B "calm not gaudy, too-quiet
  CLEARED," ADOPT-A-RETIRE-B) carry measured numbers (ΔL, contrast ratios) consistent with
  the branch's code and 21 captured artifacts on disk—but the TASTE half is census-presumed
  opus under a Fable declaration, and no live re-observation is possible this seat: LIVE-DEFER.

## 3. UNION—per-claim verdicts

### OPUS-WRONG (4)

- **W1—the ENGAGE-AFFORD tag-sequencing as recorded vs shipped fact.** The spec rules
  "Tier-1 GROW—rides the Glass 7 tag… its π gates the tag via Q002." 7.0.0 shipped with NO
  GROW tokens, no `.engage-grow`, no slider `engage` prop, and no
  `W-ENGAGE-AFFORD-DELTA.md` in the visual roster. The BJ PLAN §2 carry row still reads
  "Tier-1 GROW… rides its tag"—stale as a state description. Context stated fairly: the
  user's CUT-NOW publish order collapsed the pre-tag lane; the wrongness adjudicated is that
  the record was never trued up—a sequencing commitment carried forward as if kept.
- **W2—the loop's seat-model declarations.** `pass2/CHARTER.md` declares "Agglomeration seat
  (Fable)"; the census correction demonstrates the override forced 332/349 seats to opus.
  The declaration is presumptively false, and with it the standing model-split law ("Fable
  judges the engagement feel at paint"—ENGAGE-AFFORD's own §Implementation-model note) was
  presumptively breached by the loop's paint verdicts themselves. The measured numbers
  survive (script-derived, artifact-backed); the blind-read taste verdicts do not ratify.
- **W3—the shipped halo-cohort comment states a phantom consumer as fact.**
  `tokens/glass.css` §halo: "The immersive Dialog + the ENGAGE-AFFORD slider modal are the
  two opt-in consumers." The slider modal does not exist at HEAD (Tier-2 unshipped), so the
  cohort ships with ONE consumer and the D4 overfitting bar ("≥2 opt-in sites… or held") is
  unmet as shipped. Convergent with RU-24's one-consumer finding from the subtlety side;
  named here because the phantom is ENGAGE-AFFORD's.
- **W4—GRADED-BACKDROP D1's mask geometry (RU-24-owned; independently confirmed).** The spec
  mandates a four-edge additive linear composite and reasons ADOPT-2 around its "45° diagonal
  corner blend"; the shipped FORM 2 is a two-gradient x/y double-ramp under
  `mask-composite: intersect`, whose own comment refutes the spec ("NOT four additive
  half-planes (which flood the viewport)"). The spec's mechanism was geometrically wrong and
  was corrected silently at implementation; the wave doc was never amended. RU-24 carries the
  verdict row; recorded here as an independent second confirmation.

### FABLE-NEW (8)

- **N1—the edict's at-rest half is wholly unshipped, and the engage roster is quantified.**
  At HEAD: 4 press-charge JS consumers + the `.tap-squish` floor + 5 specular-wired surfaces,
  and nothing else on the ladder's engage rung; zero idle life on any atom. The matrix's own
  admission ("engage—the most under-suffused rung") is confirmed and now has a number. This
  roster is the honest execution baseline for the ENGAGE-AFFORD carry and W-IDLE-BREATH.
- **N2—W-IDLE-BREATH must reconcile the edict with the matrix idle law, by mechanism.** The
  matrix idle rung is "material only—no specular motion, no rAF," with exactly one licensed
  idle light (the ~8s lens sweep) and the law-11 restraint floor (a wandering luminance
  envelope, asymmetric rise ~0.7s/decay ~3s, "slowest visible change wins," rim-not-box per
  the F2×F6 cross-pollination note). A naive per-button pulse would satisfy the wave name and
  violate the canon. The W5 roster (buttons, collapsed-dock pill, slider-at-rest) also omits
  the one already-licensed idle light—the G-row lens sweep on dock/primary tabs, absent at
  HEAD.
- **N3—the F6 breath rider never ran; W-IDLE-BREATH inherits a thesis, not a verdict.** The
  agency-vs-loading question (does an un-ignited ambient breath read as life or as a
  skeleton?) is the family's own named kill condition and remains open. The riderB protocol
  (C1 ignited-press · C2 ambient-toggle · C3 period-match-2.2s + swap-L/R, light+dark, the
  atlas `PlateSkeleton` 2.2s collision as the confusable) is written and unexecuted—it is
  the ready-made gate 0.
- **N4—the rim-only ADOPT needs a Fable re-judge before the banked branch merges.** The
  ADOPT-A-RETIRE-B decision is structurally sound (§R3) but its perceptual half is
  opus-presumed and live-unverified (W2 + LIVE-DEFER). Under BJ §4's hallmark design lane,
  the branch's rim retune (`2×specular-active`) is re-judged at paint (DesignSync, Fable)
  as part of the ENGAGE-AFFORD carry—magnitude confirmation, not re-litigation of the
  method.
- **N5—the skeleton scan diverges from the matrix's one loading vocabulary.** Traveling
  sweep vs slow luminance drift; additionally collides in kind with atlas's 2.2s opacity
  breath (the F6 research's own verified collision), so the library's loading voice and its
  nearest consumer's disagree. Align or declare.
- **N6—checkbox/radio mark-draw absence.** Matrix B-row mark-DRAWS (~150ms handmark stroke)
  vs static lucide mount at HEAD. The handmark stroke vocabulary exists in-library
  (completion-seal, FeedbackMark valid-draw per matrix D-row); the bistable controls never
  received it.
- **N7—tooltip trace deviations.** 0.2s vs the matrix's sub-150ms; scale-bloom 0.97 vs
  fade + 4px rise. Minor—the shipped tooltip is already the library's zero-dose proof in
  spirit; a retune-or-declare note only.
- **N8—magnitude precedence at ENGAGE-AFFORD execution.** The spec's GROW is 1.06 on
  `snappy` with a falsifier; the matrix's N1 shell-pop exemplar is ≤φ^¼≈1.128 all pointers,
  ticks materializing, modal re-home at √φ≈1.272, mechanism decided by the §4 duel. The
  matrix postdates and supersedes the spec's magnitudes; execution takes the spec's fences
  (a-d, dock-defer, default-off) and the matrix's numbers/exemplar shape.

### RATIFIED (7)

- **R1—ENGAGE-AFFORD's evidence layer.** Every re-checked source citation true at HEAD
  (§2); the formation-repair's correction-of-record on the keyboard arm was itself correct.
- **R2—the two-tier GROW/MODAL design with fences (a)-(d), default OFF.** Sound against the
  matrix: GROW is Q8's stationary twin; MODAL is the §4 exemplar row ("slider—modal scrub
  surface—YES"); the dock-defer fence is the matrix's own G-row proportion; `data-held`
  strike and discrete promotion stand.
- **R3—the rim-vs-body A/B loop's method and mechanism.** The 2×2 decomposition isolating
  rim (+0.042L silhouette, interior 0.00000) from body (+0.0018 interior, eats 0.24 of the
  light contrast margin) is a clean experiment; the retire-the-body ruling follows from its
  own numbers; `--glass-engage-rim = 2×specular-active` is verified on the branch and is a
  house-derived knob, not a hand literal. Perceptual half LIVE-DEFER (N4).
- **R4—AFFORDANCE-REDESIGN (B68) shipped as claimed.** AF1/AF3 spot-verified GREEN at HEAD;
  the demo affordance layer (permutation grids, veil demarcation, readout-strip cure) is
  real.
- **R5—pass-1's self-refutations.** The φ-costume finding (semitone beats φ^(1/8) on the
  shipped 1.06), the manufactured token ledger, F7's unbuilt derivation—honest, evidenced,
  and convergent with the suffusion matrix's later posture (φ bounds appear only as caps,
  never as the claimed generator).
- **R6—the graded halo's shipped material honesty.** Both forms co-apply luminance with
  blur (codex law-1 invariant held); the provenance correction (ChatGPT-app, not OS canon;
  the dim co-equal) was the right strike and matches RU-15/RU-16's measured truth.
- **R7—the subtlety recalibrations landed as specced.** Immersive scrim 16→14, side-sheet
  deep-frost 40→34, halo blur paint-tuned to 20px with the tuning rationale recorded in the
  token comment.

## 4. ROUTING (PROPOSE only—no src/, band, or wave edits by this seat)

1. **BJ.W-IDLE-BREATH gate 0 (FEEDBACK-MOTION W5):** execute the unrun F6 ignited-breath
   rider (C1/C2/C3 + swap-L/R, light+dark, the atlas 2.2s confusable in-frame) before any
   idle-breath ships; the verdict seat is Fable-at-paint. (N3)
2. **BJ.W-IDLE-BREATH spec amendment:** bind the wave to the matrix idle law—law-11
   luminance-envelope mechanism (asymmetric rise/decay, slowest-visible-change, rim-not-box),
   PRM/compositor guardrails as stated; add the G-row licensed ~8s idle lens sweep
   (dock/primary tabs) to the roster, at most one per view. (N2)
3. **ENGAGE-AFFORD carry truth-up (BJ PLAN §2):** restate the carry row—NEITHER tier shipped
   in 7.0.0; GROW + the banked rim retune land together post-tag, MODAL stays gated on the
   graded-static + native-paint conditions. (W1)
4. **ENGAGE-AFFORD execution rider:** Fable DesignSync re-judge of the rim-only ADOPT
   (branch `worktree-agent-ad45af8a27c9ce531`) before merge; magnitudes defer to matrix N1
   (≤φ^¼ pop, √φ modal, mechanism duel); spec fences (a)-(d) kept. (N4, N8, W2)
5. **Defect row (MATERIAL band, coordinate with RU-24 routing):** true up the
   `tokens/glass.css` halo-cohort comment—the slider modal is not a consumer at HEAD; either
   land the second consumer with MODAL or restate the cohort as single-consumer-held. (W3)
6. **Design-debt row (FEEDBACK-MOTION):** skeleton loading voice—align the traveling scan to
   the matrix's slow-luminance-drift vocabulary or record the declared divergence; note the
   atlas 2.2s breath collision. (N5)
7. **Design-debt row (ENGAGE carry ∪ GF-HANDMARK dual-list):** checkbox/radio mark-DRAW
   (~150ms handmark stroke) per matrix B-row—the stroke vocabulary exists, the bistable
   controls lack it. (N6)
8. **Trace row (FEEDBACK-MOTION, low):** tooltip reveal—retune toward sub-150ms fade+rise or
   declare the 0.2s scale form as the house zero-dose shape. (N7)

Counts: OPUS-WRONG 4 · FABLE-NEW 8 · RATIFIED 7. W4 is RU-24-owned (second confirmation
recorded); routing 5 coordinates with RU-24's MIGRATION/consumer rows rather than
double-booking them.
