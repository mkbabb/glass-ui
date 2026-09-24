# D3 · pass 1 · W · prior art

| field | value |
|---|---|
| seat | W, the prior-art seat of D3 pass 1 (the glass material: the veil, its ink, live-mode adaptation, the material ladder) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked at `9aa2b7f9`; the tree read `bd191c2c` at start and `71f2ba45` at the write. `git diff --stat 9aa2b7f9 HEAD -- src` is empty, so every observation about `src/` holds for the tasked HEAD |
| inputs | `PORTFOLIO.md` §0-§2 (problem, baseline, inherited facts, common floor), §5, §6 (pass-1 questions) and §7 (the battery M-1..M-8 and the family witnesses). `src/styles/glass/material.css:83-109` and `ladder.css` (`backdrop-filter` per rung), read to test one portfolio claim |
| instruments | Playwright 1.61.1 from `glass-ui/node_modules`, headless Chromium 149.0.7827.55 (launched with `--enable-unsafe-webgpu --ignore-gpu-blocklist --use-angle=metal`) and Playwright WebKit 26.5. Every probe is a tiny page under the scratch dir `D3/p1/W/` (`probe.mjs` T1-T7, `probe2.mjs` T2b, `probe3.mjs` T6b, `probe4.mjs` T3b, `probe5.mjs`/`probe6.mjs`/`probe7.mjs`/`probe7b.mjs` T8-T8d; results in `out-*.json`, captures in `cap-*.png`). Nothing was built, so no worktree was needed. Load averages ran 12-18 during the runs. **Playwright WebKit is not Safari**: every WebKit number below is labelled "PW WebKit"; every real-Safari cell reads "UNMEASURED (owner's safaridriver checkbox)" |
| web | Read 2026-09-24: Apple's WWDC25 session 219 transcript and HIG *Materials* (JSON endpoint, change log to 2025-09-09); MDN browser-compat-data raw JSON; CSS Color 5 ED (2026-09-10), CSS Color 6 ED (2026-01-11), Filter Effects 1 ED (2026-09-22), Filter Effects 2 ED (2026-01-23), Media Queries 5 ED; WCAG 2.2 Understanding 1.4.3; the WCAG 3 contrast status; NN/g; Microsoft Learn *Acrylic*; gpuweb issue #4432; WebKit bug 175497 and standards-position #145. Sources are in §12 |
| deliverable | Prior art with dates and support tables. Each claim cites a source or a probe here; §11 lists what could not be verified. Six findings bear directly on the portfolio (§1) |

## 1 · Findings that change the portfolio

