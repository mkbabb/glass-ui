# iOS-27 Liquid-Glass Reference — MARKS (Group A)

Fable design-analysis seat. Detailed frame-by-frame read of the group-A corpus (June 20-22 recordings + early stills). Purpose: a codex glass-ui can design *against* — to BEST iOS 27, not copy it. Frame refs are `video/f-00NN`; stills by filename.

All phone frames are 1206x2622 (iPhone 16 Pro-class, 3x). Every frame carries a screen-record red dot + Dynamic Island, so ignore that chrome.

---

## Corpus manifest

| Tag | Source | Frames | Subject |
|-----|--------|--------|---------|
| **V1** | ScreenRecording_06-20 18-47-21 | 38 | Apple Music — Library/Albums, mini-player, popover, Now-Playing modal expansion, album push/pop, Control Center |
| **V2** | ScreenRecording_06-20 18-48-52 | 12 | Apple Music — "Playlists Made for You" carousel + adaptive-tint mini-player |
| **V3** | ScreenRecording_06-21 01-28-54 | 10 | Apple Maps — bottom-sheet detent drag + floating glass map controls |
| **V4** | Screen_Recording_06-22 14.38.42 | 14 | Cowork desktop web — compose screen + breathing dot-field bg (contrast/restraint reference, NOT glass) |
| Stills | Downloads/New Folder 4 | 17 | Proofread AI sheet, r/iOSBeta glass-tweak commentary, Maps sheet, Live-Activity/Dynamic-Island macros incl. goo-morph, house dataviz stories, glass-ui's own dock liquid-morph storybook, axis-capsule sketch |

IMG_1880.HEIC: readable after `sips` HEIC→PNG — a hand sketch, logged below.

---

## V1 — Apple Music (38 frames)

### Frame-by-frame

- **f-0001–0012 (Library / Albums list, scrolling)** — Dark app. Top: large-title "Library" then a filter/sort area. Bottom third owns the two persistent floating glass objects: a **tab bar** (Home · New · Radio · Library · Search) rendered as ONE translucent rounded-rect glass slab with 5 icon+label cells, and directly above it a **mini-player pill** (album thumb + scrolling title + play/skip). Both float clear of the content with a gap beneath — they are *not* docked to the screen edge. Content scrolls *under* them; the glass samples and blurs whatever album art passes behind, so the bar's tint drifts frame to frame. Rounded album-grid cards, ~2-up.
- **f-0013–0014 (popover)** — A popover balloon ("Turn Ideas Into Playlists"-class prompt) with a small **triangular tail** anchored up to its source pill in the toolbar. Popover body is light frosted glass with rounded corners (~24px), casting a soft ambient shadow onto the darkened content. Behind it the list is dimmed — a scrim, not a full blackout. This is the anchored-popover idiom: rounded card + directional tail + backdrop dim.
- **f-0015–0021 (transition run)** — Content re-flows; the mini-player begins to lift. Consecutive frames show the pill's corner radius and height changing smoothly — the mini-player is a spring-animated capsule, not a hard swap.
- **f-0022 (Now-Playing modal expansion, mid-flight)** — THE keystone frame. The mini-player is expanding into the full Now-Playing sheet. Mid-transition: album art has scaled up and floats with a **cyan/blue rim glow** (color pulled from the art) around its rounded-square; the Library behind is **progressively blurred and darkened** — top toolbar strip stays comparatively sharp while the album grid below melts into blur. Transport controls (skip/play/skip) are present but **semi-transparent**, fading up as the sheet settles. The sheet's top corners are rounded and the whole thing rises from the pill's location, not from screen bottom — origin-anchored expansion.
- **f-0023–0026 (Now-Playing settling / reverse)** — Controls reach full opacity; art seats; rim glow calms. Reads as an overshoot-then-settle spring.
- **f-0027 (Album detail — "Adam: Giselle")** — Pushed detail page. Toolbar: circular glass **back** button (chevron) top-left; top-right a **multi-icon glass pill** grouping treble-clef + more into one capsule. Below the header: the **control grammar** — a filled **white "Play" pill** (primary) as the wide hero action, flanked by a circular **shuffle** button (left) and circular **download** button (right), both translucent-glass circles. Title bold ~28px, artist ~22px lighter, metadata row grey + lossless glyph. Primary = filled pill; secondary = glass circle. Memorize this.
- **f-0028 (Album detail → grid, interactive pop)** — Back-swipe caught mid-flight: the whole detail page has **scaled down into a rounded card** floating above the Albums grid, which is revealed behind it **blurred**. The A-Z index rail (red) is faintly visible at right. Navigation pop is rendered as a *scaling card over a progressively-blurred destination* — the outgoing page shrinks, the incoming page blurs up behind it.
- **f-0031–0033 (Albums grid + Play/Shuffle header)** — 2-up album grid, alphabet section headers ("A"), a red-tinted **Play / Shuffle** pill pair at the top (two wide pills side by side, red glyph + label on dark glass). f-0033 clearly shows the mini-player pill AND the full tab bar both floating over a colorful (yellow) album row — the glass goes vibrant/tinted over saturated content and stays legible via a darkening underlayer.
- **f-0034 & f-0036 & f-0037 (Control Center)** — THE material-grammar goldmine. Modules:
  - **Connectivity cluster**: a rounded-square glass tile (~32px radius) *containing* 6 circular toggles (airplane, AirDrop, wifi, cellular, bluetooth, VPN/globe). Concentric grouping — circles nested inside a squircle tile.
  - **Now-Playing tile**: matching rounded-square glass tile with album thumb + title + transport.
  - **Orientation-lock & Silent** toggles: two large **white filled circles** (active state = opaque white, red glyph).
  - **Focus** pill: a wide capsule with moon glyph + "Focus" + chevrons, olive-tinted active glass.
  - **Brightness & Volume/AirPods sliders**: two tall **vertical pill sliders** (very high corner radius, ~half-width). Fill is bright/white from the bottom; the sun / AirPods glyph sits at the base. These vertical capsules are the canonical "slider = tall pill with rising fill" form.
  - **Bottom grid**: flashlight, timer, screen-mirror, remote, low-power, screen-record, Shazam, hearing — a grid of translucent glass **circles**, each ~64px, icon centered.
  All modules sit on a **fully-blurred, darkened home-screen backdrop** (wallpaper reduced to soft color blobs). Rims are subtle light hairlines; shadows are soft and ambient, not hard.
