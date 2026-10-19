# MS8-rulings.py · D3 pass 10, the minor split v8: R-21 (b)'s rulings under R-26 and H10-2, written from this seat's
# reading of every line prose-sweep.mjs prints over the minor v8 (MS8-records/sweep-minor8.log), each read with the
# sentence it belongs to (MS8-records/ctx-*.txt, MS8-context.py) and, where a clause names a mechanism, a value, a count
# or a line number, against the minor v8 tree (and against HEAD where a clause was false, to tell `reported` from false).
#
# R-26: a ruling reads every clause of its line and of the sentence the line belongs to. A line is
#   true      when every such clause holds on the minor v8 tree; `why` names what makes each clause true;
#   reported  when a clause is false, was false at HEAD (the line is byte-identical at HEAD), and the patch did not
#             write the line (MS8-records/printed-lines-written-by-patch.txt) (H10-2);
#   FALSE     otherwise: no ruling, so prose-sweep FAILs the line as unread. The FALSE set below names each one and why.
# Pass 9's MS7 rulings ruled whole files with one shared `why` (68 distinct whys for 371 lines); R-26 asks for each
# clause, so every line is re-ruled here. The generator refuses to run unless every printed line is covered exactly once.
#   python3 -I MS8-rulings.py <sweep LIST log> <out.json> [--proposed]
# --proposed rules the minor v8 + MS8-r26-proposed.diff tree instead (the FALSE lines rewritten, §4.3 of MINOR-SPLIT-v8.md).
import json, re, sys

