# Tabs greenfield — Lens A: the GLASSY GOLD-STANDARD register (the warm-glass capsule the buttons + dock-buttons will inherit)

> GREENFIELD-BRAINSTORM · pure iOS-27 fidelity · designed from first principles, then unioned with the shipped engine.
> The user's edict: tabs is the **glassy gold standard**. "Our buttons should all be more GLASSY by default, like our tabs facility, and have better HOVER states." So this lens has TWO deliverables: (1) get the tab indicator + capsule *right* (the 5-beat liquid morph on a recessed-warm-glass capsule), and (2) **extract a named, reusable glassy register** — `.glass-capsule` — that the buttons + dock-buttons greenfields consume verbatim. No re-fork; a union with `useLiquidFlex` + `useTabIndicator` + `segmented-tabs.css`.

---

## 0. What I verified LIVE (painted pixels, `/navigation/tabs`, both modes, chrome-devtools) — the honest status quo

The current strip is **already good** and must not be torched. Source-verified + measured:

| Claim | Verified on disk / in paint | Verdict |
|---|---|---|
| Indicator GLIDES between tabs | `inset` transitions on `--spring-snappy` @ `--tab-indicator-duration` (0.4s); measured cx 319 → 555 over the glide | **REAL** |
| Velocity-coupled SQUISH | mid-flight `--stretch: 1.1315`, `scale: 1.13152 / 0.883769` (volume-preserving X-stretch / Y-compress); box width 79→89px; releases to 1 at arrival | **REAL** — this is the `useLiquidFlex` `"linear"`-law travel-squish, cap-clamped, center-pinned (cx held during squish). |
| Active tab = warm glass capsule (six-layer, NOT gray) | light: `oklab(0.793 +0.005a +0.012b / 0.84)` warm-cream; dark: `oklab(0.379 +0.0099a +0.0168b / 0.89)` warm-brown. Rim-top catch-light + rim-bottom under-shadow + `0 8px 24px` floating shadow + 0.5px hairline ring + blur(13px) | **REAL + WARM both modes** (BA.W-NO-GRAY floor holds). |
| Track is warm-glass quiet | light `srgb 0.994 0.96 0.926 / 0.5`; dark `srgb 0.207 0.165 0.133 / 0.58` (R>G>B, warm) + blur(8px) + rim top/bottom | **WARM, NOT gray** — but **FLAT** (rim-only box-shadow, **no inset recess**). |
| iOS-27 recessed well (track SINKS) | `segmented-tabs.css:69` track box-shadow is rim-only — `inset 0 1px 2px <recess-ink>` is **absent** | **MISSING** (W-TAB-IOS-CAPSULE recess unbuilt). |
| 5-beat liquid morph (grow→overshoot→travel→settle→shrink) | only the 1-axis travel-squish exists; **no area over-inflation** (`--tab-blob` absent on disk) | **PARTIAL** — phases 1/3/4 smeared into the squish; no distinct GROW-past-target nor SHRINK-to-fit. |
| Hover state worth emulating | the PILL `.segmented-tab` has **only a `color` cross-fade** on hover (no glass hover register at all); the UNDERLINE tab has a `color-mix` text dim | **WEAK** — there is *no glass hover* on the pill tabs. This is the user's literal "better HOVER states" gap. |

**Source-verified tokens (exist, will be consumed):** `--glass-bg-quiet`, `--glass-bg-floating-tinted` (element-level mint at `surfaces.css:283 :where(.btn-glass,.segmented-indicator)` — root-empty by design), `--glass-rim-top`, `--glass-rim-bottom`, `--glass-shadow-floating`, `--glass-blur-quiet`, `--glass-blur-floating`, `--radius-tab` (=9999px), `--radius-pill`, `--tab-indicator-duration` (=`--spring-snappy-duration` 0.4s), `--spring-snappy`, `--spring-bouncy`, `--tab-indicator-max-stretch` (live = **1.18**), `DEFAULT_INDICATOR_MAX_STRETCH`, `INDICATOR_RELEASE_AT_ARRIVAL`, `useLiquidFlex`, `useTabIndicator`.