- **f-0038 (Albums grid, resting)** — Back to the grid; mini-player + tab bar floating over a yellow album at bottom, tint picked up.

### V1 synthesis
Two persistent floating glass objects (tab bar + mini-player) that (a) never touch the screen edge, (b) blur+tint from content passing behind, (c) spring-morph rather than swap. The signature transition is **origin-anchored modal expansion** with progressive backdrop blur + a content-derived rim glow. Navigation push/pop is a **scaling card over a blurred destination**. Control grammar is strict: **filled pill = primary, glass circle = secondary, tall pill = slider, squircle tile = a group container of circles**. Control Center is the purest statement of the material: nested concentric radii, hairline rims, soft ambient shadow, wallpaper crushed to blur.

---

## V2 — Apple Music playlist carousel (12 frames)

### Frame-by-frame
- **f-0001–0012** — A horizontally-paged "Playlists Made for You" carousel (New Music → Heavy Rotation → Your Essentials → Get Up! → Chill …). Each card is a large rounded-rect (~30px radius), full-bleed **animated gradient/mesh** art, "Apple Music" wordmark top-right, huge bold display title ("Chill"), contributor line bottom. Neighbors peek at both edges — paged, not free-scroll. Above: an album shelf (Evangelion covers) with a circular avatar top-right. Below: "Stations for You" shelf.
- The **mini-player** at the bottom is the star: a floating pill (thumb + marquee title + a **pause pill** + a **circular search** button). Across f-0001→f-0012 its glass **tint tracks the content color behind it** — magenta over New Music, purple over Your Essentials, violet-blue over Chill. Title text **marquees horizontally** ("Daphnis Et Chloé: Danse Religieuse - Modéré / Berlin Philharmonic, Pierre Boulez" scrolls left across frames). A faint red rounded nub peeks off-screen-left — the collapsed tab bar; when the mini-player is the focus the tab bar contracts to a peeking edge and the player widens.

