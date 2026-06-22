# BF.W-JUBILANCE-WIRE — wire the dead haptic + celebration-burst engines onto real surfaces + kill the phantom-consumer gate class

**Band 2 · Tier T5 · depends: W-DOCK-INTEGRATE (T4) · W-FLIP-SPINE (T1) · W-PI-AUTHOR (T2) · W-GESTALT-WIRE (T1)**

## The defect / the ask

The BE work built two jubilance engines, both **dead-on-arrival (ZERO call sites)**:

- **`useHaptic.pulse`** (read it — `src/composables/motion/core/useHaptic.ts`) — the feature-detected `navigator.vibrate` wrapper with a bounded named-pattern register (`tap/snap/detent/completion/error`, all ≤100ms). A grep for `useHaptic`/`.pulse(` over `src/` finds ONLY the engine itself. Nothing fires it.
- **`useCelebrationBurst.burst`** (read it — `src/composables/motion/useCelebrationBurst.ts`) — the one-shot earned glass-petal radial bloom (warm-cream petals, the bouncy spring via `springTimingFunction(springPreset('bouncy'))`, compositor-only, PRM-static). A grep for `useCelebrationBurst`/`.burst(` over `src/` finds ONLY the engine. Nothing fires it.

And the gate class is **phantom-consumer**. `proof:haptic`'s H5 (read `scripts/proof-haptic.mjs`) asserts the ≥2-consumer bar by **grepping the markdown evidence file** `docs/consumer-evidence/use-haptic.md` for `/useDragMorph|dock[- ]fission|detent|completion|CompletionSeal/gi` ≥2 times — it never reads a real `src/` call-site. `proof:celebration-burst`'s CB1 (read `scripts/proof-celebration-burst.mjs`) does the same — `evidenceNamesTwo` greps `use-celebration-burst.md` for `/merge-splash|fission|now-playing|completion|personal-best/gi` ≥2. The evidence docs themselves NAME consumers that don't exist ("available the moment a consumer opts in", "lands with the fission orchestrator", "Consumer-#2, lands with the fission orchestrator") — booked, not real. The gate greens on the markdown prose while the engine is dead. This is **the close-class lie BF exists to kill** (§2 reframe 3, the precept-4 bar: the ≥2-consumer bar asserts real `src/` call-sites, never markdown keywords).

- **R18** (jubilance — ripple/splash/recoil/haptics/breathing) — ENGINES DEAD; consumer-evidence is phantom.
- **D9** — phantom consumer-evidence (markdown claims consumers that don't exist; gates grep keywords not call-sites) → BUILD (fix the gate class: real `src/` call-site assertion).
- **D13** — `useHaptic` + `useCelebrationBurst` ZERO call sites → BUILD.
- **D31** — `useCelebrationBurst` vs the shipped `CompletionSeal` (two earned-moment primitives) → BUILD (reconcile).

## The mechanism

Wire each engine onto **≥2 REAL `src/` surfaces** (the call-sites the evidence docs promise), and CONVERT both gates from markdown-keyword grep to real-call-site assertion.

1. **`useHaptic.pulse` — seat at the platform's confirm-moments (≥2 real call-sites).** The engine adds no listener/rAF — `pulse()` is a one-line imperative call inside a callback the library ALREADY owns. Seat it at:
   - **`useDragMorph.onSnap` → `pulse('snap')`** (read `src/composables/motion/useDragMorph.ts` — the fling-to-nearest `committed`-guarded `onSnap(value)` callback). Wire `useHaptic` into the drag primitive (or its `<SegmentedTabs draggable>`/`DockLayerGroup` consumer) so the drag landing in a slot confirms in the body. OPT-IN per the `enabled`-default-false flag (a silent consumer is byte-identical — the no-silent-vibrate floor).
   - **The `useDockFission` settle → `pulse('detent')`** (read `src/components/custom/dock/composables/useDockFission.ts:445-455` — the `activeSpring.settled` branch). The fission piece seating into its detent fires the tiny double-tick `[6, 18, 6]`. Wire it at the orchestrator's settle (or `<DockNowPlaying>` reading the `fissioned` ref edge — W-DOCK-INTEGRATE's surface).
   - **The press path → `pulse('tap')`** (the third confirm — `useLiquidPress`/`useSpringPress` press settle, OR the `useDockCtaReceive` seat hand-off). A press landing confirms.

   NO auto-suppress under PRM (the recorded distinction — a haptic is not a vestibular trigger; the suppression axis is the `enabled` opt-out + the browser permission model). The engine is `vue`-only → root-barrel-safe; wiring it adds no heavy peer.

