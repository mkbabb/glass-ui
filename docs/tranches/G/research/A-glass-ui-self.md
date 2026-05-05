# Tranche G — Research Lane A: glass-ui self

Read-only audit of `@mkbabb/glass-ui` against the seven axes of `docs/audits/style-audit.md`, applied to the library itself, with focus on what tranche F closed and what the new design-language ambitions (cream, colorful flourishes, mathematical, modern skeuomorphic, bold/audacious typography, audacious iconography) expose as gaps.

## Preamble

- F closed on 2026-05-02 (`docs/tranches/F/FINAL.md:2`). It hardened: dock as one component family, Tailwind v4 theme correctness, public-surface trim, Aurora runtime, brittle component contracts.
- F's residuals (`docs/tranches/F/audit/W6-residuals.md`) are P3 lifecycle, story-substrate polish, and tarball hygiene — none constrains the design-language axes G targets.
- The library's stated identity is already "warm cream + muted black, 13-stop jewel, cartoon offset shadows, paper-and-glass forward" (`tokens.css:3–6`) — so cream is the *baseline*, not net-new, and the audit is mostly about refining/exposing what's already implicit, plus filling math/skeuo/audacious gaps.

## 1. Self-audit drift (axes 1–7 from style-audit.md)

### Axis 1 — Token alignment

| # | File:line | Finding | Canonical replacement |
|---|---|---|---|
| 1.1 | `src/styles/utilities.css:168–169` | `.metric-badge` defaults `--metric-badge-blur` to literal `blur(8px) saturate(1.12)` — not a glass tier (subtle is 2px, default 6px). | Point at `var(--glass-blur-default)` or introduce `--glass-blur-badge` if a third magnitude is wanted. |
| 1.2 | `src/styles/utilities.css:206` | `.input-bar` hardcodes `backdrop-filter: blur(24px)` — no token reference, exceeds every defined tier (elevated is 8px). | Replace with `var(--glass-blur-elevated)` or define `--glass-blur-input-bar` in tokens.css. |
| 1.3 | `src/components/ui/button/index.ts:29` | Variant `ai` uses raw Tailwind `amber-500/15`, `amber-700`, `amber-400` literals. | Library already has `--viz-amber` (`tokens.css:205`), `--warning` (`tokens.css:216`), and `--gold` family (`tokens.css:411`). Pick one — `ai` is conceptually "warning-but-friendly" so `--viz-amber` is closest. Would also unify with `viz-fourier`/`viz-chebyshev` semantic intent. |
| 1.4 | `src/components/ui/button/index.ts:14, 16, 23, 31` | Hover variants use `bg-primary/90`, `bg-destructive/80`, `text-foreground/70`, `text-foreground/8`, etc. — opacity arithmetic without the `--border-opacity-{light,medium,strong}` scale. | These are color-mix on `--primary` — they're fine as a Tailwind idiom, but four-state constants should resolve to a `--state-*` token namespace if the goal is one source of truth. P3 since they're scoped to the CVA. |
| 1.5 | `src/styles/utilities.css:84` | `.depth-text` mixes `var(--shadow)` (a *color*) and `var(--shadow-color)` in the same rule. `--shadow` and `--shadow-color` both resolve to `var(--foreground)` (`tokens.css:174–175`); the duplication is dead. | Drop `--shadow`, keep `--shadow-color`. (Same fix lets us repurpose `--shadow` as a *real* shadow recipe alias if we ever want one.) |

### Axis 2 — Utility & `@apply` hygiene

