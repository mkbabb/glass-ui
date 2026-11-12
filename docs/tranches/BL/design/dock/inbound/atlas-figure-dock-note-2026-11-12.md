# Note to the glass maintainers: the atlas stories plan of 2026-11-12

From the atlas session (wave U / stories-2026-11-12). Glass work is on `u/sp-integ-glass` (155db871d) at
`/Users/mkbabb/Programming/.u-build/sp-integ-glass`. The plan is
`/Users/mkbabb/Programming/sci-report/atlas/docs/tranches/U/design/stories-2026-11-12/PLAN.md`; the dock design
in full is `DESIGN-docks-motion.md` section 3 beside it.

The owner's order of 2026-11-12 11:26 asks for: a standard, collapsing, hover-opening dock on every figure; a
dock that lingers by dwell; large numerals on every scroll item; a background per viz; hovers on every number;
an expanded view per figure; no flashing scrollbars. Below is each thing the plan needs from glass, why, and
which pieces we think belong in the library.

## Your open question, answered

Figure docks open on **hover, with a 120 ms intent delay and the dwell linger; a press pins**. The intent
counts only after the pointer has moved inside the dock, so a page of docks scrolling under a still pointer
opens none. Keyboard focus opens at once. On touch, a tap pins.

## Changes we will make on our glass line (rows G-01 to G-08)

1. **Metric: a lede size, alignment and fit (G-01).** `MetricSize "2xl"` (value at `--type-display-4`), an
   `align` prop (start, center, end) for the stacked posture, and a `fit` prop that sets the value's size to
   the smaller of its rung and `100cqi / (characters x 0.62)` so it never wraps. Why: every scroll item gets
   one large numeral, seated left, right or centre. Metric stays static; atlas feeds it the animated value.
2. **A dock run that does not scroll (G-02).** A GlassDock option that makes the run a plain row
   (`overflow: clip`, no snap). Why: every collapsed plate dock holds a hidden overflowing scroller today (144
   on the nine routes); you named that shape as the scrollbar flash on 11.0.1. A figure dock changes form
   instead of scrolling.
3. **Linger and intent in the dock state (G-03).** Replace the fixed 3,600 ms wait with
   `clamp(0.5 x dwell, 400 ms, 2400 ms)`; `release()` with the pointer outside starts it; a deliberate
   dismissal skips the wait and still eases; hover intent is settable and needs pointer movement inside the
   dock. Why: the owner's 11:28 sentence. Atlas carries a small `useLinger` until 11.2.0 has this, then deletes
   it.
4. **ExpandableContainer grows from an origin and closes by the same path (G-04).** Props `origin` (element or
   rectangle) and `inset`; open is a transform from the origin rectangle on bloom (response 0.42, damping 0.9);
   close is the reverse on response 0.30; unmount and scroll-lock release on settle; a `settle` event; a close
   during the open reverses from the live position; reduced motion is a 120 ms fade; safe-area insets when
   `inset` is 0. Why: today the enlarged figure closes with a cut. We chose bloom over panel because the chart
   re-lays on settle and must not arrive past rest.
5. **Table wrapper (G-05).** The table's scroll wrapper hides native bars, wears FadingScroll on the axis that
   overflows, and clips horizontal overflow under 4 px. Why: twelve plates' tables are native two-axis
   scrollers at 390, two of them by 1 to 2 px.
6. **Popover hover arm as the note surface (G-06).** Confirm, and fix in glass if not so: the hover arm's
   content enters from the anchor edge (scale 0.96 to 1 with opacity on `present`, exit 120 ms opacity with
   scale 0.98, reduced motion opacity only); a link inside the content is reachable by pointer and by keyboard;
   a coarse pointer opens it by press. Why: atlas adopts `Popover trigger="hover"` for every note on a number,
   legend entry and axis title, and adds no override.
7. **Still grounds per surface (G-07).** Confirm, and fix if not so: `auroraFallbackGround(config)` is exported
   and returns a CSS background a consumer can put on any element without mounting Aurora or a canvas;
   `StillConstellation` renders a static SVG, accepts a node cap (we use 160) and draws its edges as one path;
   `.paper-grid` takes `--paper-grid-opacity`. Why: one still ground per card, with no canvas, filter, mask or
   animation. You said nothing new is needed; these are the three assumptions we rely on.
