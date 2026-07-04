# BG.W-OVERLAY-ENTER-PAINT — PAINT DELTA (non-authoring dual-engine judge)

**Wave**: BG.W-OVERLAY-ENTER-PAINT (F5.R1 · F5 Motion, class P · IOS27-MOTION-TRUTH repair, post-F5.1)
**Judged**: 2026-07-04 · non-authoring paint judge (did not build)
**Src commit under test**: `6911d48e` (overlay `.glass-reveal` enter `@starting-style` from-state + scrim couple)
**VERDICT: FAIL** — the ENTER bloom paints correctly on all three surfaces in BOTH engines BOTH modes (the born-RED one-frame pop is genuinely fixed), but the **Dialog + Popover EXIT does not paint at all** (0 frames — reka `usePresence` unmounts the CSS-transition exit before it runs), which the pass condition explicitly requires (`exit ≥4 frames ≤150ms no-overshoot ... Dialog+Sheet+Popover`).

---

## Pass condition (verbatim)

> PAINT rides the LIVE overlay-bloom π series — **enter ≥6 intermediate frames + exit ≥4 no-overshoot**, both modes on `/containers` Dialog+Sheet+Popover, NEVER a settled capture.
> Full spec: π enter ≥6 intermediate frames (scale 0.88→1 + blur 4→0 + opacity coupled on the snappy clock), **exit ≥4 frames ≤150ms no-overshoot**, scrim COUPLES to the panel window (≥80% dim within ~100ms of launch on --ease-out); born-RED on the HEAD one-frame ~44ms pop. NON-AUTHORING dual-engine, BOTH modes. MUST be a LIVE bloom frame-series, NEVER a settled/at-rest capture.

## Method (LIVE frame-series, not settled)

BUILT demo (`npm run demo:dist:build`) served on `:5200` (`vite preview`). The bloom is a CSS `@starting-style` enter transition + a reka-Presence-gated exit — a **settled** capture cannot witness it, so the binding paint proof is a **live rAF computed-style frame-series** driven per the criteria's own "use COMPUTED DOM checks where computational" clause. Both engines driven programmatically (engine provenance is intrinsic — each series is a direct `chromium.launch()` vs `webkit.launch()`):

- **Chrome/Blink** — UA `AppleWebKit/537.36 … Chrome`, GL `ANGLE (SwiftShader)`, `@starting-style` supported=true.
- **Safari/WebKit** — UA `AppleWebKit/605.1.15` (real system WebKit), GL `Apple GPU` (Metal), `@starting-style` supported=true.

Per (engine × mode × route): open the overlay on the LIVE `/containers/<route>` route (NON-capture, so the recipe animates normally), rAF-sample the content element's computed `scale`/`opacity`/`filter`/`translate` + the scrim effective alpha from the first mount frame through settle (ENTER), then fire the close and rAF-sample the receding element (EXIT). Probes + raw series on disk:

- `BG.W-OVERLAY-ENTER-PAINT-frameseries.mjs` · `BG.W-OVERLAY-ENTER-PAINT-analyze.mjs`
- `overlay-enter-paint/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}.frames.json` (12 series)
- settled PNGs `overlay-enter-paint/*-settled.png` (12, all real ≥300KB) · mid-bloom PNGs `*-midbloom.png` (8)

## Painted-truth table (12 series)

```
engine  mode  route    | enterF interF minScl maxBlur ENTER | exitF closedF over EXIT | scrim80ms
chromium dark  dialog  |    16     6  0.933   4.00 PASS |    0      0  n  FAIL |  374
chromium dark  popover |    30    17  0.933   4.00 PASS |    0      0  n  FAIL | null
chromium dark  sheet   |    16    (slide) translate   OK  |    4      4  n  PASS |  284
chromium light dialog  |    16     6  0.933   4.00 PASS |    0      0  n  FAIL |  392
chromium light popover |    30    18  0.933   4.00 PASS |    0      0  n  FAIL | null
chromium light sheet   |    17    (slide) translate   OK  |    5      5  n  PASS |  392
webkit  dark  dialog   |    42    28  0.943   3.61 PASS |    0      0  n  FAIL |  265
webkit  dark  popover  |    41    28  0.99→ blur2.76  OK  |    0      0  n  FAIL | null
webkit  dark  sheet    |    46    (slide) translate   OK  |   20     20  n  PASS |  257
webkit  light dialog   |    40    27  0.945   3.58 PASS |    0      0  n  FAIL |  257
webkit  light popover  |    45    31  0.934   3.95 PASS |    0      0  n  FAIL | null
webkit  light sheet    |    48    (slide) translate   OK  |   20     20  n  PASS |  257
```

`interF` = intermediate frames with 0.02 < opacity < 0.98. Sheet blooms by TRANSLATE slide (`sheet-animate` keyframe), not scale/blur — its `minScl=1/maxBlur=0` is expected, and its enter (16–48 total frames) + exit (4–20 frames) BOTH paint multi-frame. `scrim80ms` = ms from launch to reach 80% of the scrim's settled effective alpha (popover is non-modal → no scrim).

## Per-surface painted verdict

