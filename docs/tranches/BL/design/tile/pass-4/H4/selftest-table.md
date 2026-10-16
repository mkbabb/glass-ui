| witness | engine | harness | clean, plants and controls (gating cells pass / measured; H4 plants bold) | runs | exit | 1-min load start → end |
|---|---|---|---|---:|---:|---|
| FACT | Chromium | `e40bfd8801ef` | clean 12/12; **`atk-split`** 6/12; **`atk-nest`** 10/12 | 3 | 0 | 23.35 → 21.24 |
| FACT | Playwright WebKit | `e40bfd8801ef` | clean 12/12; **`atk-split`** 6/12; **`atk-nest`** 10/12 | 3 | 0 | 19.20 → 23.80 |
| ATTACK | Chromium | `e40bfd8801ef` | clean 3/3; **`atk-empty`** 1/3; **`atk-attrs`** 2/3; **`atk-sup`** 3/4; control **`atk-sup-dev`** 4/4 | 5 | 0 | 21.24 → 29.60 |
| ATTACK | Playwright WebKit | `e40bfd8801ef` | clean 3/3; **`atk-empty`** 1/3; **`atk-attrs`** 2/3; **`atk-sup`** 3/4; control **`atk-sup-dev`** 4/4 | 5 | 0 | 33.35 → 36.76 |
| CORNER | Chromium | `e40bfd8801ef` | clean 5/5; **`atk-corner`** 1/5 | 2 | 0 | 29.60 → 31.76 |
| CORNER | Playwright WebKit | `e40bfd8801ef` | clean 5/5; **`atk-corner`** 1/5 | 2 | 0 | 36.76 → 36.74 |
| REPORT | Chromium | `e40bfd8801ef` | clean 2/2; **`h46-kick`** 1/2; **`h46-mark`** 1/2 | 3 | 0 | 31.76 → 26.39 |
| REPORT | Playwright WebKit | `e40bfd8801ef` | clean 2/2; **`h46-kick`** 1/2; **`h46-mark`** 1/2 | 3 | 0 | 36.74 → 40.07 |
| T-1 | Chromium | `e40bfd8801ef` | clean 45/45; `t1` 9/45; `t1-self` 9/45; `t1-coarse` 33/45; `t1-scale` 21/45; `t1-late` 36/45; control `t1-ro` 45/45 | 7 | 0 | 35.26 → 29.11 |
| T-1 | Playwright WebKit | `e40bfd8801ef` | clean 45/45; `t1` 9/45; `t1-self` 9/45; `t1-coarse` 33/45; `t1-scale` 21/45; `t1-late` 36/45; control `t1-ro` 45/45 | 7 | 0 | 33.61 → 33.30 |
| T-2 | Chromium | `e40bfd8801ef` | clean 52/52; `t2` 30/52; `t2-skip` 46/52; `t2-stack` 28/52; `t2-cut` 28/52; control `t2-named` 52/52; `t2-mountonly` 28/52; **`t2-selfblock`** 34/52 | 8 | 0 | 26.39 → 29.63 |
| T-2 | Playwright WebKit | `e40bfd8801ef` | clean 52/52; `t2` 30/52; `t2-skip` 46/52; `t2-stack` 28/52; `t2-cut` 28/52; control `t2-named` 52/52; `t2-mountonly` 28/52; **`t2-selfblock`** 34/52 | 8 | 0 | 40.07 → 22.88 |
| T-3 | Chromium | `e40bfd8801ef` | clean 97/97; `t3` 0/75; `t3-border` 78/93; `t3-alpha` 89/95; `t3-unres` 89/95; `t3-migstate` 89/95; `t3-cv` 69/95; `stall` exit 2, named; control `navcap` 97/97 | 9 | 0 | 29.11 → 31.07 |
| T-3 | Playwright WebKit | `e40bfd8801ef` | clean 97/97; `t3` 0/75; `t3-border` 78/93; `t3-alpha` 89/95; `t3-unres` 89/95; `t3-migstate` 89/95; `t3-cv` 69/95; `stall` exit 2, named; control `navcap` 97/97 | 9 | 0 | 33.30 → 25.69 |
| T-4 | Chromium | `e40bfd8801ef` | clean 54/54; `t4` 42/54; `t4-auto` 0/54; `t4-forced` 50/54 | 4 | 0 | 31.07 → 23.13 |
| T-4 | Playwright WebKit | `e40bfd8801ef` | clean 54/54; `t4` 42/54; `t4-auto` 18/54; `t4-forced` 50/54 | 4 | 0 | 25.69 → 28.20 |
| T-5 | Chromium | `e40bfd8801ef` | clean 117/117; `t5` 80/117; `t5-cross` 96/117; `t5-stop` 115/117; `t5-reorder` 116/117; `t5-input` 116/117; `t5-deselect` 116/117; `t5-multi` 115/117; `t5-consumer` 115/117; `t5-retired` 116/117 | 10 | 0 | 23.13 → 34.48 |
| T-5 | Playwright WebKit | `e40bfd8801ef` | clean 117/117; `t5` 80/117; `t5-cross` 96/117; `t5-stop` 115/117; `t5-reorder` 116/117; `t5-input` 116/117; `t5-deselect` 116/117; `t5-multi` 115/117; `t5-consumer` 115/117; `t5-retired` 116/117 | 10 | 0 | 28.20 → 26.89 |
| T-6 | Chromium | `e40bfd8801ef` | clean 88/88; `t6-fade` 56/88; `t6-tabpop` 80/88; `t6-prog` 72/88; control `t6-body` 88/88; control `t6-rest` 88/88; `t6-still` 72/88; `t6-glide` 56/88; `t6-faint` 64/88; control `t6-rung` 88/88; `t6-prt` 80/88; `t6-calm` 80/88 | 12 | 0 | 34.48 → 19.63 |
| T-6 | Playwright WebKit | `e40bfd8801ef` | clean 88/88; `t6-fade` 56/88; `t6-tabpop` 80/88; `t6-prog` 72/88; control `t6-body` 88/88; control `t6-rest` 88/88; `t6-still` 72/88; `t6-glide` 56/88; `t6-faint` 64/88; control `t6-rung` 88/88; `t6-prt` 80/88; `t6-calm` 80/88 | 12 | 0 | 16.48 → 24.77 |
| T-7 | Chromium | `e40bfd8801ef` | clean 24/24; `t7` 0/24 | 2 | 0 | 19.63 → 18.15 |
| T-7 | Playwright WebKit | `e40bfd8801ef` | clean 24/24; `t7` 0/24 | 2 | 0 | 24.77 → 22.17 |
| T-8 | both (one run) | `e40bfd8801ef` | clean 48/48; `t8-migrated` 42/48; `t8` 36/48 | 3 | 0 | 24.07 → 26.38 |
| W-A | Chromium | `e40bfd8801ef` | clean 9/9; `t1-late` 0/9; control `t1-ro` 9/9; `wa` 0/9 | 4 | 0 | 18.15 → 22.20 |
| W-A | Playwright WebKit | `e40bfd8801ef` | clean 9/9; `t1-late` 0/9; control `t1-ro` 9/9; `wa` 0/9 | 4 | 0 | 22.17 → 26.89 |
| W-B | Chromium | `e40bfd8801ef` | clean 25/25; `t5` 19/25; `wb` 21/25 | 3 | 0 | 22.20 → 23.79 |
| W-B | Playwright WebKit | `e40bfd8801ef` | clean 25/25; `t5` 19/25; `wb` 21/25 | 3 | 0 | 26.89 → 22.87 |
| W-C | Chromium | `e40bfd8801ef` | clean 8/8; `wc` 1/8; `wc-stamp` 2/8 | 3 | 0 | 23.79 → 20.83 |
| W-C | Playwright WebKit | `e40bfd8801ef` | clean 8/8; `wc` 1/8; `wc-stamp` 2/8 | 3 | 0 | 22.87 → 24.51 |
| W-D | Chromium | `e40bfd8801ef` | clean 8/8; `wd` 4/8; `wd2` 4/8 | 3 | 0 | 20.83 → 18.84 |
| W-D | Playwright WebKit | `e40bfd8801ef` | clean 8/8; `wd` 4/8; `wd2` 4/8 | 3 | 0 | 24.51 → 22.79 |
| W-E | Chromium | `e40bfd8801ef` | clean 6/6; `we` 3/6; `we-devonly` 3/6; `we-lh1` 4/6 | 4 | 0 | 18.84 → 16.43 |
| W-E | Playwright WebKit | `e40bfd8801ef` | clean 6/6; `we` 3/6; `we-devonly` 3/6; `we-lh1` 4/6 | 4 | 0 | 22.79 → 21.82 |
| CANON | Chromium | `e40bfd8801ef` | clean 3/3; `canon-a` 2/3; `canon-s` 2/3; `canon-h` 2/3 | 4 | 0 | 16.43 → 19.20 |
| CANON | Playwright WebKit | `e40bfd8801ef` | clean 3/3; `canon-a` 2/3; `canon-s` 2/3; `canon-h` 2/3 | 4 | 0 | 21.82 → 24.07 |

175 runs, 0 BROKEN, across 35 logs.
