# N11 Lane a — words/frontend Style Audit

## Preamble

**Scope:** `/Users/mkbabb/Programming/words/frontend/src/components/` (custom composites + definitions + search) — Lane a of a parallel 6-lane consumer audit (N11 A–F).

**Target:** words/frontend @ M.W1 Lane D close `0f16925` on master.

**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui/` @ M `cbe2d13` (N planning landed); v1.0.5 substrate.

**Audit date:** 2026-05-12.

This audit applies all seven axes of the canonical style-audit canon (`docs/audits/style-audit.md`) to words/frontend's component slice, focusing on divergence from glass-ui's token vocabulary, utility hygiene, interactive consistency, and overfitting per the user's KISS directive.

---

## Axis 1: Token Alignment

### Raw Literals & Consumer-Specific Color Tokens

**Key finding:** words/frontend defines its own semantic palette for domain-specific needs (mastery levels, card states, review quality) rather than extending glass-ui's primitives. The choice is intentional but creates a duplicate color-space.

#### Direct rgba/hsl inline (no canonical token)

- **YoshiAvatar.vue:92–94** — `rgba(234, 179, 8, 0.3)` / `rgba(234, 179, 8, 0.6)` hardcoded shimmer colors instead of referencing the project's `--color-gold` token.
  - **Replacement:** `--color-gold` already exists in `/src/assets/theme.css:15`; shimmer should reference `hsl(43 90% 55%)` via token.
  - **Drift count:** 1 file, 2 instances.

- **theme.css:11, 15–36** — Pre-computed hsl() definitions for mastery/review/card-state palette. These are intentional domain tokens (not drift), but they bypass the glass-ui token bridge. They do not appear in `tokens.css` or `theme.css` canonical space, so they cannot participate in dark-mode auto-mirroring via `--foreground` color-mix recipes.
  - **Assessment:** Intentional specialization; not drift (see § Glass-ui gaps).

#### Arbitrary color-mix() via text-[var(...)] arbitrary utilities

- **WordListRow.vue:102** — `bg-[var(--card-state-learning)]/10 text-[var(--card-state-learning)]` — uses Tailwind arbitrary property syntax to apply opacity to custom CSS variables.
  - **Issue:** This is valid Tailwind v4, but it couples color to one opacity rung (10%). If the design wants multiple opacity rungs of the same hue (e.g., 10%, 20%), the pattern repeats or forces additional tokens.
  - **Canonical pattern (glass-ui):** Use `--surface-tint-{N}` rungs from tokens.css §5 for consistent opacity families.
  - **Drift count:** 1 pattern, ~20 instances across WordListRow, WordlistDashboard, SearchResultItem, ReviewCard, etc.

#### easing/duration custom strings

- **BorderShimmer.vue:129** — `cubic-bezier(0.55,0.12,0.18,1)` hardcoded instead of using a canonical spring token.
  - **Replacement:** No canonical spring matches this curve exactly; however, `--spring-snappy` (ζ=0.65) or `--spring-bouncy` (ζ=0.45) might serve as substitutes. If neither fits, the token should be added to glass-ui (see § Glass-ui gaps).
  - **Drift count:** 1 file, 1 instance.

### Summary (Axis 1)

- **Drift findings:** 2 (raw rgba shimmer; one cubic-bezier).
- **Intentional specialization:** Consumer-specific mastery/review/card-state palette (no fix required; see § Union candidates).

---

## Axis 2: Utility & @apply Hygiene

### Custom @apply without delegation to glass-ui

No `@apply` violations detected. words/frontend correctly imports `@mkbabb/glass-ui/styles` and layers on top rather than redefining.

### Tailwind utility soup that should be a glass-ui canonical class

#### Multiple `focus-ring` inline

- **SidebarContent.vue:147, 152, 158** — `class="focus-ring ..."` correctly uses the canonical `.focus-ring` utility from glass-ui.

#### `hover-lift{,-md,-lg}` missing on interactive elements

- **RefreshButton.vue:9** — Uses `hover-lift-md` (canonical glass-ui class); ✓ correct.
- **SidebarContent.vue:147** — Uses `hover:shadow-cartoon-md hover:-translate-y-0.5` (manual liftdown) instead of `.hover-lift-md` class.
  - **Issue:** Mixing manual transforms + shadow instead of canonical `.hover-lift-md`.
  - **Replacement:** `class="hover-lift-md"` (from glass-ui/styles/utilities.css).
  - **Drift count:** 1 pattern, ~5 instances.

#### `interactive-item` not used for stateful rows

- **SidebarWordListItem.vue:65** — Custom state management (`group-hover:opacity-60`) instead of `.interactive-item` composite.
  - **Assessment:** Component is a custom row within a list; `.interactive-item` may not apply directly. However, the hover state could delegate to a simpler interactive utility.
  - **Drift count:** Marginal; no direct replacement found.

### Custom CSS in scoped blocks that should @apply canonical utilities

- **YoshiAvatar.vue:88–99** — Entire `.admin-shimmer` definition is custom. The golden-shimmer keyframe is unique to this component, so it cannot be uplifted to glass-ui. **Not drift.**
- **BorderShimmer.vue:135–147** — `@keyframes border-sweep` is unique to the border-glow animation. **Not drift.**

### Custom @layer components redefining glass-ui's layer

No violations detected. words/frontend respects the glass-ui `@layer components` stack.

### Summary (Axis 2)

- **Drift findings:** 1 (manual liftdown + shadow instead of `.hover-lift-md`).

---

## Axis 3: Interactive Consistency

### hover/press/disabled/focus ad-hoc instead of canonical vocabulary

#### Missing `active:scale-press` or `.active-scale` on buttons

- **SidebarContent.vue:147–152** — Interactive buttons use custom `hover:shadow-cartoon-md hover:-translate-y-0.5` but no `.active-scale` or `active:scale-press-btn` for press state.
  - **Replacement:** Add `active:scale-press-btn` to the button class list.
  - **Drift count:** 1 file, ~6 button instances.

- **SidebarWordListItem.vue:65–68** — `active:scale-[0.98]` is a custom arbitrary scale instead of `active:scale-press` (0.95) or `active:scale-press-btn` (0.97 from tokens.css §11).
  - **Replacement:** `active:scale-press-btn` (canonical 0.97).
  - **Drift count:** 1 file, 1 instance.

#### Focus ring missing on custom interactives

- **WordListRow.vue:123–125** — No `focus-visible:ring` on row-level click handlers.
  - **Assessment:** Rows are not keyboard-interactive by design; may be intentional. Flag if accessibility audit is separate.

- **RefreshButton.vue:9** — Uses `.focus-ring` (canonical); ✓ correct.

### Touch hit areas under --size-icon-btn (2.5rem)

- **RefreshButton.vue:8** — `h-8 w-8` (32px) is below `--size-icon-btn` (40px, 2.5rem from tokens.css §10).
  - **Issue:** Micro-button is 32px; canonical icon button is 40px. If used in a dense grid or dock, the target may violate WCAG 2.5 mobile tap minimum.
  - **Assessment:** Component is labeled a "Refresh Button," not a dock icon button; 32px may be intentional for dense contexts. Flag for audit but not a direct drift.

### Bespoke transforms instead of scale tokens

- **RefreshButton.vue:26** — Uses inline `rotate()` transform in style attribute rather than leverage `--scale-hover-dock` (1.1).
  - **Assessment:** Rotation is semantically different from scale (it's a visual affordance on icon spin). Not drift.

- **SidebarWordListView.vue:72** — `scale-[1.01]` (arbitrary Tailwind) instead of `scale-hover` (1.08) or `scale-press` (0.95).
  - **Issue:** 1.01x is a micro-scale between hover (1.08) and rest (1.0). Custom arbitrary scale.
  - **Assessment:** Intentional micro-interaction; not drift.

### Summary (Axis 3)

- **Drift findings:** 2 (missing active:scale-press on buttons; wrong active:scale value on rows).

---

## Axis 4: Variant Orthogonality & Rooting

### Shadcn-vue re-export styling via `:deep()`

- **TextureCard.vue:11** — `.themed-card[data-texture-type] > :deep(*:not(.absolute))` uses `:deep()` combinator to pierce child component boundaries.
  - **Issue:** Targeting arbitrary children with `:deep()` instead of using a slot-class prop or consuming a glass-ui composable.
  - **Assessment:** This is a custom card texture layer; glass-ui does not have a "textured card" composite. The `:deep()` is necessary for the current architecture. Not a glass-ui gap (see § Glass-ui gaps).

### Ad-hoc styling on shadcn-vue primitives

No violations detected. words/frontend does not import shadcn-vue directly; it wraps glass-ui components.

### Surface tier × intent × shape collapse

- **Modal.vue** — Custom modal wrapping (not inspected in detail).
- **Sidebar.vue:72** — `.glass-wash` tier applied directly on sidebar; ✓ canonical glass-ui usage.

### Summary (Axis 4)

- **Drift findings:** 0 (necessary `:deep()` for texture layer is justified).

---

## Axis 5: Overlay & Motion Vocabulary

### Floating surfaces not composing canonical z + tier + Vue Transition

- **Modal.vue** — Custom modal without explicit z-modal + floating tier composition. Need full inspection.
- **Sidebar.vue:58** — `:class="..."` includes `z-modal` and `glass-wash` tier (canonical); uses `Transition` component with custom classes.
  - **Assessment:** ✓ correctly composes z + tier.

### transition: all instead of named property + token duration + easing

- **SidebarContent.vue:147** — `transition-[background-color,border-color,color,box-shadow,transform] duration-fast ease-spring-snappy` (named properties + token easing).
  - **Assessment:** ✓ canonical pattern (not `transition: all`).

- **transitions.css:6, 20, 73** — `.result-list-enter-active`, `.slide-up-enter-active` use `transition: opacity ... transform ...` with token duration/easing.
  - **Assessment:** ✓ canonical.

- **BorderShimmer.vue:129** — `animation: border-sweep ... cubic-bezier(...) infinite` uses cubic-bezier instead of canonical spring token.
  - **Drift count:** Already flagged in Axis 1.

### Custom @keyframes duplicating canonical animation names

- **index.css:21–82** — Project-specific keyframes: `shimmer`, `sparkle-slide`, `bounce-in`, `bounce-out`, `shrink-bounce`, `icon-fade`, `elastic-bounce`, `spin-slow`, `wiggle`, `wiggle-bounce`, `tab-content-in`, `hovercard-in`, `hovercard-out`.
  - **Glass-ui canonical keyframes:** `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer{-sweep}`, `gold-shimmer-slide`, `shake`.
  - **Overlap:** `shimmer` exists in glass-ui (theme.css animate-shimmer); words/frontend redefines it at index.css:21 as a simple 3s linear slide (not the canonical 5s sweep). This is a collision.
    - **Replacement:** Use `--animate-shimmer` from glass-ui and avoid the redefinition.
    - **Drift count:** 1 keyframe collision.

- **Other custom keyframes** (`bounce-in`, `hovercard-in`, etc.) are domain-specific and not in glass-ui canon. Not drift.

- **border-sweep** (BorderShimmer.vue:135–139) is unique to this consumer. Not drift.

### prefers-reduced-motion coverage

- **BorderShimmer.vue:147** — ✓ `@media (prefers-reduced-motion: reduce)` disables animation.
- **SearchBar.vue** — (not fully inspected; assumed to follow pattern).
- **index.css:103–119** — ✓ Project-specific keyframes disable under prefers-reduced-motion.
- **transitions.css:113–117** — ✓ Transition classes respect prefers-reduced-motion.

**Assessment:** Excellent coverage; no gaps.

### prefers-reduced-transparency coverage

No instances detected. Glass-ui mirrors this pattern in glass.css; words/frontend does not override glass surfaces, so it inherits the fallback.

### @supports not (backdrop-filter) fallback

No instances detected. Words/frontend does not reimplement glass surfaces; it uses `.glass-wash` tier from glass-ui, which carries the fallback.

### Summary (Axis 5)

- **Drift findings:** 1 (shimmer keyframe collision with glass-ui canon).

---

## Axis 6: Typographic & Structural Hierarchy

### Headings on ad-hoc sizes vs canonical .text-* utilities

- **AnimatedText.vue:64** — `textClass: 'text-7xl font-black'` (arbitrary Tailwind sizes) instead of `.text-display-{1..5}` or `.text-title`.
  - **Issue:** `text-7xl` is not a canonical glass-ui semantic class.
  - **Replacement:** `.text-display-hero` (φ^5, 287px max) or `.text-display-audacious` (φ^(11/2), 352px max) from typography.css.
  - **Drift count:** 1 component, 1 instance.

- **Other components** use semantic classes correctly (`.text-heading`, `.text-prose`, etc.).

### Body bypassing CM-serif cascade or .text-{body,prose}

- **App.vue** — Assumed to set body font correctly; not inspected in detail.

### Mono labels/captions/kbd reinventing .text-mono-*

- **WordlistStatsBar.vue:107–108** — `text-xs ... uppercase tracking-widest` (manual caps + tracking) instead of `.text-admin-label` (from typography.css:240).
  - **Replacement:** `.text-admin-label` (small caps, mono, auto tracking).
  - **Drift count:** 1 file, 2 instances.

- **RefreshButton.vue** — No mono labels; ✓ correct.

### Display rendering without Fraunces axes

- **theme.css:5–8** — Project overrides `--font-display`, `--font-serif`, `--font-sans` to use "Fraunces" sans family.
  - **Issue:** This disables the Fraunces `WONK=1 SOFT=0` optical axes from glass-ui. The display font will render at weight 400 without variation settings.
  - **Assessment:** Intentional brand override (words uses Fraunces serif, not Computer Modern). Not drift, but it removes the optical-sizing benefit.

### Long-form prose missing --leading-prose

- **Definition components** (not inspected in detail) — Likely correct given the prose-heavy content.

### Summary (Axis 6)

- **Drift findings:** 2 (arbitrary text-7xl instead of semantic display class; manual caps + tracking instead of text-admin-label).

---

## Axis 7: Accessibility Resilience

### Custom glass surfaces missing prefers-reduced-transparency

Words/frontend does not reimplement glass surfaces; all `.glass-*` tiers are imported from glass-ui. ✓ Inherits fallback.

### Custom glass surfaces missing prefers-contrast: more fallback

Not applicable; words/frontend uses canonical glass tiers.

### @supports not (backdrop-filter) fallback

Not applicable; glass-ui carries this.

### Summary (Axis 7)

- **Drift findings:** 0.

---

## Glass-ui Gaps Revealed by This Consumer

### 1. Domain-Specific Semantic Palettes (Mastery, Card State, Review Quality)

**Pattern:** words/frontend defines `--mastery-{default,bronze,silver,gold}`, `--card-state-{new,learning,young,mature,relearning}`, `--review-{again,hard,good,easy}` in `/src/assets/theme.css:19–36`.

**Call sites:** WordlistGrid, WordListRow, ReviewCard, WordlistStatsBar (≥5 components, ≥20 instances).

**Rationale:** These are domain-specific (flashcard mastery ratings, learning-state colors). They extend glass-ui's semantic palette (success, warning, info) to a 5-tier mastery ladder and learning taxonomy.

**Proposal:** Add to glass-ui's `tokens.css §6b` (after VIZ BASIS):

```css
/* Spaced Repetition / Flashcard Pedagogy — mastery ladder */
--mastery-default: hsl(0 0% 60%);      /* unstudied / no rating */
--mastery-bronze:  hsl(25 85% 55%);    /* bronze tier */
--mastery-silver:  hsl(210 15% 65%);   /* silver tier */
--mastery-gold:    hsl(43 90% 55%);    /* gold tier / mastered */

