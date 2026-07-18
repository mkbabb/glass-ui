# REFABLE stills timeline — "New Folder With Items 4"

Verified model: claude-fable-5 — read verbatim from this seat's system context ("The exact model ID is claude-fable-5").
Corpus: /Users/mkbabb/Downloads/New Folder With Items 4 — 20 image files (6 IMG_*, 12 desktop screenshots, 2 JPEG references). The 7 MP4/MOV recordings in the same folder are out of scope for this stills pass. IMG_1880.HEIC converted via sips to PNG for reading.
iPhone stills are 1206x2622 (3x, 402x874pt device class); pt values below are px/3 estimates. Desktop crops are 2x retina; CSS px = px/2. All measurements are estimates from pixels, marked est.

---

## IMG_2287.PNG — OpenAI reasoning-effort popup, position 1 ("High")

- Surface: ChatGPT iOS, dark mode. The model-effort control engaged as its enlarged popup variant — this pair is the named modal-slider: an inline control that enlarges into a popup slider on engagement. Label row "5.6 Sol High >" above a segmented capsule slider; conversation text behind.
- Design property flagged: blur subtlety — the gradient blur falloff behind the element. The chat text far above the control is fully sharp; blur ramps in progressively toward the control. A context chip behind the popup (directly above the label) is heavily blurred to illegibility while text ~70pt higher is still crisp.
- Values (est): blur ramp runs 0 → ~20pt radius over ~70pt of vertical travel; paired with a dark dim and a soft elliptical luminance lift behind the control (feathered grey backplate, ~40-60pt feather). Track: ~341pt wide, ~68pt tall, full capsule (r=34pt). White thumb pill: ~153pt x 48pt, r=24pt, inset ~10pt from track edge. 3 unselected positions render as ~12pt dots. Label: ~28pt; "5.6 Sol" white semibold, state word grey — two-weight one-line hierarchy, chevron affordance for a fuller sheet.
- Web-recreation lesson: backdrop-filter has no native gradient blur — build the falloff as 3-5 stacked backdrop-filter layers, each with a mask-image linear-gradient band and roughly doubling blur radius, plus one dim layer. The control floats on the ramp, not on a hard-edged scrim; nothing behind it has a visible boundary.

## IMG_2288.PNG — OpenAI reasoning-effort popup, position 2 ("Extra High")

- Surface: identical frame seconds later; slider advanced one position.
- Design property flagged: affordance — the thumb does not travel past dots, it grows to absorb the next position. Pill widens ~153pt → ~207pt (est) while remaining dots drop 3 → 2; track and label row stay fixed; only the state word changes weight position ("High" → "Extra High", still grey after the bold value).
- Values (est): thumb growth ~54pt = one dot pitch; geometry otherwise identical to IMG_2287, confirming the ramp and backplate are static while the thumb animates.
- Web-recreation lesson: implement the thumb as a width-animated capsule (spring on width + dot crossfade), not a translated fixed-width thumb. Selection = occupied length, a liquid-volume metaphor consistent with the goo idiom.

## IMG_1874.PNG — Apple Writing Tools "Proofread" sheet over a chat app

- Surface: iOS Writing Tools sheet (grabber, "Proofread" title, blue confirm circle, Copy/Replace/Share capsule row, proofread text with highlighted diff spans) presented over a purple-bubble chat (Adri).
- Design property flagged: material — the sheet is a frosted diffuser that visibly inherits the color of what it covers. Purple bubbles behind bleed through as broad washes; highlighted edit spans add a second lilac tint inside the sheet.
- Values (est): backdrop blur ~40-60pt with saturation boost; white diffusing layer ~65-75% opacity — hue survives, geometry does not. Sheet top radius ~28pt. Button capsules ~57pt tall, r ~24-28pt, one step lighter than the sheet field. Confirm circle ~42pt solid blue — the single saturated accent.
- Web-recreation lesson: sheet material = backdrop-filter: blur + saturate, then a translucent white fill — never an opaque panel. Let content tint the surface; reserve full saturation for the one primary action.

