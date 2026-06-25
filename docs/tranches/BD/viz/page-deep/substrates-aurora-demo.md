# Pass-E deep audit — `substrates/aurora`

- **Import:** `@mkbabb/glass-ui/aurora`
- **SFC:** `demo/stories/substrates/aurora.vue` → composes `VizStudio.vue` chassis
- **Live:** http://localhost:5173/substrates/aurora (spot-checked @ 1440×900)
- **Slot SFCs:** `AuroraStage.vue` · `AuroraConfigDock.vue` · `PresetPickerRow.vue` · `sections/Aurora{Color,Composition,Motion}Section.vue` · `config/{Composition,Flow,Nuclei,Texture}Layer.vue` · `usePresetThumbnails.ts`

---

## TL;DR severity ledger

| # | Sev | Finding |
|---|-----|---------|
| B1 | **BUG (high)** | Preset thumbnails are 13 DEAD skeletons — WebGPU capture bake aborts (`device not acquired`); no WebGL2 fallback. The "no dead cards" claim is FALSE live. |
| S1 | **Major** | Sub-sections are NOT "in their own glassy cards" — 7 transparent `ConfiguratorLayer`s in ONE scroll surface, divided by 1px hairlines only. |
| S2 | **Major** | Hero eats 810px before the studio; the "BIGGER main card" stage (704×700, 49% vw) starts mostly below the fold @ 900px. |
| S3 | **Major** | FOUR "Aurora" labels stack (hero `<h1>` + section `<h2>` + violet masthead `<span>` + controls `<p>`). |
| D1 | **Major** | The page composes ZERO dock APIs; the only 2 docks on screen are the app-shell nav chrome (`inArticle:false`). User asked to "leverage the dock APIs." |
| L1 | Minor | Blurb (75 words) restates the heading/label/masthead; superfluous prose to tighten. |
| W1 | Minor | 5 console warnings (2× `onInitError`-absent, `onScopeDispose` no-scope, Transition non-element root). |
| ✓ | OK | Path-label IS standardized: Fira-Code chip resolves `@mkbabb/glass-ui/aurora` from manifest L220. |
| ✓ | OK | Glass suffusion over a LIVE warm aurora field reads well; controls panel is true `glass-floating` (blur 13px / sat 1.18 / α0.84). |

---

## (1) DEMO CONGRUENCE — does it show aurora at its BEST + full API?

**Mostly YES on API breadth, but the showcase is undercut by a dead preset row + a buried stage.**

- The configurator is genuinely comprehensive (`AuroraConfigDock.vue`): Color (seed/harmony/energy + per-stop OKLCh editor + derive), Composition (medium/zones), Motion (drift/breath), Warp&Noise, Flow, Texture, Nuclei. Every axis is a live `ConfiguratorRow`; `useConfiguratorState<AuroraConfig>(cloneMode:"per-preset")` is the named-editable-baseline semantic (`aurora.vue:54-58`). The atom-over-baseline refine logic (`AuroraConfigDock.vue:117-146`) is careful. **This is the page's strongest asset.**
- The stage is interactive (`AuroraStage.vue:31-43` — drag-swirl + flick-burst + accel snap-back via `useCursorInteraction`). Good.
- **BUT — the preset thumbnails are dead (B1).** Live readback: `presetImgCount:0`, `skeletonCount:13`. Console: `[Aurora] thumbnail bake aborted: [useWebGPUCanvas] device not acquired`. The "REAL baked thumbnails (no dead cards)" claim (`aurora.vue:132-133`, `usePresetThumbnails.ts:84-89`) does NOT hold in this Chromium. Root cause: `createAurora(shared,…,{mode:"capture"})` (`usePresetThumbnails.ts:74`) arms `useGpuSubstrate` → `armAsync()` (L90) throws inside `buildContext` (WebGPU device unacquired). The sync `try` (L73-81) cannot catch the async throw; it lands on the outer `.catch` (L113), so every `thumbs[key]` stays `""` → `v-if="thumbs[key]"` is false → `<Skeleton>` forever (`PresetPickerRow.vue:88-100`). **No WebGL2-fallback retry exists for capture mode.** This is the dead-card defect the T2 comment claims to have killed, re-surfacing through the WebGPU path. The 11-preset row (Sky/Dawn/… visible as label-only gray cards) is the single richest "contextual switching" affordance on the page and it's non-functional here.

