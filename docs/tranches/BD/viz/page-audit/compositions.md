# BD page-audit — COMPOSITIONS (12 pages)

Branch `prototype/liquid-dock`. Live-confirmed on `:5199` (3 concurrent vite servers running on `:5173`/`:5199`/`:5200`; the W-DEMO-NAV-FIX nav-loop made live capture race the bounce — caught hero / settings / instrument-chassis cleanly via navigate+immediate-evaluate; the rest read from source, which is authoritative for layout/integration). Source is `demo/stories/compositions/*.vue` (12 SFCs) + `demo/stories/manifest.ts:1132-1209`.

The 12: `hero` · `math-paper` · `auth-shell` · `settings` · `empty-states` · `drawer-live-behind` · `configurator` · `instrument-chassis` · `form-validation` · `gate-pattern` · `labeled-field` · `icon-tooltip`.

## CHASSIS USAGE — DRY CONFIRMED
All 12 use the shared `StoryPage` chassis (zero header hand-roll at the page-frame level — every structural chassis fix propagates here). Imports verified:
- `StoryPage` in all 12.
- `StorySection` in 7 (drawer-live-behind, form-validation, gate-pattern, labeled-field, icon-tooltip, configurator ×2 sections).
- `ShowcaseFrame` in 4 (configurator, icon-tooltip, labeled-field, + configurator API pane).
- 3 bypass `StorySection` entirely with hand-rolled `<section><p class="section-label">` blocks (settings, instrument-chassis, math-paper) — the section-affordance arm.

## SYSTEMIC DEFECTS — CONFIRMED (all fold to ONE chassis edit)

### W-HEADER-SCALE — confirmed, MEASURED live
The hero `<h1>` is 2× too large on every composition page. Live getComputedStyle:
- `hero` (heroScale `"mega"`, manifest.ts:1141): **244.8px** `text-display-hero` — fills the viewport, two lines.
- `auth-shell` / `settings` / `instrument-chassis`: **86.1px** `text-display-4`.
- (curve-gallery, caught mid-bounce, ~140px — same systemic over-scale across categories.)
On `instrument-chassis` the 86px title + blurb pushes the actual chassis demo to top:~520px (buried below the fold — screenshot-confirmed). ONE chassis edit (`assignDepths()` heroScale map, manifest.ts:454) halves it; the library √φ ladder is untouched.

### W-PAGE-CHASSIS — `--story-header-rule` ABSENT; no header→body seam
Confirmed across hero/settings/instrument-chassis: NO hairline below the chrome header (the eyebrow→h1→blurb block). The in-body `.story-sections--delimited` hairline (story-hero.css:428) DOES paint below the in-body masthead — but the chrome-header→body seam the user asked for is missing. REUSE the in-body delimiter (or `--configurator-divider`) for the header→body rule. ONE chassis edit.

### W-PAGE-BACKGROUND — glass demos NOT over a live field (the user's core ask)
Per-category default `compositions → grid` (manifest.ts:192). Live-staged pages:
- `auth-shell` (manifest `background: {kind:"fourier"}`) — the brand panel DOES paint a contained `<Aurora :config="brandAurora">` behind the translucent content (auth-shell.vue:58-65). This is the REFERENCE good-staging composition — glass-over-painterly reads. ✅
- `hero` (`background: "constellation"`) — 1 canvas (constellation field) behind the hero. ✅
- `empty-states` (`background: "paper"`) — a contained GooBlob mascot (empty-states.vue:108), correct by design (not a full-bleed field).
- The remaining 8 sit on a FLAT `grid`/`paper` wash with the glass demos over opaque/translucent `bg-card` plates — NOTHING live behind to refract:
  - `drawer-live-behind` (lines 45, 140): the verdict surfaces are `bg-card/40` — the live-behind sheet's whole POINT is glass over a still-interactive surface, but that surface is a flat plate, so the morphism is imperceptible.
  - `instrument-chassis`: the glass chassis on a flat wash (screenshot-confirmed — flat near-white, no refraction).
  - `settings`/`form-validation`/`gate-pattern`/`labeled-field`/`icon-tooltip`/`configurator` — glass cards/inputs on flat ground.
These are INTEGRATION showcases (closest to real consumer apps) — staging the composed scene over a live field is exactly where the morphism should read. W-PAGE-BACKGROUND should stage at least drawer-live-behind + instrument-chassis over a live field (one-GL-per-route honored).

### W-PAPER-MORPHISM — sub-perceptual
The grain `::after` is present (opacity 1 on card paper-texture, but `--glass-grain-opacity: 0.025` on the page register + light `--story-paper-wash: transparent`). `math-paper` is the one page that OPTS its interior into BOTH grain + blueprint-grid (`paper-grain-overlay paper-grid`, math-paper.vue:13) — the reference for the paper pillar — but even there the grain is faint. `settings` (a grid-wash page literally about settings/forms) and `form-validation` would benefit from the surfaced grain.

### DUPLICATE HAND-ROLLED HEADER — present but LIGHTER here than forms/containers
Compositions do NOT carry the byte-identical in-card IconChip header cluster that forms/containers do (no `<header>` IconChip duplicate of the chassis descriptor). IconChip appears in 3 pages (auth-shell trust-badges, empty-states card icons, hero) as legitimate CONTENT, not a duplicated header. So the double-header systemic is MILDER in compositions. The redundancy that IS present is the chrome-header eyebrow→h1→blurb vs the in-body masthead (the ~3× title the user saw across the storybook) — a chassis-level redundancy, not a per-page hand-roll.

