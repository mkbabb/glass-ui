# RA-aurora-config — does the aurora actually have a robust configurator?

Reality audit, 2026-06-09. Live demo driven at `/substrates/aurora` (the demo server on :5199 was down at audit start; restarted `npm run dev -- --port 5199`, same app). Method: playwright (chromium headless-new, ANGLE/Metal) driving the real UI; per-control verdicts are mean per-pixel |ΔR|+|ΔG|+|ΔB| over the central 60% of the stage canvas, judged against a same-state ambient-drift baseline (~5–15 depending on preset). All captures in this directory, `RA-aurora-config-*.png`.

**Verdict: MIXED.** The slider/preset/persistence machinery is genuinely robust and the painterly output is excellent — but every dropdown select in the studio is a dead control (cannot open by any user gesture), which kills 4 of the 9 Atoms controls including the headline medium picker, and the machine gate that exists to prove exactly this (`proof:aurora-atoms-render`) is itself red at HEAD.

## What is genuinely good

### 1. All 13 presets bite, and look excellent
(The brief said 12; there are 13 — `PRESETS` in `demo/stories/aurora/presets.ts`.)

Clicked every card in the picker row; per-preset delta vs the previous field, against drift ≈ 10.75:

| preset | delta | | preset | delta |
|---|---|---|---|---|
| Sky (initial, re-click) | 9.4 = drift, expected | | Oil Gestural | 85.7 |
| Dawn | 259.5 | | Van Gogh | 271.9 |
| Meadow | 293.9 | | OP Sunset | 233.3 |
| Deliberative | 290.5 | | OP Rainbow | 127.2 |
| Day 9 | 127.6 | | OP Ocean | 265.8 |
| Oil Impasto | 358.5 | | Crayon | 195.2 |
| | | | Speedtest | 228.1 |

Every preset is a visibly distinct field with a distinct mean palette (captures `RA-aurora-config-preset-*.png`). Calibrated praise: Van Gogh (swirl-row dabs over blue/ochre) and Oil Impasto (saturated red strokework) are genuinely striking — these are not token presets, the mediums read as different paint. Keyboard ArrowRight preset cycling also works (delta 266.5).

### 2. Every slider bites live
Atoms tab (after the first-edit takeover, see §weak-3): seed→`#ff2200` 136.7, energy→1 21.5, zones-count→6 76.9, noise→1 14.0. Advanced tab (82 sliders counted on the surface): Stroke amount 15.2, Impasto 18.3, Curl 36.8, Warp amount 28.1 (drift-subtracted re-measure, drift 7.7), Saturation→Home 115.5, Nuclei Radius→Home 32.4 (drift 10.4), Nucleus X→End 8.5 (drift 3.3). No dead slider found. Captures `RA-aurora-config-atom-*.png`, `RA-aurora-config-adv-*.png`.

### 3. Per-preset clone persistence holds exactly as the contract claims
`cloneMode: "per-preset"` live round-trip: Sky → Advanced → Comp → Saturation 0.95 → End (1.3) → switch to Dawn → back to Sky → Saturation still **1.3** (slider value AND canvas, `RA-aurora-config-persist-{edited,return}.png`; canvas delta edited-vs-return 17.6 ≈ drift). Reset button restores 0.95. This is the configurator contract doing what the CLAUDE.md says it does, verified on the painted artifact.

### 4. Derive-from-color is wired
Palette layer: seed `#ff0066` + Triad chip + Derive → field delta 139.7 (`RA-aurora-config-adv-derive.png`). The harmony chips are a ToggleGroup, not a Select, so they escaped the dead-select defect. Aesthetic caveat: on the oil medium this particular derive landed in a murky dark red-brown — it bites, but derive output is not uniformly beautiful.

### 5. Stage interactions and chrome work
- alt-click spawns a nucleus (overlay rings 4→5), shift-click removes it (5→4).
- Fullscreen expand re-mounts the canvas and it keeps painting; Esc exits; studio state survives (`RA-aurora-config-fullscreen.png`).
- Responsive: at 390×844 the studio stacks cleanly — presets row, stage, full-width controls — everything reachable (`RA-aurora-config-mobile-390.png`).
- Zero console errors, zero pageerrors, zero NaN strings in the DOM across every phase.

