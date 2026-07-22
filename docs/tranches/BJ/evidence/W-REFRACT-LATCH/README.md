# BJ.W-REFRACT-LATCH — evidence (BAND-MATERIAL W8)

The WebKit `@supports` gate-lie repair: the lying `@supports (backdrop-filter: url(#…))`
gate on `.glass-lens` replaced by a runtime latch with a functional probe.

## Born-RED re-proven at HEAD `2ad97ca1` (before the fix)

`refract-lens-never-sharper.spec.ts` on `--project=webkit`:

```
webkit: @supports=true · 3 samples, worst 91.9% (all: 91.9%, 90.9%, 90.6%) ·
witness scene 0.0862 · blur-only twin 0.0018 · lens 0.0794.
Expected <= 0.12 · Received 0.9187
```

WebKit returns `@supports = true` (the lie), then drops the whole `url()` value at paint —
`.glass-lens` shipped with NO backdrop-filter, reading 0.0794 SHARP against its
0.0018-frosted blur-only twin (91.9% of scene energy). The `test.fail()` EXPECTED-RED
marker was live.

## The fix

- `src/styles/glass-refract.css` — the `@supports (backdrop-filter: url("#glass-refract"))`
  wrapper DELETED; the composite moved behind the runtime latch
  `:root[data-glass-refract="on"] .glass-lens`. The un-gated blur base is unchanged.
- `src/composables/glass/supportsBackdropRefract.ts` — the latch. `armGlassRefract()` sets
  `:root[data-glass-refract="on"]` once per session, honesty-ordered: SSR guard → the
  engine must claim url() → it must reject a garbage value (happy-dom/jsdom shim guard) →
  the FUNCTIONAL arm. The accept-and-drop class (WebKit) passes every supports/computed
  read, so it is discriminated only functionally: canvas 2D `ctx.filter = url(#f)` rides the
  same url()-referenced-filter raster path — Chromium applies it, WebKit drops it.
- `demo/main.ts` — the single root-level `armGlassRefract()` bootstrap (`sideEffects:
  ['*.css']` prunes module-load side effects, so the arm is explicit, kin to
  `installDarkModeSync`).
- `tests-visual/refract-lens-never-sharper.spec.ts` — `test.fail()` marker dropped; the
  invariant is now a STANDING lock GREEN on both engines. Blind-capture recovery added (see
  below).

## GREEN after the fix

- `gate-webkit-GREEN.json` / `gate-chromium-GREEN.json` — the gate machine report, 2 passed
  on both engines. Re-verified for stability: WebKit solid every run; chromium 26/26 clean
  after the blind-capture recovery landed (pre-recovery ~10% flake, see below).

## §π/DELTA — the latch-ON discrimination proof

`latch-discrimination.json` + `latch-on-{chromium,webkit}.png`. The SHIPPED functional arm
run in-page on both engines over the striped scene:

| engine   | `@supports` | armed | `data-glass-refract` | lens computed `backdrop-filter` |
|----------|-------------|-------|----------------------|---------------------------------|
| chromium | true        | TRUE  | `on`                 | `blur(7px) saturate(1.4) url("data:…` (refraction) |
| webkit   | true (LIE)  | FALSE | (unset)              | `blur(7px) saturate(1.4)` (blur degrade) |

Both engines return `@supports = true`; the functional arm DEFEATS the lie — Chromium arms
ON (the lens composes the `url()` refraction), WebKit stays OFF (the lens degrades to its
blur base, no dropped `url()` — the intended Safari-floor degrade RESTORED).

- `latch-on-chromium.png` — a valid visual (chromium screenshots are not blind): both chips
  fully frosted, refraction active.
- `latch-on-webkit.png` — the stripes show THROUGH the chips because WebKit `page.screenshot()`
  is backdrop-filter-BLIND (the exact reason the gate reads a decoded VIDEO frame, not a
  screenshot). WebKit's truth is the computed style above (blur, no url()) + the video-path
  gate GREEN — NOT this blind screenshot.

The latch-OFF degrade proof is the gate itself: its harness never arms the latch, so
`.glass-lens` degrades to its blur base on BOTH engines and reads at its blur-only twin —
the GREEN it now passes.

## Blind-capture recovery (harness robustness)

The correct blur-degrade removed the heavy `url()` filter that had incidentally stabilized
the chromium-headless video capture, exposing a pre-existing ~10% blind-capture race (whole
recording unpainted, or the scene painted but `backdrop-filter` never settled). The gate now
re-captures a provably-blind screencast up to 4× (instrument recovery — NOT a verdict retry;
the assertion is never re-run, only an unpainted/unfrosted recording is refused). A blind
capture never carries a painted sharp lens, so recovery can never manufacture a GREEN, and a
genuinely broken instrument still reds LOUD after the attempts. CI is unaffected either way:
CI runs only `substrate-paints-color` on chromium and does not install WebKit; this gate is a
local/wave WebKit verification.
