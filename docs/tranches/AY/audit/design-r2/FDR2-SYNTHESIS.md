# FDR2-SYNTHESIS — the ranked design work-list over the settled post-rebuild tree

Lane: FDR2-synthesis · FD-R2 fleet · 2026-06-10
Surfaces: glass-ui demo (`:5199`, the settled tree with W-DOCK-NAV / W-SB-REVERIFY / W-BLOB-REBUILD / W-AUR-VANGOGH-REBUILD / W-AUR-CONFIG / W-FF3 / W-SLD1-R3 / W-SB-STAGE / W-SB1 / W-EGG / W-PRUNE landed) + slides til-briefing (`:5273`, the 13-slide round-2 deck).
Method: my own real-GPU walk (chrome channel, `--use-gl=angle --use-angle=metal` — the bundled headless-shell still wedges on the aurora WebGL page; the corpus cure holds), 60+ captures + a computed-style measures JSON in `captures/` (`G-*` desktop 1280 light+dark, `G-*-mobile390`, `S-slide{01..13}` at `?freeze`, `FDR2-synthesis-measures.json`), cross-read against the sibling FD-R2 capture sets on disk at write time (`FDR2-slides-panes/` 13×2+zooms; the per-route `captures/<cat>--<id>.png` sweep) and the five corpora (`design/FD-*`, `hardening/H-*`, `reality/RA-*`, `research-necessity/`, `visual/*-DELTA`). Sibling FDR2 findings .md files were not yet on disk at write time — where a sibling's captures grounded a judgment below, the frame is cited by path; everything else is my own walk + the round-1 corpus delta.
Brief (verbatim, the user): "better suffuse our design language of glass, grid, math, large and audacious typography, with colorful audacious pops, like those found in our icons (how might we increase this, too? within a sense of proportion)".

**Headline verdict: the rebuild band landed.** The round-1 blockers are visibly cured on the live tree — the intro aurora is the entire page (`G-foundations-intro-desktop-light.png`), the hero constellation paints with red focal nodes and no mid-word wrap (`G-compositions-hero-desktop-light.png`), the fourier wells have real stroke presence at first paint (`G-substrates-fourier-field-desktop-light.png`), the slider is the thumb-invisible pull-the-track register with the slim spectrum bar (`G-forms-slider-desktop-light.png`), the dock overview specimen sits over a live color band, auth-shell un-orphaned purple-tomato and is now the best-staged composition in the book, and the slides deck is poster-register end to end with real `glass-resting` + `blur(12px)` cards (measured: `oklab(0.977/0.74)` + `backdrop-filter: blur(12px) saturate(1.05)`), the real nutrition label on S11, real viz PNGs on S3, "A proven team" on S13. What remains is a SUFFUSION layer (the color machinery is shipped but not threaded) plus a short tail of staging misses and voice leaks.

---

## §1 — Suffusion scorecard (the brief's five axes, 0–5, per surface)

5 = the axis is a signature here · 3 = present but not committed · 1 = absent/contradicted. "Pops" = the colorful-audacious-icon register (the canonical shipped recipe: the empty-states icon chip — `color-mix(in srgb, var(--section-color-N) 25%, transparent)` circle + full-chroma icon).

