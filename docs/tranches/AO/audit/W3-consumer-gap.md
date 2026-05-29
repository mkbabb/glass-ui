# AO.W3 — Consumer-gap (speedtest AQ R0G-1..4) — audit

Closes AO.W3. The four component/composable items speedtest tranche AQ handed to AO land as transpositions of existing surface — none invents unjustified substrate. Four file-disjoint carves (aurora ‖ instrument-chassis ‖ composables/dom ‖ toast); orchestrator-verified combined. (R0G-5 the `--surface-public-data-panel` token folds into AO.W4 with the cascade.)

## R0G-1 — Aurora demand-driven / visibility-paused render loop

Entirely within `src/components/custom/aurora/composables/runtime.ts` (the behavior lives in the runtime; no `Aurora.vue`/`useAurora` change needed). The loop was a perpetual `raf = requestAnimationFrame(tick)` reschedule at ~60fps even at idle.

- **Demand-driven** — a `needsAnimation()` predicate (false under reduced-motion; true while any drift uniform is non-zero or the cursor is unsettled past `CURSOR_REST_EPSILON`); `tick()` now reschedules only when it returns true (`raf = needsAnimation() ? requestAnimationFrame(tick) : 0`). At a genuine at-rest state (zero drift + settled cursor) the loop parks.
- **wake()** — a helper (`if (running && !raf) raf = requestAnimationFrame(tick)`) called from every setter that introduces motion (`setCursor`, `clearCursor`, `setCursorRadius`, `setReducedMotion`, `update`), so the canvas resumes immediately on any real change.
- **visibility-paused** — a runtime-level `visibilitychange` listener suspends on `document.hidden` / resumes on visible (via the inner `pause`/`resume`), removed on `dispose()`. Every consumer gets the tab-hidden pause, not just the `useIntersectionPause` composer.
- **reduced-motion preserved** — `needsAnimation()` returns false under reduced-motion, so the canvas draws one static frame and parks. `drawFrame()` is byte-identical (untouched) — the π hero animates exactly as before whenever motion is live (`DEFAULT_AURORA_CONFIG` carries non-zero drift, so the canonical hero keeps animating).

**Latent bug fixed (same carve).** The outer `resume` wrapper set `running = true` before delegating to the inner `armed.resume()`, which early-returns `if (running)` — so a post-arm resume routed through the outer seam (the `useIntersectionPause` re-show) no-opped and never restarted the loop (a scrolled-away-and-back aurora would stay frozen). Fixed: the outer wrappers now mutate `running` only pre-arm and delegate purely to the inner pause/resume post-arm (the inner owns `running` + the RAF). Acceptance signal is the reduced-motion-delta / idle-fps A/B (not Lighthouse TBT); the code-path now parks at idle + suspends when hidden.

## R0G-2 — InstrumentChassis breakpoint-correct child-geometry reserve

`src/styles/instrument-chassis.css`, the `@media (max-width: 720px)` `.instrument-dial` block. The defect was `grid-template-rows: auto auto auto` (no height reserved → 326-331px reflow when the canvas/readout hydrate → mobile-390 CLS 0.32-0.38).

Before → after:

```css
/* before */  grid-template-rows: auto auto auto;
/* after  */  grid-template-rows:
                  var(--instrument-dial-meter-reserve-mobile, minmax(0, 1fr))
                  auto auto;
              min-height: var(--instrument-dial-min-height-mobile, 24rem);
```

The `min-height` pins the outer box from frame 0; the meter row is `minmax(0, 1fr)` (expands within the reserved envelope rather than growing it on hydration). No layout property animates idle→active — the only chassis transition is the typed `--phase-tint-amount` custom property feeding a `color-mix()` (paint-only). The `var(…, 24rem)` fallbacks carry the contract now; the canonical `--instrument-dial-min-height-mobile` / `--instrument-dial-meter-reserve-mobile` tokens land at W4 (the W3/W4 file boundary — `tokens.css` untouched here). Consumers retune the token if their meter differs; acceptance is mobile-390 CLS < 0.05 on a chassis-hosting route (speedtest verifies post-publish).

## R0G-3 — `useIdleReady` composable

`src/composables/dom/useIdleReady.ts` (new) — the rIC idle-gate, sibling of `useViewportReady` (minus the IntersectionObserver stage):

```ts
useIdleReady(options?: { timeout?: number; onReady?: () => void }):
    { readonly ready: Ref<boolean>; stop: () => void }
```

`requestIdleCallback({ timeout })` with a `setTimeout(fire, 0)` Safari fallback; SSR flips synchronously; `fire()` is one-shot (early-returns on `disposed || ready.value`), runs `onReady?.()`, then tears down; `stop()` + `onScopeDispose(stop)` cancel. vueuse-FREE (imports only from `vue`), so it surfaces through `dom/index.ts` (`export * from "./useIdleReady"`) → `composables/index.ts` → `src/index.ts` to the curated root barrel automatically, identical to `useViewportReady` — and resolves from the built dist (`node -e import('@mkbabb/glass-ui') → useIdleReady: function`). Justified by 5 speedtest consumer sites (J inv 10 / L inv 8). Co-located test: 7 cases pass (ready flips on idle, onReady once + idempotent, setTimeout fallback, SSR sync, scope-dispose cancel, manual stop, custom timeout).

## R0G-4 — `Toaster` `position` prop

`src/components/ui/toast/Toaster.vue` + `index.ts`. Added `position?: ToasterPosition` (`"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"`), default `"bottom-right"`. The hardcoded `<ToastViewport>` class split into an invariant base + a per-position `[direction, edge]` anchor map composed via `cn()`. The default composes to a string BYTE-IDENTICAL to the prior hardcoded literal (verified by running the real `cn()`: `composed === original → true`), so no consumer regresses; the top anchors retire speedtest's `.z-toast` override. `ToasterPosition` co-exported from `toast/index.ts`.

## Verification

- `npm run typecheck` → exit 0 (combined).
- `npm run build` (default heap) → exit 0.
- `npx vitest run` → **521 passed, 45 files** (the surface manifest `tests/public-surface.spec.ts` updated to drop the deleted `useSpringOrchestrator` assertions — completing the W2 alias purge; 2 fewer cases).
- `npm run profile:budget` → exit 0, `[PASS] dist/styles/index.css — gzip 81397 / 89000 (91.5%)` (R0G-2 added ~611 gzip; the W4 re-base accounts for the settled cascade).
- `useIdleReady` resolves from the built dist as a `function`.

## Gate table

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | typecheck + build exit 0 (default heap) | MET | both 0 |
| 2 | R0G-3 useIdleReady exported + resolves; sibling-consistent; test passes | MET | dist export = function; 7-case test green |
| 3 | R0G-4 Toaster accepts `position`; default anchor unchanged | MET | default class byte-identical to prior literal |
| 4 | R0G-1 loop demand-driven + visibilitychange-paused; reduced-motion static | MET | `needsAnimation()` gate + visibility listener; drawFrame byte-identical |
| 5 | R0G-2 chassis reserves dial final box at mobile; recentre transform-only | MET | min-height + minmax reserve; only paint-only transition |
| 6 | Visual π re-probe — aurora/chassis/toast zero canon regression | DEFERRED→W5 | the π re-probe runs in the close ceremony |

Gates 1-5 MET; gate 6 (visual π) runs at the W5 close. W3 closes.