## CATEGORY-SPECIFIC — section-affordance is the dominant per-page arm
Compositions are integration showcases that ORGANIZE into named groups — they should carry semantic `<h2>` section headings. Live `h2count` = **0** on every page checked (hero, settings, instrument-chassis). Worst offenders:
- **`settings.vue:75,109,...`** — 4 settings groups (Account/Appearance/Notifications/Accessibility) render as `.section-label--tinted text-admin-label` (10px, BELOW body) — NOT `<h2>`. A real settings page has `<h2>` group headings. Re-key the raw `<section><span class="section-label--tinted text-admin-label">` blocks to `<StorySection heading=>`.
- **`instrument-chassis.vue:129,153,235,250`** — 4 hand-rolled `<section><p class="section-label">` blocks (phase / composed chassis / chrome alone / structure variant) — zero `<h2>`. The mono eyebrows read as captions; the integration demo has no heading hierarchy.
- **`auth-shell.vue:113`** + **`drawer-live-behind:48`** + **`empty-states:145`** use `<h3 class="text-heading">` (25.9px) for in-card titles — this is the `text-heading` rung the StorySection canon warns DUPLICATES the page title; on auth-shell "Welcome back" h3 (25.9px) competes with the chassis h1. (auth-shell h3 is arguably correct as the form-card title; flag for review.)
- **`form-validation.vue:32,89,108`** is the REFERENCE model — uses `<StorySection heading=>` correctly (3 `<h2>` at the canonical 20.4px). Mirror it.
- `gate-pattern` / `labeled-field` / `icon-tooltip` / `configurator` use `<StorySection label=>` (eyebrow only) — they render an eyebrow caption but no `<h2>`; a `label→heading` re-key adds the missing section heading.

## PER-PAGE INTEGRATION BUGS
- **No BROKEN integration found** — the composed demos render and function from source (gate-pattern's non-dismissable Dialog wires `@escape-key-down.prevent`/`@interact-outside.prevent`/`@pointer-down-outside.prevent` + `show-close=false` correctly, gate-pattern.vue:79-85; drawer-live-behind's house `useDrawerSnap` detent buttons set `liveActiveSnap` + `liveOpen` correctly; instrument-chassis phase cascade + metric strip render, screenshot-confirmed).
- **`instrument-chassis.vue:136-138`** — the phase-selector pills hand-roll `bg-foreground text-background` / `bg-card hover:bg-accent` raw-Tailwind toggle buttons instead of `<SegmentedTabs>`/`<ToggleGroup type="single">`. A `role`-less `<button>` toggle group — a11y + DRY miss on an integration page. (Minor; the chassis itself is the demo, not the pills.)
- **`configurator.vue:151-178`** — the live stage is a token-driven CSS-gradient STAND-IN (`stageStyle`), NOT a real viz; the comment says the aurora story swaps in a real WebGL canvas (intentional honest stand-in). Acceptable, but the "studio shell" composition reads less alive than the real aurora studio — note it does not exercise W-CONFIG-GALLERY-DOCK (no gallery-up-top / dock-collapse; it's a static `<Configurator>` panel). The half-built configurator-chassis arm (W-CONFIG-GALLERY-DOCK) is visible here.
- **`auth-shell.vue:67` uses `:hero-title="false"`** (the full-bleed scene owns its own h1) — correct; the chrome chassis title is suppressed so only the in-scene "Build warm, audacious interfaces" h1 shows. Good model. (`hero.vue:87` same.)

## POLISH VERDICT (do they read as real consumer apps?)
- `auth-shell` reads the most polished — glass form panel over the purple→tomato aurora, trust badges, the proper full-bleed scene posture (`:hero-title=false`). The benchmark.
- `settings` reads as a credible settings page BUT the 86px chassis title dwarfs it and the group "headings" are 10px eyebrows (no `<h2>`) — feels like a spec sheet, not an app.
- `instrument-chassis` — the chassis demo is buried below the fold by the over-scaled title; flat wash; mono-eyebrow sections. Reads as a component dump, not an integration.
- `drawer-live-behind` / `gate-pattern` — function correctly but the flat `bg-card/40` behind-surface kills the live-behind glass story.

---

## 5-LINE VERDICT
1. CHASSIS DRY CONFIRMED — all 12 compositions use `StoryPage`; every systemic fix (header-scale, page-rule, page-background, paper-grain) propagates ONCE. No per-page header hand-roll (the forms/containers double-header is MILDER here — IconChip is legit content, not a duplicated descriptor).
2. W-HEADER-SCALE confirmed MEASURED: hero 244.8px (`mega`), the rest 86.1px (`display-4`) — on instrument-chassis the title buries the actual demo below top:520px.
3. W-PAGE-BACKGROUND is the category's core miss — only auth-shell (Aurora ✅, the reference) + hero (constellation) + empty-states (GooBlob mascot) stage live; the 8 glass integrations (drawer-live-behind, instrument-chassis, settings, gate-pattern…) sit on flat `grid`/`bg-card` with nothing live to refract — the morphism is imperceptible exactly where it should read.
4. CATEGORY-SPECIFIC dominant arm = section-affordance: `h2count=0` everywhere; settings (4 groups as 10px eyebrows) + instrument-chassis (4 hand-rolled `<section><p .section-label>`) need a `label→heading` re-key — `form-validation.vue:32` is the in-category reference. Minor: instrument-chassis phase pills are raw `<button>` toggles (should be ToggleGroup); configurator stage is an honest gradient stand-in not the gallery-dock.
5. NO BROKEN integration — gate-pattern non-dismissable modal, drawer detents, chassis phase cascade all wire correctly; auth-shell is genuinely polished. The polish gap is chassis-level (over-scaled title + flat background + caption-rung sections), not per-component. W-DEMO-NAV-FIX reproduced (direct `/compositions/*` URL bounced to `/motion/*` across `:5199`/`:5173`).
