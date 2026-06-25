# BUILD-REPORT-2 — viz mechanics re-spec (paper-grid DRAMA fix)

**Wave** `BD.W-VIZ-RESPEC` · **Iteration** 2 · **Built** 2026-06-23 · **Server** `http://localhost:5173`
**Scope addressed** JUDGE-1.md — concentric + dot-matrix already PASS; the SOLE FAIL was paper-grid:
the cell-twist mechanic was correct but NOT VISIBLE/DRAMATIC enough in the default light render
(whisper-faint at 4% line opacity, twist damped to ~10–15° by the curl scalar, motion too subtle to
read between frames). This iteration raises the DRAMA + VISIBILITY decisively, without touching the
two passing viz or the warm-cream identity.

---

## What built (the four levers, all per the judge's concrete refinements)

The mechanic (`cellTwist` — per-cell affine rotation about each cell's own center) was right. The fix is
visibility + effective-twist-floor + a distinct traveling front, in lockstep across the single-math-source
triad (JS leaf ↔ GLSL ↔ WGSL).

### 1. Line opacity — the twist is now SEEN (the biggest lever)
`src/components/custom/paper-grid/constants.ts`
- `minorAlpha` **0.04 → 0.12** — the warm-amber ink now carries the cell silhouette over cream.
- `majorAlpha` **0.11 → 0.22** — the bolder rule reads the twisted boxes.
- Still graph-paper, not a heavy grid (verified live in both modes). Warm `--foreground` ink only — NO hue change.

### 2. The directed-twist FLOOR — the crest ALWAYS rotates decisively (new shared math)
The judge's #2: `theta = twistMax · env · curlScalar`, and `curlScalar` sits ~|0.3|, damping the twist to a
whisper. Cured with a magnitude-floored director, shared across all three arms:
- `src/composables/glass/wave/waveField.ts` — new `export const TWIST_FLOOR = 0.62` + `directedTwist(s, floor)`
  helper (`sign(s)·max(floor, |s|)`, sign softened via `tanh(s·6)` so neighbours don't flip hard across a
  curl zero-crossing). `cellTwist` now wraps both `theta` and `shear` curl reads in `directedTwist(...)`.
- `src/composables/glass/wave/waveField.glsl.ts` — `#define WAVE_FIELD_TWIST_FLOOR 0.62` + `directedTwist()`
  (GLSL ES 3.00 `tanh` built-in); `cellTwist` uses it.
- `src/composables/glass/wave/waveField.wgsl.ts` — `const WAVE_FIELD_TWIST_FLOOR: f32 = 0.62` + `directedTwist()`
  (WGSL `tanh` built-in); `cellTwist` uses it.
- The curl SIGN is preserved (adjacent cells still lean together — the flowing read, never per-cell noise);
  only the MAGNITUDE is floored. **`waveFlow` is UNTOUCHED**, so concentric (which uses `waveFlow`, not
  `cellTwist`) is structurally unaffected — it stays PASS.
- `twistMax` **0.55 → 0.62** (constants) so the crest ceiling lands ~36°.

### 3. The traveling wave now READS as motion (distinct moving front)
`paper-grid/constants.ts`
- `waveSigma` **0.85 → 0.42** — a NARROW distinct moving crest (a wave passing, not a broad global pulse —
  the cause of the judge's "consecutive frames look static").
- `waveOmega` **0.7 → 1.05** — the front sweeps fast enough to catch at a glance (still inertia-eased by the
  `amp` spring envelope; the per-spring clock fence honored — no `--duration-*` snap introduced).
- `waveK` **0.42 → 0.62** — ~one full crest cycle across the visible field, so a clear front travels through
  (with a distinct leading/trailing edge), rather than half a cycle covering the whole card.
- `shearMax` **0.24 → 0.26** — the box morphs a hair more as it twists.

### 4. Doc reconcile (the judge's NON-BLOCKING flag)
The page no longer contradicts its mechanic:
- `demo/stories/substrates/paper-grid.vue:124-125` — label + blurb re-written from the RETIRED line-bow
  language ("Adjacent lines bow and flow TOGETHER", "the Iñigo Quílez domain warp") to the cell-twist
  mechanic ("the CELLS twist and morph as a wave passes OVER and THROUGH", "each box rotates + skews about
  its OWN center", "a local swirl twists the cells around the pointer").
- `demo/stories/manifest.ts:672` — the Paper Grid story description re-written off "the whole sheet bows
  together" / "the IQ domain warp" onto the cell-twist + traveling-crest language.

**Unchanged (the fences held):** `WARM_IDENTITY_INK`, `lineColor`, `background: transparent`, the Golus
`gridCoverage` AA path (crisp lines, `dv` reads the FINAL twisted coord), the PRM branch
(`amp=0 → env·amp=0 → theta=0 → square grid`), compositor-only GPU fragment pass. NO new uniform, NO new
spring token, NO teal/navy, NO hue change. concentric + dot-matrix shaders/constants byte-untouched.

---

## Files touched

| file | change |
|---|---|
| `src/components/custom/paper-grid/constants.ts` | minorAlpha/majorAlpha/twistMax/shearMax/waveK/waveOmega/waveSigma re-pinned |
| `src/composables/glass/wave/waveField.ts` | `TWIST_FLOOR` + `directedTwist()`; `cellTwist` uses it |
| `src/composables/glass/wave/waveField.glsl.ts` | `WAVE_FIELD_TWIST_FLOOR` #define + `directedTwist()`; `cellTwist` uses it |
| `src/composables/glass/wave/waveField.wgsl.ts` | `WAVE_FIELD_TWIST_FLOOR` const + `directedTwist()`; `cellTwist` uses it |
| `demo/stories/substrates/paper-grid.vue` | label + blurb reconciled to cell-twist |
| `demo/stories/manifest.ts` | Paper Grid story description reconciled |

(Edits confined to `src/` + `demo/`. No sibling touched, no mv/rm outside repo, no git ops.)

---

## Before / after (live-verified, computed values)

| metric | HEAD (iter-1, judged FAIL) | iter-2 (this build) |
|---|---|---|
| minor line opacity | 0.04 (4% — invisible over cream) | **0.12** (warm ink reads) |
| major line opacity | 0.11 | **0.22** |
| effective crest twist | `twistMax·env·curl` ≈ 10–15° (curl damps) | floored: `twistMax·env·directedTwist(curl)` → decisive ≥~22°, ceiling ~36° |
| crest band width (`waveSigma`) | 0.85 (broad — frames look static) | **0.42** (narrow distinct front) |
| front speed (`waveOmega`) | 0.7 | **1.05** |
| **canvas-only frame motion (~1.6s apart)** | judge: "near-identical" | **2.2% of pixels visibly moved** (>24 RGB-sum delta); mean RGB diff 1.13 |
| **line ink warmth (R−B)** | — | **+14.69** (R 201 > B 186 → warm-amber, NOT gray) |
| console errors (light + dark) | 0 | **0** |

Live readback method: 2× DPR viewport screenshots of the in-flow `<canvas>` (673×627 CSS), PIL crop to the
exact device-pixel canvas box, per-pixel RGB diff over two frames + inked-pixel hue average. WebGPU canvas
is not `drawImage`-readable post-present, so the screenshot crop is the binding paint truth.

### Screenshots
- `after2-paper-grid-light-1.png` / `after2-paper-grid-light-2.png` — two frames ~1.6s apart: the twist
  pattern visibly migrates (the wave travels); cells warp into rhomboid shapes while others stay square.
- `after2-paper-grid-final-light.png` — default light render: the cell-twist reads decisively as warm
  graph paper twisting under a passing wave.
- `after2-paper-grid-dark.png` — dark mode: warm-amber lines over deep warm-brown (NOT gray/black), cell
  twist clearly visible; identity warms in lockstep (W-DARK-MATERIAL).
- `after2-paper-grid-cursor-swirl.png` — the cursor local swirl: cells twist around the swept pointer; lines
  stay crisp (Golus AA intact, no blur).
- `after2-concentric-regression.png` — concentric unregressed (flowing warm topographic contours, 0 errors).

---

## Acceptance (BUILD-SPEC §1.3, re-judged live)

- **A1 cells twist, lines don't bow** — PASS. Localized rhomboid cell deformation in the crest band; square
  cells elsewhere. Lines locally straight (crisp Golus stroke).
- **A2 the wave travels** — PASS. 2.2% of canvas pixels move between frames; the twist band migrates across
  the sheet.
- **A3 crisp** — PASS. Golus `gridCoverage` untouched; `dv` reads the FINAL twisted coord; lines 1px, no blur
  (visible in the cursor-swirl capture).
- **A4 liquid weight** — PASS. Spring-eased `amp` envelope (target 1.06 overshoot → settles to 1) drives the
  crest engage; the front advances with inertia. No raw snap.
- **A5 PRM** — PASS by construction. `amp=0` under reduce zeroes `env·amp` → `theta=0` → static square grid.
  Branch unchanged from iter-1 (judge did not flag PRM).

---

## a11y / identity / Safari

- **AA text contrast** — the viz is a decorative background field over transparent; the demo text/chrome
  contrast is untouched. The line ink is the warm `--foreground` identity (warmth R−B +14.69, not gray).
- **Warm-cream identity** — held in BOTH modes; no teal/navy, no hue change (only alpha + twist-magnitude
  + wave-timing knobs moved).
- **Compositor-only / PRM-carved** — GPU fullscreen fragment pass; no layout property; PRM → one static
  frame then park. `proof:no-layout-animation` GREEN by construction.
- **Safari-OK** — `tanh` is a GLSL ES 3.00 + WGSL built-in (no `fwidthFine`); the warp-law transposition
  rides the existing WGSL primary + WebGL2 fallback, both transcribing the SAME `directedTwist` floor (the
  single-math-source round-trip preserved).

---

## Gates / typecheck

- `npx vue-tsc --noEmit -p tsconfig.json` — **no NEW `error TS`** (clean).
- `node scripts/verify-siblings-intact.mjs --quiet` — **siblings OK**.
- `scripts/proof-wave-field.mjs` does not yet exist (booked) and `scripts/proof-viz-papergrid.mjs` still
  asserts the RETIRED `curlWarp` form (stale vs HEAD iter-1) — both are the gate-wave's job per BUILD-SPEC
  §4.1/§4.2 (born-RED → re-aimed at the gate close), out of this prototype/live-verify scope. The
  `TWIST_FLOOR` is exported from the JS leaf so the round-trip gate can pin it across the three arms.

## Verdict

paper-grid now DECISIVELY reads as "the grid CELLS twist and morph as a wave passes OVER and THROUGH it" in
the DEFAULT light render — visible warm-amber ink, a distinct traveling front (2.2% frame motion), decisive
floored twist, crisp lines, warm in both modes. concentric + dot-matrix remain PASS (untouched). The SET now
meets the bar.
