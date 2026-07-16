import type { InjectionKey } from "vue";

/**
 * the family-collapse nesting seam.
 *
 * A FAMILY page (`forms/inputs`, `data/metrics`, `motion/text-motion`, …) shows N
 * component-family members on ONE surface via `<FamilyTabs>`. Each member is its
 * OWN existing story SFC — which wraps `<StoryPage>` — so composing it inside the
 * family page would double the page chrome (a second hero and route article).
 *
 * `<FamilyTabs>` PROVIDEs this key `true`, and `<StoryPage>` INJECTs it: when nested
 * a StoryPage renders BARE (just its `<slot />` body — the member's own sections),
 * dropping the hero/chrome header + article wrapper. So a family
 * page renders ONE identity header (its own) over N member bodies, with ZERO member
 * content re-authored (the DRY collapse — the member SFCs stay their own files).
 */
export const STORY_NESTED_KEY: InjectionKey<boolean> = Symbol("story-nested");
