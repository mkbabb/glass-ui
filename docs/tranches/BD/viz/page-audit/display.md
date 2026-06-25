# BD page-audit — DISPLAY category (11 pages)

Branch `prototype/liquid-dock`. Live-spot-checked at `:5173`, getComputedStyle-measured at vw 1440 / vh 900, light mode. PLANNING audit — no src edits.

The 11 pages: `buttons` · `card` · `badge` · `separator` · `section` · `metric-badge` · `metric-pill` · `status-dot` · `pulse` · `stacked-icons` · `dark-mode-toggle`. (Typography lives in `foundations/`, not here.)

**Chassis adoption is UNIVERSAL.** All 11 pages compose `<StoryPage>` + (mostly) `<StorySection>`; zero hand-roll a page header or hero. So EVERY defect below is a ONE-CHASSIS fix that propagates to all 118 pages — the KISS/DRY lever holds. The two exceptions to `<StorySection>` use (`metric-badge`, `metric-pill`) hand-roll their body grid but still inherit the chassis header.

---

## 1. HEADER-SCALE — the 2x-too-large title (CONFIRMED LIVE) → `W-HEADER-SCALE` (one chassis fix)

The demo hero `<h1>` resolves `text-display-${heroScale}` (`StoryHero.vue:92` `heroClass`; same class string in `StoryPage.vue:114` chrome header). `heroScale` is assigned per-route by depth in `manifest.ts:453-455 assignDepths()`:
- the FIRST story of a category = **D2 → `heroScale:"5"` → `text-display-5`**
- every subsequent story = **D3 → `heroScale:"4"` → `text-display-4`**

The √φ ladder rungs (`src/styles/typography/scale.css:126-127`):
- `--type-display-4` = `clamp(3.33rem, 2.5rem + 4vw, 5.382rem)` → **MEASURED 86.1px** (badge/shadows et al.)
- `--type-display-5` = `clamp(4.236rem, 3.5rem + 6vw, 6.854rem)` → **MEASURED 109.7px** ("Buttons", the D2 main)

LIVE: `/display/buttons` h1 = **109.7px**, line-height 115px, width 1152px — the title is a single word filling the article width. The screenshot of a sibling D2 page (`substrates/aurora`) shows the "Aurora" h1 spanning ~full width + ~25% viewport height — exactly the user's "fills the viewport" read.

This is NOT the library's audacious display identity (that is `text-display-mega/hero/audacious`, 177-352px, the metric/number surfaces). This is the DEMO header rung over-scaled: a content page's title rung set to `text-display-4/5` (86-110px) where a page title should sit at roughly the heading/title band.

**The right halved rung.** display-4 (86px) → the natural half is `--type-title` (32.9px, φ^(3/2)) or `--type-display-2` (`clamp(2.058rem, 1.5rem+2.2vw, 3.33rem)` ≈ 40-53px). The clean chassis fix: drop the depth→rung floor so D2 resolves `text-display-2` (~53px) and D3 resolves `text-title`/`text-display-1` (~33-42px) — roughly HALVING `assignDepths()`'s `"5"`/`"4"` map. ONE edit in `manifest.ts:454-455` (or, cleaner, re-key `heroClass` in `StoryHero.vue:92`). The library `scale.css` ladder is UNTOUCHED — only the demo's per-depth rung selection halves. NOTE: the D2-main exists precisely to be a marquee; if a "main" should stay larger than its subs, keep the relative step but halve both anchors (D2 `text-display-1`, D3 `text-title`).

VERDICT: **ONE chassis fix**, `W-HEADER-SCALE`. Touch `assignDepths()` heroScale map (manifest.ts:454-455) — propagates to all 118 pages. No per-page work.

---

## 2. NO DIVIDING LINE BELOW THE HEADER (CONFIRMED LIVE) → `W-PAGE-CHASSIS`

LIVE: `<header>` `border-bottom: 0px`; the first `.story-sections` child `border-top: 0px`. There IS an INTER-section divider (`.story-sections--delimited > * + *`, story-hero.css:428-437 — a hairline on `--configurator-divider` BETWEEN consecutive sections), but it is the `> * + *` adjacent-sibling form, so the FIRST section has no leading rule and there is NO rule separating the header cluster from the body. The header→body seam the user names is absent.

