# BG — the wave-by-wave BUILD ORDER (bg-build-map.md)

> The build-ordered roster for the BG tranche. Source: `docs/tranches/BG/FINAL.md` (the lock) +
> the 12 highest-pass converged specs (`converge/BG-WS*/SPEC-pass*-converged.md`). This is the BUILD
> manifest — the order each wave lands on `tranche/BG`, its files, its device-free machine-lock, its
> real-paint π, and its cross-WS preconditions. NOTHING is on committed disk at HEAD; this maps the
> frontier the build phase opens against.

**Build order (core → deep-morphism → capstone):**
`WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7` (core) → `WS8 → WS9 → WS10 → WS11` (deep-morphism) → `WS12` (LAST).

**The binding sequencing law (FINAL §8, ABSOLUTE).** WS7's `BG.W-PAINT-IS-THE-GATE` +
`BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` + `BG.W-GESTALT-ROSTER-RE-POINT` are built **FIRST** (born-RED
ground-freeze precedes WS1/WS3 integration — §L.9) and **block the tag** (`proof:ship-attestation`
`["ci","release"]` is the only device-free enforcer on the `git push --tags`→`release.yml`→`npm publish`
path). The verification axis and the release axis were decoupled and shipped broken 3× (BB · BC · BD);
this re-couples them. Every PAINT-GATED wave closes ONLY against a FRESH dual-engine (Chrome AND real
macOS Safari/WebKit 26) capture, both modes, by a NON-AUTHORING agent on a real GPU.

Legend: **[H]** = HEADLESS-ONLY (device-free gate is the close) · **[P]** = PAINT-GATED (the live π +
`proof:ba-gestalt` verdict is the binding close; the device-free gate is necessary-not-sufficient).

---

## STAGE 0 — WS7 Band-0/Band-2 paint+ship machine (BUILDS FIRST, before WS1/WS3 integration)

The close machine's ground-freeze precondition. These three precede ALL integration so the born-RED
captures anchor on real 4.2.0 paint, not a half-fixed tree.

- **BG.W-PAINT-IS-THE-GATE** [P] — `proof:ba-gestalt` reads LIVE paint; decoder extension (chroma-gate,
  per-surface field-probe regions, DEFECT-LOCALIZATION-MAP). *Files:* `scripts/reflect-capture-verify.mjs`
  (decoder ext in-place), `scripts/proof-ba-gestalt.mjs` (purge `REQUIRED_SURFACES`),
  `docs/tranches/BG/DEFECT-LOCALIZATION-MAP.md`, `docs/tranches/BG/audit/reflect/*-{light,dark}-desktop-full.png`
  (Metal born-RED, NON-self-authored, committed). *Gate:* born-REDs on a 4.2.0 Metal reproduction the agent
  did NOT author (top-bar `topDelta` ≥ measured; field meanChroma-CEILING ≥ measured); the
  all-PASS-re-shot-broken regression bite STILL REDs; content rainbow does not false-RED. *π:* the in-process
  served-demo Metal capture is the binding artifact. *Precond:* none — FIRST.
