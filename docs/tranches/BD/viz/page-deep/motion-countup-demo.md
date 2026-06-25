# Pass-E deep audit — `motion/countup`

- **Import label:** `@mkbabb/glass-ui/motion`
- **SFC:** `demo/stories/motion/countup.vue` (80 lines)
- **Live:** http://localhost:5173/motion/countup (verified on :5173, 1440px)
- **Manifest row:** `manifest.ts:1084` · path-label `manifest.ts:314` · category bg `manifest.ts:191` (`motion: "constellation"`)
- **Component:** `useCountup` (composable, `src/composables/motion/useCountup`)

## Verdict snapshot

The demo is **thin and flat**. The composable WORKS (Run tweens 0→1280/98/4200, confirmed live) but the page is a near-bare spec sheet: a prose paragraph, three text buttons, and three metric tiles in a 3-col grid — all stacked inside ONE outer glass-wash card over a faint MONOCHROME constellation field. None of the user's BD bars are met: the glass morphism does not read (glass-over-glass-over-gray), the cards are not "each sub-section in its own glassy card over a colorful aurora," the main area is small, and no dock/tab/procedural-anim composition is exercised.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial.** The three control verbs (`runActive`/`settle`/`cancel`, `countup.vue:19,37-39`) cover the composable's public surface, and the three figures exercise `data-countup` + `data-countup-dur` + `data-countup-delay` (`countup.vue:51-72`). The bouncy `easeOutBack` `easeFn` is wired (`countup.vue:13-19`) — good, the overshoot-on-settle is the editorial signature.

Gaps:
- **No `easeFn` SWITCHING.** The composable's headline affordance is the pluggable easing callable, but the page hardcodes ONE `easeOutBack`. There is no live picker (linear vs back vs the value.js `MOTION_CURVES` family) — the user's "contextual switching / animation" bar is unmet. A `<SegmentedTabs>` or dock-rail facet swapping the ease and re-running would demonstrate the engine's range.
- **No re-trigger affordance on the figures themselves.** Once run, the figures sit static; there is no scroll-into-view auto-trigger (the real editorial use-case — count-up fires when the metric enters the viewport), no per-figure replay.
- **`settle` vs `cancel` are indistinguishable to a viewer** — both just stop the tween; there is no label/caption explaining the difference, so two of three buttons read as dead.

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**Thin/flat.** The page composes only `<Button>` (×3) + raw `<div class="glass-card">` tiles + `<StoryPage>`. It uses ZERO of:
- the dock APIs (no `<GlassDock>`/`<DockStack>`/facet-switching — the user explicitly asks each page to "leverage the dock APIs");
- `<SegmentedTabs>` (the natural ease-mode / preset switcher);
- any procedural-anim surface (a count-up over a live `<Aurora>` or `<GooBlob>` is the canonical "metrics over a hero field" composition);
- `<MetricCell>`/`<MetricStack>` — the LIBRARY's own metric primitives — which this page hand-rolls as raw `glass-card flex-col` triplets (`countup.vue:47-55`). The demo re-implements a metric card instead of composing the shipped one.

The three figures are hand-built div stacks, not a composed component series. This is the flattest possible reading of the API.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FLAT — the headline defect.** Live readback:
- Background canvas is `constellation-canvas` (`bgEl: "constellation story-hero-bg"`) — a faint near-monochrome dot/line field, NOT a colorful aurora.
- The body card resolves `glass-wash` (`backdrop blur(8px) saturate(1.05)`, bg alpha 0.6).
- The metric tiles resolve `.glass-card` (`oklab(0.7256 … / 0.6)`, `backdrop blur(8px)`).

So the composite is **glass-card INSIDE glass-wash INSIDE a gray field** — a direct violation of DESIGN.md's *glass-cannot-sample-glass*. A glass tile over a glass-wash plate over a colorless backdrop has nothing chromatic to refract, so the six-layer optical composite collapses to flat gray opacity (exactly the screenshot: gray slabs with a tiny violet accent bar). The morphism cannot read. PAPER morphism: absent (no `paper-grain`/`paper-ink-mark` register, though a count-up "ledger" framing would suit paper).

**Fix direction:** background should be `aurora` (the colorful field), the metric tiles should float DIRECTLY over it (the `<ShowcaseFrame tier="field">` / `DockStage` precedent — drop the intermediate opaque/glass-wash plate so each tile samples the live aurora, not another glass plate).

## (4) STRUCTURE — own glassy cards? main area big enough?

**Both unmet.**
- **Not own cards:** the intro prose + the 3-button row + the metric grid are ALL inside ONE `story-hero-card` (`bodyCardClass: …glass-wash story-hero-card…`). There are no per-sub-section cards — it is one undivided block. The user's "each sub-section in its OWN glassy card" bar fails. (Note: the page passes default `delimited`, but there is only one section, so no delimiter even draws.)
- **Main area small:** body card measured `1088×386px` in a 1440 viewport — ~27% of viewport height, lots of dead whitespace above and below. The user's "main card area BIGGER / more screen space" bar fails. The grid tiles are short (`p-6`) and the page does not use the vertical real estate.

## (5) PATH-LABEL standardization

**PASS.** The subpath chip renders `@mkbabb/glass-ui/motion` (live `uid=2_10`), matching `manifest.ts:314`. The SFC import is the deep relative `../../../src/composables/motion/useCountup` (`countup.vue:7`) — correct for a demo SFC (demos import from `src/`, the chip shows the public label). No standardization issue.

## (6) LANGUAGE — superfluous prose to tighten?

- **Redundant double-description.** The blurb ("Walk [data-countup] figures and tween textContent on the keyframes NumericAnimation engine." `manifest.ts:1088`) and the in-card paragraph (`countup.vue:25-34`) say the SAME thing twice on one screen. Collapse: keep the blurb terse, cut the in-card paragraph to ONE sentence or replace with a live caption.
- The in-card paragraph's "the engine owns the rAF loop, the composable owns the DOM write and the teardown" (`countup.vue:31-33`) is implementation trivia — superfluous for a demo viewer; move to a code-comment / tighten out.
- The script-top comment block (`countup.vue:2-4`) and the SUFFUSE2 comment (`countup.vue:42-44`) are fine as source docs (not rendered).

## (7) BUGS

- **No dead demo / no broken animation.** Run → figures tween 0→1280/98/4200 correctly; `tabular-nums` holds layout (no CLS). Animation is functional.
- **Latent: `settle`/`cancel` read as no-ops to a viewer** — not a code bug but a demo-clarity bug (two buttons with no visible distinct effect).
- No console errors observed during the Run cycle.

---

## Recommended transposition (BD)

1. Background → `aurora` (colorful field) in the manifest row; render the metric tiles over `tier="field"` so they float directly on the live aurora (glass reads).
2. Split into own glassy cards: a "controls" card (with an ease-mode `<SegmentedTabs>` or dock-facet switcher) + a "figures" card — each its own glass plate, bigger, using the vertical space.
3. Compose `<MetricCell>`/`<MetricStack>` instead of hand-rolled `glass-card` triplets; wire `data-countup` onto the shipped metric value slot.
4. Add a dock (`<DockStack mode="facets">`) switching ease presets / durations — the contextual-switching bar.
5. Auto-trigger on scroll-into-view (the real count-up use-case) + a replay button.
6. Cut the in-card paragraph to one line; let the live demo speak.
