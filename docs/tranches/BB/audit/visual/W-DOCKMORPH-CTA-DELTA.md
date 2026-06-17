# W-DOCKMORPH-CTA — DELTA (the external-CTA-morphs-into-dock receive seam)

**Wave**: BB.B2 W-DOCKMORPH-CTA (`dockmorph-cta-receive`)
**Capture date**: 2026-06-17 (authored at impl; the binding live-π capture rides W-REFLECT3 on a real-GPU/CDP dev-box per the AY W-LIVE1 split + the `proof:ba-gestalt` dock verdict)
**HEAD sha at authorship**: 533d94f5 (BB in-repo pre-cut round 1) + this wave
**Dev-box / origin**: the `:5199` demo vite server (`demo/stories/dock/cta-receive.vue`, the new "CTA → Dock Morph" story)

## The charge (cross-repo-inbound.md §5, re-grounded at HEAD)

> `dockmorph-cta-receive` — W-DOCK-MORPH-FAMILY (complete) — confirm-or-build the external-CTA-morphs-into-dock seam (compositor-flat, PRM-seats).

The ask: a seam where an EXTERNAL CTA (a button/control OUTSIDE the dock) MORPHS INTO the dock — a continuous compositor-flat morph (the CTA flies/reshapes into a dock control, the iOS bloom-from-source INVERSE), PRM-seats.

## The §0 re-ground (the CONFIRM-OR-BUILD verdict: **BUILD** a thin composition)

Re-greped at HEAD 533d94f5 — the morph substrate is all present, but NO seam expresses the external→dock-control direction:

