# ASK-GU-REDUCED-MOTION-FADE (round 2 root cause): the a11y override zeroes every transition

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: MOTION LAW P0 (owner, 2026-11-12): "Reduced motion shortens travel to a fade and never cuts." **Restates**: `seat-a/ASK-GU-REDUCED-MOTION-FADE.md`, with the root cause the r2 walks found.

**What I see on 11.0.1** (geometry-motion r2 H5; contrast-a11y r2; owner-eye r2 H-C6c). Under `prefers-reduced-motion: reduce`:
- `dist/utilities/a11y-overrides.css` sets `*, *::before, *::after { transition-duration: 0s !important }` in `@layer components`. Every computed `transition-duration` in the app is 0 s, so speedtest's own reduced-motion fades (`stage-swap`, `stage-ledger`, `pane-slide`'s fade, the seat glyph fill) are dead.
- glass's tempo also collapses `--spring-present-duration` to 0, so anything timed on it (the stage swaps, the seat width tween) has no duration.

What the owner sees: from idle to ping the headline, readout and ledger go from opacity 0 to 1 in one frame; from complete to rest the ledger, its cells and the readout leave in one frame; on every route change the card's opacity jumps between 0 and 1 in one frame; the card height steps 67.4 px at once.

**What I ask.** Under reduced motion glass shortens travel to a fade instead of removing time:
- the override drops `transition-duration: 0s !important`, and instead removes transforms or translations from glass's own motion (or zeroes only `transition-property: transform, translate, scale, rotate`);
- `--spring-*-duration` under reduce resolves to a short fade duration (for example the press row's), not 0;
- opacity and colour transitions keep a duration.

**What I will not do locally.** I will not override glass's a11y layer or its tempo from speedtest. The speedtest-local reduced-motion cut (the run clock's follower snap at `useRunClock.ts:273`) is deleted in this round.
