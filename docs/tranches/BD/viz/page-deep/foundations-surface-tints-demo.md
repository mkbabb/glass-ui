# Pass-E META-STORYBOOK deep audit — foundations/surface-tints

- **Route:** `/foundations/surface-tints`
- **SFC:** `demo/stories/foundations/surface-tints.vue`
- **Manifest row:** `demo/stories/manifest.ts:508` (`s("foundations","surface-tints","Surface Tints", …)`); subpath `manifest.ts:214` → `/foundations/surface-tints`; background `CATEGORY_DEFAULT_BG.foundations = "paper"` (`manifest.ts:182`) — NO explicit override, so this page renders on the static **paper** wash, NOT aurora.
- **Live spot-check:** `http://localhost:5173/foundations/surface-tints` (dev on :5173), both modes, fullPage screenshot + `getComputedStyle` probes.

## Verdict snapshot

A flat, single-card token spec-sheet. It is one of the THIN/FLAT pages: zero glass-ui components composed (no dock/tabs/buttons/cards-per-section/procedural-anim), no live colorful field, all three sub-sections crammed into ONE body card, and — critically — **the second of three sections is a DEAD demo** (the tier-alias swatches paint fully transparent because the SFC reads tokens that do not exist).

---

## (1) DEMO CONGRUENCE — does it show the surface-tint system at its BEST + full API?

**NO — thin, and partly dead.**

- The page is a TOKEN page, not a component page; the "component" is the `--surface-tint-*` ladder. It shows the 9 numeric rungs (`surface-tints.vue:22-32`) as static checker-backed swatches. That is a legitimate token-tour, but the rendering is uninspired: 11 near-identical gray-step rectangles. The blurb (`:45`) promises "warm-cream → cooler gradation," but live (`color(srgb 0.11 0.098 0.09 / 0.04..0.25)`) every rung is the SAME warm-ink hue at rising alpha — there is **no warm→cool gradation to read**; the promise the blurb makes is not a property the tokens have. Tighten the blurb or stop claiming a gradation that isn't there.
- **The canonical USE of the token is never demonstrated.** The blurb says "Use the canonical `border-[var(--surface-tint-N)]` recipe for chassis hairlines" but the page paints them as `bg-` FILLS, never as the hairline border they actually exist for (the configurator-divider / chassis-rim register, CLAUDE.md §BA.W-CONFIG-CHASSIS). A best-in-class demo would show a real card/configurator/dock chassis with its hairline lit by `--surface-tint-N`, side-by-side with the rung. The token's real home (a glassy chassis edge) is entirely absent.
- No animation affordance whatsoever beyond the inherited `.scroll-cascade` page-build (`:47`, `:66`). The user's "HIGH animation affordance for EVERY component" bar is unmet — a tint ladder could, e.g., sweep the active rung, or hover-lift each swatch.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**NO.** The SFC imports exactly two demo-chassis primitives — `StoryPage` + `StorySection` (`:13-14`). Zero library components: no `<Card>` per section, no `<SegmentedTabs>` to switch scale/aliases/dark views, no `<Button>`, no dock, no procedural anim. The body is hand-rolled `<div class="tint-grid">` + `<div class="tint-checker">` + `<code>` (`:47-58`). This is the flattest class of page — a spec-sheet, not a composition.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**NO live field.** `background: "paper"` → a static paper wash, no `<Aurora>`/`<canvas>` (`evaluate_script` confirms `aurora: false`, zero `<canvas>`). The single body card is `glass-resting` over a flat paper page, so the glass morphism does not read — there is nothing behind the plate to refract. For the page whose ENTIRE subject is translucent surface tints, demoing them over a flat field is the BG-2 self-defeat class the StoryHero docs warn about. The user's bar — "glass demos over COLORFUL aurora backgrounds" — is structurally unmet. PAPER morphism: the page sits ON paper but never demonstrates paper morphism (no grain/blueprint specimen).

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**NO on both.**

