| row | witness | fv4 | bp |
|---|---|---|---|
| P1 | W1 (card per H5-12, Q-12 band H6-11) + W7 | FAIL (morph·first-expand[corner] C, morph·warm-collapse[corner] C, morph·warm-expand[corner] C +33) | PASS |
| P2 | W2 (reach by key, H5-1) | PASS | PASS |
| P3 | W3 every check (W-8 in time, H6-5; Q-4 readings, H6-11), W6 (H5-5), W8 | FAIL (first-expand[window,seatStep,seatOverlap,leaving,faces] C, warm-collapse[window,seatStep,seatOverlap,leaving,faces] C, warm-expand[window,seatStep,seatOverlap,leaving,hole,faces] C +109) UM 12 | FAIL (first-expand[stub] C, warm-collapse[vanish,stub] C, warm-expand[stub] C +49) UM 12 |
| P4 | W4 | FAIL (compact·non-first-current C, compact·non-first-current C·d, compact·non-first-current W +1) | PASS |
| P5 | W5 + R6 | PASS | PASS |
| F1 | W1 rests + W2 | PASS | PASS |
| F2 | W5 | PASS | PASS |
| F3 | W4 coarse, hover gate | PASS | PASS |
| F4 | W4 compact | FAIL (compact·non-first-current C, compact·non-first-current C·d, compact·non-first-current W +1) | PASS |
| F5 | W3 first-expand (faces read in main, H5-9) | FAIL (first-expand[faces] C, first-expand[faces] C·d, first-expand[faces] W +1) | PASS |
| F6 | crash-free (every browser cell) | PASS UM 32 | PASS UM 22 |
| F7 | F7 whole suite + gates (H5-10) | PASS | FAIL (f7·gate·boot-graph[gate]) |
| N1 | W3 anchor-end | PASS | PASS |
| N2 | W3 stretch·lead-add | FAIL (stretch·lead-add[seatStep] C, stretch·lead-add[seatStep] C·d, stretch·lead-add[seatStep] W +1) | PASS |
| N3 | W3 lattice, infanim, seat-transition | PASS | PASS |
| N4 | W7 gutter, badge, whole, same | PASS | PASS |
| N5 | PR count, readers, partials (H5-8), harness (H6-9) + W2 long-run-v + CF | FAIL (prose·harness[harness]) | FAIL (prose·harness[harness]) |
| R1 | W3 continuity, seats, paint floor + CASES capped | FAIL (case·capped·morph[errors] C, first-expand[seatStep,seatOverlap,faces] C, warm-collapse[seatStep,seatOverlap,faces] C +63) | PASS |
| R2 | W3 leaving + vanish on every leaver (H5-4), ink ≤ 1 (H6-3) | FAIL (first-expand[leaving] C, warm-collapse[leaving] C, warm-expand[leaving] C +33) | FAIL (warm-collapse[vanish] C, swap-short[vanish] C, retarget·80[vanish] C +10) |
| R3 | W3 reversal | FAIL (reversal[trajectory] C, reversal[trajectory] C·d, reversal[trajectory] W +1) | PASS |
| R4 | ST five timings | FAIL (stall·same-task[leap] C, stall·1raf[leap] C, stall·2raf[leap] C +5) UM 10 | PASS UM 5 |
| R5 | R5 hit sampler | FAIL (hit·warm-expand[seat,ghost,corner] C, hit·warm-collapse[seat,corner] C, hit·warm-expand[seat,ghost,corner] C·d +5) | PASS |
| R6 | W3 splice + stub (edge, H6-1), FM stub | PASS | FAIL (film·first-expand[stub] C, film·warm-collapse[stub] C, film·warm-expand[stub] C +70) |
| R7 | W3 lanes + seat positions (H5-7) + CASES rotated | PASS | PASS |
| R8 | W3 neighbour + ST nb (markers found, H6-4) + CASES consumer-margin | FAIL (case·consumer-margin[follows] C, case·consumer-margin·control[follows] C, stall·nb·same-task[neighbour] C +14) UM 10 | PASS UM 5 |
| B1 | W3 retarget·context (H5-2) | PASS | PASS |
| B2 | FM strips (tiles, stub, hole) + W3 stub, hole (H6-1, H6-2) | FAIL (film·first-expand[hole] C, film·warm-expand[hole] C, warm-expand[hole] C +9) NR 1 | FAIL (film·first-expand[stub] C, film·warm-collapse[stub] C, film·warm-expand[stub] C +70) |
| B3 | PR count, rows, partials, citations, harness (H6-9) | FAIL (prose·harness[harness]) | FAIL (prose·harness[harness]) |
| C1 | CF c1·shape·h (ownshape, corner: H5-6) | PASS | PASS |
| C2 | CF c2 (prm per Q-18 (a): H5-6) | PASS | PASS |
| C3 | CF c3 + coarse tap | PASS | PASS |
| C4 | CF c4 | PASS | PASS |
| C5 | CF c5 | PASS | PASS |
| C6 | CF c6 | PASS | PASS |
| C7 | CF vertical + narrow | FAIL (c2·morph·v[continuous] C, c2·morph·v[continuous] C·d, c2·morph·v[continuous] W +1) | PASS |
| C8 | CF c8·outside-press (H5-11; opens on collapsed starts, H6-6) | FAIL (c8·outside-press[collapses] C, c8·outside-press[collapses] C·d, c8·outside-press[collapses] W +1) | FAIL (c8·outside-press[collapses] C, c8·outside-press[collapses] C·d, c8·outside-press[collapses] W +1) |
| C9 | CF c9·short-coarse (H5-11) | FAIL (c9·short-coarse[block] C, c9·short-coarse[block] C·d, c9·short-coarse[block] W +1) | FAIL (c9·short-coarse[block] C, c9·short-coarse[block] C·d, c9·short-coarse[block] W +1) |
| L1 | L1 census | PASS | PASS |

| build | 38 rows PASS | first 36 | first 24 | OWNER-BLOCKED rows | UNMEASURED rows |
|---|---:|---:|---:|---:|---:|
| fv4 | 20/38 | 20/36 | 11/24 | - | - |
| bp | 29/38 | 29/36 | 19/24 | - | - |