The fix is the addendum's `--story-header-rule` hairline. It lands ONCE on `.story-hero-cluster` / the `<header>` (a `border-block-end` on the same dark-adaptive `--configurator-divider` token the inter-section delimiter already uses, story-hero.css:435) — applied by `StoryPage.vue`/`StoryHero.vue`, no per-SFC `<hr>`. Reuse the existing token; do not mint a new one unless a distinct weight is wanted.

VERDICT: **ONE chassis fix**, `W-PAGE-CHASSIS`. Add the header-rule to the cluster/header in story-hero.css + StoryPage.vue/StoryHero.vue.

---

## 3. SECTION AFFORDANCE — the `label`-only pages have no `<h2>` (per-page-shaped data, chassis-mechanism) → `W-PAGE-CHASSIS`

`<StorySection>` (StorySection.vue:42-44) carries TWO registers: `heading=` → a semantic `<h2 class="text-subheading">` (20.4px / 600, the canonical section rung), and `label=` → the mono `.section-label` eyebrow caption (a tag, NOT a heading). The pages SPLIT:
- `card` uses `heading=` (LIVE: real `<h2>` at 20.35px) — correct section affordance.
- `buttons` mixes a hand-rolled `<h2 class="text-title">` (32.9px, buttons.vue:59 — too large, duplicates the title rung) AND `text-subheading` headings.
- `badge` · `separator` · `section` · `status-dot` · `pulse` · `stacked-icons` · `dark-mode-toggle` use `label=` ONLY → mono eyebrow caption, **NO semantic `<h2>` section heading** → the "no section affordance" read.
- `metric-badge` · `metric-pill` use `<StoryPage>` but ZERO `<StorySection>` (hand-rolled body grid) → no section structure at all.

The MECHANISM is one chassis (StorySection already ships `heading`). The fix is partly DATA (each `label`-only page should pass `heading=` for its named sections) and partly chassis-policy (buttons.vue:59 `text-title` `<h2>` should fold to the canonical `text-subheading` rung). This is the lighter per-page touch — but it is the manifest/SFC `label→heading` re-key, NOT a bespoke fix; the rung is the chassis's.

VERDICT: **chassis-mechanism present; per-page label→heading re-key** for the 7 `label`-only pages + buttons.vue:59 rung-fold + metric-badge/pill could adopt `<StorySection>`. Folds into `W-PAGE-CHASSIS` / `W-PAGE-AUDIT-ALL`. Genuinely per-page (the section *names* differ), but mechanically uniform.

---

## 4. PAPER MORPHISM IS SUB-PERCEPTUAL, NOT ABSENT (CONFIRMED LIVE — ROOT CAUSE) → `W-PAPER-MORPHISM`

The display category default background is `paper` (manifest.ts:185). LIVE: the `.story-bg-paper.paper-grain-overlay` element IS present and full-bleed (`position: fixed; inset: 0; z-index: -5`), and its `::after` grain DOES carry the SVG fractal-noise texture. The defect is the STRENGTH:
- `::after { opacity: var(--glass-grain-opacity) }` = **0.025 (2.5%)**, `mix-blend-mode: overlay` over the cream page → effectively invisible.
- `.story-bg-paper { background-color: var(--story-paper-wash) }` = **`transparent`** in light mode (only lifts in dark).

So in light mode the display pages render the paper register at ~2.5% overlay grain on a flat cream page with no base tint — the user reads it as "NO paper morphism anywhere." Plus the opaque `resting`-tier card (LIVE: `--card` at α 0.66 + `blur(10px)`) sits OVER the full-bleed paper, occluding it under the article column anyway.

The fix is a STRENGTH/legibility recalibration, not a missing mechanism: lift the demo paper-grain opacity to a perceptible register (a demo-local `--glass-grain-opacity` override on the paper bg, or a story-paper-specific grain knob), and/or give `--story-paper-wash` a faint light-mode warm-cream tint so the grain reads on a tinted plate, and/or drop the body card to a thinner/translucent rung over the paper so the grain reads THROUGH (currently `resting` opaque hides it). ONE chassis edit (story-hero.css `.story-bg-paper`/`.paper-grain-overlay` demo arm).

