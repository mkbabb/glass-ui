# BI.W-P056 — Demo information architecture and shell restraint

**Status:** SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING
**Product slice:** B · quiet shell and mobile reachability
**Depends on:** Slice A

## Owner ruling

The route hierarchy, semantic not-found route, focus reset, live route announcement, and intrinsic footer are useful product work already present. Finish this wave by removing competing shell ornament and duplicate navigation. The current main/footer composition is protected.

## Protected shell invariant

`AppShell` keeps one column with:

- `main.demo-main-scroller` as the sole flexible scroll port (`flex: 1`, `min-height: 0`, `overflow-y: auto`);
- `BottomDock` as an adjacent intrinsic footer (`flex: 0 0 auto`);
- symmetric route padding (`py-6`, `md:py-10`);
- safe-area padding owned by the footer itself.

Do not restore fixed/absolute footer positioning, guessed bottom padding, spacer elements, or a second route scroller.

## Slice B — exact files

| action | path |
| --- | --- |
| modify | `demo/shell/AppShell.vue` |
| modify | `demo/shell/BottomDock.vue` |
| modify | `demo/shell/SidebarDock.vue` |
| modify | `demo/shell/dock-nav.css` |
| delete | `demo/shell/useShellScrollProgress.ts` |
| modify | `demo/shell/NotFound.vue` |
| modify | `tests/demo/landing.test.ts` |

## Required implementation

1. Remove the shell-mounted `ScrollProgressRim` and its provided scroll-fraction plumbing. The public component and its focused component story remain outside this slice.
2. Show the category-dialog trigger and its adjacent separator only where the desktop sidebar is unavailable. Desktop must not expose two category-navigation owners.
3. Retain the in-category story strip and next/previous actions when they remain reachable and proportionate.
4. Delete the unused section-landing skeleton styles.
5. Keep unknown routes honest: one primary heading, short explanation, and one reachable recovery action using normal Card anatomy.
6. Preserve route history, route focus reset, live announcement, and canonical direct links.

## Explicit removals

- Scroll progress as shell navigation ornament.
- Desktop duplication of the category trigger beside the visible sidebar.
- Dead route-skeleton CSS.
- Compatibility redirects for removed stories.
- Any change that turns Dock rendering into a prerequisite for story content.

## Acceptance

- Desktop exposes one category-navigation owner; narrow layouts expose the mobile category action.
- Keyboard focus reaches every visible footer action and restores sensibly after the mobile category dialog closes.
- Scrolling to the last route element never places it beneath the footer.
- The footer consumes its intrinsic height without route-specific spacers or bottom-padding estimates.
- An unknown route exposes one `h1` and a working recovery action.
- Verify Slices A and B as one major batch in the native in-app browser at desktop and 390×844, including keyboard traversal and the last scroll position. Do not use Playwright.

## Out of scope

- Reworking the public Dock API.
- Further work on `ScrollProgressRim` itself.
- Automated visual-runner infrastructure.
