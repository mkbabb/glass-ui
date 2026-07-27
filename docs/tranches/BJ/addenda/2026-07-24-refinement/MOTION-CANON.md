# THE MOTION CANON

**modelId: `claude-opus-5[1m]`**

Authored against five frame-by-frame exemplar analyses (`scratchpad/exemplars.json`) and read directly off `springPresets.ts`, `scheme-spring.css`, `motion-registers.css`, `glass/reveal.css`, `glass/ladder.css`, `transitions.css`, `utilities/base.css`, `dialog/placement.css`, `engage/engageEnvelopes.ts` at HEAD.

---

## 0. THE ARITHMETIC THAT GOVERNS EVERYTHING BELOW

Two identities decide every ruling in §1, and both are validated against the shipped generator output, so they are load-bearing rather than decorative.

**Peak height.** A second-order spring's first overshoot is `M = exp(-ζπ/√(1-ζ²))`.

| ζ | 0.60 | 0.71 | 0.74 | 0.78 | 0.80 | 0.82 | 0.86 | 0.88 | 0.90 | 1.00 |
|---|---|---|---|---|---|---|---|---|---|---|
| M | 9.5% | 4.2% | 3.2% | 2.0% | 1.5% | 1.1% | 0.50% | 0.30% | 0.15% | 0% |

**Settle horizon.** `scheme-spring.css` normalises every emitted `linear()` over the row's own numeric settle — the last time `|1-x|` exits the ±2% band. Residual is `r(t) = A·e^(-ζωₙt)·|sin(ω_d t + φ)|`, `A = 1/√(1-ζ²)`, `φ = atan(√(1-ζ²)/ζ)`. Validated against disk: `dock (0.35, 0.82)` → 0.219s (file says 0.22s ✓), `gentle (0.82, 1.00)` → 0.761s (file says 0.76s ✓), `orb-drop (0.22, 1.00)` → 0.204s (file says 0.2s ✓).

### LAW 0 — THE OVERSHOOT-VISIBILITY LAW

> A row's peak appears in its shipped curve **iff `M > B`**, where `B` is the settle band the curve is normalised over. At `B = 2%` that is **ζ < 0.78**. At `B = 0.5%` it is **ζ < 0.86**.
>
> And the peak's placement in the clock is `t_peak/t_settle = πζ / (ln(1/B)·√(1-ζ²))`. At `B = 2%`: ζ=0.60 → 60% of clock, ζ=0.70 → 79%, ζ=0.75 → 90%.
>
> **There is no "tiny rebound" region.** A spring either bounces visibly (ζ ≤ 0.62, ≥8.7% overshoot) or lands dead (ζ ≥ 0.78). Between them lies a curve whose peak arrives in the last 10-20% of its clock — a late tick, the worst read of the three. The four monotone rows are not a tuning bug. They are the table honestly refusing to ship a curve that cannot exist.

### LAW 0b — THE AMPLITUDE-BAND LAW *(this is the correction the exemplars actually force)*

The 2% band is calibrated for a press: 2% of a 0.04 scale delta is 0.0008, invisible. It is wrong for a 425px stroke, where 2% is 8.5px — plainly visible. The Siri results expansion measured **475ms visual settle** against a 302ms 2%-band settle; the eye read settle at ≈0.5%.

> **The settle band is a property of the job's amplitude, not a constant.** Small-amplitude rows (a press, a plate materialising) generate over `B = 2%`. Large-amplitude rows (a room-sized bloom, a long stroke, the world receding) generate over `B = 0.5%`.

Implementation: add `settleBand: 0.02 | 0.005` to `SpringPresetRow`; `regen-spring-tokens.mjs` feeds it to both the `linear()` `maxDuration` and the `-settle` token, so curve/clock parity survives untouched. Validation of the change: `panel (0.40, 0.71)` at `B = 0.5%` predicts **0.447s** against a measured 475ms; `bloom (0.42, 0.90)` predicts **0.37s** against a measured 350-400ms. Both land inside the frame-derived brackets that the 2% band was missing by ~35%.

---

## 1. THE CORRECTED SPRING TABLE

**Eight rows become six.** Every surviving row owns exactly one job; no job is owned twice; no row ships without a rider (two currently do).

| row | response | ζ | band | predicted settle | predicted peak | THE ONE JOB |
|---|---|---|---|---|---|---|
| `press` | 0.20 | 0.80 | 2% | 0.12s | monotone | **The touch answer** — hover glide, tap squish, release, end-stop return |
| `transient` | 0.22 | 1.00 | 2% | 0.20s | monotone | **The anchored materialization** — every overlay/menu/plate/orb birth |
| `dock` | 0.30 | 0.88 | 2% | 0.21s | monotone | **The coordinated travel** — member FLIP, selection lens, indicator glide |
| `panel` | 0.40 | 0.71 | 0.5% | 0.45s | **+4.2% at t=0.238s (53% of clock)** | **The fired deploy** — the long axis of an anisotropic stroke, the extent morph |
| `bloom` | 0.42 | 0.90 | 0.5% | 0.37s | monotone | **The room-sized growth** — a surface expanding to fill a sheet or a screen |
| `world` | 0.48 | 1.00 | 0.5% | 0.57s | monotone | **The world's recession** — under-layer travel on recede/recover, scroll choreography |

**Exactly one row in the table rebounds, and it is the fired deploy.** That is the parsimony answer and it is what the corpus measures: across five exemplars and roughly 40 quantified channels, the maximum observed positional overshoot is **4.7%**, and it occurs on a clip edge.

### Per-row rulings