2. **`useCelebrationBurst.burst` — seat at the earned moments (≥2 real call-sites) + reconcile with `CompletionSeal`.**
   - **The fission MERGE-SPLASH** — on the reverse fission (`--dock-split-t` 1→0, the N pieces merging back into ONE liquid surface — `useDockFission` already gates `[data-merging]` + paints the `fission-bridge.css` gold-coalesce `::after`). `<DockNowPlaying>` (W-DOCK-INTEGRATE) fires `burst({ preset: 'bouncy' })` over the convergence point on the N→1 re-merge settle — the petal bloom rewards the completion event the gold splash already marks.
   - **An earned completion** — a now-playing track-complete / queue-done / personal-best moment fires `burst()` over the surface. This is the SECOND real consumer.
   - **The `CompletionSeal` reconcile (D31).** Read `src/components/custom/completion-seal/CompletionSeal.vue` — it owns the gold-DRAW seal (a `stroke-dashoffset` wipe, the one-shot earned mark, `play`/`onSettled`). `useCelebrationBurst` is the radial BURST. They are **disjoint registers, ONE earned-moment family**: the seal is the DRAWN mark (the badge), the burst is the radial bloom (the jubilant outward petals). The reconcile: `CompletionSeal` fires the burst at its `onSettled` (the seal draws, THEN the petals bloom — the earned moment lands with both), composing `useCelebrationBurst` — so the seal is one real burst consumer AND the two earned-moment primitives are coupled, not competing. Recorded as the disjoint-register rationale in the evidence doc (NOT folded into one — a seal without a burst is a quiet completion, a burst without a seal is a transient jubilance; both are valid, the coupling is opt-in).

3. **CONVERT the gate class — real call-site assertion (the phantom-consumer-class fix).** Replace H5's and CB1's markdown-keyword grep with a `src/`-tree scan: enumerate the actual files that import the engine AND call `.pulse(`/`.burst(`, assert ≥2 distinct `src/` (non-`demo/`, non-`.md`) call-sites. The evidence doc stays the rationale home but is no longer the ≥2-bar's PROOF — the proof is the real call-sites. The self-test plants a markdown-only "consumer" and asserts it now REDS (the phantom-consumer bite — the gate that greened on prose must now red on it).

## The gate — proof:haptic-couple (H5 converted) + proof:celebration-burst (CB1 converted), born-RED → GREEN

Both gates stay device-free SOURCE arms; the BINDING paint is the π + the gestalt row.

**`proof:haptic-couple` — H5 CONVERTED (the real-call-site bar):**
- **H5 — ≥2 REAL `src/` call-sites.** Scan `src/` for files that import `useHaptic` AND call `.pulse(`; assert ≥2 distinct non-`demo/`/non-`.md` paths (the drag-snap, the fission detent, the press tap). The markdown evidence doc is the rationale, NOT the count source. REDS while zero real call-sites exist (the pre-fix tree — the engine is dead).
- The H1-H4 clauses STAY (exists-once / feature-detected-no-throw / bounded-sub-100ms-no-buzz / opt-in-enabled-default).

**`proof:celebration-burst` — CB1 CONVERTED (the real-call-site bar):**
- **CB1 (evidence arm) — ≥2 REAL `src/` call-sites.** Scan `src/` for files that import `useCelebrationBurst` AND call `.burst(`; assert ≥2 distinct non-`demo/`/non-`.md` paths (the fission merge-splash, the earned completion / `CompletionSeal` onSettled). REDS while the only "consumers" are markdown prose.
- **CB1 (reconcile arm) — the `CompletionSeal` coupling is REAL.** `CompletionSeal.vue` either composes `useCelebrationBurst` at its `onSettled` OR the evidence records the disjoint-register rationale with the real distinct call-sites named (the D31 decision is articulated, not deferred).
- The CB2-CB5 clauses STAY (composes-the-substrate-no-fork / compositor-only / warm-cream-identity / PRM-static).

**Self-test bites (each MUST red):** (a) the only "consumer" is a markdown evidence line (no real `src/` call-site) → H5/CB1 RED (the phantom-consumer bite — the load-bearing fix: the gate that greened on prose now reds on it); (b) ONE real call-site → H5/CB1 RED (the ≥2 bar); (c) a `demo/` story call-site counted toward the bar → RED (the bar is `src/`-only, the visual-load-bearing discipline); (d) the existing H/CB shape bites stay (no-guard vibrate, over-100ms, saturated petal fill, sparkle-sweep revival, missing PRM branch).

**What reds on the pre-fix tree:** H5 + CB1 (zero real call-sites — both engines dead), the phantom-consumer self-test bite (the markdown-only consumer must now red).

## The binding π — tests-visual/jubilance-wire.spec.ts

