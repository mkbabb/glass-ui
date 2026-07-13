# BI.W-DRAW-IN — the `.draw-rule` register roster

The codified self-drawing arrival law (`src/styles/draw-in.css`, `@import`-ed in the
`/styles` cascade). ONE named law for a hairline / divider / underline that DRAWS
ITSELF in — `transform: scaleX(0→1)` (default) OR a `clip-path: inset()` wipe, on the
NO-OVERSHOOT arrival ease `--ease-out-expo`, at `--draw-in-duration = calc(0.52s *
var(--motion-tempo))`. Categorically **NOT a spring** — a rule drawing itself never
overshoots past full width (UF-G6, "the divider draw-in is a bit too bouncy").

The register NAMES the shared arrival law. It does NOT re-author the two hero-scale
draw MEMBERS below — each keeps its OWN recipe; they are recorded here as members (the
≥2-consumer evidence that the no-overshoot draw-in law is a real, shared register, not
a one-off).

## Register members

| member | surface | recipe home | draw mechanism | ease | overshoots? |
|--------|---------|-------------|----------------|------|-------------|
| **masthead divider** (the re-pointed ad-hoc rule) | `.story-hero-cluster::after` on a shrink header | `demo/chassis/hero/story-hero.css` | the shared `@keyframes draw-rule-in` scaleX(0→1) | `--ease-out-expo` | NO |
| **CompletionSeal** | the hero-scale earned-gold completion mark | `src/components/custom/completion-seal/` | the `--seal-draw` `stroke-dashoffset` wipe (`@property <percentage>`, tokens/property-regs.css §18) | one-shot gold draw (own recipe) | NO (a small settle overshoot on `--seal-scale`, NOT on the draw extent) |
| **HandMark** | the hand-voice draw-on mark family | `src/components/custom/handmark/` | `draw-on` — `stroke-dashoffset` (clean ink) / `clip-path` WIPE (grain) (own recipe) | the draw-on easing token (own recipe) | NO |

- **The masthead divider** is the RETIRED ad-hoc spring: at HEAD it rode a demo-local
  `@keyframes chrome-rule-strike` on `--ease-cartoon-punch` (+22% overshoot) — the
  "too bouncy" divider. It re-points onto the register's shared `draw-rule-in` keyframe
  on `--ease-out-expo` (clean break, no alias; the demo keyframe is DEFINITION-ABSENT).
  The base `::after` rule stays `scaleX(1)` — the static paint on a gap engine AND the
  PRM (reduce) end-state; the strike engages only under `prefers-reduced-motion:
  no-preference`.
- **CompletionSeal** and **HandMark** are NOT re-authored (they keep their own
  hero-scale draw recipes). They are members because they obey the SAME law — the draw
  extent (`--seal-draw` / the dashoffset) never overshoots past 100% (a stroke wipe
  cannot; the only overshoot in CompletionSeal is the settle on `--seal-scale`, the
  glyph's own transform, not the draw). They are the ≥2 real members proving the
  register is a shared arrival law, not a single-surface tweak.

## Gate

`proof:draw-in` (`scripts/proof-draw-in.mjs`, born-RED → GREEN):
- D1 — `.draw-rule` exists once, rides `--ease-out-expo`, NO `--spring-*` on the draw leg.
- D2 — compositor-only (`scaleX` / `clip-path`, never `width`/`inline-size`).
- D3 — the ad-hoc divider spring / `--ease-cartoon-punch` rule-strike is
  DEFINITION-ABSENT (re-pointed onto the register).
- D4 — ≥2 register members recorded here (the divider + CompletionSeal / HandMark).
- D5 — the register ships in `/styles` (`@import "./draw-in.css"` in index.css).
- D6 — the PRM snap arm (static `scaleX(1)` rest, animation gated under no-preference).
- Self-test bites: a synthetic spring-riding `.draw-rule`, a width-animating keyframe,
  and a re-added `--ease-cartoon-punch` divider each RED.

## π / DELTA

`docs/tranches/BI/audit/visual/W-DRAW-IN-DELTA.md` — the sheet-header divider draws in
NO-OVERSHOOT (the +22% bounce gone); the `scaleX` 0→1 frame-series arrives on the expo
deceleration without overshoot. Chrome + Safari, both modes.