| surface | glass | grid | math | audacious type | colorful pops | the one-line read |
|---|---|---|---|---|---|---|
| demo shell chrome (rail + bottom dock + ⌘K + eggs) | 5 | 1 | 4 | 3 | **1** | The product IS the chrome and the eggs are real (ℱ-redraw, konami, eclipse) — but the rail's 12 category icons are mono ink; zero section-ramp in the always-visible layer. |
| foundations band | 4 | 2 | 5 | 5 | 3 | Intro hero + typography page are the system at its best ("Golden / Audacious / Ornament" on the √φ ladder). paper-glass now has a backdrop but it is GRAY-on-gray (`captures/foundations--paper-glass.png`); the icons page — the page the brief names — is 21 mono tiles, no pop recipe shown. |
| substrates band | 4 | 1 | 5 | 4 | 3 | Constellation/fourier self-staged; the aurora preset strip is the most colorful strip in the repo; blob's static row contradicts its own "pastel" blurb (ink-black + saturated RGB slabs, both modes — `G-substrates-blob-desktop-{light,dark}.png`, `blob.vue:44`). Aurora still has NO page header (0 StoryPage/h1 hits in `aurora.vue`). |
| primitives band (forms/display/containers/feedback/data) | 3 | 1 | 2 | 4 | 2 | Card's tier ladder over the teal field is the model; buttons still paints five indistinguishable white pills over a white card + the ALL-CAPS spec dump (`G-display-buttons-desktop-light.png`); checks/inputs stay quiet (correct restraint); viz-basis badges are the lone math pop. |
| dock band | 4 | 1 | 1 | 3 | 2 | Overview's aurora well finally gives the headline glass something to read through; layers + rail specimens still float in empty cream wells (`G-dock-layers-desktop-light.png`). |
| compositions band | 5 | 2 | 5 | 5 | 4 | Hero + auth-shell + math-paper + empty-states are the suffusion proof set — the empty-states icon chips ARE the brief's pop register, shipped. Dashboard retired (right call). |
| slides deck, light | 4 | 3 | 4 | 5 | 2* | Fraunces 81.6px/320 + Newsreader + red discipline; the constellation bookend resolves. *The 2 is DELIBERATE — the deck's one-red-per-surface identity is its distinctiveness; suffusion here means warmer example glyph chips, not rainbow. Proportion: correct for the GovOps audience. |
| slides deck, dark + chrome | 2 | 2 | 4 | 5 | 1 | The glass cards go MUD over the black void (`FDR2-slides-panes/_zoom-s13-cards-dark.png` — "Start small." is a flat khaki slab; nothing behind the blur to vouch for glass). Settings popover cramped. |

The pattern across the board: **the color machinery exists (13-stop section ramp, oklch viz basis, aurora presets, watercolor dots) and the type/math/glass axes are genuinely distinctive — the pops axis is the one axis that consistently scores lowest, and always for the same reason: the shipped recipe is not threaded into the chrome and the foundational pages.**

## §2 — The ranked design work-list

Each row: surface · the move · the owning wave (an extant AY/L id, or NEW). Ordered by leverage (visibility × effort).

