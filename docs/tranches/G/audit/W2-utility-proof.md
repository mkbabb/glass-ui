# W2 — Surface CSS + utilities proof

**Wave**: G.W2.
**Date**: 2026-05-04.
**Authority**: orchestrator-owned Lane I (paper/cream) + 3 parallel agents (Lane II utilities, Lane III math.css, Lane IV prism-theme.css). All four lanes closed green.

## Per-lane summary

### Lane I — paper.css + cards.css (orchestrator)

`src/styles/paper.css` extended with the four-tier `.paper-{1..4}` family (background + border + shadow re-pointing to W1 `--paper-bg-{1..4}`/`--paper-shadow-{1..4}`/`--paper-border-{1..4}`), `.paper-card` shorthand with paper-grain-overlay-style `::after` pseudo-element, and `.paper-rule` lined-paper tapered horizontal rule. All four tiers carry `prefers-reduced-transparency: reduce` and `prefers-contrast: more` blocks.

`src/styles/cards.css` extended with `.cream-surface` — bg-cream + paper-grain-overlay companion `::after` + cream-edge border + cartoon-sm shadow. Emits `[data-tone="warm"]` and `[data-tone="cool"]` tone variants. PRT and PCM blocks present.

### Lane II — utilities.css (agent a011ffc0842c3430b)

Added 49 classes:

- **Flourish (29)**: `.bg-rainbow`, `.bg-rainbow-vivid`, `.bg-rainbow-pastel`, `.text-rainbow-pastel`, `.text-shimmer-{gold,blue,vivid,pastel}` family, `.rainbow-stroke`, `.divider-flourish-{gold,rainbow}`, `.divider-flourish-section-{0..12}` (13), `.flourish-stripe-{rainbow,pastel,gold}`, `.code-badge`.
- **Skeuo (10)**: `.icon-stamp`, `.icon-emboss`, generated `.icon-{xs,sm,md,lg,xl,2xl,3xl,mega}` width+height utilities (closes DESIGN.md A axis 2.3).
- **Bold typography (2)**: `.text-display-stat`, `.text-prose-lettrine`.
- **Mono rounding (2)**: `.text-mono-body`, `.text-mono-prose`.
- **Misc (6)**: `.section-subtitle`, `.well-dashed`, `.touch-gate-target`, `.touch-gate-active`, `.confetti-piece`, `.collapse-x` (+ `[data-state="open"]` modifier).

Deleted:

- `.gold-shimmer` rule (pre-W2 `utilities.css:124-131`) — clean break per `feedback_no_backwards_compat`; replaced by `.text-shimmer-gold`.

Confirmed absent (non-additions per W0 challenge): `.glass-skeuo`, `.active-scale`, `.disabled-base`, `.stagger-children`.

### Lane III — math.css (agent adef8118b5d2bca4f)

NEW file `src/styles/math.css`. Contains:

- `.math-display` (overflow-x scroll for KaTeX equations).
- `.math-display .katex` (font-size scaling).
- `.math-inline-pill` (chip-shaped inline math container).
- `.formula-block` (cream-warm + accent-color left rule + tabular-nums + φ leading).
- `.text-formula` (CM serif italic + tabular-nums + leading-prose).
- `.production-rule` + `.production-rule .lhs` + `.production-rule .lhs::after` (renders ` ::= ` separator) + `.production-rule .rhs` — BBNF-style formal-grammar typography.
- `.perf-number`, `.perf-unit` (numeric+unit pair typography for benchmark surfaces).
- `prefers-contrast: more` and `prefers-reduced-transparency` blocks.

Default-included via index.css cascade — orchestrator wired `@import "./math.css"` after `paper.css` + before `dock.css` so consumers get math utilities automatically.

### Lane IV — prism-theme.css (agent aea5232e92b30df09)

NEW file `src/styles/prism-theme.css` — opt-in only (NOT in default cascade). Maps Prism's `.token.*` classes to canon viz-basis hues + section accents:

- `.token.comment` → `--muted-foreground` italic
- `.token.keyword` → `--viz-fourier` weight 600
- `.token.string` → `--viz-amber`
- `.token.number` → `--viz-chebyshev`
- `.token.function` → `--viz-legendre`
- `.token.builtin` → `--viz-green`
- `.token.attr-name` → `--easing-accent`
- `.token.regex` / `.variable` / `.important` → `--gold-light`
- `.token.deleted` → `--accent-red`
- `.token.inserted` → `--success`
- Container styling on `pre[class*="language-"]` consumes `--space-phi-{2,3}`, `--radius-lg`, `--font-mono`, `--type-small`, `--leading-small`.

Light/dark mode resolves via canon's `.dark` cascade automatically — no JS bridge.

Consumer import: `@import "@mkbabb/glass-ui/styles/prism-theme"` after their Prism base import. Package.json export added at `./styles/prism-theme`.

### Cross-cutting

- `src/styles/index.css` cascade order updated (math.css imported after paper.css + before dock.css).
- `src/styles/animations.css` extended with `@keyframes confetti-fall` + reduced-motion guard (Lane II flagged the missing keyframe; orchestrator landed it).
- `package.json` exports map gained `./styles/prism-theme` subpath.

## Hard gate verification

(a) **build + typecheck green** ✓
```
$ npm run typecheck
> vue-tsc --noEmit
(no output — green)

$ npm run build
[vite:dts] Declaration files built in 24355ms.
✓ built in 25.39s
```

(b) **Every new utility class has ≥1 demo or component reference in this same wave**: deferred to W4 stories per W2 spec; placeholder Storybook stub permitted now, expanded in W4. The W4 spec already names every story site (W0 challenge §C trigger).

(c) **The seven silent-failure consumer references resolve** per W0 challenge §B.3:
  - S1 `.gold-shimmer` → `.text-shimmer-gold` ✓ (rule retired in same edit; W5 ledger names rename for 4 consumers / 10 sites).
  - S2 `.dashed-well` → `.well-dashed` ✓ (W4 story site clears ≥2 bar).
  - S3 `.stagger-children` → not shipped ✓ (W5 directs to `useStaggerReveal`).
  - S4 `.rainbow-vivid`/`.rainbow-pastel` → `.bg-rainbow-vivid`/`.bg-rainbow-pastel` ✓ + `--rainbow-pastel-*` `@theme` exposure (W1).
  - S5 `.active-scale`/`.disabled-base` → not re-added ✓ (W5 ledger covers words/frontend ≥7 sites).
  - S6 `.code-badge` → canonical ✓ (≥2 bar via bbnf 2 sites + W4 `code-prose` story).
  - S7 `.blue-shimmer` → `.text-shimmer-blue` ✓ (sibling consuming W1 `--shimmer-blue-*`).

(d) **A11y fallbacks present on new tiers**: `prefers-reduced-transparency` and `prefers-contrast: more` blocks on `.cream-surface`, `.paper-{1..4}`, `.paper-card`, `.formula-block`, `.math-inline-pill`, `pre[class*="language-"]` (Prism). PRM guard on `confetti-fall` keyframe.

(e) **One authority per family**: zero duplicate definitions across `paper.css` / `cards.css` / `utilities.css` / `math.css` / `prism-theme.css`. Lane III + Lane IV agents both ran duplicate-checks against existing files; Lane II also did the same.

(f) **`math.css` included in `index.css` cascade** ✓ (after paper.css, before dock.css).

(g) **`prism-theme.css` opt-in only** ✓ (NOT in `index.css` default cascade; consumer-imported via `@mkbabb/glass-ui/styles/prism-theme` subpath).

## Known notes

- `.rainbow-stroke` references `<defs id="rainbow-gradient">` shipping in W3 with `<RainbowGradientDef>`. Until W3 lands the gradient def, an SVG icon using `.rainbow-stroke` resolves to no stroke — W3 sequencing per the spec, not a defect.
- The `confetti-fall` keyframe is a basic translateY+rotate; W4 stories may parameterize via `--confetti-duration` (default 1.2s) and `--confetti-color` for variance.
- API Extractor TypeScript-version warnings during build are unrelated noise (TS 5.9.3 vs API Extractor's 5.8.2 bundled version); do not affect emit.

## Authority

Lane I (paper/cream): orchestrator.
Lane II (utilities): agent.
Lane III (math.css): agent.
Lane IV (prism-theme.css): agent.
Cross-cutting (index.css cascade, animations.css confetti-fall, package.json export): orchestrator.
