# Dock-hallmark gap audit — is the BD dock spec flagship-grade end-to-end?

**Scope.** Audits the BD union dock band against the user edict "the dock should be our HALLMARK" + the iOS-27 north star (`/tmp/vid-frames/{dockcrop,tabstrip,tabs}/`). Waves audited: the spine (BF.W-DOCK-INTEGRATE · BF.W-SILHOUETTE-REALIZE · BE.W-DOCK-FISSION · BF.W-FISSION-FILAMENT · BF.W-TAB-IOS-CAPSULE · BF.W-LIQUID-GROW-ON-EVENT) + the BD `[NEW]` rows (DOCK-CONSTELLATION · DOCK-SUBDOCK · DOCK-GOO-SPACING · DOCK-LINK-API · SCROLL-MINIMIZE · TABS-LIQUID) + the band-3/4 fidelity siblings (RAIL-FIDELITY · DEEP-GLASS-WIRE · SCROLL-FLUIDITY · ICON-PRESENCE · LAYER-IN-LIQUID · JUBILANCE-WIRE).

## VERDICT (headline)

**The spec is hallmark-grade on the STILL silhouette + the choreography MECHANISMS, but has 7 real gaps for a flagship dock — 3 of them protagonist-grade.** The constellation (home·pill·search three-island + recessed satellite), the fission/sub-dock/goo-spacing/link-facade/scroll-minimize/liquid-tab machinery, and the Safari-first discipline are all genuinely captured and architecturally sound (compose-the-spine, one-scalar, presets-in-consumers). What's MISSING is the connective tissue that makes the videos read as ONE living organism rather than N independently-correct facilities: the **inter-state transition choreography is under-specified** (each wave proves its OWN steady state; no wave owns the nav↔media↔split↔search→sub-dock transition SEQUENCE as a single read), the **album-art protagonist field that fills the frame** is half-specified (the pill drinks the hue but the dock never reads as floating over the album-art aurora at flagship scale), and there is **no hero capture/showcase wave** that proves the whole dock organism on the reference album-art page.

Frame evidence (verified): `dockcrop/d001` + `tabstrip/s040` are the definitive constellation read — a barely-visible recessed home disc, a deep-glass stadium pill with the embedded album chip + title + pause, a crisp live search circle, even gutters, all floating over a vivid full-bleed album-art card. `dockcrop/d015` is the mid-scroll-minimize condense. The spec covers the END STATES of these; it under-covers the LIVE FEEL between them.

---

## GAP 1 (PROTAGONIST) — no wave owns the dock-as-ONE-organism TRANSITION SEQUENCE; the silhouette states are proven in isolation

**The defect.** The videos read as ONE dock that FLOWS between contexts: nav-bar → docks-the-now-playing-pill (`bar+pill` meld) → carves transport (`split`) → re-seats as the persistent bottom sub-dock → minimizes on scroll → blooms a search field. The spec has a wave for each NODE — W-SILHOUETTE-REALIZE (the `bar`/`bar+pill`/`split`/`search` descriptor + `--dock-silhouette-fuse-t` meld), W-DOCK-CONSTELLATION (the `bar+pill` resting paint), W-DOCK-SUBDOCK (the `split`→persistent terminus), W-SCROLL-MINIMIZE (the collapse), W-DOCK-LINK-API (the verbs) — but **NO wave owns the SEQUENCE as a single binding read**. Each π captures its own state-pair; none captures `nav → media → split → sub-dock → minimize` as one continuous organism the user watches.

**Why it falls short of the videos.** The reference is not a set of poses — it's a continuous morph where the SAME glass mass re-flows. W-SILHOUETTE-REALIZE owns the FLIP engine and `setSilhouette`, but its π proves `bar → bar+pill` meld in isolation; W-DOCK-SUBDOCK proves `split → re-seat` in isolation. The HAND-OFF between them (the `bar+pill` pill that SUBDOCK carves into the sub-dock; the `media→split` from-only controls SILHOUETTE-REALIZE detaches that SUBDOCK then persists) is described prose-only across three wave files, with the ownership fences (CONSTELLATION-consumes-never-rewires, SUBDOCK-extends-FISSION) carefully drawn — but no gate or π asserts the **end-to-end sequence reads coherently**. The "ONE living organism on ONE orchestrator" charter point (SEED §2/§12) is asserted as a fence, never as a captured TRUTH.

