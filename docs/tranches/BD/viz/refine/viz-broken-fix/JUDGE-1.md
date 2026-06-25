# JUDGE-1 — W-VIZ-BROKEN-FIX (iteration 1)

**Verdict: FAIL (5 of 6 defects fixed; D5 hero-scroll NOT decisively fixed).**

**Date.** 2026-06-23 · **Host.** macOS Chrome via chrome-devtools-mcp, `navigator.gpu` present, dpr 2, demo `http://localhost:5173`.

The five viz/render defects (D1–D4, D6) are genuinely fixed and paint-verified live. But **D5 — the verbatim user defect "the hero text should NOT scroll like this on every page" — is NOT fixed.** The condense made the sticky hero *smaller*, not *gone*: it remains `position: sticky`, opacity 1.0, scale 0.82, and OVERLAPS the substrate viz canvas by ~12.7% of canvas area at a normal reading scroll. The user already rejected the subtle/half fix; this is a half fix.

---

## Live evidence (computed values + screenshots)

### D3 — blob metaball render — PASS
- `/substrates/blob`: canvas backing `[1536,1536]` = client `768²` × dpr 2 (NOT stuck 300×150). No console shader/WebGPU errors (only an unrelated `<TooltipProvider>` Vue transition warn).
- Painted coverage 8.7%, **centroid (0.48, 0.49) — centered**, bbox x[0.318–0.633] y[0.299–0.729]. Decisively NOT the prior corner-speck (was centroid 0.13,0.12 ~9% wide in one corner).
- Screenshot `JUDGE-blob2.png`: a **warm-gold/amber lit-glass droplet with a pseudopod neck**, centered. Warm-cream identity holds, no gray.

### D2 — goo-dot hybrid render + config — PASS (functional; faint)
- `/substrates/goo-dot`: canvas `[2066,920]`, not stuck. No console errors.
- Renders a **centered dot-metaball field** (centroid 0.5,0.5). The dots follow the blob SDF (dense in the merged mass, sparse at the rim).
- Variant toggle LIVE: `dot-field` (wide elliptical dot blob) vs `dot-sphere` (denser circular sphere arrangement) produce visibly different renders (`JUDGE-goodot-field.png` vs `JUDGE-goodot-sphere.png`). D2 config is no longer dead.
- **Refinement note (not a FAIL):** the dot field is VERY faint — pale cream dots on a pale cream substrate, barely visible. It meets "renders/works" but is subtle; a slightly higher dot opacity / contrast would make the warm-cream identity read better.

### D1 — fourier config options — PASS
- `/substrates/fourier-field`: canvas `[1246,1042]` = client `623×521` × dpr 2, not stuck. No errors.
- 7 reka sliders (Harmonics, Harmonic scale, Epicycle arms, Trail arc, Trail width, Intensity, Timeline). Driving Harmonics 4→16 changes the render: `N 16 / 16 playing` indicator + a denser 16-harmonic epicycle reconstruction (`JUDGE-fourier-N16.png`). Options live.

### D6 — fourier cursor follow — PASS (implementation correct)
- Source `useFourierField.ts` confirms the fix: pointer listeners on the canvas's parent host (canvas is `pointer-events:none`), a **velocity scrub** (`headT += (baseRate + velocity.x*SCRUB_GAIN + momentum)*dt`, velocity-continuous, no teleport) + a **2-D lean** (`getPointerLean()` → bounded model-space center offset, the field pans toward the cursor). Replaces the prior absolute-X teleport. PRM-carved via `usePointerVelocityField` tick(0). Hovering the host shifts the comet trace toward the cursor region (`JUDGE-fourier-follow.png`).
- (Pixel-readback of the WebGPU canvas via `drawImage` returns premultiplied-transparent, so centroid-shift could not be measured numerically; verified by source + screenshot.)