**`press` (0.20, 0.80) — UNCHANGED PAIR, REGISTER TEXT STRUCK.**
This is the one row whose text lies. `springPresets.ts:120` says "a subtle rebound"; the header block at `:51-52` says "a tiny alive rebound". At ζ=0.80 the peak is 1.5%, below the 2% horizon, so it is not in the emitted `linear()` and never will be. Retuning to ζ=0.75 buys a 2.8% peak that lands at 90% of a 0.16s clock — a tick at the end of a press, which is worse than no tick. **Fix = delete the claim, not the damping.** Corroborated twice: Music press swell ζ≈0.8 "sub-frame rebound at 10fps"; ChatGPT end-stop release ζ≈1.0 "no visible bounce". A press's liveliness lives in the volume-preserving squish and in `press-drain` (55/120ms, already shipped in `engageEnvelopes.ts`), not in positional overshoot.
Corrected comment: *"A responsive press — a sub-200ms answer that lands dead. The rebound is the squish, and the light is the acknowledgement."*
Second defect, same family: `utilities/base.css:~185` asserts "At ζ=0.86 `--spring-smooth` settles a press crisply with a sub-perceptual (~0.5%) peak." `smooth` is ζ=0.80 on disk. Stale figure in a consumer comment; delete with the row.

**`transient` (0.22, 1.00) — RENAMED from `orb-drop`, absorbs the entrance job.**
`orb-drop` had **zero consumers** — no `--spring-orb-drop` reference anywhere in `src/`, no `springPreset("orb-drop")` call. Its name described one demo. Its curve describes a universal job, measured independently twice: Siri island→orb 250ms, deltas 34/26/6/8/4/2/2/1 px, overshoot ≤0.5%; Photos long-press lift 150ms to 99%, peak velocity at +17ms, return overshoot ≤0.6%. Both are the same shape — front-loaded attack, long monotone decay, dead landing. Two measurements at (≈0.22, ζ≈0.9-1.0) is the strongest agreement in the corpus.
Riders it inherits: `enter-overlay`, `enter-menu`, Toast, the `.glass-reveal` base, the engaged-capsule promotion, the invocation orb. Clean-break rename per the no-legacy edict.

**`dock` (0.35 → **0.30**, 0.82 → **0.88**) — RETUNED, absorbs `snappy`'s control job.**
Three independent measurements bracket it: fusion 250-350ms at (0.30-0.35, ζ0.85-1.0); eyeglass lens 150-250ms at (≈0.30, ζ≈0.85); pulldown pill 300-400ms at (≈0.35, ζ0.9-1.0). The shipped ζ0.82 sits below every bracket. New pair: response at the measurement centre, damping inside all three. Net clock change is nil (0.22s → 0.21s) — the attack gets faster and the landing gets deader for the same money.
Note for anyone about to trust a remembered literal: `DOCK_SPRING` at `src/components/dock/constants.ts:11-13` derives from `springPreset("dock")`, and disk at HEAD reads **0.35 / 0.82**, not the 0.30 some notes carry.

**`panel` (0.40, 0.71) — PAIR UNCHANGED, BAND CHANGED to 0.5%, absorbs `bouncy`'s riders.**
The only row whose overshoot is intrinsic and measured: Siri results expansion, 425px travel, 20px overshoot = 4.7%, t_peak 238ms → ζ=0.70, response 0.34. The shipped pair reproduces it. The band change moves the emitted clock from 0.38s to 0.45s against the measured 475ms, and moves the peak from 63% to 53% of the clock — a mid-clock rebound, which is what the frames show. Also had **zero CSS consumers** at HEAD; it gets `bouncy`'s.

**`bloom` (0.42, 0.90, band 0.5%) — NEW.**
The one genuinely empty cell in (response, ζ) space: long response *and* high damping. Measured on the Music sheet: ~350-400ms rise, top-edge deltas 315/600/200/80 px per 100ms, peak velocity in interval 2, no visible overshoot at 10fps (so ζ ≥ ~0.85). Nothing existing covers it — `panel` at ζ0.71 puts 4.2% on a 900px surface (38px of wobble on a room-sized plate, exactly the read Fable flagged), `dock` at 0.21s settles a full-screen growth in a third of the measured time, `bouncy` was never in the conversation. Predicted settle 0.37s lands inside the measured 350-400ms.

**`world` (0.82 → **0.48**, ζ 1.00, band 0.5%) — RENAMED from `gentle`, retuned.**
`gentle` named a tone; the row needs a job a gate can check. Its five existing riders are all `scroll-choreography.css` / `useScrollScene.ts` — substrate motion, which is the same class as the exemplar's backdrop recede (translateY ~160px + blur + dim over ~500-600ms, front-loaded, settling 200-300ms after the foreground). Response 0.48 at ζ=1.0 predicts 0.568s, inside the measured band; the shipped 0.82 predicted 0.761s, outside it. ζ stays **exactly 1.0** — the existing fence holds and now has a reason: a world that overshoots reads as an earthquake.

### Deletions and merges

| deleted | refs at HEAD | why | where its riders go |
|---|---|---|---|
| `smooth` (0.58, 0.80) | 30 | Its job *is* `press`'s job at a longer clock — and the base recipes already replay its curve on `--duration-fast` (0.2s), i.e. on press's clock. Its other job (patient entrance) is `transient`'s, measured. Two jobs, both owned elsewhere. | `--transition-liquid-spatial` → `var(--spring-press)`; entrances → `transient`; scroll legs → `world` |
| `snappy` (0.48, 0.74) | 74 | The slowest row in the table calls itself "quick". Its stated job (tab underline glide, progress fill, marker pop) is measured at 150-250ms — that is `dock`'s 0.21s, not snappy's 0.44s. Its other job (`enter-overlay`) is measured dead-critical at 150-250ms — that is `transient`. | travel/indicator → `dock`; entrances → `transient`; `useElementMorph`/`useDragMorph` default → `dock` |
| `bouncy` (0.60, 0.60, +9.5%) | 17 | 9.5% is above the **entire measured corpus**, whose ceiling is 4.7% on a clip edge. And the exemplars are explicit about where celebration goes: Siri's confirmation is a 150ms sustained *light* bloom then a one-frame cut — *"the liveliness budget is spent on the LIGHT that follows, never on a geometry bounce."* Bounce theatre is the motion twin of the owner's "far too trite, shiny, and bright." | `completion-seal` geometry → `panel` (4.2%, the measured ceiling); its ceremony → the light channel (`engageEnvelopes`); `view-transition`/`liquid-enter` → `transient` |

