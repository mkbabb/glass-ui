# BM-9: the removals

| field | value |
|---|---|
| release | 12.0.0 |
| status | planned |
| rests on | choices 2 A and 26 B, ratified under IN O-426; the release rule (a removal goes in a major); the owner's standing law that a consumer's dependence never keeps an obsolete API |
| DESIGN | §4.3, §7.5, §8.1, §6.5 |
| starts from | the census of each removed name at the sites' refs of the day; `study/pass-2/delivery/sketch/fading-scroll.next.css`, `scroll-chrome.next.css` and `useScrollChrome.next.ts` |
| gates | each removal's census (no site imports the name, or a stylesheet path it moves, at its newest ref) and its MIGRATION row; G-2 and G-5 over FadingScroll and the collapsing bar |
| depends on | BM-4 and BM-6 (which stop calling the two exports and reading `:draggable`), BM-13 (which moves FourierField onto the package) |

## What it builds

**Removed, each with a MIGRATION row:**

- `useSpringMount` (`src/composables/motion/spring/useSpringMount.ts`; its last callers, `DialogContent.vue` and `SheetContent.vue`, leave it in BM-6), from the `/motion` barrel and the root index.
- `useSelectionIndicator`'s export (BM-4's writer replaces it).
- `useTabDragMorph` (`src/components/tabs/composables/useTabDragMorph.ts`).
- `useDockCtaReceive` (`src/composables/motion/morph/useDockCtaReceive.ts`), `useLiquidReveal` (`src/composables/motion/reveal/useLiquidReveal.ts`) and `src/components/dock/styles/cta-seat.css`. No site mounts the composables, and their motion broke the law: a second sign of state, a scaled box and a blur channel (D§7.5). A call to action that joins a seat would be D§7.3 read backward, and none is asked for.
- The `./fourier-math` subpath and the math names in the `fourier-field` barrel (`dftFromPoints`, `partialSumAt`, `positionsAt`, `BasisComponent`), with glass's own DFT and partial-sum code in `math.ts`, which nothing in glass reads after BM-13; the MIGRATION row names the package's function for each.
- `:draggable` on SegmentedTabs, which BM-4 stopped reading, and DockLayerGroup's switcher with `show-switcher`: no site sets the one or shows the other (daraksha `src/shell/SiteDock.vue:244` and value.js `demo/shell/dock/Dock.vue:305` pass `:show-switcher="false"`, and their messages say they can drop it), unless a site asks for either before BM-4 lands.
- `--ease-cartoon-punch`, if the census finds no reader of it left at any site once BM-3 moved glass's control and entrance readers off it.

**Changed to their 12.0.0 form:**

- **FadingScroll** takes fixed ramps over native scroll, and its fallback script goes.
- **The collapsing bar** (`useScrollChrome`, `src/styles/scroll-chrome.css`) becomes a state: the scroll direction sets one attribute once per change, and the change plays on a single curve (rule 5), not as a scrub. The stylesheet keeps its path, since Home Assistant imports it by path (`frontend/src/core/sheet.css:41`) though it draws no bar.
- **The run's caps** go only if BL and the owner rule so (OPEN §6; BL's row).

## Bytes

FadingScroll +201 B and −904 B; the collapsing bar −87 B (Home Assistant); `cta-seat.css` −278 B at every dock site; `useTabDragMorph` −449 B (`study/pass-10/ledger/ledger.json`). `useSelectionIndicator`'s −534 B is credited here only if BM-4 did not already show it leaving every entry.

## Proof

- The census, re-run at each site's newest ref on the day: no site imports a removed name, sets a removed prop, or imports a stylesheet path this release moves or removes. On 2026-11-24 none of atlas, the sci dashboards, value.js, keyframes, fourier, daraksha, gaggle, Home Assistant or slides imports `useSpringMount`, `useSelectionIndicator`, `useTabDragMorph`, `useDockCtaReceive`, `useLiquidReveal`, `useScrollChrome` or `fourier-math` (`git grep` on the refs in BM.md's header). Home Assistant imports about forty stylesheets by `dist/` path (`frontend/src/core/sheet.css:23-62`), among them `styles/scroll-chrome.css`, `components/sheet/styles.css`, `components/dialog/styles.css`, `components/slider/styles.css` and `components/dock/styles/index.css`: each keeps its path in 12.0.0, or its move is a MIGRATION row named in Home Assistant's message before the tag.
- Every removed name has its MIGRATION row and a line in its site's message where a site used it.
- FadingScroll's ramps and the bar's state in headless Chromium and Playwright WebKit, through `guarded`, with Reduce Motion; G-2 and G-5.

## Sites it serves

Every site, by what it no longer loads. FadingScroll reaches atlas, value.js, fourier, keyframes and gaggle through glass's own parts. The collapsing bar's stylesheet changes under Home Assistant's import, and no site draws the bar (`useScrollChrome` is imported nowhere; atlas's `useScrollChrome` in `Dock.vue:64` is its own).

## Not this wave's

The run's caps (BL's, if ruled); the luminance clamp (D3 and W-R.1, credited to BL).
