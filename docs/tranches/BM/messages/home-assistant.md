# To Home Assistant (hassio-config)

Hi,

Here's what glass's next releases bring to the house UI, held to the bounds you sent: the entry has 0.2 kB of margin and every script 0.8 kB, the iOS app is WKWebView at 60 Hz, and one live blur or fuse is allowed at a time. I read `master` before writing, so the lines below are from there. The frontend pins glass at 11.1.0 (`frontend/package.json:33`), so each part reaches the house UI when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut. Two of your recent asks are going into 11.1.2: the dock's press check that reads through shadow roots, and the Slider's touch intent. Your AvatarStack rides the first minor after 11.1.2. The span-bar and ring part, one part with two forms, is designed on its own, and I'll look at it before it's built; nothing in this note publishes a window, a ring or a span that would get in its way.

Your frontend imports about forty of glass's stylesheets by their `dist/` paths (`frontend/src/core/sheet.css:23-62`), so I've held every release below to keep those paths working: a rule a part needs arrives through the stylesheet you already import, and any path that moves is named to you before its release.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. You don't need to change anything.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say WebKit runs curves of that kind off the page's thread in every version, the app's WKWebView included, where today's stepped curves stay on the page's thread until iOS ships Safari 27.3's engine. Nobody has timed it on an iPhone yet. Your dialog and sheet no longer pass their resting place on the way in. Two things you mount still run on the page's thread, each in 370 ms or less: the floor menu's grow from its seat and a slider's growing track.
- A centred dialog keeps one blur, the dimmed layer behind it, and its plate becomes a tint over that layer, so the app pays for one live blur per modal, not two. That arrives through `components/dialog/styles.css`, the path you import.
- A dialog's presence waits only on its own content's finite motions, so a spinner inside a dialog can no longer keep the page `aria-hidden`.
- Menus can take a finger slide on a phone: press, slide along the rows and lift on a floor, and a row the finger only passes over never fires, which is the condition you set. It's something a menu turns on, off by default, and your floor menu (`frontend/src/tiles/dock_menu.ts:43`) is one of the two menus that asked for it (my second question). Its code loads on the trigger's first touch.
- Your rails' Slider (`frontend/src/tiles/rails.ts:234`) grows while it's used: its own track grows out round the fill by up to 8 px a side and goes back over 200 ms, and while it's used the root's box doesn't move. The colour you give it through `--slider-range-bg` (`rails.ts:251`) stays the fill's, and a track you set through `--glass-slider-track-background` grows in its own colour. With 11.1.2's touch intent in place, the track grows on the press while the value waits for 10 px of movement along the rail, and a tap sets the value once at release. Today your own hand takes the pointer, so the Slider hears only the keyboard (`rails.ts:261`). If the rails hand the pointer back to glass, the pattern I suggested last time, a local value on `update:modelValue` with the service call on `valueCommit`, fits the touch intent as it is. On a touch screen the slider's own box becomes 44 px tall. Its new rules arrive through `components/slider/styles.css`, the path you import.
- By my estimate your entry falls by about 2 KB, about 1.2 KB of stylesheet and 0.8 KB of script, and about 1 KB more loads on first use, so every script stays within its 0.8 kB. Which overlays load in your entry chunk moves that by a few hundred bytes either way (my first question), and these are figures for each part alone, so I'd like to close them against your real build.

## 12.0.0

- Your detented sheet (`frontend/src/tiles/sheet.ts:427`) becomes a native scroller that snaps to its heights. Until iOS ships Safari 27.3's engine, a sheet flicked past its top height can take a moment to settle in the app, and the height it reports changes only once it rests. If the sheet's drag region you asked for has landed by then, I'll tell you before the release candidate what each of its settings does on the native scroller.
- Three stylesheets you import change in place in 12.0.0, at the same paths: `styles/scroll-chrome.css` (the collapsing bar becomes a state the scroll direction sets; nothing in your frontend draws the bar, so you'll see no change), `components/sheet/styles.css` and `components/dock/styles/index.css`. If any path moves, it will be in this list, with the new one, before the tag.
- The dock's fold changes so the glass's edge cuts each seat as it passes.
- Your faces seat sits inside the dock's persistent end today (`GlassTabs.ts:6-11`) and stays shown when the dock folds. 12.0.0 may also bring the goo that joins a seat standing beside the dock and parts it again, drawn by an SVG filter while they part or join and through the folded rest; it ships only if the neck between the two shows for long enough to be seen and its cost per frame holds. It loads only on a dock with a seat beside it, so it reaches the house UI only if the faces move out beside the dock.

## Questions

Each default below is fixed at the release candidate named beside it.

1. Your source mounts `DialogContent` and `SheetContent` (`frontend/src/tiles/sheet.ts:46-52`, `:427`, `:449`) and a `DropdownMenu` (`dock_menu.ts:10-12`, `:43`). Which of those load in the entry chunk itself rather than later? The overlay changes alone net about −0.2 KB for an entry with a Dialog or side Sheet and about +0.5 KB for one with menus only, with the springs' saving of about 1.5 KB on top in both cases. If I don't hear, I'll build the entry at each release candidate and read it.
2. Could you turn the finger slide on for the floor menu when you move to the springs-and-sliders minor? I'll send the setting's name with the release notes. Until you set it, the menu behaves as it does today.
3. Your rails put your own hand in front of the Slider (`rails.ts:6-11`), doing what 11.1.2's touch intent now does inside glass. Will the rails keep the hand, and should the grown track show under it, or would the rails set `:expand="false"`? The growth stays on unless you tell me otherwise (the springs-and-sliders minor's candidate).
4. Is one blur per modal enough in the app? That's what ships unless you tell me it isn't (the same candidate).
5. Would you like the faces to move out beside the dock in 12.0.0 so they part and join by the goo? They stay in the dock's end unless you ask. If they do move, the filter stays on over the folded dock and the faces; it filters only their own drawing and samples nothing behind them. Would you count it as your one live fuse? If you would, a dialog opened over the folded dock makes two layers at once, so tell me, and I'll bring you a form that keeps it to one before 12.0.0's candidate.
6. When you said the slide is fine "if the lens never commits on release over a row the finger only passed", did you mean a row the finger crossed on the way to another, or also the row it was lifted from after sliding back? A row only passed never fires, and the row under the finger at lift does, unless you meant something else (the springs-and-sliders minor's candidate).
7. If the faces do move beside the dock, would you time a fold in the app with Safari's Web Inspector once 12.0.0's release candidate exists? The goo runs two blurs per frame over the dock's area on the CPU, and your app is where that matters most.

Thanks,
Mike
