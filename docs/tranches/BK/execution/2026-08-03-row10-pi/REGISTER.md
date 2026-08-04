# Row #10 π-SUITE — session register (2026-08-03, ~23:30 ET, driver's serialized browser seat)

**Seat:** the driver directly (holds the browser singleton; three non-browser lanes running in
parallel). Chromium via chrome-devtools MCP. **Port 5400** (the pinned π port, TR#10), dev server
serving src live. **Freshness receipt:** HEAD `690bf937`, `git status --porcelain -- src demo`
clean at capture. **Opening basis:** TR#10 reads "after #9"; the cursor's stated reason was
⊕¹³ᵃ detector recovery, satisfied at `6cf8eb51` (re-derived AND committed) — the capture cells
below quote no register figure, so nothing here rides ahead of #9's cure round.

**P0 mode-assertion, demonstrated on this session's own first cell:** adding `.dark` to a
mounted page flips the token arms but NOT the live canvas field — the first hero capture came
back MIXED-MODE (dark plates over a light field) and is banked as
`pi3-hero-MIXED-MODE-INADMISSIBLE.png`, the exact trap the clause exists for. Every admissible
cell below re-mounted with the mode set pre-paint (`vueuse-color-scheme` + class via init
script) and asserts mode in-probe.

## The five named π rows (⊕⁴ U-35)

| row | source claim | verdict | evidence |
|---|---|---|---|
| π-1 CARTOON-INK (`3857b33`) | in-gamut warm-brown `--cartoon-ink`, hue∈[45,85] both modes | **PASS** | computed on a live consumer probe: light `oklch(0.28 0.03 55.9827)` (h=55.98 ✓), dark `oklch(0.34 0.03 67.4529)` (h=67.45 ✓); the dark arm proven ENGAGED (value moved on the class flip, not a stale read). No maroon (a maroon reads h≈20-30 at higher chroma). |
| π-2 GLASS-BLUR-PEER (`cd9ce46`) | dock/button/Card/menu-row resolve ONE blur(8px) leg | **PASS-AS-EVOLVED** | the 8px literal is extinct; the claim's substance (resolved-radius peer lock) survives as the BJ.W-BLUR-LADDER 1px·7px·11px ontology (`src/styles/tokens/glass.css:80-97`). Live paint, light: dock-plate `blur(7px) saturate(1.2)` · glass-quiet card `blur(7px) saturate(1.4) brightness(1.02)` · glass-resting cards `blur(7px) saturate(1.4)` · trigger button `blur(7px) saturate(1.4)` — radius LOCKED, companions per-rung, the law verbatim. Dark: dock + button identical `blur(7px) saturate(1.3) brightness(1.14)` — lock holds. Menu CONTENT `blur(11px)` both modes = the floating magnitude BY current design, not a violation. ⚑ NOTE routed → #22: `glass.css:82` prose still says "the menu-row (the quiet tier)" but no row-level lens exists in the open menu (rows read through the 11px content plate) — stale prose or unbuilt binding, the material apex adjudicates. |
| π-3 FIELD-AURORA (`b3d65eec`) | dark-aware shell field, dark hero AA cleared | **PASS (obligation transferred)** | the BG subject files (`demo/stories/aurora-hero.ts`, `story-hero.css`) are EXTINCT in the demo restructure; the AA obligation transfers to the current hero. Admissible dark-mount cell `pi3-hero-dark-mounted.png`: title ink `rgb(233,230,226)` (L 0.794) over field backdrop L p50 0.039 → **contrast p50 9.45:1 · p95 8.96:1 · p99 5.04:1** vs the 3.0:1 AA-large floor (clears AA-normal 4.5:1 through p99); the 1.45:1 max-pixel is glyph-halo residue of the ink mask, not field. Probe box = the h1 rect (221,83,704×90 CSS), glyph pixels excluded by ink-distance mask. |
| π-4 BACKDROP-BLUR-ENGAGE (`20b09bc7`) | drag-driven backdrop blur engages off `--glass-drawer-t` | **SUPERSEDED-BY-DESIGN** (retired, no capture owed) | the current drawer law forbids the mechanism deliberately: `src/components/drawer/styles.css:376-383` — the radius NEVER reads the per-frame scalar (`blur(calc(--stage-t * Npx))` re-rasterizes every frame, "the cardinal Safari sin, §L7"); the DIM ramps via scrim α while backdrop depth stays material-constant. `--glass-drawer-t` itself is alive (translate axis, `DrawerContent.vue:169-174`). A capture cannot verify a supersession better than the authored law + the drawer's green suite. |
| π-5 Safari `var()`-in-`backdrop-filter` re-answer | real-Safari cell | **OWED — OWNER-GATED** | needs safaridriver enablement (the GUI checkbox); Playwright-webkit inadmissible (engine ≠ shipping app). |

## Batch dispositions

- **U-36:** the 5 AY DELTA `PENDING-RESHOOT (#92)` names — **RETIRED-as-superseded-by-rebuild**,
  this one line, per TR ⊕⁴ (the surfaces were rebuilt 3× since; nothing to reshoot exists).
- **U-37:** the device-parity record — **RETIRED BY RULING**, restated here at its homing row:
  WebGPU-only + the goo fence + the D-2 non-goal kill the cross-backend-parity/goo-p50/metal-box
  triggers.
- **U-38 corner-AA detection cell — HOMED HERE, first reading GREEN.** Light arm
  `u38-corner-preset-light-6x.png` (aurora preset-card top-left arc, cream↔amber+rim): the arc is
  smoothly anti-aliased at 6×, no staircase, no double edge, no fringe → **no first-RED, #22's
  cure ownership not triggered**. Dark arm `u38-corner-dark-4x.png` (hero card corner) consistent.
  Honesty note on admissibility: FROST Q-2's σ≈50 governs material-transmission verdicts; a
  corner-AA cell's operative admissibility is arc-edge CONTRAST (high here); measured substrate σ
  beside each arc: 15.0 (preset field), 0.0 (flat hero patch — why the end-cap cell
  `u38-corner-endcap-light-4x.png` is banked as context only, σ 2.2). No protocol figure faked.

## The momentum-census capture half (#77 → here)

**DEFERRED, with the reason on the record:** ARCHAEOLOGY L1 pairs captures with STATE — and the
census's mechanism half proves GREEN unreachable at HEAD (`data-engaged` 0 hits; suffusion waves
#27/#79-#88 unstarted). A 63×2×2×2 sweep today would re-prove component inertness the detectors
already prove reproducibly, and every cell would be STALE-AT-HEAD the moment the suffusion waves
land. The capture half discharges WITH those waves' landings (each row that moves gets its paired
cell then). It blocks #66, never #68 (⊕²⁵ carve) — nothing in the close path waits on it today.

## Standing after this session

π-1/π-2/π-3 PASS · π-4 retired-by-design · U-36/U-37 retired · U-38 homed GREEN. OWED: π-5
(owner-gated Safari) · the census capture half (deferred to the suffusion landings) · the row-6
Safari cell (same gate). Row #10 is IN-FLIGHT, not sealed — the seal follows the Safari
enablement or an owner ruling that the Safari cells carry to a later close.
