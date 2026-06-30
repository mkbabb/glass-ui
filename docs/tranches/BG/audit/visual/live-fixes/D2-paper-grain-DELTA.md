# D2 — paper-grain metallic-wash fold — DELTA

**Hunter:** D2-paper-grain ("Paper-grain issues — folds the metallic-wash family")
**Worktree:** `.claude/worktrees/wf_1eeccb0b-617-2` off `tranche/BG` (reset to the BG tip
`472bd89b` — the worktree seeded STALE at the BD-ship `998136bb`, 122 commits behind, which did
NOT contain the candidate commit; the stale-worktree-trap reset was mandatory).
**reproduced:** YES (two surfaces) · **fixApplied:** YES · **chromePass:** YES · **safariPass:** YES

---

## Root cause (CONFIRMED)

`3f200f1d` (BG.W-PAPER-GRAIN-OPTIN) demoted the universal `<PaperBackdrop>` grain plane → per-surface
opt-in; `BG.W-FIELD-AURORA` then retired the warm `.paper-field` CSS plane (the shell field became a
recessive `<Aurora>` at `opacity-ceiling: 0.5`, `vividness: 0`). The grain tooth (`--paper-grain-tooth`)
is by design a **saturate=0 GRAY speckle** that gets its warmth from the SUBSTRATE behind it (the
paper.css "LIBRARY FENCE"). With the universal warm plane gone, a `paper-grain-overlay` surface that
sits over the bare recessive shell aurora has **no warm substrate** → the gray multiply tooth
desaturates the surface below the `BA.W-NO-GRAY` warm-chroma floor (C 0.02) → reads metallic-gray.

The `10.25 BG.W-CATEGORY-CARD-WARM` fix already closed this for the category bento SUB-CARDS (a
`.section-bento::before` warm radial). The survey found the SAME class still live on the foundations
STORY pages (not landings — they never got a warm field):

| surface | before (measured, both modes) | verdict |
|---|---|---|
| `/foundations/paper-glass` glass-tier tiles (`glass-{wash,quiet,resting,floating} paper-grain-overlay`) | **C 0.009–0.015** (BELOW 0.02 floor), warm hue lost to gray | GRAY/metallic |
| `/foundations/paper-texture` whole page | full-viewport GRAY noise wash (6× `<PaperBackdrop>` `position:fixed` grain planes escaping their panels + stacking; title/blurb near-illegible) | GRAY/metallic |
| StoryHero full-bleed `story-bg-paper paper-grain-overlay` page wash (every paper hero page) | `--story-paper-wash` was `transparent` in LIGHT (assumed "the page is already cream" — the now-gone universal plane); grain reads DEAD in Chrome (isolated multiply over transparent → invisible) and GRAY in Safari off-screen | grain-dead / gray |

Control (NOT a defect): `/foundations/colors` (no grain) read warm-cream throughout — proving the gray is
the grain desaturation, not a too-faint shell aurora. `/forms` + `/data` landing sub-cards read warm
(C 0.023–0.036) — the W-CATEGORY-CARD-WARM bento field works there.

