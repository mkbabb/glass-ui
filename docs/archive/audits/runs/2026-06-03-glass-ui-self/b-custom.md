# Style Audit — slice B: `src/components/custom/` (35 custom packages)

**Run:** 2026-06-03 glass-ui self-audit · **Auditor:** style-audit sub-agent B · **Mode:** READ-ONLY, bidirectional

## Preamble

Slice scanned: 57 `.vue` + 84 `.ts` across 35 custom package dirs. Canon consulted: `tokens.css` §1–§20, `theme.css` @theme (z-aliases at :191–:207, viz/color aliases), `typography.css` semantic `text-*` @utilities, `glass.css` (5-tier ladder + `.glass-btn`/`.btn-pill`/`.input-pill`), `utilities.css` (`.interactive-item`/`.tap-squish`/`.focus-ring`/`.hover-lift*`/`.scale-on-hover`/`.metric-badge`/`.kbd`/`.section-label`/`.divider-h*`/`.scrollbar-*`/`btn-audacious`/`btn-interactive`).

Headline: the slice is **mostly canon-clean**. Aurora/disco-glyph/glyph-face carry only GL-shader literals (out of scope). Real drift clusters in five SFCs: `tabs/BouncyToggle.vue` (magic radii + raw rgba shadow), `metric-stack/MetricRow.vue` (literal duration + bare easing), `expandable-container/ExpandableContainer.vue` (Tailwind-soup trigger reinventing `.glass-btn`/`.glass-wash`), `configurator/*` (slash-opacity tints + a bespoke active-chip toggle), and `typewriter/TypewriterText.vue` (neutral rgba). The dominant cross-cutting pattern is **slash-opacity text tints** (`text-muted-foreground/{40,60,70,80,85}`, `text-foreground/85`) — a `--neutral-*`-ladder gap, not per-site drift.

Each axis below cites `file:line`; repeats coalesced with counts. Verified each canonical replacement by grep before naming.

---

## Drift by axis

### Axis 1 — Token alignment

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 1.1 | `metric-stack/MetricRow.vue:229,246` | `transition: color 220ms ease-out` — literal `220ms` + bare `ease-out` keyword | `var(--motion-duration-progress-intake)` (=220ms, tokens.css:237) or `var(--duration-fast)` + `var(--ease-out)` (tokens.css:170) |
| 1.2 | `tabs/BouncyToggle.vue:360` | `0 1px 3px rgba(0, 0, 0, 0.08)` — raw rgba shadow bypasses `--shadow-color` recipe | `0 1px 3px color-mix(in srgb, var(--shadow-color) 8%, transparent)` (the house pattern, CLAUDE.md conventions; or `--shadow-xs`/`--shadow-sm` rung) |
| 1.3 | `typewriter/TypewriterText.vue:238` | `background-color: rgba(128, 128, 128, 0.15)` — hardcoded neutral grey hover, not theme-aware (frozen mid-grey in both light + dark) | `var(--surface-tint-15)` (tokens.css:415) or `var(--accent)` — auto-darks via `--foreground`/neutral ladder |
| 1.4 | `tabs/BouncyToggle.vue:342,349,358,400,420` | Magic radius ladder `0.4375rem`/`0.5rem`/`0.3125rem`/`0.375rem` for the track + thumb — no `--radius-*` token | Nearest rungs: `--radius-md` (6px=0.375rem) / `--radius` (0.625rem); or mint a `--toggle-radius-{track,thumb}` knob (GAP G1) |
| 1.5 | `sortable-list/SortableList.vue:174` | `border-radius: 999px` | `var(--radius-pill)` (=9999px, tokens.css:297) |
| 1.6 | `pulse/Pulse.vue:120,131` | `border-radius: 9999px` (×2) — correct value, literal form | `var(--radius-pill)` |
| 1.7 | `tabs/UnderlineTabs.vue:103` | `border-radius: 0.25rem` (fallback underline) | `var(--radius-sm)` (=4px≈0.25rem, tokens.css:292) — note :71 already uses `--radius-sm` for the indicator; :103 is the inconsistent twin |
| 1.8 | `typewriter/TypewriterText.vue:248` | `animation: typewriter-blink 1.06s …` — magic `1.06s` cursor-blink period, no token | minor; mint `--typewriter-blink-duration` knob or accept as component-local constant (low priority) |

