# Orchestrator note, round 5

## K3 ruling: r1 holds

The rule is r1: a run that hides nothing has nothing to scroll, at every width, 320 coarse included.
Fix 3's e4 bound (a sub-reserve overrun scrolls exactly the overrun) is withdrawn.

Cure: when every seat fits the port, the run's reserve yields to the room actually left.
- Each side's reserve is at most half the port minus the seats.
- At 320 coarse that room is about 7.8 px a side, which still covers the 6.6 px focus ring.
- The run then has zero overflow. Its corners rest at the cap length.

Do not widen a viewport-capped plate. One mechanism only, per N-16: no spacer on top of a clamp.

Gate:
- 320 coarse and fine, both engines, `sw == cw` with the rest corners at the cap within 0.5 px.
- The end seat's ring stays whole.

K1 and K2 are regressions against v10.1.4 and must be cured, not bounded.

## The CHANGELOG is outward prose

Consumers read it. The 10.1.5 entry must carry no internal terms:
- no O-NNN or row ids (r1, r5…)
- no `docs/tranches` or `docs/release-10.1.5` record paths
- no seat, critic, fix-round or "build" vocabulary

Describe each change as a consumer sees it, in plain, warm sentences, and keep the measurements that help a reader. The close seat applies this when it sets the cut date.
