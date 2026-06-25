# Pass-E META-STORYBOOK audit — `motion/reveal`

- **Page**: motion/reveal · **Import**: `@mkbabb/glass-ui/motion-core`
- **SFC**: `demo/stories/motion/reveal.vue` (132 L) · **Live**: http://localhost:5173/motion/reveal
- **Substrate (manifest)**: `constellation` (motion category default, `manifest.ts:191`)
- **Captures**: `_shot-motion-reveal-full.png` · `_shot-motion-reveal-bloom.png`

## Verdict at a glance

The page is MECHANICALLY CORRECT (the `v-reveal` stagger and the `useLiquidReveal`
bloom both fire and settle) but VISUALLY DEAD against the North Star. It reads as
gray slabs on a near-white page: the glass morphism is invisible because the
backdrop is the low-contrast warm-cream constellation dot field, not a colorful
aurora. It composes only Button + glass-card — thin, flat, no dock/tabs/proc-anim.
The two sub-sections are NOT their own glassy cards (bare transparent flex stacks
separated by one hairline). Main card area is 1152px on a 1440 viewport.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

PARTIAL. Both primitives are present and fire correctly (verified live):

- `v-reveal:fade="i+1"` rows stagger via `--d * 80ms` (`reveal.vue:67,110-113`); replay re-arms via the double-rAF remount (`reveal.vue:20-23`). Works.
- `useLiquidReveal` bloom: clicking "Bloom from here" mounts the surface and blooms from the trigger rect — live readback after settle: `opacity:1 transform:none filter:blur(0px) data-state=open` (the completed end-state). Mechanism confirmed.

API gaps — the demo under-exercises both:
- `v-reveal` ships TWO directives: the RISE form (`v-reveal="N"`) and the FADE form (`v-reveal:fade="N"`). The prose names both (`reveal.vue:53-56`) but the live stage only renders the `:fade` variant (`reveal.vue:67`). The rise/fade DIFFERENCE — the headline teaching point — is never shown side-by-side. A two-column "rise | fade" stage would exercise the full directive.
- `useLiquidReveal({ trigger, preset, blur })` exposes `preset` + `blur` knobs (CLAUDE.md §W-LIQUID-REVEAL). The demo hardcodes defaults (`reveal.vue:34`) — no control to vary the spring preset or blur depth, no PRM-snap demonstration, no source-rect visualization (the trigger→surface FLIP is the whole point and is invisible at the settled frame).
- No `.glass-reveal` zero-JS recipe shown beside the JS leaf — the page documents the JS refinement but never the CSS floor that is "the everywhere default."

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

THIN. Live census (`main` subtree): **2 buttons, 7 glass-cards (the 6 stagger rows + 1 bloom surface), 0 tabs, 0 docks, 0 demo'd procedural-anims** (the 1 canvas is the page BACKGROUND, not a composed viz). The user's bar — "each page deftly uses a series of glass-ui components (docks / procedural-anims / cards / tabs / buttons)" — is unmet. This is a Button + bare-card page. No dock API (contextual switching / morph / silhouette) is leveraged anywhere, despite the North Star naming the dock system as binding.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field, or flat?

FAIL — the headline defect. The morphism cannot read:
- Substrate is `constellation` (`manifest.ts:191`), a faint warm-cream STATIC dot field. Live: `constellation-canvas` 1152×874 behind the body, but it has near-zero luminance contrast, so the six-layer optical composite (blur·tint·rim·catch-light·shadow·grain) has nothing colorful behind it to refract. The cards resolve to flat gray (`oklab(0.798 … / 0.84)` on the bloom plate — a gray translucency over white = gray).
- The North Star is EXPLICIT: "glass demos over COLORFUL aurora backgrounds." Motion is a band that *should* read its violet `--motion-accent` identity over a live aurora field. The only color event on the entire page is the 2px violet stagger dot (`reveal.vue:73`). Everything else is monochrome gray.
- PAPER morphism: absent. Not inherently apt here, but the page has neither glass-over-aurora NOR a paper register — it is a void.

