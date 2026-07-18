# REFABLE RU-13 — F21-F30 verdict sidecar

seat-model: **claude-fable-5** (verbatim from system context: "The exact model ID is
claude-fable-5"). Prior artifact ran on claude-opus-4-8 via config override. Protocol followed:
ANEW (primary sources only, opus artifact unread) → SCRUTINY (opus dossier read
guilty-until-re-proven) → UNION (`../redress/DOSSIER-F21-F30.md` rewritten in place). Date
2026-07-18; HEAD at analysis start 4757315a.

**Boundary moment.** ANEW closed after: all four screenshots read first-hand
(`docs/tranches/BJ/feedback/F21/F22/F27/F28-*.png`); the eight component/story surfaces read at
HEAD (`scroll-progress-rim/*`, `progress/Progress.vue`, `skeleton/Skeleton.vue`,
`slider/Slider.vue`, `dock/styles/{overflow,shell}.css`, `feedback/{progress,confirm-dialog}.vue`,
`motion/{springs,tempo}.vue`, `chassis/play/StoryPlayButton.vue`, `button/{Button.vue,styles.css}`,
`_shared/valueDomain.ts`, `timeline/*`, `useDockOverflowFit.ts`); the sibling consumer greps
(speedtest=0, sci-report=2, atlas≥2 for completion-seal); the band charters
(FEEDBACK-MOTION/MATERIAL/REDUCTION/STORY), ASK-REDUCTION, GF-DOCK-PASS3, PLAN.md. Only then were
JUDGE.md and the opus dossier opened. Key ANEW-independent derivations that later matched or
refuted opus claims: the F22 120ms-tick-vs-300ms-transition mechanism (matched, pre-J7-read), the
F28 all-three-at-7px statics (matched J6), the F24 5s token resolution (REFUTED opus), the F27
visible→auto computed coercion (REFUTED opus's stated mechanism).

## Per-row verdicts

| Row | verdict | owner (unchanged unless noted) | notes |
|-----|---------|-------------------------------|-------|
| F21 | RATIFIED | `BJ.W-PROGRESS-RIM-REPLACE` (FEEDBACK-MOTION W2) | angular-vs-perimeter mechanism independently re-derived; ADDED segment-arm evidence (the `4 stages` card reads near-full at 52%); band line-cites refreshed |
| F22 | RATIFIED | `BJ.W-FEEDBACK-MOTION-TUNE` (W3) | opus Δ-F22-1 was ADOPTED as J7 and applied at HEAD → coverage EXACT-as-amended (opus "PARTIAL" superseded); ADDED the wrap-around full-width rewind artifact (`progress.vue:28-32`) |
| F23 | RATIFIED, 2 corrections | `BJ.W-TRACK-DRY` (MATERIAL W4) | opus under-credited the shared surface (`_shared/valueDomain.ts` is a second already-shared register; mark RENDERING duplication remains); the "enlarged slider view" adjacent route to `BI.W-ENGAGE-AFFORD` is STALE — J1 re-homed it to `BJ.W-IDLE-BREATH` (FEEDBACK-MOTION W5) |
| F24 | **OPUS-WRONG** | `BJ.W-FEEDBACK-MOTION-TUNE` (W3) — owner stands | the "2.4s component-local literal" claim is false on disk: `--duration-shimmer` = **5s** (`scheme-motion.css:107`) resolves, and `literals.css:24-34` documents skeleton as the FAST 3s rung — a wrong-rung token bind, not a stray literal; new delta Δ-F24-1 |
| F25 | RATIFIED | `ASK §C2` | fold landed at 490cc46e (BI Glass 7 cut); C-A ruling (fold-the-story default) noted |
| F26 | RATIFIED | `BJ.W-REDUCE-CROSSREPO-GATED` + `ASK §A2` | census re-proven FIRST-HAND this seat (speedtest grep = 0; sci-report + atlas confirmed) — third independent verification; D-3 noted |
| F27 | RATIFIED owner/gate; **OPUS-WRONG mechanism** | `GF-DOCK §4.1 W2 G-NO-BLOCK-SCROLL` | opus's "overflow-y: visible leaves the axis open" is not a scroll mechanism (FITS branch cannot scroll); the defect is the visible→**auto** computed coercion under `overflow-x: auto` on the overflow branch, and `overflow.css:65-66` misstates the spec ("clip") — the root misreading; new delta Δ-F27-1; scrollable-delta census LIVE-DEFER |
| F28 | RATIFIED | `BJ.W-BLUR-LADDER` (MATERIAL W2) | opus Δ-F28-1 ADOPTED as J6, applied at HEAD → EXACT-as-amended; ADDED: OPEN-2d's primary-vs-ordinary fork is statically DECIDED (StoryPlayButton secondary + Reset default-secondary + Select — all 7px; no primary in frame); bloom-intentionality judgment LIVE-DEFER (the π W2 owes) |
| F29 | RATIFIED | `BJ.W-CONFIGURATOR-STD` G-CFG-1 (STORY W3) | grep-0 born-RED re-verified; J10 roominess gate + REDUCTION Configurator→demo consistency noted |
| F30 | RATIFIED | `ASK §C4` | fold-into-springs recommendation + C-E scope ruling; mount-scoped root-write noted as fold rationale |

Counts: **ratified 8 · opus-wrong 2 (F24 wholesale; F27 mechanism-only, owner+cure stand) ·
fable-new findings 6 · owner moves 0 · LIVE-DEFER 2**.

## FLIPS — for the lead to re-judge

No J1-J11 ruling is CONTRADICTED by this unit — J6 and J7 are in fact independently RATIFIED
(their substance was re-derived ANEW before JUDGE.md was read). Two band-charter premises are
contradicted in part:

**FLIP-1 (F24 → BAND-FEEDBACK-MOTION W3 gate (b)).** Charter premise: F24's cure-shape is "the
values live in the token/canon layer, not per-component literals (grep gate)" — implying the defect
is a component-local literal. Contradicted on disk: `Skeleton.vue:51-57` ALREADY reads a defined
token (`--duration-shimmer` = 5s, `scheme-motion.css:107`); the 2.4s in source is a dead fallback,
and the canon itself (`literals.css:24-34`) assigns skeleton the fast 3s rung the component does
not read. Gate (b) as written can go GREEN with the defect intact. Proposed re-judgment: for F24,
gate (b) becomes a period-VALUE assertion (against the retuned rung) + a rung-BINDING assertion
(skeleton-scan does not read the brand-metal sweep clock). Dossier delta Δ-F24-1 carries the full
text. (Also flips the prior dossier's F24 post-mortem, superseded in the union.)

**FLIP-2 (F27 → GF-DOCK-PASS3 §4.1 / G-NO-BLOCK-SCROLL premise text).** Charter premise (as the
RED rationale): the block leak is read off `useDockOverflowFit.ts:38-40` "measures a block
overflow" + the general open-axis framing. Contradicted in mechanism: on the horizontal rail that
line measures INLINE overflow (its block branch is vertical-only), and `overflow-y: visible` per
se cannot scroll — the scroll axis exists because `overflow-x: auto` computes the cross axis to
**auto** (CSS Overflow 3), a coercion the shipped comment at `overflow.css:65-66` states BACKWARDS
("spec-forces… to a clip"). The gate's assertion (`scrollHeight === clientHeight`) and cure
(`overflow-y: clip` + drop `block:'nearest'`) are RATIFIED unchanged — the flip is the RED
rationale text, plus one added cure obligation: correct the false spec comment in the same cut.
Dossier delta Δ-F27-1 carries the full text.

**Near-flip, no action required (F28 → BAND-MATERIAL W2 §Design(D)).** The prose at
`BAND-MATERIAL.md:233-236` still carries the "plausibly the deep-tier primary" hypothesis that J6's
re-aim supersedes (and that this unit statically refutes — no primary button exists in the F28
frame). The re-aim already governs OPEN-2d; the stale sentence should fall at W2 execution. Listed
for completeness, not re-judgment.

## Routing summary

- F21 → `BJ.W-PROGRESS-RIM-REPLACE` (BAND-FEEDBACK-MOTION W2)
- F22 → `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3, J7 applied)
- F23 → `BJ.W-TRACK-DRY` (BAND-MATERIAL W4; engage-half → `BJ.W-IDLE-BREATH` W5 per J1; blur-half → `BJ.W-GRADED-BACKDROP-JUDGE` W3)
- F24 → `BJ.W-FEEDBACK-MOTION-TUNE` (BAND-FEEDBACK-MOTION W3, gate reshaped per Δ-F24-1)
- F25 → `ASK-REDUCTION §C2` (C-A default: fold the story) + family-B relay
- F26 → `BJ.W-REDUCE-CROSSREPO-GATED` (BAND-REDUCTION W4) + `ASK-REDUCTION §A2`
- F27 → GF-DOCK W2 `G-NO-BLOCK-SCROLL` (mechanism corrected per Δ-F27-1)
- F28 → `BJ.W-BLUR-LADDER` (BAND-MATERIAL W2, OPEN-2d per J6)
- F29 → `BJ.W-CONFIGURATOR-STD` (BAND-STORY W3, G-CFG-1 + J10)
- F30 → `ASK-REDUCTION §C4` (fold into springs; C-E scope)
