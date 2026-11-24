# glass.babb.dev, the owner's "error" (2026-11-23, INBOUND O-428 (1))

The owner, 23:03: "glass.babb.dev has an error, communicate" (frame: a compass glyph in a faint dark circle). His clarification, 23:18: "The error is the icon is offset and the dock animates poorly--the icon therein is offset and padded incorrectly."

## What was read (live site, v11.1.0 demo)

- **No script error.** Every route the demo links to (12, at 390 touch and 1440, headless Chromium) loads with no page error, console error or failed request (`probe.mjs`, `probe.json`).
- **The compass is the sidebar rail's active seat.** It's the Foundations section's icon inside its selection disc. On the deployed demo the rail never folds (`collapse="false"`).
- **The glyph is centred in its seat and its disc.** Both offsets are 0 px, in Chromium and in Playwright WebKit, at 1440 and 1024, light and dark, at rest and hovered (`active.mjs`, `active-*.json`, `active-*.png`). The seat is 40 px, the glyph 16 px with 12 px on every side, and the disc 32 px.
- **The disc isn't concentric with the rail's round end.** The rail is 64 px wide with a 32 px end radius. The active disc at its top sits 16 px from the sides but 12 px from the end, so its centre is 4 px short of the end's centre, in both engines and every cell. The cause is the rail's padding: 8 px at the end against 12 px at the sides, which sets the seat 8 px from the end. That is the offset and the padding the owner names.
- **The site has no icon.** Its index declares `<link rel="icon" href="data:,">`, and every icon path answers 200 with the page's HTML. The owner's frame was the dock, not this, but the icon set still ships.

## The cure, and where it goes

- **Concentric ends (11.1.2).** A dock's padding at its ends equals its padding at its sides, so an end seat's disc is concentric with the plate's round end. This holds in both orientations, folded and open. It joins the dock-frames cure, which already pins the padding per posture; the dock-frames second challenge reads it as a cell: the end seat's disc centre against the end's centre, 0 px in both engines.
- **The motion ("the dock animates poorly").** The dock-frames study's 11.1.2 cure applies here too: the faces trade in turn, nothing slides, and the close ends without a tail. The fold geometry itself comes with the 11.2.0 redesign.
- **The icon set** ships with the next demo deploy (11.1.2 scope).
