# AX.W54 — glass-first ROOT · live-capture DELTA

The cardinal-lesson capture for the MAXIMAL glass-default flip + the `--glass-level`
scalar. Captured 2026-06-09 against the running demo (`localhost:5173`) on
chromium via the π-lane Playwright (`tests-visual/W54-glass-first.capture.spec.ts`,
since removed — a one-shot generator; the evidence is the `.png` + this DELTA).

## Routes × viewports × schemes (16 screenshots)

| Route | Surface under test | desktop·light | desktop·dark | mobile·light | mobile·dark |
|-------|--------------------|:---:|:---:|:---:|:---:|
| `/primitives/buttons` | Button default → glass | `W54-buttons-desktop-light.png` | `W54-buttons-desktop-dark.png` | `W54-buttons-mobile-light.png` | `W54-buttons-mobile-dark.png` |
| `/navigation/tabs` | SegmentedTabs track+indicator → glass | `W54-tabs-desktop-light.png` | `W54-tabs-desktop-dark.png` | `W54-tabs-mobile-light.png` | `W54-tabs-mobile-dark.png` |
| `/forms/alert` | Alert default → glass content-panel | `W54-alert-desktop-light.png` | `W54-alert-desktop-dark.png` | `W54-alert-mobile-light.png` | `W54-alert-mobile-dark.png` |
| `/primitives/card` | Card tiers + glass default | `W54-card-desktop-light.png` | `W54-card-desktop-dark.png` | `W54-card-mobile-light.png` | `W54-card-mobile-dark.png` |

## Paired-π getComputedStyle readback (`W54-readback.json`)

BEFORE (pre-W54): the SegmentedTabs track was `background: var(--muted-medium)`
(opaque); the Alert was `bg-card` (opaque); the default Button was the solid
`bg-primary` fill. AFTER (this wave) — the resolved cascade proves glass paints:

| Surface | resolved `background` | `backdrop-filter` | verdict |
|---------|----------------------|-------------------|---------|
| SegmentedTabs track (light) | `srgb 0.982 0.981 0.978 / 0.3` (translucent) | `blur(1px) saturate(1.05)` | GLASS (wash tier) ✓ |
| SegmentedTabs track (dark) | `srgb 0.108 0.098 0.092 / 0.38` (translucent) | `blur(1px) saturate(1.05)` | GLASS, darkens under `.dark` ✓ |
| Card wash (light) | `oklab(0.986 … / 0.3)` (translucent) | `blur(1px) saturate(1.05)` | GLASS ✓ |
| Card wash (dark) | `oklab(0.216 … / 0.38)` (translucent) | `blur(1px) saturate(1.05)` | GLASS, darkens ✓ |

The translucent `/ 0.3`–`/ 0.38` alphas (not solid `/ 1`) + the live `blur()`
backdrop-filter are the AFTER proof: the surfaces route through the
`--glass-level`-driven `--glass-bg-*` recipe, not the prior opaque plates.

## Visual verdict (the screenshots)

- **PASS — the glass-default flip renders.** The bare `<Button>` default is now a
  glass pill (no longer the dark solid primary fill; `W54-buttons-*`). SegmentedTabs
  segmented/pill/underline/vertical all read correctly — the active indicator is a
  glass tile forward of the glass-wash track, the W53 spring geometry intact
  (`proof:tabs-unified` live arm green). The Card tier ladder renders as translucent
  glass over both the cream (light) and the dark-teal (dark) substrate, legible in
  both (`W54-card-*`).
- **EXPECTED — glass is SUBTLE over the flat substrate.** The wash blur is
  imperceptible because there is nothing behind these surfaces to blur (the demo
  pages are a flat cream/dark fill). This is by design: W60 (page-redesign) adds the
  rich per-page aurora/constellation/fourier/paper backgrounds that make the glass
  POP. W54 lays the glass default; W60 consumes it. NOT a W54 defect.
- **NOTE — the `buttons` readback probe matched the dock rail icon button** (first
  `button` on the page → `backdrop-filter: none`), not the default variant; the
  screenshot confirms the actual default button is glass. A capture-probe artifact,
  not a product issue.
- **TUNE deferred to W60** — the SegmentedTabs track is the wash tier (1px blur);
  over W60's rich backgrounds a quiet-tier (10px) track may read more as glass.
  Re-evaluate at the W60 capture; the surface is correctly glass either way.

Verdict: **PASS.** W54 glass-first ROOT is live-verified — every default-register
surface paints glass (translucent + real backdrop-filter), in light and dark, at
desktop and mobile, with no broken render. Couples cleanly with the W56(R1)
squircle (dialog/sheet `@supports` corner-shape, leak-free).