1. **`contain: paint` is not a backdrop root in Chromium 149. The rung's own `backdrop-filter` is.** A `backdrop-filter: invert(1)` child inside a `contain: paint` parent still inverts the page (T6: `[55,215,215]` over `rgb(200,40,40)`). Inside a parent with any `backdrop-filter`, including the identity `saturate(1)`, it sees nothing (T6b: `[200,40,40]`); with `backdrop-filter: none` plus `contain: paint` it sees the page again. Filter Effects 2 lists the triggers as the root, `filter`, `opacity < 1`, masks and clip-path, `backdrop-filter`, `mix-blend-mode`, and `will-change` for any of those. `contain` is not on the list, and the spec notes that transforms, z-index and fixed positioning do not form a Backdrop Root (Filter Effects 2 §3, ED 2026-01-23). All five rungs carry `backdrop-filter` (`ladder.css:68,94,110,138,157`). So common-floor row 1's second sentence ("the same removal ends these rungs acting as backdrop roots … which frees grasp carriers") is false in Chromium: dropping `contain: paint` cures the halo clip (M-7), but a grasp carrier inside a rung still blurs nothing. The comment at `material.css:97-103` has the right effect but names the wrong cause. PW WebKit paints no `backdrop-filter`, so the WebKit column of T6 is void; real Safari is UNMEASURED.
2. **A luminosity-blend pole pins the composite's lightness on every ground, in both engines, but only when no isolated group lies between plate and field.** This is Fluent acrylic's luminosity layer (§3.1) re-expressed in CSS. A `mix-blend-mode: luminosity` layer of `rgb(235 232 228)` over a blurred sibling (T8b) lands light composites at L 0.927-0.948 over orange, ochre, violet, green, black, white and 24 px violet/yellow stripes. Light muted ink (`hsl(30 26% 35%)`) reads p05 5.14-5.73 on all seven grounds, and the composite keeps the ground's hue at C 0.037-0.092 (median). The dark pole `rgb(52 44 38)` gives L 0.30-0.40 and dark muted ink 5.29-7.06. PW WebKit agrees within 0.07. **But** the blend reads only the backdrop inside the nearest isolated group. It turns to flat grey (muted 5.30 flat, no hue) when the plate carries `transform`, `isolation: isolate` or `z-index`, or when the pole is a child of the `backdrop-filter` element (T8, T8c, T8d, both engines). It also goes flat when the ground is the root background propagated to the canvas (T8c). The flat grey is still legible, so it fails toward A's bound, not toward illegibility, but it drops hue without a signal. A moving dock (D-1) carries transforms. This is a new candidate for D3-A's substrate choice; §9.2 gives the terms.
3. **`contrast-color()` is WCAG 2 max-contrast in both engines and ignores alpha.** Over the 256-step grey ramp both engines flip from white to black between grey 117 (Y 0.1779) and grey 118 (Y 0.1812), which brackets WCAG 2's equal-contrast point Y ≈ 0.179 (T1). That is the WCAG 2.1 ratio the Level 5 spec advises UAs not to use on its own (CSS Color 5 §8). `contrast-color(rgb(0 0 0 / 0.1))` returns white, so a translucent veil passed in is treated as opaque. That is F-23's R2-01-07 mechanism, measured.
4. **An exact WCAG ink solve in pure CSS exists and matches in both engines.** Relative colour syntax into `srgb-linear` exposes linear channels, so `0.2126*r + 0.7152*g + 0.0722*b` is WCAG's Y exactly, with no `pow()`. The dark ink at 4.5:1 is `color(from C srgb-linear k k k)` with `k = max(0, (Y + 0.05)/4.5 − 0.05)`. Rendered, it lands at 4.477-4.521 on all 18 composites where an ink exists, byte-identical between Chromium and PW WebKit. The residual is 8-bit quantisation (T2b). The `l³ ≈ Y` shortcut in OKLab misses by −0.43 on reds (4.07 over `#f3411a`) and +0.23 on cyan (4.73 over `#00bcd4`) (T2). Warming the exact ink with `oklch(from … l 0.03 70)` keeps 4.50-4.53. This answers D3-C Q1.
5. **`paint-order: stroke fill` works on HTML text in Chromium 149.** It also hides variable-font overlap contours. With a 3 px stroke and default order, the fill is gone (0 red px in both engines). With `paint-order: stroke fill`, 84% (Chromium) and 88% (PW WebKit) of the fill pixels survive at 14 px, and 99.6-99.7% at 64 px in the library's Plus Jakarta Sans 700 (T3, T3b); the remainder is anti-aliased edge. The stroke changes no layout metric: box widths are identical with and without it in both engines. With a transparent fill the variable font's internal overlap contours show (129-197 interior stroke px, T3b); with the fill painted over the stroke they are covered. Some web tutorials still say Chrome ignores `paint-order` on HTML text; BCD records the fix in Chrome 123 (crbug 41372165), and T3 confirms it.
6. **A per-tile luma reduction plus `mapAsync` costs about 1 ms on this machine, warm.** A 1280×720 render, a compute pass reducing it to 16×9 tile means of linear Y, and a copy to a 3-deep ring of `MAP_READ` buffers ran as follows in headless Chromium 149 on Apple `metal-3` (T7):
   - GPU time for the reduction, from timestamp queries: 47.8-48.4 µs.
   - Submit to `mapAsync` resolve: p50 0.9 ms, p99 1.1 ms, max 1.1 ms, over 600 warm frames in each of three runs, with 0 dropped. rAF ran at 8.33 ms.
   - The one cold run that counted warm-up frames had a p99 of 182 ms and a max of 198 ms (pipeline compile), and the ring dropped 21 frames.
   
   So the publication lands inside the next frame when warm; the first second needs a stated "unpublished" arm. gpuweb #4432 reports 5-15 ms on Intel iGPU and 1-5 ms on an RTX 3060 Ti under Chrome/Dawn (2023-12-31), which a Dawn engineer traced to an implementation issue (dawn:1335). Safari 26 is UNMEASURED, since PW WebKit has no `navigator.gpu`.

## 2 · Apple: Liquid Glass and vibrancy (iOS/macOS 26, iOS 27 beta)

### 2.1 What Apple documents

**WWDC25 session 219 "Meet Liquid Glass" (June 2025), verbatim:**
- "The amount of tint and the dynamic range shift to always ensure buttons remain legible, while letting as much of the content through as possible."
- "The element is aware of what's behind it and increases the opacity of its shadow when it is over text. Conversely, it lowers the opacity of its shadow when it is over a solid light background."
- "Small elements like navbars and tabbars … flip from light to dark based on the background … symbols and glyphs on top of Liquid Glass, do the same … mirroring the glass's behavior to maximize contrast. All content placed on the Regular variant will automatically receive this treatment."
- Tint: "Selecting a color generates a range of tones that are mapped to content brightness underneath the tinted element … changing its hue, brightness and saturation depending on what's behind without deviating too much from the intended color."
- Two variants, never mixed:
  - Regular "provides legibility regardless of context. It works in any size, over any content".
  - Clear "does not have adaptive behaviors. It is permanently more transparent … it needs a dimming layer to darken the underlying content. Without it, legibility gets noticeably worse". Clear is used only over media-rich content, where a dimming layer is acceptable and the content above it is bold and bright.
