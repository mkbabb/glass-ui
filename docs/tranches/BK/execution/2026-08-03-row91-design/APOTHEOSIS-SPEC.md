# APOTHEOSIS SPEC — MusicStaff (row #91, W-MUSIC-STAFF)

Adjudicated 2026-08-03 by a fresh Fable seat from two independent designs (Fable author A, Opus author B), every load-bearing claim re-verified against the working tree at `src/components/music-staff/` and the banked capture `docs/tranches/BK/execution/2026-08-03-audit-visual/music-staff.jpeg`. Owner word: "Music staff is to be kept herein and perfected. We may use it as a loading screen."

## 0 · Adjudication record

Verified true in source (both designs' shared ground): the hardcoded-px clef scribble (`MusicStaff.vue:118`), bass dots a line off (`cy 75/94` vs true `77/87`), the ledger runaway + cream-on-cream open head (capture), the flat bowl launched from the stem top (`MusicStaff.vue:146`), dead-flat playhead with no transition, `container-type` with zero queries, the `:key="replay"` remount hack, "without spring lag" in shipped copy (story blurb + `demo/stories/manifest.ts:600` "Shipped /music-staff.").

**A's unique confirmed find:** `styles.css:31` `backdrop-filter: blur(var(--glass-blur-resting, 18px)) saturate(1.04)` — `--glass-blur-resting` is a full filter list (`tokens/glass.css:212`), so substitution nests `blur(blur(…) saturate(…))`, invalid at computed-value time, and the whole declaration computes to `none`. The folio has no backdrop glass at all. Cured below by deleting the hand-rolled material, not by patching it.

**B's unique confirmed finds (the three root errors):** R1 no unit system (px clefs + `height` prop + `paddingX 128` + template literal `42`); R2 dual timing axes with seconds-as-beats fallback (`staffGeometry.ts:174–176` — flag count computed from wall-clock seconds); R3 pitch-class-not-spelling (`PITCH_CLASS_TO_DIATONIC` maps midi 63 to the same y for E♭4 and D♯4 while `musicPitchName` reads the accidental — the glyph contradicts its own aria-label). All three adopted; A never addresses R2 or R3.

**Rejected from A:** monoline stroked clefs (engraving truth: clefs are filled outlines; a 0.19 sp centerline is the capture's failure mode at better coordinates); the retained `width` prop + `meet` scaling (squashes long scores); ledger half-length 1.2 sp (~double the engraving extension); `role="progressbar"` in score mode; notehead ry 0.44 (bbox 0.92 sp tall vs Bravura 1.00).

**Rejected from B:** accent rebound to `var(--primary)` — verified `--primary: hsl(24 10% 10%)` (`color-radius.css:98`), near-black: on the cream folio the accent vanishes and the blue-pencil identity dies; the ledger-cap `RangeError` throw — painting every demanded ledger inside a derived-height folio IS the honest primary (the original sin was clipping, not ledger count), and a throw makes the MIDI path unusable on real music; the `ottava` prop (cut on parsimony — auto-clef + derived height cover the register); `seed`/`phraseLength`/`tempo` props + mulberry32 (cut — one composed motif, zero API); the "exactly Bravura" ellipse rx 0.63/ry 0.33 (actual bbox 1.205×0.755 — false; exact solve below); the fClef vertical-extent sign flip (the body descends below the F line, not above); the control-engage hover envelope (a score has no hoverable controls; ambient life is the breath + material); `LEDGER_CAP`-era demo throw copy.

**Spring literals:** every spring token name + charter B cites verified verbatim on disk (`scheme-spring.css:32–36`): snappy "indicators, progress, and reveals"; bouncy "success moments, and the completion seal"; dock (0.35 s, ζ 0.82) "a brisk liquid morph". The spec below binds by NAME only; on-disk values rule.

**DesignSync:** A cites a project (`5db72828…`); B's `list_projects` returned `[]`. Unresolvable from this seat; this spec is self-contained and does not depend on either artifact.

---

## 1 · Files

All work confined to:

```
src/components/music-staff/MusicStaff.vue        rewrite
src/components/music-staff/staffGeometry.ts      rewrite
src/components/music-staff/glyphs.ts             NEW — filled outline path data only
src/components/music-staff/styles.css            rewrite
src/components/music-staff/midiAdapter.ts        amend
src/components/music-staff/index.ts              amend
src/components/music-staff/README.md             rewrite
demo/stories/display/music-staff.vue             rewrite
demo/stories/manifest.ts                         line 600 blurb only
tests/components/music-staff.contract.test.ts    rewrite
tests/components/music-staff.geometry.test.ts    rewrite
tests/components/music-staff.midi.test.ts        amend
tests/components/music-staff.public-contracts.test-d.ts  amend
tests-visual/music-staff.spec.ts                 rewrite (Verify seat runs it)
```

Package subpath `./music-staff` (`package.json:411`) unchanged. No git operations, no servers, targeted vitest only.

## 2 · Unit system (R1)

**1 user unit = 1 staff space (sp).** One public size knob:

```css
--music-staff-space: 0.5rem;   /* the only size control */
```

- Staff lines at y = Ytop + i for i ∈ 0..4 (line spacing = 1.0 uu). `staffPos` = diatonic steps above the bottom line (treble: E4 = 0, B4 = 4 = middle line, F5 = 8; bass: G2 = 0, D3 = 4). `y(p) = Ytop + (8 − p) / 2`.
- **viewBox derived from engraved content, never from props.** Geometry returns the bbox of everything drawn (heads ±0.5, stem tips, flags, ledgers, clef extents, accidentals, playhead cap at Ytop − 1.4); viewBox pads it 1.0 sp top and bottom. `Ytop` is chosen so the padded top is 0. `width`/`height` props and `paddingX` die.
- **Intrinsic sizing:** `svg { width: calc(var(--music-staff-space) * <widthSp>); height: calc(var(--music-staff-space) * <heightSp>); display: block; }` (widths via inline style custom props). A long score is longer, not smaller. `preserveAspectRatio` scaling, `overflow: visible`, `min-height: 8rem`, and the `@media (max-width: 760px)` width hack all die.
- **The window** is a plain div: score mode `overflow-x: auto; overscroll-behavior-inline: contain;` (scrollable, focusable); loading mode `overflow: hidden` (a crop, not scrollable). Engraving scale is constant in both — nothing ever squashes.
- **`vector-effect: non-scaling-stroke` dies everywhere.** Stroke widths are literal engraving metrics in sp and are true at every size.
- Handy consequence (note in code): CSS transforms on SVG children operate in user units, so `translateY(-0.9px)` in a keyframe means −0.9 sp exactly.

**METRICS constant (staffGeometry.ts) — the only home of these numbers:**

```
staffLineThickness 0.13   stemThickness 0.12    ledgerThickness 0.16
ledgerExtension    0.40   (beyond the head, each side)
stemLength         3.50   (head center → tip; +0.75 per flag beyond the 2nd)
stemAttach         (±0.57, ∓0.168) relative to head center
beamThickness      0.50   beamGap 0.25  (second beam plane at 0.75 inboard)
barlineThin        0.16   barlineThick 0.50   barlineGap 0.40
augmentationDot    r 0.20, 0.50 past the head's right edge
clefColumn         clef x = 0.8; first onset at clefRight + 1.6
```

## 3 · Glyphs (`glyphs.ts` — filled outlines, anchor-gated)

Clefs, flags, and accidentals are **filled outline paths**, not strokes. Extract once from **Bravura** (SIL OFL 1.1 — attribution line in the component README) via a throwaway opentype.js script, coordinates normalized ÷(upm/4) so 1 em = 4 sp, y-down, origin on the anchor line. Store seven glyphs as path-data strings: `gClef`, `fClef`, `flag8thUp`, `flag8thDown`, `accidentalFlat`, `accidentalSharp`, `accidentalNatural`. If Bravura is unreachable from the implement seat, hand-author filled outlines to the same gates — the gates, not the bytes, are the contract.

Anchor gates (geometry test parses path data — M/L/C/V/H — samples cubics at t = 0..1 step 0.05, asserts bbox):

| Glyph | Origin on | Gate (sp, y-down, tolerance ±0.15) |
|---|---|---|
| `gClef` | G4 line (line 2 from bottom) | x ∈ [0, 2.68]; y ∈ [−4.39, +2.63]; spiral eye center within 0.15 of the G line |
| `fClef` | F3 line (line 2 from top) | x ∈ [0, 2.74]; y ∈ [−1.05, +2.54] (head above, curve descending); two dots r 0.24 at x ≈ 3.0–3.3, y = ∓0.5 straddling the F line |
| `flag8thUp` | up-stem tip | width 0.9–1.2 rightward; extends 2.9–3.3 downward from the tip |
| `flag8thDown` | down-stem tip | mirror of the above |
| `accidentalFlat` | pitch line | y ∈ [−1.75, +0.70] — stem rises, **bowl belly on and below the pitch line** |
| `accidentalSharp` | pitch line | y ∈ [−1.40, +1.40], oblique bars rising to the right |
| `accidentalNatural` | pitch line | y ∈ [−1.35, +1.35] |

Rendered via `<defs>` + `<use>` — one def per glyph, one `<use>` per instance. 16th/32nd flags = the 8th flag repeated at 0.75 sp inboard along the stem.

**Noteheads stay in-house ellipses** (exact Bravura bboxes, solved):

- black (beats < 2): `<ellipse rx="0.60" ry="0.485" transform="rotate(-20)">` filled → bbox 1.18 × 1.00 exactly.
- half (2 ≤ beats < 4): same rotation, centerline `rx 0.52 ry 0.40`, `fill: none; stroke-width: 0.16` → outer bbox 1.18 × 1.00. **The folio-fill mask dies** — the staff line honestly passes through the open head.
- whole (beats ≥ 4): outer `rx 0.844 ry 0.50` filled even-odd with counter ellipse `rx 0.42 ry 0.30` rotated ~55° (long axis top-left→bottom-right); no rotation on the outer, **no stem**. Bbox 1.688 × 1.00.

## 4 · Rhythm, spacing, beams (R2)

**Clean break on the note contract** (no aliases, no shims):

```ts
export interface MusicStaffNoteEvent {
    id: string;
    midi: number;        // 0–127 integer
    beat: number;        // onset, quarter-note beats from the quotation start
    beats: number;       // sounding length in quarter-note beats
    accidental?: StaffAccidental;   // "sharp" | "flat" | "natural"
}
```

Deleted from the contract: `start`, `duration`, `startTick`, `durationTicks`, `ticksPerQuarter`, `velocity`, `voice` (the last two never reached paint). One timing axis; ticks→beats converts once in `midiAdapter.ts` (`ticks / ppq`). This deletes `usesTicks`, `positionOf`, `extentOf`, the dual sort key, and four `assertNote` branches.

**Rhythm table** (replaces `openHead`/`flagCount` heuristics):

```ts
const RHYTHMS = [            // [beats, dots, flags, head]
  [4, 0, 0, "whole"], [3, 1, 0, "half"], [2, 0, 0, "half"],
  [1.5, 1, 0, "black"], [1, 0, 0, "black"], [0.75, 1, 1, "black"],
  [0.5, 0, 1, "black"], [0.25, 0, 2, "black"], [0.125, 0, 3, "black"],
];
// rhythmOf(beats): largest row with row.beats <= beats + 1e-6;
// below 0.125 clamps to the last row (adjudicator fix — B's rule matched nothing there).
```

Dots: r 0.20 at head-right + 0.5 sp, **raised to the space above when the note sits on a line**.

**Spacing** (Gould proportional-with-compression, replaces linear-in-time):

```
advance(beats) = 1.60 + 3.50 * beats ** 0.60      // sp, note → next note
```

1.60 = head width + minimum clearance ⇒ collision impossible at any density. Same-beat notes (chords) share x. Total width = clef column + Σ advance + 1.6 tail + final barline.

**Stems:** up iff `staffPos < 4` (middle line = **down** — fixes the current inverted rule). Attach at (±0.57, ∓0.168); length 3.5 sp; thickness 0.12. **Ledger-note rule (A's, kept — it is real engraving):** stems of ledgered notes extend to reach the middle line: `tipY = stemUp ? min(y − 3.5, middleY) : max(y + 3.5, middleY)`.

**Beams** (~45 lines; the single biggest "this is real notation" upgrade):

- Consecutive notes with `flags ≥ 1` sharing a beat group (`floor(beat)` equal) form one group of 2–4; singletons keep their flag.
- One direction per group, decided by the note **furthest from the middle line**.
- Beam = filled slab 0.50 sp thick, first→last stem tip; slope fitted then quantized to total rise ∈ {0, ±0.25, ±0.5, ±1} sp, capped ±1.
- Member stems extend to meet the beam, minimum 2.5 sp; secondaries at 0.75 sp inboard drawn only over the notes that carry them.
- Geometry returns `beams: { x1, y1, x2, y2, level: 1|2|3, delayMs }[]`.

**Barlines:** an initial thin barline (x = 0 of the note region, spanning the five lines) always; a final thin+thick pair in score mode only. Loading mode has no final barline — the score does not end.

## 5 · Spelling (R3)

One authority for staff position AND spoken name — the contradiction becomes structurally impossible:

```ts
const NATURAL_STEP = [0, null, 1, null, 2, 3, null, 4, null, 5, null, 6]; // C..B

function spell(midi: number, accidental?: StaffAccidental) {
    const pc = ((midi % 12) + 12) % 12, octave = Math.floor(midi / 12) - 1;
    const nat = NATURAL_STEP[pc];
    if (nat !== null) return { step: octave * 7 + nat, letter: LETTERS[nat], alter: 0, octave };
    return accidental === "flat"
        ? { step: octave * 7 + NATURAL_STEP[pc + 1]!, letter: LETTERS[NATURAL_STEP[pc + 1]!], alter: -1, octave }
        : { step: octave * 7 + NATURAL_STEP[pc - 1]!, letter: LETTERS[NATURAL_STEP[pc - 1]!], alter: +1, octave };
}
```

`staffPos()` and `musicPitchName()` both call it (name and export kept). E♭4 sits one diatonic step above D♯4 and the aria-label always agrees with the glyph. Accidental glyph drawn iff `note.accidental` is set or the pitch is a black key (default spelling sharp). Placement: glyph right edge 0.20 sp left of the head's left edge; shift a further 0.40 left when the note carries ledgers. Key signatures and chord accidental stacking: out of scope, documented in the README.

## 6 · Ledger containment (the runaway cure — honest, no throw)

1. Explicit `clef` wins. `clef: "auto"` picks the clef minimizing **max ledger count** over the notes, tie-broken by total ledger count, then treble. (Replaces the median heuristic — a median says nothing about the extremes, which are the only thing ledgers care about. The demo's G2-pedal class now lands on bass: G2 is the bass bottom line, zero ledgers.)
2. **Vertical extent derives from content** (§2), so every demanded ledger paints inside the folio; none paints where no note demands it. No cap, no clamp, no `RangeError` — a clamped ledger stack draws a lie, and a throw on real MIDI makes the component unusable. Painting the whole truth in a folio that grows to hold it IS the no-masking-fallback primary.
3. Ledger geometry: thickness 0.16, extension 0.40 sp beyond the head each side (total 1.98 sp — replaces the near-double 1.2 sp half-length).

## 7 · Public API

```ts
export type MusicStaffMode = "score" | "loading";
export type MusicStaffMaterial = "folio" | "bare";
export type StaffClef = "auto" | "treble" | "bass";

export interface MusicStaffProps {
    label: string;                            // accessible name, required
    notes?: readonly MusicStaffNoteEvent[];   // score mode; ignored in loading
    mode?: MusicStaffMode;                    // "score"
    progress?: number;                        // 0–1; undefined = no playhead (score) / indeterminate (loading)
    clef?: StaffClef;                         // "auto"
    material?: MusicStaffMaterial;            // "folio"
    decorative?: boolean;                     // false
}
```

**Deleted props, each with its reason:** `phase` (the parent owns lifecycle via `v-if` + `<Transition>`; entrance runs on mount with `animation … both`; the `:key="replay"` hack dies with it) · `width`/`height` (replaced by `--music-staff-space`; `height` was the prop that broke engraving) · `windowStart`/`windowEnd`/`maxNotes` (`notes.slice()` is one consumer line) · `describedNoteLimit` (constant 16 internally).

**Deleted behavior:** `navigateViewport()` + `aria-keyshortcuts` — a focused `overflow-x: auto` element already gets Arrow/Home/End (plus PageUp/PageDown the hand-rolled version lacked) natively; keep `tabindex="0"` on the score window only · `is-past` per-note class + `normalizedStart` (replaced by the clip wipe, §9) · `container-type: inline-size` (zero queries; the standing dock footgun) · the duplicate `--music-staff-accent` declaration.

**Accessibility per mode:**

| mode | root | attributes |
|---|---|---|
| score | `role="img"`, `tabindex="0"` on the window | label = `"{label}. Treble staff, 12 notes: E4 quarter, G4 eighth, …"` — rhythm is now known, so it is spoken; cap 16 then "and N more" |
| loading | `role="progressbar"`, `aria-busy="true"` | `aria-valuemin="0" aria-valuemax="1"`; `aria-valuenow`/`aria-valuetext` only when determinate — **omission of valuenow is the ARIA indeterminate contract**; no tabindex |
| decorative | `aria-hidden="true"` | no role, no tabindex, no name |

## 8 · The loading surface — the staff plays itself

The reading line stays parked and the page streams past it (player-piano roll — inherently indeterminate, claims no percentage). **Zero JS at runtime: no rAF, no timers — the no-resident-loop virtue survives.**

**The motif is composed, not generated** (no PRNG, no props — parsimony over B's seeded walk; deliberateness over randomness). One 8-beat phrase, in-staff by construction (staffPos 0–8, zero ledgers, zero accidentals), exercising pairs, a four-16th run with double beam, a dotted quarter with its dot, a lone flag, and quarters:

```ts
const LOADING_MOTIF: MusicStaffNoteEvent[] = [
  { id: "m01", midi: 67, beat: 0,    beats: 0.5 }, { id: "m02", midi: 71, beat: 0.5,  beats: 0.5 },
  { id: "m03", midi: 74, beat: 1,    beats: 0.5 }, { id: "m04", midi: 76, beat: 1.5,  beats: 0.5 },
  { id: "m05", midi: 74, beat: 2,    beats: 0.25 },{ id: "m06", midi: 72, beat: 2.25, beats: 0.25 },
  { id: "m07", midi: 71, beat: 2.5,  beats: 0.25 },{ id: "m08", midi: 69, beat: 2.75, beats: 0.25 },
  { id: "m09", midi: 67, beat: 3,    beats: 1 },   { id: "m10", midi: 64, beat: 4,    beats: 0.5 },
  { id: "m11", midi: 67, beat: 4.5,  beats: 0.5 }, { id: "m12", midi: 69, beat: 5,    beats: 1.5 },
  { id: "m13", midi: 71, beat: 6.5,  beats: 0.5 }, { id: "m14", midi: 67, beat: 7,    beats: 1 },
];
```

**Mechanics:**

1. The motif engraves **once** into `<defs><g id="…-motif">`; three `<use>` at x = 0, W, 2W (W = motif advance width) cover any host width; the reel `<g>` rides `animation: music-staff-reel var(--music-staff-loop-duration) linear infinite` translating exactly −W per cycle. **Linear is correct for the transport** — a conveyor with an ease reads as stutter; the notes carry the weight, not the belt.
2. `--music-staff-loop-duration: calc(8s * var(--motion-tempo))` — one second per beat, public token.
3. **Clef, rules, initial barline, and reading line sit outside the reel** — a clef that scrolls off the page is wrong.
4. The reading line parks at the golden minor cut of the reel region: `x = reelOrigin + (1 − 1/φ ≈ 0.382) · W` — aristotelian placement, not eyeballed.
5. **Phase-locked strikes, no clock:** geometry computes `phase = frac((noteX − 0.382·W) / W)` per note; each note's def carries inline `animation-delay: calc(var(--music-staff-loop-duration) * -<phase>)` on `animation: music-staff-strike var(--music-staff-loop-duration) linear infinite`. Because the `<use>` copies sit exactly one period (W) apart, identical delays are exactly correct for every copy — the lock survives duplication. The keyframe is flat except a spike over the first 8% of the loop: `scale(1 → 1.08 → 1)` (`transform-box: fill-box; transform-origin: center` — the note pulses ON its line, never leaves it) + ink→accent color decay, stop percentages shaped from sampled `springPreset("press")` — a real rebound, in stops, because the animation itself must stay `linear` to hold phase.
6. **Determinate inside indeterminate:** when `progress` is set, the reel keeps streaming (activity) and the five rules + initial barline ink up in accent behind it via a viewport-space clip rect at `progress · windowWidth` (progress). Static layer only — no interaction with the moving reel, so nothing un-inks.
7. **Completion seal** (`progress ≥ 1`): the reel pauses (`animation-play-state: paused`) while a nested settle group runs a one-shot `translateX(-0.5px) → 0` on `--spring-bouncy` / `--spring-bouncy-duration` — the token whose own charter names "the completion seal" — and the final thin+thick barline wipes in at the window's right edge on the draw-in law (`--ease-out-expo`, clip-path wipe; a rule never overshoots).

## 9 · Progress rendering (score mode)

```
--music-staff-progress: <0..1>    (inline style on the root)
```

The engraved note group draws twice: plain ink, then accent ink clipped by `<clipPath><rect>` whose width follows the progress value. A half-crossed note is half accent — the correct wipe reading a per-note boolean cannot produce. The playhead is the clip's leading edge: a 0.10 sp accent rule spanning staffTop − 1.2 to staffBottom + 1.2, with a capped dot (r 0.35) above the top line, `transform: translateX(…)` frame-locked to the same value. Playhead + clip retarget on `transition: transform var(--spring-snappy-duration) var(--spring-snappy)` — the register whose charter is verbatim "indicators, progress, and reveals"; its ~3% overshoot is the weight. **This is the direct repeal of the shipped "without spring lag" copy.** `progress` undefined ⇒ no playhead, no clip (only render a report that exists).

## 10 · Motion (springs by name; light on envelopes, never on springs)

| Channel | Binding | Adjudication |
|---|---|---|
| Staff rules + barlines draw | `--ease-out-expo` on the shared `--draw-in-duration` clock (draw-in.css), stagger 28 ms per line **from the middle line outward** | The codified law: a rule never overshoots. Center-out is the aristotelian axis (the eye anchors at the middle line) |
| Clef arrival | outline wipes on expo; then `scale(0.96 → 1)` settle on `--spring-smooth` / `--spring-smooth-duration` | the big patient object |
| Notehead landing | `translateY(-0.9px) scale(0.86) → identity` on `--spring-panel` / `--spring-panel-duration`; `transform-box: fill-box; transform-origin: center` | panel's overshoot is intrinsic, not velocity-bought — a note kisses its line and settles |
| Head fill | 120 ms opacity envelope, `--ease-standard` | light never rides a spring |
| Stems | `scaleY(0) → 1` from the head outward on `--spring-dock` / `--spring-dock-duration` | attached parts get the brisk liquid morph, no independent life |
| Beams | `scaleX(0) → 1` from the group's leading stem on `--spring-dock`, after its last member lands (`delayMs` from geometry) | the whip-and-settle is the liquid-weight payoff |
| Playhead + clip | `--spring-snappy` transition (§9) | charter-verbatim |
| Reel transport | `linear` (§8) | phase-lock requirement |
| Strike | press-shaped stops in a linear keyframe (§8.5) | shape lives in the stops |
| Completion seal | `--spring-bouncy` settle + expo barline wipe (§8.7) | charter-verbatim |

Per-onset reveal stagger kept (inline `animation-delay` per note, as today).

**Breath of life at rest** (the edict is absolute; placed where it costs no engraving truth):

- **The rules breathe, not the ink.** Staff-line opacity waves ±0.06 about its 0.55 base (0.49 ↔ 0.61) on a 5.2 s `--ease-standard` alternate cycle, per-line delays center-out — a slow wave traveling the staff, not a unison pulse. (Base raised from 0.45 for legibility — A's point, folded.)
- **The playhead bead breathes** when a playhead exists: `scale(1 ↔ 1.06)` + opacity 0.7 ↔ 0.9 on the same clock.
- **Noteheads never move at rest.** A note drifting off its line is an engraving sin at any amplitude; the folio's glass rung carries the material's own specular life.
- In loading mode the reel IS the engagement; the rule breath is suppressed so the two never beat.

**Reduced motion:** score mode fully static (complete notation, seated playhead, no breath); loading mode shows the motif static with the slow rules opacity breath only — a loading surface must still signal busy, and opacity-only is the PRM-safe channel; progress updates crossfade at `--duration-fast`. All animation under `@media (prefers-reduced-motion: no-preference)` except that one loading opacity breath, which sits under `reduce` explicitly.

## 11 · Tokens and material

**Minted (component register, documented as the score's own material — a cream paper object in dark chrome, both modes):**

```css
--music-staff-folio: oklch(0.96 0.021 86);
--music-staff-ink:   oklch(0.30 0.018 66 / 0.90);
```

**Accent stays the blue pencil:** `--music-staff-accent: var(--viz-chebyshev);` — B's `--primary` rebind is rejected (near-black on cream); the token is consumer-overridable, as the story's `--viz-legendre` section already proves.

**The folio material is the real ladder rung, not hand-rolled CSS.** The window in folio material takes `class="glass-resting"` and injects cream through the rung's designed tint seam:

```css
.music-staff[data-material="folio"] .music-staff__window {
    --glass-tint-source: var(--music-staff-folio);
    --glass-tint-strength: 85%;
    background-image: var(--paper-clean-texture);   /* longhand beats the rung's shorthand */
    border-radius: var(--radius-panel);
    color: var(--music-staff-ink);
}
```

This deletes the hand-rolled border + triple box-shadow + the **invalid** `backdrop-filter` in one stroke — the paint bug is cured by deletion, and the folio gains the rung's rim, under-shadow, and real backdrop material. `material="bare"`: no rung, ink = `color-mix(in oklab, var(--foreground) 88%, transparent)`, inheriting the host mode.

**Every var() fallback literal dies** (the tokens exist in-library and the staff ships inside it): `var(--foreground)`, `var(--radius-panel)`, `var(--paper-clean-texture)`, `var(--motion-tempo)`, `var(--ease-out-expo)`, `var(--ease-standard)` bare. Both raw literal families die (`hsl(26 16% 18%)` ×4, `rgb(255 246 226 / 82%)`, `#3159a6` ×2, `#29241e`). Local duration tokens (`--music-staff-rule-duration`/`-symbol-duration`/`-exit-duration`/`-rule-stagger`) fold into the shared clocks above.

**Public token surface (5):** `--music-staff-space`, `--music-staff-ink`, `--music-staff-accent`, `--music-staff-folio`, `--music-staff-loop-duration`.

**Trap compliance (standing register):** the folio's shadows now come from the rung — but ANY component-authored shadow keeps plain per-mode arms; an inset fragment inside `light-dark()` computes the whole box-shadow to `none`. Dark-mode selectors, if any are ever needed, are plain-ancestor `.dark .music-staff__…` in the plain CSS file — never `:global(.dark)` (the component has no scoped block; keep it that way).

## 12 · MIDI adapter

`noteEventsFromParsedMidi` emits the new contract: `beat = note.ticks / ppq`, `beats = note.durationTicks / ppq`, `accidental` from `name` (unchanged heuristic). `velocity`/`voice` emission dies. **`noteEventsFromMidi` is deleted** — verified a trivial one-line compose of `noteEventsFromParsedMidi(parse(bytes))`; the caller who has a parser composes it themselves. `ParsedMidi*Like` structural types stay; `MidiByteParser` dies with its function.

## 13 · Exports (`index.ts`)

```
MusicStaff · MusicStaffProps · MusicStaffMode · MusicStaffMaterial
MusicStaffNoteEvent · StaffAccidental · StaffClef
engraveMusicStaff · MusicStaffGeometry · MusicStaffNoteGeometry · musicPitchName
noteEventsFromParsedMidi · ParsedMidiDocumentLike · ParsedMidiTrackLike · ParsedMidiNoteLike
```

Gone from the surface: `MusicStaffPhase`, `EngraveMusicStaffOptions` (options shrink to `{ clef? }` — fold the type or keep it one-field, implementer's call), `noteEventsFromMidi`, `MidiByteParser`. `LOADING_MOTIF` and the loop-phase helper stay module-internal (tests import `staffGeometry.ts` directly via the `@glass` alias).

## 14 · Tests

**`music-staff.geometry.test.ts` (rewrite)** — invariants, not px snapshots: the seven glyph anchor gates (§3, sampled-path bbox helper ~40 lines); ledger count 0 for every in-staff pitch and exactly N for a pitch N positions out; derived viewBox contains every glyph + 1.0 sp pad; auto-clef picks bass for a G2-register corpus (zero ledgers) and treble for the corrected demo study; `spell(63,"flat").step === spell(63,"sharp").step + 1`; `rhythmOf` round-trips the table incl. dots and the sub-0.125 clamp; whole note emits no stem; middle-line note stems down; ledgered-note stem reaches the middle line; beam grouping (four 16ths in one beat ⇒ one group, two beam levels, one direction; slope rise ∈ quantized set; member stems meet the beam); spacing monotone in beat order with `advance ≥ 1.60`; loading phases ∈ [0,1) and monotone in x; determinism (same input ⇒ deep-equal geometry).

**`music-staff.contract.test.ts` (rewrite)** — `role="img"` + rhythm-bearing label in score mode; `role="progressbar"` + `aria-busy` + **absent** `aria-valuenow` when loading indeterminate; `aria-valuenow` present when determinate; `aria-hidden` + no tabindex when decorative; no `aria-keyshortcuts` anywhere; deleted props absent from the runtime surface.

**`music-staff.midi.test.ts` (amend)** — adapter emits `{beat, beats}` via `ticks/ppq`; spelling from `name`; parser-failure propagation and ppq rejection kept; velocity/tick assertions die.

**`music-staff.public-contracts.test-d.ts` (amend)** — new prop surface compiles; `phase`/`width`/`height`/`windowStart`/`windowEnd`/`maxNotes`/`describedNoteLimit` and note-event `start`/`duration`/`startTick` **fail** type-check (clean-break assertions).

**`tests-visual/music-staff.spec.ts` (rewrite — Verify seat only, owns the browser):** folio background non-transparent and backdrop-filter ≠ `none` in both color modes (the cured paint bug, asserted); a `.music-staff__beam` exists; loading reel `animationName` ≠ `none` and clef outside the moving group; under `prefers-reduced-motion: reduce` the reel is `none`; the `aria-keyshortcuts`/`music-staff-head-in` assertions die with their features.

Run targeted: `npx vitest run tests/components/music-staff.geometry.test.ts tests/components/music-staff.contract.test.ts tests/components/music-staff.midi.test.ts` (+ typecheck config for the test-d file).

## 15 · Demo story + manifest

`demo/stories/display/music-staff.vue`:

1. **Headline section = the owner's named affordance:** "The staff plays itself" — `mode="loading"` indeterminate, then the shipped `Slider` (not the raw range input) driving determinate progress, then the completion seal at 1.0.
2. Score study corrected: drop `pedal-a` (midi 43 under a C5 melody is grand-staff music, ungrained on one staff); the remaining 12 notes convert start/duration values directly to beat/beats. Add a bass section (a low phrase, e.g. C3–G3 walk) showing auto-clef landing on bass with zero ledgers — the old defect class becomes a feature demo.
3. Bare-material and decorative sections kept; `phase` buttons and `:key="replay"` die (replay = `v-if` toggle through the parent's own `<Transition>`).
4. Blurbs: strike "without spring lag" (edict inversion in shipped copy) — name `--spring-snappy` by role instead; strike the keyboard-shortcuts copy.

`demo/stories/manifest.ts:600`: strike "…and accessible overflow navigation. Shipped /music-staff." — release-status prose in a story registry; new blurb names the loading surface and the beat-native engraving.

`README.md`: rewrite — new contract, the 5 public tokens, Bravura OFL attribution line, out-of-scope list (key signatures, chord accidental stacking, multi-voice); **the "Consumer and release boundary" scaena paragraph dies** (stale cross-repo narration; greenfield-no-meta).

## 16 · Parsimony ledger (targets, not gates)

| File | Now | Target |
|---|---:|---:|
| MusicStaff.vue | 187 | ~120 (defs + use collapse the per-note template) |
| staffGeometry.ts | 201 | ~180 (rhythm + beams + spacing added; dual axis + windowing deleted) |
| glyphs.ts | — | ~30 data lines |
| styles.css | 164 | ~120 |
| midiAdapter.ts | 63 | ~45 |
| index.ts | 24 | ~18 |
| README.md | 70 | ~55 |
| **total** | **709** | **≤ 640, net negative** |

Gained for it: real clefs, beams, dots, whole notes, correct spelling, size-independent engraving, honest ledger containment, Gould spacing, the loading surface, progressbar semantics, spring-weighted motion, breath of life.

## 17 · Build order

1. Unit system + METRICS + derived viewBox + ellipse heads (§2–3 heads) — everything rests on this.
2. `spell()` (§5) — 12 lines, kills the aria/glyph contradiction structurally.
3. Beat contract + rhythm table + spacing (§4) — deletes the tick axis; adapter follows (§12).
4. `glyphs.ts` extraction + anchor gates (§3).
5. Beams (§4).
6. Auto-clef + ledger containment (§6).
7. Material + token sweep (§11) — cures the backdrop paint bug by deletion.
8. Motion (§10) + progress clip (§9).
9. Loading mode (§8).
10. Tests + story + manifest + README (§14–15).

Steps 1–3 alone clear the entire banked defect register (clef geometry, ledger runaway, flats, token fallbacks land at 7; spring quality at 8). Steps 8–9 are what make it worth keeping — and what make it a loading screen.
