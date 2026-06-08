# AX.W03 — π-lane visual-truth recipe (orchestrator-run, real browser)

The headless impl lane CANNOT drive a real browser. This recipe is the EXACT
live-verify the orchestrator runs (Playwright + Chrome MCP, real GPU darwin) to
close the wave on the APPEARANCE/INTERACTION axis. The headless mount gate
(`proof:dock-hold-contract`) proves the binding fires; this proves it PAINTS.

## Route + section

Demo route: `/compositions/dock-with-slider`
Target section: the AW.W3 hold story — wrapper `[data-testid="dock-slider-hold"]`
(a collapsible `<GlassDock :collapse-delay="600">` with an in-dock `<Slider>`).
Also exercise the first section (a `fit-content` dock, always-expanded slider).

## The proof gesture (REAL pointer)

1. `page.hover` the dock to expand it (collapsed → hover); confirm
   `.glass-dock.expanded`.
2. Real `pointerdown` on the slider thumb/track (the `[data-slot="slider"]` host),
   then a real drag of the thumb a few px.
3. `pointerleave` the dock bounds (relatedTarget = body) — the idle-collapse
   trigger — and HOLD past the 600ms `collapse-delay` (sample at ~900ms while the
   pointer is still down).
4. ASSERT, mid-hold (BY EYE + by class):
   - `.glass-dock` still carries `.expanded` AND `data-held` (substrate
     tier-shade painted — `.glass-dock[data-held]` in dock.css) — does NOT
     idle-collapse under the held thumb;
   - the slider root carries `data-held` and the thumb-halo intensified
     (`.glass-slider[data-held] .slider-thumb` denser surface-tint ring,
     box-shadow `0 0 0 8px var(--surface-tint-15)`).
5. Real `pointerup` on `window` (reka pointer-captures the thumb so release
   bubbles to window). ASSERT release re-arms the idle timer: the dock collapses
   AFTER release (sample ~700ms post-release), NOT during the drag; `data-held`
   clears on both roots.

## Touch arm

Repeat under touch emulation (Playwright `hasTouch` / a touch device context):
a touch drag of the in-dock slider holds identically (the `useDockHold` touch
path drives the SAME single acquire via the `useTouchGate` scroll-vs-drag
arbitration). Confirm a vertical scroll on the dock pill does NOT acquire (the
gate cancels the pending tap > 10px).

## Capture protocol (AX.W00 paired-π)

Capture BEFORE(broken-HEAD: collapses under the thumb, no halo) vs
AFTER(fixed: holds + halo) over ≥3 viewports (desktop / tablet / mobile) and
write `DELTA.md` (the compare-at-close). A human-readable frontend-design audit
signs off the appearance (halo intensity reads, substrate tier-shade reads, the
release timing feels like a settle not a snap). The wave does NOT close until
that sign-off lands.

## Numeric assertions the orchestrator can probe

- `document.querySelector('[data-testid=dock-slider-hold] .glass-dock').classList.contains('expanded')` === `true` at +900ms mid-hold.
- same `.getAttribute('data-held')` === `'true'` mid-hold; `null` at +700ms post-release.
- `document.querySelector('[data-slot=slider]').getAttribute('data-held')` === `'true'` mid-hold.
- the thumb's computed `box-shadow` spread ≥ 8px while held (the intensified rung) vs ≤ 4px at rest.
