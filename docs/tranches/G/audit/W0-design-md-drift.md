# W0 — DESIGN.md Drift

Lane β. Read-only audit of `DESIGN.md` against canonical source-of-truth in
`src/styles/tokens.css`, `src/styles/theme.css`, `src/styles/typography.css`,
`src/styles/glass.css`, `src/styles/utilities.css`. Every numeric or
utility-claim that contradicts source is enumerated; landing wave for each
edit is noted.

Schema:

`section | DESIGN.md claim (line) | source truth (file:line) | edit type | landing wave`

## Drift rows

| # | Section | DESIGN.md claim (line) | Source truth (file:line) | Edit type | Landing wave |
|---|---|---|---|---|---|
| 1 | Z-Index Stack | `--z-hovercard 60` (DESIGN.md:114) | `--z-hovercard: 120` (tokens.css:101) | numeric | W1 |
| 2 | Z-Index Stack | `--z-tooltip 60` (DESIGN.md:115) | `--z-tooltip: 120` (tokens.css:102) | numeric | W1 |
| 3 | Z-Index Stack | `--z-popover 70` (DESIGN.md:116) | `--z-popover: 130` (tokens.css:103) | numeric | W1 |
| 4 | Z-Index Stack | `--z-modal 80` (DESIGN.md:117) | `--z-modal: 140` (tokens.css:104) | numeric | W1 |
| 5 | Z-Index Stack | `--z-fullscreen 90` (DESIGN.md:118) | `--z-fullscreen: 150` (tokens.css:105) | numeric | W1 |
| 6 | Z-Index Stack | `--z-toast 100` (DESIGN.md:119) | `--z-toast: 160` (tokens.css:106) | numeric | W1 |
| 7 | Z-Index Stack | `--z-toggle` not listed (DESIGN.md:104–122) | `--z-toggle: 999` (tokens.css:107) | token-name (missing row) | W1 |
| 8 | Z-Index Stack — Overlays table | `--z-modal (80)` repeated × 2; `--z-popover (70)`; `--z-hovercard (60)`; `--z-tooltip (60)`; `--z-overlay (50)` (DESIGN.md:564–570) | same canonical values as rows 1–6 above | numeric (same fix applies to overlays table) | W1 |
| 9 | Border Radius | `--radius 0.5rem (8 px)` default (DESIGN.md:129) | `--radius: 0.625rem` (tokens.css:114) — 10 px | numeric | W1 |
| 10 | Border Radius | `--radius-lg var(--radius)` listed as 8 px pixel (DESIGN.md:132) | `--radius-lg: var(--radius)` resolves to 10 px (tokens.css:118 → 114) | numeric (pixel column) | W1 |
| 11 | Border Radius | `--radius-input` listed as 8 px pixel (DESIGN.md:139) | resolves to 10 px (tokens.css:127) | numeric | W1 |
| 12 | Border Radius | `--radius-button` listed as 8 px pixel (DESIGN.md:140) | resolves to 10 px (tokens.css:128) | numeric | W1 |
| 13 | Border Radius | `--radius-xs` row missing (DESIGN.md:127–142) | `--radius-xs: 4px` (tokens.css:115) | token-name (missing row) | W1 |
| 14 | Shadows — Elevation scale | rgba(0,0,0,X) literals for `--shadow-xs`..`--shadow-2xl` (DESIGN.md:151–156) | `color-mix(in srgb, var(--shadow-color) X%, transparent)` (tokens.css:238–244) | utility-claim (token correctness) | W1 |
| 15 | Shadows — Cartoon | `rgba(0,0,0,0.1*)` literals for `--shadow-cartoon-{sm,md,lg}` (DESIGN.md:162–172) | `color-mix(in srgb, var(--shadow-color) X%, transparent)` (tokens.css:263–271) | utility-claim | W1 |
| 16 | Shadows — Card flat-offset | `--shadow-card: 4px 4px 0 0 rgba(0,0,0,0.50)` (DESIGN.md:178) | `--shadow-card: var(--shadow-cartoon)` = `3px 3px 0 0 color-mix(--foreground 8%)` (tokens.css:223, 247) | numeric + utility-claim | W1 |
| 17 | Shadows — Card flat-offset | `--shadow-card-hover: 5px 5px 0 0 rgba(0,0,0,0.60)` (DESIGN.md:179) | token does not exist; canon emits `--shadow-cartoon-hover` (tokens.css:224) | token-name (claim of non-existent token) | W1 |
| 18 | Shadows — Dock | `--shadow-dock: 0 4px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.15)` (DESIGN.md:185) | `0 4px 20px color-mix(--shadow-color 18%), 0 0 0 1px color-mix(--shadow-color 10%)` (tokens.css:251) | numeric + utility-claim | W1 |
| 19 | Shadows — Dock | `--shadow-dock-collapsed: 0 2px 12px rgba(0,0,0,0.20), 0 0 0 1px rgba(0,0,0,0.15)` (DESIGN.md:186) | `0 2px 12px color-mix(... 14%), 0 0 0 1px color-mix(... 10%)` (tokens.css:252) | numeric + utility-claim | W1 |
| 20 | Shadows — Glass-tier | `--glass-shadow-subtle: var(--shadow-sm), var(--glass-highlight)` (DESIGN.md:192) | matches (tokens.css:366) ✓ | n/a | — |
| 21 | Glass Surfaces — table | Subtle `Light opacity 30%` (DESIGN.md:206) | `--glass-opacity-subtle: 0.82` (tokens.css:282) | numeric | W1 |
| 22 | Glass Surfaces — table | Subtle `Dark opacity 42%` (DESIGN.md:206) | `--glass-opacity-subtle: 0.90` in `.dark` (tokens.css:559) | numeric | W1 |
| 23 | Glass Surfaces — table | Subtle blur `blur(4px) saturate(1.05)` (DESIGN.md:206) | radius `1px`, so `blur(1px) saturate(1.05)` (tokens.css:293, 299) — halved twice (v0.4 + v0.5.1) | numeric | W1 |
| 24 | Glass Surfaces — table | Default blur `blur(8px) saturate(1.2)` (DESIGN.md:207) | radius `3px`, no `saturate()` declared (tokens.css:294, 300) | numeric + utility-claim | W1 |
| 25 | Glass Surfaces — table | Medium blur `blur(12px) saturate(1.3)` (DESIGN.md:208) | radius `3px`, `blur(3px) saturate(1.3)` (tokens.css:295, 301) | numeric | W1 |
| 26 | Glass Surfaces — table | Elevated blur `blur(16px) saturate(1.4)` (DESIGN.md:209) | radius `4px`, `blur(4px) saturate(1.4)` (tokens.css:296, 302) | numeric | W1 |
| 27 | Glass Surfaces — grain | "Light mode: 3.5% opacity" (DESIGN.md:215) | `--glass-grain-opacity: 0.035` (tokens.css:332) ✓ | n/a | — |
| 28 | Glass Surfaces — dock blur | `--glass-blur-dock = blur(2px) saturate(1.025)` (DESIGN.md:218) | radius `1px`, `blur(1px) saturate(1.025)` (tokens.css:297, 305) | numeric | W1 |
| 29 | Typography — Class table | `.text-display-5` weight `300` (DESIGN.md:353) | weight `var(--font-display-weight)` = `400` (typography.css:22, 86); the per-rung 300/350 weights are not emitted | numeric (per-rung weight column) | W1 |
| 30 | Typography — Class table | `.text-display-4`..`.text-display` weight `350` (DESIGN.md:354–357) | all five emit `var(--font-display-weight)` = `400` (typography.css:78–126) | numeric | W1 |
| 31 | Typography — Class table | `.text-mono-caption` size `--type-caption` (DESIGN.md:366) | matches (typography.css:217–223) ✓ | n/a | — |
| 32 | Typography — Class table | `.text-mono-micro` row missing (DESIGN.md:351–368) | utility exists (typography.css:231–236) | utility-claim (missing row) | W1 |
| 33 | Typography — Class table | `.text-admin-label` row missing (DESIGN.md:351–368) | utility exists (typography.css:190–197) | utility-claim (missing row) | W1 |
| 34 | Typography — Class table | `.text-math` / `.text-math-body` rows missing (DESIGN.md:351–368) | utilities exist (typography.css:202–212) | utility-claim (missing row) | W1 |
| 35 | Typography — Class table | `.text-pane-title` row missing (DESIGN.md:351–368) | utility exists (typography.css:269–283) | utility-claim (missing row) | W1 |
| 36 | Typography — Class table | `.text-engraved` row missing (DESIGN.md:351–368) | utility exists (typography.css:310–316) | utility-claim (missing row) | W1 |
| 37 | Typography — Tracking | `--tracking-snug` row missing (DESIGN.md:295–301) | `--tracking-snug: -0.01em` (tokens.css:36, typography.css:51) | token-name (missing row) | W1 |
| 38 | Typography — Tokens table | `--font-brand-sans` row described in body but not in table (DESIGN.md:309) | `--font-brand-sans` (typography.css:17) ✓ canon | n/a (table inclusion is editorial) | — |
| 39 | Typography — Body | "`.dock-label` is pinned to `var(--font-display)`" (DESIGN.md:344, also DESIGN.md:511) | no `.dock-label` rule exists in `src/` (grep confirms zero hits in `src/components`, `src/styles`) | utility-claim (claims a class that does not exist) | W1 |
| 40 | Layout & Sizing — Icons | "Utility classes `.icon-xs`..`.icon-xl` set width + height" (DESIGN.md:637) | only the `--icon-{xs..xl}` tokens exist (tokens.css:408–412); no `@utility icon-*` rule and zero `.icon-{xs..xl}` rule emitted in `src/styles/*.css` | utility-claim (DESIGN claims utilities the source never generates) | W2 (W2 ships generated utilities; DESIGN.md docs sync in W1) |
| 41 | Layout & Sizing — Animation offsets | `--animation-slide-{sm,md,lg}` (DESIGN.md:696–699) | canon names them `--motion-slide-{sm,md,lg}` (tokens.css:378–380); no `--animation-slide-*` exists | token-name | W1 |
| 42 | Layout & Sizing — Stacking overlaps | `--stack-overlap-{sm,md,lg}` listed as canonical tokens (DESIGN.md:679–683) | tokens are not declared in `tokens.css`; only consumed as `var(--stack-overlap-*)` in `StackedIconGroup.vue:87–95` (no fallback) | token-name (missing token declarations OR drop claim) | W1 |
| 43 | Layout & Sizing — Divider colors | `--color-divider-{subtle,medium,strong}` listed as canonical tokens (DESIGN.md:661–665) | tokens are not declared in `tokens.css`; only the JS constants exist in `src/tokens.ts:26–30`, whose own comment claims to "Match `--color-divider-*` in tokens.css" | token-name (declare in CSS or correct the doc) | W1 |
| 44 | Color Palette — Status | `--color-status-active`, `--color-status-paused`, `--color-status-idle` (DESIGN.md:733–735) | not declared in `tokens.css`; canon uses `--success`, `--warning`, `--info`, `--muted-foreground` (tokens.css:215–217, 150) | token-name (use canonical names or declare aliases) | W1 |
| 45 | Color Palette — Gold | `--color-gold: hsl(43 74% 49%)` exposed as primary (DESIGN.md:741) | both `--gold` and `--color-gold` exist (tokens.css:447, 451); canon's primitive is `--gold`, with `--color-gold` as the `@theme` alias | token-name (DESIGN should name the primitive, then the alias) | W1 |
| 46 | Color Palette — Rainbow | "Rainbow vivid / pastel (7 hues each, 0° → 300°)" (DESIGN.md:746) | hue distribution is not a regular 0→300° sweep; canon uses `0,30,55,130,210,260,300` for vivid and `0,25,50,130,220,260,280` for pastel (tokens.css:458–472) | numeric | W1 |
| 47 | Color Palette — Blue shimmer | `--shimmer-blue-{dark,mid,light}` (DESIGN.md:752–755) | not declared in canon; consumer (`bbnf-lang/playground`) uses `.blue-shimmer` rule with hand-rolled gradient — silent failure (see `W0-silent-failures.md`) | token-name (declare or move claim) | W1 + W2 |
| 48 | Color Palette — Heatmap | `--heatmap-{1..10}-bg` and `--heatmap-{1..10}-fg` (DESIGN.md:760) | not declared in `tokens.css`; only D-tranche audit document references them | token-name | W1 |
| 49 | Color Palette — Section accents | `--accent-pink`, `--section-heading`, `--accent-red` not described as orphans/retirees (DESIGN.md:713–728 silent on them) | declared (tokens.css:195–197, 527–529) but synthesis (00-synthesis.md:13, G.md:96) names all three for retirement in W1 | token-name (post-W1 retirement requires DESIGN section) | W1 |
| 50 | Buttons — `.glass-btn` Hover | "20% foreground border, 15% foreground color" (DESIGN.md:433) | hover sets `border-color: color-mix(... --foreground 20%)`, `color: --foreground` (full opacity) (glass.css:127–128) | numeric (15% claim contradicts code) | W1 |
| 51 | Buttons — `.glass-btn` Disabled | "50% opacity" (DESIGN.md:436) | sets `opacity: 0.35` literal, not `--opacity-disabled` (glass.css:142) | numeric | W1 (also fix source to use `--opacity-disabled` if W1 owns hygiene) |
| 52 | Buttons — `.glass-btn` Focus | "`box-shadow: var(--focus-ring-shadow)`" (DESIGN.md:435) | uses `outline: var(--focus-ring-width) solid var(--ring); outline-offset: var(--focus-ring-width)` (glass.css:137–138) | utility-claim | W1 |
| 53 | Glass Surfaces — Convenience shorthands | `.glass-pill` is `glass-default + pill radius + press scale 0.97` (DESIGN.md:223) | rule must be verified against current `glass.css`; not located in glass.css:1–170 read; if absent, the bullet is a stale claim | utility-claim (verify, then either confirm or remove) | W1 |
| 54 | Motion — Vue Transition classes | `pop` enter `200 ms --spring-bouncy`, leave `200 ms --ease-out` (DESIGN.md:588) | claim must be verified against `transitions.css`; out-of-bounds for read-only β lane to assert source numerics here, flagging for orchestrator/lane α follow-up | utility-claim | W1 (defer verify) |
| 55 | Buttons — `.btn-pill` | "transition `all 200ms var(--ease-standard)`" (DESIGN.md:391) | canon declares an explicit per-property transition list (glass.css:162–168) — `all 200ms` claim is wrong, transition runs `--duration-fast` per token, multi-property | utility-claim | W1 |
| 56 | Component Catalog — Custom composites | "tabs (BouncyTabs, UnderlineTabs, BouncyToggle)" (DESIGN.md:772) | requires source verification; if any of the three are absent from `src/components/custom/`, this is a utility-claim drift | utility-claim (verify) | W1 (defer verify) |
| 57 | Runtime Tokens block | Mentions `chartHeights, chartMargin, chartColors, minWidthInputSm` only (DESIGN.md:818) | per G synthesis (#28), tranche G ships additional runtime exports (`spectrumColor`, `goldenShimmer`, `chartNeutrals`, `vizColorsHex`, `NAMED_EASING_BEZIER`); doc may need W3-close update, not W1 | utility-claim (forward) | W3 |

## Notable themes

- **Z-index drift** (rows 1–8): six rows + missing `--z-toggle`. DESIGN.md
  asserts the historical 60/70/80/90/100 stack; canon's 120/130/140/150/160
  stack landed in tranches prior to G. The Overlays table at DESIGN.md:564
  duplicates the same drift.
- **Glass-tier blur drift** (rows 23–26, 28): blur radii were halved in
  v0.4 (tranche N.W1) and again in v0.5.1 (O.W2). DESIGN.md still names the
  pre-halving radii (4/8/12/16 + dock 2). Saturation factor on the `default`
  tier is also incorrect (DESIGN claims `saturate(1.2)`; canon emits no
  saturate filter on default).
- **Glass-tier opacity drift** (rows 21–22): subtle tier opacity is 82%/90%,
  not 30%/42%. The 30% figure predates the warm-cream identity.
- **Card shadow drift** (rows 16–17): `--shadow-card` re-points to
  `--shadow-cartoon` (3px 3px 0 0, 8% foreground); DESIGN.md still describes
  the pre-warm-cream `4px 4px 0 0 rgba(0,0,0,0.50)`. `--shadow-card-hover`
  does not exist.
- **rgba vs color-mix**: DESIGN.md uses rgba(0,0,0,X) literals everywhere
  shadow values appear; canon uses `color-mix(in srgb, var(--shadow-color)
  X%, transparent)` so `--shadow` (and dark mode's white-tinted shadow) feed
  through the recipe. This is a token-correctness issue baked into many
  shadow rows.
- **Token name drift** (rows 41–43): `--motion-slide-*` (not
  `--animation-slide-*`); `--stack-overlap-*` undeclared but consumed;
  `--color-divider-*` undeclared but referenced in `tokens.ts` comment.
- **Phantom utility classes** (rows 39–40): DESIGN.md describes `.dock-label`
  and `.icon-{xs..xl}` as if they are emitted; neither is generated by
  `src/styles/*.css`. `.icon-{xs..mega}` is the canonical fix planned for
  W2; `.dock-label` should either be added or removed from the doc.

---

## Retirement targets

Dead-recipe + orphan-token call-site sweep. For each token / class / preset
block, counts cite literal grep hits across `src/`, `demo/`, and the six
consumer trees (speedtest, fourier-analysis/web, words/frontend,
keyframes.js, value.js, bbnf-lang/playground). Verbatim source-of-truth
comes from `tokens.css`, `theme.css`, `typography.css`, `utilities.css`.

| # | Token / class / preset | Declared in canon (file:line) | src/ refs | demo/ refs | Consumer refs | Status / decision |
|---|---|---|---|---|---|---|
| R1 | `--shadow:` (alias) | `tokens.css:174` (root), `tokens.css:510` (dark) | 2 — `theme.css:84` (`--color-shadow: var(--shadow)`), `utilities.css:74` (`.depth-text` `--depth-color-shadow: var(--shadow)`) | 0 | 8 — `bbnf-lang/playground/src/assets/styles/main.css:32, 34, 39, 41, 167, 170, 218, 221` (all `color-mix(... var(--shadow) X%)`) | **Not orphan.** Synthesis A axis 1.5 listed it as zero-consumer; this audit finds 2 src + 8 consumer call sites. **Flag for orchestrator** — retirement would break `.depth-text` and the `--color-shadow` `@theme` alias plus 8 bbnf-lang sites. Either retire and migrate, or document `--shadow` as the canonical foreground-shadow primitive. |
| R2 | `--accent-pink` | `tokens.css:195` (root), `tokens.css:527` (dark), `theme.css:104` (`--color-accent-pink` alias) | 0 | 0 | 4 — `fourier-analysis/web/src/components/morph/MorphShapePreview.vue:172, 173`, `MorphPhaseConfig.vue` (slider-color), `EditorControlsDock.vue:179` (`.is-rose --btn-hover-color`); plus consumer-side preset redeclarations in `fourier-overrides.css:94, 151, 184` | Synthesis names for retirement (G.md:96). Retiring deletes `tokens.css:195/527` and `theme.css:104`; consumer migration named in W5 ledger for `fourier-analysis/web` (4 component sites). Decision: **retire in W1**, name fourier consumer migration in W5. |
| R3 | `--section-heading` | `tokens.css:196` (root), `tokens.css:528` (dark), `theme.css:103` (`--color-section-heading` alias) | 0 | 0 | 5 — `fourier-analysis/web/src/styles/fourier-overrides.css:95, 152, 185` (consumer redeclarations); `fourier-analysis/web/e2e/paper-performance.spec.ts:44, 273` (CSS class `.section-heading`, not the variable — class lives in fourier-overrides too) | Variable consumed only by the consumer's own override file, which itself defines it. **Retire in W1**; name fourier consumer migration in W5. |
| R4 | `--accent-red` | `tokens.css:197` (root), `tokens.css:529` (dark), `theme.css:105` (`--color-accent-red` alias) | 0 | 0 | 16 — fourier-analysis/web 12 component-source sites (`MorphShapePreview.vue`, `MorphPhaseConfig.vue:29, 182, 183`, `FourierMorphSvg.vue:30`, `FourierMorphDemo.vue:31, 51`, `HarmonicLevelGrid.vue:68, 224, 233, 234, 263`); keyframes.js 6 preset-only sites (`demo/@/styles/style.css:10, 11, 43, 44, 54, 55`); bbnf-lang/playground 4 preset sites (`preset-bbnf.css:12, 13, 24, 25, 55, 56`) | **Flag for orchestrator.** Synthesis (00-synthesis.md:13, G.md:96) names retirement and frames `--accent-red` as a keyframes.js consumer brand. Audit finds the heaviest consumer is fourier-analysis/web with 12 in-component (not preset) sites. Retiring breaks fourier-analysis components. Decision needed: (a) retire in glass-ui as planned and write a fourier W5 migration, or (b) keep canonical and remove only the orphan claim. |
| R5 | `:root[data-typography-preset="brand-uniform-sans"]` block | `typography.css:58–63` | 0 | 0 | 1 — `speedtest/styles/tokens.css:9` (comment reference describing the preset shape, not an active selector) | **Retire in W1** (G.md:97 names it). The single match is a comment in speedtest tokens; no `<html data-typography-preset="brand-uniform-sans">` attribute in any consumer index.html or layout. The companion `brand-uniform-display` does not ship per G invariant. |
| R6 | `.depth-text` | `utilities.css:72–87` | 1 (its own declaration) | 0 — story may not exist | 4 — `keyframes.js/demo/@/components/custom/editor-shell/EditorStartScreen.vue:10, 17`; `words/frontend/src/components/custom/animation/AnimatedText.vue:4, 124, 143` (the consumer redeclares the rule locally with hand-rolled rgba shadows, so the canon recipe is silently overridden) | Lives in canon; consumed by 2 consumers (4 sites). Synthesis A axis 1.5 / 2.1 calls it "dead with zero in-source consumers" — accurate for src/, but 2 consumers reference it. words/frontend's local re-definition (`AnimatedText.vue:124–153`) means the canon recipe is being shadowed. Decision: **keep canonical**, but Synthesis Theme 3 says repurpose for `<DisplayHero>` + splash; W2/W3 owns. Note words consumer cleanup as a W5 ledger item. |
| R7 | `--shadow-skeuo-{raised,pressed}` and `.glass-skeuo` | not declared anywhere in canon | 0 | 0 | 0 (zero in any of the six consumers) | Confirmed **zero references** outside tranche planning docs. Per G invariant 7 + synthesis user-overlay #3, no bevel vocabulary lands. Already out of scope; no action required in W1 except keeping it out of DESIGN.md. |

## Cross-row contradictions

- **R1**: synthesis A axis 1.5 claims `--shadow:` is orphan; this audit
  finds 2 in-source sites + 8 consumer sites. Flagged for orchestrator
  decision before any W1 retirement work runs.
- **R4**: synthesis frames `--accent-red` as a keyframes.js consumer brand
  to justify retirement; audit finds fourier-analysis/web is the heavier
  consumer with 12 in-component sites, not just preset overrides.
  Retirement would force a fourier component migration the W5 ledger has
  not yet scoped. Flagged for orchestrator.
- **Row 39 (`.dock-label`)**: DESIGN.md describes the class as a real,
  pinned utility; no rule is emitted in any `src/styles/*.css`. Either the
  rule needs to be authored (out of W0/W1 scope; would belong in W2) or
  DESIGN.md should drop the description. Flagged for orchestrator.