**SOURCE-VERIFY FAILURES — levers the wave docs cite that DO NOT EXIST yet (must not be assumed live):**
- `--motion-weight` — **NOT minted** in `src/styles` (spec'd in design.md §L4 only; resolves EMPTY in the live cascade). A greenfield that "reads `--motion-weight`" is citing a phantom. It must be **minted by this work** (Band-0 foundations) or the morph must ride `--spring-snappy`/`--spring-bouncy` (which DO exist).
- `--ease-cartoon-punch` — **NOT minted** in `src/styles` (design.md §L2/§Easing prose only; resolves EMPTY). Same rule: mint-or-don't-cite.
- `--tab-blob`, `--tab-indicator-blob-max`, `--tab-track-recess-ink`, `.glass-tab-capsule` — all **PROPOSED** in BD.W-TABS-LIQUID / W-TAB-IOS-CAPSULE, **none on disk**. They are this greenfield's build targets, not extant primitives.

> **The trap prior goldens fell into (per the orchestrator's warning): inventing levers.** This lens names exactly two new tokens beyond the wave docs (`--motion-weight`, `--ease-cartoon-punch`) and flags them as *Band-0 prerequisites I must mint first*, not as things I can `var()` and pretend resolve.

---

## 1. The core idea — the recessed-warm-glass CAPSULE + the 5-beat liquid morph, extracted as ONE reusable `.glass-capsule` register

The iOS-27 segmented control is a **sunken warm-glass channel with a raised, lit, transmissive lozenge riding inside it**, and the lozenge **physically morphs** (grows, over-inflates like a metaball, glides swollen, settles, shrinks to fit) as it travels — *maintaining the translucent material the whole time*. The current strip nails the material and the squish; it is missing (a) the **recessed channel** (the track is flat), (b) the **area over-inflation** (it stretches one axis but never grows bigger-than-target on both then de-inflates), and (c) a **glass hover register** (the user's explicit ask).

The bold reframe: **the "selected tab capsule" is not a tabs-private thing — it is the library's universal glassy-press affordance.** I factor the lifted-plate composite + the recess-channel + the new hover register into **ONE `@layer components` recipe `.glass-capsule`** (the W-TAB-IOS-CAPSULE fold, renamed from `.glass-tab-capsule` to drop the noun-overload so buttons can own it without a "tab" in the class), and the buttons greenfield + dock-buttons greenfield **compose that same recipe** for their resting/hover/pressed glass. Tabs becomes the *reference implementation* of `.glass-capsule`, and the indicator's 5-beat morph is the *motion layer* on top of it.

So three layers, cleanly separable:

```
┌─ MATERIAL ─ .glass-capsule  (the extracted register: warm-glass fill + 6-layer rim/lift + recess channel + hover) ←─ buttons + dock-buttons inherit THIS
├─ MOTION ──── useTabIndicator + useLiquidFlex ×2  (glide + travel-squish + NEW area-inflation envelope = the 5-beat) ←─ tabs-only
└─ COMMIT ──── one-shot accent-flood  (--capsule-flood-t plus-lighter wash, PRM-static)  ←─ tabs + dock-tabs (opt-in)
```

---

## 2. The MATERIAL layer — `.glass-capsule` (the extracted glassy register)

`src/styles/glass/glass-capsule.css`, `@layer components`, `@import`-ed in `index.css` after the glass ladder, before the consuming tabs/dock/button recipes. **One recipe, ≥3 consumers** (segmented-indicator, dock-tab selected, Button glass) — clears the overfitting bar by construction.

### 2a. The recessed CHANNEL (the track sinks — the missing half)

The host track (`.segmented-tabs`, and any `.glass-capsule-track` consumer) gains an **inset recess leg** on its box-shadow, over the warm-glass quiet fill it already carries:

```css
.glass-capsule-track {
  background: var(--glass-bg-quiet);            /* extant — warm, no-gray */
  backdrop-filter: var(--glass-blur-quiet);
  box-shadow:
    var(--glass-rim-top),                       /* extant — bright top catch-light */
    var(--glass-rim-bottom),                    /* extant — warm under-shadow */
    inset 0 1px 2px var(--glass-recess-ink);    /* NEW — the sunken well */
}
```

`--glass-recess-ink` is a **plain per-mode pair** (light arm in `tokens/glass.css` beside `--glass-tint-*`, dark arm in `tokens/dark-arm.css`) — **NEVER a `light-dark()` fragment**. This is the binding MEMORY lesson: an inset-shadow fragment inside `light-dark()` computes the WHOLE box-shadow to `none`, so the recess would silently vanish. It is a bounded `color-mix(in srgb, var(--foreground) ~7%, transparent)` so it darkens the inner-top edge without re-coloring the warm fill (no gray well). The recess is **static** (a sunken channel does not pulse — never a `@keyframes` target; `proof:no-layout-animation` holds).

### 2b. The raised CAPSULE (the lifted lozenge — already mostly built, now extracted)

The existing `.segmented-indicator` lifted-plate composite is factored verbatim into `.glass-capsule`:

```css
.glass-capsule {
  background: var(--glass-bg-floating-tinted);   /* the element-level W55 adaptive seam — widen surfaces.css :where() to include .glass-capsule */
  backdrop-filter: var(--glass-blur-floating);
  box-shadow:
    var(--glass-rim-top), var(--glass-rim-bottom), var(--glass-shadow-floating);
  border-radius: var(--radius-pill);
}
```

The W55 adaptive seam is the load-bearing detail: over a bright field the capsule **darkens-to-legible**, over a calm field it stays **warm-cream/near-white** — and it writes NO `--glass-tint-source`/`--surface-tint` of its own (the W-DARK-MATERIAL + no-gray fences). This is exactly why the live indicator reads `oklab(0.793…)` over the demo's bright backdrop rather than a flat token.

### 2c. The GLASS HOVER register (the user's explicit gap — NEW)

The current pill tab hover is *color-only*. The new register (the thing buttons will emulate) is a **two-channel glass hover**: a specular catch-light lift + a hair of scale, on a *fast* clock (hover is a §6 bezier ease, not a spring), volume-preserving:

```css
.glass-capsule-hover {                      /* applied to the interactive element, NOT the indicator */
  transition: scale var(--duration-fast) var(--ease-standard),
              --glass-specular var(--duration-fast) ease;
}
.glass-capsule-hover:hover {
  --glass-specular: 0.14;                    /* the W-GLASS-CAL specular register, disco-free, sub-perceptual */
  scale: 1.015;                              /* a 1.5% swell — the "press-ready" lift, golden-restrained */
}
.glass-capsule-hover:active { scale: 0.97; } /* the --scale-press snap; reads the extant press token */
```

On the **pill tabs**, the *non-selected* tab gets `.glass-capsule-hover` so an un-selected segment lifts a hint of glass on hover (the iOS "ready to receive" read) — currently completely absent. On the **selected** tab the indicator already carries the lift; hover deepens the specular only. This is the register buttons adopt wholesale: **glass fill at rest + specular-lift on hover + press-snap on active**, all volume-preserving, all compositor-only.

> **The extraction is the boldest structural move.** Once `.glass-capsule` + `.glass-capsule-hover` + `.glass-capsule-track` exist, the buttons greenfield's job collapses to "compose `.glass-capsule`, set your accent, done" — DRY, KISS, no parallel button-glass fork. Tabs stops being a special snowflake and becomes the *canonical demonstration* of the library's glass-press idiom.

---

## 3. The MOTION layer — the 5-beat liquid morph (grow → blob-overshoot → travel → settle → shrink-to-fit)

This is the W-TABS-LIQUID envelope, built as an **additive second `useLiquidFlex` channel** on `useTabIndicator` — the existing travel-squish `--stretch` channel is byte-untouched.

### 3a. The new scalar `--tab-blob` (area inflation, 1 = fit)

`@property --tab-blob { syntax: "<number>"; inherits: false; initial-value: 1; }` in `property-regs.css` (the `--stretch`/`--dock-morph-t` registered-scalar precedent — registration lets it *interpolate* if the CSS glide carries it; a bare custom would snap). The CSS composes it into the **one** `scale` write alongside the reciprocal squish:

```css
.segmented-indicator {
  /* area inflation (uniform, both axes) × volume-preserving travel-squish (reciprocal) — ONE scale property */
  scale: calc(var(--tab-blob, 1) * var(--stretch)) calc(var(--tab-blob, 1) / var(--stretch));
  transform-origin: center;                  /* the BA-VJS-3 center-pin — the blob grows from center, stays label-pinned */
}
```

### 3b. The second `useLiquidFlex` channel

Beside the extant squish channel in `useTabIndicator.ts`:

```ts
const blob = useLiquidFlex({
  from: 1, to: () => blobPeak,               // blobPeak read from --tab-indicator-blob-max (default 1.10, capped ≤1.12)
  axis: "width", squishLaw: "linear",
  maxStretch: () => blobCap,                 // a SECOND area cap beside the axis cap — never a fork of DEFAULT_INDICATOR_MAX_STRETCH
});
```

This is the *same* volume-preserving primitive the squish + the metaball shader + the dock-fission recoil all speak — ONE squish law, now the indicator's 5-beat consumer. **No second spring, no second rAF, no `@keyframes`.**

### 3c. The 5-beat envelope on ONE clock

`squishOnTravel(toIdx)` shapes `--tab-blob` as a **hump** across the existing `clockMs(el) × INDICATOR_RELEASE_AT_ARRIVAL` schedule the release already reads:

1. **Grow** — on the squish-open frame (same write site as the existing `--stretch` open), drive `--tab-blob` toward the overshoot peak. The indicator inflates *from the source tab* before travelling.
2. **Blob overshoot** — the peak is ~**1.10×** (the metaball over-inflation; capped LOW ≤1.12 — the anti-taffy bar). The lozenge becomes *bigger than the destination footprint*.
3. **Travel swollen** — the `inset`/anchor glide carries it to the destination while `--tab-blob > 1` (the gel-blob glides swollen) and `--stretch` rides the axis (the existing channel).
4. **Settle** — the snappy CSS curve carries a ζ<1 give at arrival (the live `--spring-snappy` already overshoots ~3% then settles — visible in the linear() keyframe).
5. **Shrink-to-fit** — at the SAME `releaseAt` the squish release fires, `--tab-blob` de-inflates to 1 (one timer, lockstep, never a second clock). The lozenge shrinks to the exact destination footprint.

Phases 1+2 read as inflation *before* the swollen travel; phase 3 is the swollen glide; 4+5 are the soft settle + de-inflate. PRM: the existing `prefersReducedMotion()` early-return (`:206`) already skips the squish — the same branch gates the blob write → `--tab-blob` stays 1, the indicator snaps to fit, vestibular-safe.

### 3d. The cap discipline — and a calibration flag

The live `--tab-indicator-max-stretch` is **1.18**, which is *above* the 1.08 default the `useLiquidFlex` header documents and near the ≤1.2 ceiling. The measured mid-flight squish (`scale 1.1315 / 0.8838`) is therefore a fairly *strong* gel-stretch. **Calibration recommendation:** with the new area-inflation channel carrying the "grow" read, the axis-squish cap can come DOWN toward ~1.10–1.12 so the two channels compose to a lively-but-not-taffy total. The area cap `--tab-indicator-blob-max` defaults ~1.10. Total peak deformation (area × squish) stays well under the rubber-band threshold. This is a *consumer/demo tunable* (presets-in-consumers); the library owns the 5-beat envelope + the two axes.

---

## 4. The COMMIT layer — the one-shot accent-flood (T4, opt-in)

IOS27-REFERENCE T4: "a one-shot accent-flood on commit then clears (EFFECTS trails SPATIAL)." A momentary full-capsule wash of the consumer's `--glass-accent`, driven by `--capsule-flood-t` (0→1→0), `mix-blend-mode: plus-lighter` over the capsule, that **trails** the spatial glide by ~1 frame then clears (the fission-ripple precedent). **PRM-static** (no flood under reduce — the legibility read is the color/position, not the wash). **Opt-in** (`:floodOnCommit`), accent is a **consumer accent** (presets-in-consumers — the neutral warm lift is the default identity). This is the same register dock-tabs adopt for their commit pop, so it ships in `.glass-capsule` as a parameterized `::after` flood layer, dormant at `--capsule-flood-t: 0`.

---

## 5. Cross-engine (Chrome + Safari) — §L7 arms

Every channel here is **compositor-only and Safari-native by construction** — no `backdrop-filter: url()`, no WebGL, no SVG goo:
- **Glide** — `inset` (anchor path) / `transform` (JS path) interpolation: cross-engine.
- **Squish + blob** — `scale` on the indicator's own box: compositor, identical on WebKit.
- **Recess** — a static inset `box-shadow`: Safari-native (the inset-shadow-trap fence is the only hazard, neutralized by the plain per-mode pair).
- **Capsule fill** — `backdrop-filter` on the surface's OWN layer (not sampling glass-through-glass): the §L1 "glass cannot sample glass" trap is avoided because the capsule sits *over* the track, not nested-inside its blur.
- **`@property --tab-blob` interpolation** — Safari-26 Baseline; on a gap engine `initial-value: 1` is the safe rest (slides without inflation — never broken).
- **Flood** — `plus-lighter` blend + opacity: Safari-safe.

Acceptance is a **paired-engine π** (chromium + webkit Playwright projects), both light/dark, never `reducedMotion` on the morph arm.

---

## 6. A11y / PRM carve

- **PRM `reduce`** → `--tab-blob` stays 1 (no inflation), `--stretch` stays 1 (no squish, existing early-return), glide is instant; the recess + the capsule lift (both static) remain — a sunken well + a lifted accent need no motion, the legibility floor holds for everyone. The flood is suppressed.
- **`prefers-contrast: more`** → the recess ink floors up (the inset edge is a legibility asset); the capsule rim stays.
- **`prefers-reduced-transparency`** → the capsule falls to the opaque-tier escape (the extant `.glass-opaque` path via the `--glass-level` machinery) — fill goes solid, recess + lift survive as legibility anchors.
- **Focus** → the `.glass-capsule-hover` press/hover register composes the extant `--focus-ring-shadow` on `:focus-visible` (keyboard tab-nav already arrows between segments via reka).
- **Tap target** — the segment padding keeps the ≥44px effective hit (§L3 rung).

---

## 7. The union (no re-fork) + the gate that reproduces the real gesture

**Union, not bolt-on:** `useTabIndicator` (position) untouched; `useLiquidFlex` consumed twice (squish + blob); `segmented-tabs.css` track gains the recess leg + the indicator gains the `--tab-blob` composition; the lifted-plate composite is *extracted* (not duplicated) into `.glass-capsule`; the dock-tab selected register + Button glass re-point onto the SAME recipe. Reconciles BD.W-TABS-LIQUID (the 5-beat envelope) **+** BD.W-TAB-IOS-CAPSULE (the recessed capsule material) into one coherent build: the capsule is the *material*, the 5-beat is the *motion on it*.

**The gate must reproduce the real tab-switch gesture and judge the glide gestalt on painted pixels** — not arithmetic, not a stop-string, not a seed. The π (`tests-visual/tabs-liquid.spec.ts`, chromium + webkit, both modes, never reducedMotion):
1. Drive a real `select(farTab)` via the SFC model (clicking a `.segmented-tab` that flips `aria-selected` — verified live this is what moves the indicator; a raw `.click()` on a non-model-bound node does NOT, which is exactly how a faked gate would no-op).
2. Frame-series the indicator's **measured bounding-box area** across the early frames → it must **exceed the destination tab footprint** by the overshoot ratio (~1.08–1.12×) at the peak (the GROW + OVERSHOOT), then **de-inflate to the destination footprint** at arrival (the SHRINK-to-fit). A control run pinned `--tab-blob: 1` reads area never exceeding target (born-RED on HEAD).
3. Assert the indicator stays **center-pinned to the destination label center** across the whole envelope (cx convergence — measured live, the BA-VJS-3 hold).
4. Assert **capsule meanL > track meanL > track-recess-edge meanL** (the channel SINKS, the capsule LIFTS) — the recessed-accent gestalt, painted.
5. **Material fence:** `variant="underline"` reads a crisp slide, zero area inflation (the hairline does not deform).
6. **Gestalt row** (`tabs-liquid` + `tab-ios-capsule`): a fresh both-mode `:5199` capture, the human verdict — "selecting a tab reads LIQUID: grows, overshoots like a metaball, glides swollen, settles soft, shrinks to fit, over a warm-glass recessed channel" — born-FAIL on HEAD, GREEN at close.

The detector arm (`proof:tabs-liquid` / `proof:tab-ios-capsule`) plants self-test bites (recess inside `light-dark()` → RED; a hand-rolled grow keyframe instead of the 2nd `useLiquidFlex` → RED; a blob that opens-but-never-shrinks → RED; a second timer → RED; the underline inflating → RED; a blob cap >1.2 → RED).

---

## 8. The DELTA-ASSAY — the wave amendment + the named extracted register

**Amendment to BD.W-TAB-IOS-CAPSULE + BD.W-TABS-LIQUID (reconciled):**
- **RENAME** the proposed `.glass-tab-capsule` → **`.glass-capsule`** (drop the noun-overload so buttons + dock-buttons own it without a "tab" in the class). Add `.glass-capsule-track` (recess host) + `.glass-capsule-hover` (the NEW glass hover register — the user's explicit "better hover" ask, currently absent on pill tabs).
- **MINT FIRST (Band-0 prerequisite, flagged):** `--motion-weight` and `--ease-cartoon-punch` are design.md promises **NOT in the live cascade** — any wave that cites them must mint them or ride `--spring-snappy`/`--spring-bouncy` (extant). This greenfield rides the extant springs; the cartoon-punch is an *opt-in loud register*, not the tab default.
- **CALIBRATE:** bring `--tab-indicator-max-stretch` DOWN from the live **1.18** toward ~1.10–1.12 once the area-inflation channel carries the "grow"; area cap `--tab-indicator-blob-max` ~1.10. (Live-measured: current squish peaks `scale 1.1315/0.8838` — a touch strong on its own.)
- **BUILD ORDER:** recess channel + `.glass-capsule` extraction (material) → `--tab-blob` 2nd channel + 5-beat envelope (motion) → glass-hover register → opt-in flood → paired-engine π.

> ## THE NAMED EXTRACTED GLASSY REGISTER (the buttons greenfield consumes this verbatim):
>
> **`.glass-capsule`** — the warm-transmissive lifted lozenge: `--glass-bg-floating-tinted` fill (the W55 element-level adaptive seam, warm both modes, never gray) + the six-layer composite (`--glass-rim-top` catch-light + `--glass-rim-bottom` under-shadow + `--glass-shadow-floating` lift + 0.5px hairline + `--glass-blur-floating`) on `--radius-pill`.
> **`.glass-capsule-track`** — the recessed warm-glass channel it rides in: `--glass-bg-quiet` + rim + `inset 0 1px 2px var(--glass-recess-ink)` (plain per-mode pair, NEVER `light-dark()`).
> **`.glass-capsule-hover`** — the glass hover/press register: `--glass-specular: 0.14` catch-light lift + `scale: 1.015` hover / `scale: 0.97` press, on the fast bezier clock, volume-preserving, compositor-only.
>
> Buttons + dock-buttons compose these three classes (+ their own `--glass-accent`); the recipe lives ONCE in `src/styles/glass/glass-capsule.css`.