**The miss.** A flagship dock needs a **W-DOCK-SEQUENCE** (or a hero arm on W-DOCK-LINK-API / the gestalt roster) that drives the full context cycle on ONE surface and captures the frame-series — proving the glass mass is CONTINUOUS across every transition (no flash, no re-mount, the `--dock-silhouette-fuse-t`/`--dock-split-t`/`--dock-morph-t` scalars compose without fighting). Today the closest is the `dock-link` gestalt row ("the dock LINKS as ONE coherent organism") but its verbs are tested independently, not as a sequence.

**Recommendation.** Add a sequence-capture arm: either a new thin W-DOCK-SEQUENCE (gestalt-roster-only, no new src — it composes the shipped verbs on `<DockNowPlaying>` and captures `nav→media→split→subdock→minimize→search` as one frame-series + a both-mode gestalt verdict) OR fold it into W-REFLECT's dock close as a mandatory full-cycle capture. This is the single most-important hallmark gap.

---

## GAP 2 (PROTAGONIST) — the dock-over-album-art-aurora protagonist field is half-specified; the dock never reads as floating ON the album at flagship scale

**The defect.** In every reference frame the dock floats over a VIVID full-bleed album-art card whose color saturates the whole region (the red Daphnis card, the purple Ravel card). The dock's glass is translucent ONTO that field — the album color bleeds THROUGH the pill (the `surface="clear"` contract) AND the ambient aurora re-derives off the album's dominant hue (W-AUR-ALBUM + W-AMBIENT-TINT). The spec ships:
- W-DOCK-NOWPLAYING-PILL → the pill PLATE drinks the album hue (`--glass-fill-tint` off `--glass-ambient-hue`). GOOD.
- W-AUR-ALBUM → `deriveAuroraPalette` album-protagonist field, presets-in-consumers (demo DockStage wires it). GOOD as a demo seam.
- W-DOCK-GOO-SPACING small-vs-large flip → the satellites adapt over the bright album backdrop. GOOD.

**Why it falls short.** Two seams are under-built. **(a)** The CONSTELLATION/SUBDOCK/SCROLL-MINIMIZE π surfaces all say "over `<DockStage>`'s live album aurora" but `<DockStage>` (per CLAUDE.md) is ONE shared offscreen-paused aurora behind a COLUMN of dock demos — a generic warm aurora, NOT the album-art-protagonist field per-dock. The album-reactive aurora is wired ONLY on `dock-nowplaying.vue`'s pill (GAP: the constellation/sub-dock gestalt rows capture over a generic aurora, not the album-protagonist field the videos show). **(b)** There is no wave asserting the dock reads as floating ON a real album-art CARD at flagship scale — the reference is a dock pinned over a SCROLLING grid of album cards (`tabstrip/s048`), the dock's backdrop CHANGING as different cards scroll under it (`useGlassBackdropLuminance` LIVE-tracking the album behind). The `useGlassBackdropLuminance` dynamic sampler exists (CLAUDE.md, dock-default-on), but no BD dock wave wires the now-playing dock to RE-DERIVE its tint as the album-art grid scrolls beneath it — the "dock drinks whatever album is behind it RIGHT NOW" live read.

**The miss.** The flagship demo surface should be the reference itself: a scrolling album-art grid with the now-playing constellation pinned over it, the pill + aurora tint LIVE-tracking the dominant card behind the dock as the grid scrolls. That's the V1/V2 read. The spec has every PRIMITIVE (clear surface, ambient-tint, backdrop-luminance sampler, scroll-minimize) but no wave COMPOSES them into the live album-tracking flagship surface.

**Recommendation.** Add a flagship surface wave (W-DOCK-ALBUM-STAGE or extend W-DEMO-BREADTH) that builds the scrolling-album-grid demo page, wires the dock's `useGlassBackdropLuminance` to the grid (live re-tint as cards scroll under), and makes IT the constellation/sub-dock/scroll-minimize gestalt-capture surface — so the dock is captured over the actual album-art protagonist field, not a generic DockStage aurora.

---

## GAP 3 (PROTAGONIST) — the search-satellite → search-FIELD bloom is named in the silhouette descriptor but has no BUILD wave

**The defect.** The silhouette state machine speaks `bar | bar+pill | split | search` (BF.W-SILHOUETTE-REALIZE) and CONSTELLATION's fence mentions "a transition to `search` (the field morph) re-flows the SAME three islands." But the `search` silhouette — the search satellite blooming into a full search field/sheet (the iOS-27 move where tapping search expands the circle into a search bar that takes the dock width) — has **no dedicated BUILD wave**. W-SILHOUETTE-REALIZE's mechanism section wires `nav`/`media`/`split` descriptors explicitly; `search` appears in the union type but its descriptor + the bloom-to-field paint is never built. W-DOCK-LINK-API's `toSurface` verb COULD bloom a search surface from the search-control rect, but no wave composes it INTO the search satellite as the `search` silhouette terminus.

