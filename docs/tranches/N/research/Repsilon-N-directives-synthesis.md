# Rε — N-new directives synthesis (scope + transposition + library gaps)

For each N-new directive: (a) scope at HEAD; (b) gestalt architectural transposition per V4; (c) substrate work items; (d) library gaps blocking convergence; (e) brittleness windows.

## § N6 — Storybook mobile + configurators + spacing/padding expressiveness

### Current state

- 137 story files across `demo/stories/**` per `manifest.ts`
- Configurator surfaces consumed by 2 stories: `motion/metaballs.vue` + `aurora.vue` (per CLAUDE.md L.W7 Lane B); 2 chrome adopters
- `ConfiguratorRow` uses fixed `gap-1.5 py-2`; label `truncate`; description `text-[0.6875rem]` literal (Rγ 6.1 drift)
- `demo/index.html` — viewport meta + responsive root CSS missing
- Configurator preset picker overflows horizontally at narrow viewports
- Aurora + Metaballs canvas sizing: no explicit mobile canvas-fit (`contain` vs `cover` vs stretch)

### Gap analysis

- Mobile viewport meta absent
- No responsive ConfiguratorRow density break (`@media (max-width: 640px)`)
- Configurator aside width: `280px..360px` (lg:); narrow viewport stacks full-height without max-height gate
- No DPR-aware canvas resolution for aurora/metaballs

### Architectural transposition (per V4)

- Enhance `Configurator` with `density?: "mobile" | "compact" | "comfortable" | "spacious"` axis (matches dock pattern)
- ConfiguratorRow compact variant: gap → token-driven; description hidden-on-mobile (optional slot expand)
- Aurora/Metaballs: intrinsic aspect-ratio lockdown + DPR-aware canvas resolution
- Preset picker: chip-wrap-grid variant at mobile breakpoint

### Substrate work items

1. Add `demo/index.html` with canonical viewport meta + responsive root CSS
2. Enhance `Configurator` with mobile density axis
3. ConfiguratorRow compact variant (gap-token + description-mobile-hidden)
4. Aurora/Metaballs canvas aspect-ratio lockdown
5. Add mobile-variant story: `demo/stories/primitives/configurator-mobile.vue` (proof-of-concept)

### Library gaps

| Gap | Path | Scope |
|---|---|---|
| `--configurator-row-gap-mobile` token | `tokens.css §8b` | density axis spacing |
| `--configurator-label-size-mobile` token | `tokens.css §8b` | mobile label scale (may collapse to `--type-micro` once promoted) |
| ConfiguratorRow density CVA branch | `src/components/custom/configurator/ConfiguratorRow.vue` | mobile/compact/comfortable/spacious |
| `useResponsiveConfigurator` composable (optional) | `composables/dom/` | media-query density switch |
| `configurator-mobile.vue` story | `demo/stories/primitives/` | mobile proof |

### N wave attribution

3 lanes (tokens / composable+CVA / stories). Medium scope. **Priority: HIGH** (mobile-first user need).

---

## § N7 — Dock blur reduction

### Current state

- `--glass-blur-dock-radius: 0px` (set at `tokens.css:371`)
- Per `tokens.css:363` comment: blur dropped from 1px → 0px at J.W3.C (compositor-floor)
- Rationale: at 1px the radius barely perceivable but still triggered compositor blur; opacity + saturate carried chromatic punch
- Current dock composition: `--glass-blur-dock: blur(var(--glass-blur-dock-radius))` (no saturate; opacity-only register)
- Dock opacity: `--glass-opacity-dock: 0.32` (lighter than resting 0.65; visible backdrop bleed)
- Dock surface: `backdrop-filter: var(--dock-surface-blur)` where `--dock-surface-blur: var(--glass-blur-dock, var(--glass-blur-wash))` (fallback to wash if dock token not set)

### Benchmark comparison

- Apple HIG dock: ~12–18px blur (subtle but perceptible)
- glass-ui current: **0px blur + 32% opacity-only**
- Status: dock ALREADY at minimum perceptible blur; "reduce to more subtle" likely refers to perceived top-dock stacking, not the dock's own filter

### Architectural transposition options

- **Option A (current as-is)**: dock already at perceptual floor; no further reduction safe without losing glass aesthetic. Verify top-dock stacking context separately.
- **Option B (selective blur tiers)**: introduce `--glass-blur-dock-light: 0px` (current) + `--glass-blur-dock-normal: 3px` (optional elevation), gated on `data-blur-level` or density.
- **Option C (subtle saturate reinstate)**: if visual "too transparent" perception, add back `saturate(1.02)` (lighter than prior 1.025) to dock blur.

### Substrate work items

1. Perceptual audit: render dock on 5-stop aurora backgrounds at 3 viewports; measure visual impact
2. Top-dock stacking-context audit: verify perceived blur isn't an additive composition with aurora backdrop
3. If current state accepted: document in DESIGN.md that dock blur is at perceptual floor (close N7 as no-op)
4. If adjustment needed: add `--glass-blur-dock-light` + `--glass-blur-dock-normal` (Option B); update dock.css cascade
5. Update tokens.css §8 comment to reflect N7 decision