### Consequent edits, exhaustively

1. `springPresets.ts` — `SpringPresetName` becomes `"press" | "transient" | "dock" | "panel" | "bloom" | "world"`; add `readonly settleBand: 0.02 | 0.005`.
2. `scripts/regen-spring-tokens.mjs` — feed `settleBand` to both the `springLinearStops` horizon and the `-settle` token. Regenerate `scheme-spring.css`; the register prose regenerates from `comment`, so no figure is hand-written.
3. Generate the exit reader alongside each duration (see §7): `--spring-<n>-exit-duration: calc(var(--spring-<n>-settle) * 0.6 * var(--motion-tempo))`.
4. `motion-registers.css` — `--enter-overlay-spring` and `--enter-menu-spring` both → `var(--spring-transient)`; clocks → `var(--spring-transient-duration)`. Three registers, **one spring**, differing only in scale-from/blur/slide. `enter-tooltip` keeps `--ease-out-expo`: a tooltip is an annotation, not a body — it has no mass, so it takes a bezier. Say that in the table.
5. `motion-registers.css` — `--enter-overlay-scale: 0.94` → **0.85**, `--enter-menu-scale: 0.96` → **0.85** (see §9 item 2 for why not the measured 0.75-0.80).
6. `utilities/base.css` — `.interactive-item` / `.tap-squish` scale legs: `scale var(--duration-fast) var(--transition-liquid-spatial)` → `scale var(--spring-press-duration) var(--transition-liquid-spatial)`, restoring the CSS_t90 == JS_t90 parity the file's own doc-block claims and the `--duration-fast` clock quietly breaks.
7. `useElementMorph.ts:18` — `ElementMorphPreset = Extract<SpringPresetName, "dock" | "panel">`.
8. `tokens/glass.css:237` — `--glass-halo-blur: 20px` → `var(--glass-blur-floating-radius)` (11px). 20px violates the ≤15px budget band declared eleven lines above it.

---

## 2. THE LEAD/LAG LAW

Measured lags, all five exemplars, all reducible to a 16.67ms quantum:

| event | lead/lag |
|---|---|
| Photos: lift t0 / scrim +33ms / plate +50ms | 0, +2, +3 frames |
| Music fusion: page crossfade −100ms / members t0 / labels +100ms | −6, 0, +6 |
| Music bloom: press swell −100ms / surface t0 / dim t0 / interiors by 60% of flight | −6, 0, 0 |
| Siri invocation: island ink −50ms / geometry t0 / privacy dot +150ms / light +350ms | −3, 0, +9, +21 |
| Siri pulldown: shape t0 / text+mic +150-200ms / scrim ramps to +500ms | 0, +9-12, world-clock |
| ChatGPT slider: label leads / track t0 / veil +100ms | −, 0, +6 |
| Album push: window t0 / nav chrome +100ms | 0, +6 |
| Gemini drawer: old content out **before** boundary / new content **during** / icons before labels 100ms | −n, 0, +6 |

### THE LAW

> **Every element in a compound transition declares a RANK. Its `transition-delay` is `rank × --motion-beat`, where `--motion-beat: 16.67ms` (scaled by `--motion-tempo` like everything else). Rank is a property of ROLE, never of DOM depth.**

| rank | role | delay | who |
|---|---|---|---|
| **−1** | **ink-out** | −16.67ms | departing content. It leaves *before* any boundary moves. Non-negotiable: Gemini OBS-4 shows the old rows gone a full frame before the container's edge budges. |
| **0** | **the touched body** | 0 | the pressed element, the shared element, the dock member rects, the gesture's subject. The finger gets the first frame. |
| **+2** | **the world** | 33ms | scrim onset, dim, recede. Starts early, on the `world` clock, so it *finishes last*. |
| **+3** | **the presented plate** | 50ms | popover, menu, sheet, dialog content, engaged capsule. On the `transient` clock. |
| **+6** | **annotation** | 100ms | labels, captions, icon-vs-label, chrome swaps, tint handoffs, the focus veil's opacity. |
| **+9…+21** | **light** | 150-350ms | glow, aurora, rim flare, ignition. Not a delay — an envelope (`engageEnvelopes`), and it belongs to §4's rest floor. |

**Onset order is not settle order, and that is the point.** Onset is *causal*: finger → world → plate → labels → light. Settle is *legibility-ordered*: the plate lands crisp first (0.20s), then annotation, then the world (0.57s) keeps drifting underneath it. Photos O4 makes the same point on the other axis — the foreground swaps to full resolution one frame before total rest, so **sharpness itself is the settled signal**.

Three corollaries, each gate-checkable:

- **No stagger inside a plate.** Photos O3 is explicit: the menu carries all rows as one unit, zero per-row stagger, *"stagger between container and contents would read as assembly, not arrival."* **`useStagger` is forbidden inside a `.glass-reveal` subtree.** Assert it.
- **Opacity resolves faster than geometry.** Photos: opacity ~55% by the plate's second frame, ~100% by 60% of the scale flight. Our `.glass-reveal` runs opacity and scale on one `--reveal-clock` (`reveal.css:79-81`). Fix: opacity leg gets `calc(var(--reveal-clock) * 0.6)`. The object is *real* while still in flight — that is the effervescent read.
- **Exit reverses the onset ranks.** See §7.

