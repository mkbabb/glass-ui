# BA fleet lane — page-backgrounds (R8-15 + R8-11)

AUDIT-ONLY. Live-probed :5199 (dark register — the demo force-syncs `.dark` on
navigate; the app's `useGlobalDark` re-applies the class, so a JS class strip is
overridden — DARK is the binding register for this lane, which matches the R8
cluster). Source root-caused to file:line. Evidence pngs beside this report.

---

## 1. The headline number — the background census

Walked the FULL manifest (`demo/stories/manifest.ts` — the single source of truth
the `StoryPage`/`StoryHero` chassis reads via `background:`). **101 stories; 20
carry a `background:` key; 81 carry NONE.**

The 81 keyless stories fall through to the AppShell base ONLY:
`<PaperBackdrop class="fixed inset-0 -z-10 bg-background">` (AppShell.vue:112) — a
faint paper grain over the flat `--background`. In DARK that is `hsl(24 8% 6%)`
(≈ rgb(17,15,14)) — a near-black void with an imperceptible grain. **This is the
systemic R8-15 defect: 80% of the storybook is a flat black/white page.**

### Background-key distribution (the 20 declared)

| key | count | routes |
|---|---|---|
| `grid` | 7 | data/table, data/data-table, data/metric-cell, data/metric-stack, motion/curve-gallery, compositions/math-paper, compositions/settings |
| `constellation` | 4 | foundations/motion, substrates/constellation(hero), motion/springs, compositions/hero(hero) |
| `aurora` | 4 | foundations/intro(hero, rose-indigo-amber), substrates/aurora(hero), substrates/glass-material(hero), navigation/carousel(page) |
| `paper` | 3 | foundations/paper-glass(hero), substrates/blob(hero), compositions/empty-states |
| `fourier` | 2 | substrates/fourier-field(hero), compositions/auth-shell(hero, obj) |

So: live GL substrate (aurora/constellation/fourier) appears on **10 routes**,
static wash (grid/paper) on **10 routes**, and **81 routes are blank**.

---

## 2. The defects (live-confirmed)

### A. The systemic blank page — R8-15 (S2)

