# Pass-E page-deep audit — foundations/typography

- **Route**: `/foundations/typography` · **Import label (rendered)**: `/foundations/typography`
- **SFC**: `demo/stories/foundations/typography.vue`
- **Live**: http://localhost:5173/foundations/typography (verified, light mode; paper bg)
- **Manifest row**: `manifest.ts:478-483` — content page (NO `hero: true`), background inherits `CATEGORY_DEFAULT_BG.foundations = "paper"` (manifest.ts:182). Subpath chip resolves via `SUBPATHS["foundations/typography"] = "/foundations/typography"` (manifest.ts:208).

## Verdict by axis

### (1) DEMO CONGRUENCE — PARTIAL
The page DOES exercise the full √φ ladder (18 rungs, typography.vue:18-37) AND activates the three audacious peaks (`display-audacious`/`-hero`/`-mega`, typography.vue:43-47) the flat table historically never showed — this is the W-DEMO-DESIGN intent and it is genuinely a designed editorial specimen, not a spec sheet. BUT typography is a FOUNDATIONS token page with no component API to exercise — there is no contextual switching, no animation affordance beyond the passive `.scroll-cascade` reveal, no dock API surface to demonstrate. Within the "type specimen" frame it is congruent; against the BD north-star bar ("HIGH animation affordance for EVERY component; leverage the dock APIs") it is thin BY THE PAGE'S NATURE.

### (2) COMPONENT ABILITY — FAIL (thin/flat)
Live probe: ZERO interactive glass-ui components in the body — `hasTabs:false`, `hasButtons:false`, `hasDockInPage:false`, `hasProcedural:false`, `bodyButtons:0`. The page composes only demo-chassis primitives (`StoryPage`/`StorySection`/`ShowcaseFrame`) + raw `<span>`/`<div>` type. It does NOT "deftly compose a SERIES of glass-ui components (docks/cards/tabs/buttons/procedural-anims)" — the prompt's explicit bar. Opportunities the page ignores:
  - A `<SegmentedTabs>` to switch the ladder VIEW (e.g. display | text | mono families, or px | rem | ratio readout) — the canonical contextual-switch the BD spec wants.
  - A `<DockStack mode="facets">` rail to flip register/specimen context (the new dock contextual-switching API named in the prompt).
  - A live `<TypewriterText>` / `useStaggerReveal` / `SplitChars` specimen — glass-ui SHIPS these motion primitives and a TYPOGRAPHY page is their natural home, yet none appear (the one place per-glyph stagger belongs).
  - The peaks could PLAY (a `<StoryPlayButton>`-driven count-up on the `352` via `useCountup`/`useAnimatedNumber`) instead of a static number.

### (3) GLASS SUFFUSION — FAIL (flat, not over a live colorful field)
The background is the static `paper` wash (`bgKind:"story-hero-bg story-bg-paper paper-grain-overlay story-hero-bg--bleed"`, `auroraPresent:false`). The "Audacious peaks" + "Signature glyph" frames use `tier="field"` (transparent — confirmed `bg:rgba(0,0,0,0)`), whose WHOLE POINT (ShowcaseFrame.vue:17-22, the BG-2 black-plate kill) is to let glass float over a LIVE field — but here there is NO live field behind them, only the outer `glass-resting` card's own near-cream plate over flat paper. So the glass morphism (the six-layer optical composite the north-star binds) does NOT read — there is nothing colorful to refract/saturate. The prompt's bar ("glass demos over COLORFUL aurora backgrounds") is unmet. PAPER morphism IS present and apt (paper-grain wash + mono caption bands) — that half is fine — but the page is mono-substrate where the BD vision wants the GLASS+aurora pairing demonstrated.

### (4) STRUCTURE — FAIL (one card wraps everything; sub-sections NOT in own cards)
Live DOM: ONE outer `glass-resting` card (`story-hero-card--page`, 1152×3710) contains ALL FOUR sections (`sectionCount:4`). The user-mandate "each sub-section in its OWN glassy card" is NOT met — "Audacious peaks", "The graded ladder", "Signature glyph" are bare `<StorySection>` blocks sharing the single wrapper card, divided only by hairline `--configurator-divider` rules. The graded-ladder ShowcaseFrame is `tier="quiet"` (a faint `bg-card/40` plate — the ONLY frame with any plate), the rest are transparent. Main card area: the article is bound to `--story-page-max-inline: 72rem` (1152px on a 1440px viewport) — adequate but the BD bar ("main card area BIGGER — more screen space") suggests the current 72rem ceiling + the heavy outer-card padding leaves the type cramped relative to the available width.

### (5) PATH-LABEL — PASS
Rendered chip is `/foundations/typography` in Fira Code (the standardized route-form). Note an INCONSISTENCY worth flagging: `manifest.ts:338` declares the foundations category subpath as `@mkbabb/glass-ui/styles`, but the per-route `SUBPATHS` map (manifest.ts:208) overrides to `/foundations/typography`. The prompt asks to "standardize the import-path label" — this page already shows the route form; if the standard is the npm import-path (`@mkbabb/glass-ui/styles`), this page DIVERGES. Decide ONE canon repo-wide.

### (6) LANGUAGE — tighten
Mostly tight, but:
  - typography.vue:65-70 blurb "The display register is a chassis affordance; the ladder below grades, never cliffs." — "is a chassis affordance" is internal jargon leaking to the demo surface; "grades, never cliffs" is cute but opaque to a consumer. Tighten to plain description.
  - The SFC comment block (typography.vue:1-11, 39-42, 52-56, 73-76, 96-98) is exhaustive internal rationale — fine as code comments, but the on-surface caption ".text-display-audacious · 352px peak — the fast.com number" (typography.vue:44) editorializes ("the fast.com number") where a plain "352px peak" suffices.

### (7) BUGS
  - **CAPTION LIES (real bug)**: typography.vue:120 caption reads ".fourier-f — Plus Jakarta Sans display italic, **viz-fourier red**" but `.fourier-f` (`src/styles/typography/utilities.css:89`) declares NO color and resolves to `rgb(28,25,23)` = warm-ink `--foreground` (live-confirmed `fourierFColor:"rgb(28, 25, 23)"`). The ℱ glyph renders BLACK, not red. Either color the glyph (`color: var(--viz-fourier)`) or fix the caption. (Other consumers — intro.vue:69, hero.vue:95 — also use `.fourier-f` as ink, so red was never its identity; the caption is simply wrong.)
  - No dead/broken animation found; `.scroll-cascade` reveal binds (`sectionsHaveCascade:true`).