T, R = "true", "reported"
# (file, [lines], verdict, why). One entry per sentence group; every clause the group's lines carry is named.
RULES = [
 # ── DESIGN.md (36) ─────────────────────────────────────────────────────────────────────────────
 ("DESIGN.md", [34], T, "R-25 (MS7-r21b-proposed.diff) as built. 'Surface tint (rgba background)': glass-plate writes a translucent colour background (veil.css:87-94). 'the light-vs-dark admit-through': the plate's α sets what the backdrop admits. 'Light-mode and dark-mode tints differ': light paints --glass-veil-ink = var(--card) (tokens/glass.css:40) at rungs bound, bound + 1 step, bound + 2 steps (:51-55), so 'at or above the solved bound α' holds and 'a cream frost, never an ink' holds (the pole is --card, O-62); dark paints oklch(0.17 0.03 70), a warm near-black (dark-arm.css:275), at base 0.18 ± n·0.04 (:276-282), 'at its own rung α'"),
 ("DESIGN.md", [89], T, "the spring selection rule as a stated law (snappy/bouncy/smooth press, entrance, swap); 'System-driven time-bound motion … uses --ease-standard … those are observer motions, not driver motions' is the §L2 driver/observer rule. Names no veil mechanism; the minor's patch touches no motion token (no src/styles/tokens/scheme-motion.css hunk)"),
 ("DESIGN.md", [93], T, "a stated law, read as a law: tap-squish is transform: scale() (--scale-press 0.96, :95); 'opacity flips and bg-tints are interactive-rest indicators, not press feedback' and 'No primitive may ship a press-feedback that is NOT squish-press' hold as the rule every primitive follows: the dock control's press fill rides WITH its scale-press (icon-button.css:118-124), never instead of it. HEAD text; the minor writes no motion token"),
 ("DESIGN.md", [115], T, "--motion-weight 0 → 1 with rest 0.618 = 1/φ (property-regs.css:212-218, 'initial-value: 0.618'); it co-scales squash, overshoot, anticipation and the cartoon-shadow travel (property-regs.css:212-214 says the same); the driver/observer scoping and PRM → 0 are the scheme-motion.css §2 law that block names. The minor's patch touches no motion token"),
 ("DESIGN.md", [150], T, "reduced-transparency: a11y-fallback.css (HEAD's file, untouched by the minor) sets --glass-level: 0, and level 0 resolves solid --card (tokens/glass.css:173; veil.css:87-92 mixes ink at level·100% into --card) with blur(0): 'Surface α → 1.0', 'backdrop-filter → none', 'opaque tinted surface' (a solid --card plate); grain and rim clauses are the bracket's own HEAD declarations, which the minor does not edit"),
 ("DESIGN.md", [462], T, "the cartoon shadow is the visual half of the Cartoon register (--ease-cartoon-punch its motion half); the live source is the color-mix form in tokens/shadow.css, never raw rgba; it rides --shadow-color = var(--foreground), so a near-black stamp in light and near-white in dark. The minor's shadow.css hunks change --shadow-dock and --shadow-dock-collapsed only, not the cartoon family"),
 ("DESIGN.md", [476], T, "a deferral, stated as one: the warm-tinted cartoon cast is left to the cartoon-shadow greenfield and not asserted; the cartoon family still rides --shadow-color (shadow.css)"),
 ("DESIGN.md", [521], T, "matches the minor's recipe clause by clause (veil.css:69-94): reads --glass-veil-tier with resting as the unset default; clamps it upward by the measured luma into --glass-veil-rest then --glass-veil-rung; mixes into --glass-veil; writes exactly background: var(--glass-veil) and isolation: isolate; 'not a backdrop root' is veil.css:62-68's own reading; the five tiers apply it (ladder.css); --glass-veil is a nestable value token (veil.css:49-51)"),
 ("DESIGN.md", [600, 604], T, "the state table's rows: hover is a scale up (--scale-hover 1.08, --scale-hover-dock 1.1) or a bg tint; aria-pressed / .is-active is a tinted bg with full-opacity text, component-scoped. Names no veil mechanism; HEAD rows the minor does not edit"),
 ("DESIGN.md", [608], T, ".interactive-item: the bg-tint four-state at 50% accent plus the focus ring, a utility the minor's patch does not touch"),
 ("DESIGN.md", [732, 733, 734, 735, 736, 737, 738, 739], T, "a type-scale row: the token's CSS clamp() value and its px span at the fluid ends. The minor's patch touches no typography file (0 hunks under src/styles/typography), so each row reads as at HEAD"),
 ("DESIGN.md", [751, 755], T, "a consumer's own clamp() wrapping the display tokens as its ceiling, given as an example (speedtest's cqi axis); an example, true as one"),
 ("DESIGN.md", [931], T, "(1) --control-floor is the clamp seam: 0px at desktop, --touch-target (2.75rem) under pointer: coarse, every --control-h-* a max() against it (tokens/sizing.css:22-29; light-dark.css:11-14)"),
 ("DESIGN.md", [983], T, "the section ladder has thirteen stops, --section-color-0..12 (color-radius.css:331-343), so 'index with i mod 13' and 'no thirteenth stop' hold; the bridges stop at 12; the ordinal law (2 + 4i) mod 13 visits all thirteen since gcd(4, 13) = 1. The minor's hunk in color-radius.css edits --section-color-5's comment only, not a value"),
 ("DESIGN.md", [989], T, "the outline Badge pairing and the section triplet override; the section family is a 13-rung tinted ladder, not a 4-state tone; the CVA tone axis is deferred to a second consumer. Names no mechanism the minor changes"),
 ("DESIGN.md", [1045, 1046, 1047], T, "the dock hover is a bg darken in both themes on the minor: --dock-control-hover-bg is light-dark(foreground ink at --fill-hover 0.05, --glass-plate-resting) (sizing.css:206), and both legs darken the dock's own plate (light: ink over the cream plate; dark: the 0.18 near-black ink rung over the dock's 0.14 one); icon-button.css, triggers.css and tab-button.css read that token; --scale-hover-dock is 1.1; the select trigger takes no scale"),
 ("DESIGN.md", [1227], T, "the sticky header's blur classes and its --card-header-bg tint token stay consumer-side: grep finds no --card-header-bg declaration in src/ or demo/, as the sentence says"),
 ("DESIGN.md", [1234], R, "the row states a library default for --card-header-bg (color-mix(in srgb, var(--card) 60%, transparent)), but no file in src/ or demo/ declares or reads the token (grep), and :1227 says it stays consumer-side. Byte-identical at HEAD, not written by the patch; for the landing docs pass"),
 ("DESIGN.md", [1286], T, "the slider's data-held binding to the dock's dockHeld flag and its thumb-halo on a denser --surface-tint rung: HEAD prose of a contract the minor does not touch"),
 ("DESIGN.md", [1309], T, "MetricStack/MetricRow subgrid; phase tint and animation stay outside the static metric family. Names no mechanism the minor changes"),
 ("DESIGN.md", [1359, 1361], T, "the timeline partition's `at` boundary is clamped monotone, never sorted, and the clamp preserves author order: a stated data law of a primitive the minor does not touch"),
 ("DESIGN.md", [1817, 1818, 1820], T, "tier and status tones tint marks, fills and plates, and the numeral stays --foreground: the tier/status discipline, which the minor's patch does not touch"),
 # ── demo ───────────────────────────────────────────────────────────────────────────────────────
 ("demo/stories/dock/dock-search.vue", [198], T, "the search field rides the dock morph, and its earned ink (search.css:3-13: glass-plate's clamp over the dock's luma) is what keeps its text at or above 4.5:1; 'adaptive tinting' names that earned ink"),
 ("demo/stories/substrates/glass-material.vue", [5], R, "of the three 'SOTA folds', the chromatic fringe is not painted (the story's own blurb at :383, 'no painted fringe at the edge'). HEAD text, byte-identical, not written by the patch (MS7 §4.2)"),
 ("demo/stories/substrates/glass-material.vue", [12], R, "'the adaptive tint sets BOTH --glass-veil-ink + a non-zero --glass-veil-rung so the color-mix(in oklab, …) actually bites': the story writes only --glass-veil-ink on its tint plate, never --glass-veil-rung, and the plate mixes in srgb (veil.css:87-92). False at HEAD the same way; not written by the patch (MS7 §4.2)"),
 ("demo/stories/substrates/glass-material.vue", [72, 73], R, "the same sentence pair as :12: the tint does not need 'BOTH knobs', the sample strengths are never written as --glass-veil-rung, and the mix is srgb. HEAD text, not written by the patch (MS7 §4.2)"),
 ("demo/stories/substrates/glass-material.vue", [27, 30], T, "Arm 2 is the demo exerciser for the sampled-luminance observer: the story imports useGlassBackdropLuminance directly (it is off the public barrel) and mounts it on a glass card over the live Aurora; the observer writes --glass-backdrop-luma and the bucket (useGlassBackdropLuminance.ts:238-260); the dock is the shipped consumer (GlassDock.vue)"),
 ("demo/stories/substrates/glass-material.vue", [122, 127], T, "the per-instance accent axis: each swatch sets --glass-accent and --glass-accent-strength inline; the accent tints the rim and the ::before glint (rim.css:16-32, property-regs.css:114-118); an unset surface is the neutral identity, so it paints the plain material"),
 ("demo/stories/substrates/glass-material.vue", [225], T, "a measurement note: over a flat low-σ substrate a plate's blur radius and tint are both invisible, which is why the specimens live over the Aurora. True of any plate"),
 ("demo/stories/substrates/glass-material.vue", [228, 229, 230], T, "this page wires the sampled-luminance observer on a content card; the only other mounts are the dock's own (GlassDock.vue) and the dock stage (DockStage.vue), so 'the one place … outside the dock' holds; 'earned-ink clamp' is the clamp the minor keeps (veil.css:69-85), photographed here because the observer feeds it"),
 ("demo/stories/substrates/glass-material.vue", [253], T, "a rung nested in a rung resolves --glass-cell-backdrop-filter: none (one backdrop sample per plate), and the bright bucket engages through the floating ancestor, which declares --glass-backdrop: light (ladder.css:125-133)"),
 # ── feedback-tone.css (15) ──────────────────────────────────────────────────────────────────────
 ("src/components/_shared/feedback/feedback-tone.css", [4, 8], T, ".feedback-tone has one shipped consumer, Toast (Toast.vue:138); Alert binds only the --tone registers (alert/index.ts) over a neutral .glass-quiet rung, and the tinted Alert plate is not built (R-3)"),
 ("src/components/_shared/feedback/feedback-tone.css", [20, 21], R, "the sentence calls the tone wash 'the SAME color-mix(in oklab, …) seam the --glass-veil-* legibility lift and the --veil-bg plate already run': the veil mixes in srgb (veil.css:87-92) and no --veil-bg is declared in src/. HEAD text (HEAD's veil is srgb too, and HEAD declares no --veil-bg); the patch edits this header at :38 only (MS7 §4.2)"),
 ("src/components/_shared/feedback/feedback-tone.css", [25], T, "the body ink stays --foreground / --card-foreground and is never tone-tinted: the tone lands on the wash, the rim and the glyph only (:71-112)"),
 ("src/components/_shared/feedback/feedback-tone.css", [29], T, "--feedback-tone-strength (18%, :60) is the one bounded mix % for all four tones"),
 ("src/components/_shared/feedback/feedback-tone.css", [34], T, "the tint mixes over --glass-veil, the rung's own published plate (the .feedback-tone background's color-mix base; G-FEEDBACK-TINT-SEAM arm (a))"),
 ("src/components/_shared/feedback/feedback-tone.css", [36], R, "'glass/veil.css:35-37 names \"a tone-tinted feedback panel\"': the phrase is at veil.css:50 on the minor and at :46 at HEAD, so the line reference is false; without it the claim (one of two intended consumers, the other the capsule's warm floor) is true (veil.css:49-51). Byte-identical at HEAD, not written by the patch"),
 ("src/components/_shared/feedback/feedback-tone.css", [38], T, "a .feedback-tone surface mixing over --glass-veil tints its own rung, so the earned-ink clamp (which the minor keeps, veil.css:69-85), the tier ink and --glass-level, all inputs of --glass-veil (:87-92), survive inside the mix"),
 ("src/components/_shared/feedback/feedback-tone.css", [44], T, "history in the past tense: the register used to mix over a raw --feedback-tone-rung, and as background is one property the result replaced the rung's background: var(--glass-veil)"),
 ("src/components/_shared/feedback/feedback-tone.css", [57], T, "18% reads as coloured glass inside the stated ≈12-22% band; 'the silhouette is unmistakably tinted' is the design reading of that band, and one knob retunes all four tones (:60)"),
 ("src/components/_shared/feedback/feedback-tone.css", [63], T, "--feedback-tone-rung has one declaration and zero writers elsewhere in src/ (grep: :64 only), held by G-FEEDBACK-TINT-SEAM arm (b)"),
 ("src/components/_shared/feedback/feedback-tone.css", [65], T, "--feedback-tone-border-strength 40% is a tone-keyed border mix, a thin tinted rim (:66)"),
 ("src/components/_shared/feedback/feedback-tone.css", [71], T, "a surface declares --tone and composes .feedback-tone; the wash and the rim resolve off the one recipe"),
 ("src/components/_shared/feedback/feedback-tone.css", [109], T, ".feedback-tone-glyph carries the full-chroma --tone, the one saturated note over the tinted wash"),
 # ── control.css, menu.css, button, card, configurator, dialog ──────────────────────────────────
 ("src/components/_shared/field/control.css", [114, 115, 116], T, "the field's type is --type-small alone: --control-text = --type-small × --ui-scale (sizing.css:35), so the scale factor escapes the type clamp; 16.40px × 1.5 = 24.60px at coarse, over the clamp's 20px ceiling. A typography clamp(), not the veil clamp"),
 ("src/components/_shared/field/control.css", [145], T, "a single-line field keeps --radius-pill, which the engine clamps to half the block-size; a multi-line box takes --radius-field"),
 ("src/components/_shared/menu/menu.css", [8], T, "the minor's light row: --menu-row-bg is light-dark(oklch(from var(--section-color-5) l c h / var(--fill-selected)), …) (menu.css), so LIGHT is the amber accent ink at the selected alpha 0.12 (color-radius.css:164)"),
 ("src/components/_shared/menu/menu.css", [11], T, "the light menu plate is --card at α, the theme's own cream, so a plate colour over it paints nothing visible; a foreground-ink fill darkens it with no hue (C 0.010, the minor's measured figure), which reads grey; hence the accent tint (:7-9)"),
 ("src/components/_shared/menu/menu.css", [118], T, ".glass-menu-divider is color-mix(in oklab, var(--foreground) …, transparent) (:121-125), so it re-tints under .dark through --foreground"),
 ("src/components/button/styles.css", [60, 67, 72], T, "the engine clamps --radius-pill (9999px) to half the block-size, and the radius scaling clamps a narrow box's corner to half its short edge; a min(9999px, …) would re-derive a clamp the engine already applies. Geometry, not the veil"),
 ("src/components/button/styles.css", [143], T, "Button's tone tints and never replaces: the fill is the emphasis plate mixed toward the tone over --glass-veil (button/styles.css reads var(--glass-veil); Button.test.ts:144-149)"),
 ("src/components/card/styles.css", [212], T, "type rungs derive from the one fluid --type-body value, so the interval holds at the type clamp's floor, its fluid arm and its ceiling"),
 ("src/components/configurator/styles.css", [129], T, "--configurator-section-tint, default transparent on light, is the faint section tonal step behind a ConfiguratorLayer"),
 ("src/components/configurator/styles.css", [149], T, "the rounded border and the section tint carry the card read; the hover-fill corner poke is sub-perceptual at the concentric radius"),
 ("src/components/configurator/styles.css", [444], T, "the tile clamp's middle term is cqi, a share of the ribbon, not vw"),
 ("src/components/configurator/styles.css", [462], T, "the top placement lifts only the inline-size floor; the clamp MIN 200px clears the ≥72px ribbon floor"),
 ("src/components/configurator/styles.css", [528], T, "the selected chip sets --glass-capsule-fill to light-dark(oklch(from var(--foreground) l c h / var(--fill-selected)), var(--glass-plate-quiet)) (:529): light the one-ink --fill-selected fill, dark the quiet glass plate, through the documented override hook"),
 ("src/components/dialog/styles.css", [16, 19], T, "the inline gutter clamp: --space-section 32 desktop / 20 mobile gives 512px capped wide and a 20px gutter per side at 393. Layout, not the veil"),
 ("src/components/dialog/styles.css", [67], T, "title and description derive from one fluid value, so the 1.272 interval holds at the type clamp's floor, arm and ceiling"),
 # ── dock ───────────────────────────────────────────────────────────────────────────────────────
 ("src/components/dock/styles/adaptive-legibility.css", [7], T, "the partial owns the foreground self-engage, the contrast-color() refinement and the data-backdrop-mode=\"static\" arm; the plate's earned ink is composed at the element in dock/dock.css through @utility glass-plate (dock.css:101-116, veil.css:69-94); 'darker in dark, a thicker cream pole in light' is the clamp's direction on each pole"),
 ("src/components/dock/styles/adaptive-legibility.css", [18], T, "a quotation of the owner's G2 edict, quoted as such"),
 ("src/components/dock/styles/adaptive-legibility.css", [30], T, "the partial re-points no plate colour (its declarations are --dock-fg-on-aurora and the muted register, :35-48); the plate's earned ink is the veil clamp composed at the element, the whole dynamic half; a dark-substrate consumer opts out with --glass-level on the dock root"),
 ("src/components/dock/styles/adaptive-legibility.css", [38, 39], T, "the dock plate applies glass-plate at the element (dock.css), so the clamp reads the --glass-backdrop-luma the dock's observer (useGlassBackdropLuminance, mounted in GlassDock.vue) writes on the dock root, inherited to the plate"),
 ("src/components/dock/styles/adaptive-legibility.css", [50], T, "an absence: the file declares no @container style(--glass-backdrop: light) block for the dock's own ink; such a block would re-assert the unconditional self-engage, since a style query cannot self-match"),
 ("src/components/dock/styles/adaptive-legibility.css", [53], T, "the bucket that reaches descendant nested glass lives in glass/ladder.css (:163-302), beside the rungs; this file owns the dock root's ink"),
 ("src/components/dock/styles/dock.css", [14], T, "the plate paints one layer whose ink lerps between the collapsed and expanded rungs on --dock-expand-t (dock.css:117-125), composed through glass-plate at the element so the observer's luma reaches it: the earned ink, one chromatic writer, no second tint layer (:114-116)"),
 ("src/components/dock/styles/dock.css", [16], R, "the sentence credits 'The shell + adaptive-legibility partials' with re-pointing --dock-surface-blur and --glass-veil-* on .glass-dock; adaptive-legibility.css declares neither (its declarations are the foreground register, :35-48), shell.css alone does (:20, :96-98). Its first clause ('one chromatic writer, no second tint layer') is true. False at HEAD the same way; not written by the patch (MS7 §4.2; floor v9 built R-24 (iii) for its own tree, R-25 does not)"),
 ("src/components/dock/styles/dock.css", [104, 105], T, "the :root --glass-plate-{rung} tokens bake :root's --glass-backdrop-luma (they are composed at :root, tokens/glass.css:182-186), so a plate painted from them cannot see the luma the dock's own observer writes on the dock root"),
 ("src/components/dock/styles/dock.css", [107], T, "quotes the owner's G2 edict and says it would resolve to a constant through the :root tokens, which follows from :103-105"),
 ("src/components/dock/styles/dock.css", [109, 110], T, "composing through glass-plate at the element reads the inherited luma where the plate paints, and the clamp earns up to two more rungs over a measured-bright backdrop (veil.css:69-85: tier + 2·step·ramp, capped at tier + 2·step)"),
 ("src/components/dock/styles/dock.css", [112], T, "one chromatic writer (the veil), and the observer is wired to it through the luma the clamp reads"),
 ("src/components/dock/styles/dock.css", [114, 116], T, "an absence stated as history: no separate tint veil layer is painted over the rung; the axis it was meant to carry is the veil clamp"),
 ("src/components/dock/styles/index.css", [24], T, "dock/adaptive-legibility.css holds the foreground self-engage, the contrast-color() refinement and the static arm, and declares no clamp and no bucket (its clamp and bucket mentions are comments naming veil.css and ladder.css, :30, :38, :50-54)"),
 ("src/components/dock/styles/index.css", [82, 85], T, "the search field's 'tint legibility seam' is the earned-ink clamp the minor keeps (search.css:3-13 composes glass-plate at the element); the field consumes it and the menu-row recipe and re-authors neither (Crit8 §5.2's kept reading)"),
 ("src/components/dock/styles/search.css", [7, 8], T, "the field surface applies glass-plate at the element; its clamp reads the --glass-backdrop-luma the dock's observer writes and the field inherits, not a pre-substituted :root plate token"),
 ("src/components/dock/styles/search.css", [10], T, "a colour composed at :root bakes :root's luma and earns no ink (the substitution trap); the dock's own such token is struck: tokens/glass.css:187, 'NO --glass-plate-dock, deliberately'"),
 ("src/components/dock/styles/search.css", [12, 13], T, "over a calm or unsampled backdrop the clamp resolves the tier's own α exactly, and past the knee it earns up to two more steps (veil.css:69-85); the dock's L0 plate takes the same path (dock.css:101-116)"),
 ("src/components/dock/styles/shape.css", [122], T, "the max(…, 0.06) guard matches the --dock-size-scale clamp floor in layers.css: geometry"),
 ("src/components/dock/styles/shell.css", [30, 33], R, "'the UNIFIED PLATE TINT is the PRIMARY anti-gray … The plate-tint self-engage (dock/adaptive-legibility.css)': that partial carries no plate tint, and the plate's ink is glass-plate's clamp (dock.css:101-116). HEAD's adaptive-legibility.css already 're-points no plate colour'; the patch edits this file at :130-146 only (MS7 §4.2)"),
 ("src/components/dock/styles/shell.css", [134, 135], T, "the L0 plate composes glass-plate at the element (dock.css), whose clamp reads the --glass-backdrop-luma the dock's own observer writes on this root and which inherits to the plate"),
 ("src/components/dock/styles/shell.css", [138], T, "--glass-backdrop: light is kept (:141) so descendant nested glass reads the bright bucket through ladder.css's ancestor-querying @container block; a style query never self-matches, so it is inert for the dock's own plate"),
 ("src/components/dock/styles/shell.css", [144, 145], T, "the morph endpoints are ink rungs (--dock-plate-collapsed-tier: var(--glass-veil-wash), :147), the plate lerps its α and composes at the element (dock.css:117-125), which lets the observer's luma reach the paint; a --glass-plate-* colour endpoint bakes :root's luma"),
 ("src/components/dock/styles/shell.css", [213], T, "history of a measured width cap: at 393px 80vw is 314px, narrower than the 377px plate, so the cap clamped the dock below the offered width"),
 ("src/components/dock/styles/shell.css", [360], T, "vertical docks grow to fit, then clamp at --dock-max-block-size and scroll their own block axis"),
 # ── sheet, segmented ───────────────────────────────────────────────────────────────────────────
 ("src/components/sheet/styles.css", [328], T, "history in the past tense: as a child of the plate the sampler's backdrop-filter landed nothing, and what painted was a masked gradient tint"),
 ("src/components/sheet/styles.css", [364], T, "the band sits one z rung under the modal plate (z-index: calc(var(--z-modal) - 1)), so the plate is never sampled through it"),
 ("src/components/sheet/styles.css", [504], T, "'A clamp is not a fit': a clipped row still reports its rect, so a clamped layout read green while clipping the action. Layout, past measurement"),
 ("src/components/tabs/styles/segmented.css", [8, 11], T, "the pill track rides --glass-plate-quiet and a hairline; the indicator is the floating rung's plate (surfaces.css:57-63), a glass tint forward of the track, not a saturated hue or bg-card; it spans, leans, swells, inverts and clamps at the bar's inner edge (:241-245)"),
 ("src/components/tabs/styles/segmented.css", [49], T, "--radius-tab = --radius-pill = 9999px, which the engine clamps to half-height on a short box: a stadium end-cap"),
 ("src/components/tabs/styles/segmented.css", [88], T, "a tall column box clamps the stadium to a ~46px half-height balloon, so the vertical arm rebinds to --radius-strip"),
 ("src/components/tabs/styles/segmented.css", [241, 242], T, "the indicator body compresses against the bar's inner edge when it cannot span further, and the writer reports the clamp instead of shortening the span"),
 # ── the observer composable (36) ───────────────────────────────────────────────────────────────
 ("src/composables/glass/useGlassBackdropLuminance.ts", [1], T, "the observer samples the painted field under a surface (a static elementsFromPoint walk or a live canvas downsample) and writes the luma the veil clamp turns into ink, and the bucket that lifts the ink on the plate; 'adapt its tint for legibility' names that pair"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [4], T, "it writes --glass-backdrop-luma (:248, WCAG relative luminance) and the light/dark --glass-backdrop bucket (:238, :259-260)"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [25], T, "GlassBackdropBucket is 'light' | 'dark', derived at :238 and written at :259-260"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [32], T, "with a backgroundCanvas the live path downsamples that canvas under the surface's box (sampleAnimated, :306-312) instead of the static stack walk"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [45, 46, 47], T, "lightThreshold defaults to 0.6 (:143) and the bucket is light at value ≥ threshold (:238); a near-white page (luma ≈ 0.9) reads light and a dark substrate (≈ 0.1) dark; the bright bucket is what the light value engages"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [56, 58], T, "writeBucket defaults to true (:145) and gates the --glass-backdrop write (:259, :282); with false only --glass-backdrop-luma is written"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [62, 65, 66, 67], T, "shared marks the per-route observer (options.shared === true, :152), which stamps GLASS_BACKDROP_SHARED_ATTR (:386); covered surfaces stand down and inherit --glass-backdrop-luma and --glass-backdrop through the cascade (:298-300); the default is a per-surface observer"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [75, 77], T, "luma and bucket refs hold the last sample and are null before the first"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [80], T, "the sample ref reports provenance, and a live request with a missing canvas reports unavailable (:206-207, :301-305)"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [86], T, "dispose stops the loop and detaches the observers and listeners"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [121, 122], T, "GLASS_BACKDROP_SHARED_ATTR (:126) is stamped by a shared observer (:386); descendant per-surface observers detect it (coveredByShared) and inherit"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [129, 131, 133], T, "the observer writes a dynamic luma that refines the declarative bucket; the dock mounts it by default (GlassDock.vue); --glass-level: 0 opts a surface out because level 0 multiplies the veil's α out (veil.css:87-92); the declarative floor stays the guarantee"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [150, 151], T, "a shared observer runs one readback; covered surfaces inherit (:298-300), standalone ones sample themselves"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [155, 157, 158], T, "coveredByShared reads el.closest of the marker; only a shared observer stamps it, so a match is an ancestor's scope, and a shared observer short-circuits false"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [206], T, "each live tick re-resolves the canvas, so a live request is sampled from it or reported unavailable, never a static sample"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [250], T, "data-backdrop-sampled is stamped on the first successful write (:251), separating an unsampled observer from a calm backdrop; an attribute, no layout"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [298], T, "sampleNow returns early when coveredByShared(el) (:300): the covered surface inherits --glass-backdrop-* through the cascade"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [309], T, "the translucent field is composited over the real opaque underlay (resolveUnderlayRgb, :312), so a dark and a light page under the same field give distinct luma"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [345], T, "resume returns early for a covered surface (:347)"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [359], T, "applyMotionState checks coveredByShared first (:362)"),
 ("src/composables/glass/useGlassBackdropLuminance.ts", [381, 383, 384], T, "a shared observer stamps the marker (:386); a covered per-surface observer returns (:387) and inherits the route luma; an uncovered one self-samples"),
 # ── glass.css, control-bit, control-surfaces, deep, grasp, ladder-undershadow ───────────────────
 ("src/styles/glass.css", [47], T, "veil.css is the ink-veil register: the plate recipe and its earned-ink clamp (veil.css:69-94), imported before ladder.css because the rungs @apply glass-plate"),
 ("src/styles/glass.css", [116, 118], T, "the chip and atom composers read --glass-fill-tinted (tokens/glass.css:212-216) and --glass-material-rim, so they import after glass-capsule.css in the same layer and their tinted-fill layers win by source order"),
 ("src/styles/glass/control-bit.css", [175], T, "the paragraph is the recess's DARK arm (:166, 'THE RECESS'S DARK ARM', a .dark ancestor override): in dark glass/veil.css darkens a plate by compositing --glass-veil-ink, the near-black oklch(0.17 0.03 70) (dark-arm.css:275), and dark-arm.css states the ink's law"),
 ("src/styles/glass/control-bit.css", [182], T, "the pole is oklch(0 0 0), the spelling --glass-under-shadow-* uses for a pure-ink leg (tokens/glass-fx.css); a mix toward black scales the channels and keeps the hue"),
 ("src/styles/glass/control-surfaces.css", [17], T, "--control-h-md is max(calc(2.5rem × --ui-scale), --control-floor) (sizing.css:28), the h-10 register with the coarse 44px floor"),
 ("src/styles/glass/control-surfaces.css", [34], T, "history: the pill edge moved off the srgb --surface-tint-15 fork onto the glass border seam (--control-surface-border, :44)"),
 ("src/styles/glass/control-surfaces.css", [40], T, "the register reads the --glass-* ladder: --control-surface-border = --glass-border-floating, --control-surface-bg = --input-on-glass, --control-surface-blur = --glass-blur-quiet (tokens/glass.css:277-279, as :41-43 say), so --glass-level (which scales the blur, glass.css) and the bright bucket's ink lift reach every form control in lockstep"),
 ("src/styles/glass/control-surfaces.css", [116], T, "the destructive/success tints reuse the semantic tokens through color-mix"),
 ("src/styles/glass/control-surfaces.css", [138], T, "the 8% at-rest bg arm stays .input-pill-local, a glass-tint substrate the bare-ring surfaces lack; the ring is --invalid-ring (:139)"),
 ("src/styles/glass/control-surfaces.css", [150], T, ".glass-wash[role=\"combobox\"] takes border-color: var(--surface-tint-15) (:154-156), the same lift the input pill had"),
 ("src/styles/glass/deep.css", [18], T, ".glass-deep re-points only the blur tokens, so the edge, rim, under-shadow, the a11y brackets and the tint axis compose unchanged; 'tint axis' read as property-regs.css:124's TINT axis (the whole-plate --glass-veil-ink legibility veil) or the fill-tint axis (tokens/glass.css:201): both compose unchanged under .glass-deep (Crit8 §3's reading)"),
 ("src/styles/glass/deep.css", [26, 29], T, "the deep blur composes --glass-level (glass-deep.css), so the a11y brackets reach it and reduced-transparency collapses it to blur(0); .glass-deep is composed with .glass-floating, which sits in the @container bright-bucket group and self-engages the bucket (ladder.css:125-133), and its plate earns the floating rung's ink through the clamp, darker in dark and a thicker --card pole in light (veil.css:39-44)"),
 ("src/styles/glass/deep.css", [73, 75], T, "history in the past tense: the predecessor LERPed the floating radius (20px then) toward the 16px deep endpoint, so a deep overlay painted 16px against a plain 22px overlay. R-23's history site (deletes-minor.json); the rung reading prints, not gated (H9-2)"),
 ("src/styles/glass/grasp.css", [120, 121], T, "the held rung is max(--glass-veil-rest × 0.6, --glass-veil-floor) (:139), and --glass-veil-rest is the clamped rest (veil.css:70-85); shedding from the raw tier would drop below the band over a bright backdrop"),
 ("src/styles/glass/grasp.css", [133, 135], T, "glass-plate composes both names as the veil's α (veil.css:70-92); liquid-fill.css declares --glass-veil-rest: 1 (:59) and scales its mix % by the rung (:73), so the ratio runs 1 → 0.6 there too"),
 ("src/styles/glass/ladder-undershadow.css", [17], T, "level 0 resolves the veil mix to 0% ink and 100% --card (veil.css:87-92: ink at calc(level × 100%) into --card) and the blur to blur(0); the earned-ink clamp is the rung, the veil's α, which level 0 multiplies out"),
 # ── ladder.css (25) ────────────────────────────────────────────────────────────────────────────
 ("src/styles/glass/ladder.css", [2], T, "the file holds the five-tier ladder, the @container style(--glass-backdrop: light) bucket beside its rungs, and the .glass-opaque escape"),
 ("src/styles/glass/ladder.css", [125], T, ".glass-floating declares --glass-backdrop: light by default, the overlay band over an unknown surface"),
 ("src/styles/glass/ladder.css", [148], T, ".glass-overlay declares --glass-backdrop: light (:150)"),
 ("src/styles/glass/ladder.css", [163, 165], T, "the section heads the bright bucket (G2); 'THE TINT AXIS IS GONE': no rung mixes toward --glass-veil-ink outside the veil, which writes that ink at the rung's own α (veil.css:87-92)"),
 ("src/styles/glass/ladder.css", [169], T, "the veil is the one writer; the observer-driven refinement rides its α through the clamp in glass-plate: calm → exactly the rung, measured-bright → up to two more rungs, ceiling included (veil.css:69-85)"),
 ("src/styles/glass/ladder.css", [173], T, "the bucket lifts the muted register to the full ink under --glass-backdrop: light (the @container block below); it drives the ink, not the plate"),
 ("src/styles/glass/ladder.css", [196], T, "--on-glass-muted is the register between page-muted and full ink; the bright-bucket lift still wins where it engages"),
 ("src/styles/glass/ladder.css", [210, 213, 216], T, "the -strong on-glass rung extends to the tone-tinted (.feedback-tone, Toast its one shipped consumer), mid-tone and selected-glass surfaces the content-tier :where() does not reach; the census figures are the stated measurement"),
 ("src/styles/glass/ladder.css", [228], T, "tone-tinted and selected chip plates composite brighter than the calm quiet plate (stated measured figures), so they read the -strong rung"),
 ("src/styles/glass/ladder.css", [244], T, "contrast-color() is the enhancement; the declarative bucket carries the floor on every engine by lifting the ink to full"),
 ("src/styles/glass/ladder.css", [248], T, "contrast-color is anchored on --card, the warm-white surface base (light --card is oklch(0.9799 0.011 63.36), color-radius.css:84-85) that the bright bucket implies"),
 ("src/styles/glass/ladder.css", [251, 252], T, "anchoring on the dark ink would invert to white; the bucket is the floor and contrast-color() the refinement, scoped to the bright bucket (the @supports block's selectors sit under the @container condition)"),
 ("src/styles/glass/ladder.css", [254, 255], T, "the bright-bucket ink flip covers the content tiers and the overlay band over a declared or sampled bright backdrop, lifting --muted-foreground with the active register in lockstep"),
 ("src/styles/glass/ladder.css", [281], T, "the overlay band's flip lives in the @container bright block (which lists .glass-floating, .glass-overlay), not as an unconditional rule"),
 ("src/styles/glass/ladder.css", [291], T, "a modal over a bright backdrop flips to the contrast ink where the bucket lifts it to its floor; --foreground and --muted-foreground move together there"),
 ("src/styles/glass/ladder.css", [293, 294], T, "the overlay band self-engages the bucket unconditionally (.glass-floating and .glass-overlay declare --glass-backdrop: light), and only the ink flips in the bright bucket"),
 ("src/styles/glass/ladder.css", [302], T, "the content tiers take no unconditional contrast-color flip; their flip lives in the @container bucket"),
 # ── liquid-fill, overlay-plate, rim ────────────────────────────────────────────────────────────
 ("src/styles/glass/liquid-fill.css", [4], T, "the register is the warm tinted-glass fill factored out of the slider's range composite"),
 ("src/styles/glass/liquid-fill.css", [17, 18], T, "a surface sets the one --liquid-fill-tint knob; the register owns the blur, rim and under-shadow"),
 ("src/styles/glass/liquid-fill.css", [22, 23], T, "--liquid-fill-tint is the hue (warm-cream amber default) and --liquid-fill-strength the mix % against the 0-alpha leg, 88% by default (:73, var(--liquid-fill-strength, 88%)), scaled by --glass-veil-rung"),
 ("src/styles/glass/liquid-fill.css", [47], T, "the fill paints a mix, not glass-plate's veil, so it declares --glass-veil-rest and --glass-veil-rung itself (:59-60)"),
 ("src/styles/glass/liquid-fill.css", [55], T, "held, the rung is 0.6 × rest, so the mix % (strength × rung, :73) sheds 40%; the release lerps the registered --glass-veil-rung"),
 ("src/styles/glass/liquid-fill.css", [63, 64, 65], T, "the tint mixes against a warm 0-alpha leg (:70-75), so the cylinder is a tinted fill over the field; --liquid-fill-tint is the one phase-colour knob"),
 ("src/styles/glass/overlay-plate.css", [15], T, "the component composes .glass-floating, which carries the blur, the base shadow and the backdrop bucket (--glass-backdrop: light, ladder.css:125-133)"),
 ("src/styles/glass/overlay-plate.css", [112], T, "the tooltip's height cap is placement-derived, so a hint pinned at an edge is clamped too; the cap rides a scroller instead of clipping"),
 ("src/styles/glass/overlay-plate.css", [271], T, "the listbox plate is two flat layers reading one recipe; there is no adaptive-tint layer and no --select-plate-alpha (grep: no declaration), and the veil carries the earned ink"),
 ("src/styles/glass/rim.css", [6, 12], T, "the partial lists what stays in ladder.css (the ladder, the bright-bucket @container, the calm re-point, the contrast-color flip, the opaque escape, the under-shadow, the grain); the bright bucket is kept there to hold its source-order tie with the @supports block"),
 ("src/styles/glass/rim.css", [19], T, "the accent reaches both the inset rim legs and the per-rung border, so the rim reads as one silhouette"),
 ("src/styles/glass/rim.css", [30], T, "the accent mix is color-mix(in oklab, …); the in-srgb fence is the --surface-tint-* family, which this never touches"),
 # ── surface-axis, surfaces-pager, surfaces, veil ───────────────────────────────────────────────
 ("src/styles/glass/surface-axis.css", [21], T, "R-25 (MS7-r21b-proposed.diff) as built: the opaque escape is solid --card + blur(0) through the one --glass-level knob, 'with no tint axis to zero' (there is none: ladder.css:165), and a solid plate has no translucent backdrop to earn ink over"),
 ("src/styles/glass/surface-axis.css", [43], T, "the veil surface is the quiet rung's material (--glass-veil-tier: var(--glass-veil-quiet), :46) with the edge off; no recipe fork and no brightness leg: the clamp darkens toward the near-black ink in dark and thickens the --card pole in light (veil.css:39-44)"),
 ("src/styles/glass/surface-axis.css", [79, 81], T, "there is no tint axis to zero (ladder.css:165): the veil is the plate's one writer, and a solid plate earns no ink; 'bucket-INVARIANT' because the opaque rung paints solid --card whatever the bucket"),
 ("src/styles/glass/surface-axis.css", [124], T, ".glass-well mixes in oklab (color-mix(in oklab, var(--card), var(--foreground) var(--glass-well-tone)), :128-132), the perceptual family, not the in-srgb fence; its inset groove reads the warm --foreground ink"),
 ("src/styles/glass/surfaces-pager.css", [31, 32], T, "the pill composes glass-plate at the element (:41-42), not the :root --glass-plate-floating token; over a calm or unsampled backdrop the clamp resolves the floating rung's own α exactly, and over a sampled bright image it earns ink (veil.css:69-85)"),
 ("src/styles/glass/surfaces-pager.css", [34, 35], T, "the parenthesis R-25 restores closes after 'in both themes)': the clamp's two-step ceiling keeps the pill translucent in both themes (light: bound + 2·(1 − bound)/3 < 1, tokens/glass.css:51-57; dark: 0.22 + 0.08 = 0.30, dark-arm.css:279); one writer, the clamp, moves the pill's ink (veil.css:46-47), never a second axis; the pill runs no oklab mix of its own (its two box-shadow mixes are in srgb)"),
 ("src/styles/glass/surfaces-pager.css", [37], T, "the in-srgb --surface-tint-* brand fence is untouched by the pill; the pager chassis follows the dock plate's element-composed precedent (--glass-veil-tier + @apply glass-plate)"),
 ("src/styles/glass/surfaces.css", [59], T, ":where(.segmented-indicator, .glass-capsule) set --glass-veil-tier: var(--glass-veil-floating) and apply the one recipe, so the clamp's earned ink (darker in dark, a thicker --card pole in light) reaches them as every plate"),
 ("src/styles/glass/veil.css", [7], T, "the file declares @utility glass-plate (:69) and the observer-driven clamp that lets a measured-bright backdrop earn more than the rung"),
 ("src/styles/glass/veil.css", [11], T, "a :root-composed plate colour bakes :root's --glass-level and --glass-backdrop-luma (tokens/glass.css:182-186 compose them at :root)"),
 ("src/styles/glass/veil.css", [39, 40], T, "--glass-veil-rung is --glass-veil-rest, the tier clamped upward by the luma ramp (:70-85); at or below the knee the ramp is max(0, …) = 0, so the rung is the tier exactly"),
 ("src/styles/glass/veil.css", [42, 43, 44], T, "past the knee it earns up to two steps, the clamp's ceiling tier + 2·step included (:81-84); in dark that adds near-black ink (darker), in light it thickens --card (the light ink is var(--card), tokens/glass.css:40), and every light tier is ≥ the bound (:51-55), so a light plate only moves above it"),
 ("src/styles/glass/veil.css", [45, 47], T, "--glass-backdrop-luma registers initial-value 0 (property-regs.css:172-176), so an unsampled surface sits on its tier; the veil is the one chromatic writer and no tint axis remains (ladder.css:165)"),
 ("src/styles/glass/veil.css", [50], T, "--glass-veil is the nestable value token; its readers include the capsule's warm floor (glass-capsule.css) and the tone-tinted panel (feedback-tone.css)"),
 ("src/styles/glass/veil.css", [53], T, "--glass-veil-rest is the clamped rest (tier plus what the backdrop earned); --glass-veil-rung is what the plate paints, equal to rest at rest (:86)"),
 ("src/styles/glass/veil.css", [59], T, "history: written against the raw tier, a held plate over a bright backdrop fell below the band floor, since 0.6·tier < 0.6·rest whenever the clamp earned anything"),
 # ── tokens: color-radius, dark-arm, glass-deep, glass-fx, glass, light-dark, on-glass-fg ──────
 ("src/styles/tokens/color-radius.css", [37], T, "the neutral ramp's L90 chip cannot carry C 0.020 without a cast, so it lifts to C ≈ 0.013; 'tinted not warm' names the triumvirate trigger"),
 ("src/styles/tokens/color-radius.css", [77], T, "the light --card family stays cream, never a tinted cast: --card is oklch(0.9799 0.011 63.36) (:84-85)"),
 ("src/styles/tokens/color-radius.css", [94], T, "--surface-public-data-panel is an opaque hsl() surface (:95), not a --surface-tint-* overlay"),
 ("src/styles/tokens/color-radius.css", [165], T, "--fill-selected is 0.12 (:164), the light menu row's accent tint alpha (menu.css: oklch(from var(--section-color-5) … / var(--fill-selected))), an accent, not the ink; hover is --fill-hover 0.05"),
 ("src/styles/tokens/color-radius.css", [216], T, "the --surface-tint-* rungs are named handles, color-mix(in srgb, var(--foreground) N%, transparent) (:220-232); '36+ raw sites' is the provenance count of what they were minted for, which the tree neither confirms nor contradicts (FV9 §4.4's reading)"),
 ("src/styles/tokens/color-radius.css", [234], T, "the muted-tinted rungs are named handles for raw color-mix(in srgb, var(--muted) N%, transparent) sites; '9 raw sites' is the minting provenance (as :216)"),
 ("src/styles/tokens/color-radius.css", [248], T, "--constellation-accent is the one consumer preset; the library ships a neutral default (:271)"),
 ("src/styles/tokens/color-radius.css", [268], T, "--constellation-accent is hsl(18 58% 46%) (:271), a desaturated warm default the consumer overrides"),
 ("src/styles/tokens/color-radius.css", [283], T, "--constellation-accent is the edge tint; -edge-floor is the neutral-edge alpha minimum, default 0"),
 ("src/styles/tokens/color-radius.css", [307], T, "--constellation-well-max-speed 4.0 px/frame caps the pull, the no-slingshot clamp"),
 ("src/styles/tokens/color-radius.css", [338], T, "--section-color-7 is the violet the tinted eyebrow defaults to"),
 ("src/styles/tokens/dark-arm.css", [47], T, "history with the measured figures: the dark card lifted (L17) so card/page relL widened from ≈2× (a 0.003 luma band, a measured gap, not the luma signal) to ≈8×"),
 ("src/styles/tokens/dark-arm.css", [82], R, "the sentence lists --glass-veil-ink among 'EVERY dark var(--foreground) consumer' that 're-resolves warm in lockstep'; the dark --glass-veil-ink is the literal oklch(0.17 0.03 70) (dark-arm.css:275), not derived from --foreground. Lines :81-82 are byte-identical at HEAD, whose dark ink is the same literal (:278); not written by the patch. The other listed consumers do read --foreground"),
 ("src/styles/tokens/dark-arm.css", [212, 213], R, "'In dark, --foreground is near-cream (high L) so the pin's clamp(0.28, l, 0.34) clamps L UP to its 0.34 ceiling': dark --foreground is hsl(30 14% 90%) (:86), so the clamp brings L DOWN to 0.34. :213 is the same sentence. Byte-identical at HEAD, not written by the patch (FV9 §4.3 reports the same line)"),
 ("src/styles/tokens/dark-arm.css", [310, 312], T, "the dark on-glass muted rung, hsl(34 16% 72%) (:316), lifts brighter than page-muted; 'the mirror of the light arm's darkening': the light on-glass muted, oklch(0.4811 0.046 66.37) (on-glass-fg.css:38-39), sits below the light page-muted hsl(30 22% 40%) (OKLab L 0.526); it stays under the L90 --foreground, and the bright bucket is the full-ink lift"),
 ("src/styles/tokens/dark-arm.css", [326], T, "the paragraph's head: the dark --surface-tint-* arm is --foreground-derived, each rung oklch(from var(--foreground) 0.975 c h) mixed in srgb (the declarations below it)"),
 ("src/styles/tokens/dark-arm.css", [329], R, "'the 9-rung chip/hairline/divider scale': --surface-tint-* declares 11 rungs in each arm (4/6/8/10/12/15/18/22/25/40/70; grep counts 11 and 11). Byte-identical at HEAD, which also declares 11; not written by the patch (FV9 §4.3)"),
 ("src/styles/tokens/dark-arm.css", [332], R, "'A hardcoded … literal ×12' and, in the same sentence, 'all 12': there are 11 rungs, as :329. HEAD-identical, not written by the patch (FV9 §4.3)"),
 ("src/styles/tokens/dark-arm.css", [345], R, "the sentence (:343-345) says 'the SAME 12-rung α ladder': 11 rungs, as :329. HEAD-identical, not written by the patch (FV9 §4.3)"),
 ("src/styles/tokens/dark-arm.css", [346], T, "every --surface-tint-* consumer re-resolves with the dark arm's relative-colour recipe (oklch(from var(--foreground) 0.975 c h)), with no per-site edit"),
 ("src/styles/tokens/glass-deep.css", [55], T, "history in the past tense: the LERP ran 20px → 16px, so a deep overlay painted 16px where the plain overlay painted 22; R-23's line above names the ladder by its tokens"),
 ("src/styles/tokens/glass-fx.css", [2], R, "'the adaptive tint-source': no such token exists; the file's backdrop knobs are --glass-backdrop and --glass-backdrop-luma-knee (:139, :145). HEAD has no such token either; the patch does not write this line (MS7 §4.2)"),
 ("src/styles/tokens/glass-fx.css", [121], T, "the light arm of --tab-track-recess-ink is foreground at 7% (:122), a darkening ink over the cream fill (the dark arm is its own declaration, :117-118)"),
 ("src/styles/tokens/glass-fx.css", [127, 131], T, "--glass-backdrop is the declarative bucket, default dark (:139), read by @container style() queries; it drives the ink on the plate (ladder.css:173-176)"),
 ("src/styles/tokens/glass-fx.css", [132, 133, 135], T, "--glass-backdrop-luma is the measured luminance the observer writes (useGlassBackdropLuminance.ts:248), driving the plate's own ink through the veil clamp (veil.css:69-85)"),
 ("src/styles/tokens/glass-fx.css", [137], T, "the bucket drives the band's ink, the luma refines; the veil is the one chromatic writer on the plate"),
 ("src/styles/tokens/glass-fx.css", [141, 143], T, "--glass-backdrop-luma-knee 0.6 (:145): below it the clamp gives the rung's own α, above it the α ramps continuously toward two more steps, darker in dark and a thicker --card pole in light; a higher knee earns later"),
 ("src/styles/tokens/glass-fx.css", [170], T, "--chart-* alias the viz hues for consumers' phase tinting"),
 ("src/styles/tokens/glass-fx.css", [208], T, "--shadow-color is var(--foreground), so a cartoon shadow re-tints under .dark; the scrim pins its own ink instead"),
 ("src/styles/tokens/glass.css", [14], T, "the minor's light law: the plate recipe paints --card at the rung's α; the bound is the α at which the muted ink clears its target over any input; with the light ink = --card (:40) the plate never mixes toward a near-black ink over paper, so it does not read grey there (O-62; W-0.1 G1 over paper 11/11, carried)"),
 ("src/styles/tokens/glass.css", [163], T, "the dock re-points --dock-fg-on-aurora unconditionally on its root (adaptive-legibility.css:46); a style query cannot self-match, so a bucket for it would re-assert that value; an @supports contrast-color block refines it"),
 ("src/styles/tokens/glass.css", [176], T, "the plate tokens mix in srgb (an alpha of a surface colour, :182-186); the oklab/srgb fence divides tints from plates"),
 ("src/styles/tokens/glass.css", [195], T, "the well's tone-step is an oklab mix (surface-axis.css:128-132), the perceptual tint family, not the in-srgb fence; one knob --glass-well-tone 8% (:199) in the stated [6%, 10%] band"),
 ("src/styles/tokens/glass.css", [201, 203], T, "--glass-fill-tint / --glass-fill-strength are the per-instance fill axis beside --glass-accent (the rim) and --glass-veil-ink (the whole-plate legibility ink); the fill tints the plate body toward a data hue"),
 ("src/styles/tokens/glass.css", [212, 214], T, "--glass-fill-tinted is the one data-hue plate the chip and atom composers read (glass.css:116-118); it reads the tint/strength axis directly"),
 ("src/styles/tokens/glass.css", [233], T, "the border rungs are --foreground at ≤5% (:236-240), warm, with presence below the read threshold"),
 ("src/styles/tokens/glass.css", [256, 257], T, "--glass-floor-fill is an alpha of --card, a plate leg, mixed in srgb; at definition 0 it is transparent and at 1 the ≤15% backplate (--glass-floor-fill-max 15%, :260)"),
 ("src/styles/tokens/glass.css", [330], T, "the fill-tint properties are registered with neutral initial values, so a malformed override computes to the initial value"),
 ("src/styles/tokens/light-dark.css", [12], T, "--control-floor lifts to --touch-target under coarse pointer, and every scaled control height is max(scaled, floor) (sizing.css:26-29)"),
 ("src/styles/tokens/on-glass-fg.css", [16], T, "state (a): a declared-bright backdrop lifts to the full ink through the @container bright bucket and the overlay band (ladder.css)"),
 # ── property-regs (13) ──────────────────────────────────────────────────────────────────────────
 ("src/styles/tokens/property-regs.css", [114, 115], T, "--glass-accent is a registered <color> that tints a surface's rim (the --glass-material-rim inset and the per-rung border) in OKLab, and the ::before catch-light core"),
 ("src/styles/tokens/property-regs.css", [123, 124], T, "the accent decorates rim and glint and never the plate background; the three axes are LEVEL (opacity + blur, --glass-level), TINT (the whole-plate legibility veil, --glass-veil-ink) and ACCENT. 'TINT' is the label Crit8 §5.2 kept"),
 ("src/styles/tokens/property-regs.css", [131], T, "registered with initial value transparent / 0%, so a malformed override computes to the initial value"),
 ("src/styles/tokens/property-regs.css", [154], T, "R-23 as built: under prefers-contrast: more the a11y bracket sets --glass-level: 0.3 and --glass-definition: 1 (a11y-fallback.css:37-47, HEAD's file, untouched by the minor) and writes no veil token"),
 ("src/styles/tokens/property-regs.css", [162, 163], T, "useGlassBackdropLuminance writes --glass-backdrop-luma (0..1) on its target (:248); the one clamp that reads it is in glass-plate (veil.css:74-77), composed at the element"),
 ("src/styles/tokens/property-regs.css", [168], T, "the ramp lifts the rung by up to two steps past the knee, ceiling included (veil.css:70-85); registered so a bare var() interpolates between samples"),
 ("src/styles/tokens/property-regs.css", [170], T, "initial-value 0 (:172-176): with the knee at 0.6, max(0, (0 − 0.6)/0.4) = 0, so an unwired surface paints its tier exactly"),
 ("src/styles/tokens/property-regs.css", [203], T, "--ui-scale is a registered <number>, so a malformed override computes to its initial value 1 and calc() stays valid"),
 ("src/styles/tokens/property-regs.css", [215], T, "a driver ancestor sets --motion-weight: 1 and an observer subtree pins 0; descendants read the inherited value"),
 ("src/styles/tokens/property-regs.css", [237], T, "--motion-tempo is registered with initial-value 1, so a malformed override computes to 1; motionTempo() maps ≤ 0 to 1 in JS"),
 # ── scale-paper, shadow ─────────────────────────────────────────────────────────────────────────
 ("src/styles/tokens/scale-paper.css", [69, 70, 73], T, "one geometry (--focus-ring-width) and one tint knob, --invalid-ring-tint 35% (:75), resolving --destructive; a consumer retints every invalid ring with one :root override"),
 ("src/styles/tokens/scale-paper.css", [82], T, "Checkbox, Switch and RadioGroupItem read the selection-control register, so a re-tint is one edit"),
 ("src/styles/tokens/scale-paper.css", [101], T, "--control-checked-bg is minted once (--primary 88% over light-dark(transparent, the dark plate)); in light the 12% it leaves transmits whatever glass the control sits on, so 'glass-tinted' holds as the fill's read over glass (FV9 §4.4 reads the floor's same line the same way; for the critic)"),
 ("src/styles/tokens/scale-paper.css", [138], T, "the grid line ink is color-mix(… var(--foreground) N%, …), so it re-tints with the theme: warm ink on light, lifting off near-black on dark"),
 ("src/styles/tokens/scale-paper.css", [153, 159], T, ".paper-grid is the card interior's ground, felt through the plate; its ink is a --foreground mix that re-tints in lockstep"),
 ("src/styles/tokens/scale-paper.css", [217], T, "silver's chroma ≤ 0.016 at a cool hue reads as metal, not a tinted cast, distinct from the warm-cream plate"),
 ("src/styles/tokens/scale-paper.css", [249], T, "bronze's chroma 0.072-0.112 reads as a metal, not a brown cast (--bronze oklch(0.620 0.092 54.0), :252)"),
 ("src/styles/tokens/shadow.css", [50, 51, 53, 54], T, "the cartoon ink pin: clamp(0.28, l, 0.34) lifts the near-black light --foreground L into the brown band and clamp(0.030, c, 0.050) keeps chroma in gamut; the retired max(c, 0.11) floor at clamp(0.14, l, 0.18) is out of gamut at L 0.18, so the browser clamps each channel to rgb(49,0,0). CSS clamp() functions, not the veil"),
 ("src/styles/tokens/shadow.css", [96, 103], T, "the gel bead's ambient contact shadow mixes --blob-color toward --shadow-color at a low strength: a soft, small-offset, ambient-tinted shade that re-resolves with --foreground"),
 ("src/styles/tokens/shadow.css", [127], T, "the contact rung is a tight, darker band hugging the dome base (contact-darkening AO)"),
 ("src/styles/tokens/shadow.css", [143], T, "on hover the ambient cast deepens and the contact band tightens toward the base"),
 # ── sizing (13) ─────────────────────────────────────────────────────────────────────────────────
 ("src/styles/tokens/sizing.css", [22], T, "--control-floor is 0px at desktop (:25) and lifts to --touch-target under coarse pointer; every --control-h-* is a max() against it"),
 ("src/styles/tokens/sizing.css", [32, 33], T, "--control-text = --type-small × --ui-scale (:35): the fluid clamp lives once in --type-small and the comfort scalar multiplies it once"),
 ("src/styles/tokens/sizing.css", [40], T, "--control-label = --control-text × 0.886653 (:42), a ratio that rides the clamp and the comfort factor once"),
 ("src/styles/tokens/sizing.css", [153], T, "the dock floor is max(…, --dock-control-floor) (density.css:7), 0.78 × 1.5 ≈ 1.17"),
 ("src/styles/tokens/sizing.css", [214, 216], T, "--dock-layer-switcher-bg is transparent (:218) and --dock-hairline is the only switcher edge; hover is accent 30% over transparent and active --dock-control-active-bg, both translucent fills that bake no brand hue"),
 ("src/styles/tokens/sizing.css", [220, 221], T, "--dock-hairline: var(--surface-tint-15) (:223), the ladder dark-arm.css re-resolves warm by derivation"),
 ("src/styles/tokens/sizing.css", [235], T, "--dock-active-bg is --dock-control-active-bg (:237): light the foreground ink at --fill-selected 0.12, a rung above hover's 0.05; dark --glass-plate-floating, a step above hover's resting plate; translucent either way, never an opaque plate"),
 ("src/styles/tokens/sizing.css", [327], T, "type keeps its own clamp and no type rung appears in the block"),
 ("src/styles/utilities/base.css", [298], T, "under reduced motion the press transform retires and the press is acknowledged by the consumer's own hover/active bg-tint cascade, as the rule below the comment does"),
 # ── tests ──────────────────────────────────────────────────────────────────────────────────────
 ("tests/components/button/Button.test.ts", [146], T, "R-23 as built: every write composes over --glass-veil (the assertions at :148-149), whose inputs are the tier, the earned-ink clamp the minor keeps and --glass-level (veil.css:69-92)"),
 ("tests/components/button/Button.test.ts", [382], T, "the describe title of the tone suite: tone mixes over the plate (button/styles.css:143-146) and never replaces it"),
 ("tests/components/field/forms-seam.test.ts", [155], T, "the field's font-size is var(--type-small) (the assertion at :156), the bounded clamp, never × --ui-scale"),
 ("tests/components/ui/surface/Surface.test.ts", [162, 164], T, "history in the past tense (RED at the first cut's bytes): the LERP from the 20px floating radius toward a 16px endpoint against plain 10/14/16/20/22. R-23's history site under the tuple's name (deletes-minor.json)"),
 ("tests/gates/feedback-tint-seam.test.ts", [1], T, "the file binds the standing G-FEEDBACK-TINT-SEAM seat"),
 ("tests/gates/feedback-tint-seam.test.ts", [7], T, "the gate's invariant: a tone register tints the surface's own plate (arm (a) checks the mix base is --glass-veil)"),
 ("tests/gates/feedback-tint-seam.test.ts", [11], T, "R-23 as built: a mix over a raw plate token discards the rung's tier ink, earned-ink clamp and --glass-level, all inputs of --glass-veil (veil.css:69-92)"),
 ("tests/gates/feedback-tint-seam.test.ts", [19, 21], T, "veil.css's header names a tone-tinted feedback panel and the capsule's warm floor as --glass-veil's intended consumers (veil.css:49-51; no line number claimed); mixing over --glass-veil keeps the rung inside the tint"),
 ("tests/gates/feedback-tint-seam.test.ts", [121], T, "the describe title: the tone register tints its own rung"),
 ("tests/styles/contrast-computed.test.ts", [260], T, "color-mix interpolates premultiplied, so a mix toward transparent only thins (the helper's alpha arithmetic at :261)"),
 ("tests/styles/contrast-computed.test.ts", [414], T, "the test title: --surface-tint-35 stays deleted (the assertions at :415-417)"),
 ("tests/styles/contrast-computed.test.ts", [947], T, "the section-ramp rungs owe the text floor on --card and are measured from the tokens, not sampled"),
 ("tests/styles/contrast-computed.test.ts", [984, 988], T, "the tinted eyebrow (.section-label--tinted) reads the ramp through a knob defaulting to a rung, read off the register (:989-991)"),
 ("tests/styles/glass-subtlety.test.ts", [99], T, "the helper resolves var() and evaluates calc/pow/min/max/clamp in JS because happy-dom runs no cascade"),
 ("tests/styles/glass-subtlety.test.ts", [192, 193], T, "light --glass-veil-ink is var(--card) (asserted at :195), the theme's own ground at α, so it never mixes toward a near-black ink over paper; dark keeps the near-black ink, so the rung darkens what is behind it (asserted below)"),
 ("tests/styles/glass-subtlety.test.ts", [326], T, "history: the immersive scrim's blur pulled bright neighbours into every sampled pixel, so the backdrop brightened"),
 ("tests/styles/glass-subtlety.test.ts", [695, 696, 697], T, "the held rung sheds toward 0.6 × the clamped rest, never the raw tier, and never below the floor (grasp.css:139; veil.css:70-86); a held plate over a bright backdrop would otherwise land below its own band"),
 ("tests/styles/proportion-register.test.ts", [143], T, "a ratio survives the type clamp and --ui-scale; a px literal would drift"),
 ("tests/styles/proportion-register.test.ts", [287, 288], T, "history: the ⊕¹⁶(3) deletion of the dead ambient channel, including the observer's writes of it, was executed; the test asserts no --glass-ambient residue (:289)"),
]