**Contextual switching / animation:** preset cycling works via ArrowLeft/Right shortcuts + `cyclePreset` (`aurora.vue:73-87`) and the field re-paints live; but the *visual* preset picker (the thumbnails) is dead, so the switching reads as flat gray buttons, not the animated baked-preview gallery the design intends.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Moderate.** The page DOES compose a real series: `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow`, `ColorSwatch`, `LabeledField/Select/Slider`, `ToggleGroup`, `SortableList`, `FadingScroll`, `Skeleton`, `Button`, `Aurora`. That's a genuine composition, not a one-component page.

But the user's specific ask — "docks / procedural-anims / cards / tabs / buttons" — is **partially unmet**:
- **Docks: ABSENT (D1).** Live: the 2 `.glass-dock` nodes are app-shell nav (`inArticle:false`). The page leverages none of the dock contextual-switching/morph APIs. An aurora *studio* is a natural home for a `<DockStack mode="facets">` medium/preset switcher or a `DockLayerGroup` over the control sections — none is used.
- **Tabs: ABSENT.** The medium/zones/arrangement axes are selects + toggle-groups; no `SegmentedTabs` anywhere (the Color→Composition→Motion stack is a vertical collapsible list, a natural `SegmentedTabs variant="underline"` candidate for the right-rail register).
- **Cards: the sub-sections are NOT carded (S1, see §4).**
- Buttons + procedural-anim (Aurora) + ColorSwatch: present and good.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**YES — this is the page's best-realized axis.** The controls panel is a true six-layer glass plate (`backdrop-filter: blur(13px) saturate(1.18)`, `oklab(0.798…/0.84)` glass-floating tint) floating over the live warm-coral/amber/pink aurora field that fills the 704×700 stage. The morphism reads. The masthead violet is the one color text-event. Warm-cream Dawn is the default lead (`initialPreset:"OPENAI_DAWN"`, `aurora.vue:57`) — no teal-navy.

