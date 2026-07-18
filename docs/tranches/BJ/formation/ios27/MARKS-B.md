# iOS-27 liquid-glass frame marks — group B (codex:ios27-B)

- verified-model: claude-fable-5
- union provenance: REFABLE RU-15, 2026-07-18 — the prior opus-begat marks (claude-opus-4-8 via the settings-level subagent override) re-proven claim-by-claim against the fresh Fable timelines in `refable-timelines/`; fresh-timeline evidence authoritative on every conflict; opus claims kept only where RATIFIED. Verdict ledger: `../refable/REFABLE-RU-15.md`.

Group-B corpus: the June 22-24 + July 10 recordings + late stills. Feeds BJ registry family F (material/token canon — radius · blur · type · the gradient-backdrop-blur experiment) and family G (greenfields — blob, dock, feedback-motion). Frame-precise ledgers live in the per-video timelines cited per section; this file is the synthesis canon.

## Corpus manifest

| Tag | Source | Fresh timeline | Subject |
|-----|--------|----------------|---------|
| V1 | ScreenRecording_06-22 23-59-33 (12.20s) | `refable-timelines/sr-0622-2359.md` | Control Center pull/overpull/release + Maps launch, sheet, close zoom |
| V2 | ScreenRecording_06-24 21-44-31 (22.79s) | `refable-timelines/sr-0624-2144.md` | YouTube + Siri orb / results panel / answer pill + banners + CC flick |
| V3 | ScreenRecording_06-24 22-07-29 (12.49s) | `refable-timelines/sr-0624-2207.md` | Home + Spotlight pull + banners + CC condensation |
| V4 | ScreenRecording_07-10 16-26-07 (12.96s) | `refable-timelines/sr-0710-1626.md` | Maps → home → Find My — the tab lens, commit desync, app zooms |

---

## V1 — Control Center · Maps (timeline: sr-0622-2359.md)

### CC pull, magnetic overpull, release [NEW]
A slow pull tracks 1:1 to arbitrary overpull (+374px past rest), position-LOCKED at hold — zero drift, no force decay. Two-layer parallax: header rows 1.00x finger, deep grid ~1.04x — a translation differential, not a stretch. Release: ~60ms latency, ~250ms spring, a single ~9% overshoot, no second bounce (ζ≈0.75-0.85, stiffness ~200-260 / damping ~24-30 in CSS-spring terms). A fast flick instead yields shallower displacement (+168px) and an essentially critically damped return — the spring eats overshoot when incoming velocity already points home.

### Material event at displacement [RATIFIED]
Toggle circles develop per-icon accent rim light while the sheet is displaced or settling (Shazam blue, hearing green, flashlight red), decaying at rest — the rim responds to motion/displacement, one of the two signatures glass-ui kept missing.

### Open/dismiss asymmetry [NEW]
Open: backdrop blur + dim LEAD (~80% in the first 80ms) → element opacity (ghosts → cards → fills) → tint/saturation resolves at settle → position settles LAST (elements arrive displaced low and settle UP, carried by gesture energy). Dismiss is NOT the reverse: text dies first, the card fade dominates (~230ms), the grid drifts up only ~70px, and the wallpaper blur release LAGS a beat (~330ms) — the saturated app icons flare through the thinning glass (icon-color bloom, the dismissal signature). Two distinct choreographies; a mirrored entry reads wrong immediately.

### Maps launch zoom + population [NEW + CORRECTED]
Launch: the canvas inflates from the icon slot (~330-400ms), rect-interpolating icon→screen while re-centering in flight; giant icon artwork crossfades to the app canvas at ~40% expansion; blur leads. Population staggers chrome → body → live data at ~250ms intervals; the Work chip live-swaps "6.7 mi"→"14 min" in place with no reflow. The grey map at first paint is UNLOADED TILES mid-population, not a search-focus scrim — the prior "greyed/scrimmed search state" read was tile starvation.
Close: floating glass chrome drops one frame BEFORE the canvas morph (chrome-drops-then-morph, worth reproducing deliberately); the canvas shrinks into the icon with the artwork crossfaded at LARGE scale; the landing icon overshoots ~1.4x → 1.0 while home de-blurs around it. There is NO App Switcher anywhere in this recording — the prior "App Switcher" mark is the close zoom mid-flight.

