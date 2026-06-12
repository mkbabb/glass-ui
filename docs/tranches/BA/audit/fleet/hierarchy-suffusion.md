# BA fleet · LANE: hierarchy-suffusion

Audit-only, post-AZ-close (master @ 3.13.0). Live-probed :5199 both modes (the
demo defaults DARK — most evidence is the dark register). Evidence pngs banked
beside this file (`hs-*.png`).

## What was measured

- Type-ladder consumption across content pages (`/foundations/icons`, `/foundations/buttons`)
  vs hero pages (`Paper & Glass`, `Curve Gallery`) — empirical `getComputedStyle` font-size census.
- The dark-mode glass-tier separation — empirical sRGB compositing readback of the
  five-rung ladder over the page substrate.
- The suffusion-axis coverage — manifest `background:` declarations vs the 136 story files.
- The color-pop distribution — where the 13-stop `--section-color-*` ramp actually paints.

---

## Finding HS-1 (S1) — Dark-mode glass collapses into an 11-codevalue near-black band; ALL glass suffusion is dead in dark

**Mechanical root cause: `src/styles/tokens/dark-arm.css:32` + `:51`.** The dark page
`--background` = `--neutral-0` = `hsl(24 8% 6%)` (L6) and `--card` = `hsl(24 8% 10%)`
(L10) sit only **4 L-steps apart**. Every glass tier is `color-mix(in srgb, --card …)`
over that page, so the whole ladder composites into a near-black band.