| # | surface | the move | owner |
|---|---|---|---|
| 1 | **demo, repo-wide** | **Thread the icon-pop register** — the empty-states chip recipe (`section-color-N` 25% tint circle + full-chroma icon) becomes the named house pattern and lands at the three highest-traffic sites: (a) the front-door category cards (today text-only glass — `intro.vue:76-100`; each card gains its manifest icon in its section-tinted chip), (b) the foundations/icons page (a "POP REGISTER" section demonstrating the recipe — the page the brief literally points at), (c) the rail's active/hover tint reading the section ramp (active stays NCSU-red; the hover halo may tint per-category). Proportion guard: chips at 25% tint, one chip per card, never on form atoms. | **NEW — W-SUFFUSE** (the C2 brief made a wave; small, demo-side + one utility) |
| 2 | substrates/blob | **Re-tone the static row to what the blurb promises.** `blob.vue:44` leads with `var(--primary)` (ink-black) then saturated RGB — under prose saying "pastel swatch." Recolor to seed-derived OKLCh pastels (the mood section's own derived-stop machinery), demote the black swatch. Both modes captured wrong today. | W-COHERE (the blob set-language item it already owns) |
| 3 | display/buttons | **Give the flagship primitive a backdrop + kill the spec dump.** The variant rows get the display/card color-strip treatment (the FD §6 placement that the W-SB-STAGE restraint map skipped — amend the map: buttons + paper-glass are SHOWCASE pages, not quiet pages); the ALL-CAPS "AT REST THE LABEL IS WARM INK…" block rewrites to the story register. Five-indistinguishable-pills is a staging defect, not a token defect. | W-SB2 (+ one-line W-SB-STAGE map amendment) |
| 4 | substrates/aurora | **Give the category's headline act a headline.** Still the only substrate page with no eyebrow/h1/blurb (0 hits in `aurora.vue`); and the config column clips its own controls (the ANALOGOUS/COMPLEMENT/TRIAD row + the "+ Stop" pill cut at the panel edge — `G-substrates-aurora-desktop-light.png`). Adopt StoryPage; fix the overflow. | W-SB2 (header) + W-AUR-T5 rider (chrome clip) |
| 5 | slides, dark arm | **Dark glass needs something behind it.** The `glass-resting` cards read as flat khaki mud over the black field (S13 zoom); either the dark deck's constellation/lattice gains a faint warm glow bleed under card zones, or the dark card arm deepens toward the ink plate with the specular edge carrying the glass read. Also: settings popover padding; the dark-mode persistence/gear re-fire bug. | L.W-GLASS-SUFFUSE (cards) + L.W-CHR-R2 (popover/persistence) |
| 6 | substrates/constellation (+ W-SB3 gate) | **Finish the voice scrub.** User-facing blurbs still carry cross-repo + CI language: "(NOT the slides red anomaly)" (`constellation.vue:357`), "slides aliases it to --ncsu-red" (:391), "The π freeze-live spec mounts this twice…" (:504). The W-SB3 language gate must match `π|slides|spec|proof:` classes in blurbs, not just tranche citations. | W-SB3 |
| 7 | foundations/paper-glass | **Color the ladder's backdrop.** The tiers now sit over a substrate, but it is gray — five gray cards over gray (sibling capture). Steal display/card's watercolor strip verbatim; this is the page whose subject is read-through. | W-SB2 |
| 8 | dock/layers + dock/rail | **Extend the overview's wallpaper well** to the layers + rail specimen frames (today: empty cream — the headline glass primitive's sibling pages still demonstrate glass against nothing). | W-SB2 (W-SB-STAGE map rows already divined in FD §6) |
| 9 | substrates/glass-material | **The read-through stops one layer short** — the tier chips blur the white inner panel, not the aurora behind the card (`G-substrates-glass-material-desktop-light.png`); the chips read gray. Let the chip strip sit in an exposed-margin region (the W-SB-STAGE seam exists) so the chips sample the live field. | W-SB2 |
| 10 | foundations/intro | **De-duplicate the double header + the fold occlusion.** The chrome eyebrow/h1 ("Intro / What this storybook is.") stacks 100px above the hero's own wordmark+headline; at 1280×800 the BottomDock occludes the blurb mid-sentence. Suppress the chrome header on `hero: true` pages (one chassis conditional); add bottom-inset clearance. | W-SB2 |
| 11 | demo shell, dark + bright-stage | **Set the W55 bucket on the shell.** Dark-mode story chrome (h1/blurb) paints dark ink over the bright aurora top (`G-foundations-intro-desktop-dark.png` — the round-1 BottomDock-over-bright-stage case, now on the page chrome too). The shell sets `--glass-backdrop: light` over hero substrates; the machinery shipped in W55, unconsumed here. | W-COHERE E3 (recession/backdrop parity) |
| 12 | display/card | **Scrub the template-string prose inside the tier chips** — "the class merge happens at the single cn(`glass-${tier}`, props.class) seam in Card.vue" renders as literal code inside the specimen (`G-display-card-desktop-light.png`). Specimens describe the USE, not the implementation seam. | W-SB2 |
| 13 | compositions/auth-shell | **The primary affordance is still the quietest element** — "Sign in" paints a putty pill with less weight than the checkbox labels (round-1 carry). One variant flip to `solid`/audacious. | W-SB2 |
| 14 | substrates/aurora | **The default stage undersells the strip** — Sky at load is a washed pale-blue field under six vivid thumbnails (round-1 carry, post-rebuild confirmed). Either default to Dawn/Meadow or warm Sky's first-paint energy. | W-AUR-T5 rider |
| 15 | navigation/tabs | Segmented strips still stretch the full 1100px card for 3 options (comic proportions; round-1 carry). Cap specimen widths at content + breathing room. | W-SB2 |
| 16 | slides S4/S8 | The receipt (S4) and pay-back glyph (S8) posters have earned more size — both sit small in generous dead space (the poster register holds; the art can grow ~1.4×). Low urgency; the deck ships as-is. | L.W-POSTER-R2 (residual polish) |

Items 2–4 + 7–9 are one demo-side wave's worth of work; item 1 is the only NEW wave this synthesis mints, and it is small and additive (the recipe + three placements + a proportion guard).

## §3 — The incongruence list (cross-surface contradictions)

