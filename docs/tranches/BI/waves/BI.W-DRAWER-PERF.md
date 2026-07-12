# BI.W-DRAWER-PERF — the drawer-lag fix (stage-scope + cached rect + blur-once + dead-knob)

Band B7 (motion register). Design: D-MOTION PASS-1 §3.2/G7 (the drawer-lag root cause OPEN at HEAD) + PASS-4B
proto (G7 CLOSED — 120× main-thread lever measured, 1.9× before/after) + PASS-4B critique (91% — the G7
`--stage-t` scoping mechanism-completeness correction) + **Ruling 12** (PASS-4B-AGGLOMERATION) + SUFFUSION-MAP
M8/R23 (no drawer radius animation).

## §Mandate

Discharges: **UF-G7** ("/containers/drawer is laggy and weak"), **UF-G9** ("/compositions/drawer-live-behind
are awful"). **Ruling 12** (adopt the critic-corrected `--stage-t` scoping — sheet-root-scoped write, register
reads locally, no `documentElement` writes; pass-5 verifies alongside the glass re-form). SUFFUSION-MAP R23
(the "any drawer radius animation" collapse — the per-frame blur ramp).

## §Design

Decided (PASS-4B G7 measured + the 91% critic's mechanism completion — the root cause is the `documentElement`
`--stage-t` write = a 120× main-thread lever (12.53 ms/frame vs 0.104 ms scrim-scoped), the per-frame gBCR
reflow, and the per-frame blur-radius re-raster — NOT the spring). Four fixes; **the DRAWER_SNAP spring is
FENCED** (do not re-tune here):

1. **Scope `--stage-t` off `documentElement` onto the reader roots.** `useDrawerSnap.ts:106-107` writes
   `--stage-t` on `document.documentElement` per frame (forcing a whole-document style recalc). The `--stage-t`
   `@property` is at **`drawer.css:53` (inherits:true)** — NOT `property-regs.css` (the landing map mis-stated
   the file). Writing it on the three READER roots — the sheet surface (reads `--sheet-descent`/`--sheet-freeze`
   at `drawer.css:202,204`), the scrim (`[data-stage-scrim]`), the wrapper (`[data-stage-wrapper]`) — scopes
   the recalc to the drawer subtree. Ruling 12: sheet-root-scoped, register reads locally, no `documentElement`.
2. **Co-convert the Dialog/Command modal flip.** `DialogContent.vue:124-140` ALSO writes `--stage-t` at `:root`
   (rAF flip) and RELIES on `inherits:true` to reach `[data-stage-scrim]`/`[data-stage-wrapper]` cross-subtree.
   The scoped write must therefore co-convert THIS second writer onto the same three roots (the 91% critic's
   correction — the return named only the drawer writer + only 2 of 3 reader roots). Keep `--stage-t`
   `inherits:true` OR make it `inherits:false` ONLY WITH all writers converted — the safe path is the scoped
   write on all three roots, both writers.
3. **Cache the drag span.** `useDrawerSnap.ts:192-197` `dragSpan()` calls `getBoundingClientRect()` per frame
   (the ForcedReflow flagged in the trace). Cache it at `onPointerDown`.
4. **Blur-once (retire the per-frame radius ramp).** `drawer.css:409` `backdrop-filter: blur(calc(--stage-t *
   16px))` re-rasterizes the blur EVERY frame. Replace with a FIXED-radius blur + a cheap background-alpha DIM
   ramp on `--stage-t` — cheaper AND more iOS-faithful (MOTION-LADDER §1.3: the backdrop blur ENGAGES fast at a
   fixed depth, the dim ramps; a symmetric radius ramp reads wrong).
5. **`shouldScaleBackground` dead-knob delete.** `drawer.css:382-383` already declares the boolean "retired"
   (the recede is the `--stage-t` scale/radius), but `Drawer.vue` + `index.ts` + the demo still reference it →
   clean-break DELETE (no alias).

