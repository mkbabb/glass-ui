# BG.W-OVERLAY-ENTER-PAINT — PAINT DELTA (non-authoring dual-engine judge)

**Wave**: BG.W-OVERLAY-ENTER-PAINT (F5.R1 · F5 Motion, class P · IOS27-MOTION-TRUTH repair, post-F5.1)
**Re-judged**: 2026-07-04 · non-authoring paint judge (did not build)
**Src commit under test**: `f1dadea8` (working tree; the F5.R1 exit repair `a633784f` — `.glass-reveal[data-state="closed"]` rides `@keyframes glass-reveal-out` — is present in `src/styles/glass/reveal.css` + `src/styles/animations.css` and SHIPPED in the built `dist-demo` CSS, 4 `glass-reveal-out` occurrences)
**VERDICT: PASS** — the OWED EXIT verify is met. Dialog + Popover EXIT now paints **≥4 no-overshoot frames** in BOTH engines (Chrome/Blink + real Safari/WebKit) BOTH modes on `/containers`, a genuine coupled recede (opacity 1→0, scale→0.933 squish endpoint, blur 0→4px, monotonic, no overshoot) — the born-RED 0-exit-frame FAIL is CLOSED. The ENTER bloom still paints on all three surfaces both engines both modes (no regression). Every capture PNG + frame-series JSON RESOLVES ON DISK.

---

## Pass condition (verbatim — the re-judgment descriptor)

> PAINT rides the LIVE overlay-EXIT π series — Dialog+Popover exit **≥4 no-overshoot frames** both modes both engines on `/containers`, closing the born-RED 0-exit-frame FAIL, **NEVER a settled capture**. ENTER already PASSES all 3 surfaces both engines both modes … π: Dialog+Popover exit **≥4 no-overshoot frames before unmount**, both modes both engines (Chrome/Blink + real Safari/WebKit), LIVE rAF frame-series on `/containers` dialog+sheet+popover.

## Method (LIVE frame-series — the correct proof for a motion wave)

