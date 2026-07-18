# RU-14 — redress twice-critique redo, pass 1 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh critic over the REDONE dossiers `redress/DOSSIER-F31-F40.md`,
  `redress/DOSSIER-F41-F50.md`, `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*`
  sidecars. I authored none of them; every claim was presumed wrong until re-proven on disk.
- **Verification base:** HEAD `454f6d64` (2026-07-18). `git diff --stat 55f5170d..HEAD -- src/ demo/`
  is EMPTY — the paint tree the dossiers judged is byte-identical to today's. The DOCS tree is not:
  three post-dossier rewrites (01:32-06:43, 2026-07-18) are the source of every MAJOR below.
- **Anchors re-verified on disk this seat (~60):** the full `brush.ts` register (pen 6/0.7/1.2 ·
  boil 7/hull/0.9/1.4 · pencil 3 · crayon 16/3.0 · ring 5/0.55/grain 0.7 · marker 12 ·
  highlighter 26/hull/0.38/multiply), `constants.ts:57,61`, `composables/useHandMark.ts:113`,
  `HandMark.vue` (pathLength/dash block, data-behind multiply, circle/box/bracket `z-index:-1`,
  the C-1(e) no-isolation comment ~:311-316), `paper.css` `paper-grain-overlay` `isolation:isolate`,
  `ink.ts` se-guard fallback, `geometry.ts:143-167` box/bracket, `EasingPicker.vue` :327/:336/:345 +
  518 lines exact, `curve-gallery.vue:189-202`, `typewriter.vue:103` + the nowrap-less container,
  `settings.vue` dead knobs (`baseSize`/`radius` :29-30 bound at :201/:209, absent from
  `surfaceStyle` :52-75), `gate-pattern.vue` DialogContent-nested Input, `field-control.css` :34
  pill + F7 rule :46-47, `radius.css` `--radius-dialog: var(--radius-card)`,
  `SectionPreviewCard.vue` (outer card / inner well `border-radius`+`background`+inset ring
  :87-92; `content-visibility` :63-65), the 4-file `.tile.vue` census, `storyTile.ts` ladder,
  `intro.vue:79-87`, `BottomDock.vue` chevron chrome + `FadingScroll` + `goToStory`,
  `overflow.css` (`overflow-x:auto` :64, `scroll-padding-inline` :78, zero `scroll-snap-type`),
  `useSelectionGroup.ts:183` `scrollIntoView`, the blur ladder (wash 1 / quiet 7 / resting 7 /
  floating 11 / overlay 11 / deep 16 / 2dppx 17), `--glass-halo-*` 20px/13rem/7rem,
  `ModalOverlay.vue:49,:98`, `DialogContent.vue:466-473`, `auth-shell.vue` (:27/:38-42/:64-69/
  :207-218 + last-touch commits 490cc46e/2d804ce6 = 2026-07-16), `PRESETS` = 17 exact,
  `aurora-mediums.wgsl.ts` `applyMedium` 3/5/6/7→Kuwahara, `AppShell.vue:11,:26`,
  `aurora-hero.ts:15-16`, `Slider.vue` box-INVIOLATE ~:422 + 651 lines, `PagerDots.vue` 580,
  `DeckPager.vue` 47 lines, `deck.vue:31,:127`, engage-surface grep-zero
  (`--scale-engage`/`.engage-grow`/`useEngageModal` = 0 in `src/`), `PROCEDURAL-SUITE.md` six-
  retained-incl-LiquidGrid vs `BAND-REDUCTION.md:285+` delete, `model-census.json`
  (349 seats: 332 opus / 15 fable / 2 unknown), MARKS-A/B `verified-model` stamps, the FSF
  amendments D-4/D-5/D-6/D-8 at :413-439 + G-COPY-LINT :588-592 + canon :257-258 + table :224,
  BAND-STORY :245/:269/:506-509/:545-556/:582-592, BAND-MATERIAL :74-75/:111-115/:509,
  BAND-FEEDBACK-MOTION W5 :98 + W6 :130, ASK-REDUCTION §B4 :120/§C1 :148/§C3 :190/§D1 :227,
  ledger F31 :43/F41 :53/F50 :62/A01 :68/A17 :84, crosswalk rows :53-72 + :217-220,
  CHRONIC-ADJUDICATION ruling 4, `BI.W-ENGAGE-AFFORD.md` :293/:297-298/:528-533, and the
  cure-commit ancestry set (below).