## IMG_1880.HEIC — hand sketch, capsule crossed by an axis (x, y, z progression)

- Surface: marker on paper, three drawings stacked: a capsule crossed near its left end by a vertical stroke. Top: region labeled x. Middle: labels y (with up arrow) above x. Bottom: z (up arrow), y, x — three zones along the crossing.
- Design property flagged: concept, not critique — the user's own diagram of a pill intersected by an orthogonal element with the intersection gaining zones one at a time. Reads as the layer/axis progression of the pill morph: the crossing element splits the capsule into ordered regions (x, then x+y, then x+y+z).
- Values: n/a — schematic.
- Web-recreation lesson: treat pill-and-crossing-element intersection as an ordered stack of zones, each added axis a distinct layer of the morph — matches the dock/slider model where growth happens per-axis (EXPAND grows the pill on one axis before the next engages).

## IMG_1881.PNG — r/iOSBeta beta-to-beta glass comparison (Apple Maps card)

- Surface: Reddit dark UI; embedded side-by-side of the Maps "Places" card across two iOS 27 betas; commenter text enumerates the changes. Reddit's own overlay chrome (close circle, r/iOSBeta pill, search/filter/avatar pill cluster) floats as dark translucent glass over content.
- Design property flagged: material and rounding, as itemized by the post — lighter drop-shadows inside the glass buttons; flatter tops and sides (less rounded-squircle); much brighter upper and lower edges in light mode; left/right edges less dark grey. Second commenter asks whether the icon shine changed — edge/shine treatment is what observers track.
- Values: qualitative deltas only, but directional — inner shadow weight down, top/bottom rim light up, side edge darkness down, corner curvature continuity relaxed at tops/sides.
- Web-recreation lesson: the glass edge model is anisotropic — bright rims on the horizontal edges, near-neutral verticals; dark side edges are the tell that breaks the glass illusion ("edges are still too dark to trick my brain"). Keep inset shadows light; per the repo's own trap note, inset fragments must live in plain per-mode arms, never inside light-dark().

## IMG_1882.PNG — Visual Capitalist "Median Household Income by U.S. City 2026"

- Surface: full infographic in an app viewer (Voronoi): ranked horizontal bars, U.S. average rule at $85.8K, region-colored bars (West blue, Midwest green, South gold, Northeast red), inset region map, annotation arrows, brand footer band.
- Design property flagged: dataviz hierarchy — label inside bar start, value at bar end, dashed average rule with a boxed label, categorical region palette carried into the map legend, serif display title over mono-ish bar labels.
- Values: 4-hue categorical palette; every bar labeled inline, no y-axis; average rule as the single reference line.
- Web-recreation lesson: reference ramp for ranked-bar idiom in report work — inline labels beat axes at this density; one reference line, boxed label; palette doubles as geography legend.

## Screenshot 2026-06-20 at 01.41.17.png — collapsed radio strip, "selected: none"

- Surface: a 96px-wide dark strip from a glass-ui demo — one unfilled radio circle, label "selected: none" rendered rotated 90 degrees down the strip.
- Design property flagged: defect capture — the control has collapsed to a sliver; the state label runs vertically because the container lost its width, not by design.
- Values: strip ~96px wide at capture; text set vertically; single radio glyph at top.
- Web-recreation lesson: container-width collapse produces sideways text before it produces overflow — a min-width floor on demo control panels, and state labels that truncate horizontally rather than reflow vertically.

## Screenshot 2026-06-20 at 18.52.29.png — Apple Maps iOS 27 home, satellite + glass sheet