The exit bloom is a reka-`usePresence`-gated `@keyframes glass-reveal-out` recede — a **settled screenshot cannot witness it** (the criteria's own "NEVER a settled capture" / "LIVE rAF frame-series"). The proven `?capture=` settled-PNG pipeline is the wrong instrument here; the binding paint proof is a **live rAF computed-style frame-series** driven per the criteria's "use COMPUTED DOM checks where computational" clause, on the LIVE (non-capture) `/containers/*` routes so the recipe animates normally.

- BUILT demo (`npm run demo:dist:build`, fresh bytes ~2.2s) served on `:5200` (`vite preview`).
- Both engines driven programmatically — engine provenance is intrinsic (a direct `chromium.launch()` vs `webkit.launch()`), UA + GL_RENDERER recorded per series:
  - **Chrome/Blink** — `HeadlessChrome/148.0.7778.96`, GL `ANGLE (SwiftShader)`, `@starting-style` supported=true.
  - **Safari/WebKit** — `AppleWebKit/605.1.15 Version/26.4 Safari` (real system WebKit engine), GL `Apple GPU` (Metal), `@starting-style` supported=true.
- Per (engine × mode × route): open the overlay, rAF-sample the content element's computed `scale`/`opacity`/`filter`/`translate` (+ the scrim effective alpha) from mount through settle (ENTER), then fire the close and rAF-sample the receding element until it unmounts (EXIT).

Probe: `BG.W-OVERLAY-ENTER-PAINT-frameseries-rejudge.mjs` (writes to `overlay-enter-paint-rejudge/`). 12 series JSON + 12 settled PNGs on disk.

## Painted-truth table — EXIT (the OWED verify; 12 series)

```
engine   mode  route   | EXIT nF  opacity[first..last]  scaleX[first..last]   blur[first..last] | monoDown noOvershoot | VERDICT
chromium dark  dialog  |  6f     1.000 .. 0.024          1.000 .. 0.934        0.00 .. 3.90      |  true    true        | PASS >=4
chromium dark  popover | 14f     1.000 .. 0.000          1.000 .. 0.933        0.00 .. 4.00      |  true    true        | PASS >=4
chromium dark  sheet   |  7f     1.000 .. 0.004          1.000 .. 1.000(slide) 0.00 .. 0.00      |  true    true        | PASS >=4
chromium light dialog  |  6f     1.000 .. 0.036          1.000 .. 0.935        0.00 .. 3.86      |  true    true        | PASS >=4
chromium light popover | 13f     1.000 .. 0.004          1.000 .. 0.933        0.00 .. 3.99      |  true    true        | PASS >=4
chromium light sheet   |  5f     1.000 .. 0.009          1.000 .. 1.000(slide) 0.00 .. 0.00      |  true    true        | PASS >=4
webkit   dark  dialog  | 20f     1.000 .. 0.001          1.000 .. 0.933        0.00 .. 4.00      |  true    true        | PASS >=4
webkit   dark  popover | 20f     1.000 .. 0.001          1.000 .. 0.933        0.00 .. 4.00      |  true    true        | PASS >=4
webkit   dark  sheet   | 20f     1.000 .. 0.000          1.000 .. 1.000(slide) 0.00 .. 0.00      |  true    true        | PASS >=4
webkit   light dialog  | 20f     1.000 .. 0.000          1.000 .. 0.933        0.00 .. 4.00      |  true    true        | PASS >=4
webkit   light popover | 20f     1.000 .. 0.001          1.000 .. 0.933        0.00 .. 4.00      |  true    true        | PASS >=4
webkit   light sheet   | 19f     0.992 .. 0.000          1.000 .. 1.000(slide) 0.00 .. 0.00      |  true    true        | PASS >=4
```

- **EXIT — PASS (all three surfaces, both engines, both modes).** Dialog + Popover recede on `@keyframes glass-reveal-out`: opacity descends **monotonically 1→0**, scaleX shrinks to **~0.933** (= `--glass-reveal-enter-scale 0.88 × --lq-stretch-x 1.06 = 0.9328`, precisely the keyframe `to`), filter blur grows **0→4px** (= `--glass-reveal-blur`). No overshoot (scale never exceeds 1.02, opacity stays within [0,1]). Frame counts ≥4 in every cell (Blink dialog 6 / popover 13–14; WebKit dialog+popover 20). The Sheet exits via its `sheet-animate` translate slide-out (scaleX 1 / blur 0 expected), 5–20 frames. **The born-RED 0-exit-frame FAIL — reka `usePresence` tearing down a transition-only exit before it painted — is closed:** the exit is now a `@keyframes` animation reka awaits (the Sheet-immune mechanism, shared onto the CSS path), so `getComputedStyle(node).animationName ≠ "none"` and `usePresence` dispatches ANIMATION_OUT + awaits `animationend`.

## Painted-truth table — ENTER (re-confirmed, no regression; 12 series)

```
engine   mode  route   | ENTER nF interF  minScaleX  maxBlur  opacity[first..last] | @starting-style
chromium dark  dialog  | 15f     7      0.933      4.00     0.00 .. 1.00          | supported
chromium dark  popover | 30f    17      0.933      4.00     0.00 .. 1.00          | supported
chromium dark  sheet   | 16f     5      1.000(sl)  0.00     0.00 .. 1.00          | supported
chromium light dialog  | 16f     6      0.933      4.00     0.00 .. 1.00          | supported
chromium light popover | 30f    18      0.933      4.00     0.00 .. 1.00          | supported
chromium light sheet   | 17f     5      1.000(sl)  0.00     0.00 .. 1.00          | supported
webkit   dark  dialog  | 41f    28      0.950      3.48     0.13 .. 1.00          | supported
webkit   dark  popover | 42f    28      0.989      2.81     0.30 .. 1.00          | supported
webkit   dark  sheet   | 47f    38      1.000(sl)  0.00     0.01 .. 1.00          | supported
webkit   light dialog  | 39f    25      0.953      3.42     0.14 .. 1.00          | supported
webkit   light popover | 46f    31      0.934      3.95     0.01 .. 1.00          | supported
webkit   light sheet   | 47f    37      1.000(sl)  0.00     0.01 .. 1.00          | supported
```

- **ENTER — PASS (unchanged by the exit repair).** Dialog + Popover paint the coupled bloom `scale 0.933→1 + blur 4→0 + opacity 0→1` on the snappy `linear()` spring, well above the ≥6 intermediate-frame bar (Blink 6–18, WebKit 25–31). Sheet slides in on `sheet-animate` (translate + opacity, 5–38 intermediate frames). `@starting-style` interpolates in BOTH engines.

## Pixel-truth (settled PNG spot-checks)

- `chromium-light-dialog-settled.png` — a real warm-cream glass "Rename workspace" modal (Slug input, Cancel/Save) over a dimmed scrim showing the `/containers/dialog` page behind. Genuine overlay content.
- `webkit-dark-popover-settled.png` — a real "Dimensions" glass panel (Width 8 / Height 4) anchored below its trigger, dark mode, on WebKit/Metal. Genuine overlay content.

## Scrim coupling (SECONDARY — non-blocking, carried note)

The modal scrim (reka `DialogOverlay` div, `sheet-animate` 0.55s) rises **concurrently from launch** with the panel (coupled — NOT the trailing-400ms HEAD defect) but reaches 80% dim at **~247–342ms**, not ~100ms. The wave's O4 fast-dim change targets `dialog.glass-top-layer[open]::backdrop` (a native `<dialog>`), which the `/containers` demo routes do not mount. This is **NOT part of this re-judgment's pass condition** (the descriptor binds the EXIT: "Dialog+Popover exit ≥4 no-overshoot frames"). The exit — the OWED verify — passes. The scrim ≤100ms fast-dim remains a note for a future wave should it choose to bind the reka overlay scrim (it would need its own launch-coupled fast enter clock, distinct from the native `::backdrop` O4 change).

---

## Engine provenance (intrinsic)

| Engine | UA | GL renderer | @starting-style |
|--------|----|-----------  |-----------------|
| Chrome/Blink | `...AppleWebKit/537.36 ... HeadlessChrome/148.0.7778.96 Safari/537.36` | `ANGLE (Google, Vulkan 1.3.0 (SwiftShader ...), SwiftShader driver)` | true |
| Safari/WebKit | `...AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Safari/605.1.15` | `Apple GPU` (Metal) | true |

Two genuinely distinct rendering engines exercised through their real style/animation machinery (the reka `usePresence` unmount-gate + the `@keyframes glass-reveal-out` recede both run under each engine's own animation engine).

## Capture manifest (on disk, all resolve)

- Frame-series JSON (12): `overlay-enter-paint-rejudge/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}.frames.json`
- Settled PNG (12, real 326KB–2.65MB): `overlay-enter-paint-rejudge/{chromium,webkit}-{light,dark}-{dialog,sheet,popover}-settled.png`
- Aggregate: `overlay-enter-paint-rejudge/{chromium,webkit}-ALL.json`
- Probe: `BG.W-OVERLAY-ENTER-PAINT-frameseries-rejudge.mjs`
- (Prior FAIL-run artifacts preserved for provenance under `overlay-enter-paint/`.)

Siblings tripwire `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).

---

## Prior FAIL (2026-07-04, SUPERSEDED by this PASS — kept for provenance)

The initial judgment (src `6911d48e`, ENTER `@starting-style` from-state landed) found the **Dialog + Popover EXIT painting 0 frames** in both engines both modes: reka `usePresence` (`node_modules/reka-ui/dist/Presence/usePresence.js:44`) dispatched UNMOUNT immediately when `getComputedStyle(node).animationName === "none"`, and the `.glass-reveal[data-state=closed]` exit was a CSS **transition** (animationName none), so the content was removed ~11ms after `data-state → closed` — the exit never painted. The mustFix was to give the exit an `animation-name` reka can await (`@keyframes glass-reveal-out`, the Sheet precedent). The F5.R1 repair (`a633784f`) did exactly that; this re-judgment confirms the exit now paints ≥4 no-overshoot frames in all 12 series.
