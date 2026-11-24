# To Home Assistant (hassio-config)

Hi,

Here's what the next glass-ui releases bring to the house UI, held to the bounds you sent. The entry has 0.2 kB of margin and every script 0.8 kB, the iOS app is WKWebView at 60 Hz, and one live lens or fuse is allowed at a time.

**11.2.0.** The dock's seats hover in their own tone at the dock's strengths. You don't need to change anything.

**11.3.0.**
- **The springs.** Every spring becomes a single curve. WebKit's source and release notes say WebKit runs curves of that kind off the page's thread in every version, the app's WKWebView included. Today's stepped curves stay on the page's thread there until iOS ships 27.3's engine. Nobody has timed it on an iPhone yet. A few things still run on the page's thread: the floor menu's grow from its trigger, a slider's growing track, and the toggle's glyph.
- **Dialogs.** A centred dialog keeps one blur, the veil's, and its plate becomes a tint over it, so the app pays for one live blur per modal, not two.
- **Presence.** A dialog's presence waits only on its own content's finite motions, so a spinner inside a dialog can't keep the page `aria-hidden`.
- **The floor menu.** It gains a finger slide across its rows. A row the finger only passes never commits.
- **Sliders.** Every Slider grows while it's used. The root's box never moves, and the grown track takes no taps.
- **Bytes.** By our estimate your entry falls by about 2 KB, about 1.2 KB of stylesheet and 0.8 KB of script. About 1 KB more loads on first use, which keeps every script together within its 0.8 kB. The overlays your entry mounts move that by a few hundred bytes either way (question 1), and these are figures for each part alone, so I'd like to close them against your real build.

**12.0.0.**
- **The faces seat.** It joins the dock by goo, and the folded dock keeps the faces shown. Glass draws the goo with an SVG filter while they part or join and through the folded rest, on a dock that samples no backdrop. While the filter is on, the fold is drawn on the page's thread, so a busy page can slow it. Its cost per frame isn't measured yet; we'll time it in WebKit before it ships, and your app is where it matters most.
- **Sheets.** They become native scrollers that snap to their heights. Until iOS ships Safari 27.3's engine, a sheet flicked past its top height can take a moment to settle in the app, and the height it reports changes only once it rests.
- **The collapsing bar.** It becomes a state instead of a scroll-linked scrub.

Questions:

1. Which of glass's overlays does your entry chunk mount: Dialog, Sheet, DropdownMenu, Select or Popover? The overlay changes alone net about −0.2 KB in 11.3.0 for an entry with a Dialog or side Sheet, and about +0.5 KB for one with menus only. The springs' saving of about 1.5 KB comes on top in both cases.
2. Your rails put your own hand in front of the Slider (`rails.ts:5-11`). Should the grown view show under the hand, or would the rails set `:expand="false"`?
3. Is one blur per modal enough in the app?
4. While the dock is folded, the goo's filter stays on over the dock and the faces seat. It filters only their own drawing and samples nothing behind them. Do you count it as your one live fuse? If you do, a dialog opened over the folded dock would make it two blur layers at once.
5. When 12.0.0's release candidate exists, would you time a fold with the faces seat in the app with Safari's Web Inspector? The goo runs two blurs per frame over the dock's area, on the CPU.

Thanks,
Mike