### Library gaps

- **None if Option A** (current acceptable)
- **If Option B**: missing token pair `--glass-blur-dock-light` + `--glass-blur-dock-normal` (`tokens.css §8`)

### N wave attribution

Perceptual audit + 0–1 tokens. Extra-small scope. **Priority: LOW** (likely no-op; current state at compositor floor).

---

## § N8 — Dock collapse facilities (icon + mobile arrows; springy + squish + blob + glass)

### Current state

- `<GlassDock>` has built-in collapse via `useDockState` + `useLayerTransition`
- Current collapse mechanism: dock shrinks to `collapsed` slot (icon/summary only); click expands
- Collapsed state: `data-state="collapsed"` + scale/transform animation via `--dock-motion-resize` spring
- **Mobile arrows: ABSENT** — no dedicated mobile-collapse-toggle primitive
- Available animation tokens: `--duration-{fast,normal}`, `--spring-{snappy,bouncy,smooth,gentle}`, `--ease-apple-spring`, `--scale-{hover,press,press-btn}`

### Architectural transposition

- New primitive: `<DockMobileToggle>` — animated arrow button (chevron or caret), sits in collapsed dock summary or absolute-positioned chrome attachment
- Spring behavior: compose `--spring-bouncy` (ζ=0.45) + `--scale-press-btn` for squish/expand motion
- Blob aesthetic: wrap toggle in `.glass-wash` mini-button + match dock pill radius
- Icon variant: chevron rotates 180° on expand; arrow swaps direction on flip
- Animation cadence: `--duration-normal` (300ms) + `--spring-bouncy` for springy feel
- Glass aesthetic: composable with `<GlassDock orientation>` for top/bottom/side variants

### Substrate work items

1. New component: `src/components/custom/dock/DockMobileToggle.vue` (icon + spring chevron/arrow animation; exported from `/dock` subpath)
2. Enhance `GlassDock`: inject `dockCollapsed` signal + expose `onToggleCollapsed` action for toggle integration
3. Optional new animation token: `--scale-squish: 0.92` (more aggressive press for blob aesthetic; or compose `--scale-press` + bezier ease)
4. Story proof: `demo/stories/navigation/dock-mobile-toggle.vue` (horizontal dock + toggle at mobile breakpoint)
5. Style: `src/styles/dock-mobile-toggle.css` — spring keyframes if linear() approximation insufficient

### Library gaps

| Gap | Path | Scope |
|---|---|---|
| `<DockMobileToggle>` component | `src/components/custom/dock/DockMobileToggle.vue` | icon-button + spring animation |
| (optional) `useDockMobileToggle` composable | `src/components/custom/dock/composables/` | toggle state + a11y; may be self-contained |
| (optional) `--scale-squish` token | `tokens.css §13` | more aggressive press for blob aesthetic |
| `dock-mobile-toggle.vue` story | `demo/stories/navigation/` | mobile-collapse proof |

### N wave attribution

1 component + 1 story + 0–1 tokens + optional composable. Small scope but new substrate. **Priority: HIGH** (new primitive, significant UX impact).

---

## § N9 — Glass panels default + typography audit

### Current state

- 5-rung glass tier ladder (per `tokens.css §8` + `glass.css`): `wash` (~0.30α, 1px blur) / `quiet` (~0.50α, 3px) / `resting` (~0.65α, 12px) / `floating` (~0.80α, 16px) / `overlay` (~0.95α, 24px)
- No frosted/translucent alias; all tiers rely on backdrop-filter composition
- `<GlassPanel>` component: default variant = `"resting"` (per props.ts:53)
- Typography surface: 13 semantic type classes (`display-{audacious,hero,mega,5..1}`, `title`, `heading`, `subheading`, `body`, `prose`, `admin-label`, `micro`, `caption`, `small`); golden-ratio scale (√φ); CM-serif body cascade; Fraunces display; Fira Code mono
- AA.W1.T5 added `dock-label` semantic register

### Directive interpretation

"Translucent + frosted" — Rγ §N9 finding: `"resting"` already IS translucent + frosted (0.65α + 12px blur + grain overlay via `::after`). The directive may refer to:
- Whether the DEFAULT is correctly named (resting vs frosted)
- Whether the default opacity/blur values are at the right baseline
- Whether the default needs a grain bump

### Architectural transposition

- **Option 1 (rename + adjust)**: rename `resting` → `frosted`; bump grain `0.035 → 0.045` for more "frosted" feel
- **Option 2 (new tier)**: introduce `.glass-frosted` as a separate tier between `resting` and `floating` (16px blur + 0.55α + grain 0.045); change `<GlassPanel>` default from `"resting"` → `"frosted"`
- **Option 3 (verify + document)**: current default `"resting"` IS the canonical translucent+frosted; verify rendering matches user expectation; refine DESIGN.md to clarify

### Substrate work items

