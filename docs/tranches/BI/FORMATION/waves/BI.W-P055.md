# BI.W-P055 — One demo chassis grammar

**Status:** SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING
**Product slice:** A · universal hierarchy subtraction
**Depends on:** current P091 integration reaching a safe boundary

## Owner ruling

The shared chassis is real and widely adopted, but it has accumulated a second layer of universal animation and metadata chrome. Finish this wave by subtracting that layer. Do not rebuild the story catalogue or introduce another chassis abstraction.

## Product outcome

- One routed page owns one clear `h1` and one supporting lede.
- The first live subject or causal control precedes explanatory prose at wide and narrow sizes.
- Section hierarchy comes from type, spacing, and the occasional earned divider; it does not require a typewriter, sticky title, or entrance cascade on every page.
- Concept-specific hero art and motion remain available when they clarify the subject.
- The shell's intrinsic footer and sole-scrolling main remain unchanged.

## Slice A — exact files

| action | path |
| --- | --- |
| modify | `demo/chassis/page/StoryPage.vue` |
| modify | `demo/chassis/hero/StoryHeader.vue` |
| modify | `demo/chassis/hero/StoryHero.vue` |
| modify | `demo/chassis/hero/story-hero.css` |
| modify | `demo/chassis/section/StorySection.vue` |
| delete | `demo/chassis/section/useSectionReveal.ts` |

## Required implementation

1. Remove the shared observer/provider and the universal per-glyph section reveal.
2. Remove the universal body cascade and sticky-shrink title behavior from ordinary content pages.
3. Reduce the universal header to the semantic title and lede. Category context and package subpaths belong to navigation or executable examples, not a repeated eyebrow/chip on every page.
4. Preserve the optional concept hero/ornament seam without forcing a decorative event onto every story.
5. Keep spacing proportional: one major title-to-subject interval, smaller heading-to-body intervals, and dividers only where they separate distinct semantic regions.

## Explicit removals

- Repeated `category · story` eyebrow chrome.
- Repeated package-subpath chip in the page header.
- Universal sticky title shrink.
- Universal typewriter and scroll-reveal choreography.
- Any new wrapper whose only purpose is appearance forwarding.

## Acceptance

- A direct story route presents exactly one visible primary heading and its lede before the first live specimen.
- At 390×844, the first useful control or specimen is not displaced below decorative header content or covered by the footer.
- At desktop width, the title remains subordinate to the demonstrated component rather than becoming a second hero on every route.
- Reduced motion removes no state information because ordinary section comprehension no longer depends on entrance animation.
- Verify Slice A together with Slice B in the native in-app browser; do not use Playwright.

## Deferred to later slices

- Shell restraint and footer reachability: P056 / Slice B.
- Manifest truth: P057 / Slice C.
- Specimen surface consolidation: P059 / Slice D.
- Executable examples and concrete accessibility feedback: P060/P062 / Slice E.
