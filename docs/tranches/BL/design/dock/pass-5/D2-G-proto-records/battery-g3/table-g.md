| row | witness | fv4 | g |
|---|---|---|---|
| P1 | W1 (card per H5-12) + W7 | FAIL (morph·first-expand[corner] C, morph·warm-collapse[corner] C, morph·warm-expand[corner] C +33) | OWNER-BLOCKED OB 12 |
| P2 | W2 (reach by key, H5-1) | PASS | PASS |
| P3 | W3 every check, W6 (H5-5), W8 | FAIL (first-expand[window,seatStep,seatOverlap,leaving,faces] C, warm-collapse[window,seatStep,seatOverlap,leaving,faces] C, warm-expand[window,seatStep,seatOverlap,leaving,faces] C +109) | FAIL (warm-collapse[stub] W, reversal[window,stub] W, swap-long[vanish] W +5) OB 4 NR 1 |
| P4 | W4 | FAIL (compact·non-first-current C, compact·non-first-current C·d, compact·non-first-current W +1) | PASS |
| P5 | W5 + R6 | PASS | PASS |
| F1 | W1 rests + W2 | PASS | PASS |
| F2 | W5 | PASS | PASS |
| F3 | W4 coarse, hover gate | PASS | PASS |
| F4 | W4 compact | FAIL (compact·non-first-current C, compact·non-first-current C·d, compact·non-first-current W +1) | PASS |
| F5 | W3 first-expand (faces read in main, H5-9) | FAIL (first-expand[faces] C, first-expand[faces] C·d, first-expand[faces] W +1) | PASS |
| F6 | crash-free (every browser cell) | PASS | PASS |
| F7 | F7 whole suite + gates (H5-10) | PASS | PASS |
| N1 | W3 anchor-end | PASS | PASS |
| N2 | W3 stretch·lead-add | FAIL (stretch·lead-add[seatStep] C, stretch·lead-add[seatStep] C·d, stretch·lead-add[seatStep] W +1) | PASS |
| N3 | W3 lattice, infanim, seat-transition | FAIL (seat-transition[trajectory] W·d) | PASS |
| N4 | W7 gutter, badge, whole, same | PASS | PASS |
| N5 | PR count, readers, partials (H5-8) + W2 long-run-v | PASS | FAIL (prose·readers[readers]) |
| R1 | W3 continuity, seats, paint floor + CASES capped | FAIL (case·capped·morph[errors] C, first-expand[seatStep,seatOverlap,faces] C, warm-collapse[seatStep,seatOverlap,faces] C +64) | PASS |
| R2 | W3 leaving + vanish on every leaver (H5-4) | FAIL (first-expand[leaving] C, warm-collapse[leaving] C, warm-expand[leaving] C +32) | FAIL (swap-long[vanish] W, retarget·120[vanish] W·d) |
| R3 | W3 reversal | FAIL (reversal[trajectory] C, reversal[trajectory] C·d, reversal[trajectory] W +1) | PASS |
| R4 | ST five timings | FAIL (stall·same-task[leap] C, stall·1raf[leap] C, stall·2raf[leap] C +11) | PASS |
| R5 | R5 hit sampler | FAIL (hit·warm-expand[seat,ghost,corner] C, hit·warm-collapse[seat,corner] C, hit·warm-expand[seat,ghost,corner] C·d +5) | PASS |
| R6 | W3 splice + stub, FM stub (H5-3) | PASS | FAIL (warm-collapse[stub] W, reversal[stub] W, swap-short[splice,stub] W +3) NR 2 |
| R7 | W3 lanes + seat positions (H5-7) + CASES rotated | PASS | PASS |
| R8 | W3 neighbour + ST nb + CASES consumer-margin | FAIL (case·consumer-margin[follows] C, case·consumer-margin·control[follows] C, stall·nb·same-task[neighbour] C +24) NR 2 | FAIL (stall·nb·same-task W, stall·nb·1raf W, stall·nb·2raf W +7) |
| B1 | W3 retarget·context (H5-2) | PASS | PASS |
| B2 | FM strips (tiles, stub) | PASS | PASS NR 1 |
| B3 | PR count, rows, partials, citations | PASS | PASS |
| C1 | CF c1·shape·h (ownshape, corner: H5-6) | PASS | PASS |
| C2 | CF c2 (prm per Q-18 (a): H5-6) | PASS NR 1 | PASS |
| C3 | CF c3 + coarse tap | PASS | PASS |
| C4 | CF c4 | PASS | PASS |
| C5 | CF c5 | PASS | PASS |
| C6 | CF c6 | PASS | PASS |
| C7 | CF vertical + narrow | FAIL (c2·morph·v[continuous] C, c2·morph·v[continuous] C·d, c2·morph·v[continuous] W +1) | PASS |
| C8 | CF c8·outside-press (H5-11) | FAIL (c8·outside-press[opens,collapses] C, c8·outside-press[opens,collapses] C·d, c8·outside-press[opens,collapses] W +1) | FAIL (c8·outside-press[opens,collapses] C, c8·outside-press[opens,collapses] C·d, c8·outside-press[opens,collapses] W +1) |
| C9 | CF c9·short-coarse (H5-11) | FAIL (c9·short-coarse[block] C, c9·short-coarse[block] C·d, c9·short-coarse[block] W +1) | FAIL (c9·short-coarse[block] C, c9·short-coarse[block] C·d, c9·short-coarse[block] W +1) |
| L1 | L1 census | PASS | PASS |

| build | 38 rows PASS | first 36 | first 24 | OWNER-BLOCKED rows | UNMEASURED rows |
|---|---:|---:|---:|---:|---:|
| fv4 | 22/38 | 22/36 | 12/24 | - | - |
| g | 30/38 | 30/36 | 21/24 | P1 | - |