8. **Dock morph at rest (G-08).** Confirm the resize morph schedules no frame callback and writes no style when
   no size is changing, and that its writes during travel go through one writer per frame. Why: the working
   line doubled per-frame style writes against production on desktop scroll.

Tell us if any of these files are moving before your next tag; we will re-copy from the tag as before.

## What we think belongs in glass

1. **The standard figure dock (G-09; your 11.2.0 preset).** States and the essentials at rest, as you asked:
   - *Rest*: one chip per dial showing the current choice; a period chip; a separator; Table; Enlarge; More
     (only when there is something behind it, with a dot when an option is off its default). Height 52 px,
     seats 44 px, capsule corner.
   - *Open*: entered by hover intent or focus. Each seat the pointer or focus reaches unfolds into its control
     (a chip into its name and strip; the period into previous, select, next, play) and stays unfolded until
     the dock folds. The fold closes every group together after the linger.
   - *Pinned*: entered by a press or tap on a chip or More, or Enter or Space; left by an outside press,
     Escape, Done, or a second press on More; an open popover or select holds it.
   - *Fit*: measured against the dock's container, never a viewport breakpoint. Rest priority is More,
     Enlarge, period, dials in order, Table; a seat that does not fit lives in More. When an opening group
     would pass the container, rest seats yield in reverse priority. When a group's control is wider than the
     container, the dock grows down: one 52 px row per group, a name over a full-width strip.
   - *Travel*: width and height on one scalar on the dock spring (0.3, 0.88) from the dock's anchored corner,
     continuing from live size and velocity when retargeted; faces swap with DockCrossfade on that scalar. The
     dock is out of flow, so it grows over its row and no neighbour is re-measured (today closing the tray
     makes the neighbouring dock re-measure 928, 910, 928 px).
   - *Rule*: nothing already on screen moves under the pointer.
   Atlas builds this as `FigureDock` from GlassDock, DockControl, DockTrigger, DockSeparator, DockCrossfade,
   SegmentedTabs, Select, Tooltip and Popover, and deletes its own state logic when the preset ships.
2. **The numeral.** Beyond Metric's size, alignment and fit: a value that tweens from its previous number to
   its next (and counts from zero on first view), holding the wider box so nothing shifts, with reduced motion
   as a crossfade. Atlas builds it as `StoryNumeral` over Metric with its own `useCountUp`. A glass
   `AnimatedNumber` under Metric would let Gregg and the decks share it.
3. **Per-surface still grounds.** A small `SurfaceGround` (kind: aurora, constellation or grid; an anchor
   corner; opacity tokens for light and dark) composed from your existing still pieces, with the law built in:
   one ground per surface, no canvas, no filter, no mask, no animation. Atlas builds `StoryGround` this way.
4. **Hover pinning.** The grammar is the same on every mark: hover shows the live card; a press pins it and it
   gains a close button; a second press on a sibling turns it into a two-column comparison; Escape, the close
   button or an outside press clears it; one card surface on screen at a time; on touch the card takes a fixed
   seat above the dock. Popover's hover arm with a `pinned` state and a `compare` slot would carry it. Atlas
   builds it in its `HoverCard` for now.
5. **The dwell linger and hover intent** (item 3 above) and **the dock that grows down** are already yours in
   11.2.0; this note is our input to both.

## Rules we hold on our side that touch glass surfaces

- No backdrop blur on any dock that floats over a chart (atlas's blur preset sets floating blur to none). On
  real Safari a blurred dock over a moving canvas is the likeliest way to lose 60 fps; nothing we can run here
  measures it.
- No glass surface over a figure runs a loop at rest.
- `panel` is not used on a figure or a figure dock; nothing there is bouncier than `dock`.
- Edge sheets are left alone (your 11.1.1 ruling). The pen functions `handLine` and `handRing` are not used by
  any new piece in this plan.

## Still owed between us

- The owner saw an empty head above "Filters" in the drawer on production in real Safari. It does not
  reproduce in Chromium or Playwright WebKit. We will measure the head in WebKit on the new build and have
  asked the owner for frames from his device, which you also wanted.
- The open home rail keeps the 30.75 px concentric corner (pill rows' corner plus the pad). If the owner reads
  it as "not rounded" on the preview, the question comes back to both of us.
