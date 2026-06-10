# FD-primitives — the core primitives as designed objects

Lane: FD-primitives · AY design audit · 2026-06-09
Surface: `http://localhost:5199`, the eleven primitive routes (Buttons, Card, Dialog, Select, Tabs/SegmentedTabs, Inputs, Checkbox·Radio·Switch, Slider, Badge, Tooltip, Popover), 1440×900, light + dark, driven via Playwright (system Chrome headless).
Captures: `docs/tranches/AY/audit/design/captures/FD-primitives/*.png` (65 files — 57 from this lane's first pass, 8 added by the probe pass).
Method note: the first 16 captures were judged by eye (buttons, card, checks, inputs families); mid-audit the harness hit its image-context cap, so the remaining primitives (select, slider, tabs, badge, dialog, tooltip, popover) are judged by computed-style + pixel-sampling probes — every claim below carries either a capture filename or a measured number. Probe JSON regenerable; scripts cleaned from `/tmp`.

**Verdict: DESIGN-DEFECTS** — the primitive set has a real, cohesive, NON-generic identity (one glass material across every floating surface, a warm-ink token family with zero blue-grey shadcn residue, pill geometry, real `linear()` springs, a machine-verifiable squish). It is emphatically not shadcn-with-blur. But four defects sit on headline surfaces — the gold CTA's light-mode hover paints white-on-pale-gold at **1.29:1**, the flagship buttons page ships a simulated-hover specimen that is illegible in BOTH modes and teaches the pre-W54 hover, the dark-mode modal scrim paints a luminous cream fog, and the dark destructive badge misses AA — and the glass-first default Button cannot be told from four of its sibling variants over the flat cream the demo gives it.

---

## 1. The identity, measured — why this is not generic

Five facts that no default component library produces:

- **ONE glass material on every floating surface.** Select panel, Popover, Tooltip, and Dialog all paint the identical recipe — `oklab(0.9858/0.8)` + `backdrop-filter: blur(16px) saturate(1.18)` + the white specular inset top edge (`rgba(255,255,255,.25) 0 0.5px inset`) + the same layered warm-ink shadow stack — differentiated ONLY by radius rung (tooltip 10px, select/popover 12px, dialog 16px). Dark flips to `oklab(0.216/0.88)` with the specular dimmed to 0.08. That is a material system, not a per-component style. (Probed all four, both modes.)
- **The warm-ink monochrome with sharp accents.** Every neutral is the warm stone family (`rgb(28,25,23)` ink, `rgb(249,248,247)` cream, `rgb(232,231,227)` putty) — no slate, no zinc. The accents are saturated oklch (viz-basis badges `oklch(0.579 0.201 30.4)` / `0.484 0.163 265.5` / `0.532 0.18 317.5`; the spectrum slider track is a 24px `linear-gradient` across the same three hues). Dominant field + sharp accents — the lens's color criterion, met.
- **The springs are real, not decorative.** The SegmentedTabs indicator transitions `inset` AND `scale` on a 0.3s `linear()` spring (overshoot peak 1.068 @ 16%). Mid-flight sampling: scale hits **1.042 × 0.960 at 57ms** — volume-preserving to four decimals (1.042 × 0.960 = 0.9998), under the 1.08 cap, settled by ~180ms. The W53 squish spec is what actually paints, frame by frame. The Button's `scale` leg rides a separate ζ=0.86 `linear()` spring while its color legs stay on the standard bezier — the §6 easing doctrine is live in computed styles, not just in the docs.
- **Pill geometry as signature.** Buttons, inputs, badges, switch, slider track: `border-radius: 9999px`. The input is itself GLASS (`blur(10px) saturate(1.05) brightness(1.02)` at α 0.5) — a glass text field is rare and reads as a deliberate move (`inputs-0--light.png`).
- **Focus is token-first and visible** (where it's wired — see §4 weakest): keyboard focus on a button paints the warm-ink double ring (2px @ 30% + 8px halo @ 15%), and `:focus-visible` verified true under real Tab. Inputs flip the border to full ink + a 2px putty halo (`inputs-focus--light.png`, `buttons-focusring-zoom--light.png`).

## 2. The three strongest primitives

1. **Card** (`card-0--light.png`, `card-0--dark.png`, `card-2--light.png`) — the best-demonstrated primitive in the library. The five-tier ladder is shown over a teal/yellow/pink watercolor strip so wash→overlay legibly steps in transparency in BOTH modes — the one place the storybook gives glass something to be glass against. And `surface="cartoon"` is the house signature: 2px color border + the offset-stamp shadow that re-tints under `.dark` by token construction (`card-2--dark.png`). Tier system + orthogonal decoration + polymorphic root = a designed object with a point of view.
2. **SegmentedTabs** (`tabs-segmented-rest--light.png`, `tabs-segmented-midflight--light.png`, probe) — the elastic indicator is the single best micro-interaction on the surface: glide + volume-preserving squish on one snappy spring clock, machine-verified above. ARIA-role-per-variant is real in the DOM (6 tablists, 3 groups, 12 `aria-pressed` on the page). This is the iOS-segmented register done with more wit than iOS does it.
3. **Select, as exemplar of the floating-glass family** (`select-open--light.png`, `select-open--dark.png`, `select-item-hover--light.png`) — pill glass trigger, the floating glass panel, and a solid warm-putty item-hover (`rgb(213,211,205)`, radius 10) that keeps menu items crisply legible INSIDE translucent glass — the right call (translucent-on-translucent item hovers are where glass menus usually die). Tooltip and Popover inherit the same material and are correct by construction.

Honorable mention: **Badge** — loud saturated pill register, 14px/600, light contrasts 16.78 (default) / 14.13 (secondary) / 4.7 (destructive), and the oklch viz-basis trio. One miss in dark (§4).

## 3. The defects, with numbers

| # | defect | severity | evidence |
|---|---|---|---|
| D1 | **Gold CTA hover, light mode: 1.29:1.** On hover the gold-audacious "Next →" flips text to `rgb(255,255,255)` over a sampled backplate of `rgb(240,226,188)` — pale gold, not the "saturated gold backplate" the AW.W13 contract names. White-on-near-white; the CTA label vanishes at the exact moment of intent. Dark mode is FINE (9.02:1 over `rgb(87,71,33)`) — the defect is light-only, which is why a dark-leaning dev loop misses it. `proof:affordance-contrast` is presumably green; it is not sampling painted pixels in light mode. | HIGH — a headline CTA | `buttons-gold-hover-zoom--light.png`, `buttons-hover-gold--light.png` |
| D2 | **The four-state contract specimen lies, illegibly, in both modes.** `demo/stories/display/buttons.vue:99` paints `<Button class="bg-primary/90">Hover (sim.)</Button>` — the PRE-W54 solid-primary hover slapped onto the post-W54 glass default, without the text flip that `solid` carries. Painted result: ink-on-ink 1.28:1 light, putty-on-putty 1.18:1 dark. The real default hover is `--glass-bg-resting` (α 0.3→0.65) — the spec page teaches a hover state the button no longer has, on the flagship buttons page. | HIGH (demo-side) | `buttons-1--light.png`, `buttons-1--dark.png`, probe |
| D3 | **Dark-mode modal scrim is a cream fog.** `--overlay-scrim = color-mix(var(--shadow-color) 50%)` and `--shadow-color: var(--foreground)` — correct for shadows, inverted for a scrim: in dark mode the Dialog overlay paints `srgb(0.91 0.906 0.89 / 0.5)` — a 50% near-white wash that BRIGHTENS the whole page at the modal moment. Every native dark-mode register dims; this one floods. Light mode is the classic ink scrim and reads right. Possibly a deliberate "paper fog" identity — but it fights the dark-mode contract and is a luminance jolt in a dark room. | MEDIUM-HIGH | probe (`dialog.dark.surfaces`), `dialog-open--dark.png` |
| D4 | **Dark destructive badge misses AA: 3.07:1.** `rgb(235,71,71)` plate with `rgb(232,231,227)` text at 14px/600 — not large text, fails 4.5:1. Light passes (4.7). | MEDIUM | probe (`badge.dark.variants`), `badge-0--dark.png` |
| D5 | **Slider thumb focus is near-invisible.** Rest thumb shadow: `none`; keyboard focus adds only a 4px halo at 8% alpha (`srgb(0.11 0.098 0.09 / 0.08)`). On a 16px thumb that is a ghost of a focus indicator — WCAG 2.4.7 in spirit if not in letter, and far below the button/input focus register (30% ring + 15% halo). One focus system, two calibrations. | MEDIUM | `slider-thumb-focus--light.png`, probe |
| D6 | **The glass default Button is indistinguishable from four siblings over flat cream.** default / outline / ghost / glass / glass-wash all paint near-identical white pills (`buttons-0--light.png`); in dark, near-identical charcoal pills (`buttons-0--dark.png`). The default's hover is an alpha bump (0.3→0.65) with no lift (the hover scale is opt-in `btn-interactive` — deliberate, W52). The variant axis exists in tokens and barely in retinas. This is the known W54→W60 sequencing gap — glass laid before the backdrops that make it pop — but at audit time the flagship primitive page undersells the flagship register. | MEDIUM (context, not component) | `buttons-0--light.png`, `buttons-hover-default--light.png`, hover probe |

## 4. The three weakest primitives

1. **Button, as presented** — not because the system is wrong (the variant architecture, the audacious recipes, and the easing unification are genuinely good) but because what PAINTS on its page is: five identical pills (D6), a lying and illegible hover specimen (D2), and a CTA whose hover erases its own label in light mode (D1). The strongest button moments — disco-grain, sparkle-sweep, the gold shimmer — are hover-gated and invisible at rest, so the page's first read is monochrome sameness. Also: page prose includes the all-caps mono spec-dump ("REST TEXT: VAR(--FOREGROUND)…") — internal-register text on a public surface (`buttons-0--light.png`).
2. **Checkbox · Radio · Switch** (`checks-0--light.png`, `checks-0--dark.png`, `checks-switch-toggled--light.png`) — competent, correctly token-flipped, and the least distinctive objects in the library: 16px opaque atoms that would be at home in any system. The warm-ink ON-state is the only signature. No glass, no spring moment visible at rest, page half-empty below the fold. These read as the unconverted remainder of the glass-first canon (they are not on the W54 legibility allowlist either — `avatar/label/separator/skeleton/table/badge` — so their opacity is unratified rather than blessed).
3. **Dialog** — the panel itself is the house glass at its best (16px rung, specular edge, 0.3s enter), but the primitive's full register breaks in dark via D3, and the open moment is the component's whole identity. A modal whose scrim brightens the room inverts figure-ground at the only moment that matters.

## 5. Affordance check, per interactive state

| state | Button | Input | Select | Slider | Tabs/Segmented | verdict |
|---|---|---|---|---|---|---|
| hover | α-bump + border firm (quiet but present); audacious/gold lift 1.05 | n/a | item → solid putty plate | thumb halo (dock-held only) | segment text firms; indicator owns selection | PASS except D1/D6 quietness |
| active | `scale-[var(--scale-press-btn)]` press on spring | — | item select + check glyph | drag | indicator glide+squish | PASS |
| focus-visible | ink double-ring, verified `:focus-visible` | ink border flip + 2px halo | trigger ring | **8%-alpha halo — FAIL-ish (D5)** | ring on tab | PASS except slider |
| disabled | `opacity-disabled` + cursor block | dimmed | dimmed | — | `is-disabled` | PASS |

First-glance hierarchy: on the buttons page the eye goes to the two black audacious CTAs and the gold pill — correct, those ARE the primary actions register. Elsewhere the white-card-on-cream storybook chassis gives every specimen equal weight; hierarchy inside primitive pages is carried by the (good) typography ladder alone.

## 6. Delight inventory

Present and real: the squish (the best one), the gold sweep shimmer + sparkle-sweep glyph (hover-gated), the spectrum slider's oklch ramp, the cartoon stamp-shadow hover lift, the viz-basis badge trio naming Fourier/Chebyshev/Legendre (a math in-joke that fits the house). Absent: any rest-state surprise on the core form atoms; no easter egg discoverable without hovering the right pixel. The delight budget is spent almost entirely on the audacious tier.

## 7. Recommended edits (for the wave specs)

1. **W54/affordance-contrast hardening**: extend `proof:affordance-contrast` to a painted-pixel sample of `gold-audacious` :hover in LIGHT mode (the gate passes today while 1.29:1 paints — it is asserting tokens, not pixels). Fix route: deepen the light-mode hover backplate toward `--color-gold-600+` or keep warm-ink text until the plate saturates.
2. **demo/stories/display/buttons.vue:99** — replace `class="bg-primary/90"` with the real post-W54 hover (`bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]`), or render a genuinely hovered specimen; the current pill misteaches AND fails contrast in both modes.
3. **tokens.css scrim split**: break `--overlay-scrim` off `--shadow-color`. A scrim's role is to recede — pin it to ink in both modes (or an explicit `.dark` re-resolution toward black). Clean break, no alias, per house rules.
4. **Badge dark destructive**: lift the dark plate (or drop to ink text) to clear 4.5:1 at 14px/600.
5. **Slider focus**: raise the thumb focus halo to the button register (30%/15%) — one focus system, one calibration.
6. **Checks band**: decide whether checkbox/radio/switch are IN the glass-first canon (give the switch track the wash tier + specular) or formally add them to the W54 legibility allowlist; today they are neither.

## 8. Capture index (key files)

- buttons: `buttons-{0,1}--{light,dark}.png`, `buttons-hover-{default,audacious,gold}--light.png`, `buttons-hover-gold--dark.png`, `buttons-{focus,active}--light.png`, `buttons-gold-hover-zoom--{light,dark}.png`, `buttons-focusring-zoom--{light,dark}.png`
- card: `card-{0..3}--{light,dark}.png` (0 = tier ladder over watercolor; 2 = cartoon surface)
- checks: `checks-0--{light,dark}.png`, `checks-switch-toggled--light.png`
- inputs: `inputs-{0,1}--{light,dark}.png`, `inputs-focus--light.png`
- select: `select-0--{light,dark}.png`, `select-open--{light,dark}.png`, `select-item-hover--{light,dark}.png`
- slider: `slider-{0,1}--{light,dark}.png`, `slider-thumb-focus--light.png`
- tabs: `tabs-{0,1,2}--{light,dark}.png`, `tabs-segmented-{rest,midflight}--light.png`
- badge: `badge-{0,1}--{light,dark}.png`
- dialog: `dialog-0--{light,dark}.png`, `dialog-open--{light,dark}.png`
- tooltip: `tooltip-0--{light,dark}.png`, `tooltip-open--{light,dark}.png`
- popover: `popover-0--{light,dark}.png`, `popover-open--{light,dark}.png`