### V2 synthesis
**Adaptive glass tinting**: the same mini-player continuously re-tints from the dominant color of whatever it floats over — not a fixed frost. Content cards are saturated full-bleed gradient rectangles; the glass control layer stays neutral-legible by tinting + darkening. **Marquee** is the overflow strategy for long labels. **Tab-bar-contracts / player-expands** is a shared-width negotiation between the two floating objects — a single space budget, spring-shared.

---

## V3 — Apple Maps bottom sheet (10 frames)

### Frame-by-frame
- **f-0001–0002 (collapsed)** — Satellite map. Floating glass objects: top-left a **weather chip** (rounded-rect glass, "20° / AQI 51" + swatch), bottom-left a vertical stack of two **circular glass buttons** (3D, binoculars/look-around), bottom-right a **tall rounded-rect pill** holding globe + a nav/compass arrow (two controls in one capsule), and a bottom **search pill** ("Apple Maps" + mic + carrot avatar). All are dark translucent glass over the map, hairline-rimmed.
- **f-0003–0004 (drag to medium detent)** — The search pill has become the header of a **bottom sheet** rising on a **grabber**. Sheet reveals "Places" row of vibrant filled **category circles** (Work=brown briefcase, Home=teal house, Walmart=orange-yellow cart gradient, Add=blue +). Map behind is now **blurred + darkened** where the sheet overlaps; sheet body is translucent so the blurred map bleeds through as soft color.
- **f-0005–0006 (settling)** — Detent snap; slight overshoot visible in grabber position frame-to-frame.
- **f-0007–0008 (large detent)** — Sheet near-full. "Recents" list (Winston-Salem, Costco, A Better Man's Barber) with circular leading glyph-badges. Floating map controls (3D, globe) **fade out** as the sheet covers them — z-ordered handoff. At the largest detent the sheet becomes near-opaque dark and the map is fully crushed to blur.
- **f-0009–0010 (release back down)** — Sheet returns to medium; map blur eases back in reverse.

### V3 synthesis
The **detent bottom sheet** is the workhorse: grabber-driven, springs to detents with overshoot, and drives **progressive backdrop blur+darken on the map proportional to sheet height**. Floating map chrome is the same glass vocabulary (chip / circle / tall-pill-of-two-controls / search-pill) and **fades under the rising sheet**. Category affordances are **saturated filled circles with white glyphs** — the same "filled = actionable, circle = discrete tap-target" grammar as Control Center's toggles, just colored per-place.

---

## V4 — Cowork desktop compose (14 frames) — CONTRAST REFERENCE

### Frame-by-frame
- **f-0001–0014** — Near-identical. Dark desktop web page. Centered **serif display headline** "What can I take off your plate?" (a genuinely elegant editorial serif, not SF), a spark glyph to its left, a subtle link subline. Below: a **compose card** — rounded-rect (~16px), dark, placeholder "How can I help you today?", a `+` and a mic, and a bottom toolbar row: "Work in a project or folder ▾", "Ask ▾", "Opus 4.8 Extra ▾" model chip. Then a quiet task list (Optimize my week / Organize my screenshots / Find insights in files), "Customize with plugins", and a "Gift a week of Cowork" guest-pass card with a "Copy invite" button. The ONLY motion across the 14 frames is a **breathing radial dot-field** in the background — a halftone of dots whose density/offset drifts slowly outward from center, plus cursor moves.

### V4 synthesis
Not liquid glass — it's the **restraint counterweight**. Value for glass-ui: (1) an editorial **serif display voice** can anchor a compose surface with more character than SF; (2) a **breathing generative background** (slow radial halftone) adds life without a single glass panel — an ambient-motion idiom that costs nothing in chrome; (3) flat, quiet compose card + text-row task list shows the *low-energy* end of the "always show engagement" spectrum — engagement can be the background, not the widget.

---

## Stills

- **IMG_1874.PNG — Apple Intelligence "Proofread" sheet.** A bottom sheet over a Messages thread (purple bubbles). Light frosted glass, grabber, "Proofread" title, blue circular **checkmark** confirm top-right. A **segmented action control**: three glass cells (Copy / Replace / Share) in one rounded-rect, dividers hairline. Proofread text below with **soft purple highlight blobs** marking edits. The chat's purple bleeds up through the frost as diffuse color halos (not a crisp reflection). Bottom: "Share Feedback" + thumbs. Idiom: **glass sheet with content-color bleed + segmented glass actions + a circular affirmative accent**.
- **IMG_1881.PNG — r/iOSBeta commentary. DIRECT SPEC INTEL.** A Reddit post critiquing the exact iOS-27 glass tuning, verbatim: *"Glass is tweaked quite a bit. Lighter drop-shadows inside the glass buttons. Flatter tops and sides (instead of being such rounded squircles). Much brighter upper and lower edges in light mode. Edges on left and right aren't quite so dark grey."* + a reply *"Is the shine around icons the same or changed."* Shows a before/after crop of the Maps search pill + "Places". Read this as a rim/shadow tuning brief: **lighter inner drop-shadow, less-round squircle, bright top+bottom rim, de-emphasized side rim.** People are literally still tuning toward "believing they're glass."
- **Screenshot 06-20 18.52.29 — Maps sheet (daytime).** Same as V3 medium detent; weather chip now "29° sunny / AQI 45 green". Confirms floating-chip + sheet + blurred-map stack in a lighter map palette.
- **Screenshot 06-21 14.38.54 — macro of a sheet top.** Zoomed: a peach/pink frosted sheet top with grabber over an orange backdrop, and a **purple-gradient rounded-square** (album art) emerging. Shows: sheet top-corner radius ~40px, a soft radial **sheen top-left** on the frost, and the inner square's ~44px radius. Concentric-radius evidence at macro scale.
- **Screenshot 06-21 14.38.58 — macro of "Search places" pill.** Light frosted **fully-rounded pill** (radius = half-height) over peach. Note the pill casts a **soft light-colored bloom** into the background (a bright halo), not just a drop shadow — the glass is *emitting/refracting* light outward at its edge. Faint top inner highlight. Magnifier + label + mic.
- **Screenshot 06-21 15.26.49 — Now-Playing Live Activity pill.** "You Are (Not)… / Shiro Sagisu" with a purple-gradient album **rounded-square** (~20px radius) left, and a circular **play** button right, on a light frosted pill over peach. Concentric radii: outer pill (half-height) ⊃ inner album square (~20px) ⊃ circular button.
- **Screenshot 06-21 15.26.54 — Dynamic Island GOO-MORPH.** TWO Live Activities (a **Timer** "Laundry 8:24" with a circular progress ring, and the **music** activity with purple album square + purple audio bars) rendered as two glass capsules joined by a **fluid metaball neck** in the middle — the classic liquid merge/split. This is the canonical **goo-morph** reference for the "liquid-weight" edict: adjacent capsules connect with a surface-tension bridge, they don't just abut.
- **Screenshot 06-22 11.32.12 / 11.32.18 — house dataviz (state cards NC/TN).** The user's OWN analytic idiom, not iOS glass: dark stacked cards with a colored top accent + close-x, **serif-italic row labels** ("Net retention", "Per capita"), **monospace metrics/eyebrows** ("NET PAYER", "NET RECEIVER", big mono numbers "−$37.9M · 0.85×"), saturated category bars (gold/orchid/green/blue), a "FILTERS" pill, "Esc" hints, a mini thumbnail nav. House voice: **serif-italic + monospace + technicolor bars on near-black.**
- **Screenshot 06-22 13.30.41 — house data-story "How big is the fund…".** Cream **serif display** headline on near-black, monospace eyebrow "I · WHO PAYS IN, WHO DRAWS OUT", a funnel/sankey with a central **$8.92B** node fanning into four programs, a big stat row (contributions / disbursements / retention) with a **boxed mono retention chip "0.96×"**, red accent for negatives. Editorial-data house idiom.
- **Screenshot 06-22 13.58.05 — house story crop "Are they using the capacity?"** Serif headline + serif body; same voice.
- **Screenshot 06-21 04.08.42 / 04.08.48 — glass-ui's OWN dock storybook.** "DOCK · LIQUID MORPH" mono eyebrow + `/dock/liquid-playground` code chip + giant "Liquid Morph" heading. Second crop: a light-glass card with a **soft top-edge rim highlight** and body text: *"The dock ITSELF morphs. ONE engine — `useLiquidMorph` — writes one dock-spring scalar onto the dock element: EXPAND grows the pill…"*. Confirms the existing engine (single spring scalar → dock element) we're extending.
- **Screenshot 06-22 14.32.01 — photo viewer (1895 ballet program).** Content, not chrome — but the viewer chrome is worth a note: circular translucent **prev/next chevrons** + a **segmented dot-pill paginator** (dots in a dark glass capsule) at bottom.
- **Screenshot 06-20 01.41.17 — "selected: none" debug label.** A tiny dev artifact (vertical mono text + empty circle). Ignore for design.
- **IMG_1882.PNG — "Median Household Income" infographic.** Letterboxed shared image; content, not UI. Note only that it's a bar-ranking data image.
- **IMG_1880.HEIC (→PNG) — axis-capsule napkin sketch.** Hand-drawn: three horizontal **capsules** crossed by a vertical axis, labeled with `x`, then `↑y / x`, then `↑z / y / x` arrows — i.e. a pill that (1) exists flat along x, (2) gains height along y, (3) gains depth/rotation along z. The user's own conceptual anchor: **the dock/pill is an axis-parametrized capsule** — morph = growth along named axes, not ad-hoc resizing. Ties directly to `useLiquidMorph`'s single-scalar-per-axis idea.

---

## Cross-corpus design codex (this is the part to build against)

### 1. Dock / tab-bar morphology + overflow + occlusion
- Two floating objects share ONE horizontal space budget; when one takes focus the other **contracts to a peeking edge** (V2 red nub). Model as a spring-shared width, not two independent widths.
- Floating objects **never touch the screen edge** — always a gap; content scrolls *under* them (V1). Occlusion is by z + backdrop blur, not by pushing layout.
- Overflow of labels = **horizontal marquee** (V2), never truncate the important run.
- Under a rising sheet, sibling floating controls **fade out** by z-handoff (V3 f-0007).
- **BEST-iOS move**: iOS re-tints per-frame but the *shape* morph between mini-player↔now-playing is a scale+fade. We can make the whole dock a single **metaball capsule** (goo-morph, per 15.26.54) so tab-bar↔player↔expanded-sheet are one continuous liquid surface, never a crossfade.

### 2. Progressive / gradient backdrop blur
- Blur is **proportional and positional**, not binary. In the modal expansion (V1 f-0022) the *near* content (top toolbar) stays sharper while *far* content (album grid) blurs hardest — a depth-graded blur, not a uniform sheet. In Maps (V3) blur amount tracks sheet height continuously.
- Backdrop is always **blur + darken together**; pure blur never appears without a darkening underlayer to hold contrast (V1 Control Center, V3 large detent).
- Glass panels **bleed the backdrop color through** softly (IMG_1874 purple, 14.38.54 peach) — the frost is tinted by what's behind, diffusely.
- **BEST-iOS move**: make the blur *radius a gradient across the panel* (sharp at the anchored/near edge, soft at the far edge) — a true progressive-blur backdrop, which iOS only approximates via layering.

### 3. Radius grammar — pill vs card vs circle vs squircle-tile
- **Circle** = a single discrete tap-target (Control Center toggles, map 3D/binoculars, category places, secondary album actions, play button).
- **Pill** (radius = half-height) = a primary action (white Play pill), a text field (search), a labeled toggle (Focus), or a floating control that holds a short label.
- **Card** (radius ~24-32px) = a content container or a popover/sheet body; large content cards ~30px.
- **Squircle tile** (radius ~32px) = a *group container* that holds circles inside it (connectivity cluster, now-playing tile). Concentric rule: **outer tile radius > inner element radius**, visibly nested (macro proof in 14.38.54 / 15.26.49).
- **Slider** = a tall pill with a rising fill (Control Center brightness/volume).
- iOS-27 is trending **flatter/less-squircle** on tops+sides per IMG_1881 — bias our radii slightly *less* round than iOS-26 squircles, keep the corner but flatten the mid-edge.

### 4. Engagement affordances (what happens on touch/drag)
- Touch a mini-player → it **expands from its own origin** into a modal sheet (grow, not appear) with a content-derived rim glow (V1 f-0022).
- Drag a grabber → sheet **springs through detents** with overshoot, backdrop blur tracking live (V3).
- Back-swipe → outgoing page **scales into a card** while the destination blurs up behind (V1 f-0028).
- Confirm actions get a **circular accent** (blue check, IMG_1874; play circle).
- **Always-alive baseline**: even the static desktop (V4) breathes via a background dot-field. Nothing is fully inert.

### 5. Spring character (overshoot / settle)
- Consecutive-frame evidence (V1 f-0022→f-0026 controls fading up; V3 f-0004→f-0006 grabber snap) reads as an **underdamped spring with a small overshoot then settle** — lively, not bouncy-cartoon. Transport controls fade opacity *on the same spring* as the geometry, so motion and reveal are coupled.
- The existing engine is a **single dock-spring scalar** (glass-ui storybook 04.08.48) — the axis-capsule sketch (IMG_1880) says: parametrize morph as growth along named axes driven by that scalar.

### 6. Overlay / popover entry + exit
- Anchored popover = rounded card + **directional tail** to source + backdrop **dim (scrim, not blackout)** (V1 f-0013).
- Sheets enter on a grabber from their anchor/bottom with progressive backdrop blur; exit reverses on the same spring.
- Live Activities on the Dynamic Island **merge via metaball neck**, not stacking (15.26.54).

### 7. Material layering — what sits on what, rim + shadow
- Stack: crushed/blurred+darkened backdrop → tinted frost panel (color-bled from backdrop) → hairline **rim** → content → soft **ambient shadow** below.
- Rims are **asymmetric**: bright top+bottom edge, quieter left/right (IMG_1881 spec). Inner drop-shadows are **light**, not heavy.
- Glass edges **emit a soft light bloom** into the backdrop (14.38.58), not just cast a dark shadow — refraction halo.
- Active/selected state = **opaque white fill** (Control Center silent/lock circles); inactive = translucent.

### 8. Typography scale + hierarchy
- iOS surfaces: SF, tight hierarchy — album title bold ~28px / artist ~22px / metadata grey ~15px (V1 f-0027); section headers bold ~22px ("Playlists Made for You"); giant card display titles ~44px+ ("Chill").
- House/editorial surfaces (V4 + data stories): a **serif display voice** for headlines + **monospace** for eyebrows/metrics + saturated accents. Distinct, more characterful than SF — a lever glass-ui can pull for its OWN identity rather than aping SF.

### 9. Spacing / proportion (aristotelian read)
- Concentric nesting has a consistent ratio: inner element radius ≈ 0.5-0.6× its container radius; inner element inset from container edge ≈ the corner radius itself (circles breathe inside the squircle tile, not jammed).
- Floating objects hold a **consistent margin** from screen edges and from each other (the tab-bar↔mini-player gap is roughly the mini-player's own corner radius).
- Content cards are the largest radius; the controls that sit over them are smaller-radius and higher-contrast — a legibility hierarchy by radius+opacity, not by border.

### 10. Adaptive tint
- The single most iOS-27 thing here: **one control re-tints continuously from the content behind it** (V2 mini-player sweeping magenta→purple→violet). Not a preset theme — a live sample. glass-ui should treat panel tint as a *function of backdrop*, sampled and spring-smoothed.

---

## To BEST iOS 27 (net direction)
1. **One liquid surface, not crossfades** — unify dock/player/sheet as a single goo-morph capsule (the metaball neck from 15.26.54 applied to the whole nav layer), so every state change is a continuous liquid deformation.
2. **True progressive-blur backdrop** — gradient blur radius across the panel (sharp at anchor edge → soft at far edge), which iOS only fakes by stacking.
3. **Live backdrop-sampled tint + refraction bloom** — spring-smoothed color sampling (V2) plus the edge light-bloom (14.38.58) as first-class, not incidental.
4. **Asymmetric rim per the community spec** (IMG_1881): bright top/bottom, quiet sides, light inner shadow, slightly flatter-than-squircle — bake into the token set.
5. **Axis-parametrized morph** (IMG_1880 sketch → `useLiquidMorph`): expose x/y/z growth scalars so any element can grow/lift/rotate on one shared spring.
6. **Editorial voice option** — offer a serif-display + mono-eyebrow typographic mode (V4 + house stories) so glass-ui has an identity beyond SF cloning, always-breathing background as the low-energy engagement floor.
