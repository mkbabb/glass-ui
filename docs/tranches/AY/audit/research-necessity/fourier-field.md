# Research-necessity audit — fourier-field (AY)

**Lane** fourier-field · **Verdict** REFINE-FROM-EXISTING · **Date** 2026-06-09
**Question** the W-FF2 §0 RG re-opens (RG1 trail-toward-signature-stroke, RG2 perceptual gate
metric, RG3 light-mode floor, RG4 recession parity) — does the W43 research already prescribe
these, or is a fresh oscilloscope/phosphor-rendering research pass warranted?

**Answer: NO fresh research pass.** The W43 SOTA research already prescribes every RG re-open at
the PRINCIPLE level; what remains is parameter tuning against the live π readback (the user's
stunning bar — a target no external source can supply), gate engineering on data the spec already
computes, two captures, and one code-grounded reactivity fix. A fresh oscilloscope/phosphor pass
would re-tread W43 §1.2 (the multi-pass phosphor glow register) and §2.1 (the additive-on-ink /
source-over-on-cream fork) — churn, not research.

**In-flight note.** `src/components/custom/fourier-field/*` carries today's mtimes (15:47–15:55;
the Batch-2 finisher is concurrently writing). The on-disk state read here MATCHES the B2-ff
audited as-built (blend fork `:347`, amplitude sort `:225`, bundle `:92-103`) — cites below are
against that state.

---

## 1. The corpus (what already exists)

| Artefact | Role |
|---|---|
| `docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md` | the EXECUTED SOTA research — epicycle/DFT canon (§1.1), phosphor register + multi-pass glow + persistence decay (§1.2), R1/R2 refinements (§1.3), the full 3-pass recipe + bundle table (§2), zero-alloc hoist (§3), Canvas2D-vs-WebGPU verdict (§4), sibling alignment (§5), W60 consumption (§6) |
| `docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md` | the born-RED predecessor spec (input, superseded by the rebase) |
| `docs/tranches/AY/waves/AY.W-FF1.md` + `docs/tranches/AY/audit/W-FF1-fourier-rebase.md` | the rebase + the PINNED alpha bundle + the math-leaf PROMOTE decision |
| `docs/tranches/AY/waves/AY.W-FF2.md` | the impl spec + the §0 RG1–RG6 re-grounds |
| `docs/tranches/AY/audit/hardening/H-fourier.md` | the pre-build red-team (W43-never-landed, live ≥2nd consumer, parity break, the 0.55/0.35 hedge) |
| `docs/tranches/AY/audit/hardening/b2/B2-ff.md` | the post-build red-team — the RG sources, WITH measured numbers (≈4% coverage, 0.036/0.055 light floors, 17.7%/15.9% arc fractions) |
| `src/components/custom/fourier-field/README.md` | the shipped research-backed README |
| `docs/consumer-evidence/fourier-math.md` + `docs/tranches/AY/audit/visual/W-FF2-DELTA.md` + 4 PNGs | the consumer map + the captured DELTA |

This corpus is unusually deep — TWO research/spec generations (AX.W43 + the SOTA pull-up) plus
two adversarial hardening passes with MEASURED defect arithmetic. The B2-ff lane already did the
quantitative work a "fresh research pass" would normally produce.

## 2. RG-by-RG: corpus answer vs research gap

### RG1 — thin arc → signature stroke: ALREADY PRESCRIBED (W43 §1.2 + §1.3 R2)
W43 §1.2 prescribes the phosphor register precisely: "draw each bright shape in 3 passes: a WIDE
DIM outer glow, a MID-WIDTH bloom, a SHARP BRIGHT core" (the libretro/Phaser citation). The
as-built collapsed this into per-LAYER passes — the trail BODY (Pass 1, `FourierField.vue:347-361`)
is a SINGLE `lineWidth 1.6` stroke per segment. The "make the comet read as a signature stroke"
move is therefore already in the corpus: apply the per-stroke multi-pass to the trail body (a wide
≈5–6 px low-alpha glow underlay + the sharp 1.6 px core), plus lengthen the trail. The remaining
unknowns are NUMBERS (trail length, underlay width/alpha ratio) — settled by iterating the live π
readback against the user's stunning bar, which no external oscilloscope literature can decide.