- **ENTER — PASS (all three surfaces, both engines, both modes).** Dialog + Popover paint a real COUPLED bloom: `scale 0.93/0.83 → 1 1`, `filter blur(4px) → blur(0)`, `opacity 0 → 1` on the snappy `linear()` spring (its `1.03` overshoot interior gives the iOS arrival), ≥6 intermediate frames (Blink 6–18, WebKit 27–31). Sheet slides in on `sheet-animate` (translate + opacity, many intermediate frames). `@starting-style` interpolates in BOTH Blink and WebKit. The mid-bloom capture (`chromium-light-dialog-midbloom.png`, ~85ms) shows the panel mid-materialize with the scrim only partially dimmed — a genuine in-flight bloom, not a settled frame. **The born-RED one-frame ~44ms pop is fixed.**

- **EXIT — FAIL for Dialog + Popover (0 painted frames, both engines, both modes); PASS for Sheet.** On close, `data-state` flips to `closed` and the content element is **removed from the DOM within ~11ms (<1 frame)** — zero `closed`-state frames paint. The `.glass-reveal[data-state="closed"]` exit transition (`--ease-out` / `--duration-fast`) authored in `reveal.css` never runs. Sheet exits over 4–20 painted frames.

- **SCRIM — partial (coupled, but not the ≤100ms fast-dim; the O4 change is off-surface for the demo).** The demo Dialog/Sheet scrim is a reka `DialogOverlay` **div** (`ModalOverlay.vue`, `sheet-animate` 0.55s fade), which rises **concurrently from launch** with the panel (coupled — NOT the trailing-400ms HEAD defect), but reaches 80% dim at **~257–392ms**, not ~100ms. The wave's O4 fast-clock change targets `dialog.glass-top-layer[open]::backdrop` — a **native `<dialog>`** which the `/containers` routes do NOT mount (the "native top-layer opt-in" is named in the hero blurb but no native `<dialog class="glass-top-layer">` is rendered), so the ≤100ms fast-dim coupling is **unobservable in the painted demo**.

---

## defectLocalization

- **`src/styles/glass/reveal.css`** — the `.glass-reveal[data-state="closed"]` EXIT leg is a CSS **transition** (`transition-timing-function: var(--ease-out); transition-duration: var(--duration-fast)`). A transition has `animation-name: none`.
- **Root cause — reka `usePresence`** (`node_modules/reka-ui/dist/Presence/usePresence.js:44`): on `present → false` it reads `getComputedStyle(node).animationName`; when it is `"none"` it dispatches `UNMOUNT` **immediately** (`dispatch("UNMOUNT"); dispatchCustomEvent("after-leave")`). It listens only for `animationstart`/`animationend` — there is **no `transitionend` path**. So a transition-only exit is torn down before it can paint. Confirmed via MutationObserver (element removed at t≈11ms, `data-state="closed"` recorded, 0 rAF exit frames) AND the reka source. Sheet is immune because `sheet-animate` is a `@keyframes` animation (`animationName ≠ none`), which reka awaits — hence its 4–20 painted exit frames.
- The gate `proof:motion` overlay-enter-paint arm is a SOURCE check (it verifies the `@starting-style` block exists); it cannot see reka unmounting the transition-exit — exactly the source-green / paint-broken gap this judge exists to catch.

## mustFix

1. **Give the `.glass-reveal` EXIT an `animation-name` reka can await.** Add a `@keyframes glass-reveal-out` (scale → `calc(enter-scale × squish)`, opacity → 0, filter → `blur(--glass-reveal-blur)`, on `--ease-out`, ≤150ms, no overshoot) and apply it on `.glass-reveal[data-state="closed"]` so `getComputedStyle(node).animationName ≠ "none"` and reka's `usePresence` dispatches `ANIMATION_OUT` (awaiting `animationend`) — the SAME mechanism that already makes the Sheet exit paint. The ENTER `@starting-style` is Presence-independent and stays as-is; only the EXIT needs a keyframe path. (Alternatively route the Dialog/Popover exit through the Sheet's `animate-out` keyframe family — one mechanism, no fork.)
2. **Re-verify (this same live frame-series):** Dialog + Popover EXIT paints **≥4 frames ≤150ms no-overshoot**, both engines both modes.
3. **(Secondary, scrim)** If "≥80% dim within ~100ms" is meant to bind the reka overlay scrim (the surface the `/containers` demo actually paints), the reka `DialogOverlay`/`ModalOverlay` scrim (`sheet-animate`, 0.55s) needs its OWN launch-coupled fast enter clock; today the O4 change only reaches native `dialog.glass-top-layer[open]::backdrop`, which no `/containers` route mounts. As-is the demo scrim is coupled/concurrent (not trailing) but reaches 80% at ~257–392ms. (Non-blocking relative to the exit; note for the fix agent.)

## Capture manifest (on disk, all resolve)

- Frame-series JSON (12): `overlay-enter-paint/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}.frames.json`
- Settled PNG (12, real): `overlay-enter-paint/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}-settled.png`
- Mid-bloom PNG (8): `overlay-enter-paint/{chromium,webkit}-{light,dark}-{dialog,popover}-midbloom.png`
- Probes: `BG.W-OVERLAY-ENTER-PAINT-frameseries.mjs`, `BG.W-OVERLAY-ENTER-PAINT-analyze.mjs`

Siblings tripwire `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
