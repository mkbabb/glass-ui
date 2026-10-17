harness bfe1b6beddb0

| witness | engine | clean, plants and controls (gating cells pass / measured; H5 plants bold) | runs |
|---|---|---|---:|
| CANON | Chromium | clean 4/4; `canon-a` 3/4; `canon-s` 3/4; `canon-h` 3/4; **`canon-layer`** 2/4; **`canon-foreign`** 3/4; **`canon-unlayered`** 3/4; **`canon-cq`** 3/4; control **`canon-lowlayer`** 4/4; control **`canon-cqoff`** 4/4 | 10 |
| CANON | Playwright WebKit | clean 4/4; `canon-a` 3/4; `canon-s` 3/4; `canon-h` 3/4; **`canon-layer`** 2/4; **`canon-foreign`** 3/4; **`canon-unlayered`** 3/4; **`canon-cq`** 3/4; control **`canon-lowlayer`** 4/4; control **`canon-cqoff`** 4/4 | 10 |
| FACT | Chromium | clean 68/68; `atk-split` 49/68; `atk-nest` 52/68; **`atk-nopin`** 57/68; **`atk-unbounded`** 55/68; **`atk-nopin-dev`** 57/68; control **`atk-mx-dev`** 68/68; **`atk-optpin`** 65/68 | 8 |
| FACT | Playwright WebKit | clean 68/68; `atk-split` 49/68; `atk-nest` 52/68; **`atk-nopin`** 57/68; **`atk-unbounded`** 55/68; **`atk-nopin-dev`** 57/68; control **`atk-mx-dev`** 68/68; **`atk-optpin`** 65/68 | 8 |
| ATTACK | Chromium | clean 3/3; `atk-empty` 1/3; `atk-attrs` 2/3; `atk-sup` 4/5; control `atk-sup-dev` 5/5; **`atk-x5none`** 4/5; **`h5-logs-ready`** 4/5 | 7 |
| ATTACK | Playwright WebKit | clean 3/3; `atk-empty` 1/3; `atk-attrs` 2/3; `atk-sup` 4/5; control `atk-sup-dev` 5/5; **`atk-x5none`** 4/5; **`h5-logs-ready`** 4/5 | 7 |
| REPORT | Chromium | clean 4/4; `h46-kick` 3/4; `h46-mark` 3/4; **`h46-nameink`** 2/4; **`h46-attack`** exit 2, named | 5 |
| REPORT | Playwright WebKit | clean 4/4; `h46-kick` 3/4; `h46-mark` 3/4; **`h46-nameink`** 2/4; **`h46-attack`** exit 2, named | 5 |
| CORNER | Chromium | clean 5/5; `atk-corner` 1/5 | 2 |
| CORNER | Playwright WebKit | clean 5/5; `atk-corner` 1/5 | 2 |
| T-1 | Chromium | clean 45/45; `t1` 9/45; `t1-self` 9/45; `t1-coarse` 33/45; `t1-scale` 21/45; `t1-late` 36/45; control `t1-ro` 45/45 | 7 |
| T-1 | Playwright WebKit | clean 45/45; `t1` 9/45; `t1-self` 9/45; `t1-coarse` 33/45; `t1-scale` 21/45; `t1-late` 36/45; control `t1-ro` 45/45 | 7 |
| T-2 | Chromium | clean 52/52; `t2` 30/52; `t2-skip` 46/52; `t2-stack` 28/52; `t2-cut` 28/52; control `t2-named` 52/52; `t2-mountonly` 28/52; `t2-selfblock` 34/52 | 8 |
| T-2 | Playwright WebKit | clean 52/52; `t2` 30/52; `t2-skip` 46/52; `t2-stack` 28/52; `t2-cut` 28/52; control `t2-named` 52/52; `t2-mountonly` 28/52; `t2-selfblock` 34/52 | 8 |
| T-3 | Chromium | clean 97/97; `t3` 0/75; `t3-border` 78/93; `t3-alpha` 89/95; `t3-unres` 89/95; `t3-migstate` 89/95; `t3-cv` 69/95; `stall` exit 2, named; control `navcap` 97/97 | 9 |
| T-3 | Playwright WebKit | clean 97/97; `t3` 0/75; `t3-border` 78/93; `t3-alpha` 89/95; `t3-unres` 89/95; `t3-migstate` 89/95; `t3-cv` 69/95; `stall` exit 2, named; control `navcap` 97/97 | 9 |
| T-4 | Chromium | clean 54/54; `t4` 42/54; `t4-auto` 0/54; `t4-forced` 50/54 | 4 |
| T-4 | Playwright WebKit | clean 54/54; `t4` 42/54; `t4-auto` 18/54; `t4-forced` 50/54 | 4 |
| T-5 | Chromium | clean 117/117; `t5` 80/117; `t5-cross` 96/117; `t5-stop` 115/117; `t5-reorder` 116/117; `t5-input` 116/117; `t5-deselect` 116/117; `t5-multi` 115/117; `t5-consumer` 115/117; `t5-retired` 116/117 | 10 |
| T-5 | Playwright WebKit | clean 117/117; `t5` 80/117; `t5-cross` 96/117; `t5-stop` 115/117; `t5-reorder` 116/117; `t5-input` 116/117; `t5-deselect` 116/117; `t5-multi` 115/117; `t5-consumer` 115/117; `t5-retired` 116/117 | 10 |
| T-6 | Chromium | clean 88/88; `t6-fade` 56/88; `t6-tabpop` 80/88; `t6-prog` 72/88; control `t6-body` 88/88; control `t6-rest` 88/88; `t6-still` 72/88; `t6-glide` 56/88; `t6-faint` 64/88; control `t6-rung` 88/88; `t6-prt` 80/88; `t6-calm` 80/88 | 12 |
| T-6 | Playwright WebKit | clean 88/88; `t6-fade` 56/88; `t6-tabpop` 80/88; `t6-prog` 72/88; control `t6-body` 88/88; control `t6-rest` 88/88; `t6-still` 72/88; `t6-glide` 56/88; `t6-faint` 64/88; control `t6-rung` 88/88; `t6-prt` 80/88; `t6-calm` 80/88 | 12 |
| T-7 | Chromium | clean 24/24; `t7` 0/24 | 2 |
| T-7 | Playwright WebKit | clean 24/24; `t7` 0/24 | 2 |
| T-8 | both (one run) | clean 48/48; `t8-migrated` 42/48; `t8` 36/48 | 3 |
| W-A | Chromium | clean 9/9; `t1-late` 0/9; control `t1-ro` 9/9; `wa` 0/9 | 4 |
| W-A | Playwright WebKit | clean 9/9; `t1-late` 0/9; control `t1-ro` 9/9; `wa` 0/9 | 4 |
| W-B | Chromium | clean 25/25; `t5` 19/25; `wb` 21/25 | 3 |
| W-B | Playwright WebKit | clean 25/25; `t5` 19/25; `wb` 21/25 | 3 |
| W-C | Chromium | clean 8/8; `wc` 1/8; `wc-stamp` 2/8 | 3 |
| W-C | Playwright WebKit | clean 8/8; `wc` 1/8; `wc-stamp` 2/8 | 3 |
| W-D | Chromium | clean 8/8; `wd` 4/8; `wd2` 4/8 | 3 |
| W-D | Playwright WebKit | clean 8/8; `wd` 4/8; `wd2` 4/8 | 3 |
| W-E | Chromium | clean 6/6; `we` 3/6; `we-devonly` 3/6; `we-lh1` 4/6 | 4 |
| W-E | Playwright WebKit | clean 6/6; `we` 3/6; `we-devonly` 3/6; `we-lh1` 4/6 | 4 |

205 runs, 0 BROKEN.