Empirical readback (`/foundations/icons`, dark, the card-over-page composite at each tier's α):

| tier | α | effective sRGB | rel-luminance |
|---|---|---|---|
| page | — | (17,15,14) | 0.0049 |
| wash | .38 | (21,19,17) | 0.0066 |
| quiet | .58 | (23,21,19) | 0.0076 |
| resting | .72 | (25,22,20) | 0.0084 |
| floating | .88 | (27,24,22) | 0.0093 |
| overlay | .96 | (28,25,23) | 0.0098 |

- Adjacent-tier ΔL ≈ **0.0005–0.001** (luminance contrast ≈ 1.1:1 — far under the ~3:1 a human reads as a distinct surface).
- Page→wash ΔL = **0.0017** (the lightest glass barely lifts off the page).
- The card itself is contrast ≈ **1.6:1** vs the page.

The entire five-rung ladder spans **7 sRGB code values** total. This is R8-11 ("I cannot
even see the glassy effect … because of the pointless black background") proven
numerically — and it is NOT a per-story black-bg bug, it is the `--card`/`--background`
token pair. The `glass-material` story's "black background" is the page's own L6 substrate.
Evidence: `ground/R8-11-black-bg-hides-glass.png`, `hs-paperglass-hero-dark.png` (the
whole Curve Gallery page reads near-black).

**Why glass reads fine on the 404/constellation pages but not content pages:** glass needs
a *textured/lit* thing behind it to refract. The 404 (`hs-foundations-frontdoor-dark.png`)
reads because the constellation lines pass behind the card; the content pages have a flat
L6 field, so there is nothing to blur.

**Proposed (gestalt, token-first):** widen the dark substrate ladder so glass has room
to separate — open the `--background`→`--card` gap (the page should sit DEEPER, the card
LIFT higher: a 4-L gap is the defect; iOS/Material dark surfaces step ~6–10 L per
elevation tier). This is ONE token-pair edit (`--neutral-0` floor + `--card` lift in
`dark-arm.css`), re-resolving every glass rung's composite in lockstep with zero per-tier
or per-page edits. Pairs with raising the dark-arm `--glass-opacity-*` rungs only if the
substrate widening alone does not separate the tiers (measure first). Couples to R8-15
(every page owes a non-flat background) — but the substrate fix is the floor that makes
even a textured background read THROUGH the glass.

---

## Finding HS-2 (S1) — The display register is binary (hero=68px / content=26px); content pages have a 3-rung ladder with no audacious moment

The audacious √φ ladder is the house's signature (`--type-display-1..audacious`,
42px→352px, `typography.css:138-161`), but it ACTIVATES only on `StoryHero variant="hero"`
pages via the chassis `<h1 class="text-display-3">` (`StoryHero.vue:228,251`). On a CONTENT
page the ladder collapses:

- `/data` ("Paper & Glass", hero): painted ladder **68 → 32 → 20 → 16 → 14 → 12 → 10** — healthy, 7 rungs.
- `/foundations/icons` (content): painted ladder **26 → 16 → 11** — page `<h1>` `text-heading` (φ, 25.9px), body 16px, mono eyebrow 11px. THREE rungs, no display moment, a void between 26 and 16.
- `/foundations/buttons` (content): identical — `<h1>` `text-heading` 26px, `<h2>` `text-subheading` 20px, body 16px.

Two incongruences:
1. **The page-title↔section-heading gap is thin.** Content page `<h1>` = `text-heading`
   (26px) and section `<h2>` = `text-subheading` (20px) are only 6px / one weight-step apart
   — the page title does not dominate. CLAUDE.md's own StorySection note says `text-heading`
   "duplicates the page title" — yet the page title IS `text-heading`, so the chassis
   collapses the two registers it warns against conflating.
2. **No content page wears a display register.** The "type SINGS through the chassis" goal
   (AZ.W-SUFFUSE) landed only on hero pages; the ~12 content categories peak at 26px. The
   mega/audacious tiers (177/352px) ride only metric-number surfaces. A reader paging
   icons→buttons→data sees flat-26 / flat-26 / sudden-68 — a binary, not a graded system.

**Proposed (gestalt, chassis-level):** lift the content-page chrome `<h1>` ONE rung off the
section-heading register (page title → `text-title` 33px or `text-display-1` 42px; section
`<h2>` stays `text-subheading` 20px) so the page title DOMINATES on every page, not just
hero pages. The display-register "moment" becomes a graded chassis affordance keyed off the
page's role (front-door / category-landing / content) on `StoryPage`, not a hero-only
binary — one chassis edit re-ranks all 12 categories. Root cause for the title rung is
`StoryPage.vue` (per AZ.W-HIERARCHY §0 cite 2, `:41`).

---

## Finding HS-3 (S2) — Suffusion axes (grid, paper, live-field) declared on only 38 of 136 story surfaces; ~72% of routes wear the flat default

Manifest census (`demo/stories/manifest.ts`): **38 `background:` declarations** total
(6 aurora · 2 blob · 8 constellation · 2 fourier · 14 grid · 6 paper) against **136 story
.vue files**. ~72% of routes carry NO declared substrate. AZ.W-SUFFUSE D4-2 named this
("~104/121 routes declare NO background") and scoped its fix to "enrolled thin pages" only
— so the long tail stayed flat at AZ close. The icons page (`hs-icons-dark.png`) is one
undifferentiated `glass-card` plate: no grid, no paper, no section-tier depth — just a flat
card with mono eyebrows (LUCIDE · POPS · SIZING).

This compounds HS-1: even the grid/paper backgrounds that ARE declared drop the card to a
thin `wash`/`quiet` tier (`StoryHero.vue:164-168`, the read-through seam) — but in dark
mode a wash tier over L6 is invisible (HS-1), so the declared grid suffusion cannot read
in dark anyway.

**Proposed (gestalt, chassis-level):** make the calm substrate the chassis DEFAULT, not a
per-page opt-in — `StoryPage`/`StoryHero` should paint a deterministic calm background
(a per-category grid/paper/section-tinted wash derived from the route's section-color
index) for every page that does NOT declare a live field, so "no flat default" is the floor
rather than a 38-route allowlist. This is the R8-15 directive ("EVERY core page should have
an interesting background … paper grid too") expressed token-first: one chassis rule keyed
off the category, zero per-page edits. Gated by HS-1 (the dark substrate must widen first or
the calm grid still won't read).

---

## Finding HS-4 (S2) — The colorful "pops" are concentrated in one reference; content surfaces are monochrome

The 13-stop `--section-color-*` ramp (`color-radius.css:214-226`) is a rich categorical
jewel-tone palette — but it paints in exactly two places: the icons-reference chip row
(`hs-icons-dark.png`, the 0–12 swatch grid) and the `.section-label--tinted` eyebrow
(`typography.css:501`, default `--section-color-7`). Every other content surface is
monochrome warm-ink. The user's R8 directive (standing directive 7) wants the icon-grade
"colorful audacious pops … within a sense of proportion" SPREAD across the UI, and praises
the icons page as the model — yet that page is the ONLY place the ramp lives at full chroma.

The one-color-event rule (AZ.W-SUFFUSE) is correctly restraining, but it is being read as
"zero color events on most surfaces" rather than "ONE deliberate event per surface." The
section-color ramp is near-dead substrate (the visual-load-bearing invariant is met only by
the single icons reference + the eyebrow).

**Proposed (gestalt, token-first):** give each category its ONE section-color identity —
route the category's `--section-color-N` into its eyebrow, its section-accent rail, and ONE
focal chip/metric per surface (the `math-paper.vue` border-l-[3px] rail model AZ.W-SUFFUSE
already names as the gold standard), so the storybook reads as a colored SYSTEM (icons=rose,
forms=teal, motion=violet…) rather than monochrome-with-one-reference. Keep the one-event
ceiling and the monochrome-legitimate surfaces (icon grid, type ladder, curve table) flat.
This ACTIVATES the dead ramp rather than pruning it — the visual-load-bearing fix AZ.W-SUFFUSE
intended but under-realized across the long tail.

---

## Cross-cutting note

HS-1 is the keystone: it is the mechanical floor under R8-11, and it gates the visual
payoff of HS-3 (calm backgrounds), the glass-material/card/veil demos (R8-11 second half),
and every "glassy-by-default" census ask (R8-12). The dark register being "flat, near-black,
glass-invisible" (the R8 banner) is ONE token-pair root cause, not a per-surface cluster —
fix the substrate ladder and the dark register reads everywhere. HS-2/HS-3/HS-4 are the
hierarchy/suffusion completion the AZ pass started but scoped narrowly; they want chassis
re-ranking + default-on substrate + ramp activation, all token/chassis-level, zero per-page
craft.
