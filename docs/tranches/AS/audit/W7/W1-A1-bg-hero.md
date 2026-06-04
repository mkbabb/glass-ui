# AS.W7 · WAVE-1 · A1 — page background + hero card (D1, D13)

Diagnosis only — root cause grounded at `file:line`, plus the exact change WAVE-2
makes. No edits here. Verified live against `:5173` in both schemes.

## Cluster headline

D1 and D13 are the **same defect class** — a colored radial WASH standing in for a
card surface, tuned for light mode and never given a dark-mode treatment. In dark
mode the washes read as muddy tan/blue/grey splotches; the "cards" they back have
no readable frame. Both are **demo-surface** recipes (inline gradients in the
story SFCs), not a library primitive bug. The page chrome (`PaperBackdrop` in
`AppShell.vue`) is innocent — it is a 0.045-opacity noise texture only.

## What renders the page background — and why it is NOT the cause

- `demo/layout/AppShell.vue:60` mounts `<PaperBackdrop class="fixed inset-0 -z-10 bg-background" />`.
- `PaperBackdrop.vue:39-43` renders a single `.paper-underpaint` div.
- `.paper-underpaint` (`src/styles/paper.css:12-22`) is a 60px-tiled SVG turbulence
  texture at `opacity: var(--glass-grain-opacity)` (= **0.045** live) with
  `mix-blend-mode: multiply` → `soft-light` in dark.
- Live read on `/foundations/paper-glass`: `paper-underpaint` opacity `0.045`,
  bgColor `rgb(17,15,14)`, `html` background flat `rgb(17,15,14)`, **zero**
  radial-gradient elements in the page chrome.

So the demo PAGE background is a flat near-black plate + an almost-invisible grain.
The muddy blobs are NOT a stray aurora glow, NOT a broken paper-grain, NOT a
z-layer leak. They come from the STORY CONTENT — a self-contained pastel wash div
inside each affected story.

## D1 — muddy gradient on `/foundations/paper-glass` (the headline)

**Root cause:** `demo/stories/foundations/paper-glass.vue:135-141` — the four
glass tiles sit on an inline three-stop radial wash:

```
bg-[radial-gradient(... var(--rainbow-pastel-yellow) 55% ...),
    radial-gradient(... var(--rainbow-pastel-blue)   50% ...),
    radial-gradient(... var(--rainbow-pastel-red)    40% ...)]
```

The `--rainbow-pastel-*` tokens are **fixed light pastels in BOTH schemes** — they
are NOT `light-dark()`. Live read (light AND dark identical):
`--rainbow-pastel-yellow: hsl(50 55% 78%)`, `--rainbow-pastel-blue: hsl(220 45% 76%)`,
`--rainbow-pastel-red: hsl(0 50% 78%)`. Over the dark-mode `--background`
(`hsl(24 8% 6%)`), these high-lightness / low-saturation pastels at 40–55% mix
desaturate into dim brown/grey/dim-blue smears — the exact muddy splotch the user
screenshotted. Confirmed by the scheme A/B: in LIGHT mode the same recipe renders
a clean soft yellow/blue/red bloom behind crisp cards; in DARK mode it is muddy.
**This is a dark-mode-only defect** rooted in the wash tokens having no dark value.

Compounding: the four tier tiles use `glass-wash`/`glass-quiet` etc. (low-opacity
translucent surfaces) with a `border-[var(--glass-border-quiet)]` hairline, so in
dark mode the tiles barely separate from the muddy wash behind them — the muddy
field reads as the page background, not as an intentional backdrop.

**FixSpec (WAVE-2):** `demo/stories/foundations/paper-glass.vue:135-141`. Re-express
the wash so it darkens under `color-scheme: dark`. Two options, pick the
token-first one:
- Preferred: swap the three `--rainbow-pastel-*` color stops for the
  `light-dark()`-aware `--section-color-*` family (e.g. `--section-color-5` amber,
  `--section-color-2` indigo, `--section-color-0` rose) which already carry tuned
  dark variants (`tokens.css:1306-1310`), and drop each stop's mix to ~28–40% so
  the dark bloom stays a backdrop, not a wall. This makes the wash a single recipe
  that works in both schemes (the library house pattern).
- Alternative: keep the pastels but gate the whole wash on
  `:where(:root:not(.dark))` and add a dark-mode companion using muted
  `--section-color-*` at low alpha. Heavier; only if the light pastels must be
  preserved verbatim.
Either way the goal: the backdrop reads as an intentional, low-contrast colored
field behind clearly-framed glass tiles in BOTH schemes — not a muddy plate.

## D13 — broken/missing hero CARD on `/compositions/hero`