---

## 3. THE MATERIAL SPLIT LAW

The exemplar is strict, and it is stricter than one sentence. There are **three** world treatments, mutually exclusive, exactly one per transition:

> **(a) CONTENT IS NEVER FROSTED.** A surface presenting the thing itself — a photo, artwork, a preview, a transcript, a value readout — carries no `backdrop-filter`. Solidity signals "the thing itself."
>
> **(b) CHROME IS NEVER SOLID.** A surface presenting affordances *over* content is always translucent and frosted. Frost signals "interactive surface floating over context."
>
> **(c) ALL FROST IS PLATE-LOCAL.** `backdrop-filter` belongs to the plate that was presented. Never to a full-viewport layer, with exactly one carve (the focus veil, §5), which is graded and control-anchored.
>
> **(d) THE WORLD GETS EXACTLY ONE OF THREE TREATMENTS:**
> - **MODAL SCRIM** — something is presented *over* the world and the world stays. **Dim only. Never blur.** Luminance drops ~50%, α 0.45-0.55, and hue/chroma **survive**: Photos O2 has a chartreuse card, a red car, and 14pt-equivalent text all legible at full settle. Dim ≠ desaturate.
> - **FOCUS VEIL** — a control is engaged *in place*. Graded blur, monotone falloff by distance from the control, foreground crisp, far context crisp. §5.
> - **RECEDE** — the world is being replaced or pushed. translateY + blur + dim, **all three together**, gesture-coupled while touched. The world is departing, not being contextualised. Siri pulldown: ~160px translate, ~20px blur, ~45% dim, no scale (icon size constant across the gesture proves it).

### Ladder mapping

| role | rung | note |
|---|---|---|
| **Content** (the thing itself) | **no rung** — `.glass-opaque` or bare | Explicit: content never takes a ladder rung. |
| **Content-bearing card** | `.glass-resting` (0.65α / 7px) | The consumer plate. |
| **Quiet chrome in the content plane** (chips, status pills, inline controls) | `.glass-quiet` (0.50α / 7px) | |
| **Presented chrome** (popover, dropdown, menu plate, dock slab, composer, tooltip) | `.glass-floating` (0.80α / 11px) | Photos O5 measures 30-50px internal blur + brightness lift; our 11px band ceiling is the correct pullback for a cream substrate (§9 item 10). |
| **Modal-over-modal chrome** (dialog over floating, command palette) | `.glass-overlay` (0.95α / 11px) | |
| **The world scrim** | **NO RUNG** | |

### Direct consequence for scrim/backdrop work

1. **`src/components/dialog/ModalOverlay.vue:83` — delete `[backdrop-filter:var(--glass-blur-wash)]`.** A 1px wash blur applied to the world is a ladder rung on the world, and (d) forbids it. The scrim becomes background-only: `bg-overlay-scrim` and nothing else.
2. **`--overlay-scrim` stays warm.** `hsl(24 10% 10%)` at 50% is *correct* and is where we beat the exemplar, not where we lag it (§9 item 1). But the law adds a testable bar: **text behind the scrim must remain legible.** Gate it — sample a mid-tone and a saturated hue behind an open Dialog and assert chroma survives and contrast stays ≥3:1.
3. **`.glass-wash` (0.30α / 1px) loses its only consumer.** It existed to be the scrim. It must earn ≥2 sites as the focus veil's far-field rung or be cut at the next overfitting audit. Flag it, don't quietly keep it.
4. **`data-backdrop="graded"` (`dialog/placement.css:157-195`) is legal, but it is not a scrim.** It is a focus veil that happens to be anchored at the viewport centre. Re-role it (§5); the modal's *default* backdrop must become dim-only.
5. **The drawer's immersive stage scrim (fixed 14px, private token) is a RECEDE and must complete the arm.** If the world blurs, the world must also translate and dim. A blurred-but-stationary world is the one shape the law has no room for.

---

## 4. THE ENGAGEMENT LADDER

Five rungs. For each: what changes, by how much, on what curve, at what rank.

### REST — the floor, not a loop

There is a real tension here and it must be resolved rather than papered over. ChatGPT O8: *"No element idles with a looping animation — every visible motion reports state."* BREATH OF LIFE says every interactive component always displays engagement. Both are right, at different altitudes.

> **Breath is a floor, not a loop.** A control at rest displays engagement by (i) a non-zero material response to the pointer field, (ii) truthful in-place state reporting, (iii) a ≤1-frame answer to any state change. **A control never carries a decorative idle animation.**
>
> The one legal idle loop belongs to an **ambient** surface (aurora, the lens shimmer, a substrate field) at **sub-interactive tempo — period ≥1s, ~10× slower than any gesture beat**, with a **clamped non-zero amplitude floor at ≥0.30 of peak** (Siri OBS-3: idle 14.2 against a dark floor of 4.3 and a speech peak of 48 — the ribbon collapses to a thin prismatic line but never to nothing). Gemini OBS-7 sets the ceiling on tempo: ~1-1.8s per hue family, ~4-5s per cycle, *"far below interaction speed so it never competes with content."*

**Changes at rest:** nothing geometric. Light channel only, ±15% of the floor. **Curve:** envelope, not spring — a slow LFO. **Rank:** ambient, outside the rank system.

### HOVER — pointer-only

- **Geometry:** `scale 1 → --scale-hover-btn (1.05)` for buttons, `--scale-hover (1.08)` for atoms, `--scale-hover-dock (1.10)` for dock members.
- **Material:** exactly **one ladder rung up** (resting → floating). Nothing else.
- **Light:** `control-engage` attack 60ms (t90 = 138ms, inside the 150ms acknowledge window).
- **Curve:** `--spring-press` on the SPATIAL leg, `--ease-standard` on EFFECTS. **Clock:** `--spring-press-duration` (0.12s).
- **Rank:** 0.
- **Budget:** size ≤8%, luminance ≤1 rung. Two channels. **Hover does not exist on a coarse pointer** — `@media (hover: hover)` or it is a bug on mobile, which is first-class.

