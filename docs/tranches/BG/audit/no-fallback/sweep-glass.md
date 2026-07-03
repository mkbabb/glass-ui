# NO-FALLBACK SWEEP — GLASS facilities (tranche/BG @ 9ff29402)

Scope: `src/styles/glass/*.css`, `src/styles/tokens/{glass,glass-deep,glass-fx,dark-arm,light-dark,property-regs}.css`,
`src/styles/glass-refract.css`, `src/components/custom/glass-panel/`, `src/composables/glass/**`
(useGlassRenderer · useWebGLCanvas · useGpuSubstrate · useGlassBackdropLuminance · specular family),
`.glass-reveal` / `.glass-lens` / adaptive-legibility seams.

Rubric: MASKING (excise / fail loud) · LEGACY-LADDER (collapse; targets = current Chrome ~147+ + Safari 26+)
· CROSS-ENGINE-GAP-TODAY (recorded design, flagged owner) · REAL-DUAL-MECHANISM (keep, one-line justification).

---

## MASKING (the drawer-referent class — a default that lets a dead primary appear to work)

### M1 — `.glass-clear` "MANDATORY" legibility scrim resolves 0% unwired; the `0.5` fallback is DEAD CODE
- **Site:** `src/styles/glass/material.css:459-461` — `--glass-clear-scrim-strength: calc(var(--glass-backdrop-luma, 0.5) * 40%)`.
- **Mechanism:** `--glass-backdrop-luma` is a REGISTERED `@property` with `initial-value: 0`, `inherits: true`
  (`src/styles/tokens/property-regs.css:329-333`). A registered property is never guaranteed-invalid, so the
  `var(…, 0.5)` fallback CANNOT fire on any target engine — the comment's "safe mid-scrim when no observer is
  wired" is dead text. An unwired `surface="clear"` computes `calc(0 * 40%) = 0%`: the scrim the design calls
  MANDATORY ("a scrim-less clear surface is FORBIDDEN", useSurfaceAxis.ts:40-42, tokens/glass.css:214-225)
  **paints nothing**.
- **Writer reality:** the only `--glass-backdrop-luma` writer is `useGlassBackdropLuminance`
  (useGlassBackdropLuminance.ts:338), wired ONLY on the dock (`GlassDock.vue:86`) + two demo stories. Zero
  `surface="clear"` consumers exist in demo/, none wires the observer.
- **Gate hole:** `proof:glass-foundation` A3 asserts the RULE carries a scrim **source-textually**
  (scripts/proof-glass-foundation.mjs:254-312) — it greens over the resolved-0% paint.
- **VERDICT: MASKING — EXCISE.** Either (a) give the clear scrim a real static floor (a literal ≥N% term the
  luma can only LIFT), or (b) make the scrim strength a non-registered channel so a designed fallback can
  actually fire — and add a resolved-strength π bite (an unwired `.glass-clear` over white must paint a
  measurable dim, or the gate REDs).

### M2 — the "continuous earned darken" clamp has NO writer on the content/overlay band
- **Sites:** `src/styles/glass/ladder.css:337-345` (content tiers), `:272-280` (overlay band) —
  `--glass-tint-strength: clamp(floor, floor + (aa-floor)·max(0,(var(--glass-backdrop-luma,0)-knee)/(1-knee)), aa)`.
