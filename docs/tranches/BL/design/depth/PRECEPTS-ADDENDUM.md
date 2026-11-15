# Depth and parallax: the precept text

Exact text for the precepts, to land on the commit that ships W-B.19 (11.2.0). The source is the owner on 2026-11-14: "let's study and implement elements of parallax, and depth--like having text behind and in front of figures and areas--deftly. Generalized." It is newer than `restraint.md`'s "no parallax" and wins (`restraint.md`, "How conflicts settle", rule 1). The reason behind the old line stands and is kept in the new one. The grounds are `STUDY.md` §4, and the readings of `fold.md` for every number the challenge changed.

## 1. `restraint.md`, under "Motion"

**Delete this line:**

> - No fade-up on every element, no parallax, no `transition-all`.

**Put these two in its place:**

> - No fade-up on every element, no `transition-all`.
> - Depth and parallax are spent once, where they mean something (owner, 2026-11-14: "text behind and in front of figures and areas--deftly"). Text may pass behind or in front of a figure only where the two are one subject: a title and its figure, a figure and its caption, a stage and its readout. Never on body text, a control, a list, a table or chrome. The figure has a body where a word passes behind it; a ring or a line is not one. Both depths are shown: the figure hides part of the word behind it, and the word in front stands on the figure. One layer per scene may trail the page, and it is the figure or the picture in its window, never the text and never a stage's instrument. It travels an eighth of half the viewport at most, and half of that where it crosses letters. Scroll alone drives it: no pointer, no tilt, no pin, no smoothed or snapped wheel. Under reduced motion the cover stays and the travel stops. Check: at most one animated layer per `.depth` scene; one lag in a view; no text with a scroll-driven transform; zero scroll, wheel or pointer listeners added; no line of covered text loses more than a quarter of its ink, and no word and no letter more than half, with the figure at either end of its travel; text in front reads at 4.5:1 there too; the same cover under `prefers-reduced-motion: reduce`.

## 2. `restraint.md`, under "Shading", one line added after "One blur level everywhere"

> - A frosted plate does not carry text over a picture (read: 2.5 to 2.9 against 4.5, every tier). A caption on a photograph or a chart rides an opaque plate. A frosted plate carries text over a ground whose tone is ruled.

## 3. `restraint.md`, "The ceiling", one row added to the table

> | moving layers in a depth scene | 1 |

## 4. `motion-canon.md`, P0a, one row added to "How much"

> | a layer at depth | travels no farther each way than an eighth of half the viewport's height or of half its scene's width, whichever is less (`--depth-lag`, `--depth-travel`), and half of that where it crosses letters. That is 4 to 6 px of lag per 100 scrolled on a desktop and 1.4 to 4 on a phone. One per scene, never text |

## 5. `motion-canon.md`, P6, one sentence added after the first paragraph

> A layer that trails the page under scroll (`depth.css`) is travel: under reduced motion its animation never binds, the layer rests where the composition was drawn, the scene keeps its height, and what covers what does not change.

## 6. `motion-canon.md`, P7, one sentence added to "The ONE source + the ONE clock"

> A depth scene has no clock: its one timeline is the scroll position (`view-timeline`), it reads no `--spring-*` and no `--duration-*`, and it adds no engine, frame loop or listener.

## 7. `affordance-map.md`, "The wiring rules", one line added

> - A figure in a depth scene that a run of text crosses is not a control: the run's box takes the pointer over the figure's body (read: 0.53 to 0.66 of it). A pressable figure keeps clear of both runs, or is not put in a scene.

## What is not amended

- `restraint.md`, Shading: "one blur level everywhere, and never a blur inside a blur" is unchanged. Depth adds no blur and no shadow. Text behind a glass plate is frosted by the plate's own blur and by nothing else, and counts as covered. A figure brings no shadow of its own onto the words: the Blob rests flat in a scene.
- `restraint.md`, Motion: "Nothing moves while idle" is unchanged. A layer that trails the page moves only while the page is scrolled.
- `affordance-map.md`, the per-element map: a depth scene adds no pointer cue and no row.