Note (clean): `timeline/SegmentedTimeline.vue:143` + `timeline/ContinuousTimeline.vue:664` use `color-mix(in srgb, var(--foreground) 8%, transparent)` — these are exact `--surface-tint-8` matches (tokens.css:412) and could read the named rung, but the inline recipe **is** the canonical house pattern so this is borderline; flag as a tidy, not drift.

### Axis 2 — Utility / @apply hygiene

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 2.1 | `expandable-container/ExpandableContainer.vue:5,22` | Trigger button Tailwind-soup: `rounded-button bg-card/70 [backdrop-filter:var(--glass-blur-wash)] … shadow-sm border border-border/40` — hand-rolls a glass icon-button | Compose `.glass-btn` (glass.css:132 — already bundles bg-wash + blur-wash + border-wash + the four-state contract + focus-ring) or `.glass-wash` (glass.css:20). Reinventing the wash surface inline bypasses the PRT/`@supports not(backdrop-filter)` fallbacks the `.glass-*` classes carry. |
| 2.2 | `header-ribbon/HeaderRibbon.vue:4` | `z-[var(--z-dock)]` arbitrary-value escape | `z-dock` — the alias exists at theme.css:197 (`--z-index-dock`) |

### Axis 3 — Interactive consistency

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 3.1 | `expandable-container/ExpandableContainer.vue:5,22` | Trigger has hover (`hover:text-foreground`) but **no `:focus-visible` ring** and **no press scale** — only `transition-colors`. (The coarse-pointer floor at utilities.css:1055 sizes `.expandable-container__trigger` but does not give it a focus ring.) | Add `.focus-ring` (utilities.css:140) + `.tap-squish` (utilities.css:199), or adopt `.glass-btn` which bundles both |
| 3.2 | `glass-carousel/GlassCarouselItem.vue:69` | `transform: scale(1.03)` hover — bespoke magnitude, not `--scale-hover` (1.08); press at :73 correctly reads `var(--scale-press)` | Either read `var(--scale-hover)` for orthogonality or mint a documented `--carousel-item-hover-scale` knob if 1.03 is intentional (gentler-than-canon) |
| 3.3 | `configurator/ConfiguratorRow.vue:91` | Reset button: `active:scale-[var(--scale-press,0.97)]` — inline arbitrary scale + `hover:bg-foreground/5` slash-tint (see 4.x). Has `focus-ring` ✓ | Press scale via `.tap-squish` (utilities.css:199, reads `--scale-press`); hover bg via `--surface-tint-*` |

### Axis 4 — Variant orthogonality + rooting

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 4.1 | `configurator/Configurator.vue:237–238` | Preset-chip active/inactive is a bespoke inline toggle: active `border-foreground/40 bg-foreground text-background`, inactive `border-border/40 bg-card/40 … hover:bg-card/70`. This is a tab-chip surface×state collapse hand-rolled at the call site (it carries `role="tab"`). | Same active-chip vocab recurs in dock tab buttons + toggle-chip — see UNION U1. Promote a `.tab-chip` / CVA branch. |
| 4.2 | `glass-carousel/GlassCarousel.vue:267,271,281,285` | `:deep(.glass-carousel-item)` × 4 | **Borderline-clean** — `.glass-carousel-item` is a sibling package class (`GlassCarouselItem.vue`), not a reka-ui internal; this is an intra-package class contract. No token/slot-prop gap. Documented as acceptable. |

