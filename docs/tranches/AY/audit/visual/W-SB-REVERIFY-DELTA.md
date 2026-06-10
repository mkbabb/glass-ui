# W-SB-REVERIFY — the post-wave-2 substrate/type re-verify (B11/B13/B16/B17/B22) — DELTA

**Wave:** AY.W-SB-REVERIFY · **Status:** live-verified · **Verdict:** PASS (4 user-flagged surfaces re-driven on the settled tree; residue fixed).

The user's BINDING live audit (USER-AUDIT-2026-06-10 §B) flagged four storybook
surfaces the W-SB-STAGE wave 2 did NOT settle correctly, plus the type-scale
pass. Each re-driven on the live `:5199` against the settled tree; where the prior
fix had MISSED on the live route, the residue was fixed at the source. Viewports:
**1280×900 (desktop)** + **390×844 (REAL mobile)**. Schemes: {light, dark}. Device:
Chrome-headless (ANGLE→SwiftShader; the aurora WebGL pages captured under
`prefers-reduced-motion: reduce` so the `useWebGLCanvas` PRM-freeze paints ONE
static frame and the headless ReadPixels stall — capture-protocol §0 — is avoided).

---

## B16 — `/compositions/hero`: constellation INVISIBLE — root-caused + FIXED

**The W-SB-STAGE :where() fix SIZED the canvas but the constellation still read
INVISIBLE on the live route** — the boxed model trapped the lattice behind a
`quiet` (0.5α cream) glass card that DOUBLE-WASHED it to a flat white plate (the
live capture born-RED: a blank card, the user's complaint confirmed).

Root cause: the substrate was boxed inside the `.story-hero` card container
(`overflow: hidden; isolation: isolate`), so the field was both clipped to the
card box AND dimmed ~50% by the card's own cream plate sitting ON it.

Fix (gestalt, not a patch): a **full-bleed hero** register. Over a LIVE substrate
a `hero`-variant page now pins the field `position: fixed; inset: 0; z-index: -5`
(the KonamiAurora idiom) — the live field IS the page background behind the header
AND the content — and the content floats DIRECTLY over it on a thin radial
readability scrim (no card box, no double-wash). The constellation also reads
STRONGER on the front-door hero: a demo token override (the consumer pattern, NO
library edit) lifts node/line contrast + edge/field alpha (the library defaults
tune the lattice to RECEDE behind card content; on the hero the field IS the page).

| readback (desktop·light) | BEFORE (boxed) | AFTER (full-bleed) |
|---|---|---|
| `.story-hero-bg` position | `absolute` `z:-10` (boxed in card) | **`fixed` `z:-5`** (page background) |
| canvas size | 1134×979 (card box) | **1280×900** (full viewport) |
| `.story-hero` isolation / overflow | `isolate` / `hidden` | **`auto` / `visible`** (`data-full-bleed`) |
| constellation painted px (sampled) | 12/1600 (≈27/3600) → washed white | **44/3600** at darker node `hsl(30 10% 34%)` |
| content host | boxed glass Card | **`.story-hero-bleed-content`** floating over field |

PNG: `W-SB-REVERIFY-hero-{desktop1280,mobile390}-{light,dark}.png`. Light: the
dark-grey lattice + hairlines read across the full page behind the headline. Dark:
the light-on-dark constellation reads unmistakably (the `--constellation-node`
dark token). Bite: revert `fullBleed` → the field re-boxes + re-washes to white.

## B22 — `/foundations/intro`: aurora must be the ENTIRE page background — FIXED

Same root cause + same fix. intro declares `background: aurora, hero: true`; it
now rides the full-bleed register — the painterly aurora drift fills the WHOLE
page (`fixed inset-0 -z-5`, behind the StoryPage header AND the wordmark/headline/
category index), no sub-container box. The user's bar verbatim: "the aurora must
be the ENTIRE page background — no sub-container on pages like this."

PNG: `W-SB-REVERIFY-intro-{desktop1280,mobile390}-{light,dark}.png` — the aurora
drift is the page ground; "ℱ glass-ui" + "Glass, paper, and the golden ratio." +
the category cards all float over the live field.

## B13 — `/substrates/glass-material`: pointless on black — staged over LIVE aurora — FIXED

**The page had NO declared substrate** (`bg: null` on the live route) — it
hand-rolled an `<Aurora fixed inset-0 -z-10>` INSIDE the boxed `.story-hero` card,
where the isolated stacking context trapped it; the glass plates read against a
flat/black well (the user: "pointless on a black background — it shows nothing").

Fix: glass-material now declares `background: aurora, hero: true` on its manifest
row and DROPS the hand-rolled `<Aurora>` (–1 GL context, –1 import) — the page
chassis stages the aurora FULL-BLEED behind the whole matrix, so every glass plate
(`glass-{wash,quiet,resting,floating,overlay}` + `glass-card`) floats over a live
bright painterly field — the page's whole point (glass does not read on flat cream).

PNG: `W-SB-REVERIFY-glass-material-{desktop1280,mobile390}-{light,dark}.png` — the
aurora drift fills the page; the rung plates read as real glass against busy color.
`proof:substrate-staging` PASS (17 declared backdrops, was 16; read-through seam +
0 quiet-category violators intact).

## B11 / W-SB-TYPE — the demo type-scale pass: story chrome biased DOWN to the ladder

The user: "the text on all of these pages is WAY too large … bias the story chrome
DOWN to the documented ladder." Three on-token corrections (folds the RA-typography
8-heading off-token finding — the real count is **31** `text-xl` chrome headings,
the RA audit's 12-route survey under-counted):

| chrome element | BEFORE (off-token / oversized) | AFTER (documented rung) | sites |
|---|---|---|---|
| section heading `<h2 class="font-display text-xl">` | Tailwind raw 20px (off-ladder) | **`text-subheading`** (√φ 20.352px, on-token) | **31** |
| StorySection blurb | `text-prose` (18px floor → 24px wide; long-form READING register) | **`text-small`** (14px workhorse) | the SFC (≈104 hosts) |
| StoryPage chassis title + blurb | `text-title` 33px + `text-prose` | **`text-heading`** 26px + **`text-small`** 14px | the SFC (every page) |

Live π readback (desktop·light): every section heading now **20px** (on-token, was
the off-ladder `text-xl`); page title **26px** (was 33px). The hierarchy reads
clean: page title 26 → section 20 → alert/card title 16 → description 14.

PNG: `W-SB-REVERIFY-type-{alert,dialog}-desktop1280-{light,dark}.png` — the
alert/dialog section headings sit a proportionate step below the page title, no
mush, no oversized chrome.

## B17 — `/compositions/dashboard`: squished numbers FIXED + W-PRUNE candidacy recorded

Root cause of the squish: the metric value `<span class="text-display ... break-all">`
broke a `128ms` / `1.2k` figure MID-DIGIT ("128m\ns") inside the narrow 2-col cards
(`min-w-0` + `break-all` + a 42px display size competing with the trend badge in a
`justify-between` row).

Fix: the value gets its OWN full-width row (`flex-col items-start`), rides the
`text-title` √φ rung (33px, fits the narrow card), and carries `whitespace-nowrap`
+ `leading-none` so a figure stays WHOLE; the trend badge stacks below. The page
title also biased to `text-heading` (B11).

| metric (desktop·light) | value | one-line? | size |
|---|---|---|---|
| Active | `42` | **yes (h=33=fs)** | 33px |
| Reqs/min | `1.2k` | **yes** | 33px |
| p95 | `128ms` | **yes** (was mid-digit broken) | 33px |
| Error rate | `0.04%` | **yes** | 33px |

PNG: `W-SB-REVERIFY-dashboard-{desktop1280,mobile390}-{light,dark}.png` — every
figure whole on one line, desktop AND the worst-case 390px narrow column.

**W-PRUNE candidacy (recorded, NOT acted — the prune wave decides):** the
`/compositions/dashboard` page is a GENERIC admin-dashboard layout (System rail +
KPI strip + MetricBadge cards + projects Table + Activity timeline). It exercises
`MetricBadge` / `Card` / `Table` / `Badge` but demonstrates no glass-ui-SPECIFIC
behaviour the simpler `data/*` + `display/*` stories don't already cover — its
showcase value is "density layout," not a primitive demo. A minor residual seen in
capture: the in-table `<Badge>` status pills ("Active"/"Paused") wrap to two lines
in the narrow Status column (a secondary defect, NOT the metric squish the user
flagged; left for the prune/badge pass). Honest grade: **W-PRUNE candidate** (low
unique showcase value); not deleted — the prune wave owns the cut.

## G-DELTA — the own-surface captured contact set (20 PNG, honest dims)

- `W-SB-REVERIFY-hero-desktop1280-light.png` (1280×900), `…-hero-desktop1280-dark.png` (1280×900)
- `W-SB-REVERIFY-hero-mobile390-light.png` (390×844), `…-hero-mobile390-dark.png` (390×844)
- `W-SB-REVERIFY-intro-desktop1280-light.png` (1280×900), `…-intro-desktop1280-dark.png` (1280×900)
- `W-SB-REVERIFY-intro-mobile390-light.png` (390×844), `…-intro-mobile390-dark.png` (390×844)
- `W-SB-REVERIFY-glass-material-desktop1280-light.png` (1280×900), `…-glass-material-desktop1280-dark.png` (1280×900)
- `W-SB-REVERIFY-glass-material-mobile390-light.png` (390×844), `…-glass-material-mobile390-dark.png` (390×844)
- `W-SB-REVERIFY-dashboard-desktop1280-light.png` (1280×900), `…-dashboard-desktop1280-dark.png` (1280×900)
- `W-SB-REVERIFY-dashboard-mobile390-light.png` (390×844), `…-dashboard-mobile390-dark.png` (390×844)
- `W-SB-REVERIFY-type-alert-desktop1280-light.png` (1280×900), `…-type-alert-desktop1280-dark.png` (1280×900)
- `W-SB-REVERIFY-type-dialog-desktop1280-light.png` (1280×900), `…-type-dialog-desktop1280-dark.png` (1280×900)

## Gates (after the changes)

`proof:substrate-staging` PASS (17 backdrops, seam + 0 violators) ·
`proof:story-language` PASS (0 meta) · `proof:no-orphan-demo-route` PASS (123↔123) ·
`proof:storybook-complete` PASS · `proof:constellation-tokens` PASS (the demo
override is Canvas2D-safe plain-hsl) · `proof:adaptive-glass` PASS ·
`vue-tsc --noEmit` GREEN (app arm; the tests-arm `GlassUnderline.test.ts` failure
is a NEIGHBOUR lane's, not this wave's).
