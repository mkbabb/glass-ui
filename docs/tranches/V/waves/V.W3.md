# V.W3 — Structural unions (v0.8.6 → v0.9.0)

**Cohort window**: `2e01d68` (2026-05-07) → `7ed3b73` (2026-05-08) — 26 commits between v0.8.6 and the v0.9.0 storybook expansion.
**Mode**: sequential structural-union cohort (the actual dispatch was direct-to-master; this spec is post-hoc).
**Status**: closed @ `7ed3b73` (popover-animation grammar unification — last V.W3-flavor commit before V.W4 chassis primitives begin landing).

## Purpose

V.W3 collapses 11+ parallel-primitive vocabularies onto canonical `_shared` SFCs + CVAs + utilities + data-attributes. Where V.W2 swept the long-tail substrate (tokens, classes, foreground-token consumers), V.W3 collapses the primitives that consume them — `<ModalOverlay>` for 3 scrim declarations, `menuItemVariants` for 9 menu/picker items, density-rail for 3 cluster-shells, popover-animation grammar for 4 popover surfaces, surface-tint tier aliases, active-state vocabulary canon, `<Section>` sectioning primitive, `<LabeledField>` parent SFC.

V.W3 also lands the icon-size token rungs (`--icon-{2xl,3xl,hero}`), `--z-behind: -10`, `.hairline-accent` canonical token + utility, theme bridges, and finishes the typography-ladder migrations + radii sweep deferred from V.W2 cohort end.

## Commit cohort

### Menu + popover refinements

| Commit | Subject |
|---|---|
| `2e01d68` | fix(menu-item): explicit data-[disabled] selectors per three-state contract |
| `345d11e` | refactor(radius): migrate raw rounded-{full,md,lg,xl} → token-bridged radii |
| `cf3bf37` | refactor(typography): Dialog/Sheet/Drawer titles → typography ladder |
| `6086fb1` | refactor(empty-wrapper-sfc): KEEP-as-3-line-wrapper decisions for 11 SFCs |

### Token + theme expansion

| Commit | Subject |
|---|---|
| `afb2b34` | refactor(tokens): excise 12 orphan tokens (zero-consumer verified) |
| `0187c7d` | refactor(focus-ring): unify .glass-btn onto box-shadow form |
| `4fb2102` | refactor(tokens): document --duration-shimmer offset (preserves runtime) |
| `b66891d` | feat(utility): hairline-accent canonical token + .hairline-accent utility |
| `4cc8571` | feat(tokens): --icon-2xl: 2rem (32px) icon-size rung |
| `a371fe7` | feat(tokens): --icon-3xl: 2.5rem (40px) icon-size rung |
| `4ebc597` | feat(tokens): --icon-hero: 3.5rem (56px) icon-size rung |
| `ee34655` | feat(tokens): --z-behind: -10 (Aurora background tier) |
| `a6aac47` | feat(theme): bridge new icon + z-behind tokens through @theme |
| `1c3355a` | refactor(notification,toast): retire shadow-lg in favour of canonical tier shadows |
| `21be437` | refactor(notification,slider): adopt canonical glass-blur per primitive tier |
| `8912d4b` | refactor(radius): sweep remaining raw radii in toggle/button/avatar/badge |
| `38b94ac` | refactor(typography): Card + Label titles → typography ladder |

### Resource hints + PRM bracketing

| Commit | Subject |
|---|---|
| `08ffbde` | feat(resource-hints,browserslist): preconnect api.fontshare.com + .browserslistrc floor |
| `55c544f` | feat(gold-shimmer): wrap animation in prefers-reduced-motion no-preference bracket |

### Structural unions (the V.W3 headline)

| Commit | Subject | Collapses |
|---|---|---|
| `c3df06e` | feat(density-rail): unify GlassDock + DockGroup + MetricPill onto data-density canonical | 3 cluster-shells onto `data-density` |
| `6e6916e` | feat(menu-item): collapse 9 primitives onto shared menuItemVariants CVA | DropdownMenu × 4 + ContextMenu × 4 + Select/Combobox/CommandItem |
| `1841de5` | feat(popover-content): collapse 2 W1 survivors → .popover-content utility | 2 popover stragglers |
| `43bee82` | feat(ModalOverlay): collapse 3 scrim declarations onto _shared SFC | Dialog + DialogScroll + Sheet |
| `05e1d44` | feat(LabeledField): parent SFC + .labeled-field-label utility, 4 wrappers compose | LabeledInput + LabeledSelect + LabeledSlider + LabeledSwitch |
| `3e925e1` | feat(active-state): canonicalise BouncyToggle + UnderlineTabs vocabulary | 2 active-state vocabularies |
| `d2247c8` | feat(Section): introduce sectioning primitive over the typography ladder | NEW primitive over typography ladder |
| `c0b8992` | refactor(utilities): standardise popover-animate + slide-in-from-side on @utility | popover-animate canonical form |
| `7ed3b73` | feat(popover-animation): unify hover-popover + floating-panel onto canon grammars | 4 popover-animation grammars onto canon |
| `44f2414` | feat(theme): bridge surface-tint tier aliases (quiet/floating/modal) | Surface-tint tier alias bridges |

## Hard-gate items

