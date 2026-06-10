# RA-typography — reality audit of the type system (live demo @ :5199)

Lane: RA-typography (RealityB). Method: drove the live demo with throwaway playwright
scripts — fonts inventoried via `document.fonts` + network, ladder measured via computed
styles, contrast pixel-sampled from screenshots, fallback claim tested by BLOCKING the
woff2 and diffing geometry + pixels. All captures in this directory, `RA-typography-*.png`.

## Verdict: TRULY-SOTA (the system); minor demo-side blemishes that don't undermine it

The font-loading engineering is verifiably state of the art, the √φ scale is real and
measured, and the hierarchy reads clearly in situ, light and dark. The blemishes are
demo-page wrinkles (off-token `text-xl` story headings, mobile clipping on the typography
story) — not token/system defects.

---

## Claim 1 — the fonts ACTUALLY load (which faces?)

**VERIFIED.** Network: exactly two binaries fetch —
`plus-jakarta-sans-latin.woff2` + `fira-code-latin.woff2`. `document.fonts`:

| family | weight | display | status |
|---|---|---|---|
| Plus Jakarta Sans (latin) | 200–800 variable | optional | **loaded** |
| Plus Jakarta Sans (latin-ext) | 200–800 | optional | unloaded (unicode-range deferred — correct) |
| Fira Code (latin) | 300–700 variable | swap | **loaded** |
| Plus Jakarta Sans Fallback | — | — | 3× error (Segoe/Roboto local() probes, absent on macOS), 1× loaded (Arial arm) |

The REAL face paints, not a fallback: a 64px glyph-run width probe gives PJS 726.1px vs
the calibrated fallback 799.2px vs system-ui 756.3px — distinct; and the PJS letterforms
are visible in every capture (`RA-typography-ladder-light.png`). Body computed family is
`"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif`.

**There is NO display serif — by doctrine, not by failure.** typography.css is explicit:
"There is no display-serif voice... the default IS the register" (one brand register, PJS
text+display; Fira mono). A 12-route text-node survey (~840 visible text nodes) found
ONLY the two families — zero rogue/serif faces, zero fallback-face leaks. `.cm-serif`
ships as a consumer hook (resolves to system serif) with zero demo usage; the math-paper
composition sets math in PJS-italic + Fira mono (`RA-typography-insitu-mathpaper.png`)
and reads coherently without it. The manifest's claim ("Plus Jakarta Sans + Fira Code")
is honest.

Caveat recorded: in the blocked-woff2 arm `document.fonts.check('16px "Fira Code"')`
still returned true — Fira Code is likely system-installed on this machine. The normal-arm
network request + loaded status are the binding evidence for Fira.

## Claim 2 — golden-ratio scale (√φ)

**VERIFIED for the upper half of the ladder; lower rungs are deliberately conventional.**
Measured at 1440×1200 (`/foundations/typography`), consecutive ratios:

```
display-5 109.66 / display-4 86.11 = 1.2735   ≈ √φ
display-4  86.11 / display-3 67.78 = 1.2705
display-3  67.78 / display-2 53.28 = 1.2721
display-2  53.28 / display-1 41.89 = 1.2720
display-1  41.89 / title     32.93 = 1.2721
title      32.93 / heading   25.89 = 1.2719
heading    25.89 / subheading 20.35 = 1.2720
```

Eight rungs locked to √φ within ±0.2%. Below subheading the ladder is standard UI pixel
sizes (prose 18, body 16, small 14, caption 12, micro 11, admin 10) — these alias
Tailwind's text-lg/base/sm/xs defaults, which is pragmatic and makes utility-class
coexistence coherent BY CONSTRUCTION, but a strict reading of "golden-ratio scale" only
holds from subheading up. Leadings check out: prose 1.618 (φ), body 1.5, display 1.1.

Mobile (390px): the display clamps compress (109.7→79.4, 86.1→55.6, 67.8→43.7); the
clamp FLOORS are themselves φ-ladder values, so at the floor display-2 ALIASES title
(both 32.93px) and display-1 aliases heading — rungs collide rather than going off-scale.
Defensible, but the hierarchy flattens at the bottom of the clamp range
(`RA-typography-ladder-mobile.png`).

## Claim 3 — semantic classes, in-situ coherence (do off-scale sizes leak?)

**Near-clean.** Font-size distribution across 12 routes (buttons, card, badge, section,
inputs, select, dialog, tabs, dock, table, alert, hero), every visible text node:

| size | family | count | on-token? |
|---|---|---|---|
| 14px | PJS | 452 | yes (small) |
| 12px | Fira | 110 | yes (mono-caption/section-label) |
| 12px | PJS | 63 | yes (caption) |
| 14px | Fira | 61 | yes (mono-small) |
| 18px | PJS | 26 | yes (prose) |
| 16px | PJS | 24 | yes (body) |
| 10px | Fira | 18 | yes (admin-label) |
| 20.352px | PJS | 15 | yes (subheading) |
| 32.928px | PJS | 13 | yes (title) |
| 25.888px | PJS | 10 | yes (heading) |
| **20px** | PJS | **8** | **NO — Tailwind `text-xl`** |