- Accessibility modifiers:
  - "Reduced Transparency, makes Liquid Glass frostier and obscures more of the content behind it."
  - "Increased contrast, makes elements predominantly black or white and highlights them with a contrasting border."
  - "Reduced Motion decreases the intensity of some effects and disables any elastic properties."

**HIG *Materials* (change log: added 2025-06-09, updated 2025-09-09), verbatim:**
- "The regular variant blurs and adjusts the luminosity of background content to maintain legibility of text and other foreground elements." It is used "when components have a significant amount of text, such as alerts, sidebars, or popovers".
- The clear dimming layer has a number: "If the underlying content is bright, consider adding a dark dimming layer of 35% opacity"; no dimming "if the underlying content is sufficiently dark".
- "Don't use Liquid Glass in the content layer … use standard materials for elements in the content layer."
- Standard materials run ultra-thin, thin, regular and thick. "Thicker materials, which are more opaque, can provide better contrast for text"; thinner ones help "retain their context".
- Vibrant label levels are label, secondary, tertiary and quaternary, and "avoid using quaternary on top of the [thin] and [ultraThin] materials, because the contrast is too low."
- visionOS glass "limits the range of background color information so a window can continue to provide contrast … glass automatically adapts to the luminance of the objects and colors behind it."

### 2.2 How it shipped and what changed