| # | File:line | Finding | Canonical replacement |
|---|---|---|---|
| 2.1 | `src/styles/utilities.css:71–87` | `.depth-text` has zero in-source consumers (grep across `src/`, `demo/`). Defined, mapped to `--depth-color-*`, never used. Six-layer text-shadow recipe. | Either (a) consume it in a `text-display-emboss` story + the bold/audacious wave's `<DisplayHero>`, (b) delete it, or (c) recast it as the canonical "modern skeuo" text utility paired with a `@theme` mapping. G should pick (c) — see §2 cream/skeuo gaps. |
| 2.2 | `src/styles/typography.css:58–63` | `:root[data-typography-preset="brand-uniform-sans"]` block — no consumer in `src/` or `demo/`. Single-presence preset. | Either consume it in the configurator (currently the configurator only writes `--font-display`/`--font-serif`/etc., never the data attribute — verified: `demo/` has no `data-typography-preset` set), or move it to a consumer preset per `feedback_presets_in_consumer`. The library shipping a *named* preset goes against the memo unless every consumer reaches for the same one. |
| 2.3 | `DESIGN.md:637` claims `Utility classes .icon-xs..icon-xl set width + height.` | These classes are *not defined* in any `src/styles/*.css` file (grep). Only the bare tokens `--icon-xs..xl` exist (`tokens.css:372–376`). Consumers cannot write `class="icon-md"`. | Either generate the utilities from the tokens (`@utility icon-md { width: var(--icon-md); height: var(--icon-md); }` for each rung), or expose them as Tailwind size utilities by mapping `--size-icon-{xs..xl}: var(--icon-{xs..xl})` in `theme.css` (Tailwind v4 generates `size-icon-xs`). Doc drift either way. |
| 2.4 | `src/styles/glass.css:222–243` | `prefers-reduced-transparency` and `prefers-contrast: more` blocks live in `glass.css` and only patch glass tokens. Cream/paper/cartoon utilities don't have parallel a11y coverage even though `--paper-grain-overlay` references `--glass-grain-opacity` directly. | Already partly handled (`paper.css:55–60`). But the new cream/skeuo surfaces G adds will need explicit fallbacks — this is more an a11y discipline reminder than drift. |

### Axis 3 — Interactive consistency

No new drift since F. F.W3 closed component contracts, and the four-state machinery (`--scale-hover*`, `--scale-press*`, `--opacity-disabled`, `.focus-ring`) is uniformly applied. New design-language surfaces (cream cards, skeuo switches, math formula blocks) must inherit the same vocabulary — a *constraint* rather than a finding.

### Axis 4 — Variant orthogonality and rooting

| # | File:line | Finding | Canonical replacement |
|---|---|---|---|
| 4.1 | `tokens.css:421–436` + `theme.css:134–140` | `--rainbow-pastel-*` are defined as `:root` tokens but **not exposed via `@theme`** — only the saturated `--rainbow-{red..violet}` get `--color-rainbow-*` aliases. Consumers calling `bg-rainbow-pastel-yellow` get nothing. | Three demo sites (`aurora.vue:86`, `intro.vue:25`, `paper-glass.vue:125`) currently invoke pastel rainbow via raw `var(--rainbow-pastel-*)` inside `bg-[…]` arbitrary classes — exactly the call pattern the `@theme` bridge should serve. Add `--color-rainbow-pastel-{red..violet}` to `theme.css`. (≥3 call-site bar met.) |
| 4.2 | `tokens.css:194–197` | `--accent-pink`, `--section-heading`, `--accent-red` are defined but `--accent-pink` is *never* consumed in `src/` or `demo/` (`accent-red` and `section-heading` are similarly singular). Distinct from `--like` (rose) and `section-color-0` (rose). | Three near-duplicate rose/pink tokens. Either (a) collapse `--accent-pink` and `--section-heading` into one named "accent rose" with `--color-accent-rose` exposure, or (b) drop both. Failing the ≥2 call-site bar — overfitting candidate per `feedback_overfitting_audit`. |
| 4.3 | `tokens.css:212–218` | Semantic accents `--tier-featured`, `--tier-saved`, `--like`, `--success`, `--warning`, `--info`, `--delete` are exposed via `@theme` (`theme.css:119–125`). Useful but `--tier-featured` (gold-ish) overlaps with `--gold-light`. | Document the distinction or alias `--tier-featured: var(--gold-light)`. P3. |

### Axis 5 — Overlay and motion vocabulary

No new drift since F. F.W4 closed Tailwind v4 theme namespaces and removed inert aliases. `--animate-shimmer`, `--animate-shimmer-sweep`, `--animate-gold-shimmer` all map cleanly (`theme.css:261–263`). One micro-finding:

| # | File:line | Finding | Canonical replacement |
|---|---|---|---|
| 5.1 | `tokens.css:90–109` | The DESIGN.md z-index table (`DESIGN.md:103–121`) lists `--z-hovercard: 60`, `--z-tooltip: 60`, `--z-popover: 70`, `--z-modal: 80`, `--z-toast: 100`. **The actual tokens are 120/120/130/140/160** (`tokens.css:101–106`). | DESIGN.md is wrong; source is right. F.W4 tightened theme.css, not the doc. Update `DESIGN.md` numbers in G.W1's foundation pass. |

### Axis 6 — Typographic and structural hierarchy

| # | File:line | Finding | Canonical replacement |
|---|---|---|---|
| 6.1 | `typography.css:202–212` | `.text-math` and `.text-math-body` exist but only flip `font-style: italic` on serif. No formula-display tier (centered, larger leading, accent-bordered). | The `math-paper.vue:69–96` story hand-rolls a "centered formula card" with raw `border-l-[3px]`, `bg-muted/30`, `px-6 py-6`, hardcoded `tabular-nums leading-loose text-center`. Two consumer projects in scope (`fourier-analysis/web`, `value.js`/`words` math surfaces) will reinvent the same pattern. Promote the recipe — see §3 `<MathFormula>` proposal. |
| 6.2 | `typography.css:25` | `--type-admin-label: 0.625rem` is *below* `--type-micro: 0.6875rem` — the scale isn't strictly monotonic (admin-label is the "smaller-than-micro" tier). | Working as designed (admin labels are a separate semantic, not a step). But document it; the scale comment in `tokens.css:27` doesn't mention `--type-leading-admin-label` because there isn't one — admin label hardcodes `1` (`typography.css:193`). Add `--type-leading-admin-label: 1` for symmetry. |
| 6.3 | `typography.css:34–38` | Display scale `clamp(min, fluid, max)` uses inputs in rem but mixes vw — fine — but `display-5` peaks at 6.854rem (109.7px). Modern audacious display reaches 12–18rem. | No drift, but the user-stated "audacious / large typography / mega" axis means G must add `--type-display-mega` tokens beyond the current ceiling. See §2. |
| 6.4 | `typography.css:300–304` | `.char-stagger > .char` uses `var(--spring-smooth, ease)` with a fallback. Every other utility in the file relies on tokens existing. Inconsistent. | Drop the fallback (the token always resolves) or apply the pattern uniformly. P3. |

### Axis 7 — Accessibility resilience

No new drift since F. Glass tiers, paper utilities, and motion utilities all gate on `prefers-reduced-transparency`, `prefers-contrast: more`, `prefers-reduced-motion` (`glass.css:218–243`, `paper.css:55–67`, `utilities.css:319–330`, `transitions.css:144–194`). New surfaces from G must inherit the contract.

## 2. Token & vocabulary gaps for the new axes

Each row: axis → namespace → proposed name(s) → rationale → call sites.

### Axis: cream

The library's "warm cream" *is* the neutral scale — `--neutral-0..5` at hue 48 (`tokens.css:145–150`), and `--background: var(--neutral-0)` is already a true cream (`hsl(48 12% 98%)`). But the *language* is implicit; "cream" never appears as a public-surface noun.

| Proposed | Rationale | Call sites |
|---|---|---|
| `--cream: var(--neutral-0)`; `--cream-foreground: var(--foreground)`; `--cream-muted: var(--neutral-1)`; `--cream-edge: var(--neutral-3)` (with `--color-cream-*` mapping in `@theme`) | Surfaces the existing identity by name. Lets consumers write `bg-cream`, `text-cream-foreground` instead of `bg-background`/`bg-neutral-0`. Names the warm-paper backbone for the design language. | (a) `compositions/math-paper.vue:13` re-applies `bg-card/60` over a paper grain — would become `bg-cream paper-grain-overlay`. (b) `compositions/auth-shell.vue` (paper-cream backdrop). (c) Any consumer hero composition. ≥2 sites in `demo/` alone. |
| `--cream-warm: hsl(40 18% 96%)`, `--cream-cool: hsl(54 8% 97%)`, exposed as `--color-cream-{warm,cool}` | Two cream tints — a "parchment" and a "rice paper" — for layered cream-on-cream surfaces. | Hero, math-paper composition (`math-paper.vue` border-l accent panels), upcoming `<CreamSurface>` (see §3). |
| `.cream-surface` utility — `bg-cream` + `paper-grain-overlay` + `border-1 border-[--cream-edge]` + warm `--shadow-cartoon-sm` | Folds the three current ad-hoc patterns (`math-paper.vue:13`, `auth-shell.vue` if extant, hero) into one. | ≥2 sites. |

