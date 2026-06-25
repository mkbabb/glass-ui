# Pass-E META-STORYBOOK DEMO audit — `dock/morph-showcase`

- **Import:** `@mkbabb/glass-ui/dock`
- **SFC:** `demo/stories/dock/morph-showcase.vue`
- **Live:** http://localhost:5173/dock/morph-showcase (verified 5173; 5199 down)
- **Component under demo:** the V↔H dock morph (`GlassDock` + `useDockOrientationMorph` + the SVG-goo teardrop bridge + `startViewTransition` crossfade)

Live spot-checks captured (1440×900, light mode):
- stage rect 1006×352; dock rect 243×55 → **dock fills 3.8% of the stage** (≈97% empty aurora).
- `.glass-dock` computed: `backdrop-filter: blur(9px)`, bg `srgb …/0.443`, border `…/0.04`, inner catch-light `rgba(255,255,255,.3) 0 1px 0 inset` — the six-layer composite IS present.
- liquid-preview at `t=0.5`: **both docks `opacity:0`**, only the goo bridge plate visible → reads as a small **dark blob**, not a glass teardrop. Icons fully vanish at midpoint.
- one StorySection, one stage div, one control row — `storySectionCount: 1`.
- console: 2 warns (Transition non-element-root from `TooltipProvider`; `useAurora` deferred-init no `onInitError`). Non-fatal.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial — under-exercised, and the headline preview reads poorly.**

- The page demos exactly ONE behavior: the orientation flip. It does NOT exercise the contextual-switching / layering / silhouette dock APIs the BD north-star calls out (`DockLayerGroup`, `DockSection`, `DockStack` facet carousel, `useContextualDockLayers`, the collapse/expand morph, `keepDockOpen`, density/cockpit presets). A "morph showcase" that only morphs orientation leaves the dock's richest APIs unseen.
- The shipped default (VT crossfade) is correct + smooth, but as a *visual demo* it is a plain dissolve between two near-identical pills — low spectacle.
- The perf-gated "Liquid teardrop" preview — the actual money-shot the prose promises ("amorphous metaball teardrop of glass") — at the occluded midpoint paints a **small dark opaque blob** (both real docks at `opacity:0`, only the goo `feColorMatrix`-thresholded plate showing). It does not read as *glass* (no blur/saturate/rim/catch-light on the bridge plate), and it is small (the V/H spans collapse toward a ~60px waist). The single most-promised frame is the weakest frame. `morph-showcase.vue:79-81` gates the goo to t∈(0.18,0.82); `:291`/`:311` drive `verticalOpacity`/`horizontalOpacity` that both reach 0 mid-cross.
- The icon set is the same 5 placeholder nav glyphs in both docks with no active state, no tooltips engaged, no press demo — the docks are inert chrome, not "deftly composed."

## (2) COMPONENT ABILITY — deft series of glass-ui components, or thin/flat?

**Thin.** The page composes `GlassDock` + `DockIconButton` + `Button` + `Switch` + `Label` + `DockStage`. That is a control row plus one dock. There are **no cards, no tabs, no procedural-anim variety, no second dock pattern, no layer group**. For a flagship "showcase" the BD ask ("each page deftly uses a series of components — docks/procedural-anims/cards/tabs/buttons") is not met — it is one dock and a toggle.

## (3) GLASS SUFFUSION — live colorful field?

**Yes for the field, weak for the read.** `DockStage` stages the dock over ONE shared live `<Aurora>` (`DockStage.vue:50`, `DEFAULT_AURORA_CONFIG`, `opacityCeiling:0.42`) and threads the canvas to the luminance observer — architecturally correct, one GL context per route. BUT:
- The default aurora is the **calm warm wash** — low spatial frequency, so `blur(9px)` has almost nothing to bend; the glass reads as a faint ghost pill (see capture: the dock nearly disappears into the orange). The morphism does not *pop*. The page would benefit from a more **colorful / higher-contrast aurora preset** (the demo is literally about glass-over-aurora; the field should be vivid, per the BD "COLORFUL aurora backgrounds" bar).
- **No PAPER morphism** anywhere — apt here would be a paper-grain or blueprint-grid framing of the prose/controls to contrast the glass dock against, but the controls sit on the bare stage.

