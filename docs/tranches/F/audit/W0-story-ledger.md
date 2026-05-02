# F.W0 Story Substrate Ledger

The demo/storybook is a product surface and the runtime proof harness for the library. W0 found several story-only drifts that must be routed through W1, W2, W4, and W6 instead of being dismissed as demo polish.

## Route And Navigation Findings

| Surface | Current evidence | F action |
|---|---|---|
| Intro links | `demo/stories/foundations/intro.vue` duplicates categories and uses hash `href` links while the router uses history mode | replace with manifest-derived `RouterLink` paths |
| Flat stories | `/aurora` is in `FLAT_STORIES`, but pager and shortcut behavior are category-only | normalize global route navigation or disable documented shortcuts on flat routes |
| Keyboard help | `AppShell.vue` shows global shortcut help even where next/prev no-op | align help with the normalized navigation contract |
| Route manifest | 70 category stories plus 1 flat story have matching files; omitted `.vue` files are Aurora subcomponents | keep manifest as route source of truth and drive runtime smoke from it |

## Source Viewer Findings

| Surface | Current evidence | F action |
|---|---|---|
| `Story.sourceFiles` | type exists but manifest rows do not populate it | either remove unused source substrate or land real source-panel coverage |
| `useSourceLoader.ts` | not consumed; failures return empty strings | W1/W6 must not count it as proof until wired or deleted |
| `StoryPage.vue` | no source UI | source-view proof is only required if W1 chooses to keep the substrate |

## Configurator And Surface Findings

| Surface | Current evidence | F action |
|---|---|---|
| Configurator tokens | `--hue-shift` and density variables have little/no external consumption | W4 wires or removes them |
| Cartoon shadow | configurator writes `--shadow-card`; stories use `shadow-cartoon` and inline fallbacks | W4 chooses one authority and proves live changes |
| Composition story surfaces | many stories rebuild card/glass styling with raw classes and inline shadow fallbacks | W4 normalizes through primitives/shared surface only where it repairs token authority |

## Runtime Proof Needed

W1 must provide a reusable route smoke script. W6 must close with route coverage that:

- walks all 71 navigable routes from the manifest;
- asserts non-empty `main` content;
- fails on `MissingStory`;
- fails on console/page errors;
- proves active rail/pager state where applicable;
- tests shortcut behavior, including editable-field suppression;
- captures screenshots or comparable artifacts for W2/W4/W5 visual routes.

## W2/W4 Owned Files

- `demo/stories/foundations/intro.vue`
- `demo/stories/manifest.ts`
- `demo/composables/useStoryNavigation.ts`
- `demo/layout/AppShell.vue`
- `demo/layout/StoryPager.vue`
- `demo/layout/CategoryRail.vue`
- `demo/configurator/Configurator.vue`
- `demo/configurator/useConfigurator.ts`
- composition stories named by W4 surface-token proof
