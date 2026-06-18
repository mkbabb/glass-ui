# W-AUR-KUWAHARA-DELTA — the anisotropic-Kuwahara painterly MEDIUM (BUILD branch)

**Freshness header**: capture date 2026-06-17 · HEAD `ff2af9e3` (BB round 4, branch `tranche/BB`) · render server `:5199`.

## BUILD — the binding π rides W-REFLECT3 (Batch 7)

The fired verdict is **BUILD** (`docs/tranches/BB/audit/W-AUR-KUWAHARA-DECISION.md`): the SOFT polynomial-weighted anisotropic-Kuwahara finish ships SINGLE-PASS as the opt-in `medium:"kuwahara"` (`uMedium == 7`, default-OFF). Per the cardinal-lesson Playwright architecture, the binding live-GPU captures ride **W-REFLECT3** (Batch 7) — a per-mechanism source green does not close a visual wave (BA inv-4). This DELTA records the source-state arm (GREEN at this wave) + the captures the reflect wave OWES.

## What W-REFLECT3 captures (the owed BUILD evidence)

1. **The painterly BEFORE/AFTER** — the oil + oil-pastel + the NEW kuwahara medium full-bleed in BOTH light + dark over the real `/substrates/aurora` backdrop (the AY §4.4 NON-NEGOTIABLE painterly-medium DELTA discipline). The kuwahara medium reads as edge-preserving oil-paint flat patches with crisp colour-zone boundaries — distinct from the oil/oil-pastel stroke-deposition register.
2. **The no-pinwheel orientation-HISTOGRAM readback** (`RESEARCH.md:133-134,178`) — the §4.2 orientation-histogram peak/mean detector over the kuwahara flat-field worst case. The SOFT polynomial-weighted blend (8 OVERLAPPING sectors, gaussian-of-angular-distance weights, `1/(1+var^q)` variance-weighted mean) carries NO periodic spike — the whole point of the soft blend over the pre-2010 hard argmin (which BANDS into the 8-spoke pinwheel). A histogram spike on the flat field would RED.
3. **The `proof:ba-gestalt` aurora verdict** — captured whole-page both modes over the kuwahara render, recorded PASS (the painterly band reads as oil-paint, not a pinwheel-banded artefact).

## The source-state arm — GREEN at this wave

- `proof:aur-kuwahara` PASS — the booking DECIDED (verdict BUILD), NO phantom-wave re-book in the live aurora tree, the single-pass kuwahara medium (uMedium==7) shipped opt-in default-unchanged, aurora.wgsl byte-untouched. The W1 anti-evasion bite is proven: a planted `named T5 ... successor` re-book pointer in the live tree REDs the gate; removing it restores GREEN.
- `npm run typecheck` PASS (the aurora tree; the sibling flow-field WIP build error is OUT of bounds).
- `proof:offscreen-pause` PASS unchanged — the kuwahara medium adds NO new rAF/FBO; it rides the EXISTING single-pass loop (one draw, one shader), so the PRM-freeze + offscreen-pause + the demand-loop are honoured by construction.
- `proof:aurora-preset-roster` / `proof:aurora-atoms-roundtrip` / `proof:aurora-vangogh-preset` PASS — the existing mediums are byte-unchanged; the new union member is handled in the atoms round-trip + texture fan-out.

## The mechanism (recorded)

`mediumKuwahara()` (`mediums.glsl.ts`, `uMedium == 7`):
- Orient an elliptical kernel along `structureTensorField` (the AW.W4.1 single-pass keystone), squeezed by the coherence A (`aniso = mix(1.0, 0.34, A)` minor/major ratio) — long-thin along the colour band where coherent, near-circular in flat zones.
- 4 rings × 8 angular taps = 32 procedural `sampleBase` neighbourhood samples over the ellipse.
- 8 OVERLAPPING sectors via smooth gaussian-of-angular-distance weights (`exp(-d²·2.2)`), each accumulating a weighted mean + luma-variance.
- The output is the variance-weighted blend of the sector means (`1/(1+pow(var·320, 4))` — low-variance sectors dominate; the SOFT criterion, NOT a hard argmin → no pinwheel by construction).
- A center-anchor mix (`mix(center, result, 0.35+0.65·A)`) makes the operator a near-no-op in flat zones (the smoothing only bites at edges); a faint canvas tooth + pigment-sat lift gives the flattened patches the oil-paint read; `uStrokeAmount` is the finish-strength knob.

## The fence

- The aurora WebGL2 medium tree is edited (the OWNING wave's GLSL — the fence's explicit-widen clause).
- `aurora.wgsl.ts` is BYTE-UNTOUCHED — the WGSL primary renders the smooth core for EVERY painterly id (no medium dispatch), so a `medium:"kuwahara"` config on WebGPU degrades to the smooth core, NEVER an error. The kuwahara WGSL is the booked W-AURORA-WGPU-MEDIUMS tail.
- No ppmycota/demo hue enters a library aurora token (kuwahara reads the existing palette).

## Budget

`dist/aurora.js` grows past the `{ raw: 130_000, gzip: 42_000 }` ceiling — the BB-9th lift named "a future aurora medium" as its successor; kuwahara IS that successor (the kuwahara GLSL adds ~5879 raw / ~2528 gzip in isolation). The budgetNote is returned (new ceiling `{ raw: 150_000, gzip: 50_000 }`); the orchestrator bumps `profile-bundle.mjs` BUDGETS + `proof-aurora-oilpastel-medium.mjs` in lockstep, coordinating the cumulative ceiling across the sibling W-AURORA-WGPU WGSL growth.
