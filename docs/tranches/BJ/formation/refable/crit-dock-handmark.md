# REFABLE crit — RU-05 GF-DOCK + RU-06 GF-HANDMARK (fresh-critic pass)

- verified-model: claude-fable-5—read verbatim from this seat's system context ("The exact model
  ID is claude-fable-5").
- Charge: fresh Fable critic, authored none of the unioned designs, assume-wrong posture. Corpus
  read: `greenfields/GF-DOCK-PASS3.md`, `greenfields/GF-HANDMARK-PASS3.md`, sidecars
  `refable/REFABLE-RU-05.md` + `refable/REFABLE-RU-06.md`, the 18-law codex
  (`ios27/IOS27-CODEX.md`), `IOS27-MICRO/analysis/SUFFUSION-MATRIX.md`, `IOS27-MICRO/CHARTER.md`,
  `BJ/FEEDBACK-LEDGER.md`, the measured timelines (`sr-0620-1847`, `sr-0620-1848`,
  `sr-0710-1626`), MARKS-B, and the dock + handmark sources at HEAD.
- Evidence verified on disk before any finding was written: `springPresets.ts` dock preset
  0.30/ζ0.82 ✓; `useDockOverflowFit.ts:38-40` ✓ (but see D-4); `useSelectionGroup.ts:183-186`
  `block:'nearest'` ✓; `useSelectionIndicator.ts:16-24` comment ✓; `BottomDock.vue:161-252`
  chevrons ✓ (demo/shell); `overflow.css:91-105` pixel fade mask ✓; handmark 2305 LOC / 11 code
  files ✓ (~the claimed 2306/12); brush weights 7/16/12/26 ✓; `ink.ts` CURVATURE_GAIN 2.5 ✓;
  `ink.ts:195-210` se-guard masked fallback ✓; `HandMark.vue:311-316` isolation deliberately
  removed ✓; `:338` negative-z + multiply ✓; `:349-365` dual draw mechanisms ✓; `noise.ts` 4
  octaves at 5% span ✓; `manifest.ts:984-986` blurb ✓; pencil-boil sole-family importer ✓ (+ the
  demo story); MARKS-B §6 "cluster chips / never mid-glyph / no interior scroll (F27)" ✓; 21pt
  symmetric insets ✓ (`sr-0620-1848:33,55`); collapse order/330ms/f109 ✓ (`sr-0620-1847:71-93`);
  all drag-lens constants ✓ (`sr-0710-1626:36-64`); law-14 scroll-snap verdict verbatim ✓
  (`sr-0620-1848:55`). The measured substrate of both designs is sound. The F27-vs-F47
  reconciliation (§2, cross-axis ban vs detented layout travel) is argued honestly against the
  user's own "scrolling dock" words and survives scrutiny—no finding there.
- User-verdict coverage: dock F47/F27/F06/F04/F05-half all map to design decisions or ASKs;
  handmark F34–F40 all map. No orphaned verdict rows found (D-6 concerns gate COVERAGE of an
  already-mapped clause).

---

## RU-05 GF-DOCK findings

### D-1 MAJOR — the lens contract is forked against the live campaign's own canon

GF-DOCK §9 swears "duplicating them here would fork the canon," then W4 builds the terminal
selection lens to codex law-16b/c constants while SUFFUSION-MATRIX §1.4-G—the IOS27-MICRO
campaign's canonical synthesis, which GF-DOCK cites approvingly for the overflow model and
N3—specifies a materially DIFFERENT lens contract for the same G row:

- travel: matrix "stretches to span source and target (~2.5 slots)" vs §7.1's one-pitch blob
  with a decaying ~1.6-1.8x bulge and an explicit ban on "a width tween between endpoints";
- arrival: matrix "lands oversized 110-120%, holds ~200ms, cools—overshoot in scale AND light"
  vs law 16b's ~250ms settle and the measured "squash-settle, no visible bounce"
  (`sr-0710-1626:48`);
- engage: matrix §1.1/§1.4-G mandates the press-charge—"a glow wash crosses the whole bar before
  any travel (the Find My whole-bar wash)"—which is measured evidence and is ABSENT from §7
  entirely (the ladder's most under-suffused rung, per the matrix, stays unsuffused here);
- idle: the matrix's one licensed idle light (the ~8s specular sweep on a primary selection
  lens) is neither adopted nor withheld—unaddressed.

