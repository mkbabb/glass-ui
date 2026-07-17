# Round 1 — story/demo load performance (static analysis — no browser) (?)

## Summary

The demo route/manifest layer is correctly code-split, but the always-mounted AppShell drags a ~771KB JS + ~318KB CSS eager boot graph (WebGL Aurora + the entire configurator + the full reka dropdown/select/tooltip/floating stack) in front of first paint, and `app.mount()` is gated behind it plus the first route chunk — so the shell is blank white until ~1.1MB resolves. The reported "cards render blank / partial-then-stutter" is a coherent gestalt of `content-visibility:auto` preview cards and scroll-driven reveals painting late while the boot thread and a permanently-running full-viewport WebGL loop saturate the main thread + GPU. Findings are ranked by evidence strength; every one has a file:line or the built dist-demo manifest as proof.

## Findings (5)

### [major] eager-boot-graph-bloat

**Claim:** The always-mounted AppShell statically imports the Aurora WebGL component, the full configurator (PresetEditor + its reka dropdown/select/tooltip/floating subtree), Dialog, SidebarDock and BottomDock, so ~771KB JS across 74 chunks + one 318KB render-blocking CSS file load at boot before any story renders — and app.mount() is gated behind all of it plus the first route chunk, leaving #app blank white until ~1.1MB resolves.

**Evidence:** demo/shell/AppShell.vue:5-28 static-imports Dialog, Aurora, PresetEditor (configurator), SidebarDock, BottomDock. Built dist-demo/index.html modulepreloads 74 JS chunks; summed with a script = 771KB uncompressed (top: aurora-hero-5LzOp11h.js 278KB, index 103KB, class-names 86KB, DropdownMenuTrigger 40KB, SelectItem 30KB, floating 26KB) + boot CSS dominated by index-C8_UmRWR.css (318KB). demo/main.ts:73 `void router.isReady().then(() => app.mount("#app"))` gates mount, and demo/router.ts:117-126 `beforeResolve` awaits Promise.all of matched chunk loaders before commit. The configurator is a hidden Sheet opened only by the gear/`,` shortcut yet is fully eager (AppShell.vue:26 `import { PresetEditor } from "./configurator"`).

**Proposed:** build — a perf-remediation wave: make PresetEditor/configurator and the shell dock stack `defineAsyncComponent`/dynamic so the reka dropdown/select/floating + configurator leave the boot graph; the shell Aurora config can be split from the aurora barrel so `shellAuroraConfig` no longer drags the barrel's value.js color core in eagerly.

### [major] content-visibility-deferred-paint

**Claim:** Every landing preview card sets `content-visibility:auto` with `contain-intrinsic-size:auto 19rem`, so below-fold cards are unrendered blank 19rem boxes until scrolled near; while the ~1.1MB boot saturates the main thread these paint late — exactly the reported 'foundations cards render blank white' + 'partially load then stutter' (the /foundations landing renders 13 such cards, home renders 11).

**Evidence:** demo/chassis/landing/SectionPreviewCard.vue:63-65 `content-visibility: auto; contain: content; contain-intrinsic-size: auto 19rem;`. SectionLanding.vue:34-42 renders one card per category story; foundations has 13 story .vue files (find demo/stories/foundations -name '*.vue' ! -name '*.tile.vue' = 13). No IntersectionObserver drives them (grep IntersectionObserver demo/ = 0) — the blank-until-relevant behavior is the browser's native content-visibility, whose paint is deferred behind the busy boot thread.

**Proposed:** build — verify contain-intrinsic-size matches real rendered height and consider dropping content-visibility on the first row (above-fold) so the initial cards never flash blank; primary fix is cutting the boot-thread saturation in finding 1 so deferred paints land promptly.

### [major] persistent-webgl-shell-loop

**Claim:** AppShell mounts a `fixed inset-0` `<Aurora>` on every non-focal route, and because a full-viewport canvas is always intersecting its useIntersectionPause guard can never pause it — so a continuous WebGL rAF composite runs behind every content page (foundations, forms, display, data, feedback, containers), sustaining GPU/CPU load that compounds per-page live vizzes and manifests as the reported stutter.

**Evidence:** demo/shell/AppShell.vue:148-155 `<Aurora v-if="shellFieldActive" ... class="shell-aurora fixed inset-0 -z-10">`. src/components/aurora/composables/useAurora.ts:270-300 arms the GL path once the canvas intersects and only pauses via `off-screen-io`; a fixed inset-0 canvas reports intersecting on the first immediate tick and stays so — the pause branch is unreachable while the tab is visible. The config re-uploads per navigation (AppShell.vue:104-113 computed shellAuroraConfig) so the loop persists across every content route swap.

**Proposed:** build — gate the shell field behind a visibility/idle heuristic or a cheaper static wash on dense content categories (forms/data/display already declare grid/paper defaults); the live WebGL field earns its cost only on the hero/substrate bands.

### [minor] svg-turbulence-paint-cost

**Claim:** foundations/colors mounts 13 animated WatercolorDot swatches, each hosting an `feTurbulence numOctaves=5` + `feDisplacementMap` SVG filter — a notoriously expensive raster primitive — so that page carries 13 live turbulence filters plus the shell WebGL field, a heavy per-page paint budget that reads as stutter on load.

**Evidence:** src/components/watercolor-dot/WatercolorDot.vue:164-172 `<feTurbulence baseFrequency="0.05" numOctaves="5">` + `<feDisplacementMap>`. demo/stories/foundations/colors.vue:96-99 renders `<WatercolorDot animate>` over `rainbow = Array.from({length:13})` (colors.vue:47), i.e. 13 instances with animate enabled. Filter host is per-instance (WatercolorDot.vue:14 'mounts its own namespaced <filter>').

**Proposed:** fold-into-<perf-remediation wave> — share a single filter def across dots or drop numOctaves on the animated path; secondary to findings 1-3.

### [minor] blocking-nav-no-feedback

**Claim:** router.beforeResolve awaits the target route's lazy chunk before the navigation commits, and AppShell's atomic keyed <component> swap renders no skeleton/aria-busy — so a cold route click leaves the old page frozen with zero loading feedback until the chunk downloads+parses, which reads as unresponsiveness for the larger story chunks (StoryHero 62KB, Blob 94KB, aurora 59KB).

**Evidence:** demo/router.ts:117-126 beforeResolve `await Promise.all(comps.map((c) => c()...))` before returning true. demo/shell/AppShell.vue:217-219 `<RouterView v-slot><component :is="Component" :key="route.path"/></RouterView>` with the code comment (AppShell.vue:64-66) explicitly noting 'The atomic keyed swap has no skeleton aria-busy'. Chunk sizes from dist-demo/assets (StoryHero-Kjn675rh.js 62KB, Blob-CJYObCbR.js 94KB, aurora-C-e564gb.js 59KB).

**Proposed:** build — add a lightweight route-pending skeleton/progress affordance (Suspense fallback or a nprogress-style bar) so cold navigations show motion instead of a frozen frame.

