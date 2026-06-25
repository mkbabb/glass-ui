# Pass-E deep audit — motion/scroll-choreography (the underlying component)

**Page:** `/motion/scroll-choreography` · `demo/stories/motion/scroll-choreography.vue`
**Underlying src "component":** there is NO Vue/composable component — the register is a pure-CSS choreography stylesheet `src/styles/scroll-choreography.css` (BB.W-SCROLL-MOTION) layered after `src/styles/scroll-driven.css`, with tokens in `src/styles/tokens/scroll-tokens.css`. The only JS the page touches is the feature-detect leaf `src/composables/motion/supportsCssTimeline.ts` (badge gating only). The register is CONSUMED chassis-wide by `demo/stories/StoryPage.vue` (`.scroll-build` on the `<article>`, `.scroll-cascade` on the section wrap) and by `demo/layout/AppShell.vue` `<main class="… smooth-scroll …">`.

This is correct architecture: the choreography is a native-substrate CSS register (scroll()/view()/timeline-scope), NO Lenis/GSAP/Locomotive JS dependency — the no-net-dep fence is binding and HELD. The audit is therefore of the CSS register + its consume seams, not a component.

---

## 1 · ANIMATION affordance

**Strong overall.** The register honours motion-canon end-to-end:
- `.scroll-build` (mount entrance) — coupled transform+opacity on the `--spring-snappy` settle clock + matching `--spring-snappy-duration` (0.34s, P2/P4), hero beat on no-overshoot `--ease-out` (audacious type arrives with gravity, P1/P3), per-beat stagger via `--scroll-build-step * --i` keyframe-delay (NO setTimeout — never races AppShell scroll-to-top). VERIFIED tokens resolve (`scheme-motion.css:237/260`).
- `.scroll-cascade` (per-child `view(block)` timeline, implicit stagger, `linear` map — correct for a scrubbed timeline). Keyed off the real `<main>` scroller (`overflow-y-auto`, AppShell:265) so `view(block)` resolves against the genuine scroll-port.
- `.scroll-pin` two-phase (reveal 0–45% / settle 45–90%) bound to a named `--gl-pin` scroll-timeline via `timeline-scope` — the fixed-stage-advances-time model, compositor channels only.
- PRM: the whole register sits under `@media (prefers-reduced-motion: no-preference)`; `.scroll-build` carries an EXPLICIT P6 reduce-arm (fade-keeps, transform-drops). Exemplary.

**FINDING A1 (MODIFY) — DEAD column-stagger variant.** `.scroll-cascade--columns` documents a per-child `--col` index driving even/odd opposite-direction rise offset by `--scroll-cascade-column-stagger`, but the `animation-range` calc HARDCODES the index: `... + var(--scroll-cascade-column-stagger, 60ms) * 0` (`scroll-choreography.css:195`). The `* 0` zeroes the stagger term; `--col` is NEVER read anywhere in src/ or demo/ (grep-confirmed — only the comment mentions it). The even/odd direction flip works, but the *staggered* offset the doc promises is dead. Either wire `* var(--col, 0)` or PRUNE the stagger sub-claim. This is a shipped-but-inert sub-feature (the L14 no-op class).

**FINDING A2 (AUGMENT) — `.scroll-pin-phase-settle` has no enter.** The settle phase keyframe (`gl-pin-settle`) runs 45→90% but starts at `opacity:1 scale(1)` with no reveal window of its own; the paragraph it decorates is visible from frame 0 (it only inherits the cascade build, not a pin-phase entrance). Minor — the pinned showcase reads as ONE revealing card + a paragraph that drifts, not a true two-beat phased sequence. The DESIGN.md/Codrops "reveal → expand → settle" three-phase arc is only two phases here (`--scroll-pin-phase-expand-end` token exists at 90% but no expand keyframe binds the gap). AUGMENT to a genuine 3-phase arc on the existing tokens.

---

## 2 · PROCEDURAL VIZ

**N/A to the component** — scroll-choreography is a CSS-timeline register, not a GPU viz. BUT the user's brief ("glass demos over COLORFUL aurora backgrounds") names a real gap at the PAGE level: this motion page renders its cascade/pin cards over a FLAT page substrate (the section cascade cards are `glass-card` over the StoryHero card, no live field). The motion band's manifest default is `constellation` (manifest CATEGORY_DEFAULT_BG), but scroll-choreography's own background is not aurora — so the glass cards here demo glass over a static plate, not over the colorful procedural field the user wants. See Finding I3.

---

## 3 · PERFORMANCE

**Excellent — compositor-only by construction.** Every `@keyframes` step + the cascade/pin timelines animate ONLY `transform`/`scale`/`opacity` (the proof:no-layout-animation floor, BB.W-CARD-COMPOSITE). NO height/padding/inline-size/top/grid-template anywhere. `view()`/`scroll()` run off-main-thread at 60fps on a supporting engine.

**FINDING P1 (note, KEEP) — `.scroll-pin` reserves `320vh`.** The temporal container is `block-size: 320vh` (scroll-tokens.css:48). Correct by design (the tall scroll-distance for the pin) but it triples the page height on this one route — fine for a showcase, noted for the gestalt-roster capture so a reviewer expects the long scroll. No thrash; the sticky stage is GPU-promoted.

**No layout thrash, no rAF, no offscreen-pause concern** (there is no canvas/loop here; offscreen-pause is the procedural-suite's concern, not this register's).

---

## 4 · SAFARI compatibility