**Why it falls short.** The search satellite is one of the THREE islands the videos show as live (`dockcrop/d001` — the search circle is a full live affordance, distinct from the recessed home). A flagship dock's search circle must DO something — bloom into a field. The spec builds the resting search circle (CONSTELLATION) but not its action.

**The miss / recommendation.** Either (a) build the `search` descriptor explicitly in W-SILHOUETTE-REALIZE's wiring (the search satellite → search-field bloom via `toSurface`, the field re-flowing the constellation), or (b) add a thin W-DOCK-SEARCH-FIELD wave composing `useDockLink.toSurface` from the search satellite. Without it the search island is a dead circle — a hallmark dock's third island never acts.

---

## GAP 4 — the constellation `cqi`-width + the satellite-merge are spec'd as STATIC layout; the videos show the pill width DYNAMIC

**The defect.** W-DOCK-CONSTELLATION fixes the pill at `--dock-constellation-pill-width: 70cqi` (≈70% of the dock container). But in the references the pill width is CONTENT-DRIVEN and DYNAMIC — it grows for a long track title, shrinks toward the satellites when collapsed, and the satellites goo-MERGE toward the pill within the threshold (W-DOCK-GOO-SPACING C3 says the satellites within the gutter "goo-blend toward the pill"). The spec asserts the merge-THRESHOLD token (GOO-SPACING) and the static `cqi` width (CONSTELLATION) but does NOT wire the pill width to the now-playing CONTENT (the `<ScrollingText>` title length) nor animate the satellite↔pill goo-merge as a LIVE read. CONSTELLATION C6 explicitly forbids animated width ("a static reserved layout"), and the satellite goo-blend toward the pill is asserted as a static getImageData scan in the GOO-SPACING π, not a live morph.

**Why it falls short.** This is partly correct (compositor-safe, no animated width is the right call) but the videos DO show the pill as a content-sized capsule, not a fixed 70% block. A long title scrolls (`<ScrollingText>`) rather than widening — so the fixed `cqi` is defensible. The real miss is subtler: the satellite-to-pill goo-MERGE (the GlassEffectContainer blend) is the SIGNATURE liquid-glass read, and it's only proven as a static threshold scan, never as a LIVE merge animation when the constellation re-flows.

**The miss / recommendation.** Confirm the static `cqi` width is the intended call (it likely is — content scrolls, not widens) and RECORD that decision in CONSTELLATION's fences. Strengthen the GOO-SPACING π to capture the satellite→pill goo-merge as a LIVE frame-series during a silhouette re-flow (when the constellation transitions, do the satellites visibly blend into the pill?), not just a static within/beyond-threshold scan.

---

## GAP 5 — no specular/lensing/depth fidelity wave OWNS the dock's protagonist refraction read

**The defect.** The references show the pill as THICK refractive liquid glass — a visible specular catch-light sweep, edge lensing, the deep-glass diffusion. The spec wires `.glass-deep` onto the pill (CONSTELLATION composes it; W-DEEP-GLASS-WIRE re-measures the 18-20px ceiling) and the dock controls carry `v-specular` (the tier-root auto-arm, shipped). But there's no BD wave that OWNS the pill's protagonist refraction as a captured fidelity read — the deep-glass blur, the edge-lens (W-LENSING `.glass-lens`), the pointer-following specular sweep on the pill, the rim glint — composed and proven AS the now-playing pill's signature material. W-DEEP-GLASS-WIRE composes `--glass-depth` onto "HERO liquid surfaces" generically; W-LENS-SAFARI/W-LENS-PRISM are band-7 card-band concerns. The pill's specific refraction read is assumed, not owned.

**Why it falls short.** The pill is THE hallmark surface — its glass must read as the richest in the library. The spec lays the primitives but never makes the pill the binding showcase of deep-glass + lensing + specular at once.

