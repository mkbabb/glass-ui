| row | witness | head | fv3 | bp | g |
|---|---|---|---|---|---|
| P1 | W1 (card per H5-12) + W7 | FAIL (sidebar·short-viewport[corner] C, rail·rest[corner] C, rail·scrolled-end[corner] C +53) | FAIL (morph·first-expand[corner] C, morph·warm-collapse[corner] C, morph·warm-expand[corner] C +6) | — | — |
| P2 | W2 (reach by key, H5-1) | FAIL (route1·long-run-h[ring] C, route1·long-run-v[ring] C, route2·collapsed-layer[scroller] C +9) | PASS | — | — |
| P3 | W3 every check, W6 (H5-5), W8 | FAIL (first-expand[continuity,window,trajectory,terminal,seatStep,seatOverlap] C, warm-collapse[window,seatStep,seatOverlap,leaving,faces] C, warm-expand[landing,window,seatStep,seatOverlap,leaving,faces] C +53) | FAIL (first-expand[window,seatStep,seatOverlap,leaving,faces] C, warm-collapse[window,seatOverlap,leaving] C, warm-expand[window,seatStep,seatOverlap,leaving,faces] C +25) | — | — |
| P4 | W4 | FAIL (compact·compacts C, compact·engagement-expands C, compact·no-threshold-bounce C +19) | FAIL (compact·non-first-current C) | — | — |
| P5 | W5 + R6 | FAIL (h·expanded C, h·collapsed C, v·expanded C +9) | PASS | — | — |
| F1 | W1 rests + W2 | FAIL (route1·long-run-h[ring] C, route2·collapsed-layer[scroller] C, route3·aria-current[scroller] C +15) | PASS | — | — |
| F2 | W5 | FAIL (h·expanded C, h·collapsed C, v·expanded C +9) | PASS | — | — |
| F3 | W4 coarse, hover gate | FAIL (coarse·press-then-scroll C, coarse·no-hover-latch C, coarse·tap-pins C +3) | PASS | — | — |
| F4 | W4 compact | FAIL (compact·compacts C, compact·engagement-expands C, compact·no-threshold-bounce C +13) | FAIL (compact·non-first-current C) | — | — |
| F5 | W3 first-expand (faces read in main, H5-9) | FAIL (first-expand[continuity] C, first-expand[continuity] C·d) | FAIL (first-expand[faces] C) | — | — |
| F6 | crash-free (every browser cell) | PASS | PASS | — | — |
| F7 | F7 whole suite + gates (H5-10) | — | — | PASS | FAIL (f7·gate·boot-graph[gate]) |
| N1 | W3 anchor-end | FAIL (anchor-end·warm-expand[anchor] C, anchor-end·warm-collapse[anchor] C, anchor-end·warm-expand[anchor] C·d +1) | PASS | — | — |
| N2 | W3 stretch·lead-add | FAIL (stretch·lead-add[seatStep] C, stretch·lead-add[seatStep] C·d) | FAIL (stretch·lead-add[seatStep] C) | — | — |
| N3 | W3 lattice, infanim, seat-transition | FAIL (seat-transition[trajectory] C·d) | FAIL (seat-transition[trajectory] C) | — | — |
| N4 | W7 gutter, badge, whole, same | FAIL (side·light·dpr1[gutter,badge] C, canvas·light·dpr1[gutter] C, side·light·dpr2[gutter,badge] C +21) | PASS | — | — |
| N5 | PR count, readers, partials (H5-8) + W2 long-run-v | FAIL (route1·long-run-v[ring] C, route1·long-run-v[ring] C·d, prose·readers[readers] +2) | FAIL (prose·partials[partials]) | FAIL (prose·partials[partials]) | FAIL (prose·readers[readers], prose·partials[partials]) |
| R1 | W3 continuity, seats, paint floor + CASES capped | FAIL (first-expand[continuity,trajectory,terminal,seatStep,seatOverlap] C, warm-collapse[seatStep,seatOverlap,faces] C, warm-expand[landing,seatStep,seatOverlap,faces] C +36) | FAIL (first-expand[seatStep,seatOverlap,faces] C, warm-collapse[seatOverlap] C, warm-expand[seatStep,seatOverlap,faces] C +14) | — | — |
| R2 | W3 leaving + vanish on every leaver (H5-4) | FAIL (warm-collapse[leaving] C, warm-expand[leaving] C, content-remove[leaving,vanish] C +12) | FAIL (first-expand[leaving] C, warm-collapse[leaving] C, warm-expand[leaving] C +6) | — | — |
| R3 | W3 reversal | FAIL (reversal[trajectory] C, reversal[trajectory] C·d) | FAIL (reversal[trajectory] C) | — | — |
| R4 | ST five timings | FAIL (stall·same-task[leap] C, stall·1raf[leap] C, stall·2raf[leap] C +5) | FAIL (stall·same-task[leap] C, stall·1raf[leap] C, stall·2raf[leap] C +5) | — | — |
| R5 | R5 hit sampler | FAIL (hit·warm-expand[seat,ghost,corner] C, hit·warm-collapse[seat,corner] C, hit·warm-expand[seat,ghost,corner] C·d +1) | FAIL (hit·warm-expand[seat,ghost,corner] C, hit·warm-collapse[seat,corner] C) | — | — |
| R6 | W3 splice + stub, FM stub (H5-3) | FAIL (retarget·80[stub] C, retarget·120[stub] C, retarget·80[stub] C·d +1) | PASS | — | — |
| R7 | W3 lanes + seat positions (H5-7) + CASES rotated | PASS | PASS | — | — |
| R8 | W3 neighbour + ST nb + CASES consumer-margin | PASS | FAIL (case·consumer-margin[follows] C, case·consumer-margin·control[follows] C, stall·nb·same-task[neighbour] C +8) | — | — |
| B1 | W3 retarget·context (H5-2) | PASS | PASS | — | — |
| B2 | FM strips (tiles, stub) | PASS | PASS | — | — |
| B3 | PR count, rows, partials, citations | FAIL (prose·count[count], prose·partials[partials]) | FAIL (prose·partials[partials]) | FAIL (prose·partials[partials], prose·citations[citations]) | FAIL (prose·partials[partials]) |
| C1 | CF c1·shape·h (ownshape, corner: H5-6) | FAIL (c1·shape·h[square,summary,ownshape] C, c1·shape·h[square,summary,ownshape] C·d) | FAIL (c1·shape·h[square,summary] C) | — | — |
| C2 | CF c2 (prm per Q-18 (a): H5-6) | FAIL (c2·morph·h[continuous] C, c2·morph·h[continuous] C·d) | PASS | — | — |
| C3 | CF c3 + coarse tap | FAIL (c3·scroll[collapses] C, c3·scroll[collapses] C·d) | FAIL (c3·scroll[collapses] C, c7·coarse-tap[opens] C) | — | — |
| C4 | CF c4 | PASS | PASS | — | — |
| C5 | CF c5 | FAIL (c5·keyboard[disclosure,escape] C, c5·keyboard[disclosure,escape] C·d) | FAIL (c5·keyboard[disclosure,escape] C) | — | — |
| C6 | CF c6 | FAIL (c6·menu[menu] C, c6·menu[menu] C·d) | FAIL (c6·menu[menu] C) | — | — |
| C7 | CF vertical + narrow | FAIL (c1·shape·v[ownshape] C, c2·morph·v[continuous] C, c1·shape·v[ownshape] C·d +1) | FAIL (c2·morph·v[continuous] C, c7·coarse-tap[opens] C) | — | — |
| C8 | CF c8·outside-press (H5-11) | FAIL (c8·outside-press[collapses] C, c8·outside-press[collapses] C·d) | FAIL (c8·outside-press[opens,collapses] C) | — | — |
| C9 | CF c9·short-coarse (H5-11) | FAIL (c9·short-coarse[block] C, c9·short-coarse[block] C·d) | FAIL (c9·short-coarse[opened] C) | — | — |
| L1 | L1 census | PASS | PASS | — | — |

| build | 38 rows PASS | first 36 | first 24 | OWNER-BLOCKED rows | UNMEASURED rows |
|---|---:|---:|---:|---:|---:|
| head | 7/38 | 7/36 | 3/24 | - | F7 |
| fv3 | 15/38 | 15/36 | 10/24 | - | F7 |
| bp | 1/38 | 1/36 | 1/24 | - | P1, P2, P3, P4, P5, F1, F2, F3, F4, F5, F6, N1, N2, N3, N4, R1, R2, R3, R4, R5, R6, R7, R8, B1, B2, C1, C2, C3, C4, C5, C6, C7, C8, C9, L1 |
| g | 0/38 | 0/36 | 0/24 | - | P1, P2, P3, P4, P5, F1, F2, F3, F4, F5, F6, N1, N2, N3, N4, R1, R2, R3, R4, R5, R6, R7, R8, B1, B2, C1, C2, C3, C4, C5, C6, C7, C8, C9, L1 |
