# To Home Assistant (hassio-config)

Hi,

Here's what glass's next releases bring to the house UI, held to the bounds you sent: the entry has 0.2 kB of margin and every script 0.8 kB, the iOS app is WKWebView at 60 Hz, and one live blur or fuse is allowed at a time. I read `master` before writing, so the lines below are from there.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut. Two of your recent asks are going into 11.1.2: the dock's press check that reads through shadow roots, and the Slider's touch intent. Your AvatarStack rides the first minor after 11.1.2. The span-bar and ring part, one part with two forms, is designed on its own, and I'll look at it before it's built; nothing in this note publishes a window, a ring or a span that would get in its way.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. You don't need to change anything.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say WebKit runs curves of that kind off the page's thread in every version, the app's WKWebView included, where today's stepped curves stay on the page's thread until iOS ships Safari 27.3's engine. Nobody has timed it on an iPhone yet. Two things you mount still run on the page's thread, each in 370 ms or less: the floor menu's grow from its seat and a slider's growing track.
- A centred dialog keeps one blur, the veil's, and its plate becomes a tint over it, so the app pays for one live blur per modal, not two.
- A dialog's presence waits only on its own content's finite motions, so a spinner inside a dialog can no longer keep the page `aria-hidden`.
- The floor menu (`frontend/src/tiles/dock_menu.ts:43`) gains a finger slide: press, slide along its rows and lift on a floor. A row the finger only passes over never fires, which is the condition you set. Its code loads on the menu's first touch.
- Your rails' Slider (`frontend/src/tiles/rails.ts:234`) grows while it's used: its own track grows out round the fill by up to 8 px a side and goes back over 200 ms, and the root's box never moves. The colour you give it through `--slider-range-bg` (`rails.ts:251`) stays the fill's, and a track you set through `--glass-slider-track-background` grows in its own colour. With 11.1.2's touch intent in place, the track grows on the press while the value waits for 10 px of movement along the rail, and a tap sets the value once at release. Today your own hand takes the pointer, so the Slider hears only the keyboard (`rails.ts:261`). If the rails hand the pointer back to glass, the pattern I suggested last time, a local value on `update:modelValue` with the service call on `valueCommit`, fits the touch intent as it is. On a touch screen the slider's own box becomes 44 px tall.
- By my estimate your entry falls by about 2 KB, about 1.2 KB of stylesheet and 0.8 KB of script, and about 1 KB more loads on first use, so every script stays within its 0.8 kB. The overlays your entry mounts move that by a few hundred bytes either way (my first question), and these are figures for each part alone, so I'd like to close them against your real build.

## 12.0.0

- Your detented sheet (`frontend/src/tiles/sheet.ts:427`) becomes a native scroller that snaps to its heights. Until iOS ships Safari 27.3's engine, a sheet flicked past its top height can take a moment to settle in the app, and the height it reports changes only once it rests.
- The collapsing bar becomes a state the scroll direction sets, not a scroll-linked scrub.
- The dock's fold changes so the glass's edge cuts each seat as it passes.
- Your faces seat sits inside the dock's persistent end today (`GlassTabs.ts:6-11`) and stays shown when the dock folds. 12.0.0 also brings the goo that joins a seat standing beside the dock and parts it again, drawn by an SVG filter while they part or join and through the folded rest. It loads only on a dock with a seat beside it, so it reaches the house UI only if the faces move out beside the dock.

## Questions

1. Which of glass's overlays does your entry chunk mount: Dialog, Sheet, DropdownMenu, Select or Popover? The overlay changes alone net about −0.2 KB for an entry with a Dialog or side Sheet and about +0.5 KB for one with menus only, with the springs' saving of about 1.5 KB on top in both cases. If I don't hear, I'll build the entry at each release candidate and read it.
2. Your rails put your own hand in front of the Slider (`rails.ts:6-11`), doing what 11.1.2's touch intent now does inside glass. Will the rails keep the hand, and should the grown track show under it, or would the rails set `:expand="false"`? The growth stays on unless you tell me otherwise.
3. Is one blur per modal enough in the app? That's what ships unless you tell me it isn't.
4. Would you like the faces to move out beside the dock in 12.0.0 so they part and join by the goo? They stay in the dock's end unless you ask. If they do move, the filter stays on over the folded dock and the faces; it filters only their own drawing and samples nothing behind them. Would you count it as your one live fuse? If you would, a dialog opened over the folded dock makes two blur layers at once, and I'd clear the filter at rest instead, at the cost of a half-pixel step on a still frame.
5. When you said the slide is fine "if the lens never commits on release over a row the finger only passed", did you mean a row the finger crossed on the way to another, or also the row it was lifted from after sliding back? A row only passed never fires, and the row under the finger at lift does, unless you meant something else.
6. If the faces do move beside the dock, would you time a fold in the app with Safari's Web Inspector once 12.0.0's release candidate exists? The goo runs two blurs per frame over the dock's area on the CPU, and your app is where that matters most.

Thanks,
Mike