- Surface: the Maps reference card: satellite base, bottom sheet (search capsule, Places row of solid-color circle icons Work/Home/Walmart/Add, Recents row), 3D + binocular circles left, globe/locate capsule stack right, weather chip top-left.
- Design property flagged: material and hierarchy — the sheet is neutral glass that picks up the green of the terrain beneath (blurred bleed, luminance lift); identity color lives only in the place icons (brown/blue/yellow solid circles) and the avatar, never in the glass itself. Controls split into two families: standalone circles (left) and a two-icon capsule stack (right).
- Values (est): sheet top radius ~24pt; backdrop blur ~30-50pt with slight desaturation; search capsule ~40pt tall, full radius, one tone lighter than sheet; place circles ~60pt-class; floating circles ~44-48pt of darker glass over bright satellite; map labels get white halo strokes to survive the busy base.
- Web-recreation lesson: neutral glass + saturated content dots is the Maps formula — glass never carries brand color. Grouped actions merge into one capsule with an internal divider of nothing (spacing only); singles stay circles.

## Screenshot 2026-06-21 at 04.08.42.png — glass-ui liquid-playground header crop

- Surface: repo demo page, light ecru theme: kicker "DOCK · LIQUID MORPH" (mono, letterspaced), route chip /dock/liquid-playground (grey rounded rect, mono), top hairline rule, headline "Liquid Morph" cropped mid-glyph.
- Design property flagged: none — this still cites the in-repo surface the external references target.
- Values (est): chip radius ~6-8px CSS; kicker ~11-12px CSS with wide tracking; headline black weight.
- Web-recreation lesson: anchor context — the stills timeline maps external material references onto this page's dock.

## Screenshot 2026-06-21 at 04.08.48.png — liquid-playground card header crop

- Surface: same page, the explainer card: "Liquid playground — the dock is the control interface", body copy naming useLiquidMorph, one dock-spring scalar written onto the dock element, EXPAND grows the pill.
- Design property flagged: none — doctrine citation: one engine, one scalar, the dock is the controlled object.
- Values: card on ecru with faint edge and large radius (top corners visible, est ~16-20px CSS).
- Web-recreation lesson: the single-scalar morph contract is the frame all the capsule references below feed into.

## Screenshot 2026-06-21 at 14.38.54.png — capsule-to-sheet morph, expanded state (video frame crop)

- Surface: warm orange backdrop; the top of a pale sheet with a grabber bar and a purple-gradient card centered inside — the expanded state of the widget/pill morph the 15.26 stills show collapsed (frame lifted from the sibling screen recordings).
- Design property flagged: material and rounding at the expanded pole — the sheet is not white: it grades warm pink to cream across its width, inheriting the ambient backdrop; corner radius stays generous at full size.
- Values (est): sheet top radius ~36-44px; grabber ~56x8px, mid-grey, centered; the inner card's gradient matches the album-art gradient of the collapsed pill — the art becomes the hero surface.
- Web-recreation lesson: at the expanded pole of a morph, keep ambient tint in the surface and carry one element (the art gradient) across states as the identity thread.

## Screenshot 2026-06-21 at 14.38.58.png — "Search places" capsule (video frame crop)

- Surface: cream capsule search field on a warm gradient backdrop; magnifier left, "Search places" placeholder, mic right.
- Design property flagged: material warmth and content tinting — the capsule is near-opaque warm white, and text/icons are warm brown, not black/grey; no border, negligible shadow.
- Values (est): capsule height ~130px of a 263px-tall crop — a tall, generous field; full capsule radius; placeholder large relative to height (cap height ~30% of field height).
- Web-recreation lesson: tinted monochrome content on a warm near-opaque capsule reads softer than black-on-white glass; warmth in the ink, not just the surface.

## Screenshot 2026-06-21 at 15.26.49.png — music pill, single state (video frame crop)

- Surface: cream capsule: rounded-square album art (purple-green gradient) left, two-line text (title dark, artist warm brown), outlined-circle play button right.
- Design property flagged: affordance anatomy — art / two-line text / action circle, with the action as a thin-ring circle inside the capsule end, not a filled button.
- Values (est): pill ~130px tall in a 263px crop; art ~96px square with ~24px radius (squircle-adjacent, not circle); play ring inset from the capsule's right cap.
- Web-recreation lesson: the media pill's action stays tone-on-tone (ring, not fill); color identity again lives in the art block only.

## Screenshot 2026-06-21 at 15.26.54.png — timer + music goo capsule (video frame crop)