**The miss / recommendation.** Ensure W-DEEP-GLASS-WIRE (or CONSTELLATION's π) explicitly captures the pill's deep-glass + lens + specular sweep as a protagonist fidelity read — the pill reads as the deepest, most-refractive glass surface in the library. Recommend an explicit "the pill is the deep-glass+lens protagonist" gestalt clause.

---

## GAP 6 — the play↔pause transport is the ONLY live control specified; the videos imply scrub + a richer transport

**The defect.** W-DOCK-NOWPLAYING-PILL builds the play↔pause SF-symbol morph (good — compositor clip-path crossfade). But the reference now-playing module is the entry point to a richer transport (scrub, next/prev on expand, the bloom-to-fullscreen card W-DOCK-INTEGRATE mentions via `ExpandableContainer`). The spec covers play↔pause + the marquee title + the bloom-to-fullscreen HOOK, but the transport itself is minimal. For a flagship now-playing dock this is thin.

**Why it falls short / recommendation.** This is a lower-priority gap (the play↔pause + bloom-to-fullscreen is a defensible MVP, and richer transport is presets-in-consumers). RECORD it as a deliberate scope boundary: the library ships the play↔pause morph + the marquee + the bloom hook; the full transport (scrub/next/prev) is the consumer's content in the bloomed card. If a richer FLOOR is wanted, name a W-NOWPLAYING-TRANSPORT successor — but it's defensibly out-of-scope.

---

## GAP 7 — the recessed-home register is a `--glass-level` re-point only; the videos show it nearly INVISIBLE (a ghost), risking an under-shoot

**The defect.** W-DOCK-CONSTELLATION recesses the home satellite via `--glass-level: 0.7` + a `28%`-transparent glyph. But in the high-res reference (`tabstrip/s040`) the home disc is MUCH more recessed than 0.7 — it's a barely-perceptible ghost outline, the satellite almost dissolving into the album backdrop. The `0.7` level + `28%` dim may under-shoot the "ghost-satellite" read the SEED names. The C3 gate asserts `--glass-level < 1` (any recession passes) and the π asserts "quieter than the pill" — neither asserts the GHOST DEPTH the reference shows.

**Why it falls short / recommendation.** The recessed default may need to go deeper (a lower `--glass-level`, a dimmer glyph) to match the near-invisible reference ghost. RECOMMEND: re-calibrate the recessed-home default against `tabstrip/s040` at build time, and strengthen the CONSTELLATION π to assert a MINIMUM recession depth (the home disc's composited contrast against the album backdrop is below a ghost threshold), not merely "quieter than the search satellite."

---

## What the spec gets RIGHT (the hallmark-grade core)

- **The constellation silhouette** (home·pill·search three-island, stadium pill, perfect-circle satellites, even gutter, recessed home register) — matches the reference read precisely; C1-C6 + the π are well-targeted.
- **The fission→sub-dock→re-seat** persistent-terminus law (iOS-26 `.tabViewBottomAccessory`) — genuinely architectural, one-spring-fenced, the SUBDOCK/FISSION-FILAMENT partition clean.
- **The `--dock-goo-spacing` merge-threshold** (GlassEffectContainer analogue) + the small-vs-large adaptivity flip (Apple HIG) — correctly token-first, reads the shipped seams, no second observer.
- **The `useDockLink` verb facade** — the KISS one-facade-per-facility realization; the defineExpose-trap + reka-internal-selector-trap fences are exactly right (MEMORY-grounded).
- **The 5-phase liquid-tab** (grow→overshoot→travel→settle→shrink) — the user-verbatim envelope, composed on the shipped `useLiquidFlex`, one-clock, anti-taffy capped.
- **Scroll-minimize** (directional `.onScrollDown`) + the mutual-exclusivity guard with `condenseOnScroll` — the disjoint-axis discipline is precise.
- **Safari-first throughout** — every dock wave names the WebKit path (regular `filter: url()` sRGB for goo, own-blur for deep-glass, no `backdrop-filter: url()`), enrolls the webkit project, records the degrade fall.

---

## Priority recommendations (ranked)

1. **GAP 1 — add a W-DOCK-SEQUENCE hero-capture** proving the full nav→media→split→subdock→minimize→search organism as ONE continuous frame-series. The single biggest hallmark gap.
2. **GAP 2 — build the live album-art-protagonist flagship surface** (scrolling album grid + the dock live-tracking the album behind it via `useGlassBackdropLuminance`); make it the dock-band capture surface, not a generic DockStage aurora.
3. **GAP 3 — build the `search` silhouette terminus** (search satellite → search-field bloom); the third island must act.
4. **GAP 5/7 — own the pill's deep-glass+lens+specular protagonist fidelity + re-calibrate the ghost-home depth** against `tabstrip/s040`.
5. **GAP 4/6 — record the static-`cqi`-width + minimal-transport scope decisions** explicitly; strengthen the satellite→pill live-merge π.