- `<Section>` sectioning primitive over typography ladder (`d2247c8`).
- Active-state vocabulary canon: BouncyToggle + UnderlineTabs (`3e925e1`).
- `<LabeledField>` parent SFC + `.labeled-field-label` utility, 4 wrappers compose (`05e1d44`).
- `<ModalOverlay>` collapses 3 scrim declarations onto `_shared` SFC (`43bee82`) — absorbs K W2.c.
- `.popover-content` utility collapses 2 W1 survivors (`1841de5`).
- `menuItemVariants` collapses 9 menu/picker primitives onto shared CVA (`6e6916e`).
- Density-rail unification: GlassDock + DockGroup + MetricPill onto `data-density` canonical (`c3df06e`).
- `gold-shimmer` wrapped in PRM no-preference bracket (`55c544f`).
- Resource hints + `.browserslistrc` (`08ffbde`).
- Popover-animate + slide-in-from-side standardised on @utility (`c0b8992`).
- Hover-popover + floating-panel unified onto canon grammars (`7ed3b73`).
- Surface-tint tier aliases bridged: quiet / floating / modal (`44f2414`).
- Theme bridges + new icon + z-behind tokens (`a6aac47`).
- Tokens: `--icon-{2xl,3xl,hero}` (`4cc8571`, `a371fe7`, `4ebc597`), `--z-behind` (`ee34655`).
- Hairline-accent canonical (`b66891d`).
- Notification + slider canonical glass-blur (`21be437`); Notification + toast canonical tier shadows (`1c3355a`).
- `dark-mode-toggle` focus-visible ring (`5a8a7f8` — chronologically v0.8.6 cohort but referenced here for completeness).
- Menu-item three-state contract data-[disabled] selectors (`2e01d68`).
- Focus-ring `.glass-btn` unified onto box-shadow form (`0187c7d`).
- 12 orphan tokens excised (`afb2b34`) — absorbs 12 K chronic-deferral rows.
- Empty-wrapper-SFC KEEP-as-3-line-wrapper decisions for 11 SFCs (`6086fb1`).
- Typography ladder migrations: Card + Label (`38b94ac`), Dialog/Sheet/Drawer titles (`cf3bf37`).
- Radii sweep: toggle/button/avatar/badge (`8912d4b`).

## Architectural transpositions executed (10)

1. **`<Section>`** (`d2247c8`) — sectioning landmark over typography ladder; composes heading + title + subheading + label rungs. New `.section-description` utility.
2. **`<ModalOverlay>`** (`43bee82`) — `_shared` SFC collapsing Dialog + DialogScroll + Sheet overlays onto `scrim × animate × layout` CVA-style props. Effectively retires bare `@utility overlay-scrim` block (now dead code at HEAD; formal-delete deferred to K W3).
3. **`<LabeledField>`** (`05e1d44`) — parent SFC + `.labeled-field-label` utility; 4 wrappers (LabeledInput, LabeledSelect, LabeledSlider, LabeledSwitch) compose internally. K explicitly deferred this to L per cross-tranche debt; landed inside V's window anyway.
4. **`menuItemVariants` CVA** (`6e6916e`) — shared `_shared` CVA collapsing 9 menu-family + picker-family items.
5. **Density-rail unification** (`c3df06e`) — GlassDock + DockGroup + MetricPill onto `data-density` canonical attribute.
6. **Popover-animation grammar** (`7ed3b73`, `c0b8992`) — HoverPopover + floating-panel onto canonical `.popover-animate` + slide-in-from-side `@utility` form.
7. **`.popover-content` utility** (`1841de5`) — collapses 2 W1 survivors.
8. **Surface-tint tier aliases** (`44f2414`) — `--surface-tint-{quiet,floating,modal}` over the 9-rung surface-tint family.
9. **Active-state vocabulary canon** (`3e925e1`) — BouncyToggle + UnderlineTabs unified.
10. **Focus-ring `.glass-btn` unification** (`0187c7d`) — migrated to canonical box-shadow form.
11. **Menu-item three-state contract** (`2e01d68`) — explicit `data-[disabled]` selectors at substrate.

## Token expansion

- `--icon-{2xl,3xl,hero}` rungs (`4cc8571`, `a371fe7`, `4ebc597`).
- `--z-behind: -10` (`ee34655`) for Aurora background tier.
- `--surface-tint-{quiet,floating,modal}` aliases (`44f2414`).
- `.hairline-accent` canonical (`b66891d`).
- `--duration-shimmer` documented (`4fb2102`).
- 12 orphan tokens excised (`afb2b34`) — `--duration-{linger,popup-swap,shimmer-slow}`, `--easing-accent`, `--shadow-cartoon-color-hover{,-soft}` (light + dark mirror), `--motion-slide-{sm,md,lg}`, `--popover-offset`.

## Authority

V.W3 closes at `7ed3b73`. No 6-agent post-close audit ran; no `audit/V.W3-*.md` deliverables exist. K's 2026-05-08 reconciliation substitutes.

Cross-tranche debt absorbed: K W2.c (`.overlay-scrim` collapsed via `<ModalOverlay>`), 12 K chronic-deferral substrate-without-consumer rows (`afb2b34`).
