# BM — CHARTER (the owner's brief, 2026-11-22, verbatim)

Model instruction in force: Opus 5.5 for every seat (owner, 2026-11-19: "No fable usage for now"), declared explicitly on each seat.

---

Analyze the dock, dropdown, and other UI facilities on this site, the write up, and their UI library to union our facilities thereof:

https://rida.dev/blog/bypassing-ios-safari-60-fps-limit

The dock lens, dock animations, dropdowns, etc, should be generalized over and suffused into our UI into a perfected apotheosis. Do a 10-pass design study on the ios 27 fission, fusion, and glass. We don't necessarily need perfect glass shading, unless it's possible without workarounds and is performant in production ios safari.

Develop out our tranches and precepts pursuant to this. Speak to our other sessions, too, for information and communique for implementation once our designs are perfected.

---

## Orchestrator's notes on scope

- **The source.** The post is Rida F'kih's "Bypassing iOS Safari's 60 FPS Limit to Build Web Applications That Feel Native" (2026-11-20). The site publishes no separate library; "their UI library" is the site's own component code: 74 chunks fetched to `study/source/rida/assets/` (untracked, see `study/source/.gitignore`), among them `dock`, `dock-input`, `tab-strip`, `refraction-port`, `refraction-sources`, `glass.worker`, `playhead.worker`, `state-machine-step` and `shaders-step`.
- **Its techniques.** Scroll containers as compositor-driven input "controllers" (scroll position read on a vsync-locked MessageChannel loop, an empty rAF loop to flush positions, a hidden smooth-scroller to hold ProMotion at 120 Hz, DPR scaling for sub-point precision); `transferControlToOffscreen` so a worker's canvas presents at 120 Hz without waiting for the page's rendering update; a Liquid Glass tab bar whose lens lifts, magnifies, follows the finger, stretches the bar past its bounds and settles on the nearest tab; WebGL glass over a page snapshot texture. The author's own disclaimer: Apple may close the OffscreenCanvas path at any time.
- **The bar for glass shading.** Refraction and lensing are taken only if they need no workaround and run well in production iOS Safari. A page-snapshot texture is a workaround by that bar unless the study shows otherwise.
- **Relation to BL.** BL's dock redesign (W-I.8, release 11.2.0) is in its ninth pass and is not disturbed. BM's designs land after it: new parts and options in 11.3.0, removals in 12.0.0, by the release rules.
- **Machine law and evidence.** Every prototype and browser run goes through `guarded`, headless only. Playwright WebKit is not Safari, and headless Chromium is not a GPU. Real iOS Safari readings are owed to the owner's iPhone and are marked as such, never inferred.