### D4 — watercolor ghost outline — PASS
- 4 `.watercolor-ghost-stroke` divs, each `border: 2px dashed`, each with a DISTINCT 8-value `border-radius` (e.g. `60.9% 43.6% 21.9% 59.7% / 65.2% 44.8% 35.3% 25.8%`) — the dashed outline now hugs the **seeded blob silhouette** (one shape source: a CSS dashed border follows its own border-radius). The old `<ellipse rx=46 ry=46>` watercolor SVG is GONE (the one remaining `<ellipse rx=9 ry=3>` is an unrelated dock-icon glyph). `JUDGE-ghost.png`: organic dashed blob outlines beside the solid fills. Defect closed.

### D5 — hero scroll — **FAIL (the named user defect persists)**
The cluster `.story-hero-shrink` is `position: sticky; top: 0`. The condense fires (scale 1.0 at scrollTop 0 → 0.91 at 80px → **0.82 at 160px, then HOLDS**), but:

| Scroll pos | title opacity | title height | overlaps viz canvas? |
|---|---|---|---|
| blob @ scrollTop 618 (viz centered) | **1.0** | 211px (sticky, top 81→bottom 291) | **YES — 12.7% of canvas area covered** |

- The **title cluster itself NEVER fades** (opacity stays 1.0 at every scroll position 0→2000). Only the eyebrow+blurb fade. The big `text-display-hero` word ("GooBlob"/"Matrix"/"Fourier Field") stays plastered over the entire scrolling page at full opacity.
- A 0.82 scale on a display-hero title is still ENORMOUS (387px→318px cluster; 211px title). It does not collapse into a "slim header" — it remains a giant word floating over the WebGL viz.
- Visible in EVERY substrate screenshot: `JUDGE-blob2.png` ("GooBlob" over the gold droplet), `JUDGE-goodot-field.png` ("Matrix" over the dots), `JUDGE-fourier-N16.png` ("Fourier Field" over the epicycles).

This is verbatim "the hero text should NOT scroll like this on every page." The fix shrank the paint; it did not remove the sticky title's overlap of the content. **Subtle/half fix → rejected.**

---

## Required refinements (D5 — the ONE blocker)

The iOS-27 large-title collapse is the wrong model for a substrate-viz page (the "collapsed" title is still a 200px+ display word over a full-bleed canvas, not a slim nav bar). Pick ONE decisive fix:

1. **Preferred — let the hero scroll AWAY (the user's literal ask).** Drop `position: sticky` on `.story-hero-shrink` (or scope sticky to `variant="page"` content pages ONLY, never the substrate/hero viz pages). The hero title scrolls up and off with the body, the viz owns the viewport. This is the most literal reading of "should NOT scroll like this on every page" and is the safest.

2. **If the sticky collapse is kept, make it ACTUALLY collapse.** Fade the TITLE cluster itself (not just eyebrow/blurb) to opacity 0 over the condense range — `animation: story-hero-shrink ..., story-hero-subordinate-fade ...` applied to `.story-hero-shrink` (or the title), so by ~160px the hero is GONE and the viz is unobstructed. OR shrink to a genuine slim header (scale ≈0.35–0.45, leading-aligned, single-line) that clears the canvas top. A 0.82 settle is not a collapse.

Either way: at a representative reading scroll, the title rect must NOT overlap the viz canvas (target overlapAreaPct ≈ 0). Verify on all three substrate pages + a sample content page.

## Held / non-blocking
- goo-dot dot field faintness (refinement, not a FAIL).
- `proof:blob-render` CORNER_EMPTY threshold needs a rebaseline against the corrected WebGPU render (per BUILD-REPORT-1 §follow-up; the render is correct, the threshold predates it).

## North-star
- Warm-cream identity holds on all four viz (gold blob, warm dots, violet fourier curve) — NO gray. PASS.
- Compositor-only / PRM-carved on the implemented fixes. PASS.
- Safari: the WGSL compile fixes (D3) are the real Safari headline — verified zero WGSL errors. PASS for the viz.
- D5 violates the gestalt/identity bar (the hero obscures the very surfaces the page exists to show).
