# N.W4 ε — Performance audit (READ-ONLY)

**Tranche tip:** `ffc02a9` (N.W2 close — `feat(tranche-n/w2): Configurator density CVA + N7 dock-blur audit (NO-OP) → v1.1.3`).
**Baseline:** M-close (commit `54a8acb`) — figures pulled from `docs/tranches/K/audit/W4-bundle-profile.json` history + the K.W4 baseline footprint cited in the dispatch.
**Scope:** does N's substrate-touch surface any runtime regression vs. the M-close baseline?

---

## 1. Bundle size delta — M-close → N-close

Source: `docs/tranches/K/audit/W4-bundle-profile.json` (generated `2026-05-14T05:49:47Z`, status `pass`).

| File                | M-close raw | N-close raw | Δ raw       | M gzip   | N gzip   | Δ gzip      | Budget (raw / gzip) | N-close headroom (raw / gzip)    |
| ------------------- | ----------: | ----------: | ----------: | -------: | -------: | ----------: | ------------------: | --------------------------------:|
| `dist/glass-ui.js`  | 123 754     | 127 644     | **+3 890**  | 22 156   | 22 886   | **+730**    | 190 000 / 33 700    | 62 356 (32.8 %) / 10 814 (32.1 %) |
| `dist/glass-ui.css` | 22 220      | 32 471      | **+10 251** | 4 368    | 6 076    | **+1 708**  | 36 000 / 6 700      | 3 529 (9.8 %)  / 624 (9.3 %)     |

### Notes

- **JS delta (+3.9 KB raw / +730 B gzip)** is small and structurally accounted for: Slider gained the `useTouchGate` wire (event handlers + 1 `watch` + 1 `inject` for `dockHeld`); Section gained the `backdrop` prop + conditional `<PaperBackdrop>` render; Configurator + ConfiguratorRow gained the density prop + inject path + 1 new tiny module `density.ts` (~ 27 LOC); the 5-wire chunks (`metaballs`, `typewriter`, `paper-backdrop`, `useTouchGate`) are per-subpath dist files that already shipped at M-close — N did not add JS chunks, only widened existing surfaces and refreshed `glass-ui.js`.
- **CSS delta (+10.3 KB raw / +1.7 KB gzip)** is mostly **AB pre-N** (the chassis token block + dock-shadow consumer canon + Pulse aura recipe + Progress sectioned recipe shipped in `a04f05f` → `46d0891`, before N.W0 even opened) plus the N.W2 Configurator density rules (+596 B raw per the W2 commit message). The CSS budget itself was rebaselined at N.W0 (29 000 → 36 000 raw / 5 750 → 6 700 gzip in `scripts/profile-bundle.mjs`) because the AB additions outran the prior cap without a re-profile at AB close. Re-baselining preserves ≈ 10 % headroom over current draw — tight but legitimate.
- Both files **PASS** the rebaselined budget gate.
- No new top-level JS chunk introduced by N. The biggest sibling chunks (`aurora.js` 47 KB, `typewriter.js` 20.5 KB, `dock.js` 17.4 KB, `metaballs.js` 8.5 KB) are unchanged from M-close.

---

## 2. Build-time delta

| Source | Build time |
| ------ | ---------- |
| K.W4 baseline (profile JSON `buildDurationMs`) | 1 123 ms (build-budget probe — minimal) |
| N.W0 close (`b6c1eed` commit message)          | 24.24 s (full build, library + dts)       |
| N.W1 close (W1-Lane-C proof)                   | 25.72 s                                   |
| N.W2 close (W2-Lane-A proof)                   | 28.77 s                                   |
| N.W0 Lane A3 proof (one-off)                   | 33.72 s                                   |

Qualitative: full production builds at N close land in the **24-29 s** band, consistent with the dispatch hint (27 s vs 29 s typical). The 33.72 s outlier was one-off (cold cache + 8 GiB heap override). Build-time is **not** regressing meaningfully — variance is within normal cold-warm noise. The bundle-budget probe (`profile:budget`) itself runs in ~1.1 s and is unchanged.

---

## 3. Per-wire runtime cost analysis

### Wire 1 — `useTouchGate` → `<Slider>` (W0 Lane A1)

**Per-mount cost (touch device):** 1 `useTimer` for deactivate (3 s window), 1 `useTimer` for pending activation (150 ms), 1 entry into module-level `gateRegistry` Set, 1 shared document `touchstart` listener (passive — installed ONCE per page, reused across all gate instances via reference-counted `installSharedListener` / `uninstallSharedListener`), 4 root-level event listeners (`pointerdown`, `touchstart`, `touchmove`, `touchend`), 1 `watch(touchGate.isActive, …)` for the dock-keep-open mirroring, 1 `useTemplateRef`. **Per-mount cost (desktop, `isTouchDevice === false`):** `isTouchDevice` is `false`, the gate skips registry insertion + shared listener install. `handleTouchStart`/`handleScrollCheck`/`handleTouchEnd` early-return on `!isTouchDevice`. The watch + template ref + 4 event listeners still register, but the touch listeners never fire on desktop. Pointer-event path is unchanged.

**Hot loop:** none. All work is event-driven. The `watch` on `touchGate.isActive` fires at most twice per gesture (activate/deactivate).

**Verdict:** negligible. The Set-based gate registry + single shared `document` listener is the canonical mobile-control pattern from `GlassDock.vue` — N.W0 Lane A1 mirrored the proven shape verbatim. The cost-per-Slider is bounded and the shared listener fan-out is O(active gates), which in practice is 0-1.

### Wire 2 — `<MetaballCanvas>` in `hero.vue` (W0 Lane A2)

