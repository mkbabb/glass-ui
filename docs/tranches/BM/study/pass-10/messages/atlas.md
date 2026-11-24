# To atlas (sci-report)

Hi,

I wanted to tell you what the next three glass-ui releases bring to atlas, and what each one asks of you. We held everything to the bounds you sent: no box moves on hover, open or fold; nothing new runs at mount on /sci; the same parts in Safari as in Chromium; and keyboard focus, `aria-selected` and VoiceOver order stay as they are.

**11.2.0.** Glass's dark-mode toggle is redrawn, in colour. A warm sun draws its rays in under its disc, and then a cool night slides across to carve the crescent, all over 200 ms. Every plate's hover takes its control's own tone, at the strengths the dock already uses. You don't need to change anything. If DockSettings or DockFoot mounts glass's toggle, it picks up the new one, and if atlas draws its own, it stays as it is.

**11.3.0.**
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread in every version we support, but nobody has timed it on an iPhone yet. A few things still run on the page's thread: a menu's grow from its button, a slider's growing track, and the toggle's glyph.
- The selection mark under SegmentedTabs and the dock's runs becomes one capsule that slides, with no lift or stretch, and arrow keys fade it across.
- The more important change for your suites is forced colours and more contrast. There, today's 2 px border on the chosen tab widens it, and the boxes of a three-tab strip shift by up to 8 px when the choice moves to the widest tab. From 11.3.0 the sign is drawn on the mark, so no box moves in either mode.
- Every Slider grows while it's used: on a press, on Tab, and under a resting mouse after 120 ms. Its own track colour grows out by up to 8 px on each side, and back on the same 200 ms. The root's box never changes, and the grown track takes no taps, so a tap meant for a neighbour still reaches it. A slider can turn this off with `:expand="false"`.
- Menus leave by a 120 ms fade, and the phone section menu gains a finger slide across its rows.

**12.0.0.** The dock's fold changes: the glass's edge cuts each seat as it passes, and nothing fades but the first seat. FilterPanel's and EntityDetail's sheets become native scrollers that snap to their heights. On iPhones whose Safari predates 27.3, a sheet flicked past its top height can take a moment to settle, and the height it reports changes only once it rests. None of your figure docks has a seat beside it, so the goo that joins a seat to its dock never mounts on them.

A few questions, if you have a moment:

1. Does any slider (RangeFacet, or the four in the sci dashboards) sit within 8 px of something its grown track would cover, or inside a box that clips its overflow by less than 8 px?
2. Does any suite read a slider's painted size while it's held, or a strip's tab boxes under forced colours?
3. The phone section menu's finger slide reads the list's height once each time the menu opens. Would that read show in the /sci budget your suites hold at 390?
4. Are FilterPanel's and EntityDetail's sheets non-modal, with the page above them live? Does any suite read the sheet panel's box, and does any page set `--sheet-enter-skew`?
5. The new toggle carries its own colour, a warm sun and a cool night. You hold to one focal colour per page, so would you like your docks to keep it, or to set `--toggle-tone` on the dock so the toggle draws in your ink?

Thanks,
Mike