**Measured:** HEAD live 90-frame drag p50 14.7 / max 22.5 ms, 6 janky frames, ForcedReflow flagged → FIXED p50
7.8 / max 9.7 ms, 0 janky = **1.9×**. **The lag is NOT the spring** — `DRAWER_SNAP {0.5, 0.74}`
(`constants.ts:27`) stays byte-untouched here; the detent retune to the measured-iOS `(0.32, 0.80)` is a
SEPARATE user-judgment-gated decision (§Obligations).

## §Work

- `src/components/ui/drawer/composables/useDrawerSnap.ts:106-107,120` — write `--stage-t` on the three reader
  roots (not `documentElement`); `:192-197` cache `dragSpan()` at `onPointerDown`.
- `src/components/ui/dialog/DialogContent.vue:124-140` — co-convert the modal `--stage-t` flip off `:root`.
- `src/styles/drawer.css:53` (`--stage-t` inherits reconcile), `:202-204` (sheet reads locally), `:409`
  (fixed-radius blur + alpha-dim ramp), `:382-395` (scale/radius recede — drop the dead-knob branch).
- `src/components/ui/drawer/Drawer.vue` + `index.ts` + `demo/stories/compositions/drawer-live-behind.vue` —
  delete `shouldScaleBackground`.

## §Acceptance

Gate: **`proof:drawer-stage`** (NEW, born-RED) — (1) no `--stage-t` write targets `documentElement`/`:root`
(grep-assert over `useDrawerSnap.ts` + `DialogContent.vue`); (2) `dragSpan` is not called inside the per-frame
settle path; (3) `drawer.css` carries no `backdrop-filter: blur(calc(... --stage-t ...))` per-frame radius
ramp; (4) `shouldScaleBackground` DEFINITION-ABSENT. `proof:no-layout-animation` stays GREEN (the fixed-radius
blur + alpha dim are compositor-safe).
- **BORN-RED at HEAD**: `useDrawerSnap.ts:107` writes `documentElement --stage-t`; `DialogContent.vue:136`
  writes `:root --stage-t`; `drawer.css:409` ramps the blur radius; `shouldScaleBackground` live.
- Self-test bite: a synthetic `documentElement.style.setProperty('--stage-t', …)` reds.

## §π/DELTA

**Drawer open/drag/settle frame-series** — HEAD 6 janky / 22.5 ms max → 0 janky / 9.7 ms (the 1.9× win); the
CDP Layout-flat trace (no ForcedReflow); the Dialog/Command modal staging STILL flips (the co-convert did not
break it); drawer-live-behind smooth (UF-G9). Chrome AND real-device/visible-Safari (the 1.9× was Chrome-
measured — the Safari capture is owed). Both modes. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)). DELTA:
`W-DRAWER-PERF-DELTA.md`.

## §Obligations

- Real-device / visible-Safari drawer capture (the 1.9× was Chrome-measured).
- **`DRAWER_SNAP` detent retune `(0.5, 0.74)` → measured-iOS `(0.32, 0.80)`** — USER-JUDGMENT-GATED (PASS-3
  batch; the paired A/B is the user-confirmation instrument since it reverses a shipped register). NOT this
  wave's edit — recorded; lands only after the user judgment + AFTER W-SPRING-PARITY (no spring retune before
  M1).
- Ruling 12 pass-5 verification of the `--stage-t` scoping alongside the glass re-form.

## §Dispositions

- `shouldScaleBackground`: **RETIRED** (dead knob, clean break, no alias).
- The `documentElement --stage-t` storm: **CLOSED** (scoped to the three reader roots, both writers).
- SUFFUSION-MAP R23 "no drawer radius animation": **discharged** (per-frame blur ramp → fixed radius + dim).
- SUFFUSION-MAP M8 (the `backdrop-engage` asymmetric-pair register): **NOT MINTED** — no Control-Center-class
  library surface exists (the ≥2-consumer floor unmet); the drawer's fixed-blur+dim is the only real surface.
- `DRAWER_SNAP` detent retune: **DEFERRED** to the user-judgment batch (not re-booked — a named user decision).