## (4) STRUCTURE — own glassy cards? big enough main area?

**Fails the BD structure ask.**
- There is **ONE** sub-section and it is NOT in its own glassy card — the StorySection's prose + controls + stage all share the single page glass card (`StoryHero`), then the stage is a transparent `rounded-card` over aurora (`morph-showcase.vue:189-193`, `background: transparent` at `:339`). The "each sub-section in its OWN glassy card" mandate is unmet (there is effectively one section, undivided).
- The **main card area is large but mostly empty**: stage 1006×352, dock 3.8% fill. "Bigger main card area" is satisfied dimensionally but wasted — a huge field hosting a tiny pill. The dock should be scaled up (cockpit/`--dock-local-scale`) or the stage should host MULTIPLE specimens (a vertical + horizontal + layer dock side-by-side) so the space earns its size.

## (5) PATH-LABEL — `@mkbabb/glass-ui/dock`

**Correct + standardized.** Manifest `SUBPATH_MAP["dock/morph-showcase"] = "@mkbabb/glass-ui/dock"` (`manifest.ts:280`); the live Fira-Code chip renders `@mkbabb/glass-ui/dock`. No action.

## (6) LANGUAGE — superfluous prose to tighten

**Yes — heavy.** Two dense `<p>` blocks (`morph-showcase.vue:145-164`) re-explain the §7 perf-fork, the p50 numbers, the "binding platform limit," and the "booked to a successor" provenance — this is *internal tranche rationale leaking into the demo*. A storybook reader does not need "it clears the 60fps frame budget under a 4× CPU throttle" or "the teardrop fidelity is booked to a successor." Tighten to: what the morph does + how to drive it (button + teardrop toggle). The manifest blurb (`manifest.ts:914`) is also long and engineering-voiced.

## (7) BUGS

- **B1 (visual, headline):** liquid-teardrop midpoint = small dark opaque blob, both docks `opacity:0` at t=0.5 (`:291`,`:311`). The promised glass teardrop is the worst frame; the bridge plate is not glass-styled. — *real defect.*
- **B2 (warn):** `useAurora: deferred init armed with no onInitError handler` (DockStage's `<Aurora>` passes no `onInitError`). A WebGL failure surfaces as an unhandled rejection. — *robustness gap.*
- **B3 (warn):** `<Transition> renders non-element root node` from `TooltipProvider` under `StoryPage` — page-chassis-wide, not local, but present on this route.
- **B4 (waste):** 3.8% dock fill of a 352px stage — not a crash, but the demo reads as broken-empty (a tiny dock in a void) on first paint.

---

## Recommendations (architectural, no workarounds)

1. **Compose a SERIES**: stage 2-3 dock specimens over the aurora — the V↔H morph PLUS a `DockLayerGroup` contextual-switch dock PLUS a `DockStack` facet rail — each in its OWN glassy `<ShowcaseFrame tier="field">` card, so the page exercises the contextual/layer/silhouette APIs and fills the main area.
2. **Vivid field**: swap `DEFAULT_AURORA_CONFIG` for a saturated/high-contrast aurora preset so the glass morphism actually reads (glass-over-colorful is the whole point).
3. **Fix the teardrop midpoint**: keep the merging docks at a floor opacity (or style the bridge plate AS glass — blur+saturate+rim) so the headline frame reads as a glass teardrop, not a dark dot.
4. **Scale the dock** (`--dock-local-scale` / cockpit preset) so it is a hero, not a 3.8% pill.
5. **Cut the perf-rationale prose** to one tight sentence; move the §7 detail to the SFC comment only.
6. Pass `onInitError` to the DockStage aurora (B2).
