# D2: closed as a design loop

Written 2026-11-10 by the W-I.8 spec seat, on `review/fable-2026-11-10/design-D2.md`. Paths are under `docs/tranches/BL/`.

**D2 is closed.** No pass 15 is planned, whichever way pass 14 reads. Its completion chain had written no harness-end line when this was written (`design/dock/pass-14/D2-Bp-crit-records/c/chain.log`, last line 2026-11-10 21:56:08); its report is filed as a record when it ends and changes nothing here. A clean pass 14 would be a second draw from ground the registry itself calls near-bound (`design/dock/REGISTRY.md` §P13-4), so two clean passes are not the gate. The gate is one battery read on the landed tree (`waves/W-I.8.md`, G-8).

**What D2 gave W-I.8.** Its carrier lands in 11.2.0, rebuilt on master's dock and not on the 10.1.0 one the loop measured:

- one body that steps every lane on the dock spring and then paints;
- one measured model, the plate moved by FLIP with no scale, its box the silhouette in every frame, the elevation on the plate;
- regions and units moved by `translate`, the plate's edge the only clip, hit following paint, the flow, the one window, one trigger per fact;
- the harness (`design/dock/harness/`, H8), with `adapter-head.mjs` for the read of master and `film.mjs` for the strips;
- Q-5 (a), weight with no visible bounce, and Q-6 (a), the plate as a leaf whose insets may move.

**What it does not give.** The content exchange of `pass-13/D2-Bp-p13.patch` (the seam, fronts, lead, sweep, handoff, gift, reveal gain, sliver rule, touch ramp, masks and the leaving clone) is not built. Rows R6 and B2's stub half, rules (a), (b) and (d) and the `splice`, `stub`, `hole` and `vanish` checks retire with it. Of the near-bound classes, as this seat reads their mechanisms, [leaving], [faces], [blank] and R2's ink-drop margin are drawn by the exchange and go with it; [terminal] and [lanes] are read again on the landed tree, and W-I.8 fixes their bounds before that read (OQ-3). The rest of the loop's unit (scroll compact, the rim, the press direction, Q-10) is not W-I.8's; `waves/INDEX.md` places it.

**The two strips for the owner, side by side** (W-I.8 OQ-1). One question: which one is the dock?

- **A, the content exchange of record.** `design/dock/pass-14/D2-Bp-crit-records/c/filmstrips/cl-1/main_strip-chromium-swap-long.png`: bp13, Chromium, light, 40 ms a tile. Tiles 2 to 4 paint "Tools" as "ols" beside a faded half "B". Its WebKit twin is `…/c/filmstrips/wl-1/fmlow-light_rerun1_strip-webkit-swap-long.png`, and the way back is `…/cl-1/main_strip-chromium-swap-short.png`.
- **B, the timed fade.** No strip of it exists yet. Pass 2 specified it (`design/dock/pass-2/D2-Bp-spec.md:202`), but its prototype wrote the opacity at the wrong depth, so its strip shows five tiles of empty glass and not the fade (`design/dock/pass-2/D2-Bp-crit-records/film/crit-chromium-swap-long.png`). W-I.8's order step 3 shoots B with `harness/film.mjs` on the same `swap` scene, Chromium, light, to `design/dock/landing/strip-chromium-swap-long.png` and `strip-chromium-swap-short.png`.

For reference, what 11.0.0 does on a swap today is a one-frame step of 78 px a side: `design/dock-cluster/pass2/png/chromium-r6-swap-v1100-1440-light-design-in-t33.png`.

The default, if no answer comes, is B. If the owner picks A, the exchange lands as bp13 built it.