### PRESS — the answer

- **Geometry, and this is a distinction we do not currently make:** a press that **ends in place** shrinks to `--scale-press (0.96)`. A press that **ends in an expansion** *swells* to **1.04** (Music f_0044: the pill swells 1.03-1.05 over ~100ms, and *"its release velocity feeds the bloom"*). Two press shapes, one token pair; the swell variant is a `data-press="swell"` arm.
- **Light:** `press-drain` (55/120ms). The drain is what makes an abandoned press read as released rather than as never-seen.
- **Curve:** `--spring-press`. Monotone. Say so.
- **Rank:** 0, always. The finger owns the first frame.
- **Budget:** answer visible within **150ms** (`ACKNOWLEDGE_WINDOW_MS`, shipped). Release inherits velocity into the next rung.

### ENGAGED — the control promoted out of its own footprint

This is the rung we do not have. `BI.W-ENGAGE-AFFORD` is spec-only at HEAD, zero implementation.

- **Geometry:** the control grows out of its rest rect into a temporary overlay of **itself**, birth scale **0.78 → 1.0** (measured exactly; ChatGPT O1), transform + opacity only, never an animated height. The rest footprint stays visible beneath through the flight — *"the origin is never hidden."*
- **Readout:** the value label is a **shared element**, migrating and rescaling 1.0 → 1.5× on the same spring. One label, never duplicated.
- **World:** the **focus veil** (§5), lagging at rank +6.
- **Curve:** `--spring-dock` (0.30, ζ0.88, 0.21s) — measured 300ms open, no overshoot at 100ms sampling.
- **Exit:** ~200ms = 0.67× entry, reverse choreography exact, the label flies back into the row it left.
- **Invariant:** **engaged is a singleton.** At most one control is engaged at a time, like the top layer.

### MODAL — the plate is presented

- **Geometry:** birth scale **0.85** (see §9 item 2) × the shipped volume-preserving squish (`--lq-stretch-x/y` 1.06/0.945), origin at the anchor edge.
- **World:** dim-only scrim, rank +2 onset, `world` clock — starts early, settles last.
- **Content:** blur-condense timed to finish **exactly at spring settle**. Crisp arrival is the settled signal.
- **Curve:** `--spring-transient` (0.20s). **Exit:** 150ms, fade-led — `--exit-overlay-duration` is already correct at HEAD and is the one thing the popover exemplar praised.

### What a gate can check

- **G1 ACKNOWLEDGE** — every rung's leading channel reaches 90% within 150ms of its trigger.
- **G2 SINGLE LEAD** — exactly one channel at rank 0 per rung transition.
- **G3 CHANNEL BUDGET** — no rung changes more than 2 of {geometry, luminance, blur, light}.
- **G4 ASYMMETRY** — every rung's exit clock ≤ 0.7 × its entry clock.
- **G5 REST FLOOR** — every interactive component has a non-zero engagement floor on ≥1 channel, and **zero** decorative idle loops.
- **G6 ENGAGED SINGLETON** — at most one `[data-engaged]` in the document.
- **G7 HOVER GUARD** — no hover rung outside `@media (hover: hover)`.

---

## 5. THE GRADIENT-BLUR FOCUS PRIMITIVE

**Good news first: we already built it, then hid it inside the Dialog.** `dialog/placement.css:157-195` FORM 2 — a full-viewport plate whose mask is the `mask-composite: intersect` product of an x double-ramp and a y double-ramp, holding full alpha out to `--glass-halo-core` from the centre and easing to transparent over `--glass-halo-bloom`. That is precisely the ChatGPT veil's shape: maximum at the control, monotone falloff, far context untouched. It is `data-backdrop="graded"`-private and hard-centred at `50%`.

### Mechanism

One plate, `position: fixed; inset: 0; pointer-events: none`, z between the world and the engaged control, carrying `backdrop-filter: blur(var(--glass-veil-blur)) saturate(var(--glass-saturate-overlay))` plus a centre-weighted dim, masked by the intersect of two double-ramps centred on the **engaged element's rect centre**.

The engaged control sits **above** the veil and stays perfectly crisp. Content directly behind the control is fully diffused; the falloff band restores legibility outward; beyond it, nothing is touched.

### Tokens

| token | value | provenance |
|---|---|---|
| `--glass-veil-blur` | `var(--glass-blur-floating-radius)` = 11px | Measured 16-24px at capture scale ≈ 8-12px CSS. Replaces `--glass-halo-blur: 20px`, which busts the ladder's own ≤15px budget band. |
| `--glass-veil-bloom` | `7rem` | Measured 250px falloff at capture scale ≈ 125px ≈ 7.8rem. The shipped `--glass-halo-bloom: 7rem` is already right — keep it. |
| `--glass-veil-core-x` / `-y` | JS-written from the control's half-extent; `13rem` default | Generalises the shipped `--glass-halo-core`. |
| `--veil-x` / `--veil-y` | JS-written `%`, `@property`-registered so they interpolate | The one genuinely new thing. |
| `--glass-veil-dim` | `color-mix(in oklab, var(--glass-bg-overlay) 50%, transparent)`, dark arm 40% | Already shipped, per-mode arms already correct. |

### Clocks and channels

**Only opacity animates.** The blur radius field is static — ChatGPT's gradient-veil spec is explicit, and an animated `backdrop-filter` radius is the most expensive thing this library can do.

- **In:** ~300ms on `--ease-standard`, **lagging the geometry by rank +6 (100ms)**.
- **Out:** ≤200ms, **together with the geometry, no lag** — *"always behind the geometry going in, together with it going out."*
- **Mount:** the veil is **mounted only while engaged.** A resident full-viewport `backdrop-filter` is not acceptable at rest, on any engine.

