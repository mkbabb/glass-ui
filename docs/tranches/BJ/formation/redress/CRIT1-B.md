# CRIT1-B — fresh Fable critique (pass 1, seat B) of the BJ redress dossiers

Adversarial pass over `DOSSIER-F31-F40.md`, `DOSSIER-F41-F50.md`, `DOSSIER-A01-A17.md`. I did not
write these; I assumed them faulty and tried to break them. Tranche-development only — this file is
the sole artifact, no `src/`/`demo/` touch, no commit.

**Method.** Every ledger quote checked against `FEEDBACK-LEDGER.md` verbatim; every claimed screenshot
existence checked against `docs/tranches/BJ/feedback/`; **six screenshots read first-hand** (F34, F40,
F45, F47, F48, F49 — spread across handmark, dock, material tail); a large sample of `file:line`
anchors verified on disk at HEAD `55f5170d` (`package.json` 7.0.0); the cited waves/gates/amendments
opened and read; the D-A11 finding verified against `BI.W-ENGAGE-AFFORD.md` + `BI.W-SLIDER-ENGAGE.md`
+ `R3B-DIGEST.md` + the crosswalk reconciliation.

**Headline:** all three dossiers are strong. Inventory fidelity is exact, screenshot descriptions are
faithful (no invented detail found), targets resolve on disk, and the two consequential DISAGREEs
(A01, A11) are correct. Findings below are minor sharpenings, not substantive breaks. No BLOCKER, no
MAJOR.

---

## DOSSIER-F31-F40

Inventory: all ten ledger quotes (F31-F40) match `FEEDBACK-LEDGER.md:43-52` verbatim; the eight
in-range PNGs exist and F32/F33 correctly carry no screenshot (no `F32*`/`F33*.png` on disk). The
handmark `brush.ts` anchors are exact to the line: boil `weight:7`/`ribbon:"hull"` (`:140/:144`),
`roughness:0.9`/`wobble:1.4` (`:153/:154`), pen `weight:6` (`:111`), pencil `weight:3` (`:160`),
crayon `weight:16` (`:184`), ring `grain:0.7` (`:222`), marker `weight:12` (`:235`), highlighter
`weight:26`/`hull` (`:262/:266`); `constants.ts:57` `NOISE_OCTAVES=4` + `:61` `NOISE_AMP_FRAC=0.05`;
all seven `GF-HANDMARK-PASS3.md` gate + π lines (G-CALM:261, G-WEIGHT:264, G-NO-SLIVER:267,
G-CONTAIN:270, G-RING-LAYER:273, G-DRAW-CONNECTED:275, G-NO-JARGON:280; π-CALM:291…π-GALLERY:299);
`handmark.vue:119-120/150-151` jargon captions; `ink.ts` se-guard masked fallback (`:196-200`);
`BAND-STORY.md` G-CFG-5 (`:269`), G-COPY-2 (`:195`), G-COPY-4 (`:197`); the FSF amendments D-8/D-6.
Screenshots read first-hand: **F34** (two fat blobby lozenge underlines under "future"/"here" — matches)
and **F40** (green sliver over "a", red sliver over "it"; se-guard/excursion/byte-identical captions —
matches). Nothing drifted.

- **MINOR — F33 (Δ-F33-1 option b mis-targets a wave).** Claim: the appendable owner for F33's
  pager-dot refinement is "either (a) a fifth `BAND-FEEDBACK-MOTION` wave `BJ.W-PAGER-DOT-MORPH`, OR
  (b) fold into `BI.W-ENGAGE-AFFORD`'s liquid-weight scope." Disk: `BI.W-ENGAGE-AFFORD` is a
  SUSTAINED-ENGAGE facility scoped explicitly to "FINGER-OCCLUDED FINE-VALUE controls (standard slider,
  spectrum slider, scrubber)" (`BI.W-ENGAGE-AFFORD.md:297-298`), and it already tag-shipped Tier-1 on
  Glass 7 (`:528-533`). Pager dots are neither a fine-value control nor a fit for a closed BI wave —
  option (b) conflates "the liquid-weight edict names pager/deck dots" with "ENGAGE-AFFORD's charter,"
  which are not the same wave. Fix: drop option (b); keep option (a) (or a `BAND-FEEDBACK-MOTION` W5),
  which is the sound and fully-specified owner. The residue itself is real and correctly caught —
  `BAND-FEEDBACK-MOTION.md` covers F19-F24 only (grep-confirmed: no F33/pager/`usePagerWorm`), and
  `src/components/pager-dots/{PagerDots.vue,composables/usePagerWorm.ts}` exists as the named target.