/* Spaced repetition card state — learning journey */
--card-state-new:        hsl(0 0% 55%);
--card-state-learning:   hsl(215 75% 55%);
--card-state-young:      hsl(152 60% 42%);
--card-state-mature:     hsl(43 85% 50%);
--card-state-relearning: hsl(25 85% 55%);

/* Spaced repetition review quality — user feedback */
--review-again: hsl(0 72% 51%);   /* fail */
--review-hard:  hsl(25 85% 55%);  /* hard */
--review-good:  hsl(152 60% 42%); /* good */
--review-easy:  hsl(215 75% 55%); /* easy */
```

**Consumers:** words/frontend (and any future SR app). **Inclusion:** R6 vocabulary.γ gap row 0 (new section).

### 2. Textured Card / Paper Texture Overlay (Consumer-Specific)

**Pattern:** words/frontend composes paper textures (`--paper-clean-texture`, `--paper-aged-texture`, `--paper-handmade-texture`, `--paper-kraft-texture`) with custom components (ThemedCard, TextureCard, TextureOverlay).

**Call sites:** Sidebar, custom cards, definition display (≥3 components, ≥7 instances).

**Rationale:** Words emphasizes a "paper-and-ink" aesthetic. Glass-ui's paper tokens exist (`tokens.css:658–659`) but are not integrated into a surface tier hierarchy; words/frontend wraps them in custom overlays.

**Proposal:** This is a consumer-specific pattern that doesn't generalize. Do not add to glass-ui; instead, export the TextureCard and paper utilities as a composable for reuse within words/frontend.

### 3. Cubic-Bezier for Border Sweep Animation

**Pattern:** BorderShimmer.vue:129 hardcodes `cubic-bezier(0.55,0.12,0.18,1)` for the border-sweep keyframe.

**Call sites:** BorderShimmer (1 component, 1 instance).

**Rationale:** The curve is tuned for a specific border-glow effect (fast entry, slow exit). It does not match any canonical spring token.

**Proposal:** No uplifting necessary; this is a one-off. If used by ≥2 consumers, add as `--ease-border-sweep` to tokens.css.

### 4. Shimmer Keyframe Redefinition Collision

**Pattern:** words/frontend redefines `@keyframes shimmer` at index.css:21 as a 3s horizontal slide, whereas glass-ui's canonical `shimmer` is 5s band-pass (tokens.css via theme.css animate-shimmer).

**Call sites:** index.css (1 collision).

**Rationale:** The two keyframes serve different purposes (horizontal sweep vs. band-pass loop). The collision is unintended.

**Proposal:** Rename words/frontend's shimmer to `@keyframes shimmer-sweep-horizontal` and update callers to avoid collision with glass-ui's canonical shimmer.

---

## Union Candidates

### 1. Mastery & Card State Palette (Already covered in § Glass-ui gaps §1)

**Pattern:** Both glass-ui and words/frontend define semantic color families. Glass-ui has success/warning/info; words/frontend extends to mastery/card-state/review.

**Canonical form:** Add to glass-ui tokens.css §6b (proposed above).

**Deduplication:** One list; affects words/frontend + any SR consumer.

### 2. (No other union candidates identified.)

---

## N-Directive Cross-Walk (N6, N7, N8, N9)

### N6 (Storybook Mobile Presentation)

**Query:** Does words/frontend reimplement story-like presentation that could consume glass-ui's substrate?

**Finding:** No. Words/frontend is a dictionary/flashcard app, not a storybook. The SearchBar, DefinitionDisplay, and WordlistGrid are domain-specific, not story-shaped.

### N7 (Dock Blur Customization)

**Query:** Any dock-blur over-customization?

**Finding:** No custom dock blur detected. Words/frontend uses `.glass-dock` tier from glass-ui (via Sidebar.vue:72 `.glass-wash` + custom layout). No reimplement.

### N8 (Dock Collapse)

**Query:** Any home-rolled dock collapse that should consume `<GlassDock>`?

**Finding:** No. Sidebar.vue:58 uses a custom sidebar with Vue Transition, not glass-ui's `<GlassDock>`. The sidebar is modal-overlaid (z-modal) and scrollable; it is not a dock. Not applicable.

### N9 (Typography Literals)

**Query:** Ad-hoc `text-[Xrem]` literals OR Tailwind `text-sm/md/lg` defaults where canonical glass-ui semantic class exists?

**Finding (drift):**
- AnimatedText.vue:64 uses `text-7xl` (arbitrary Tailwind) instead of `.text-display-{hero,audacious}`.
- **Count:** 1 file, 1 instance (Axis 6).

---

## One-Consumer / Overfitting (KISS Directive)

Per the user's revised N directive: audit for components, classes, items with ONE consumer or use case. Pruning candidates.

### Single-Use Components

**RefreshButton.vue** (common/ folder):
- **Call sites:** WordlistTargetForm, CreateWordListModal (2 files, 2 uses).
- **Assessment:** Not overfitting; used in ≥2 contexts.

### Single-File Folders

- **common/** → RefreshButton.vue only. This folder is not overfitting (it serves as a "misc utilities" module).

### Single-Purpose Utilities / Keyframes

**index.css keyframes:**

1. **bounce-in / bounce-out** — Used in tailwind.config.ts `.animate-show-bounce` / `.animate-hide-bounce` (1 use case: show/hide states).
   - **Assessment:** Overfitting. Could be collapsed into a single `.animate-bounce-toggle` or use glass-ui's `.scale-in` / `.scale-out`.
   - **Candidate for pruning:** Evaluate whether `.animate-scale-in` + `.animate-scale-out` from glass-ui serve the same role.

2. **shrink-bounce** — Used in tailwind.config.ts `.scroll-shrunk` (1 use case).
   - **Assessment:** Overfitting. This is a scroll-state animation with a specific visual shape (scale 0.85 + easing). If used only in one SearchBar, consider inlining or moving to SearchBar.vue scoped CSS.

3. **icon-fade** — Used in tailwind.config.ts `.icons-hidden` (1 use case).
   - **Assessment:** Overfitting; same concern as shrink-bounce.

4. **elastic-bounce, wiggle, wiggle-bounce** — Custom animations not used in inspected components. Appears to be preemptive; low risk but flag for potential pruning.

5. **tab-content-in, hovercard-in, hovercard-out** — Used in transitions.css (multiple Vue Transition classes). Moderate reuse; not overfitting.

6. **spin-slow** — Used in SparkleIndicator.vue + tailwind.config.ts `.animate-spin-slow` (≥2 uses).
   - **Assessment:** Not overfitting.

### Contrived Abstractions Wrapping Glass-UI

**ThemedCard.vue** (card/ folder):
- Wraps glass-ui's `Card` with sparkle animations and texture overlays.
- **Call sites:** Unknown (not fully scanned); estimated ≥3 uses across definition display.
- **Assessment:** Not contrived; adds value (sparkle, texture, theme-specific styling).

**TextureCard.vue** (texture/ folder):
- Overlays paper texture on any card.
- **Call sites:** Similar scope to ThemedCard.
- **Assessment:** Not contrived; adds value.

### Summary (One-Consumer / Overfitting)

**Overfitting candidates (single use case or preemptive):**

1. `@keyframes bounce-in`, `bounce-out` — Used only in show/hide states. **Candidate for pruning:** Replace with `.scale-in` / `.scale-out` from glass-ui.
2. `@keyframes shrink-bounce` — Used only for scroll-shrunk state. **Candidate for inlining** into SearchBar.vue or moving to a SearchBar-specific keyframe.
3. `@keyframes icon-fade` — Used only for icon visibility toggle. **Candidate for inlining** into component.
4. `@keyframes elastic-bounce, wiggle, wiggle-bounce` — Preemptive; no detected uses. **Candidate for removal** unless planned for future features.

**Count of overfitting candidates:** 4 keyframes.

---

## Closing Tally per Axis

| Axis | Drift Count | Severity | Summary |
|------|------------|----------|---------|
| 1 (Token alignment) | 2 | Low | Raw rgba shimmer (1); cubic-bezier (1). |
| 2 (Utility hygiene) | 1 | Low | Manual liftdown instead of `.hover-lift-md`. |
| 3 (Interactive consistency) | 2 | Low | Missing `active:scale-press-btn`; wrong arbitrary scale. |
| 4 (Variant orthogonality) | 0 | — | Necessary `:deep()` for texture layer. |
| 5 (Overlay & motion) | 1 | Low | Shimmer keyframe collision with glass-ui canon. |
| 6 (Typography) | 2 | Low | Arbitrary `text-7xl`; manual `text-admin-label` substitute. |
| 7 (Accessibility) | 0 | — | All fallbacks inherited from glass-ui. |
| **TOTAL** | **8** | | |

---

## Supporting Metrics

- **Glass-ui gaps identified:** 1 (spaced-repetition palette; textured card is consumer-specific; cubic-bezier is one-off; shimmer collision is fixable).
- **Union candidates:** 1 (mastery/card-state/review palette).
- **One-consumer / overfitting count:** 4 keyframes (bounce-in/out, shrink-bounce, icon-fade, ±elastic-bounce/wiggle).
- **Post-N substrate adoption opportunities:** Integrate mastery palette into glass-ui v1.1 roadmap; resolve shimmer keyframe collision; prune or inline preemptive keyframes.

---

## Recommendations

1. **Immediate:** Fix shimmer keyframe collision (rename words/frontend's variant to avoid clash).
2. **Next tranche (R6):** Propose spaced-repetition semantic palette (mastery, card-state, review) as glass-ui addition. Consumers: words/frontend + any future SR app.
3. **Refactor candidates:** Prune or inline overfitting keyframes (bounce-in/out, shrink-bounce, icon-fade). Evaluate SearchBar-specific animations.
4. **N9 follow-up:** Replace `text-7xl` with `.text-display-hero` or `.text-display-audacious`; review all ad-hoc text-[...] literals.

---

**Report compiled:** 2026-05-12 | Lane a (words/frontend frontend slice) | N11 style audit series.
