# BG — the wave-by-wave BUILD ORDER (bg-build-map.md)

> The build-ordered roster for the BG tranche. Source: `docs/tranches/BG/FINAL.md` (the lock) +
> the 12 highest-pass converged specs (`converge/BG-WS*/SPEC-pass*-converged.md`). This is the BUILD
> manifest — the order each wave lands on `tranche/BG`, its files, its device-free machine-lock, its
> real-paint π, and its cross-WS preconditions. NOTHING is on committed disk at HEAD; this maps the
> frontier the build phase opens against.

**Build order (core → deep-morphism → capstone):**
`WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7` (core) → `WS8 → WS9 → WS10 → WS11` (deep-morphism) → `WS12` (LAST).

> **RESPEC DEVELOP-PASS FOLD (2026-06-30, source `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md`).** The
> execution sequence is amended: STAGE-0 ground-freeze → **`BG.W-CLOSEFIX-9SITE`** (the 9-site atomic close-fix,
> lands FIRST — clears the 4 live close-reds R1–R4 + the cascade) → WS1 → WS3 (with `BG.W-EYEBROW-LIGHT-POLISH`) →
> WS2 → WS5 → WS6 → WS4 → WS7 (close machine: `close-sweep` · `gestalt-cursor-parity` · `field-aurora-aa` ·
> `safari-parity`) → WS8 → WS9 → WS10 → WS11 → WS12 → **BH[WS12] restructure tail** (16-reader re-home → CLAUDE.md
> delete) → **`BG.W-CUT`** (the tag fires LAST). The DAG + build order are KEEP; **~93% of built work is VERIFIED,
> ZERO restart candidates** (the user's low confidence was the close battery / the ba-gestalt keystone / the
> field-aurora proof — NOT bad design). The 7 close-machine gap waves are folded into their workstreams below; the
> cross-cutting register (corrections · CONSUMEs · live-fixes · build-phase deferrals · verdict) is the **RESPEC
> DEVELOP-PASS register** section before The CRITICAL PATH.

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
  **RESPEC amend (G2):** `surface-closure.mjs` adds `demo/main.ts` to SHELL_SEED (fixes the demo.css-imported
  story-hero.css subset); the roster ENROLLS a **SiriIsland surface** (the `/compositions/siri` or dock-route
  capture pair — owed for WS6 paint-verify regardless) + a scoped, bounded, rationale-bearing **accept-residual
  allowlist** for the genuine no-route components (`PaperBackdrop`/`useDockOrientationMorph`); `bg-paint.wf.js:22`
  fence-widens to admit `docs/tranches/BG/audit/reflect/` so the §4 roster reconciliation can land. See WS7
  `BG.W-GESTALT-CURSOR-PARITY` (the keystone joinery gate).
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
> **RESPEC amend:** `BG.W-CLOSEFIX-9SITE` (the 9-site close-fix, WS7 Band 0.5) carves `ladder.css` 527→470 +
> `shell.css` 510→459 BEFORE WS3 integrates — WS3 builds on the carved leaves; if WS3 re-grows either past 500 a
> re-carve is owed within WS3 (`BG.W-DEMO-STYLE-REHOME` tracks the line budget). The ±2% dock-brightness sign-off
> (light 1.02→1.0, dark 1.12→1.14) rides **WS3 3.6 paint-verify** (NOT the paint-neutral G4 retirement — it must
> not fall between G4 and WS3). `BG.W-EYEBROW-LIGHT-POLISH` (NEW, the light-arm twin of the dark eyebrow fix
> `b3d65eec`) lands in Phase 3 — below.

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
- **BG.W-EYEBROW-LIGHT-POLISH** [P] — NEW (G6 — the phantom-coupling-now-real wave; the light-arm twin of the
  dark eyebrow fix `b3d65eec`). The light·chrome eyebrow `.section-label` is genuinely **4.15:1** over the
  recessive shell field (10–14px = 4.5 binding — re-classing to large=3.0 is the FORBIDDEN threshold-dodge). Prove
  the light-arm RAW-field eyebrow lift to ≥4.5 is achievable WITHIN the warm-no-gray identity WITHOUT regressing the
  already-clearing dark (6.73) / Safari (4.80) arms. Device-free CI cannot enforce the lift (`proof:field-aurora-aa`
  F-AA-ROSTER passes the literal `{bar:4.5, born-RED}` forever) — the gate-green binding is **F-AA-LIVE `[local]`
  only**. *Files:* the `.section-label` light-arm warm-ink token(s) (`typography.css`/`scale-paper.css`). *Gate:*
  `proof:field-aurora-aa` F-AA-LIVE born-RED→GREEN; `proof:no-gray` warm-identity un-regressed. *π:* the
  light·chrome eyebrow clears ≥4.5 over the COMPOSITED recessive field, both engines, the dark/Safari arms
  un-regressed (rides W-REFLECT3). *Precond:* WS1 FIELD-AURORA (the recessive field) — `resolvedBy` of the WS7
  `BG.W-GATE-FIELD-AURORA` EYEBROW_LIGHT_POLISH `resolvedBy` row.
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
   **RESPEC amend (G7 Lock-1):** the `/constellation` + `/fourier-field` keys are PRESERVED (internal WGSL→Canvas2D
   swap → a VISUAL re-baseline, NOT an import re-point — no by-name ask owed). This wave's gate set co-runs the
   EXTENDED `proof:crossrepo-asks` **`W5-viz-subpath-disposition`** clause (NOT W4 — the W4 inv-26 content-only
   fence already exists on disk) asserting the "visual re-baseline, key-preserved, owner BG-WS5" disposition for both
   keys with **slides + atlas** as the ≥2 named consumers; it REDs ONLY if a WS5 wave drops/renames a CONSUMED key
   without flipping its disposition to an import-re-point ask in `BH/coordination/asks-and-consumes.md`. See the
   BH[WS12] tail §G7.
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

