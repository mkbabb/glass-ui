# D-previews-dockscroll — the `/substrates` previews + the dock-scroll audit

Scope: CONTEXT.md defects **#6 ("None of the previews in /substrates work")** and
**#12 ("Dock scrolling does not work")**. Verified against HEAD (`998136bb`, glass-ui
4.2.0) by reading the real source AND live-reproducing on the running demo
(`localhost:5173`, Chrome) with pixel readbacks + DOM geometry probes.

TL;DR of the live truth (the default-broken skepticism paid off the OTHER way for #6):
the procedural-viz components **render correctly** on a fresh hard-load when staged
above the fold (concentric paints warm-amber, blob paints its silhouette, dot-flow-field
paints 100% non-zero — all sized correctly). The user's "none of the previews work" is
**NOT** a viz-runtime breakage; it is (a) the `/substrates` **landing bento** showing
11 identical FROZEN aurora stills with zero live/per-viz preview, compounded by (b) the
routing freeze (D-routing) that strands stale pages so a SPA-navigated viz never mounts,
plus (c) a latent `content-visibility: auto` + `contain-intrinsic-size: auto none`
zero-collapse trap that every viz wrapper except Aurora carries. The dock-scroll defect
(#12) is a hard, reproduced, single-line decision-coupling regression from
BA.W-DOCK-GEOMETRY: a vertical rail caps at `--dock-max-block-size` UNCONDITIONALLY but
the scroll port is gated behind an opt-in `overflow="scroll"` the demo SidebarDock never
passes → capped + `contain: paint` clipped + `overflow-y: visible` → the bottom controls
are permanently unreachable.

---

## FINDINGS (file:line evidence + live reproduction)

### Part A — the `/substrates` previews (#6, #11)

#### A1 — every `/substrates` landing card renders the IDENTICAL frozen aurora still, not a live/per-viz preview

`demo/stories/SectionLanding.vue` dispatches the bento card preview off
`categorySpecimen(category.id).kind` (L49, L66-76, L124-198). The kind is resolved
**per-CATEGORY**, not per-story: `category-hero.ts:204` `categorySpecimen(id)` reads
`categoryHero(id)?.previewKind` and the `substrates` category's `previewKind` is the
single value `"field"` (`category-hero.ts:98`/`:154`). So every story in the substrates
category (concentric, blob, fourier-field, constellation, dot-flow-field, dot-matrix,
goo-dot, paper-grid, aurora, glass-material, glass-panel) renders the SAME
`specimen.kind === 'field'` branch — `fieldStill` (`SectionLanding.vue:66-76`), a
device-free `auroraFallbackGround(config, {grid:10})` raster baked to a `data:image/png`
URI and painted as a `background-image` on a `<div>` (L130-137).

**Live proof:** on `/substrates` I measured 11 `.section-preview-card-preview` nodes,
11 `.specimen-fill` children, **1** real `<canvas>` on the whole page (the shell field,
not a card), and all 11 card specimens carry `background-image: url("data:image/png;…")`
— i.e. 11 identical frozen aurora-field stills, zero live blob/constellation/fourier.
This is the literal user complaint: the substrates section advertises a dozen distinct
procedural viz and shows the same static smear on every card.

This is by design, recorded in the SectionLanding header comment as the "P10c W-CUT
GL-BUDGET" decision (L52-65): "a `/substrates` landing with 11 `field` cards mounts 11
GL-capable canvases … blowing the ~8 budget" → "MANDATES a one-GL-budget frozen still
per `previewKind`, NOT live GL." The budget fear is legitimate (11 live WebGL/WebGPU
contexts WOULD blow the per-page cap), but the chosen mitigation — collapse ALL
substrate cards to ONE category-generic frozen aurora — is the wrong cure: it deletes
the per-viz identity the section exists to showcase (defect #11: "live previews of REAL
components, not icons" — here it is worse than an icon, it is a misleading identical
smear).

#### A2 — the individual viz STORY pages DO render (the viz runtime is sound)

Default-broken skepticism, falsified by readback. On hard-load with the viz staged above
the fold:
- `/substrates/concentric`: `canvas.concentric-canvas` backing `1170×1254`, css `585×627`,
  pixel mean RGBA `[238,196,138,255]` — opaque warm-amber topography, painting.
- `/substrates/blob`: two `goo-blob-canvas`, backing `760×760` / `563×563`, 9% non-zero
  (the blob silhouette over transparent, alpha mean 22) — painting.
- `/substrates/dot-flow-field`: `dot-flow-field-canvas` backing `1019×460`, 100% non-zero
  — painting.

So `createGpuSubstrate` → `createCanvasLifecycle` → the GL/WGPU backends are fine when
the surface is laid out + in viewport at mount. The viz layer is NOT the breakage.

#### A3 — the LATENT zero-collapse trap: every viz wrapper except Aurora carries `contain-intrinsic-size: auto none`

`Aurora.vue:233-242` documents the trap precisely: a `content-visibility: auto` element
with a `none` block fallback "collapses to zero height while skipped … sizing the backing
buffer to a 1px sliver that stretches as a black band." Aurora's own fix is
`contain-intrinsic-size: auto 600px` (`Aurora.vue:245`). **Every other viz wrapper ships
the trap:**

- `concentric/Concentric.vue:131` — `contain-intrinsic-size: auto none`
- `dot-flow-field/DotFlowField.vue:103` — `auto none`
- `dot-matrix/DotMatrix.vue:103` — `auto none`
- `goo-dot-matrix/GooDotMatrix.vue:117` — `auto none`
- `goo-blob/GooBlob.vue:300` — `auto none`
- `paper-grid/PaperGrid.vue:127` — `auto none`
- `fourier-field/FourierField.vue:249` — `auto none`
- `constellation/Constellation.vue:83` — `auto none`

It does not fire in the demo today because each viz is staged as the hero/stage (above
the fold, laid out at mount). But it is live fragility: a below-the-fold viz, a Safari
content-skip (WebKit's CV support is weaker — the leaf's own comment at
`createCanvasLifecycle.ts:489-493` flags it), or a route that mounts a viz off-screen
will collapse the box → 1px backing → black band. The user reproduced "broken previews"
in a chaotic routing-frozen state where viz routinely mount/measure off-screen.

#### A4 — the leaf `dprPolicy` sizer (BD.W-SUBSTRATE-SIZE-UNIFY) was BUILT but ADOPTED BY ZERO consumer

`createCanvasLifecycle.ts:79-123` ships `sizeBacking()` — the ONE canonical gBCR-ancestor
sizer with the bounded walk, the never-300×150 floor, AND the leaf-owned RO + the
double-rAF re-measure (`presize()`, L458-485) + the CV/IO reveal re-measure. The whole
point (the file's G1/G2 headline) is that consumers stop self-measuring in N drifted
`resize()` closures. **`grep dprPolicy` across `src/components/custom/*/composables/`
returns ZERO hits; `grep composeIntersectionPark` across all of `src/components/custom/`
returns ZERO hits.** Every viz still self-measures the legacy way:
- `concentric/composables/concentricGLSetup.ts:108-119` — `resize()` reads
  `canvas.clientWidth || 320` / `clientHeight || 320` (the exact `clientWidth`-reads-0-
  under-CV-skip form the leaf comment at L60-77 condemns), with NO double-rAF/RO/gBCR
  defense in the closure.
- `aurora/composables/runtime.ts:283-318` — the ONLY robust self-measure (gBCR +
  parent-rect fallback + the L352-355 double-rAF defense). Aurora is the survivor.

So the library has TWO sizing realities: aurora's proven gBCR+double-rAF path, and every
other viz's naive `clientWidth || N` closure that the leaf's adoptable sizer was supposed
to replace. The `auto none` trap (A3) is dangerous precisely because the naive sizers
have no recovery. This is a DRY + robustness defect: the canonical sizer exists, unused.

#### A5 — the SectionPreviewCard chassis is sound; the breakage is the dispatch, not the card

`SectionPreviewCard.vue` is a clean `RouterLink` bento card with an `inert aria-hidden`
preview window (L90-97), a real `container-type: size` stage (L179), a φ-bound
`aspect-ratio`/`max-block-size` so the lead card cannot run away (L184-185 — addressing
defect #11's "huge empty thumbnail"), and a warm `--card-field-h` floor (L174-213). The
card is well-built; what it HOSTS is the problem (A1). The `#preview` slot is a
first-class seam — it can host a real bounded inert live render or a per-viz still; today
SectionLanding only ever feeds it the one frozen aurora `<div>`.

### Part B — the dock scroll (#12)

#### B1 — the SidebarDock caps height but does NOT scroll → bottom controls unreachable (REPRODUCED)

`demo/layout/SidebarDock.vue:246-252` mounts `<GlassDock orientation="vertical"
always-expanded class="demo-sidebar-dock min-h-0">` with **NO `overflow` prop** (default
`"grow"`). It renders the ℱ home + 9 category `DockIconButton`s + a trailing utility
section (dark-toggle, V↔H morph, config-gear) = 15 interactive controls.

**Live proof at 1280×600:**
- `.demo-sidebar-dock` rect `top 16 / bottom 496 / h 480`
- `max-block-size: 480px` (resolved from `--dock-max-block-size: min(80vh,48rem)` →
  80vh @ 600 = 480; `src/styles/tokens/offsets.css:42`)
- `scrollHeight 729` vs `clientHeight 477` → **content overflows by ~252px**
- `overflow-y: visible`, `overflow-x: visible`, `contain: content`
- `dock-scroll-y` class: **absent**
- controlCount 15

So the dock is height-capped at 480px, its content needs 729px, and it does NOT scroll —
`contain: content` clips the bottom ~5 controls (the entire trailing utility group: the
dark-mode toggle, the in-situ morph button, the configurator gear). Those controls are
**permanently unreachable** on any viewport short enough to hit the cap. Screenshot
`bg-sidebar-overflow-600h.jpeg` shows the rail cut off at the viewport bottom with the
trailing utilities gone. This is the literal "dock scrolling does not work."

#### B2 — the ROOT: BA.W-DOCK-GEOMETRY gated the scroll port behind opt-in, but kept the cap unconditional

The mechanism is a decision-coupling regression, fully documented in the source:
- `src/styles/dock/shell.css:275-291` — the base `.glass-dock.vertical` rule sets
  `max-block-size: var(--dock-max-block-size)` **UNCONDITIONALLY** (L291). Every vertical
  rail caps.
- `shell.css:205-208` — `.glass-dock.always-expanded:not([data-morphing]) { overflow:
  visible }`. So an always-expanded vertical dock is `overflow: visible` by default.
- `shell.css:222-243` — BA.W-DOCK-GEOMETRY (DC-1) **gated the at-rest scroll port behind
  the `dock-scroll-y` opt-in** (the `.glass-dock.vertical.dock-scroll-y.always-expanded`
  selector, L237-240, is the ONLY thing that sets `overflow-y: auto`). The comment's own
  rationale: a single-axis `overflow-y: auto` forces the cross axis `overflow-x` to
  compute to `auto` (CSS Overflow §3), clipping a control's inset plate left/right — so
  they made scroll opt-in to spare a fit-content shell the cross-axis clip.
- `useDockShellProps.ts:285-288` — `scrollClass` is `null` unless `props.overflow ===
  "scroll"`.

The fix for the cosmetic cross-axis clip (DC-1) **decoupled the cap from the scroll**:
the cap is structural (every vertical rail), the scroll is opt-in (only `overflow=
"scroll"`). A vertical rail that hits the cap but did not opt in = capped + clipped +
no-scroll = the unreachable-controls bug. The SidebarDock is exactly that dock, and the
demo never updated it to opt in. The cap-without-scroll is a footgun the library hands
every consumer building a vertical nav rail.

#### B3 — the contrast case: the BottomDock DOES opt in and DOES scroll

`demo/layout/BottomDock.vue:4` mounts `always-expanded fit-content overflow="scroll"` —
the horizontal `.dock-scroll-x` port (`overflow.css:33-51`). So the horizontal shell dock
scrolls correctly; only the vertical SidebarDock (which needs it MORE, being height-bound)
lacks it. This asymmetry confirms the root is a missing opt-in + a footgun default, not a
broken scroll recipe — the `.dock-scroll-x/y` recipes themselves are correct.

#### B4 — `overflow="scroll"` on `always-expanded` vertical IS wired (the fix path exists)

The `.glass-dock.vertical.dock-scroll-y.always-expanded:not([data-morphing])` selector
(`shell.css:237`) is present and correct: `overflow-x: visible; overflow-y: auto;
scrollbar-width: none; overscroll-behavior-y: contain`. So passing `overflow="scroll"` to
the SidebarDock would immediately make it scroll its overflow (cross-axis visible
preserved). The plumbing is ready; the consumer never reached for it AND the cap-default
leaves a clip-without-scroll hole for everyone who doesn't.

---

## ROOT CAUSES (gestalt, first-principles)

**RC-1 (previews) — the bento dispatches a CATEGORY-generic specimen, not a STORY-specific
preview.** `previewKind` is a property of the category, so a section of N distinct viz
collapses to one specimen. The one-GL-budget fear drove an over-correction (ALL substrate
cards → one frozen aurora still) that erased the per-viz identity. The right model:
per-STORY preview content, with a budget-correct strategy that still shows each viz's real
silhouette (a per-viz baked thumbnail, or ONE shared rotating live stage, or a real
bounded inert single-paint of each viz's distinctive frame) — never N identical stills.

**RC-2 (previews, robustness) — the canonical leaf sizer is built but unadopted, and every
non-aurora viz carries the `auto none` zero-collapse trap.** The library shipped
`sizeBacking` + the leaf RO/CV/IO re-measure + the double-rAF defense to END the drifted
self-measure closures, then adopted it in zero consumers. The `auto none` trap is the
companion fragility: aurora alone uses the non-zero block fallback its own comment
prescribes; the other 8 viz collapse to a 1px backing the instant they are content-skipped
(below-fold, Safari, route-mount-offscreen) — which is exactly the regime the routing
freeze creates. This is the "headless-green/visually-broken" gap: the gates pass (the viz
is laid out above-fold in the π capture) while a real navigated/scrolled session collapses
the buffer.

**RC-3 (dock scroll) — the cap and the scroll were DECOUPLED; the cap stayed unconditional,
the scroll became opt-in.** A vertical rail that overflows its cap is the COMMON case (a
nav column on a short viewport), yet the default leaves it capped + `contain`-clipped +
non-scrollable. The cosmetic cross-axis-clip fix (BA.W-DOCK-GEOMETRY) was correct in
intent but solved it by removing scroll from the default rather than removing the clip from
the scroll — inverting which case pays. First-principles: a capped axis MUST be a scroll
axis (you cannot cap content and then hide the overflow); "cap" and "scroll its own
overflow" are one decision, not two.

---

## PROPOSED WAVES

### BG.W-VIZ-PREVIEW-LIVE — per-story live (budget-bounded) previews on the section bento

- **Intent:** replace the 11-identical-frozen-aurora-stills landing with a real per-viz
  preview so `/substrates` shows what each viz IS (the literal #6 + #11 cure).
- **Approach (idiomatic, budget-correct):** make the preview content per-STORY, not
  per-category. Two clean tiers, no fork: (1) the DEFAULT is a per-viz baked thumbnail —
  the SAME `usePresetThumbnails`/capture-mode (`mode:"capture"` → `renderAt` → readback)
  the aurora studio already uses to bake dead-card-free preset thumbs; bake ONE
  representative frame per viz at build/first-idle, served as `background-image` (zero
  persistent context, per-viz identity restored). (2) the bento hosts ONE shared LIVE
  stage that the hovered/lead card adopts (a single live context obeying the one-GL-budget
  — the card under pointer gets the real animating viz, the rest show their baked thumb).
  Drive it off a per-story `previewSpec` on the manifest row (the story already owns its
  component), retiring the category-generic `categorySpecimen` smear for the substrates
  band. `SectionPreviewCard`'s `#preview` slot is already the seam — no card edit.
- **Files:** `demo/stories/category-hero.ts` (per-story `previewSpec` over the per-category
  `previewKind`), `demo/stories/SectionLanding.vue` (the per-viz dispatch + the shared
  hover-live stage), `demo/stories/manifest.ts` (the per-story preview descriptor), reuse
  `demo/stories/aurora/usePresetThumbnails.ts` (the capture-bake), `SectionPreviewCard.vue`
  (unchanged — host only).
- **Acceptance/π:** on `/substrates`, the 11 cards show 11 VISUALLY-DISTINCT previews
  (per-card pixel-hash differs); ≤1 live GL/WGPU context on the landing at any instant
  (count `getContext` calls); the hovered card animates; both modes. Folds #6 + #11.

### BG.W-VIZ-INTRINSIC-SIZE — kill the `auto none` zero-collapse trap across every viz wrapper

- **Intent:** the latent black-band-on-content-skip fragility (RC-2, A3) closed library-
  wide so a below-fold/Safari-skipped/route-offscreen viz never collapses its backing.
- **Approach:** mint ONE `--viz-intrinsic-block` token (default the aurora-proven
  `600px`, consumer-retunable) and re-point every viz wrapper's `contain-intrinsic-size`
  off `auto none` onto `auto var(--viz-intrinsic-block)` — the exact fix aurora already
  carries (`Aurora.vue:245`), generalized so the 8 trap-carrying wrappers inherit it.
  ONE token, no per-viz literal. (The CSS rule lives once; the wrappers read the token.)
- **Files:** `src/styles/tokens/*.css` (mint `--viz-intrinsic-block`), the 8 wrappers
  (`concentric/Concentric.vue:131`, `dot-flow-field/DotFlowField.vue:103`,
  `dot-matrix/DotMatrix.vue:103`, `goo-dot-matrix/GooDotMatrix.vue:117`,
  `goo-blob/GooBlob.vue:300`, `paper-grid/PaperGrid.vue:127`,
  `fourier-field/FourierField.vue:249`, `constellation/Constellation.vue:83`).
- **Acceptance/π:** mount each viz BELOW the fold, scroll it into view, assert backing ≠
  300×150 / ≠ 1px and non-zero painted pixels on reveal (the trap's exact failure mode);
  Chrome AND Safari (the WebKit-weak-CV path is where it bites). Folds the latent
  black-band class.

### BG.W-VIZ-SIZER-ADOPT — adopt the canonical leaf `sizeBacking` sizer; delete the drifted closures

- **Intent:** DRY the N drifted `clientWidth || 320` self-measure closures onto the ONE
  built-but-unused `sizeBacking` leaf sizer (RC-2, A4) + inherit the leaf RO/CV/IO
  re-measure + the double-rAF defense for free — so robustness is uniform, not aurora-only.
- **Approach:** thread `dprPolicy` (the per-viz DPR number — concentric/dot-* `resolveBudgetDpr`,
  aurora's 1.5× wash ceiling) into each `createGpuSubstrate(canvas, {dprPolicy, …})` call;
  shrink each `setupGL`/`setupWGPU` `resize(s?)` to upload-only (`gl.viewport(0,0,s.w,s.h)`)
  reading the leaf-handed `BackingSize`; opt the IO-park-less viz (concentric/fourier/
  dot-flow) into `composeIntersectionPark:true` (the leaf's offscreen-park, no per-viz
  `useIntersectionPause`). Delete the naive `clientWidth || N` blocks. NO leaf edit — the
  seam exists; this is pure adoption. Sequence AFTER BG.W-VIZ-INTRINSIC-SIZE (the sizer +
  the non-zero intrinsic block are the matched pair).
- **Files:** every viz `*GLSetup.ts`/`*WGPUSetup.ts`/`useMetaballRenderer.ts`/the
  `createGpuSubstrate` call sites in `concentric/composables/useConcentric.ts:177`, the
  dot-flow/dot-matrix/goo-dot/paper-grid/constellation/fourier renderers; aurora's
  `runtime.ts` adopts last (its gBCR closure is the reference the leaf encodes — fold it
  to `dprPolicy` so even the survivor stops self-measuring).
- **Acceptance/π:** zero `clientWidth ||`/`clientHeight ||` self-measure survives in viz
  `resize` closures (grep gate); the offscreen-park fires for concentric/fourier/dot-flow
  (the previously-park-less viz); per-viz backing matches gBCR×DPR on RO tick + on
  CV/IO reveal. DRY + robustness fold.

### BG.W-DOCK-CAP-SCROLLS — a capped dock axis is ALWAYS a scroll axis (the #12 root fix)

- **Intent:** the structural cure for "dock scrolling does not work" (RC-3, B1/B2): a
  vertical rail that hits `--dock-max-block-size` scrolls its overflow by construction —
  no opt-in, no unreachable controls.
- **Approach (first-principles — couple the cap to the scroll):** in `dock/shell.css`,
  make the at-rest vertical scroll port engage whenever the cap can bite, NOT only under
  the `dock-scroll-y` opt-in. The `.glass-dock.vertical:not([data-morphing])` rule that
  sets `max-block-size` ALSO sets `overflow-y: auto` (and keeps `overflow-x: visible`
  explicitly so the cross-axis-clip the DC-1 comment feared never fires — the explicit
  cross-axis `visible` IS the answer DC-1 missed: you pin it rather than removing the
  scroll). `overflow="scroll"` then becomes redundant for the vertical case (clean break —
  retire the vertical `dock-scroll-y` opt-in branch; the cap-implies-scroll is the
  default). The horizontal `overflow="scroll"`/`.dock-scroll-x` stays (a horizontal dock's
  width is content-driven, not capped — scroll there IS a real choice). Retire the demo
  patch route entirely: SidebarDock needs zero prop change once the default is correct.
- **Files:** `src/styles/dock/shell.css:205-243` (couple cap+scroll, pin cross-axis
  visible), `src/styles/dock/overflow.css:62-78` (retire the vertical `.dock-scroll-y`
  opt-in branch — folded into the default), `useDockShellProps.ts:285-288` (the vertical
  `scrollClass` arm retires; horizontal stays). `demo/layout/SidebarDock.vue` needs no
  edit (the default now scrolls). Note the `--dock-content-safe-inset` content-gutter
  (CONTEXT W-HIERARCHY2) is orthogonal — do not touch.
- **Acceptance/π:** at 1280×600 the SidebarDock's trailing utility controls (dark-toggle,
  morph, gear) are reachable via scroll (`scrollHeight > clientHeight` AND
  `overflow-y: auto` AND every control hittable after scroll); the cross-axis inset plate
  is NOT clipped (`overflow-x: computed visible`, a control's hover plate paints past the
  track — the DC-1 goal preserved); horizontal docks unchanged; both modes. Folds #12 +
  closes the cap-without-scroll footgun for every vertical-rail consumer.

### BG.W-DOCK-OVERFLOW-FADE — feather the dock scroll edge (the liquid-weight finish)

- **Intent:** the scroll port introduced by BG.W-DOCK-CAP-SCROLLS reads as a hard cut at
  the cap; the warm/weighty/liquid identity wants a feathered overflow edge (CONTEXT
  cardinal law: every overflow edge is a `FadingScroll`-grade fade).
- **Approach:** route the dock's at-rest vertical (and the horizontal `dock-scroll-x`)
  scroll port through the shipped `useFadingScroll`/`--fade-scroll-width` mask seam
  (`@mkbabb/glass-ui/fading-scroll`) — the scrollbar is already hidden, so the only edge
  cue today is the abrupt clip; the mask makes the over-cap content fade IN/OUT at the
  rounded pill edge (the dock already masks the scroll boundary with its radius — this
  adds the legibility feather on top). Compositor-only, PRM keeps the discrete edge. ONE
  primitive, no new recipe.
- **Files:** `src/styles/dock/overflow.css` + `shell.css` (apply the `--fade-scroll-width`
  mask on the vertical/horizontal scroll ports), reuse `custom/fading-scroll/`. Sequenced
  AFTER BG.W-DOCK-CAP-SCROLLS.
- **Acceptance/π:** the capped SidebarDock shows a feathered top/bottom edge while
  overflowing, sharp when it fits; both axes; PRM keeps the discrete overflow-edge
  presence. The liquid-weight finish on the dock-scroll.

---

## Cross-cuts / dependencies (named)

- **D-routing's `BG.W-ROUTE-TRANSITION`** is the precondition for the user perceiving the
  preview fixes: while the route freeze strands stale pages, a SPA-navigated viz never
  mounts regardless of preview quality. BG.W-VIZ-PREVIEW-LIVE is the bento fix; the
  navigated-page fix is D-routing's. They compose, not collide.
- **D-field-aurora's `BG.W-FIELD-AURORA`** mounts ONE shell-level Aurora as the universal
  page field. BG.W-VIZ-PREVIEW-LIVE's "one shared live hover-stage" budget MUST count that
  shell field as the route's one live context — coordinate the GL-budget accounting so the
  bento's live stage + the shell field stay within the per-route cap (the substrate routes
  opt OUT of the shell field per BG.W-FIELD-ACCENT-RECONCILE, which frees the budget for the
  per-viz stage).
- **The `--viz-intrinsic-block` token** (BG.W-VIZ-INTRINSIC-SIZE) and the **leaf sizer
  adoption** (BG.W-VIZ-SIZER-ADOPT) are the matched robustness pair — sequence INTRINSIC
  before ADOPT (a correct intrinsic block is the floor the sizer measures against).
- **No chronic deferred items folded here** beyond the latent `auto none` class and the
  cap-without-scroll footgun, both made structural by the waves above.