**Mount cost:** `useMetaballs(canvasRef, config)` synchronously probes WebGL (no remount cycle — M.W2 Lane A fix already absorbed); compiles 2 shaders; creates 1 `ResizeObserver`; attaches 2 `MediaQueryList` listeners (`prefers-reduced-motion` + `prefers-reduced-transparency`); starts a RAF loop. **Per-frame cost:** O(MAX_BLOBS=12) loop computing positions + radii + colours + 3 uniform updates + 1 `drawArrays`. Hero ships `blobCount=5`, `speed=0.04`, `orbitAmplitude=0.22` — well below the substrate's design ceiling.

**Gates:** `v-if="showMetaballs"` evaluates `isWebGLSupported() && !prefersReducedMotion`. Reduced-motion → canvas does not mount; `<MetaballCanvas>`'s internal `v-if` would also fall back to the `name="fallback"` slot if WebGL is unsupported. Reduced-motion + no-WebGL paths: zero runtime cost (canvas never enters DOM).

**Dispose:** `onBeforeUnmount` → `dispose()` cancels RAF, disconnects ResizeObserver, removes both MQ listeners, deletes the GL program. Clean.

**Verdict:** acceptable for the hero story. The opacity-0.6 + `mix-blend-mode: soft-light` overlay is GPU-cheap (the per-frame WebGL work is the dominant cost, not the composite blend). The story is opt-in (composition demo); no library default surface mounts a metaball backdrop.

### Wire 3 — `<TypewriterText>` in `hero.vue` (W0 Lane A4)

**Cost surface:** the hero splits the headline around the italic-`f` glyph and sequences `seg1` → `seg2` via `@complete` + a ref flip. TypewriterText is timer-driven (no RAF); per-segment cost is O(text length / base-speed) `setTimeout` schedule events; cursor-blink animation is CSS-keyframe-driven, not JS-driven.

**Gates:** `animateHeadline = !prefersReducedMotion` flips both segments to the static `<template v-else>` fallback (verbatim original h2). Reduced-motion path: 1 static render, zero timers, zero per-frame work.

**Verdict:** negligible. Mount cost is 2 component instances on the active path; idle cost (after both segments complete) is ~ 0 (the cursor stops blinking via internal completion logic).

### Wire 4 — `<Section backdrop="paper">` (W0 Lane A3)

**Cost surface:** when `backdrop === "paper"`, `<Section>` becomes `relative isolate` (zero JS cost — pure CSS class additions) and conditionally renders `<PaperBackdrop class="!absolute inset-0" />`. `<PaperBackdrop>` (per `dist/PaperBackdrop.vue_..._lang-...js` at 777 B raw / 479 B gzip) renders 2 `<div>`s with SVG-turbulence background utilities — no JS animation, no listener installs.

**Idle cost when `backdrop="none"`:** zero — the `v-if` collapses the PaperBackdrop entirely; the root `<section>` does not even acquire the `relative isolate` classes (the prop is `&&`-gated in the `cn(...)` call). Pre-N consumers are bit-for-bit unaffected.

**Verdict:** negligible. The cost surface is opt-in and CSS-bound.

### Wire 5 — Configurator density CVA (W2 Lane A)

**Cost surface:** `<Configurator>` provides a `ComputedRef<ConfiguratorDensity>` via `provide(CONFIGURATOR_DENSITY_KEY, …)`. `<ConfiguratorRow>` reads it via `inject` + `computed(() => props.density ?? injectedDensity?.value)` and binds `:data-density="resolvedDensity"`. The actual visual change is bound to 4 scoped CSS rules in `ConfiguratorRow.vue`'s `<style scoped>` block, each `[data-density="…"] { gap: …; padding-block: …; }`. Token consumption is the cheapest possible cascade — 1 attribute selector match per row.

**Per-row idle cost:** 1 computed re-evaluation when density changes (rare — usually a one-time studio config). No watchers, no listeners. When neither prop nor inject is set, the row emits no `data-density` and falls through to the pre-N.W2 `gap-1.5 py-2` Tailwind utility — **bit-for-bit identical to prior**.

**Verdict:** negligible. Token-keyed + attribute-selector-matched; no allocation per render.

---

## 4. Dev-only / dead-code sweep

Scan: `grep -rn 'console\.' src/` → 6 hits, all legitimate error reporting:

- `composables/glass/webgl/frostShader.ts:155,178` — shader compile/link errors (`console.error`).
- `components/ui/data-table/DataTable.vue:83` — dev guard `console.warn` for misuse.
- `components/custom/metaballs/useMetaballs.ts:40,54` — shader compile/program-link errors (`console.error`).
- `components/custom/aurora/composables/useAurora.ts:43` — `[Aurora]` warn on init failure.

Zero `console.log` / `console.debug` / `console.trace`. Zero `TODO` / `FIXME` / `XXX` / `HACK` / `debugger` markers in `src/`.

No dev-only branches identified in the 5 wired sites. No dead-code accumulated.

---

## 5. Findings

**ZERO findings.**

All 5 wires use bounded, well-gated runtime cost surfaces. The CSS budget compression to ~10 % headroom is a known consequence of the AB-tranche living-UI additions (rebaselined transparently at N.W0); it is tight but legitimate, and the next tranche can re-baseline at its own close per the K invariant.

---

## 6. Verdict

**CLEAN.**

- JS delta +3.9 KB raw / +730 B gzip — within budget, 32 % headroom.
- CSS delta +10.3 KB raw / +1.7 KB gzip — within rebaselined budget, 10 % headroom.
- Build time 24-29 s — no meaningful regression.
- 5-wire runtime cost surfaces all gated (reduced-motion, WebGL probe, touch-device detection, conditional `v-if`, opt-in prop) and disposed cleanly.
- No dev-only / dead-code residue.

No blocker, no minor, no follow-up wave required from the ε performance angle.
