# Round 2 — ios27-codex-A (fable)

Marks: /Users/mkbabb/Programming/glass-ui/docs/tranches/BJ/formation/ios27/MARKS-A.md

## Summary

Read the full group-A corpus frame by frame. The through-line of iOS-27 liquid glass across V1-V3: floating glass objects that never touch the screen edge, blur+darken their backdrop progressively (proportional to sheet height / depth-graded within a transition), tint live from the content passing behind, and spring-morph rather than swap. A strict radius grammar governs it — circle = one tap-target, pill = primary action or field, card = content/popover, squircle-tile = a group container of circles, tall-pill = slider — with visible concentric nesting (outer radius > inner). The keystone motions are origin-anchored modal expansion (mini-player grows into a sheet, V1/f-0022), scaling-card navigation pop over a blurred destination (V1/f-0028), grabber detent sheets with live backdrop blur (V3), and the Dynamic-Island goo-morph metaball merge (still 15.26.54) which is the canonical liquid-weight reference. A Reddit still (IMG_1881) hands us the literal community spec for the material tuning: lighter inner drop-shadow, flatter-than-squircle tops/sides, bright top+bottom rim, quieter side rim. V4 + the house data-stories are the restraint counterweight — a serif-display + mono-eyebrow editorial voice and a breathing generative background as the low-energy engagement floor. The napkin sketch (IMG_1880) frames the whole morph as an axis-parametrized capsule feeding glass-ui's existing single-scalar useLiquidMorph engine. To BEST iOS 27: unify the nav layer as one goo-morph surface instead of crossfades, ship true gradient (progressive) backdrop blur, make backdrop-sampled tint + edge refraction bloom first-class, bake the asymmetric rim spec into tokens, expose x/y/z morph scalars, and offer an editorial serif/mono identity beyond SF cloning.

## Highlights (10)

### origin-anchored-modal-expansion

**Observed:** V1/f-0022 catches the mini-player mid-expand into the full Now-Playing sheet: album art scales up from the pill's own location with a content-derived cyan rim glow, transport controls fade up semi-transparent on the same spring, and the Library behind is depth-graded blurred — top toolbar stays sharper while the far album grid blurs hardest.

**Implication:** Model open/close as growth from the source element's frame (not a bottom-sheet slide or crossfade); couple opacity reveal of inner controls to the same spring as the geometry; graduate backdrop blur by depth, sharpest at the anchored edge.

### progressive-backdrop-blur

**Observed:** Blur is always proportional and positional, never binary: in V3 the Maps sheet's backdrop blur+darken tracks sheet height continuously across f-0002→f-0008, and in V1/f-0022 near content stays sharper than far content within one transition. Blur never appears without a co-applied darkening underlayer (V1 Control Center f-0034/f-0037).

**Implication:** Drive backdrop-filter blur amount from a live progress/height scalar and always pair it with a darkening layer; support a blur-radius gradient across a single panel (sharp near-edge → soft far-edge) to beat iOS's stacked approximation.

### radius-grammar-concentric

**Observed:** Strict shape roles recur: circle = one discrete tap-target (Control Center toggles, map 3D/binoculars, album shuffle/download, play button), filled pill = primary action (white Play pill V1/f-0027) or field (Maps search), squircle-tile = a group container holding circles inside it (connectivity cluster f-0034), tall pill = slider with rising fill. Macro stills 14.38.54 + 15.26.49 prove visible concentric nesting: outer pill ⊃ ~20px album square ⊃ circular button.

**Implication:** Encode radius as a role token (circle/pill/card/tile/slider), enforce outer-radius > inner-radius nesting with inset ≈ corner radius, and bias slightly flatter-than-squircle per the community spec.

### adaptive-backdrop-tint

**Observed:** V2/f-0001→f-0012: one unchanged mini-player continuously re-tints from the dominant color of whatever card scrolls behind it — magenta over New Music, purple over Your Essentials, violet-blue over Chill — while its long title marquees horizontally. Frost color is a live sample of the backdrop, not a preset theme.

**Implication:** Treat panel tint as a spring-smoothed function of sampled backdrop color rather than a fixed material; use horizontal marquee (not truncation) as the label-overflow strategy.

### goo-morph-metaball-merge

**Observed:** Still 15.26.54 shows two Dynamic-Island Live Activities (a Timer with circular progress ring + a music activity with purple album square and audio bars) joined by a fluid surface-tension neck rather than abutting — the canonical liquid merge/split. The peeking red tab-bar nub in V2 shows the same space being negotiated liquidly.

**Implication:** Unify the nav layer (tab-bar↔mini-player↔expanded sheet) as ONE metaball capsule so every state change is a continuous liquid deformation with a connecting neck, never a crossfade — this is the 'liquid-weight' edict made literal.

### scaling-card-nav-pop

**Observed:** V1/f-0028 catches a back-swipe mid-flight: the pushed album-detail page has scaled down into a rounded floating card while the destination Albums grid is revealed behind it blurred, A-Z index faintly visible. Push/pop is a scaling card over a progressively-blurred destination.

**Implication:** Render navigation transitions as an outgoing page contracting to a card while the incoming page blurs up behind, interactive and reversible on the same spring — not an opaque slide.

### asymmetric-rim-and-refraction-bloom

**Observed:** IMG_1881 is a verbatim r/iOSBeta spec: 'Lighter drop-shadows inside the glass buttons. Flatter tops and sides (instead of such rounded squircles). Much brighter upper and lower edges in light mode. Edges on left and right aren't quite so dark grey.' Macro 14.38.58 shows a search pill emitting a soft light bloom into its backdrop, not just casting a dark shadow.

**Implication:** Bake asymmetric rims into tokens (bright top+bottom, quiet sides), lighten inner drop-shadows, and add an edge light-bloom/refraction halo so glass reads as refracting light outward rather than only shadowing.

### detent-sheet-with-live-blur

**Observed:** V3/f-0003→f-0008: a grabber-driven bottom sheet springs through detents with visible overshoot; its translucent body bleeds the blurred map color through, its Places row uses saturated filled category circles (Work/Home/Walmart/Add), and sibling floating map controls (3D, globe) fade out by z-handoff as the sheet rises.

**Implication:** Sheets should be grabber-driven, spring to detents with slight overshoot, drive backdrop blur from live height, bleed backdrop color through the frost, and fade occluded sibling chrome by z rather than relayout.

### breathing-restraint-and-editorial-voice

**Observed:** V4's 14 near-identical Cowork frames animate only via a slow breathing radial dot-field behind a serif-display headline ('What can I take off your plate?') and a quiet compose card; the house data-stories (13.30.41, 11.32.18) pair cream serif display + monospace eyebrows/metrics + saturated bars on near-black.

**Implication:** Offer glass-ui an editorial identity beyond SF cloning — a serif-display + mono-eyebrow typographic mode — and use an ambient breathing background as the always-alive engagement floor when no glass widget is in focus.

### axis-parametrized-capsule-morph

**Observed:** IMG_1880 (hand sketch) draws three capsules crossed by a vertical axis labeled x, then ↑y/x, then ↑z/y/x — a pill that exists flat along x, gains height along y, gains depth/rotation along z. glass-ui's own storybook (04.08.48) confirms the existing engine writes ONE dock-spring scalar onto the dock element via useLiquidMorph, EXPAND growing the pill.

**Implication:** Extend useLiquidMorph to expose named x/y/z growth scalars on one shared spring so any element grows/lifts/rotates parametrically — morph as axis growth, not ad-hoc resize.