### Sheet detents, tracked vs ballistic [RATIFIED + sharpened]
Three detents (FULL ~92% / MID ~43% / COLLAPSED). Tracked drags are linear masked translation with sheet-anchored companions riding the edge; flicks go ballistic (peaks to ~15,000px/s native), SKIP intermediate detents — detent selection is velocity-projected, not nearest-position — overshoot ~30px, settle ~150ms. Scrim + sheet-material darkness are bound to position, not time.

### Glass material per surface [RATIFIED]
CC charcoal smoke glass ~60-70% black with late saturation on entry; knob-less fill-pill sliders; two toggle material states (flat smoke at rest, accent-rim-lit under displacement); Maps sheet translucent grey-green at mid / near-opaque charcoal at full with a separate scrim on the residual map strip; the home dock is NOT exempt from the backdrop treatment under CC.

---

## V2 — YouTube · Siri surfaces (timeline: sr-0624-2144.md)

### The Siri orb [CORRECTED — material]
The orb is smoky near-BLACK GLASS, not chrome/liquid-metal: ~70% black fill, LOW backdrop blur (content ghosts through), strong rim REFRACTION (icons double and bend at the rim), one dominant horizontal aurora specular streak (warm orange-pink shading to cyan) at ~55% height, plus thin white rim highlights. The METAL FLOW / images-2 stills remain a texture direction for glass-ui's blob — they are NOT what iOS ships; the material target is decoupled from the Siri evidence.
Formation: the island's LIGHT changes before its shape (~80ms red-halo lead); the shape grows anchored at the island (~300-350ms); rim highlights then the aurora streak arrive in the final third. Formation tempo is not constant (a second formation took ~600ms under no visible load).

### Results-panel expansion: the desync record [NEW]
Geometry first (~300ms — an EMPTY near-opaque slab stretches down, its corner acting as a thick lens), content second (fade + blur 12→0 over ~250ms, landing after geometry), aurora rim LAST (trails ~0.5s, then hue-cycles indefinitely). The empty-slab-then-content order is what reads as glass rather than a div resizing.

### Panel dismissal: rim-crush + flare-on-motion [NEW]
Phase 1 (~380ms): the bottom rim sweeps up with the top pinned; content is CRUSHED at the rim (compressed, sheared, mirror-smeared) and the aurora flares to its clip-wide maximum during the sweep — glow intensity keyed to edge velocity. Phase 2 (~370ms): the remaining slab blurs, dims, and shrinks concentrically toward the island. Status bar restores last, at partial alpha first.

### The rim caustic [RATIFIED + sharpened]
Concentrates on the lower rim + corners; hue cycles over seconds on live surfaces; intensity keyed to edge motion (entry, dismissal sweep); the "Search Google" pill takes the same underlight.

### Notification banners: seed in, corner-tuck out [CORRECTED]
Banners do NOT slide in from the edge: they grow from a ~30% blurred seed anchored upper-left (~350-550ms; scale + progressive sharpen, icon colorizes LAST). Exit: slide-up clipped at the screen edge, then re-emergence as a shrinking miniature of the full layout pinned to the top-left corner, fading (~400-660ms total) — the banner files itself away. While a banner crosses a Siri surface it plainly occludes it: hard z-overlap, NO meniscus between independent glass bodies. iOS does not blend passing bodies — glass-ui's goo-morph deliberately exceeds this.

### Orb → answer pill: the staged-axis morph [NEW — the dock-to-card grammar]
Squash first (the vertical crush completes early), THEN widen, then text opacity → text sharpness → aurora rim. ~500ms shape + ~200ms text; NO width overshoot — critically damped, the bounce energy expressed by the thinking-sparkle bloom instead (the dot-ring nucleus survives every surface transition and peaks when shape motion pauses). Growth via staged axes, not uniform scale — the highest-value recreation for the dock/card program.

### CC flick [RATIFIED + sharpened]
Backdrop blur + dim slam in ≤100ms, a full beat ahead of everything; modules fade/sharpen with a top-down stagger (~150ms); the grid arrives a few px LOW and settles upward over a ~250ms tail.

### Non-modal float [NEW]
With the Siri panel covering the top ~60%, taps navigate the app UNDERNEATH; the panel is unaffected — the surface floats over a live app. The status bar yields to Siri surfaces and fades back at partial alpha before full restore.

