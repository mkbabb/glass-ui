# C-A14 · the WebKit list, planned before it starts. It cannot fit one 90-minute acquisition (PE14's WK1 ran 78 min for its first 33 stages,
# E-11 alone 23 min), so it is split here into named acquisitions WK-1, WK-2, WK-3, each ONE `guarded --exclusive webkit --timeout 90`
# (chain.sh WK), queued consecutively for the one WebKit lock. The 88-min start cutoff decides the split at run time: WK-1 takes the list
# in this order until a stage does not fit; that stage and every later one go unchanged to WK-1.held, which is WK-2's list, and so on.
# Planned by estimate: WK-1 = attacks + E-14 + the scoring witnesses but E-11 (~85 min); WK-2 = E-11, idle bar, loop, plants, critics'
# paths, paints, glance, CAP (~85 min); WK-3 = the pass-11 paths and the gated exit side. No cost-bar or drag (Chromium CDP only).
# WebKit retires its browser every 60 navigations (lib.mjs NAV_CAP, tile pass-3 H3-1).
10 cand14-ca14 webkit
10 cand13-ca14 webkit
10 cand12-ca14 webkit
8 cand14-e14 webkit
8 cand14-E-2 webkit
38 cand14-E-10 webkit
8 cand14-hg13 webkit
6 cand14-E-13 webkit
3 cand14-E-3 webkit
4 cand14-E-12 webkit
3 cand14-E-1 webkit
4 cand14-E-4 webkit
8 cand14-E-5 webkit
2 cand14-E-6 webkit
2 cand14-E-7 webkit
2 cand14-E-8 webkit
5 cand14-E-9 webkit
4 cand14-prmplant webkit
28 cand14-E-11 webkit
2 cand8-ca9idle webkit
2 cand14-ca9idle webkit
2 cand8-ca9idle webkit --r 2
2 cand14-ca9idle webkit --r 2
2 cand14-loop webkit
2 plant-chordstep-e14 webkit --only M1,M2
2 plant-rawsum-e14 webkit --only M10
2 plant-nosticky-e14 webkit --only M23
2 plant-norange-e14 webkit --only M24
2 plant-nozoom-e14 webkit --only M22
2 plant-velnone-e14 webkit --only M18,M27
2 plant-velreset-e14 webkit --only M27
2 plant-noimportant-e14 webkit --only M26
2 plant-subtreewait-e14 webkit --only M29
2 plant-level-e14 webkit --only M3
3 plant-reachzero-E-11 webkit --part reachin
2 plant-inlineread-e14 webkit --only residue
2 plant-hostseat-e14 webkit --only M30
6 cand14-ca13c webkit
8 cand14-ce13c webkit --only d1,d2,d3,d4,d5,d6,d7,d8,d9
6 cand14-ca12 webkit --only xf,kind,anchor,errs
5 cand14-ce12 webkit
3 cand14-origin webkit
12 cand14-vals webkit
12 cand14-e11v webkit
4 paint webkit
3 glance-cand14 webkit
8 cand14-cap webkit
8 cand14-ca11 webkit --only side,clock,reverse,wheel,release-mid,exit-side,rerender,hostglide,repress,reach
3 cand14-ca11 webkit --only loud
12 cand14-ce11 webkit --only side,clock,reverse,wheel,release-mid,exit-side,rerender,reach,repress,press-line,noroom,still
4 cand14-ce11 webkit --only loudx,relclock
8 rr-cand14-ce11 webkit --only exit-side --round 1
8 rr-cand11-ce11 webkit --only exit-side --round 1
# Added 2026-11-06 18:2x by the seat's second holder, before WK-1 started (planned, not in flight): A14-A18 past S14's ranges (M7, M8, M13,
# M23, M24) and the load law's re-reads of the attack cells C-1 read FAIL (CR.q's WebKit counterpart), each beside its reference.
6 cand14-ca14 webkit --only A14,A15,A16,A17,A18
6 cand13-ca14 webkit --only A14,A15,A16,A17,A18
6 cand12-ca14 webkit --only A14,A15,A16,A17,A18
6 cand14-ca14 webkit --only A1,A2,A3,A6,A12 --rr 2
6 cand14-ca14 webkit --only A1,A2,A3,A6,A12 --rr 3
3 plant-nozoom-ca14 webkit --only A9
