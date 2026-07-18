# REFABLE RU-13 — F31-F40 verdict sidecar

**Seat model (verbatim from system context): claude-fable-5.** Prior artifact model:
claude-opus-4-8 (config override). Union target rewritten in place:
`../redress/DOSSIER-F31-F40.md`.

**Protocol honored.** ANEW ran first against primary sources only — the ten ledger rows, the eight
preserved stills (read as images), `src/components/{handmark,easing,deck,carousel,pager-dots}/`,
`src/composables/motion/reveal/`, `demo/stories/motion/{handmark,curve-gallery,reveal,deck}.vue`,
`src/styles/paper.css`, git history (`26a81929` BA.W-HANDMARK ship, `2d1584a5` demeta scrub), the
bands at `../../waves/`, `PLAN.md`, `JUDGE.md`, `ASK-REDUCTION.md`, `GF-HANDMARK-PASS3.md`.
**Boundary moment:** the opus artifact was opened only after the full ten-row ANEW analysis
(component correlation + mechanism + band reconciliation) was complete; every opus claim was then
treated as incorrect until re-proven against the fresh evidence. Every opus file:line citation in
range was re-verified on disk (all held except one minor cite, F40 `geometry.ts:106+` →
`:143-167`).

## Per-row verdicts

| Row | verdict | basis |
|-----|---------|-------|
| F31 | **RATIFIED** | Void mechanism independently re-derived (stretch grid cell + fixed-clamp square SVG, `EasingPicker.vue:327/336/345`) before reading opus — identical. AMEND-D-8 verified real (`FSF:436-439`, adoption block `BAND-STORY.md:545-556`); ASK §B4 verified. Added: BAND-MATERIAL W5 review-marking; the `38cqi`-no-container note; the 518-line-SFC residual stated as inside-W3, not a separate mandate. |
| F32 | **RATIFIED** | ASK §C3 + BAND-REDUCTION routing verified. Appended the post-JUDGE riders the opus artifact predates: C-D (the 9-keep/6-cut table ships as the recommendation) + J11 (A06 scroll standard codified inside the collapse). |
| F33 | **SUPERSEDED** (opus wrong at HEAD) | The opus row's "dot half has NO owner / coverage PARTIAL / Δ-F33-1 proposed" was true at writing and is false at HEAD: JUDGE **J3** adopted the delta and minted `BJ.W-PAGER-DOT-MORPH` as BAND-FEEDBACK-MOTION **W6** (`BAND-FEEDBACK-MOTION.md:130-148`), sequenced with the vestigial `DeckPager.vue` cut; crosswalk annotated per JUDGE §D item 5. Union row rewritten: coverage EXACT, delta DISCHARGED. |
| F34 | **RATIFIED** | All anchors re-verified (`brush.ts:140/144/153-154`, `constants.ts:57,61`, `useHandMark.ts:113`). GF-HM W1 ownership exact. |
| F35 | **RATIFIED** | Anchors re-verified (`brush.ts:111/124-125`); the CRIT2 vbH-retract honesty confirmed in GF-HM. |
| F36 | **PARTIAL** (opus incomplete on the primary mechanism) | The escape half (weight-26 hull + `overflow:visible`, GF-HM W3 cure) RATIFIED. The opus row observed "almost NO visible highlight" but never explained it; fresh finding: the demo card's `paper-grain-overlay` sets `isolation:isolate` (`paper.css:124-126`) making the CARD the compositing group, and `mix-blend-mode:multiply` (`HandMark.vue:340-343`) of yellow at opacity 0.38 against the dark `bg-card` computes ≈ the card color — the band is invisible by arithmetic in dark mode; only the overflow onto transparent backdrop reads gold. → **FLIP-1** below. |
| F37 | **PARTIAL** (opus root wrong) | Ownership + cure (GF-HM W5 `createStrokeDrawIn`) RATIFIED. The root claim "self-crossing value-noise Catmull-Rom centerline" is impossible for the shipped specimen: the draw-on demo uses the DEFAULT PEN (`handmark.vue:72-74`) and `natural` auto-engages only for `brush==="boil"` (`useHandMark.ts:113`) — the value-noise is never in that path. Corrected root candidate: normalized-dash under-run (`pathLength="1"` + `dasharray:1` under the none-stretch + `non-scaling-stroke`), the "dash-gap at rest" GF-HM §6 itself warns of. Exact reproduction LIVE-DEFER. → **FLIP-2** below. |
| F38 | **RATIFIED** | Register anchors all re-verified (weights 6/7/3/16/12/26; ring grain 0.7); `BJ.W-RESPONSIVE-AUDIT` verified to exist (BAND-STORY W6). User-ruling full-surface-authority framing confirmed (`GF-HM:377-386`). |
| F39 | **RATIFIED + AMENDED** | grain/z toggles verified. Amendment: the opus mapping of "awful encapsulation" to mis-z tearing is thin — the API half is the fresh finding: the demo hand-tunes `:box="{x:18,y:8,w:64,h:24}"` in raw viewBox units (`handmark.vue:105-110`) to circle a word the component already wraps and measures. Routed to GF-HM W4/W6 (text-mode circle self-measures its datum) under the full-surface-authority ruling. Additive — not a flip. |
| F40 | **RATIFIED** | All caption/jargon sites re-verified (`handmark.vue:26,51,67,119-120,150-151`); se-guard verified (`ink.ts:195-215`); one line-cite corrected (`geometry.ts:143-167`). Double-ownership (GF-HM W6 G-NO-JARGON + BAND-STORY W2 G-COPY-2/4 with J8) verified. |