**Band 0.5 (the atomic close-fix + the standing sweep — `BG.W-CLOSEFIX-9SITE` LANDS FIRST, before WS1):**
- **BG.W-CLOSEFIX-9SITE** [H, RESPEC amendment 1 — LANDS FIRST] — clear the 4 live tag-blocking close-reds R1–R4
  in ONE atomic paint-NEUTRAL diff that FULLY RETIRES the `--glass-blur-dock` chain + carves the two over-500
  monoliths. *Mechanism:* (a) **two carves under 500** — `ladder.css` 527→470 (grain-tail → `glass/grain-overlay.css`,
  NEW) + `shell.css` 510→459 (persistent-region tail → `dock/shell-regions.css`, NEW), each opening its own `@layer
  components`, `@import`-ed in the exact cascade slot (dist `glass-ui.css` BYTE-IDENTICAL — the W-CARVE byte-identity
  invariant; the dead token was already tree-shaken); (b) **R2 FULL RETIREMENT** of the `--glass-blur-dock` chain
  (composite + saturate + radius + the `--blur-dock` bridge) across `glass.css`/`dark-arm.css`/`bridges.css` — the
  dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (8px peer, verified 0 orphan readers);
  (c) **R3** `gates:emit-ci` regen (adds `proof:category-card-warm` AND `proof:glass-idiom-factor` in one pass);
  (d) **R4** `category-card-warm` → `["local","ci","release"]` (the `field-accent-reconcile` precedent — a pure
  device-free src-scan belongs in the full battery). ***It is 9 SITES, not 6*** — the FULL RETIREMENT also reds 3
  FROZEN-STRING identity readers the spec never enumerated: **(5)** `proof:dock-shrink-blur` S3 re-point onto the
  dock's ACTUAL backdrop source `--dock-surface-blur`→resting→8px (mirroring `proof-no-gray:748`); **(6)**
  `proof:theme-style` drop the `.blur-dock` Tailwind utility probe; **(7)** the VITEST unit test
  `tests/components/custom/instrument-chassis/InstrumentChassis.spine-variant.test.ts:115` (flip the assertion);
  **(8)** the local-π `tests-visual/glass-cal.spec.ts` EXPECT_RADII drop; **(9)** the cascade — `proof:glass-cal` B3
  + `proof:glass-depth` D3 retired in the same diff (+ the no-god-module `@import`-order recorders
  `read-css-monoliths.mjs` glass.order + `read-dock-css.mjs` DOCK_PARTIAL_ORDER register the 2 new partials).
  *Files:* `ladder.css`, `glass/grain-overlay.css` (NEW), `shell.css`, `dock/shell-regions.css` (NEW), `glass.css`,
  `dark-arm.css`, `bridges.css`, `gates.mjs`+`ci.yml` (regen), `proof-glass-cal.mjs` (B1/B3), `proof-glass-depth.mjs`
  (D3), `proof-dock-shrink-blur.mjs` (S3), `proof-theme-style.mjs`, `read-css-monoliths.mjs`, `read-dock-css.mjs`,
  `InstrumentChassis.spine-variant.test.ts`, `tests-visual/glass-cal.spec.ts`. *Gate:* all 15 affected device-free
  gates flip GREEN in one diff; `--run full` runs siblings-absent in a FRESH `/tmp` worktree
  (typecheck/test/build/budget PASS) GREEN; dist `glass-ui.css` BYTE-IDENTICAL to the HEAD baseline. *Build-phase
  deferral:* the grain-tail paint π (`tests-visual/liquid-hover.spec.ts` — the moved `.glass-*::after` pop-kill) +
  the `proof:ba-gestalt` dock/CTA verdict ride **W-REFLECT3** (grain rules byte-preserved in compiled dist — a
  confirmation ceremony, not a feasibility risk). *The ±2% dock-brightness sign-off rides WS3 3.6 paint-verify,
  NOT this paint-neutral retirement.* *Precond:* STAGE-0 ground-freeze. **Convergence 90.**
- **BG.W-CLOSE-SWEEP** [H, `proof:close-sweep` `["local"]`] — the standing per-band `closeDisease`-manifest
  completeness sweep so the 12→4→? re-mint disease (green own gate / leave the shared close gate RED) can never
  re-mint with NEW artifacts. *Mechanism:* `SWEEP_SET` DERIVED from a manifest `closeDisease:true` flag (8 members) +
  `SWEEP_SET_FAST` (7, excludes the 112s close-only `gate-manifest-sound`); a NEW `--run sweep`/`--run sweep-fast`
  spawn-all dispatch (names ALL reds, NOT runMode's fail-fast); a dual-signal `sweepVerdict` (exit-code ∧
  JSON-status); `proof:close-sweep` the armed witness — born-RED, anchored to R1–R4, the THIRD born-RED-by-design
  gate beside `ba-gestalt`/`ship-attestation`. *DECIDED:* (1) the commit-hook is **tranche-env-gated, NOT
  hot-file-fires** — the `.githooks/commit-msg` sweep arm gates on `GLASS_UI_ACTIVE_TRANCHE` set to the active
  tranche (the env IS set during execution by the engine's commit-per-wave cadence; a hot-file-fires hook would block
  the integrator's own P-CLOSE carves while R1–R4 are dirty); C4 asserts the env-gated arm + a self-test bite
  exercises it with the env set; (2) **the canon home moves OUT of the `docs/precepts` SUBMODULE** — a fresh `git
  worktree add /tmp` does NOT recurse submodules → the doc would be ABSENT → C3 reds at the exact siblings-absent
  close this gate locks; home it PARENT-TRACKED at `docs/tranches/BG/canon/close-disease-sweep.md` (SHARED with G5's
  canon-home — one home discipline); (3) **C5 hardens to PATH-MATCH** — assert `(cacheName,envVar)` resolves to each
  gate's actual `writeGateArtifact` target for all 5 JSON-writers (note tag-parity's odd `GATE_TAG_PARITY_OUT` env
  with no `GLASS_UI_` prefix); (4) the completeness floor is **5 BOOKKEEPING_SIGNATURES regexes, human-decided per
  candidate** (each carries an explicit `closeDisease` boolean: true=member / false+reason=opt-out) + a self-test
  bite proving a synthetic close-disease gate matching NONE of the 5 signatures is surfaced. *Sequencing:* land
  **strictly AT-OR-AFTER `BG.W-CLOSEFIX-9SITE` clears R1–R4** (the HARD P-CLOSE→P-SWEEP edge — else a new `--run
  full` red, since close-sweep is `["local"]` ∈ full). *Files:* `docs/tranches/BG/canon/close-disease-sweep.md`
  (NEW, parent-tracked), `scripts/gates.mjs` (the `--run sweep`/`sweep-fast` dispatch + the 4 new manifest row
  fields), `scripts/proof-close-sweep.mjs` (NEW, 9-bite self-test), `.githooks/commit-msg` (the env-gated sweep-fast
  arm). *Gate:* `proof:close-sweep` born-RED → GREEN at the close; self-test 9/9 PASS; `--run sweep-fast` names all
  4 reds; node-direct cost ~1.25s. *Recorded:* `gates:sweep` (the full 8 incl. gate-manifest-sound, 112s) is a HUMAN
  T2-discipline command (the commit-hook runs sweep-FAST; `proof:full` runs members individually) — no false
  "automated" claim. *Precond:* `BG.W-CLOSEFIX-9SITE`. **Convergence 83.**