### Material contrast table [RATIFIED, orb row corrected]
Five coexisting recipes: orb = smoky glass + strong refraction + aurora streak; results panel = near-opaque body, refraction at corners/rims only, aurora band; banners = mid-grey frost, minimal refraction, no aurora; answer pill = lighter dark glass + green-white fresnel + aurora; CC = global backdrop blur/dim with inert frosted modules. Interactive Siri bodies get refraction + aurora; passive notices get flat frost. The CONTRAST between recipes matters more than any single one.

---

## V3 — Home · Spotlight (timeline: sr-0624-2207.md)

### Banner materialize / evaporate [CORRECTED]
Entry: whole-banner scale 0.42→1.0 from a top-left anchor with blur 12→0 and opacity concurrent (~350ms) — content scales as one unit, no reflow, no overshoot, asymptotic settle. NOT a slide-down. Rest is timed: both instances self-collapse after ~440-490ms. Exit: full-width slide-up ~160ms (under the island), then a shrink-to-chip ghost at top-left fading ~350ms — the lingering chip is what makes it feel physical. Banner material is adaptive: it renders LIGHTER over dark backdrops (adaptive tint, not fixed alpha).

### Spotlight: the tracked/pop split [CORRECTED + NEW]
The slab GROWS OUT of the Dynamic Island, gesture-tracked the whole way — not a preformed pill descending; the island bleeds a dark halo first. One progress scalar scrubs slab growth + springboard push-down + dim + blur; field text trails geometry by ~300ms; the bottom specular rim is brightest mid-pull (velocity-keyed lensing). On release, a fixed ~200-250ms pop regardless of pull speed: caret first (leads ~80ms), suggested panel (fade + scale 0.95→1 in place over its birth position), keyboard LAST (glass keys with wallpaper bleeding per-key during the rise).
Blur is two-DEPTH by content layer — wallpaper mushes fully while icons stay legible longer. The prior "scrim graded darkest near the pill, easing toward the bottom" spatial-gradient read is not supported; the attested directional-gradient reference is the IMG_2287/2288 still (below).
Dismissal is a fire-and-forget ~250-300ms collapse — never the reverse scrub: slab + text first, panel fades toward its birth position (opacity + scale 0.92 + slight up-translate), dim/blur/push concurrent, keyboard strictly last-out.

### CC condensation [RATIFIED + sharpened]
Every tile is born a high-luminance frosted ghost (bright, low contrast, home content visible through it) and condenses to final material over ~150ms with a top-down stagger; the two big cards lead by ~80ms; home stays discernible under the ghosts through the first ~100ms; ±10px positional settle. Materials at rest: dark glass cards, three circle finishes (opaque white / frosted grey / colored-ring accent), frosted fill-pill sliders.

