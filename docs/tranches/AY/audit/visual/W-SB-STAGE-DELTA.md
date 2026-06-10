# W-SB-STAGE — substrate STAGING: the read-through seam + the FD §6 map — DELTA

**Wave:** AY.W-SB-STAGE · **Status:** live-verified · **Verdict:** PASS (G-MAP / G-RESTRAINT / G-READTHROUGH / G-DELTA / G-NOREG).

The storybook's headline promise — glass cards over live substrates, occasional
and befitting — made TRUE on the retina. The StoryHero read-through seam (a
thinner glass rung over a live substrate + an exposed margin) lands ONCE on the
chassis; every declared placement inherits it. The FD §6 occasional-usage map is
realized — the four substrate pages over their OWN substrate, paper-glass over an
in-region colour field, dock/overview + dock/rail over an in-frame aurora wash,
empty-states/motion/carousel at whisper intensity — while forms/feedback/
containers stay quiet (restraint preserved). Viewports: **390×844 (REAL mobile)**
+ 1280×800. Schemes: {light, dark}. Device: Chrome-headless-new (ANGLE→SwiftShader
for the Canvas2D substrates; the aurora WebGL arm rides the source-witness gate,
the SwiftShader headless renderer wedges on the aurora page per the capture
protocol), against the live demo on `:5199`.

---

## G-MAP — the FD §6 occasional-usage map REALIZED

`proof:substrate-staging` GREEN — **123 manifest rows, 16 declared backdrops**,
`StoryBackgroundKind` carries `blob`, `StoryHero.vue` has the blob branch + the
read-through tier seam (`liveBackdrop` + `cardTier`), 0 quiet-category violators.
The FD §6 self-demonstration rows verified: `substrates/{aurora,blob,
constellation,fourier-field}` declare their OWN substrate + `hero:true`;
`compositions/empty-states` declares `blob`; `foundations/motion` + `motion/
springs` declare `constellation`; `navigation/carousel` declares `aurora`;
`compositions/auth-shell` un-orphans the `purple-tomato` aurora onto the brand
panel.

## G-READTHROUGH — the substrate is PAINTED + PERCEIVABLE behind the card

The §2.1a thinner-rung + §2.1b exposed-margin seam, π-read on each
declared-live-backdrop page (1280-desktop, born-RED at HEAD: 0×0 exposed margin +
0.8α erasure):

| page | host block-size (was 0 / 300×150 default) | card tier (was floating 0.8α) | exposed margin (was 0×0) |
|---|---|---|---|
| `substrates/constellation` | **4609px** | `--hero,--live` → `quiet` 0.5α | **40px** |
| `substrates/blob` | **1134px** | `--hero,--live` → `quiet` 0.5α | **40px** |
| `substrates/fourier-field` | **1934px** | `--hero,--live` → `quiet` 0.5α | **40px** |
| `compositions/hero` | **979px** | `--hero,--live` → `quiet` 0.5α | **40px** |
| `compositions/empty-states` | **1134px** | `--page,--live` → `wash` 0.3α | **32px** |

(i) the substrate host is SIZED (non-zero block-size, not the 300×150 default);
(ii) the card rides a THINNER rung over it (`quiet`/`wash`, not the 0.8α
`floating`) AND the substrate RIMS it in the exposed margin (40px hero / 32px
page); (iii) the W55 `--glass-backdrop: light` bucket is set on the card region
over the bright live substrate so the thinned plate's prose stays AA. Bite:
restore `tier="floating"` + the 100%-fill card → the read-through collapses.

## G-RESTRAINT — the quiet pages STAY quiet

`proof:substrate-staging` asserts NO `forms/*` / `feedback/*` / `containers/*`
manifest row declares a `background` — **0 quiet-category violators**. The §1.4
map is the EXHAUSTIVE placement set; over-staging is the inverse defect.

## G-NOREG — no default-path regression

The staging tier + inset apply ONLY when a LIVE substrate is declared; grid /
paper / none pages stay byte-identical to HEAD (the `cardTier` returns
`floating`/`resting` off a live backdrop). `proof:no-orphan-demo-route` (123
rows ↔ 123 files) + `proof:story-language` (0 meta hits) stay GREEN — the
`background` adds + the blob union don't break the route↔row equality.

## G-DELTA — the own-surface captured contact set

20 PNG, honest dimensions, each substrate PERCEIVABLE behind glass:

- `W-SB-STAGE-blob-mobile390-light.png` (390×844), `W-SB-STAGE-blob-mobile390-dark.png` (390×844)
- `W-SB-STAGE-blob-desktop1280-light.png` (1280×800), `W-SB-STAGE-blob-desktop1280-dark.png` (1280×800)
- `W-SB-STAGE-constellation-mobile390-light.png` (390×844), `W-SB-STAGE-constellation-mobile390-dark.png` (390×844)
- `W-SB-STAGE-constellation-desktop1280-light.png` (1280×800), `W-SB-STAGE-constellation-desktop1280-dark.png` (1280×800)
- `W-SB-STAGE-fourier-field-mobile390-light.png` (390×844), `W-SB-STAGE-fourier-field-mobile390-dark.png` (390×844)
- `W-SB-STAGE-fourier-field-desktop1280-light.png` (1280×800), `W-SB-STAGE-fourier-field-desktop1280-dark.png` (1280×800)
- `W-SB-STAGE-hero-mobile390-light.png` (390×844), `W-SB-STAGE-hero-mobile390-dark.png` (390×844)
- `W-SB-STAGE-hero-desktop1280-light.png` (1280×800), `W-SB-STAGE-hero-desktop1280-dark.png` (1280×800)
- `W-SB-STAGE-empty-states-mobile390-light.png` (390×844), `W-SB-STAGE-empty-states-mobile390-dark.png` (390×844)
- `W-SB-STAGE-empty-states-desktop1280-light.png` (1280×800), `W-SB-STAGE-empty-states-desktop1280-dark.png` (1280×800)

> **Aurora arm note (headless limitation, not a defect).** The
> `substrates/aurora` page's WebGL field does not paint a non-blank readback on
> the SwiftShader headless renderer (the capture-protocol §0 wedge). Its staging
> is verified by the SOURCE-WITNESS half (`proof:substrate-staging` asserts the
> `background: aurora, hero` row + the read-through seam) and confirmed by the
> live Metal channel in the W-SB-STAGE source. The blob / constellation / fourier
> Canvas2D substrates capture clean (above). The aurora page's own dead pastel
> bloom was excised so the live field is the only bleed.