1. **"Pastel" prose vs saturated-RGB paint** — blob's static row (both modes). The single loudest word-vs-pixel disagreement on the tree.
2. **Glass-first canon vs glass-over-nothing pages** — W54 made glass the default register; buttons/layers/rail/paper-glass still demonstrate it against flat cream/white/gray. The W-SB-STAGE restraint gate (G-RESTRAINT) now structurally BLOCKS the suffusion brief on showcase pages — the gate needs a showcase-vs-quiet distinction, or every future color well is a gate fight.
3. **The color identity stops at the page boundary** — 10 story SFCs compose the section ramp; the shell chrome (rail, bottom dock, front-door cards) composes none of it. The user's "like our icons" register exists only inside one composition (empty-states).
4. **Slides light vs dark glass** — same `glass-resting` class, real material in light, mud in dark; the deck's dark arm contradicts the library's own "glass needs a backdrop" lesson the demo just learned.
5. **The voice contract is enforced unevenly** — dock pages prove the story register; constellation/card/buttons still leak π-lane, cross-repo, and template-string prose. The W-SB1 "0 meta hits" gate passed while `constellation.vue:357/391/504` ship meta — the gate's pattern set is too narrow (gate-vs-reality gap, the cardinal-lesson shape, here in language form).
6. **The icons page vs the icons brief** — the foundation page that defines the icon system shows no color register at all; the brief assumes "our icons" are where the pops live. Today they live in exactly one composition.
7. **The aurora page is the only substrate denied the page-header ladder** — the IA's typographic spine breaks exactly at the category's flagship.
8. **The W55 adaptive-glass machinery vs its own demo** — the shell never sets the bright bucket over the pages that are now (correctly) full-bleed bright.

## §4 — Calibration: the exceptional (named as readily as the defects)

- **The intro hero, both modes + mobile** — full-bleed aurora under the display ladder is now the front door the system deserves; dark is dusty-rose atmospheric, no longer collapsed; 390px reflows clean (`G-foundations-intro-mobile390-light.png`).
- **compositions/hero** — constellation paints, the typewriter headline with the red ℱ holds one line; the best single screen in the book.
- **auth-shell** — purple-tomato un-orphaned; "Skip the cold gradient canvas." is the house voice at its best.
- **The slider family** — the thumb-invisible standard + slim-bar spectrum is exactly the user's bar, and it reads as ONE designed object family.
- **The aurora preset strip** — still the most characterful strip on either surface.
- **empty-states** — mascot + section-tinted icon chips; the suffusion brief's answer key, already shipped.
- **The slides deck light arm** — S1/S2/S11/S12 are poster-grade; the $350M figure slide, the real nutrition label, and the de-chromed WOPR terminal landed the user's round-1 asks; 81.6px Fraunces wght 320 is large, audacious, and characterful; the red discipline holds 13/13.
- **The egg shelf** — ℱ-redraw via a real forward-DFT, konami full-bleed aurora, ⌘K dogfooding Command: discoverable, proportionate, all on shipped machinery.

## §5 — Feed-forward

- **→ W-COHERE**: items 2, 11 (+ the §3.2 gate amendment decision belongs in its spec, since W-COHERE owns set-cohesion).
- **→ W-SB2/W-SB3** (Batch-3 remainder): items 3, 4a, 6, 7, 8, 9, 10, 12, 13, 15 — one storybook-polish pass; the language-gate widen is W-SB3's existing charge.
- **→ NEW W-SUFFUSE**: item 1 (the only net-new wave; ≤1 day of demo-side work + the recipe write-up in the icons page).
- **→ L round-2 residuals**: items 5, 16.
- **→ W-AUR-T5**: items 4b, 14 as riders on the already-minted successor wave.

Capture index: `design-r2/captures/G-*.png` (20 routes × light/dark desktop + 4 mobile, this lane), `design-r2/captures/S-slide*.png` (13 + 4 mobile, this lane), `design-r2/captures/FDR2-synthesis-measures.json` (computed-style readbacks: story-chrome h1 25.9px on-ladder, slides Fraunces 81.6/320, slides cards `glass-resting` + real backdrop-filter), `design-r2/FDR2-slides-panes/` (sibling deck walk, cross-cited), `design-r2/captures/<cat>--<route>.png` (sibling per-route sweep, cross-cited).