The matrix's stretch-to-span + oversized-arrival row reads like the pre-RU-15 "sliding pill"
lens model that RU-05 D9 records as falsified; if so the matrix G row is stale and needs the
correction routed to IT (the R5 reciprocal feed), not silence. Either way a builder today holds
two live canons for the campaign's headline object and neither document names the other's
divergence. FIX: add a reconciliation row to §9 declaring the law-16 constants senior and
routing the matrix G-row travel/arrival correction to IOS27-MICRO; fold the engage press-charge
wash and the idle-sweep license into §7 (adopt or explicitly withhold, one line each).

### D-2 MINOR — the condensation geometry does not close at the deep end of the cut band

§4.3: interior detents guarantee a 25-60% cut-band partial whose "glyph [is] whole at reduced
size" via condensation scale ~0.6-0.7. At a 60% cut the visible sliver is 40% of the cell; a
0.6-0.7-scaled item fits only when the glyph occupies ≲2/3 of cell width. True for icon cells
(BottomDock, consumer #1); false for label-carrying or text items, where G-EVIDENCE's "whole
glyph" clause is unsatisfiable as written. The "by construction" claim is overclaimed for the
general component. FIX: state the glyph-fraction precondition, and give labeled cells their rule
(condense the icon, the label dies under the lip first) or tighten the band for them.

### D-3 MINOR — the lip shadow paints exactly where law 3 says the illusion breaks

§4.3's material channel is "a dark under-rim occlusion gradient a few px deep" at the port's
side edges—dark VERTICAL edge shading on a horizontal dock. Law 3's community-spec clause names
"quiet sides—dark verticals are the tell that breaks the illusion" (`IOS27-CODEX.md:13`).
"The rim caustic quieted over it" gestures at this but never confronts the tell. FIX: one
sentence binding the lip to the CONTENT layer (a shadow cast ON the sinking item, under the
tray) rather than the tray's rim paint, plus an alpha/depth bound, so π-EVIDENCE cannot pass a
paint the material laws fail.

### D-4 MINOR — G-NO-BLOCK-SCROLL's RED anchor mischaracterizes the cited lines

§4.1 and §10 claim "`useDockOverflowFit.ts:38-40` measures block overflow." Verified on disk:
those lines measure the LAYOUT axis (`scrollWidth−clientWidth` for horizontal docks;
`scrollHeight` only when the dock itself is vertical). No line there exhibits the F27 defect.
The honest RED anchors are the F27 screenshot + `useSelectionGroup.ts:183-186` (`block:
'nearest'`, already cited) + whatever CSS gives the layer block overflow. A born-RED gate
anchored to lines that are not red weakens the gate's own discipline. FIX: correct the anchor.

### D-5 MINOR — two birth budgets for one lens

G-LENS-DRAG gates birth "≤100ms" while §7.1 and law 16c say ≤83ms (and G-LENS-TAP keeps ≤83ms
with the 12fps-granularity parenthetical). One measured bound, two gate numbers, no declared
tolerance rule. FIX: both gates cite the measured ≤83ms with an explicit frame-granularity
tolerance clause—one discipline.

### D-6 MINOR — F47's vertical clause has no gate or π coverage

The ledger row reads "auto-scrolls the dock (vertical and horizontal)." §4.1 rotates the
contract in one sentence, but every gate and π instance is horizontal-only (G-NO-BLOCK-SCROLL
asserts `scrollHeight===clientHeight`; π-NO-BLOCK is 320px + desktop; π-REACH/π-EVIDENCE name no
vertical dock). The one clause of F47 the user wrote in parentheses is the one clause nothing
verifies. FIX: add one vertical-dock instance to π-REACH + π-EVIDENCE, or declare the vertical
dock out of W1-W3 scope with a reason.

### D-7 MINOR — W2 builds on the hybrid before F2 answers the question the hybrid presumes

The hybrid default assumes post-gesture snap corrections and velocity-projected flick landings
are expressible against native momentum on Safari 2026—precisely the F2 NATIVE-SCROLL question
§9 defers. On the hybrid, a touch flick runs native deceleration (rests anywhere) and the JS
correction arrives as a visible second settle—G-DETENT-PHYSICS's flick clause is plausibly
RED-by-mechanism, not RED-at-HEAD. The wave table sequences W2 before any F2 result exists.
FIX: mark W2's flick/rubber-band clauses F2-conditional (programmatic seats + keyboard land
either way), or sequence W2 after the probe lands; the spec already says the contract is
mechanism-agnostic—make the wave say it too.

### D-8 MINOR — W4's blast radius on the other two indicator consumers is unnamed