- **NOTE — F35 (retract-of-a-retract citation unread).** The post-mortem's claim that the
  `vbH`/`preserveAspectRatio="none"` apparatus STAYS because CRIT2 C2/C3 (`GF-HM:32-33`) proved
  aspect-equalization already handles x/y — I did not open lines 32-33 (I read C1/C4/C11 at :31/:34/:41,
  which are consistent with the retract). The gate collapse (`G-NO-DOUBLE-LINE` retired into
  `G-CALM`+`G-WEIGHT`) corroborates it; low risk, flagged for completeness.

- **NOTE — F33/F40 coverage-summary flavor.** The summary counts F31/F32 "EXACT with the decision/verify
  flavor noted"; this is a self-consistent convention, not a defect.

**Verdict: AMEND (1).** One MINOR (Δ-F33-1 option b). Every disk/gate/screenshot claim otherwise earns
its call; the F33 PARTIAL is honest and its residue is correctly owned via option (a).

---

## DOSSIER-F41-F50

Inventory: all ten ledger quotes (F41-F50) match `FEEDBACK-LEDGER.md:53-62` verbatim; F41/F43/F45/F46/
F47/F48/F49/F50 PNGs exist, F42/F44 correctly carry no screenshot. Anchors verified disk-true:
`typewriter.vue:103` `text="npm install @mkbabb/glass-ui"` (born-RED live at HEAD); the F7 concentric
rule `[data-slot="dialog-content"] .field-control[data-kind="input"] { border-radius: var(--radius-field) }`
present in `field-control.css` with its comment naming the "Rename workspace" Slug case verbatim;
`radius.css` `--radius-dialog: var(--radius-card)` (dialog=card holds at HEAD); the `--glass-halo-*`
cohort (`glass.css` blur 20px/core 13rem/bloom 7rem); `ModalOverlay.vue:49` `isGraded`;
`gate-pattern.vue` input nested in `DialogContent` (`:119` + `<Input>` `:143`); `SectionPreviewCard.vue`
double-card (outer `rounded-card border` `:28` + inner well's own `border-radius:87` + inset ring
`:90-91`); `BottomDock.vue:17-20` chevron chrome + `:42` `FadingScroll`; `auth-shell.vue:39-41`
fabricated credentials; `BAND-MATERIAL.md` G-COPY-3 born-RED (`:196`, `→ :39-41`), the F45 §D text
(`:110-115`), the dialog=card role row (`:74`), W2/W3 headers + OPEN-2c/OPEN-3a, and the F12/F17
regression-guard precedent (`:667-669`). Screenshots read first-hand: **F45** (soft-rect access-key
input above a stadium-pill Unlock, in a squircle dialog — matches), **F47** ("Radii" clipped to "adii"
at the leading edge, "Overlays &" cut trailing, `< > | « »` + layers chrome — matches), **F48**
("Rename workspace" over a blurred Dialog page; soft-rect `sun-spots` input, pill Save/Cancel — matches,
including the dossier's load-bearing note that the modal-input concentric grammar is ALREADY visible),
**F49** (13:13/5G/88% keyframes.js screen, "5.6 Sol High >" segmented pill with a graded near-element
halo — matches). Δ-F45-1's whole premise is substantiated: the gate-pattern input IS dialog-nested, so
it already reads `--radius-field` concentric, so W1 would born-RED against the intended state — exactly
the delta's point, and the F12/F17 conversion it cites is real on disk.

- **MINOR — F45 (STATUS asserts F45 rides OPEN-1a; on disk OPEN-1a is F09/F12/F17-only).** Claim:
  the F45 REDRESS/STATUS frames the rounding as "OPEN-1a live-π gated (`:135-142,165`)." Disk:
  `BAND-MATERIAL.md` OPEN-1a is scoped literally to "F09/F12/F17 disk-vs-screenshot drift" (`:135`,
  `:165`) — F45 is a §D bullet (`:110-115`) NOT enumerated in OPEN-1a. So the STATUS states a
  not-yet-true wiring as current. Δ-F45-1 itself corrects this ("Append to W1's F45 scope + OPEN-1a"),
  so the fix is already the delta — but the STATUS line should read "F45 is a §D bullet not yet in the
  OPEN-1a live-π set; the delta appends it," not "OPEN-1a live-π gated."

- **NOTE — cross-dossier HEAD drift.** This dossier's header cites HEAD `v7.0.0-16-g5879d0dc`; the
  A-dossier cites `55f5170d` (the real current HEAD). All anchors verified disk-true at `55f5170d`, so
  the drift is cosmetic, but the three dossiers should agree on the pinned commit.

- **NOTE — F45 base-pill line drift.** The F45 target cites the base `--radius-pill` input rule at
  `:34`; on disk it sits ~`:42` (same rule, same token — an ~8-line drift within re-pin tolerance; the
  F48 dossier's `:47` for the F7 rule is accurate). Not a stale anchor.

**Verdict: AMEND (1).** One MINOR (F45 STATUS OPEN-1a wording, self-corrected by Δ-F45-1). Δ-F45-1 is
sound and appendable as written; every other anchor is disk-true.

---

## DOSSIER-A01-A17

Inventory: A01-A17 quotes match `FEEDBACK-LEDGER.md:68-84`. The two DISAGREEs (A01, A11) are the
campaign's load-bearing claims — both verified sound below. The EXACT/AGREE rows I spot-audited
(A02/A03/A05/A07/A10) resolve to real owners; A04/A06/A08 PARTIALs are honestly hedged deltas.

- **MINOR — A14 (over-generous EXACT; paper-backdrop un-dispositioned within the umbrella scope).**
  Claim: "procedural codification umbrella EXACT — every procedural component is OWNED … none unowned,"
  then a parenthetical admits `paper-backdrop` (an L5 procedural in A14's explicit roster) has "no
  explicit BJ disposition — neither greenfield nor ASK nor delete." That admission contradicts "none
  unowned." A14's scope is literally "the whole procedural roster," so an un-dispositioned member is a
  coverage sliver, not a footnote. Fix: either rule paper-backdrop's keep explicitly (then EXACT holds)
  or downgrade to PARTIAL with a mini-delta routing paper-backdrop into the reduction ≥2-consumer
  census — not a bare note.

- **NOTE — A11 severity framing (MISSING vs PARTIAL).** The row rates MISSING because the substantive
  remediation half is unowned; but the literal ask (the standing CHECK) IS owned (R3b). MISSING as the
  max-severity of the atomic reqs is a defensible convention; flagged only because the CHECK half is
  discharged. The D-A11 delta stands under either framing.

- **NOTE — A02/A06/A08 unverified-by-me.** The A02 external corpus path
  (`/Users/mkbabb/Downloads/New Folder With Items 4`) I did not stat; the A06 "no intra-page
  scroll-animation standard" and A08 "no post-implementation per-wave challenge protocol" claims are
  plausible and honestly hedged in their deltas but I did not exhaustively disprove an existing owner.

### Ruling on D-A11 (the campaign's most consequential claim): UPHELD — idle-breath is truly unowned.

Verified against source:
1. `BI.W-ENGAGE-AFFORD.md` is a SUSTAINED-ENGAGE facility — GROW fires on `:active`/`:focus-visible`/
   `:has(:focus-visible)`/`[data-engaged]` (all interaction), MODAL on coarse/touch promotion. It has
   NO idle/always-on register anywhere. Its §Audit (`:293`) rules Button/Checkbox/Radio/Toggle
   "ADEQUATE (proportion fence)" and scopes the facility to finger-occluded fine-value controls only
   (`:297-298`) — it DEMOTES the very atoms R3b flags. `BI.W-SLIDER-ENGAGE.md` is a superseded redirect
   stub. Both are BI waves minted 2026-07-16, before R3b (2026-07-17), so neither can contain the R3b
   fold.
2. `R3B-DIGEST.md` finding `engagement-idle-breath-scope` (major) confirms the dossier's quote verbatim:
   "ONLY looping-progress and the live substrate/section background fields satisfy the always-on breath
   edict; the atoms (button at rest, collapsed dock pill, slider at rest) are inert until interacted
   with." Its dispositions are marked "Proposed" (both button and idle-breath), never folded into a
   wave.
3. No other wave owns atom idle-breath. `BAND-FEEDBACK-MOTION.md:14-16` explicitly disclaims it —
   "this band REFINES that motion, it does not add breath (that is `BI.W-ENGAGE-AFFORD`'s charter)" —
   and points at the wave that does not own it. `BAND-STORY.md:258` cross-refs A01/A11 breath-of-life
   to "family G's ENGAGE-AFFORD; referenced, not authored here." `BAND-PERF.md:386` invokes
   `breath_of_life` only for the route-pending TRANSITION affordance, and W2 governs the always-on
   field DOWN. The greenfields' breath references are for the blob substrate (already breathing) and
   the dock pill's ASK-gated liquid-metal enhancement — not the inert atoms. So the charter is
   nominally assigned to a wave whose scope excludes it: a real, unowned gap.
4. The DISAGREE is not just defensible — it is demonstrable. The crosswalk CONTRADICTS ITSELF: its
   PENDING-R3B section (`:126-132`) states R3b is "not yet folded into … the ENGAGE-AFFORD wave scope"
   and keeps A01/A11 pending; its later Lead reconciliation (`:217-220`, which "supersedes") claims
   A01/A11 "land in `BI.W-ENGAGE-AFFORD` … with buttons ranked first" and converts to LANDED. The wave
   text (buttons ADEQUATE, no idle scope) proves the reconciliation over-claims. The A01 DISAGREE is
   equally sound — the reconciliation's "buttons ranked first" is R3b's proposal, not the wave's ruling.

D-A11 is appendable as written (mint an idle-breath register wave, buttons first, PRM-gated). This is
the correct headline of the redress campaign.

**Verdict: AMEND (1).** One MINOR (A14 over-generous EXACT). The two DISAGREEs and D-A11 are verified
sound; the other four deltas are reasonable and honestly hedged. The dossier accurately reports
formation gaps rather than dossier defects.

---

## Cross-dossier tally

| dossier | BLOCKER | MAJOR | MINOR | NOTE | verdict |
|---------|---------|-------|-------|------|---------|
| F31-F40 | 0 | 0 | 1 | 2 | AMEND (1) |
| F41-F50 | 0 | 0 | 1 | 2 | AMEND (1) |
| A01-A17 | 0 | 0 | 1 | 3 | AMEND (1) |

All three earn their claims to a high bar: inventory verbatim, screenshots faithful, targets disk-true,
waves/gates/amendments real and covering. The three MINORs are precision sharpenings (a mis-targeted
delta option, a forward-referenced OPEN wiring, one over-generous EXACT). **D-A11 — idle-breath for the
inert atoms is truly unowned — is UPHELD.**

*End — CRIT1-B, fresh Fable seat B, pass 1. One file under `formation/redress/`; no `src/`/`demo/`
edits, no commit.*