Note: no `:deep()` against reka-ui internals anywhere in the slice — `metric-badge`/`timeline` `:deep` mentions (MetricBadge.vue:156, ContinuousTimeline.vue:434,738) are *comments* noting prior `:deep` reaches were **retired** in favor of slot-class props. Good citizenship.

### Axis 5 — Overlay + motion vocab

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 5.1 | `expandable-container/ExpandableContainer.vue:19` | Fullscreen teleport overlay: `fixed inset-0 z-modal flex … bg-background` — opaque cover, no Vue `<Transition>` entry/exit (the surface pops in). z-rung correct (`z-modal`). | Wrap the teleported cover in a named `<Transition>` (`fade` / `dialog-scale`, transitions.css) so the fullscreen swap brackets motion; brackets degrade under PRM via the global `utilities.css:990` rule |
| 5.2 | `scrolling-text/ScrollingText.vue:104` | `cubic-bezier(0.45, 0, 0.55, 1)` hand-rolled (the marquee pan ease) | No exact token match (this is a symmetric sine-in-out); acceptable as a component-local marquee curve, but consider minting `--ease-sine-in-out` if reused. Low priority. |
| 5.3 | `tabs/BouncyToggle.vue:163` | `readToken("--ease-apple-spring", "cubic-bezier(0.175, 0.885, 0.32, 1.275)")` — the literal is a **fallback string** for a `readToken` call (the token is the primary). Clean — fallback mirrors tokens.css:176. | No action (documented as the resolve-fallback pattern) |

### Axis 6 — Typographic / structural

| # | Site(s) | Drift | Canonical replacement |
|---|---------|-------|----------------------|
| 6.1 | `configurator/Configurator.vue:238`; `ConfiguratorRow.vue:83,91,103`; `ConfiguratorLayer.vue:121`; `search/FuzzySearch.vue:112,140,151,166,169,170`; `metric-badge/MetricBadge.vue:112,117,129,142`; `stacked-icons/StackedIconGroup.vue:36` | Slash-opacity text tints: `text-muted-foreground/{40,60,70,80,85}`, `text-foreground/85` — **17+ sites** inventing intermediate text-mute registers by alpha-fading an already-muted token rather than stepping the `--neutral-*` ladder | See GAP G2. `--muted-foreground` (=neutral-5) and `--muted-foreground-strong` (=neutral-6, tokens.css:360) are the two canonical sub-primary text rungs; the `/NN` fades reinvent rungs between them and below. |
| 6.2 | `configurator/Configurator.vue:235` | Preset chip uses `text-xs` (Tailwind raw) where the mono-caption / `.text-mono-caption` register would be canon for a chip label | `.text-mono-caption` (typography.css:378) or `.text-caption` |

### Axis 7 — A11y resilience

| # | Site(s) | Drift | Note |
|---|---------|-------|------|
| 7.1 | `expandable-container/ExpandableContainer.vue:5,22` | Reimplements glass (`bg-card/70` + `[backdrop-filter:…]`) **without** the PRT / `prefers-contrast` / `@supports not(backdrop-filter)` fallback that `.glass-*` classes carry (glass.css:295–346). Under reduced-transparency the inline `bg-card/70` stays translucent. | Adopt `.glass-btn`/`.glass-wash` (closes both 2.1 + 7.1) |
| 7.2 | `header-ribbon/HeaderRibbon.vue:30` | Anchor `@click` on a bare `<div>` (slot host, `<slot name="anchor">`) — keyboard-inoperable unless the consumer's slotted child is a real button. Acceptable IF documented as a consumer-supplies-interactive-element contract; flag for a doc note. | Low (consumer-owned slot); verify in DESIGN.md/types |

No `color-mix` baking a light-mode foreground into a dark-unwindable value found in the slice (the rgba at 1.3 is theme-frozen but not color-mix; the recipe replacement fixes it).

---

## GLASS-UI GAPS (legitimate library additions the slice needs)