The two `/foundations/intro` category-card plates also showed gray header zones (same class), but intro
is a bespoke COLORFUL hero page (likely the shell/field hunter's domain) — noted, not fixed here.

## Fix (clean break, token-first, warm-everywhere, presets-in-consumers — the W-CATEGORY-CARD-WARM precedent)

1. **`demo/stories/foundations/paper-glass.vue`** — wrap the tier-tile grid in `.paper-glass-tier-field`
   carrying a recessive WARM CSS radial (`::before`, `oklch()` warm hue 62 ± wedge, `isolation: isolate`,
   `z-index:-1`) + a `.dark` warm-ember arm + a `prefers-reduced-transparency` warm-solid floor — NO live
   GL (one-GL-per-route budget held). The translucent glass+grain tiles now transmit a warm-cream
   substrate.
2. **`demo/stories/foundations/paper-texture.vue`** — `contain: paint` on every `<PaperBackdrop>` wrapper
   (`.paper-grain-host`) so the `position:fixed` `paper-underpaint` grain is CONTAINED to its panel (the
   SFC's own "the host owns the radius + clip" promise — `relative`/`overflow-hidden` never established a
   fixed-positioning containing block) over the panel's warm base; wire `--paper-underpaint-color` to the
   scope panels' `background-color` (warm/cool/bone read DISTINCT, not identical gray noise); add a warm
   base to the layered-composition panel. The page bg is no longer washed gray, and clean-vs-aged is
   actually comparable per-panel.
3. **`demo/stories/story-hero.css`** — `--story-paper-wash` LIGHT: `transparent` →
   `color-mix(in srgb, var(--card) 70%, transparent)` (mirrors the working `.dark` arm). The StoryHero
   full-bleed paper grain now multiplies over a warm-cream base on EVERY paper hero page → PLAINLY-VISIBLE
   + WARM grain in BOTH engines (fixes the Chrome grain-dead AND the Safari grain-gray at once — the
   BD.W-PAPER-MORPHISM "visible grain" goal + the no-gray floor).
4. **`scripts/proof-demo-radial-calm.mjs`** — add `foundations/paper-glass.vue` to the documented
   `RADIAL_KEEP_FILES` allowlist (the gate's own prescribed remedy; the exact SectionLanding precedent —
   a contained warm card-grid wash, NOT a section-color page hero; the HERO arm still guards a
   section-color wash since the `oklch()` field carries no `--section-color-*` stop).

The library grain utility (`paper-grain-overlay`/`paper-underpaint`/`--paper-grain-tooth`) is
BYTE-UNTOUCHED — the gray-tooth-warmth-from-substrate design fence holds; the fix gives the demo grain
surfaces the warm substrate the removed universal plane used to provide.

## Live verification (dual-engine, both modes)

Real Chrome.app (ANGLE Metal, Apple M5 Max) over CDP :9342 + real Safari/WebKit 26 (Apple GPU, Metal)
off-screen WKWebView, on the live `:5202` dev route via the C18 `?capture=` harness. Pixel sampling =
sRGB→OKLCh (Ottosson) over decoded screenshot regions.

**paper-glass tiles (Chrome direct-nav, both modes) — C cleared the warm floor:**
| tier | before C | after C (light) | after C (dark) | hue |
|---|---|---|---|---|
| glass-wash | 0.0093 | **0.0449** | 0.0455 | warm H67–78° |
| glass-quiet | 0.0102 | **0.0339** | 0.0349 | warm |
| glass-resting | 0.0107 | **0.0253** | 0.0241 | warm |
| glass-floating | 0.0116 | **0.0197** (at floor, gamut-bound near-white L0.75) | 0.0198 | warm H67–73° |

**paper-texture** — full-page gray wash GONE; page bg warm-cream (Safari edge C 0.023 H72° light); grain
contained per-panel; retint panels distinct (warm/cool/bone). Both engines, both modes.

**paper-glass page bg (Safari/Metal, after `--story-paper-wash` fix)** — warm-HUE throughout (light edge
L0.89 C0.0148 **H71.7°**; dark edge L0.33 C0.0187 **H56.2°**) — warm paper grain, not cold gray metal
(metallic = cool 200–300° hue; every probe is in the warm [25,95] band).

**Gates (worktree):** `proof:demo-radial-calm` PASS · `proof:no-paper-field` PASS · `proof:stage` PASS ·
`proof:category-card-warm` PASS · `proof:no-gray` PASS · `proof:suffuse` PASS · `proof:demo-design` PASS ·
`npx vue-tsc --noEmit` exit 0 (0 errors). `verify-siblings-intact` exit 0 before + after.

## Capture artifacts (on disk)

`/tmp/respec-fixes/D2-paper-grain/`:
- AFTER Chrome direct-nav: `foundations-paper-glass-{light,dark}.png`, `foundations-paper-texture-{light,dark}.png`, `foundations-colors-{light,dark}.png` (control)
- AFTER Chrome capture-mode (engine-badged): `foundations-paper-{glass,texture,colors}-capmode-{light,dark}.png`
- AFTER Safari/WebKit-Metal (engine-badged): `foundations-paper-{glass,texture,colors}-safari-{light,dark}.png`
- `pixel-stats.json` (per-region OKLCh + luma-std readouts)

NOTE: clean pre-fix PNGs were overwritten during iteration; the before-state is documented by the
recorded pixel MEASUREMENTS above (C 0.009–0.015 gray tiles; full-page gray paper-texture wash).

## Patch
`/tmp/respec-fixes/D2-paper-grain.patch` — 4 files (3 demo + 1 gate-allowlist reconcile).

## Related observation (NOT fixed — out of D2 scope)
- The StoryHero **wash-card** (the big translucent hero card on grain-bg pages, e.g. paper-glass's
  "Paper & Glass" container) reads gray-cream because it is a translucent wash plate over the recessive
  center shell aurora — NOT a `paper-grain-overlay` surface. That is a shell/field-recessiveness concern
  (the colors page hero read warm without a wash card), likely another hunter's domain.
- `/foundations/intro` category-card header zones read gray (same grain class) on a bespoke colorful
  hero page — flagged for the shell/intro hunter.
