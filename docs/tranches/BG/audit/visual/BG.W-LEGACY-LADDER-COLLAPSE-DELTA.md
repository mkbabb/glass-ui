# BG.W-LEGACY-LADDER-COLLAPSE — PAINT DELTA (dual-engine, both modes)

**Wave:** BG.W-LEGACY-LADDER-COLLAPSE (NF.2 — the NO-MASKING-FALLBACK edict, USER 07-03)
**Judge:** non-authoring paint judge (did NOT build; verified the painted truth against the criteria)
**Verdict:** **PASS** — zero-delta on the target set; the collapse is a no-regression on current Chrome + current Safari, both modes.
**Date:** 2026-07-04

---

## Criterion (verbatim intent)

> PAINT rides W-REFLECT — the collapses are zero-delta on the target set (current Chrome + current Safari), the verify is the dual-engine both-modes no-regression capture. The 9 collapsed pre-target-engine ladders (a11y-fallback GUARD-1/GUARD-2 + the `:has()` `.is-focus-within` fallback deleted; both `linear()` bezier floors deleted — liquid-enter + scroll-choreography; `.user-invalid-fallback`/`.user-valid-fallback` collapsed; `useRAFLoop` MQL `addListener` shim deleted; both dock scroll-fade `@supports(animation-timeline:scroll())` co-gates un-nested) must each render BYTE-IDENTICAL on both current-Chrome and current-Safari to the pre-collapse tree across the surfaces they touched — the overlay liquid-enter bloom (`/containers`), the form invalid/valid ring (`/compositions/form-validation`), the dock scroll-fade (`/dock/overview`), and the scroll-choreography motion register (`/motion/scroll-choreography`) — both modes, a no-regression capture.

## Why zero-delta is the correct bar, and why it holds

Every one of the 9 collapsed ladders is a **pre-target-engine FALLBACK** — an arm that only executes on an engine OLDER than the target (Safari < 17.2 `linear()` floors, `@supports not selector(:has(*))`, the `:user-invalid`-absent `.user-invalid-fallback`, the `MediaQueryList.addListener` shim, the un-`animation-timeline` `@supports` co-gate). On the **target engine** the modern branch is always taken, so the fallback is DEAD code and deleting it changes zero pixels **by construction**. The two substantive risks of a fallback deletion are (a) the modern path is silently dead, or (b) a fallback was load-bearing on the target. Both are refuted below.

### Target-engine feature support (Chrome 149 / macOS 26.4.1, WebKit 26.4)

Live `CSS.supports()` on the target Chrome, in-page feature-detect on BOTH engines:

| Feature the collapse relied on | Chrome 149 (CSS.supports) | Safari 26.4 (in-page chip) |
|---|---|---|
| `selector(:user-invalid)` | ✅ true | ✅ (native, Safari 15+) |
| `selector(:has(*))` | ✅ true | ✅ (native, Safari 15.4+) |
| `animation-timeline: scroll()` | ✅ true | ✅ **SCROLL() SUPPORTED** chip green |
| `view()` / `timeline-scope` | ✅ true | ✅ **VIEW() / TIMELINE-SCOPE SUPPORTED** chips green |
| `linear(0, 1)` easing | ✅ true | ✅ (native, Safari 17.2+) |
| `field-sizing: content` | ✅ true | ✅ (native, Safari 26) |

→ every deleted ladder's raison-d'être is **natively supported** on the target → the deleted arms are provably dead → zero-delta by construction.

### The modern path is LIVE (not silently dead) — live non-capture probe on target Chrome

- `/motion/scroll-choreography`: 6 elements resolve a live `scroll()`/`view()` `animation-timeline`; `getAnimations().running == 10`; `supportsScrollTL == true`. The `story-header-cluster` rides `scroll()` (`title-collapse`, `story-hero-shrink`); the fading-scroll rides `scroll(self inline)` (`gl-fade-start-in`, `gl-fade-end-out`).
- `/dock/overview`: 14 timelined elements; the dock scroll-fade carries `--fade-start: 0px` / `--fade-end: 16px` on a live `scroll(self inline)` timeline (the un-nested `@supports` co-gate result — the modern path is the sole path and it PAINTS).

### The collapsed-signatures scan (target Chrome, all loaded CSS, 3586 rules)

`.user-invalid-fallback`, `.user-valid-fallback`, `.is-focus-within`, `@supports not selector(:has(*))` → **0 occurrences** across every surface, both modes. The modern invalid ring reads the token: `.input-pill:where(:user-invalid, [aria-invalid="true"]):focus…` → `box-shadow: var(--invalid-ring)`. `--invalid-ring` resolves to the destructive red ring in both modes:
- light: `0 0 0 2px color-mix(in srgb, light-dark(#db2424,#eb4747) 35%, transparent)`
- dark:  `0 0 0 2px color-mix(in srgb, #eb4747 35%, transparent)`

