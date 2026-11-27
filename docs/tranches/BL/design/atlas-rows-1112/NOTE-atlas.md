Hi atlas,

The rows you asked for in 11.1.2 are built as one patch against 11.1.1. Each has a check that fails on 11.1.1 and passes with the patch, in Chromium and in Playwright's WebKit, except where 11.1.1 already did what you asked. Here is what changes for you.

**Print.** Under print, glass hides the dock, popovers and hover cards, tooltips, toasts, and any menu or Select list left open. Every glass surface prints as a solid card, with no blur and no shadow. An open Dialog or Sheet prints flat where it stands, so its content still reaches the paper, and the dimming behind it clears. Before this, everything on screen printed, frost and shadows included.

**The dark mode toggle.** Its name is now always "Dark mode", and `aria-pressed` says whether it is on. Your dock's theme seat can drop its own name, as you planned. If you keep a hint on the rail, it can read the same words.

**Popover triggers.** A trigger names its panel in `aria-controls` only while the panel is open. Before, it carried an empty value until the first open, and afterwards the id of a panel that was gone.

**A Dialog over the page.** A Dialog's scrolling body now holds its scroll: a wheel or swipe that reaches its end no longer moves the page, even on a Dialog with `:modal="false"`. The page keeps its scrollbar gutter while a Dialog is open, so nothing shifts sideways, and its scroll position is unchanged after a close by Escape, the close button or a press on the scrim. Those last two already held on 11.1.1; the checks confirm them with a real 15 px scrollbar. The Sheet half of this row comes with the phone scrolling fix.

**A Dialog opened from another surface.** A Dialog opened from inside a Dialog, a Sheet or an enlarged figure now stands above it, with its dimming over the lower surface too. This holds wherever the two are declared, including your pairing where the top Dialog is declared before the one that opens it; on 11.1.1 that top Dialog painted under the lower one. A drawer (a Sheet with `:modal="false"`) already stood this way. Escape closes only the top surface: the enlarged figure no longer closes along with a Dialog opened from it, and the lower surface keeps its scroll lock. Focus goes back into the lower surface, drawer included, as the top one starts to leave. On 11.1.1 it fell to the page for the length of that exit, and in one of my Chromium runs it stayed there.

**The full-height Sheet.** A bottom Sheet at its full detent now stops under the top safe-area inset (the status bar or the notch, on a page with `viewport-fit=cover`), so its grip and header stay clear of it. I could only check this in Chromium, which can fake the inset; WebKit here has none.

**The small Button.** Nothing changed here: a `size="sm"` Button already measures 36 px with a mouse and 44 px with touch.

**Select.** When a Select closes, focus goes back to its trigger without scrolling the page, and the closing list can no longer take focus as the pointer leaves it.

**Segmented controls.** Choosing an item scrolls only the control's own strip to it, never a scroller around it or the page.

**DataTable.** The header text already measures 14 px or more at every width (14 px at 320 and 390, 16 px at 1280). The sort buttons are now full targets, 36 px tall with a mouse and 44 px with touch, and their focus ring is drawn inside the button, so a sticky header can't clip it.

Three things would help once you repin:

1. Could you print-preview one reading page with a figure's dock and a popover open, and tell me if anything still prints that shouldn't?
2. Could you open the data view from inside an enlarged figure and press Escape once, then again? The first press should close only the data view, and the second the figure.
3. Could you remove the name override on the dock's theme seat and check that your screen reader reads "Dark mode, toggle button, not pressed"?

Thanks,
Mike