The single writer (`useSelectionIndicator`) is consumed by SegmentedTabs and ToggleGroup
(verified: `SegmentedTabs.vue`, `tabs/constants.ts`, plus the dock). W4 makes the lens the
terminal selection layer and G-SELECTION-ONE-WRITER keeps one writer—but the design never says
whether the lens register lands INSIDE the shared writer (changing tabs/toggle-group behavior,
which needs a consumer-updates note per the ruling) or as dock-local composition above it.
ASK 2's rollout question names strip/rail only. FIX: name the two consumers and the composition
boundary in W4's scope line.

---

## RU-06 GF-HANDMARK findings

### H-1 MAJOR — P4's width law breaks its own bound and the G-RESTRAINT gate

§2 P1 defines v̂(t)=30t²(1−t)²—the unit-INTEGRAL bell, whose peak is 1.875 at t=0.5, not 1.
P4 then sets w(u)=W·(1−0.12·v̂(u)), which thins the stroke 22.5% at mid-stroke—breaching P4's
own "total modulation ≤~15% outside the tips," the hard gate G-RESTRAINT ("width modulation
≤15% outside the end tapers"), and the sidecar's "±12% velocity width" (RU-06 D3). As specced,
W1's flagship gate is born-RED against the spec's own generator and stays red, or gets silently
retuned. FIX: use the peak-normalized bell 16t²(1−t)² in the width law (or divide by 1.875);
keep the 30-coefficient unit-integral form for the draw PACE, where it is correct. The s(t)
quintic and its derivative identity check out—only the width normalization is wrong.

### H-2 MINOR — x-height is load-bearing three times and measured zero times

Strike y = mid-x-height (§3.3), the highlight band seats baseline→x-height (§3.2/§3.3), and
G-WEIGHT bounds weight ≤ x-height/6—but the ratified surviving measurement machinery
(`useHandMark.ts` `baselineFrac`) measures the BASELINE only; no x-height source exists at HEAD
and the design names none. Three rules are unimplementable as specced. FIX: state the source—a
Range probe over an 'x' glyph, font-metrics where available, or a declared em-fraction
approximation with its error bound.

### H-3 MINOR — the checkbox binding cannot ride the exports as specced

SUFFUSION-MATRIX :118: "draw velocity inherits the press spring's." The stroke vocabulary (§6)
exposes `minJerk(t)` and `markDuration(lengthPx)`—no velocity input anywhere in the export
contract—so the first named ≥2-site consumer cannot honor its own matrix row through the
vocabulary G-VOICE gates on. FIX: add a velocity seed to the contract (pace/duration scaling
from the press spring's live velocity, clamped), or route a matrix amendment striking the
inheritance clause.

### H-4 MINOR — highlight's default color defeats the highlighter

`color` defaults to `currentColor` for all four shapes. For underline/strike/circle that is the
right ink; for highlight it paints a band in the TEXT's own color at α≈0.32 behind that same
text—the highlighter read (distinct hue behind ink) is structurally lost, and the F36-cure
flagship ships a default no consumer can use. FIX: a per-shape default for highlight (a theme
highlight token), or document that highlight requires an explicit color and gate it.

### H-5 MINOR — two citation stretches, in a document that struck the opus loop for exactly this

(a) §5 licenses the default-ON entry draw under "laws 8/15"—but law 15's fire-and-forget clause
governs CLOSES and law 8 governs gesture-carried entries; the actual authority is the
breath-of-life edict + the matrix mark-draw rows, and SUFFUSION §1.1's license list
(fire-and-forget only for keyboard overlay enter/exit and the app-zoom class) is never
confronted. (b) §2 P6 glosses law 11 as "luminance drift, never geometry jitter," while law 11's
editorial exemplar attests positional gradient-field drift (~7.6pt/s); the ink-is-still
conclusion stands on the substrate row (K: substrates never carry engagement light), not on that
gloss. The union rightly struck the opus loop's fabricated "multiply against the page" law-1
cite—these two looser citations invite the same treatment from the next critic. FIX: re-ground
both in one line each.

---

## Verdict

Both unions are substantially sounder than the records they superseded: the measured constants
check out against the timelines line by line, the file:line evidence is real (one anchor
mischaracterized, D-4), every user-verdict row maps, the IOS27-MICRO await-ledger is genuine
deference on eight of nine decisions—the ninth is D-1, and it is the campaign's headline object.
The handmark physics reframe is the right model with one wrong normalization constant sitting
directly under a hard gate (H-1). Nothing here reopens either architecture; D-1 and H-1 must
land before W0 contract-lock in either wave set.

Findings: RU-05—1 MAJOR, 7 MINOR. RU-06—1 MAJOR, 4 MINOR. 13 total.
