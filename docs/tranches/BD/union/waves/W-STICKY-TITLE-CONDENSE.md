# W-STICKY-TITLE-CONDENSE — scrolling titles must CONDENSE, not persist+occlude (sticky subsume)

**Surfaced by:** the user — "All of the scrolling titles for each page need to be re-configured — they should NOT persist and occlude the whole page. After scrolling, they should be allowed to be scrolled FROM. Sub-titles should have the same scrolling facility — perhaps both should STICKY and one SUBSUMES the other, arbitrarily so?"

## The defect
The storybook page title/subtitle persist (sticky full-size) on scroll and OCCLUDE the page — they don't condense into a slim bar, and the subtitle doesn't subsume the title.

## The fix (the scroll-driven condense — native, compositor-only)
The header CONDENSES on scroll: the full hero title (W-HEADER-SCALE rung) shrinks to a SLIM sticky bar as the page scrolls (a `scroll()`/`view()`-timeline-driven scale+translate condense, the W-SCROLL-CARD `:slotted` shrink-lane precedent — compositor-only, `proof:no-layout-animation` floor, NOT an animated height), so the demo is never occluded; past the condense point the slim bar is a thin sticky strip (the title legible, the page scrollable FROM it). The SUBTITLE rides the same facility — it sticks below the title and one SUBSUMES the other (the subtitle condenses into the title bar OR the title condenses to make room — the "arbitrarily so" the user names: a `condense` order prop). PRM → the header just shrinks instantly (no scroll-scrub), the page un-occluded.

## Mechanism
A `<StoryHeader sticky-condense>` chassis behaviour: `position: sticky` + a `--header-condense` scroll-timeline scalar driving the title scale/translate (full → slim) + the rule, the subtitle subsume keyed off the same scalar. ONE chassis edit → all pages. Couples W-HEADER-SCALE (the rung) + W-SCROLL-MOTION (the scroll register) + the liquid-weight law (the condense has inertia/weight).

## Gate
`proof:sticky-title-condense` (the header condenses on the scroll timeline, compositor-only, never occludes; the subtitle subsume; PRM-instant) + the π frame-series (scroll → the title condenses to a slim bar, the demo visible, both modes) + the `proof:ba-gestalt`. Folds into W-STORY-PAGE-STANDARD.