Gaps:
- **PAPER morphism: absent.** Apt here? Marginal — a substrate/GL page is glass-forward by design, so this is acceptable, not a defect.
- The glass-over-aurora only happens in ONE place (the controls panel over the stage). The preset cards (top) are opaque `bg-card` over the page wash, NOT over the live field — they read as flat gray slabs (compounded by B1's dead thumbnails). Suffusing the preset row over a sliver of live field would lift it.

## (4) STRUCTURE — own glassy cards? main card BIG enough?

**Both sub-asks FAIL.**

- **"Each sub-section in its OWN glassy card" — NO (S1).** Live readback of the 7 `ConfiguratorLayer` sections: `bg: rgba(0,0,0,0)`, `backdrop: none`, `radius: 0px`, separated by a single `border-bottom:1px` hairline. They are a flat divided list inside ONE scroll surface (`AuroraConfigDock.vue:241-276`), not individual glass cards. The user's bar ("each sub-section in its own glassy card") is unmet — these want to be discrete `glass-quiet`/`glass-resting` rounded plates with their own breathing room.
- **"Main card BIGGER / more screen space" — NO (S2).** The hero consumes 810px of vertical space before the studio (`studioTopWithinArticle:810`): a `text-display-hero` "Aurora" `<h1>` + eyebrow + 75-word blurb + a `text-display-3` violet "Aurora Studio" masthead + a `text-subheading` "Aurora" section head all stack first. The stage canvas is 704×700 (49% vw, 78% vh) and starts at y≈850 — **entirely below the fold** at 900px. The configurator height envelope is `h-[min(78vh,720px)]` (`VizStudio.vue:81`), reasonable on its own, but the masthead tower pushes it off-screen. To give the stage "more screen space": collapse the redundant hero (S3), drop the masthead, and let the studio claim the first viewport.

## (5) PATH-LABEL — standardized?

**YES — correct.** The Fira-Code chip resolves `@mkbabb/glass-ui/aurora` (live readback, `fontFamily:"Fira Code"`), driven from `manifest.ts:220` `"substrates/aurora": "@mkbabb/glass-ui/aurora"` via `StoryHeader.vue:77-88`. This is the standardized chassis chip; no per-page divergence. No action.

## (6) LANGUAGE — superfluous prose?

- **L1 — the blurb is bloated + redundant.** `aurora.vue:112` is a 75-word blurb that restates the `label` ("procedural painterly gradients · multi-nuclei · four mediums", `aurora.vue:111`) AND the heading AND the masthead, then re-narrates the interaction hints that ALSO appear as the `hintText` aside (`aurora.vue:96-100, 164-166`) AND in the stage overlay ("drag to swirl", `AuroraStage.vue:61`). The phrase "The configurator on the RIGHT drives EVERY axis" + "The warm-cream Dawn identity is the default lead; the blue Sky is a named non-default preset" is internal-rationale prose leaking into user-facing copy. Tighten to ~1 sentence; the interaction hints belong ONLY in the aside.
- The SFC comments are heavy with tranche-tag archaeology (BC.W-VIZ-CONFIGURATOR-SUITE, BB.W-SUFFUSE3, etc.) — fine for source, but the trailing `Shipped /aurora.` in the live blurb (`aurora.vue:112`) is dev-speak that should not render to users.
- The controls-panel sub-header `Aurora studio` + `{n} stops · {m} nuclei` (`AuroraConfigDock.vue:203-206`) duplicates the masthead name (S3); the name is superfluous there — the count line is the useful part.

## (7) BUGS

- **B1 (high) — dead preset thumbnails** (detailed in §1). 13 skeletons, `device not acquired` abort, no WebGL2 capture fallback. The contextual-switch gallery is visually non-functional.
- **W1 (minor) — console warnings (5):**
  - `useAurora: deferred init armed with no onInitError handler` ×2 — the live stage AND the bake arm aurora with no error handler; a shader/OOM failure surfaces as an unhandled rejection. Wire `runtimeOptions.onInitError`.
  - `onScopeDispose() called when there is no active effect scope` — likely the thumbnail bake's `setTimeout`-deferred `createAurora` disposing outside a scope.
  - `[Vue warn] Component inside <Transition> renders non-element root node` (TooltipProvider) — a route-transition wrapper warning.
- No JS errors (0). The aurora field paints and animates correctly.

---

## Recommendation (gestalt, architectural — no patches)

1. **Kill the heading tower (S3+S2+L1).** ONE name: keep the page hero `<h1>` "Aurora"; DELETE the violet `Aurora Studio` masthead and the controls `<p>Aurora studio</p>` (keep the count line). Collapse the blurb to one sentence; move interaction hints to the aside only. This reclaims the first viewport for the stage — directly serving "BIGGER main card."
2. **Card the sub-sections (S1).** Re-skin the 7 `ConfiguratorLayer`s as discrete `glass-quiet` rounded plates (own radius + hairline rim + breathing gap), OR — better, and serving the dock ask — host the Color→Composition→Motion→… switch on a right-rail `DockStack`/`DockLayerGroup` so section switching is the animated contextual-switch affordance the design system advertises (D1).
3. **Fix the dead thumbnails (B1):** capture-mode `createAurora` must fall back to WebGL2 (or the luminance-faithful CSS ground) when WebGPU `armAsync` throws — never leave all `thumbs` empty. Then suffuse the preset row over a live-field sliver so the gallery reads as glass, not gray.
4. **Leverage one procedural-anim contextual surface** (a medium switcher that morphs the field) to make the page "deftly use a series of components" incl. docks/tabs.
