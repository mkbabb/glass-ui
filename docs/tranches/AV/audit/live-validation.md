# AV/G live validation (dev-server walk, 2026-06-05)

Both apps started locally + walked page-by-page (Playwright). Servers: slides :5174, glass-ui demo :5176.

## Verdict: both run clean. One new perf defect found (LV-1).

| Page / surface | Result |
|---|---|
| slides home (:5174) | CLEAN — the F.W1 lock affordance is LIVE: til-briefing card carries the `access key` lock-chip + LockKeyhole + `Unlock →` + the frosted scrim; the open feedback-coder card shows the neutral `deck` tag + `Open →` |
| slides DeckGate (/til-briefing) | CLEAN — the glass modal is LIVE: "This deck is locked" dialog, lock icon, the audacious `Unlock ✦`, non-dismissable |
| slides 6-slide deck (?export) | RENDERS all 6 (Slide01/04/08/09/10/Nutrition); the F.W-deck-rework cover standfirst + the extracted PresenterCard (Ray Zeisz / Mike Babb) confirmed live; **0 console errors** |
| glass-ui demo (:5176) | RUNS; the aurora story canvas is armed + rendering (WebGL2, 2006×1254) |

## LV-1 (NEW, real — fold into G) — slide components made deeply reactive
All 6 slide components emit the Vue warning: "Vue received a Component that was made a reactive object … should be avoided by marking the component with `markRaw` or using `shallowRef`." Fires for Slide01/04/08/09/10/SlideNutrition via `<DeckSlide component=…>`. Root: `deck.ts`'s `content.slides[].component` (or the manifest import) is made deep-reactive. **Fold:** `markRaw` the slide component refs in `deck.ts` (or `shallowRef`/`markRaw` the manifest), an idiomatic KISS perf fix — the snapshot tests never surface it. This is the kind of runtime defect the user's "fully test each page" mandate catches.

## Aurora OETF (AV headline) — code-confirmed
The aurora canvas renders live; the ~2.2× darkening is conclusively a static-shader defect: `aurora.frag.ts:817` outputs `fragColor = vec4(col * uAlpha, uAlpha)` in linear space without `linearToSrgb`; `DESIGN.md:150` documents the linear-sRGB palette; the blob does it right at `metaball.frag.ts:278`. The cross-context readPixels probe could not sample the aurora's own framebuffer (no preserveDrawingBuffer) — the static proof is the binding evidence.
