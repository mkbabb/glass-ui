# BI.W-P109 — Card apotheosis — semantic content group

**Status:** DONE — PRODUCT COMPLETE
**Topological stratum:** BI.S16
**Formation family:** component-display
**Core centers:** C1_LIQUID_GLASS, C6_COMPONENT_APOTHEOSIS, C9_PRUNE
**Terminal owner:** glass-ui orchestrator

## Intent

Card owns proportional content grouping, anatomy, declared size, and optional selection composition. Surface owns every material concern. Button and Link own command behavior. Card must not become a second Surface or a second Button engine.

## Landed disposition

- Card is a semantic content group over one Surface root. It forwards material, tier, decoration, deep, shadow, grain, and specular; `CardTier` aliases `SurfaceTier`.
- The public barrel exports `CardProps` and the typed `sm | md` size axis. Defaults are elevated, medium, shadowed, and grained.
- Card owns only anatomy, size, selection, and the explicit static `cartoon`/`grid` decorations. It has no inferred interactivity, motion prop, press composable, pointer handlers, or press CSS property.
- Anatomy roots have stable slots and shared CSS. Header text uses `minmax(0, 1fr)`, titles wrap with heading leading, Content→Footer has one gap, and Footer wraps with a stable action gap.
- `ScrollCard` and `ScrollCardHeader` plus the pressable-only story are deleted. `CardHeader shrink` and `.card-scroll-host` remain as the small live Speedtest seam.
- `display/card.vue` is the six-state board plus one direct shrink-header composition; Surface taxonomy is not repeated.

## Public contract

- Export `CardProps`.
- Define `CardTier` as an alias of `SurfaceTier`; do not maintain a second literal union.
- Add typed `size?: "sm" | "md"` with `md` as the default. Size controls Card anatomy spacing through Card-owned CSS/data state.
- Retain the Card anatomy: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and `CardAction`.
- Retain optional selection composition and its existing selected/metal/data-hue state, provided it remains a decoration/state of grouped content rather than an implicit command.
- Forward material, tier, depth, shadow, grain, and specular choices to Surface. Card must not paint or resolve a second material system.
- Remove Card's automatic `useLiquidPress`, interactive-tag inference, motion engine, pointer handlers, and press-specific styles. Interactive cards are composed with an explicit Button or Link whose accessible name, focus, keyboard, disabled, and activation semantics remain native to that control.
- Delete public `ScrollCard` and `ScrollCardHeader`. Keep `CardHeader shrink` and the minimal shared scroll-host CSS needed by its live consumer.
- Card remains polymorphic for semantic grouping elements such as `article` and `section`; polymorphism alone must not add command behavior.

## Proportional anatomy

- Keep the existing proportional inline/block token ladder as the single spacing source.
- When `CardContent` is followed by `CardFooter`, remove the duplicate content-bottom contribution and retain one intentional footer separation.
- Use `minmax(0, 1fr) auto` for header text plus `CardAction`; long titles/descriptions must wrap without pushing the action outside the card.
- Let footer actions wrap on narrow cards and preserve a sensible touch gap.
- Replace `leading-none` with multiline-safe title leading while keeping the title visually tighter than body copy.
- Give every anatomy root a stable `data-slot`; move repeated raw structural utilities from templates into `src/components/card/styles.css`.
- Dividers are optional and structural. Do not add a default line between anatomy regions; use one only when it clarifies a genuine boundary.

## Implementation order

1. Land P063 so Card can consume one truthful Surface contract.
2. Reduce `Card.vue` to Surface forwarding, semantic grouping, size state, and selection state. Move specular to Surface and delete the Card press/motion engine and Card-local material paint.
3. Export `CardProps`, alias `CardTier`, add typed size, and normalize anatomy slots and CSS.
4. Fix the Content→Footer gap, header min-content behavior, footer wrapping, and multiline title leading.
5. Delete `ScrollCard.vue`, `ScrollCardHeader.vue`, their exports, and the duplicate ScrollCard story section. Preserve the underlying `CardHeader shrink` behavior used by speedtest.
6. Delete `containers/card-pressable.vue` and its manifest entry. Demonstrate interactive composition once in the main Card story with an explicit Button or Link.
7. Collapse `display/card.vue` into one state board: content, elevated, interactive-composed, selected, dense, and narrow. Surface roles are shown in the Surface story, not repeated here.
8. Repair direct consumers and then run focused checks once for the combined Surface/Card batch.

## Exact component file plan

| action | path | required change |
| --- | --- | --- |
| modify | `src/components/card/Card.vue` | Exportable props; size/selection/grouping only; forward Surface axes; remove press, motion, specular, and local material resolution. |
| modify | `src/components/card/index.ts` | Export `CardProps`; alias Surface types; remove ScrollCard exports. |
| modify | `src/components/card/CardHeader.vue` | Stable slot, `minmax(0, 1fr)` layout, retain shrink. |
| modify | `src/components/card/CardTitle.vue` | Stable slot and multiline-safe leading. |
| modify | `src/components/card/CardDescription.vue` | Stable slot and owned typography hook. |
| modify | `src/components/card/CardContent.vue` | Stable slot and adjacency-safe spacing. |
| modify | `src/components/card/CardFooter.vue` | Stable slot, single preceding gap, narrow wrapping. |
| modify | `src/components/card/CardAction.vue` | Stable slot and action-column alignment only. |
| modify | `src/components/card/styles.css` | Own anatomy, sizes, selection, and proportional spacing; delete Card material and press styles. |
| retain narrowly | `src/components/card/card-scroll.css` | Only the scroll timeline/shrink seam required by `CardHeader shrink`; no wrapper component authority. |
| delete | `src/components/card/ScrollCard.vue` | Redundant demo-only wrapper. |
| delete | `src/components/card/ScrollCardHeader.vue` | Redundant demo-only wrapper. |

