# To gaggle

Hi,

Here's what the next glass-ui releases bring to Gaggle, held to the bounds you sent: 11,282 bytes of first-load margin, no GPU words in any chunk Gaggle may fetch, the dock's fit at 768 and 390, and your motion gate.

**11.2.0.** Every dock seat's hover takes its own tone at the strengths the dock already uses. If your prototype mounts glass's dark-mode toggle, it now shows a warm sun that draws its rays in and a cool night that carves the crescent, over 200 ms. You don't need to change anything.

**11.3.0.**
- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- The report dock's run gets one sliding mark, and the scroll rim reveals its stroke by a sliding window.
- Your dialogs keep one blur, the veil's, with the dialog a tint over it.
- Menus grow from their button and leave by a 120 ms fade, and a finger can slide across a short menu on a phone.
- By our estimate your first load falls by about 1.3 KB of stylesheet and 0.8 KB of script, and about 1 KB more loads later, on a first touch or a menu's first touch. These are figures for each part alone, so only your build closes them.
- Nothing new is GPU-backed, and nothing in it uses a timer for its timing.

**12.0.0.**
- Your five detented sheets (App.vue, ItemSheet.vue, Lamp.vue, Page.vue and FeedSheet.vue) become native scrollers that snap to their heights. `v-model:detent` changes when the sheet comes to rest, on `scrollend`.
- On iPhones whose Safari predates 27.3, a sheet flicked past its top height can take a moment to settle, and `v-model:detent` waits for that.
- The fold changes so the glass's edge cuts each seat.
- The lamp stays a readout, with no hover plate and no press tone, so a fused lamp never reads as a button.

Questions:

1. Does anything of yours read `v-model:detent` while a sheet is still moving?
2. Could you run gate 29 and the vendor gate on 11.3.0's release candidate when I send it? Only your build closes the figures above.
3. Does the lamp ever sit apart from the dock as its own seat? If it does, it would join the dock by the same goo in 12.0.0, which is an SVG filter with no GPU words.

Thanks,
Mike
