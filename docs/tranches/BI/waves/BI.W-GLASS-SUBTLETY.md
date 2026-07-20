# BI.W-GLASS-SUBTLETY — the calm-glass recalibration + dialog-corner harmony (immutable Glass 7 material cut)

Band B2 (glass taxonomy; the Contract-2 arm reaches B1 geometry). MINTED 2026-07-16 at the
glass-subtlety triumvirate pass (BI-addenda; RESEARCH → HARDEN → TRANCHE-WRITE, two-consecutive-clean).
The user's 2026-07-16 directive — glass "slightly more subtle, all of them" + dialog rounding "made
more consistent with our cards" — had NO owning wave across the corpus (grep-verified: `BI.W-BLUR-MUTE`
dials only the button cohort; `BI.W-SHEET-RADIUS` rounds only the sheet primitive; no wave recalibrates
the framework-wide blur ladder or binds the dialog corner to the card). Sources of record:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/glass-subtlety/research.md`
(RESEARCH arm, lineage) + `…/glass-subtlety/harden.md` (HARDEN arm, NORMATIVE — the census completed to
10 rows, the φ narrative struck, the legibility floor named, the squircle direction inverted, the tag
sequenced). The hardened contract below is the terminal execution specification; RESEARCH is lineage,
not a broader license.

**Citation currency.** The HARDEN arm re-derived the census from disk at real HEAD `ca23d54f` (the
task/research cite `e7da7b5c`, a stale pin). The TRANCHE-WRITE arm re-verified every load-bearing VALUE
against `ca23d54f`: the five blur primitives (`glass.css:83-86,94`), the 20px high-DPI overlay restore
(`light-dark.css:36`), the 16px deep ceiling + its freeze note (`glass-deep.css:57`), the 16px immersive
stage scrim (`drawer/styles.css:371`), the 8px native `::backdrop` (`scroll-tokens.css:76`, read at
`animations.css:269`), the 40px side-sheet graded field + its glass-bg-overlay ink
(`placement.css:101-106`), the radius aliases (`radius.css:32,34,92,137-140`), the squircle @supports
block (`squircle.css:41-49`), the demo neutral re-pin (`neutral.css:53,55`), and the dialog default
`stage="none"` (`DialogContent.vue:59`) — all confirmed below. Per the pin-drift lesson (PROCESS-CODEX
§3), file+symbol citations are durable; literal line numbers are RE-PINNED AT EXECUTION.

## §Wave shape — TWO waves, argued (the split across the three contracts)

The triumvirate produced three normative contracts. They partition into TWO waves, not one-of-three and
not three-of-three. This wave carries Contracts 1+2; the sibling `BI.W-GRADED-BACKDROP` carries Contract
3. The argument (the task hands the shape decision to this arm on merit):

**Why Contracts 1+2 are ONE wave (this file).** Both are freeze-ready, deterministic token edits that
ride the immutable Glass 7 major **unconditionally** — Contract 1 moves the blur ladder, Contract 2 binds
the dialog corner and picks the squircle direction, and *something ships in 7.0.0 either way for both*
(Contract 2's alias bind is unconditional; only its shape-arm is eye-decided, and both arms land in
7.0.0). They are judged at the **same** pre-tag Fable lane over the same live aurora (Contract 1's
step-size read at the 0.68 dialog + menu, Contract 2's shape fork at the dialog-vs-card corner — one
sitting), they share the **same** consumer census (atlas), and they are one coherent design intent: *make
the Glass 7 material calmer and its corners agree*. The ENGAGE-AFFORD consolidation logic applies in the
positive: two rows that always land in lockstep before the same tag buy no independent value by splitting
and add ledger overhead. One wave, two arms.

**Why Contract 3 is a SEPARATE wave (`BI.W-GRADED-BACKDROP`).** Contract 3 is an **experiment with a live
decline path** — its deliverable is "the experiment + the recorded judgment (+ the API iff adopted)", and
adoption is NOT presumed. Its lifecycle is categorically different: it must **resolve pre-freeze or defer
entirely** (harden §6, C-TAG: you cannot freeze an experimental `data-backdrop` public API into an
immutable major). Bundling it with 1+2 would either hold the freeze-ready recalibration hostage to the
experiment's resolution, or force a commit-split anyway — the exact process-coupling PROCESS-CODEX warns
against (welding a maybe-declined experiment to a must-ship identity cut). Contract 3 also owns a live
**cross-dependency** with the already-minted `BI.W-ENGAGE-AFFORD` (whose coarse-pointer modal consumes the
graded surface and must coordinate the token name) and with the shipped Q023 side-sheet — it needs a
clean named owner to coordinate against. It is split. See its file for the experiment protocol.

**Why NOT three waves.** Splitting Contract 1 from Contract 2 re-enacts the overhead the consolidation
precedent rejects: they land in lockstep for the same tag, at the same paint lane, with no sequencing
reason to separate. Two waves is the merit answer — the bright line is *freeze-ready (ships 7.0.0)* vs
*adopt-or-defer (might ship nothing)*.

## §Intent — the user directives, quoted (+ the reference reframe)

User directive (2026-07-16), the two arms of this wave verbatim:

> Arm A: "The glass blur for all glass components should be made slightly more subtle — all of them."
> Arm B: "The rounding of the dialog made more consistent with our cards."

Reference media (read in full by all three arms):
`…/reports/glass-subtlety/refs/current-dialog.png` (ours — the "Rename workspace" modal with the page
behind blurred edge-to-edge and receded), `…/openai-popup-1.png` + `…/openai-popup-2.png` (the iOS-27
"5.6 Sol High / Extra High" segmented popup — the graded-halo target that belongs to
`BI.W-GRADED-BACKDROP`, not this wave).

**The decisive reference reframe (harden D0b — binding on the implementer).** `current-dialog.png`'s
CONTENT is the demo "Standard dialog" story (`dialog.vue:69-71` — "Rename workspace" / "Slug must be
lowercase, kebab-cased", verbatim), but it is NOT that story at its defaults. Both cannot be literally
true at once, so state it precisely: at HEAD an all-defaults `<DialogContent>` takes `surface="glass"`,
`stage="none"` (`DialogContent.vue`), scrim = `<ModalOverlay>` at `[backdrop-filter:var(--glass-blur-wash)]`
= **blur(1px)** — which renders the verified sub-perceptual wash, NOT the ref's edge-to-edge illegibility.
So the story CONTENT matches while a **non-default stage was engaged at capture**: the ref's page is
visibly **scaled/receded** (the `data-stage-scale` signature) and its heavy uniform blur is the opt-in
**immersive 16px stage scrim** (`drawer/styles.css:371`), not the floating-tier dialog plate. Two further
signatures the ref carries, noted so the implementer reproduces the right config: it renders
**bottom-anchored and full-width** (a side-sheet / coarse-pointer signature, not a centered dialog — the
paint lane confirms the exact surface), and its **inner controls are full stadiums** (the Slug `<Input>` a
pill, Save/Cancel pills) — the "pill-heavy inner controls," the third ref defect, addressed in Arm B
(C2-INNER). The heavy background blur is **Contract 3 / scrim territory, which THIS wave does not touch**.
This wave quiets the dialog *plate* (rows 4/9 below) and every other glass surface; the headline
"context-destroying background blur" is `BI.W-GRADED-BACKDROP`'s target. State this plainly so the
implementer does not expect Arm A to fix the ref's background blur — it will not, by construction (and note
that fix rides substantially on the Contract-3 experiment ADOPTING; see `BI.W-GRADED-BACKDROP`
§EXPERIMENT's decline-residual for what survives a decline).

## §Design — the hardened contract (normative)

### ARM A · Contract 1 — subtlety recalibration (the complete 10-row census, one ~15% pull)

**The census is 10 rows, not 4+2 (harden C1-CENSUS).** Every `backdrop-filter` blur radius on disk, one
subtlety pull `S` applied and integer-rounded. (Honest caveat — this is *not literally* one clean scalar;
after rounding the effective per-row ratios are 0.846–0.875 with two HOLDs, and four rows are hand-tracked,
not cascade-derived; see **C1-STRUCTURE**.) Row 1 (wash) is HELD (the sub-perceptual scrim floor).
The two candidate steps: **S≈0.85 is the PRIMARY** (the "slightly" reading, honors the immutable-major
risk), **S≈0.78 is the escalation** taken *only if* the gentle step reads unchanged over the live aurora.
This inverts the research's burden (it made the aggressive step primary): the **smaller move that still
reads as changed** wins.

| # | surface | disk symbol (file) | before | **S≈0.85 (primary)** | S≈0.78 (escalation) | note |
|---|---|---|---|---|---|---|
| 1 | wash / scrim floor | `--glass-blur-wash-radius` (`glass.css`) | 1 | **1 (HOLD)** | 1 (HOLD) | sub-perceptual floor |
| 2 | quiet (Card/Button/Input) | `--glass-blur-quiet-radius` (`glass.css`) | 8 | **7** | 6 | content |
| 3 | resting (Dock/menu, peer-locked) | `--glass-blur-resting-radius` (`glass.css`) | 8 | **7** | 6 | peer-locked to dock+card+menu |
| 4 | floating (Dialog/Popover/Menu/Select/Command/Tooltip/Toast) | `--glass-blur-floating-radius` (`glass.css`) | 13 | **11** | 10 | overlay band — floor 1.2 |
| 5 | overlay base (Drawer) | `--glass-blur-overlay-radius` (`glass.css`) | 13 | **11** | 10 | |
| 6 | overlay @2dppx (retina/mobile) | `--glass-blur-overlay-radius` under `@media (min-resolution:2dppx)` (`light-dark.css`) | 20 | **17** | 16 | **MUST co-move — else no-op on retina** |
| 7 | deep (opt-in ceiling) | `--glass-blur-deep-radius` (`glass-deep.css`) | 16 | **16 (HOLD)** | ~~13~~ (overridden — HOLD) | see C1-DEEP — HOLD recommended (freeze categorical) |
| 8 | native `::backdrop` | `--top-layer-backdrop-blur` (`scroll-tokens.css`, read at `animations.css`) | 8 | **7** | 6 | |
| 9 | immersive stage scrim (Dialog+Drawer) | `blur(16px)` on `[data-stage-scrim][data-stage-immersive]` (`drawer/styles.css`) | 16 | **14** | 13 | the ref's real blur; the immersive path |
| 10 | side-sheet graded field | `blur(calc(40px*--glass-level))` (`placement.css`) | 40 | **34** | 32 | the shipped Q023 graded edge — see ruling |

Everything not listed auto-tracks: the composed `--glass-blur-*` tokens read the `-radius` primitives
through `--glass-level` + saturate (`glass.css:135-150`); the dark arm reads the SAME primitives and only
lifts saturate/brightness (`dark-arm-glass.css`), so every edit cascades to dark byte-isomorphically.
**Zero per-component hand values.** Saturate, opacity, tint, brightness, rim, specular, shadow — all held.

**Ruling C1-STEP (honest framing).** This is **NOT a φ-rung** — the harden arm struck that narrative. The
system is two values (content 8, overlay 13) + a wash floor + a deep ceiling; `13/8≈φ` is a coincidence
of a prior ~15-20% dial-back (`glass.css:66-67` records `BA.W-GLASS-CAL` moving quiet 10→8, resting
12→10 as exactly a "~15-20% uniform" pull for the user's earlier "a hair too much"), not a designed
geometry. Present it as a **perceptually-motivated ~15% integer-rounded reduction**, taken a second time
per the 2026-07-16 directive.

**Ruling C1-WHY (the affirmative thesis — why subtle wins on OUR content specifically, the falsifiable
hypothesis F4 tests).** The task's acceptance bar is to show *why subtle wins on our content, not just that
Apple/OpenAI do it* — an our-content argument, not an Apple-differentiation one. The defensive case (C1-FLOOR
below: at 0.68 the dialog is transmissive so blur does real detail-suppression work → a legibility floor) and
the compliance case (the user said "slightly"; an immutable major forbids over-correction) are only half the
bar. The **affirmative** design hypothesis is a fact of OUR plate opacities, verified on disk: our glass runs
**0.50–0.80 opacity** across the content/overlay tiers (`--glass-opacity-quiet: 0.50`, `-resting: 0.65`,
`-floating: 0.80` at `glass.css:55-57`; the dialog `-dialog: 0.68` at `:179`) — materially **more transmissive
than apple.com's web plates at ~0.8 solid** (`apple-glass.md`). **(Coverage boundary, stated precisely.)**
That more-transmissive claim covers the **content/dialog tiers only** — quiet 0.50, resting 0.65, dialog
0.68, all materially below Apple. The **floating tier is at PARITY, not more transmissive**: our
`-floating: 0.80` (`glass.css:57`) EQUALS apple.com's nav plate `rgba(255,255,255,0.8)` (`apple-glass.md:49`),
so the transmissivity thesis does NOT justify the floating pull — 13→11 at that rung rides the user's
"slightly" gentle-first directive, not an above-Apple transmissivity. On a more-transmissive plate a *given* blur
radius reads **more frosted** (more of the backdrop shows through, so the blur term carries more of the visual
weight), which means **we can afford LESS blur for the same "frosted glass" read** — the same radius that reads
"just glass" on an 0.8-solid Apple plate reads "over-frosted" on our 0.5–0.68 plate. And past the point of
diminishing return a heavy blur **collapses the depth/parallax "thin-pane" iOS-27 register into an opaque
frosted slab** — the calmer register *restores* that thin-pane read; the subtler ladder is not merely safer,
it reads *better* on our transmissive surfaces. This is a **falsifiable** hypothesis, not an aesthetic
assertion: it ships with **F4** as its falsifier (the gentle step must read *changed* — proving the reduction
is perceptible on our plates — AND the content rung must not read as a flat translucent panel — proving we did
not over-thin the frost). If F4 fails either arm the thesis is refuted at paint and the step adjusts; the
argument earns its place by carrying its own test.

**Ruling C1-STRUCTURE (the one-source law applies to STRUCTURE, not just values — the re-drift risk, named).**
Be honest about the mechanism: the one-source-of-truth law the wave invokes is satisfied for VALUES but not
for STRUCTURE. Only rows **2–5 are ladder primitives that cascade automatically** through `--glass-level`.
Rows **6/8/9/10 are hand-literals NOT tokenized to the ladder** (the retina overlay override, the native
`::backdrop` reader, the immersive-scrim literal, the side-sheet field literal), plus the row-6 media
override — so the true shape is *"4 ladder primitives cascade + 4 hand-tracked literals + 1 media-query
override, all pulled ~15% by hand,"* not "one scalar." This matters because **it is exactly why the prior
census MISSED rows 6/8/9/10** (row 6, the retina restore, the decisive miss): a value that is not derived
from the ladder does not travel with it. This wave fixes the VALUES; it does **not** fix the STRUCTURE that
caused the miss, so the NEXT recalibration re-suffers the same failure unless addressed — and row 6's own
note documents a "lockstep with the base ladder" *intent*, which is an argument for deriving it, not
hand-syncing it. **Ruling:** name the re-drift risk explicitly (done here) and **BOOK the structural fix as
a named follow** — a future `ladder-derive` cleanup that makes the four literals + the media override
*derive* from the ladder primitives (e.g. the retina restore as a `calc()` off the base rung) — rather than
smuggling a token-plumbing refactor into this values-only calm cut (which would widen the blast radius of an
immutable-major visual change with structural churn). This wave hand-tracks the four literals + the media
override in the SAME commit, asserts them GREEN, and records that the hand-tracking is a known-debt bridge,
not the terminal structure.

**Ruling C1-FLOOR (the legibility floor — harden C1-LEGIBILITY).** The research's "text legibility is
exonerated by construction, blur does no legibility work" is **FALSE for the one surface the brief is
about**. The centered dialog runs `--glass-opacity-dialog: 0.68` (deliberately see-through) — at 0.68,
**32% of the backdrop is present in the plate, and blur is the only suppressor of its high-frequency
detail**. Drop floating blur and the page text behind the title bleeds through *sharper* (ghost glyphs).
Named floor: **floating/overlay must not drop below ~10px; 10 is AT the floor with zero margin; 11 is the
safe primary.** This is an independent reason the gentle step (floating 11) beats the aggressive (10). If
the 0.68 dialog cannot hold its title legible at the chosen floating radius, the lever is NOT to break
"opacity held" globally — it is to **hold the dialog's floating rung at 13** (the dialog is already the
transmissive outlier) or nudge dialog opacity, decided by eye. Do not assert AA is safe.

**Ruling C1-DEEP (HOLD row 7 — de-bundle the freeze reopen).** Row 7 is the opt-in deep tier under an
emphatic five-tranche freeze (`glass-deep.css:4-9,57-60`: "16px IS this substrate's blur ceiling —
DECIDED, IDENTITY not debt"). Moving it *reopens that freeze* for a rarely-used register — blast radius
for little gain. **HOLD row 7 at 16px** is the primary ruling; if the paint judgment wants deep to track,
it is a clearly-separate sub-decision, never smuggled into the calm-ladder arm. Bonus: with floating at
11 and deep held at 16, deep/floating separation *widens* 1.23→1.45 for free — a better deep read.

**Ruling C1-ROW10 (the side-sheet graded field rides THIS wave, not Contract 3).** The harden census
notes row 10 "folds into Contract 3." TRANCHE-WRITE departs on merit: the Q023 side-sheet graded edge
**ships today** (`placement.css`), independent of whether the Contract-3 halo experiment adopts. The
recalibration of an already-shipped glass surface cannot be hostage to an experiment that may decline —
"all glass components slightly more subtle" includes the shipped side-sheet field. So **row 10 (40→34)
lands in Arm A**; `BI.W-GRADED-BACKDROP` then reads the recalibrated value as its deep-frost endpoint for
the NEW surfaces it generalizes to. Coordination stated in §Obligations.

**Ruling C1-SATURATE (held, with the over-juice falsifier live).** Holding saturate as blur drops is
correct — saturate is the load-bearing "reads-as-glass" term (Apple parity). But a *sharper* backdrop
through `saturate(1.6)` at the floating/overlay rung can read as a **garish smear over a saturated
aurora** (the AX.W52 caution, inverted). Keep it a **first-class falsifier** (F3), not a footnote; the
gentle step is less exposed to it. If it smears, the bounded co-move is floating/overlay `1.6→1.5` — a
second gated knob, never the primary (primary stays radius-only).

**Clean-break note (no-legacy — reword, never work around).** The directive evolves the library's own
identity (which this ask authorizes), so the frozen notes are RE-WORDED in the same commit. **Every entry
below is a COMMENT-ONLY co-move — the painted VALUE auto-tracks its primitive edit; no reword changes a
paint** (the same no-stale-sibling discipline that co-moves the `animations.css:269` inline fallback). Line
numbers re-pinned at HEAD `47c49f8b`:
- `glass.css:66-67` (the `BA.W-GLASS-CAL` calm-default record) — append the Q-glass-subtlety second ~15%
  pull; the calm default is no longer terminal.
- `glass.css:78` (the peer-lock doc line) — verified on disk: "the dock + the default-Card + the menu-row
  (the quiet tier) all resolve the SAME `blur(8px)` RADIUS LEG." The quiet/resting pull (8→7) makes that
  `blur(8px)` literal stale, so co-move the doc `blur(8px)→blur(7px)`. Its sibling **present-tense** "unified
  8px material" doc references at `:77`, `:98`, and `:153` describe the SAME value and co-move likewise (8→7)
  — catch them too. **`:76` is DISAMBIGUATED OUT of that present-tense set — it is a TRAJECTORY** ("the
  resting rung pulls 10→8"), so per this census's own trajectory rule **APPEND `→7`** (→ "pulls 10→8→7"), do
  NOT replace it into a bare present-tense 8→7 (the prior `:76-77` lumping mis-classified the trajectory half
  of the pair). Else the census re-suffers the incompleteness this note exists to fix (the primitive edit is
  at `:84-85`; these lines only describe it).
- `glass.css:90` (the overlay-rung **trajectory** record) — verified on disk: "dialed the overlay rung to
  13px (off 15) so the whole ladder pulls back in proportion." This is a HISTORICAL dial-back note (the
  twin of `:66-67`), so **APPEND the second pull, do NOT replace**: "dialed the overlay rung to 13px (off
  15), then to 11px". The band-ceiling prose at `:87-89` ("15px is the band ceiling") is UNCHANGED — 11 is
  still within the ≤15 budget.
- `light-dark.css` (the high-DPI restore note) — **three co-moves on DISTINCT lines, disambiguated** (the
  prior `:31-33`-only entry under-specified which line carries which):
  - `:27` "Standard-density displays keep the 13px budget radius set in §-1a `:root`" — a **present-tense**
    reference to the standard-density floating/overlay floor → co-move `13→11`.
  - `:31-32` "The restore pulled 24→20px in lockstep with the base ladder's ~15-20% dial-back (the base
    overlay rung moved 15→13). 20px stays the amortised high-DPI ceiling" — this is the **20→17 co-move**
    (the painted primitive is `:36`, row 6), and the two "20" occurrences classify DIFFERENTLY (disambiguated
    — the prior entry treated both as one reword): the restore-pull record **"24→20px" on `:31` is a
    TRAJECTORY** — the 20 endpoint co-moves to 17 per row 6, so **APPEND `→17px`** (→ "pulled 24→20→17px"),
    do NOT replace; the **present-tense "20px stays the amortised high-DPI ceiling" on `:32` REWORDS `20→17`**
    ("17px stays the amortised high-DPI ceiling"). Its own text says the restore moves "in lockstep with the
    base ladder's ~15-20% dial-back," so both moves **honor** it. The embedded "base overlay rung moved
    15→13" clause is a further **trajectory** record → APPEND `15→13→11`, do NOT replace.
  - `:33` "standard density reads the dialed-back 13px" — a **present-tense** reference → co-move `13→11`.
- `glass-deep.css` — **SPLIT: the freeze VALUE HOLDS, the comparison-prose IS reworded** (the prior "NOT
  reworded" ruling was disk-false for PROSE). The two things this file holds part ways:
  - **The 16px freeze VALUE + its freeze note HOLD unchanged** — `--glass-blur-deep-radius: 16px` and the
    "DECIDED CEILING — 16px IS this substrate's blur ceiling, IDENTITY not debt" note (`:57-64`, header
    `:4-9`) stand under row 7 HOLD. The freeze is NOT reopened; only a later deep sub-decision rewords it.
  - **The "calm floating 13px" comparison-prose co-moves 13→11** — comment-only (the deep tier reads
    `glass.css`'s floating primitive as its depth-0 floor, so these lines only DESCRIBE a value that
    auto-tracks; no paint change, no freeze touch). Verified on disk at HEAD `47c49f8b`, each: `:31`
    ("deeper blur than calm floating (16>13px)" → `(16>11px)`), `:47` ("glass-ui calm ceiling: floating
    13px" → `floating 11px`), `:54` ("The calm `floating` rung (13px / 1.18)" → `(11px / 1.18)`), the `:57`
    inline comment ("STRICTLY > calm floating 13px" → `> calm floating 11px`), and `:101` ("depth 0 ≡ the
    calm floating 13px floor" → `calm floating 11px floor`). The freeze value (16px) and its `>` ordering
    are UNCHANGED — 16>11 still holds. The trajectory record at `:24` ("floating 16->13px") is a historical
    dial-back note (the `glass.css:66-67` twin) — append the second pull (`16->13->11px`), do not replace.
- `src/styles/glass/deep.css` — **a SECOND deep file, DISTINCT from `tokens/glass-deep.css` and missed by
  the prior census AND manifest entirely** (an implementer would never open it — it is now added to the
  manifest below). Verified on disk at HEAD `47c49f8b`: its D5-SAFE note at `:97` present-tense-describes the
  calm floating floor — "(a plain popover stays the calm 13px; the calm ladder never reads `--glass-depth`)"
  → co-move `13→11` (comment-only; the popover reads `glass.css`'s floating primitive, which auto-tracks —
  no paint change). This mirrors the `tokens/glass-deep.css` split treatment: present-tense refs co-move,
  the file carries no blur primitive of its own.
- `src/components/drawer/styles.css:361` (**adjacent-primitive-prose**) — the immersive-scrim comment "The
  scrim owns one FIXED 16px backdrop depth" DESCRIBES the row-9 painted literal at `:371` (`blur(16px)`) it
  sits directly beside → co-move `16→14` to track row 9's outcome (comment-only; the paint is the `:371`
  edit, not this comment). **`:363` is a SECOND 16px prose in the same comment block, now enumerated** — the
  illustrative *rejected* per-frame ramp `blur(calc(--stage-t * 16px))` (`:362-363`) names the SAME fixed
  depth, so co-move `16→14` there too (grep-covered by any bare `16px` sweep, but enumerated so it is not
  left a stale sibling beside the reworded `:361`/`:371`).
- `src/components/dialog/placement.css:81` (**adjacent-primitive-prose**) — the graded-edge comment "One
  fixed 40px backdrop sample is mask-graded…" DESCRIBES the row-10 painted literal at `:106`
  (`blur(calc(40px * --glass-level))`) → co-move `40→34` to track row 10's outcome (comment-only; the paint
  is the `:106` edit). The "13/40 opacity" fraction earlier in the same line is a **mask-alpha ratio, NOT a
  blur radius** — leave it UNCHANGED (a false positive for any bare "13" sweep).
- `src/components/dock/styles/shell.css` (**the SIX bare-`8px` peer-lock sites — a 4th recurrence; 5 here +
  `dock.css:65` below**) — the `.glass-dock` re-declares the composed `--glass-blur-resting` and its comment
  block describes the unified 8px material in five **present-tense** legs; all co-move `8→7` (peer-lock
  class): `:18` ("the unified 8px material"), `:19` ("the SAME `blur(8px)` radius leg" — the blur-leg name
  beside :18), `:44` ("the `--glass-blur-resting-radius` 8px primitive"), `:46` ("the proof:glass-cal 8px
  PEER LOCK"), `:214` ("the SAME radius primitive (8px × `--glass-level`…)" — the `.dark .glass-dock`
  peer-lock echo). Comment-only; the painted value is the `tokens/glass.css:85` primitive edit — these lines
  only describe it. **Present tense, so REPLACE `8→7`, do NOT append.**
- `src/components/dock/styles/dock.css:65` (**peer-lock prose — the 6th of the six**) — "the 8px peer-locked
  material" (the backdrop-lens comment reading `--dock-surface-blur: var(--glass-blur-resting)`) →
  present-tense co-move `8→7`. Comment-only (the paint auto-tracks the resting primitive).
- `src/styles/glass/material.css` (**resting-hairline TRAJECTORY prose — distinct class from the six above**)
  — "demoted the blur ladder (quiet/resting → 8px)" (the neutral-specular-hairline rationale) is a
  **TRAJECTORY** record → **APPEND** "→ 7px" (→ "quiet/resting → 8px → 7px"), do NOT replace. **Pin by
  STRING, not line** — the concurrent comment-scrub already stripped this block's `WS3` /
  `BG.W-GLASS-DYNAMICS` prefixes from the string in the working tree (so a `WS3`-anchored grep now MISSES; the
  judge-commit `47c49f8b` still carried them at :264), so match the surviving literal
  `demoted the blur ladder (quiet/resting → 8px)`. Comment-only (the hairline is a static paint, no blur
  primitive of its own).

**Reword-census root rule (C1-CENSUS-GREP — the durable fix; enumeration is a FLOOR, not a ceiling).** The
prose census has now been missed repeatedly (the bare-`8px` material-prose form a **4th** time) because
enumeration-at-formation cannot be complete. So the reword STEP itself carries the fix: at implementation, a
repo-wide grep across `src/styles/**` and the component CSS (`src/components/**/*.css`) for the FROM-value
prose strings — `13px`, **the 8px material in BOTH forms** (the parenthesized `blur(8px)` form AND the
**bare `8px`** form when it names the glass material / ladder / peer-lock; the bare form was NOT part of the
prior sweep, which is the structural root cause of the six dock/material bare-`8px` sites recurring a 4th
time — state the two forms), `15px` (`15→`/`off 15`), `16px` backdrop, `40px` sample, `20px` — is PART of
the reword, not a separate gate. Any hit not already in this census is ADDED and co-moved by the same rule: a
**present-tense reference** replaces to the new value; a **trajectory/history record** APPENDS the new pull,
never replaces. **Second axis (the r4 pre-stale hole):** a FROM-value grep cannot reach prose whose quoted
value was ALREADY stale before this wave (e.g. a doc line still citing a pre-AV.W7 value) — so the sweep also
greps the six ladder TOKEN NAMES (`--glass-blur-wash/-quiet/-resting/-floating/-immersive/-deep`) and rewords
any adjacent value prose to the post-pull truth. This is a process rule, not a minted gate script (the
no-minted-gates ruling stands).

**Derived-prose census (C1-DERIVED — the INTERPOLATED-value class all prior rounds missed).** A prose class
distinct from present-tense refs and trajectory records: the deep-tier LERP band quotes paint values
**derived FROM** the floating primitive, so when floating co-moves 13→11 these interpolants change. The
mechanism is the `.glass-deep` calc (`src/styles/glass/deep.css:63-71`): `deep-active-radius =
floating-radius + (deep-radius − floating-radius) × --glass-depth`, i.e. **`floating + depth×(16 − floating)`**
with the deep ceiling held at 16 (row 7 HOLD) and both endpoints held — only the depth-0 floor (`floating`)
moves. The band prose quoting the interpolated approximations (all in the two deep files already in the Arm-A
manifest, comment-only, no paint edit):
- **STRING-PINNED (the r4 duplicate-escape cure):** the exact string "content ~14px < popover ~15px <
  menu 16px" occurs VERBATIM at `src/styles/glass/deep.css:52`, `src/styles/tokens/glass-deep.css:85`,
  **and `src/styles/tokens/glass-deep.css:104`** (the r4-precision catch — byte-identical to `:85`, 19
  lines below, missed by line-enumeration). The co-move is pinned to the STRING, not the lines: EVERY
  occurrence of that interpolant string in the two deep files recomputes — a future verbatim duplicate
  cannot escape a string-pin the way it escaped the line list.
- `src/styles/glass/deep.css:91` ("resolves the popover grade (~15px)") + `:92` ("the content grade
  (~14px)").
**Ruling:** these co-move to the **RECOMPUTED** approximations at implementation, by the formula above with
`floating=11` (the `~14`/`~15` interpolants drop toward `~13`/`~14`; the menu `16` ceiling is UNCHANGED). Do
NOT hand-fix the numbers now — the per-tier depth GRADES live in the deep files (the `tokens/glass-deep.css`
grade endpoints + the `glass/deep.css` per-rung depth map), so the exact recomputed approximations are pinned
at execution against those grades, not guessed here. Recorded as a class so the interpolated-prose is not
silently skipped a next time.

**Requires-ruling census (C1-REGISTER — the motion-register `8px`, recorded so it cannot be silently
skipped).** `src/styles/tokens/motion-registers.css:23` — the **enter-transient** register row of the motion
doc-table lists an `8px` blur column ("| enter-transient | transient | 0.46s | 0.5 | 8px | 0 | Toast …").
**REQUIRES-RULING at implementation:** does this transient-materialize blur-from co-move with the material
ladder's `8→7` pull (i.e. is it quoting the same "8px glass material" as a motion start-value), or is it an
**independently-authored motion register value** (a materialize-bloom radius chosen for the Toast enter,
unrelated to the resting plate)? The implementer rules it by reading which primitive the register resolves —
a token reference into the material ladder co-moves; a standalone motion literal HOLDS. The census records the
question; it does NOT pre-decide it. (Disk note, stated so the ruling is not mis-anchored: the neighbouring
`enter-overlay` row `:20` carries a **6px** blur, not 8px — so this is specifically the *enter-transient*
row, and it is the *motion table*, NOT census row 8's native `::backdrop` primitive. The PRIMITIVE the `:23`
doc-row documents is `motion-registers.css:80` `--enter-transient-blur: 8px` — the ruling above resolves BOTH
the primitive and its doc-row together; on disk it reads as a standalone motion literal, which resolves HOLD
unless the implementer finds a ladder reference.)

**Pre-stale census (C1-PRESTALE — the r4 second-axis catch).** `src/styles/utilities/components.css:8`
carries "`--glass-blur-floating` ≈ 24px" — stale since the AV.W7 24→13 clamp, unreachable by any FROM-value
grep (24 is not a FROM of THIS wave), caught only by the token-name axis above. Reword to the post-pull truth
(floating = 11px) at implementation; `src/styles/utilities/components.css` is ADDED to the Arm-A manifest as
a comment-only entry (the file was in no prior census or manifest — no one would have opened it).

**Ledger note (round 3):** round 3 was a GRADED-only fault (the borrowed-authority provenance strike,
see that wave's §Two-challenge) — this file was gestalt-CLEAN that round, which is why its own repair
ledger reads 1→2→4; recorded here for cross-file symmetry.

**Out-of-scope sweep hits (C1-OOS — preempt round-5 false recurrences; the C1-CENSUS-GREP sweep WILL hit
these, they RULE OUT).** Enumerated with reasons so a later round does not re-flag them as missed census rows:

| site (file:line) | sweep-hit form | why OUT-OF-SCOPE (not a blur rung) |
|---|---|---|
| `glass/ladder.css:102-104` | `8px`/`16px`/`32px` | under-shadow GEOMETRY (`0 2px 8px`, `0 4px 16px`, `0 8px 32px`) — shadow offset/blur/spread, not a backdrop-blur radius |
| `dock/styles/overflow.css:178` | `8px`/`32px` | dock-wrap shadow geometry (`calc(8px*…) 8px 32px -4px`), not a blur rung |
| `dialog/placement.css:99-105` (dim) + `:108-113` (mask) | `40px`/`120px`/`16%`/`34%` | the graded-edge DIM + MASK gradient STOPS (positions + alphas) — the ONLY blur in this file is `:106` (row 10, 40→34) + its adjacent-prose `:81` (both already censused). This is the `:102`/`:111` protection: their `40px` are gradient POSITIONS, false positives for the "40px sample" sweep |
| `glass.css:87-89` (`tokens/`) | `8–15px` | the authored AV.W7-F2 budget BAND ("8–15px budget band"; "15px is the band ceiling") — 11 still sits inside, the band prose SURVIVES. (The `:90` overlay-rung trajectory in the SAME block IS in-scope — see the Clean-break note; do not let this range swallow it) |
| `tokens/glass-deep.css:7`, `:12-23`, `:25`, `:45-46`, `:60` + `glass/deep.css:4` | `16px`/`20px` | the RETIRED 20px-push deep-CEILING verdict + the Apple-canon range prose — the deep ceiling is row-7 HOLD, untouched by 13→11. **EXCEPTIONS inside these blocks that ARE in-scope (do NOT swallow):** `:24` ("floating 16->13px" trajectory → append `16->13->11px`), `:47` ("floating 13px"→11px), `:57` inline ("STRICTLY > calm floating 13px"→"> calm floating 11px") — all already in the Clean-break census |
| `squircle.css:9` | `16px` | "imperceptible at a 16px card radius" — a card RADIUS ref, non-blur |
| `theme/radius.css:22` | `16px` | "`--radius-2xl` (16px)" radius-rung note, non-blur |
| `sizing.css:153` | `40px` | "40px rung; empty-state hero glyph" — an icon SIZE, non-blur (protects the "40px sample" sweep) |
| `glass-capsule.css:148` | `40px` | "A11Y-5's 17×40px defect" — a hit-box dimension, non-blur (protects the "40px sample" sweep) |
| `liquid-fill.css:52` | `~2px-equivalent` | a `--glass-level`-scaled blur APPROXIMATION that survives the 8→7 pull unchanged (same band-survival reason as the 8–15px budget band); caught by the token-name axis, ruled surviving |

### ARM B · Contract 2 — dialog-corner harmony (+ the inner-control affordance)

**The finding (confirmed on disk) — and the visible payoff is SMALL, stated plainly.**
`--radius-dialog ≡ --radius-card ≡ --radius-2xl = 16px` (`radius.css`, the `--radius-card`/`--radius-dialog`
aliases); the demo `neutral` preset re-pins **both** to `--radius-xl`=12px (`neutral.css:53,55`) —
**value-equal in every shipped config**. The magnitude does NOT diverge. So the C2-BIND alias re-point below
is **value-invariant and visually invisible** (nothing repaints), and the corner-SHAPE fork is, by the
repo's own admission, "imperceptible at a 16px card radius" (`squircle.css:9-11`). This contract's honest
payoff is therefore a **one-source-of-truth guarantee** (the dialog corner can never drift from the card)
plus a possible shape/affordance decision — NOT a visible rounding change on the default surface. If the
user's *perceived* rounding inconsistency in `current-dialog.png` is real, it is almost certainly the
**pill-heavy inner controls** (the full-stadium Slug input + Save/Cancel, C2-INNER below) or a specific
non-default render, not the surface corner — which already matches the card. That residual is routed to the
paint lane (F6/F7), not presumed fixed by the bind.

The real divergences the ref *could* be showing: (a) corner **shape** (dialog+sheet are in the squircle
@supports set, `squircle.css` @supports block; cards are round-by-policy AX.W56), (b) the alias is
semantically **unbound** (both independently point at `--radius-2xl`), and (c) the **inner controls**
balloon to full stadiums regardless of the surface corner (C2-INNER).

**Ruling C2-BIND (unconditional).** Bind the source: `--radius-dialog: var(--radius-card)` (was
`var(--radius-2xl)`). One source; the dialog corner *is* the card corner and cannot drift. Geometry-safe —
verified: the concentric relay (`--radius-ctx: var(--radius-card)`, `radius.css:92`; side sheets set
`--radius-ctx: var(--radius-dialog)`) reads the card corner after the bind, value unchanged (16px);
insets/scroll-region calc is value-invariant. **This half ships in 7.0.0 regardless of the shape fork
below** — and it is the only half that is unconditional, guarantee-only, and visibly changes nothing.

**Ruling C2-SHAPE (the fork — design/paint seat decides UNPRIMED; THREE options, A/A' the directive-literal
reading).** The directive anchors on **cards as the reference** — "the rounding of the DIALOG made
consistent with our CARDS" grammatically has the dialog conform to the card. Cards are round by an emphatic,
twice-decided in-repo policy (`squircle.css:6-21` AX.W56: cards/buttons/pills stay ROUND, "do NOT re-add a
squircle rule"; `radius.css:129-136`: `--corner-shape-card` was deliberately SWEPT — a squircle card is a
*consumer* choice). Read literally, "dialog consistent with cards" means **round the dialog** (A/A'), not
squircle the cards (B). Three options achieve "dialog == card"; the seat decides at F6 with no thumb on the
scale:
- **A (round dialog + sheet — cross-engine KISS):** retire the modal squircle — drop
  `.glass-floating.{rounded-dialog,sheet-animate}` from the `squircle.css` @supports block and retire
  `--corner-shape-dialog` + `--corner-shape-sheet` (`radius.css`). Dialog+sheet round on Chrome and Safari
  alike. Cross-engine-identical, leaves cards untouched. Cost: it also retires the *sheet* squircle, which
  collides with `BI.W-SHEET-RADIUS` (below).
- **A' (DIALOG-ONLY round — the minimal directive-literal move):** drop **only**
  `.glass-floating.rounded-dialog` from the @supports block and retire **only** `--corner-shape-dialog`;
  **KEEP** `.glass-floating.sheet-animate` + `--corner-shape-sheet`. The centered *dialog* rounds to match
  the card (exactly the directive's subject); the *sheet* keeps its squircle. This satisfies the directive,
  leaves cards untouched, AND **dissolves the SHEET-RADIUS revive-then-retire churn entirely** (SHEET-RADIUS
  revives the sheet squircle; A' keeps it) — no cross-wave reconciliation. The tightest match to the literal
  ask.
- **B (squircle the card family — the iOS-27-forward, higher-blast-radius reading):** promote the card
  family to squircle — add `--corner-shape-card` (`radius.css`) and `.glass-card` to the `squircle.css`
  @supports block. Chrome: dialog+sheet+card all squircle; Safari: all round. iOS-27-coherent per directive
  (4), and **NOT a masking fallback** (squircle-as-`@supports`-enhancement over a round contract is the
  established big-dock pattern, `squircle.css:12-15`). But it **reverses** the twice-decided round-card
  policy, promotes the **highest-traffic surface** in the system (every card, incl. atlas's chart cards) to
  a Chrome superellipse, and answers directive (2) ("dialog consistent with cards") by a *different*
  directive (4) whose blast radius **exceeds the dialog-consistency ask**. It is a card-family identity
  move, not a dialog fix.

**TRANCHE-WRITE recommendation: neutral, A'-leaning — NOT B.** The prior formation leaned B on a
SHEET-RADIUS coherence argument; **that argument is dissolved by A'** (which keeps the sheet squircle), so
it no longer tips the fork. On the merits the directive-literal reading is A/A' (round the dialog to the
card), and A' is the minimal, churn-free form. B remains a legitimate *option* — the iOS-27 continuous-corner
identity is real and directive (4) invites it — but it must be recognized as a **card-family redesign**, not
the dialog-consistency fix the directive asks for, and it is NOT the primary. The seat decides at F6
UNPRIMED across all three; the alias bind (C2-BIND) is unconditional under any.

**Ruling C2-INNER (the pill-heavy inner controls — directive (4)'s design-affordance clause; the third ref
defect, folded — was dropped, now carried).** `current-dialog.png`'s inner controls are **full stadiums**:
the Slug `<Input>` reads `border-radius: var(--radius-pill)` = `9999px` **directly** at
`_shared/field-control.css:34` (`.field-control[data-kind="input"]`), and the Save/Cancel `<Button>`s are
stadium pills (`button/styles.css:13` = `--radius-pill`). **Disk-precise token path (do not mis-cite):** the
single-line input's radius is a *hardcoded* `--radius-pill` on `.field-control[data-kind="input"]` — it does
**NOT** read `--radius-control` (that token, `radius.css:64`, is scoped by its own note to **Checkbox + base
Tabs**, a different cohort) and it does **NOT** consume the concentric relay `--radius-ctx` (the only
`--radius-ctx` readers are nested card-class surfaces, segmented tabs `segmented.css:98`, and configurator
layers `styles.css:113` — not the input). A stadium is **scale-invariant** — it ignores the surface corner
entirely — so a round-16px dialog reads as a soft rounded-rect *full of full-stadium fields and buttons*, the
corners unrelated. This is the ref's "pill-heavy inner controls," orthogonal to the surface corner the
bind+round fixes: harmonizing the *surface* does nothing for the *contents*. The affordance option
(directive (4) — take the iOS-27 inspiration into the *inner* geometry, not only the shell):
- modal **single-line fields** re-point onto `--radius-field` (already 16px, a soft rounded-rect,
  `radius.css:44`) via a **modal-scoped `.field-control[data-kind="input"]` border-radius override** (the
  input's radius is a hardcoded pill, so the fix is a scoped re-point — NOT a relay adoption, which the input
  does not consume). Narrower than "fields": `.field-control[data-kind="textarea"]` **already reads
  `--radius-field`** (`field-control.css:39`), so only single-line inputs balloon to the pill and only they
  change;
- **buttons** either keep the pill (the iOS capsule idiom — Apple's own web CTAs are `980px` stadiums,
  `apple-glass.md §1.4`) or adopt the softer field rung *inside modals*.
- **Policy this reverses, named (honesty — the AW.W25 prior intent).** `radius.css:37-43` (AW.W25) explicitly
  decides "single-line controls (Input, SelectTrigger) keep the pill" — the field-rung option moves the modal
  Slug `<Input>` off that pill onto `--radius-field`. The F7 decision is therefore made *against a real prior
  policy*, not a blank slate; cite it the way C2-SHAPE cites the parallel round-card policy (`squircle.css:6-21`).
  This is not a direction change — the affordance arm stays deferred-to-paint; it is stating the intent it overrides.
This is a genuine design choice, not a mechanical fix. **Ruling: it rides Contract 2 as an explicit
sub-decision, decided at the SAME F6/F7 paint lane** (a modal with pill controls vs field-rung controls,
side by side, over the live aurora) — NOT presumed, NOT dropped. The minimal Contract 2 is still the surface
corner + the bind; C2-INNER is the affordance arm the seat resolves alongside the shape fork.

**Geometry-safe retire (A / A').** Verified: only the `squircle.css` @supports block reads
`--corner-shape-dialog/-sheet` (grep-confirmed); **no gate under `proof/ tests/ scripts/` asserts those
tokens** (grep empty). Clean break; a consumer wanting the Chrome dialog squircle re-adds
`--corner-shape-dialog` in its own preset. `--corner-shape-bigdock` and `--corner-shape-panel`
(Configurator) are out of the directive's dialog↔card subject and untouched under any option. **Census note
for B:** if the seat picks B, F6 must additionally census atlas's chart cards reading a new Chrome
superellipse (an unrequested identity on a pinned consumer's highest-traffic surface).

## §Consumer census (never silent — harden §4)

**atlas** — `@mkbabb/glass-ui` pinned `6.0.0` (`package.json:121,144`). The one live consumer of the blur
ladder, and Contract 1 shifts it **adversely**:
- `src/platform/chrome/dock/Dock.css:86` pins `--glass-opacity-dock: 0.9` (O-DIR-4 raised it 0.74→0.9)
  **to fight content bleeding through the dock**. A subtler blur is MORE transmissive → MORE bleed-through
  → atlas's 0.9 pin may no longer suffice. This is the "presets already compensate for today's values"
  trap, live.
- `src/charts/legend/VizOptions.vue:64` remaps `--glass-blur-floating: var(--glass-blur-overlay)` (its
  options panel wears the heavier overlay tier; `:329` comment reads a stale "blur(24px)"); `:352-353`
  reads `--glass-blur-wash`. A change to the overlay rung shifts this panel.

atlas is pinned 6.0.0 and does **not** auto-get the 7.0.0 recalibration — impact lands *when atlas bumps*.
Contract 2 (shape) additionally: under A/A' a consumer relying on the Chrome dialog squircle loses it
(re-add via own preset); **under B the card family gains a Chrome squircle — atlas's chart cards would read
a superellipse on Chrome, a new unrequested identity on a pinned consumer's highest-traffic surface, which
is a census reason B is NOT the primary** (its blast radius exceeds the dialog-consistency ask). A' has the
smallest consumer footprint (dialog-only; sheet unchanged). **slides** (`3.13.0`) consumes `--glass-blur-resting`/`--glass-blur-quiet` and its own
audit flags over-frost, so a subtler ladder *helps* it — deferred, gated on slides' own bump. **sci-report**
has no runtime glass-ui dependency (docs prose only) — no impact.

Net: the only live consumer meaningfully shifted is atlas, only on bump, in the *adverse* direction for
its dock legibility. Censused, not silent.

## §Cross-wave coordination (two in-tranche collisions, named)

> **[CORRECTION 2026-07-20] BLUR-MUTE WAS built, then removed.** Every "not built /
> nothing to retire" claim about `BI.W-BLUR-MUTE` in this document — here, in §Arm A's
> subsumption note, and in the wave-ledger row — is superseded. `3c2f6e79` (2026-07-13)
> BUILT the `--glass-blur-btn-radius` primitive and muted the `.btn-glass` cohort 8→6px,
> with its own paint DELTA filed at `docs/tranches/BI/audit/visual/W-BLUR-MUTE-DELTA.md`.
> `490cc46e` (2026-07-16) DELETED the cohort (`grep --glass-blur-btn-radius src/` = 0 at
> HEAD). The end state — no `.btn-glass` override on disk — is the same, but the wave was
> executed and paint-judged; "never built" erases that record.

- **`BI.W-BLUR-MUTE` (B2) — SUBSUMED by Arm A (it is NOT built; nothing to retire).** BLUR-MUTE is a
  *proposed* wave that would ADD a `--glass-blur-*-radius` override on a `.btn-glass` cohort (e.g. resting
  8→~7px), the button "hair too much" dial-back (UF-B3/B4, judgment-d). No such `.btn-glass` blur override
  exists on disk today (grep-confirmed empty). Arm A moves the **root** resting/quiet primitive 8→7
  framework-wide — which **delivers exactly what BLUR-MUTE wanted, at the root, for every button**, so
  BLUR-MUTE's per-component override is rendered unnecessary before it is ever written. **Ruling: BLUR-MUTE
  is not built and no `.btn-glass` override is added** (one source of truth; no per-component hand value);
  the buttons read the recalibrated root. There is no override *home* for an implementer to hunt for or
  delete. If the paint judgment finds buttons specifically still read heavy *after* the root drop, THAT is a
  genuine sub-reduction below the new floor (e.g. buttons 7→6 while root holds 7) — decided at the same
  lane, not the 8→7 BLUR-MUTE proposed (which is now the root value). Judgment-d (Q051 row 5) is thereby
  subsumed into this wave's paint judgment.
- **`BI.W-SHEET-RADIUS` (B1) — the C2-SHAPE coherence dependency.** Covered in Arm B: **A'** and **B** both
  KEEP the sheet squircle (coherent with SHEET-RADIUS's revival — no reconciliation); only **A** requires
  reconciling SHEET-RADIUS's sheet-squircle revival to round (a revive-then-retire churn inside one
  tranche). A' is the churn-free directive-literal option. Whichever ships, the two waves must agree on the
  sheet corner shape.

## §Work — the manifest (exact files; RE-PIN line numbers at execution)

**Arm A — the ladder (rows 2–5 token-cascade; rows 6/8/9/10 hand-tracked literals + the media override, see
C1-STRUCTURE):**
- `src/styles/tokens/glass.css` — rows 2-5: quiet/resting `8→7`, floating/overlay `13→11` (S≈0.85). Reword
  the `BA.W-GLASS-CAL` calm-default note (the second ~15% pull).
- `src/styles/tokens/light-dark.css` — row 6: the `@media (min-resolution:2dppx)` `--glass-blur-overlay-radius`
  `20→17`. Reword the AV.W7-F2 restore note (co-move honors its own lockstep rationale).
- `src/styles/tokens/scroll-tokens.css` — row 8: `--top-layer-backdrop-blur` `8→7`.
- `src/styles/animations.css` — row 8 co-edit (the stale-sibling drift): the native-`::backdrop` reader
  carries an **inline fallback literal** `backdrop-filter: blur(var(--top-layer-backdrop-blur, 8px))`
  (`animations.css:269`). The token is always defined so paint is correct, BUT the inline `8px` fallback
  goes **stale** next to a 7px token — exactly the drift the no-legacy discipline forbids. Co-move the
  inline fallback `8px→7px` in the same commit (do NOT leave it as a silent stale sibling).
- `src/components/drawer/styles.css` — row 9: the immersive stage scrim `blur(16px)→blur(14px)` on
  `[data-stage-scrim][data-stage-immersive]`.
- `src/components/dialog/placement.css` — row 10: the side-sheet graded field `blur(calc(40px*…))` → `34px`
  (C1-ROW10; coordinate the endpoint value with `BI.W-GRADED-BACKDROP`).
- `src/styles/tokens/glass-deep.css` — row 7 VALUE: **NO EDIT** (HOLD 16px; the ceiling freeze stands). The
  file's "calm floating 13px" comparison-prose comments DO co-move 13→11 (comment-only; see the Clean-break
  note — the freeze value + its freeze note are untouched, only the prose describing the calm floating floor).
- `src/styles/glass/deep.css` — **the SECOND deep file** (the deep-composition rules, distinct from
  `tokens/glass-deep.css`): **NO paint EDIT** (it reads no blur primitive of its own). Its D5-SAFE
  present-tense note at `:97` co-moves `13→11` (comment-only; see the Clean-break note). Its deep-ladder LERP
  band ALSO carries the **C1-DERIVED** interpolated prose at `:52`/`:91`/`:92` (recomputed off `floating=11`,
  ceiling held — see C1-DERIVED; the interpolant co-move is STRING-pinned, so `tokens/glass-deep.css:104`'s
  verbatim duplicate rides the same rule). Named here because the prior census AND manifest omitted it
  entirely — an implementer would never have opened it.
- `src/styles/utilities/components.css` — **comment-only, NO paint EDIT** (C1-PRESTALE): the `:8` doc line
  "`--glass-blur-floating` ≈ 24px" was already stale (pre-AV.W7 value) and rewords to the post-pull truth
  (11px). Added because no prior census, manifest, or FROM-value grep could reach it — the token-name second
  axis (C1-CENSUS-GREP) is what catches this class.
- `src/components/dock/styles/shell.css` + `src/components/dock/styles/dock.css` — **comment-only co-move, NO
  paint EDIT** (the dock reads `--glass-blur-resting` via `--dock-surface-blur`, which auto-tracks the row-3
  primitive). The peer-lock prose co-moves `8→7` at shell.css `:18`/`:19`/`:44`/`:46`/`:214` and dock.css
  `:65` (the six bare-`8px` sites — see the Clean-break note). **Added to the manifest as comment-only
  co-move entries** because the prior census + manifest omitted BOTH dock files — an implementer editing only
  `src/styles/**` would never open the dock CSS, and the "8px material" peer-lock prose would go stale beside
  the 7px primitive (the exact no-stale-sibling drift this arm forbids).
- `src/styles/glass/material.css` — **comment-only co-move, NO paint EDIT** (no blur primitive of its own;
  the neutral specular hairline is a static paint). The TRAJECTORY prose "demoted the blur ladder
  (quiet/resting → 8px)" APPENDS "→ 7px" — pin by STRING (the concurrent scrub stripped its `WS3` prefix, so a
  `WS3`-anchored grep misses; match the surviving literal). **Added to the manifest** for the same omission
  reason as the dock files.
- **`.btn-glass` blur override: NONE to retire.** `BI.W-BLUR-MUTE` is a *proposed* wave that would ADD a
  `.btn-glass` `--glass-blur-*-radius` override; it is **not built** (grep confirms no such override — no
  `.btn-glass` blur home — exists on disk). The subsumption is "BLUR-MUTE is not built, and no `.btn-glass`
  override is added"; the buttons read the recalibrated root 8→7 directly. There is no override home to
  hunt for or delete.

**Arm B — the corner + the inner controls:**
- `src/styles/theme/radius.css` — `--radius-dialog: var(--radius-card)` (C2-BIND, unconditional). Then per
  the fork: **A** retires `--corner-shape-dialog` + `--corner-shape-sheet`; **A'** retires only
  `--corner-shape-dialog` (keeps `--corner-shape-sheet`); **B** adds `--corner-shape-card`.
- `src/styles/glass/squircle.css` — per the fork: **A** drops both `.glass-floating.{rounded-dialog,sheet-animate}`
  @supports arms; **A'** drops only the `.glass-floating.rounded-dialog` arm (keeps `.sheet-animate`); **B**
  adds `.glass-card` to the @supports block. (Coordinate the sheet arm with `BI.W-SHEET-RADIUS`: A' and B
  keep it, only A collides.)
- **C2-INNER (iff the affordance arm resolves adopt at F7):** `src/components/_shared/field-control.css` — a
  **modal-scoped `.field-control[data-kind="input"]` border-radius override** onto `--radius-field` (16px),
  replacing the hardcoded `--radius-pill` at `field-control.css:34` on single-line inputs *within the modal
  context only*. NOT a `--radius-control` change and NOT a concentric-relay adoption (the input consumes
  neither — see C2-INNER). `.field-control[data-kind="textarea"]` already reads `--radius-field`
  (`field-control.css:39`) and is untouched. **buttons** (`button/styles.css:13`) keep the pill or take the
  field rung per the F7 read. Scoped to the modal context, not a global control-radius change; reverses the
  AW.W25 keep-the-pill policy (`radius.css:37-43`) for the modal input only. Decided at paint, not presumed.

**Focused tests** (ordinary vitest; each asserts a computed-style OUTCOME, never "the token has value X"):
- `tests/styles/glass-subtlety.test.ts` (NEW) — the composed `--glass-blur-quiet/resting/floating/overlay`
  resolve to the recalibrated radii through `--glass-level` (light + dark arm); the wash floor and deep
  ceiling are UNCHANGED (the HOLD assertions); the dark arm tracks byte-isomorphically. **BORN-RED at HEAD**
  (the primitives are 8/13/16/20; the recalibrated assertions cannot pass), GREEN after the scalar lands.
- `tests/styles/radius-dialog-bind.test.ts` (NEW) — `--radius-dialog` resolves to `--radius-card` (bind);
  under the demo neutral preset both resolve to `--radius-xl`; the concentric relay `--radius-ctx` reads the
  card corner. BORN-RED (today the alias points at `--radius-2xl`).

**Demo knob** (one story block; no new route):
- The configurator (`demo/shell/configurator/PresetEditor.vue`) or a dialog/card story gains **three toggles
  over the live aurora**: (1) subtlety-step `S≈0.85 | S≈0.78` (Fable reads F4 — the gentle step must read
  *changed* AND the 6px content must not read as a flat panel); (2) dialog corner-shape `A round | A' dialog-
  only round | B squircle-cards` (Fable reads F6 — the three-option fork, unprimed); (3) inner-control rung
  `pill | field-rung` on the modal contents (Fable reads F7 — C2-INNER, the pill-heavy-controls affordance).
  The exemplar surfaces MUST include the **0.68 dialog title over dense page text** (F2), a **menu over the
  live aurora** (F3), and the **modal with its Slug field + Save/Cancel** so F6/F7 read the actual ref
  content, both schemes.

**MIGRATION.md rows** (`## 7.0.0 (unreleased)`, no alias/shim):
- Arm A prose: "Glass blur ladder recalibrated ~15% subtler across the complete census — quiet/resting
  8→7, floating/overlay 13→11, high-DPI overlay 20→17, native `::backdrop` 8→7, immersive stage 16→14,
  side-sheet graded field 40→34. No API/token-name change — primitive values only. Deep ceiling HELD at
  16px." + the **atlas re-verify flag**: `Dock.css:86` dock bleed-through vs its 0.9 pin, `VizOptions.vue:64,329,352`
  options-panel frost — re-verify after adopting 7.
- Arm B prose: "`--radius-dialog` now binds `var(--radius-card)` (was `var(--radius-2xl)`) — one source
  (value-invariant; no repaint)." + the chosen shape row (A: "`--corner-shape-dialog/-sheet` retired;
  dialog+sheet round on all engines — re-add via own `--corner-shape-dialog` if wanted"; A': "`--corner-shape-dialog`
  retired, sheet squircle KEPT; the dialog rounds, the sheet is unchanged"; B: "`--corner-shape-card` added;
  the card family reads a superellipse on Chrome, round on Safari — a card-family identity change") + the
  C2-INNER row iff adopted ("modal form fields adopt the `--radius-field` 16px rung instead of the stadium
  pill; buttons per the paint read").

**Consumer coordination** (glass-ui side; the edits land in atlas's own tranche per the consumer-updates
ruling):
- `docs/tranches/BI/coordination/atlas-outbound-2026-07-16-glass-subtlety.md` (NEW) — record the adverse
  blur shift (dock bleed-through vs the 0.9 pin; the options-panel frost) + the Contract-2 shape impact,
  routed to the Q060 atlas outbound bundle. Foreign tree stays read-only save this mark.

## §Acceptance

Gate ruling (user, 2026-07-16 — binding): NO minted proof/gate script, no census tool, no CI line.
Standing checks = the dev toolchain only (typecheck · library build · demo production build · the focused
unit set). A one-time RED→GREEN differential inside the wave commit replaces any permanent gate. Paint
truth is the PRE-TAG Fable lane (Q002) + the native paint batch (Q003), NEVER CI.

- **`vue-tsc`** — no type surface changes (token-only + a bound alias). Green.
- **Focused `vitest`** — the two NEW test files, BORN-RED at HEAD → GREEN after the scalar + bind land; the
  differential quoted in the commit, nothing standing minted.
- **`npm run build` + demo production build** — the generated `:root` `--glass-blur-*` composites re-bake
  off the new primitives; the substitution-over-redeclaration discipline (the retired `proof:doc-override-idiom`
  gate — the `proof:*` npm namespace is abrogated and this one has NO surviving spec, so it is the bare
  operational criterion now, not a named gate) holds GREEN by construction (the override rides the `-radius`
  primitive, never the composite).
- Regression floor: the wash floor (1px), the deep ceiling (16px), saturate/opacity/tint/brightness/rim/
  specular/shadow all UNCHANGED; the dark arm tracks; `tests-visual/adaptive-glass.spec.ts` (the AA tint loop —
  the surviving spec that succeeds the retired `proof:adaptive-glass` name) untouched.

## §Falsifiers (F1-F7 — the paint judgment reads these, not a contrast number)

- **F1 — retina no-op.** Capture the Drawer/overlay tier on a 2dppx display before AND after. If row 6 was
  not co-moved, the overlay tier is unchanged on retina → the recalibration silently failed its headline on
  the majority device. (The biggest research hole; F1 guards it.)
- **F2 — 0.68 dialog bleed-through.** Dialog title over dense page text, chosen floating radius, both
  schemes. Ghost glyphs / dropped perceived contrast → floating floor violated; hold the dialog at 13 or
  step back. Do NOT assert AA is safe.
- **F3 — garish smear.** Menu/dialog over a saturated aurora. Over-juiced bleed → gate saturate 1.6→1.5
  (secondary knob), not the primary.
- **F4 — "still a hair too much" vs "not glass anymore" (the C1-WHY thesis's falsifier).** 7/11 must read
  *changed* — proving the ~15% pull is perceptible on our 0.50–0.68 transmissive plates (C1-WHY's win
  hypothesis; else escalate to 6/10) — AND the 7px content rung must not read as a flat translucent panel —
  proving we did not over-thin the frost past the thin-pane read (else hold 7). **Tier-distinctness clause
  (the third arm — carried from the r1 NOTE):** the pull *narrows* the content↔floating separation from
  8/13 (ratio 1.625) to 7/11 (1.571), so F4 must ALSO confirm content(7) and floating(11) stay visually
  DISTINCT from EACH OTHER (a dialog/menu overlay must still read as a heavier tier than a card/dock, not
  collapse into one blur band). Note the escalation 6/10 is *wider* (1.667), so if 7/11 reads tier-collapsed
  the escalation *helps* on this axis too — but the current escalation trigger fires on "reads unchanged,"
  so tier-collapse is a SEPARATE, first-class trigger to escalate (not folded into the "unchanged" test).
  The gentle-first protocol resolves the changed/flat pair by construction; the tier-distinctness arm is an
  independent read.
- **F5 — corner parity.** Chrome dialog-corner vs card-corner at equal radius after the bind. Under A/A'
  pixel-identical; under B both carry the same superellipse.
- **F6 — the shape-fork resolver (three options, unprimed).** Side-by-side the *round* dialog (A/A'), the
  current *squircle* dialog, and the *round* card on Chrome over the live aurora. The default reading is
  A/A' (the directive-literal "dialog conforms to card"). Test B **explicitly as a card-family redesign**:
  does squircling *every* card read as "consistency" or as "a card-family identity change that exceeds the
  dialog ask"? — and census atlas's chart cards reading a new Chrome superellipse. Pick B only if it reads
  clearly more premium AND the card-family blast radius is acceptable for the 7.0.0 window. Decide by eye;
  do not assert; do not presume B.
- **F7 — the inner-control affordance (C2-INNER).** A modal with **pill** inner controls (today's
  full-stadium Slug input + Save/Cancel) vs one with **field-rung** controls (fields at `--radius-field`
  16px; buttons pill or field-rung), side by side over the live aurora. Read whether the pill-heavy contents
  are the *actual* perceived rounding inconsistency in `current-dialog.png` (they are the third ref defect)
  and whether the field-rung reads more coherent with the round surface without losing the iOS capsule idiom
  on the CTAs. Decide by eye; NOT presumed.

## §π/DELTA — native-verification debt (rides the visual-sweep phase; no browser this phase)

The subtlety FEEL and the corner fork are judged at paint, not unit-provable. Recorded as debt on the
visual-sweep phase (Q002/Q003), NOT counted done:
1. The card + dock + the **0.68 dialog title over busy page text** + a **menu over the live aurora**, both
   schemes, both subtlety steps, on a **2dppx display** (F1) — the ladder reads *changed* without bleed
   (F2), no garish smear (F3), content not flattened (F4). Chrome + Safari.
2. The dialog corner vs the card corner, all three fork options (A / A' / B), Chrome (F5) + the resolver
   side-by-side (F6, testing B as a card-family redesign incl. the atlas-card superellipse census). Safari
   reads round under all.
3. The **inner-control affordance** (C2-INNER / F7): pill controls vs field-rung controls in the modal, over
   the live aurora — confirm whether the pill-heavy contents are the ref's actual perceived inconsistency.
4. **Reproduce the ref's exact config first** (name the plate): the ref renders bottom-anchored/full-width
   with a receded/scaled page — the immersive-stage config (dialog OR coarse-pointer sheet), NOT the
   all-defaults dialog. Confirm the heavy background blur is the immersive 16px scrim (Contract-3/scrim
   territory), so the implementer does not expect Arm A to fix it.
5. The immersive stage scrim (row 9, `stage="immersive"`) at 14px reads receded-not-destroyed.
- DELTA: `docs/tranches/BI/audit/visual/W-GLASS-SUBTLETY-DELTA.md` (filed at the sweep).

## §Obligations

- Coordinate the side-sheet graded-field endpoint (row 10, 40→34) with `BI.W-GRADED-BACKDROP` before either
  lands (shared surface; the halo experiment reads the recalibrated deep-frost).
- Coordinate the sheet corner shape with `BI.W-SHEET-RADIUS`: **A** requires reconciling SHEET-RADIUS's
  sheet-squircle revival to round (a revive-then-retire churn); **A'** and **B** both KEEP the sheet
  squircle (no reconciliation — A' dissolves the churn by rounding only the dialog). Only A collides.
- Route the atlas adverse-shift outbound to `Q060 CONSUMER-OUTBOUNDS` (the atlas bundle owner). If the seat
  picks B, the outbound additionally carries the atlas-chart-card Chrome-superellipse census.
- A fresh `npm run build` before any claim about the re-baked `:root` composites.
- The C2-SHAPE fork (A / A' / B) and the C2-INNER affordance (pill vs field-rung) are §0-adjacent design
  decisions resolved at the Q002/Q003 paint lane by eye (F6/F7) — NOT presumed here; the alias bind
  (C2-BIND) is unconditional under any.
- BOOK the `ladder-derive` structural follow (C1-STRUCTURE) — tokenize the four hand-tracked blur literals +
  the retina media override so they derive from the ladder primitives; not minted this pass, not smuggled
  into the values-only calm cut.

## §Dispositions

- **Arm A subtlety recalibration (rows 2-6, 8, 9, 10): BUILD** — one ~15% pull, S≈0.85 primary / S≈0.78
  escalation, integer-rounded, complete 10-row census.
- **Row 1 wash / Row 7 deep: HOLD** — the scrim floor and the emphatically-frozen deep ceiling stand.
- **Contract 2 visible payoff: SMALL, stated** — the radii are already value-equal in every shipped config
  (default + neutral), so the bind is value-invariant/invisible and the shape fork imperceptible at 16px;
  the payoff is a one-source guarantee + the affordance decision, and the *perceived* inconsistency (if
  real) routes to F6/F7 (likely the pill-heavy inner controls), not presumed fixed by the bind.
- **Arm B alias bind (`--radius-dialog: var(--radius-card)`): BUILD — unconditional.**
- **Arm B shape fork: DEFERRED-TO-PAINT, three options, A'-leaning (NOT B).** A (round dialog+sheet), A'
  (round the dialog ONLY, keep the sheet squircle — the minimal directive-literal move that dissolves the
  SHEET-RADIUS churn), B (squircle the card family — an iOS-27-forward card-family REDESIGN whose blast
  radius exceeds the dialog-consistency ask, NOT the primary). Decided by eye (F6), UNPRIMED. Something
  ships in 7.0.0 either way (the alias bind is unconditional).
- **Arm B inner-control affordance (C2-INNER): DEFERRED-TO-PAINT, folded (not dropped)** — the pill-heavy
  inner controls (the third ref defect + directive (4)'s design-affordance clause) ride Contract 2 as an
  explicit sub-decision (modal single-line fields → `--radius-field` 16px via a scoped
  `.field-control[data-kind="input"]` override off the hardcoded pill — NOT the concentric relay, which the
  input does not consume; textarea already reads `--radius-field`; buttons pill-or-field), reversing the
  AW.W25 keep-the-pill policy for the modal input only, decided at the same F6/F7 lane. Not presumed, not dropped.
- **`BI.W-BLUR-MUTE`: SUBSUMED (not built; nothing to retire)** — no `.btn-glass` blur override exists on
  disk; the root recalibration delivers it, so BLUR-MUTE is not built and no override is added (one source
  of truth); judgment-d subsumed into this wave's paint judgment.
- **φ-derivation: STRUCK** — presented as a ~15% integer-rounded pull, not a golden-ratio rung; the "one
  scalar" framing tempered to "4 cascade + 4 hand-tracked + 1 media override" (C1-STRUCTURE).
- **One-source STRUCTURE (C1-STRUCTURE): re-drift risk NAMED, structural fix BOOKED** — rows 6/8/9/10 are
  hand-literals not tokenized to the ladder (the reason the prior census missed them); values fixed here,
  the `ladder-derive` tokenization booked as a follow, not smuggled in.
- **atlas: OWED — recorded outbound** (adverse dock bleed-through; the one-line consumer edits are
  atlas-tranche-owned; glass-ui places the coordination mark + routes to Q060).

## §Tag-sequencing ruling (harden §6, C-TAG)

**SEQ POST · rides immutable 7.0.0 unconditionally.** Contract 1 is a framework-wide visual/identity
recalibration (every glass surface repaints) — a **major** for a design system, though no API/token-name
changes. Contract 2 (bind + shape) is the identity corner cut. Both are mature-enough-to-freeze and land
in 7.0.0 together. **Held consumers are NOT delayed** — atlas (6.0.0) and slides (3.13.0) are pinned below
7 and untouched until they choose to bump; the recalibration never mutates 6.x/3.x. POST: land after the
live transaction quiesces and RE-PIN the file lists + line numbers then. Paint truth (Q002/Q003) gates the
7.0.0 tag, not the commit.

## §Implementation model note (the standing split)

Opus IMPLEMENTS the scalar + bind + fork from this spec (deterministic token edits); Fable JUDGES the
subtlety step (F4), the corner fork (F6), and the inner-control affordance (F7) at the pre-tag paint lane
(Q002) + the native batch (Q003) — the §π/DELTA rows are the judged artifacts (captured screenshot + paired
π), never a commit-message claim (the paint-claim inflation class, PROCESS-CODEX §3). The three eye-decided
choices (S≈0.85 vs 0.78; shape A / A' / B; inner controls pill vs field-rung) are Fable's calls, evidenced,
not the implementer's.

## §Two-challenge gate note

Converged two-consecutive-clean under the triumvirate dispatch (PROCESS-CODEX §5): RESEARCH (unknown grade
→ read-only census of the blur ladder, the radius family, the iOS-27 canon, the three references) → HARDEN
(suspicious grade → refute-default). HARDEN **REFUTED/CORRECTED six research fronts**: (1) the census was
incomplete — +3 missed blur values, the **20px high-DPI overlay restore** the decisive miss (a no-op on the
exact retina/mobile tier the refs are captured on); (2) the **reference does not match HEAD's default
dialog** (1px wash + stage none) — its heavy blur is the opt-in immersive 16px scrim, a Contract-3 target,
so Contract 1's floating ladder does NOT fix the headline complaint; (3) the **φ derivation is a narrative**
over a 2-value system — reframed as a ~15% integer pull, gentle-step-first; (4) the **legibility
"exonerated by construction" claim is FALSE for the 0.68 dialog** — blur is the only detail suppressor at
0.68, floor named at 10px (11 safe); (5) **deep de-bundled** — HOLD the frozen 16px ceiling; (6) the
**squircle direction fork opened** — harden leaned B (squircle the cards) toward the iOS-27 directive over A
(round-everything); the FORMATION-REPAIR pass rebalanced this to A'-leaning/unprimed (see below). HARDEN
CONFIRMED the KISS lever (one pull over the census; one bound alias), the saturate-held decision, and the
geometry-safe retire. The TRANCHE-WRITE arm re-verified every value against `ca23d54f`, added **two fresh
disk findings** (the light-dark.css note self-corroborates the row-6 co-move as "in lockstep"; the
`BI.W-SHEET-RADIUS` collision), ruled **row 10 rides this wave** (not the deferrable experiment), surfaced
the `BI.W-BLUR-MUTE` subsumption, and split the three contracts into two waves on merit (§Wave shape).

The **FORMATION-REPAIR pass (design seat, round 1)** then found faults and folded them: the MUST-FIX — the
**dropped third ref defect** (the pill-heavy inner controls) — is now carried as **C2-INNER** (directive
(4)'s design-affordance clause, decided at F7); the shape fork gained the **missing A' option** (dialog-only
round — the churn-free directive-literal move) and was **rebalanced off lean-B to A'-leaning/unprimed** (B
is a card-family redesign whose blast radius exceeds the dialog-consistency ask — the SHEET-RADIUS
"strengthens B" argument is dissolved by A' which keeps the sheet squircle); Contract 2's **small visible
payoff** was stated plainly (radii already value-equal, the bind invisible); the D0b config muddle was
**restated** (the ref's content matches the story but a non-default stage was engaged at capture; the ref is
bottom-anchored/full-width = sheet/coarse-pointer); the **one-source STRUCTURE re-drift risk** was named
(C1-STRUCTURE, `ladder-derive` booked follow); the stale `animations.css:269` inline `8px` fallback is
**co-moved**; and the BLUR-MUTE subsumption reworded (**not built — nothing to retire**).

The **FORMATION-REPAIR pass (design seat, round 2)** then closed the r2 critique faults, each re-derived from
disk (not patched in prose): the MUST-FIX **C2-INNER disk-contradiction** — the wave had said the Slug
`<Input>` "reads `--radius-control`" and adopts `--radius-field` "via the concentric relay"; disk truth is the
input reads `border-radius: var(--radius-pill)` **directly** at `_shared/field-control.css:34` (`--radius-control`
is `radius.css:64`-scoped to Checkbox + base Tabs; the input consumes NEITHER `--radius-control` NOR the relay
`--radius-ctx`), and `[data-kind=textarea]` **already** reads `--radius-field` (`field-control.css:39`), so the
fix is re-stated as a **modal-scoped `.field-control[data-kind="input"]` override** onto `--radius-field`
(single-line only), with `_shared/field-control.css` named in the manifest and the mislocated
"DialogContent field context / `--control-surface` band" corrected; the MUST-FIX **affirmative "why subtle wins
on OUR content" thesis** (the task's explicit bar, carried only defensively before) is now folded as **C1-WHY**
— our 0.50–0.80 transmissive plates (`glass.css:55-57,179`) read *more* frosted than apple.com's ~0.8 solid, so
we can afford less blur and the calmer register restores the thin-pane depth read, shipped as the falsifiable
hypothesis **F4** tests; the SHOULD-FIX **AW.W25 keep-the-pill policy** (`radius.css:37-43`) the C2-INNER
field-rung reverses is now cited (as scrupulously as C2-SHAPE cites the round-card policy); the SHOULD-FIX
**retired `proof:*` gate names** are reworded to their surviving successors (`tests-visual/adaptive-glass.spec.ts`,
`tests-visual/nested-backdrop-budget.spec.ts`) or the bare operational criterion (`doc-override-idiom` has NO
surviving spec); and the SHOULD-FIX **tier-distinctness falsifier** (content 7 vs floating 11 narrows to ratio
1.571 — must stay visually DISTINCT, a first-class escalation trigger separate from "reads unchanged") is added
to F4. No third challenge is owed on substance; the round-2 repair closed the two-MUST + three-SHOULD faults
with source-line evidence and the two-clean law resets to one confirming pass.

The **FORMATION-REPAIR pass (design seat, round 4)** then folded the completed reword-census enumeration
(critic + a broadened orchestrator sweep), every site re-verified against disk `47c49f8b`: the **six
bare-`8px` peer-lock sites** (a 4th recurrence — dock `shell.css:18/:19/:44/:46/:214` + `dock.css:65`
present-tense `8→7`; `glass/material.css` "demoted the blur ladder (quiet/resting → 8px)" TRAJECTORY appends
"→ 7px", pinned by STRING since the concurrent scrub stripped its `WS3` prefix) added to the census + the
Arm-A manifest as comment-only co-moves; the **C1-CENSUS-GREP `8px` FROM-value BROADENED** from the
parenthesized `blur(8px)` form to ALSO the bare `8px` material/ladder/peer-lock form (the structural root
cause of the recurrence); a **C1-DERIVED** subsection for the deep-tier LERP interpolants (`glass/deep.css:52`/
`:91`/`:92` + `tokens/glass-deep.css:85`) that recompute off `floating + depth×(16 − floating)` at
implementation; a **C1-REGISTER** REQUIRES-RULING entry for `motion-registers.css:23`'s enter-transient `8px`
(co-move-vs-independent, ruled at implementation by which primitive it resolves); a **C1-OOS** out-of-scope
table (shadow-geometry px, gradient stops, the authored 8–15px band, the RETIRED 20px deep-ceiling verdict,
radius/sizing/hit-box px) to preempt round-5 false recurrences; and two precision trajectory-vs-present-tense
disambiguations (`light-dark.css:31` "24→20px" trajectory APPENDS "→17px" distinct from `:32`'s present-tense
`20→17`; `glass.css:76` "10→8" trajectory APPENDS "→7" distinct from the present-tense `:77`/`:98`/`:153`
set), plus `drawer/styles.css:363` named beside the existing `:361`. Two disk-imprecisions in the inbound
enumeration were corrected rather than applied blind (recorded in the census, not silently absorbed): the
C1-REGISTER gloss "enter-overlay 8px fallback" is disk-false — the enter-overlay row `:20` is **6px**, the
`8px` is the *enter-transient* row and it is the motion table, not census row 8; and the C1-OOS `glass-deep.css:12-25`
range would have swallowed `:24`'s in-scope floating trajectory, so `:24`/`:47`/`:57` are carved back OUT of
out-of-scope. Comment-only, no paint moves; the two-clean law resets to one confirming pass.