Fix direction: move the substrate to `aurora` (or wrap the stage in `<DockStage>`-style shared offscreen-paused aurora) so the reveal cards bloom over a live colorful field and the glass actually reads as glass.

## (4) STRUCTURE — each sub-section its OWN glassy card? main area BIG enough?

FAIL on both:
- **Sub-sections are NOT their own cards.** `StorySection` renders a transparent `<section class="flex flex-col">` (`StorySection.vue:71`) — live readback: both sections `backgroundColor: rgba(0,0,0,0)`. The whole body sits in ONE outer StoryHero card; the two sub-sections are bare flex stacks separated by a single `--configurator-divider` hairline (the `.story-sections--delimited` rule, `StoryPage.vue:166-174`). The user's "each sub-section in its OWN glassy card" mandate is unmet — they want card-per-section, the page ships hairline-per-section.
- **Main card area too small.** Article width is tokenized to `--story-page-max-inline` (`StoryPage.vue:87`) → 1152px painted on a 1440 viewport (≈ 288px / 20% unused). The user asks for the main card BIGGER / more screen space. The reveal-row cards are full-width but stunted vertically (≈34px each) — a lot of dead horizontal whitespace per row.

## (5) PATH-LABEL standardization

PASS (with a minor honesty nit). Live chip renders `@mkbabb/glass-ui/motion-core`, matching the manifest row (`manifest.ts:315`) and the prompt's expected label. Nit: the SFC actually imports from TWO subpaths — `vReveal` is `/motion-core` (root-barrel-safe) but `useLiquidReveal` is `/motion` (keyframes-bearing, `reveal.vue:14-15` import the `src/` paths; the published homes are `/motion-core` and `/motion`). The single `motion-core` chip is the dominant/correct label, but the bloom demo's leaf is a `/motion` symbol — a precise page might note both.

## (6) LANGUAGE — superfluous prose to tighten?

Several:
- `reveal.vue:2-10` — a 9-line authorship-history comment ("the W-HIERARCHY2 census catches the prior hand-rolled…", "NO demo-local re-implementation", "the directive ships no keyframes by design"). Tranche-provenance editorializing; trim to one line.
- `reveal.vue:27-30` + `reveal.vue:70-72` — duplicated "the iOS-27 materialize-from-source move" / "the motion band's ONE coherent violet event" narration. The blurb prop (`reveal.vue:81,95-98`) already says it; the comments repeat it.
- `reveal.vue:105-109` — 5-line CSS comment re-justifying "NOT a fork of a sibling-wave pop-entrance." Over-explained.
- `reveal.vue:50-56` blurb prose is fine but long; "both cascade by `--d`" is the keeper.

## (7) BUGS

No hard bug — both animations fire and settle. Soft issues:
- The bloom surface's FLIP inversion is invisible: by the time a user reads it, it's at the settled frame (no replay control for the bloom, unlike the stagger's Replay button). The "source-rect inversion" claim (`reveal.vue:96-97`) is unobservable without re-triggering.
- The stagger Replay unmounts/remounts the whole stage (`v-if="playing"`, `reveal.vue:63`) — works but is a heavier remount than a key-bump re-arm.

---

## Recommended gestalt redesign (BD direction)

1. Substrate → `aurora` (colorful live field) so glass reads as glass; or a shared offscreen-paused aurora stage behind both sections.
2. Each `<StorySection>` → its OWN `glass-floating`/`glass-card` plate (or a `tier` axis on StorySection) per the user mandate.
3. Widen the main card area (raise `--story-page-max-inline` for this band, or full-bleed the stage).
4. Compose a SERIES: a `<SegmentedTabs>` to switch rise|fade|bloom registers; a Button row driving the bloom preset/blur; optionally a small procedural-anim as the live backdrop the bloom materializes over — deft multi-component composition, not Button-only.
5. Show the rise vs fade vs CSS `.glass-reveal` registers side-by-side (full API).
6. Strip the tranche-history comments (`reveal.vue:2-10,27-30,105-109`).
