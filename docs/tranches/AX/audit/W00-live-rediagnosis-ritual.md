# AX.W00 — the live re-diagnosis ritual

**Codified at AX.W00. Binding on every regression wave's §Archaeology.**

> A plan's named root-cause is a HYPOTHESIS until a live re-diagnosis at HEAD
> confirms it. The fix is authored AFTER the live confirmation, never before.

This is the AW cardinal lesson made machinery: NOTHING is "done" until audited GREEN
against the live product, and no FIX is authored until its root-cause is LIVE-confirmed
(not hypothesized from a source read).

---

## The ritual (every regression wave runs it at §Archaeology, BEFORE authoring a fix)

1. **Reproduce the defect on the live device.** Drive the real demo route in the π
   workspace (`tests-visual/`), on the real Chrome — not a unit test, not a CPU oracle,
   not a screenshot from memory. Capture the broken render (a paired-π BEFORE artefact).
2. **Falsify the hypothesized cause.** The plan names a suspected root-cause. Before
   touching it, PROVE it on the live DOM: toggle/null the suspected mechanism and observe
   whether the defect persists. If the defect survives the suspected cause being removed,
   the hypothesis is FALSE — keep diagnosing.
3. **Bisect to the true cause on the live DOM.** Walk the computed styles / the rAF
   timeline / the canvas pixels until the property that actually drives the defect is
   isolated. Record the live evidence (the computed value, the frame trace, the readback).
4. **Author the fix against the CONFIRMED cause.** Only now write the src/ change. The
   FileBounds and the "do-not-touch" list in the plan are advisory until the live
   diagnosis confirms them — a plan that forbids touching the true-cause file is WRONG and
   the live diagnosis overrides it (record the override).
5. **Re-probe GREEN on the live device.** The fix closes only when the same live drive
   that captured the BEFORE now paints the AFTER, captured as a paired-π `DELTA.md`.

---

## The slice-31-F2 misdiagnosis archaeology (why this ritual is W00 scope)

The AW.W1 dock-collapse wave is the canonical cautionary tale.

- **The plan's HYPOTHESIS.** AW.W1 named the root-cause as `useLayerTransition.ts`
  natural-size measurement, and its FileBounds **forbade touching `dock.css`**. The fix
  was scoped against that hypothesis before any live confirmation.
- **The live re-diagnosis falsified it.** The HEAD re-diagnosis (`W1-collapse-live.json`)
  drove the real dock and found the collapse was NOT a measurement bug at all — the true
  cause was `.glass-dock { container-type: inline-size }`, introduced by AV.W16 (the
  Tailwind v3→v4 container-query work). The `container-type` established a containment
  context that broke the width morph; `useLayerTransition`'s measurement was a red herring.
- **The correct fix lived in the forbidden file.** The actual fix (removing
  `container-type: inline-size`, shipped in 3.4.0) was in `dock.css` — the exact file the
  plan forbade touching. The plan's "do-not-touch" was wrong because the plan's root-cause
  was a hypothesis, not a verified diagnosis.

The lesson: **a source-read hypothesis is not a diagnosis.** AW shipped a fleet of green
CPU/structure gates over a black live canvas, a flooded blob, a desynced dock, a
blown-out specular — because "green gate" and "visually true" were fully decoupled, and
because fixes were authored against hypothesized causes the live product never confirmed.

W00 erects the π workspace that makes the live re-diagnosis EXECUTABLE (a real device that
renders the real component and reads back the pixel / the rAF frame / the computed style),
and codifies this ritual as the wave-open obligation.

---

## Corroboration (this is a CONSTELLATION failure class)

Three independent repos re-discovered the same headless-green/visually-broken gap, and the
same "drive the live edge before you believe the source audit" fix:

- **keyframes.js H audit** — 35 green gates + 637 tests over a visually-broken demo; ZERO
  pixel-diff infra; the 181-sample no-morph capture. The named precepts adopted here
  **verbatim**: "Runtime Truth Beats Source Claims" (2026-04-29), "Read-Only Audits Miss
  Runtime" (2026-05-05), "Visual-Runtime Probe Coverage Stop-Rule" + "Visual
  Load-Bearing-ness Bar" (2026-05-06).
- **speedtest AT real-edge validation** — a live Playwright drive REFUTED two source-audit
  findings (incl. the "VT kills the dial CLS" claim, the direct analogue of AW's dock
  misdiagnosis) and surfaced FOUR live latent bugs the source read missed.
- **slides H** — "e2e specs authored but NOT executed": the same non-execution gap the π
  lane closes by making the fail-CLOSED arm binding (the workspace carries the device as a
  devDependency, so the verdict is binding, not provisional).

---

## CLS-witness discipline (folded — speedtest W-RATCHET)

A CLS witness is the Lighthouse-JSON settled-trace OR a multi-trial median + a dial-height
trace — **NEVER a single buffered-observer shot**. Baked into the π lane's acceptance form
(the readPixels / rAF arms sample N times and take a robust verdict; a single flaky frame
cannot flip a gate).