### Consumers (≥2 required, four available)

1. **Slider engaged state** — the F49/F50 OpenAI reference, the headline consumer.
2. **Dialog `data-backdrop="graded"`** — existing, re-roled from "backdrop variant" to "focus veil".
3. **Select / Combobox** opened over dense content.
4. **The dock's engaged control** / command palette.

### Files

New `src/styles/glass/focus-veil.css` (`@layer components`, imported by `glass.css`), `.glass-focus-veil`. `dialog/placement.css` FORM 2 collapses to a `data-backdrop="graded"` binding of the shared class. FORM 1 (the side-sheet per-edge graded edge) stays where it is — it is a plate-local material, not a veil.

---

## 6. THE DOCK PRIMITIVE SET

### Ruling on the retirements

**The deletion was right. The stated reason was wrong, and the wrong reason has to be struck from the record before it blocks the rebuild.**

`dock/composables/index.ts:40-45` declares `useDockFission` and `useDockOrientationMorph` DEFINITION-ABSENT because *"the platform cannot continuously interpolate a flex-column→row topology change."*

That claim is **true and irrelevant**. iOS never interpolates layout topology either. Music OBS-2 is unambiguous: *"Two discrete layouts of the same member set... each end state is separately laid out and settled — nothing lives mid-interpolation."* OBS-3 names the mechanism: per-member FLIP between two measured layouts, every member gets `(sourceRect, destRect)`, all riding **one** shared spring as compositor translate+scale, labels on a trailing opacity channel, the lens morphing radius+width on the same clock. Layout itself never animates.

**The second stated reason HOLDS and is upgraded to a prohibition.** The retirement note also cites the fission spectacle as *"the prime Safari suspect (goo `filter:url()` stacked with `backdrop-filter`)."* That is a real hazard and a live crash suspect (§8). **No dock primitive may use `filter: url()`. Transform and opacity only.**

**Verdict:** the retirements stand as deletions of two bad implementations, and are **reversed as policy**. The capability must exist, rebuilt on the FLIP machinery we already own (`useElementMorph`, `useLiquidReveal`), which is physics we have and orchestration we lack.

### The minimum primitive set — five, and not one more

**1. `useLayoutBridge` — the N-member FLIP.**
Given a member set and two settled layouts A and B: measure every member's rect in both, switch layout to B instantly at t0, drive all members' `translate`/`scale` from their B homes back to their A positions and release on **one** `dock` spring. Members in A-not-B fade out at rank −1; members in B-not-A fade in at rank +6. Labels always at rank +6 (measured 100ms).
This one primitive **subsumes fission, fusion, orientation morph, and tab-bar reflow.** It is `useElementMorph` generalised from one element to N sharing one spring. Zero layout animation, so the original objection never applies.

**2. `useDockLens` — the persistent selection object.**
One lens surface owned by the dock shell, never per-tab. Position + width + radius morph on `dock`; icon/label tint trails at rank +6. It **morphs circle ↔ capsule across dock states** (Music f_0093 catches it mid-morph as a dark ellipse) and is never unmounted and recreated. *"The user tracks one piece of glass across the whole dock lifecycle."* Promotes the tabs-indicator idiom into the dock shell.

**3. `useDockSlabGroup` — the dock is a stack, not a monolith.**
N cooperating glass islands, each with its own rim, radius register, and material, in one choreography group with per-slab rects. First consumer: the now-playing slab stacked ~6-8pt above the tab slab. `DockLayerGroup` composes *faces within one shell* today, which is the wrong shape — *"a dock is a STACK of cooperating glass islands, not a monolith."*

**4. `useAnisotropicExtent` — two scalars, one anchored origin.**
The single `--dock-morph-t` scalar cannot express what the frames show: Siri's results expansion runs width in **≤75ms** and the downward stroke in **475ms with a real 4.7% overshoot**. Fast axis on `dock`, slow axis on `panel`, the slow axis expressed as an animated `clip-path: inset()` over a **destination-laid-out, top-pinned** face. Content never stretches and never counter-scales — the moving edge discloses it. The idiom already half-exists at `dock/styles/crossfade.css:122,130`.
This also forces a carve in `scheme-spring.css`'s own easing table, which currently mandates compositor-transform-only size morphs and thereby forbids the honest extent morph. Carve it explicitly: **`clip-path` on a promoted layer is a legal extent channel; `width`/`height` never are.**

**5. `useNestedFlip` — children retarget along the parent's timeline.**
The Music sheet bloom has the artwork lifting up through the growing card while the title row slides down past it — **they swap vertical order mid-flight**. `useElementMorph` is single-element and has no seam for this. It is the enabling primitive for "the sheet blooms from the dock pill as one continuous surface."

### What we do not build

No fission *spectacle* (goo, `filter:url()`, particles). No orientation morph as a distinct API — it is `useLayoutBridge` with two layouts. And `DockCrossfade`'s standing policy that *"controlled face swaps do not resize the dock shell"* is **struck**: under this canon the shell does resize, by transform-projection between two measured shells, never by an animated width.

### One more measured rule the dock must obey

**Collapse is content-shedding, not miniaturisation** (Music OBS-2). The collapsed pill *drops the skip-forward control*; labels vanish wholesale rather than shrinking; four of five tabs are absorbed into one circle. The collapsed form is a first-class composition, not a scaled-down clone. `useLayoutBridge`'s member-set diff is exactly the right shape for this — it is why it takes a set, not a scale factor.

---

## 7. EXIT ASYMMETRY

Measured exit/entry ratios: Photos 133-150 / 167-183 = **0.80**; ChatGPT slider 200 / 300 = **0.67**; Gemini pulldown 200-300 / 400-600 = **0.50**.