### Micro-affordances + budgeted jank [NEW]
Search pill ↔ page-dot morph in place (a goo-morph candidate); island z-supremacy (banners slide under; the island's black stays topmost above every surface); ~10-15px springboard rebound at pull release; crossfade-overlap residue (clock lingering, status-line doubling, widget double-exposure, ~100-200ms each) — budget as acceptable overlap, don't replicate as targets.

---

## V4 — Find My (timeline: sr-0710-1626.md)

### The tab-bar lens [CORRECTED + sharpened]
The drag state is a distinct LENS object, not a styled selected pill — and selection commits on RELEASE only; the sheet never changes while the finger is down. Birth ≤83ms at the TOUCHED tab (not the selected one); the old selection highlight vanishes the same frame (one-highlight rule — the pill's identity transfers into the lens). The lens is brighter than the bar, protrudes ~6-10px past the bar rim (load-bearing — clipping it to the bar kills the effect), magnifies content ~1.06-1.12x, refracts at its rim (letterforms bend/double), and samples the backdrop for tint (mint over the teal sheet, ice-blue over lavender — never painted a theme color). Velocity elongates it to ~1.9 slots; width, not lag, is the velocity display (finger-locked, zero detectable lag). The prior "selected pill liquid-slides between positions" read conflated scrubbing with selection — those frames were scrubs over an unchanged sheet.

### Endcap overpull [RATIFIED + quantified]
The lens presses into the bar's rounded end, compresses ~8-12% narrower with its content shifting inward (parallax against the drag) and glow bleeding past the rim; the bar stays rigid — the lens is the soft body. Compression relaxes on the first frame of reversal; no bounce needed while the finger leads.

### Commit choreography [NEW]
Four independent channels in a fixed lead order: sheet crossfade ≤85ms on release (in place — the sheet frame never slides) → map annotations fade/scale ~200-250ms → camera spring ~350-420ms and CONDITIONAL (no motion if already framed) → row data whenever-ready (skeletons, then in-place upgrades: "Directions"→"5 min"). Never gate the sheet on the camera. The tile-starvation trough mid-zoom is iOS jank — don't copy.

### App zooms [CORRECTED]
Home gesture: the card consumes flick velocity (95%→24% width inside one 83ms frame), lands ON the app's own icon with a landing overshoot, and the home blur clears ~250ms AFTER the landing. Launch: ~250ms icon→full-bleed with LIVE content inside the moving card from frame one (no splash, no placeholder); blur leads. Asymmetric blur: leads open, trails close. No App Switcher appears in this recording — the prior read was the launch/close zoom pair.

### Adaptive tint [RATIFIED, evidence corrected]
The sheet is a tint chameleon with no fixed color — deep teal over the Me/Devices map, blue-lavender on People, slate-blue on Items; the tab bar samples the sheet's own tint (glass-on-glass-on-map, three stacked samples, no banding). The green Share-My-Location toggle blooms an aura OUTWARD into the surrounding glass rows — saturated accents inside the glass leak out, "lit from within." (The prior "warm bloom exactly under Emily's avatar" money-frame was not re-proven; positional sampling is instead proven by the group-A mini-player's per-region tint and the lens's backdrop sampling.)

---

## Stills (timeline: stills.md)

- **IMG_2287 / IMG_2288** [CORRECTED provenance] — the ChatGPT iOS reasoning-effort popup (matching the ledger names "openai-popup-subtle-blur"/"gradient-blur-behind"), NOT keyframes.js screenshots, and NOT byte-identical (md5 77e06a3b… vs acc00b42…; 1,010,060 vs 1,016,229 bytes; two slider states). The control grammar stands RATIFIED as the F49/F50 model: dark stadium track; a solid white pill that GROWS to absorb the next position (~153pt→~207pt, one dot pitch) while the remaining steps render as dots. The blur behavior is the corpus's attested directional-gradient reference: blur ramps 0→~20pt radius over ~70pt of travel toward the control, with a feathered luminance backplate — no hard-edged scrim. Build as stacked masked backdrop-filter layers.
- **Screenshot 06-23 12.36.16 combobox** [CORRECTED] — the popover is FLAT OPAQUE grey: no translucency, no tint pickup, a native-style control sitting inside a glass-idiom demo. Not a light-frost reference — a re-materialization target. Keep the calm anatomy (search field on top, checkmark rows, no per-row chrome); rebuild as glass; verify the reka-ui bindings on version bumps (stale props no-op silently).
- **images-2.jpeg + METAL FLOW** [RATIFIED as texture references, decoupled] — anisotropic flow-aligned specular ridges over a single-hue base; luminance, not hue, does the work; micro-sparkle + one broad gradient, no mid-frequency noise. A direction for glass-ui's blob material — no longer claimed as "the material of the Siri blob" (the shipped orb is smoky refractive glass).

---

## Cross-corpus synthesis — the idiom registry (corrected)

1. **Radius grammar** (family F) [RATIFIED] — the role-keyed table stands: sheet/card/module = continuous-corner rounded-rect ~R28-40; field / mode selector / inline action = stadium pill; control/toggle/avatar = circle; slider = tall capsule with bottom-anchored fill; app-icon/thumbnail = rounded-square (~22%). A card CONTAINS circles/pills, never the inverse; nesting stays concentric (inner R = outer R − padding). Gate it — this kills the ledger's radius chaos (F12/F15/F17/F45/F48) with a table, not spot-fixes.
2. **Gradient / progressive blur** (family F headline) [CORRECTED] — the attested forms are: (a) the IMG_2287/2288 directional ramp + glow pool; (b) per-content-layer blur depths (Spotlight: wallpaper vs icons); (c) detent-graded DARKENING with constant blur (Maps, twice). A spatially graded scrim inside one iOS surface is NOT attested — the `--glass-halo-*` gradient-blur experiment is a BEST-iOS divergence, judged against the still, not a copy claim. The subtler-element-blur retune (the F28/F48 heavy-uniform-blur defect) stands.
3. **Adaptive content tint** (family F) [RATIFIED] — backdrop-sampled hue per element and per REGION (the mini-player's two halves differ; the lens re-tints per sheet), plus accent bloom leaking OUTWARD from saturated in-glass content. This is what separates glass from a grey card.
4. **Edge caustic** (family F) [RATIFIED + sharpened] — lower-rim + corner concentration, hue cycling on live surfaces, and intensity keyed to EDGE VELOCITY (entry rim brightest mid-pull; dismissal flare) — a material property, not a bolted-on ring (the tasteful version of the V-A95/aurora rim work; not F04/F05).
5. **The blob** (family G) [CORRECTED] — pill ↔ orb ↔ pill via STAGED AXES (squash → widen → content), damped, with a persistent sparkle nucleus carrying the energy; light leads shape on formation, streak arrives after. Material: iOS ships smoky refractive glass with an aurora streak; liquid-metal shading (from the texture stills) is glass-ui's deliberate divergence, by choice not by copy.
6. **Dock / tab bar** (family G) [CORRECTED] — glass tray + press-born LENS (protrusion past the rim, magnification + rim refraction, backdrop tint sampling, velocity elongation, endcap squash with content inward-parallax) + commit-on-release; plus group A's lens travel-on-tap with transit tint-bleed, and the slab ↔ corner-trio collapse state machine. Overflow: cluster chips ("+3") and edge behavior, never mid-glyph clips (F47); no interior scroll (F27).
7. **Sheets + floats** [RATIFIED + corrected] — grabber appears at first touch; per-detent damping (edges ζ≈1, interior ζ<1); velocity-projected detent selection (flicks skip detents); position-mapped material (scrub-reversible, blur constant); content as rigid mask reveal; companions RIDE the sheet with a ceiling clamp and predictive fades — no z-handoff. Overlays either grow from a seed (banners) or morph out of the island (Siri); nothing slides in from an edge.
8. **Motion character** (family G) [CORRECTED] — entries are staggered and material-reactive (rim glow while translating, ghost condensation, squash); exits are FADE-LED, faster, and never mirror the entry (CC dismiss = fade + icon-color bloom + lagging blur; Spotlight close = fire-and-forget). "Never a plain fade" was too strong — the law is per-channel desync with a fixed lead order plus entry/exit ASYMMETRY. This is the discipline the feedback family (F20/F21/F22/F24) is held to.
9. **Segmented capsule progress** (family G; the F21/F22 model) [RATIFIED] — stadium track + a solid pill that grows and swallows the next dot. Instantly legible, weighty; a better model than partial-arc jitter.
10. **Typography & hierarchy** (family F, the F15 audit) [RATIFIED] — hero (bold ~28-34) ≫ row title (~17 semibold) ≫ secondary (~15 grey) ≫ caption (~11-13); ONE accent color; bold+chevron section headers; no mono ALL-CAPS jargon captions anywhere in iOS (the opposite of the family-D meta-caption idiom). Light surfaces are first-class peers to dark (the Writing Tools frost) — the 06-23 combobox is a re-materialization target, not the light-glass exemplar.
11. **Aristotelian proportion** [RATIFIED] — CC gutters ≈ circle radius, even inset; slider capsule ≈ 3.5:1 with the glyph at the fill's bottom-center; sheet rows: ~44px leading circle, hairline dividers, ~16-20px padding; concentric nesting keeps corners parallel; 44-64px circle classes with full-saturation fills popping against the muted sheet.

---

## What "BEST iOS 27" means for glass-ui (corrected)

1. **Codify + gate the radius table** (§1) — iOS is consistent by convention; glass-ui can be provably consistent.
2. **Ship gradient blur + adaptive tint together** (§2+§3), honestly framed: the in-surface gradient scrim EXCEEDS what iOS ships — judge against IMG_2287/2288 and the per-layer depths, not a copy claim.
3. **Rim caustic as a material property** (§4) with velocity-keyed intensity and an opt-in iridescent sweep — subtle by default, animated on interaction.
4. **Blob = staged-axis morph engine** (§5): squash → widen → content, damped, with a sparkle/energy nucleus; the material choice (smoky refractive glass vs liquid metal) is ours to make, and divergence is declared.
5. **Dock = tray + lens + collapse machine** (§6) — protrusion, magnification, tint sampling, elongation, endcap squash, commit-on-release, displacement-gated collapse; fixes F47/F27/F04/F05 in one gesture.
6. **A choreography API, not ad-hoc transitions** (§7+§8) — named channels with fixed lead order, tracked/scrubbed leaders + fixed-duration release pops, fire-and-forget closes, predictive companion fades, position-mapped materials.