**Band 1 (no-legacy cuts):**
- **BG.W-SPIKE-DELETE** [H] — `useLiquidMorph` (462L) delete + `useMorphField` gut-and-rehome (`morphSignatures.ts`
  + 5 re-points) + `selectableChipVariants` alias + `liquid-morph.css` (850L) demo-rehome; atomic file+gate+ratchet.
- **BG.W-JUBILANCE-DECIDE** [H] — RETIRE `useHaptic` (real-grep adjudicated); KEEP `useCelebrationBurst` (2
  consumers); record FLIP-ONE as a coordinated row.
- **BG.W-DEAD-GATE-SWEEP** [H] — F6 gate→symbol map by IMPORT; a RETIRE/SWEEP charter (no BUILD row routes here).

**Band 2 (the paint-gates — see STAGE 0 for the FIRST three):**
- **BG.W-GESTALT-CURSOR-PARITY** [H — THE KEYSTONE; as wired the 5.0.0 tag CANNOT fire] — the device-free
  `proof:gestalt-cursor-parity` gate that DERIVES the wave→surface map from the shipped `surface-closure.mjs` join
  (NO hand-authored `wave-surface-map.md`), so a cursor-DONE wave whose paint reaches no roster surface is caught
  (the BB-lie) AND an under-declaring wave is caught. *The sound formula (HONESTLY re-priced):*
  `surfaceClosure(s) = collectPaintClosure(SHELL_SEED ∪ routeSeeds(s).seeds) ∩ wave.Files` — **SHELL_SEED-INCLUSIVE**
  (the route-only literal is structurally BLIND to the global glass cascade that loads via `src/styles/index.css` at
  the shell, not per-route). Under `full`, 22/105 waves map to all-10 (the cascade-CSS waves reachable via
  index.css) and 82 map to NONE (waves touching files OUTSIDE the index.css cascade) — so `full` UNDER-covers the
  MAJORITY; the gate's binding value is **PARITY-C + the gate's own G5 pixel-band/G7 freshness**, not a per-wave A/B
  implication. *The three PARITY arms:* **PARITY-A KEEP-but-weak** (cursor-DONE ⇒ roster-PASS, the BB-lie catcher;
  born-RED against the 6 already-DONE-on-signal rows until the WS1/WS4 binding sweep flips their roster); **PARITY-B
  → DELETE** (UNSAT mid-tranche AND redundant — `proof:ba-gestalt`'s G5 pixel-band + G7 freshness already
  auto-revert a faked roster PASS; RETRACT any "flips GREEN surface-by-surface per band" claim — surfaces flip at
  the WS12 late sweep, Model-B); **PARITY-C the LOAD-BEARING net** — under `full`, 46 paint files are orphans across
  ≥7 [P] waves; two-part fix: (1) `surface-closure.mjs` adds `demo/main.ts` to SHELL_SEED (fixes the demo.css
  story-hero.css subset), (2) **the ORPHAN-DECISION** — enroll a **SiriIsland roster surface** (the
  `/compositions/siri` or dock-route capture pair, owed for WS6 paint-verify regardless — not a gate-tax) + a
  scoped, bounded, rationale-bearing **accept-residual allowlist** for the genuine no-route components
  (`PaperBackdrop`/`useDockOrientationMorph` — enrolled via the routes that DO render them, or accept-residual with
  a one-line rationale; the disposition-register precedent, NOT the hand-list brittleness the gate kills). *Use the
  SCOPED-closure variant* `collectPaintClosure(surfaceSeed)` for per-surface `surface-paths` breadth (a dock paint
  change in `dock/morph.css` re-stales the dock PASS — the freshness teeth), while the `full` map is the PARITY-C
  completeness net (two readings, disjoint purposes). *The fence widen (the one edit that unblocks the keystone):*
  `bg-paint.wf.js:22` → add `docs/tranches/BG/audit/reflect/` (the roster verdict cells + per-surface `<surface>.md`
  hash records + the `reflect/*-desktop-full.png` captures); the §4 write is FOLLOWED by a `proof:ba-gestalt` re-run
  so a judge-written PASS over a stale/grey capture auto-reverts via G1(isRealPng)/G3(freshness). *Canonical-capture
  rule:* the FIRST `/cat/story` token in a surface's routes cell is the canonical capture route (deterministic,
  parse-stable; dock aligned to `/dock/overview`). *Safari:* the operative `proof:ba-gestalt` pixel band stays
  Chrome-desktop-ONLY; the Safari field-AA class is owned by the SEPARATE `proof:safari-parity` (per-surface
  `<surface>.md` records the Safari capture path; the cut requires BOTH green). *Mobile:* the BG roster is
  DESKTOP-ROSTER-ONLY; mobile gestalt rides the `coarse-touch` pi-runner (`gates:pi` runs both projects — NO extra
  close cost; reconcile the CLAUDE.md BB.W-GESTALT-GATE2 `-mobile-` leaf note to "desktop-roster operative; mobile
  rides the coarse-touch pi-runner"). *Files:* `scripts/proof-gestalt-cursor-parity.mjs` (NEW),
  `scripts/lib/surface-closure.mjs` (SHELL_SEED += `demo/main.ts`; the scoped + full closure variants),
  `bg-paint.wf.js:22` (fence widen), `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (SiriIsland surface + the
  accept-residual allowlist). *Gate:* `proof:gestalt-cursor-parity` device-free — PARITY-A born-RED on the 6
  DONE-on-signal rows + PARITY-C the orphan net; **the self-test MUST include a synthetic new-component wave whose
  paint reaches no closure and assert PARITY-C catches it** (PARITY-A silently maps it to NONE — the precise hole).
  *Build-phase deferral:* the WS12 late capture sweep (Model-B — captures all 10 roster surfaces once over fresh
  paint; a cost, not a feasibility unknown — the joinery proof is device-free). *Precond:* STAGE-0 roster + WS1
  routeSeeds. **Convergence 80.**
- **BG.W-GATE-ROUTING-LIVE** [H, `["ci","release"]`] — `proof:route-navigates`: `main > article` single-child
  over ≥6 hops, N=20==100% on fixed. *Gate:* born-RED via `max(main > article) > 1` during the 0.2s window.
- **BG.W-GATE-FIELD-AURORA** [H, RESPEC-AMENDED (G6)] — `proof:field-aurora` device-free SIMULTANEOUS-painter
  count (3-stack born-RED, the tag-blocker) + chroma-ceiling Metal symptom-π. **+ the field-composited-AA arm:**
  every text register that composites over the recessive shell field clears WCAG AA over the COMPOSITED plate, not
  the page. `proof:field-aurora-aa` (device-free F-AA-SELFTEST + F-AA-SAMPLER + F-AA-ROSTER, `["ci","release"]`) +
  the `[local]` **F-AA-LIVE** born-RED binding arm. The leaf `scripts/reflect-capture-verify.mjs` gains
  `pngMedianRgbStddev` + `sampleCompositeBehindText` (within-plate clamp — fixes the +24px blind-patch) +
  `auroraCompositeAaVerdict` (WCAG-honest bar: text 4.5 / large 3.0), **value.js-FREE with an INJECTED `ratioFn`** so
  its 8 ci/release importers never abort the FAIL-FAST `--run full`. *DECIDED:* **consumer #2 =
  `compositions/gate-pattern`** (on-disk-verified: non-focal grid bg ∉ GL_BG_KINDS + ∉ SELF_STAGES_GL ⇒ the shell
  field paints; a STATIC `<Card tier="floating" max-w-sm>` glass plate + a genuine `[data-slot=card-description]`
  muted body, NO contained GL — the unsound `/display/card` self-stages TWO auroras and is ABSENT from the roster);
  **value.js floor `^1.1.1`** (NOT `^1.2.0` — RECONCILE the 5 stale `^1.2.0` strings in the spike: gate
  `:23,:25,:50,:58` + leaf `:346,:348`); **F2 dark-AA demoted to a transcription-fidelity FLOOR** (a CPU-transcribed
  ABSOLUTE contrast number cannot reproduce the per-engine WebGL2/WebGPU saturate·brightness·tonemap·DPR divergence
  — the SAME field read Chrome 1.04 / Safari 1.91; bind the BINDING dark-AA verdict to the DUAL-engine on-device
  C18, both Chrome AND real WebKit, both modes; cross-validate the CPU transcription against ≥1 real GL readback at
  build); **self-test fixtures = VERBATIM recorded `pixel-analysis.json` triples** (the broken-collapse fixture is
  the actual recorded ~1.04 triple, NOT a reverse-engineered 1.108). The light·chrome eyebrow `.section-label` is
  genuinely **4.15:1** over the recessive field (10–14px = 4.5 binding — re-classing to large=3.0 is the FORBIDDEN
  threshold-dodge) → `resolvedBy: BG.W-EYEBROW-LIGHT-POLISH` (WS3 Phase 3, NEW), NOT prose. *Files:*
  `proof-field-aurora.mjs` (NEW), `proof-field-aurora-aa.mjs` (NEW), `scripts/reflect-capture-verify.mjs` (leaf
  ext), `package.json` (value.js `^1.1.1`). *Gate:* `proof:field-aurora-aa` F-AA-SELFTEST/SAMPLER/ROSTER GREEN
  device-free (3/3) + F-AA-LIVE `[local]` born-RED. *Build-phase deferral:* the binding F-AA-LIVE arm — the
  dual-engine `_anchor` re-shoot at `ebf6e45b` (= `b3d65eec~1`, the verified pre-fix BROKEN state) in a throwaway
  `/tmp` worktree capturing Chrome 1.04 + Safari 1.91 over `/foundations/colors` dark, emitting
  `field-aurora-aa/{chrome,safari}-<surface>-<mode>-<vp>.png+.probe.json` with PRM/pause aurora-freeze — proven by
  W-REFLECT3 + the light-eyebrow polish landing. **Convergence 78.**
- **BG.W-GATE-PREVIEWS-RENDER** [P] — the /substrates live-preview render gate.
- **BG.W-GATE-UNIFORM-BLUR** [H] — the cross-surface uniform-blur peer gate.

**Band 3 (Safari + constraints):**
- **BG.W-SAFARI-PARITY-GATE** [H/P, `["local","ci","release"]`, RESPEC-AMENDED (G1)] — `proof:safari-parity`
  RED-on-broken `backdrop-filter:url()`, GREEN-on-clean against the live landmines + the 10 oklab single-mixes;
  regular `filter:url()` goo/fission must NOT RED. **+ the G1 renderability decision (reads the C18 on-device
  compile-time probe):** the binding risk is whether the ~3×-length FULL refraction shader COMPILES under WebKit's
  ~2s ceiling on Metal — if Safari shader-compile > the measured ceiling, the **drapery-dropped** Safari shader is
  the shipped path (depth refraction survives, the drapery whisper degrades); **flat-blur** is the LAST resort with
  an explicit recorded trigger (CSS-SVG `feDisplacementMap` is DEAD on Safari/Firefox 2026 — never a silent
  collapse). The named fallback ladder is **full → drapery-dropped → flat-blur, each gated.** The C18
  non-authoring-agent Metal/WebKit capture discharges the ★★★ C-SAFARI residual (the NON-SKIPPABLE close
  precondition; the verdict feeds `proof:safari-parity` live + the `proof:ba-gestalt` glass/CTA row). *Files:*
  `proof-safari-parity.mjs` (NEW), `demo/vite.demo-dist.config.ts`. *Precond:* WS8 `BG.W-GLASS-REFRACT-WEBGL` + the
  C18 `?capture=` harness (already shipped in `demo/main.ts`).
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
2. **BG.W-GLASS-REFRACT-WEBGL** [P, RESPEC-AMENDED onto `uChromatic` (G1)] — build-INDEPENDENT, LANDS in `src/`.
   The dual-stack refraction shader: `glass-refract.glsl.ts` (Tier-1 WebGL2 universal Safari floor) +
   `glassShader.wgsl` Tier-2 (ONE `sampleBG` wrapper, anisotropic flow-aligned specular, rim chromatic dispersion).
   **The fence operator is `uChromatic`, NOT the spike's invented `uDispersion`** — the ship splits R/B by
   `ca = inward·rim·uChromatic·0.0045` (an ABSOLUTE rim-offset, `glass-field-shaders.json`); `--glass-edge-dispersion`
   maps DIRECTLY to `uChromatic` (no derived fraction). Calibration algebra: `|ca|/|disp| =
   0.1·uChromatic/uRefractionStrength` → K2 ratio 0.02–0.03 → `uChromatic` 0.20–0.30 at `uRefractionStrength=1` (valid
   ONLY at uRef=1 — `ca` absolute, `disp` scales — so the fence is swept DIRECTLY on `uChromatic` over the real field,
   never ported as a ratio). **Render the FULL ship pass** (drapery 2nd `curlFBM` + `uMetalStrength` composite + the
   K12 plate VALVE `smoothstep(uValveKnee,1,structLuma)`) — the spike stopped at `lensed=mix(lensed,soft,0.35)`.
   **MINT `proof:glass-refract-fence` born-RED** (device-free, `["local"]`→`ci` at the keystone calibration — the
   spine-constellation/ba-gestalt born-RED→promote model): **F1** chroma fence `dispΔC_p99 ≤ ε` (the differential of
   the FULL render at `uChromatic=default` vs `uChromatic=0` — an anti-future-rainbow REGRESSION fence, transcription
   errors cancel); **F2** dark-AA fold (folded in from C12 — see `BG.W-GLASS-BACKDROP-SAMPLE`); **F3**
   operator-is-`uChromatic` source-scan (a re-roll onto a `(1±uDispersion)` UV-fraction REDs — the K2 chroma fence
   keyed on `uChromatic`, refraction = DEPTH not hue); **F4** op-budget proxy ceilings (a no-regression op-COUNT floor
   — fbm/curlFBM=3, vnoise tail, 12 texture taps); **F5** on-disk-resolves (every declared capture RESOLVES) + a
   self-test bite per clause. **The named Safari renderability FALLBACK ladder (the hardest open, DECIDED): full →
   drapery-dropped → flat-blur, each gated** — `BG.W-SAFARI-PARITY-GATE` reads the C18 on-device compile-time probe;
   if Safari compile > the ~2s ceiling the drapery-dropped shader ships (depth survives, drapery degrades), flat-blur
   the LAST resort with a recorded trigger (CSS-SVG `feDisplacementMap` DEAD on Safari/Firefox 2026 — never a silent
   collapse). **The CPU field-buffer raster is specified** — the producer CPU-renders the WS1 field into a buffer and
   BILINEARLY samples at `uv+disp±ca` at a resolution where `ca ≈ uChromatic·0.0045 ≈ 0.001 UV` is a resolvable
   multi-pixel offset (else F1 measures quantization noise). **The 5 GL refraction sites enumerated at build** (the
   ≥2-distinct bar): hero CTA + dock plate are the 2 distinct; list the actual 5 `sampleBG` sites at the WS8 build
   (the `.glass-deep`/`--glass-depth` Card is a CSS backdrop-filter blur tier at HEAD, NOT a GL refraction site).
   *Files:* `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW — the `ca = inward·rim·uChromatic·0.0045`
   operator + `--glass-edge-dispersion`→`uChromatic` token), `squircle.glsl.ts`/`squircle.wgsl.ts`,
   `src/glassShader.wgsl`, `createBackdropSource.ts`, `useGlassRefraction.ts`, `scripts/proof-glass-refract-fence.mjs`
   (NEW), `scripts/glass-refract-fence-capture.mjs` (NEW — commits the C17 capture pair to
   `docs/tranches/BG/audit/visual/glass-refract-fence/`). *Gate:* `proof:glass-refract-fence` (F1–F5 + bites; F3/F4
   checkable NOW, F1/F2 calibrate over the field at the keystone) + the M6 WGSL-shape gate (1 wrapper / 5 sites / 0
   implicit / `array<vec4f,8>` + synthetic-reintro self-test). *π:* `tests-visual/glass-refract.spec.ts` on real
   WebKit-2287 (rimDelta>0 + chromaticRim>0 + FULL-pass AA-over-bright-ridge + the METAL-FLOW gestalt verdict vs the
   `liquid-metal-...01.jpg` reference); both modes; LOCAL-only, rides W-REFLECT3. *Precond:* independent. **Convergence
   70 (build-deferred, the dominant cut-risk ★★★).**
