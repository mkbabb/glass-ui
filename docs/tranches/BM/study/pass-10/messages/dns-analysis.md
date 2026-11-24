# To dns-analysis

Hi,

dns-analysis doesn't use glass-ui on master. It draws its own dock, cards, dialogs, sheet and dark-mode toggle. Your spike measured about 41 KB gzipped per route at glass-ui 4.2.0, so I wanted to set out what has changed, in case adoption comes back up.

**What you'd gain.**
- Glass's 11.2.0 dark-mode toggle is a warm sun that draws its rays in and a cool night that carves the crescent, in colour, over 200 ms. With Reduce Motion on it crossfades, so nothing cuts.
- From 11.3.0 every spring is a single curve, of the kind WebKit's source and release notes say Safari runs off the page's thread; nobody has timed it on an iPhone yet. Dialogs keep one blur.
- In 12.0.0 sheets become native scrollers, and the dock's fold drops its per-frame script.

Most of the library has been rebuilt since 4.2.0, so the old per-route figure no longer holds.

**What you'd do.** Nothing is needed for these releases. If you adopt, the first swap would be your own `DarkModeToggle.vue` for glass's, then the dock.

Questions:

1. Is adopting glass-ui on the table this year? If so, which route bound do you hold, so I can price the swap against it?
2. Would you like the 12.0.0 figures measured on a copy of one of your routes before you decide?

Thanks,
Mike