> **THE RULE.** `EXIT = 0.6 × ENTRY`, floored at 120ms, ceilinged at 250ms.
>
> **Fade-led:** opacity starts at t0 and reaches 0 by 60% of the exit clock; geometry finishes at 100%.
>
> **Never a spring. Never an overshoot.** `--ease-out`, a bezier, always. An exit must not overshoot past gone.
>
> **Reverse the onset ranks.** Periphery and annotation leave first, the plate second, the touched body returns to its source rect third, **the world recovers last**. Gemini OBS-8: keyboard out first, then panel-into-anchor, island absorption the final visible event.
>
> **A surface dies into the anchor it was born from.** Round-trip spatial honesty — the plate shrinks toward its anchor edge, the lifted preview lands back inside its source cell at cell bounds.
>
> **Leave an afterglow.** A ≤100ms residual highlight on the origin so the eye can find where the transient went home. Light channel, `press-drain` release (120ms).

**The one exception, and it is not a loophole.** A **gesture-released** exit is not an exit. It is a spring inheriting the release velocity, and it may overshoot, because the user threw it. Music OBS-5: while the finger drags, the sheet is finger-attached and **linear**, ~90-100px per 100ms, zero easing; on release, current position *and velocity* hand off to the return spring. **Interruption truth outranks exit asymmetry.** Springs belong to entrances, exits, and releases — never between a finger and the thing it is holding.

**Implementation.** Generate `--spring-<name>-exit-duration: calc(var(--spring-<name>-settle) * 0.6 * var(--motion-tempo))` alongside the existing `-duration` readers. This closes the "no fast-exit duration vocabulary" gap named in two separate `ourGap` statements. The shipped `--exit-overlay-duration: 0.15s` is 0.6 × 0.25s — it is already the rule, hand-written; derive it and delete the literal.

**Also fix (`reveal.css`):** the exit currently fades geometry and opacity on one clock. Fade-led means the opacity leg finishes at 60% of `--reveal-exit-clock` while `scale`/`filter` run the full clock. The `glass-reveal-out` keyframe carries all three, so this is a keyframe percentage edit, not a new channel.

---

## 8. SAFARI VERDICT PER PRIMITIVE

**Standing posture, and it is the honest one.** The demo crashes Playwright-WebKit deterministically 5/5 on every route, dev and bundled, with **zero page errors**, and blocking CSS prevents it. The crash is in CSS, and the bundle ships **one 318KB stylesheet**. Until that is bisected, every verdict below is a *prediction*, not a proof, and I am labelling them as such. Playwright's WebKit is the engine build, not the Safari app — a green Safari-app result does not discharge it, and a red WebKit result does not automatically mean the app is broken.

| primitive | verdict | what must be proven |
|---|---|---|
| Spring `linear()` curves | **paints** (Safari 17.4+) | Our stops are **49 items long**. No documented cap exists, and no one has checked. **P3:** parse-and-sample one 49-stop `linear()` in the shipping WebKit build and compare t50/t90 against the JS `SpringProgress`. |
| `@starting-style` + `transition-behavior: allow-discrete` | **paints** (17.4/17.5) | The *combination* on a non-top-layer portaled element, which is the shape `.glass-reveal` actually ships. Prove ≥6 intermediate frames, not just a non-crash. |
| `scale:` / `translate:` longhands | **paints** (14.1+) | Nothing. This is the safest channel we have; keep everything on it. |
| Ladder `backdrop-filter` | **paints** | Already discharged by `proof:webkit-backdrop` (count-parity over shipped dist, build-injected `-webkit-` pair). |
| **Full-viewport `backdrop-filter` plate (focus veil)** | **NEEDS PROOF — #1 suspect** | WebKit is historically fragile with a viewport-sized `backdrop-filter` inside a stacking context carrying `mask-composite`. **P4:** mount / unmount / remount 20×, plus a live 60fps opacity animation, plus memory delta. If it fails, the veil becomes an element-sized plate sized to the falloff bounding box, not the viewport — a smaller primary, not a fallback. |
| `mask-composite: intersect` + `-webkit-mask-composite: source-in` | **paints**, source-authored already | The two spellings are not synonyms in general (`source-in` is the legacy alias). **Prove with a pixel diff** that the pool shape is identical in both engines. |
| **`filter: url()` (goo)** | **FORBIDDEN** | Named the prime Safari suspect in our own retirement note, stacked with `backdrop-filter`. No new primitive may use it. **And the pager-worm goo-morph must be shown to be SVG-filter-free or it joins the list** — this is a live obligation, not a hypothetical. |
| `clip-path: inset()` animation (anisotropic extent) | **paints**, compositor-accelerated | That it does **not** force a repaint of the `backdrop-filter` beneath it — a known WebKit cost cliff. Profile it. |
| `@property` scalars driving morphs | **paints** (16.4+) | Nothing beyond the standard smoke. |
| `@container style()` (adaptive legibility) | **paints** (18+), **fail-safe by construction** | Already discharged by design: an unsupporting engine drops the unknown at-rule and keeps un-darkened glass. |
| `contrast-color()` | **paints** (26+), progressive enhancement only | Nothing. It is never the floor. |
| **Refractive moving lens edge (the y-flipped lip)** | **NEEDS A DIFFERENT MECHANISM** | True refraction is not expressible in CSS on **any** engine. Our primary is a **specular gradient strip riding the clip edge** — an edge highlight, not a refraction. This is a design substitution, not a masking fallback: refraction was never the primary, so nothing is being hidden. |
| WebGPU `.glass-lens` / `supportsBackdropRefract` | **needs proof** (Safari 26 ships WebGPU) | Keep the capability latch. And remember the context-steal trap: `getContext()` on a live WebGPU canvas steals the context and fakes a black fallback. Probe by screenshot and computed style only. |