- **BG.W-GESTALT-ROSTER-RE-POINT** [H] — surface-paths DERIVED from route files; the roster `.md` shipped
  (10 surfaces, BG-dated). *Files:* `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + per-surface
  `<surface>.md` hash records, `scripts/lib/surface-closure.mjs` (routeSeeds HARD-RED on the real P6 leaf).
  *Gate:* `/dock/typoo` RED + "the shell BottomDock" GREEN; REQUIRED_SURFACES purge. *Precond:* PAINT-IS-THE-GATE.
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** [H] — `proof:ship-attestation` `["ci","release"]`, the tag-push
  bypass-closer; surfaceHash bound to REAL source bytes; fail-CLOSED `runShip()`; GREEN ceremony run
  end-to-end in a fresh `.claude/worktrees/` worktree. *Files:* `scripts/proof-ship-attestation.mjs` (NEW),
  `scripts/lib/gl-renderer-probe.mjs`, `scripts/gates.mjs` (`runShip()` Mac-only fail-closed),
  `scripts/proof-close-battery-parity.mjs`, `package.json` (`demo:dist` scripts). *Gate:* `--run full` REDs
  in CI-shape on absent/stale `SHIP-ATTESTATION.json`. *Precond:* the roster + the F0 ledger (below).

WS7 Band-0 no-silent-drop ledger also builds early (it has no integration dependency):
- **BG.W-DEFERRED-LEDGER** [H] — DRY `fold-ledger-core.mjs` over the DERIVED 136-item corpus; 3 teeth
  (charter-match / templated-evidence / concentration-ceiling). *Files:* `scripts/lib/fold-ledger-core.mjs`
  (NEW), `scripts/proof-bg-deferred-ledger.mjs` (NEW, 9-bite self-test), `docs/tranches/BG/FOLD-LEDGER.{json,md}`.
  *Gate:* born-RED on the un-DECIDED corpus; every derived id DECIDED with REAL evidence routed to a
  charter-matched wave.
- **BG.W-BE-BF-LEDGER** [H] — 70-wave BE+BF parity (LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** [H] — 31 BC→BG dispositions re-evaluated in place (n:2 re-eval; 2 pending
  flips). Re-stamp-without-decide REDs.

---

## WS1 · Shell · Routing · Field (7) — D1·D2·D5·D9·D10 — the SPA-paint precondition

> WS1-routing gates ALL downstream SPA-nav paint-verify. WS1's shell aurora exposes the live
> `WebGL2RenderingContext` + `[data-glass-field-canvas]` marker WS8 BACKDROP-SAMPLE needs.

1. **BG.W-ROUTE-TRANSITION** [P] — THE LINCHPIN. Collapse the 4-mechanism route pile to a bare keyed atomic
   swap (`<component :is :key="route.path" class="route-enter">`, NO `<Transition>`/Suspense); delete
   bloom-find-child + 2 no-op `startViewTransition` + skeleton/no-match branches; on-mount `@keyframes
   gl-route-enter`; plain-lazy. *Files:* `demo/layout/AppShell.vue`, `demo/router.ts`, `demo/main.ts`,
   `src/styles/transitions.css` (`.route-enter` keyframes), `StoryPage.vue`/`SectionLanding.vue` (drop
   `.scroll-build`), `scroll-tokens.css`/`scroll-choreography.css`/`story-hero.css`/`liquid-enter.css`
   (untangle `--story-hero-rise`, delete dead `.scroll-build` recipe). *Gate:* `proof:route-confounder` +
   `proof:route-single-root` (re-scoped hygiene) + the deleted-mechanism-absent assert. *π:* the 5-nav-<300ms
   burst → `main h1.textContent===last-dest` AND `main.children.length===2` AND monotonic allocated-GL===1;
   transition-fidelity mid-frame; Chrome AND Safari. *Precond:* Stage-0 ground-freeze. **Gates ALL downstream
   SPA paint-verify.**
2. **BG.W-FIELD-AURORA** [P] — D2. Retire `.paper-field` SURGICALLY (grain survives); ONE shell
   `<Aurora v-if="shellFieldActive">` `vividness:0` + explicit recessive C 0.05–0.09 palette;
   `background.kind`-derived `meta.focal` + `SELF_STAGES_GL`; never-2-GL boundary rule. *Files:*
   `demo/layout/AppShell.vue`, `demo/router.ts`, `demo/stories/manifest.ts`, `demo/stories/focal.ts` (NEW),
   `demo/stories/aurora-hero.ts` (mint `shellAuroraConfig`), `src/styles/paper.css` (surgical `.paper-field`
   delete, grain preserved), `property-regs.css`, `PaperBackdrop.vue`. *Gate:* `proof:no-paper-field`
   (recipe-absent + grain-survives) + `proof:focal-complete` (background.kind-consistency + `<DockStage` grep
   bite) + `proof:offscreen-pause`/`proof:perf-producer` un-regressed. *π:* getContext-instrumented
   `glContextCount(allocated)===1` on every non-substrate route + content↔focal round-trip; calm warm aurora
   (NO conic sheen, NO C>0.10 brown) at worst-cool hues both modes; AA at `opacityCeiling 0.5`. *Precond:*
   ROUTE-TRANSITION (same `AppShell.vue` — one integration commit). **The 2-live-context transient is the
   named Safari per-window-GL-budget falsifier.**
3. **BG.W-SCROLL-PROGRESS-RAIL** [P] — D5. Hoist `transform-origin:0 50%; transform:scaleX(0)`
   UNCONDITIONAL; `scroll(nearest block)` on the sticky child; drop invalid `scroll(var(...))`. *Files:*
   `src/styles/scroll-driven.css`, `demo/layout/dock-nav.css`, `demo/stories/motion/scroll-vt.vue`. *Gate:*
   COMPUTED-`animationTimeline` read + global `scroll(\s*--` scan + `proof:ba-animate` re-point + planted
   bite. *π:* `animationTimeline!=='auto'` + `scaleX(0)` at scroll-top every route + GROWS via
   `getAnimations()[0].currentTime` + bbox-width delta (de-confounded); Chrome AND Safari. *Precond:*
   independent — parallel with #1.
4. **BG.W-FIELD-ACCENT-RECONCILE** [H] — fold the duplicate warm-projection (`warm-field.ts` ≡
   `aurora-hero.ts`); export `warmProjectHue`/`SECTION_COLOR_OKLCH`/`sectionHueDeg`; rewire
   `useGlassBackdropLuminance` to the shell canvas. *Files:* `demo/stories/aurora-hero.ts`,
   `demo/stories/warm-field.ts` (collapse to ~12-line adapter). *Gate:* `proof:field-accent-reconcile`
   (13-index hue parity ε0.5° + single-source + 2-consumer + AA over the aurora both modes). *Precond:*
   FIELD-AURORA (#2).
5. **BG.W-PAPER-GRAIN-OPTIN** [P] — demote the universal 0.22 grain → per-surface opt-in; `PaperBackdrop` →
   pure grain register. *Files:* `paper.css`, `PaperBackdrop.vue`. *Gate:* `proof:no-paper-field`
   grain-survival arm. *π:* no universal grain mount + grain tokens intact. *Precond:* FIELD-AURORA (#2).
6. **BG.W-HERO-FIT** [P] — D10. ONE chassis title path (hero+intro) + `#title-ornament` slot + MANDATORY
   short `displayTitle`; svh short-viewport guard; drop `max-w-5xl`; ≥display-4 floor @≥768. *Files:*
   `demo/stories/StoryHero.vue`, `story-hero.css`, `compositions/hero.vue`, `foundations/intro.vue`,
   `manifest.ts`. *Gate:* none device-free beyond the title-source assert. *π:* 375/768/1440/1920 both-mode
   (block ≤0.62svh, `font-size ≥ computed(display-4)` @≥768, no hyphenation@375). *Precond:* ROUTE-TRANSITION (#1).
7. **BG.W-VT-ROUTE-ENHANCE** [P] — DEFERRED/OPTIONAL. Drive `router.push` through the shipped `navigate()`
   behind `supportsRouteTransitions()`; purely additive over the atomic floor. *Precond:* #1 green.

---

## WS3 · Glass standardization (11) — D3 — owns the unified blur/cast/clip register

> Phase 1 (M1·M2·M3·M4a·M5a) is field-INDEPENDENT, real-paint-verifiable NOW. Phase 2/3 chromatic paint is
> WS1-field-gated (the iridescence is field × saturate). WS2 is a PEER consumer of the blur seam — no
> dock-special blur token survives. WS3-M1 cartoon-ink is the SHARED gestalt floor under every WS4 verdict.

**Phase 1 (field-independent, lands with WS1):**
- **BG.W-CARTOON-INK-GAMUT** [P] — kill the maroon: in-gamut warm-brown `--cartoon-ink` pin (R>G>B>0,
  hue∈[45,85] both modes). *Files:* `tokens/shadow.css`, `dark-arm.css` (DRY-collapse the dark re-decl).
  *Gate:* `proof:no-gray` NEW `cartoon-ink-warm-in-gamut` witness (born-RED, reuse `WARM_HUE_LO=45`/`HI=85`).
  *π:* real `box-shadow` getImageData over white AND dark, all 3 rungs, both modes (captures form A + B for
  sign-off). *Precond:* none (Phase 1). **Hostage of EVERY WS4 ba-gestalt verdict.**
- **BG.W-DOCK-CAST-RETIRE** [H] — delete the W3C-dead `.cartoon-cast` block + wedge + `<span
  class="cartoon-cast">`; add the dock-scope PRM `--motion-weight:0` carve. *Files:* `shape.css:208-249`,
  `GlassDock.vue:606`. *Gate:* atomic source-absent + post-build `getComputedStyle`-in-bundle confirm
  (`--motion-weight:0` on `.glass-dock` under reduce). *Precond:* sequence M1≤M2.
- **BG.W-GLASS-CLIP-DISCIPLINE** [P] — Job-B `contain:paint` on a NARROWED content+`.glass-card` selector
  (overlay band + 4 dock controls EXCLUDED); retire per-class `contain`/`isolation` into ONE. *Files:*
  `material.css`, `surfaces.css` (`.glass-card`/`.glass-btn`/`.glass-chip` dialect retire). *Gate:*
  `proof:glass-clip` (born-RED, lightningcss-form-aware `contain:paint` substring) + `proof:dock-plate-clearance`
  + `proof:nested-backdrop-budget` on the BUILT bundle. *π:* the missing matrix cell on real GPU Chrome AND
  Safari (descendant-over-corner no-bleed + concentric inner-arc + Popper-arrow survives) — **Safari-26 Job-B
  sign-off is the convergence CEILING (BLOCKING)**. *Precond:* Phase 1.
- **BG.W-SAFARI-BLUR-LITERAL** [P] — M4a, build-proven 88%. The `-webkit-backdrop-filter` arm emits a
  RESOLVED LITERAL (`var()` paints flat on Safari, MDN #25914). *Files:* `vite.style-assets.ts:559`. *Gate:*
  HARDENED — every webkit arm carries a concrete `blur(<px>)` AND the literal blur-px MATCHES the unprefixed
  arm (value-correctness). *π:* real-Safari-26 4-region self-calibrating differential (literal blurs where var
  paints flat). *Precond:* Phase 1.
- **BG.W-GLASS-TINT-UNIFY (M5a `.liquid-pill` substitution close)** [P] — the Phase-1 bindable-NOW MECHANISM
  proof: raw `var(--glass-bg-floating)` → element-level `color-mix`. *Files:* `liquid-morph.css:104`. *Gate:*
  `proof:glass-foundation` A1 (bias-write + composes-the-mix + getImageData bite). *π:* `[data-testid=liquid-pill]`
  rest byte-identical + mid-bloom warm hue paints. *Precond:* Phase 1 (demo-surface proof, NOT a user-facing fix).

**Phase 2 (token-collapse lands now; chromatic paint WS1-field-gated):**
- **BG.W-GLASS-BLUR-PEER** [P] — 4-file token collapse: demote default Button off `glass-deep`, `.btn-glass`/dock
  → `--glass-blur-resting`; ONE 8px resting radius across dock·button·card·menu-row; saturate-revert WS1-gated.
  *Files:* `button/index.ts:69`, `surfaces.css:188`, `dock/shell.css:17`, `tokens/glass.css`, `proof-glass-cal.mjs`
  (B1/B3/S3 rebaseline), `proof-no-gray.mjs` (2 dock witnesses). *Gate:* `proof:glass-cal` resolved-radius peer
  lock (8px leg, alias-following) + ~7-gate rebaseline in-diff. *π (saturate-revert):* dock+Card+Button same
  blur-radius, iridescence → neutral-frosted (WS1-gated). *Precond:* token-collapse Phase-1-adjacent; saturate
  paint WS1-FIELD-GATED.
- **BG.W-GLASS-TINT-UNIFY** [P] — ≤2 chromatic SURFACE pairs (plate + rim) + ONE heavily-clamped INPUT bias
  (`--glass-tint-bias-*`, the renamed `--glass-ambient-*`); continuous-luma source rule; fold `--glass-fill-tint`.
  *Files:* `ladder.css`, `glass-fx.css`, `useBloomUp.ts:340/343`, `useGlassBackdropLuminance.ts:448` (the SAME
  fn WS1 rewires — ONE coordinated WS1+WS3 diff). *Gate:* `proof:glass-foundation` A1 + getImageData bite.
  *Precond:* **WS1-GATED** (M5 strictly AFTER WS1 — `useGlassBackdropLuminance.ts:448` collision).
- **BG.W-GLASS-IDIOM-FACTOR** [H] — DRY: `--glass-plate-tinted` declared ONCE; dead-token deletes (KEEP
  deep-ceiling, DROP phantom warm-zero); contrast arms collapsed to one comma-`@media`. *Gate:* reader-census-at-
  landing per delete. *Precond:* net-neutral (factor before M5's atomic diff).

**Phase 3 (WS1-field-gated):**
- **BG.W-GLASS-CONSUMER-BAND** [P] — fold the fill-tint consumers (Badge/SelectableChip/IconChip/glass-atom/
  glass-chip) onto the plate/rim pairs. *Gate:* 3 design sign-offs + computed-style. *Precond:* WS1-gated, after
  TINT-UNIFY.
- **BG.W-DOCK-LEGIBILITY-RECAL** [P] — re-anchor dock AA at saturate 1.2 once the unified plate tint is the
  primary anti-gray. *Gate:* `proof:no-gray` dock witnesses. *Precond:* WS1-gated, after BLUR-PEER+TINT-UNIFY.
- **BG.W-GLASS-DYNAMICS** [P] — strengthen W-LENSING squircle refraction + NEUTRAL specular hairline as the
  read-carrier at the calmer blur; backdrop-HUE sample. REFERENCE FENCE: resting hairline NEUTRAL, prismatic
  reserved for WS6. *Gate:* read-carrier paint sign-off (demoted dock/Button STILL reads as glass). *Precond:*
  WS1-gated; sequence WITH/AFTER M8 rim (demoting blur without the rim risks a flat plate).
- **BG.W-DEMO-STYLE-REHOME** [H] — WHOLE-rehome `glass/liquid-morph.css` (850L) to `demo/`; `liquid-enter.css`
  delete BLOCKED (live `@import`). *Gate:* net-neutral. *Precond:* WS1-gated (the bias→plate re-homes onto WS1's
  live field scope); SEQUENCE LAST.

---

## WS2 · Dock convergence (11) — D8·D12·D13 — consumes WS3 blur peer + WS1 route swap

> The 11-wave order: UNIFY → BUSY-SINGLE → CUT → DECOMPOSE → FISSION-WIRE → PERSISTENT-CUT → CAP-SCROLLS →
> OVERFLOW-FADE → SHELL-DOCK-DRY → INPLACE-MORPH → STORY-MODULARIZE. `useDockSpring` (UNIFY) GATES WS6.

1. **BG.W-DOCK-MORPH-UNIFY** [H] — 5 `SpringProgress` sites → ONE `useDockSpring` factory; extract
   `dockLayerFlip.ts`; fold `useLayerTransition` → orchestrator (measure-free); `(value,velocity)` play-callback
   plumbing; F13 three-place DOCK_SPRING `0.68/0.64` fix. *Files:* `composables/useDockSpring.ts` (NEW),
   `useDockOrientationMorph.ts`, `useLiquidFlex.ts` (additive `drive(t,velocity?)`), `proof-dock-morph-family.mjs`
   (F3), `proof-dock-fission.mjs` (F1), `proof-dock-orchestrator-single.mjs`, `CLAUDE.md`/`motion-canon.md`/
   `tunable-anim.md`. *Gate:* exactly ONE `new SpringProgress` in the dock dir; the 3 re-pointed gates
   born-RED→GREEN same-diff; `useLayerTransition` fold-and-DELETED. *Precond:* WS3 blur peer (peer consumer).
   **Produces `useDockSpring` — gates WS6 SIRI-ISLAND.**
2. **BG.W-DOCK-BUSY-SINGLE** [H] — 4 busy-signals → 1 `morphing` ref; retire `useDockMorphWindow` + dead
   `@transitionend`. *Gate:* grep-single busy-signal.
3. **BG.W-DOCK-CUT** [H] — delete `useDockContextSilhouette` (551L, 0 consumers) + test + `proof:dock-context`
   (AFTER WS6 confirms unwanted — R7). *Precond:* WS6 coordination.
4. **BG.W-DOCK-DECOMPOSE** [H] — carve `GlassDock.vue` 711L → colocated fission-wiring + touch-gate; design out
   the `container-type` clamp; drain RATCHET rows.
5. **BG.W-DOCK-FISSION-WIRE** [P] — the DECIDE (wire ≥2 real or retire); floor `railProjection.fadeMinAlpha`;
   DRY the goo bridge onto ONE `GooFilter`. *Gate:* `proof:dock-fission` re-point. *π:* carousel/pager
   no-goo-regression PAINT-π.
6. **BG.W-DOCK-PERSISTENT-CUT** [H] — D8. Remove the persistent ℱ brand + the Fourier egg atop both docks;
   Foundations rejoins the nav loop. (The lone structural-only defect close.) *Files:* `SidebarDock.vue`,
   `BottomDock.vue`.
7. **BG.W-DOCK-CAP-SCROLLS** (folds -UTILITY-REACH) [P] — a capped axis is ALWAYS a scroll axis; retire the
   vertical opt-in; lozenge = geometric inset guard. *Gate:* `proof:dock-plate-clearance` re-pointed onto the
   geometric-slack guard. *π:* 1280×600 trailing-reachability arm. *Precond:* WS3-M3 clip discipline.
8. **BG.W-DOCK-OVERFLOW-FADE** [P] — `useFadingScroll` soft edge on the cap-scroll port. *π:* soft-edge fade
   both modes.
9. **BG.W-SHELL-DOCK-DRY** [P] — collapse the two shell docks → ONE morphable nav-dock (`useShellNavDock`);
   PRESERVE the mobile Sheet trigger; responsive swap ⟂ morph axis. *Files:* `SidebarDock.vue`/`BottomDock.vue`
   → `useShellNavDock`. *Gate:* P1 landing-semantics build-proof (single-flip + leave-flow→bottom-bar + one
   CLS-bounded settle, ESCALATE-if-incoherent). *Precond:* WS1 route swap.
10. **BG.W-DOCK-INPLACE-MORPH** [P] — D13, THE HEADLINE. Delete the modal + synthetic + VT-crossfade; an
    in-dock BUTTON flips the REAL dock V↔H in place via the liquid teardrop (compose `useDockSpring`;
    fixed-anchor `transform-origin`; surgical filter-budget fix; analytic-velocity 12-laws squish). *Files:*
    `AppShell.vue:123,619` (delete `#shell-dock-morph-goo`), `dock/morph-bridge.css`, `useDockOrientationMorph.ts`
    (in-place adapter), `proof-dock-morph-insitu.mjs`. *Gate:* `proof:dock-morph-insitu` M2/M4 flipped
    teardrop-only IN LOCKSTEP with the AppShell VT delete (the `:220` ROUTE VT survives). *π:* live 12-laws
    weight frame-series (`--stretch` tracks `--dock-morph-v`); painted goo at blur-16 coherent; landing
    semantics; PRM synchronous seat; C-SAFARI per-arm. *Precond:* UNIFY (#1) + SHELL-DOCK-DRY (#9) + WS1 VT
    co-ownership.
11. **BG.W-DOCK-STORY-MODULARIZE** [H] — thin demo-side story carve; DEFERRABLE.

---

## WS5 · Viz refinement (9 active + 2 booked) — D6 — gates WS4 canvas carves

> WS5 precedes WS4's `CANVAS-LIFECYCLE-LEAVES`/`UNIFORM-LAYOUT-BUILDER` carves (re-measure POST-WS5). Wave 7
> co-edits `proof-gpu-substrate-single.mjs:177-181` with Wave 3 — land as ONE atomic gate edit.

1. **BG.W-VIZ-INTRINSIC-SIZE** [P] — fix the canvas intrinsic-size collapse (300×150 / 1px floor). *Gate:*
   backing == round(gBCR×dpr). *π:* non-zero pixels.
2. **BG.W-VIZ-SIZER-ADOPT-HARD** [P] — adopt the shared sizer; `dprPolicy`-required is the last step. *Gate:*
   `proof:viz-resize-upload-only` (zero self-measuring `resize()`); `grep "clientWidth ||"=0`; `grep dprPolicy≥9`.
   *π:* discriminating SPA-nav `meanByte>floor` Chrome AND Safari + offscreen-park (`suspend('off-screen-io')`).
3. **BG.W-VIZ-DEMIGRATE** [P] — fourier-field + constellation DE-migrate off WebGPU onto `useCanvas2D` (their
   own DO-NOT verdict); ≥13 files + ≥2500 LOC deleted. *Gate:* no `createGpuSubstrate`/`.wgsl`; budget re-pinned
   DOWN; co-moves the 5-member NON_MIGRATING flip with substrate-delete (Wave 7 atomic). *π:* crisp DPR arc.
4. **BG.W-VIZ-REVEAL-BLOOM** [P] — ship the entrance reveal-bloom (brightness overshoot ≥12% then settle).
   *Gate:* `useVizChoreography.ts` DEFINITION-ABSENT. *π:* deterministic brightness-filter readback; zero second
   bloom on scroll-off-and-back; PRM instant.
5. **BG.W-VIZ-PREVIEW-LIVE** [P] — D6. 11 DISTINCT live previews (7 leaf / 2 gated-approx / 2 field). *Gate:*
   per-card pixel-hash differs. *π:* per-viz recognizability + ≤1 live GL context.
6. **BG.W-DOTFLOW-REBUILD** [P] — rebuild dot-flow (compute STAYS WebGPU — the sole earner); subtle larger
   sweeping waves. *π:* the reference flowing dot-wave read.
7. **BG.W-VIZ-SUBSTRATE-DELETE** [P] — DELETE concentric + paper-grid WebGPU + orphaned `flow.wgsl`/
   `waveField.wgsl`; relocate `CONCENTRIC_FIELD_NORM`; KEEP aurora (arm-probe). *Gate:* the 4 per-viz gates
   REWRITTEN (not de-registered); `proof:gpu-substrate-single` co-revert atomic with DEMIGRATE (#3). *π:*
   `viz-parity-metal.spec.ts` arm-A meanByte>floor on chromium-Metal. *Precond:* M4(#3) + M2/M1.
8. **BG.W-GOODOT-SETUP-SPLIT** [H] — carve the goo-dot-matrix `setup` into the M1-adopted shape.
9. **BG.W-BLOB-KINEMATICS-LEAF** [H] — carve `useBlobSatellites` kinematics into a leaf.
- *(booked)* **BG.W-VIZ-SUBSTRATE-DELETE2** (per-viz arm-probe gated) · **createFragmentGLPass** (≥3-consumer trigger).

---

## WS6 · Siri capabilities (4) — NEW — gated behind WS2's useDockSpring

> Order: GLASS-BLUR-ENGAGE FIRST → SIRI-ISLAND (ORDERING-GATED behind WS2 `useDockSpring`) → SIRI-WAVEFORM →
> SIRI-DOCK-INTEGRATION LAST. SIRI-ISLAND is born-RED until WS2 lands `useDockSpring` AND WS6 composes it.

1. **BG.W-GLASS-BLUR-ENGAGE** [P] — lands FIRST. The `--siri-island-t`-coupled descend scrim: `filter:blur()`
   on a wrapper of the REAL content's OWN pixels (Safari-safe), OVERSIZED + two dim modes (global `::backdrop` /
   local panel). *Files:* `src/styles/siri-island.css`, `property-regs.css §18` (`@property --siri-island-t`),
   `tokens.css §SIRI`, `scripts/proof-glass-blur-engage.mjs`. *Gate:* `proof:glass-blur-engage` (E1–E5 +
   self-test bites). *π:* read-through is `filter:blur` on own pixels NOT `backdrop-filter`; PRM snap.
2. **BG.W-SIRI-ISLAND** [P] — the glass island: 4 forms on ONE `--siri-island-t` scalar (√φ ladder,
   forms-are-DATA); clip-aperture + overlapping content crossfade; warm under-glow; `role=status`; box-inviolate
   beside the dock. *Files:* `src/components/custom/siri-island/{SiriIsland.vue,composables/useSiriIsland.ts,
   constants.ts,index.ts,README.md}`, `src/subpaths/siri-island.ts`, `api/index.ts`, `scripts/proof-siri-island.mjs`,
   `tests-visual/siri-island.spec.ts`. *Gate:* `proof:siri-island` (S1–S7, ZERO `new SpringProgress`, composes
   `useDockSpring` + `useLiquidReveal` ElementMorph). *π:* `proof:bg-gestalt` island verdict (both engines, both
   modes). *Precond:* **WS2 `useDockSpring` (HARD)** + GLASS-BLUR-ENGAGE.
3. **BG.W-SIRI-WAVEFORM** [P] — WebGL2-only. ONE GLSL pass on `useWebGLCanvas`; warm-dominant prismatic
   lens-flare; in-shader OKLab-rectangular ramp; push-API `level(0..1)`. *Files:*
   `src/components/custom/siri-waveform/{SiriWaveform.vue,composables/useSiriWaveform.ts,
   shaders/siri-waveform.glsl.ts,constants.ts,...}`, `proof-teal-navy-purge.mjs` (add to `VIZ_CONSTANTS`),
   `proof-siri-waveform.mjs`. *Gate:* `proof:siri-waveform` (W1–W5, NO `.wgsl.ts`, warm-identity in
   `proof:teal-navy-purge`). *π:* arm-A real-GPU `meanLum>floor` + cross-engine capture artifact. *Precond:*
   independent of SIRI-ISLAND (paint-verifies separately).
4. **BG.W-SIRI-DOCK-INTEGRATION** [P] — lands LAST. The "Search or Ask" pill composes the EXISTING
   `useDockSearch` (ONE pipeline); island off the `#rail`/`.glass-dock-frame` escape; retires the cloned
   "Dynamic Island Call" demo. *Files:* `demo/stories/.../siri-island.vue`, dock wire. *Gate:*
   `proof:siri-dock-integration` (D1–D5, box-inviolate, webkit testMatch carries both specs). *Precond:*
   SIRI-ISLAND + SIRI-WAVEFORM.

---

## WS4 · Components · Demo · Encapsulation (22) — D4·D6·D7·D11·D14

> HARD-dep WS1 (scroll-shrink). The canvas-lifecycle carves sequence AFTER WS5. WS3-M1 cartoon-ink is the
> hostage of EVERY WS4 ba-gestalt verdict. `BG.W-DESHADCN-SWEEP` (W0) PRECEDES WS10's ci arms.

**Restore (D4/D6/D7/D11/D14):**
- **BG.W-SCROLL-SHRINK-UNIFY** [P] — D4+D14. Externalize card scroll-shrink to global `card-scroll.css`
  (SCALE-only `@keyframes title-collapse`, no-overshoot ease); page/hero share the scale leg; D14 `%`-off-`--col`
  fix. *Files:* `styles/card-scroll.css` (NEW), `card/CardHeader.vue`, `story-hero.css`, `index.css`,
  `critical-partition.mjs`, `proof-no-layout-animation.mjs` W4 (INVERT), `proof-page-chassis.mjs:215`,
  `scroll-choreography.css:236`. *Gate:* `proof:css-critical` GREEN + `proof:no-layout-animation` W1-W3 green.
  *π:* live MONOTONIC-SCRUB (card AND hero non-increasing 0..120px) + CLS≈0; Safari JS-fallback. *Precond:*
  **HARD-dep WS1.**
- **BG.W-SHEET-INSET-ROOT** [P] — D7. Fix the configurator drawer (gear→Sheet); SFC `data-slot`+`data-side`
  mint; CVA geometry stripped to decoration. *Files:* `SheetContent.vue`, `sheet/index.ts`, `styles/sheet.css`
  (NEW), `index.css`, `proof-emission.mjs` (overlay-band INVERSE clause), `critical-partition.mjs`,
  `tests-visual/sheet-inset.spec.ts`. *Gate:* `proof:emission` overlay-band inverse clause. *π:* live `top===0`
  + `onScreen` all-4 + no transform/contain ancestor (run AFTER `npm run build`). *Precond:* co-land WS2
  gear-reach.
- **BG.W-SPECIMEN-PER-STORY** [P] — D11. Per-story registry + `<StorySpecimen>` dispatcher; REAL Select/Slider
  per category card (12 distinct kinds, canvas=0). *Files:* per-story registry, `StorySpecimen.vue`,
  `proof-bento-specimen.mjs`. *Gate:* `proof:bento-specimen` (occupancy + zero-interactive-inside-link +
  12-kinds-non-empty). *π:* 12 distinct kinds non-empty, real control native-aspect, canvas=0.
- **BG.W-BENTO-FRONTDOOR-UNFORK** [H] — wire intro/hero onto the dispatcher; delete the 2 glyph forks
  (`.intro-cat-thumb`, `.composition-scene-thumb`).

**Motion collapse (~4000 LOC dedup):**
- **BG.W-DEAD-COMPOSABLE-CUT** [H] — `useLiquidMorph` + `useVizChoreography` + `useDockContextSilhouette`
  DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts`; delete `morph-field.css`. *Gate:* grep-gated
  + MIGRATION row (no-touch `proof:liquid-morph`). *Precond:* `useVizChoreography` WS5-first;
  `useDockContextSilhouette` WS2-coord.
- **BG.W-FLIP-ONE** [H] — ONE `useFlip` = the ElementMorph-inversion runner; reveal/cta/bloom = thin presets.
  *Files:* `useFlip.ts` (NEW), `proof-flip-one.mjs` (NEW), 3 import gate re-points, `useDockCtaReceive.ts`/
  `useBloomUp.ts`/`useLiquidReveal.ts` rebase. *Gate:* `proof:flip-one` (composes-substrate + HOLLOW-useFlip
  falsifier; 3 import gates assert `useFlip` + FORBID `new ElementMorph`).
- **BG.W-PRESS-MOUNT-RECONCILE** [H] — `useSpringMount` bloom-enter onto the shared runner (ONE Dialog/Sheet
  enter); `useLiquidPress` 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** [H] — move 3 timeline rows to a ScrubberTimeline-LOCAL map; drop dead
  `--spring-timeline-*` twins; table→6; regen + re-snap. *Files:* `springPresets.ts`, `ScrubberTimeline.vue`,
  `scheme-spring.css`, `proof-spring-tokens-synced`.
- **BG.W-SCROLL-READER-UNIFY** [H] — fold `useScrollProgress` onto `scrollReader.ts`.
- **BG.W-LIQUID-ENTRANCE-GENERAL** [P] — WIRE `liquid-enter.css` onto its named mount surfaces; PRM-carved;
  `linear()` fallback.

**Encapsulation (>500-line splits + colocation):**
- **BG.W-COLOCATION-GATE-STRUCTURAL** [H] — structural colocation gate (widen enrollment + clause-a via
  `rootComposables()`); the 3 real dir moves (`configurator/`, `sortable-list/`, `watercolor-dot/`) + 3 genuine
  READMEs. *Files:* `proof-colocation.mjs`, the 3 moves + ~12 import edges. *Gate:* enroll exactly 3, over-pull
  zero, full gate GREEN on the post-move tree.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** [H] — carve `createCanvasLifecycle` (695L) + `useWebGPUCanvas` (606L);
  re-measure POST-WS5. *Precond:* **AFTER WS5.**
- **BG.W-AMBIENT-HISTOGRAM-LEAF** [H] — carve `useGlassBackdropLuminance` (542L) → `ambientHueHistogram` +
  `wcagLuminance` (value.js moves with the leaf so `proof:single-color-core` follows). *Precond:* after WS3-M5
  rewire.
- **BG.W-TABS-KEYBOARD-LEAF** [H] — carve `SegmentedTabs` (512L) → `useTabRovingFocus` + `useTabResponsive`
  (44px floor preserved).
- **BG.W-GOO-BARBELL-CSS** [P] — reconcile `goo-barbell.css` shared by Carousel≡Pager; Safari floors via
  `@supports not(filter:url())`; REGULAR `filter:url()`. *π:* byte-identical paint.
- **BG.W-TIMELINE-ENCAPSULATE** [H] — `timeline/` into the colocation contract (add `composables/`) +
  `styles/timeline.css`; KEEP the allowlisted `transition:width/left` legs inline.
- **BG.W-SFC-CSS-PARTIAL-SWEEP** [H] — Slider recessed-track + heavy-CSS SFC partials; KEEP `[data-size]` inline.
- **BG.W-UNIFORM-LAYOUT-BUILDER** [H] — DEFER-coordinate-with-WS5; carve the std140-packing copies; re-measure
  POST-WS5. *Precond:* **AFTER WS5.**

**No-legacy + demo:**
- **BG.W-CHIP-ALIAS-KILL** [H] — delete `selectableChipVariants.ts` + re-point (`SelectableChipVariants`→
  `ChipVariants`) + MIGRATION (ATOMIC).
- **BG.W-DEAD-TOKEN-SWEEP** [H] — cut ONLY `--corner-shape-card`/`-pill` (PRESERVE live squircle tokens);
  re-point `proof:squircle-language` onto the negative guard (ATOMIC).
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** [H] — delete DemoFrame/StorySectionHeader (zero-importer); fold raw triplets
  onto ShowcaseFrame; CodeBlock→Code.
- **BG.W-MANIFEST-COLOCATE** [H] — fold the 4 string-keyed maps onto the `s()` row; de-dup the StoryHero
  cluster; reconcile the 3 narratives.

**De-shadcn (WS4 owns the SWEEP; WS10 owns the deep census):**
- **BG.W-DESHADCN-SWEEP** [P] — register `proof:de-shadcn` born-GREEN (atomic register+clear); the 9 form
  clears (3 wells + stepper rung + Combobox/TagsInput/SearchIcon + forced-colors); mint
  `--opacity-disabled-strong:0.2` + `--icon-decoration-opacity:0.5`. *Files:* `proof-de-shadcn.mjs`,
  `theme/literals.css`, `NumberFieldIncrement/Decrement.vue`, `control-surfaces.css`, `ComboboxInput.vue`,
  `a11y-overrides.css`, `tests-visual/de-shadcn.spec.ts`. *Gate:* `proof:de-shadcn` HEAD-mode + the
  opacity-utility denylist born-RED→GREEN bite. *π:* `tests-visual/de-shadcn.spec.ts` six-state matrix.
  **THIS IS WS10's W0 PRECONDITION.**

**Cross-cutting law:**
- **BG.W-12-LAWS-UNIVERSAL** [P] — liquid-weight/inertia/bounce on ALL restored motion (spatial-on-spring,
  enter-bouncy/exit-no-overshoot, scroll-scrub NO-overshoot); the Liquid-Glass content-fence (glass on chrome,
  paper on content); cartoon-technicolor on state-change beats only.
- **BG.W-CATEGORY-CARD-WARM** [P] (USER-REPORTED 2026-06-29) — every category page's (`SectionLanding`)
  sub-category cards (`SectionPreviewCard`, the `glass-resting` bento plates) read as WARM LIQUID GLASS, NEVER
  the "awful metallic wash" the user reports (the Forms page the exemplar; systemic across all category pages).
  ROOT: category routes are NON-focal (BG.W-FIELD-AURORA gated the recessive warm shell-aurora field to focal
  routes only), so the translucent `glass-resting` plate + its specular catch-light sit over a FLAT grid/paper
  category-page wash → a silver/metallic sheen. BD.W-BENTO-SPECIMEN warmed the preview WINDOW (the specimen),
  not the card PLATE over the page. FIX (warm-everywhere / no-gray): give the SectionLanding bento a WARM AMBIENT
  FIELD behind the cards (a recessive warm CSS radial on the bento section — NO live GL, the one-GL-per-route
  budget held) so the `glass-resting` cards transmit WARM; if the metallic is partly a `glass-resting`
  specular/tint cast, dial it back in coordination with WS3's glass register (no gray, the warm-cream identity).
  *Files:* `demo/stories/SectionLanding.vue` (+ bento field css), `SectionPreviewCard.vue`,
  `scripts/proof-category-card-warm.mjs` (new). *Gate:* `proof:category-card-warm` (the SectionLanding bento
  carries a warm field behind the cards + NO flat/gray bento backdrop + the card reads warm — device-free
  assertable). *π:* dual-engine (Chrome + Safari, BOTH modes) on /forms + ≥2 other category pages (/display,
  /data) — the sub-category cards read WARM liquid glass, ZERO metallic/gray wash (the user's exact defect retired).

---

## WS7 · Quality · Coverage · Close (19) — the close machine

> Band-0 (ledger) + Band-2 (paint/ship) BUILD FIRST (see STAGE 0). The remaining bands run as the close. The
> 4 WS4 user-visible surfaces MUST enroll in the gestalt roster (the BD/BE/BF roster-frozen blindness recurs
> structurally if new surfaces aren't enrolled).

**Band 1 (no-legacy cuts):**
- **BG.W-SPIKE-DELETE** [H] — `useLiquidMorph` (462L) delete + `useMorphField` gut-and-rehome (`morphSignatures.ts`
  + 5 re-points) + `selectableChipVariants` alias + `liquid-morph.css` (850L) demo-rehome; atomic file+gate+ratchet.
- **BG.W-JUBILANCE-DECIDE** [H] — RETIRE `useHaptic` (real-grep adjudicated); KEEP `useCelebrationBurst` (2
  consumers); record FLIP-ONE as a coordinated row.
- **BG.W-DEAD-GATE-SWEEP** [H] — F6 gate→symbol map by IMPORT; a RETIRE/SWEEP charter (no BUILD row routes here).

**Band 2 (the paint-gates — see STAGE 0 for the FIRST three):**
- **BG.W-GATE-ROUTING-LIVE** [H, `["ci","release"]`] — `proof:route-navigates`: `main > article` single-child
  over ≥6 hops, N=20==100% on fixed. *Gate:* born-RED via `max(main > article) > 1` during the 0.2s window.
- **BG.W-GATE-FIELD-AURORA** [H] — `proof:field-aurora` device-free SIMULTANEOUS-painter count (3-stack born-RED,
  the tag-blocker) + chroma-ceiling Metal symptom-π. *Files:* `proof-field-aurora.mjs` (NEW).
- **BG.W-GATE-PREVIEWS-RENDER** [P] — the /substrates live-preview render gate.
- **BG.W-GATE-UNIFORM-BLUR** [H] — the cross-surface uniform-blur peer gate.

**Band 3 (Safari + constraints):**
- **BG.W-SAFARI-PARITY-GATE** [H/P, `["local","ci","release"]`] — `proof:safari-parity` RED-on-broken
  `backdrop-filter:url()`, GREEN-on-clean against the live landmines + the 10 oklab single-mixes; regular
  `filter:url()` goo/fission must NOT RED. *Files:* `proof-safari-parity.mjs` (NEW), `demo/vite.demo-dist.config.ts`.
- **BG.W-CONSTRAINT-MANIFEST** [H] — `CONSTRAINTS.md` (six binding constraints + Safari version matrix + ≤18
  trigger + Mac-only-release) + `proof:constraint-manifest`; lighthouse re-pin. *Files:*
  `docs/tranches/BG/CONSTRAINTS.md` (NEW), `proof-constraint-manifest.mjs` (NEW), `lighthouse/floor.baseline.json`.

**Band 4 (census BUILDs, post-close coverage):**
- **BG.W-DATE-CALENDAR** [P] (reka-ui BUILD) · **BG.W-CHART-FAMILY** [P] (token-SVG BUILD) · **BG.W-DS-COMPLETE**
  [H] — each a genuinely-adjudicated FOLD-LEDGER row with a build-or-defer verdict. *Files:*
  `src/components/custom/{chart,calendar}/*`, `DS-COMPLETENESS-census.md`.

**Band 5 (the cut):**
- **BG.W-CUT** [P] — the tag fires ONLY after `--run ship` passes over the served BG roster, siblings+precepts-
  absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` + the user gate. *Files:*
  `scripts/release.sh` (ship-block before L60). **The tag-fire — the LAST core wave.**

---

## WS8 · Glass-deep — the apotheosis (5) — WS1 shell-aurora gated

> W-SUFFUSE + W-REFRACT-WEBGL land NOW (field-independent). W-BACKDROP-SAMPLE is the keystone (WS1-gated).
> C-SAFARI is the ★★★ 3-wave chronic — its Metal-Safari.app capture is the single likeliest item to miss.

1. **BG.W-GLASS-SUFFUSE-UNIVERSAL** [P] — field-INDEPENDENT, lands NOW. The Tier-0 iOS-27 bevel material floor
   (brighter edges, flatter visible radius, single outer ring, size-relative small-control set) + the atomic
   `useSpecularPointer` fold. *Files:* `material.css`, `rim.css`, `glass-fx.css` (`--glass-bevel-*`),
   `glass-capsule.css`, `dock/shell.css`, `select.css`, `useSpecularTracking.ts`; gate-migration matrix
   (RETIRE `proof:glass-material-sota`/`proof:lensing`/`proof:glass-prune`; mint `proof:glass-specular-angle`).
   *Gate:* `proof:glass-specular-angle` (`["local"]`) + the 3-gate retire matrix GREEN end-to-end. *π:* a
   COMMITTED real-Metal-Safari at-rest capture (bevel+blur+tint+rim) + a hover-frame glint capture; the
   `proof:ba-gestalt` glass verdict. *Precond:* consumes WS3-M3 `contain` clip host + WS3 saturate(~1.2) revert.
2. **BG.W-GLASS-REFRACT-WEBGL** [P] — build-INDEPENDENT, LANDS in `src/`. The dual-stack refraction shader:
   `glass-refract.glsl.ts` (Tier-1 WebGL2 floor) + `glassShader.wgsl` Tier-2 (ONE `sampleBG` wrapper @5 sites,
   anisotropic flow-aligned specular, rim chromatic dispersion 0.02–0.03). *Files:*
   `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW), `squircle.glsl.ts`/`squircle.wgsl.ts`,
   `src/glassShader.wgsl`, `createBackdropSource.ts`, `useGlassRefraction.ts`. *Gate:* the M6 WGSL-shape gate
   (committed runnable: 1 wrapper / 5 sites / 0 implicit / `array<vec4f,8>` + synthetic-reintro self-test). *π:*
   the fixture-field π on real WebKit-2287 (rimDelta>0 + chromaticRim>0); the METAL-FLOW gestalt verdict vs the
   `liquid-metal-...01.jpg` reference. *Precond:* independent.
3. **BG.W-GLASS-BACKDROP-SAMPLE** [P] — THE KEYSTONE (WS1-gated). Wire the backdrop-sampling FBO two-pass into
   WS1's ONE shell-aurora context: `createRenderTarget.ts`, the ridge-local plate-alpha valve, the muted→full-ink
   lift, the two fidelity rungs (chrome 1.0 / content ≤0.6). *Files:*
   `src/composables/glass/webgl/createRenderTarget.ts` (NEW), `useWebGLCanvas.ts` + the WS1 shell-aurora backend
   closure, `useGpuSubstrate.ts`, `AppShell.vue` (shell `<Aurora>` exposes its render-target). *Gate:* persist
   `W-BACKDROP-SAMPLE-FOUNDATION.json` (FBO/context plumbing). *π:* live AA-over-bright-ridge ratify (FALLS to
   opaque plate where dark can't clear 4.5) + exactly ONE GL context per refracting route + 30s sustained-load
   no-`webglcontextlost`. *Precond:* **WS1 FIELD-AURORA (the live WebGL2 context + `[data-glass-field-canvas]`
   marker — the named cross-WS gap).**
4. **BG.W-GLASS-SOTA-LADDER** [H] — formalize the Tier-0 CSS → Tier-1 WebGL2 → Tier-2 WGSL degrade; RETIRE the
   dead `.glass-lens`/`glass-refract.css`/`detectTier`; book the successors. *Files:* `glass-refract.css`
   delete (3-point), `useGlassRenderer.ts` delete, `useSpecularPointer.ts` delete + barrel rows. *Gate:* the §3.1
   retire matrix GREEN + retired-paths DEFINITION-ABSENT (grep src+demo+scripts). *Precond:* #1+#2+#3.
5. **BG.W-GLASS-LIQUID-TRANSITION** [P] — purely additive. Spring the refraction: displacement/specular
   magnitude → a SECOND reader of the existing `--glass-btn-press-t` spring `.value` (ZERO new springs); the
   press-swell returns. *Gate:* the GL uniform reads `press.value` not `getComputedStyle`. *π:* the
   displacement-swell frame-series. *Precond:* soft-prefer AFTER WS4 FLIP-ONE.

---

## WS9 · Paper-deep (5) — GU-1 key token FIRST

> Sequence: GRAIN-REAL → SUFFUSE → HANDMARK-PERFECT → PENCIL-BOIL-DEEPEN → CROSSREPO-ASKS. GU-1's
> `--glass-key-direction` token lands FIRST (value-only) — GRAIN-REAL's azimuth derives from it; WS8 bevel +
> WS12 A6 spine both read it.

0. **(GU-1 token, lands first within CROSSREPO-ASKS scope)** — mint `--glass-key-direction` in `glass-fx.css`,
   derive 3 under-shadow tier leans, `dock/overflow.css:143` re-point. Value-only/additive.
1. **BG.W-PAPER-GRAIN-REAL** [P] — replace the grey feTurbulence speckle with a warm `feDiffuseLighting` LIT
   tooth (fine fiber band, sRGB/hex warm ecru, azimuth gate-locked to `--glass-key-direction`). *Files:*
   `paper.css` (re-engineer `--paper-grain-tooth`), `scale-paper.css`, re-point `cards.css`/`ladder.css`/
   `dock/shell.css`, `proof-paper-grain.mjs` (NEW). *Gate:* `proof:paper-grain` (born-RED on the speckle;
   warm-hue floor ≥0.020; azimuth==token). *π:* `tests-visual/paper-grain.spec.ts` warm-directional-relief JND
   (upper-right brighter), both modes, Chrome+Safari, calibrated vs a real render. *Precond:* GU-1 token.
2. **BG.W-PAPER-SUFFUSE** [P] — ONE warm-lit source across ~12 surfaces; DELETE `--paper-clean-texture` (re-point
   the verified consumer map); KEEP `--paper-aged-texture` (atlas contract); grain-on-headline `@supports`.
   *Gate:* `proof:paper-grain` suffuse arm + `proof:suffuse` extend. *π:* ONE register across ~12 surfaces;
   glass whisper still a whisper. *Precond:* GRAIN-REAL (consumes the source).
3. **BG.W-HANDMARK-PERFECT** [P] — perfect the HandMark: aspect-correct viewBox, hull se-guard, amplitude knob,
   draw-easing token; mint `proof:handmark-audit`. *Files:* `HandMark.vue`, `constants.ts`, `geometry.ts`,
   `ink.ts`, `brush.ts`/`types.ts`, `proof-handmark-audit.mjs` (NEW). *Gate:* `proof:handmark` (+hull-guard) +
   `proof:handmark-audit` (NEW). *π:* px-aspect≈vb-aspect + spacing-CV≥0.30. *Precond:* independent.
4. **BG.W-PENCIL-BOIL-DEEPEN** [P] — graphite-in-tooth + pencil pressure profile + boil LIVE (offscreen-park).
   *Gate:* `proof:handmark` boil-park arm. *π:* pencil-graphite-on-tooth; boil breathes hump-irregular; PRM
   static. *Precond:* GRAIN-REAL/SUFFUSE (shared field) + HANDMARK engine fixes.
5. **BG.W-PAPER-CROSSREPO-ASKS** [H] — land the GU-1 key spine + the azimuth-coupling lock; the 3 by-name
   contracts (pencil-boil / latex-paper / sci-report); drop the dead perfect-freehand peer. *Files:*
   `docs/tranches/BG/coordination/asks-and-consumes.md` (NEW), `GU-1-glass-key-fill.md`, `package.json` (drop
   perfect-freehand), `proof-crossrepo-asks-paper.mjs` (NEW). *Gate:* `proof:crossrepo-asks-paper` (foreign-tree
   fence by construction).

---

## WS10 · De-shadcn / idiomatic Tailwind v4 (5) — strictly AFTER WS4's W0

> W0 precondition: WS4's `BG.W-DESHADCN-SWEEP` registers `proof:de-shadcn` born-GREEN + clears the 9 form
> violations. WS10 sequences strictly AFTER W0. Rebase the `--ring`/`--input` renames onto WS3-M5.

1. **BG.W-DESHADCN-CENSUS** [H] — the complete census (EXTEND `proof:no-shadcn-default`): raw-tw-palette +
   opacity-NN-utility arms; DRY `shadcn-vocab.mjs`. *Files:* `scripts/lib/shadcn-vocab.mjs` (NEW),
   `proof-no-shadcn-default.mjs`, `proof-de-shadcn.mjs`, `playwright.config.ts` (webkit-deshadcn project),
   `served-app-sentinel.ts`. *Gate:* the full 233-file sweep records ZERO false positives + reds every residual.
   *Precond:* **WS4 W0.**
2. **BG.W-DESHADCN-TOKEN-REPLACE** [P] — the replacement sweep + dead-token deletes + the `--focus-ring-color`
   fix (ToastClose→destructive, ai-amber→`--accent-ai`, the opacity-NN sites). Clean break, no alias. *Files:*
   `ToastClose.vue`, `button/index.ts`, `tokens/glass.css`/`dark-arm.css`/`theme/bridges.css` (mint
   `--accent-ai-ink`), `NumberFieldIncrement/Decrement.vue`, `scale-paper.css:83` (`--focus-ring-color`),
   `light-dark.css:125` delete, `color-radius.css` (delete `--input`), `MetricBadge.vue`. *Gate:* the full
   affected-gate suite GREEN. *π:* π#1 (toggle dark fill) + π#3 (focus ring ≥3:1, REAL Safari). *Precond:*
   CENSUS + rebase onto WS3-M5.
3. **BG.W-TAILWIND4-IDIOM** [H] — mint `--text-control` `@theme` bridges + `@utility glass-blur-*`; idiomatic
   `@theme`/`@utility` (no `theme()` fn-syntax). *Gate:* `proof:tailwind-v4-idiom` clause-(d) completeness.
4. **BG.W-DESHADCN-MATERIAL** [P] — the grouped-inset Select elevation-INVERSION (3 separated correctly-elevated
   cards) + Switch material (STATIC `color-mix(in oklab)`, NOT a 5th backdrop-filter). *Files:* `select.css`
   (`:has(.glass-menu-group)`), `menu.css` (`.glass-menu-group` inset envelope). *Gate:*
   `deshadcn-select-grouped.spec.ts`. *π:* the binding REAL-Safari WebKit-dark capture (card ΔL≥0.06) — **the
   LOAD-BEARING residual; escalates to the deferred mono-caption header if it fails.** *Precond:* TOKEN-REPLACE.
5. **BG.W-DESHADCN-GATE** [P] — the lock + paint + canon: lock `proof:no-shadcn-default`; wire the
   `webkit-deshadcn` Playwright project; run the 4 born-RED π (six-state matrix, both modes, Chrome AND real
   Safari); fold the de-shadcn CANON. *π:* the four binding π + the R2 real-Safari capture. *Precond:* #1–#4.

---

## WS11 · Storybook facility (4) — HARD-gates on the WS1+WS4 integration branch

> Intra-WS: 1+2 parallel; 3 after 1+2; 4 last. ALL HARD-gate on WS1/WS4 landing (the integration branch does
> NOT exist at HEAD — the structural reason WS11 caps). Consumes WS8 glass + the D5-fixed scroll-timeline.

1. **BG.W-SCROLL-PROGRESS-GLASSY** [P] — the thick glassy integrated scroll-progress rail: `scroll(nearest
   block)` clip-revealed `@property --scroll-fill` + `--scroll-rail-blur` thicker frost + flat cap +
   SpringProgress glint + positional JS fallback. *Files:* `demo/layout/dock-nav.css` (rail rebuild + mode-aware
   fill), `scroll-rail.spec.ts`, `playwright.config.ts` (webkit testMatch). *Gate:* `railHealth()` (the `grew`
   killer tooth) GREEN chromium AND webkit. *π:* PT-A — the VISUAL frost capture on real WebKit 26. *Precond:*
   WS1 D5 scroll-rail + WS8 glass.
2. **BG.W-SECTION-TYPEWRITER-FADEUP** [P] — the typewriter + fade-up section-entrance (gl-char-rise heading +
   body cel `view()`-cascade); the `stagger` prop + `--char-stagger-step`; the demo-private `useSectionReveal`
   + the F5 mount re-sweep. *Files:* `demo/stories/useSectionReveal.ts` (NEW), `SplitChars.vue` (`stagger` prop),
   `scheme-motion.css` (`--char-stagger-step`), `typography/utilities.css`. *Gate:* `getAnimations()`-per-node
   congruence. *π:* the F5 adverse-order restoration strand-proof + FOUC-clean, both modes, real WebKit 26.
3. **BG.W-STORY-PAGE-API** [H/P] — the capstone page-API: `StoryPageShell` + `StoryPage`(stack)/`CategoryPage`
   (bento) + the single-root `StoryHeroBackdrop`; the AST-over-regex single-root oracle; the 15-gate SHARED-lib
   blast-radius. *Files:* `CategoryPage.vue` (NEW), `StoryPageShell.vue` (NEW), `StoryHeroBackdrop.vue` (NEW),
   `proof-story-page-api.mjs` (NEW, `[local,ci,release]`), `surface-closure.mjs`/`proof-ba-gestalt.mjs` re-point,
   the 13 StoryHero-reader gate re-points. *Gate:* the built oracle GREEN over the migrated tree + the full
   battery ZERO unflagged red before deletes. *Precond:* #1+#2.
4. **BG.W-STORYBOOK-SUFFUSE** [P] — the mode-aware chrome-chroma lift (CHROME only) + the `--field-h` thread +
   the bg-gestalt-roster. *Gate:* `proof:suffuse` d1–d3 GREEN. *π:* per-category preview-card hue VARIANCE (not
   uniform amber 62). *Precond:* #3.

---

## WS12 · Coherence · Congruence — the capstone (6) — LAST

> WS1–WS11 each converged a DOMAIN in isolation; WS12 audits the WHOLE for CONGRUENCE. PERSIST the gates in
> dependency order BEFORE the born-RED proof. The 480-capture dual-engine verdict is STRUCTURALLY
> post-integration (rides WS1–WS11 landing).

1. **BG.W-COHERENCE-CENSUS** [H] — author `WS12-CENSUS.md` (the audit-of-record): A1 technicolor gamut ceiling,
   A3b tier ladder (dock EXCLUDED), A6 glass-key spine read, A7 concentricity allowlist, the DRY fork-collapse
   map, the RATCHET ∅-drain close precondition. *Files:* `WS12-CENSUS.md` (NEW). *Gate:* every arm re-validated
   against HEAD (no prose-only claim).
2. **BG.W-COHERENCE-GATE** [H] — PERSIST in dependency order: `hue-at-l.mjs` → `spring-table.mjs` →
   `proof-hue-at-l.mjs` + `proof-coherence-census.mjs` → the A9 ARM into `proof-motion-one-clock.mjs` (the
   ONE-clock lock, SUPERSEDES the inline `pairRe`). *Files:* `scripts/lib/hue-at-l.mjs` (NEW),
   `scripts/lib/spring-table.mjs` (NEW), `proof-hue-at-l.mjs` (NEW, `[local,ci]`),
   `proof-coherence-census.mjs` (NEW, `[local]`), `proof-motion-one-clock.mjs`, `gates.mjs`. *Gate:*
   born-RED→GREEN→reverted via stash-toggle to 4.2.0; A9 BOTH source-form legs bite. *Precond:* CENSUS.
3. **BG.W-DESIGN-LANGUAGE-UNIFY** [P] — the A5 calm-light token-indirection seam (`--glass-capsule-blur`, no
   `!important`); measure the busy-aurora capsule `proof:nested-backdrop-budget` 2→1 win (NULL → DROPPED by
   KISS). *Files:* `W-DESIGN-LANGUAGE-A5-DELTA.md`. *Gate:* the busy-aurora forward criterion + child-glyph
   un-tinted + standalone Button byte-untouched.
4. **BG.W-ANIMATION-CONGRUENCE** [P] — the A9 ONE-clock LOCK + the doc-rot fix; the `:pressable` story
   (a11y-fixed) is the Card-press π prerequisite. *Files:* `demo/stories/containers/card-pressable.vue` (NEW),
   `manifest.ts`, `deck-slide.spec.ts`, `Card.vue`/`useSpringPress.ts` doc-rot. *Gate:* `press-unify.spec.ts` no
   longer skips. *π:* Card-press + deck-slide π RUN on a real GPU (FEEL read deferred). *Precond:* the
   `:pressable` story lands first.
5. **BG.W-GLASS-PAPER-CONGRUENCE** [H→ci] — owns the WS8(bevel)+WS9(GU-1 tooth) `--glass-key-*` SPINE that A6
   reads; the Regular/Clear tier map (dock-excluded). *Gate:* when the spine lands, A6 promotes born-RED + `ci`.
   *Precond:* WS8 bevel + WS9 GU-1 tooth committed.
6. **BG.W-PAGE-COMPONENT-AUDIT** [P] — the §5 harmonized-whole instrument + the lens-exemption print; **the
   480-capture dual-engine both-modes verdict POST-INTEGRATION.** *Files:* `coherence-congruence.spec.ts`. *Gate:*
   the harmonized capture rides WS1→WS4→WS3/WS8→WS9 landing + the real-Safari.app/Chrome.app on-device
   device-paint. *Precond:* **WS1–WS11 ALL LANDED.**

---

## The CRITICAL PATH (the longest dependency chain)

The deepest single-thread chain runs ~14 stages (verification-frozen FIRST, tag-fire LAST):

```
WS7·PAINT-IS-THE-GATE (FIRST — born-RED ground-freeze before integration)
 → WS1·ROUTE-TRANSITION (the linchpin — gates ALL SPA paint-verify)
 → WS1·FIELD-AURORA (the shell aurora — exposes the live WebGL2 ctx WS8 needs)
 → WS3·GLASS-TINT-UNIFY / chromatic band (WS1-field-gated; M5 collides with the same useGlassBackdropLuminance fn)
 → WS2·DOCK-MORPH-UNIFY → useDockSpring (peer-consumes WS3 blur + WS1 swap)
 → WS6·SIRI-ISLAND (born-RED until useDockSpring lands AND WS6 composes it)
 → WS6·SIRI-DOCK-INTEGRATION (lands last in WS6)
 → WS4·CANVAS-LIFECYCLE-LEAVES / components (HARD-dep WS1; AFTER WS5)
 → WS8·GLASS-BACKDROP-SAMPLE (the keystone — WS1 shell-aurora context gated)
 → WS9·GRAIN-REAL (GU-1 key token first → warm lit tooth)
 → WS10·DESHADCN-MATERIAL (strictly AFTER WS4-W0; the REAL-Safari-dark separation residual)
 → WS11·STORY-PAGE-API (HARD-gates on the WS1+WS4 integration branch)
 → WS12·PAGE-COMPONENT-AUDIT (the 480-capture verdict rides WS1–WS11 landing)
 → WS7·CUT (the tag fires LAST, only after --run ship over the served roster)
```

**The WS1/WS3/WS4 gating fan-outs:**

- **WS1 fan-out (the widest).** `BG.W-ROUTE-TRANSITION` gates ALL SPA-nav paint-verify — EVERY downstream
  visual π across all 11 other workstreams (no workstream marks 100% on a hard-load-only π).
  `BG.W-FIELD-AURORA`'s shell-aurora context gates WS8 `BG.W-GLASS-BACKDROP-SAMPLE` (the named cross-WS gap —
  WS1 must expose the live `WebGL2RenderingContext` + `[data-glass-field-canvas]` marker without forking
  `createCanvasLifecycle`), WS3's chromatic paint (M5 tint / M4 saturate / M8 dynamics — the iridescence is
  field × saturate), WS9's glass-whisper, WS11's scroll-rail, and WS12's coherence capture. `BG.W-SCROLL-SHRINK`
  is WS4's HARD-dep. WS1's integration branch (with WS4) gates WS11 wholesale.
- **WS3 fan-out.** WS3 owns the unified blur/cast/clip register; WS2 is a PEER consumer (no dock-special blur
  token survives). `BG.W-CARTOON-INK-GAMUT` (M1) is the SHARED gestalt floor under EVERY WS4 ba-gestalt verdict
  (the WS3 hostage — WS4 must not self-certify until M1 lands). WS3-M3's `contain` clip host is consumed by WS8
  `BG.W-GLASS-SUFFUSE-UNIVERSAL`. WS10 rebases its `--ring`/`--input` renames onto WS3-M5.
- **WS4 fan-out.** `BG.W-DESHADCN-SWEEP` (W0) PRECEDES WS10's ci arms (the strict W0 precondition). WS4's
  components land on the WS11 integration branch. `BG.W-FLIP-ONE` soft-gates WS8 `BG.W-GLASS-LIQUID-TRANSITION`.
  WS4's 4 user-visible surfaces (scroll-shrink title, configurator Sheet, /forms specimens, liquid-enter) MUST
  enroll in the WS7 gestalt roster or the BD/BE/BF roster-frozen blindness recurs.

---

3-line summary:
≈110 distinct active waves across 12 workstreams (+~6 booked), build-ordered WS1→WS3→WS2→WS5→WS6→WS4→WS7 (core) → WS8→WS9→WS10→WS11 (deep-morphism) → WS12 (capstone last); WS7's PAINT-IS-THE-GATE + SHIP-DISCIPLINE-LIVE-PRECONDITION build FIRST and block the tag.
The critical path is ~14 stages (PAINT-IS-THE-GATE → ROUTE-TRANSITION → FIELD-AURORA → WS3-chromatic → useDockSpring → SIRI → WS4-components → BACKDROP-SAMPLE → GRAIN-REAL → DESHADCN-MATERIAL → STORY-PAGE-API → PAGE-COMPONENT-AUDIT → CUT).
The single most-gating wave is WS1 `BG.W-ROUTE-TRANSITION` — the linchpin that gates ALL SPA-nav paint-verify across every other workstream's visual π (with WS7 `BG.W-PAINT-IS-THE-GATE`/`SHIP-DISCIPLINE` the tag-blocker that builds first).