The painted-truth readback for the celebration burst (haptic is a body-confirm with no paint — its truth is the real call-site + the unit-test that it fires inside the snap callback; the π is the burst). BOTH modes AND the **webkit project**:

- **Surface:** `demo/stories/feedback/celebration-burst.vue` + `demo/stories/dock/dock-nowplaying.vue` (composing the SHIPPED engines at their real call-sites), at `:5199`.
- **The merge-splash burst PAINTS:** drive a `<DockNowPlaying>` fission re-merge (1→0); capture the petal frame-series — assert N warm-cream glass petals bloom outward from the convergence point (each a `color-mix(in oklab, var(--glass-bg-*), …)` fill, NOT a confetti sprite), scale + fade + decongest (blur 0→2px) on the bouncy spring, then gone (no stale DOM) — coupled with the shipped gold-coalesce splash.
- **The earned completion burst:** the `CompletionSeal` onSettled fires the burst — capture the seal draw THEN the petal bloom (the two earned-moment registers coupled, the D31 reconcile painted).
- **PRM single-paint:** under reduce, `burst()` spawns ZERO drifting petals and fires only the terminal settle cascade (the earned moment confirms terminal-only — one static frame).
- **The webkit arm** captures the petal bloom on Safari (the `springTimingFunction` curve + the compositor `transform`/`opacity`/`filter` all WebKit-supported).

## The gestalt row

**BF-roster surfaces: `dock-fission` (the merge-splash + petal jubilance) + `feedback-celebration` (the earned moment).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: an earned moment BLOOMS — warm-cream glass petals read as the SAME frosted material the surface is made of (not flat emoji-confetti); the dock re-merge rewards the completion with the petal bloom + gold splash; a drag/fission/press confirms in the body (the haptic, felt where the platform allows). Born-FAIL on the BE tree (the engines are dead — nothing fires); flips PASS at W-REFLECT on fresh pixels. Wired into the BF roster by W-GESTALT-WIRE.

## Fences

- **No-legacy / clean break.** No second earned-moment engine — `useCelebrationBurst` (the radial burst) + `CompletionSeal` (the drawn seal) are the disjoint family, coupled not duplicated. No second haptic path. No `disco`/sparkle-sweep revival in the petals (the §6 calm register — CB4 kills it).
- **No re-fork.** `useCelebrationBurst` COMPOSES `springTimingFunction(springPreset('bouncy'))` (the shipped kf substrate — no hand `(response, ζ)`); `useHaptic` adds no engine (a thin `navigator.vibrate` wrapper). The wiring fires them inside EXISTING callbacks (`onSnap`/the fission settle/`onSettled`) — no new gesture engine, no new rAF.
- **Presets-in-consumers.** The `:tone` petal hue / the album-keyed burst color lives in the consumer (written to `--glass-accent`, the W-GLASS-ACCENT seam); the default is the warm-cream library identity. The haptic `enabled` flag default-false (no silent vibrate).
- **NO auto-suppress under PRM for haptic (the recorded distinction).** A haptic pulse is motion-adjacent but `prefers-reduced-motion` is a VISUAL-vestibular signal; the pulse is not a vestibular trigger. The suppression axis is the consumer `enabled` opt-out + the browser permission model — never an auto-PRM gag. (The burst, by contrast, IS PRM-static — the petals are visual motion.)
- **The specific anti-pattern this must NOT become (the load-bearing fix):** a markdown evidence file NAMING consumers that don't exist (the phantom-consumer class). The gate's ≥2-bar asserts REAL `src/` call-sites; the self-test plants a markdown-only consumer and asserts it REDS. A gate that greens on prose is forbidden.

## Disposition links

- **D9** — phantom consumer-evidence (markdown claims consumers that don't exist; gates grep keywords not call-sites) → BUILD: `proof:haptic-couple` H5 + `proof:celebration-burst` CB1 converted from markdown-keyword grep to real `src/` call-site assertion + the phantom-consumer self-test bite. CLOSED (the gate-class fix).
- **D13** — `useHaptic` + `useCelebrationBurst` ZERO call sites → BUILD: wired onto ≥2 real `src/` surfaces each. CLOSED.
- **D31** — `useCelebrationBurst` vs the shipped `CompletionSeal` → BUILD (reconcile): coupled at `CompletionSeal.onSettled` as the disjoint earned-moment family, the rationale recorded. CLOSED.
- **R18** — jubilance (ripple/splash/recoil/haptics) → wired (the ripple/splash already paint via `fission-bridge.css`; this wave wires the haptic + the petal burst onto real surfaces). CLOSED (breathing is a separate ambient register — booked if a real consumer lands, per `proof:be-fold-ledger`).