**Blocking prerequisites, in order:**

- **P1 — Bisect the WebKit crash by halving the 318KB stylesheet.** It is CSS and it is in one partial. Until P1 lands, no verdict above is worth more than a guess, and **no new primitive should ship**.
- **P2 — A WebKit smoke route per new primitive, mounted alone, with the rest of the stylesheet absent.** This is also the fastest path to P1.
- **P3, P4** as above.

---

## 9. WHAT WE MUST NOT COPY

Where the exemplar's choice conflicts with warm cream paper, deft rounding, and frosted glass — and what we do instead.

**1. The neutral black scrim.** Exemplar: black at α 0.45-0.55. A neutral black over warm cream reads as a dead grey film. **Ours: the warm-ink scrim `hsl(24 10% 10%)` at 50%, unchanged.** We take the *grammar* (dim only, chroma survives, ~50% luminance drop) and keep our own ink. This is a place we are already ahead.

**2. The 0.75-0.80 birth scale.** Correct on iOS's tight ~20pt continuous corners. On our deft, larger radii a 0.75 birth reads as a cartoon squash and the corner visibly wobbles during the flight. **Ours: birth scale 0.85**, composed with the shipped volume-preserving squish (`--lq-stretch-x/y` 1.06/0.945). Tight pop, no cartoon. Our current 0.94/0.96 is far too timid; 0.85 is the deft middle, not a compromise.

**3. The all-black command surface.** Gemini's near-opaque black pill, ChatGPT's 75% dark tint. **Ours: the opacity *grade* stays — input surface most opaque, results frosted, world dimmed — but the ink is our warm `--glass-bg-overlay` plate.** Hierarchy is carried by **alpha**, never by hue. Same law, our palette.

**4. Continuous-corner (squircle) geometry.** The exemplar's radius continuity leans on the superellipse. We do not have it in CSS and **must not fake it** with `filter: url()` or an SVG clip (see §8). **Ours: deft rounding on plain `border-radius`, with radius *continuity* enforced** — source rect and expanded rect read the same radius token. Continuity is the load-bearing half of the effect; the superellipse is the garnish. `corner-shape: squircle` when it is Baseline, and not one day before.

**5. Full-bleed page replacement.** The app-open goes edge-to-edge black. Our language is floating inset objects on cream paper — the exemplar's own principle says *"a floating inset panel with continuous corners reads as an object IN the scene; full-bleed would read as a place."* **Ours: forward navigation is a zoom-window push that stops at the content column's gutter, never at the viewport edge.**

**6. The dark launch hold.** 600ms of black before chrome fades in is an OS load-screen idiom. **Ours: the destination is laid out complete and revealed by clip** (Siri OBS-6), so there is never a blank hold to decorate.

**7. The halftone dot-matrix arrival.** Genuinely lovely, and it is Google's signature — copying it reads as borrowed. **Ours: the aurora's existing painterly registers (watercolor / oil / crayon) as the materialization texture — a paint-bloom, not a dot screen.** Same law ("energy arrives quantized, settles continuous"; one scalar carries arrival→rest), our medium. And it comes with an implementation dividend: `composition.glsl.ts` already implements palette *travel*, so the spatially-propagating hue drift is in vocabulary.

**8. A 9.5% bounce.** Not the exemplar's mistake — **ours**. The corpus ceiling is 4.7%, on a clip edge. **Ours: `panel`'s 4.2% on the long stroke, and DEFORM for everything that wants to read playful** — the volume-preserving squish/stretch the library already speaks (`--pager-worm-max-stretch: 1.2`, the SegmentedTabs travel-squish). We already had the right answer and kept a wrong one beside it.

**9. Per-row stagger in menus.** The exemplar deliberately has none. **We must not add it.** `useStagger` is forbidden inside a reveal plate; a plate arrives as one object or it reads as assembly.

**10. Glass that is bright and shiny.** The owner's own verdict on our tabs and slider — *"far too trite, shiny, and bright, not like blurred and frosted glass."* The exemplar's plates are bright because iOS lives on saturated wallpaper; on warm cream a bright specular rim plus high saturate reads as **plastic**, not glass. **Ours: FROST FIRST.** Alpha and blur carry the material; the specular rim is a hairline and stays one; `--glass-saturate-*` is pulled **down** on the calm rungs, never up. Concretely, for the two surfaces named: tabs and slider move from a specular-led read to a blur-led read — drop rim opacity, raise plate alpha, keep the 11px band.

---

## APPENDIX — THE ORDERED WORK

1. `springPresets.ts`: six rows, `settleBand` field, renames, corrected comments.
2. `regen-spring-tokens.mjs`: consume `settleBand`; emit `-exit-duration` readers; regenerate `scheme-spring.css`.
3. `motion-registers.css`: three registers onto one spring; birth scale 0.85; tooltip stays a bezier and the table says why.
4. `reveal.css`: opacity leg at 0.6× `--reveal-clock`; plate `transition-delay` at rank +3; fade-led exit percentages.
5. `utilities/base.css`: `--spring-press-duration` clock on the scale legs; delete the stale ζ=0.86 comment.
6. `ModalOverlay.vue:83`: delete the scrim's `backdrop-filter`.
7. New `glass/focus-veil.css`; `placement.css` FORM 2 collapses onto it; `--glass-halo-blur` 20px → 11px.
8. `useLayoutBridge`, `useDockLens`, `useDockSlabGroup`, `useAnisotropicExtent`, `useNestedFlip`.
9. Gates G1-G7 plus the Law-0 invariant (`M > B ⟺ the row's comment may mention rebound`) — eight assertions against a mandated 40-60, and they replace considerably more than eight of the 1,095 existing cases.
10. **P1 before any of 6-8 ships.** The WebKit bisect is not a parallel track; it is the gate.