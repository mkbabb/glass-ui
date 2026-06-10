# FIX-GLASSUI-DARK — DELTA (the FD-R2 glass-ui defect cohort)

Lane: FIX-GLASSUI-DARK · tranche/AY · 2026-06-10
Source defect ledger: `docs/tranches/AY/audit/design-r2/FDR2-glassui-panes.md` §4
Surface: glass-ui demo `:5199`. Captures at `docs/tranches/AY/audit/design-r2/captures/FIX-*.png` (1440×900 dsf 1.5 unless noted). π contrast = WCAG relative-luminance ratio measured from the rendered pixels (sRGB), worst-case against the BRIGHTEST backdrop sample in the text region.

## Disposition

Four of the five named items had a fix LANDED in commit `06795000` (the prior W-COHERE lane) and were VERIFIED here; DEFECT#1's HEADING + the body's worst-case backdrop contrast were still failing and were FIXED in this lane.

| # | defect | state at lane start | action | π / measure |
|---|---|---|---|---|
| 1 | auth-shell dark: muted body + heading sink into the light-locked coral panel | body pin landed (06795000) but HEADING still cream + body failed worst-case | FIXED — re-declare `color: var(--foreground)` (re-binds the inherited heading color against the pin) + darken `--muted-foreground` 38%→`hsl(24 9% 20%)` | HEADING **7.36:1 PASS**, BODY **5.31:1 PASS** (vs brightest aurora `rgb(202,157,160)`) |
| 2 | 404 egg lattice never paints + card off-center | wrapper fix landed (06795000) | VERIFIED PAINTS — canvas `1294×630`, **3.01% non-zero-alpha draw**; card center x=761 vs content-center 755 (rail-right 70 → 1440), **6px = centered** | — |
| 3 | configurator dark stage chroma-less mud | dark-arm full-chroma ramp + deep base landed (06795000) | VERIFIED CHROMATIC — stage maxChroma **39**, avgChroma 9.03, **28.8% chromatic pixels** (≥12 sRGB chroma) | CHROMATIC (bloom reads) |
| 4 | DropdownMenuSubContent not portaled → submenu clipped-invisible inside `max-h-[60vh] overflow-y-auto` | portal landed (06795000) | VERIFIED REACHABLE — submenu `128×120`, `display:block visibility:visible opacity:1`, `inViewport:true`, **clippedScrollAncestor:null**, **portaledToBody:true** | — |
| 5 | suffusion rank-1: icons-page color-pop thread (25%-mix chip recipe + one-color-event rule) | POPS section landed (06795000) | VERIFIED — 13-stop `--section-color-*` chip ramp (25%-mix circle backplate + full-chroma glyph) + the proportion rule written in the section blurb; both modes | — |

ContextMenuSubContent was inspected and left as-is: `ContextMenuContent` carries NO scroll-cap clip (`overflow-hidden` only, no `max-h`/`overflow-y-auto`), the demo uses no context submenu, so there is no active bug or consumer to verify — the DropdownMenu `max-h-[60vh] overflow-y-auto` clip is the named root bug and is the only SubContent that needed the portal.

## Edit (this lane)

`demo/stories/compositions/auth-shell.vue` `.auth-brand-panel` style block:
- added `color: var(--foreground)` so the `<h2>` heading (which inherits `color` from `body { color: var(--foreground) }` resolved ABOVE the panel = dark-mode cream) re-binds to the panel's pinned dark ink. The token pin alone did not touch the already-resolved inherited `color`.
- `--muted-foreground: hsl(24 6% 38%)` → `hsl(24 9% 20%)`. Over the brightest purple→tomato aurora region the `38%` muted ink cleared only ~2.5:1 (below AA); `20%` lands ~5:1 while staying lighter than the `10%` heading ink (the muted/heading hierarchy holds).

## Captures (literal filenames · real dims)

- `captures/FIX-auth-shell-desktop-light.png` (1440×900) — light unchanged; dark ink over coral, both legible.
- `captures/FIX-auth-shell-desktop-dark.png` (1440×900) — heading + muted body now legible dark ink (the fix).
- `captures/FIX-configurator-desktop-light.png` (1440×900) — pale lavender/violet pastel bloom (preserved).
- `captures/FIX-configurator-desktop-dark.png` (1440×900) — full-chroma rainbow bloom over deepened ink base.
- `captures/FIX-icons-desktop-light.png` (1440×1100) — POPS chip ramp (Pops section scrolled into view).
- `captures/FIX-icons-desktop-dark.png` (1440×1100) — POPS chip ramp, dark.
- `captures/FIX-notfound-egg-light.png` (1440×900) — constellation lattice painting, card centered.
- `captures/FIX-notfound-egg-dark.png` (1440×900) — same, dark.
- `captures/FIX-dropdown-submenu.png` (2160×1350) — "Open recent…" submenu open + reachable to the right.

## Gates / typecheck

Full `npm run typecheck` GREEN (both arms — the main + `tsconfig.test.json`; the FDR2-noted pre-existing underline test error is resolved at HEAD `06795000`). `proof:adaptive-glass`, `proof:glass-cohesion`, `proof:dropdown-type-scale`, `proof:dock-a11y-contract`, `proof:no-god-module`, `proof:storybook-complete`, `proof:no-orphan-demo-route` all GREEN.

## Out-of-lane note

`proof:all` (the full `--run local` fleet) FAILs at the `test` stage on `tests/components/custom/aurora/mediums-extraction.test.ts` (3 of 929 tests): the shader fixture expects `lenMulBig = mix(2.2, 3.8, …)` but `src/components/custom/aurora/constants/shaders/mediums.glsl.ts:370` has `mix(3.0, 5.2, …)`. The source shader was tuned (the AX/AY vangogh-medium rebuild) and the fixture was not updated. This is HEAD-intrinsic (working tree clean at lane start) and entirely the aurora-medium lane's territory — NOT touched or introduced by FIX-GLASSUI-DARK.