- Surface: two live activities — Timer (radial progress ring, 8:24, maroon arc, "Laundry · 8:24") and music (art square, title, purple EQ bars) — joined as one cream body with a pinched gooey waist between them.
- Design property flagged: the goo join — the segments do not sit adjacent with a gap; they share a meniscus bridge, one liquid body with two lobes. This is the goo-morph exemplar the deck-worm rule cites.
- Values (est): waist height ~45-50% of lobe height; concave neck curvature roughly mirrors the capsule radius; each lobe keeps independent internal alignment; ring progress ~85% with track in grey.
- Web-recreation lesson: build as metaball/SDF or blur+contrast goo filter between sibling capsules; the waist depth is the state signal (merging vs splitting), and content never crosses the waist.

## Screenshot 2026-06-22 at 11.32.12.png — USF report, STATE cards (NC flooded gold)

- Surface: sci-report dark dashboard; two STATE cards — North Carolina flooded with a full-field gold gradient (selected/hover), Tennessee in the resting dark treatment; italic serif metric labels (Net retention, Rank, Per capita), white NC/TN map marks.
- Design property flagged: hierarchy failure in the selected state — the flood fill destroys contrast (white italic on mid-gold, est ~2.5:1) and the metric values are washed out or absent; the resting dark card reads better than the selected one.
- Values (est): card radius ~12-16px CSS; flood is a corner-to-corner gold gradient with no reserved text plate.
- Web-recreation lesson: selection should move to edges and accents — border light, kicker color, a tinted band — never a full-field flood behind unchanged text.

## Screenshot 2026-06-22 at 11.32.18.png — USF report, stacked detail panels

- Surface: two detail panels open simultaneously — NET PAYER North Carolina (-$37.9M, 0.85x) over NET RECEIVER Tennessee (+$35.8M, 1.21x); mono numerals right-aligned, italic serif row labels, BY PROGRAM bars (gold/purple/green/blue on dark tracks), "Esc" affordance top-right; a phone-shaped card thumbnail overlaps the lower panel's bar rows.
- Design property flagged: layering — two modal panels stack and collide, and a stray thumbnail artifact sits on top of live content; also the FILTERS control is half-occluded behind the first panel.
- Values (est): panel radius ~12px CSS; label/value contrast good in this state; bar tracks ~8px tall with ~10-12% white tracks.
- Web-recreation lesson: detail panels need exclusivity (one open, or an explicit compare layout) and a z-policy; the numeric typography here (mono values, italic serif labels, colored program dots) is the keeper.

## Screenshot 2026-06-22 at 13.30.41.png — USF report, fund funnel section

- Surface: "How big is the fund, and where does it go?" — serif display over a funnel that converges to an $8.92B node then fans out as ribbons to four program labels (High Cost 52.7%, Schools & Libraries 30.3%, Low Income 11%, Rural Healthcare 6.1%); NET -$324.1M in red; stat row ($8.92B in blue, $8.60B out red, 0.96x retention chip).
- Design property flagged: the fan-out ribbons are near-invisible (fill opacity est 4-8% on dark) — the section's central relationship, where the money goes, barely renders; the intake funnel by contrast is a solid light shape.
- Values (est): display serif ~72px, dek ~20px with inline color-coded terms, mono stats ~40px; grid at very low contrast.
- Web-recreation lesson: flow ribbons on dark need a floor around 12-18% opacity plus per-program hue and a hover-to-solidify state; keep the in/out color code (blue/red) consistent from dek to stats.

## Screenshot 2026-06-22 at 13.58.05.png — USF report, capacity section type ramp

- Surface: section header crop — serif display "Are they using the capacity?", grey serif dek explaining ceiling/headroom/sequential ink, larger indented serif pull-line ("Demand has caught the capacity the schools bought..."), top edge of a chart panel below.
- Design property flagged: typographic hierarchy as the design system — display, dek, pull-quote in three distinct serif sizes/colors carrying the narrative before any chart.
- Values (est): display ~64px, dek ~19px at ~65% white, pull ~30px at ~85% white, all CSS-px at 2x.
- Web-recreation lesson: the editorial ramp (display → dek → pull) is the report's voice; keep the dek doing definitional work with inline color-coded vocabulary.