## §1 — What held (the ratified spine)

The three dossiers are evidence-dense and largely disk-true. Everything in the anchor list above
that the dossiers assert resolves EXACTLY as written except the items in §2. Specifically
ratified: the F31 void mechanism (stretch grid cell + clamp-square SVG, and the `38cqi`
no-container note), the F36 dark-multiply invisibility arithmetic (the demo card's
`isolation:isolate` IS on disk and the component's own C-1(e) comment IS defeated by it), the F37
pen-not-value-noise correction (`useHandMark.ts:113` auto-engages `natural` for boil only; the
draw-on specimen at `handmark.vue:72-74` carries no brush prop), the F39 hand-tuned `:box` API
finding, the F41 site + wrap rider, the F43 dating reversal (rework 07-16, corpus 07-17 — the
user judged the CURRENT palette), the F44 dead knobs, the F46 structural double-card + 4-tile
census, the F47 four-part isolation incl. the library-recenter precision, the F48 6-names→4-radii
ladder + the 2dppx arm, the F50 end-to-end experiment verification, and the whole A-dossier
correction layer (A15 332/349 inversion, A01/N5 planned-not-extant via grep-zero, A09/A16 fam-I
phantom, A14/N2 PROCEDURAL-SUITE-vs-W3 collision — all re-proven independently). Coverage
accounting is honest, tallies sum, no row in scope is silently dropped, and no J1-J11 ruling is
contradicted anywhere in the three dossiers or their sidecars.

## §2 — Findings

### RU14-1 · MAJOR · DOSSIER-F31-F40 — the F34-F40 redress layer is stale at HEAD: GF-HANDMARK-PASS3 was replaced after the dossier

The dossier (mtime 01:01/01:27) cites the pre-redo greenfield throughout. RU-06 (`7746d586`,
01:32) + the cross-critique fix (`117b7f12`, 06:43) REWROTE `GF-HANDMARK-PASS3.md`:

- The wave map is now W0 CONTRACT-LOCK · W1 THE-VOICE · W2 THE-SURFACE · W3 THE-CHOREOGRAPHY ·
  W4 THE-STORY · W5 CONSUMER+FINAL. The dossier's owners "W3 CONTAIN-HIGHLIGHT", "W4 RING-LAYER",
  "W5 DRAW-ON", "W6 story" no longer exist as named.
- Gates `G-CONTAIN`, `G-RING-LAYER`, `G-DRAW-CONNECTED`, `G-NO-SLIVER` are GONE (grep-zero at
  HEAD); the surviving set is G-CALM/G-RESTRAINT/G-LAYER/G-WEIGHT/G-PROPS/G-DRAW/G-NO-JARGON/
  G-VOICE.
- The F38 register cut changed shape: the dossier says "7 brushes → pen · pencil · highlighter +
  a `Partial<Brush>` override". The charter at HEAD rules ONE pen voice, NO brush prop, NO
  `Partial<Brush>` hatch, highlighter re-cast as a SHAPE (`GF-HM:158-159`, Q-HM-1 resolved
  `:248`).

Ownership survives (GF-HANDMARK still owns F34-F40 under the standing user ruling, `GF-HM:16`),
so this is not a drop — but every gate-grain "Coverage: EXACT" citation in F34-F40 now points at
dead names, and an executor following the dossier would build the retired charter.
**Fix:** re-point the seven rows' REDRESS/STATUS blocks at the current wave/gate map (or stamp a
dated SUPERSEDED-BY-RU-06 note at the range header) — same for the crosswalk rows :56-62, which
carry the identical stale names.

### RU14-2 · MAJOR · REFABLE-RU-13-F31-F40 sidecar — FLIP-1/FLIP-2 left open against a replaced charter; FLIP-1's cure now contradicts it

Both FLIPs were addressed "to the lead, for re-judgment against GF-HANDMARK-PASS3 before W3/W5
execute". The RU-06 rewrite consumed both and moved past them:

