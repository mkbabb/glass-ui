---
"@mkbabb/glass-ui": minor
---

AU — dock-motion overhaul + the blob trio + modern-CSS folds (the 3.3.0 cut).

**Dock-motion overhaul (W8, the headline).** The FLIP fallback's layer ref-swap (→ opacity) and the
width set (→ morph) now share ONE rAF frame origin, closing the async fork in
`useLayerTransition.ts` that made the dock shrink a frame ahead of its contents fading. The resize
family rides a new `--spring-dock` token (ζ≈0.5, ~15-30% overshoot, authored by the in-tree keyframes
solver at build time — no new keyframes export). The driver is the LIGHT `SpringProgress.play()`
one-rAF loop (value.js-free — zero value.js enters the root bundle). The `DockLayerGroup` switcher
rail is now a reka-ui Tabs surface: `role=tablist`/`tab` + `aria-selected` (NOT `aria-pressed`),
roving tabindex (Arrow/Home/End), a travelling indicator, keep-open on tab focus, and post-swap focus
routing. New gates: `proof:dock-motion-single-source`, `proof:dock-a11y-contract`,
`proof:dock-vocabulary` (the `<Role>Dock` README convention); `proof:dock-opacity-lockstep` demoted to
the syntactic token-match half.

**Modern-CSS + encapsulation folds (W8b).** Native `@supports (interpolate-size: allow-keywords)`
width-morph + `transition-behavior: allow-discrete` + `@starting-style` arms layered over the
byte-unchanged FLIP fallback; the five dock CONTROL families carved from `dock.css` into a new
`dock-controls.css` rung; a 12-site design-idiom lift (arbitrary `text-[var]`/`shadow-[var]` wraps →
`@theme` utilities + new `transition-control`/`transition-collapse` `@utility` recipes + the
`text-muted-foreground-strong` bridge + `w-popover` token); `defineModel` ×8 across the SFC surface
with round-trip tests. New gates: `proof:dock-css-split`, `proof:design-idiom-localization`.

**The blob trio + `/color` + the WebGL substrate (W5-W7).** A value.js-only `/color` leaf (OKLCh
primitives + the injected `ColorResolver` seam + `oklchToGammaRgb` for the DEC-AT-7 gamma exit); a
generic `useWebGLCanvas` substrate owning the context lifecycle + `webglcontextrestored` self-heal +
demand-driven rAF (aurora refactored onto it, −110 net LOC); and two new subpaths — `/goo-blob`
(WebGL2 metaball, OKLCh-linear shader-quality, the injected resolver replacing the 1×1-canvas probe)
and `/watercolor-dot` (CSS/SVG, internalized per-instance filter + seeded prng). The metaball OKLCh
shader-color TS port is proven bit-identical to value.js's Ottosson CPU result to ~2e-16
(`proof:blob-color-equivalence` 8/8). The `proof:webgl-golden` pixel-golden stays DEFERRED (no
headless WebGL-live runner in CI; the CPU-equivalence + the aurora capture-render cover GPU
correctness — see `docs/tranches/AU/audit/proof-webgl-golden-DEFERRED.md`).

**W9 supply + dark-ergonomics.** Button `size="icon-sm"`, Select `size?: "sm" | "default"`, Dialog
`showClose?`, `ConfiguratorLayer` `dividers?` opt-in + `text-small` ladder titles, `darkModeSyncScript()`
parse-time FOUC primitive, and `useGlobalDark({ initialValue })`.

**Component splits + Fraunces (W4/W10).** Shipped the full variable Fraunces display face (resolving
the dangling `--font-stack-display` token); split the 901-line `ContinuousTimeline` orchestrator into
Timeline + Rail + Markers; extracted `useBouncySlider` from `BouncyToggle`.

**value.js peer (E-valuepeer) — sequencing note.** value.js is `0.10.0` on npm at this cut; the
in-tree `@mkbabb/value.js` peer + devDep stay `^0.10.0` so installs resolve today. The downstream
sequence publishes value.js `0.11.0` FIRST, then the peer bump `^0.10.0 → ^0.11.0` rides the cut — a
manifest-range precondition the user sequences at publish time, not a runtime change (the blob-color
contract is already proven bit-identical against value.js's CPU port).