# FALSE: read false, and the minor wrote the line or made the clause false. No ruling: prose-sweep prints them unread.
FALSE = {
 "src/styles/glass/ladder.css:297": "the sentence it opens (:297-301) says 'Over a calm LIGHT page the content tiers paint the cream pole at the bound': the content tiers paint wash at the bound, quiet at bound + 1 step and resting at bound + 2 steps (tokens/glass.css:51-55), so two of the three sit above it. The patch wrote :298 and :299",
 "src/styles/glass/ladder.css:299": "the same sentence as :297",
 "src/styles/tokens/sizing.css:258": "'so a press lands a brief darken rather than scaling alone': the DARK arm is the resting plate stepped 7% toward --foreground (:260-265), a lighter ink: computed over the dark dock plate it lifts OKLab L 0.149 → 0.213, and over the dark --card 0.295 → 0.319 (MS8-press-dark.py, MS8-records/press-dark.log). HEAD carried the same dark value with 'Auto-flips with --foreground'; the patch rewrote :258-261 and dropped that qualifier",
 "src/styles/tokens/sizing.css:259": "the same sentence as :258",
}

# The proposed rewrite (MS8-r26-proposed.diff): ladder.css:298 reads 'at or above the bound'; sizing.css:258-259 name a
# press FILL. The two sizing lines then print no frozen word and leave the list; ladder.css:297/:299 print and are ruled.
PROPOSED = {
 "src/styles/glass/ladder.css:297": "MS8-r26-proposed.diff: the sentence (:297-301) now says the content tiers paint the cream pole 'at or above the bound' (tokens/glass.css:51-55: wash at the bound, quiet and resting above), so flipping to the contrast ink is right only where the bucket engages; the first sentence (:296-297) holds: the content-tier flip lives in the @container bucket",
 "src/styles/glass/ladder.css:299": "MS8-r26-proposed.diff: as :297; the flip to the contrast-color dark ink is correct only where the bucket engages, and an unconditional flip would force it onto the calm card",
}

