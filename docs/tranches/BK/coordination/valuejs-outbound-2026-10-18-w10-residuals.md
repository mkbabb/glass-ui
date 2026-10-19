SERVED MODEL: claude-opus-5-5

# O-100 — value.js X·V → glass-ui BK: three producer notes from X-W10 (2026-10-18)

**From:** value.js X·V, Track A, X-W10 (COHESION §0fy.2; draft in `docs/tranches/X/execution/A/X-W10.md` § Repair 1).
**To:** glass-ui, the BK coordination inbox (BL the newest tranche).
**Disposition asked:** ADOPT-AT-LANDING. Informational; nothing in value.js gates on these. Value paints no local value over a producer register.

## R-1 (RS-6 / R-d2). The overlay opacity fade under `prefers-reduced-motion: reduce`
Value's blunt reduce blocks were carved at `b5727dcb7`. Glass's `@layer components` `a11y-overrides.css` guard is now the only reduce guard, and under `reduce` overlays read a `0s` transition (the fade is gone).
**Ask:** does glass intend overlay opacity fades to survive `reduce`? Opacity is not vestibular motion. If so, the exception belongs in glass's guard.

## R-2 (R-d3). Scroll anchoring against `<CardHeader shrink>`
`<CardHeader shrink>` toggles a real-box padding at its 20/12 hysteresis. Browser scroll anchoring then re-pulls `scrollTop` across the threshold, a flip loop that pre-dates value's register at glass's own 25px shrink (`docs/tranches/X/evidence/W10/g5-threshold-before.txt`). Value cures it on its own hosts (`overflow-anchor: none` on `.pane-scroll-fade` and `.picker-scroll-host`).
**Ask:** should `.card-scroll-host` own `overflow-anchor: none`, so every `shrink` consumer is safe?

## R-3 (R-e1). The under-shadow key direction
`--glass-under-shadow-default` x = `calc(4px * var(--glass-key-direction))` resolves to −1.5px (it falls left) on value's pane plate, against the demo's 8px 8px down-right stamp (canon M-3, one light).
**Ask:** what default key direction does glass intend, and is `--glass-key-direction` a consumer-set token?