3. **BG.W-GLASS-BACKDROP-SAMPLE** [P, RESPEC-AMENDED (G1)] — THE KEYSTONE (WS1-gated). Wire the backdrop-sampling
   FBO two-pass **+ the FULL pass** (drapery + `uMetalStrength` + the K12 ridge-local plate-alpha valve) into WS1's
   ONE shell-aurora context: `createRenderTarget.ts`, the ridge-local plate-alpha valve, the muted→full-ink lift,
   the two fidelity rungs (chrome 1.0 / content ≤0.6). **C12 dark-AA-over-bright-ridge FOLDS IN as the refract-fence
   gate's clause F2** (NOT orthogonal — the SAME `uValveKnee`/`uPlateAlphaMax` valve gated by the SAME `structLuma`):
   over the WS1 field + FULL pass, where `structLuma > uValveKnee` the valve firms `plateA → uPlateAlphaMax` → assert
   `contrast(content-ink, composite-luma-behind-text) ≥ 4.5:1` for BOTH the lifted-to-full `--foreground` ink AND the
   worst-case, both modes, AND assert the DIM valley (`structLuma < knee`) STAYS translucent (the metal still reads —
   the valve must not firm everywhere). **Calibrate the default `uChromatic` + pin ε over the REAL WS1 field** (the
   drift terms vanish at t=0); re-watchdog the FULL shader (~3× the cheap one) at 2880×1800 / N≤8 panels + 30s
   sustained-load no-`webglcontextlost`; **promote `proof:glass-refract-fence` `["local"]`→`ci` at this
   calibration.** *Files:* `src/composables/glass/webgl/createRenderTarget.ts` (NEW), `useWebGLCanvas.ts` + the WS1
   shell-aurora backend closure, `useGpuSubstrate.ts`, `AppShell.vue` (shell `<Aurora>` exposes its render-target).
   *Gate:* persist `W-BACKDROP-SAMPLE-FOUNDATION.json` (FBO/context plumbing) + `proof:glass-refract-fence` F1/F2 now
   calibrated over the field. *π:* live AA-over-bright-ridge ratify (FALLS to opaque plate where dark can't clear
   4.5) + exactly ONE GL context per refracting route + 30s sustained-load no-`webglcontextlost`. *Build-phase
   deferral (no Metal/Safari.app at audit):* the pinned default `uChromatic+ε` (field-dependent), the WebKit
   compile-time measure, the per-pixel Metal-rasterizer drift, the WGSL Tier-2 FBO first-pass on Safari.app
   `navigator.gpu` — proven by THIS keystone (C17 calibration) + W-REFLECT3 / the close (the non-authoring
   dual-engine Metal capture). *Precond:* **WS1 FIELD-AURORA (the live WebGL2 context + `[data-glass-field-canvas]`
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

## BH[WS12] restructure tail — the G5 CLAUDE-delete + G7 viz-subpath locks (runs AFTER WS12, BEFORE BG.W-CUT)

> The BH restructure/reshape tail: subpaths-delete · /api-fold · regen export-set · doc-redistribute (CLAUDE→canon)
> · gate-rehome (the 16 readers) · the CLAUDE.md hard-delete. Build order: …WS12 → BH[WS12] → `BG.W-CUT`. Two
> close-machine gaps live here. (The BH concurrent-safe [C] band already LANDED at EXEC M2.)

### G5 · CLAUDE.md-delete safety → BH-B5c (canon homes + reader re-point) → B4f (the `rm`, ABSOLUTE-LAST act, task #63) + `proof:claude-deletable`

The CLAUDE.md content migrates to canon homes; every reader re-points; the `rm` is the born-RED-last act gated by
`proof:claude-deletable` (C1 content-real homes / C2 zero hard readers / C3 file-is-last-act + self-test bites).

- **The census is 16 readers, NOT 12** (the develop-pass correction — the G5 spike's grep missed every gate reading
  via a local `read("CLAUDE.md")`/`strip(read(…))` helper). The 12 enumerated (`structure-sync`, `doc-consistency`,
  `split-chars`, `accent-tone`, `dock-rail-realize`, `handmark`, `dock-unify`, `dropdown-fix`, `easing-primitive`,
  `phase-palette`, `spa-view`, `surface-axis`) + **the 4 MISSED hard readers** (each with re-home key): **(13)**
  `proof:close-battery-parity` (`["local"]` ∈ `--run full`, `read("CLAUDE.md")`:149 for the `--run full` close-battery
  canon → re-home → the build-and-gates canon, PARENT-TRACKED, SHARED with G3's canon home; its RED is a literal new
  red in the union the `/tmp` dry-run measures); **(14)** `proof:doc-override-idiom` (`["local","ci"]`, :113 — asserts
  CLAUDE.md↔README.md **BYTE-PARITY** of the `--glass-blur-resting-radius` override block; NOT a presence-swap — the
  consumer-wiring canon home must carry the override block verbatim-equal to README.md, re-point the gate to compare
  README↔consumer-wiring); **(15)** `proof:on-glass-fg` (W4 canon arm:399 — `--on-glass-muted`/`--input-on-glass`/
  `--progress-track-on-glass` → glass-system canon); **(16)** `proof:readme-meta-clean` (:221 — phantom-name negatives
  + deps line + luma RESERVE; multi-home).
- **C2 detector DE-BLINDED.** C2's reader-function allowlist `{readFileSync,safeRead,readRel,rd}` EXCLUDES the
  `read(…)`/`strip(…)` form the 4 missed readers use → it can false-GREEN with live readers surviving (the close-class
  lie inside the oracle). WIDEN C2 to flag ANY call receiving the CLAUDE.md literal/var (keep the
  `proof:expandable-part:66` dead-constant exclusion) + add a self-test bite using the `read('CLAUDE.md')` helper form.
- **Canon home OUT of the `docs/precepts` SUBMODULE** (SHARED with G3) — a fresh `/tmp` worktree does NOT recurse it;
  home the canon in PARENT-TRACKED docs and re-verify C3 green in a fresh `/tmp` worktree. CANON_TOKENS anchors match
  each missed reader's actual assertion regex (build-and-gates ← close-battery-parity's `--run full` canon;
  consumer-wiring ← doc-override-idiom's `--glass-blur-resting-radius` override block; glass-system ← on-glass-fg's
  `--on-glass-muted`).