The hero is two stacked surfaces in `demo/stories/compositions/hero.vue`:
1. the `.hero-frame` headline panel (lines 65-172),
2. the three-claim `<Card>` (lines 174-202).

**The hero-frame is NOT missing** — it renders (border + radial gradient + content,
confirmed in the full-page capture). It READS as broken/frameless for two reasons:

**Root cause A — no solid surface + transparent-tailed wash.**
`hero.vue:71-90` sets the frame's paint to `backgroundColor: var(--background)` PLUS
three radial-gradients on `--section-color-0/2/5` at 45–55% mix, each terminating in
`transparent` at 60–65% radius:

```
radial-gradient(ellipse 70% 55% at 12% 8%,  ...--section-color-0 55%..., transparent 60%)
radial-gradient(ellipse 65% 60% at 92% 20%, ...--section-color-2 50%..., transparent 65%)
radial-gradient(ellipse 80% 70% at 55% 110%,...--section-color-5 45%..., transparent 60%)
```

Unlike the pastels, `--section-color-*` DO darken in dark mode (`light-dark()`,
`tokens.css:1306-1310`), so the bloom itself is colored-but-dim. But because all
three gradients have transparent tails and the only fill under them is the SAME
`var(--background)` as the page, the lower-right quadrant of the frame fades to bare
page background — the frame has **no continuous card surface**, so its boundary
dissolves into the page. There is no glass tier, no `--card` fill, no shadow.

**Root cause B — near-invisible border.** `hero.vue:69` sets
`border border-border/40`. Live `--border` (dark) = `hsl(24 5% 34%)`; at 40% alpha
over the dim gradient the 1px edge is effectively invisible, so the eye gets no
frame cue. The claim Card below it (`hero.vue:175-176`) uses `border-2
border-foreground/10` — also a ~10% hairline — so it too reads as a faint slab on
the muddy field rather than a discrete card.

Combined: a colored-but-dim radial bloom with a transparent tail and a ~invisible
border, sitting on the same background color as the page = "content floating on a
muddy background with no card" (the D13 report verbatim).

**FixSpec (WAVE-2):** `demo/stories/compositions/hero.vue:65-90`.
- Give the frame a real surface: replace `backgroundColor: var(--background)` with a
  glass tier or `--card` fill (e.g. `var(--card)` or `glass-resting`), so a
  continuous opaque-ish plane underlies the wash — the colored radials then layer
  OVER a readable surface and the frame no longer dissolves into the page.
- Promote the border to a visible weight: `border-border/40` → a solid
  `border-border` (or the `glass-resting`/`shadow-cartoon` card vocabulary already
  used by `<ShowcaseFrame>`), so the frame edge reads in dark mode.
- Optionally lift the radial mix from 45–55% down to ~30–40% once a solid surface
  backs it, so the bloom is decorative accent over the card rather than the card's
  only paint.
- Line 174-176 claim `<Card>`: bump `border-foreground/10` to a readable border or
  let `<Card>`'s default surface/shadow carry the frame; right now the 10% hairline
  is the same dissolve problem at lower amplitude.

The two fixes converge on one principle: **the hero frame and claim card must each
have a real, framed surface (tier fill + visible border/shadow); the colored
radials are an accent layered on top, not a substitute for the card.**

## Scheme/scroll notes (not the A1 root cause, logged for adjacent waves)

- The demo defaults dark via `useDark` (`useGlobalDark.ts`, follows
  `prefers-color-scheme` + localStorage `vueuse-color-scheme`); `.dark` sets
  `color-scheme: dark` (`tokens.css:1378`) and `useGlobalDark.ts:53` mirrors it
  inline on `<html>`. `light-dark()` resolution is correct — the muddiness is the
  token CHOICE (fixed pastels) + transparent-tail/faint-border recipe, not a broken
  scheme cascade.
- D3 (hero scroll) is a separate demo-surface defect — out of A1 scope; the page
  scroll wrapper is `main.relative.flex-1` in `AppShell.vue:68` + `StoryPage`'s
  `article.mx-auto.max-w-6xl` (`StoryPage.vue:31`). Flagged for the D3 owner.

## Classification

| Defect | Surface | File:line | Mechanism |
|--------|---------|-----------|-----------|
| D1 | DEMO | `demo/stories/foundations/paper-glass.vue:135-141` | fixed light-pastel radial wash (`--rainbow-pastel-*`, no dark value) over dark `--background` → muddy in dark mode |
| D13 | DEMO | `demo/stories/compositions/hero.vue:65-90` (+ `:174-176`) | hero-frame has no solid surface (bg = `--background`) + transparent-tailed radials + ~invisible `border-border/40` → frame dissolves into page |