def main():
    log, out_path = sys.argv[1], sys.argv[2]
    proposed = "--proposed" in sys.argv[3:]
    printed = []
    cur = None
    for line in open(log, encoding="utf-8"):
        m = re.match(r"^· (\S+):(\d+) ", line)
        if m:
            cur = f"{m.group(1)}:{m.group(2)}"
            continue
        m = re.match(r"^\s+>\s+(\d+) \| (.*)$", line)
        if m and cur:
            printed.append((cur, m.group(2).strip()))
            cur = None
    rules = {}
    for f, lines, verdict, why in RULES:
        for n in lines:
            at = f"{f}:{n}"
            if at in rules: sys.exit(f"ruled twice: {at}")
            rules[at] = (verdict, why)
    out, unread, seen, missing = [], [], set(), []
    for at, says in printed:
        seen.add(at)
        if proposed and at in PROPOSED:
            out.append({"at": at, "says": says, "verdict": T, "why": PROPOSED[at]})
        elif at in FALSE:
            unread.append(at)
        elif at in rules:
            v, why = rules[at]
            out.append({"at": at, "says": says, "verdict": v, "why": why})
        else:
            missing.append(at)
    if missing: sys.exit(f"printed but neither ruled nor read false: {missing}")
    unused = [a for a in rules if a not in seen]
    missing_false = [a for a in FALSE if a not in seen and not proposed]
    if unused: sys.exit(f"ruled but not printed: {unused}")
    if missing_false: sys.exit(f"FALSE but not printed: {missing_false}")
    json.dump(out, open(out_path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    t = sum(1 for x in out if x["verdict"] == T); r = sum(1 for x in out if x["verdict"] == R)
    print(f"{out_path}: {len(printed)} printed, {len(out)} ruled ({t} true, {r} reported), {len(unread)} read false and left unruled: {', '.join(unread) or 'none'}; distinct whys {len(set(x['why'] for x in out))}")

main()
