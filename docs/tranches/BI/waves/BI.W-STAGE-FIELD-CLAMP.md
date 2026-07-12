# BI.W-STAGE-FIELD-CLAMP — the DockStage field clamps to the viewport (9.68MP → ~2.5MP)

Band B5 (substrates / perf). The DockStage aurora field sized to the full scroll column (9.68MP, ~3.9×
visible) clamps to the viewport. Owner = the demo DockStage chassis.

## §Mandate

Discharges (registry rows this wave OWNS):
- **PERF-3 [P0] / FAM-5** — the DockStage aurora canvas sized to the full ~2365px scroll column = 9.68MP
  FBM surface of which ~800px is ever visible (measured live: field backing store 2036×4755 = 9.68MP; CSS
  1357×3170 ≈ 4× viewport).
- **Contributes to UF-C4** ("/dock/overview animations are sluggish and not smooth") — the dock-band owns the
  user row; this wave owns the PERF-3 mechanism (paired with W-DOCK-LUMA-SHARE's PERF-6).

## §Design

Decided mechanism — FAM-5 disposition W-STAGE-FIELD-VIEWPORT-CLAMP + the PASS-3 G2-PERF measurement. The
field is a decorative backdrop; sizing it to the scroll column is pure over-provisioned GPU fill. NO
re-litigating (the mechanism is measured, not contested — GPU fill, not JS; the main-thread rAF held
120fps across a 2.33× pixel range because Chrome is VSync-locked with headroom, but the fill is real on
Safari's compositor under the 12 blur samplings).

- **Clamp the field backing store to the VIEWPORT, not the scroll column.** The DockStage aurora canvas is
  sized to `100dvh` / the visible viewport (the true 806px clamp → ~2.46MP, a 3.9× reduction), not the full
  `~2365px` column. The field scrolls WITH the page (position:sticky / fixed backdrop) so the visible region
  is always painted, but the backing store never exceeds the viewport (the offscreen scroll column is never
  rasterized).
- **The demo DockStage chassis is the owner** (`demo/stories/dock/DockStage.vue`) — this is a demo-chassis
  sizing fix, NOT a library `<Aurora>` change (the library aurora already clamps DPR; the demo mounts it at
  the wrong size). Presets-in-consumers: the library ships the correct-sized aurora; the demo chassis sizes
  it right.

## §Work

- `demo/stories/dock/DockStage.vue` — size the aurora backing store to the viewport (`100dvh` / a
  ResizeObserver on the visible region), not the full scroll-column height; keep the field visible under
  scroll via sticky/fixed positioning; verify the DPR clamp (sub-2× on the wash) rides through.
- Confirm the `preserveDrawingBuffer: true` mount (`:74-82`) is still needed only for the W-DOCK-LUMA-SHARE
  shared observer (coordinate — the two waves share the DockStage aurora).

## §Acceptance

Gate: **`proof:stage-field-clamp`** (NEW; source arm `["local","ci"]`, live measure LOCAL).
Born-RED at HEAD: the DockStage aurora backing store measures 9.68MP (full column). GREEN here.
- SF1 — the DockStage aurora backing store ≤ ~2.5MP (viewport-clamped, not scroll-column-sized) — a
  full-column-sized field REDs.
- SF2 — the field stays visible under scroll (sticky/fixed) — a clamped-but-scrolled-off field (blank
  backdrop) REDs.
- SF3 — the DPR clamp intact (sub-2× wash).
- Self-test bite: a planted scroll-column-sized aurora backing store REDs.

## §π/DELTA

`tests-visual/stage-field-clamp.spec.ts` (NEW; LOCAL real-GPU) + `W-STAGE-FIELD-CLAMP-DELTA.md`:
- The live backing-store measurement on `/dock/overview`: ≤ ~2.5MP (down from 9.68MP), the field visible
  full-viewport under scroll, both modes.
- A GPU-fill / frame-timing capture on **real WebKit** (the UF-C3/C4 Safari-compositor amplification the
  measurement named — headless Chrome is VSync-locked and hides it).
- Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE dock verdict.

## §Obligations

- **Device run (SAF-1):** the frame-timing on real Metal WebKit under the 12 blur samplings (the concrete
  UF-C3 "broken in Safari" amplification — the 9.05MP canvas under backdrop-filter). `dis:safari-metal-verify`
  seam. Shared with W-DOCK-LUMA-SHARE.
- No cross-repo ask (demo-chassis sizing fix; no library API change).

## §Dispositions

- **Coordinate with W-DOCK-LUMA-SHARE (PERF-6)** — both target the DockStage aurora; the shared observer
  (luma) determines whether `preserveDrawingBuffer` survives the clamp. The two together discharge the
  FAM-5 dock-perf pair contributing to UF-C4. No re-book.
