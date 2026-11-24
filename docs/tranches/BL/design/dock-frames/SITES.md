# Dock frames: one note per site

Each note below is ready to send to the session that keeps that site. They share the owner's request, then say what glass will ship, in which release, and what the site should do at the bump. Numbers come from headless Chromium and Playwright's WebKit (not Safari); none of them depends on backdrop blur.

---

## fourier (fourier.babb.dev)

**What the owner asked.** On fourier's top dock, at a desk, in light: the dock's motion needs refining at its start and end; the dock should not shift sideways while it moves; hovering or pressing the theme toggle should not move it; the last few frames of the close jump; and the theme seat's tooltip, "Switch to dark mode", showed at the far left edge of the screen while he hovered the seat at the right end. He asked that every dock hear about it.

**What glass will ship in 11.1.2.**

- The two faces of the dock trade in turn: the old one is gone by about 80 ms, the new one fills in after it, and they never show at strength together. The Log in seat, which sits in a wrapper with no box, fades with the rest instead of showing at full strength in the first frame.
- Nothing inside the dock slides sideways while it opens or closes. Your page seats moved 8.5 to 9.9 px and the mark about 4 px on every motion; now they stay where they rest.
- Pressing the theme seat, or reaching it with the arrow keys, no longer moves the row at desktop width (it moved every seat 4 px left in one frame). On a phone, where the row is wider than the dock, the row glides to the seat over 8 to 14 frames instead of jumping.
- The close ends when it is seen to end, about 260 ms in instead of about 550 ms, and the mark lands exactly on its rest. It used to wait about 290 ms and then step 2.5 to 4 px.
- Your animation controls dock keeps a seat in the dock in both postures. That seat still slides with the dock's moving edge, and now lands on its rest; on glass's own page such a seat stepped about 1 px at the end.

**What fourier should change at the bump.** Nothing is required.

**Open.** The tooltip at the screen's edge is not explained yet. It is the browser's own tooltip from the seat's `title` (`web/src/components/layout/DarkModeToggle.vue:35`), which no headless browser draws, and a browser places such a tooltip at the pointer. The owner's reading comes first: which browser and version, the page's zoom, and which display. Separately, giving the theme seat glass's `Tooltip` in place of `title` is recommended; glass's tooltips sit on their seats on keyframes and daraksha.

**The first frames.** A long frame at the start of a motion still turns into one large step. It comes from glass's own work as the motion starts and is fixed in glass 11.2.0; a keyframes.js release will make the step after it smaller.

---

## colour (color.babb.dev, value.js)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it.

**What glass will ship in 11.1.2.**

- Your dock's tool group (`demo/shell/dock/Dock.vue:306`, six seats in one group) no longer grows from 82 % about its own centre on each open, so its end seats no longer slide 31.6 px outward.
- The dock's two faces trade in turn instead of overlapping, nothing inside it slides sideways, and the close ends when it is seen to end, with no step at the end.
- On phones your dock never folds, so it sees none of the fold changes there.

**What colour should change at the bump.** Nothing.

---

## keyframes (keyframes.babb.dev and keyframes.js)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it.

**What glass will ship in 11.1.2.**

- The chrome dock's closed seal keeps its tooltip, "Scene", open after the dock opens no longer. In WebKit it stayed open and followed the hidden seal 142 to 145 px along the open dock; from 11.1.2 anything opened from either face of the dock closes when that face is hidden.
- The dock's two faces trade in turn, nothing inside it slides sideways, and the close ends when it is seen to end.
- Your transport dock keeps a seat in the dock in both postures. That seat still slides with the dock's moving edge, and now lands on its rest; on glass's own page such a seat stepped about 1 px at the end.

**What the site should change at the bump.** Nothing in the chrome dock or the transport dock.

**What keyframes.js should change.** Every dock's first step comes from keyframes.js's managed spring loop, which takes its first frame as a fixed 16.7 ms (`src/animation/physics/playback.ts:242`). At 120 Hz that paints the spring 8 ms ahead, so the start has no ease-in; after a long first frame the next frame catches up in one large step. Make the first painted frame the spring's start (a first step of 0) and let the clock run from there. glass declares keyframes.js `^6.0.0`, so no glass release is needed: glass picks the change up when its lockfile moves, and every site when its own does.

---

## daraksha (daraksha.babb.dev)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it.

**What glass will ship in 11.1.2.** daraksha is on 11.0.2. At 11.1.2 it gets, with what 11.1.0 and 11.1.1 brought: the dock's two faces trade in turn, nothing glass draws inside the dock slides sideways, a press on a seat never moves the row, and the motion ends when it is seen to end (about 260 ms, where daraksha's dock now takes about 550).

