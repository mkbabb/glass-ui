# W-CON3 — constellation `?freeze` deterministic-capture seam + anomaly `drawOverlay` recipe — DELTA

**Wave:** AY.W-CON3 · **Status:** live-verified · **Verdict:** PASS (the `?freeze`
static frame is BYTE-IDENTICAL across two back-to-back mounts AND frame-still
within one run — the determinism truth, π readback below; the anomaly recipe
paints over the frozen lattice with a clamped pulse phase).

**Route:** `/substrates/constellation?freeze` (the storybook substrate scene —
`resolveScene("substrates", "constellation")`).
**Surface:** the SIXTH `<Constellation>` (the new "anomaly drawOverlay recipe +
?freeze deterministic capture" section) — `<Constellation :freeze="true"
seed="ay-w-con3" warp-on-click :draw-overlay="drawAnomaly">` with the anomaly
recipe overlay, exposed to the π lane via the DEMO-PRIVATE
`window.__constellationFreeze` seam (`field` + `overlayPulseRadius()`).
**Viewports:** desktop 1280×900 + mobile 390×844 (a REAL mobile viewport — the
628×842 capture is the 390-wide box at 2× DSF, NOT a 1280 page) · **Schemes:**
{light, dark}.
**Device:** Chrome-headless-new (Playwright), ANGLE→Metal (the dev-box GPU path).

The `?freeze` deterministic-capture intelligence + the anomaly skin that today
live ONLY in the slides bespoke `constellation.ts` (which L.W-ADOPT will DELETE)
now live at the ROOT — the `freeze` prop / `?export|print|freeze` URL hook is a
generic library capability, and the anomaly mark is a documented copy-pasteable
`drawOverlay` recipe (NO domain props on the component). The adoption is a
behaviour-preserving swap, not a regression — the "fix at the ROOT" precept.

---

## Captured own-surface PNGs (real on-disk, `\x89PNG`, ≥28 KB)

The freeze/anomaly demo surface under `?freeze`, per viewport × scheme:

| capture | desktop-light | desktop-dark | mobile-light | mobile-dark |
|---|---|---|---|---|
| freeze + anomaly recipe (`?freeze`) | `W-CON3-freeze-anomaly-desktop-light.png` | `W-CON3-freeze-anomaly-desktop-dark.png` | `W-CON3-freeze-anomaly-mobile-light.png` | `W-CON3-freeze-anomaly-mobile-dark.png` |

The own-surface set carries the `W-CON3-…-light.png` AND `W-CON3-…-dark.png` pair
the `proof:live-verified-ledger:ay` own-surface + {light,dark} floor requires
(`^W-CON3-` prefix). Each PNG shows the FROZEN proximity-graph lattice with the
anomaly mark — a pulse ring + soft halo + core dot + a dashed monospace `anomaly`
callout pinned to the focal — over the `--constellation-*` light/dark legibility
tokens (the dark arm lifts the node tones off the warm-ink ground).

---

## The determinism numbers (the binding π readback)

Captured off the live `window.__constellationFreeze` handle — NOT a prose claim,
NOT a grep. The hash is a djb2 digest of every `field.nodes` position (quantised
to 0.01px) + the warp focal; the pulse radius is the recipe's frozen-phase
outer-ring radius (`(12 + phase·24)·k` with `phase = (FROZEN_NOW=0 % 2600)/2600 = 0`).

### (1) CROSS-RUN-DETERMINISM — two back-to-back `:freeze :seed` mounts are BYTE-IDENTICAL

| run | node+warp digest | pulse radius | nodes | canvas |
|---|---|---|---|---|
| mount A | `9975a651` | 9.99 px | 60 | 1066×420 |
| mount B | `9975a651` | 9.99 px | 60 | 1066×420 |

**`digest(A) === digest(B)` (`9975a651 == 9975a651`)** and **`pulse(A) === pulse(B)`
(9.99 == 9.99)** — the seeded static frame is reproducible across two full page
mounts. A live `Math.random` layout or a stepped field would diverge here.

### (2) FRAME-STILLNESS — one frozen instance does NOT advance

Within ONE mount, the digest at frame 1 EQUALS the digest after 40 `requestAnimationFrame`
advances, and the pulse radius holds:

| sample | node+warp digest | pulse radius |
|---|---|---|
| frame 1 | `9975a651` | 9.99 px |
| after +40 rAF | `9975a651` | 9.99 px |

**`digest(f1) === digest(f40)`** and **`pulse(f1) === pulse(f40)` (9.99 == 9.99)** —
no drift, no ripple, no warp advance, and a FROZEN overlay phase. A live `now`
handed to `drawOverlay` (the D1.2 defect) would move the pulse radius even with a
frozen field — it does NOT.

The light + dark mounts share the SAME seed (`ay-w-con3`), so their node digests
are identical too (the layout is scheme-independent; only the token palette flips).

### (3) URL-AUTO-DERIVE — a freeze-OMITTED instance honours `?export|print|freeze`

The refit/wander instance (NO `freeze` prop) is driven entirely by the URL hook,
measured scrolled-into-view (un-parked) so the substrate's offscreen-park does not
mask the result:

| URL | refit node travel over 44 frames | verdict |
|---|---|---|
| `?freeze` | 0.0 px (float-noise floor) | STATIC — the URL hook fires |
| (no capture URL) | ~53 px | LIVE — the field drifts |

The auto-derive distinguishes an OMITTED prop from an explicit `:freeze="false"`
by reading the RAW vnode prop (Vue casts an absent Boolean prop to `false`, which
would otherwise erase the omitted-vs-explicit distinction — the load-bearing fix).

---

## The HARD GATE (`proof:constellation-freeze-live`) — GREEN

```
proof:constellation-freeze-live — the deterministic-capture freeze render gate
  (cross-run-identical + frame-still + ?freeze auto-derive) (AY.W-CON3)
  specs passed/failed : 2 / 0
  status: PASS
```

Born-RED at HEAD: with no `freeze` seam the `window.__constellationFreeze` handle
is absent + the field always advances → the determinism/stillness/auto-derive
asserts RED. The gate is fail-CLOSED (a non-deterministic / advancing frozen
frame exits NON-ZERO; the genuine-device-absence SKIP stays only on a zero-dep
runner). The serialized-lane gates stay GREEN: `proof:constellation-warp-live`,
`proof:constellation-egg-live`, `proof:constellation-refit-live`,
`proof:constellation-substrate-single` (ANOMALY-IS-SKIN held — no anomaly literal
leaked into the component source; the recipe lives in the demo + README only).

## Export VERIFY (`npm run build && npm run verify-export-types`) — GREEN

`dist/components/custom/constellation/Constellation.vue.d.ts:102` carries
`freeze?: boolean` on the component prop type; `constellationField.d.ts:253`
carries it on `ConstellationProps` (re-exported to `@mkbabb/glass-ui/api`).
`verify-export-types` resolves `@mkbabb/glass-ui/constellation`.

## The slides-side gate spec (Leg 4) — authored in `AY.W-CON3.md §5`

`proof:no-bespoke-constellation` (HOME: slides repo, NOT glass-ui — the D3
wrong-repo correction) is authored copy-in-ready in the wave doc §5; its RED→GREEN
lands in L.W-ADOPT (the bespoke `constellation.ts` deletion + the lib adoption).

---

## Verdict

PASS. All five legs hold: Leg 1 (π determinism + stillness + auto-derive,
born-RED→GREEN), Leg 2 (anomaly recipe in README + demo, no domain props), Leg 3
(built-dts `freeze` + export resolve), Leg 4 (slides gate spec authored), Leg 5
(this captured own-surface {light,dark}×{desktop,mobile} DELTA). The bespoke
deploy-capture + anomaly mark survive the L.W-ADOPT swap unchanged.