**Counts: ratified 7 (F31, F32, F34, F35, F38, F39, F40) · opus-wrong 3 (F33 stale-at-HEAD, F36
primary-mechanism missing, F37 root mis-attributed) · fable-new 3 (F36 dark-multiply invisibility,
F37 pen-not-value-noise + dash-under-run, F39 hand-tuned-box encapsulation).**

## FLIPS — findings contradicting a ruling or a charter premise (lead re-judges)

No J1-J11 ruling is contradicted. Two greenfield-charter premises are:

**FLIP-1 (F36 — vs GF-HANDMARK-PASS3 §5/C8-iii + π-CONTAIN's framing).** §5 claims "F36 becomes
impossible whether the geometry is right or not — the escape has no path to the pixel," and C8-iii
preserves `mix-blend-mode:multiply` + `z-index:-1` as intentional. The claim covers only the
ESCAPE. The F36 still shows the band is also INVISIBLE over the word, and the mechanism is
verifiable statically: the demo card's `paper-grain-overlay` carries `isolation:isolate`
(`src/styles/paper.css:124-126`), so the blend backdrop is the dark `bg-card`, and multiply of
`#ffd84a` at opacity 0.38 against a dark umber computes ≈ the umber — chromatically invisible in
dark mode. A W3-contained band under the same blend stays invisible; "doesn't even work" survives
the wave as specified. The component's own premise ("the multiply must compose against the PAGE",
`HandMark.vue:312-316`) is defeated by any isolated ancestor — including the demo's own cards.
**Asked of the lead:** amend GF-HANDMARK W3 (or W2) with a scheme-aware ink arm — multiply in
light, `screen`/plain-alpha ink in dark (the `Brush.blend` vocabulary already carries `screen`) —
and extend π-CONTAIN/G-CONTAIN to assert band VISIBILITY over the word in BOTH schemes, not only
no-escape.

