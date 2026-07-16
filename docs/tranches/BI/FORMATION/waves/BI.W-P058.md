# BI.W-P058 — Concept-driven heroes and proportional hierarchy

**Status:** SOURCE COMPLETE — NATIVE VISUAL REVIEW PENDING
**Product slice:** A · universal hierarchy subtraction
**Depends on:** P055

## Owner ruling

The concept background, short display title, depth, and hero-scale seams are useful. The universal hero treatment is not: ordinary component pages should not repeat a pill-like eyebrow, package subpath, sticky title transition, and multiple entrance effects before the subject appears.

## Product outcome

- An ordinary story begins with one clear title, one concise lede, and its live subject.
- A true hero may use one concept-specific color, field, ornament, or motion gesture.
- Hero art never displaces the first useful specimen or control below the footer-safe viewport.
- Type scale, margins, padding, and dividers express semantic importance without adding decorative chrome.

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

1. Apply the P055 title/lede simplification to content and hero routes.
2. Remove the universal eyebrow, subpath chip, sticky shrink, typewriter, and reveal cascade.
3. Preserve `displayTitle`, background descriptors, and the optional title-ornament slot only where the route genuinely stages a hero.
4. Keep a restrained proportional ladder: title > section heading > body > label/code. Labels must not compete with headings.
5. Prefer spacing over repeated lines; use a divider only between distinct regions and not automatically inside every card.
6. Avoid generic teal/gradient/pill decoration that does not explain the component.

## Acceptance

- At desktop and 390×844, ordinary pages read as component documentation rather than repeated landing heroes.
- One title remains dominant, while the first component/control is visible without scrolling on representative short stories.
- True hero pages remain distinct through their subject-specific field or gesture, not a shared ornamental template.
- Long titles wrap without clipping or horizontal overflow.
- Reduced-motion mode preserves hierarchy with no delayed or hidden content.
- Verify with Slice B in the native in-app browser only.

## Non-goals

- No new hero schema.
- No per-story animation catalogue.
- No global visual census.