VERDICT: **ONE chassis fix**, `W-PAPER-MORPHISM`. Recalibrate paper-grain strength + light-mode wash in story-hero.css; the mechanism already ships.

---

## 5. NO ENGAGING / GLASS-DEMO BACKGROUND (PARTIAL — the glass atoms want a live field) → `W-PAGE-BACKGROUND`

The display band is the GLASS-ATOM band (buttons/card/badge/etc are the glass-first primitives). Per the user's "all glass demos = glass over a live field":
- `buttons.vue` ALREADY stages its glass-variant rows over a live field via `<ShowcaseFrame tier="field">` (buttons.vue:66) — the reference correct pattern. Opaque variants stay on the opaque host (correct — no glass to refract).
- `card.vue` self-stages TWO contained `<Aurora>` backdrops (manifest.ts:756 note) — the glass-over-aurora demo is present (budget: one route already at 2 GL contexts, do NOT add a page-aurora).
- `badge` · `metric-badge` · `metric-pill` · `status-dot` · `pulse` · `stacked-icons` · `separator` · `section` · `dark-mode-toggle` inherit the FLAT `paper` background (sub-perceptual per §4) and host their atoms on the opaque `resting` card — no live field, no engaging background. badge/card/metric are glass-bearing atoms that would read better over a field.

The fix is the addendum's shared `StoryPage` background facility: a per-category live viz for the glass-demo pages (honoring one-GL-per-route — likely ONE shared offscreen-paused field per route via the `<DockStage>`/`<ShowcaseFrame tier="field">` precedent, not N contexts), with the calm paper/grid wash (recalibrated per §4) for the non-glass atoms. The `buttons.vue` `tier="field"` pattern is the template to generalize.

VERDICT: **ONE chassis fix + per-page stage decisions**, `W-PAGE-BACKGROUND`. The mechanism (`ShowcaseFrame tier="field"`, the StoryHero background descriptor) exists; the work is wiring the glass-atom pages to a shared live field within budget.

---

## 6. STICKY-TITLE / per-page bugs

- **Sticky condense (`W-STICKY-TITLE-CONDENSE`):** the `.story-hero-shrink` register (story-hero.css:227-263) is `position: sticky; top: 0` with a `scale(1 → 0.5)` scroll() shrink gated behind `@supports (animation-timeline: scroll())` + PRM. Mechanism present; the addendum's "condense not occlude" + subtitle-subsume refinement is a chassis-once edit on this register. Not display-specific.
- **PRESET-RENDER / dot-flow-field bugs:** NOT in the display category (those are substrates/configurator surfaces). N/A here.
- **No display-specific per-page bug** beyond §3's buttons.vue:59 oversized `<h2>` and the metric-badge/pill lack of `<StorySection>`.

---

## VERDICT (6 lines)
1. HEADER-SCALE confirmed: D2 h1 = 109.7px (`text-display-5`), D3 = 86px (`text-display-4`), set in `manifest.ts:454-455 assignDepths()` — ONE chassis fix, halve the depth→rung map; library `scale.css` untouched.
2. NO header dividing line confirmed (header `border-bottom:0`, first-section `border-top:0`); only an inter-section delimiter exists — ONE chassis fix `--story-header-rule` on the cluster (reuse `--configurator-divider`).
3. Section affordance split: `card` uses `heading=` (correct `<h2>`); 7 pages use `label=` only (eyebrow, no heading); metric-badge/pill use no `<StorySection>` — chassis mechanism ships, per-page `label→heading` re-key + buttons.vue:59 rung-fold.
4. Paper morphism is sub-perceptual NOT absent: grain present but `--glass-grain-opacity:0.025` overlay + `--story-paper-wash:transparent` (light) + opaque `resting` card occludes — ONE chassis strength recalibration.
5. Glass-demo backgrounds partial: `buttons`/`card` already stage over a live field; the other 9 glass atoms sit on flat paper + opaque card — `W-PAGE-BACKGROUND` generalizes the `tier="field"` pattern within the one-GL budget.
6. All 11 pages USE the chassis (zero header hand-roll) → every fix is ONE-chassis-and-propagate; only §3's section-name data is genuinely per-page.
