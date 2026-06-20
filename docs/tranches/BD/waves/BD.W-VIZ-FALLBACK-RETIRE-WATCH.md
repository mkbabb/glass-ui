# BD.W-VIZ-FALLBACK-RETIRE-WATCH

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails. WATCH / re-affirm — do NOT delete a fallback.**

Re-evaluate (NOT execute) the `.frag`/`.glsl` WebGL2-fallback retirement — confirm the ~5-10% non-WebGPU tail (Linux Firefox stable, pre-A12 iPhones, flagged Firefox-Android) against the June-2026+ Baseline, re-affirm the fence HOLDS or record the closing trigger. Do NOT delete a fallback this tranche unless the tail demonstrably closed (it has not).

## (2) Starting state — the exact on-disk reality

- `PROCEDURAL-SUITE.md` Named successors (VERIFIED): "**A `.frag`/`.glsl` WebGL2-fallback RETIREMENT** — booked but GATED: forbidden until the ~5-10% tail closes. `proof:gpu-substrate-single` clause B machine-blocks a premature retirement."
- Every viz ships both a `.wgsl` primary AND a `.frag`/`.glsl` fallback (gpu-parity-table — aurora.frag.ts ~430L, metaball.frag.ts ~480L per the final-paint line; VERIFIED). The fallback is the graceful path for the tail.
- `scripts/proof-gpu-substrate-single.mjs` clause B (VERIFIED, lines 315-329): walks `src/` for `getContext("webgl2")` and asserts the WebGL2 fallback bootstrap is in EXACTLY ONE file (the substrate) — if `gl2Bootstraps.length === 0` it reds "NONE — the fallback was DELETED, forbidden" (the machine-block on premature retirement). The header (lines 4,10-11) states: "the WebGL2/Canvas2D clause stays GREEN (the fallbacks are NOT retired) … the WebGL2 substrate is the graceful fallback for the ~5-10% tail (Linux Firefox, pre-A12 iPhones), NOT retired."
- The June-2026 Baseline fact (gpu-parity-table :157, CLAUDE.md §WebGPU substrate): "WebGPU-first WHERE THE PLATFORM ALLOWS IT (Chrome/Edge 113+, Safari 26+, Firefox 141+) … the WebGL2 fallback is NOT retired — it is the graceful path for the ~5-10% tail."

The decision: FOLD-LEDGER `→BD.W-VIZ-FALLBACK-RETIRE-WATCH (WATCH)` — "Re-affirm the fence HOLDS (the ~5-10% non-WebGPU tail has not closed); proof:gpu-substrate-single clause B blocks a premature strand. Re-check the Baseline number; re-stamp HELD. NO delete."

## (3) The build — a RE-AFFIRM wave (no build, no delete)

**This wave deletes NOTHING. It re-checks the trigger + re-stamps the fence.**

1. **Re-check the Baseline coverage.** Verify the current (June-2026+) WebGPU Baseline coverage: Chrome/Edge 113+, Safari 26+, Firefox 141+. Confirm the ~5-10% non-WebGPU tail STILL exists: Linux Firefox stable (WebGPU flagged-off on Linux), pre-A12 iPhones (no WebGPU), flagged Firefox-Android. Record the current Baseline number (the tail has NOT closed — the WebGPU mandate proved Baseline can move fast, but Linux Firefox stable + pre-A12 hardware are a hard tail).
2. **Re-stamp the fence HELD-with-rationale.** The fallback-retirement booking carries forward with the current trigger ("the ~5-10% non-WebGPU tail closes — Linux Firefox WebGPU ships stable AND pre-A12 hardware drops below the support floor"). The disposition is almost certainly HELD (the tail has not closed).
3. **Confirm clause B GREEN.** `proof:gpu-substrate-single` clause B stays GREEN (the WebGL2 fallback bootstrap is in EXACTLY ONE file — the substrate; the fence holds, no fallback deleted).

NO `.frag`/`.glsl` deletion, NO `.wgsl`-only strand. The no-silent-drop discipline requires RECORDING the booked retirement (even though the correct disposition is HOLD) so it is not silently carried a 4th tranche.

Fences honored: clause B is the binding machine-block — a fallback delete reds it. The GL-shader fence is trivially held (nothing is touched). The graceful-tail identity is the whole point (the library does not strand the ~5-10% non-WebGPU tail).

## (4) The gate — born-RED → GREEN (a re-affirm, no new build gate)

**`proof:gpu-substrate-single` clause B stays GREEN (the fence holds):**
- Clause B asserts the WebGL2 fallback bootstrap is in EXACTLY ONE file (the substrate) — born-RED ONLY if a fallback is deleted (the premature strand). At BD it stays GREEN (no delete).
- The re-affirm records the current Baseline number + re-stamps the booking HELD with the current trigger. The trigger (tail-closed) is RE-CHECKED + the disposition re-stamped.
- **No new gate, no self-test bite for a build** — this is a WATCH/re-affirm. The existing clause B IS the machine-block; the artefact is the re-checked Baseline number + the re-stamped HELD disposition.

There is NO born-RED build here — the fence is already GREEN and STAYS GREEN. The wave's product is the re-affirmation (the Baseline re-check + the HELD re-stamp), not a code change.

## (5) Paint verification

**Device-free** — a re-affirm wave (no build, no paint, no delete). The artefact is the re-checked Baseline coverage number + the re-stamped HELD-with-rationale disposition + clause B confirmed GREEN. NO `proof:ba-gestalt` (zero pixels change — nothing is touched).

## (6) Fences + risks

- **NO DELETE** — the cardinal fence. Clause B exists to BLOCK a premature strand; this wave re-affirms it, never executes the retirement. A fallback delete reds clause B + strands the ~5-10% tail.
- **The trigger has not fired** — the ~5-10% non-WebGPU tail (Linux Firefox stable, pre-A12 iPhones, flagged Firefox-Android) has not closed; the correct disposition is HELD-with-rationale.
- **No silent carry** — recording the booked retirement (even as HELD) satisfies the no-silent-drop discipline; the booking is not silently carried a 4th tranche.
- **Baseline can move fast** — the WebGPU mandate proved Baseline moves fast (DISPOSITION-RESTAMP re-checks the CSS-feature books for the same reason); the Baseline number is RE-CHECKED, not assumed. But the hardware tail (pre-A12) is a hard floor that does not move with browser Baseline.
- **GL-shader fence** — trivially held (nothing is touched).
