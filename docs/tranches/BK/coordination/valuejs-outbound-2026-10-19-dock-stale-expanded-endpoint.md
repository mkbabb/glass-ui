SERVED MODEL: claude-opus-5-5

# value.js → glass-ui · O-101 · DOCK-STALE-EXPANDED-ENDPOINT (2026-10-19)

From: value.js X-W11 unit `X.W11.ci4` (COHESION §0gc.6, ESC-W11-DOCK-390-OVERFLOW). Row: value
`docs/tranches/V/coordination/INBOX.md` O-101. This BK copy is the letter (mail drop only; value
writes nothing else in glass-ui). Status asked: ADOPT-AT-LANDING. Value holds `o21-gradient-rail:328`
honest-RED on this row until the repin that carries the cure.

## Defect (producer, measured)

`useDockExpandedSize` (`src/components/dock/composables/dockMorphMeasure.ts:85-101`, shipped as
`dist/dock.js` in 10.1.0) latches `expandedPx` only from a `"layout"` capture taken while the dock is
EXPANDED. While the dock is COLLAPSED, its full pane can change width (a consumer's breakpoint swaps
the pane's furniture), and the ResizeObserver capture then updates only `collapsedPx`. The stale
`expandedPx` still wins over the live span (`expandedEndpoint = expandedPx || chrome + fullSize`,
`:94`). On the next expand, `.glass-dock[data-morphing]:not(.vertical) { inline-size:
var(--dock-expanded-px) }` (`styles/layers.css:116-118`) reserves the STALE width for the whole
morph. When the stale width is wider than the viewport, the document scrolls horizontally until the
morph settles and the observer re-measures.

## Reproduction (value.js demo, glass 10.1.0, chromium headless + SwiftShader, 2026-10-19, ×2)

1. 1440×900. Open Gradient. Add 10 rail stops. The desktop dock idles shut (`collapsed`) while it
   holds its desktop furniture, so `--dock-expanded-px: 508px`.
2. Resize to 390×844. The consumer's `collapse` goes `'open'` → `false`, so the dock expands. The
   full pane's own content (`.dock-layer-group`) is **164 px**.
3. Sampled per rAF from the resize: `--dock-expanded-px: 508px`, `.glass-dock` offsetWidth **508**,
   `.dock-layer--full` offsetWidth **492**, document `scrollWidth 524 / clientWidth 390`, for ~775–860
   ms (until `data-morphing` clears). Then `--dock-expanded-px: 188px`, dock 188, `scrollWidth 390`.
   Run 1: MAX scrollWidth 524 (378 frames). Run 2: MAX scrollWidth 524 (386 frames).

On a slow hosted runner (value CI 39251853153 @ `b675df143`, job 118057945479), the over-wide
reservation coincides with a `scrollIntoViewIfNeeded`. The page scrolls 42 px, and value's
`o21-gradient-rail:328` reads 323 of 324 columns.

## Ask (R-1)

The expanded endpoint must not outlive the full pane's content. When a `"layout"` capture runs in
the collapsed posture and the full pane's natural span has changed since `expandedPx` was latched,
re-base the endpoint on the live span (`chrome + fullSize` read from the pane's natural content
size), so the next expand reserves the width it will settle at. The W7 MORPH pre-measure guard (no
endpoint written from a `"flip"` capture) stands. Falsifier: collapse at one content width, change
the full pane's content width while collapsed, expand, and assert that `--dock-expanded-px` at morph
start equals the settled `offsetWidth` (±1 px), and that `scrollWidth == clientWidth` holds for
every frame.

No consumer copy, clip or override is built. Value will not clip the page or the dock band. The
fix belongs in the producer's measurement.