## What is broken or overstated

### 1. ALL FIVE dropdown selects in the studio are dead controls — BROKEN
Harmony, Arrangement, Medium, Motion (Atoms tab) and Medium (Advanced tab) **cannot be opened by any user gesture**. Live-verified every plausible gesture on the Harmony select: click, Space, Enter, ArrowDown, typeahead — `aria-expanded` stays `false`, zero `[role=option]` ever mounts. Same result on the Advanced Medium select (`RA-aurora-config-dead-selects.png` shows it closed post-click).

Root cause (read-only diagnosis): `LabeledSelect` requires `isOpen: boolean` and binds it as reka's **controlled** `open` prop; all five aurora sites pass a literal `:is-open="false"` and never handle `@update:open` (`AuroraAtomsPanel.vue` ×4, `config/MediumLayer.vue` ×1), so the select is controlled-shut forever. Other demo consumers (`compositions/settings.vue`, `configurator.vue`, `labeled-field.vue`) wire `v-model:is-open` correctly and work — so the component functions; the aurora wiring is the bug, enabled by a footgun API (a required controlled-open prop with no uncontrolled default). This is exactly the memorized defect class: a stale controlled-prop binding that silently no-ops and only e2e catches.

Blast radius: the user cannot change **harmony, zone arrangement, medium, or motion** — the medium picker is the headline atom ("ONE medium picker, Title-Cased") and it is dead chrome. The **Texture slider is therefore unreachable** through the UI (it only appears when medium ≠ smooth, and the only way to get a textured medium is preset selection, never the atom).

### 2. The gate built to prove "atoms are WIRED, not dead" is itself red — CLAIM-OVERSTATED
Ran `tests-visual/aurora-atoms-render.spec.ts` against the live demo: **FAILED** — timeout waiting for `[data-atom="medium"] select`. The spec drives native `<select>`/`input[type=range]` markup; the panel was re-skinned to LabeledSelect/LabeledSlider (reka combobox + role=slider thumbs) and the gate was never updated. So `proof:aurora-atoms-render` currently attests nothing, while the spec file was last touched in a commit titled "AY Batch 2 COMPLETE … gates green". Ironically the defect it was designed to catch (a dead select atom) is live right now.

### 3. Minor honest notes
- **Atoms-takeover semantics**: the first touch of ANY atom replaces the whole per-preset config with the atoms-default resolution (delta 255.7, `RA-aurora-config-atoms-baseline.png`). By design (`applyAtoms` copies `resolveAtoms` over the live config), but it means nudging one Atoms slider on Van Gogh discards the entire Van Gogh look. A user will read that as data loss, not as a documented contract.
- **Swirl drag is subtle**: measured post-release, 8.3 vs drift 5.8 — present but weak as captured (the effect may read stronger mid-drag; my measurement is after mouseup).
- Warp scale→End read 16.9 vs drift 14.9 — marginal at that preset/state; not called dead (warp amount clearly bites at 28.1/7.7).

## Robustness scorecard

| axis | verdict |
|---|---|
| preset coverage (13/13 visibly distinct) | PASS, excellent |
| sliders (atoms + 82 advanced) | PASS — every slider driven bites |
| selects (5 dropdowns) | **FAIL — all dead** |
| texture atom | **UNREACHABLE** (consequence of dead medium select) |
| derive-color path | PASS (output quality uneven) |
| per-preset clone persistence + reset | PASS, exactly per contract |
| nuclei direct manipulation (spawn/remove/drag-zone sliders) | PASS |
| fullscreen / keyboard shortcuts / responsive 390px | PASS |
| errors/NaN/jank | none observed |
| machine gate honesty | **FAIL — proof:aurora-atoms-render red at HEAD** |

The configurator's architecture (preset clones, reset, the 82-slider advanced escape hatch, the live canvas wiring) is real and well-built — this is most of the way to a genuinely SOTA studio. But "robust" cannot be claimed while a third of the default control surface is dead to every user gesture and the gate that would have caught it no longer matches the DOM it gates.
