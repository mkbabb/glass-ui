# BI.W-TEMPO — the `--motion-tempo` axis + the N6 `data-motion` reduced/off WIRE

Band B7 (motion register). Follows W-SPRING-PARITY (the `-settle`/reader split composes on the parity fix) and
W-REGISTER-TABLE (adds the `data-motion` reduced/off arms to the `.glass-reveal` recipe). Design: D-MOTION
PASS-1 §2.3 (the tempo mechanism, C verbatim) + PASS-4B proto (N6 CLOSED = WIRE) + MOTION-LADDER M11
(seed = 1.0) + SUFFUSION-MAP R3.

## §Mandate

Discharges: **N6** (the `data-motion=reduced/off` wire-vs-retire disposition → **WIRE**), **M11** (the global
tempo axis, seed 1.0 identity). Serves the **"options for longer" clause of UF-G1** (the row is owned by
W-REGISTER-TABLE; the tempo axis is its mechanism). SUFFUSION-MAP R3 (the dead `data-motion="reduced"` — wired,
not excised).

## §Design

Decided (PASS-1 §2.3 + N6 WIRE):

- **`--motion-tempo` — ONE registered inheriting scalar (the ONE application point).** Register in
  `property-regs.css` as `@property { syntax: "<number>"; inherits: true; }` — the byte-for-byte `--ui-scale`/
  `--motion-weight` idiom. Seed **1.0 (identity)** — MOTION-LADDER M11/G3 answered by measurement: iOS is
  SLOWER-arriving than our painted enters and FASTER than our exits, so a global 0.88 tighten pushes the enters
  FURTHER from the reference; the "tighter" feel comes from W-SPRING-PARITY (M1) + the exit tighten (M6) + the
  register table, NOT a global scale. (User-judgment batch item (c) 1.0 vs 0.88 recorded; user may veto.)
- **The regen `-settle`/reader split (zero consumer edits).** `regen-spring-tokens.mjs` emits the raw analytic
  settle under a RENAMED internal token `--spring-<name>-settle`, plus a generated reader block that KEEPS the
  public name: `--spring-<name>-duration: calc(var(--spring-<name>-settle) * var(--motion-tempo));`. All ~30
  consumer sites + the aliases (`--tab-indicator-duration`, `--dock-motion-resize`) inherit tempo with ZERO
  edits — NOT a clean-break rename (the public name is preserved as the reader; `-settle` is internal).
- **CSS↔JS parity (the P7 one-clock law).** A shared `motionTempo(el?)` reader (~10 lines,
  `src/composables/motion/motionTempo.ts`, cached `getComputedStyle` — the `--motion-weight` site-local
  getter seam) multiplied `response *= tempo` at spring construction in `useSpring` / `useSpringPress` /
  `useDockOrientationMorph` / `useDrawerSnap`. `duration ∝ response` (ωₙ = 2π/response) so scaling the CSS clock
  by tempo ≡ scaling response by tempo — proportionality by construction; the M1 parity (CSS==JS at tempo 1)
  therefore holds at ANY tempo (G2).
- **Deliberate-weight carve.** The loud iOS-27 surfaces (dock morph, drawer, deck) re-pin `--motion-tempo: 1`
  on their scope — the existing `.liquid-stage { --motion-weight: 1 }` carve pattern reused, so the utility UI
  tightens while the BD.W-ANIM-IOS27-TUNE weight holds where deliberately landed.
- **N6 = WIRE (decided; supersedes the SUFFUSION-MAP M4 "excise" note).** `useMotionAxis` already EMITS
  `data-motion="reduced"/"off"` from DialogContent + SheetContent (6 emitters), but 0 CSS consumers exist — a
  DEAD WIRE the NO-MASKING-FALLBACK edict forbids. WIRE it (do not excise — the emitters are a shipped feature):
  widen `reveal.css:210`'s `@media(reduce)` arm to also match `.glass-reveal[data-motion="reduced"]`
  (scale→0.97, blur→0) + add a `.glass-reveal[data-motion="off"]` fade-only arm. ≥2 consumers (Dialog + Sheet),
  met. (The `data-motion` reduction axis is DISJOINT from W-REGISTER-TABLE's `data-reveal` register axis — two
  attributes, two concerns.)
- **NAMING FENCE:** `--motion-tempo` (TIME) ⟂ `--motion-weight` (MAGNITUDE, default 0.618) ⟂ `--ui-scale`
  (GEOMETRY) — three registered inheriting scalars, NEVER folded. PRM: tempo × ~0.01 ms is still ~0 — the
  universal carve + JS `respectReducedMotion` win at every tempo (no interaction).

## §Work

- `src/styles/tokens/property-regs.css` — register `--motion-tempo` (`<number>`, inherits:true).
- `scripts/regen-spring-tokens.mjs` — emit `--spring-<name>-settle` + the `-duration` reader block.
- `src/styles/tokens/scheme-spring.css:121-127` — the generated `-settle` + reader blocks (replaces the flat
  `-duration` values).
- NEW `src/composables/motion/motionTempo.ts` (~10 lines); wire `response *= tempo` into `useSpring` /
  `useSpringPress` / `useDockOrientationMorph` / `src/components/ui/drawer/composables/useDrawerSnap.ts`.
- `src/styles/glass/reveal.css:210` — the `data-motion="reduced"` + `data-motion="off"` arms.
- The loud-scope `--motion-tempo: 1` re-pins (dock morph / drawer / deck scopes).
- NEW `demo/stories/motion/tempo.vue` — a live 0.7→1.3 slider over dropdown + popover + dialog + JS dock morph.

## §Acceptance

Gate: **`proof:motion-one-clock`** (NEW, born-RED) — a CSS dropdown and a JS dock morph co-scale in proportion
at tempo 0.85 and 1.2 (CSS_t90/JS_t90 ratio ≈ 1 at both). PLUS:
- **`proof:no-masking-fallback`** — the N6 wire: `data-motion="reduced"/"off"` has ≥1 LIVE CSS consumer on disk
  (a dead wire is a masking crime → the wire discharges it). BORN-RED at HEAD (6 emitters, 0 CSS consumers).
- **`proof:spring-tokens-synced`** stays GREEN with ZERO consumer diffs (the reader keeps the `-duration` name
  — the G4 round-trip). Self-test bites: a synthetic tempo-write that DOESN'T reach a JS spring reds
  `motion-one-clock`; the reduced/off arms absent reds `no-masking-fallback`.

## §π/DELTA

**The `/motion/tempo` route** at 0.85 / 1.0 / 1.2 — dropdown + popover + dialog + JS dock morph co-scale in
PROPORTION (G2, the CSS↔JS coherence proof); the `data-motion="reduced"` arm (scale 0.97, blur 0) and `="off"`
arm (fade-only) paint. Chrome + Safari, both modes. DELTA: `W-TEMPO-DELTA.md`.

## §Obligations

- G2 CSS↔JS co-scale capture (the `motion-one-clock` visual proof).
- User-judgment batch item (c): tempo seed 1.0 vs 0.88 — seed 1.0 recorded; user may veto at the return.

## §Dispositions

- **N6: DECIDED WIRE** (terminal) — the `data-motion` reduced/off arms wired, NOT excised (the NO-MASKING-
  FALLBACK floor + the ≥2 shipped emitters). Supersedes the SUFFUSION-MAP M4 "excise" reading.
- Tempo seed: **1.0 identity** (the shape problem is fixed by M1 + M6, not a scalar).
- `--motion-tempo` ⟂ `--motion-weight` ⟂ `--ui-scale` fence recorded.
