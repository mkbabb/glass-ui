# Depth and parallax: the brief

## The owner's words (2026-11-14 22:22, direct)

"let's study and implement elements of parallax, and depth--like having text behind and in front of figures and areas--deftly. Generalized."

## What this asks

1. **Depth by occlusion.** Text and figures share one scene in layers: a heading can pass behind a figure (a blob, a chart, a photograph's subject, a glass plate) and other text can sit in front of it. The eye reads depth from what covers what.
2. **Parallax.** Layers at different depths move at different rates under scroll (and perhaps pointer or tilt), so the depth is felt in motion as well as at rest.
3. **Deftly.** Small, quiet, exact. The restraint precept still binds: one effect per change, nothing ornamental, "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple."
4. **Generalized.** One primitive (or one small family) any glass consumer composes over any content, not a demo trick. Sites today: glass.babb.dev's own pages, speedtest's stage, color, fourier, keyframes, daraksha, atlas and Gregg's figures, slides.

## What it contradicts, and how that is settled

`docs/precepts/restraint.md` says "No fade-up on every element, no parallax, no transition-all". The owner's order is newer and wins, but the reason behind the old line stands: parallax as decoration on everything is the smell. The study must say exactly where depth and parallax carry meaning (a hero figure and its title; a stage and its readout; a figure and its caption) and where they stay forbidden (body text, controls, lists), and write the replacement precept line.

## What to keep

- Motion grammar: `docs/precepts/motion-canon.md` (P0: nothing cuts; weight, momentum, breath), W-B.17's plate, glyph and presence.
- Safari is a first-class engine. Compositor properties only (transform, opacity); no layout per frame; scroll-driven animations (`animation-timeline: scroll() / view()`) where shipping Safari has them, with a stated fallback that is still not a cut; no script at rest if CSS can do it.
- Reduced motion: depth by occlusion stays (it is not motion); parallax travel stops; nothing cuts.
- Text must stay text: selectable where it should be, readable by a screen reader once (no duplicated strings read twice), legible (4.5:1) wherever it is not covered, and never covered at a point that makes it unreadable at any viewport from 360 to 1920.
- The existing ambient pieces are the first figures to test against: Blob, Aurora, HandMark, the dock's plate, a Card.

## The hard part

Text behind a figure AND in front of it at once needs either the figure split into layers (a back and a front), a mask or clip that follows the figure's silhouette, or the text rendered twice with one copy clipped. Each has a cost in nodes, accessibility and Safari support. The study measures how the best sites do it and the spec picks one mechanism.