- FLIP-1 (F36 dark-multiply invisibility): the rewritten charter carries the finding as its own
  sharpening 1 ("the F36 band is invisible INSIDE the card") and cures it by banning blend modes
  outright — "NO blend modes … multiplies toward black over dark glass anyway. Plain alpha ink is
  deterministic on both themes" (`GF-HM:126-129`). FLIP-1's proposed amendment (scheme-aware
  multiply-in-light / `screen`-in-dark ink) would REINTRODUCE the mechanism the charter now bans.
- FLIP-2 (F37 dash under-run root): absorbed — the charter's F37 line now reads "the dual draw
  mechanisms fragmenting" (`GF-HM:31`), and `G-DRAW-CONNECTED` (the gate whose RED-cause text the
  flip asked to re-anchor) no longer exists.

**Fix:** close both FLIPs in the sidecar as CONSUMED-BY-RU-06 (FLIP-1's multiply/screen ask
struck as superseded; FLIP-2 satisfied by the new G-DRAW framing). Leaving them open invites a
double-application that directly contradicts the live charter.

### RU14-3 · MAJOR · DOSSIER-F41-F50 (F45 + F48) + sidecar — the cure-commit "post-tag" dating is false and internally impossible

Verified by ancestry: `923c5254`, `2764f60b`, `58fba6e6`, `24b63d01`, `189ae15c`, `71892b9e` are
ALL ancestors of `v7.0.0` (tag commit `4ab12128`, 2026-07-17 18:11; the six land 03:07-11:14 the
same day). The dossier calls the first trio "all post-7.0.0-tag fix-pass commits" (F45) and "the
post-tag fix-pass" (F48) while F50 correctly calls the LATER trio (11:14) "landed pre-tag" — the
two claims cannot coexist on one branch, and the pre-tag one is right for all six. The sidecar
repeats the error verbatim ("923c5254/58fba6e6/2764f60b post-tag; 24b63d01/189ae15c/71892b9e
pre-tag") and counts "the cure/experiment commit dating" among its fable-new findings.
Consequence for release accounting: 7.0.0 SHIPS the F45/F48 rounding cures — it did not ship the
defect and get patched after. The regression-guard substance (J5 applied at
`BAND-MATERIAL:111-115`, rule live at `field-control.css:46-47`) is unaffected.
**Fix:** correct both rows + the sidecar to pre-tag; hedge F45's "the screenshot predates that
fix-pass commit" (screenshot and commit are same-day — plausible, unprovable from this seat).

### RU14-4 · MAJOR · DOSSIER-F41-F50 (F47) — the redress prescribes a mechanism the rewritten GF-DOCK-PASS3 explicitly strikes

The dossier maps F47(a) partly to "W2 `G-SNAP-DETENT`: `scroll-snap-type` so cells detent instead
of resting mid-glyph" and F47(b) to "W3 `G-REVEAL`". At HEAD the redone charter rules the
opposite mechanism: "the detent CONTRACT survives but its CSS-snap mechanism is struck (law 14:
'CSS scroll-snap cannot express duration-stable snapping. Web: JS spring integrators')"
(`GF-DOCK-PASS3:52-54`, again at :115). Gate names drifted with it: `G-OCCLUSION-PEEK`,
`G-SNAP-DETENT`, `G-REVEAL` are grep-zero; the survivors are G-EVIDENCE + G-MORE-SIGNAL (W1
CENSUS PRIMITIVE + EVIDENCE STACK, where "the pixel fade mask dies") and G-RADIUS-GRAMMAR (W5
chrome delete — both of which I re-verified as still owning the dossier's (a)-fade and (c)-chrome
halves). **Fix:** re-map F47(a)/(b) onto the W1 evidence stack + the JS-spring detent engine and
the current reveal-on-intent seat; drop the `scroll-snap-type` prescription.

### RU14-5 · MAJOR · DOSSIER-F31-F40 (F33, F32) + DOSSIER-F41-F50 (F42) — SUPERFLUITY.md was rewritten by RU-09; the F33 recommendation layer is contradicted and one residue is unowned

RU-09 (`5c847780`, 01:32 — after both dossiers) replaced SUPERFLUITY.md wholesale. Two hits:

- **F33 is now COLLAPSE-FAMILY (OPUS-WRONG overturn of the KEEP-DISTINCT the dossiers reconciled
  against).** The primitives-keep half matches the dossier's ASK §C1 framing, but RU-09 proves
  the deck demo's stage goo is a byte-identical CLONE of the pager worm machinery
  (`PagerDots.vue:326 ≡ DeckGooFilter.vue:26`, identical filter topology) and mandates deleting
  `useDeckGoo.ts`/`gooBarbellGeometry.ts`/`DeckGooFilter.vue` + the ~200-line goo CSS. The
  dossier's F33 ISOLATION states the stage goo "is a DIFFERENT mechanism from the pager dots" and
  closes "coverage EXACT … No residue" — at HEAD that leaves the RU-09 goo-clone deletion owned
  by NO wave (J3's W6 sequences only the `DeckPager.vue` cut).
- **F32/F42's "ruling C-D ships the full 9-keep/6-cut scroll table"** now cites a table the
  rewritten SUPERFLUITY no longer carries; the fresh F32-F42 verdict is a different decomposition
  ("scroll spine NOT duplicated; the reveal wing is — FOUR stagger mechanisms, TWO near-identical
  morph adapters"). The §C3 ownership holds; the recommendation text a ratifying user would read
  is stale.

**Fix:** widen `BJ.W-PAGER-DOT-MORPH` (or BAND-REDUCTION) to carry the RU-09 F33 migration
explicitly; refresh the §C1/§C3 recommendation texts and the C-D anchor to the RU-09 verdicts.

### RU14-6 · MAJOR · DOSSIER-A01-A17 (A12, A13) — greenfield redo strikes/renames the cited owning waves

- A12 lists "W-DELETE-TWIN (WebGL2-only)" and "W-CHROME" among GF-BLOB's owning waves. At HEAD:
  "W-DELETE-TWIN is STRUCK (§2.9). W-CHROME becomes W-STREAK" (`GF-BLOB-PASS3:284`) — the
  imported WebGL2-only order was reversed by the redo, so the row's roster names one struck and
  one renamed wave.
- A13 describes GF-AURORA W4 as "oil PORT-or-KILL, terminal set `{}`". At HEAD the redo widens
  the fork: "The opus PORT-or-KILL binary contradicts β's own center" — W4 is now
  PORT / REAUTHOR-LEAN / KILL with re-derived slot accounting (`GF-AURORA-PASS3:168-241`).
  `G-MODE-DISTINCT` and the C-G binding survive (re-verified), so F08/A13 ownership stands.

**Fix:** re-point the two rows' wave rosters; nothing at the verdict level changes (A12/A13
remain EXACT-at-ownership).

### RU14-7 · MINOR · DOSSIER-A01-A17 + sidecar — the fam-I phantom is dispositioned twice, divergently, without cross-reference

RF-5 (OW-3/R-5) rules A09's landing corrects to "CHRONIC-ADJUDICATION.md (formation-terminal …
the named landing vehicle was never drafted and will never execute". RU-13-A FLIP-1 asks the lead
to "(a) charter the DECIDED-rows wave or distribute its rows … (c) give the regrowth roster an
owner". Both stand on the same evidence (REGISTRY:174, grep-zero in PLAN/bands — re-proven this
seat) but pull toward different terminal records, and neither artifact cites the other. One lead
ruling should reconcile them (the RF-4/RF-5 amendment set + FLIP-1 are one decision).

### RU14-8 · MINOR · DOSSIER-F31-F40 — `useHandMark.ts` cited bare against the dossier's own repo-relative convention

The file lives at `src/components/handmark/composables/useHandMark.ts` (line 113 is exact). The
header's file list and the F34/F37 targets omit `composables/`. Cosmetic; re-pin.

## §3 — Union duty: verdicts on the OPUS-ERA critiques (assume-incorrect, re-proven this seat)

`CRIT1-A`, `CRIT2-A`, `CRIT3-SCOPED` scope F01-F30 / BAND-MATERIAL-W4 only — no finding touches
F31-F50/A01-A17; OUT-OF-SCOPE for this seat, nothing in them contradicts my rows.