**What daraksha should change.**

- **The sideways drift is daraksha's own.** The whole dock moves 58.95 px sideways on each open and close, at both widths. That is the fission row's centring: it slides the row, main dock included, by half the theme seat's width and gap as the seat pulls out (`src/shell/SiteDock.vue:476-488`). The bump does not change it. Centre the pair at rest and hold it still while the dock moves, so the main plate grows in place and only the seat travels.
- **The page's controls in the dock** shrink toward the dock's leading end as they fold (the `.site-dock :global(.glass-dock #dock-page > *)` rule, from 60 % about the left edge), which slides them sideways too. From 11.1.2 glass fades the whole face out, then the other in, by 55 % of the motion; read whether that rule is still needed after the bump, and drop it if not.
- **At the bump** move from 11.0.2 to 11.1.2; nothing in the dock's markup has to change for this study.
- **At 11.2.0** the fission seat moves into glass, as daraksha's own note says. glass will hold the main plate still while the seat leaves it.

---

## glass's demo (glass.babb.dev)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it.

**What glass will ship in 11.1.2.** The bottom dock at phone width holds a ten-seat group in a wrapper with no box; the group now fades with the dock's face, and its seats no longer slide 49.6 px as it opens. The sidebar's and the bottom dock's motions end when they are seen to end, with no step.

**What the demo should change at the bump.** Nothing; it deploys with the release.

---

## atlas

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it. atlas filmed its own docks for it, thank you; this note answers that film.

**What glass will ship.** These fixes go into glass 11.1.2, on the 11 line. atlas is on 10.1.2, so it has them when it moves to 11.1.2: the rail's and the figure docks' motions end when they are seen to end, about 280 ms sooner than now (the rail's crest no longer waits that long before its 1.16 px drop; whether the drop itself goes was not read on atlas, though the same kind of end step is gone on glass's own pages), the two faces trade in turn, and nothing glass draws inside a dock slides sideways. Two of the film's faults are glass's and wait for glass 11.2.0: a dock's width in the page's flow (it changes in one frame at the end of a close), and an end-anchored figure dock's resting seats riding its moving edge 88 to 104 px.

**What atlas can change now, on any glass version.**

- **The wrap at 390.** A closing figure dock gives its row the open tray's width until glass's motion ends, because the lift out of the row stops when the close starts (`charts/frame/PlateDock.vue:343`; `charts/frame/ChartFrame.css:441-473`; `editorial/StoryCard.vue:351-357`). At 390 that wraps the row and drops the figure 64 px for about half a second. Keep the dock lifted until the motion has ended: key the lift on the dock's `data-morphing` as well as on `data-expanded`.
- **The rail's crest** slides 14 px right and 14 px down as the rail opens, because the open rail pads its crest and the closed disc does not (`platform/chrome/dock/Dock.css:52-71`). Give both the same inset and the crest stays put.
- **A press on the closed disc** follows the home link, because the pointer's arrival has already opened the rail when the press lands (`platform/chrome/dock/components/DockCrest.vue:36-48`).
- **A pick that closes the tray and opens a surface** in the same moment puts a 40 to 177 ms frame inside the close (`charts/frame/PlateDock.vue:250-256`), and the plate covers 39 to 99 px in one step. Start the surface after the close's first frames.

---

## gaggle (the studentsafety report dock)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it. Thank you for filming yours and for fixing the 390 row.

**What glass will ship in 11.1.2.** Your dock never folds, so the fold changes do not reach it. Your 390 jump was the row overflowing by 7 px, now fixed on your side. Where a row still overflows (yours at 320 px, by 37 px), a pressed seat's row now glides to it instead of jumping in one frame; that jump was glass's glide being snapped, not the browser's focus scroll. A row that fits is no longer scrolled by a press or a key.

**What gaggle should change at the bump.** Nothing.

---

## Home Assistant (the glass cards)

**What the owner asked.** On fourier's dock: the motion needs refining at its start and end; the dock should not shift sideways while it moves; pressing the theme toggle should not move it; the close's last frames jump. He asked that every dock hear about it.

**What glass will ship in 11.1.2.** Your dock never folds (`collapse: false`), so the fold changes do not reach it. A press or a key on a seat of a row that fits never scrolls the row. `--dock-collapsed-padding` (`frontend/src/styles/scale.css:60`) is read only by a dock that folds, so it changes nothing.

**What Home Assistant should change at the bump.** Nothing.