- **Mechanism:** ladder.css:334-336 canonizes the clamp as THE strength driver ("RETIRES the discrete
  `@container --glass-backdrop: light` bucket as the strength driver"). But the sole library writer of
  `--glass-backdrop-luma` runs on the DOCK only (GlassDock autoLuminance; the observer is recorded
  demo-private in glass-fx.css:202-208 — "the OBSERVER that sets it stays demo-private until a 2nd consumer").
  On every content-tier Card and every overlay-band Dialog/Popover/Sheet in every consumer, luma is the
  registered initial 0 forever → the ramp is 0 → the plate holds the calm floor (4% light / 12% dark). A
  bright-backdrop modal silently misses the AA darken; nothing errors.
- **Gate hole:** `tests-visual/adaptive-glass-live.spec.ts:372-389` INJECTS `--glass-backdrop-luma`
  synthetically ("inject the measured luma") — it proves the clamp READS, never that a writer FIRED on the
  band. The declarative `@container style(--glass-backdrop: light)` bucket (ladder.css:194-212) remains the
  only real bright-signal path for non-dock surfaces — i.e. the thing the canon says was retired as driver.
- **Contradictory canon on disk:** glass-fx.css:202-208 (bucket is the default path, observer demo-private)
  vs ladder.css:334-336 (clamp subsumes the bucket).
- **VERDICT: MASKING — flag for an explicit design decision** (owner: the BG adaptive/legibility wave —
  GLASS-LEGIBILITY-MEASURED). Either wire an observer (or an ancestor-luma inheritance contract) for the
  overlay band, or re-canonize the bucket as the band's driver and demote the clamp to the dock scope. The
  calm-floor rest itself is a legitimate rest value ONLY once the driver question is decided.

### M3 — the `--specular-angle` edge-glint channel is writer-LESS; the π is vacuous
- **Sites:** `src/styles/glass/material.css:233` — `conic-gradient(from var(--specular-angle, 0deg) …)`;
  `src/composables/glass/useSpecularPointer.ts:78` (the ONLY writer, `--specular-angle` computed via atan2).
- **Mechanism:** `useSpecularPointer` has ZERO consumers in src/ or demo/ (grep: only its own file + the
  `/glass` barrel re-export). The barrel comment (composables/glass/index.ts: "The hover/button waves consume
  this leaf for the motion-reactive rim glint") is FALSE on disk. Every glass surface paints the
  BB.W-LENSING "motion-reactive EDGE glint" pinned at the `0deg` rest forever — a static top-edge arc that
  wakes with the hover intensity lift, so the feature LOOKS alive while the motion-reactivity is dead.
- **Gate hole:** `tests-visual/lensing.spec.ts:175` — `expect(typeof swept.angle).toBe("string")` — a
  tautology (`getPropertyValue` always returns a string); the comment defers "the binding angle-tracking" to
  W-REFLECT3, which never landed a consumer.
- **VERDICT: MASKING — EXCISE.** Either wire the angle write into the ONE tier delivery (vSpecular gains the
  angle sink — single-writer discipline holds) or retire the conic's angle axis; and replace the typeof-string
  assert with a two-position distinct-angle assert (the liquid-hover.spec.ts:82 pattern) so a writer-less
  channel REDs.

### M4 — `--glass-backdrop-hue` (the GD3 iOS-27 catch-light hue pickup) is a dead channel with a name-mismatch
- **Sites:** `src/styles/glass/material.css:229` — `var(--glass-backdrop-hue, transparent)
  var(--glass-backdrop-hue-strength, 0%)` inside `--glass-specular-core`.
- **Mechanism:** material.css:210-214 claims "`useGlassBackdropLuminance`'s companion write
  `--glass-backdrop-hue`". FALSE on disk: the observer writes `--glass-ambient-hue`
  (useGlassBackdropLuminance.ts:344) — a DIFFERENT channel (the BE.W-AMBIENT-TINT pair, tokens/glass.css:411),
  and nothing anywhere writes `--glass-backdrop-hue` OR sets `--glass-backdrop-hue-strength` above 0%
  (repo-wide grep: readers + gate prose only). The neutral defaults (`transparent`/`0%` → the outer mix is a
  byte-identical no-op) make the dead channel invisible by construction.
- **Gate hole:** `proof:glass` GD3 (scripts/proof-glass.mjs:589-593) asserts the seam TEXT exists with neutral
  defaults — it greens on prose; it cannot see that no writer exists.
- **VERDICT: MASKING — EXCISE.** Either bridge the observer's `--glass-ambient-hue` into the catch-light seam
  (one hue channel, not two names) or delete the GD3 seam until its writer lands; fix the false comment either
  way. A gate bite: the dock-over-chromatic-aurora π must read a non-transparent core hue where the
  observer is wired, or the seam is declared dormant-by-design in the token comment (not "the observer writes it").

---

## LEGACY-LADDER (fallback arms that serve only pre-target engines — collapse, clean break)

### L1 — the `:has()`-less `.is-focus-within` arm: dead CSS whose JS half was already deleted
- **Site:** `src/styles/glass/a11y-fallback.css:246-251` (`@supports not selector(:has(*))`).
- **Evidence:** `:has()` is Chrome 105+ / Safari 15.4+ — far below both targets. WORSE: the comment claims a
  "≤6-LOC focusin/focusout guard in `Card.vue`" toggles `.is-focus-within`; repo-wide grep finds NO toggler —
  the only `.is-focus-within` hits are this file. The arm is doubly dead (pre-target gate + orphaned class).
- **Verdict:** collapse — delete the arm + the stale comment; `.glass-card:has(:focus-visible)`
  (surfaces.css:89) is the sole mechanism.

### L2 — GUARD 1: the no-backdrop-filter opaque plate
- **Site:** `src/styles/glass/a11y-fallback.css:187-206`.
- **Evidence:** engines supporting NEITHER `backdrop-filter` form are pre-target by years (Chrome 76+,
  Safari 9+ prefixed/18 unprefixed, and targets are 147/26). The arm serves no target engine.
- **Verdict:** collapse per the no-legacy law (or re-justify as the forced-degrade floor for embedded
  webviews — if so, record WHICH device set, else it is a hedge).

### L3 — GUARD 2: the webkit-only (Safari ≤17) re-statement
- **Site:** `src/styles/glass/a11y-fallback.css:217-236`.
- **Evidence:** self-described "Safari ≤17" — nine majors below the Safari-26 target; the body re-states the
  base rung backgrounds byte-equivalently ("document-and-confirm"), i.e. a no-op arm carried as documentation.
- **Verdict:** collapse (documentation belongs in a comment, not a live `@supports` arm).

### L4 — the Safari <17.2 `linear()` cubic-bezier floor
- **Site:** `src/styles/glass/liquid-enter.css:209-221` (`@supports not (animation-timing-function: linear(0,1))`).
- **Evidence:** the comment names "before Safari 17.2" verbatim; target is Safari 26+. The spring `linear()`
  curves parse on both targets; the bezier floor arm paints for no target engine.
- **Verdict:** collapse.

### L5 — the `.dark {}` COLOR-witness table (the light-dark() fallback floor)
- **Sites:** `src/styles/tokens/light-dark.css:85` (the `@supports (color: light-dark(white, black))` canon
  block) + `src/styles/tokens/dark-arm.css` (the duplicated color values, e.g. :60-, :100-145).
- **Evidence:** `light-dark()` is Chrome 123+ / Safari 17.5+ — both targets take the light-dark() path;
  the `.dark {}` COLOR re-declarations are recorded as "fallback-floor LOCKSTEP WITNESSES only"
  (dark-arm.css:20-28) and are held byte-equal by `proof:glass` DA1. A full duplicated color table +
  a lockstep gate, maintained for engines below the target set — the definition of a carried ladder.
- **Scope fence:** `.dark { color-scheme: dark }`, `accent-color` re-specify, and the SHADOW/INSET/`.dark`
  plain arms are NOT part of this ladder (light-dark() structurally cannot carry shadows — the inset-shadow
  trap; those arms are the primary home, keep).
- **Verdict:** collapse candidate — light-dark() as the SOLE color source, delete the witnesses + DA1's
  lockstep clause. (Design decision: this reverses a BG.W-GLASS-BASIS-CONSOLIDATE recorded keep — flag to
  the orchestrator rather than auto-excise.)

### L6 — GlassPanel's three-tier JS glass ladder (`svg-filter | css | fallback`) — the second lens engine
- **Sites:** `src/composables/glass/useGlassRenderer.ts:21-34` (detectTier — incl. the `!!(window as any).chrome`
  UA sniff), `:147-230` (createGlassFilter), `src/components/custom/glass-panel/GlassPanel.vue:62-123` +
  scoped `--fallback` CSS (:165-184).
- **Evidence:**
  - The `fallback` arm (no backdrop-filter) serves only pre-target engines AND duplicates GUARD 1's global floor.
  - The `svg-filter` arm — DEFAULT-ON for Chromium via auto-detect — is a SECOND hand-rolled JS lens engine
    (canvas-baked displacement map, per-element SVG mount, `toDataURL()` re-bake on EVERY resize) duplicating
    the shipped `.glass-lens` data-URI register (glass-refract.css), the exact resize-expensive path
    DDR-LENS-BAKE forbids — dual-path shelf-ware under the no-dual-path law.
  - Its inline styles bypass the ENTIRE glass token system: `el.style.backdropFilter = url(#id) blur() saturate(1.6)
    brightness(1.05)` ignores `--glass-level` (the reduced-transparency/forced-colors opaque escape NEVER
    reaches a svg-filter GlassPanel), the W55 tint seam, and dark mode; `border: 1px solid rgba(255,255,255,0.25)`
    + white inset shadows are hardcoded light-mode whites (useGlassRenderer.ts:203-212).
- **Verdict:** LEGACY-LADDER — collapse GlassPanel onto the CSS tier ladder + (optionally) `.glass-lens` for the
  Chromium refinement; delete `detectTier`/`createGlassFilter`/`destroyGlassFilter` + the `renderTier` prop.
  (AZ.W-PRUNE2 restored the cluster component-local because keyframes.js binds `/glass-panel` — the SUBPATH
  survives the collapse; only the JS ladder dies.)

### L7 — `.user-invalid-fallback` class arm (minor, form-control REST register)
- **Site:** `src/styles/glass/control-surfaces.css:103-129`.
- **Evidence:** `:user-invalid` is Chrome 119+ / Safari 16.5+ — both targets ship it; the fallback class serves
  pre-target engines only (documented as "the SOLE fallback … for engines without `:user-invalid`").
- **Verdict:** collapse the class member (the `[aria-invalid="true"]` member is NOT legacy — it is the
  programmatic-invalid axis, keep).

---

## CROSS-ENGINE-GAP-TODAY (real gaps on a target engine — the base IS the design, recorded)

### G1 — `backdrop-filter: url(#glass-refract)` is Chromium-only
- **Site:** `src/styles/glass-refract.css:106-111` (`@supports (backdrop-filter: url("#glass-refract"))`).
- **Evidence:** WebKit bug 245510 open — Safari 26 cannot `backdrop-filter: url()`. The un-gated blur+tint
  base is the recorded design on WebKit (the file header: "a non-supporting engine paints the un-gated blur
  base alone — the no-workaround degrade floor, PRESERVED").
- **Verdict:** KEEP, correctly recorded. Owner of the gap: the booked W-LENSING encoding/chromatic-aberration
  successor. No action.

### G2 — `corner-shape: superellipse(2)` squircle (Chrome 139+; no Safari/FF 2026)
- **Site:** `src/styles/glass/squircle.css:41-55`.
- **Evidence:** in-file record: "an `@supports`-gated ENHANCEMENT (Chrome 139+, no FF/Safari 2026) over the
  `border-radius` round CONTRACT — the squircle is the better tier, NOT a degraded fallback."
- **Verdict:** KEEP — the round contract is the chosen design on WebKit. Owner: recorded in-file (AX.W56).

### G3 — `contrast-color()` ink flip (the exact frontier)
- **Site:** `src/styles/glass/ladder.css:361-413` (`@supports (color: contrast-color(white))`).
- **Evidence:** Chrome 147+/Safari 26+ — the literal target edge; sub-147/sub-26 engines are still current in
  the wild. The gate is LOAD-BEARING beyond age: un-gated `--foreground: contrast-color(…)` custom-property
  assignment does NOT parse-drop on a non-supporting engine (custom props accept any token stream) — every
  `var(--foreground)` would go guaranteed-invalid. The declarative bucket darken is the AA floor on all
  engines (ratified, Open-Q #5).
- **Verdict:** KEEP the gate; revisit collapse only when the frontier is fully behind both targets AND the
  custom-prop hazard is re-solved (it will not be — the gate stays structural).

---

## REAL-DUAL-MECHANISM (both paths load-bearing — KEEP, justified)

### D1 — WebGPU-first + WebGL2 try-then-rebuild (`useGpuSubstrate`)
- **Site:** `src/composables/glass/webgpu/useGpuSubstrate.ts:17-35` (+ webgpuDevice.ts device.lost self-heal).
- **Justification:** the WebGL2 leg serves a COMMITTED device set (the ~5-10% tail + the
  `requestAdapter()`-null headless/blocklist class — the fixed "no GPU adapter" black-void); the `backend`
  field resolves to the ACTUAL backend (observable, not silent), and `proof:gpu-substrate-single` bounds
  WGSL↔GLSL parity (OKLab ΔE mean≤2.0/p99≤5.0) so a broken WGSL leg cannot hide behind the fallback.

### D2 — the specular position write: CSS centred rest + JS pointer writer
- **Sites:** `src/styles/glass/material.css:149-150` (`--specular-x/y: var(--mouse-x, 50%)`),
  `createSpecularWriter`/`vSpecular`/`useSpecularTracking`.
- **Justification:** CSS structurally cannot know the pointer position; the centred value is the designed PRM
  pin (the writer deliberately skips under reduce — useSpecularTracking.ts:104-106) + the pre-first-pointermove
  rest. The writer-fired proof EXISTS and is sharp: `tests-visual/liquid-hover.spec.ts:82-127` asserts two
  pointer positions read two DISTINCT `--mouse-x` off the dead-centre 50% on Button AND a dock control;
  `button-glass.spec.ts` (c) mirrors it. The masking shape is gated — KEEP.

### D3 — the press: CSS `:active` floor + `--glass-btn-press-t` spring drive
- **Sites:** `src/styles/glass/material.css:169-172` (soft-gated `max(rest, active·press-t)`),
  `src/styles/glass/surfaces.css:305-311` (the `:active` spring LERP).
- **Justification:** the CSS `:active` intensity/scale floor is the DOCUMENTED no-JS floor (W-PRESS-UNIFY —
  load-bearing for every glass surface that never composes `useSpringPress`, and pre-hydration); the spring
  drive adds release-settle physics CSS cannot express. Registered `initial-value: 0` keeps the unwired read
  byte-identical (no false lift). The frame-series π (press-unify/button-glass) proves the spring fires. KEEP.

### D4 — the backdrop sampler: animated-canvas read ?? static stack-walk
- **Site:** `src/composables/glass/useGlassBackdropLuminance.ts:360` (`sampleAnimated(el) ?? sampleStatic(el)`).
- **Justification:** two genuine samplers for two backdrop CLASSES (a live `<canvas>` needs the
  downsample+getImageData read; a static page needs the elementsFromPoint paint-layer walk) — there is no web
  API that reads pixels behind a `backdrop-filter`, so the chain is the sanctioned proxy. NOTE: a
  tainted/zero-size canvas silently degrades to the static walk (a wrong-but-plausible luma over a live
  aurora); acceptable while the observer is dock+demo-scoped, worth a one-line bite if it is ever promoted.

### D5 — `--accent-ink: var(--accent-ink-resolved, var(--foreground))` (the contrast-safe chip ink)
- **Site:** `src/styles/glass/accent-tone.css:64`; writer `useAccentTone` → value.js `safeAccentColor`
  (useAccentTone.ts:139), statically wired in `SelectableChip.vue:27`, gate-locked (proof:accent-tone A2/A5).
- **Justification:** "CSS cannot call value.js at the token tier" — the warm-ink fallback is the sanctioned
  floor, the JS half is live-wired + gate-imported. **THIN-DUAL FLAG:** both targets now ship
  `contrast-color()`; `contrast-color(var(--accent-band))` computes the same contrast-safe ink natively.
  Collapse candidate onto the platform primitive (same anchoring discipline as ladder.css:361) — flag for a
  design decision, not an auto-keep.

### D6 — `.glass-reveal` transform-origin: `var(--reka-popper-transform-origin, center)`
- **Site:** `src/styles/glass/reveal.css:61`.
- **Justification:** `center` is the DESIGN for non-popper surfaces (a centered Dialog has no anchor edge);
  the reka popper write is the anchored case. Not a degrade — two legitimate anchoring modes. KEEP.

---

## Swept and CLEAN (no finding)

- `glass/deep.css` + `tokens/glass-deep.css` — `--glass-depth` lerp: a registered scalar with a terminal
  DECIDED header (16px ceiling, GA-7); the token-substitution decoration model; no fallback arms.
- `glass/defined.css` — the substitution-trap re-declare is the documented CORRECT pattern (re-resolve at the
  definition-1 element); `var(--glass-defined-plate, var(--glass-plate-tinted))` is a designed default mapping.
- `glass/grain-overlay.css:45` — `var(--glass-grain-engage-duration, 120ms)`: token declared (glass-fx.css:36);
  the always-present `background-image` + opacity-only engage is the anti-pop design; PRM carve present.
- `glass/ladder.css:194` `@container style(--glass-backdrop: light)` — style queries are Chrome 111+/Safari 18+
  (both targets); the no-wrapper graceful-drop note is prose about pre-target engines, no authored arm.
- `glass/surfaces.css:32-39` `@utility glass-fill` — `var(--glass-fill-rung, var(--glass-bg-resting))` is a
  designed default rung; the element-level compose is the substitution-trap kill (correct).
- `material.css:277-294` mask-image (Baseline 2023) + `mix-blend-mode: plus-lighter` (Safari 16.4+) — both
  target-supported; the degrade notes are prose only, no fallback arm authored.
- `glass/a11y-fallback.css:12-173` — the reduced-transparency / prefers-contrast / forced-colors brackets are
  ACCESSIBILITY arms (user-preference adaptation), not capability fallbacks — out of the masking/legacy classes
  by construction; the `--glass-level` one-knob routing is the sanctioned shape.
- `reveal.css` data-state closed/open — the closed snapshot is the genuine rest; reka drives data-state
  (a dead reka binding leaves the surface invisible → fails loud in paint).
- `createCanvasLifecycle.ts:207` `respectReducedMotion ?? mode !== "capture"` — capture-mode determinism is a
  design default; `:244/:262` `reducedMq?.matches ?? false` — SSR guards; `visibility.ts:223` rootMargin
  default — option defaults, not fallbacks over a primary.
- `useWebGPUCanvas.ts:247-248` `frameHooks?.shouldContinue() ?? false` — fail-CLOSED (absent hooks stop the
  loop, never silently run).
- `tokens/light-dark.css:17-22` pointer-coarse / `:34-38` 2dppx blur restore — device adaptation, not fallback.
- `glass/liquid-fill.css`, `glass-capsule.css`, `glass-chip.css`, `progress-rail.css`, `rim.css:102`,
  `surface-axis.css` — designed `var(…, default)` token mappings only; no @supports arms, no dead writers found.
- `glass-atom.css:49` `var(--accent-fill-strength-in, 0%)` floored by `--atom-tint-floor` — the floor is the
  design (the atom carries chroma on a dead ground BY INTENT — the un-maskable direction).

## Cross-cutting observations

1. **The registered-@property-kills-var()-fallback trap** (M1 is the live instance): once a custom property is
   registered with an `initial-value`, EVERY `var(--x, fallback)` fallback for it becomes dead code on target
   engines. The codebase mixes both idioms for the same channel (`--glass-backdrop-luma, 0` in ladder.css —
   harmlessly identical; `, 0.5` in material.css — silently wrong). A device-free gate could lint: a var()
   fallback on a registered property MUST equal the registration's initial-value, else RED.
2. **Two chromatic-hue channels with one writer** (M4): `--glass-ambient-hue` (written) vs
   `--glass-backdrop-hue` (read) — a name-seam split across two waves (BE.W-AMBIENT-TINT vs
   BG.W-GLASS-DYNAMICS) that no gate can see because both default neutral.
3. **Source-text gates green over dead channels** (M1/M3/M4 all share it): proof:glass GD3,
   proof:glass-foundation A3, and lensing.spec's typeof-string assert each verify PROSE/SHAPE, not that a
   writer fired — exactly the close-class the sharpened no-fallback edict targets.
