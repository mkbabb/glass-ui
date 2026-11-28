# To gaggle

Hi,

Here's what glass's next releases bring to Gaggle, held to the bounds you sent: 11,282 bytes of first-load margin, no GPU words in any chunk Gaggle may fetch, the dock's fit at 768 and 390, and your motion gate. I read `site-redesign` and `tranche-c` before writing, so the paths below are from there, all under `dashboard/src/`. Gaggle pins glass at 11.1.0 on `site-redesign` (`dashboard/package.json:15`) and at 11.0.0 on `tranche-c` (`:13`), so each part reaches you when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. Glass's dark-mode toggle, which you mount in `report/kit/KitDock.vue:91`, `report/page/PageDock.vue:117` and `:138` and `shell/Dock.vue:221` on `site-redesign`, and in `App.vue:152` on `tranche-c`, gets its new face: a warm sun that draws its rays in while a cool night carves the crescent, together over 200 ms. In dark mode it rests unfilled, as it does today, so it never reads as a second current seat. The theme change itself becomes one 200 ms crossfade of the whole page, so the ink no longer flips in one frame while the Aurora fades, the moment you measured with dark text on a dark ground; with Reduce Motion on the crossfade runs 150 ms and the glyph stays still. It uses no timer. You don't need to change anything.

## The minor with the new springs, sliders and menus

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- The page dock's run of sections (`PageDock.vue:85`), whose current seat glass already marks with one gliding plate, gets the new mark: one capsule at its seat's size, moved by a single translate, and faded across when the keys move it.
- Your five sheets keep their look, and their presence now waits only on their own content's motions, so a spinner inside one can no longer keep the page hidden from a screen reader.
- Your menus in `shell/Dock.vue` (`:182`, `:225`, `:240`) grow from their button. When I asked about sliding selections, you said no for the phone menu, so the finger slide is something a menu turns on, off by default, and your phone menu stays as it is.
- By my estimate your first load falls by about 1.2 KB of stylesheet and 0.8 KB of script, and about 1 KB more loads later, on a first touch. Each is a figure for one part alone, so only your build closes them.
- Nothing new is GPU-backed, and nothing in it uses a timer for its timing.

One small thing I noticed: the page dock's header comment (`PageDock.vue:4`) describes a scroll progress hairline on the dock's rim, but only the F3 prototype draws one (`dashboard/proto/F3/App.vue:412`). If you add it to the page dock, it arrives with this minor's sliding-window rim.

## 12.0.0

- Your five detented sheets (`App.vue:107`, `parts/ItemSheet.vue:85`, `report/kit/Lamp.vue:61`, `report/page/Page.vue:655` and `shell/FeedSheet.vue:26`) become native scrollers that snap to their heights, and `v-model:detent` changes when the sheet comes to rest, on `scrollend`.
- On iPhones whose Safari predates 27.3, a sheet flicked past its top height can take a moment to settle, and `v-model:detent` waits for that.
- The dock's fold changes so the glass's edge cuts each seat.
- The lamp stays a readout, with no hover plate and no press tone, so it never reads as a button.
- Nothing Gaggle imports from glass is removed.

## Questions

Each default below is fixed at the release candidate named beside it.

1. Does anything of yours read `v-model:detent` while a sheet is still moving? It changes only at rest unless you tell me something needs it mid-drag (12.0.0's candidate).
2. Could you run `dashboard/scripts/check/vendor-build.mjs` on each release candidate when I send it, and send me its output? It reads every file the vendor may fetch against `vendor.mjs`'s barred words and prints each role's first-load script against your caps, so it's what closes the figures above and confirms no GPU words slipped in. If I don't hear back, I'll build Gaggle at the candidate myself and read the same caps from it.
3. Does the lamp ever sit apart from the dock as its own seat? If it does, and glass's goo ships in 12.0.0, it would join the dock by that goo, which is an SVG filter with no GPU words. It stays a readout in the dock unless you tell me otherwise (12.0.0's candidate).

Thanks,
Mike