### Axis: colorful flourishes

Rainbow + gold + section palette *exist* in tokens (`tokens.css:177–197`, `411–436`) but exposure is partial:

| Gap | Proposed | Rationale | Call sites |
|---|---|---|---|
| Pastel rainbow not in `@theme` | `--color-rainbow-pastel-{red..violet}` mapped in `theme.css` | Three demo files already use raw `var(--rainbow-pastel-*)` (`aurora.vue:86`, `intro.vue:25`, `paper-glass.vue:125`); blocking utility-class usage. | 3 sites in `demo/`. |
| No flourish-accent utilities for dividers | `.divider-flourish-gold`, `.divider-flourish-rainbow` (composes `.divider-h` + linear-gradient stripe) | `utilities.css:294–315` already has tapered/non-tapered dividers; flourishes are the next aesthetic step on the "audacious / colorful" axis. | (a) Hero `compositions/hero.vue` between sections; (b) Math-paper section dividers; (c) consumer dashboards. ≥2 expected. |
| No `flourish-stripe` background utility | `.flourish-stripe-rainbow`, `.flourish-stripe-pastel` (linear-gradient with rainbow tokens, used as a top-of-card accent strip) | Foregrounds the colorful axis at the layout-primitive level rather than as text. | Hero, dashboard, math-paper section heads. ≥2 sites. |

### Axis: mathematical

Mathematical aesthetic = display-italic Computer Modern / Latin Modern, formula composition, golden-ratio spacing, signed glyphs. Library has the typography (`text-math`, `fourier-f`, CM serif body) but not the structural primitives.

| Gap | Proposed | Rationale | Call sites |
|---|---|---|---|
| No `--type-formula` size or class | `--type-formula: 1.272rem` (= subheading, since formulas read at √φ above body), with `.text-formula` utility (CM italic, `tabular-nums`, `leading-loose`, `letter-spacing: 0`) | Closes the `math-paper.vue:75–96` hand-rolled formula-block recipe. Also sets the size for inline `<span class="fira-code">` blocks where they should be √φ above body. | (a) `math-paper.vue:75`; (b) prospective `fourier-analysis/web` math surfaces; (c) `value.js` evaluator output. ≥2 sites. |
| No formula-block container utility | `.formula-block` — paper-cream surface + accent-color left rule + centered tabular-nums + φ leading | Three sites already hand-roll variations of this (math-paper formula block, math-paper blockquote at line 47, upcoming `value.js`/`fourier-analysis`). | ≥2 sites. |
| Golden-ratio scale only in typography | Add φ-derived spacing: `--space-phi-1: 0.618rem`, `--space-phi-2: 1rem`, `--space-phi-3: 1.618rem`, `--space-phi-4: 2.618rem`; expose as `--spacing-phi-{1..4}` in `@theme` so `gap-phi-3` works | Composes with golden-ratio typography. The Tailwind v4 `--spacing-*` namespace already supports custom values. | (a) Math-paper section gap (`math-paper.vue:32` uses raw `gap-6`, should be φ-2 or φ-3); (b) Hero compositions; (c) Card stacks in dashboards. ≥3 sites. |
| Golden-ratio not in radius | `--radius-phi: 1.618rem` (= 25.9px, between `--radius-2xl` (16px) and undefined) | Larger cream cards with φ corner radius — distinguishes "math/scholar" surface from default cards. | At least the `<MathFormula>` recipe and one cream-surface story. ≥2 sites. |
| No display-italic utility | `.text-display-italic` — Fraunces italic with `WONK 1, SOFT 0` at heading size; signed-glyph aesthetic | Used implicitly today via `font-display italic` inline (`math-paper.vue:38`). Promote. | (a) `math-paper.vue:38`; (b) `colors.vue` viz-basis glyph rows (already use `fourier-f` for ℱ); (c) hero subheads. ≥2 sites. |

