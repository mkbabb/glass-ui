# V-THINKFIELD — probe notes (the two-texture thinking grammar + hue-sweep-as-progress)

Seat: p4:COVERAGE. Verified-model: claude-fable-5 (the system-context model ID, returned
verbatim). 2026-07-19. Built per the CHARTER §O-2 stamp `[P3-AGG 2026-07-19]`
(CRIT-COVERAGE MAJOR-2: DEFERRED-TO-PASS-4, owner PROTO-MORPH-THINK — this build redeems
the stamp) and NOVELTY-ROSTER §6 H-1 row 7 (decider: "50-60°/s monotone sweep;
texture-tells-state at a glance").

## 1. What this page is

The roster row (NOVELTY-ROSTER:172, NEW-U, DESIGN M4-3): STATE is told by TEXTURE,
PROGRESS by HUE. Two textures, two roles (`MARKS-C-APPS.md:296-353`):

1. **IDLE — the intimate halftone.** A size-graded lattice of OUR aurora motes
   (gold/ember/rose/plum anchors — the four-point star is Gemini's mark, refused) at the
   measured ~10pt pitch around the input: large/bright adjacent, dissolving to NOTHING at
   ~400px, scalloped wave boundary (never a straight fade). The lattice is V-DOTREL's kin —
   one substrate family, two textures.
2. **THINKING — the full-bleed wave field.** Laminar topographic ridge lines drifting
   slowly while the hue SWEEPS monotone at ~55°/s (the measured ~197° in 3.6s) through the
   oklch wheel — one direction, no dithering: slow enough to read as patience, fast enough
   to prove life. The send bloom raises chroma ~1.55× (the sat 0.44→0.69 class).

**The one refusal, kept refused:** Gemini FREEZES its idle field (survey diff 0.00,
MARKS-C 8.2). Our idle floor is codex law 11, CSS-only and compositor-only: the halftone
layer drifts at 48px/6.3s = 7.62px/s and breathes ±19% mass on an asymmetric 2.6s envelope
(floor 0.68 — never a dead frame) while the rAF counter stays at ZERO. The D3 lesson
binds the design: the breath rides the WHOLE layer's opacity (±19% of the painted field
mass), never a hairline — paint-visible by construction, paint-PROVEN only at QP-3.

Our language throughout: warm-cream / warm-charcoal grounds (never dead black — the
declared divergence), §3.5-A canon glass on the composer, the progress hue published as
`--tf-hue` on the COMPONENT root (MECH M5) and consumed by the DOM furniture too — the
interrupt chip's ring is `oklch(… var(--tf-hue))`, the affordance floating IN the field
(MARKS-C 8.3 note 4). The chip's press runs the law-20 envelope with the ~50ms
light-first ack. PRM: single-step state relay — texture still tells the state in one
still frame; hue relays in 30° quanta; drift/breath dead.

## 2. Node battery — 66/66 PASS at the build; **78/78 PASS (exit 0) as of `[P4-AGG 2026-07-19]`**

> **`[P4-AGG]` — the D9 + CRIT-ASSEMBLY A5/A6/minor-2/minor-4 cure batch landed at the
> agglomeration:** the think-yield (and its 420ms fade) moved to the UN-opacity-animated
> `.halftone-wrap` — a paused breath animation can no longer defeat it (D9); the chip is
> light-as-STATE via the assembly `makeHoldLight` pattern (attack on down, sustain held,
> release on up/cancel on the envelope's clock; COMMIT on UP inside, never before the
> ~50ms lead; a lost pointer never commits; PRM instant-set with zero drives); the light
> is element-scoped on the pressed control (+ send's own press light); mote lightness
> tokened (`idleMoteL`); canvas realloc only on resize; the HUD sweep cell relabeled as
> the token echo it is; the ×3 font shorthands became longhands (the dropped-declaration
> trap); +12 gates, 66 → 78. **The QP-4 yield re-run + the held-press light row are the
> lead's (D9/D12 register rows).**

`node check.mjs` extracts the `/*THINKFIELD-PHYSICS-BEGIN*/` block (the same block that
drives paint) and gates: the sweep (55°/s in [50,60], 198° over the 3.6s reference,
max backward step 0 at 60Hz AND 120Hz — dt-integrated, rate-invariant), the law-11 floor
(drift 7.619px/s, mass amplitude 0.19, floor 0.68, period 2.6s, peak at 38% — fast rise,
slow decay), the halftone laws (pitch 10, gain monotone 1→0 dead AT the 400px extent,
scallop span 26px, deterministic mulberry32 lattice of 2702 motes, every mote on a house
anchor), the two-texture descriptors (idle local + static, think full-bleed, 3 ridges),
the bloom ratio 1.545, the ink bands per arm, the law-20 envelope rows (lead 50ms, attack
t90 160ms, sustain 1.0, release t90 250ms, idle 0), PRM quanta, 19 structural asserts
(no supports-query gate, zero ambient randomness, no SVG filter, no light-dark inset, no
animated blur, no idle sheen, PRM, hud=0, component-root publication only, two canvases,
chip-consumes-hue, CSS-only drift+breath keyframes with the floor bound in, thinking
pauses idle, canon cream light, oklch throughout, PRM kills the breath), and 10 CSS↔JS
mirror locks (drift dist/dur/speed, breath dur/floor/peak-percent, hue0, §3.5-A tints
both arms, night ground R>B).

## 3. What node CANNOT prove (the honesty fence)

The PAINTED sweep rate and its monotone read on real pixels; texture-tells-state at a
glance (the roster's decider); the breath's PAINTED delta (the D3 class — computed-alive
is not alive); the drift's compositor cost; rAF park truth; the night arm's warm read in
composite (the cross-page (d) lesson: a warm fill over a cool world can read cool).
All QUEUED-PAINT below.

## 4. QUEUED-PAINT — the ledger rows (the §O-3 order-9 slot, re-opened for pass 4)

Laws standing: browser-seat singleton; WebKit material verdicts ride the VIDEO path;
`?hud=0`; frame-gap statistics only; both engines; hue read via the oklab/oklch paint-arm
parse where computed values return oklch (the live-π lesson).

| row | claim | decider |
|---|---|---|
| QP-1 texture tells state at a glance | idle = intimate local halftone around the input; thinking = full-bleed wave field; the swap is unmistakable in a blind frame pull from either phase (the roster decider, half 2) | WebKit video, blind frame pulls both phases, both engines |
| QP-2 hue-sweep-as-progress | painted field hue advances 50–60°/s MONOTONE through the wheel (sample painted pixels per second over a ≥4s think; paired-π vs the published `--tf-hue`); no backward step, no dithering; the chip's ring visibly rides the same hue | video + lossless Chromium series + computed `--tf-hue` pairs |
| QP-3 the idle floor BREATHES IN PAINT | with rAF counter at ZERO (HUD prints it): field mass oscillates on the ~2.6s envelope with range comfortably above capture noise (the D3 gate — measured painted delta, not computed opacity), and the layer drifts ~7.6px/s; the refused Gemini freeze stays refused ON PIXELS | lossless Chromium series + WebKit video (v-dotrel (b) method) |
| QP-4 the send bloom | chroma visibly blooms ~1.5× class within ~600ms of send; the idle halftone yields the stage (paused + faded) — one texture owns the stage at a time | video |
| QP-5 the affordance rides the field | the chip fades in floating IN the color (~+400ms), not boxed on a bar; press: light leads ~50ms, then the state flips; envelope sustain/release per law 20 | video luminance series |
| QP-6 cost + park | thinking window: 0 gaps >24ms class both engines (full-bleed canvas at ~55°/s is the priced surface); rAF parks at answer AND stays 0 across a ≥10s idle window while the CSS breath runs | hud=0 trace + rAF counter |
| QP-7 PRM sweep | think/answer land as single still-steps; no sweep, no breath, no drift; hue in 30° quanta | both engines |
| QP-8 the night arm warm read | night ground + field composite reads warm (R>B) on real pixels — the cross-page (d) check applied here at build time, not discovered later | paired px reads both engines |

## 5. Honesty line

This seat drove no browser (singleton honored — the pass-4 paint arm owns these rows).
Node battery run by this seat: **66/66 PASS, exit 0**, first run after authoring. The
hue-sweep's PAINTED truth and the breath's PAINTED delta are explicitly unproven here;
no adoption language may cite this row as live-verified until QP-1/QP-2/QP-3 bank.
