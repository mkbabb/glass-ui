# BI.W-DRAW-IN — the codified draw-in register (`.draw-rule`, no-overshoot)

Band B7 (motion register). Design: D-MOTION PASS-1 §2.4 (the draw-in register) + §4 G8 (locate the bouncy
divider) + SUFFUSION-MAP R21 (`.draw-rule` `--ease-out-expo` NO overshoot).

## §Mandate

Discharges: **UF-G6** ("We should plan to have refined drawing animations—and codify this to not be adhoc …
The draw in animation for the dividing line in the header is a bit too bouncy. Needs smoothing." — /containers/
sheet + every draw-in). SUFFUSION-MAP R21 (the chrome-rule-strike on `--ease-cartoon-punch` +22% overshoot; the
ad-hoc divider springs).

## §Design

Decided (PASS-1 §2.4):

- **`.draw-rule` / `[data-draw-in]` — the codified self-drawing register (NEW `src/styles/draw-in.css`).** A
  hairline / divider / underline draws in via `transform: scaleX(0→1)` (`transform-origin: left/start`) OR a
  `clip-path: inset()` wipe, on the NO-OVERSHOOT arrival ease `--ease-out-expo` (REUSED from the §6 table, never
  re-minted — a duplicate alias reds `proof:animation-coherence`), at `--draw-in-duration: calc(<base> *
  var(--motion-tempo))`.
- **THE LAW:** a rule drawing ITSELF never overshoots past full width — draw-in is a SPATIAL channel on the
  expo arrival, categorically **NOT a spring**. This is the "sheet header divider too bouncy" fix: the offending
  rule currently rides a spring / `--ease-cartoon-punch` (+22% overshoot); it re-points onto `.draw-rule`.
- **Compositor-only** (`scaleX`/`clip-path`, never `width` — `proof:no-layout-animation` holds by
  construction). **PRM:** keep opacity, snap `scaleX→1` (zero motion frames).
- **It NAMES the shared arrival law; it does NOT re-author** `CompletionSeal`'s gold-draw or `HandMark`'s
  draw-on — those keep their own recipes and are recorded as register MEMBERS (the ≥2-consumer evidence for the
  register).
- **The sheet-divider rebind (G8).** The library `SheetHeader.vue` carries NO divider (verified — a plain
  `flex flex-col`), so the bouncy divider is the Sheet `top`-variant `border-b` + `slide-in-from-top` recipe
  (`sheet/index.ts:37`) OR a demo/consumer rule. Locate the actual bouncy surface + re-point onto `.draw-rule`.

## §Work

- NEW `src/styles/draw-in.css` (`.draw-rule` / `[data-draw-in]` — the scaleX/clip-path wipe on `--ease-out-
  expo` at `--draw-in-duration`, the PRM snap arm). `@import` in the styles cascade.
- Locate + rebind the bouncy divider: audit `src/styles/` for a `--ease-cartoon-punch` rule-strike + the Sheet
  `top`-variant `border-b` slide (`sheet/index.ts:37`) + the demo sheet body → re-point onto `.draw-rule`.
- Record `CompletionSeal` + `HandMark` draw recipes as `.draw-rule` register MEMBERS (docs, not re-authored).

## §Acceptance

Gate: **`proof:draw-in`** (NEW, born-RED) — (1) `.draw-rule` exists once, rides `--ease-out-expo` with NO
`--spring-*` token on the draw; (2) compositor-only (`scaleX`/`clip-path`, never `width`); (3) the ad-hoc
divider spring / `--ease-cartoon-punch` rule-strike is DEFINITION-ABSENT (re-pointed); (4) ≥2 register members
recorded (the divider + `CompletionSeal`/`HandMark`).
- **BORN-RED at HEAD**: the bouncy divider rides a spring / `--ease-cartoon-punch` (+22% overshoot).
- Self-test bite: a synthetic spring-riding `.draw-rule` (a `--spring-*` token on the draw leg) REDs.

## §π/DELTA

**The sheet header divider draws in NO-OVERSHOOT** (the +22% bounce gone — UF-G6); a draw-in frame-series
(`scaleX` 0→1 arriving without overshoot, the expo deceleration). Chrome + Safari, both modes. DELTA:
`W-DRAW-IN-DELTA.md`.

## §Obligations

- Locate the EXACT bouncy divider surface (G8) — the pass-4 P3 slate item. If it is the Sheet `top`-variant
  slide-in, re-scope the divider draw off the panel slide; if demo-side, the demo re-points onto `.draw-rule`.

## §Dispositions

- Draw-in: **CODIFIED** (`.draw-rule`, the ONE named arrival law) — the "ad-hoc, not codified" defect (UF-G6)
  closed.
- The ad-hoc divider spring / `--ease-cartoon-punch` rule-strike: **RETIRED** (clean break, re-pointed).
- `CompletionSeal` / `HandMark`: recorded as register MEMBERS (NOT re-authored — they keep their own recipes).