- **G1 — Bouncy-toggle radius knobs.** `tabs/BouncyToggle.vue:342,349,358,400,420` hardcodes a 5-value radius ladder (`0.4375`/`0.5`/`0.3125`/`0.375`rem) for the track + sliding thumb at two breakpoints. None map to a `--radius-*` rung. **Propose:** `--toggle-track-radius` / `--toggle-thumb-radius` tokens in tokens.css §4 (semantic-alias block, near `--radius-badge`/`--radius-dock`), defaulting to the nearest existing rungs. ≥2 consumers: BouncyToggle + (prospective) ToggleChip share the segmented-pill geometry.

- **G2 — Intermediate text-mute rungs (the dominant finding).** 17+ sites across configurator, FuzzySearch, MetricBadge, StackedIcons, ConfiguratorRow alpha-fade `--muted-foreground` via `/40`, `/60`, `/70`, `/80`, `/85`. The canon exposes only two sub-primary text rungs (`--muted-foreground`=neutral-5, `--muted-foreground-strong`=neutral-6). The `/NN` fades reinvent: a *fainter-than-muted* rung (the `/40`–`/70` placeholder/secondary cases) and a *between-muted-and-strong* rung (`/80`–`/85`). **Propose:** either (a) a `--muted-foreground-faint` rung (one ladder step *below* neutral-5 toward the page, for placeholder/disabled-label text — mirrors the neutral-6 minting rationale at tokens.css:331), or (b) a documented `text-faint`/`text-secondary` typographic utility in typography.css that bakes the canonical mute so call sites stop hand-tuning alpha. Bidirectional: this is a glass-ui canon gap, not slice drift — the fix lands in the library.

- **G3 — Glass icon-button is CSS-only.** `expandable-container/ExpandableContainer.vue` hand-rolls a glass corner-trigger (twice) because `.glass-btn` is a CSS class, not a component, and the consumer wants Lucide-icon children + a title + positioning. The class exists and is the right surface (2.1) — but the *repeated inline glass recipe* (here + likely other custom triggers) suggests a thin `<GlassIconButton>` wrapper (icon slot + `.glass-btn` + four-state contract) would retire the soup class-by-class. ≥2 sites in this file alone; survey dock/controls for more before minting.

---

## UNION CANDIDATES (same pattern, both forms — propose canonical)

- **U1 — Active tab-chip vocabulary.** `configurator/Configurator.vue:237–238` hand-rolls active=`bg-foreground text-background` / inactive=`bg-card/40 hover:bg-card/70` for `role="tab"` preset chips. The dock tab-button active ladder (`--dock-active-bg`/`--dock-active-color`, tokens.css:918) and `toggle-chip` express the **same** segmented active-state semantic with three different vocabularies. **Propose canonical:** a `.tab-chip` component-layer recipe (or CVA branch on the existing `tabs/` family) reading a shared `--chip-active-{bg,fg,border}` token set — unifies Configurator presets + DockTabButton + ToggleChip onto one active-state contract, killing the call-site collapse.

- **U2 — Press-scale on inline buttons.** `configurator/ConfiguratorRow.vue:91` uses `active:scale-[var(--scale-press,0.97)]` (arbitrary value) while `.tap-squish` (utilities.css:199) and `.glass-btn`/`btn-interactive` express the identical press idiom via the token. **Propose canonical:** route all inline press-scale through `.tap-squish`; the arbitrary-value Tailwind escape is the drift form, the utility is the canon.

---

**Tally:** 18 drift sites across 7 axes (8 axis-1 token, 2 axis-2 hygiene, 3 axis-3 interactive, 1 axis-4 active-chip + 1 documented-clean :deep, 3 axis-5 motion, 2 axis-6 type, 2 axis-7 a11y) · 3 GLASS-UI GAPS (G2 text-mute rungs is the headline) · 2 UNION candidates. Slice is largely clean; concentrated in BouncyToggle, MetricRow, ExpandableContainer, configurator/*, TypewriterText. Aurora/glyph families clean (GL-only).
