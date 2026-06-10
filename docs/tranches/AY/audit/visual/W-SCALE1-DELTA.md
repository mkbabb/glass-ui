# AY.W-SCALE1 — DELTA: the desktop-fluid BODY/CONTROL type ladder

**Wave:** W-SCALE1 — extend the body/control `--type-*` register to a desktop-fluid
`clamp()` base so the control/body font grows GENTLY with the viewport (the desktop
half of corpus #4 — "font too small on a big display").

**Gate:** `tests-visual/desktop-fluid-type.spec.ts` (π readback) + `proof:ui-scale`
(source-structure, stays GREEN) + `proof:live-verified-ledger` (this DELTA).

---

## The source extension (E1 + E2)

`src/styles/typography.css` — the four BODY/CONTROL rungs gain a GENTLE fluid clamp;
the `<min>` is each rung's prior fixed rem (byte-identical at narrow), the `<max>`
grows it on a wide display, the vw slope is the body register's gentle slope:

```
--type-caption:  clamp(0.75rem,  0.71rem + 0.21vw, 1rem);     /* 12px floor → 16px cap */
--type-small:    clamp(0.875rem, 0.8rem  + 0.25vw, 1.25rem);  /* 14px floor → 20px cap  (--control-text source) */
--type-body:     clamp(1rem,     0.92rem + 0.27vw, 1.375rem); /* 16px floor → 22px cap */
--type-prose:    clamp(1.125rem, 1.04rem + 0.28vw, 1.5rem);   /* 18px floor → 24px cap */
```

LEFT FIXED (the φ-display exclusion + the sub-control micro): `--type-admin-label`
(10px), `--type-micro` (11px), and the entire φ ladder `--type-subheading` /
`--type-heading` / `--type-title` / `--type-display-*`.

`src/styles/tokens.css:1226-1227` — the `--control-text` / `--control-text-sm` calc
stays byte-identical (`calc(var(--type-small) * var(--ui-scale))`). The no-double-vw
reconcile is recorded as a comment at the `--control-text` header block: the vw fluid
term lives ONCE in the rung (typography.css), the `--ui-scale` comfort scalar
multiplies it ONCE here — under the coarse 1.5× the font grows by the comfort factor
once, NOT vw×1.5 over-scaled.

---

## The measured runtime DELTA (the cardinal evidence — paired π)

π readback over the LIVE demo `foundations/typography` scene, `document.fonts.ready`
awaited, `getComputedStyle` resolved `--type-small` / `body` fontSize at two viewports
on the same page load:

| viewport | `--type-small` | `body` | note |
|---|---|---|---|
| **narrow (375×812)** | **14.00px** | **16.00px** | the clamp `<min>` floor — byte-identical to the prior fixed-rem (no narrow reflow) |
| **wide (2560×1440)** | **19.20px** | **21.63px** | grows MEASURABLY past the prior fixed-rem baseline (the 27" "too small" fix) |
| **grew Δ** | **+5.20px** | **+5.63px** | clear margin, not float noise |
| **negative control** (fixed-rem pin at 2560) | **14.00px** | **16.00px** | the gate BITES — `:root { --type-small: 0.875rem; --type-body: 1rem }` re-pins the flat baseline, proving the gate reds on exactly the un-fixed class HEAD shipped |

Asserts (all GREEN):
- `wide.typeSmall (19.2) > narrow.typeSmall (14) + 1` ✓ — the clamp GROWS (not a degenerate max==min)
- `wide.typeSmall (19.2) > 14` ✓ — past the fixed-rem control baseline
- `wide.body (21.63) > 16` ✓ — past the fixed-rem body baseline
- `narrow.typeSmall (14) ≤ 14.6` ✓ — the `<min>` holds the byte-identical floor
- negative control: pinned read resolves the flat 14px/16px ✓ — the gate bites

## No-double-vw (the coarse reconcile)

The vw fluid term lives ONCE in the `--type-*` rung; `--control-text` multiplies it by
`--ui-scale` ONCE (tokens.css). Under coarse (`--ui-scale → 1.5`) the control font is
`clamp-at-wide × 1.5`, NOT `clamp-at-wide × 1.5 × extra-vw`. Structurally locked by
`proof:ui-scale` `control-text-derives-scale` (the exact-form check, GREEN) +
`display-ladder-untouched` (no `--ui-scale` leak into any φ rung, GREEN).

## Captured PNGs (own-surface, ≥2-viewport × {light,dark})

- `W-SCALE1-typography-desktop-light.png` — wide 2560-viewport, light (the grown control/body register)
- `W-SCALE1-typography-desktop-dark.png` — wide 2560-viewport, dark
- `W-SCALE1-typography-mobile-light.png` — real 390-width mobile, light (the byte-identical floor)
- `W-SCALE1-typography-mobile-dark.png` — real 390-width mobile, dark

## Gate verdicts

- `tests-visual/desktop-fluid-type.spec.ts` — 1 passed (the font-grew DELTA + negative control bite)
- `npm run proof:ui-scale` — GREEN (all checks pass; the φ-guard + control-text-derives-scale unchanged)
- `npm run proof:live-verified-ledger` — GREEN over the W-SCALE1 row (own-surface {light,dark} PNG set on disk)