### Axis: modern skeuomorphic with shadowing

`--shadow-cartoon*` is the existing offset-skeuo. Modern skeuo demands *layered* recipes (inset highlight + drop shadow + dual-light directionality), not just offsets.

| Gap | Proposed | Rationale | Call sites |
|---|---|---|---|
| No layered skeuo shadow recipe | `--shadow-skeuo-raised`: `inset 0 1px 0 0 hsl(0 0% 100% / 0.4), 0 1px 2px hsl(0 0% 0% / 0.08), 0 4px 12px -2px hsl(0 0% 0% / 0.12)` | Composes inner-highlight + ambient + drop. The `--glass-highlight` token (`tokens.css:327`) is already half of this; G adds the matching shadow side. | (a) `<Switch>` thumb; (b) `<Button variant="glass">` hover; (c) skeuo card variant. ≥2 sites. |
| No "pressed/inset" skeuo | `--shadow-skeuo-pressed`: `inset 0 1px 2px hsl(0 0% 0% / 0.18), inset 0 -1px 0 hsl(0 0% 100% / 0.1)` | Pressed-button counterpart to raised. | Same call sites in pressed state. ≥2 sites. |
| No `.glass-skeuo` tier | `.glass-skeuo` — composes `glass-default` + `--shadow-skeuo-raised` + 2px border + hover-to-pressed transition; cream-light gradient bg via `linear-gradient(to bottom, color-mix(--cream 100%, white 8%), --cream)` | Fifth tier slot ("subtle / default / medium / elevated / **skeuo**"). Distinct from `glass-cartoon` (which does offset, not bevel). | (a) `<Switch>` track; (b) `<Toggle variant="skeuo">` (new); (c) skeuo `Button` variant. ≥2 sites. |
| Depth-text recipe is dead | Repurpose `.depth-text` → tighten layers, expose `--text-depth-color` knob, document under skeuo | Saves an existing ten-line recipe. | (a) `<DisplayHero>`; (b) splash composition. ≥2 sites. |

### Axis: bold / audacious / large typography

| Gap | Proposed | Rationale | Call sites |
|---|---|---|---|
| Display ceiling at 6.854rem | `--type-display-mega: clamp(6.854rem, 5rem + 9vw, 11.089rem)` (φ^5 ≈ 11.09rem); `--type-display-ultra: clamp(11.089rem, 8rem + 12vw, 17.944rem)` (φ^6) | User explicitly named "mega hero" need. Audacious bound is φ^5–6. | (a) `<DisplayHero>` (G); (b) marketing splashes in consumers (`speedtest`, `keyframes.js`); (c) prospective hero variations. ≥2 sites. |
| Display utility class missing for `display-mega/ultra` | `.text-display-mega`, `.text-display-ultra` mirroring `.text-display-5` | Same pattern. | Same as above. |
| No display-stretch axis automation | `--font-display-mega-variation-settings: "WONK" 1, "SOFT" 100, "wdth" 110` | At display-mega size, Fraunces wants softer terminals and slight wider stretch — currently every display class uses identical axes (`typography.css:84`, `94`, `104`, `114`, `124`). Per-rung axis tuning is what makes the kinetic typography axis feel intentional vs uniform. | All `.text-display-{2..5}` rules diverge if G goes per-rung. ≥4 sites. |
| Tracking-tightest missing | `--tracking-tightest: -0.04em`, exposed as `tracking-tightest` in `@theme` | At display-mega/ultra, `-0.025em` (`tracking-tight`) is loose. | display-mega, display-ultra, possibly retroactively display-5. ≥2 sites. |
| Bold-weight family token | `--font-display-weight-bold: 700` (companion to `--font-display-weight: 400`) | Audacious display variants need a heavier rung accessible by token. | display-mega, depth-text, possibly title rule. ≥2 sites. |

### Axis: large/audacious iconography

`--icon-{xs..xl}` peaks at 1.5rem (24px). Audacious iconography reaches 48–96px.

