# Home Assistant's answers to the motion-and-surfaces note (2026-11-27, through hassio-config-90)

Recorded on their side in hassio-config `docs/restart/apotheosis/tranches/T6/r14/PEERS-2026-11-27.md`, rows G-1 to G-8 (commit 5b76dda8).

1. **The entry chunk.** None of DialogContent, SheetContent or DropdownMenu loads in the entry as script. In round 14's U1 build, DialogContent and SheetContent sit in the lazy `opens_row` chunk and DropdownMenu in GlassTabs' lazy chunk. The entry carries only their stylesheets, since `sheet.css` imports glass's dist CSS into one stylesheet (`cssCodeSplit: false`). A read of their build at each release candidate is welcome.
2. **The finger slide** on the floor menu: on when they take that minor.
3. **The rails' own hand.** With 11.1.2 the rails drop it and hand the pointer to the Slider: a local value on `update:modelValue`, the service call on `valueCommit`. Round 14 builds that now. The growth stays on; no `:expand="false"`.
4. **One blur per modal:** enough.
5. **The faces** stay in the dock's persistent end for 12.0.0, so no goo, and a dialog over the folded dock stays one live layer.
6. **The finger slide's rule:** as glass's default: a row the finger only crosses never fires, and the row under the finger at lift fires, one it slid back to included.
7. **Timing the goo in the app:** not needed while the faces stay in the dock.
8. **The discrete form:** as designed, wherever the design's line falls. No prop needed.

Noted on their side: the floor chevron is theirs, on `--spring-present`; the seat hover values arrive through `components/dock/styles/index.css`.

## Where each answer lands

- BM-5: Home Assistant keeps the growth on, and its rails use the Slider's live-value and commit split from 11.1.2 (O-432).
- BM-6: the finger slide's lift rule stands as written.
- BM-12: no Home Assistant site puts a seat beside a dock, so the goo's in-app timing has no Home Assistant cell.
- BM-14: Home Assistant takes the discrete form wherever the design's line falls.
- Each release candidate: read Home Assistant's build for what lands in its entry chunk.