Per Rγ recommendation + Rδ CG4 typography drift: combine N9 (glass panel default) with typography sweep + `text-micro` promotion + DESIGN.md tier-mapping table.

1. Decide N9 architectural option (1/2/3) — proposed Option 3 (verify + document) per V2 NO workarounds principle (no new tier unless necessary)
2. Audit `<GlassPanel default="resting">` rendering at 3 viewports
3. Promote `--type-micro` → `@utility text-micro` (Rγ G2 closes Rγ 6.1 + Rδ CG4 cohort)
4. Audit ad-hoc `text-[Xrem]` literals across demo/ + library src/; replace with semantic utilities
5. DESIGN.md additions:
   - Glass tier semantics table (wash/quiet/resting/floating/overlay opacity + blur + grain)
   - Typography tier mapping table (golden-ratio rungs vs Tailwind defaults)
6. Per Rδ CG1: optional `.glass-{success,warning,info,error}-subtle` semantic tiers (if user signals intent — otherwise defer to next consumer absorb)

### Library gaps

| Gap | Path | Scope |
|---|---|---|
| (option-dependent) `.glass-frosted` tier | `glass.css` + `tokens.css §8` | only if Option 1/2 chosen |
| `@utility text-micro` | `typography.css` | promote from token-only; per Rγ G2 |
| DESIGN.md tier-mapping tables | `DESIGN.md` | documentation refinement |
| typography ad-hoc audit + sweep | library-wide | hygiene pass |

### N wave attribution

1 utility + 1 audit sweep + 1 doc refinement. Medium scope. **Priority: MEDIUM** (polish + hygiene; per Rδ CG4 absorbs 381 typography drift instances across consumers).

---

## § Cross-directive library gaps (consolidated)

| Gap | Directive | Path | Scope |
|---|---|---|---|
| `--configurator-row-gap-mobile` token | N6 | `tokens.css §8b` | density axis spacing |
| `--configurator-label-size-mobile` token | N6 | `tokens.css §8b` | mobile label scale |
| ConfiguratorRow density CVA branch | N6 | `ConfiguratorRow.vue` | mobile/compact/comfortable/spacious |
| `useResponsiveConfigurator` composable | N6 | `composables/dom/` (optional) | media-query density switch |
| `configurator-mobile.vue` story | N6 | `demo/stories/primitives/` | mobile proof |
| `--glass-blur-dock-light` / `--glass-blur-dock-normal` | N7 (optional) | `tokens.css §8` | blur tier selection |
| `<DockMobileToggle>` component | N8 | `custom/dock/` | icon + spring animation |
| `useDockMobileToggle` composable | N8 (optional) | `custom/dock/composables/` | self-contained possible |
| `--scale-squish` token | N8 (optional) | `tokens.css §13` | more aggressive press for blob |
| `dock-mobile-toggle.vue` story | N8 | `demo/stories/navigation/` | mobile proof |
| (option-dependent) `.glass-frosted` tier | N9 | `glass.css` + `tokens.css §8` | only if architectural option 1/2 |
| `@utility text-micro` | N9 | `typography.css` | promote from token-only |
| DESIGN.md tier-mapping tables | N9 | `DESIGN.md` | documentation refinement |

**Total library gaps: 12 items** (3 tokens + 1 CVA + 1 composable + 1 story for N6; 0–1 tokens for N7; 1 component + 0–1 composable + 1 story for N8; 1 utility + 1 doc + 1 audit for N9).

## § N wave attribution recommendations

| Directive | Lanes | Scope | Priority |
|---|---|---|---|
| **N6** | A tokens, B CVA + composable, C stories | Storybook mobile + configurators | HIGH (mobile-first) |
| **N7** | A perceptual audit (+ possibly A+B tokens) | Dock blur reduction | LOW (likely no-op) |
| **N8** | A DockMobileToggle component, B story | Dock collapse facilities | HIGH (new primitive) |
| **N9** | A glass tier decision + verify, B `text-micro` utility, C typography audit + doc | Glass panels + typography | MEDIUM (polish + hygiene) |

## § Brittleness windows + cross-directive risks

- **N6 ↔ N8**: mobile breakpoints must align (Configurator + DockMobileToggle should share viewport-aware density at ~640px boundary).
- **N6 ↔ N9**: typography migration (N9's `text-micro`) affects ConfiguratorRow label sizing (N6).
- **N7 ↔ N9**: if frosted-tier adopted (N9), dock blur visual hierarchy may need revisit (N7).
- **N8 substrate**: `<DockMobileToggle>` introduction must NOT regress existing `collapsed`-slot consumers (M dock-layer regression at Rα N-5 is in this neighborhood).

## Conclusion

N-new directives N6 + N8 + N9 each warrant a wave-grade scope; N7 is likely a no-op or single-token addition. Cross-directive brittleness concentrates around N6 (mobile breakpoint) intersecting N8 (dock mobile) + N9 (typography mobile). Recommend parallel execution of N6 + N9 first (foundation + polish), then N8 (dock substrate leveraging the typography baseline), then N7 (perceptual confirmation).