## Exact story and consumer repairs

| target | disposition |
| --- | --- |
| `demo/stories/display/card.vue` | Replace the sprawling duplicate catalogue with the six-state Card board and one concise `CardHeader shrink` example. |
| `demo/stories/containers/card-pressable.vue` | Delete; interactive composition belongs in the Card board and command behavior belongs to Button/Link. |
| `demo/stories/manifest.ts` | Remove the pressable route and keep one Card route. |
| `demo/chassis/code/CodeBlock.vue` | Compose Card/anatomy instead of copying glass and Card padding tokens. |
| `demo/chassis/showcase/ShowcaseFrame.vue` | Compose Card or Surface for the plate; keep the field/layout wrapper plain. Avoid an always-on decorative divider. |
| `demo/chassis/hero/StoryHero.vue` | Use the final typed Card API; remove raw material or spacing overrides owned by Card/Surface. |
| `demo/shell/NotFound.vue` | Put copy/actions in Card anatomy so default padding and hierarchy apply. |
| `demo/stories/compositions/empty-states.vue` | Replace calculated Card padding utilities with typed size/anatomy. |
| `demo/stories/compositions/gate-pattern.vue` | Keep Card grouping; ensure the actual command remains Button/Link. |
| `demo/stories/compositions/settings.vue` | Remove repeated border overrides; use the declared Surface role and Card anatomy. |
| `demo/stories/containers/dropdown-menu.vue` | Replace bare padded Card specimen plates with Surface or CardContent as semantically appropriate. |
| `demo/stories/containers/hover-popover.vue` | Replace bare padded Card specimen plates with Surface or CardContent as semantically appropriate. |
| `demo/stories/containers/popover.vue` | Replace bare padded Card specimen plates with Surface or CardContent as semantically appropriate. |
| `demo/stories/containers/sheet.vue` | Replace bare padded Card specimen plates with Surface or CardContent as semantically appropriate. |
| `demo/stories/data/avatar.vue` | Use typed size/anatomy or Surface when the plate is not a content group. |
| `demo/stories/data/search.vue` | Remove raw padding/partial anatomy and keep result actions explicit. |
| `demo/stories/data/sortable-list.vue` | Use typed dense Card anatomy; drag semantics remain with the sortable control. |
| `demo/stories/data/tags-input.vue` | Use typed size/anatomy or Surface when the plate is only a specimen host. |
| `demo/stories/display/card.tile.vue` | Use final anatomy and declared size without private spacing recipes. |
| `demo/stories/display/separator.vue` | Keep deliberate separator examples; do not make their dividers a Card default. |
| `demo/stories/foundations/surface-tints.vue` | Remove Card-specific material claims superseded by the Surface story. |
| `demo/stories/substrates/glass-material.vue` | Correct deep/tier prose to the final Surface API. |
| `demo/stories/substrates/glass-panel.vue` | Preserve the no-third-panel doctrine and point bare plates to Surface. |
| `DESIGN.md` | Record the Surface/Card/Button ownership boundary and proportional anatomy. |

Repair other manifest-listed Card consumers only when the final API or a raw Card-owned recipe actually affects them; do not churn correct anatomy users for wave bookkeeping.

## Product acceptance

- The six-state board makes content hierarchy, elevation, explicit interactivity, selection, density, and narrow reflow immediately distinguishable without decorative noise.
- Default and dense cards preserve proportional inline/block spacing; Content followed by Footer has one intentional gap, not two.
- Long titles/descriptions wrap beside `CardAction`; footer controls wrap without clipping and retain coarse-pointer target spacing.
- Static cards have no pointer-press motion, implicit focus, keyboard activation, or command cursor. The interactive-composed example receives all of those from its Button or Link.
- Selection is perceivable without color alone and does not flood the content plate.
- Card material matches the same Surface role shown in the Surface story in light, dark, complex-backdrop, and reduced-transparency modes.
- The public package no longer exports ScrollCard wrappers or a Card-local material/press engine; `CardHeader shrink` remains functional for its live speedtest consumer.
- Existing external Card consumers retain the standard anatomy exports. Any breaking removal is called out in the 6.0.0 export-map handoff.

## Verification

After the combined Surface/Card implementation batch, run typecheck and focused Card/public tests once. Inspect the consolidated Surface and Card stories with the native in-app browser at wide/light, wide/dark, narrow/coarse, reduced motion, and reduced transparency. Confirm computed geometry and visible hierarchy rather than adding receipt, attestation, lock, or local proof machinery. Do not use Playwright for this wave.

## Dependency

P109 depends on the settled P063 Surface API. If a Card requirement appears to need new material or command behavior, repair Surface or compose Button/Link; do not mint a Card-local exception.