- **The 2 ENOENT-crashers fixed FIRST** (`structure-sync:74`, `doc-consistency:197` — raw `readFileSync`, THROW → can
  abort `--run full`): add `existsSync` guards / re-home before the `rm`. **`structure.md` parser:** the GENERATED
  `structure.md` is FLAT BULLETS while the §Structure readers parse a box-drawing ASCII tree → `structure-sync`
  DELEGATES to `regen-structure --check` (byte-exact); add a main-guard to `regen-structure.mjs:68/93` (runs at
  top-level on import). **Legacy-accumulation hole CLOSED** by widening `canonAccumulationSound` from BG/BH-only to
  ALL contract-DEFINING anchors (76 heading+bold-lead tags across every letter; inline cross-refs excluded via
  DEFINING_LINE scoping) — verbatim-tag preservation IS the `homeBodies.includes(tag)` lock.
- *Files:* `scripts/lib/canon-doc.mjs` (`CANON_TOKENS` + `canonTokensSound` + widened `canonAccumulationSound` +
  content-real `auditCanonHomes`), `scripts/proof-claude-deletable.mjs` (NEW, C1/C2/C3 + 5 self-test bites), the 16
  reader gates re-pointed THROUGH `readCanon`, `docs/tranches/BG/canon/*.md` (the 15 PARENT-TRACKED homes incl. the
  absent `instrument-chassis` README), `ci.yml` (re-emit). *Gate:* `proof:claude-deletable` born-RED the WHOLE tranche
  → GREEN only at the delete commit (C3). *Build-phase deferral:* the binding `--run full` `/tmp` siblings-absent
  dry-run (after all 15 homes authored + all 16 readers re-pointed) + the actual `rm CLAUDE.md` (B4f, the ABSOLUTE
  last act, task #63, USER-GATED after the tag) — proven by the BH-B5c→B4f ordered chain. **Convergence 78.**

### G7 · viz-subpath cross-ownership → Lock-1 `proof:crossrepo-asks` `W5-viz-subpath-disposition` (WS5) + Lock-2 the live `proof:subpath-classify` + the BH-B2.1-swap re-baseline

A CONFIRM-step, not a new build — WS5 as specced drops/renames ZERO consumed viz subpath keys (VIZ-DEMIGRATE is an
internal WGSL→`useCanvas2D` swap, key-preserved; VIZ-SUBSTRATE-DELETE removes only the `.wgsl` primary and KEEPS the
GLSL fallback + dir + `index.ts`). So BG-WS5 owns a VISUAL re-baseline (slides `/fourier-field`×4 + `/constellation`×2;
atlas `/constellation`×1 + `/dot-flow-field`×1, re-approve fallback-first), NOT an import re-point — no by-name ask owed.

- **The new clause is `W5`, NOT `W4`** — `proof:crossrepo-asks` ALREADY owns a W4 clause (the inv-26 content-only
  fence, `"W4-content-only-fence"` confirmed on disk); a verbatim `W4-viz-subpath-disposition` would smother the
  load-bearing fence. Name it **`W5-viz-subpath-disposition`** (≈40 LOC + 1 self-test bite, born-GREEN at HEAD; REDs
  ONLY if a WS5 wave drops/renames a CONSUMED key without flipping its disposition to an import-re-point ask in the
  roster). It is a FRESH read-path (the live gate is hard-wired to BB paths): reads
  `docs/tranches/BH/coordination/asks-and-consumes.md` + `docs/tranches/BG/execution/consumer-constellation.md` +
  imports `subpath-policy.mjs` + a `VIZ_SUBPATH_KEYS` constant. The binding net is the cut's `--run full`
  (`crossrepo-asks` is `[local,ci,release]`) — wire it into `BG.W-VIZ-DEMIGRATE`'s per-wave gate set OR accept the
  cut's `--run full` as the net (still before the irreversible tag). Confirm `crossrepo-asks` is NOT in the BH
  gate-rehome/retire set OR pin where the viz clause lands post-restructure.
- **Lock-2 is ALREADY LIVE + GREEN** (`proof:subpath-classify`, `gates.mjs:377`, `["local","ci"]` — C1
  exit0/EXACT_REPRODUCTION + C2 `--inject-unclassified` exit1 + C3 `--break-fidelity` exit1) — a novel WS6 siri dir
  with no class turns C1-real RED in `--run full`, forcing the human PUBLISH-vs-INTERNAL call. Pre-derived: **siri-island
  = PUBLISH** (`bg-build-map.md` lists `src/subpaths/siri-island.ts`); **siri-waveform = INTERNAL** (no subpath file —
  a WebGL2 leaf composed BY SiriIsland; HUMAN to confirm — the one genuine residual call).
- *Build-phase deferral:* the post-WS12 re-baseline (`verify-export-types` + `proof:subpath-enumeration` re-pin on the
  real build) + the one human siri-waveform PUBLISH-vs-INTERNAL confirm at the landed WS6 dir — proven by
  **BH-B2.1-swap** (regen-exports + classify + enumeration-re-pin + ci-re-emit) gated STRICTLY AFTER WS5∧WS6∧WS12,
  STRICTLY BEFORE `BG.W-CUT`. Two HARD ordering edges encoded in `bg-bh-execute.wf.js`: Lock-1 @ WS5; the RE-BASELINE
  after WS5∧WS6∧WS12, before CUT. **Convergence 80.**

---

## RESPEC DEVELOP-PASS register (folded 2026-06-30) — gap-wave index · corrections · CONSUMEs · live-fixes · deferrals · verdict

> Source: `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md` (the source of truth) + `RESPEC.md` + the
> `resolve-G{1,5,7}` specs + `DEFECT-LEDGER.md`. The 7 close-machine gap waves are folded into their workstreams
> above; this is the cross-cutting register.

### The 7 close-machine gap waves (planning convergence + where folded)

| Gap | Wave(s) | Conv | Folded into |
|---|---|---|---|
| **G4** | `BG.W-CLOSEFIX-9SITE` (lands FIRST — clears R1–R4) | **90** | WS7 Band 0.5 |
| **G3** | `BG.W-CLOSE-SWEEP` (`proof:close-sweep`) | **83** | WS7 Band 0.5 |
| **G2** | `BG.W-GESTALT-CURSOR-PARITY` (the keystone) + STAGE-0 roster amend | **80** | WS7 Band 2 + STAGE 0 |
| **G7** | `proof:crossrepo-asks` `W5-viz-disposition` + live `proof:subpath-classify` | **80** | BH[WS12] tail + WS5 |
| **G5** | BH-B5c→B4f + `proof:claude-deletable` (16 readers) | **78** | BH[WS12] tail |
| **G6** | `BG.W-GATE-FIELD-AURORA` (amend) + `BG.W-EYEBROW-LIGHT-POLISH` (NEW) | **78** | WS7 Band 2 + WS3 Phase 3 |
| **G1** | `BG.W-GLASS-REFRACT-WEBGL` + `BG.W-GLASS-BACKDROP-SAMPLE` (keystone) + `BG.W-SAFARI-PARITY-GATE` | **70** | WS8 + WS7 Band 3 |

The 4 close-machine gaps that make a faked/stale close impossible: **G2** (ba-gestalt joinery) + **G3** (closeDisease
sweep) + **G4** (atomic close-fix) + **G6** (field-aurora AA). **G1** (C-SAFARI) + **G5** (CLAUDE-delete) + **G7**
(viz-subpath) close the dominant cut-risk, the BH restructure, and the cross-repo seam.

### Corrections applied (every site)

- **value.js peer floor `^1.1.1`, NOT `^1.2.0`** — `wcagContrastRatio` first shipped in 1.1.1 = npm-latest; `^1.2.0`
  would EXCLUDE latest and RED `proof:peer-conformance`'s "admits latest" clause + require value.js to publish 1.2.0
  first; `^1.1.1` admits latest AND keyframes' `^1.2.0` ⊆ `^1.1.1`. RECONCILE the 5 stale `^1.2.0` strings in the G6
  spike (gate `:23,:25,:50,:58` + leaf `:346,:348`).
- **G4 is 9 SITES, not 6** — the FULL `--glass-blur-dock` retirement reds 3 more frozen-string identity readers
  (`dock-shrink-blur` S3 + `theme-style` `.blur-dock` probe + the `InstrumentChassis.spine-variant` unit test +
  `glass-cal.spec` EXPECT_RADII) beyond R1–R4 + the `glass-cal` B3 / `glass-depth` D3 cascade.
- **G3 canon-home is PARENT-TRACKED, NOT in the `docs/precepts` submodule** —
  `docs/tranches/BG/canon/close-disease-sweep.md` (a fresh `/tmp` worktree does not recurse submodules; the SAME
  discipline as G5's canon home).
- **G2 PARITY-B is DELETED** — UNSAT mid-tranche AND redundant (`proof:ba-gestalt`'s G5 pixel-band + G7 freshness
  auto-revert a faked roster PASS). PARITY-C is the load-bearing net; PARITY-A is weak-kept (the BB-lie catcher).
- **G5 census is 16 readers, NOT 12** — the 4 missed (`close-battery-parity` / `doc-override-idiom` BYTE-PARITY /
  `on-glass-fg` / `readme-meta-clean`), C2 de-blinded to flag any `read(…)` of the literal.
- **G7 clause is `W5`, NOT `W4`** — `proof:crossrepo-asks` already owns a W4 clause (the inv-26 content-only fence on
  disk); the viz-disposition clause is `W5-viz-subpath-disposition`.

### Mechanical CONSUMEs (fire at the cut)

kf 5.1.0 `DragOptions.snap`/`Oscillator`; **value.js peer floor `^1.0.0`→`^1.1.1`** (see corrections); DROP the dead
`perfect-freehand ^1.2.3` at WS9 (`BG.W-PAPER-CROSSREPO-ASKS`); the BorderProgress `oklchSpectrum` CONSUME is already
discharged (`spectrum-walk.ts:22`); `W-TAILWIND4-IDIOM` = "evaluated, not applicable."

### Live-interaction fixes — LANDED (Phase-LX, dual-engine verified; the device-free gates + static captures cannot catch these)

| # | Wave | Commit | Fix |
|---|---|---|---|
| **D-1** | `BG.W-CONSTELLATION-PARALLAX-OFF` | `07c6e6ec` | `DEFAULT_PARALLAX 0.08 → 0` (default-OFF / opt-in depth, clean break) — the whole-lattice cursor-track killed (Chrome center→corner 58.1px→5.7px). |
| **D-2** | `BG.W-PAPER-GRAIN-WARM-SUBSTRATE` | `e40e5095` | demo-local warm-substrate behind the gray-tooth grain (library grain utility BYTE-UNTOUCHED) — paper-glass tiles C 0.009→0.02-0.045 warm, paper-texture gray wash → per-panel warm grain. |
| **D-3** | `BG.W-DOCK-COLLAPSE-DIR` | `8947288a` | the `--dock-live` SIZE scalar reads the DIRECTIONAL `--dock-expand-t` (was the raw `--dock-morph-t`) — the 440px collapse-balloon reversal (the "morph hover flicker") killed; `proof:dock-engine` E4 tightened to pin the blend clamp. |

### Build-phase deferrals (de-risked at audit; each named with its exact proving wave)

| # | Deferral | De-risked because | Proven by (the exact wave) |
|---|---|---|---|
| D-G4 | grain-tail paint π (`liquid-hover.spec.ts`) + ba-gestalt dock/CTA verdict | grain rules byte-preserved in compiled dist | **W-REFLECT3** |
| D-G2 | the WS12 late capture sweep (all 10 roster surfaces, Model-B) | a cost (re-capture), not an unknown; the joinery proof is device-free | **WS12 `BG.W-PAGE-COMPONENT-AUDIT`** + the close |
| D-G6 | F-AA-LIVE dual-engine `_anchor` re-shoot at `ebf6e45b` + the light-eyebrow ≥4.5 lift | the device-free gate ran GREEN 3/3; the anchor is merge-base-verified | **`BG.W-GATE-FIELD-AURORA`** + **`BG.W-EYEBROW-LIGHT-POLISH`** + W-REFLECT3 |
| D-G1 | pinned `uChromatic+ε` · WebKit compile-time · Metal-rasterizer drift · WGSL Tier-2 FBO on Safari.app | the operator correction + calibration algebra + the named fallback ladder are decided; C18 harness ships | **WS8 `BG.W-GLASS-BACKDROP-SAMPLE`** (C17 calibration) + **WS7 `BG.W-SAFARI-PARITY-GATE`** + the close |
| D-G5 | the `--run full` `/tmp` siblings-absent dry-run (after 15 homes + 16 readers re-pointed) + the `rm` | mechanism sound; the corrected 16-site census + de-blinded C2 specified; the dry-run is the backstop | **BH-B5c → B4f** (`proof:claude-deletable` born-RED→GREEN) |
| D-G7 | post-WS12 `verify-export-types`/`subpath-enumeration` re-pin + the human siri-waveform PUBLISH/INTERNAL call | regen proven (C1 EXACT_REPRODUCTION); pre-derived INTERNAL grounded | **BH-B2.1-swap** (after WS5∧WS6∧WS12, before BG.W-CUT) |
| **D-CSAFARI ★★★** | the whole C-SAFARI 3-tranche chronic: the FULL refraction shader rendering + AA-over-composite + dock-blur sign-off on REAL macOS Safari/WebKit 26 + Metal | the GPU floor is REAL (FBO renders FRAMEBUFFER_COMPLETE on M5 Metal); the named fallback ladder bounds the worst case | **WS9/M9 dual-engine paint** + **`BG.W-CUT`** `--run ship` (the single biggest execution risk — owned, not hidden) |

### The verdict

**~93% of built work is VERIFIED. ZERO restart candidates.** The DAG + build order are KEEP
(`WS1→WS3→WS2→WS5→WS6→WS4→WS7→WS8→WS9→WS10→WS11→WS12→BH`). No wave clobbered an earlier deliverable; no gate was
weakened to pass; the cursor is honest at the row level; the D-1/D-2/D-3 live defects are FIXED. **The user's low
confidence was the close battery / the ba-gestalt keystone (G2) / the field-aurora proof (G6) — NOT bad design.** The
5.0.0 tag CANNOT fire as wired today (`proof:ba-gestalt` 0/10 `[local,ci,release]`; the 4 close-reds R1–R4 live —
`ladder.css`=527L, `shell.css`=510L; the §4 roster reconciliation never run) — the 7 gap waves are exactly what
unblocks the tag. Every gap is an executable wave with a named locking gate + a de-risked build-phase approach; the
residual is build-phase proof (de-risked, with a named proving wave) + execution-verify, NOT a feasibility unknown or
a design restart. **developReady: TRUE → EXECUTE THE AMENDED PLAN.**

---

## The CRITICAL PATH (the longest dependency chain)

The deepest single-thread chain runs ~14 stages (verification-frozen FIRST, tag-fire LAST):

```
WS7·PAINT-IS-THE-GATE (FIRST — born-RED ground-freeze before integration)
 → WS7·CLOSEFIX-9SITE (amendment 1 — the 9-site atomic close-fix; clears R1–R4 before WS1 integration)
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
 → BH[WS12]·B2.1-swap (regen/classify/enumeration re-pin — after WS5∧WS6∧WS12) → B5c (16-reader re-home)
 → WS7·CUT (the tag fires LAST, only after --run ship over the served roster)
 → BH·B4f (rm CLAUDE.md — the absolute-last act, task #63, after the tag)
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
