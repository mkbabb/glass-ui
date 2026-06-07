# Dock-animation SOTA + diagnosis (12-agent, complete)

## Lane 1

I have a complete picture of the architecture, the Apple SOTA, and the existing remediation history. The dock has clearly been through several iterations (AU.W2, AU.W8, AV.W9). Let me write the brief.

---

# AW dock-animation brief — lane `ios-spring-physics`

Research + diagnosis + wave seeds. No implementation. keyframes.js is READ-ONLY (name-forward).

## 1. iOS spring SOTA — what makes motion feel iOS-grade

**The damped-harmonic-oscillator, two-parameter form.** Apple's whole control language is one ODE: a mass on a spring with a damping force. The designer-facing knobs are `response` (how fast it reaches target — a *perceptual* duration) and `dampingFraction` ζ (how the oscillation decays). Physics mapping (WWDC18 "Designing Fluid Interfaces"):
```
stiffness = (2π / response)²
damping   = 4π × ζ / response
```
[Apple `spring(response:dampingFraction:blendDuration:)`](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blenduration:)) — default `response 0.55, dampingFraction 0.825`. (fetched 2026-06-06)

**WWDC23 re-parameterized to `duration` + `bounce`** (same ODE, friendlier axes). `bounce > 0` underdamped (overshoots), `bounce = 0` critically damped (the default, "most versatile general-purpose spring"), `bounce < 0` overdamped. Guidance: **bounce ~0.15 = small/brisk, ~0.30 = noticeably playful, > 0.40 = avoid for UI** (too exaggerated). Conversion: `mass=1; stiffness=(2π/duration)²; damping = 1 − 4π·bounce/duration` (bounce≥0). [Animate with springs — WWDC23 session 10158](https://developer.apple.com/videos/play/wwdc2023/10158/) (fetched 2026-06-06).

The overshoot is closed-form from ζ: `overshoot = exp(−ζπ/√(1−ζ²))`. ζ=1 → 0% (critical), ζ=0.5 → ~16%, ζ=0.45 → ~20.5%. This is exactly what the repo's `regen-spring-tokens.mjs` comment cites.

**Interruptibility is the headline property.** WWDC18's rule: fluid interfaces are "responsive, interruptible, and redirectable" — apps can be killed mid-launch-animation. When a spring is **retargeted mid-flight, it carries its current velocity into the new solution** — "uses the velocity it had when it was retargeted as the initial velocity towards its new destination… makes these interruptions feel smooth and natural" (WWDC23). A dispose+reconstruct-from-rest on re-toggle is the non-iOS tell.

**"Springs don't have to be springy."** The reason springs feel *responsive* (not laggy) is the shape, not the bounce: they **start incredibly quickly and spend most of their time gradually approaching the final state** ([Building Fluid Interfaces](https://www.breakfreegraphics.com/design-blog/building-fluid-interfaces/), fetched 2026-06-06). A duration-based ease (`ease-in-out`) ramps *up* — feels delayed. A spring jumps then settles — feels instant. This is the core "not delayed/laggy" lever.

**The projection formula** (momentum-gated landing — where a flung gesture should settle):
```
Distance = (initialVelocity / 1000) × decelerationRate / (1 − decelerationRate)
```
Used to "reward momentum" so a flick lands where physics predicts. (WWDC18; same source.)

**`interactiveSpring`** preset for gesture-driven (continuously interrupted) motion: `response 0.15, dampingFraction 0.86, blendDuration 0.25` — fast, near-critically-damped, designed to be retargeted every frame ([Apple `interactiveSpring`](https://developer.apple.com/documentation/swiftui/animation/interactivespring(response:dampingfraction:blendduration:)), fetched 2026-06-06). This is the model for slider-drag / scrub feedback, NOT for the expand morph.

**iOS-26 Liquid Glass cautionary note.** The press-time "squish-and-settle" + pointer-tracked specular is the desirable half. But NN/g and others flag iOS-26 over-animating: controls that "bubble and wiggle," "swimmy" layered motion, carousel dots morphing into text — motion the *user didn't ask for*. Takeaway for AW: bounce belongs on **user-initiated** state changes (tap, expand), not idle/ambient morphs, and must honor `prefers-reduced-motion`. [NN/g — Liquid Glass](https://www.nngroup.com/articles/liquid-glass/), [Make Tech Easier](https://maketecheasier.com/remove-ios-liquid-glass-animations/) (fetched 2026-06-06).

## 2. Diagnosis — the current dock against the SOTA

The dock has already been remediated three times for exactly the "not iOS-smooth / shrink-before-fade" defects (AU.W2 lockstep, AU.W8 snappy→dock retune, AV.W9 dual-driver-race fix + velocity retarget). The architecture is now mostly RIGHT. Findings:

**What's already correct (keep, don't re-litigate):**
- Velocity-continuity on interrupted swap is implemented — `useLayerTransition.ts:242-243` re-seats a live `SpringProgress` from `(value, velocity)` instead of dispose+reconstruct (the iOS retarget contract). Comment cites keyframes.d.ts:800.
- Lockstep fade is implemented — the layer opacity rides `--dock-motion-resize` (same duration+spring as the morph), not the faster `--dock-motion-fast`. `dock.css:524-529` + the AU.W2 note at `:516-523`. This is the literal fix for the "items lag the pill" report.
- Single-origin swap — the class-opacity flip and the width-set start in the **same rAF** (`useLayerTransition.ts:263-283`), so the box can't shrink before items fade.
- One-driver-per-concern — size = spring/VT, opacity = CSS crossfade, visibility = delayed-hold fork. The dual-driver race (CSS `interpolate-size` second-driving width) was retired at AV.W9.0 (`dock.css:460-475`).
- Press squish uses a no-overshoot spring on `:active` (`dock-controls.css:23-32`, AV.W9.3) — correct per Apple's "bounce 0 default" + momentum-gated.

**Where it still diverges from iOS-grade (the AW seam):**

1. **Two morph clocks, not bit-identical in practice.** The container size is driven by the **JS `SpringProgress`** (`useLayerTransition.ts:308-318`, `DOCK_SPRING = {response:0.5, ζ:0.5}`) while the layer *opacity* rides a **CSS `linear()` token** (`--dock-motion-resize` = `--dock-resize-spring` = `--spring-dock`, the 48-stop sampled approximation). The comment claims "bit-identical," but a continuous analytic ODE (JS) and a 48-point piecewise-linear sample (CSS) are NOT bit-identical, and critically: **on a velocity-retarget the JS spring re-seats from live velocity but the CSS opacity `linear()` restarts from 0% every swap.** So on a rapid re-toggle, size stays continuous (good) while opacity snaps-and-replays (the residual lag tell). The opacity is the half that still isn't iOS on interruption.

2. **`response 0.5` is on the slow side for a control.** Apple's interactive/control springs cluster `response 0.15–0.35`. `--spring-dock` at 0.5 with ζ=0.5 gives a lush ~18.5% overshoot but a perceptually long reach — fine for a deliberate expand, arguably sluggish for a hover-triggered dock that should feel *instant*. The "feels laggy" complaint can come from response being too high even when the curve shape is right.

3. **Rail indicator + container morph + content fade are three separate timing declarations**, not one orchestrated system. The TabsIndicator travels on `width/transform var(--dock-motion-resize)` (`dock.css:835-837`), the stack morphs on the JS spring, the panes crossfade on CSS. They share a *token* but not a *clock* or a *velocity*. When you switch a layer, the indicator, the size, and the fade can settle microseconds apart. iOS treats a control transition as ONE coordinated spring with shared velocity.

4. **Hover-scale and the layer morph are decoupled.** `.glass-dock.collapsed:hover { scale: 1.1 }` (`dock.css:386-391`) rides whatever the base transition is, while expand rides the spring. The collapsed→expanded gesture mixes a scale-ease and a width-spring — two motion languages on one gesture.

5. **No velocity handoff from the trigger gesture.** The expand is a discrete state flip (hover/click → `expand()`), so the morph always starts from rest velocity. There's no gesture-driven scrub (no `interactiveSpring`-style drag-to-open), so the dock never gets the "rewards momentum" feel — acceptable for a hover dock, but a wave-seed candidate for the slider/scrub surfaces.

6. **Wrap/overflow is a hard CSS snap, un-sprung.** `overflow="wrap"` flips `flex-wrap` and `border-radius` at a `@media` breakpoint (`dock.css:919-944`) with no morph — the multi-row reflow pops. "Graceful wrap" (an explicit goal) is currently a jump-cut.

7. **Reduced-motion correctness is good but split across three gates** (VT CSS, the JS PRM fast-path at `useLayerTransition.ts:219-228`, and the spring's own `respectReducedMotion`). Worth a single audit, not a refactor.

## 3. ADOPT / wave-seed list (AW dock-animation)

Concrete, name-forward (keyframes.js read-only — reuse `SpringProgress`/`springLinearStops`, don't modify them).

- **AW.W?-α — One spring, one clock for the whole layer transition.** Drive container size AND pane opacity AND the leaving-pane fade off the SAME `SpringProgress` instance's progress (read its normalized 0→1 progress, apply to both `dim` and `opacity` in the one `play()` callback), instead of size=JS-spring / opacity=CSS-`linear()`. Kills the "opacity restarts from 0% on retarget while size stays continuous" split (finding 1). The CSS `linear()` token stays as the VT-path + reduced-motion fallback only.

- **AW.W?-β — Velocity-carry the opacity, not just the size.** When a swap is retargeted mid-flight, the opacity crossfade should resume from its current value with the spring's velocity, identically to the size morph (the AV.W9.2 retarget contract, extended to the second tweened axis). Direct consequence of α.

- **AW.W?-γ — Retune `--spring-dock` toward a control response.** Evaluate `response 0.35–0.4` (Apple's snappy/interactive band) keeping ζ≈0.5–0.55 for a touch of life. Lower response = the "starts fast, approaches slowly" instant feel (WWDC18). MUST update BOTH `DOCK_SPRING` in `useLayerTransition.ts:19` AND the PRESETS `dock` row in `regen-spring-tokens.mjs` + re-run the regen (the file's own contract: a retune touches both or the curves drift). Validate overshoot stays in the 15–20% "felt iOS bounce" band.

- **AW.W?-δ — Unify the rail indicator into the same orchestration.** The travelling TabsIndicator should share the layer-swap's spring clock (or at minimum read the same live progress), so the indicator, the size morph, and the fade settle as ONE coordinated motion rather than three token-sharing-but-independent transitions (finding 3). This is the "consistent animation language" goal made literal.

- **AW.W?-ε — Collapse the hover-scale + expand-morph into one spring language.** Move the collapsed:hover `scale 1.1` onto the dock press/resize spring vocabulary so a hover→expand gesture reads as one continuous spring, not ease-then-spring (finding 4).

- **AW.W?-ζ — Graceful wrap.** Sequence the `overflow="wrap"` reflow through a height/radius spring (FLIP the multi-row layout the same way the layer morph FLIPs width) so the wrap is a morph, not a `@media` jump-cut (finding 6). Honor reduced-motion (snap is correct there).

- **AW.W?-η (audit-only) — Single reduced-motion gate audit.** Confirm the three PRM paths (VT CSS, JS fast-path, spring `respectReducedMotion`) agree and that the squish/bounce are suppressed but the state change still completes instantly. Per NN/g iOS-26 critique: bounce on user-initiated only, never ambient; PRM kills bounce but not function.

- **AW.W?-θ (stretch, slider/scrub surfaces) — `interactiveSpring` for gesture-driven controls.** For the Slider keep-dock-open drag (and any future scrub transport), adopt the `interactiveSpring` profile (`response ~0.15, ζ ~0.86`) and feed pointer velocity in via the projection formula so a flick "rewards momentum." This is the one place velocity-handoff from a real gesture is available (finding 5). Out of scope for the hover-dock expand; flagged for the transport/slider arm.

### Key file:line anchors
- `src/components/custom/dock/composables/useLayerTransition.ts:19` (`DOCK_SPRING`), `:242-243` (velocity retarget), `:263-318` (single-rAF swap + spring drive)
- `src/styles/dock.css:516-529` (AU.W2 lockstep fade), `:835-837` (rail indicator timing), `:386-391` (hover scale), `:919-944` (wrap @media jump)
- `src/styles/tokens.css:163` (`--spring-dock` 48-stop), `:1295-1310` (dock-resize/press spring rationale), `:1010-1026` (press-scale rungs)
- `scripts/regen-spring-tokens.mjs` PRESETS `dock` row (response 0.5, ζ 0.5) — the dual-write contract with `DOCK_SPRING`

### Sources
- [Animate with springs — WWDC23 session 10158](https://developer.apple.com/videos/play/wwdc2023/10158/) (fetched 2026-06-06)
- [Building Fluid Interfaces (WWDC18 "Designing Fluid Interfaces" notes)](https://www.breakfreegraphics.com/design-blog/building-fluid-interfaces/) (fetched 2026-06-06)
- [Apple Developer — `spring(response:dampingFraction:blendDuration:)`](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blenduration:)) (fetched 2026-06-06)
- [Apple Developer — `interactiveSpring(...)`](https://developer.apple.com/documentation/swiftui/animation/interactivespring(response:dampingfraction:blendduration:)) (fetched 2026-06-06)
- [NN/g — Liquid Glass Is Cracked (iOS 26 over-animation critique)](https://www.nngroup.com/articles/liquid-glass/) (fetched 2026-06-06)
- [Make Tech Easier — Reduce iOS 26 Liquid Glass animations](https://maketecheasier.com/remove-ios-liquid-glass-animations/) (fetched 2026-06-06)

**Bottom line:** the dock's architecture already encodes most of the iOS contract (single-origin swap, lockstep fade, velocity-retargeted size spring, one-driver-per-concern). The remaining divergence is that **opacity and the rail indicator don't share the size spring's clock or velocity** — so on interruption the size stays continuous while the fade/indicator snap-and-replay — plus a `response 0.5` that's slightly slow for a control. The AW headline fold is α+β+δ: collapse size, opacity, and the indicator onto ONE velocity-carrying spring so the whole transition is a single coordinated, interruptible motion.

---

## Lane 2

I have everything I need. Writing the brief.

---

# AW dock-animation research brief — FLIP lockstep + SOTA

Lane: flip-lockstep. Scope: research + diagnosis + wave seeds. No implementation. inv-16: keyframes.js read-only, name-forward.

## 1. The desync the user reports — diagnosed at source

The complaint ("dock SHRINKS first, THEN the items fade/shrink a few ms later") is a **timing-fork + a property-class mismatch**, and the current code has already been patched against it twice (AU.W2, AV.W9). The residual lag is structural, not a tuning miss. Two root causes:

**(a) Size and opacity are driven by two different clocks that only *nominally* share a curve.** The container size is driven imperatively, per-frame, by a JS `SpringProgress` writing inline `width`/`height` in pixel space (`useLayerTransition.ts:307-333`). The pane opacity is driven by a *CSS* `transition: opacity var(--dock-motion-resize)` on `.dock-layer-item-host` (`dock.css:525-529`). `--dock-motion-resize` resolves to `--duration-normal var(--dock-resize-spring)` where `--dock-resize-spring` is a baked `linear()` easing (`tokens.css:163, 1301`). So size rides the analytic ODE sampled live; opacity rides a 48-stop `linear()` approximation of the *same* ODE over a *fixed* `--duration-normal`. They are designed to match (the AU.W2 fold, `dock.css:516-523`) but they are not the **same timeline** — a retarget/interruption re-seats the JS spring's velocity (`useLayerTransition.ts:234-243`) while the CSS `linear()` opacity restarts from its fixed 0→1 ramp. On any interrupted toggle the two visibly separate. The comment at `dock.css:516` literally records the original "100ms-apart settle" bug; the fix narrowed it but a CSS-`linear()` ramp and a live-velocity JS spring cannot stay frame-locked through an interruption.

**(b) The container animates `width`/`height` (D-tier, layout-triggering), not `transform` (S-tier, compositor).** This is the deeper issue. `useLayerTransition` writes inline `width`/`height` every frame (`setDim`, `:158-160, :318`), and `dock.css` transitions `width`/`height`/`padding`/`transform` together (`dock.css:254-288, :457`). Per Motion's performance tier list, `width`/`height`/`padding` are **D-tier** — each frame forces a full layout→paint→composite of the dock *and its content subtree* (the items re-flow inside the resizing box every frame). That re-flow is exactly what makes the items look like they "catch up late": the box geometry resolves first, then the children reflow into it. Animating raw size also means the children's intrinsic layout is being recomputed under them while their opacity tweens on an independent clock — the two can never be truly simultaneous because one is a layout pass and the other is a composite pass. ([Motion performance tier list](https://motion.dev/magazine/web-animation-performance-tier-list), accessed 2026-06-06; [Motion performance docs](https://motion.dev/docs/performance), accessed 2026-06-06).

## 2. SOTA for parent↔child lockstep

**The canonical fix (Framer Motion / Motion `layout`): never animate `width`/`height` — animate `transform: scale` + `translate`, and counter-scale the children.** Motion measures the layout delta (FLIP First/Last), then animates the box with `transform` (translate + scale) instead of width/height, and on every frame applies the **inverse transform to direct children** so they "appear undistorted." Everything — the box scale and the children's counter-scale and opacity — is driven off **one transition/spring**, so there is structurally no fork: the same spring value `t` produces the box scale and the child correction in the same frame. ([Motion layout animations](https://motion.dev/docs/react-layout-animations), accessed 2026-06-06). This is the single most load-bearing finding: **size on `transform`, one driver, children counter-scaled = lockstep by construction.**

**Why transform-scale beats width:** `transform`+`opacity`+`filter`+`clip-path` are the only compositor-thread (S-tier) properties; `width`/`height`/`padding` are D-tier and recalculate geometry every frame. Motion calls the FLIP-scale approach "about as good of a D-tier animation as is possible," lifting an inherently-layout operation to A-tier. ([Motion tier list](https://motion.dev/magazine/web-animation-performance-tier-list); corroborated by [KeyCDN](https://www.keycdn.com/blog/animation-performance) and [MDN/WICG performance guidance](https://web.dev/animations-guide/), accessed 2026-06-06).

**GSAP Flip** independently confirms the pattern: it records state, lets you mutate the DOM/layout freely, then animates the *difference* using transforms (and absolute-positioning for content that would otherwise reflow), so the parent and its contents move as one recorded-delta timeline rather than two live size animations. ([GSAP Flip docs](https://gsap.com/docs/v3/Plugins/Flip/), accessed 2026-06-06).

**iOS interruptible-spring contract (the "iOS-like" target):** SwiftUI's spring family preserves velocity across retargets — "the spring animation uses its speed during the retargeting phase as its initial velocity toward the new destination... the interruptions from the incomplete animations make the entire animation look smooth and natural" ([Apple `interactiveSpring`](https://developer.apple.com/documentation/swiftui/animation/interactivespring(response:dampingfraction:blendduration:)); [`spring(duration:bounce:)`](https://developer.apple.com/documentation/SwiftUI/Animation/spring(duration:bounce:blendDuration:)), accessed 2026-06-06). Janum Trivedi's **Wave** engine frames this as "retargeting — preserving an animation's velocity even as its target changes" ([Wave](https://github.com/jtrivedi/Wave), accessed 2026-06-06). The dock's JS spring already does velocity-continuous retarget (`useLayerTransition.ts:234-243`) — good — but the **CSS-`linear()` opacity ramp does not**, which is the residual desync on interruption.

**View Transitions API (the native morph):** the browser snapshots old + new, then *interpolates position, size, AND opacity of a tagged element as one group* — the size morph and the crossfade are a single browser-owned timeline, structurally lockstep, zero `getBoundingClientRect`. Same-document VT hit Baseline Newly Available Oct 2025 (Firefox 144). Caveat the dock already half-knows: VT morphs via `transform` on the snapshot; if you let it morph raw `width`/`height` the browser must re-layout during the transition and you get layout-shift jank. ([MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API); [Using VT](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using); [Chrome same-document VT](https://developer.chrome.com/docs/web-platform/view-transitions/same-document), accessed 2026-06-06). The dock's VT fork (`useLayerTransition.ts:199-211`) is the right native path; the fallback FLIP path is where the width-animation problem lives.

## 3. Where the current dock stands (file:line)

- VT fork present and correct in principle: `useLayerTransition.ts:96-97, 199-211`; `GlassDock.vue:221-230`.
- Fallback FLIP drives **inline `width`/`height`** per frame (the D-tier problem): `useLayerTransition.ts:158-160, 248-333`.
- Velocity-continuous JS retarget (good, iOS-correct): `useLayerTransition.ts:234-243, 307-318`.
- Single-frame-origin swap (class-opacity + width-set in the same rAF — the AU.W8.1 fix): `useLayerTransition.ts:263-273`.
- Opacity on a **separate CSS clock** (the residual fork): `dock.css:516-529, 539-550`.
- Spring source-of-truth pair that must stay in sync: `useLayerTransition.ts:19` (`response 0.5, ζ 0.5`) ↔ `scripts/regen-spring-tokens.mjs:57-58` ↔ `tokens.css:163` (`--spring-dock` `linear()`), aliased `--dock-resize-spring` → `--dock-motion-resize` (`tokens.css:1301`, `dock.css:26`).
- Rail: reka Tabs + `TabsIndicator`, indicator rides `--dock-motion-resize` (`DockLayerGroup.vue:132-162`; `dock.css:771-840`).
- Wrap: `.dock-overflow-wrap` `flex-wrap: wrap` + `@media` breakpoint snap-back (`dock.css:669-702, 913-941`); the `@container dock` queries at `dock.css:220-227`.

## 4. ADOPT / wave-seed list (AW dock-animation)

Concrete, dependency-light, inv-16 safe (keyframes.js consumed name-forward only — `SpringProgress` already in use; no new heavy `./engine` import).

- **AW.W-α — transform-scale FLIP (HEADLINE; kills the desync at the root).** Replace the inline-`width`/`height` fallback driver with a **transform-based** FLIP: pin the box at its *destination* (natural/full) size, animate `transform: scale()` + `translate()` from the collapsed delta → identity off ONE `SpringProgress`, and **counter-scale the layer content** (inverse `scale`) per frame so items stay undistorted. Size + child-correction become the same spring frame → lockstep by construction; the whole morph runs on the compositor (S-tier), not layout (D-tier). This is the Motion `layout` recipe transplanted onto the existing `SpringProgress` driver. Gate: extend `proof:dock-motion-single-source` to assert no per-frame `width`/`height`/`padding` write on the fallback path.

- **AW.W-β — opacity onto the SAME driver (close the residual fork).** Drive pane opacity from the **same `SpringProgress.play` callback** as the box transform (write `el.style.opacity` from the spring's normalized progress), not from an independent CSS `transition: opacity var(--dock-motion-resize)`. One clock, velocity-continuous through interruption. Retire the `opacity var(--dock-motion-resize)` line at `dock.css:525-529` for the JS-driven path (keep it only as the PRM/no-JS fallback). This is what finally makes "items fade in lockstep with the container" exact rather than approximate.

- **AW.W-γ — VT-first, transform-fallback parity.** Audit that the native VT path morphs via `transform` not raw size (MDN caveat), and that the tagged `.dock-layers` / `.dock-layer-stack` groups (`GlassDock.vue:223-230`, `DockLayerGroup.vue:71-78`) carry a `contain`/`isolation` that prevents the VT pseudo-element from re-layouting content. Make the fallback (W-α) visually identical to the VT morph so there is one motion language across engines.

- **AW.W-δ — interruptible-spring polish on the children.** Now that children share the driver (W-β), carry their counter-scale/opacity velocity through a retarget too (the box already does, `:234-243`). Verifies the iOS interactiveSpring "speed-becomes-initial-velocity" contract holds for the *whole* morph, not just the box.

- **AW.W-ε — graceful wrap as a motion-aware reflow.** The current `flex-wrap` snap (`dock.css:684-702`) is an instant layout jump at the `@media`/`@container` boundary — it fights the smooth-morph language. Seed: when a wrap row count changes, run the row-height delta through the same transform-FLIP (W-α) so wrap/unwrap *morphs* instead of snapping. Lower-effort variant: gate the snap behind PRM and add a short `--spring-dock`-curved height settle.

- **AW.W-ζ — rail + layer-switch unification.** The `TabsIndicator` travel (`dock.css:826-840`) and the layer crossfade are two separate motions today. Seed: drive the indicator translate off the *same* `--spring-dock` value the layer morph uses (or a shared VT group) so selecting a rail tab moves the indicator and crossfades the pane on one timeline — a single interaction language for the rail.

- **AW.W-η (housekeeping) — re-baseline the spring token after any retune.** If W-α changes the curve, the `DOCK_SPRING` const (`useLayerTransition.ts:19`), the `regen-spring-tokens.mjs` PRESETS row (`:57-58`), and the emitted `--spring-dock` `linear()` (`tokens.css:163`) must move together (the bit-identical-motion contract). Name-forward only; no keyframes.js source edit.

**Priority:** W-α + W-β are the fix for the reported defect (transform-scale + one driver for size *and* opacity = the lockstep). W-γ/δ/ε/ζ are the polish/consistency folds. W-η is the gate-discipline tail.

## Sources

- [Motion — Layout Animations (React FLIP & shared element)](https://motion.dev/docs/react-layout-animations) — 2026-06-06
- [Motion — Web Animation Performance Tier List](https://motion.dev/magazine/web-animation-performance-tier-list) — 2026-06-06
- [Motion — Animation performance guide](https://motion.dev/docs/performance) — 2026-06-06
- [KeyCDN — Animation performance](https://www.keycdn.com/blog/animation-performance) — 2026-06-06
- [GSAP — Flip plugin docs](https://gsap.com/docs/v3/Plugins/Flip/) — 2026-06-06
- [Apple — `interactiveSpring(response:dampingFraction:blendDuration:)`](https://developer.apple.com/documentation/swiftui/animation/interactivespring(response:dampingfraction:blendduration:)) — 2026-06-06
- [Apple — `spring(duration:bounce:blendDuration:)`](https://developer.apple.com/documentation/SwiftUI/Animation/spring(duration:bounce:blendDuration:)) — 2026-06-06
- [Janum Trivedi — Wave (interruptible spring engine, retargeting)](https://github.com/jtrivedi/Wave) — 2026-06-06
- [MDN — View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — 2026-06-06
- [MDN — Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) — 2026-06-06
- [Chrome — Same-document view transitions for SPAs](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) — 2026-06-06

Relevant files: `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue`, `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayerGroup.vue`, `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css`, `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css`, `/Users/mkbabb/Programming/glass-ui/scripts/regen-spring-tokens.mjs`.

---

## Lane 3

I have the complete SpringProgress surface (`subscribe`, `velocity`, `snap`, `reset`, `tickToTime`, the multi-subscriber emit). This is important — the spring can drive multiple subscribers from ONE clock, which is the key to true lockstep. I have everything needed. Let me write the brief.

---

# Animation SOTA + Dock Brief — Lane `enter-exit-orchestration` (tranche AW seeds)

Research-only. No implementation. keyframes.js treated READ-ONLY (name-forward). Citations carry URL + access date (2026-06-06) and `file:line` for in-repo facts.

## 1. What the dock does today (baseline)

The collapse/expand morph is already sophisticated. Two concerns, separate owners:

- **Size** is owned by the morph engine in `useLayerTransition.ts` — forks on `startViewTransition` support. Native VT path: browser snapshots + morphs. Fallback path: a single `SpringProgress` driving the container `width`/`height` in **pixel space**, retargeted (not reconstructed) on interruption to carry velocity through (`src/components/custom/dock/composables/useLayerTransition.ts:234-333`).
- **Opacity** is owned by a CSS crossfade `opacity var(--dock-motion-resize)` on `.dock-layer{,-item-host}` (`src/styles/dock.css:524-560`). `--dock-motion-resize` = `var(--duration-normal) var(--dock-resize-spring)` (`dock.css:26`).
- **Lockstep was already attempted** (AU.W2, "not iOS-smooth" report): the fade was moved off the faster `--dock-motion-fast` (0.2s) onto `--dock-motion-resize` so fade and morph share duration + curve (`dock.css:516-523`).
- **Single-frame-origin** for the class-swap and the width-set is enforced so the box never shrinks before items fade (`useLayerTransition.ts:263-283`; gate `proof:dock-motion-single-source`).
- The spring const is `{ response: 0.5, dampingFraction: 0.5 }` — ~+18.5% overshoot — mirrored to a CSS token in `scripts/regen-spring-tokens.mjs` (`useLayerTransition.ts:19`).

So the architecture is correct. The remaining gaps are choreographic precision and a structural seam, not a rewrite.

## 2. SOTA findings

### F1 — Two valid lockstep models; the dock uses the weaker-correlated one

Framer Motion / Motion animates the **container via `transform: scale`** and applies an **inverse counter-scale to children every frame** (`childScale = 1/parentScale`, recomputed in `onUpdate`) so children never distort or lag — they are mathematically pinned to the parent's transform.
- [motion.dev/docs/react-layout-animations](https://motion.dev/docs/react-layout-animations) (2026-06-06): "To fix distortion on direct children, these can also be given the `layout` prop"; "parent-relative calculations … the child will never get 'left behind' by its parent."
- [nan.fyi/magic-motion](https://www.nan.fyi/magic-motion) (2026-06-06): "recalculating `inverseScaleX = 1 / scaleX` on every animation frame within the `onUpdate` callback." Downside noted: text inside a scaling container "appears stretched."

The dock animates **`width` directly** (not scale), deliberately — it rejected the scale model because glass/text/icons would stretch. That's the right call for a glass pill (the AV.W9.0 note also retired the CSS `interpolate-size` second-driver). **But** with the width model, the fade and the size morph are two independent clocks that merely share a *duration token* — they are not driven from one solver. CSS `transition` curves and the JS `SpringProgress` are different math; "same duration" ≠ "same trajectory." That is the residual lag class.

### F2 — One spring, many subscribers = true lockstep (the structural lever)

`SpringProgress` exposes `subscribe(fn) → unsubscribe`, called `(value, velocity)` every tick, plus `velocity`, `snap()`, `reset()`, `tickToTime()` (`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:776-840`). Today the dock uses only `.play(onFrame)` and writes `width`. The same single clock could drive **both** the container size **and** a normalized progress `0→1` that maps to child opacity/translate — so size and fade are not "two clocks at the same duration" but **one solver feeding N subscribers**. This is the web analogue of WWDC23's "share the same spring so they settle together."
- [Apple WWDC23 "Animate with springs"](https://developer.apple.com/videos/play/wwdc2023/10158/) (2026-06-06): springs "preserve the velocity it had when it was retargeted as the initial velocity towards its new destination"; different properties on one spring "settle together."

### F3 — The current overshoot is "playful," not "chrome-neutral"

WWDC23's perceptual model: bounce 0 = smooth default; ~0.15 = brisk; ~0.30 = "noticeably bouncy, playful"; >0.40 = avoid. `dampingFraction: 0.5` (~18.5% overshoot) sits at the **0.3 "playful" band** — fine for a toy, slightly much for a system dock that opens/closes constantly. A glass dock reads more iOS-native nearer bounce 0.12–0.18 (ζ ≈ 0.7–0.8), the SwiftUI `.smooth`/`.snappy` register.
- [Apple WWDC23](https://developer.apple.com/videos/play/wwdc2023/10158/) (2026-06-06); SwiftUI defaults `response 0.55, dampingFraction 0.825` for general springs; `interactiveSpring` `0.15 / 0.86`.

### F4 — Stagger should be *velocity-scaled*, not fixed-delay; and reversed on exit

Motion's `stagger` distributes child delays across the total and accepts an easing to bias the cascade; `staggerDirection: -1` reverses it for exit so items leave inner-to-outer.
- [motion.dev/docs/stagger](https://motion.dev/docs/stagger) (2026-06-06).
- The macOS Dock genie/magnify language: items resolve *as* the container resolves, never on a fixed timer divorced from the morph. A spring-progress-keyed stagger (each child's reveal threshold = a fraction of the shared spring progress) ties the cascade to the *physical* morph, so a fast flick and a slow open both look right — fixed `ms` delays break under interruption.

### F5 — Native entry/exit grammar is production-ready and should back-stop the JS

`@starting-style` + `transition-behavior: allow-discrete` + `overlay` now ship in Chrome/Edge/Safari/Firefox (FF only lacks `display:none`-origin) — the modern way to animate top-layer/discrete entries with graceful degradation.
- [Chrome for Developers — "Four new CSS features for smooth entry and exit"](https://developer.chrome.com/blog/entry-exit-animations) (2026-06-06).
- [MDN @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) (2026-06-06).
The dock already has a `@supports` VT primary over a JS fallback — same progressive-enhancement spine. AV.W9.1 retired the discrete-visibility `@starting-style` arm to keep one opacity owner; the seed below re-introduces it only for the **leaving** pane's top-layer-style hold, not as a third opacity authority.

### F6 — `interpolate-size`/`calc-size()` stays rejected

Chrome/Edge only as of 2025; the dock already removed its second-driver (AV.W9.0). Confirmed not a path.
- [MDN interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) (2026-06-06); [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size_allow-keywords) (2026-06-06): "Chrome and Edge since 129 … not currently supported in Safari or Firefox."

## 3. ADOPT / wave-seed list (concrete AW dock-animation folds)

**AW.W?-α — single-clock lockstep (the headline).** In the FLIP-fallback path of `useLayerTransition`, drive child opacity/translate from the **same `SpringProgress` instance** that drives container size, via `subscribe()` or a derived normalized progress — not a parallel CSS `transition` that only shares a duration token. One solver, two outputs (size px + fade 0→1), guaranteeing the items and the pill settle on the *identical trajectory*, not just identical duration. Removes the residual two-clocks lag the user reports. Keeps the width model (no scale-stretch). Files: `useLayerTransition.ts:297-333`, `dock.css:524-529`. (READ-ONLY keyframes — uses existing `subscribe`/`value`/`velocity`.)

**AW.W?-β — re-temper the dock spring toward chrome-neutral.** Retune `DOCK_SPRING` from `{0.5, 0.5}` (~bounce 0.3, "playful") toward `~{response 0.4–0.45, dampingFraction 0.75–0.8}` (bounce ≈ 0.12–0.18, the iOS `.snappy` register). MUST co-edit the PRESETS row in `scripts/regen-spring-tokens.mjs` (the const + token are bit-locked per `useLayerTransition.ts:19`). Tighter, less wobbly, more "system dock." Validate against the existing motion gate.

**AW.W?-γ — spring-progress-keyed child stagger (velocity-aware).** Replace any fixed-`ms` item reveal with a cascade keyed to the *shared spring's progress* (`value`/`target` ratio): each child crosses its opacity threshold at a fraction of the morph, reversed on collapse (outer→in expand, in→outer collapse, the Motion `staggerDirection:-1` idiom). Because it rides the physical morph, a fast flick and a slow hover-open both choreograph correctly, and an interrupted/retargeted morph carries the cascade with it (no orphaned timers). Citation basis F4.

**AW.W?-δ — interruption continuity audit + proof.** The retarget path already re-seats `(value, velocity)` (`useLayerTransition.ts:242-318`) — extend the same continuity guarantee to the *fade/stagger* once they ride the shared clock (α/γ), and add a `proof:dock-velocity-continuity` canary asserting a re-toggle mid-morph never zeroes child opacity velocity (no snap-from-rest flash). This closes the "iOS interruptible-spring contract" across *all three* axes (size + opacity + stagger), not just size.

**AW.W?-ε — native top-layer hold for the leaving pane (graceful, not third-authority).** Use `transition-behavior: allow-discrete` + `overlay` on the **leaving** layer's `visibility`/top-layer exit so the fade-out is never clipped early, replacing the hand-tuned `visibility 0s linear var(--duration-normal)` delay hack (`dock.css:526-528`) on supporting engines, `@supports`-gated, JS-delay fallback retained. One opacity owner preserved (re-introduces only the discrete *visibility/overlay* hold, per the AV.W9.1 constraint). Citation F5.

**AW.W?-ζ — graceful wrap choreography.** `overflow="wrap"` currently snaps `flex-wrap` on (`dock.css:676-706`) with no morph for the row reflow — the wrap "jumps." Seed: when wrapping, animate `min-height`/row count on the same shared spring (β/α), and gate a reduced-motion snap. Low-risk, isolated to the `.dock-overflow-wrap` recipe.

**AW.W?-η — rail/indicator language consistency.** The `DockLayerGroup` switcher rail uses reka `TabsIndicator` (`DockLayerGroup.vue:160`) on its own transition, decoupled from the layer-crossfade spring. Seed: bind the travelling indicator to the **same `--dock-resize-spring` curve/token** as the layer morph so rail-select and pane-crossfade share one motion vocabulary (the user's "consistent interaction language" ask). Diagnosis-only; verify the indicator timing isn't already inheriting the token.

**AW.W?-θ (diagnosis, lower priority) — VT-vs-fallback parity.** Two morph engines (native VT vs JS spring) can feel subtly different (browser VT default ease vs the dock spring). Confirm the `--vt-*` axes on `.gl-dock-layer` (`view-transition.css`) are tuned to *match* the re-tempered β spring, so a Safari-VT user and a fallback user get the same character. Pure audit + token alignment, no new code path.

## 4. Non-actions (explicitly rejected, with rationale)

- **Scale-based FLIP (Framer model)** — rejected: glass/text/icon stretch; width-model is correct for this surface (F1).
- **`interpolate-size`/`calc-size()`** — rejected: Chrome/Edge-only, already retired AV.W9.0 (F6).
- **A second/parallel opacity authority** — forbidden by the AV.W9.1 one-owner-per-concern rule; α/ε route through the *existing* crossfade owner or a discrete-only hold.
- **Any keyframes.js edit** — inv-16; all seeds use the already-published `SpringProgress` surface (`subscribe`, `velocity`, `snap`, `target`, `value`).

### Sources
- [Motion — React layout animations](https://motion.dev/docs/react-layout-animations) (2026-06-06)
- [Motion — stagger](https://motion.dev/docs/stagger) (2026-06-06)
- [nan.fyi — Inside Framer's Magic Motion](https://www.nan.fyi/magic-motion) (2026-06-06)
- [Apple WWDC23 — Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/) (2026-06-06)
- [Chrome for Developers — Four new CSS features for smooth entry and exit animations](https://developer.chrome.com/blog/entry-exit-animations) (2026-06-06)
- [MDN — @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) (2026-06-06)
- [MDN — interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) (2026-06-06) · [caniuse interpolate-size](https://caniuse.com/mdn-css_properties_interpolate-size_allow-keywords) (2026-06-06)

In-repo references: `src/components/custom/dock/composables/useLayerTransition.ts:19,234-333`; `src/components/custom/dock/composables/useDockState.ts`; `src/components/custom/dock/GlassDock.vue:191-230,262-288`; `src/components/custom/dock/DockLayerGroup.vue:57-89,132-162`; `src/styles/dock.css:20-26,254-288,440-573,676-706`; `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:776-840` (SpringProgress surface, read-only).

---

## Lane 4

I have a comprehensive picture. Current state: the dock VT path names only the *container* box (`.dock-layers` / `.dock-layer-stack`) and the panes — it does NOT tag individual items, and it does NOT use nested groups, so during the morph the container box interpolates while the items inside the captured snapshot are part of a flat cross-fade that can visually lag/desync. Here's the brief.

---

# View Transitions API SOTA for the dock morph — research brief

Lane: `view-transitions-morph`. Research + diagnosis only; no implementation. keyframes.js untouched (read-only, name-forward).

## 1. How the dock uses VT today (diagnosis baseline)

- The native VT path is the *primary* size+crossfade driver; the axis-aware FLIP spring is the no-VT fallback. One-driver-per-concern is enforced (size = spring **or** VT; opacity = CSS crossfade; visibility = delayed-hold fork). `src/components/custom/dock/composables/useLayerTransition.ts:199-211`.
- VT names are applied to the **container box only** — `.dock-layers` (`src/components/custom/dock/GlassDock.vue:226-227`) and `.dock-layer-stack` (`src/components/custom/dock/DockLayerGroup.vue:74-75`), both tagged `view-transition-class: gl-dock-layer`.
- The group recipe runs `--dock-resize-spring` (= `--spring-dock`, a `linear()` overshoot) for VT/FLIP timing parity. `src/styles/view-transition.css:59-62`, `src/styles/tokens.css:1301`.
- Child items (the buttons inside a `.dock-layer` / `.dock-layer-item-host`) are **NOT** individually VT-named. They live inside the captured container snapshot as a single flat image, cross-faded against the old container image. `src/styles/dock.css:524-560`.

**Why this can desync ("shrink-before-fade lag"):** the container `::view-transition-group(.gl-dock-layer)` interpolates width/height/position on the spring curve, while the **old/new image pair inside it cross-fades on the SAME group timing but is a flat raster** — the children don't move as independent boxes, so when the container box morphs faster/slower than the eye expects the content reads as "stretched then settled." The opposite failure (the one the CSS comments already chased at AU.W2) is when child opacity rides a *different/faster* token than the container morph — the items settle ~100ms before the pill, reading as lag. The CSS path fixed that by forcing the host fade onto `--dock-motion-resize`. But the VT path has a different, structural limit: **flat snapshot tree.**

## 2. SOTA findings (cited)

**Default cross-fade is `plus-lighter` opacity, old 1→0 / new 0→1, both on the group's timing.** Customizable via the VT pseudos. The group also auto-transforms position + width/height between states. — [Same-document view transitions, Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document) · [MDN: Using the View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)

**Animation-property inheritance (Chrome 140, Sept 2025).** Setting any `animation-*` longhand on `::view-transition-group(…)` now inherits to its `::view-transition-image-pair / old / new`, so the cross-fade stays locked to the group's duration/easing automatically. The UA stylesheet inherits duration, fill-mode, delay, timing-function, iteration-count, direction, play-state. — [What's new in view transitions (2025), Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025)

**Nested view transition groups + the `view-transition-group` CSS property (Chrome 140, Sept 2025) — the core lockstep fix.** Default snapshot tree is FLAT: every named element is a sibling under one `::view-transition`, so a child "bleeds out of / desyncs from" its container during the morph (loses clipping, scales independently). Values: `normal` (default), `contain` (nest this element's named children inside it), `nearest` (group under nearest ancestor group), `<custom-ident>` (named parent). The new `::view-transition-group-children(…)` pseudo holds the nested children, sized to the parent's border-box, so children **scale + translate WITH the container box rather than independently**, and clipping (`overflow: clip`, `border-radius`) is restored. — [Nested view transition groups, Chrome for Developers](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups) · [Bram.us: Nested View Transition Groups (2025-09-24)](https://www.bram.us/2025/09/24/nested-view-transition-groups/)

```css
.cards { view-transition-name: cards; view-transition-group: contain; }
.card  { view-transition-name: match-element; view-transition-class: card; }
::view-transition-group-children(.cards) { overflow: clip; }
```

**`view-transition-name: match-element` auto-naming (Chrome 137+, Firefox 144, Safari 18.4).** Generates per-element internal names from element identity — removes the need to hand-assign a unique `view-transition-name` to every dock item (the runtime "≤1 element per name" hazard). — [What's new in view transitions (2025)](https://developer.chrome.com/blog/view-transitions-in-2025)

**Typed / active view transitions.** `startViewTransition({ update, types: [...] })` + the `:active-view-transition-type(name)` pseudo-class lets one VT carry a type (e.g. `expand` vs `collapse`, `layer-forward` vs `layer-back`) and apply *direction-specific* easing/keyframes without forking the JS. `vt.types` is a live Set (`add/delete/clear`). Firefox 144's initial impl does NOT include types — progressive-enhance. `document.activeViewTransition` (Chrome 142, Firefox 147, Safari 26.2) returns the running instance for interruption handling. — [MDN: Using view transition types](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using_types) · [MDN: :active-view-transition-type()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active-view-transition-type)

**Element-scoped VT (`element.startViewTransition()`).** Scopes a transition to a subtree, lets multiple transitions run concurrently with different roots, restricts pointer events to the scope. Testable in Chrome 140 (flag), shipping Chrome 147. Relevant if multiple docks coexist or a dock animates while a page-level VT runs. — [Element-scoped view transitions, Chrome for Developers](https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions) · [Chrome 147 blog](https://developer.chrome.com/blog/element-scoped-view-transitions)

### Baseline dates (cite these)

- **Same-document View Transitions = Baseline Newly available: 2025-10-14** (with Firefox 144). Covers `document.startViewTransition(cb)`, `view-transition-name`, `view-transition-class`, `:active-view-transition`. — [web.dev: Same-document view transitions are now Baseline Newly available](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available)
- `view-transition-class` / `match-element` / animation inheritance / nested `view-transition-group` / `::view-transition-group-children` are **Chrome-140-era (Sept 2025), NOT yet Baseline** — Chrome-leading, behind Firefox/Safari. Treat as progressive enhancement over the FLIP fallback.

## 3. Why the dock VT can desync from CSS/JS children — the precise mechanism

1. **Flat snapshot tree (structural).** Only the container is VT-named, so the items are baked into the container's flat old/new raster. The container box interpolates as a box but the *content* inside it is a cross-faded image — children cannot translate/scale as their own boxes, so a width morph stretches the frozen content instead of re-flowing it. This is the "shrink-before-fade / stretch-then-settle" class.
2. **Token cohesion is correct but partial.** The container morph and the *CSS-crossfade fallback* layer fade share `--dock-motion-resize` (AU.W2 lockstep fix, `dock.css:516-523`). But on the NATIVE VT path, the layer crossfade is the VT old/new opacity, NOT the CSS `.dock-layer` opacity transition — so the AU.W2 token cohesion only governs the fallback. The VT old/new opacity runs on the group's curve (correct since Chrome 140 inheritance) but the *children's individual fade-in* is not separately timed because they aren't named.
3. **No typed direction.** Expand and collapse, and forward/back layer swaps, run the identical symmetric curve. iOS-feel motion is asymmetric (snappier exit, softer entry); a single curve cannot express that, so neither direction feels fully "right."
4. **Wrap is a hard case.** `overflow="wrap"` (`.dock-overflow-wrap`, `dock.css:669+`) reflows items to a new row; under a flat snapshot the reflow is a raster cross-fade, not a per-item move — items pop rather than glide to their wrapped position.

## 4. ADOPT / wave-seed list (concrete AW dock-animation folds)

- **AW.W?-α — Nested-group lockstep (HEADLINE).** Add `view-transition-group: contain` to the dock container (`.dock-layers` / `.dock-layer-stack`) and tag each dock item with `view-transition-name: match-element; view-transition-class: gl-dock-item`. Add `::view-transition-group-children(.gl-dock-layer) { overflow: clip; border-radius: inherit; }`. Result: items scale + translate *with* the pill box (true lockstep), clipping/rounding preserved through the morph. `@supports (view-transition-group: contain)`-gate it; the current flat-VT path stays as the tier-2 fallback under the FLIP tier-3. Cite Chrome 140 / not-yet-Baseline → progressive enhancement.
- **AW.W?-β — `match-element` auto-naming for items.** Use `view-transition-name: match-element` on dock buttons instead of hand-assigned per-item names — sidesteps the "≤1 element per `view-transition-name` per state or the transition silently skips" hazard when items are dynamic. Gate on `@supports`; older engines fall through to the container-only VT.
- **AW.W?-γ — Typed expand/collapse + forward/back.** Pass `types` to `startViewTransition` (`{ update, types: ['dock-expand'] }` vs `['dock-collapse']`; `['layer-forward']` vs `['layer-back']`) from `useLayerTransition.ts`. Author `:active-view-transition-type(dock-expand)` blocks in `view-transition.css` with **asymmetric iOS-style curves** (snappier exit, softer overshoot on entry) sourced from existing `--spring-*` tokens — no keyframes.js change, pure token+CSS. Feature-detect types (Firefox 144 lacks them) and degrade to the single symmetric `--dock-resize-spring`.
- **AW.W?-δ — VT/CSS child-fade token unification audit.** The AU.W2 lockstep token (`--dock-motion-resize`) governs the *fallback* CSS crossfade but the *native* VT child fade is the group's inherited opacity. With Chrome 140 animation-inheritance, explicitly set `--dock-motion-resize`'s duration onto `::view-transition-group-children(.gl-dock-layer)` so the per-item fade and the container morph are provably one duration on BOTH engines (closes the partial-cohesion gap in §3.2). Add a proof assertion that the child-fade duration equals the container-morph duration on the VT path.
- **AW.W?-ε — Graceful wrap as a contained reflow.** With nested groups in place (α), `overflow="wrap"` items get individual `view-transition-name`s, so a reflow becomes a per-item translate inside `::view-transition-group-children` rather than a raster pop. Verify the wrapped row morph glides; this is essentially free once α lands.
- **AW.W?-ζ — Interruption via `activeViewTransition` (parity with FLIP retarget).** The FLIP path already retargets an in-flight spring (`useLayerTransition.ts:234-248`, carries velocity). The VT path has no equivalent — a rapid re-toggle skips the prior VT (`ready` rejects, swallowed). Use `document.activeViewTransition` to detect an in-flight VT and `skipTransition()` deliberately + restart, or coalesce, so rapid dock toggles feel as smooth on the VT path as the FLIP path's velocity carry. Progressive-enhance (Chrome 142 / FF 147 / Safari 26.2).
- **AW.W?-η (optional) — Element-scoped VT for multi-dock / page-VT coexistence.** If a dock must animate while a page-level route VT runs (or two docks coexist), move the dock from `document.startViewTransition` to `containerEl.startViewTransition` so the dock morph is scoped and doesn't contend with the page transition. Chrome 147 / flagged in 140 — defer until Baseline trajectory firms; flag as research-only this tranche.

### Relevant files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts` (VT vs FLIP driver, lines 199-211 native path, 234-248 FLIP retarget)
- `/Users/mkbabb/Programming/glass-ui/src/composables/motion/useViewTransition.ts` (the `startViewTransition` wrapper — would gain a `types` arg for γ/ζ)
- `/Users/mkbabb/Programming/glass-ui/src/styles/view-transition.css` (lines 59-65 the `.gl-dock-layer` group recipe — α/δ/ε land here)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css` (lines 454-573 container morph + layer crossfade contract; 669+ wrap recipe)
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` (lines 161-163 springs, 1276-1310 `--vt-*` + `--dock-resize-spring` tokens)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue` (lines 226-227 container VT-name) · `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayerGroup.vue` (lines 74-75 stack VT-name; rail at 28-35, 95-100)

### Sources
- https://developer.chrome.com/blog/view-transitions-in-2025
- https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups
- https://www.bram.us/2025/09/24/nested-view-transition-groups/
- https://developer.chrome.com/docs/css-ui/view-transitions/element-scoped-view-transitions
- https://developer.chrome.com/blog/element-scoped-view-transitions
- https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using_types
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active-view-transition-type
- https://drafts.csswg.org/css-view-transitions-2/

---

## Lane 5

I have everything I need. The research is complete and I've verified the AV.W9 implementation against the keyframes.js source and the SOTA literature. Writing the brief.

---

# Research Brief: Interruptible Dock Gestures (Lane "interruptible-gestures")

## 1. SOTA — interruptible / redirectable spring animation

The literature is unanimous on the contract glass-ui's dock must satisfy:

**Velocity continuity is the whole game.** When a running spring is retargeted, it must adopt *the velocity it had at the moment of interruption* as the initial velocity toward the new target. Apple, WWDC23 "Animate with springs" (Jun 2023): *"a spring animation uses the velocity it had when it was retargeted as the initial velocity towards its new destination... this same velocity preservation makes these kinds of interruptions feel smooth and natural."* The math: *"a spring can start with any initial velocity... using different shifts and scales in our cosine curve to give us the right start"* — which is exactly the closed-form re-seat. ([developer.apple.com/videos/play/wwdc2023/10158](https://developer.apple.com/videos/play/wwdc2023/10158/), 2023-06)

**Do NOT remove-and-re-add the animation.** objc.io "Interactive Animations" (Issue 12): *"if you simply remove the current animation and add a new animation, then the layer's velocity would be discontinuous."* The correct pattern is to *"capture the current velocity vector and pass it as an initial condition to the new animation."* Position continuity alone is insufficient — *"if an object's velocity suddenly changes, that also feels unnatural."* ([objc.io/issues/12-animations/interactive-animations](https://www.objc.io/issues/12-animations/interactive-animations/))

**Retargeting is the named primitive.** jtrivedi/Wave (the canonical iOS interruptible engine): *"retargeting is the process of preserving an animation's velocity even as its target changes, which Wave does automatically"* — it *"fluidly arcs to its new destination"* where plain UIKit *"feels stiff and jerky."* Implementation is literally `animator.target = newValue` with velocity preserved; a `retargeted` flag distinguishes it from `finished`. ([github.com/jtrivedi/Wave](https://github.com/jtrivedi/Wave))

**On the web, Framer Motion does the same** — springs *"incorporate the velocity of any existing gestures or animations"*; on retarget *"it uses the velocity it had when interrupted."* Critically: velocity is *"calculated per second to account for variations in frame rate across devices"* ([motion.dev/docs/react-motion-value](https://motion.dev/docs/react-motion-value)) — a unit trap worth noting (below).

**Interruptibility > raw duration.** The recurring SOTA point: *"a 400ms animation you can interrupt feels faster than a 200ms animation that locks out input"* — interruption is the single biggest factor in perceived responsiveness. Fire-and-forget animations that lock out input are the anti-pattern.

**iOS 26 Liquid Glass adds the morph-lockstep model** glass-ui's "items fade in lockstep with the container" goal mirrors: a `GlassEffectContainer` + shared `glassEffectID`/`@Namespace` makes child glass elements *morph together* during a transition, with a `spacing` threshold controlling when they blend vs. fade. `glassEffectTransition(_:)` toggles between morph and fade. ([developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views), 2025-06)

## 2. Is the current AV.W9 velocity-continuity correct?

**Yes — the mechanism is correct and the wiring is sound.** Verified against both the wave plan and the actual keyframes.js binary.

The engine genuinely re-seats on retarget. `keyframes.js/dist/keyframes.js:245-253` — `set target(e)` calls `reseatTarget(e)`, which does `this.originValue = this.currentValue, this.originVelocity = this.currentVelocity, this.elapsed = 0` and restarts the loop. The closed-form is re-solved from the live `(value, velocity)` — the d.ts confirms it: *"The closed-form solution is re-seated from the current (value, velocity) so the trajectory is continuous"* (`keyframes.d.ts:800-805`). This is exactly the Wave/WWDC contract. inv-16 holds — no engine edit needed, the velocity carry is native.

The glass-ui wiring at `useLayerTransition.ts:242-317` does the right thing:
- `:242-243` detects an in-flight interrupt: `spring !== null && springEl === el && !spring.settled`.
- `:248` takes `fromSize = live ? live.value : getSize(el)` — re-seats `from` at the **live painted pixel**, not a remeasured rest value.
- `:316-317` reuses the live solver and assigns `activeSpring.target = toSize` — triggering the engine's velocity-preserving re-seat instead of `disposeSpring()` + `new SpringProgress(...)`. Velocity carries through.
- Hard-gate #4 ("no dispose()+new on the live-spring retarget path") is satisfied.

**Caveats / sharp edges I'd flag for the AW lane (the contract is correct, these are correctness-adjacent gaps, not the headline):**

1. **The native View-Transitions path has NO velocity continuity** (`useLayerTransition.ts:199-211`). A rapid re-toggle on a `startViewTransition`-capable engine (Chrome) does not carry velocity — each swap is a fresh browser snapshot crossfade. So on the *majority* engine, the iOS interruptible-spring contract the wave headlines is **not actually exercised** — only the FLIP fallback (Firefox/Safari pre-VT) gets it. The spring re-seat is real but runs on the minority path. Worth deciding: is that acceptable, or should rapid-retarget force the spring path? (VT cannot be interrupted-with-velocity by design.)

2. **Velocity-unit / re-seat-`from` coupling is correct but fragile.** The spring's `value` is in **pixel space** (it IS the width), so velocity is px/s and the re-seat math is self-consistent — good. But it depends on `springEl === el` identity holding across the outer GlassDock pair and inner DockLayerGroup pair. Two separate `useLayerTransition` instances each own their own closure `spring`; a compound gesture (expand-then-switch-layer) drives two *different* springs, which is fine, but there's no shared clock — the two morphs can settle on different frames. The "co-settle within ±1 frame" gate (W9.4) only checks one pair at a time.

3. **No acceleration-based interrupt detection** (the lane explicitly asks about this). The current model is binary: "is a spring live and unsettled?" → re-seat. There is no notion of *gesture acceleration* re-seating the spring response/damping. SOTA gesture handoff (objc.io, UIKit Dynamics) tracks `dx/dt` over the final gesture frames to seed initial velocity. The dock has no continuous drag gesture (it's hover/click/pin), so there's no gesture velocity to capture — the "interrupt" is always a discrete state toggle, velocity 0 at the source. **This means the velocity-continuity only matters for the auto-collapse-timer-vs-re-hover race**, not for a finger-driven drag. That's a legitimately narrower surface than the iOS sheet case the citations describe — worth stating plainly in the AW plan so it isn't overfit.

4. **Lockstep is by shared-token, not shared-clock.** Container size rides the JS `SpringProgress`; pane opacity rides the CSS `--dock-motion-resize` transition (`dock.css:457,527`). They use the *same authored curve* `(0.5, 0.5)` but **different integrators** — the CSS `linear()` token approximates the spring; the JS spring is exact. On a *retarget*, the CSS transition restarts from its own current computed-opacity (browser-owned continuity) while the JS spring re-seats from live velocity. They will drift slightly on an interrupt because only one of them carries velocity. The W9.4 gate's ±1-frame co-settle check would catch gross drift but not sub-frame divergence on retarget specifically.

## 3. ADOPT / AW dock-animation wave-seed list

Concrete folds for an AW dock-animation tranche. Each is scoped to a file and cites the source principle.

- **AW.d1 — Unify the lockstep integrator (kill the dual-curve drift).** Today size is JS-spring, opacity is CSS-`linear()`-token; they only *approximate* each other and diverge on retarget (§caveat 4). Drive pane opacity off the *same* `SpringProgress` clock (one solver, two output channels: `width` + `opacity`), or conversely drive both off the CSS transition and retire the JS spring on the VT path. One integrator → guaranteed lockstep, no shrink-before-fade by construction. Maps to the Liquid Glass "morph together" model ([Apple, 2025-06](https://developer.apple.com/documentation/SwiftUI/Applying-Liquid-Glass-to-custom-views)). File: `useLayerTransition.ts` + `dock.css`.

- **AW.d2 — Velocity continuity on the VT path, or honest scoping.** Decide: either (a) force the spring/FLIP path for *rapid retargets* even on VT-capable engines so the interruptible contract actually runs on Chrome (VT itself can't carry velocity), or (b) document in the wave that velocity-continuity is FLIP-fallback-only and the VT path is fire-and-forget by design. Right now the headline contract silently doesn't run on the majority engine (§caveat 1). File: `useLayerTransition.ts:199-211`.

- **AW.d3 — Shared morph clock across nested instances.** When the outer GlassDock morph and an inner DockLayerGroup morph overlap (expand-then-switch), they run two independent springs that can settle on different frames (§caveat 2). Introduce a single per-dock morph clock both instances re-seat against, so a compound gesture reads as one physical object. File: `useLayerTransition.ts` (instance coordination) — likely needs a shared provide/inject, so triumvirate per W9 File-Bounds.

- **AW.d4 — Frame-rate-independent velocity unit audit.** Motion's note that velocity must be *"per second to account for variations in frame rate"* ([motion.dev](https://motion.dev/docs/react-motion-value)). Confirm the dock's px/s velocity stays correct on a 120Hz ProMotion display and under a dropped-frame `dt` spike — the re-seat uses `currentVelocity` which is engine-computed per-tick, so likely fine, but add a probe-frame to `proof:dock-animation-live` that throttles rAF and asserts no velocity blow-up. File: `scripts/proof-dock-animation-live.mjs`.

- **AW.d5 — Reduced-motion retarget parity.** `reseatTarget` snaps to target and zeroes velocity under `prefers-reduced-motion` (`keyframes.js:248-250`) — verified correct. Add it to the gate matrix so a PRM retarget is asserted to be instant-no-overshoot (the press-spring is already ζ≈1 via `--dock-press-spring → --spring-smooth`, `dock-controls.css:43`). File: gate only.

- **AW.d6 — Graceful wrap + rail-hold timing.** The lane goal names "graceful wrap" and "polished layering + rail." W9.5 only *confirmed* the reka-ui Tabs rail doesn't extend the transition window — it didn't make wrap a first-class behavior. Seed: when dock children wrap (narrow viewport), the width-spring target should be the wrapped intrinsic size measured in the same rAF as the class swap (the `:278` `getSize` already does this) — but verify wrap reflow doesn't land a `toSize` mid-reflow. Add a wrap case to the live gate. File: `useLayerTransition.ts` + gate.

- **AW.d7 — Press-spring momentum gate is correct; extend the vocabulary.** AV.W9.3 landed ζ≈1 no-overshoot taps via `--dock-press-spring` (verified, `dock-controls.css:43,76,242,399,432`). The wave reserved a bouncy token "for momentumed surfaces (none today)." If AW adds any drag surface (e.g. a draggable dock or slider-in-dock with fling), that's where the bouncy-on-momentum token gets its second consumer — don't add it before then (overfitting-audit: ≥2 sites). File: `dock-controls.css` + `tokens.css` (triumvirate).

**Net:** the AV.W9 velocity-continuity mechanism is **correct and matches SOTA** (re-seat the live solver via `set target`, no dispose+reconstruct, velocity carried natively by keyframes.js — inv-16 clean). The real gaps for AW are (1) it only runs on the FLIP-fallback path, not the majority VT path; (2) size and opacity use two different integrators that only approximate lockstep; (3) there's no gesture-acceleration source because the dock has no drag, so the contract's surface is narrower than the iOS-sheet citations imply — which the AW plan should state plainly rather than overfit.

**Key file:line references:** `src/components/custom/dock/composables/useLayerTransition.ts:242-317` (retarget logic), `:199-211` (VT path, no velocity), `node_modules/@mkbabb/keyframes.js/dist/keyframes.js:245-253` + `keyframes.d.ts:800-805` (engine re-seat), `src/styles/dock.css:457,527` (CSS opacity lockstep), `src/styles/dock-controls.css:43` (press spring).

---

## Lane 6

I have comprehensive SOTA coverage and full grounding in the current implementation. Writing the brief now.

---

# Dock Animation SOTA Brief — Lane "layering-z-depth-motion"

Research + diagnosis + AW wave seeds. No implementation. inv-16: keyframes.js stays READ-ONLY (name-forward; no engine edits, no new exports).

## 1. Current state (what's already SOTA-correct)

The dock is already further along than most of the references. Anchoring the seeds against what exists:

- **Single-source spring.** `DOCK_SPRING = {response: 0.5, dampingFraction: 0.5}` (`src/components/custom/dock/composables/useLayerTransition.ts:19`) mirrors the `--spring-dock` PRESETS row, so the CSS `linear()` token (`tokens.css:163`, ~+18.5% overshoot) and the runtime `SpringProgress` sample the same ODE — bit-identical motion across the CSS-driven and JS-driven paths.
- **Lockstep opacity already fixed once.** The "items lag the pill" bug (slides-F P0, "not iOS-smooth") was already diagnosed and folded at AU.W2: the layer fade rides `--dock-motion-resize` (same duration+curve as the container morph), not the faster `--dock-motion-fast` (`dock.css:516-528`). Size and opacity settle on the shared curve.
- **Velocity continuity on interrupt.** AV.W9.2 re-seats the live solver's target from `(value, velocity)` on a re-toggle mid-flight instead of dispose+reconstruct-from-rest (`useLayerTransition.ts:234-243`) — the iOS interruptible-spring contract.
- **One-frame origin.** The class swap (opacity) and the width set (size) start in the SAME rAF so the box never shrinks before items fade (`useLayerTransition.ts:263-282`).
- **VT fork + FLIP fallback, one driver per concern.** Native `startViewTransition` path or the pixel-space `SpringProgress` FLIP — never both (`useLayerTransition.ts:96-211`). AV.W9.0 retired the dual-driver `interpolate-size` race.
- **On-demand `will-change`, PRM freeze** already handled.

So the lane is NOT "fix broken lag" — that's done. The lane is **depth choreography, layering polish, rail morph, item stagger, and graceful wrap** — the next tier the references expose.

## 2. SOTA findings + citations

### A. Apple Liquid Glass / `GlassEffectContainer` (iOS 26, WWDC25)
The headline model the dock should converge toward. Sources: [Apple WWDC25 "Meet Liquid Glass"](https://developer.apple.com/videos/play/wwdc2025/219/), [GlassEffectContainer docs](https://developer.apple.com/documentation/swiftui/glasseffectcontainer), [Luddy iOS26 reference](https://medium.com/@madebyluddy/overview-37b3685227aa) (all accessed 2026-06-06).

- **Singular floating plane.** Controls live on ONE plane; between states the glass "dynamically morphs between the controls in each context… the controls continually shape-shift." The dock's layer swap should read as one surface reshaping, not two panes crossfading.
- **`spacing` = merge threshold.** `GlassEffectContainer(spacing:)` — elements within that distance "visually blend and morph together." Glass cannot sample other glass; the container provides one shared sampling region. **Maps to:** the dock's rail buttons + layers should share one glass substrate, not stack independent blurred boxes.
- **Material thickens on growth.** When glass "flexes and morphs to larger sizes… it casts deeper, richer shadows… more pronounced lensing." Apple ties shadow/refraction depth to size. **Maps to:** the dock's shadow should deepen as it expands, not stay constant.
- **`.bouncy` is the recommended morph spring** (`withAnimation(.bouncy(duration: 0.4))`). The dock's (0.5, 0.5) ~+18.5% overshoot already lives in this family; +0.4s is the right ballpark.
- **`.interactive()` = press-scale + bounce + shimmer + touch-point illumination that radiates to nearby glass.** The "radiates to nearby glass" behavior is a depth signal the dock controls don't yet have.
- **Three stacking layers:** content (bottom, no glass) → navigation (middle, glass) → overlay (top, vibrancy/fills on glass). A formal z-grammar.

### B. Material 3 Expressive motion (concrete spring numbers)
Source: [material-components-android Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md), [M3 motion overview](https://m3.material.io/styles/motion/overview/how-it-works), [M3 Expressive motion blog](https://m3.material.io/blog/m3-expressive-motion-theming) (accessed 2026-06-06).

- **Spatial vs Effects springs — the key separation.** Spatial springs (position/size/shape) OVERSHOOT; Effects springs (color/opacity) DO NOT overshoot. Concrete tokens (damping / stiffness):
  - Fast Spatial 0.9 / 1400 · Fast Effects 1.0 / 3800
  - Default Spatial 0.9 / 700 · Default Effects 1.0 / 1600
  - Slow Spatial 0.9 / 300 · Slow Effects 1.0 / 800
- **This is the one place the dock currently DEVIATES from SOTA, intentionally for lockstep but worth revisiting.** The dock fades opacity on the SAME `--spring-dock` overshoot curve as size (`dock.css:527`). M3's rule is the opposite: opacity should ride a *critically-damped* (no-overshoot) curve while size overshoots, because an overshooting opacity reads as a flicker (value goes >1 then settles). The dock clamps opacity to [0,1] so it doesn't literally flicker, but the *timing* of an overshoot curve on a fade is subtly wrong — the fade reaches near-full then eases, when iOS fades are front-loaded. See seed AW-3.
- **Container Transform:** morphs a start element's bounding container into a larger end container, contents swapping while it "grows." Incoming 300ms / outgoing 250ms, emphasized easing. This is exactly the collapsed→expanded dock morph.

### C. Framer Motion layout animation (the mechanics for distortion-free morph)
Sources: [Motion React layout animations](https://motion.dev/docs/react-layout-animations), [Maxime Heckel deep dive](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/) (accessed 2026-06-06).

- **FLIP via transform, not width/height.** Motion animates size via `transform: translate + scale`, never real width/height, for compositor-only performance. The dock currently writes inline `width` per frame (`useLayerTransition.ts:318`) — correct for layout flow but NOT GPU-composited; it triggers layout every frame. Transform-FLIP is the higher-perf path (seed AW-6, lower priority — the spring is already smooth).
- **Inverse-scale child correction.** When the parent scales, children get counter-scale so text/icons don't stretch. `borderRadius`/`boxShadow` auto-corrected but must be inline `style`. **This is the missing piece for a transform-based dock:** without it, items squash during the morph.
- **`layout="position"`** animates only position, lets size snap — the fix when content "squishes/stretches" during an aspect-ratio change. Relevant to graceful wrap (seed AW-5).
- **`layoutId` shared-element crossfade** = the sliding-pill rail (next).

### D. Rail / active-indicator morph (the sliding pill)
Sources: [Samuel Kraft segmented control](https://samuelkraft.com/blog/segmented-control-framer-motion), [Motion smooth tabs](https://motion.dev/tutorials/react-smooth-tabs), [React-News layout deep dive](https://react-news.com/mastering-layout-animations-a-deep-dive-into-framer-motions-magic) (accessed 2026-06-06).

- **One `layoutId` background that re-parents.** Single pill element mounted under the active tab; when it unmounts/remounts on a new tab, FLIP animates between the two DOM positions — "the sliding pill effect with zero manual calculation," spring curve with a subtle bounce.
- The dock's `DockLayerGroup` switcher rail (`DockLayerGroup.vue`) renders descriptors but — per the file sizes — drives crossfade + size FLIP on the *layers*, not a shared sliding indicator on the *rail itself*. The active-rail-button highlight is the missing morph (seed AW-1). BouncyTabs already solves this pattern in the repo (`custom/tabs/`, `useBouncySlider` extracted AU.W10) — the rail should reuse that vocabulary, not invent a parallel one.

### E. Item stagger / entrance choreography
Sources: [SwiftUI staggered animations](https://swiftuisnippets.wordpress.com/2026/05/20/staggered-animations-in-swiftui/), [Framer Motion stagger](https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33) (accessed 2026-06-06).

- The "wave-like sequence" (scale+opacity+blur, per-item `staggerChildren`/`delayChildren`) is the iOS polish layer. The dock currently fades the WHOLE layer host as one opacity (`dock.css:539`). A per-item stagger with a small delay (`--d: calc(var(--i) * 30ms)`) reads as "alive." The repo already has the substrate: `useStaggerReveal` / `useStagger` / `vReveal` (`--d` directive) in `composables/motion/`. Reuse, don't rebuild (seed AW-2).

## 3. ADOPT / wave-seed list (concrete AW dock-animation folds)

Ordered high→low. Each names existing repo substrate to compose (no new keyframes.js surface).

**AW-1 — Shared-element rail indicator (the sliding pill).** Give `DockLayerGroup`'s switcher rail a single `layoutId`-style active pill that FLIPs between rail buttons on a spring, instead of toggling a per-button active class. Reuse the `useBouncySlider` composable already extracted for BouncyTabs (`custom/tabs/composables/`, AU.W10) — same active-state vocab canon (V.W3), so the dock rail and the tabs speak one interaction language. This is the single biggest "consistent design language" win.

**AW-2 — Per-item stagger entrance on layer reveal.** Replace the monolithic layer-host opacity fade with a per-item `--d` stagger (scale 0.96→1 + opacity, ~30ms/item, capped) so items arrive in a wave rather than as one block. Compose the existing `vReveal` directive / `useStaggerReveal` (`composables/motion/`). Must stay inside the lockstep window — total stagger ≤ the container morph duration so it never re-introduces the lag. Gate-extend `proof:dock-motion-single-source`.

**AW-3 — Split spatial vs effects spring (M3 separation).** Audit whether opacity should ride `--spring-dock` (overshoot) or a critically-damped effects curve. SOTA (M3) says opacity = no-overshoot, front-loaded; size = overshoot. Introduce a `--dock-fade-spring` (effects, no overshoot) distinct from `--dock-resize-spring` (spatial). CAVEAT: AU.W2 deliberately unified them for lockstep — so this is a *retune within lockstep* (matched duration, different damping), not a regression. Diagnose with a side-by-side before touching; the lockstep is load-bearing.

**AW-4 — Depth-on-growth: shadow + blur deepen as the dock expands.** Per Apple ("thicker material casts deeper shadows" as glass grows), bind `--shadow-dock` depth and `--dock-surface-blur` to the expansion state so the collapsed pill is shallow and the expanded surface is deeper — the layering reads as the plane physically lifting. Already token-driven (`dock.css:120` shadow stack, `--glass-edge-light` rim). Pure token interpolation on a discrete state change (NOT per-frame — inheritance-bomb guard, `useLayerTransition.ts:80-87`); drive via class swap.

**AW-5 — Graceful wrap morph.** When the expanded layer exceeds `--dock-max-inline-size` and wraps (`overflow="wrap"`), the height-grow should spring (currently the wrap path is a clip/grow without the morph spring on the cross-axis). Apply the `layout="position"`-style fix (let content reflow, spring the box) so a 1-line→2-line wrap morphs instead of jumping. Reuse the axis-aware `dim` machinery already in `useLayerTransition` (it's `"width"|"height"` aware) — extend to drive the cross-axis on wrap.

**AW-6 — (lower priority) Transform-FLIP instead of inline-width FLIP.** Migrate the fallback driver from per-frame inline `width` (`useLayerTransition.ts:318`, triggers layout each frame) to `transform: scaleX` + inverse-scale child correction (Framer Motion's compositor-only path). Higher GPU efficiency, but the current spring is already visually smooth and the inverse-scale correction is non-trivial (children would squash without it). Diagnose-only this wave; ship only if a perf trace shows the per-frame layout is a real cost. Lower priority precisely because the existing motion already passes the "smooth" bar.

**AW-7 — Unify the press/interactive language (`.interactive()` parity).** Apple's interactive glass = press-scale + bounce + touch-point illumination that *radiates to nearby glass*. The dock controls have press-scale (`--scale-press-btn`) but no radiating-glow. A subtle cross-control hover/press glow (the `--phase-color` cascade already exists) would unify the control family's feel. Decoration-only, discrete-class driven (no per-frame color tween — inheritance-bomb guard). Optional polish fold.

### Sequencing note
AW-1 (rail) + AW-2 (stagger) are the "consistent animation/interaction language + polished rail" headline and should anchor the tranche. AW-3 + AW-4 are the depth-choreography pair. AW-5 closes graceful wrap. AW-6/AW-7 are diagnose-then-maybe perf/polish. None require keyframes.js edits — all compose `SpringProgress` (name-forward, READ-ONLY) + existing `composables/motion/` substrate + token interpolation.

### Relevant files (absolute)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts` — the morph driver (spring, retarget, VT fork)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useDockState.ts` — state machine (collapse/expand/hold)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue` — dock shell + VT wiring (`:226`)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayerGroup.vue` — switcher rail (AW-1 target)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css` — crossfade + lockstep contract (`:497-573`), shadow/depth (`:115-122`)
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css` — spring tokens (`:159-163`, `:1295-1310`)
- `/Users/mkbabb/Programming/glass-ui/src/composables/motion/` — `useStaggerReveal`, `vReveal`, `useSpringOrchestrator` (AW-2 substrate)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/tabs/composables/` — `useBouncySlider` (AW-1 substrate; active-state vocab canon)

### Sources
- [Apple — Meet Liquid Glass, WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/) (2026-06-06)
- [Apple — GlassEffectContainer](https://developer.apple.com/documentation/swiftui/glasseffectcontainer) (2026-06-06)
- [iOS 26 Liquid Glass reference (Luddy)](https://medium.com/@madebyluddy/overview-37b3685227aa) (2026-06-06)
- [Material 3 Android — Motion.md (spring tokens)](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md) (2026-06-06)
- [Material 3 — Motion how-it-works](https://m3.material.io/styles/motion/overview/how-it-works) (2026-06-06)
- [Material 3 — Expressive motion theming](https://m3.material.io/blog/m3-expressive-motion-theming) (2026-06-06)
- [Motion (Framer Motion) — React layout animations](https://motion.dev/docs/react-layout-animations) (2026-06-06)
- [Maxime Heckel — Framer Motion layout animations](https://blog.maximeheckel.com/posts/framer-motion-layout-animations/) (2026-06-06)
- [Samuel Kraft — Segmented control with Framer Motion](https://samuelkraft.com/blog/segmented-control-framer-motion) (2026-06-06)
- [React-News — Mastering layout animations](https://react-news.com/mastering-layout-animations-a-deep-dive-into-framer-motions-magic) (2026-06-06)
- [SwiftUI staggered animations](https://swiftuisnippets.wordpress.com/2026/05/20/staggered-animations-in-swiftui/) (2026-06-06)

---

## Lane 7

I have a comprehensive picture across the codebase and SOTA sources. Let me synthesize the brief.

---

# Dock multi-row wrap + animation — research brief (Lane: dock-wrap-multirow)

## Current state (glass-ui HEAD)

The dock already has a sophisticated single-row morph engine. The **wrap path does not share it** — that is the gap the user feels.

- **Morph engine (single-row):** `src/components/custom/dock/composables/useLayerTransition.ts` drives the collapsed↔expanded width morph off ONE `SpringProgress` (response 0.5, ζ 0.5, ~+18.5% overshoot) in pixel space. It is interruptible/velocity-continuous (re-seats target from live `(value, velocity)` — `useLayerTransition.ts:234-255`), forks to the native View Transitions path when available (`:199-211`), and intentionally starts the class-driven opacity fade and the width-set in the SAME rAF (`:263-333`) so items fade in lockstep with the box. This part is excellent and is the design language to extend.
- **Wrap path (the weak link):** `overflow="wrap"` just toggles a static `flex-wrap: wrap` on `.dock-layer--full` with a row-gap and a `max-width` (`src/styles/dock.css:676-706`, snap-back `@media` at `:919-948`). There is **no FLIP, no spring, no stagger** on wrap. When items reflow to a new row, they jump — the container morph engine never runs for the wrap case (the spring drives `width`/`height`, but a wrap reflow changes the box on the *cross axis* via `flex-wrap` + `height:auto`, which nothing measures or springs). Separators are hard-hidden in wrap (`:698-700`). So a wrap is a hard cut, exactly "not correct, should be better stylized."
- **Spring tokens:** `--spring-dock` (linear() approximation) + `--dock-resize-spring` / `--dock-motion-resize` are the single source (`tokens.css:163`, `:1297-1301`). `--dock-overflow-bp: 640px` (`tokens.css:853`). The JS spring const in `useLayerTransition.ts:19` MUST mirror the `PRESETS` row in `scripts/regen-spring-tokens.mjs` — a retune touches both. inv-16 holds: keyframes.js is consumed read-only via `SpringProgress` (`.play(onFrame)`); never import the heavy engine.

## SOTA findings

1. **iOS interruptible spring = velocity continuity (already the right model).** SwiftUI's `spring(response:dampingFraction:)` and `interactiveSpring` retarget from the *current* velocity, never from rest; springs are the only curve preserving continuity for both position and velocity, which is why multi-property (scale+opacity+size) morphs feel coherent. glass-ui already does this for width; the wrap morph should reuse the SAME spring const so cross-axis (height/row) reflow inherits the identical curve. ([Apple — animate with springs, WWDC23](https://developer.apple.com/videos/play/wwdc2023/10158/); [Apple — spring(response:dampingFraction:blendDuration:)](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:)), accessed 2026-06-06)

2. **FLIP with `absolute: true` is the canonical way to animate items across wrap rows.** When items change row, GSAP Flip pins them `position: absolute` *for the duration only* so the reflow can't thrash, animates each from old→new rect, and `nested: true` prevents container+child offset compounding. `scale: true` (scaleX/Y over width/height) is the faster channel. `onEnter`/`onLeave` give entering/leaving items their own entrance (fade+scale) rather than popping. This is the pattern glass-ui's wrap path is missing. ([GSAP Flip docs](https://gsap.com/docs/v3/Plugins/Flip/); [Codrops — responsive grid Flip](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/), accessed 2026-06-06)

3. **Container morphs WITH items, in lockstep, not before.** Codrops/Flip and Motion both capture state pre-reflow, let the layout change, then spring the box and the items back to a single shared clock. Motion's `layout` prop animates a resizing container while children carry their own `layout`/`layout="position"` to avoid scale-distortion; `LayoutGroup` synchronizes elements that don't re-render together. Key anti-distortion trick: correct `border-radius`/`box-shadow` during the size morph (relevant for the pill silhouette). ([Motion — layout animations](https://motion.dev/docs/react-layout-animations), accessed 2026-06-06)

4. **Staggered, randomized-order item motion reads as "polished."** Spring-staggering pins each item's spring start to the previous item's progress (`stagger: { amount, from: "random" }`), so a wrap doesn't snap as one block. Total time = morph + stagger. This is the single biggest "stylization" lever for the wrap. ([Codrops](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/), accessed 2026-06-06)

5. **View Transitions can do the wrap morph natively, with caveats.** Same-doc VT is Baseline (Oct 2025). The 2025 `match-element` value auto-names many moving elements (no 100 hand-named ids). BUT: differently-shaped same-named elements warp, and reflow mid-transition needs a temporary fixed size/position class — exactly the "absolute pin" trick again. glass-ui already forks to VT for the layer swap; a wrap-aware VT path is feasible but must guard the warp case. ([Chrome — view transitions 2025](https://developer.chrome.com/blog/view-transitions-in-2025); [MDN — View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), accessed 2026-06-06)

6. **`grid-auto-flow: dense` is a trap for a dock.** It reorders visual vs. DOM order, breaking tab/SR order (WCAG). A dock toolbar has meaningful order — keep source order; do NOT use dense packing. The "priority+" overflow pattern (collapse low-priority items into a "more" affordance before wrapping) is the accessible alternative to uncontrolled wrap. ([MDN — grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow); [MDN — flex wrapping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Wrapping_items), accessed 2026-06-06)

## The core diagnosis (why wrap feels wrong)

The dock has TWO motion systems that don't meet: a spring-driven main-axis morph (great) and a static cross-axis flex-wrap (a hard cut). When wrap triggers, (a) the box height changes with `height:auto` and is never measured/sprung, (b) items teleport to their new row with no FLIP, (c) separators vanish discretely, (d) the pill radius jumps `--radius-pill`→`--radius-2xl` without a morph. The "shrink-before-fade lag" risk is structurally avoided in single-row (one rAF origin) but reintroduced in wrap because nothing coordinates the row change with opacity.

---

## ADOPT / wave-seed list (concrete AW dock-animation folds)

**Fold AW-1 — Wrap morph rides the same spring (cross-axis).** Extend `useLayerTransition` (or a sibling `useWrapTransition`) to measure the box on BOTH axes and spring `height` (the row-count change) with the SAME `DOCK_SPRING` (0.5, 0.5) the width morph uses. Reuse the existing one-rAF-origin discipline (`useLayerTransition.ts:263-333`) so the box height and item opacity start in the same frame — no shrink-before-fade in wrap. Single source: do NOT add a new spring const.

**Fold AW-2 — Per-item FLIP across rows with `absolute` pin.** On a wrap/unwrap, capture each `.dock-layer--full` child's rect, let the layout reflow, pin children `position:absolute` for the morph duration only, spring each from old→new rect on `transform` (translate + optional scale), then release. `nested:true`-style guard so the container height spring and the item transforms don't compound. This is the headline stylization — items glide to their new row instead of jumping.

**Fold AW-3 — Randomized spring stagger on wrap.** Add a `from:"random"` (or center-out) stagger to AW-2's per-item springs via a small per-index delay/phase on the shared clock. Token it (`--dock-wrap-stagger`, default ~20-30ms). This is the cheapest, highest-impact "polish" lever.

**Fold AW-4 — Pill silhouette morph (radius + separators).** Spring/transition the `border-radius` `--radius-pill`↔`--radius-2xl` and FADE separators (opacity, not `display:none` at `dock.css:698`) in lockstep with AW-1, with anti-distortion (Motion's border-radius correction idea). The silhouette should melt between one-row pill and multi-row card, not snap.

**Fold AW-5 — Entrance/exit for items that appear/disappear on wrap.** Borrow Flip `onEnter`/`onLeave`: an item that only exists in expanded-wrap mode enters with fade+scale-from-0.9 on the dock spring, leaves symmetrically — no pop. Reuses the existing class-driven `.dock-layer-item-host` opacity seam.

**Fold AW-6 — Native View-Transitions wrap fork (guarded).** Where `startViewTransition` exists, route the wrap through it with `match-element` auto-naming and a temporary fixed-size/position guard class to dodge the warp-on-reflow failure mode, mirroring the existing layer-swap VT fork (`useLayerTransition.ts:199-211`). Keep the AW-1/AW-2 JS spring as the feature-detected fallback (one path or the other, never both — the existing contract).

**Fold AW-7 — Priority+ collapse BEFORE uncontrolled wrap (a11y + design).** Before flex-wrap dumps everything to row 2, optionally collapse lowest-priority controls into a "more" `DockDropdownTrigger`. Keeps source order (no `grid-auto-flow:dense` — WCAG), gives a deterministic, designed multi-row shape instead of ragged reflow. Opt-in prop, orthogonal to `overflow="wrap"`.

**Fold AW-8 — Unify the motion language across rail + layers + wrap.** Audit that the rail TabsIndicator travel (`dock.css:770-797`), the layer crossfade, and the new wrap morph all read `--dock-motion-resize` / `--spring-dock`. One spring, one duration, one ease across every dock surface = the "consistent interaction language" the user wants. Add a `proof:dock-motion-single-source`-style gate covering the wrap path too.

**Constraints to respect in any AW wave:** keyframes.js stays read-only (`SpringProgress.play` only — never the heavy `AnimationGroup`/`loadAnimationEngine` boundary, `useLayerTransition.ts:13-18`); the JS spring must mirror `scripts/regen-spring-tokens.mjs` PRESETS; honor `prefers-reduced-motion` (synchronous swap, no driver — the existing gate at `:219-228`); on-demand `will-change` only (never standing); no per-frame tween of inherited custom props (the inheritance-bomb guard, `:80-87`).

**Key files for the implementing wave:**
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts` (the spring morph engine to extend)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:676-706` + `:919-948` (the static wrap recipe to replace)
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:163,853,1297-1301` (spring + bp + wrap tokens)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/GlassDock.vue:368,395-419` (the `dock-overflow-wrap` class + layer markup)

**Sources** (all accessed 2026-06-06):
- [Apple — Animate with springs (WWDC23)](https://developer.apple.com/videos/play/wwdc2023/10158/)
- [Apple — spring(response:dampingFraction:)](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blendduration:))
- [GSAP — Flip plugin docs](https://gsap.com/docs/v3/Plugins/Flip/)
- [Codrops — Animating responsive grid layout transitions with GSAP Flip](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/)
- [Motion — React layout animations](https://motion.dev/docs/react-layout-animations)
- [Chrome — What's new in view transitions (2025)](https://developer.chrome.com/blog/view-transitions-in-2025)
- [MDN — View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- [MDN — grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow)
- [MDN — Mastering wrapping of flex items](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Wrapping_items)

---

## Lane 8

I have everything I need. The key finding: glass-ui has a rich spring vocabulary (`smooth/snappy/bouncy/gentle/dock`) but it's **physically-named, not semantically-named** — there's no spatial-vs-effects split (the M3 insight) and no single "motion-role" semantic layer mapping component intents to springs. That's the central wave-seed. Let me write the brief.

Brief follows.

---

# Motion-language SOTA brief — lane `consistent-motion-language` (dock + animation)

Research + diagnosis only. No implementation. keyframes.js treated READ-ONLY (name-forward). All `file:line` refs are at HEAD.

## 1. What mature systems do for a CONSISTENT motion language

The thing every mature system shares: **motion is a token layer, not per-component CSS**, and the tokens are split by *semantic role*, not by raw curve. The component author picks an intent ("this is a small spatial move", "this is a fade"), not a bezier.

**Material 3 — the strongest model.** M3's headline is the spatial-vs-effects split, each at three speeds:

| token | damping ratio | stiffness | role |
|---|---|---|---|
| `motionSpringFastSpatial` | 0.9 | 1400 | small spatial (switches, buttons) |
| `motionSpringDefaultSpatial` | 0.9 | 700 | partial-screen spatial |
| `motionSpringSlowSpatial` | 0.9 | 300 | full-screen spatial |
| `motionSpringFastEffects` | 1.0 | 3800 | small fade/color |
| `motionSpringDefaultEffects` | 1.0 | 1600 | partial-screen fade/color |
| `motionSpringSlowEffects` | 1.0 | 800 | full-screen fade/color |

The rule: **spatial springs allow overshoot (ζ=0.9); effects springs are critically damped (ζ=1.0) because overshoot on opacity/color reads as a flicker.** Speed is chosen by how much screen the change covers — fast for switch-sized, default for partial, slow for full-screen. (Material 3 / material-components-android `docs/theming/Motion.md`, accessed 2026-06-06. M3 easing curves: standard `cubic-bezier(0.2,0,0,1)`, emphasized-decelerate, emphasized-accelerate; durations short1=50ms…extraLong4=1000ms in 50ms steps.)
Sources: https://m3.material.io/styles/motion/easing-and-duration/tokens-specs · https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md (2026-06-06)

**Apple HIG / WWDC18 "Designing Fluid Interfaces" — the iOS-feel charter.** The principles glass-ui's dock should be measured against:
- Springs over duration. Two designer-facing params only: **response** (how fast it reaches target) + **damping** (overshoot). Avoids the word "duration" deliberately.
- **Interruptible / redirectable**: a gesture must be retargetable mid-flight; never wait for velocity to cross a threshold — respond to acceleration.
- **Velocity continuity**: a retarget carries current `(value, velocity)`, never restarts from rest.
- **Damping heuristic**: 100% damping (no bounce) for tap surfaces with no momentum; bounce ONLY when the gesture carried momentum in the motion direction.
- **Behavior over animation**: design dynamic behaviors responsive to input, not prescribed curves.
- **Cohesive character**: treat all motion as one family the user learns by repetition.
Sources: https://developer.apple.com/videos/play/wwdc2018/803/ · https://developer.apple.com/design/human-interface-guidelines/motion (2026-06-06)

**Carbon (IBM)** — productive vs expressive modes, each with standard/entrance/exit. Standard-productive = `cubic-bezier(0.2,0,0.38,0.9)`; durations fast-01 through slow-02. The takeaway: a **two-register system** (functional/quick vs expressive/showy) plus the rule "duration scales with travel distance + element size."
Sources: https://carbondesignsystem.com/elements/motion/overview/ · https://carbondesignsystem.com/elements/motion/code/ (2026-06-06)

**Fluent 2 / Polaris** — confirm the *principle* layer more than tokens: motion must be functional/purposeful (not decoration), natural (inertia/gravity/weight/velocity), consistent (token-driven, "ensures motion is in sync with the design system"), appealing. Fluent's container-transform pattern (resize/reposition as one morph) is exactly the dock's collapsed↔expanded case.
Sources: https://fluent2.microsoft.design/motion · https://polaris-react.shopify.com/design/motion (2026-06-06)

**Synthesis of the consistent-language framework** (the 5 columns every mature system has):
1. **Curve primitives** — springs (response+damping) and/or beziers.
2. **Semantic role tokens** — spatial vs effects; fast/default/slow by coverage. The author picks the *role*, the system picks the curve.
3. **Choreography rules** — co-moving properties settle on ONE clock; enter/exit symmetry; duration ∝ distance.
4. **Principles doc** — purposeful, interruptible, natural, cohesive, reduced-motion-respecting.
5. **Enforcement** — tokens are the only sanctioned source; lint/proof gates forbid raw values.

## 2. Diagnosis — where glass-ui's dock sits against that framework

The dock is **already past most of the iOS-fluid bar.** Concretely it has:
- A spring vocabulary `--spring-{smooth,snappy,bouncy,gentle,dock}` regenerated from the keyframes.js analytic ODE (`scripts/regen-spring-tokens.mjs:30-61`), bit-identical between the CSS `linear()` token and the JS `SpringProgress` driver (`useLayerTransition.ts:19`, the `DOCK_SPRING` mirror).
- **Lockstep opacity + size — the user's "shrink-before-fade lag" is ALREADY fixed.** Both the container morph and the layer fade ride the same `--dock-motion-resize` (=`--spring-dock`) token, and the FLIP path starts the class-opacity swap and the width-set in the *same* rAF (`useLayerTransition.ts:263-318`; `dock.css:516-529`). This was the AU.W2 "not iOS-smooth" fold.
- **Interruptible + velocity-continuous springs** — a re-toggle mid-morph re-seats the live solver's target from current `(value, velocity)` instead of disposing (`useLayerTransition.ts:234-248, 307-318`). This is the WWDC18 redirectable-spring contract, implemented.
- **One-driver-per-concern** — size=spring/VT, opacity=CSS crossfade, visibility=delayed-hold fork; the dual-driver races were explicitly retired (`dock.css:460-475, 562-573`). Gated by `proof:dock-motion-single-source`, `proof:dock-opacity-lockstep`, `proof:dock-animation-live` (package.json:551-557).
- **On-demand `will-change`** (never standing), View-Transitions native fork with FLIP fallback, PRM fast-path (`useLayerTransition.ts:166-181, 199-228`).
- Press springs that follow the Apple heuristic: tap surfaces use no-overshoot `--spring-smooth` (`dock-controls.css:24-43`).

**The real gaps** (the consistent-language deltas, not motion bugs):

- **G1 — no semantic motion-role layer.** glass-ui springs are named by *physics* (`smooth/snappy/bouncy/gentle/dock`), not by *role* (M3's spatial/effects × fast/default/slow). `grep` confirms zero `--motion-spatial` / `--motion-effect` tokens (§1 check). A component author today must *know* that opacity should use a critically-damped curve and size can overshoot — there's no token that encodes that intent. This is THE missing piece for "every component animates coherently." The `--spring-dock` (ζ=0.5, +18.5% overshoot) is correctly used for the dock's *size*, but the layer *opacity* also rides `--spring-dock` (`dock.css:527`) — an overshooting curve on opacity, which M3 explicitly forbids (opacity overshoot = a flash above 1.0, clamped, so it reads as a hold-then-pop near the end). The lockstep was bought by sharing the curve; the *correct* fix is co-terminating, separately-damped curves (same response, ζ_size<1, ζ_opacity=1).

- **G2 — the rail indicator and the container morph use the same `--spring-dock`, but the rail's travelling indicator is a small spatial move** that M3 would put on a *faster* spring (`fast-spatial`). It currently rides `--dock-motion-resize` (`dock.css:820-826`). It works, but it's the same speed as a full container morph — not coverage-scaled.

- **G3 — wrap reflow is not animated.** The `overflow="wrap"` recipe flips `flex-wrap: wrap` + `height: auto` (`dock.css:684-691`) and the `@media` breakpoint snaps back to nowrap (`dock.css:931-941`). A row wrapping/unwrapping is a discrete jump — `height: auto` doesn't interpolate, and there's no FLIP capture for the wrap boundary. "Graceful wrap" is the one un-sprung transition in the dock. (This is a known hard problem — auto height + reflow — and is genuinely missing motion.)

- **G4 — no published motion principles doc / no "motion-role" enforcement gate.** There are excellent *mechanism* gates (single-source, lockstep, live) but nothing that says "opacity must use an effects-role token" or "spatial moves scale speed by coverage." The consistency is enforced at the driver level, not the *vocabulary* level. A new component can still reach for a raw `--spring-bouncy` on a fade.

## 3. ADOPT / wave-seed list (concrete AW dock-animation folds)

**AW.W? — `motion-role` semantic token layer (HEADLINE; the M3 spatial/effects adoption).**
Add a role layer ON TOP of the existing physical springs in `tokens.css` §2, mapping intent→curve. keyframes.js stays read-only — these are CSS aliases over existing `--spring-*` + new regen-script presets:
- `--motion-spatial-fast/default/slow` (overshoot-allowed, ζ≈0.5–0.9, response scaled by coverage) — for size/position/transform.
- `--motion-effect-fast/default/slow` (critically damped, ζ=1.0 = `--spring-gentle` family) — for opacity/color.
Component authors consume `var(--motion-effect-default)` for fades, `var(--motion-spatial-default)` for morphs. The dock's existing `--spring-dock` becomes `--motion-spatial-default` (or a dock-local alias of it). Cite M3's table as the canonical mapping. This is the single highest-leverage fold for "every component animates coherently."

**AW.W? — split the dock's opacity off the overshoot curve (fixes G1's correctness flaw while KEEPING lockstep).**
Today size and opacity share `--spring-dock` (ζ=0.5) to settle together (`dock.css:527`). Replace with co-terminating curves: size on `--motion-spatial-default` (overshoot), opacity on `--motion-effect-default` (ζ=1.0, same response → same settle time, no opacity overshoot). They still finish together — that's the lockstep contract — but opacity no longer pushes past 1.0. Add a `proof:dock-effect-no-overshoot` companion to `proof:dock-opacity-lockstep`.

**AW.W? — coverage-scale the rail indicator (G2).**
Rebind `.dock-layer-tab-indicator` (`dock.css:826`) from `--dock-motion-resize` to a new `--motion-spatial-fast` (small move, faster spring). The travelling indicator is switch-sized; M3 puts it on fast-spatial. Snappier rail = more iOS-feel without touching the container morph.

**AW.W? — graceful wrap via FLIP-on-wrap-boundary (G3).**
The one un-sprung dock transition. Seed: when `overflow="wrap"` and the wrap count changes (ResizeObserver on `.dock-layer--full`), capture pre/post `height` and drive it on the `--spring-dock` FLIP path that `useLayerTransition` already provides — generalize the layer-FLIP to also own the wrap-height morph. Alternative low-cost seed: `interpolate-size: allow-keywords` + `calc-size()` for the `height: auto` arm IF a single driver owns it (the AV.W9.0 retirement warns against dual-driving — so it must be the spring path OR calc-size, never both). Worth a spike to pick.

**AW.W? — publish the motion-language principles doc + a vocabulary gate (G4).**
A `docs/precepts/motion-language.md` codifying: (1) the spatial/effects split, (2) interruptible-spring contract (already implemented — document it as the house rule), (3) duration∝coverage, (4) reduced-motion is a first-class fork, (5) tap=no-overshoot / momentum=bounce (the Apple heuristic, already followed in `dock-controls.css:24`). Pair with a `proof:motion-role-vocabulary` gate that forbids raw `--spring-bouncy`/overshoot tokens on `opacity`/`color`/`background` transition properties (analogous to `proof:dock-vocabulary`). This is what converts the dock's per-driver consistency into *library-wide* consistency.

**AW.W? — unify the cross-component spring vocabulary audit (cohesive-character fold).**
`grep` shows 28 `--spring-*` consumption sites across CSS with no role discipline (§1 check) — e.g. some fades on `--spring-snappy` (overshoot) elsewhere in the library. A sweep retargeting every transition to the new role layer makes the whole system one motion family (the Apple "cohesive character" + Fluent "consistent" principle). This is the audit that makes the headline token layer actually bind everywhere, not just the dock.

**Not-a-gap (do NOT re-seed):** the "shrink-before-fade lag" in the prompt is already closed (AU.W2 lockstep, `useLayerTransition.ts:263-318`); interruptible/velocity-continuous springs are already in (`:234-248`); single-driver races already retired (AV.W9.0/9.1). The remaining work is *vocabulary and coverage*, not *mechanism*.

Key files: `src/styles/tokens.css:159-184` (spring + ease tokens), `src/styles/dock.css:18-26,454-573,820-826,669-706` (dock motion contract + wrap), `src/components/custom/dock/composables/useLayerTransition.ts:19,234-345` (the spring driver), `scripts/regen-spring-tokens.mjs:30-61` (spring source of truth), `src/styles/dock-controls.css:24-43` (press-spring Apple heuristic), package.json:551-596 (dock/motion proof gates).

---

## Lane 9

I have everything I need. Let me write the brief.

# Brief — keyframes.js animation SOTA for the glass-ui dock (lockstep + springiness)

**Lane: kf-tranche-audit. Mode: read-only diagnosis + wave seeds. inv-16: keyframes.js is READ-ONLY/name-forward — every symbol below is consumed via its published LIGHT (value.js-free) surface; zero keyframes edits proposed.**

---

## 1. What the dock consumes today, and where the lag actually lives

The dock already imports ONE keyframes symbol: `SpringProgress` (`src/components/custom/dock/composables/useLayerTransition.ts:3`). It drives the container **size** (width/height) in pixel space off one analytic solver (`useLayerTransition.ts:307-333`), with iOS-correct interruptible retargeting — an in-flight swap re-seats `set target` from live `(value, velocity)` instead of dispose+reconstruct (`useLayerTransition.ts:234-255`, `316-318`). That half is already SOTA.

**The lockstep defect is a split-driver seam, not a keyframes gap.** Size is JS-spring-driven (px written per frame), but item/pane **opacity rides a separate CSS transition** — `transition: opacity var(--dock-motion-resize)` on `.dock-layer-item-host` (`src/styles/dock.css:526-548`), where `--dock-motion-resize` is the `--spring-dock` `linear()` token (`dock.css:26`). Two clocks: a JS rAF spring and a CSS `linear()` transition. They are *tuned* to the same `(0.5, 0.5)` curve (the "bit-identical" intent, `AU-keyframes-coordination.md:179-187`) but they are not the *same* clock — start-frame skew, retarget skew (the JS spring re-seats mid-flight; the CSS transition restarts its curve from 0), and settle skew all reintroduce the "shrinks before items fade" the user reported (`AU-keyframes-coordination.md:199-205`).

**Two more gaps:**
- **No item-level entrance.** Dock items fade as one opacity block on the host (`dock.css:526-548`). There is no per-item stagger — items pop in unison, not iOS-cascade. `grep` confirms zero `stagger`/`transition-delay`/`nth-child` in `dock.css`.
- **Stale doc / no morph.** CLAUDE.md references `useDockTransition` (axis-aware FLIP) — that file does not exist; the real composable is `useLayerTransition`. Items don't position-morph at all (no `ElementMorph`); on a wrap or rail reflow they jump.

---

## 2. What keyframes.js LIGHT tier offers (all published, value.js-free, file:line)

| Symbol | Source | What it gives the dock |
|---|---|---|
| `SpringProgress` | `spring.ts:149` | Analytic 2nd-order ODE; `(response, dampingFraction)` SwiftUI surface (`spring.ts:16-47`) AND the modern `fromDuration({visualDuration, bounce})` Motion surface (`spring.ts:212`). Interruptible `set target` re-seats closed-form from live `(x,v)` — no jump (`spring.ts:241-268`). `.subscribe(cb)` fans ONE clock to N consumers (`spring.ts:428`). **Already in use.** |
| `springTimingFunction` | `springTimingFunction.ts:65` | Samples the SAME solver into a typed `Easing` `{ fn, css }` — `.fn` is a callable `(t)=>number` over [0,1] with real overshoot (`springTimingFunction.ts:95-104`), `.css` is the matching `linear()` (`:119`). This is the key to **one curve, two forms**: feed `.fn` to `ElementMorph`/`NumericAnimation`, ship `.css` to WAAPI. |
| `springLinearStops` | `springLinearStops.ts:46` | Same solver → CSS `linear()` string. Already the build-time token author (`scripts/regen-spring-tokens.mjs` → `--spring-dock`). |
| `stagger` | `stagger.ts:127` | Pure construction-time per-index delay generator. `from: "first"|"last"|"center"|"edges"|number`, `each` ms, optional `ease` reshape (`stagger.ts:42-59`). `.delays(total)` materializes the array (`stagger.ts:167`). Zero hot-path cost, zero value.js. **The cheapest, highest-ROI dock fold.** |
| `flip` / `flipShared` | `flip.ts:108` / `flip.ts:146` | FLIP layout animation over `ElementMorph`; batched read-mutate-read, no thrash (`flip.ts:119-122`). `springTimingFunction` makes it springy for free (`flip.ts:17-18`). Exactly the primitive for **graceful wrap / rail reflow** — items morph from old to new rect instead of jumping. |
| `ElementMorph` | `morph.ts:48` | Stateless position+scale interp between two DOM rects; `.at(p)`, `.toCSSTransform(p)`, managed `.play(el)` (`morph.ts:87-116`). The Invert+Play half FLIP composes. |
| `Draggable` / `drag` | `drag.ts:87` / `drag.ts:316` | Pointer-follow + release-velocity fling over a `SpringProgress` (`drag.ts:74-86`); rolling velocity window (`drag.ts:56-61`). For a **draggable/flingable dock or rail** with momentum. |
| `SmoothProgress` | `smooth.ts` | Exponential smoothing (non-overshoot) — for tracking, not springy entrance. Sibling of SpringProgress. |
| `Sequence` | `sequence.ts:97` | Master-playhead temporal orchestrator (GSAP-Timeline-class): positions N child animations along one clock with `at` / `"+="` / labels (`sequence.ts:64-90`). HEAVY-adjacent — it drives `Animation` (the value.js engine), so **not** for the dock's value.js-free graph. Note for richer non-dock demo sequencing only. |

**Boundary law (must hold):** `AnimationGroup`, `loadAnimationEngine`, `Animation`, `CSSKeyframesAnimation`, `.fromString`, `resolveEasing` are HEAVY — they pull value.js and are **forbidden** in the dock graph (`AU-keyframes-coordination.md:97-104`, `index.ts:113-206`). `SpringProgress`, `springTimingFunction`, `stagger`, `flip`, `flipShared`, `ElementMorph`, `Draggable`, `SmoothProgress`, `RAFPlayback`, `toEasing` are all LIGHT (`index.ts:30-69`) — value.js:0, proven by keyframes `proof:boundary`.

---

## 3. ADOPT / wave-seed list (concrete AW dock-animation folds)

**AW.W-α — Single-clock lockstep (kills the shrink-before-fade). HEADLINE.**
Collapse the split driver: the SAME `SpringProgress.subscribe(cb)` (or the `play(onFrame)` callback already in `useLayerTransition.ts:318`) that writes container size must ALSO write item/pane opacity in the same callback frame. Map the spring's normalized progress (not its px `value` — add a 0→1 `SpringProgress` or normalize the px range) to opacity. Remove the CSS `transition: opacity var(--dock-motion-resize)` on `.dock-layer-item-host` (`dock.css:526-548`) so opacity is no longer a second clock. One solver, one rAF, one `subscribe` fan-out (`spring.ts:428`) → size and opacity are frame-identical through start, retarget, and settle. This is the exact fix `AU-keyframes-coordination.md §2.3` already specified ("map the one `value∈[0,1]` to BOTH width-px and opacity in the SAME callback") — it was specced but only the size half shipped; the opacity half is still CSS. Gate: extend `proof:dock-motion-single-source` to assert the opacity-stop frame and width-stop frame are the same rAF tick (not ±1).

**AW.W-β — Per-item stagger entrance (iOS cascade).**
Adopt `stagger` (`stagger.ts:127`). On expand, instead of one host-opacity fade, give each dock item a per-index delay: `stagger(items.length, { each: 24, from: "first" })` (or `"center"` for symmetric, `"edges"` for outside-in). Materialize with `.delays(total)` (`stagger.ts:167`) and bind as per-item `transition-delay` / `--d` custom prop (the `vReveal`/`[data-reveal]` `--d` directive already exists in glass-ui motion — `useStaggerReveal.ts`, `vReveal.ts`). Pure construction-time, value.js:0. This is the single highest-ROI/lowest-cost fold — it's arithmetic. Pair the stagger `ease` reshape with the dock spring's `springTimingFunction(...).fn` so the cascade easing matches the container curve.

**AW.W-γ — Graceful wrap + rail reflow via FLIP.**
When `overflow="wrap"` rewraps items to a new line, or the `DockLayerGroup` switcher rail reorders, items currently jump. Adopt `flip(el, mutate, { timingFunction: springTimingFunction(DOCK_SPRING) })` (`flip.ts:108`, `flip.ts:17-18`) so each item morphs from its old rect to its new rect on the SAME spring curve. `flipShared(a, b)` (`flip.ts:146`) handles shared-element transitions (e.g. an item promoting between the collapsed-summary layer and the full layer — Motion `layoutId` style). Both are LIGHT, both batch their rect reads (`flip.ts:119-122`).

**AW.W-δ — Unify the curve surface on `springTimingFunction`.**
Today the build token (`springLinearStops` → `--spring-dock`) and the runtime driver (`SpringProgress(0.5,0.5)`) are two call sites of the same `(response,ζ)` that must be hand-kept-in-sync (`useLayerTransition.ts:9-19` warns "retune MUST touch BOTH"). Replace with ONE `springTimingFunction({response:0.5, dampingFraction:0.5})` call (`springTimingFunction.ts:65`) that yields `{ fn, css }` from one sampling: `.css` feeds the CSS token, `.fn` feeds any `ElementMorph`/`NumericAnimation`/stagger-reshape path. One source object, drift impossible, and the WAAPI path gets the real overshoot `linear()` for free (`springTimingFunction.ts:106-119`). Also adopt `SpringProgress.fromDuration({visualDuration, bounce})` (`spring.ts:212`) as the designer-facing tuning surface for the dock preset — `bounce` ∈ [−1,1] is more legible than `dampingFraction`.

**AW.W-ε — Consistent animation/interaction language (one preset family).**
The dock has `--dock-motion-resize` (spring), `--dock-motion-standard`, `--dock-motion-fast` (linear-ish), and a separate `--dock-press-spring` (transform-only press, `tokens.css:1275` — keep orthogonal per `AU-keyframes-coordination.md:170`). Define the dock's motion vocabulary as a small set of `springTimingFunction` presets (resize / entrance / press) all sampled from one solver, so size, opacity, stagger, FLIP, and press feedback all read as ONE physical material. Document the preset table beside the `<Role>Dock` README vocabulary (`AU-keyframes-coordination.md §6`).

**AW.W-ζ (optional, gesture) — Draggable dock / rail with fling.**
If the dock or its switcher rail becomes drag-repositionable, adopt `Draggable` (`drag.ts:87`): pointer-follow + release-velocity fling over a `SpringProgress`, rolling velocity window (`drag.ts:56-61`). The Slider keep-dock-open contract already establishes pointer-gesture plumbing in the dock; `Draggable.spring` is reachable for `.subscribe`/`.play` so it folds into the same single-clock discipline as AW.W-α. Book until a concrete drag use case exists (no current consumer).

---

## 4. Collaboration with the keyframes.js agent workflow (the name-forward edge)

The seam is **one-way and already booked**: glass-ui publishes 3.3.0 with the dock primitives; keyframes **D.W5** is the anticipated 2nd consumer that moves its pin `file:../glass-ui → ^3.3.0` and adopts the `<Role>Dock` vocabulary (`ChromeDock`/`TransportDock`) over the published primitives (`AU-keyframes-coordination.md:214-237`). keyframes D.W5 self-resumes when 3.3.0 lands on npm. The keyframes F tranche notes the user *explicitly relaxed inv-16 for cross-repo hand-offs* on dedicated `tranche-f-handoff` branches (`F/FINAL.md` headline) — so a coordinated AW↔D.W5 drive is the sanctioned pattern: glass-ui authors the dock-motion folds + publishes; keyframes consumes the primitives + adopts the vocabulary, name-forward, with zero keyframes source change required for any fold above (all LIGHT surface, stable across `^2.2.0 || ^3.0.0`, `AU-keyframes-coordination.md:108-127`).

**Bottom line:** the springiness substrate is fully present and partly consumed. The dock's "not iOS-smooth" gap is a glass-ui-owned **two-clock seam** (JS spring for size + CSS transition for opacity) plus **missing item stagger and FLIP reflow**. The fix is to collapse onto ONE `SpringProgress` clock with `subscribe` fan-out (AW.W-α), add `stagger` entrance (AW.W-β), add `flip`/`flipShared` for wrap/rail (AW.W-γ), and unify the curve on `springTimingFunction` (AW.W-δ) — all from the published LIGHT surface, keyframes untouched.

---

## Lane 10

The diagnosis is confirmed and complete. The proof gate's own header documents that the FLIP path is "the deterministic, live-DOM-measurable path" — and crucially, the gate only exercises the FLIP path by **forcibly removing `startViewTransition`**. The default browser path (VT) is the one slides use, and that's where problem (1) lives. I have everything I need to write the brief.

---

# Dock Animation Audit — Lane `dock-current-diagnosis` (post-AV.W9)

Two animation drivers coexist in `useLayerTransition.ts`, forked on `NATIVE_VT` (`:96-97`). Chrome 111+ and Safari 18+ both expose `document.startViewTransition`, so **the View-Transitions (VT) path is the one that runs in every modern browser** — including the slides deck. The JS FLIP+spring path only runs when VT is absent. This fork is the spine of both bugs.

## Problem 1 — simple two-layer collapse: width stuck at collapsed width

**Root cause: the VT path mutates layer state but never gives the browser two differently-sized snapshots to morph between, because the width that distinguishes expanded from collapsed is owned by CSS rules that resolve to the SAME box under a View-Transition snapshot.**

Trace:

- `GlassDock.vue:202-210` drives the outer pair through `useLayerTransition` with `outerActiveLayer` = `"full" | "summary"`. On expand, `activeLayer` flips and the watcher fires.
- `useLayerTransition.ts:199-211` takes the **native branch**: it wraps `leavingLayer`/`currentLayer` mutation in `startViewTransition()` and returns. It does **zero** width work — no measure, no pin, no inline size. It trusts the browser to interpolate the `.dock-layers` box between the old and new snapshot.
- But the width delta between collapsed and expanded does **not** come from the layer-state classes the VT callback flips. It comes from dock-root classes:
  - `dock.css:594` `.glass-dock.expanded { overflow: visible }`
  - `dock.css:598-600` `.glass-dock.expanded:not(.fit-content) .dock-layers { width: 100% }`
  - `dock.css:602-604` `.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }`
  - collapsed width comes from `dock.css:366-376` (`.collapsed` padding/justify) + `dock.css:378-384` (`.dock-layer--summary { min-width }`).
- The `.expanded`/`.collapsed` class lives on the **dock root**, toggled reactively by `visualExpanded` in the template `:class` (`GlassDock.vue:368`) — **outside** the `startViewTransition` callback. Vue applies that class on its own flush tick, not synchronized to the VT snapshot boundary. The VT callback (`useLayerTransition.ts:202-205`) only mutates `leavingLayer`/`currentLayer`, which drive `.layer-active` on the panes — not the root `.expanded` class that actually changes width.
- Net: when the browser captures the "old" and "new" snapshots of `.dock-layers` (tagged `view-transition-name` at `GlassDock.vue:223-230`), the width-governing `.expanded` class is not part of the captured mutation, so both snapshots can measure at the same width. The `::view-transition-group(.gl-dock-layer)` recipe (`view-transition.css:59-62`) animates a zero-size delta → **no visible width morph; the dock appears stuck at collapsed width.**

This is exactly why AV.W9 "fixed DockLayerGroup but broke GlassDock collapse": `DockLayerGroup` (`DockLayerGroup.vue:163-170`) puts the size-bearing content **inside** `.dock-layer-stack` (the VT-named element) and the active pane's intrinsic width (`dock.css:866-871` `.dock-layer-item-host.is-active { width: max-content }`) changes as a direct consequence of the `.is-active`/`.is-leaving` class swap that the VT callback DOES perform. So the stack's two snapshots genuinely differ and the browser morphs them. The simple GlassDock pair has its width delta on the *root* class, one level up from the VT-captured box and not flipped inside the callback — so the VT snapshot pair is identical and nothing morphs.

Secondary corroboration: `proof-dock-animation-live.mjs:14-18` only validates width-morphing on the FLIP path, which it reaches by *removing* `startViewTransition` to force `NATIVE_VT=false`. The VT path's width behavior for the simple collapse is asserted only as "the browser must run ≥1 `::view-transition-group` animation" (`:33-37` of the header) — it never checks the width *delta is nonzero*, so a zero-delta morph passes green. The bug lives precisely in the untested gap.

## Problem 2 — shrink-before-fade lockstep lag

Two distinct contributors, both real:

**2a — VT path: leaving snapshot fades on the browser's default cross-fade, decoupled from the spring curve.** Under VT, `::view-transition-old(.gl-dock-layer)` / `-new(...)` are not given explicit opacity keyframes — only the **group** gets the spring timing (`view-transition.css:59-62`). The old/new image cross-fade therefore runs the UA-default `cross-fade` animation on the group's duration but with the UA's default easing envelope, while the group's *size* runs `--dock-resize-spring` (the `--spring-dock` overshoot linear(), `tokens.css:163`/`:1301`). Size overshoots to +18.5% and settles back; opacity does a plain ease cross-fade. They are duration-matched but **curve-mismatched** — the content reads as fading on a different clock than the box morphs, the "shrink-before-fade" feel. There is no `::view-transition-old/new(.gl-dock-layer)` rule pinning opacity to the same spring.

**2b — FLIP path: the opacity transition and the spring start one frame apart by construction, and opacity rides a duration-based CSS transition while size rides a spring.** Even on the kept FLIP path:
- The size is driven by `SpringProgress` in pixel space (`useLayerTransition.ts:318-333`) — a real spring with overshoot.
- The pane opacity is **class-driven CSS** `transition: opacity var(--dock-motion-resize)` (`dock.css:524-529`), where `--dock-motion-resize = var(--duration-normal) var(--dock-resize-spring)` (`dock.css:26`). So opacity uses the spring *as a CSS easing curve over a fixed 0.3s* (`--duration-normal`, `tokens.css:73`), but the `SpringProgress` driver has its **own** settle time derived from `(response 0.5, ζ 0.5)` (`DOCK_SPRING`, `:19`) which is **not** pinned to 0.3s. A response-0.5 underdamped spring settles closer to ~0.7-0.9s, not 0.3s. So the CSS opacity finishes at a fixed 300ms while the JS width spring is still overshooting and settling for several hundred ms more → opacity arrives, then the box keeps moving = visible lag. AU.W2's comment (`dock.css:516-523`) claims they "settle in lockstep by the shared (0.5,0.5) curve," but that is **false**: the CSS side is clamped to `--duration-normal` (0.3s) and the JS side runs the spring's natural settle time. They share the curve *name*, not the *settle time*.
- Additionally `useLayerTransition.ts:263-273` defers the class swap (opacity start) into a `nextTick → requestAnimationFrame`, and the spring `.play()` starts inside that same rAF — but the opacity CSS transition begins when the class lands (style flush at end of that frame) while the spring's first frame is the *next* rAF tick. They are within ~1 frame, which is the gate's tolerance (`proof-dock-animation-live.mjs:55`, 33.4ms), but it is not truly zero.

The deeper structural fault: **size and opacity are driven by two different engines (JS spring vs CSS transition) with two different settle profiles.** True lockstep requires one clock driving both.

## Other findings (relevant to the AW redesign)

- **Dual stacking of fixed-duration + spring on the dock root.** `dock.css:253-260` transitions `padding`/`transform`/`background`/`border-color` on `--dock-motion-resize` (spring-as-easing over 0.3s). The width morph (FLIP spring or VT) has a *different* effective settle time than the padding transition. So on a simple expand the padding snaps at 0.3s while width keeps springing → the dock's internal padding settles before its outer width. Another lockstep break.
- **`--spring-dock` is a 50-stop `linear()`** (`tokens.css:163`) approximating `(response 0.5, ζ 0.5)`. Used as a CSS `animation-timing-function` it is fine, but `linear()` over a *fixed duration* cannot reproduce a true spring's time-domain settle; only the JS `SpringProgress` does. This is the irreducible source of VT↔FLIP↔CSS drift: three "same curve" claims, three different settle times.
- **Reduced-motion has three separate gates** (`useLayerTransition.ts:219-228` JS, `view-transition.css:27-33` CSS-VT, `utilities.css` global width-strip per `dock.css:443-447`) — correct but a maintenance hazard; a redesign should centralize.
- **`isTransitioning` flag uses a guessed `longestTransitionMs + 50` timer** (`GlassDock.vue:240-277`) because no single event marks the spring's true settle on the VT path. A single-clock driver removes the need for the generation-counter machinery (`morphGeneration`, `:154`/`:264-288`).

---

# ADOPT / wave-seed list (AW dock-animation wave)

Concrete, name-forward (inv-16: keyframes.js stays READ-ONLY — these *consume* `SpringProgress`/`SpringValue`, never modify the lib).

1. **AW-W1 — One driver owns the simple collapse too (the headline fix).** Either (a) bring the width-governing class flip INTO the mutation the VT path captures — flip a state class on the VT-named `.dock-layers` element itself inside the `startViewTransition` callback, so the two snapshots genuinely differ in width; OR (b) **retire the VT fork for the dock entirely** and run the JS FLIP+spring on every engine. Recommendation: (b). The VT path's value (zero rAF) is undercut by the curve-mismatch lag (2a) and the snapshot-delta trap (1); a single JS spring driver gives true lockstep and is already the only path the behavioral gate trusts. This collapses two code paths to one and kills problem 1 outright.

2. **AW-W2 — Single-clock size+opacity lockstep.** Drive BOTH the container size AND the pane opacity from the *same* `SpringProgress`/`SpringValue` instance. The spring's normalized progress `t∈[0,1]` maps to width (pixel space) AND to opacity (`opacity = clamp(progress)`), written in the same `.play()` frame callback. Remove the CSS `transition: opacity var(--dock-motion-resize)` from `dock.css:524-529` so opacity is no longer on a separate 0.3s clock. This kills problem 2b — they cannot drift because they are the same clock. (keyframes.js read-only: we only call `.play(onFrame)` and read `.value`.)

3. **AW-W3 — Spring settle-time = CSS duration reconciliation.** If any CSS-driven property must remain (padding/shadow), retune `--duration-normal`-for-dock or introduce a `--dock-spring-settle` token computed FROM `(response 0.5, ζ 0.5)` so the CSS `linear()` envelope and the JS spring actually finish at the same wall-clock time. Or move padding/transform onto the same JS spring clock as size (preferred — full lockstep, no token-guessing).

4. **AW-W4 — Velocity-continuous interrupt as the default, not a special case.** The retarget logic at `useLayerTransition.ts:234-255` (re-seat `set target` from live `(value, velocity)`) is the iOS contract and is correct — but it only exists on the FLIP path. If AW-W1 unifies on the JS spring, every engine inherits interruptible springs. Make this the spine, not a fallback branch.

5. **AW-W5 — Springy iOS curve audit.** `(response 0.5, ζ 0.5)` gives ~+18.5% overshoot, which can read as bouncy-loose for a small UI chrome. Consider a per-axis curve: snappier (higher ζ ~0.7-0.8) for the small collapse morph, looser for large layer-group swaps. Token: `--spring-dock` stays the source of truth; expose `--dock-collapse-spring` vs `--dock-layer-spring` if they should differ. Validate against real iOS Now-Playing/Dynamic-Island feel.

6. **AW-W6 — Stagger the item reveal (polish fold).** Once size+opacity are lockstep (AW-W2), add an optional per-item entrance stagger inside the expanding layer (`--d` delay walker, the existing `vReveal`/`useStagger` idiom from `composables/motion/`) so items cascade in *with* the morph rather than all popping at the settle. Keeps "lockstep with the container" (the cascade rides the same spring progress) while adding richness.

7. **AW-W7 — Rail indicator on the unified clock.** The travelling `.dock-layer-tab-indicator` (`dock.css:826-839`) rides `--dock-motion-resize` CSS transitions on reka's position vars. Once the layer morph is a JS spring, the indicator drifts from the pane morph (different clock again). Either drive the indicator transform from the same spring progress or accept it as decorative — but document the decision.

8. **AW-W8 — Graceful wrap during morph.** `overflow="wrap"` (`dock.css:676-706`) changes `flex-wrap`/`height:auto` at a breakpoint; during a width morph this can cause a reflow jump. Seed: measure the wrapped natural height as the spring target so wrap transitions also morph height in lockstep rather than snapping.

9. **AW-W9 — Behavioral gate must assert nonzero width delta on the VT/default path.** `proof-dock-animation-live.mjs` only checks ">=1 VT-group animation" on the default path and only checks width-delta on the force-FLIP path. Add: on the real default engine, assert the simple GlassDock collapse produces a **nonzero width delta** across frames. This is the gate that would have caught problem 1. (If AW-W1 retires the VT fork, this becomes a single-path assertion — simpler.)

**Key file:line anchors for the wave:**
- VT fork that skips width work on simple collapse: `useLayerTransition.ts:199-211`
- Root-class width governance (outside the VT callback): `dock.css:594-604`, root class applied in `GlassDock.vue:368`
- Two-engine opacity/size split (problem 2b): spring at `useLayerTransition.ts:318-333` vs CSS opacity at `dock.css:524-529`, false-lockstep comment `dock.css:516-523`
- Spring constants (read-only consume): `useLayerTransition.ts:19`; CSS curve `tokens.css:163` / `:1301`; duration clamp `tokens.css:73`
- VT curve-mismatch (problem 2a): `view-transition.css:59-62` (group gets spring; old/new get UA default)
- Gate blind spot: `proof-dock-animation-live.mjs:14-18` (forces FLIP), header `:33-37` (VT path only checks animation-count)

---

## Lane 11

I have everything needed for a tight, rail-focused brief. Let me confirm one last thing — whether the rail is actually rendered inside `.dock-layer--full` (so it shares the collapse fade) and whether the rail itself fades/morphs in lockstep with the layer stack. Let me check how DockLayerGroup sits inside the dock and whether the rail border is a hard line. I have enough from the CSS (rail uses a static `border-right`, indicator backplate is `--primary 15%`). I'll now compile the brief.

Compiling the dock-rail-refinement brief now.

# AW Dock-Rail-Refinement Brief — lane `dock-rail-refinement`

Research + diagnosis only. No implementation. keyframes.js is **READ-ONLY (name-forward)** — every spring fold re-seats the existing `SpringProgress`/`--spring-*` machinery, never edits the engine. This brief is scoped to the **DockLayerGroup switcher rail** (reka-Tabs), the **travelling indicator**, and the **layer crossfade** — the slice of the dock the broad `animation-partial-run1.md` run touched only at the edges. It is additive to that run, not a re-tread.

---

## 1. Architecture as built (what the rail actually is)

The rail is a reka-ui `Tabs` contract, NOT a hand-rolled toggle group. `DockLayerGroup.vue:132-162`:
- `<Tabs v-model="activeLayer" orientation="horizontal" :as-child="true">` wraps a `<TabsList class="dock-layer-rail">` of `<TabsTrigger class="dock-layer-tab">` + a `<TabsIndicator class="dock-layer-tab-indicator">`.
- The **same** `activeLayer` ref drives both the Tabs v-model AND `useLayerTransition` — one source of truth, so selecting a tab fires the crossfade with no second authority (`DockLayerGroup.vue:128-131` comment + `:57-61`).
- Rail visibility is `v-if="showRail && layers.length > 1"` (`:133`) — auto-hidden at 0/1 layer.
- The rail is **separate** from the `<DockLayer>` panes: tabs are built from each layer's registered `{id, label, icon}` descriptor (`DockLayer.vue:29-35` registers; `DockLayerGroup.vue:42-53` collects).

The indicator backplate is the **only** active affordance — the per-button active background was retired (`dock.css:804-809`); the tab keeps only a `color: var(--primary)` glyph tint at `data-state="active"`.

The rail keyboard contract is APG-correct and load-bearing: roving tabindex, Arrow/Home/End, `aria-selected` (not `aria-pressed`), with a focus-in/out keep-dock-open token (`DockLayerGroup.vue:100-115`). Guarded by `proof:dock-a11y-contract` (`tests/components/custom/dock/DockLayerRail.a11y.test.ts`). **Do not regress this** — any rail fold must keep the rendered-attr assertions green.

---

## 2. Diagnosis — where the rail is NOT yet polished/iOS-grade

### R1 — Indicator and layer-content run on independent clocks (the rail-displaced lockstep lag)
The indicator travels on `width var(--dock-motion-resize), transform var(--dock-motion-resize)` (`dock.css:835-837`) — good, that IS the `--spring-dock` curve. But the **layer crossfade** (`opacity var(--dock-motion-resize)`, `dock.css:526-529`) and the **container size morph** (`SpringProgress`, `useLayerTransition.ts:307-333`) are driven separately. On a CSS engine the indicator transition and the opacity transition share a token but start whenever each property's value changes — the indicator's `--reka-tabs-indicator-position` updates `flush:"post"` after reka's `updateIndicatorStyle()` (`TabsIndicator.js:31-52`, ResizeObserver-driven), which is a *different* frame origin than the rAF-deferred class swap in `useLayerTransition.ts:263-273`. Result: the indicator can start sliding a frame or two before/after the pane crossfade. This is the run1 "Bug B residual" but the precise mechanism is the reka `flush:"post"` + ResizeObserver origin vs the dock's hand-deferred rAF origin — they are not the same tick. **The indicator is not choreographed into the single-frame-origin contract the panes already have.**

### R2 — Base `TabsIndicator` carries a conflicting curve that the dock must override every time
`TabsIndicator.vue` (the shared ui component) hardcodes `transition-[width,transform] duration-normal ease-spring-snappy` (`src/components/ui/tabs/TabsIndicator.vue` template). The dock then re-declares the full transition with `--dock-motion-resize` (`--spring-dock`) at `dock.css:835-837`. So there are **two curve authorities** stacked on the same element — the base `ease-spring-snappy` (the rejected "mechanical" ζ=0.65 spring, `tokens.css:1295-1298`) and the dock's `--spring-dock` override. It works because dock.css wins the cascade, but it's a latent inconsistency: any rail that forgets the override inherits the snappy curve, and the two springs visibly differ (+6.8% vs +18.5% overshoot). The rail's curve should be token-driven from one place, not a base-then-override stack.

### R3 — The rail has no enter/leave motion of its own (hard pop at the 1→2 layer boundary)
The rail's `v-if` (`DockLayerGroup.vue:133`) flips it into existence the instant `layers.length` crosses 2, and out at 1. There is **no transition** on the rail mount/unmount — it pops in/out as a single frame. When a `DockLayerGroup` gains/loses a layer dynamically (or a dock expands to reveal it), the rail snaps. iOS would fade/slide the rail in. The indicator also has no first-paint entrance — on initial mount it appears already-placed rather than settling in.

### R4 — Indicator is `translateX`-only; not axis-symmetric with the rest of the dock
`dock.css:826-839` paints the indicator with a fixed `height: var(--dock-layer-tab-size)`, `width: var(--reka-tabs-indicator-size)`, `transform: translateX(...)`. The rail is forced visually horizontal even in a vertical dock — `dock.css:754-758` rotates the vertical-group rail to `flex-direction: row` precisely so the `translateX` indicator stays valid (`DockLayerGroup.vue:128-131` "horizontal-always keyboard decision"). This is a **workaround, not a design**: a vertical dock's switcher rail is forced to a horizontal strip rather than a true vertical Figma-style rail. reka *can* drive the vertical axis (`TabsIndicator.js:48-51` reads `offsetTop`/`offsetHeight` when `orientation === "vertical"`), but the dock pins `orientation="horizontal"` (`DockLayerGroup.vue:135`) and the CSS only ever does `translateX`. A real vertical rail (the Figma left-edge tool rail) is unreachable today.

### R5 — Indicator backplate is flat and static (no depth, no morph richness)
The backplate is a single `color-mix(in srgb, var(--primary) 15%, transparent)` fill with a fixed `border-radius` (`dock.css:833-834`). A SOTA Figma/iOS rail indicator has: a subtle inset/glass tier (not a flat tint), an optional shadow or ring, and — the signature iOS touch — the pill **stretches/squashes along the travel axis** mid-flight (the indicator briefly elongates between source and target tabs, then settles). Today it's a rigid rectangle that slides. The `--spring-dock` overshoot gives it a bounce on arrival but no width-stretch during travel.

### R6 — Hover and active states are inconsistent with the dock's two-timeline law
The tab hover transitions `background var(--dock-motion-fast), color var(--dock-motion-fast)` (`dock.css:794-797`) — a bare `--dock-motion-fast` (0.2s `ease-standard`), NOT a spring and NOT the `--dock-press-spring` the rest of the dock controls are converging onto. The hover background (`accent 40%`, `:799-802`) competes visually with the indicator backplate (`primary 15%`) — two overlapping affordances on the same tab with two different timings and two different color families. The rail tab is outside the five-control-family token convergence the broad run flagged (run1 §AW-W2).

### R7 — The rail border is a hard hairline, not part of the glass language
The rail/stack divider is a flat `1px solid color-mix(in srgb, var(--border) 30%, transparent)` re-declared four times for the four axis×position combos (`dock.css:751-768`). It's a static CSS border with no token of its own (no `--dock-rail-divider`), no glass treatment, and it doesn't animate when the rail enters (R3). A Figma rail separates with a subtle inset shadow or a groove that reads as depth, not a 1px line.

---

## 3. SOTA for a Figma-style layer rail (the reference shape)

What a polished tool/layer rail does that the dock rail doesn't yet:
- **One travelling indicator on a single spring**, choreographed so the indicator and the revealed content arrive on the *same* timeline (lockstep) — the dock has the spring (R2 override) but not the shared frame origin (R1).
- **Indicator stretch-in-travel**: the pill elongates along the travel axis between source and target, then settles to the target width — a fluid "morph" rather than a rigid slide. (Framer/Vercel nav indicators, iOS segmented controls.)
- **Axis-true rails**: a vertical rail's indicator travels vertically (`translateY`), not a forced-horizontal strip (R4).
- **Rail enter/leave choreography**: the rail itself fades/slides in when it appears, and the indicator settles into place on first paint (R3).
- **Depth via glass tier, not a flat tint**: the active backplate is a glass rung (inset + subtle ring), the divider is a groove/inset-shadow, consistent with the dock's `.glass-*` ladder (R5, R7).
- **Directional intent on swap**: tab 1→3 reveals content sliding in the direction of travel (the broad run's AW-W3 typed-VT fold — the rail is the natural trigger surface for it since the tab-index delta is right there).

---

## 4. ADOPT / wave-seed list (rail-specific AW folds)

Ordered by leverage. All re-seat existing `SpringProgress`/`--spring-*`/`startViewTransition` machinery; zero keyframes.js edits. Each fold names a behavioral gate that PROVES the rail behavior at runtime.

### AW-rail-1 — Indicator/content single-frame-origin choreography (fixes R1) — **HIGHEST leverage**
- **Scope:** the travelling `TabsIndicator` and the layer crossfade settle on ONE timeline.
- **Technique:** the indicator already reads `--dock-motion-resize` (`dock.css:835-837`); the gap is the *start frame*. reka updates the indicator var `flush:"post"` off a ResizeObserver (`TabsIndicator.js:31-52`), a different origin than the dock's rAF-deferred class swap (`useLayerTransition.ts:263-273`). Bind the indicator's position update into the same rAF origin (or accept reka's post-flush and prove the settle deltas already align within a frame). Extends the AU.W2 `{size, opacity}` lockstep to `{size, opacity, rail-indicator}`.
- **Gate (`proof:dock-lockstep-rail`, runtime):** trigger a 1→3 rail swap via Playwright; sample `.dock-layers` width settle-time AND `.dock-layer-tab-indicator` transform settle-time; PROVE `|settle_size − settle_indicator| < ~16ms`.

### AW-rail-2 — One curve authority for the indicator (fixes R2)
- **Scope:** retire the base `ease-spring-snappy` on `TabsIndicator.vue`; the dock rail reads `--dock-resize-spring` from one place.
- **Technique:** the shared `TabsIndicator.vue` hardcodes `duration-normal ease-spring-snappy` (the rejected mechanical spring). Make the base indicator curve a token (`--tabs-indicator-ease`, default `--spring-snappy`) so the dock overrides it via one token assignment, not a full transition re-declaration at `dock.css:835-837`. One curve owner per element. *Note: the base `<Tabs>` is a general-purpose component — keep its default curve; the fix is making it a token the dock retunes, not a base+override stack.*
- **Gate (static):** grep that no dock rail element carries two `transition`/easing declarations for the same property; the dock rail's indicator easing resolves to `--spring-dock` through exactly one token.

### AW-rail-3 — Indicator stretch-in-travel (fixes R5; the signature iOS/Figma morph)
- **Scope:** the indicator pill elongates along the travel axis mid-flight, then settles.
- **Technique:** during the swap, briefly drive the indicator's `width` (horizontal) to span source→target before collapsing to the target width — either via a CSS `@keyframes` keyed off the swap class, or by widening `--reka-tabs-indicator-size` for one beat. Pure transform/width; no inherited-custom-property tween (respects the F5 inheritance-bomb guard, `useLayerTransition.ts:80-87`). `--spring-dock` already supplies the arrival bounce; this adds the travel-stretch.
- **Gate (`proof:dock-indicator-stretch`, runtime):** sample the indicator's bounding width across the swap; PROVE it peaks above both source and target widths mid-travel (the stretch), then settles to target.

### AW-rail-4 — Rail enter/leave + indicator first-paint settle (fixes R3)
- **Scope:** the rail fades/slides in when `layers.length` crosses 2 (and out at 1); the indicator settles into place on first paint instead of appearing pre-placed.
- **Technique:** wrap the rail `v-if` in a `<Transition>` (the library's existing `fade-slide`/`pop` grammar in `transitions.css`), or use `@starting-style` on the rail for a declarative entrance. Indicator first-paint: seed an entrance via the `.gl-top-layer`/`@starting-style` grammar already shipped (`animations.css §TOP-LAYER`).
- **Gate (`proof:dock-rail-enter`, runtime):** add a layer dynamically; PROVE the rail's opacity/transform animates over ≥ N frames (not a single-frame pop); under `reduce` it appears instantly.

### AW-rail-5 — Axis-true vertical rail (fixes R4)
- **Scope:** a true vertical Figma-style left/right rail whose indicator travels `translateY`.
- **Technique:** thread the dock axis into the `<Tabs orientation>` (`DockLayerGroup.vue:135` currently pins `"horizontal"`); reka already computes `offsetTop`/`offsetHeight` for vertical (`TabsIndicator.js:48-51`). The dock CSS gains a `translateY` + vertical `--reka-tabs-indicator-position` branch (`dock.css:826-839`), gated on the vertical group. Retires the `flex-direction: row` rail-rotation workaround (`dock.css:754-758`). Keyboard stays Arrow-based (reka handles vertical orientation's Up/Down). *This is a design decision — confirm whether a vertical layer rail is wanted before landing; today's horizontal-strip-in-vertical-dock is a deliberate-but-limiting choice (R4).*
- **Gate (`proof:dock-rail-axis`, runtime):** a vertical-orientation group's indicator travels on the Y axis (transform contains `translateY`), tabs stack vertically, Up/Down keys move selection.

### AW-rail-6 — Rail tab into the control-motion + glass language (fixes R6, R7, R5-depth)
- **Scope:** the rail tab hover/active and the rail divider adopt the dock's token + glass vocabulary.
- **Technique:** (a) rail tab hover/press reads `--dock-press-spring` (transform-only squish), not bare `--dock-motion-fast` (`dock.css:794-797`); (b) the active backplate becomes a glass rung (inset + subtle ring) instead of a flat `primary 15%` tint (`dock.css:833-834`); (c) the rail divider gets a `--dock-rail-divider` token + an inset-shadow/groove treatment, declared once instead of the four-fold re-declaration (`dock.css:751-768`); (d) resolve the hover-bg-vs-indicator-backplate double-affordance (R6) — one wins, or they compose deliberately.
- **Gate:** extends `proof:dock-control-motion-single-source` (run1 AW-W2) to cover the rail tab; static grep that the rail divider resolves through one `--dock-rail-divider` token.

### AW-rail-7 — Directional intent triggered from the rail (composes with run1 AW-W3)
- **Scope:** the rail is the natural trigger for the broad run's typed-VT directional fold — the tab-index delta is right there in `DockLayerGroup`.
- **Technique:** when a rail tab is selected, compute the index delta and pass `types: [delta > 0 ? 'forward' : 'backward']` to `startViewTransition` (`useLayerTransition.ts:202`); CSS `:active-view-transition-type(forward)` slides the revealed pane in the direction of travel. `@supports`-gated; FLIP fallback = crossfade; PRM = no slide. (Baseline typed-VT 2026-01-13.)
- **Gate (`proof:dock-directional-vt`, runtime):** rail 1→3 slides one way, 3→1 the opposite; under `reduce`, crossfade only.

---

## 5. keyframes.js boundary (name-forward, inv-16)

Every rail fold above reuses the **already-imported** machinery: the `SpringProgress` LIGHT surface (`useLayerTransition.ts:3,308-333` — `.play()`/`.target =`/`.settled`/`.dispose()`, never the HEAVY `./engine`/`AnimationGroup`/value.js boundary, `:13-17`), the `startViewTransition` substrate (`useViewTransition.ts`), and the build-generated `--spring-*` `linear()` token ladder (`tokens.css:159-163`, mirrored bit-identically to `DOCK_SPRING` per `useLayerTransition.ts:19`). No engine edits; the stretch (AW-rail-3), enter (AW-rail-4), and directional (AW-rail-7) folds are CSS/`@keyframes`/`@starting-style` + the existing VT substrate.

---

## 6. Key source seams (absolute paths, file:line)

- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayerGroup.vue:132-162` (reka Tabs rail), `:133` (`v-if` hard mount), `:135` (`orientation="horizontal"` pin — R4), `:128-131` (horizontal-always rationale), `:100-115` (rail keep-open focus contract)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/DockLayer.vue:29-35` (descriptor register), `:41-42` (is-active/is-leaving), `:71-78` (host `inert`/`aria-hidden` states)
- `/Users/mkbabb/Programming/glass-ui/src/components/custom/dock/composables/useLayerTransition.ts:263-273` (rAF-deferred single-frame-origin swap — the origin the indicator is NOT bound into, R1), `:307-333` (spring drive + settle), `:80-87` (F5 inheritance-bomb guard)
- `/Users/mkbabb/Programming/glass-ui/src/components/ui/tabs/TabsIndicator.vue` (base `ease-spring-snappy` curve — R2), `TabsTrigger.vue` (base tab transition)
- `/Users/mkbabb/Programming/glass-ui/src/styles/dock.css:745-768` (rail layout + four-fold hard divider — R7), `:778-797` (tab hover on `--dock-motion-fast` — R6), `:799-809` (hover-bg vs active-tint double-affordance — R6), `:826-839` (indicator: `translateX`-only, flat backplate, `--dock-motion-resize` override — R2/R4/R5), `:526-549` (layer crossfade lockstep token)
- `/Users/mkbabb/Programming/glass-ui/node_modules/reka-ui/dist/Tabs/TabsIndicator.js:41-52` (reka indicator: `offsetLeft`/`offsetTop` per orientation — the axis-true primitive available for AW-rail-5), `:31-36` (`flush:"post"` update origin — the R1 frame-origin mismatch)
- `/Users/mkbabb/Programming/glass-ui/src/styles/tokens.css:159-163` (`--spring-*`), `:1295-1301` (`--dock-resize-spring` = `--spring-dock`, the snappy-rejected note), `:1310` (`--dock-press-spring`)
- `/Users/mkbabb/Programming/glass-ui/src/styles/view-transition.css:47-62` (`.gl-dock-layer` recipe — the AW-rail-7 directional substrate)
- `/Users/mkbabb/Programming/glass-ui/tests/components/custom/dock/DockLayerRail.a11y.test.ts:1-12` (the rail APG contract gate — must stay green through any rail fold)
- Demo consumer: `/Users/mkbabb/Programming/glass-ui/demo/stories/navigation/dock-layers.vue:85-111` (the `show-rail` switcher section — the runtime gate target)

---

## 7. One-line summary

The rail is structurally correct (reka-Tabs, single source of truth, APG-compliant) but **under-choreographed**: the travelling indicator runs on the right spring (`--spring-dock`) yet on a *different frame origin* than the panes (R1), carries a latent two-curve stack (R2), is a rigid `translateX`-only flat-tint pill with no travel-stretch and no axis-true vertical mode (R3-R5), and the tab hover/divider sit outside the dock's control-motion + glass vocabulary (R6-R7). The headline rail fold is **AW-rail-1** (bind the indicator into the panes' single-frame-origin so size + opacity + indicator settle in lockstep), with **AW-rail-3** (iOS stretch-in-travel) as the biggest felt-polish win and **AW-rail-7** (directional typed-VT, triggered from the tab-index delta) composing with the broad run's AW-W3.

---

## Lane 12

I have all the research needed. Let me write the brief.

# glass-ui dock — animation SOTA research + AW wave-seeds

**Lane:** modern-web-guidance-anim · Research + diagnosis + wave seeds ONLY (no implementation). inv-16: keyframes.js READ-ONLY, name-forward.

## What the dock already does (read of the current source)

The dock is already near-SOTA. The architecture is sophisticated and most of the "obvious" recommendations are already shipped:

- **One-driver-per-concern morph** — `useLayerTransition.ts:89` forks once at construction on `startViewTransition` support. Native VT path owns size+crossfade as one browser mutation; FLIP fallback drives container size off ONE `SpringProgress` clock in pixel space. The two competing CSS-native arms (`interpolate-size`/`calc-size` width and native discrete-visibility) were deliberately **retired** at AV.W9.0/W9.1 because they double-drove the same property and froze the dock (`dock.css:460`, `:562`). This is the correct call — see Diagnosis #1 below.
- **Lockstep fade↔morph** — the user's "shrink-before-fade lag" was already diagnosed (AU.W2) and fixed: the layer opacity rides `--dock-motion-resize` (the SAME spring+duration as the container morph), not the faster `--dock-motion-fast` (`dock.css:516-529`). The class-opacity swap and the width-set are forced into the SAME rAF frame origin so the box never shrinks before items fade (`useLayerTransition.ts:263-273`, gated by `proof:dock-motion-single-source`).
- **Interruptible spring** — AV.W9.2 re-seats an in-flight spring from its live `(value, velocity)` on a retarget instead of dispose+reconstruct-from-rest (`useLayerTransition.ts:234-243`). This IS the iOS interruptible-spring contract.
- **On-demand `will-change`** — promoted ONLY for the morph's duration, cleared to `auto` on settle (`useLayerTransition.ts:166-181`, AV.W7 F3). Correct — no standing compositor layer for an idle dock.
- **Spring tokens** — `--spring-dock` (response 0.5, ζ 0.5, ~+18.5% overshoot) is a `linear()` token (`tokens.css:163`) mirrored bit-identically to the JS `DOCK_SPRING` const and `regen-spring-tokens.mjs`. CSS and JS sample the same analytic ODE.
- **VT/FLIP curve parity** — `::view-transition-group(.gl-dock-layer)` runs `--dock-resize-spring` = the same `--spring-dock` the FLIP path consumes (`view-transition.css:59-62`), so both engines paint the identical curve.

So this is a **refinement + Baseline-uplift** brief, not a rebuild.

## Modern-web-guidance items mapped to dock folds (with Baseline dates)

| Guidance item | Baseline | Dock relevance | Already shipped? |
|---|---|---|---|
| **physics-based-easing** (`linear()`) | Newly available **2023-12-11** (Chrome 113, FF 112, Safari 17.2) | The `--spring-dock` token IS this. Canon. | ✅ fully |
| **individual-transform-properties** (`translate`/`rotate`/`scale`) | Widely available **2022-08-05** | Compositor-only hover/press; independent overlapping anims; mandatory identity-transform base to avoid stacking-context flips on hover | ⚠️ partial — see Seed AW-3 |
| **same-document view transitions** | Newly available **2025-10-14** (now FF 144 + Safari 18) | The dock's native morph path. Was Chrome-only when adopted; now cross-browser Baseline | ✅ adopted; Baseline matured |
| **group-element-transitions** (`view-transition-class`) | Newly available **2025-10-14** | `.gl-dock-layer` recipe; `:only-child` slide-in/out for added/removed controls | ✅ for layers; ⚠️ NOT for individual dock items — see Seed AW-1 |
| **animate-element-entry-exit** (`@starting-style` + `allow-discrete`) | Newly available **2024-08-06** (Chrome 117, FF 129, Safari 17.5) | Per-item entry stagger as controls appear on expand; the dock RETIRED its `@starting-style` arm (`dock.css:562`) because it double-drove opacity — but a per-ITEM (not per-layer) entry is a clean separate concern | ⚠️ retired at layer level — see Seed AW-1 |
| **animate-to-from-top-layer** (`overlay` + `allow-discrete`) | `@starting-style`/`transition-behavior` Baseline 2024-08-06; **`overlay` Chrome-only** (no FF/Safari) | Dock popovers/dropdowns (`HoverPopover`, reka portals) entering top layer. `overlay` keeps them painted through exit | ⚠️ check — see Seed AW-5 |
| **dynamic-sibling-animations** (`sibling-index()`) | Limited — Chrome 138 (Jun 2025), Safari 26.2 (Dec 2025), **no FF** | Pure-CSS stagger delay for dock items on expand, no JS index loop | ❌ — see Seed AW-1 (progressive-enhancement only) |
| **animate-to-intrinsic-sizes** (`interpolate-size`/`calc-size`) | Limited — Chrome 129 only, no FF/Safari | **DELIBERATELY RETIRED** (AV.W9.0). Do NOT re-adopt — it raced the spring driver | ✅ correctly excluded |
| **scroll-entry-exit-effects** (`view()` timeline) | Limited — Chrome 115, Safari 26, **no FF** | `overflow="scroll"` rails: edge controls fade as they enter/leave the scrollport; native scroll-snap feedback | ❌ — see Seed AW-4 |
| **interactions-in-complex-layouts** (`content-visibility: auto` + containment) | `content-visibility` Newly available 2024 | Isolate dock reflow from page; AV.W7 already parks the WebGL rAF on content-hidden but the dock SHELL containment is separate | ⚠️ partial — see Seed AW-6 |
| **size-aware-styling** (`@container`) | Widely available **2023-02-14** | Already used (`dock.css:79` `container: dock / inline-size`). Graceful wrap responds to container, not viewport | ✅ mostly; wrap snap-back still `@media` (`dock.css:919`) — justified |
| **move-dom-element-without-losing-state** (`moveBefore()`) | Limited — Chrome 133, FF 144, **no Safari** | Reparenting a dock control between layers without restarting its CSS anim / losing focus | ❌ niche — see Seed AW-7 |

**New since the dock's VT adoption (cross-ref [view-transitions-in-2025](https://developer.chrome.com/blog/view-transitions-in-2025)):**
- `view-transition-name: match-element` — auto-name per element (Chrome 137, Edge 137, FF 144, Safari 18.4). Removes the hand-minted `dockId`-derived name (`GlassDock.vue:223-230`).
- **Nested view-transition groups** + `view-transition-group: contain` (Chrome 140) — fixes clipping of a morphing layer inside the rounded dock pill during a VT.
- **Element-scoped `element.startViewTransition()`** (Chrome 147; [element-scoped-view-transitions](https://developer.chrome.com/blog/element-scoped-view-transitions)) — scopes the transition to the dock subtree, runs concurrently with other page VTs, keeps the rest of the page interactive, and auto-applies `view-transition-group: contain` + `overflow: clip`. **This is the single biggest future uplift for the dock** — see Seed AW-2.

## Diagnosis (what's actually still rough)

1. **The morph is correct; the LOOK can drift between engines.** FLIP path drives raw `width`/`height` px (a layout-thread property, not compositor) while VT path morphs a snapshot (compositor). On a VT engine the morph is buttery; on the FLIP fallback (Safari < 18, older) the per-frame inline `width` write is layout-bound and can jank under load. This is inherent to animating `width` — the dock can't fully escape it without VT. Mitigation is to keep the FLIP path's footprint minimal (already done) and lean on VT everywhere it exists.

2. **Items fade as a LAYER, not individually.** The whole `.dock-layer` crossfades as one opacity block. There's no per-item stagger/morph — controls appear all-at-once inside the morphing pill. iOS docks stagger item entry subtly. The lockstep fix solved the lag; it did not add per-item choreography. (Seed AW-1.)

3. **Two VT names are hand-minted** (`GlassDock.vue:223`, `DockLayerGroup`) with regex-sanitized `useId()`. `match-element` retires this boilerplate. (Folds into AW-2.)

4. **Rail indicator + layer swap don't share a transition TYPE.** The reka tabs indicator morphs on `--dock-motion-resize` (`dock.css:826`) and the layer crossfades on a VT group — two independent mechanisms that happen to share a curve token. A directional `:active-view-transition-type` would let "switch to layer on the right" slide differently from "switch left" for a consistent spatial language. (Seed AW-2.)

5. **`overflow` property for top-layer dock popovers is Chrome-only.** If dock dropdowns/popovers animate their exit, they may clip prematurely in FF/Safari without `overlay`. Needs verification. (Seed AW-5.)

## ADOPT / wave-seed list (AW dock-animation tranche)

**AW-1 — Per-item lockstep entry choreography (HEADLINE).** Add a per-control entry stagger so items don't all snap in as one opacity block. Two-tier, progressive-enhancement:
- Primary: `view-transition-class` on each dock control + `:only-child` `gl-vt-slide-in` (already have the recipe in `view-transition.css:44`) so a control that appears on expand slides+fades from `translate: 0 var(--vt-rise)`.
- CSS-stagger: `animation-delay: calc(sibling-index() * --dock-stagger)` on the control entry (Chrome 138+/Safari 26.2, `@supports`-gated, no JS index loop), degrading to a flat fade on FF.
- The stagger token rides the SAME `--spring-dock` family; each item settles in lockstep with the container, just phase-offset. Keeps inv "items morph in lockstep with the container."

**AW-2 — Element-scoped VT + `match-element` + transition-types (the convergence fold).** When `element.startViewTransition()` ships Baseline:
- Scope the morph to the dock subtree → auto `view-transition-group: contain` + `overflow: clip` fixes any layer clipping inside the rounded pill, runs concurrently with page VTs, keeps page interactive (today's `::view-transition { pointer-events: none }` global at `view-transition.css:68` becomes unnecessary).
- Replace the hand-minted `dockId` VT names (`GlassDock.vue:223-230`, DockLayerGroup) with `view-transition-name: match-element` (Chrome 137+).
- Add `:active-view-transition-type(forward|backward)` so layer/rail navigation has a DIRECTIONAL spatial language (slide-from-right vs slide-from-left) — one consistent interaction grammar across the rail indicator AND the layer swap.

**AW-3 — Individual-transform compositor pass on hover/press.** Audit dock controls (`DockIconButton`, `DockTabButton`, the rail indicator) to ensure hover/press use `scale`/`translate` individual properties (compositor-only) with a **mandatory identity-transform base** (`translate:0; scale:1`) so a hover-only transform can't flip the stacking context / z-index mid-interaction (the guidance's MANDATORY). Lets the press-spring (`--dock-press-spring`, `tokens.css:1310`) and any hover-float overlap without overwriting each other.

**AW-4 — Native scroll-driven edge feedback for `overflow="scroll"` rails.** For scroll-port docks, replace/augment the mask-fade with `animation-timeline: view(inline)` entry/exit so edge controls fade as they cross the scrollport boundary — compositor-driven, `@supports`-gated (Chrome 115+/Safari 26), no scroll listener. Pure progressive enhancement (decorative → no FF fallback needed per the guidance).

**AW-5 — Top-layer exit-animation audit for dock popovers.** Verify dock-owned popovers/dropdowns (`HoverPopover keep-dock-open`, reka portals) include `overlay` + `transition-behavior: allow-discrete` in their exit transition so they stay painted through fade-out. `overlay` is Chrome-only — confirm the FF/Safari path degrades to instant-hide without clipping, not a broken exit.

**AW-6 — Dock-shell render isolation.** Apply `content-visibility: auto` / explicit `contain: layout style paint` to the dock shell so a control mutation can't trigger a page-wide reflow (the guidance's INP isolation). Composes with — does not replace — the AV.W7 WebGL-rAF offscreen-park (which handles the canvas, not the dock chrome). Verify it doesn't fight the container-query subject already on `.glass-dock` (`dock.css:79`).

**AW-7 (niche, defer) — `moveBefore()` for cross-layer control reparenting.** If a future dock needs to move a live control between `DockLayer`s without restarting its CSS animation or dropping focus, use `moveBefore()` (`'moveBefore' in Element.prototype` feature-gated, falls back to `insertBefore`). No current consumer — substrate-without-consumer per L invariant 8, so seed-only, don't build until a 2nd consumer appears.

**Do-NOT-adopt (record the exclusion):** `interpolate-size`/`calc-size()` for the width morph — already retired at AV.W9.0 because it raced the spring driver and is Chrome-only. The retirement is correct; AW must not re-introduce it.

## inv-16 note

Every seed above is CSS-token / Vue-composable / web-platform work. The `--spring-dock` curve and the JS `DOCK_SPRING` const stay as-is; AW consumes `keyframes.js` `SpringProgress` name-forward (`new SpringProgress({response, dampingFraction, ...}).play()` / `.target` retarget) exactly as `useLayerTransition.ts` already does. No keyframes.js edits.

## Sources
- modern-web-guidance@latest CLI (`list` + `retrieve`): animate-element-entry-exit, animate-to-from-top-layer, animate-to-intrinsic-sizes, individual-transform-properties, physics-based-easing, same-document-transitions, group-element-transitions, dynamic-sibling-animations, scroll-entry-exit-effects, interactions-in-complex-layouts, size-aware-styling, move-dom-element-without-losing-state (Baseline dates quoted inline above)
- [Modern Web Guidance use cases — Chrome for Developers](https://developer.chrome.com/docs/modern-web-guidance/use-cases) (2026)
- [What's new in view transitions (2025 update) — Chrome for Developers](https://developer.chrome.com/blog/view-transitions-in-2025) — match-element (Chrome 137), nested groups + `view-transition-group: contain` (Chrome 140), `document.activeViewTransition`
- [Element-scoped view transitions — Chrome for Developers](https://developer.chrome.com/blog/element-scoped-view-transitions) (Chrome 147)
- [Same-document view transitions now Baseline Newly available — web.dev](https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available) — Baseline 2025-10-14 (FF 144 + Safari 18)
- [Prevent clipping with nested view transition groups — Chrome for Developers](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups)

**Key dock source refs:** `src/components/custom/dock/composables/useLayerTransition.ts` (lines 89, 166-181, 234-243, 263-273, 307-333); `GlassDock.vue` (lines 206-230, 262-288); `useDockState.ts` (state machine); `src/styles/dock.css` (lines 454-573 crossfade contract, 460/562 retired-arm rationale, 826-851 rail indicator, 919 wrap snap-back); `src/styles/view-transition.css` (lines 37-68 `.gl-dock-layer` recipe); `src/styles/tokens.css` (lines 159-163 spring `linear()` tokens, 1301/1310 dock-spring tokens); `scripts/regen-spring-tokens.mjs` (spring source-of-record).

## SYNTHESIS — the dock animation-language path

I have full grounding. The diagnosis across all 12 briefs converges and I've verified the critical anchors. I'll now produce the synthesis.

---

# THE DOCK ANIMATION-LANGUAGE PATH + AW DOCK WAVE SEEDS

Synthesis of 12 cited briefs + verified source. All `file:line` refs at HEAD. inv-16: keyframes.js is READ-ONLY, name-forward — every fold consumes the published `SpringProgress` LIGHT surface (`.play`/`.subscribe`/`.target`/`.settled`/`.value`/`.velocity`), `springTimingFunction`, `springLinearStops`, `stagger`, `flip`/`flipShared`, `ElementMorph` — zero engine edits. Dates: all SOTA fetched 2026-06-06.

---

## PART 1 — THE DOCK ANIMATION-LANGUAGE PATH

### 1.0 What is already SOTA-correct (do NOT re-litigate)

The dock has been remediated three times (AU.W2 lockstep, AU.W8 snappy→dock retune, AV.W9 dual-driver-race + velocity-retarget) and the architecture now encodes most of the iOS contract. Eleven of twelve briefs independently confirm:

- **One-driver-per-concern** — size = JS `SpringProgress` (FLIP) **or** native VT; opacity = CSS crossfade; visibility = delayed-hold fork. The dual-driver `interpolate-size`/`calc-size` race was retired AV.W9.0 (`dock.css:460-475`); the third discrete-visibility opacity authority retired AV.W9.1 (`dock.css:562-573`).
- **Velocity-continuous interrupt** — a re-toggle mid-flight re-seats the live solver's `target` from `(value, velocity)` instead of dispose+reconstruct (`useLayerTransition.ts:234-243`, `:307-317`). This is verified against the keyframes.js binary (`set target` → `reseatTarget`) and IS the iOS interruptible-spring contract.
- **Single-frame origin** — the class-opacity swap and the width-set start in the SAME rAF (`useLayerTransition.ts:263-273`), so the box cannot shrink before items fade on the FLIP path.
- **Bit-identical CSS↔JS curve** — `--spring-dock` `linear()` token (`tokens.css:163`) and `DOCK_SPRING` const (`useLayerTransition.ts:19`) sample the same `(0.5, 0.5)` ODE.
- **On-demand `will-change`** (never standing, `:166-181`), **PRM fast-path** (`:219-228`), **inheritance-bomb guard** (`:80-87`).
- **Press-spring** is no-overshoot `--spring-smooth` on tap surfaces (`dock-controls.css`) — correct per Apple's "100% damping for momentum-free taps" heuristic.

The work is **vocabulary, coverage, and two specific structural seams** — not a rebuild. **Do NOT re-adopt `interpolate-size`/`calc-size`** (Chrome-only, retired for cause).

### 1.1 The iOS-grade motion charter (the consistent language)

The whole control language is **one damped-harmonic-oscillator ODE** with two designer knobs (WWDC18 "Designing Fluid Interfaces", WWDC23 "Animate with springs", 2026-06-06):

```
response       = perceptual reach time     stiffness = (2π/response)²
dampingFraction ζ = overshoot decay        damping   = 4π·ζ/response
overshoot      = exp(−ζπ/√(1−ζ²))          (ζ=0.5 → +16%; ζ=0.45 → +20.5%; ζ=1 → 0%)
```

Five charter rules the dock binds:

1. **Springs over duration.** A spring starts fast and approaches slowly → feels *instant*. A duration-ease ramps up → feels *delayed*. This shape (not bounce) is the "not laggy" lever.
2. **Interruptible/redirectable** — retarget carries live velocity, never restarts from rest. ✅ implemented (size only — see §1.3).
3. **Spatial vs Effects split (Material 3, the strongest model, 2026-06-06).** Spatial springs (size/position) **overshoot** (ζ≈0.9); Effects springs (opacity/color) are **critically damped** (ζ=1.0) because opacity overshoot reads as a flicker/hold-then-pop. The dock currently runs opacity on the *overshoot* `--spring-dock` (`dock.css:527`) — a deliberate lockstep choice that is subtly wrong per M3; the correct form is **co-terminating, separately-damped** curves (same response, ζ_size<1, ζ_opacity=1).
4. **Coverage-scales-speed** — switch-sized moves (rail indicator) = fast spring; partial-screen (layer swap) = default; full-screen = slow.
5. **Bounce on user-initiated only, never ambient** (NN/g iOS-26 over-animation critique, 2026-06-06). PRM kills bounce but never function.

### 1.2 BUG A — simple-collapse width-morph regression (VT snapshot-delta trap)

**Symptom:** AV.W9 "fixed DockLayerGroup but broke GlassDock collapse" — the simple two-layer dock is stuck at collapsed width on a VT-capable engine (every modern browser — the slides deck).

**Root cause (verified, Brief 10):** the VT path (`useLayerTransition.ts:199-211`) wraps ONLY the `leavingLayer`/`currentLayer` mutation, which drives `.layer-active`/`.is-active` on the *panes*. But the width delta between collapsed and expanded comes from **dock-ROOT classes**: `.glass-dock.expanded:not(.fit-content) .dock-layers { width: 100% }` and `.dock-layer--full { width: 100% }` (`dock.css:598-604`), plus collapsed padding (`:366-376`). That `.expanded` root class is applied by **Vue reactivity from `visualExpanded`** (`GlassDock.vue:191`, template `:class`) — on its own flush tick, **outside** the `startViewTransition` callback. So the browser captures two `.dock-layers` snapshots that measure the **same width**, and `::view-transition-group(.gl-dock-layer)` animates a zero-size delta → **no visible morph.**

Why DockLayerGroup works and GlassDock doesn't: the group's size-bearing content lives *inside* `.dock-layer-stack` (the VT-named element), and the active pane's intrinsic `width: max-content` (`dock.css:866-871`) changes as a *direct consequence* of the `.is-active` swap the VT callback DOES perform. The simple GlassDock pair has its width delta one level *up* on the root class, never flipped inside the callback.

**Gate blind spot:** `proof-dock-animation-live.mjs` only checks width-delta on the *force-FLIP* path (it removes `startViewTransition`); on the real VT path it only asserts "≥1 `::view-transition-group` animation runs" — a zero-delta morph passes green. The bug lives in the untested gap.

**Gestalt fix (single-driver):** retire the VT fork for the dock entirely and run the JS FLIP+spring on every engine (Brief 10 AW-W1 option b, the recommendation). The VT path's only advantage (zero rAF) is undercut by both this snapshot-delta trap AND the curve-mismatch lag (§1.3, Bug B 2a). A single JS spring driver gives true lockstep, makes velocity-continuity universal (not minority-path), collapses two code paths to one, and is already the only path the behavioral gate trusts. The alternative (flip a width-bearing state class onto the VT-named `.dock-layers` element *inside* the callback) keeps two paths and the curve-mismatch — rejected.

### 1.3 BUG B — shrink-before-fade lockstep lag (two-clock seam)

**Symptom:** the pill shrinks, then the items fade/shrink a few ms later (the slides-F P0 "not iOS-smooth").

**Root cause — TWO integrators that only share a curve NAME, not a clock** (Briefs 1, 2, 3, 5, 8, 9, 10 converge):

- **2a (VT path):** `::view-transition-group(.gl-dock-layer)` runs the spring `linear()` for *size*, but the old/new image pair cross-fades on the browser's **UA-default ease**, not the spring. Duration-matched, curve-mismatched → content fades on a different clock than the box morphs.
- **2b (FLIP path):** size is driven by `SpringProgress` (its own natural settle from `response 0.5, ζ 0.5` — ~0.7-0.9s) while opacity rides CSS `transition: opacity var(--dock-motion-resize)` = `var(--duration-normal)` (a *fixed* 0.3s) `var(--spring-dock)` (`dock.css:526-528`, `:26`). The AU.W2 comment's "settle in lockstep by the shared (0.5,0.5) curve" is **false**: the CSS side is clamped to 0.3s, the JS side runs the spring's natural settle. **Same curve name, different settle time** — opacity finishes at 300ms while the box keeps springing. And on a retarget, the JS spring re-seats from live velocity while the CSS opacity transition restarts from 0 — only one carries velocity, so they drift on interruption.

**Gestalt fix (single-driver, parent+children one timeline):** drive size AND opacity from the SAME `SpringProgress` instance. The spring already exposes `.subscribe(cb)` to fan ONE clock to N consumers (verified `keyframes.d.ts`/`spring.ts:428`). Map the spring's normalized progress `t∈[0,1]` → width (pixel space, already done) AND → opacity, written in the same `.play()` frame callback. Remove the CSS `transition: opacity var(--dock-motion-resize)` (`dock.css:526-529`) so opacity is no longer a second clock. One solver, one rAF, one fan-out → size and opacity are frame-identical through start, retarget, and settle, by construction. This is the fix AU-keyframes-coordination.md §2.3 *specced* ("map the one `value∈[0,1]` to BOTH width-px and opacity in the SAME callback") but only the size half shipped — the opacity half is still CSS.

This **combines with Bug A's fix**: once the dock runs the JS spring on every engine (no VT fork), the single-clock lockstep is universal and velocity-continuity is the spine, not a fallback branch.

### 1.4 The motion-language token layer (the M3 spatial/effects adoption)

The dock springs are named by **physics** (`smooth/snappy/bouncy/gentle/dock`), not by **role**. A component author must *know* opacity wants critical damping — there's no token encoding intent. Add a semantic layer ON TOP of the existing physical springs (CSS aliases + regen-script presets; keyframes.js untouched):

| Role token | ζ | Maps to | Consumed by |
|---|---|---|---|
| `--motion-spatial-fast` | overshoot, ~0.5-0.7 | small position/size | rail indicator |
| `--motion-spatial-default` | overshoot ζ=0.5 (= today's `--spring-dock`) | partial morph | dock size, layer swap |
| `--motion-effect-default` | critical ζ=1.0 (= `--spring-gentle` family) | opacity/color | layer fade |

The dock's `--spring-dock` becomes (or aliases) `--motion-spatial-default`. Opacity moves off the overshoot curve onto `--motion-effect-default` — **same response, ζ=1.0 → same settle time, no opacity overshoot**, still co-terminating with size (lockstep preserved, correctness fixed). This is the single highest-leverage fold for library-wide coherence (Brief 8 headline). The retune touches BOTH the regen `PRESETS` row (`regen-spring-tokens.mjs:30-61`) AND any JS const, per the bit-identical contract — never one without the other.

### 1.5 Layering + rail + wrap refinements

**Rail (DockLayerGroup reka-Tabs, Brief 11):** structurally correct (single `activeLayer` source of truth, APG keyboard contract gated by `proof:dock-a11y-contract` — must stay green) but under-choreographed:
- The travelling `TabsIndicator` rides the right spring (`--dock-motion-resize`, `dock.css:835-837`) but on a **different frame origin** than the panes (reka's `flush:"post"` + ResizeObserver vs the dock's rAF-deferred swap) → starts a frame or two off. Bind it into the panes' single-frame-origin so size + opacity + indicator settle as ONE motion.
- Latent **two-curve stack**: base `TabsIndicator.vue` hardcodes `ease-spring-snappy` (the rejected mechanical ζ=0.65), the dock overrides with `--spring-dock`. Make the base curve a token the dock retunes, not a base+override stack.
- Indicator is a rigid `translateX`-only flat `primary 15%` tint — no iOS stretch-in-travel (the pill elongating source→target then settling), no axis-true vertical mode (vertical docks force the rail to a horizontal strip via `flex-direction: row`, `dock.css:754-758`), no glass-tier depth.
- Rail `v-if` (`DockLayerGroup.vue:133`) pops in/out with no enter/leave motion.

**Wrap (the one un-sprung dock transition, Briefs 7, 8 converge):** `overflow="wrap"` just toggles `flex-wrap: wrap` + `height: auto` + radius `pill→2xl` + hides separators (`dock.css:676-706`), snap-back at a `@media` bp (`:919-948`). No FLIP, no spring, no stagger — items teleport to new rows, separators hard-cut, radius jumps. The fix: capture pre/post height (ResizeObserver on `.dock-layer--full`), drive the cross-axis height on the SAME `DOCK_SPRING` the width morph uses (the driver is already axis-aware via `dim`), and per-item FLIP across rows (`flip`/`flipShared` with `springTimingFunction(DOCK_SPRING)`, pin `position:absolute` for the morph duration only so the reflow can't thrash). PRM snaps (correct). **Do NOT use `grid-auto-flow: dense`** — it breaks tab/SR order (WCAG); a dock toolbar has meaningful order.

**Depth-on-growth (Apple Liquid Glass, Brief 6):** thicker glass casts deeper shadows as it grows — bind `--shadow-dock` depth + surface blur to expansion state via a discrete class swap (NOT a per-frame inherited-prop tween — inheritance-bomb guard).

### 1.6 keyframes.js consumption (name-forward, what glass-ui adopts)

All from the published LIGHT (value.js-free) surface — `proof:boundary` enforced. NEVER `AnimationGroup`/`loadAnimationEngine`/`Animation`/`CSSKeyframesAnimation`/`.fromString` (HEAVY, pull value.js).

| Symbol | Fold | What it gives |
|---|---|---|
| `SpringProgress` (in use) | size+opacity single clock | `.subscribe(cb)` fans ONE clock to N consumers; `.target=` re-seats from `(value, velocity)`; `.fromDuration({visualDuration, bounce})` = the legible designer surface |
| `springTimingFunction` | unify curve source | one call → `{ fn, css }` from ONE sampling: `.css` feeds the token, `.fn` feeds `ElementMorph`/stagger — drift-impossible (retires the hand-synced const↔PRESETS pair) |
| `stagger` | per-item entry | construction-time per-index delays, `from: "first"|"center"|"edges"`, value.js:0 — the cheapest highest-ROI polish |
| `flip` / `flipShared` | graceful wrap, rail reflow, shared-element | FLIP over `ElementMorph`, batched rect reads, springy via `springTimingFunction` |

**Cross-repo seam:** keyframes D.W5 is the booked 2nd consumer that adopts the published `<Role>Dock` vocabulary name-forward once glass-ui 3.3.0+ lands on npm — sanctioned coordinated drive, zero keyframes source change required.

---

## PART 2 — THE AW DOCK WAVE SEEDS

Eight concrete waves. Each: scope · technique · the behavioral gate that PROVES lockstep + width-morph at runtime. Ordered by leverage.

**AW.W1 — Single-driver on every engine (HEADLINE; fixes BUG A + makes velocity-continuity universal).**
- *Scope:* retire the VT fork in `useLayerTransition` (`:199-211`); run the JS FLIP+spring path on all engines.
- *Technique:* delete the `NATIVE_VT` branch; the FLIP path (already the only gate-trusted, velocity-continuous, single-frame-origin driver) becomes the spine. Drop the `view-transition-name` minting in `GlassDock.vue:223-230` + DockLayerGroup, and the `morphGeneration`/`isTransitioning` timer machinery (`GlassDock.vue:264-288`) collapses since a single spring marks its own settle.
- *Gate (`proof:dock-collapse-width-delta`, runtime Playwright):* on the **real default engine** (VT not stripped), trigger a simple GlassDock collapse↔expand; assert a **nonzero width delta** across frames (>1 frame of intermediate widths between collapsed and expanded). This is the assertion that would have caught Bug A.

**AW.W2 — Single-clock size+opacity lockstep (fixes BUG B; parent+children one timeline).**
- *Scope:* drive container size AND pane opacity from the same `SpringProgress`.
- *Technique:* in the `.play()` callback, write width (`setDim`) AND `opacity = clamp(progress)` where progress is the spring's normalized `(value−from)/(to−from)`. Remove `transition: opacity var(--dock-motion-resize)` (`dock.css:526-529`) for the JS-driven path (keep as the PRM/no-JS fallback). Opacity uses `--motion-effect-default` (ζ=1.0) co-terminating with size's `--motion-spatial-default` — same response, no opacity overshoot.
- *Gate (extend `proof:dock-motion-single-source`):* assert the opacity-stop frame and the width-stop frame are the SAME rAF tick (not ±1); assert mid-morph opacity tracks the spring progress, not a fixed 300ms ramp.

**AW.W3 — Motion-role token layer (the M3 spatial/effects adoption; library-wide coherence).**
- *Scope:* add `--motion-spatial-{fast,default,slow}` (overshoot) + `--motion-effect-{fast,default,slow}` (critical ζ=1.0) over the existing `--spring-*`.
- *Technique:* extend `regen-spring-tokens.mjs` PRESETS with the role rows; alias `--dock-resize-spring → --motion-spatial-default`. Publish `docs/precepts/motion-language.md` (spatial/effects split, interruptible-spring house rule, coverage∝speed, PRM-first, tap=no-overshoot/momentum=bounce).
- *Gate (`proof:motion-role-vocabulary`, static):* forbid raw overshoot tokens (`--spring-bouncy`/`--spring-dock`) on `opacity`/`color`/`background` transition properties library-wide.

**AW.W4 — Rail indicator into single-frame-origin + one curve authority (fixes Brief 11 R1+R2).**
- *Scope:* the travelling `TabsIndicator` shares the layer-swap's frame origin and curve source.
- *Technique:* bind the indicator position update into the same rAF as the class swap (`useLayerTransition.ts:263-273`); make `TabsIndicator.vue`'s base curve a token (`--tabs-indicator-ease`, default `--spring-snappy`) the dock retunes to `--motion-spatial-fast` (coverage-scaled — the indicator is switch-sized) via one assignment, not a full transition re-declaration.
- *Gate (`proof:dock-lockstep-rail`, runtime):* trigger a 1→3 rail swap; sample `.dock-layers` width settle-time AND `.dock-layer-tab-indicator` transform settle-time; assert `|Δsettle| < ~16ms`. Static: no dock rail element carries two easing declarations for one property.

**AW.W5 — Graceful wrap morph (fixes the one un-sprung transition).**
- *Scope:* `overflow="wrap"` row reflow morphs instead of snapping.
- *Technique:* ResizeObserver on `.dock-layer--full` detects wrap-count change; capture pre/post height; drive height on the SAME `DOCK_SPRING` via the axis-aware `dim` machinery (extend to cross-axis). Per-item FLIP across rows via `flip` with `springTimingFunction(DOCK_SPRING)`, `position:absolute` pin for the morph duration only. Fade separators (opacity, not `display:none`) and morph radius `pill↔2xl` in lockstep. PRM snaps.
- *Gate (`proof:dock-wrap-morph`, runtime):* trigger a 1-row→2-row wrap; assert the box height animates over ≥N frames AND items translate to new-row positions (nonzero transform delta), not a single-frame jump; under PRM, instant.

**AW.W6 — Per-item stagger entrance (iOS cascade polish).**
- *Scope:* items cascade in on expand instead of one opacity block.
- *Technique:* `stagger(items.length, { each: ~24ms, from: "first" })` → per-item `--d` custom prop (reuse the existing `vReveal`/`[data-reveal]`/`useStaggerReveal` substrate in `composables/motion/`). The cascade rides the spring progress (phase-offset), total stagger ≤ container morph duration so it never re-introduces lag. Stagger `ease` reshaped by `springTimingFunction(DOCK_SPRING).fn`.
- *Gate (extend `proof:dock-motion-single-source`):* assert the last item's reveal completes within the container morph window (stagger stays inside lockstep).

**AW.W7 — Curve unification + designer surface (drift-proofing).**
- *Scope:* one curve source object instead of the hand-synced `DOCK_SPRING` const ↔ `PRESETS` row.
- *Technique:* `springTimingFunction({ response: 0.5, dampingFraction: 0.5 })` yields `{ fn, css }` from one sampling — `.css` feeds `--spring-dock`, `.fn` feeds any morph/stagger path. Adopt `SpringProgress.fromDuration({ visualDuration, bounce })` as the dock's tuning surface (`bounce ∈ [−1,1]` is more legible than ζ). Validate overshoot stays in the felt-iOS 15-20% band.
- *Gate:* the existing motion gate; assert the emitted token and the runtime driver derive from one call.

**AW.W8 — Directional intent + depth-on-growth (composes with W1's single driver).**
- *Scope:* layer/rail navigation has a spatial direction; the dock deepens as it grows.
- *Technique:* compute the rail tab-index delta in DockLayerGroup; the revealed pane slides in the travel direction (a directional class driving the FLIP `from` offset — since W1 retired VT, this is pure FLIP-side, not typed-VT). Bind `--shadow-dock` depth + surface blur to the `.expanded` state via discrete class swap (NOT per-frame inherited-prop tween — F5 guard). Press/hover controls use `scale`/`translate` individual transforms with a mandatory identity base.
- *Gate (`proof:dock-directional`, runtime):* rail 1→3 slides one way, 3→1 the opposite; under PRM, crossfade only. Static: depth tokens swap on class, never tween.

**Sequencing:** W1+W2 are the bug-fix headline (single driver + single clock = both bugs closed). W3 is the coherence foundation. W4+W6 are the felt-polish layer (rail + stagger). W5 closes graceful wrap. W7 drift-proofs. W8 is the spatial-language tail.

---

## PART 3 — DOCK README OUTLINE

`docs/.../DOCK-MOTION.md` (or the dock package README motion section):

1. **Motion charter** — the one-ODE model (response + ζ), springs-over-duration, the five rules (interruptible, spatial/effects split, coverage∝speed, bounce-on-user-initiated, PRM-first). Cite WWDC18/23 + M3 with dates.
2. **The single-driver architecture** — one `SpringProgress` clock owns size AND opacity (post-AW.W1/W2); the FLIP+spring path runs on every engine; no VT fork. Why (Bug A snapshot-delta trap + Bug B two-clock lag — the gestalt fix).
3. **The motion-role token layer** — `--motion-spatial-*` (overshoot) vs `--motion-effect-*` (critical); the dock's `--spring-dock` = `--motion-spatial-default`; how a consumer retunes the whole feel via one token; the bit-identical const↔PRESETS contract (retune touches both).
4. **Choreography rules** — single-frame origin (size + opacity + rail indicator settle as one); per-item stagger ≤ morph window; velocity-continuity on interrupt; graceful wrap (cross-axis spring + per-item FLIP).
5. **keyframes.js boundary** — LIGHT surface only (`SpringProgress`/`springTimingFunction`/`stagger`/`flip`); the HEAVY forbidden list; name-forward.
6. **Reduced-motion** — the single PRM gate (synchronous swap, no driver, no overshoot, function preserved).
7. **The proof gates** — `proof:dock-collapse-width-delta`, `proof:dock-motion-single-source`, `proof:dock-lockstep-rail`, `proof:dock-wrap-morph`, `proof:motion-role-vocabulary`, `proof:dock-a11y-contract` (must stay green).
8. **Consumer recipes** — orientation, multi-layer, rail, wrap; the `keepDockOpen` slider contract.

---

## HEADLINE + LOCKSTEP/REGRESSION FIX SUMMARY

**The dock's architecture already encodes most of the iOS contract — single-origin swap, velocity-retargeted size spring, one-driver-per-concern. The two remaining defects share one root: SIZE and OPACITY (and the rail indicator) are driven by DIFFERENT clocks that only share a curve NAME.** The gestalt fix is to collapse onto ONE `SpringProgress` instance running the JS FLIP+spring on EVERY engine, with parent size + child opacity + rail indicator + (W5) wrap height all read off that single clock's normalized progress in one rAF callback — lockstep by construction, velocity-continuous through interruption.

- **BUG A (simple-collapse stuck at collapsed width):** the VT path wraps only the pane-class mutation, but the width delta lives on the `.glass-dock.expanded` ROOT class Vue applies *outside* the VT snapshot boundary — so the browser morphs a zero-size delta and nothing moves. The gate only checks width-delta on the force-FLIP path, so it passed green. **Fix: AW.W1 — retire the VT fork, run the JS spring everywhere; gate the nonzero width-delta on the real default engine.**

- **BUG B (shrink-before-fade lag):** size runs the JS spring's natural ~0.8s settle while opacity runs a CSS transition CLAMPED to a fixed 0.3s `--duration-normal` — the AU.W2 "lockstep by the shared (0.5,0.5) curve" comment is false (same curve name, different settle time), and on a retarget only the size carries velocity. **Fix: AW.W2 — drive opacity from the same spring's progress in the same callback; opacity on a critically-damped effects curve, co-terminating with size; gate same-rAF settle.**

Both fixes are one move: **one driver, one clock, parent + children one timeline.** keyframes.js stays read-only — `SpringProgress.subscribe`/`.play`/`.target` + `springTimingFunction`/`stagger`/`flip` carry every fold, name-forward.

Source anchors: `useLayerTransition.ts:19,199-211,234-243,263-333`; `GlassDock.vue:191,202-230,264-288`; `dock.css:454-475,516-604,669-706,835-837`; `tokens.css:163,1290-1310`; `regen-spring-tokens.mjs:30-61`.
