# PASS-2 REVERIFY QUEUE — checks needing live paint, queued by cure seats for the re-verify seat

One heading per seat; each row carries exact steps + acceptance numbers. Append under your own
heading only.

## F3

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat F3, 2026-07-18 —
no browser owned this seat. Page: `prototypes/f3-channel-conductor/index.html` via `file://`.
All bands below are the shipped BANDS block bands (printed = gated).

1. **Paint-side battery, both engines (closes G9).** Steps: load page → check "paint-side
   sampling (computed-style)" → Run full battery. Then uncheck and run again (internal mode).
   Do this in Chrome ≥150 and WebKit/Safari ≥26. Acceptance: 12/12 gates PASS in paint-side
   mode on each engine; fade t90 ∈ 133–267 ms; geometry t99 ∈ 583–667 ms; per timing row
   |paint-side − internal| ≤ 17 ms (±1 frame @60 Hz; on faster displays use that display's
   frame interval). The summary line must say "sampling: PAINT-SIDE".
2. **Chrome style-recalc attribution on the stress page (the G2 ruling's second-engine
   deepening).** Steps: DevTools Performance trace ≥6 s while running "Stress ×3"; repeat with
   960 injected descendant consumers reading the channel vars inside `.stage` (paste in console:
   `const s=document.querySelector(".stage");for(let i=0;i<960;i++){const d=document.createElement("i");d.style.cssText="position:absolute;width:1px;height:1px;opacity:calc(var(--ch-content))";s.appendChild(d)}`).
   Acceptance: style-recalc attributed to the var writes avg ≤ 6 ms/frame at +960 consumers;
   no frame > 24 ms (parity with the WebKit differential: avg 14.7 ms total frame, worst 18 ms).
3. **Sub-sat medium exhibit, Chrome arm (G4 parity — WebKit exhibit exists:
   `f3-wk-held-near-closed.png`).** Steps: open fully; drag toward closed and HOLD near-closed
   at g ≈ 0.10 (readout g between 0.08–0.11); sample
   `getComputedStyle(document.querySelector(".stage .scrim")).opacity`. Acceptance: computed
   scrim opacity = g/0.12 ±0.02 at the held g (0.833 at g=0.10); screenshot shows home icons
   readable through visibly THINNED blur vs the full-open state.
4. **Tempo-rebuild velocity carry (G13).** Steps: click Open; ~150 ms into the flight toggle
   "slow-mo ×4". Acceptance: motion continues from its live position WITHOUT an arrest/dead
   stop (the pre-cure behavior seated the rebuild at zero velocity); conductor state readout
   stays "running" across the toggle; geometry proceeds monotonically to 1.000.
