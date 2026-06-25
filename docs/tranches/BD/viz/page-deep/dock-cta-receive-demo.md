# Pass-E META-STORYBOOK DEMO audit — `dock/cta-receive`

- **Page**: `dock/cta-receive` · import `@mkbabb/glass-ui/dock`
- **SFC**: `demo/stories/dock/cta-receive.vue`
- **Live**: http://localhost:5173/dock/cta-receive (spot-checked, Chrome MCP, light mode, ~1357px main)
- **Component**: `useDockCtaReceive` (BB.B2 W-DOCKMORPH-CTA) + `setPending`/`clearPending` seat (BC.W-AX-DOCK-CTA-SEAT)
- **North star**: DESIGN.md (iOS-26/27 Liquid Glass) · motion-canon · design-idioms · the dock APIs

---

## VERDICT SUMMARY

This is the WORST kind of demo: a feature page where the **headline feature is dead on the live page**. The CTA→dock morph — the entire reason this story exists — does not fire, and the seat-reserve mechanism (`setPending`) is a silent no-op. Beyond the P0 bug, the page is structurally thin (one section, one card, ~209px of live demo on a 598px stage), the glass floats over a near-flat pale wash rather than a colorful aurora, and the prose is a wall of internal-jargon. It demos a single forward-morph and exercises almost none of the dock's contextual-switching / morph / silhouette APIs.

---

## (P0) BUGS — the demo is DEAD live

### BUG-1 — the CTA→dock morph never fires; `received` never flips (the demo's whole point)
Live evidence (Chrome MCP, fresh nav, PRM=false):
- Click "Add to dock" (both synthetic `.click()` AND a real DevTools click on uid): across 5 rAF frames the CTA `<button>` receives **zero** inline `transform`/`opacity`/`filter` writes (`{op:"",tf:"",fl:""}` every frame).
- After 800–900ms: **no hand-off** — "Replay" never appears, "Add to dock" stays mounted, the target never gains `.cta-receive-target--lit`. `received` never becomes `true`.

Root cause (file:line): the morph leaf writes to the WRONG object.
- `cta-receive.vue:22-23` — `const ctaRef = useTemplateRef<HTMLElement>("ctaEl")` / `targetRef = useTemplateRef<HTMLElement>("targetEl")`.
- `cta-receive.vue:104-113` — `ref="ctaEl"` is bound on a `<Button>` **component**; `cta-receive.vue:134-141` — `ref="targetEl"` on a `<DockIconButton>` **component**.
- Both `Button.vue` and `DockIconButton.vue` render via reka-ui `Primitive` with **no `defineExpose` of a root `$el`**, so `useTemplateRef` resolves to the **component public instance**, not the `<button>` element.
- `useDockCtaReceive.ts:222` `el.getBoundingClientRect()`, `:280` `morph.apply(el, …)`, `:283/:287` `el.style.opacity/filter`, `:185` `target.setAttribute("data-cta-pending")` then all operate on a component instance that has no `.style`/`.getBoundingClientRect`/`.setAttribute` — they silently no-op (or throw into the void). The live `<button>` is never touched.

This is the [glass-ui binding verification] memory class verbatim: a stale/mismatched binding that vue-tsc + units do not catch and only e2e surfaces. The `tests-visual/dockmorph-cta.spec.ts` arm queries `.cta-receive-vehicle` + asserts the dock-ROOT width is stable (the no-box-jump witness, `:59/:106`) — it never asserts the CTA's own inline `transform`/`opacity` fires, so the gate is GREEN over a broken demo.

### BUG-2 — the landing SEAT (`setPending`) is a dead no-op
- `cta-receive.vue:45-47` — `onMounted(() => setPending())`.
- Live: the target dock control has **no** `data-cta-pending` attribute, `min-inline-size: auto`, `min-block-size: auto`, opacity 1. The "dim ghost + reserved footprint" the prose (`:80-86`) and the page-1 paragraph promise **never renders**.
- Same root cause as BUG-1 (`options.dockControl.value` is the component instance; `useDockCtaReceive.ts:184-185` `target.setAttribute` no-ops). Because `pending` stays false, the "Reveal seat now" button (`:119-126`, `v-if="pending && !received"`) **never mounts** either — a second advertised interaction that is invisible live.

**Net**: of the three interactive paths the SFC scripts (morph, manual seat-reveal, replay), **zero** are reachable live. The page is a static paragraph + a static dock.

