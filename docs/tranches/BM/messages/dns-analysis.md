# To dns-analysis

Hi,

dns-analysis doesn't use glass-ui on `master`. It draws its own dock, cards, dialogs, sheet and dark-mode toggle (`frontend/src/components/layout/DarkModeToggle.vue`, mounted at `App.vue:142` and `:259` and in `Sidebar.vue:128`). Your spike measured about 41 KB gzipped per route at glass-ui 4.2.0, and since most of the library has been rebuilt since then, I wanted to set out what's changed in case adoption comes back up.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries.

## What you'd gain

- The minor that brings the dock redesign gives glass's dark-mode toggle a new face: a warm sun that draws its rays in and a cool night that carves the crescent, in colour, over 200 ms. With Reduce Motion on it crossfades, so nothing cuts.
- In the minor after that, every spring becomes a single curve of the kind WebKit's source and release notes say Safari runs off the page's thread, though nobody has timed it on an iPhone yet. A centred dialog keeps one blur, the veil's, and menus grow from their button.
- In 12.0.0 sheets become native scrollers, and the dock's fold drops its per-frame script.

The 4.2.0 figure no longer describes the library, so I wouldn't read anything into it either way.

## What you'd do

Nothing is needed for these releases. If you do adopt, the first swap I'd suggest is your own `DarkModeToggle.vue` for glass's, then the dock.

## Questions

1. Is adopting glass-ui on the table this year? Nothing changes for dns-analysis unless it is.
2. If it is, which route bound do you hold, so I can price the swap against it? I'd be glad to measure the 12.0.0 figures on a copy of one of your routes before you decide, if that would help.

Thanks,
Mike
