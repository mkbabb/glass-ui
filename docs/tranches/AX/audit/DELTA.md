# DELTA.md — the paired-π BEFORE/AFTER compare-at-close template

**Codified at AX.W00. Every downstream visual wave emits a `DELTA.md` (or paired
before/after captures) at close.**

The π lane captures BOTH states — the broken HEAD render AND the fixed render — and a
delta artefact, NOT only a single fail-closed readback. A wave that ships only an AFTER
capture has not proven it FIXED anything; the BEFORE is the falsifiable witness that the
defect existed and the fix removed it.

Copy this template to `docs/tranches/AX/audit/W<NN>-delta.md` and fill every field.

---

## Wave: W<NN> — <title>

**Defect (one line):** <what the live product did wrong>

**Live re-diagnosis confirmed cause:** <the LIVE-confirmed root cause, per the
W00-live-rediagnosis-ritual — NOT the plan's hypothesis unless the live drive confirmed
it; if the plan's hypothesis was falsified, say so + name the true cause>

### BEFORE (the broken HEAD render)

| Axis | Captured | Value / artefact |
|---|---|---|
| Route | `/category/story` | |
| Device | Chrome-headless-new (WebGL2 ANGLE→SwiftShader / WebGPU Dawn) | |
| Pixel readback | `maxChannel` / `opaqueFraction` / named-region baseline | |
| Animation timing | ≥5 frames spanning the named duration; lead/lag samples | |
| Contrast-vs-background | measured | |
| Screenshot | path (gitignored `*.png`; archived under `audit/visual/` if kept) | |
| Gate verdict | `proof:<gate>` → **RED** | |

### AFTER (the fixed render)

| Axis | Captured | Value / artefact |
|---|---|---|
| Pixel readback | | |
| Animation timing | | |
| Contrast-vs-background | | |
| Screenshot | | |
| Gate verdict | `proof:<gate>` → **GREEN** | |

### DELTA (the diff that proves the fix)

- **What changed visually:** <the perceptual difference a human sees>
- **What changed in the numbers:** <the readback / timing delta that the gate keys off>
- **The gate's RED→GREEN transition:** <the same live drive that captured BEFORE-RED now
  captures AFTER-GREEN — the load-bearing proof>

### Anti-flake (the I-1/I-2 + CLS-witness discipline)

- Named-region baseline sampled **3×**; the verdict is the robust (median/peak) over the
  3 runs — never a single shot.
- Any CLS witness is a settled-trace / multi-trial median, never a single
  buffered-observer shot.

### Probe coverage (the π-band precept floor)

- [ ] ≥3 viewports
- [ ] ≥5 animation-timing frames spanning the named duration on every modified transition
- [ ] contrast-vs-background measured
- [ ] per-story consumption sweep