**FLIP-2 (F37 — vs GF-HANDMARK-PASS3 §6 move-1 + G-DRAW-CONNECTED's RED-cause).** §6 attributes
F37 to "a high-excursion, self-crossing value-noise Catmull-Rom path" and claims the calm
centerline "alone removes the fragment read." The shipped specimen is the default PEN — the
value-noise is provably not in its path (`useHandMark.ts:113`; `handmark.vue:72-74`) — so the
attribution is false and move 1 is not shown to cure F37. Move 2 (`createStrokeDrawIn`, real
length, dasharray cleared at completion) is the load-bearing cure and stands. **Asked of the
lead:** re-anchor `G-DRAW-CONNECTED`'s RED-cause text to the normalized-dash mechanism on the pen
specimen (LIVE-DEFER the exact reproduction), keeping the gate's GREEN condition unchanged.

## Routings

- F31 → BAND-STORY W3 `BJ.W-CONFIGURATOR-STD` G-CFG-5 (AMEND-D-8 framing) + ASK-REDUCTION §B4 +
  BAND-MATERIAL W5 (review-mark).
- F32 → ASK-REDUCTION §C3 (C-D table attached; J11 standard rides the collapse wave).
- F33 → ASK-REDUCTION §C1 (keep-both) + BAND-FEEDBACK-MOTION W6 `BJ.W-PAGER-DOT-MORPH` (J3;
  DeckPager.vue cut sequenced first-or-same-wave).
- F34/F35 → GF-HANDMARK W1. F36 → GF-HANDMARK W3 + FLIP-1 amendment. F37 → GF-HANDMARK W5 +
  FLIP-2 re-anchor. F38 → GF-HANDMARK W1/W2 (+register §4). F39 → GF-HANDMARK W4 (+W4/W6
  self-measuring-datum amendment). F40 → GF-HANDMARK W2/W4/W6 + BAND-STORY W2.
- FLIP-1 + FLIP-2 → the lead, for re-judgment against GF-HANDMARK-PASS3 before W3/W5 execute.
  **[CLOSED — see the RU-14 closure below; the wave/gate names in the two lines above are the
  pre-RU-06 map and read through the dossier's SUPERSEDED-BY-RU-06 table.]**

## RU-14 closure (2026-07-18, fix seat claude-fable-5)

**FLIP-1 and FLIP-2 are CLOSED — CONSUMED-BY-RU-06.** Both were filed against the pre-redo
GF-HANDMARK-PASS3; the RU-06 rewrite (7746d586, 01:32) + the cross-critique fix pass (117b7f12,
06:43) consumed their substance and changed the ground they stood on:

- **FLIP-1 (F36 invisibility) — CONSUMED.** The charter at HEAD carries the invisibility as its
  OWN sharpening 1 ("the F36 band is invisible INSIDE the card, not merely escaped") and π-BAND
  asserts band visibility ("the invisibility half is the new probe the prior loop lacked",
  `GF-HM:240`). The flip's proposed CURE is STRUCK, not just moot: scheme-aware
  `multiply`/`screen` ink now CONTRADICTS the charter's explicit law — "NO blend modes… Plain
  alpha ink is deterministic on both themes" (`GF-HM:126-129`). Executing the flip as written
  would reintroduce the banned mechanism. The multiply/screen amendment ask is withdrawn.
- **FLIP-2 (F37 RED-cause) — CONSUMED.** The charter re-attributes F37 to the dual draw
  mechanisms (`GF-HM:31`, `HandMark.vue:349-365`) and replaces them with ONE mask-draw whose dash
  clears at rest (`GF-HM:114-116`, W3 `G-DRAW`). `G-DRAW-CONNECTED` no longer exists to
  re-anchor — grep-zero at HEAD. Nothing remains to re-judge.

**F32/F33 consequence mirror (RU-09, 5c847780).** This sidecar's F33 row ("coverage EXACT, delta
DISCHARGED") is superseded: RU-09 overturns the KEEP-DISTINCT isolation — the deck stage goo is a
byte-identical clone of the pager worm (`PagerDots.vue:326` ≡ `DeckGooFilter.vue:26`) ruled
COLLAPSE-FAMILY and slated for deletion, which NO wave owns at HEAD (J3's W6 sequences only the
DeckPager cut) — the dossier's F33 coverage is downgraded to PARTIAL and the wave-widening ask
rides the JUDGE-2 docket (`../redress/DOSSIER-F11-F20.md`). F32's C-D "9-keep/6-cut table" anchor
is stale — the rewritten SUPERFLUITY carries the C-F fresh-census kill/keep verdict instead; the
dossier's F32 rider is re-anchored.