- **One card, three sections.** Live: `.story-sections` holds 3 bare `<section class="flex flex-col">` blocks (no card each), all inside the SINGLE `.story-hero-card glass-resting` body plate. The user's "each sub-section in its OWN glassy card" is unmet — sections are separated only by the chassis hairline delimiter, not framed as distinct glass cards.
- **Main card area too small / sparse.** Article width 1152px on a 1440px viewport; the body card holds 9 small swatches in row 1 and 2 in row 2 (huge dead space to the right of `--surface-tint-22/25`), then a heading-only third section. The "BIGGER main card area / more screen space" bar wants the specimen to OWN the canvas; here the content is a thin strip with whitespace below.

## (5) PATH-LABEL standardization

**PASS.** The Fira-Code subpath chip renders `/foundations/surface-tints` (screenshot + `manifest.ts:214`), matching the route-path convention for non-import token pages. No action.

## (6) LANGUAGE — superfluous prose to tighten

- `:45` blurb is overlong AND over-claims: "warm-cream → cooler gradation … NOT over a same-tone plate where the gradation vanishes." Drop the meta-justification of the checkerboard (the user doesn't need the FD-FS rationale), and drop the warm→cool claim (not visually true). Tighten to: "Translucent foreground-over-transparent overlays. Each rung's alpha reads against the checker. Use `border-[var(--surface-tint-N)]` for chassis hairlines."
- `:64` alias blurb fine but the `<Card tier='quiet'>` example is slightly misleading (Card's `tier` maps to glass rungs, not surface-tint aliases — spot-check before keeping).
- `:83` dark-mode section blurb "Toggle the theme with the Dark Mode Toggle in the demo header — the swatches above shift" — a section that is ONLY an instruction to look elsewhere; it should either render its OWN light-vs-dark swatch pair or be folded into section 1's caption.

## (7) BUGS

- **CRITICAL — DEAD DEMO: the tier-alias section paints nothing.** `surface-tints.vue:34-38` reads `bg-[var(--surface-tint-quiet)]` / `-floating` / `-modal`. Live, all three swatches resolve `background-color: rgba(0, 0, 0, 0)` (fully transparent) and the tokens resolve EMPTY at `:root`. Root cause: those aliases exist ONLY as the Tailwind `@theme` bridge `--color-surface-tint-{quiet,floating,modal}` (`src/styles/theme/bridges.css:159-161`), consumed as the utility `bg-surface-tint-quiet`. The bare `var(--surface-tint-quiet)` (no `--color-` prefix) the SFC uses is undefined. **Fix:** use the utility `bg-surface-tint-quiet` / `bg-surface-tint-floating` / `bg-surface-tint-modal` (matching the bridge's documented usage), OR `var(--color-surface-tint-quiet)`. As shipped, 1/3 of the page demonstrates a blank checkerboard with a code label — the demo is lying.
- Note (not a bug): the 9-rung scale + dark-mode shift work correctly (dark probe returns the cream-warm ink arm `oklch(from hsl(30 14% 90%) …)`, W-DARK-INK-WARM).

## RECOMMENDED REBUILD (architectural, gestalt)

1. **Aurora background.** Override the manifest row to `background: "aurora"` (or `constellation`) so the glass body card + a `tier="field"` specimen frame let the translucent tints read against a LIVE colorful field — the page's entire subject is translucency.
2. **Own card per section** via real `<Card>` (3 cards: scale · aliases · dark-parity), or `<SegmentedTabs>` to switch among scale/aliases/dark views in one big stage — leverage the dock/tabs contextual-switching APIs the user named.
3. **Demo the REAL use:** a glassy chassis (Card/Configurator/Dock) whose HAIRLINE is lit by the active rung, beside the swatch — the `border-[var(--surface-tint-N)]` recipe the blurb already names.
4. **Fix the alias bug** (`bg-surface-tint-*`).
5. **Animate:** hover-lift / active-rung sweep on each swatch; the `.scroll-cascade` alone is not "HIGH animation affordance."
6. **Tighten the three blurbs** per (6); make the dark-parity section render a paired light/dark swatch instead of an instruction.