### RG2 — the gate metric: GATE ENGINEERING, data already computed
B2-ff F2 names the fix shape ("coverage-fraction OR perceptual-arc-length") and the spec's
`analyze()` ALREADY counts `painted` pixels (`tests-visual/fourier-field-visibility.spec.ts:81-104`)
— it just never asserts on it (`:135-149` assert bbox-span + bodyMean only). The coverage floor is
derivable from code arithmetic: coverage ≈ (arc-length px × effective stroke px) / panel area, with
the arc fraction = trailLength / (fps · durationMs/1000) (B2-ff computed 17.7% hero / 15.9% final;
as-built coverage ≈4%). Zero research.

### RG3 — light-mode floor: ALREADY PRESCRIBED (W43 §2.1) + measured (B2-ff F3)
W43 §2.1 already names the asymmetry ("additive over cream blows out to white… plain-alpha on
cream") — the fork EXISTS (`:347`); what is missing is a compensating LIGHT-side floor, because
cream gets no additive accumulation. B2-ff computed the failing values (final 0.45·0.08=0.036,
hero 0.55·0.10=0.055 effective alpha at `:355`). The fix is an extension of the existing fork
vocabulary: a per-mode floor (`isDark ? trailFloor : trailFloorLight ≈ 0.25–0.3`) and/or a light
stroke-weight lift, dark path untouched. The perceptibility target is house knowledge (WCAG 1.4.11
non-text 3:1 as the principled floor; the π readback ratifies). Zero research.

### RG4 — recession parity: CAPTURE WORK + one divined code fix
`StoryHero.vue:129` threads `:intensity="opacityCeiling"` (0.6 hero / 0.4 page). The owed artefact
is a capture, not knowledge. One code defect IS divinable here (below, D7): `intensityClamped` is
computed ONCE at setup (`FourierField.vue:69`) — non-reactive to a post-mount `:intensity` change,
which any dynamic recession would silently no-op against.

### RG5 — honesty notes: build/tranche mechanics (sibling re-point booked; `npm run build` for the dts), not research.

## 3. Divined refinements (no new research needed; file:line-grounded)

1. **D1 (RG1-a) — per-stroke phosphor multi-pass on the trail body.** `FourierField.vue:347-361`
   Pass 1 is a single 1.6 px stroke per segment; W43 §1.2 prescribes wide-dim-glow + sharp-core per
   bright shape. Add a wide (≈5–6 px) low-alpha-ratio underlay leg under the existing core stroke
   (one extra stroke per segment, same loop — Canvas2D budget per W43 §4.1 absorbs the 2×).
2. **D2 (RG1-b) — lengthen the trail toward the signature arc.** Arc fraction is
   `trailLength/(fps·durationMs/1000)`: hero 170f≈17.7%, final 200f≈15.9% at 60 fps
   (`FourierField.vue:111,113,127,129`; B2-ff F2 arithmetic). Lift final toward ≈⅓ of the period
   (≈420 frames at 60 fps) and tune against the tightened coverage gate (D4).
3. **D3 (RG1-c, NEW — divined from code, in no corpus doc) — the trail is FRAME-count-based, so
   the arc length is refresh-rate-dependent.** `trail.push(head); while (trail.length >
   preset.trailLength) trail.shift();` (`FourierField.vue:336-337`) prunes by FRAMES: a 120 Hz
   display halves the arc's time-window (170f = 1.42 s vs 2.83 s at 60 fps); a 30 fps throttle
   doubles it. Convert to TIME-based pruning (store `[x,y,now]`, prune by age ms; age at `:353`
   from timestamp, not index) so the RG1 signature length is deterministic across devices — and so
   the D4 coverage floor is assertable on any runner.
4. **D4 (RG2) — assert coverage-fraction in the visibility gate.** `analyze()` already returns
   `painted` (`tests-visual/fourier-field-visibility.spec.ts:81-104`); add
   `COVERAGE_MIN ≤ painted/(w·h)` per preset (as-built ≈4% per B2-ff F1 — pin the floor to bind the
   D1/D2 lift, e.g. born-RED at the current build), alongside the kept bbox-span assert (`:135-143`).
5. **D5 (RG3) — light-mode survival floor.** `:355` `Math.max(a, peak * preset.trailFloor)` with
   floors 0.10/0.08 → 0.055/0.036 effective on cream (B2-ff F3). Fork the floor per mode (a
   `trailFloorLight` bundle field or an `isDark` ternary at the floor site) and/or lift the light
   `lineWidth`; dark additive path untouched. Ratify with the existing both-modes π spec (`:121`).
6. **D6 (RG4) — the recessed-intensity hero capture.** Capture the `auth-shell` StoryHero
   (`StoryHero.vue:124-130`, intensity 0.6/0.4) at ≥2 viewports × {light,dark}; couples to D5 (the
   light floor fails first under recession — 0.45·0.08·0.4 = 0.0144 per B2-ff F4).
7. **D7 (NEW — divined from code) — `intensityClamped` is non-reactive.** `FourierField.vue:69`
   computes the clamp ONCE at setup from the destructured prop; a post-mount `:intensity` change
   never repaints (same mount-only class: `activePreset` `:173`, the spectrum `:214-215`). Make the
   clamp a `computed` read inside `render()` — load-bearing for any animated/dynamic recession and
   for an intensity-sweep gate clause.
8. **D8 — README overstatement fix.** `README.md:70-71` "the body survives" is perceptually
   dark-only (B2-ff F3); add the light-mode caveat (or land D5 and keep the claim true).
9. **D9 (RG5c) — run a full `npm run build`** to confirm `dist/fourier-{field,math}.d.ts` emit
   (B2-ff F7); mechanics, not research.

## 4. Genuine research gaps

**None warranted.** The candidates examined and rejected:
- *Phosphor decay physics (P31 exponential persistence)* — W43 §1.2 already settled the model
  ("a SOFT exponent, not a hard quadratic"); fetching CRT decay constants would not change the
  brand-tuned `trailFadeExp` (1.4/1.5), which the live readback owns.
- *A perceptual "stroke fullness" metric* — RG2's own text names two adequate metrics
  (coverage-fraction, arc-length); the spec already computes the data. Gate engineering.
- *Minimum-perceptible alpha on cream* — house knowledge (WCAG 1.4.11 non-text 3:1) + the π
  contrast readback; B2-ff already measured the failing values.
The render-path question (Canvas2D vs WebGPU) stays SETTLED per W43 §4 (two orders of magnitude
below the crossover); the math-leaf question stays DECIDED per W-FF1 §4 (PROMOTE, sibling re-point
booked).

## 5. README vs as-built

**ACCURATE** — the bundle table (`README.md:51-58`) matches `PRESETS` (`FourierField.vue:106-139`)
field-for-field; the 3-pass recipe, the `lighter`/`source-over` fork rationale, the `[0,2]` clamp,
the props table, the DC-suppression-free note, and the `/fourier-math` pointer all match the
shipped source. ONE overstatement: "the body survives" (`README.md:70-71`) is perceptually
dark-mode-only at the shipped light floors (D8).

## 6. Verdict

**REFINE-FROM-EXISTING.** The W43 research + the two hardening passes constitute a complete,
quantified prescription for every RG re-open; the residual work is tuning-by-live-readback (RG1),
gate-tightening on already-computed data (RG2), a floor fork the research's own blend-asymmetry
analysis implies (RG3), two captures (RG4), and the D3/D7 code fixes divined here. A fresh
oscilloscope/phosphor research pass would re-tread §1.2/§2.1 — churn.