**The hard risk for this register.** `scroll()`/`view()`/`animation-range` shipped in Safari 26 (2026); `timeline-scope` is the NEWEST primitive and is the LEAST-supported. The register is correctly defensive:
- `.scroll-cascade` is under `@supports ((animation-timeline: view()) and (animation-range: entry))` → a gap engine gets the terminal static layout (NOT a broken hidden section). GOOD.
- `.scroll-pin` is under `@supports (animation-timeline: scroll()) and (timeline-scope: --gl-pin)` → a Safari that has `scroll()` but not `timeline-scope` falls to a correct static non-pinned read. GOOD.
- `.scroll-build` is mount-driven (plain `@keyframes`, NO timeline) → runs on EVERY engine incl. older Safari. GOOD.

**FINDING S1 (note) — verify the live Safari fallback paint.** The `@supports (timeline-scope: --gl-pin)` probe is the right gate, but the static-fallback read (a plain sticky element showing its terminal phase) has NOT been captured on real Safari in this tranche — the binding π for this page rides W-REFLECT3/the gestalt roster and the roster does NOT yet enroll motion/scroll-choreography (grep-confirmed absent). The Safari-static-read is a paper claim until captured. Enroll it (Finding I4).

---

## 5 · IDIOMATIC / no-legacy / six-layer composite

**Idiomatic, no dual-path, no Lenis workaround** — the register is the SOTA native-first answer, single-writer, READS the spring tokens (never re-tunes them — the W-GLASS-CAL fence held). The `supportsCssTimeline` negative-probe harden is the correct happy-dom defense.

**FINDING I1 (PRUNE) — superfluous language.** The CSS header + the .vue script are heavy with prose ("the SOTA scroll-driven CHOREOGRAPHY register", "the award-winners hand-roll these on Lenis+GSAP", "the exemplary outer-gate", "the §Triumvirate support-matrix trigger"). The user's "tighten superfluous language" bar applies. Trim the file-header novella to the four-recipe table + the discipline one-liner; keep the load-bearing fence notes.

**FINDING I2 (six-layer composite — AUGMENT at the page, not the register).** The choreography cards are bare `glass-card rounded-card` (story:104,136). `glass-card` carries the full six-layer composite by tier, so the composite IS present. BUT per the user's "each sub-section in its OWN glassy card" + "main card area BIGGER" — the section cascade `6`-card grid and the pin showcase are inside the ONE StoryHero card; they do not each get their own elevated glassy card with the deep-glass tier. The DESIGN.md deep-glass register (BD.W-DEEP-GLASS-20PX) is the right tier for a focal showcase card here.

**FINDING I3 (AUGMENT) — glass over colorful aurora + bigger card + dock-API leverage.** The user's page-band asks are NOT covered by any BD wave. This motion page should: (a) render its cascade/pin cards over a live aurora/constellation field (motion-accent violet identity, demo-local) so the glass reads as liquid glass over a colorful field, not a plate-on-plate; (b) give the main showcase area more screen space (the `--story-page-max-inline` cap + the StoryHero card crowd it); (c) leverage the dock contextual-switching API to switch between the build/cascade/pin demos (a `<GlassDock>` + `<DockLayerGroup>` facet switch is the idiomatic "deftly uses a series of glass-ui components" answer). NO BD wave owns this — it is a genuine page-band gap.

**FINDING I4 (MODIFY) — standardize the import-path label + enroll the gestalt roster.** The story has no visible subpath chip for the register (it is a CSS register, no JS import) — but the page's manifest row should carry a standardized label (`@mkbabb/glass-ui/styles` → `.scroll-build`/`.scroll-cascade`/`.scroll-pin`) the way component pages carry their `/subpath` chip (BC.W-PAGE-CHASSIS subpath chip idiom). And enroll motion/scroll-choreography in the gestalt roster (S1).

---

## Map to BD tranche

| Finding | Disposition | Wave |
|---|---|---|
| A1 dead `--col` column-stagger | **MODIFY/PRUNE** — wire `* var(--col)` or drop the stagger sub-claim | new sub-wave under motion band (none exists — **gap**; closest: BD.W-PAGE-OFFTOKEN-SWEEP for the inert-token hygiene, but it is value-token-scoped not keyframe-scoped → needs its own clause) |
| A2 pin two-phase not three-phase | **AUGMENT** to 3-phase arc on existing tokens | **gap** — no motion-band animation wave in BD |
| P1 320vh reserve | KEEP (note for roster capture) | BD.W-GESTALT-ROSTER-GROW |
| S1 Safari static-fallback uncaptured | **MODIFY** (enroll + capture) | BD.W-GESTALT-ROSTER-GROW |
| I1 superfluous language | **PRUNE** | **gap** — BD has no page-prose-tighten wave (BD.W-PRECEPTS-README-FRESHEN is precepts-only) |
| I2 deep-glass focal card | **AUGMENT** | BD.W-DEEP-GLASS-20PX (consume the deep tier on the showcase card) |
| I3 glass-over-aurora + bigger card + dock-API | **AUGMENT** (page-band redesign) | **gap** — NO BD wave covers the page-band redesign the user asks for |
| I4 import-path label + roster enroll | **MODIFY** | BD.W-GESTALT-ROSTER-GROW + a page-chassis label clause (gap) |

**Headline:** the BD tranche (doc/data-band/viz-parity focused) has NO wave for the page-band redesign the user's brief names — sub-sections in own glassy cards, bigger main card, dock-API contextual switching, glass over colorful aurora. The register CSS is sound; the gaps are (a) one real dead-code bug (`--col`), (b) the page-level redesign + glass-over-aurora, both un-owned in BD.
