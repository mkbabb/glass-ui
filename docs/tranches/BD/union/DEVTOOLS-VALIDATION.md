# BD union — devtools validation (real Chrome / real GPU, chrome-devtools-mcp)

The user's mandate: "error-free is not enough — validate the animations, the morphing, the frames." Validated against a REAL Chrome (real GPU) via chrome-devtools-mcp (the headless swiftshader Playwright path is a fallback; this is the binding real-hardware read). Dev server :5173.

## 1. Liquid-tab indicator — the 5-phase gap CONFIRMED by measurement
Measured the current SegmentedTabs pill indicator through a live tab switch (`/dock/liquid-playground`, real Chrome, rAF sampling):
- rest: width 117.8, scale 1 → **51ms: scale 1.097 × 0.912** (X-stretch/Y-squish travel) → holds ~1.098 through travel (≈250ms) → relaxes → settles to scale 1 at ~400ms, width back to 117.8.
- **Verdict:** today's indicator does a travel-squish that SETTLES TO THE EXACT SIZE — it does NOT grow-overshoot *bigger than the target* then shrink-to-fit. This is the precise gap `BD.W-TABS-LIQUID` fills, now confirmed by real-Chrome measurement (not assumption). The 5-phase envelope (grow → blob-overshoot → travel → settle → shrink-to-fit) is genuinely net-new behavior.

## 2. Goo-split — renders correctly on real GPU
Drove the island fission to mid-pinch (`--dock-split-t = 0.42`) in real Chrome: the two glass pills (Timer | now-playing) bridge with a **smooth continuous goo neck** (the metaball waist), the recessed ghost-timer satellite on the left, over a richly-flowing aurora field (the real-GPU aurora is far richer than the headless swiftshader flat-gradient). The morph reads correctly on real hardware. The `#dock-fission-goo` filter is present + engages.

## 3. Corner aliasing — ROOT CAUSE confirmed in the live DOM
`/foundations`, every glass surface sampled (`.rounded-card`, `.section-preview-card`): `border-radius: 16px` + `backdrop-filter: blur(10-13px) saturate(1.05-1.18)` but **`clip-path: none`, `overflow: visible`** (even where `isolation: isolate`). → the saturate halo paints the full rectangular box, bleeding past the rounded corner = the stair-step the user flagged. Confirms `BD.W-CORNER-AA-WIDEN`'s root-cause + fix (clip the backdrop-filter plate to `inset(0 round var(--radius))`) against reality. ISOLATION alone does NOT clip the backdrop halo — the clip-path is required.

## 4. Giant placeholder-icon watermark — confirmed on every card
`/foundations`: every section card (Intro, Colors, Typography, …) renders a dashed-border preview box with a centered GIANT faint grey compass watermark (the same glyph as the eyebrow IconChip, oversized + ~55%-transparent). Confirms `BD.W-DEMO-ICON-PURGE` (the 3 byte-identical thumb recipes `.section-preview-thumb`/`.composition-scene-thumb`/`.intro-cat-thumb` defeating the `<SectionPreviewCard>` blurb-fallback). Superfluous on every page.

## Related observation (folded)
The `.section-preview-card` glass reads as a FLAT GREY SLAB over the light paper backdrop (glass is transmissive — over a flat page there's nothing to modulate; the AX.W54 note). The rich-backdrop page-redesign (or a live field behind the cards) is what makes the glass pop — a demo-design consideration for the breadth band, not a library defect.

## Tooling note
chrome-devtools-mcp (the `chrome-devtools-mcp` plugin) + the `playwright` plugin are now loaded — real-Chrome/real-GPU validation is the path going forward (perf traces, frame capture, live DOM reads). The claude-in-chrome *extension* remains disconnected (not needed). DesignSync (claude.ai/design) available for design-system review on request.
