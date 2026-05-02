# F.W4 Theme And Style Proof

Generated: 2026-05-02
Status: pass

## Scope Closed

F.W4 corrected style authority without changing the intended visual language:

- Tailwind v4 theme utility namespaces now compile from explicit bridge variables for text, font, leading, tracking, color, shadow, radius, z-index, easing, duration, blur, and animation utilities.
- Runtime tokens remain the semantic design source; Tailwind `@theme` entries are utility-generation bridges, not self-referential runtime aliases.
- Dock styling has one authority in `src/styles/dock.css`; dock SFC scoped style blocks were removed.
- Retired global utility cruft was removed from `src/styles/utilities.css`.
- Glass transitions, notification/toast z-indexes, and story/configurator shadows now route through named tokens.
- W0-named brittle selectors were narrowed or removed, including broad dock selectors, broad carousel deep selectors, and global `transition: all` usage in touched surfaces.

## Generated Evidence

- `npm run proof:theme`: pass, artifact `W4-tailwind-theme-proof.json`
- `npm run iter-check`: pass
- `npm run iter-test`: pass, 18 files / 259 tests
- `npm run iter-build`: pass
- `GLASS_UI_RUNTIME_ARTIFACT=docs/tranches/F/audit/W4-runtime-smoke.json GLASS_UI_RUNTIME_SCREENSHOT_DIR=docs/tranches/F/audit/screenshots/W4/runtime GLASS_UI_RUNTIME_SCREENSHOT_ROUTES="/foundations/intro,/compositions/dashboard,/compositions/auth-shell,/compositions/empty-states,/compositions/hero,/compositions/settings,/navigation/dock,/navigation/rail,/navigation/dock-layers" npm run proof:runtime`: pass, 71 routes
- `GLASS_UI_BUNDLE_ARTIFACT=docs/tranches/F/audit/W4-bundle-profile.json npm run profile:bundle`: pass
- `npm test -- tests/public-surface.spec.ts`: pass, 154 tests
- `git diff --check`: pass

The theme proof generated every expected custom utility class and found no invalid old Tailwind namespaces, self-referential theme variables, unresolved shimmer/progress utility tokens, brittle matched patterns, or dock SFC scoped style blocks.

## Bundle Measurements

Bundle measurements are recorded as measurements, not hard gates.

| Artifact | Total bytes | Total gzip | CSS bytes | CSS gzip |
|---|---:|---:|---:|---:|
| W1 baseline | 403503 | 102634 | 44143 | 7056 |
| W4 close | 390524 | 101781 | 26518 | 4847 |
| Delta | -12979 | -853 | -17625 | -2209 |

The CSS reduction comes from removing orphaned utilities and consolidating dock style authority. JS grew by 4646 bytes / 1356 gzip versus W1 because the prior waves added proof-backed component and dock behavior; that is recorded, not treated as a failure.

## Deliberate Decisions

- `--transition-duration-*` remains in the theme bridge because Tailwind v4 uses it to generate `duration-*` utilities. The W4 proof asserts `duration-panel` and `duration-fast` compile.
- Component-specific style remains colocated only where it is truly component-local. The dock family moved the opposite direction because W2 made it one coordinated component substrate.
- `:deep(.glass-carousel-item)` remains as a narrow slot-child contract. The broad `:deep(*)` selector was removed.
- Runtime screenshot PNGs under `audit/screenshots/W4/runtime/` are local visual evidence and remain git-ignored; the committed JSON artifact records the checked routes.

## Residuals

No W4 residual remains. Any future plugin extraction or CSS floor belongs after F.W6 because W4 established correctness and authority, not a packaging split.