The ONE leak: demo story chrome (`h2.font-display.text-xl` in alert.vue,
form-validation.vue, dialog.vue, auth-shell.vue) uses Tailwind's default 20px instead of
`text-subheading` (20.352px). Sub-pixel-visible, but the demo isn't uniformly eating its
own dogfood. The LIBRARY components are on-token — DialogTitle composes `text-subheading`
(verified live: the open dialog title measures 20.352px,
`RA-typography-insitu-dialog.png`). Only library off-token size: avatar `text-2xl` (24px)
for the lg fallback initials. Calibrated judgment: trivial.

## Claim 4 — does the hierarchy READ?

**YES — clearly.** The ladder (`RA-typography-ladder-light.png` / `-dark.png`) steps
unmistakably; √φ is a strong, perceptible interval. In situ:

- Buttons story (`RA-typography-insitu-buttons.png`): title → subheading → 14px
  descriptions → 10px mono admin labels, four distinct registers, no mush.
- Dialog (`RA-typography-insitu-dialog.png`): DialogTitle vs description vs form label —
  clean three-step inside one surface.
- Hero (`RA-typography-insitu-hero.png`): display-4 headline + red `fourier-f` italic
  ornament + 18px prose + mono eyebrow — genuinely excellent composition; the
  display/body contrast is emphatic. The hero card's own claim ("golden-ratio scale from
  11px micro to 110px hero") matches measurement (109.66px).
- Dock (`RA-typography-insitu-dock.png`) + section (`RA-typography-insitu-section.png`):
  mono captions and body copy stay distinct at density.

## Claim 5 — fallback flash / CLS (the Capsize calibration)

**VERIFIED — this is the genuinely SOTA part.** With ALL woff2 blocked (fresh context,
`route.abort()`), PJS fails (`fonts.check` false) and the calibrated Arial fallback
paints. Measured against the loaded arm:

- Every ladder row: Δy = 0.0px, Δheight = 0.0px (18/18 rows).
- Whole-viewport pixel diff (threshold 24/255, 2px sampling): **0.22%**.

`RA-typography-fallback-blocked.png` is, at a glance, indistinguishable from the loaded
capture. The ascent/descent/size-adjust overrides + `font-display: optional` genuinely
deliver the zero-CLS swap the typography.css header claims; combined with the
off-critical-path payload split (fonts.css separate from /styles) and unicode-range
subsetting (latin-ext never fetched), the font-loading stack is state of the art and
LIVE-verified, not just doc-claimed.

## Claim 6 — light + dark legibility

**VERIFIED, pixel-sampled from screenshots** (not computed-style guesses — the card bg is
an alpha oklab over paper, so I sampled the painted pixel adjacent to the text):

| register | light | dark |
|---|---|---|
| body/display fg over card | **15.92:1** | **15.56:1** |
| muted label (mono caption) | 4.94:1 | 7.44:1 |

Body text is AAA both modes; the muted mono rail clears AA even at 12px. Dark was driven
through the REAL `DarkModeToggle` component (`/display/dark-mode-toggle` — one click
flips `html.dark`, body color 28,25,23 → 232,231,227;
`RA-typography-darktoggle-after.png`) as well as class emulation for the captures.
Dark in-situ (`RA-typography-insitu-buttons-dark.png`) holds every register legibly.

## Honest demerits

1. **Demo `text-xl` off-token headings** (8 sites) — demo chrome should compose
   `text-subheading`.
2. **Typography story is not responsive-polished**: at 390px the `grid-cols-[10rem_1fr]`
   ladder keeps the 10rem label column and the display samples CLIP off the card edge
   ("Gold…", "Audac…" — `RA-typography-ladder-mobile.png`). Token behavior is correct;
   the showcase page itself degrades.
3. **The poster tiers are unexercised in the demo** — `text-hero`, `display-mega/hero/
   audacious` ship in CSS but no demo route paints them (speedtest is the consumer); the
   ladder story stops at display-5. Their live quality is unverifiable here.
4. **Clamp-floor rung collisions** at mobile (display-2 = title) — on-ladder but
   flattened.
5. "Golden-ratio scale" as a blanket claim is upper-half true; the sub-subheading rungs
   are conventional sizes (a good decision, but the docs phrase it more absolutely than
   the ladder is).

## Captures

ladder-light, ladder-dark, ladder-mobile, fallback-blocked, darktoggle-after,
insitu-{buttons, buttons-dark, card, dialog, dock, section, hero, mathpaper} — all
`RA-typography-*.png` in this directory.
