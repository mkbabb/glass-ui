# Pass-E SYNTHESIS — `substrates/aurora` (the binding per-page verdict)

**Page:** `demo/stories/substrates/aurora.vue` → `VizStudio` chassis → `<Configurator asideSide="right">` + `AuroraStage` + `AuroraConfigDock` + `PresetPickerRow`.
**Import label:** `@mkbabb/glass-ui/aurora` (standardized — see §PASS).
**Synthesizes:** `substrates-aurora-{demo,design,component}.md`.

---

## Verdict in one breath

The aurora COMPONENT is excellent and essentially done — every genuine component finding is already a scoped BD band-3 wave (the WGSL CURL/STROKES parity tail + the Metal-GPU parity proof + the deferred FBO ceiling). The DEMO PAGE is the opposite: a competent admin-inspector that undersells a bespoke, premium live field. The demo+design lenses converge hard on the SAME five structural defects, and four of them are the EXACT systemic pattern the dock-GESTALT already named — the `W-STORY-PAGE-STANDARD` (glassy sub-cards + bigger stage + protagonist) + `W-PAGE-BACKGROUND` (colorful field reaches the whole studio) Band-16 work. The fifth (dead preset thumbnails) is a genuine NEW src bug with no existing home. The page needs **several more loops** — it converges only AFTER Band-16 lands and re-audits.

---

## Reconciled findings (deduped across the 3 lenses, ranked by impact)

The demo lens (B1/S1/S2/S3/D1/L1) and the design lens (triple-name / dead-cards / backdrop-reach / flat-tiles / no-dock-APIs / static-chrome / paper-absent / copy) describe the SAME page from two angles. Reconciled and impact-ranked:

| Rank | Finding (merged) | demo | design | component |
|---|---|---|---|---|
| **1** | **Dead preset thumbnails** — 13 skeletons; WebGPU `armAsync` throws `device not acquired` inside `buildContext`; the sync `try` can't catch the async throw; no WebGL2/CSS-ground fallback for capture mode. The richest contextual-switch affordance reads as flat gray. **REGRESSION** — the "no dead cards" SFC claim is FALSE live. | B1 (high) | §8 | — (not a component-API gap; a demo bake-path bug) |
| **2** | **Sub-sections are NOT each in their own glass card** — 7 transparent `ConfiguratorLayer`s in ONE scroll surface, 1px hairlines, `radius:0`, `bg:transparent`. The user's headline ask, unmet. Wants `glass-quiet` tiles stepping DOWN from the `glass-floating` frame (the DESIGN.md 7-tier elevation ladder + iOS-27 Control-Center idiom). | S1 (major) | §4 + move 3 | — |
| **3** | **The heading tower / triple-name** — hero `<h1>` "Aurora" (244px) + violet `text-display-3` "Aurora Studio" masthead + `<h2>` "Aurora" section head + controls `<p>Aurora studio</p>` all stamp the same word. The eye lands nowhere; the hero eats 810px so the stage starts below the fold @900px. Blocks "main card BIGGER." | S2+S3 | §1 + move 1 | — |
| **4** | **Backdrop reach is half-delivered** — aurora pixels live only in the LEFT 703px stage; the right 360px controls column + below-frame prose float over DEAD warm page, so the controls glass has nothing to refract and collapses to generic warm-gray template chrome (the W54 "blur imperceptible over flat substrate" fact biting live). Defeats "glass demos over COLORFUL aurora backgrounds." | §3 + §2 | §2 + §7 + move 4 | §6 (confirms: demo-side concern, not component) |
| **5** | **Zero dock/tab APIs for content** — the only docks on screen are app-shell nav chrome (`inArticle:false`). An aurora studio is the natural home for a `<DockLayerGroup>`/`<DockStack mode="facets">`/`<SegmentedTabs>` section switcher; the 7-collapsible scroll is a height-toggle, not the liquid contextual morph the design system advertises. | D1 + §2 | §3 + move 5 | — |
| 6 | **Chrome entrance is static** — the stage + tiles + preset row don't build in (`.scroll-cascade`/`.scroll-build` shipped, unconsumed); the masthead has no W-HIERARCHY2 GRAVITY fade-rise; Reset is a plain ghost (no `useSpringPress`). The substrate is iOS-27-alive, the interface around it is a quiet form. | (implicit) | §3 + move 6 | §1 (component entrance IS right — this is the chrome) |
| 7 | **PAPER register absent** — the trailing hint `<p>`s are bare muted afterthoughts; a procedural page is a natural home for a `paper-grain-overlay` captioned notes tile with a `border-l-[3px]` accent rail (the math-paper gold standard), closing the page GLASS+PAPER both. | §3 | §5 + move 7 | — |
| 8 | **Superfluous copy + chip echo** — the blurb is a 75–90-word wall restating heading/label/masthead + narrating interaction-hints that ALSO live in the aside AND the stage overlay; implementation narration ("RIGHT", "default lead", "named non-default", trailing "Shipped /aurora.") leaks into user copy. Tighten to ONE editorial line; the hints belong only in the aside. | L1 | §9 + move 8 | — |
| — | **Console warnings (5)** — 2× `onInitError`-absent, `onScopeDispose` no-scope (thumbnail bake's deferred `createAurora`), Transition non-element root. Wire `runtimeOptions.onInitError`. | W1 (minor) | — | — |
| ✓ | **Path-label standardized** — the Fira-Code chip resolves `@mkbabb/glass-ui/aurora` from `manifest.ts:220` via `StoryHeader`. No per-page divergence. **No action** (drop only the prose "Shipped /aurora." echo under #8). | ✓ | §9 | — |
| ✓ | **Component is excellent** — entrance/pointer-reactivity/demand-gate all idiomatic; offscreen-pause, lazy-arm, PRM, software-raster guard, dual-substrate all KEEP. Only genuine gaps are the WGSL parity tail. | — | — | §1–§5 (all PASS/scoped) |

### Conflicts resolved

- **No real conflicts** between lenses — they agree on every defect; the design lens adds the elevation-ladder framing and the entrance/paper/copy polish, the demo lens adds the dead-thumbnail root-cause and the API-absence census, the component lens confirms the colorful-backdrop + dead-card are DEMO-side (not component) and that the component's open work is solely the WGSL tail.
- **One framing reconcile (heading tower):** demo says "kill the masthead, keep hero `<h1>`"; design floats "OR overlay the title lockup INTO the stage so the field IS the masthead." **Resolution:** the iOS-27 content-forward move (overlay the lockup into the stage, shrink the standalone hero to a thin chrome line) is the stronger answer AND it directly serves "main card BIGGER" — but it is a `W-STORY-PAGE-STANDARD` chassis decision (the StoryPage hero/StorySection relationship), not an aurora-local patch. Book the in-stage-lockup as the target; the floor is the masthead+`<h2>` suppression. Both routed to W-STORY-PAGE-STANDARD §hierarchy.
- **Component lens "no new wave" vs demo/design "big refactor needed":** not a conflict — they scope DIFFERENT layers. The component (`src/components/custom/aurora/`) needs no new wave; the demo PAGE (`demo/stories/substrates/aurora.vue` + the VizStudio chassis) is where findings 1–8 live, all zero-or-near-zero `src/` paint.

---

## Tranche actions (per finding — FOLD / MODIFY / AUGMENT / PRUNE / NEW)

| # | Finding | Action | Target wave |
|---|---|---|---|
| 1 | Dead preset thumbnails (regression) | **NEW** | **BD.W-PRESET-THUMB-FALLBACK** (Band 16, new — real gate below). The ONLY genuine net-new wave this page surfaces. |
| 2 | Each sub-section in its own glass card | **FOLD** | **W-STORY-PAGE-STANDARD** §`<DemoSpecimen>`/glassy-sub-card invariant + the `glass-floating`→`glass-quiet` tier-step. The aurora studio is a `<DemoStage>` (full-bleed live field) hosting a `<DemoInteraction>` controls column of glassy tiles. This page is the canonical exemplar — record it as the studio reference. |
| 3 | Heading tower / triple-name / bigger stage | **FOLD** | **W-STORY-PAGE-STANDARD** §hierarchy (the W-HIERARCHY2 cluster + D1-4 suppression generalized: the descriptor shows ONCE; the studio claims the first viewport). Target = in-stage lockup; floor = masthead+`<h2>` suppression. |
| 4 | Backdrop reach (controls over dead page) | **FOLD** | **W-PAGE-BACKGROUND** (the dock-GESTALT systemic — the colorful field must reach UNDER the WHOLE studio, stage + controls + notes, so the controls glass refracts color). Aurora is the strongest demonstration case; enroll its studio frame in the background-reach π. |
| 5 | Zero dock/tab APIs for content | **FOLD** | **W-STORY-PAGE-STANDARD** §drive-the-APIs (the dock-GESTALT "the contextual-switching APIs not exercised" arm). Replace the 7-collapsible scroll with `<DockLayerGroup>`/`<SegmentedTabs variant="pill">` glass section switching → liquid morph, shorter column, animated state. |
| 6 | Static chrome entrance | **FOLD** | **W-LIQUID-ENTRANCE-GENERAL** (the drafted Band-17 squish/morph/fade generalization) + W-STORY-PAGE-STANDARD's glassy-sub-card `.scroll-cascade` entrance binding. The stage/tiles/preset-row/masthead build in; Reset routes `useSpringPress`. |
| 7 | PAPER register absent (notes tile) | **AUGMENT** | **W-STORY-PAGE-STANDARD** — extend the demo sub-type taxonomy with a captioned `paper-grain-overlay` notes tile (the math-paper register) so the page closes GLASS+PAPER both. A taxonomy addition, not a new wave. |
| 8 | Superfluous copy + chip echo | **FOLD** | **W-STORY-PAGE-STANDARD** §copy-discipline (one editorial blurb line; hints only in the aside; drop "Shipped /aurora."). A conformity invariant of the standardized page, not a per-page edit. |
| W1 | Console warnings | **AUGMENT** | Fold into **BD.W-PRESET-THUMB-FALLBACK** as a rider — wire `runtimeOptions.onInitError` on the live stage + bake arm, and dispose the bake's `createAurora` inside a scope (kills the `onScopeDispose` warning). The Transition non-element-root is a separate chassis-wide note (W-STORY-PAGE-STANDARD root-element discipline). |
| C1–C4 | WGSL curl / strokes / Metal-parity / FBO ceiling | **FOLD (no-op — already scoped)** | **BD.W-AURORA-WGSL-CURL** · **BD.W-AURORA-WGSL-STROKES** · **BD.W-VIZ-PARITY-METAL** · **BD.W-AURORA-KUWAHARA-MULTIPASS** (all exist). The `pointermove` `{passive:true}` hygiene is a 1-line rider on WGSL-CURL. **No change to these waves.** |
| — | Component KEEP set | **PRUNE (nothing)** | No PRUNE this page — every component asset is load-bearing; no superfluous src to cut. The only "cut" is demo COPY (#8), routed above. |

### The one NEW wave (real gate sketch)

**BD.W-PRESET-THUMB-FALLBACK** (Band 16, demo-private + the capture-path src seam):
- **Root cause (verified live):** `createAurora(shared,…,{mode:"capture"})` (`usePresetThumbnails.ts:74`) arms `useGpuSubstrate` → `armAsync()` throws (`[useWebGPUCanvas] device not acquired`) inside `buildContext`; the sync `try` (L73-81) cannot catch the async rejection; it lands on the outer `.catch` (L113) so every `thumbs[key]` stays `""` → `v-if="thumbs[key]"` false → `<Skeleton>` forever (`PresetPickerRow.vue:88-100`). No WebGL2/CSS-ground retry for capture mode.
- **Fix (idiomatic, no workaround):** capture-mode bake must fall back — on `armAsync` reject, retry the bake via the WebGL2 substrate, and if THAT fails, paint the **`auroraFallbackGround` luminance-faithful CSS raster** (`auroraFallbackGround.ts` already ships, W-AURORA-SWRASTER) so every preset shows a real field preview. NEVER leave all `thumbs` empty. Wire `onInitError` (kills W1).
- **Gate (born-RED on HEAD's all-empty state):** `proof:preset-thumb-fallback` — (a) every enrolled preset key resolves a NON-empty thumbnail source after the bake settles (the capture path produces a paint, WebGPU OR WebGL2 OR the CSS ground); (b) the async-reject path is caught (an `armAsync` throw routes to the fallback, not the dead outer-catch) — a self-test bite plants a forced-WebGPU-reject and asserts a non-empty thumbnail still lands; (c) `onInitError` is wired on the bake arm. + the binding π: `/substrates/aurora` shows ZERO `<Skeleton>` preset wells, real previews, both modes (the dead-card the SFC comment claims to have killed, actually killed).
- **Paint:** takes a `proof:ba-gestalt` `substrates-band` (or the aurora roster row) verdict on a FRESH capture (the BC anti-disease law — no source-green close; the thumbnails are a visible surface).

---

## Convergence call

**~45% — NOT close; needs SEVERAL more loops.**

- **Component layer: converged (~90%).** No new wave; the WGSL parity tail (CURL/STROKES), the Metal-GPU proof (PARITY-METAL), and the deferred FBO ceiling (KUWAHARA-MULTIPASS) are the right and sufficient targets, all already scoped. The `{passive:true}` rider is the only net-new component touch. This layer does not need another audit loop.
- **Demo/design layer: ~30%.** Five structural defects (dead thumbnails, flat tiles, heading tower, dead-page backdrop, zero dock APIs) all open. Four FOLD into the systemic Band-16 chassis (`W-STORY-PAGE-STANDARD` + `W-PAGE-BACKGROUND`) the dock-GESTALT already named — so this page does NOT get a bespoke redesign wave; it gets RE-AUDITED after the chassis lands. One genuine NEW wave (PRESET-THUMB-FALLBACK).
- **Loop plan:** loop 1 = `W-PRESET-THUMB-FALLBACK` (the standalone bug, prototype-able now) + author/land `W-STORY-PAGE-STANDARD` + `W-PAGE-BACKGROUND` as the systemic chassis; loop 2 = aurora adopts the chassis (glassy tiles, dock-switcher, bigger stage, backdrop-reach, paper notes, tight copy) + `W-LIQUID-ENTRANCE-GENERAL` chrome entrance; loop 3 = re-audit on a fresh capture → target HIGH convergence. The aurora page is the **canonical studio exemplar** for the chassis — get it right here and the other 10 substrate pages inherit.