`/feedback/alert` (the user's named example), `/display/buttons`,
`/containers/dialog`, the whole Forms/Display/Containers/Feedback bands — keyless,
so each is a flat near-black page (DARK) with a dark-grey card and a large empty
black void below the fold. Evidence: `bg-alert-dark.png`, `bg-table-grid-dark.png`
(the latter actually showing /display/buttons mid-transition — the same void).
ROOT: manifest rows lack `background:`; the chassis renders the AppShell base only.
This is a CENSUS gap, not a code bug — the per-category assignment map (§4) is the
remedy.

### B. The R8-11 black-plate kill — glass-material in DARK (S1)

`/substrates/glass-material` DOES declare `background: "aurora" hero: true`, and the
aurora paints full-bleed (pink/blue visible at the page edges — `bg-glass-material-
dark.png`). But the "moving specular" ladder band renders the glass rungs
(glass-wash … glass-card) as DARK SLABS — the glassiness the page exists to show is
killed exactly as the R8-11 ground capture shows. ROOT-CAUSE (mechanical):

- `ShowcaseFrame.vue:51-55` — default tier `resting` paints `bg-card border-border`.
  In DARK `--card` = `hsl(24 8% 10%)` — a near-opaque dark plate.
- `glass-material.vue:79` wraps the rungs in `<ShowcaseFrame pad="lg">` (the
  opaque-card default), itself inside the `StoryHero` `quiet`-tier card.

So the bright aurora is OCCLUDED by TWO stacked opaque-ish layers (StoryHero card →
ShowcaseFrame `bg-card`) before it ever reaches the glass rungs. The rungs have a
near-black backdrop to refract → they read as dark-on-dark slabs. The glass demo
is the ONE page that must let glass float DIRECTLY over the live field, and it nests
it in opaque frames instead. This is the R8-11 root: **glass-over-glass demos that
hide their own backdrop.**

### C. Static washes are INVISIBLE in DARK — grid + paper (S2)

`/data/metric-cell` declares `background: "grid"` but in DARK the grid is
imperceptible (`bg-metric-cell-grid-dark.png`). Mechanical readback
(`document.querySelector('.story-bg-grid')` + computed styles):

- grid fill = `--background` = `rgb(17,15,14)` (near-black);
- grid lines = `--story-grid-color` `color-mix(srgb, --foreground 9%, transparent)`
  / `-strong` `16%` (story-hero.css:26-27, the `.dark` arm) — 9–16% of a LIGHT ink
  over near-black, then further dimmed by the `wash`-tier StoryHero card
  (`oklab(0.498 … / 0.504)` + `blur(1px)`).

Net: the 9/16% lines vanish behind the half-opaque card. The `.dark` grid arm
(9/16%) was tuned light-first; the dark arm is too faint to clear the card. The
calm-content idiom (`grid`/`paper`) is effectively a NO-OP in DARK — the page reads
as blank as a keyless one. SOURCE: `story-hero.css:25-28` (the underpowered `.dark`
arm) + the card-occlusion stack.

### D. Contained live substrates are too DIM in DARK — aurora/constellation page-variant (S2)

`/navigation/carousel` (aurora, page-variant) + `/motion/springs` (constellation,
page-variant) — the live field is boxed BEHIND the `wash` card at the page-variant
`opacityCeiling` 0.4 (StoryHero.vue:88-94). In DARK the aurora reads as a dull
brown-grey wash (`bg-carousel-aurora-dark.png`) and the constellation as a few
near-invisible dots top-right (`bg-springs-constellation-dark.png`). The live
substrate DOES pop on the FULL-BLEED HERO pages (intro/aurora/glass-material edges,
fourier-field) but is muted to near-nothing on the CONTAINED page-variant. So the
same substrate has two registers and the contained one fails the dark read. SOURCE:
`StoryHero.vue:88-94` (page-variant ceiling 0.4) + `cardTier` `wash`/`resting`
occlusion (StoryHero.vue:164-168), un-compensated for dark.

### E. The blank-page count makes the dark register read FLAT overall (S2, design)

The cross-cutting R8 note ("the demo's dark register being flat, near-black,
glass-invisible") is DOWNSTREAM of A–D: 80% blank + invisible washes + dim contained
substrates means almost every route in DARK is a near-black field. The demo's own
identity (glass / grid / math / aurora / audacious type) never reads because nothing
is behind the glass to make it glass. This is the gestalt diagnosis the
per-category map (§4) + the dark-register recalibration (§3) jointly fix.

---

## 3. The mechanical fixes the map depends on (dark-register recalibration)

The §4 assignment map is moot unless DARK is fixed first. Three knob-family edits
(no per-site) that the background work must ride on:

1. **Lift the `.dark` static-wash strength** (`story-hero.css:25-28`) so grid/paper
   read THROUGH the card in dark — the 9/16% arm is the light-tuned value; dark needs
   a stronger ink alpha (the grid is a hairline, the card halves it). Direction: a
   dark-arm grid/paper that survives the `wash`/`quiet` card occlusion.
2. **Raise the page-variant `opacityCeiling` for live substrates in DARK** (or drop
   the card to a thinner rung over them) — the contained aurora/constellation must
   read, not wash to brown-grey (StoryHero.vue:88-94 + 164-168).
3. **Glass-demo pages must NOT nest glass in opaque frames** — `ShowcaseFrame`'s
   `bg-card` default is the wrong host for a glass-over-aurora demo. Direction: a
   transparent / glass-tier showcase host (or `tier="quiet"` + a no-card mode) so the
   glass plates float over the live field, not over a black plate (B's root).

---

## 4. The proposed per-category background assignment map (varied · subtle · idiom-true)

The principle: ONE deliberate idiom-true background per CATEGORY (so a category reads
as a coherent place), varied ACROSS categories (so the storybook is not one aurora),
honoring the one-GL-per-route budget (a route mounts ONE GL context; static washes
are free). Live GL is reserved for hero/substrate/motion bands; the dense
content/forms bands get the calm static washes (grid/paper) lifted to read in DARK.

| category | current | proposed default | rationale / idiom |
|---|---|---|---|
| Foundations | mixed (3 keyed) | `paper` (token/type pages) + keep the 2 heroes | a foundations page is paper/ink — the warm-cream grain wash; intro stays aurora-hero, paper-glass stays paper-hero |
| Substrates | 5 keyed, 1 blank (glass-panel) | each its OWN live field (aurora/constellation/fourier/blob-studio) + glass-panel gains `aurora` | the substrate band IS the GL showcase; glass-panel must show glass over a live field (B's lesson) |
| Forms | ALL blank (11) | `grid` (blueprint) | forms are engineering-paper surfaces — the ruled grid is the native fit; calm, static, free |
| Display | ALL blank (12) | `paper` | display atoms (cards/badges/metrics) read as printed specimens on warm paper grain |
| Containers | ALL blank (13) | `grid` OR a SUBTLE single aurora for the band | dialogs/sheets/popovers are glass surfaces — a faint aurora lets them demonstrate glassiness (the floating-glass register); budget: one GL per route is fine |
| Navigation | 1 aurora-page, 2 blank | `aurora` (the glass-nav-over-field register) | nav chrome (tabs/ribbon/carousel) is glass — show it over a live field |
| Dock | ALL blank (5) | `aurora` | the dock IS the glass-over-aurora hero primitive — every dock page should sit over a live field so the dock's glass + adaptive-luminance reads (ties to R8-11/W55) |
| Data | 7 grid, 6 blank | `grid` across the band | ledger/table/metric surfaces are the canonical blueprint-grid fit (already partly done) |
| Feedback | ALL blank (7) | `paper` OR a subtle `aurora` for the glassy-feedback census | R8-12 wants glassy toasts/notifications — staging them over aurora demonstrates the glass variants (ties the §5 staging) |
| Motion | 2 keyed, 6 blank | `constellation` (the motion-band identity) + curve-gallery keeps grid | motion is the constellation/drift band; the purple motion-accent reads over a lattice |
| Compositions | 5 keyed, 7 blank | per-comp (hero=constellation, auth=fourier, settings/math=grid, empty=blob) + fill the blanks with `grid`/`paper` | compositions are full scenes — each picks its scene's idiom |

Net: zero blank routes; live GL clustered on Substrates/Dock/Nav/Motion (within the
one-GL budget); the dense Forms/Display/Data/Feedback bands ride the calm static
washes (grid/paper) — DARK-recalibrated per §3 so they actually read.

---

## 5. The card / variant / veil demo stagings over aurora (R8-11 second half)

R8-11: "we should have proper demos for all of our cards, our card variants, our
veil variant, etc, with proper aurora backgrounds to demonstrate glassy-ness."

- **`/display/card`** (currently blank) — staged over `aurora` HERO, the five tiers
  (wash/quiet/resting/floating/overlay) floating DIRECTLY over the live field (NOT
  in a ShowcaseFrame `bg-card` — B's root). Each tier reads its glassiness against
  the bright drift. This is the canonical card-tier demo R8-11 asks for.
- **The veil variant** — needs a dedicated staging over aurora (the veil register is
  named in R8-12's census; surface it on the card page or a new substrates page over
  a live field).
- **`/substrates/glass-material`** — the B fix: drop the opaque ShowcaseFrame, float
  the rungs over the full-bleed aurora; the moving-specular + rim must read against
  the bright field, not a black plate.
- **`/substrates/glass-panel`** (currently blank) — add `aurora` so the five-rung
  tier ladder demonstrates over a live field.
- The whole **Dock band over aurora** (§4) doubles as the glass-dock-over-light demo
  the W55 adaptive-luminance + R8-11 both want.

The binding staging rule (the B lesson, codify it): **a glassiness demo must place
its glass surfaces over the live substrate with NO opaque card between them.** The
ShowcaseFrame `bg-card` host is correct for opaque-atom specimens (badges, tables)
and WRONG for glass demos — glass demos need a transparent/glass-tier host.

---

## Findings (structured)

See the StructuredOutput payload. Evidence:
`docs/tranches/BA/audit/fleet/bg-glass-material-dark.png` (R8-11 live),
`bg-alert-dark.png` (R8-15 blank), `bg-metric-cell-grid-dark.png` (grid invisible),
`bg-carousel-aurora-dark.png` (contained aurora dim),
`bg-springs-constellation-dark.png` (contained constellation dim).