- **`dockMorphContext.ts` / `dockMorphMeasure.ts` + the `--dock-morph-t` scalar + `useDockOrientationMorph`** own the dock's OWN collapse/expand + V↔H morph mechanism (W-DOCK-MORPH-FAMILY, complete). They morph the dock's own box — never an EXTERNAL element onto a dock control. BYTE-FENCED (the orchestrator internals + `DOCK_SPRING` are W-DOCK-MORPH-FAMILY's; this wave does not touch them).
- **`useLiquidReveal.ts`** (BB.W-LIQUID-REVEAL) blooms a SURFACE FROM a trigger's rect onto its OWN settled rect (the open) — the FLIP inversion driven 1→0. Its end-state is the surface's OWN rect, NOT a foreign target. It cannot express "the CTA flies onto a dock control."
- the kf `ElementMorph` + `springTimingFunction` substrate is the shared physics core both the reveal and this seam compose — present + consumed (no longer dormant).

So the seam is the reveal's COMPLEMENT — the FORWARD play of the SAME `ElementMorph` core (`ElementMorph(ctaRect, dockControlRect)` driven 0→1: the CTA is identity at 0, flies + reshapes onto the dock control at 1). A genuine gap remained (no external-CTA→dock-control path); BUILD it as a thin CONSUMING leaf BESIDE the dock morph mechanism.

## The build (the activating consumer — wiring, not a net-new engine)

### `useDockCtaReceive` (the receive seam leaf — `/motion`, keyframes-bearing)

`src/composables/motion/useDockCtaReceive.ts`. Composes the SAME kf `ElementMorph` (the compositor `translate()+scale()` rect-delta) + `springTimingFunction({response, dampingFraction})` (the typed `{fn,css}` pair, sampled from the SAME `SPRING_PRESETS` row the `--spring-*` CSS tokens + `useLiquidReveal` generate from — via `springPreset(name)`, never a hand `(response, ζ)`). The morph is the FORWARD play: `ElementMorph(ctaRect, dockControlRect)` driven 0→1 — at progress=0 the CTA is identity (its own rect), at progress=1 it is the full delta (translated to the dock control's centre + scaled to its size). THREE coupled channels — `transform` (the fly+reshape, SPATIAL, the spring overshoot at arrival), `opacity 1→0` (EFFECTS, the CTA fades as it is absorbed so it does not double-paint over the dock control at the landing), `filter: blur(0)→blur(4px)` (the iOS congest — the CTA dissolves INTO the dock's glass on the CTA's OWN pixels, NOT `backdrop-filter`). COMPOSITOR-ONLY (transform/opacity/filter, never a layout property — the W-MOTION-CANON `proof:no-layout-animation` floor). PRM-SEATS deterministically (under reduce: snap the CTA to opacity 0 in ONE synchronous step — the dock control is already in place, so a snap-to-gone is the correct seat — zero transform/blur frames, then fire `onReceived`; the gesture still completes). `onReceived` is the hand-off seam (the consumer hides the CTA + lights the dock control). Published on `@mkbabb/glass-ui/motion` (the SCC-trap discipline — keyframes-bearing, never the root barrel). Mirrors the `useLiquidReveal` sibling shape exactly (same register, same channel split, same PRM discipline — ONE spring family, two directions).

The leaf does NOT import/edit `dockMorphContext` / `dockMorphMeasure` / `DOCK_SPRING` (the byte-fence — a CONSUMING seam beside the dock morph mechanism, not an orchestrator edit).

### `cta-receive.vue` (the demonstration — `/dock` story)

`demo/stories/dock/cta-receive.vue` ("CTA → Dock Morph", registered in `demo/stories/manifest.ts`). An external `<Button variant="primary-audacious">` CTA (the morph vehicle, OUTSIDE the dock) flies + reshapes from its own rect ONTO a target `<DockIconButton>` (the receive destination), fades + congests into the glass, then hands off (the dock control flashes a glass luminance-lift — a compositor-safe `transform: scale` + `box-shadow` on the snappy clock, PRM-carved). Composes the shipped `useDockCtaReceive` leaf (NO demo-local re-implementation of the morph; NO hand-rolled `ElementMorph`/rAF). Over `<DockStage>` (the ONE shared offscreen-paused aurora field — no net-new GL context, the one-GL-per-route budget holds).

## The fences held

- **The dock morph mechanism is byte-untouched.** `dockMorphContext.ts` / `dockMorphMeasure.ts` / `DOCK_SPRING` are READ-ONLY here (R2 asserts no import). `proof:dock-morph-family` stays GREEN.
- **Compositor-only.** The leaf writes ONLY transform/opacity/filter; the demo's lit-target transition is transform/box-shadow only. `proof:no-layout-animation` stays GREEN (45 keyframes + 235 transition legs + 33 `<Transition>` legs scanned, 0 off-allowlist).
- **The per-spring clock fence.** The leaf samples `springPreset("snappy")` (the W-GLASS-CAL fence — no second clock, no hand-tuned literal). R3 reds an inline `{ response: 0.NN, dampingFraction: 0.NN }`.
- **The dock fleet stays GREEN.** `proof:dock-unify` (the new `cta-receive.vue` FEATURE_EXEMPT census entry + the doc mirror), `proof:dock-morph-family`, `proof:liquid-reveal` all PASS.
- **The SCC-trap discipline.** Keyframes-bearing → `/motion` only, never the root barrel. `proof:vueuse-free-root` stays GREEN (root reach to @vueuse: none).
- The GL/GPU shader fence + ppmycota fence hold (this wave touches no shader, no library color token).

## The gate (born-RED → GREEN)

`proof:dockmorph-cta` (`scripts/proof-dockmorph-cta.mjs`, `["local","ci","release"]`). Five device-free SOURCE clauses + a self-test bite:

- **R1** — the leaf composes the kf `ElementMorph` + `springTimingFunction` from `@mkbabb/keyframes.js` (NOT a hand-rolled rAF spring) AND writes ONLY transform/opacity/filter on the receive path (the compositor-only floor — a layout-property write reds even with the kf import present).
- **R2** — the byte-fence: the leaf does NOT import `dockMorphContext` / `dockMorphMeasure` / `DOCK_SPRING` (a CONSUMING seam beside the dock morph mechanism).
- **R3** — the same sampled register: the leaf reads `springPreset(name)` from the shared `SPRING_PRESETS` table; an inline hand-tuned `{ response: 0.NN, dampingFraction: 0.NN }` literal reds (the W-GLASS-CAL fence).
- **R4** — PRM seats deterministically: under reduce the leaf snaps opacity (zero transform/blur frames — no `morph.apply`/`requestAnimationFrame` in the PRM branch) + hands off (the gesture completes).
- **R5** — the seam is demonstrated (`cta-receive.vue` composes the leaf with a real `<DockIconButton>` target, no demo-local re-fork) + wired (the `/motion` barrel re-exports it).
- **self-test bite** (proven every run): a synthetic leaf that hand-rolls the spring / writes a layout property / imports `dockMorphContext` MUST flag R1+R2; a synthetic still-animating PRM branch MUST flag R4; a synthetic demo-local morph re-implementation MUST flag R5.

Born-RED verified: with the leaf absent → `[R1] src/composables/motion/useDockCtaReceive.ts does not exist`. GREEN at HEAD with the wave landed.

## The binding π (rides W-REFLECT3 — LOCAL-only, real-GPU)

The PAINTED truth — the CTA fly+reshape frame-series onto the dock control (t=0/.25/.5/.75/1: identity → translated+scaled toward the control + fade-out + congest), the landing hand-off, the PRM single-paint (snap-to-gone, zero transform frames), both modes — is the binding π captured at W-REFLECT3 + the `proof:ba-gestalt` dock-band verdict (the source-green/visually-broken close is the AZ failure class the gestalt bar kills; both halves must hold for a clean close).