## Screenshot 2026-06-22 at 14.32.01.png — 1895 Monte Carlo playbill in a lightbox

- Surface: photo of an open Cercle des Étrangers de Monte Carlo program (7 March 1895 — La Pavane, Coppélia) inside a viewer: dark chevron circles at the edges, two-dot pager pill at bottom.
- Design property flagged: reference typography — Victorian playbill hierarchy: ornamented display faces per act title, small-caps section heads, dotted-leader cast lists, hairline rules with center ornaments, dense justified fine print.
- Values: ~5 distinct type treatments in one page column; ornaments as section dividers.
- Web-recreation lesson: source material for the report's ornament-and-rule language — leader dots for label/value rows, ornamented rules as section breaks; also a plain example of the dot-pager idiom the goo work replaces.

## Screenshot 2026-06-23 at 12.36.16.png — fourier demo, multi-select combobox popover

- Surface: light-grey popover over the fourier demo (display type behind): search field with full-bleed underline, six rows (Fourier and Chebyshev checked; Legendre, Hermite, Laguerre, Bessel), leading checkmarks.
- Design property flagged: material — the popover is flat opaque grey, no translucency, no tint pickup, sitting over a page with strong content to inherit; a native-style control inside a glass-idiom demo.
- Values (est): panel radius ~10px CSS; row text ~15px CSS; check-only selection (no checkbox chrome); soft wide drop shadow.
- Web-recreation lesson: keep the calm anatomy (search on top, check rows, no per-row chrome) but re-materialize as glass — translucent field, backdrop blur, ambient tint; per repo memory, verify the reka-ui bindings behind such popovers on version bumps since stale props no-op silently.

## images-2.jpeg — metallic grain texture photo

- Surface: photographed metallic surface — fine sparkle grain, warm amber light falling off to olive-bronze shadow, soft corner shading.
- Design property flagged: texture reference — grain at 1-2px scale with a smooth large-scale hue/luminance drift; shimmer without geometry.
- Values: two frequencies only — micro sparkle + one broad gradient; no mid-frequency pattern.
- Web-recreation lesson: metal shimmer = fine noise layer (near-static) over a slow two-stop hue gradient; avoid mid-frequency noise, which reads as dirt rather than metal.

## liquid-metal-background-textures-01-...jpg — "Metal Flow" liquid metal texture

- Surface: marketing cover for a liquid-metal texture pack — molten gold cloth folds, strong anisotropic specular ridges, white sans overlay type.
- Design property flagged: material reference for the liquid-metal direction — highlights run in long ribbons along fold crests; the specular ramp is hard (near-white crest to deep umber trough within a short distance); fold frequency varies across the field.
- Values (est): specular ridge width ~1-3% of image width; value range near full black-to-white within a single fold; hue stays in one gold family throughout — luminance, not hue, does the work.
- Web-recreation lesson: liquid metal is an anisotropic-highlight problem — flow-aligned ridged specular over a single-hue base; a shader ramp with a sharp knee, not a soft radial gloss.

---

Cross-image threads

- Progressive blur is directional and bounded: IMG_2287/2288's falloff is a ~70pt vertical ramp, not a uniform scrim — stacked masked backdrop-filter layers are the web mechanism.
- Growth over travel: the OpenAI thumb widens to absorb positions; the goo capsule shares a waist; the pill-to-sheet morph keeps one identity element across poles — selection and state are liquid volume, consistently.
- Glass never carries the color: Maps, Writing Tools, and the beta comparison all put saturation in content (icons, art, one confirm circle) while the glass stays neutral and inherits ambient tint; dark side edges and heavy inner shadows are the failure smells named by observers.
- The sci-report stills flag three concrete defects — selected-card flood, panel stacking collisions, sub-legible flow ribbons — against an otherwise settled editorial system (serif ramp, mono numerals, playbill ornament language).