- **iOS 26.1 (November 2025)** added a Clear/Tinted setting; Tinted "increases opacity and adds more contrast" (Engadget; BGR). Before that, iOS 26 beta 4 had already frosted the material after complaints (BGR).
- **iOS 27 beta 1 (June 2026)** adds a translucency slider "between ultra clear and fully tinted". Apple also says it "tuned Liquid Glass so it diffuses complex content behind it much more effectively" (BGR, 2026-06-10, beta). Shipping iOS 27 behaviour is **not verified**.
- **What reviewers measured:**
  - NN/g (Raluca Budiu, 2025-10-10) calls text over glass-over-images low contrast and "text on top of text … an illegible mess". It gives no ratios.
  - Independent audits (Access Advisors; let's dev) repeat the 4.5:1-after-blur rule and give no reproducible numbers.
  - This seat found no published measured contrast ratios for Liquid Glass. **Unverified** beyond these qualitative reports.

### 2.3 What this means for D3

- **Apple's answer to problem 3 is a per-element luma signal.** Regular glass senses its backdrop, flips polarity on small chrome, and maps tint tones to the brightness underneath. The dock is exactly the "tabbar" case. Apple does this in the compositor, with the backdrop in hand; the web has no such primitive (D3-X2). So the closest web analogues are D3-B (the substrate publishes) and D3-F (the substrate yields). The documented behaviour gives polarity flipping standing as design precedent: D3-B could flip the dock plate between the light and dark pole, not only move α.
- **Apple's answer for non-adaptive glass is a fixed dim of 35%.** That is D3-A's bound in Apple's own numbers: a fixed pole at a stated α that holds legibility over bright media. Apple's pole is dark and ours is the theme's ground; that divergence is ours to choose.
- **The ladder precedent.** Apple keeps glass off the content layer and uses thicker materials where text is dense. That matches the portfolio's split of chrome and content bands (§2.4), and it argues that dialogs and popovers, which Apple puts on Regular, stay thicker than the dock.
- **The user-preference arm.** Apple ships Reduced Transparency, Increase Contrast, the 26.1 Tinted toggle and the 27 slider. The web exposes only part of this in Safari (§8).
- **Vibrancy's blend math is not documented.** HIG says only "use vibrant colors". The reading that vibrancy is `plus-darker`/`plus-lighter` (D3-X3) comes from community reverse-engineering, **unverified** here.

## 3 · Other shipping systems

### 3.1 Microsoft Fluent: acrylic (Microsoft Learn, updated 2026-08-29)

- **The recipe:** "background, blur, exclusion blend, color/tint overlay, noise". Microsoft says "We added an exclusion blend mode layer to ensure contrast and legibility."
- **Luminosity.** `AcrylicBrush.TintLuminosityOpacity` "determines how much brightness, from the underlying pixels behind the Acrylic, to let through". A higher value applies more of the tint's brightness. In other words, the material separates a luminosity layer (legibility) from a tint layer (colour).
- **Fallbacks.** Acrylic "appear[s] as a solid color" when Transparency effects is off, in Battery Saver, and on low-end hardware.
- **Legibility.** "We've optimized the acrylic resources such that text meets contrast ratios on top of acrylic." Accent-coloured text and hyperlinks on acrylic are advised against.
- **D3 reading.** The luminosity layer is the mechanism of finding 2. T8b shows that CSS `mix-blend-mode: luminosity` reproduces it on both engines. T8c/T8d show that the web's isolated-group rules make it fragile where Windows' compositor is not.

### 3.2 Google Material 3: tone arithmetic (m3.material.io glossary and "science of color"; page JS-rendered, search excerpt only)

- **The claim:** "A difference of 40 in tone guarantees a WCAG contrast ratio ≥ 3.0; a difference of 50 … ≥ 4.5." Tone is CIELAB L\*.
- **Checked here, analytically:** the worst pair at Δ40 is 3.17 (tone 60 vs 100), and the worst at Δ50 is **4.484** (tone 50 vs 100). The Δ50 rule is off by 0.016 at its edge. That matches T2b's lesson that any guarantee needs a margin for quantisation.
- **Dynamic colour** derives schemes from a source colour and wallpaper. It does not track a live backdrop per frame. **Unverified** beyond the excerpt.
- **D3 reading.** M3 turns contrast into lightness differences in a perceptual space, as D3-C would. The difference is that M3 solves against a known opaque surface. The glass problem is that the surface is a composite.

### 3.3 visionOS glass

Per HIG (above), visionOS glass limits the range of background colour so that contrast holds, and adapts to the luminance behind it. That is a range compression of the backdrop, which is D3-F's idea applied at the compositor.

## 4 · Glassmorphism legibility practice

- **NN/g, "Glassmorphism: Definition and Best Practices"** (Megan Brown, 2024-06-07):
  - "More background blur is better, especially with intricate backgrounds."
  - Ensure text meets contrast requirements.
  - Use higher blur for unpredictable backgrounds.
  - Let users reduce transparency.
- **Practitioner guidance.** Guides that turned up in search (New Target, Webflow, IxDF, 2024-2026) converge on a semi-opaque scrim under text: "black at 20–30% opacity" in one case. **Unverified** against any measurement; none publish ratios.
- **WCAG techniques.** W3C's failure F83 names "background images that do not provide sufficient contrast"; the standard cure is a solid or semi-opaque layer between image and text, so that the ground is known.
- **D3 reading.** The practice agrees with the portfolio's §2.4 split: blur governs luminance bleed, and the veil (or scrim) governs contrast. None of these sources treats a veil that has to reach L ≥ 0.876 in light over a vivid field. The gamut ceiling in §2.3 of the portfolio is this project's own finding.

## 5 · WCAG 2.2 and APCA for text over translucent grounds

- **WCAG 2.2 SC 1.4.3** (Understanding, current) says to measure "the specified color of content over which the text is to be rendered in normal usage". It says to evaluate from the UA's colours "rather than the text as presented on screen", because anti-aliasing is outside the author's control. For varying backgrounds the operational reading, used by F83 and by practitioners, is the worst point under each glyph. The portfolio's p05 ring is a slightly softer form of that (p05, not min). **A decision for the battery**: is p05 the gate, or p00?
- **WCAG's border and halo rule, verbatim, decisive for D3-E:** "When there is a border around the letter, the border can add contrast and would be used in calculating the contrast between the letter and its background. A narrow border around the letter would be used as the letter. A wide border around the letter that fills in the inner details of the letters acts as a halo and would be considered background." So:
  - A thin pole-coloured stroke counts as **part of the glyph**. The contrast that counts is stroke against backdrop, and the ink against its own stroke does not count.
  - A wide halo counts as the ground, and then ink against halo is the measure.
  - D3-E's M-2 reading must say which case each specimen is. A 1.5 px stroke on 12-14 px text is closer to "narrow border", so measuring the ink against the stroke would overstate the result under WCAG's own definition.
- **SC 1.4.11** (non-text, 3:1 against adjacent colours) governs M-3 as the portfolio has it.
- **APCA status:**
  - APCA was dropped from the WCAG 3 working draft in July 2023.
  - As of April 2026 the draft's contrast definition is exploratory, with the editor's note "The contrast algorithm used in WCAG 3 is yet to be determined" (Adrian Roselli, 2026-04). WCAG 3 is projected no earlier than about 2030.
  - APCA's own guidance sets Lc 90 as preferred for body text, Lc 75 as the minimum for body columns, Lc 60 for other content text and Lc 45 for large or heavy text. It argues that WCAG 2 "overstates contrast for dark colors" (APCA in a Nutshell, undated).
- **D3 reading:**
  - WCAG 2.2 remains the only normative ratio, and the one `contrast-color()` actually implements (finding 3). The battery should keep WCAG 2 as its gate.
  - APCA can be a second column where polarity matters: in the dark theme, light ink over a bright field is the C-2 case, and APCA scores it differently from WCAG 2.
  - Nothing normative addresses translucency beyond "the background as rendered".

## 6 · CSS colour: relative colour syntax, `color-mix()`, `contrast-color()`, `pow()`

### 6.1 Support (MDN BCD raw JSON, read 2026-09-24)

| feature | Chrome | Safari | Firefox | spec |
|---|---|---|---|---|
| `color-mix()` | 111 | 16.2 | 113 | Color 5 |
| `color-mix()` with more than 2 colours | — | 27 | 150 | Color 5 |
| relative syntax, `color()` | 119 | 18 | 128 | Color 5 |
| relative syntax, `oklch()`/`oklab()` | 122 | 18 / 16.4 | 128 | Color 5 |
| `contrast-color()` | 147 (stable April 2026; chromestatus 4841046007742464) | 26 | 146 | Color 5 (binary); Color 6 adds candidates and a target |
| `pow()`, `exp()` | 120 | 15.4 | 118 | Values 4 |
| `sign()` | 138 | 15.4 | 118 | Values 4 |
| `light-dark()` | 123 | 17.5 | 120 | Color 5 |
| `light-dark()` taking `<image>` | 150 | 27 | 150 | Color 5 |

### 6.2 What the specs say

- **Color 5 §8** (ED 2026-09-10): `contrast-color()` "resolves to either white or black … The precise color contrast algorithm … is UA-defined at this level." UAs are "advised to not simply use the WCAG 2.1 … contrast ratio algorithm", yet results "should still meet … AA large text" (3:1).
- **Color 6** (ED 2026-01-11, marked "Not Ready For Implementation"):
  - It adds `contrast-color(<color> && [tbd-fg | tbd-bg] && <target-contrast>?, <color>#)` with `wcag2(aa)` or a number as the target. The function returns the first candidate that meets the target, or else the best one.
  - §2.2.2, "Contrasting Semi-transparent Colors", composites a translucent background over an opaque canvas colour first. The choice of canvas is open issue #7358.
  - Color 6 also defines `color-layers([<blend-mode>,]? <color>#)`, which composites colour layers in CSS. It is the declarative form of D3-C's "declared composite", and its examples are still `@@TODO`.
- **Color 5 §10**: RCS and `color-mix()` resolve to absolute colours at computed-value time, except through `currentColor`.

### 6.3 Measured here

**T1 (`contrast-color()`):**
- Both engines return `true` for `CSS.supports`.
- Over the grey ramp, both flip at grey 117→118 (Y 0.1779→0.1812), where the black and white ratios are 4.62 and 4.54. That is WCAG 2 max-contrast.
- Over the HEAD aurora composites (`#e25414`, `#da4319`, `#f3411a`) both return black, at 5.51, 4.80 and 5.58.
- Over `#da4319` white would read 4.38, so "maximum" sits within 0.4 of failing on both sides. No muted register is possible.
- Translucent inputs are treated as opaque: 10% black gives white.

**T2 (OKLab `l³ ≈ Y` solve):**
- On neutral composites the solve lands at 4.477-4.521.
- On chromatic ones it lands at 4.07-4.73: reds under, cyan over.
- Where no dark ink exists (`#2e7d32` Y 0.155, `#c2185b` Y 0.129), the clamp yields black at 4.10 and 3.58. The light solve then reads 4.26 and 5.02.
- `pow(0.5, 3)` resolves to exactly 0.125 in both engines.
- An RCS whose origin is a `color-mix()` inside a `var()` chain resolves in both engines. Chromium gives `oklch(0.366155 0.136088 41.0261)` and PW WebKit gives `oklch(0.366154 0.136057 41.0299)`: ΔL 1e-6, ΔC 3e-5, Δh 0.004°. The portfolio's nested-mix hole (D3-C Q5) does not reproduce in PW WebKit; real Safari is UNMEASURED.

**T2b (exact `srgb-linear` solve), from finding 4.** The WCAG algebra gives each case a window:

| case | ink exists when | notes |
|---|---|---|
| dark ink at 4.5:1 | composite Y ≥ 0.175 | |
| light ink at 4.5:1 | composite Y ≤ 0.1833 | |
| both | Y in 0.175-0.183 | only as pure black or pure white. At the equal-contrast point (Y 0.179) the maximum is 4.58, so there is no room for a muted ink ≠ fg (M-4) |
| a solved light muted ink that clears 4.5 and keeps M-4's ΔL_OK ≥ 0.08 above the shipped fg (`hsl(24 10% 10%)`, L_OK 0.216) | composite Y ≥ 0.29 (neutral L ≈ 0.66) | computed from the WCAG algebra with neutral ink |
| the *shipped* light muted ink (Y 0.111) at 4.5 | composite Y ≥ 0.675 (L ≥ 0.876, portfolio §2.1) | |

Serialisation differs between the engines: Chromium prints 6 significant digits and WebKit 6 decimals. It affects no rendered byte in T2b.

**D3 reading:**
- For D3-C, the exact solve is a closed form in shipped CSS on both engines, with no `pow()`, no JS and no `contrast-color()`. It needs only a declared composite colour.
- Its error budget is entirely the composite model (declared against painted), which the portfolio measured at 0.017-0.055 with `saturate()` left in (see §7 on why `saturate()` breaks it).
- For D3-A, B, E and F, it gives every family a one-line ink derivation that can be checked against its bound.
- For M-4, a solved muted ink lowers the light composite floor from L 0.876 (shipped muted) to about L 0.66 (Y 0.29). Between Y 0.18 and 0.29, AA holds only as a single near-black register, so muted cannot stay apart from fg. The saving is real for D3-C: its composite can sit about 0.2 lower in L than the other families' composites.

## 7 · `backdrop-filter`: colour space, the saturate leg, backdrop roots

- **Spec** (Filter Effects 1 ED 2026-09-22): "color-interpolation-filters has no affect for Filter Functions. Filter Functions must operate in the sRGB color space." That means gamma-encoded sRGB; `saturate()` is `feColorMatrix type="saturate"`. Filter Effects 2 (ED 2026-01-23) defines `backdrop-filter` by copying the Backdrop Root Image, filtering, clipping to the border box, then drawing the element. It carries the note: "does not yet have Working Group consensus, specifically on the definition of Backdrop Root" (issue 53).
- **Support** (BCD): unprefixed in Chrome 76 and Safari 18; `-webkit-` from Safari 9; Firefox 103.
- **Measured (T4):**
  - `filter: saturate(1.4)` matches the encoded-sRGB matrix prediction exactly in Chromium. PW WebKit is within 1/255 per channel: `(200,100,50)` → `(233,93,23)` and `(232,93,23)`, where a linear-light matrix would give `(221,85,0)`.
  - `backdrop-filter: saturate(1.4)` gives the same bytes in Chromium.
  - `brightness(0.5)` halves encoded channels in both engines.
  - PW WebKit paints no `backdrop-filter` (T4 back column equals raw), which confirms portfolio §1.5.
- **The saturate leg is not luminance-neutral.** On encoded sRGB, `saturate(1.4)` raised WCAG Y by +16.6% on `(200,100,50)`, +15.9% on `(226,84,20)` and +9.8% on `(60,140,200)`. On a near-neutral `(240,230,220)` the change was −0.4% (computed from the T4 bytes).
- **D3 reading:**
  - Over vivid fields, saturate moves exactly the quantity the ink bound depends on, by 10-17%.
  - A family that declares or solves a composite (C, D) should set saturate to 1 on text-bearing rungs or model it, which answers D3-C Q2.
  - For a light theme that needs the composite lifted, a raised Y helps dark ink slightly. For dark-theme light ink over a bright field it hurts.
- **Backdrop roots (T6, T6b):** see finding 1. In Chromium 149 the following did **not** stop a nested `backdrop-filter` seeing the page: `contain: paint`, `contain: layout`, `overflow: clip`, `isolation: isolate`, `transform`, `will-change: transform`. `opacity: .99`, `filter: blur(0)` and any `backdrop-filter` did.

## 8 · `prefers-reduced-transparency`

- **Spec** (MQ5 §12.2): `no-preference | reduce`; "the user has requested the system minimize the amount of transparent or translucent layer effects".
- **Support** (BCD): Chrome 118; Firefox 113 behind a flag; **Safari: none**.
  - WebKit bug 175497 is NEW, last changed 2026-07-01.
  - WebKit standards-position #145 is open, labelled "concerns: privacy", last updated 2025-06-12.
- **Measured (T5):**
  - Chromium parses the query and matches `no-preference` by default.
  - CDP `Emulation.setEmulatedMedia` with the feature set to `reduce` flips it to match.
  - Playwright 1.61's `page.emulateMedia({ reducedTransparency: "reduce" })` throws nothing and changes nothing.
  - PW WebKit matches **neither** value. That is the reliable detection idiom for "unsupported": both `(prefers-reduced-transparency: reduce)` and `(… no-preference)` are false.
  - `prefers-contrast` ships in Chrome 96 and Safari 14.1 (BCD). It is the one user-preference signal Safari gives a page; Apple's Increase Contrast should reach it (**unverified** mapping in real Safari).
- **D3 reading.** Real Safari users who turn on Reduce Transparency get nothing from CSS. So the library's level-0 escape (common floor row 4) can ride `prefers-reduced-transparency: reduce` in Chromium and Firefox only. In Safari, the only honest arms are `prefers-contrast: more` and a library control. Apple's own 26.1 Tinted and iOS 27 slider make a user control the platform precedent.

## 9 · Text stroke, halos and the self-grounded ink (D3-E)

### 9.1 Stroke

**Support:** `-webkit-text-stroke` in Chrome 4, Safari 3 and Firefox 49; it is specified in the WHATWG Compat spec, not a CSS module. `paint-order` affects HTML text in Chrome 123+ and Safari 11+ (BCD notes: crbug 41372165, webkit.org/b/168601).

**Measured (T3, T3b):**
- No layout metric changes in either engine.
- The fill survives under `paint-order: stroke fill`. With the default order a 3 px stroke erases the fill.
- Variable-font overlap contours are covered when the fill is painted last and exposed when the fill is transparent. This known cross-engine artefact is recorded in google/fonts #4212 (Montserrat) and #6516 (Mulish).
- At 12 px with a 1.5 px stroke, PW WebKit painted 244 stroke pixels against Chromium's 53 (T3 row d). So stroke rasterisation differs materially between engines at small sizes. Real Safari's hinting and subpixel behaviour: UNMEASURED (owner's safaridriver checkbox).

**The WCAG constraint (§5):** a narrow stroke is "the letter". So D3-E's contrast is stroke against backdrop, which a pole-coloured stroke (a light stroke in the light theme) does not improve over a light ground. For light muted ink over a vivid field, the stroke must be wide enough to count as a halo, with the halo the ground. Then ink against halo sets the number, and the pole-coloured halo is itself a tiny veil at the glyph.

### 9.2 The luminosity pole, a candidate for D3-A's substrate

This is finding 2 restated for the family owners.

**What it gives:**
- Composite lightness is pinned to the pole's luminosity on every ground tested, including black and white, in both engines.
- Hue survives: light C up to about 0.09, dark up to about 0.19.
- There is no signal and no α bound to derive.

**Requirements:**
1. The pole must blend within the same isolated group as the field.
2. Neither the plate nor any ancestor between plate and field may carry `transform`, `isolation`, `z-index` (as a stacking context), `opacity < 1`, `filter` or `will-change` for those.
3. The pole must not be a descendant of the `backdrop-filter` element.
4. The field must not be the root background.

**Failure mode:** flat grey. It stays legible (5.30 for light muted) but carries no hue and gives no signal. Under E-2 a family adopting it has to state whether flat grey counts as the primary working. Under D2's floor row 6 (`.dock-plate` carries the dock's one `backdrop-filter`), the pole would have to be a sibling of that element, not a child.

**Engines:** `mix-blend-mode: luminosity` is long-shipped in both. The non-separable Lum is `0.3R + 0.59G + 0.11B` on encoded channels (Compositing 1), not WCAG Y, so L spreads by about 0.02 across hues (T8b: 0.927-0.948).

**Real Safari:** UNMEASURED.

## 10 · WebGPU reductions and `mapAsync` (D3-B)

- **Support** (BCD):
  - `GPU` and `GPUBuffer.mapAsync`: Chrome 144 on all desktop platforms (113-143 partial: ChromeOS, macOS, Windows); Safari 26; Firefox 141, partial.
  - `timestamp-query` was present on this machine's Chromium adapter (T7).
  - Some web guides claim Safari 18 shipped WebGPU. BCD says 26, and so do WebKit's own "Features in Safari 26.0" post. Treat 26 as correct.
- **Measured:** finding 6 (Chromium, Apple `metal-3`, headless).
- **Cited:**
  - gpuweb #4432 (2023-12-31): `mapAsync` at 5-15 ms on an Intel iGPU and 1-5 ms on an NVIDIA 3060 Ti. `onSubmittedWorkDone` alone took 3-10 ms on Intel. A commenter measured "never more than a 3ms difference". The latency was attributed to Chrome/Dawn's polling (dawn:1335), with WGPUFuture as the planned fix.
  - Safari 26 `mapAsync` latency: **no published measurement found**. UNMEASURED.
- **D3 reading:**
  - The reduction is negligible, about 50 µs for a 720p frame.
  - Warm latency on Apple silicon Chromium is under one frame.
  - Other GPUs may add 1-2 frames. The D3-B witness ("updated within 2 frames") is plausible on Apple Chromium and unproven elsewhere.
  - A 3-deep map ring avoided every stall once warm.
  - The cold-start stall of 180-200 ms means the dock's first 12-24 frames need a declared unpublished state. Under E-2 that state must be legible by itself: the chrome bound, which is D3-A's floor.
  - The reduction must run on the substrate's own render target before presentation, since the canvas readback path returns alpha 0 (portfolio §1.4), and T7 shows no DOM readback is involved.

## 11 · Not verified (and why)

- Real Safari, all cells: UNMEASURED (owner's safaridriver checkbox). That covers `contrast-color()` flip, RCS precision, stroke rasterisation and hinting, the luminosity pole, `backdrop-filter` and saturate bytes, backdrop-root rules, and `mapAsync` latency.
- Apple's vibrancy blend math (the `plus-darker` reading); any published measured contrast ratio for Liquid Glass; shipping (non-beta) iOS 27 behaviour.
- Material 3 dynamic colour internals beyond the tone rule (the page renders client-side; only the search excerpt was read, and the rule was checked analytically).
- The practitioners' "20-30% black scrim" figure.
- Whether Safari's Increase Contrast maps to `prefers-contrast: more`.
- Windows and Intel GPU `mapAsync` numbers on current Chrome 149 (only the 2023 issue).

## 12 · Sources

**Apple**
- WWDC25 session 219, "Meet Liquid Glass" (June 2025), transcript: https://developer.apple.com/videos/play/wwdc2025/219/
- HIG *Materials* (change log to 2025-09-09), read via `developer.apple.com/tutorials/data/design/human-interface-guidelines/materials.json`: https://developer.apple.com/design/human-interface-guidelines/materials
- iOS 26.1 Clear/Tinted: https://www.engadget.com/mobile/smartphones/how-to-adjust-the-liquid-glass-effect-in-ios-261-203634681.html ; https://www.bgr.com/2030125/how-to-make-liquid-glass-easier-read-ios-26-1-guide/
- iOS 27 beta slider (2026-06-10): https://www.bgr.com/2191219/ios-27-liquid-glass-fix-customization/

**Critique and practice**
- NN/g, "Liquid Glass Is Cracked" (2025-10-10): https://www.nngroup.com/articles/liquid-glass/
- NN/g, "Glassmorphism" (2024-06-07): https://www.nngroup.com/articles/glassmorphism/
- Access Advisors: https://accessadvisors.nz/blog/liquid-glass ; let's dev: https://letsdev.de/en/blog/ios-26-in-detail-liquid-glass-ui-between-usability-and-accessibility.php

**Other design systems**
- Microsoft Learn, *Acrylic material* (ms.date 2026-08-29): https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic ; `TintLuminosityOpacity`: https://learn.microsoft.com/en-us/windows/winui/api/microsoft.ui.xaml.media.acrylicbrush.tintluminosityopacity
- Material 3 glossary: https://m3.material.io/foundations/glossary ; https://m3.material.io/blog/science-of-color-design/

**Contrast standards**
- WCAG 2.2 Understanding 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ; F83: https://www.w3.org/TR/WCAG20-TECHS/F83.html
- WCAG 3 contrast status (Roselli, 2026-04): http://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html ; https://www.w3.org/TR/wcag-3.0/
- APCA in a Nutshell: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html

**Specs**
- CSS Color 5 ED 2026-09-10: https://drafts.csswg.org/css-color-5/
- CSS Color 6 ED 2026-01-11: https://drafts.csswg.org/css-color-6/
- Filter Effects 1 ED 2026-09-22: https://drafts.csswg.org/filter-effects-1/
- Filter Effects 2 ED 2026-01-23: https://drafts.csswg.org/filter-effects-2/
- Media Queries 5 ED: https://drafts.csswg.org/mediaqueries-5/

**Engine support**
- MDN BCD raw JSON, read 2026-09-24: `css/types/color.json`, `css/types/pow.json`, `css/types/sign.json`, `css/types/exp.json`, `css/properties/{-webkit-text-stroke,paint-order,backdrop-filter,text-shadow}.json`, `css/at-rules/media.json`, `api/{GPU,GPUBuffer,GPUDevice}.json` under https://raw.githubusercontent.com/mdn/browser-compat-data/main/
- chromestatus `contrast-color()`: https://chromestatus.com/feature/4841046007742464 ; Chrome 147 notes: https://developer.chrome.com/release-notes/147
- WebKit bug 175497: https://bugs.webkit.org/show_bug.cgi?id=175497 ; standards-position #145: https://github.com/WebKit/standards-positions/issues/145
- WebKit, Safari 26.0 features: https://webkit.org/blog/17333/webkit-features-in-safari-26-0/

**Fonts and WebGPU**
- Variable-font stroke overlaps: https://github.com/google/fonts/issues/4212 ; https://github.com/google/fonts/issues/6516
- gpuweb #4432 (2023-12-31): https://github.com/gpuweb/gpuweb/issues/4432

**Measured here** (scratch `D3/p1/W/`):

| probe | what it measures |
|---|---|
| T1 | `contrast-color()` ramp and cases |
| T2 | OKLab `l³` solve |
| T2b | exact `srgb-linear` solve |
| T3/T3b | stroke and `paint-order` |
| T4 | filter colour space |
| T5 | reduced transparency |
| T6/T6b | backdrop roots |
| T7 | WebGPU reduction and `mapAsync` |
| T8/T8b/T8c/T8d | luminosity pole |

Outputs are `out-T*.json` and captures `cap-T*.png`.
