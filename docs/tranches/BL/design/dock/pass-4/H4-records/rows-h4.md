| row · witness | build | theme | Chromium | Playwright WebKit | source |
|---|---|---|---|---|---|
| P3 · W3 (every check) | head | light | FAIL 13/32; red: first-expand[continuity,window,trajectory,terminal,seatStep,seatOverlap], warm-collapse[window,seatStep,seatOverlap,leaving], warm-expand[landing,window,seatStep,seatOverlap,leaving], content-add[continuity,window,trajectory,terminal,seatStep] +15; UM 3 | FAIL 13/32; red: first-expand[continuity,window,trajectory,terminal,seatStep,seatOverlap], warm-collapse[window,seatStep,seatOverlap,leaving], warm-expand[landing,window,seatStep,seatOverlap,leaving], content-add[continuity,window,trajectory,terminal,seatStep] +15; UM 3 | — |
| P3 · W3 (every check) | head-unshimmed | light | — | FAIL 3/33; red: first-expand[not measured], warm-collapse[not measured], warm-expand[not measured], content-add[not measured] +26; UM 3 | — |
| P3 · W3 (every check) | fv2 | light | FAIL 10/32; red: first-expand[window,seatStep,seatOverlap,leaving], warm-collapse[window,seatStep,seatOverlap,leaving], warm-expand[window,seatStep,seatOverlap,leaving], content-add[continuity,window,trajectory,terminal,seatStep] +18; UM 3 | FAIL 10/32; red: first-expand[window,seatStep,seatOverlap,leaving], warm-collapse[window,seatOverlap,leaving], warm-expand[window,seatStep,seatOverlap,leaving], content-add[continuity,window,trajectory,terminal,seatStep] +18; UM 3 | — |
| P3 · W3 (every check) | bp | light | FAIL 19/32; red: first-expand[splice,lanes], warm-collapse[splice,lanes], warm-expand[splice,lanes], content-remove[splice,lanes] +9; OB 2; UM 4 | FAIL 19/32; red: first-expand[splice,lanes], warm-collapse[splice], warm-expand[splice,lanes], content-remove[splice,lanes] +9; UM 4 | — |
| P3 · W3 (every check) | g | light | FAIL 20/32; red: first-expand[splice,lanes], warm-collapse[splice,lanes], warm-expand[window,splice], content-add[splice] +8; OB 1; UM 4 | FAIL 21/32; red: first-expand[splice,lanes], warm-collapse[splice,lanes], warm-expand[splice], content-remove[splice,lanes] +7; UM 5 | — |
| F5 · W3 first-expand | head | light | FAIL 0/1; red: first-expand[continuity] | FAIL 0/1; red: first-expand[continuity] | — |
| F5 · W3 first-expand | head-unshimmed | light | — | FAIL 0/1; red: first-expand[not measured] | — |
| F5 · W3 first-expand | fv2 | light | PASS 1/1 | PASS 1/1 | — |
| F5 · W3 first-expand | bp | light | PASS 1/1 | PASS 1/1 | — |
| F5 · W3 first-expand | g | light | PASS 1/1 | PASS 1/1 | — |
| F6 · crash-free (every cell) | head | light | PASS 73/73; UM 3 | PASS 73/73; UM 4 | — |
| F6 · crash-free (every cell) | head-unshimmed | light | — | FAIL 3/74; red: stall·same-task[not measured], stall·1raf[not measured], stall·2raf[not measured], stall·100ms[not measured] +67; UM 3 | — |
| F6 · crash-free (every cell) | fv2 | light | PASS 73/73; UM 3 | PASS 73/73; UM 3 | — |
| F6 · crash-free (every cell) | bp | light | PASS 73/73; UM 4 | PASS 73/73; UM 4 | — |
| F6 · crash-free (every cell) | g | light | PASS 73/73; UM 5 | PASS 73/73; UM 7 | — |
| N1 · W3 anchor-end | head | light | FAIL 0/2; red: anchor-end·warm-expand[anchor], anchor-end·warm-collapse[anchor] | FAIL 0/2; red: anchor-end·warm-expand[anchor], anchor-end·warm-collapse[anchor] | — |
| N1 · W3 anchor-end | head-unshimmed | light | — | FAIL 0/2; red: anchor-end·warm-expand[not measured], anchor-end·warm-collapse[not measured] | — |
| N1 · W3 anchor-end | fv2 | light | PASS 2/2 | PASS 2/2 | — |
| N1 · W3 anchor-end | bp | light | PASS 2/2 | PASS 2/2 | — |
| N1 · W3 anchor-end | g | light | PASS 2/2 | PASS 2/2 | — |
| N2 · W3 stretch·lead-add | head | light | FAIL 0/1; red: stretch·lead-add[seatStep] | FAIL 0/1; red: stretch·lead-add[seatStep] | — |
| N2 · W3 stretch·lead-add | head-unshimmed | light | — | FAIL 0/1; red: stretch·lead-add[not measured] | — |
| N2 · W3 stretch·lead-add | fv2 | light | FAIL 0/1; red: stretch·lead-add[seatStep] | FAIL 0/1; red: stretch·lead-add[seatStep] | — |
| N2 · W3 stretch·lead-add | bp | light | PASS 1/1 | PASS 1/1 | — |
| N2 · W3 stretch·lead-add | g | light | PASS 1/1 | PASS 1/1 | — |
| N3 · W3 lattice, infanim, seat-transition | head | light | PASS 3/3 | PASS 3/3 | — |
| N3 · W3 lattice, infanim, seat-transition | head-unshimmed | light | — | FAIL 0/3; red: seat-transition[not measured], lattice[not measured], infanim[not measured] | — |
| N3 · W3 lattice, infanim, seat-transition | fv2 | light | PASS 3/3 | FAIL 2/3; red: seat-transition[trajectory] | — |
| N3 · W3 lattice, infanim, seat-transition | bp | light | PASS 3/3 | PASS 3/3 | — |
| N3 · W3 lattice, infanim, seat-transition | g | light | PASS 3/3 | PASS 3/3 | — |
| R1 · W3 continuity, seats, paint floor | head | light | FAIL 14/30; red: first-expand[continuity,trajectory,terminal,seatStep,seatOverlap], warm-collapse[seatStep,seatOverlap], warm-expand[landing,seatStep,seatOverlap], content-add[continuity,trajectory,terminal,seatStep] +12; UM 3 | FAIL 14/30; red: first-expand[continuity,trajectory,terminal,seatStep,seatOverlap], warm-collapse[seatStep,seatOverlap], warm-expand[landing,seatStep,seatOverlap], content-add[continuity,trajectory,terminal,seatStep] +12; UM 3 | — |
| R1 · W3 continuity, seats, paint floor | head-unshimmed | light | — | FAIL 3/31; red: first-expand[not measured], warm-collapse[not measured], warm-expand[not measured], content-add[not measured] +24; UM 3 | — |
| R1 · W3 continuity, seats, paint floor | fv2 | light | FAIL 15/30; red: first-expand[seatStep,seatOverlap], warm-collapse[seatStep,seatOverlap], warm-expand[seatStep,seatOverlap], content-add[continuity,trajectory,terminal,seatStep] +11; UM 3 | FAIL 14/30; red: first-expand[seatStep,seatOverlap], warm-collapse[seatOverlap], warm-expand[seatStep,seatOverlap], content-add[continuity,trajectory,terminal,seatStep] +12; UM 3 | — |
| R1 · W3 continuity, seats, paint floor | bp | light | PASS 30/30; UM 4 | PASS 30/30; UM 4 | — |
| R1 · W3 continuity, seats, paint floor | g | light | FAIL 29/30; red: retarget·80[seatOverlap]; UM 4 | FAIL 29/30; red: retarget·120[seatOverlap]; UM 5 | — |
| R2 · W3 leaving (H4-5 retarget) | head | light | FAIL 2/8; red: content-remove[leaving], lead-remove[leaving], compaction[leaving], retarget·40[vanish] +2 | FAIL 2/8; red: content-remove[leaving], lead-remove[leaving], compaction[leaving], retarget·40[vanish] +2 | — |
| R2 · W3 leaving (H4-5 retarget) | head-unshimmed | light | — | FAIL 0/8; red: content-remove[not measured], lead-remove[not measured], swap-long[not measured], swap-short[not measured] +4 | — |
| R2 · W3 leaving (H4-5 retarget) | fv2 | light | FAIL 3/8; red: content-remove[leaving], lead-remove[leaving], compaction[leaving], retarget·80[vanish] +1 | FAIL 2/8; red: content-remove[leaving], lead-remove[leaving], compaction[leaving], retarget·40[leaving,vanish] +2 | — |
| R2 · W3 leaving (H4-5 retarget) | bp | light | PASS 8/8 | PASS 8/8 | — |
| R2 · W3 leaving (H4-5 retarget) | g | light | FAIL 6/8; red: retarget·80[leaving], retarget·120[leaving] | FAIL 6/8; red: retarget·80[leaving], retarget·120[leaving] | — |
| R3 · W3 reversal | head | light | FAIL 0/1; red: reversal[trajectory] | FAIL 0/1; red: reversal[trajectory] | — |
| R3 · W3 reversal | head-unshimmed | light | — | FAIL 0/1; red: reversal[not measured] | — |
| R3 · W3 reversal | fv2 | light | FAIL 0/1; red: reversal[trajectory] | FAIL 0/1; red: reversal[trajectory] | — |
| R3 · W3 reversal | bp | light | PASS 1/1 | PASS 1/1 | — |
| R3 · W3 reversal | g | light | PASS 1/1 | PASS 1/1 | — |
| R4 · ST five timings | head | light | FAIL 1/5; red: stall·same-task, stall·1raf, stall·2raf, stall·mid-flight | FAIL 2/5; red: stall·1raf, stall·2raf, stall·mid-flight | — |
| R4 · ST five timings | head-unshimmed | light | — | FAIL 0/5; red: stall·same-task[not measured], stall·1raf[not measured], stall·2raf[not measured], stall·100ms[not measured] +1 | — |
| R4 · ST five timings | fv2 | light | FAIL 1/5; red: stall·same-task[leap], stall·1raf[leap], stall·2raf[leap], stall·mid-flight[leap] | FAIL 2/5; red: stall·1raf[leap], stall·2raf[leap], stall·mid-flight[leap] | — |
| R4 · ST five timings | bp | light | PASS 5/5 | PASS 5/5 | — |
| R4 · ST five timings | g | light | PASS 5/5 | PASS 5/5 | — |
| R5 · R5 hit sampler (H4-4) | head | light | FAIL 2/4; red: hit·warm-expand, hit·warm-collapse | FAIL 2/4; red: hit·warm-expand, hit·warm-collapse; UM 1 | — |
| R5 · R5 hit sampler (H4-4) | head-unshimmed | light | — | FAIL 0/4; red: hit·rest-collapsed[not measured], hit·rest-expanded[not measured], hit·warm-expand[not measured], hit·warm-collapse[not measured] | — |
| R5 · R5 hit sampler (H4-4) | fv2 | light | FAIL 2/4; red: hit·warm-expand, hit·warm-collapse | FAIL 2/4; red: hit·warm-expand, hit·warm-collapse | — |
| R5 · R5 hit sampler (H4-4) | bp | light | PASS 4/4 | PASS 4/4 | — |
| R5 · R5 hit sampler (H4-4) | g | light | FAIL 2/4; red: hit·warm-expand, hit·warm-collapse | FAIL 3/4; red: hit·warm-expand | — |
| B1 · W3 retarget·context (H4-5) | head | light | PASS 1/1 | PASS 1/1 | — |
| B1 · W3 retarget·context (H4-5) | head-unshimmed | light | — | FAIL 0/1; red: retarget·context[not measured] | — |
| B1 · W3 retarget·context (H4-5) | fv2 | light | PASS 1/1 | PASS 1/1 | — |
| B1 · W3 retarget·context (H4-5) | bp | light | PASS 1/1 | PASS 1/1 | — |
| B1 · W3 retarget·context (H4-5) | g | light | FAIL 0/1; red: retarget·context[context] | PASS 1/1 | — |
| B2 · FM strips | head | light | PASS 6/6 | PASS 6/6 | — |
| B2 · FM strips | head-unshimmed | light | — | FAIL 0/6; red: film·first-expand[not measured], film·warm-collapse[not measured], film·warm-expand[not measured], film·swap-long[not measured] +2 | — |
| B2 · FM strips | fv2 | light | PASS 6/6 | PASS 6/6 | — |
| B2 · FM strips | bp | light | PASS 6/6 | PASS 6/6 | — |
| B2 · FM strips | g | light | PASS 6/6 | PASS 6/6 | — |
| B3 · PR count, rows (H4-8) | head | - | — | — | FAIL 1/2; red: prose·count |
| B3 · PR count, rows (H4-8) | fv2 | - | — | — | FAIL 1/2; red: prose·count |
| B3 · PR count, rows (H4-8) | bp | - | — | — | FAIL 1/2; red: prose·count |
| B3 · PR count, rows (H4-8) | g | - | — | — | FAIL 0/2; red: prose·count, prose·rows |
| N5 · PR count (N-6), readers (N-7) | head | - | — | — | FAIL 0/2; red: prose·readers, prose·count |
| N5 · PR count (N-6), readers (N-7) | fv2 | - | — | — | FAIL 0/2; red: prose·readers, prose·count |
| N5 · PR count (N-6), readers (N-7) | bp | - | — | — | FAIL 0/2; red: prose·readers, prose·count |
| N5 · PR count (N-6), readers (N-7) | g | - | — | — | FAIL 0/2; red: prose·readers, prose·count |
| R6 · W3 splice (H4-1) | head | light | PASS 33/33; UM 3 | PASS 33/33; UM 3 | — |
| R6 · W3 splice (H4-1) | head-unshimmed | light | — | FAIL 3/34; red: first-expand[not measured], warm-collapse[not measured], warm-expand[not measured], content-add[not measured] +27; UM 3 | — |
| R6 · W3 splice (H4-1) | fv2 | light | PASS 33/33; UM 3 | PASS 33/33; UM 3 | — |
| R6 · W3 splice (H4-1) | bp | light | FAIL 20/33; red: first-expand[splice], warm-collapse[splice], warm-expand[splice], content-remove[splice] +9; UM 4 | FAIL 20/33; red: first-expand[splice], warm-collapse[splice], warm-expand[splice], content-remove[splice] +9; UM 4 | — |
| R6 · W3 splice (H4-1) | g | light | FAIL 21/33; red: first-expand[splice], warm-collapse[splice], warm-expand[splice], content-add[splice] +8; UM 4 | FAIL 22/33; red: first-expand[splice], warm-collapse[splice], warm-expand[splice], content-remove[splice] +7; UM 5 | — |
| R7 · W3 lanes (H4-2) | head | light | PASS 33/33; UM 3 | PASS 33/33; UM 3 | — |
| R7 · W3 lanes (H4-2) | head-unshimmed | light | — | FAIL 3/34; red: first-expand[not measured], warm-collapse[not measured], warm-expand[not measured], content-add[not measured] +27; UM 3 | — |
| R7 · W3 lanes (H4-2) | fv2 | light | PASS 33/33; UM 3 | PASS 33/33; UM 3 | — |
| R7 · W3 lanes (H4-2) | bp | light | FAIL 23/33; red: first-expand[lanes], warm-collapse[lanes], warm-expand[lanes], content-remove[lanes] +6; UM 4 | FAIL 24/33; red: first-expand[lanes], warm-expand[lanes], content-remove[lanes], lead-add[lanes] +5; UM 4 | — |
| R7 · W3 lanes (H4-2) | g | light | FAIL 26/33; red: first-expand[lanes], warm-collapse[lanes], content-remove[lanes], lead-remove[lanes] +3; UM 4 | FAIL 26/33; red: first-expand[lanes], warm-collapse[lanes], content-remove[lanes], lead-remove[lanes] +3; UM 5 | — |
| R8 · W3 neighbour + ST nb (H4-3) | head | light | PASS 7/7 | FAIL 2/7; red: stall·nb·same-task, stall·nb·1raf, stall·nb·2raf, stall·nb·100ms +1 | — |
| R8 · W3 neighbour + ST nb (H4-3) | head-unshimmed | light | — | FAIL 0/7; red: stall·nb·same-task[not measured], stall·nb·1raf[not measured], stall·nb·2raf[not measured], stall·nb·100ms[not measured] +3 | — |
| R8 · W3 neighbour + ST nb (H4-3) | fv2 | light | FAIL 1/7; red: stall·nb·same-task[neighbour], stall·nb·1raf[neighbour], stall·nb·2raf[neighbour], stall·nb·mid-flight[neighbour] +2 | FAIL 1/7; red: stall·nb·same-task[neighbour], stall·nb·1raf[neighbour], stall·nb·100ms[neighbour], stall·nb·mid-flight[neighbour] +2; not reproduced 1 | — |
| R8 · W3 neighbour + ST nb (H4-3) | bp | light | PASS 7/7 | PASS 7/7 | — |
| R8 · W3 neighbour + ST nb (H4-3) | g | light | FAIL 3/7; red: stall·nb·same-task, stall·nb·1raf, stall·nb·100ms, stall·nb·mid-flight; UM 1 | FAIL 4/7; red: stall·nb·same-task, stall·nb·1raf, stall·nb·100ms; UM 2 | — |
| C1 · CF | head | light | FAIL 0/1; red: c1·shape·h | FAIL 0/1; red: c1·shape·h | — |
| C1 · CF | head-unshimmed | light | — | FAIL 0/1; red: c1·shape·h[not measured] | — |
| C1 · CF | fv2 | light | FAIL 0/1; red: c1·shape·h | FAIL 0/1; red: c1·shape·h | — |
| C1 · CF | bp | light | FAIL 0/1; red: c1·shape·h | FAIL 0/1; red: c1·shape·h | — |
| C1 · CF | g | light | FAIL 0/1; red: c1·shape·h | FAIL 0/1; red: c1·shape·h | — |
| C2 · CF | head | light | FAIL 2/3; red: c2·morph·h | FAIL 2/3; red: c2·morph·h | — |
| C2 · CF | head-unshimmed | light | — | FAIL 0/3; red: c2·morph·h[not measured], c2·prm[not measured], c2·rapid[not measured] | — |
| C2 · CF | fv2 | light | PASS 3/3 | PASS 3/3 | — |
| C2 · CF | bp | light | PASS 3/3 | PASS 3/3 | — |
| C2 · CF | g | light | PASS 3/3 | PASS 3/3 | — |
| C3 · CF | head | light | FAIL 3/4; red: c3·scroll | FAIL 3/4; red: c3·scroll | — |
| C3 · CF | head-unshimmed | light | — | FAIL 0/4; red: c3·hover[not measured], c3·focus[not measured], c3·scroll[not measured], c7·coarse-tap[not measured] | — |
| C3 · CF | fv2 | light | FAIL 2/4; red: c3·scroll, c7·coarse-tap | FAIL 2/4; red: c3·scroll, c7·coarse-tap | — |
| C3 · CF | bp | light | FAIL 2/4; red: c3·scroll, c7·coarse-tap | FAIL 2/4; red: c3·scroll, c7·coarse-tap | — |
| C3 · CF | g | light | FAIL 2/4; red: c3·scroll, c7·coarse-tap | FAIL 2/4; red: c3·scroll, c7·coarse-tap | — |
| C4 · CF | head | light | PASS 1/1 | PASS 1/1 | — |
| C4 · CF | head-unshimmed | light | — | FAIL 0/1; red: c4·persistent[not measured] | — |
| C4 · CF | fv2 | light | PASS 1/1 | PASS 1/1 | — |
| C4 · CF | bp | light | PASS 1/1 | PASS 1/1 | — |
| C4 · CF | g | light | PASS 1/1 | PASS 1/1 | — |
| C5 · CF | head | light | FAIL 0/1; red: c5·keyboard | FAIL 0/1; red: c5·keyboard | — |
| C5 · CF | head-unshimmed | light | — | FAIL 0/1; red: c5·keyboard[not measured] | — |
| C5 · CF | fv2 | light | FAIL 0/1; red: c5·keyboard | FAIL 0/1; red: c5·keyboard | — |
| C5 · CF | bp | light | FAIL 0/1; red: c5·keyboard | FAIL 0/1; red: c5·keyboard | — |
| C5 · CF | g | light | FAIL 0/1; red: c5·keyboard | FAIL 0/1; red: c5·keyboard | — |
| C6 · CF | head | light | FAIL 0/1; red: c6·menu | FAIL 0/1; red: c6·menu | — |
| C6 · CF | head-unshimmed | light | — | FAIL 0/1; red: c6·menu[not measured] | — |
| C6 · CF | fv2 | light | FAIL 0/1; red: c6·menu | FAIL 0/1; red: c6·menu | — |
| C6 · CF | bp | light | FAIL 0/1; red: c6·menu | FAIL 0/1; red: c6·menu | — |
| C6 · CF | g | light | FAIL 0/1; red: c6·menu | FAIL 0/1; red: c6·menu | — |
| C7 · CF | head | light | FAIL 3/4; red: c2·morph·v | FAIL 3/4; red: c2·morph·v | — |
| C7 · CF | head-unshimmed | light | — | FAIL 0/4; red: c1·shape·v[not measured], c2·morph·v[not measured], c7·narrow[not measured], c7·coarse-tap[not measured] | — |
| C7 · CF | fv2 | light | FAIL 2/4; red: c2·morph·v, c7·coarse-tap | FAIL 2/4; red: c2·morph·v, c7·coarse-tap | — |
| C7 · CF | bp | light | FAIL 3/4; red: c7·coarse-tap | FAIL 3/4; red: c7·coarse-tap | — |
| C7 · CF | g | light | FAIL 3/4; red: c7·coarse-tap | FAIL 3/4; red: c7·coarse-tap | — |
| L1 · L1 census (H4-11) | head | light + dark | PASS 6/6 | PASS 6/6 | — |
| L1 · L1 census (H4-11) | head-unshimmed | light + dark | — | FAIL 0/6; red: l1·light·collapsed[not measured], l1·light·expanded[not measured], l1·light·inflight[not measured], l1·dark·collapsed[not measured] +2 | — |
| L1 · L1 census (H4-11) | fv2 | light + dark | PASS 6/6 | PASS 6/6 | — |
| L1 · L1 census (H4-11) | bp | light + dark | PASS 6/6 | PASS 6/6 | — |
| L1 · L1 census (H4-11) | g | light + dark | FAIL 0/6; red: l1·light·collapsed, l1·light·expanded, l1·light·inflight, l1·dark·collapsed +2 | FAIL 0/6; red: l1·light·collapsed, l1·light·expanded, l1·light·inflight, l1·dark·collapsed +2 | — |