| Gap | Proposed | Rationale | Call sites |
|---|---|---|---|
| Icon scale ceiling | `--icon-2xl: 2rem` (32px); `--icon-3xl: 3rem` (48px); `--icon-mega: 4.5rem` (72px) | User explicitly named "large and audacious iconography." Current top is 24px — undersized for hero/empty-state/feature-list iconography. | (a) `<IconStamp>` (G); (b) empty-states composition (currently uses raw lucide `:size="48"` — verified pattern in `compositions/empty-states.vue`); (c) feature lists in dashboards. ≥3 sites. |
| Icon utilities not generated | `@utility icon-{xs..mega}` setting `width/height` (DESIGN.md claims these exist; they don't) | Closes a doc-vs-source drift (Axis 2.3) and exposes the new tokens. | All current consumers using raw `:size=` switch to class-based. ≥5 sites. |
| Tailwind size-icon utilities missing | Map `--size-icon-{xs..mega}: var(--icon-{xs..mega})` in `theme.css` so `size-icon-mega` generates | Lets `<svg class="size-icon-mega">` work without JS prop. | Same call sites. |
| No iconographic frame primitive | `.icon-stamp` utility: square frame, 2px border, paper-grain overlay, optional cartoon shadow; composes with size-icon-* | The "boxed/stamped/embossed" frame is a clear gap. Consumers reach for badges or cards instead, which collapses semantics. | (a) Empty-states glyph; (b) feature-list bullets; (c) "what's new" card grid. ≥2 sites. |
| No embossed icon recipe | `.icon-emboss` — drop-shadow + inset highlight on currentColor SVG strokes | Modern skeuo iconography. Pairs with `--shadow-skeuo-raised`. | (a) Hero feature glyphs; (b) splash. ≥2 sites. |

## 3. Component / composable additions

Each candidate requires ≥2 credible call sites; single-site goes to a consumer preset.

| Component | Shape | Call sites |
|---|---|---|
| `<MathFormula>` | Slot-based: `display-mode?: "inline" \| "block"`, `accent?: "fourier" \| "chebyshev" \| "legendre" \| string`, applies `.formula-block` recipe (cream surface + accent-color left rule + `.text-formula` body + φ leading). | (a) `math-paper.vue:69–96` block; (b) `fourier-analysis/web` math output; (c) `value.js` evaluator output. **≥3.** |
| `<DisplayHero>` | Slot-based: `size?: "display-3" \| "display-mega" \| "display-ultra"`, `variation?: "wonk" \| "stretch" \| "depth"`. Composes display-italic + `--font-display-{...}-variation-settings` + optional `.depth-text`. | (a) `compositions/hero.vue` already hand-rolls; (b) `speedtest` hero; (c) `words` hero — all currently re-implement variation axes. **≥3.** |
| `<IconStamp>` | Wraps a lucide icon, props `size` (xs..mega), `frame?: "stamp" \| "emboss" \| "plain"`, `accent?: section-color name`. Renders the iconographic frame. | (a) `compositions/empty-states.vue`; (b) feature-list bullets; (c) onboarding. **≥3.** |
| `<CreamSurface>` | Wraps content in `.cream-surface` (`bg-cream` + paper grain + border-cream-edge + cartoon-sm). Props `tone?: "warm" \| "cool"`, `padded?: bool`. | (a) `math-paper.vue:13`; (b) `auth-shell.vue` cream backdrop; (c) story-page card. **≥3.** |
| Card variant `cream` | `Card.vue` adds `variant="cream"` → `cream-surface` underlying class, dropping the glass blur in favor of warm-paper substrate. | (a) Math-paper cards; (b) settings group cards; (c) hero feature cards. **≥3.** Existing variants are `default \| pane \| cartoon \| plain \| flush` — `cream` slots cleanly. |
| `<FlourishDivider>` | Props `tone?: "rainbow" \| "gold" \| "section-N"`, `tapered?: bool`. Composes `.divider-h{,-tapered}` + flourish-stripe gradient. | (a) Hero between sections; (b) math-paper section breaks; (c) dashboard groups. **≥3.** |
| `<SkeuoSwitch>` (Switch variant, not new component) | `<Switch variant="skeuo">` → `--shadow-skeuo-raised` track + `--shadow-skeuo-pressed` pressed thumb + dual-light gradient. | (a) Settings composition; (b) `speedtest` toggles; (c) `fourier-analysis/web` controls. **≥3.** |
| `<Pulse>` extension — `variant="ring-mega"` | Existing `<Pulse>` (`src/components/custom/pulse/`) adds a large ring tier. Already exists at "dots/ring"; mega is rung up. | (a) Loading-state hero; (b) Aurora capture pending. **≥2.** |
| `useGoldenRatio` composable | Returns reactive `phi`, `phiInverse`, helpers `phiSpace(n)`, `phiSize(n)`. Encodes the aesthetic math. | (a) Math-paper layout; (b) hero scaler; (c) any consumer composing φ-derived layouts. **≥2.** Single-site otherwise → consumer preset. Borderline. Defer if §2 spacing-phi tokens make it redundant. |

Components rejected for not meeting ≥2 call sites:

- `<FormulaInline>` — subsumed by `<MathFormula display-mode="inline">`.
- `<RainbowText>` — there is `.gold-shimmer`; no second site demands a generic rainbow shimmer. Belongs in a consumer preset.
- `<EmbossedHeading>` — subsumed by `<DisplayHero variation="depth">`.

## 4. Storybook taxonomy gaps

Map to `demo/stories/manifest.ts` (`CATEGORIES` array). Each row: where the new axis surfaces and which manifest slot.

| Story | Slot | Axis | Why |
|---|---|---|---|
| `foundations/cream` | Foundations (after `colors`) | cream | Documents the cream identity tokens — `--cream`, `--cream-warm`, `--cream-cool`, `--cream-edge`, contrast pairs against `--foreground`, dark-mode mirror. Today the cream identity is asserted in tokens but never visualized. |
| `foundations/golden-ratio` | Foundations (after `radii`) | mathematical | Visualizes φ across type, spacing, radius. Reveals the system's secret math. |
| `foundations/flourishes` | Foundations (after `colors`) | colorful flourishes | Shows rainbow vivid, rainbow pastel, gold family, section palette as consumable swatches *and* as flourish utilities (`.divider-flourish-*`, `.flourish-stripe-*`). |
| `primitives/icon-stamp` | Primitives (after `metric-badge`) | audacious iconography | `<IconStamp>` variants × sizes. Consumes new `--icon-{2xl,3xl,mega}` tokens. |
| `primitives/skeuo-controls` | Primitives (replaces or extends `checks`) | modern skeuomorphic | `<Switch variant="skeuo">`, `<Toggle variant="skeuo">`, button skeuo. |
| `containers/cream-card` | Containers (after `card`) | cream | `<Card variant="cream">` + `<CreamSurface>`. Two-tone (warm/cool) compositions. |
| `motion/display-axes` | Motion (after `scroll-type`) | bold/audacious typography | Per-rung `WONK`/`SOFT`/`wdth` axis variations across `display-{1..ultra}`. |
| `compositions/math-paper` (revised) | Compositions (existing) | mathematical | Refactor the existing story to consume `<MathFormula>`, `<FlourishDivider>`, `<CreamSurface>` once they exist — currently it hand-rolls all three. |
| `compositions/audacious-hero` | Compositions (after `hero`) | bold/audacious typography + iconography | `<DisplayHero>` × `<IconStamp size="mega">` × cream surface. The "audacious" maximalist demo. |
| Renamed `compositions/hero` → `compositions/hero-quiet` | Compositions | (clarification) | The existing hero is the *restrained* one; the new one is *audacious*. Naming pair clarifies the design-language range. |

## 5. Risk register — refinements considered and rejected

| Refinement considered | Why rejected | Memory cite |
|---|---|---|
| Add a `glass-ui-cream` typography preset (data attribute on `:root`) à la `brand-uniform-sans`. | The existing `brand-uniform-sans` preset has zero in-source consumers (Axis 2.2). Shipping another single-site preset compounds the problem. Cream is the *default* — codify in tokens, don't preset-gate it. Belongs in consumer presets if a consumer needs an opt-out. | `feedback_presets_in_consumer` |
| Bake a "mathematical" body cascade preset that flips body to italic CM. | Italic body is a per-page choice (math-paper, scholar). Library default body must stay upright. → consumer preset. | `feedback_presets_in_consumer` |
| Auto-derive `--type-formula` from `--type-subheading` to "save tokens." | The math axis demands the formula type be *named*, not aliased. Naming is the affordance. Derive once via `var(--type-subheading)`, expose as `--type-formula`. (Same pattern as `--radius-card: var(--radius-2xl)`.) | (none — sound design discipline) |
| Add `<RainbowText>` and `<GoldenText>` components. | Single-site each — Tailwind v4's `bg-clip-text` + `.gold-shimmer` already cover the recipe. Component wrapper adds no surface. | `feedback_overfitting_audit` |
| Re-introduce a `glass-card-lift` hover-on utility (was removed in F per `DESIGN.md:222`). | F removed it deliberately — the conflation broke pill/badge consumers. Solving "interactive cream card" is `<Card variant="cream">`, not a class. | `feedback_no_backwards_compat` |
| Define `--shadow-cartoon-xl` and `--shadow-cartoon-2xl` for audacious cards. | The cartoon family was already calibrated in F (and retired `.shadow-cartoon-sm-hover` per F.W6). Adding more rungs without ≥2 call-site demand is the classic creep. The audacious axis wants *skeuo* shadow, not more cartoon offsets. | `feedback_overfitting_audit` |
| Convert all raw Tailwind opacity literals (`/8`, `/70`, `/85`) in `Button`'s CVA to a `--state-{hover,active,pressed}` token namespace. | Useful but invasive. Each Tailwind utility resolves through the existing color-mix recipe; no consumer reaches for those literals directly. Out of scope for G — note as a "tranche H polish" candidate. | (sound discipline; not blocking) |
| Add a `tw-animate-css` integration shim for the new keyframes. | `feedback_tailwind_first` says re-express, not paste. New keyframes go in `animations.css`, are bridged via `@theme` `--animate-*`, and Tailwind generates the utility natively. No shim. | `feedback_tailwind_first` |

## 6. Tranche shape proposal

G is foundational — the design language *vocabulary* before consumer rollout. Six waves: (W0) state ledger and audit consolidation across the six lanes; (W1) tokens/theme — cream namespace, φ-spacing, display-mega/ultra, icon-2xl..mega, skeuo shadow, formula type, rainbow-pastel `@theme` exposure, fix DESIGN.md numeric drift, retire `--accent-pink`/`--depth-text`-as-dead, decide the `brand-uniform-sans` preset's fate; (W2) surface CSS — `.cream-surface`, `.glass-skeuo`, `.formula-block`, `.icon-stamp`, `.icon-emboss`, `.divider-flourish-*`, `.flourish-stripe-*`, generate missing `.icon-{xs..mega}` utilities; (W3) component additions and variants — `<MathFormula>`, `<DisplayHero>`, `<IconStamp>`, `<CreamSurface>`, `<FlourishDivider>`, `Card variant="cream"`, `Switch variant="skeuo"`, paired into the existing barrels; (W4) storybook — new foundations stories (cream, golden-ratio, flourishes), new primitives (icon-stamp, skeuo-controls), refactor `math-paper` and `hero` onto the new primitives, add `audacious-hero`; (W5) consumer rollout proof — at least one consumer (`fourier-analysis/web` or `speedtest`) migrates a hero/math surface onto G primitives, runtime smoke + bundle profile, overfitting audit re-run per `docs/audits/overfitting-audit.md`. Close gates: Tailwind theme proof passes new namespaces; storybook routes smoke green; ≥2 call sites confirmed for every new src/ artefact; no DESIGN.md/source numeric drift remains.

## Closing tally

5 drift findings (all P3); 16 token/vocabulary gap rows across 6 axes; 8 component/composable additions clearing the ≥2 call-site bar; 10 storybook slots; 8 rejected refinements. No blocking residuals from F intersect with the G ambitions. The library is ready for a vocabulary-expansion tranche.