**CRIT1-B** (its scope = exactly mine):

| finding | verdict | basis (this seat) |
|---|---|---|
| #11 Δ-F33-1 option (b) mis-target | **RATIFIED (conclusion) — one premise OPUS-WRONG** | The finger-occluded fence is real (`BI.W-ENGAGE-AFFORD.md:297-298`, re-read); pager dots do not fit; the fix landed. But "it already tag-shipped Tier-1 on Glass 7 (`:528-533`)" is false — `:528` is a SEQ/plan line ("rides the Glass 7 tag") and the engage surface is grep-ZERO in `src/` at HEAD (corroborates RU-13-A W6/N5: planned, never landed). |
| #12 F35 unread-citation NOTE | RATIFIED | Honest hedge, no directive. |
| #13 coverage-flavor NOTE | RATIFIED | Convention, not defect. |
| #14 F45 OPEN-1a wiring | RATIFIED | OPEN-1a was F09/F12/F17-only; the J5 conversion now carries F45 at `BAND-MATERIAL:111-115` — the finding's lineage is exactly what landed. |
| #15 HEAD-drift NOTE | RATIFIED | Cosmetic. |
| #16 F45 base-pill ":34 sits ~:42" | **OPUS-WRONG** | `field-control.css:34` IS `border-radius: var(--radius-pill)` on disk — re-measured this seat; the dossier's anchor was dead-on. CRIT2-B's counter-ruling stands. |
| #17 A14 over-generous EXACT | RATIFIED | Became D-A14 → J9; the disposition row is live at `BAND-STORY:582-587`. |
| #18 A11 MISSING-vs-PARTIAL NOTE | RATIFIED | Framing convention; D-A11 became J1 either way. |
| #19 unverified-by-me NOTE | RATIFIED | The hedge resolved true — the A02 corpus EXISTS (31 items re-listed this seat). |

**CRIT2-B**:

| finding | verdict | basis |
|---|---|---|
| 3 fix-verifications (Δ-F33-1 single-proposal · F45 OPEN-1a · A14 retally) | RATIFIED | Underlying disk claims re-verified; the RU-13 rewrite has since replaced those dossier texts wholesale, which supersedes the letter but not the substance. |
| #16 counter-ruling (dossier right, CRIT1-B mis-measured) | RATIFIED | Verified independently. |
| F33 DeckPager-cut sequencing NOTE | RATIFIED-AT-DATE, superseded | RU-09 widened the cut to the whole goo-clone engine (RU14-5) — the note's "compatible, one-phrase update" underestimates the current migration. |
| F32/F42 C-D 9-keep/6-cut sharpening NOTE | RATIFIED-AT-DATE, superseded | The table it promotes no longer exists in the rewritten SUPERFLUITY (RU14-5). |
| D-A11/D-A14/A05/A13 corroborations | RATIFIED | W5/W6 mints, the paper-backdrop row, the census — all re-proven. |
| `55f5170d..HEAD src/demo` parity claim | RATIFIED | Still empty at `454f6d64`. |

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F31-F40 (+ sidecar) | 0 | 3 (RU14-1, RU14-2, RU14-5 share) | 1 (RU14-8) | AMEND |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 3 (RU14-3, RU14-4, RU14-5 share) | 0 | AMEND |
| DOSSIER-A01-A17 (+ sidecar) | 0 | 1 (RU14-6) | 1 (RU14-7) | AMEND |

No BLOCKER: every row in scope keeps a real owner or an explicit ASK at HEAD, no silent drops, no
J1-J11 contradiction smuggled, tallies sum, post-mortems honest. The MAJOR class is one disease:
the RU-13 dossiers were unioned minutes-to-hours BEFORE the RU-06/07/08/09 corpus rewrites
(`7746d586`/`5c847780` 01:32 → `117b7f12` 06:43) and no reconciliation pass followed — their
greenfield/superfluity citations now describe retired charters, plus one provable commit-dating
error (RU14-3). The cure is one re-point sweep over the three dossiers + two sidecars (or dated
supersession stamps), the RU-09 F33 migration given an owner, and the FLIP closures recorded.

*End — RU-14 pass 1, seat B. One file; no `src/`/`demo/` edits, no commit.*