> FIX DIRECTION (architectural, not a workaround): expose the root element from `Button.vue`/`DockIconButton.vue` (a `defineExpose({ $el })` or a forwarded `el` ref via reka's `forwardRef`/`useForwardExpose`), OR have the demo bind raw element refs through a passthrough wrapper. The same latent issue likely affects `motion/reveal.vue` (identical `<Button ref="triggerRef">` → `ref<HTMLElement>` pattern, `reveal.vue:31-34/84`) — sweep all `useLiquidReveal`/`useDockCtaReceive`/`ElementMorph` consumers. This is a library-seam fix, not a per-demo patch.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**No.** Even if the morph worked, the page exercises a SLIVER of the surface:
- `useDockCtaReceive` API: `receive` ✓ (wired, broken), `reset` ✓ (replay), `setPending`/`clearPending`/`pending` ✓ (wired, broken). The `preset` axis is hardcoded `"snappy"` (`:33`) — the `"bouncy"` register (`DockCtaReceivePreset`, `useDockCtaReceive.ts:63`) is never shown; no toggle to compare the two spring registers. `blur` is left default — no control to see the congest-blur vary. `onReceived` shown once.
- The **dock APIs the North Star asks for are absent**: this is a `dock/` page that does NOT demo contextual switching, `DockLayerGroup`/`DockLayer`, the V↔H morph, `<DockStack>` rail/facets, `<DockSection>`, collapse/expand, density/cockpit presets, or the silhouette/shape axes. The dock here is a static `always-expanded` 4-icon strip (`:129-142`) that exists only as a landing target. Contrast `dock/overview.vue` (9 sections exercising select/dropdown/popover/slider-hold/wrap/grid/pause-toggle).
- The morph is shown in ONE direction with ONE preset and ONE target. No A/B of snappy vs bouncy, no multiple targets, no "morph back out" inverse.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin/flat.** Live DOM: `sectionsOnPage: 1`, `cardsOnPage: 1`. The component inventory is: `Button` ×2, `GlassDock` ×1, `DockIconButton` ×4, raw `<p>`/`<code>`. No Tabs, no Card family, no procedural-anim, no contextual dock chrome, no second register. The North Star ("each page deftly uses a SERIES of glass-ui components — docks/procedural-anims/cards/tabs/buttons") is not met — the page is a paragraph and a static dock.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**Weak.** `DockStage` (`:76`) does stage a real shared `<Aurora>` (canvas 1629×896, painting — sampled mean RGB 228/189/163, maxChroma 117). BUT at the `DockStage` default `opacityCeiling: 0.42` + `DEFAULT_AURORA_CONFIG`, the field reads as a faint warm cream-peach wash, not the "COLORFUL aurora" the user asks for — the glass-over-color morphism barely reads. The glass dock has so little behind it (a 209px tile of pale wash) that the six-layer optical composite (blur/saturate/rim/catch-light) has nothing colorful to refract. No PAPER morphism anywhere (apt here — a "received" acknowledgement could use the paper-ink-mark or a paper card for the prose). Recommend: a richer, more saturated aurora config (or a viz behind the dock) and a lower opacity ceiling so the colour reads THROUGH the glass.

## (4) STRUCTURE — own glassy cards + BIG main area?

**Fails both asks.**
- "Each sub-section in its OWN glassy card": there is only ONE section and ONE card — but it is NOT a glassy card, it is a transparent `.dock-stage-tile` (`:100-101`, `bg: transparent`, hairline border only). The descriptive prose sits OUTSIDE any card (bare `<p>` on the page, `:78-98`). There are no sub-sections to card-separate; the page needs to be broken into multiple glassy cards (e.g. "the morph", "snappy vs bouncy", "the seat reserve", "manual reveal", "PRM behaviour").
- "Main card area BIGGER": measured `stageH: 598` but the live demo tile is only `tileH: 209` with `stageEmptyBelowTile: 107` of dead space and a long paragraph eating the top. The actual interactive surface is small relative to the screen. The dock + CTA should occupy a large, generous staging area.

## (5) PATH-LABEL standardization

**Pass.** The chip renders `@mkbabb/glass-ui/dock` (live `uid=1_9`), centralized in `manifest.ts:282`. No change needed. (Internal SFC imports use `../../../src/...` relative paths, which is the demo convention — fine.)

## (6) LANGUAGE — superfluous prose to tighten

**Heavy.** The page is over-written with internal tranche jargon aimed at maintainers, not demo readers:
- `cta-receive.vue:78-98` — the body paragraph is ~9 lines naming `setPending()`, `[data-cta-pending]`, `useDockCtaReceive`, `ElementMorph`, "the iOS bloom-from-source inverse", "a consuming seam beside the dock morph mechanism", "compositor-only". This is implementation-diary prose. Cut to 2 sentences: what it does + what to click.
- `:145-149` footer caption repeats "ONE kf spring substrate, ONE family with useLiquidReveal" — internal provenance, drop.
- The hero blurb (live) likewise reads "composes the same element-morph substrate useLiquidReveal activates, beside the dock morph mechanism" — substrate-genealogy, not a user benefit.
- SFC comment headers (`:1-10`, `:40-44`, `:64-66`) are fine (maintainer-facing) but the on-screen copy must be tightened to plain language.

## (7) Other observations
- **App-shell dock overlap**: live there are 3 `.glass-dock` nodes — the demo's own (w321 top739) plus the global app-shell nav docks (w59 h124 top16; w197 top442). On the full-page capture the bottom app-shell dock visually crowds the demo dock. Not this page's bug, but the staging should account for it (the demo dock sits low, near the shell chrome).
- The `.cta-receive-target--lit` style (`:169-175`) reads `--dock-selected-accent` which is correct token usage — but it never engages because `received` never flips (BUG-1).
