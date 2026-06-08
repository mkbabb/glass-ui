# Orchestrator live MCP investigation (chrome-devtools-mcp, localhost:5173)

Real-device ground truth for the liquid-glass / glass-leverage development (D19 + the
"not leveraged by cards/buttons" escalation). Captured via `evaluate_script` getComputedStyle
readbacks at HEAD 002bda5/3.8.0.

## Glass tiers + Card — glassy, but subtle

- `.glass-{wash,quiet,resting,floating,overlay}` + `.glass-card`: `background: none`,
  `backdrop-filter: blur(10-24px) saturate(1.05-1.5)` (real liquid glass), inset white rim
  (`--glass-edge-light` 10%) + drop shadows. The `::before` specular catch-light is
  `opacity: 0` at REST (`--glass-specular-intensity-rest: 0`). **Clean — no bloom.**
- `/primitives/card`: **16/16 cards render glassy** (backdrop-filter present). So `<Card>`
  DOES leverage the material. The gap is CHARACTER, not presence — it reads as a plain dark
  card, not visibly "liquid glass" (no edge refraction, the rest specular is invisible).

## Buttons — mostly NOT glassy + hover not smooth (the user's point, confirmed)

- `/primitives/buttons`: **only 8/53 buttons are glassy** — solely the `glass`/`glass-wash`
  variants, and even those are `blur(1px)` (negligible). The **default / destructive /
  outline / secondary / accent / ghost / ai variants are all opaque** (`backdrop-filter: none`).
- **Button hover is instant**: every button transitions ONLY `scale` (the press spring,
  `linear()` ~0.2s) — the hover bg/border/color changes carry NO transition, so the hover
  state snaps. This is the "button hover not smooth enough" (D19).

## The egregious central bloom is NOT the glass tiers

- `--glass-curvature-overlay` = `radial-gradient(ellipse at 50% -20%, hsl(0 0% 100% / 0.06), transparent 60%)` — 6%, TOP-anchored, subtle.
- `--glass-spine-vignette` = `radial-gradient(ellipse at 50% 0%, color-mix(... ~0.6% ...), transparent 60%)` — TOP-anchored, ~0.6%, negligible.
- The speedtest-card bloom is CENTER-anchored + strong → it is NOT these tokens. It is a
  center-anchored radial on the InstrumentChassis dial-region / the speedtest gauge surface
  (D11/D12) — confirm at source in the diagnosis lane.

## Development implications (feeds W52 + the leverage wave)

1. **Glass character, not just presence** — make the liquid-glass identity VISIBLE on the
   real components: a crisp specular edge/refraction rim, a livelier (but subtle) rest sheen,
   the warm-cream tint biting — the modern liquid-glass look, Safari-compatible. The cards
   have the blur; they need the character.
2. **Button glass leverage** — the glassmorphic identity should reach the button family
   (at least raise the glass variants' `blur(1px)` to a real glass blur; decide whether the
   default button gains a subtle glass substrate). The user: "not leveraged ... in buttons."
3. **Smooth button hover** — add a token-resolved transition (`--duration-*` + `--ease-*`)
   on the hover bg/border/color (GPU-friendly), not just `scale`.
4. **Kill the central radial bloom** — the chassis/gauge center radial (D11/D12), not the
   clean glass tiers.
5. **Fix the broken glass-material demo** (D8/W48) — it showcases the tiers but is not
   wired to the real moving-specular seam.

Verification of all the above is the orchestrator's, via chrome-devtools-mcp (screenshot +
getComputedStyle + emulate for mobile) — the cardinal-lesson live truth.