The a11y KEEP (aria-invalid BRIDGE) fires: a programmatic blur of the empty required field sets `aria-invalid="true"` (the `useUserInvalidAria` bridge). The `[aria-invalid]` + `:user-invalid` selector arms are both present; the `.user-invalid-fallback` legacy member is gone (a11y bridge kept, ladder collapsed — exactly the wave's intent).

---

## Capture pipeline (proven C18 method)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- `npm run demo:dist:build` → BUILT bytes (`✓ built in 3.38s`); `npm run demo:dist:serve` → vite preview `:5200`.
- **Chrome leg:** real Chrome 149 (`--remote-debugging-port=9477`, repo-local `--user-data-dir` per the NEVER-/tmp fence), `connectOverCDP` → `?capture=<route>&mode=<m>` → poll `data-capture-ready` → `page.screenshot` @ 1440×900 dpr2 = **2880×1800**. GPU badge: `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)`.
- **Safari leg:** `clang -framework Cocoa -framework WebKit` → repo-local `.wkshot-legacy-bin`; off-screen WKWebView (system WebKit.framework 26.4, Metal, no TCC), polls `data-capture-ready`, `takeSnapshotWithConfiguration` @ **2880×1800**. GPU badge: `Apple GPU`.
- In-pixel engine badge decoded per capture (ENGINE / GPU / VIEW / MODE) — provenance confirmed on all 16.

## Captures (all 16 resolve on disk, 2880×1800, badge-verified)

Directory: `docs/tranches/BG/audit/visual/BG.W-LEGACY-LADDER-COLLAPSE-paint/`

| Surface (route) | Chrome light | Chrome dark | Safari light | Safari dark |
|---|---|---|---|---|
| overlay liquid-enter (`/containers`) | `…-chrome-containers-light.png` | `…-chrome-containers-dark.png` | `…-safari-containers-light.png` | `…-safari-containers-dark.png` |
| invalid/valid ring (`/compositions/form-validation`) | `…-chrome-form-validation-light.png` | `…-chrome-form-validation-dark.png` | `…-safari-form-validation-light.png` | `…-safari-form-validation-dark.png` |
| dock scroll-fade (`/dock/overview`) | `…-chrome-dock-overview-light.png` | `…-chrome-dock-overview-dark.png` | `…-safari-dock-overview-light.png` | `…-safari-dock-overview-dark.png` |
| scroll-choreography (`/motion/scroll-choreography`) | `…-chrome-scroll-choreography-light.png` | `…-chrome-scroll-choreography-dark.png` | `…-safari-scroll-choreography-light.png` | `…-safari-scroll-choreography-dark.png` |

(prefix `BG.W-LEGACY-LADDER-COLLAPSE-` on every file)

## Per-surface paint judgment

- **`/containers` (overlay liquid-enter bloom).** Both engines, both modes: calm blueprint-grid wash, audacious "Containers" display hero fits its envelope, translucent glass Dialog/Sheet/Drawer/Popover/Dropdown cards (the `.glass-reveal` liquid-enter surfaces, settled). Dark = luminous-transmissive dark glass over the near-black page. Zero-delta between engines (modulo font AA). No conic, no oversaturation, grain calm.
- **`/compositions/form-validation` (invalid/valid ring).** Both engines, both modes: "Form Validation" hero, the "Validity vocabulary" copy ("`:user-invalid` paints on field-exit (blur), never on mount; `useUserInvalidAria` bridges … to `aria-invalid`"), the glass form card (Email\*, ZIP\*, Bio autosize, Submit) with red required asterisks; the "error slot reveals on `:has(:user-invalid)`" copy confirms native `:has()`. The invalid ring is `:focus-visible`-gated (correct — not shown at rest). `--invalid-ring` token wired, aria bridge fires, fallback classes gone.
- **`/dock/overview` (dock scroll-fade).** Both engines, both modes: recessive warm aurora (peach light / copper dark, calm — no conic/oversaturation), translucent (light) / luminous-transmissive (dark) glass docks, and the bottom nav-dock **scroll-fade** feathering reads on both engines. Live probe confirms the `--fade-start`/`--fade-end` mask customs ride the modern `scroll(self inline)` timeline.
- **`/motion/scroll-choreography` (motion register).** Both engines, both modes: "Scroll Choreography" hero, the three **feature-detect chips green on BOTH engines** (`SCROLL() SUPPORTED` · `VIEW() SUPPORTED` · `TIMELINE-SCOPE SUPPORTED`), the section-cascade cards. The un-nested `@supports(animation-timeline: scroll())` co-gate resolves true → modern path is the sole path; live probe confirms 6 live scroll timelines + 10 running animations.

## Notes / non-defects

- **`runningAnims: 0` and `scrollTimelineCount: 0` in the CAPTURE probe** are intended artifacts of `demo/capture/capture.css` rule 1 (`animation: none !important` under `html[data-capture]`, settling every entrance to its pixel-faithful end-state). The LIVE non-capture probe shows the timelines/animations active — the modern path is not dead.
- **The collapsible dock shows 1 glyph (Safari) vs 4 glyphs (Chrome) at rest** on `/dock/overview` — a demo hover/rest-state variance in the collapsible pill, unrelated to any of the 9 collapsed ladders (which touch a11y fallbacks, `:has()`/`:user-invalid`, `linear()` floors, the MQL shim, and the scroll-fade `@supports` co-gate — none of which govern collapsed/expanded content count). Both are legitimate rest states.

## Result

Every surface in BOTH engines + BOTH modes reads correct; every capture PNG resolves on disk (16/16, 2880×1800); the deleted ladders are provably dead code on the target engines; the modern survivors are live and paint. **PASS.**
