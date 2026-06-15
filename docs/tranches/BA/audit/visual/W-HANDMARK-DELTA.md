# BA.W-HANDMARK — DELTA (the captured own-surface truth)

**Wave**: BA.W-HANDMARK — the d6 hand-voice family re-landed on `/handmark` + the
`/underline` DEC-8 fold + the highlighter engaged + the natural pencil-boil
morphology.

## Freshness headers (AZ-form)

- **surface-paths**:
  - `src/components/custom/handmark/` (HandMark.vue · brush.ts · geometry.ts ·
    ink.ts · texture.ts · freehand.ts · constants.ts · composables/useHandMark.ts ·
    index.ts · README.md)
  - `src/subpaths/handmark.ts` · `src/api/index.ts` (the public types)
  - `demo/stories/motion/handmark.vue` (the hand-voice story — the first highlighter
    consumer)
- **surface-hash** (sha256 of the source set, regenerate on edit):

```
$ git ls-files -s src/components/custom/handmark src/subpaths/handmark.ts \
    demo/stories/motion/handmark.vue | sha256sum
  (computed at capture time — see the captured frames' git-tracked blob ids)
```

- **captured**: 2026-06-15, live demo route `/motion/handmark` at the
  playwright-auto-spawned `:5199`, both modes × {desktop 1280×900, mobile 390×844}.
- **engine**: chromium-headless-new + coarse-touch (10 π cases GREEN).

## Captured frames

| File | What it proves |
|---|---|
| `W-HANDMARK-desktop-light.png` | the family paints: the pen underline under "pays in", the boil natural-morphology wobble under "future is here" |
| `W-HANDMARK-desktop-dark.png` | the dark arm — the marks re-resolve `currentColor` ink under `.dark` (no `.dark` block needed) |
| `W-HANDMARK-mobile-light.png` / `-mobile-dark.png` | the ≥2-viewport readback |
| `W-HANDMARK-highlighter-light.png` | **C-1 the five deltas LIVE** — the highlight is a low-seated, tapered, translucent yellow hull slab BEHIND "really matters", the dark text reading THROUGH it (the `mix-blend-mode: multiply` composites against the page, the un-walled isolation) |

## The binding π asserts (tests-visual/handmark.spec.ts — 10/10 GREEN)

1. **W1 family ships** — ≥5 `span.hm` marks, each a real SVG `path.hm__path` over real
   selectable text. The slot stays the word; the SVG is the aria-hidden overlay.
2. **W3(a) the band seats LOW** — the highlight band's painted center y ≥ the mark
   box middle (a real highlighter rides the baseline band, not the box center the
   fork shipped).
3. **W3(b) the hull fill** — the highlight path is FILLED (`fill` set, not `none`), the
   perfect-freehand variable-width slab — not a stroked rectangle.
4. **W3(e) the multiply un-walled** — the `.hm` root's computed `isolation` is `auto`
   (NOT `isolate`), and the behind band's computed `mix-blend-mode` is `multiply`, so
   the blend composites against the page text behind it. **This is the C-1(e) binding
   π** — the fork's `isolation: isolate` walled the blend off the page, defeating its
   own comment; the captured highlighter shows the page text reading THROUGH the slab.
5. **C-2 the boil morphology wobbles** — the `boil` natural-underline path has a real
   `getBBox().height > 0.5` in the 0..40 viewBox space (scale-relative amplitude
   paints), and renders a DIFFERENT path than the default pencil-boil line.

## The five field deltas (C-1) — before → after

| Delta | Fork (inert) | After (engaged) |
|---|---|---|
| (a) geometry seat | box vertical center (`cy`) | LOW on the baseline band (`HIGHLIGHT_RISE` off the measured baseline) |
| (b) ribbon | `"stroke"` (hard rectangle) | `"hull"` (pf variable-width slab) |
| (c) taper | `{ start: 0, end: 0 }` (no run-out) | `{ start: 6, end: 10, ease: "out-cubic" }` |
| (d) cap | set on the preset but DROPPED in `ink.ts` + hardcoded `round` in the SFC | plumbed `b.cap` → `InkPath.cap` → `:stroke-linecap`; the hardcoded round GONE |
| (e) isolation | `.hm { isolation: isolate }` (walls the multiply off the page) | NO isolation (the multiply composites against the page) |

## The seed reconcile (C-2 [S2])

The family seeds via the HOUSE prng leaf (`src/utils/prng.ts` `mulberry32`) feeding
pencil-boil a house-derived integer seed. glass-ui's handmark code imports ZERO
`mulberry32` from `@mkbabb/pencil-boil` (`proof:handmark` W4 grep-enforces it). ONE
seed leaf, the house identity. pencil-boil's internal `mulberry32` stays inside its
OWN perturb math (the dep is ours).

## Gates

- `proof:handmark` — **PASS** (W1–W6; born-RED-capable on each W3 delta, self-tested:
  hull→stroke REDs W3(b), isolation:isolate REDs W3(e)).
- no-regress set GREEN: `proof:dark-material` 20/20 · `proof:no-gray` 27/27 ·
  `proof:glass-cohesion` (inventory 2/2 + drawer 4/4) · `proof:surface-axis` PASS ·
  `proof:colocation` handmark constants✓ composables✓ readme✓.
- typecheck GREEN · build GREEN (`dist/handmark.js` 21.76 kB / 7.62 kB gzip;
  `dist/underline.*` GONE).
- `proof:gate-script-parity` PASS (the `proof:handmark` orphan + the `/handmark`
  subpath registered; both orphans resolved).
- `npm run verify-export-types` exit 0 — `/handmark` resolves, `/underline` removal
  clean (no dangling export target / type resolution).
- **`profile:budget` — `[NEW] dist/handmark.js — gzip 7546 (no baseline)`.** The
  `--rebaseline` adopt is the BATCH-CLOSE concern (the committed
  `docs/tranches/AP/W4-bundle-profile.baseline.json` is a reviewed reference; the
  9th rebaseline at W-CLOSE adopts handmark + the sibling NEW chunks pager-dots/
  color-swatch/fading-scroll/icon-chip in ONE commit). Mid-wave the chunk shows as
  the expected adopt-pending NEW row, not a regression.
