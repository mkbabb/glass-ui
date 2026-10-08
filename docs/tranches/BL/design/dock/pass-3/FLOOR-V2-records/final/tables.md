
**FM** (floor v1: base / fm2; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `film·content-add` | P / P | P / F |
| Chromium | `film·first-expand` | P / P | P / F |
| Chromium | `film·swap-long` | P / P | P / F |
| Chromium | `film·swap-short` | P / P | P / F |
| Chromium | `film·warm-collapse` | P / P | P / F |
| Chromium | `film·warm-expand` | UM / P | P / F |
| Playwright WebKit | `film·content-add` | P / P | P / P |
| Playwright WebKit | `film·first-expand` | P / P | P / P |
| Playwright WebKit | `film·swap-long` | P / P | P / P |
| Playwright WebKit | `film·swap-short` | P / P | P / P |
| Playwright WebKit | `film·warm-collapse` | P / P | P / P |
| Playwright WebKit | `film·warm-expand` | P / P | P / P |

counts (pass/counted, OB): final-light: Chromium 6/6 (0 OB), Playwright WebKit 6/6 (0 OB); final-dark: Chromium 0/6 (0 OB), Playwright WebKit 6/6 (0 OB)

**ST** (floor v1: base / st2 / st3; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `stall·100ms` | P / P / P | P / P |
| Chromium | `stall·1raf` | UM / F[leap] / F[leap] | F[leap] / F[leap] |
| Chromium | `stall·2raf` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] |
| Chromium | `stall·mid-flight` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] |
| Chromium | `stall·same-task` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] |
| Playwright WebKit | `stall·100ms` | P / P / P | P / UM |
| Playwright WebKit | `stall·1raf` | F[leap] / F[leap] / F[leap] | F[leap] / UM |
| Playwright WebKit | `stall·2raf` | F[leap] / F[leap] / F[leap] | F[leap] / UM |
| Playwright WebKit | `stall·mid-flight` | – / F[leap] / F[leap] | F[leap] / UM |
| Playwright WebKit | `stall·same-task` | P / P / P | P / UM |

counts (pass/counted, OB): final-light: Chromium 1/5 (0 OB), Playwright WebKit 2/5 (0 OB); final-dark: Chromium 1/5 (0 OB), Playwright WebKit 0/0 (0 OB)

**W1** (floor v1: base; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `card·collapsed-rest` | P | P / P |
| Chromium | `card·expanded-rest` | P | P / P |
| Chromium | `card·first-expand` | OB | F[corner,card] / F[corner,card] |
| Chromium | `card·warm-collapse` | F[card] | F[card] / F[card] |
| Chromium | `card·warm-expand` | F[corner,card] | F[corner,card] / F[corner,card] |
| Chromium | `vmorph·collapsed-rest` | P | P / P |
| Chromium | `vmorph·expanded-rest` | P | P / P |
| Chromium | `vmorph·first-expand` | P | F[corner] / F[corner] |
| Chromium | `vmorph·warm-collapse` | F[corner] | F[corner] / F[corner,agree] |
| Chromium | `vmorph·warm-expand` | F[corner] | F[corner] / F[corner] |
| Playwright WebKit | `card·collapsed-rest` | P | P / P |
| Playwright WebKit | `card·expanded-rest` | P | P / P |
| Playwright WebKit | `card·first-expand` | F[card] | F[card] / F[card] |
| Playwright WebKit | `card·warm-collapse` | F[corner,card] | F[corner,card] / F[corner,card] |
| Playwright WebKit | `card·warm-expand` | F[card] | F[card] / F[card] |
| Playwright WebKit | `vmorph·collapsed-rest` | P | P / P |
| Playwright WebKit | `vmorph·expanded-rest` | P | P / P |
| Playwright WebKit | `vmorph·first-expand` | F[corner,moves] | F[corner] / F[corner] |
| Playwright WebKit | `vmorph·warm-collapse` | F[corner,moves] | F[corner] / F[corner] |
| Playwright WebKit | `vmorph·warm-expand` | F[corner,moves] | F[corner] / F[corner] |

counts (pass/counted, OB): final-light: Chromium 4/10 (0 OB), Playwright WebKit 4/10 (0 OB); final-dark: Chromium 4/10 (0 OB), Playwright WebKit 4/10 (0 OB)

**W2** (floor v1: p2-light / p2-dark; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `route1·long-run-h` | P / P | P / – |
| Chromium | `route1·long-run-v` | F[keyboard] / F[keyboard] | F[keyboard] / – |
| Chromium | `route2·collapsed-layer` | P / P | P / – |
| Chromium | `route3·aria-current` | P / P | P / – |
| Chromium | `route4·hover-scale` | P / P | P / – |
| Chromium | `route5·consumer-width` | P / P | P / – |
| Chromium | `route6·depth` | P / P | P / – |
| Chromium | `route7·nested-scroller` | P / P | P / – |
| Playwright WebKit | `route1·long-run-h` | P / P | P / – |
| Playwright WebKit | `route1·long-run-v` | F[keyboard] / F[keyboard] | F[keyboard] / – |
| Playwright WebKit | `route2·collapsed-layer` | P / P | P / – |
| Playwright WebKit | `route3·aria-current` | P / P | P / – |
| Playwright WebKit | `route4·hover-scale` | P / P | P / – |
| Playwright WebKit | `route5·consumer-width` | P / P | P / – |
| Playwright WebKit | `route6·depth` | P / P | P / – |
| Playwright WebKit | `route7·nested-scroller` | P / P | P / – |

counts (pass/counted, OB): final-light: Chromium 7/8 (0 OB), Playwright WebKit 7/8 (0 OB); final-dark: Chromium 0/0 (0 OB), Playwright WebKit 0/0 (0 OB)

**W3** (floor v1: base / w3b / nb; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `anchor-end·warm-collapse` | F[window,anchor] / F[window,anchor] / – | F[window] / F[window] |
| Chromium | `anchor-end·warm-expand` | F[window,anchor] / F[window,anchor] / – | F[window] / F[window] |
| Chromium | `compaction` | F[leaving] / F[leaving] / – | F[leaving] / F[leaving] |
| Chromium | `content-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] / – | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] |
| Chromium | `content-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] / – | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] |
| Chromium | `first-expand` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] / – | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] |
| Chromium | `hidden-shown` | P / P / – | P / P |
| Chromium | `infanim` | P / P / – | P / P |
| Chromium | `lattice` | P / P / – | P / P |
| Chromium | `lead-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] / – | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] |
| Chromium | `lead-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] / – | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] |
| Chromium | `neighbour·warm-collapse` | P / P / P | F[neighbour] / F[neighbour] |
| Chromium | `neighbour·warm-expand` | P / P / P | F[neighbour] / F[neighbour] |
| Chromium | `reversal` | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] / – | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] |
| Chromium | `seat-transition` | F[window] / F[window,trajectory] / – | F[window] / F[window,trajectory] |
| Chromium | `stretch·lead-add` | F[seatStep] / F[seatStep] / – | F[seatStep] / F[seatStep] |
| Chromium | `swap-long` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / – | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] |
| Chromium | `swap-short` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / – | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] |
| Chromium | `ticking` | F / F / – | F / F |
| Chromium | `vagree·morph·warm-collapse` | F[vagree] / F[vagree] / – | F[vagree] / F[vagree] |
| Chromium | `vagree·morph·warm-expand` | P / P / – | P / P |
| Chromium | `vagree·vmorph·warm-collapse` | P / P / – | P / P |
| Chromium | `vagree·vmorph·warm-expand` | P / P / – | P / P |
| Chromium | `viewport-resize` | P / P / – | P / P |
| Chromium | `warm-collapse` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] / – | F[window,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] |
| Chromium | `warm-expand` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] / – | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] |
| Chromium | `wide·collapsed-rest` | UM / UM / – | UM / UM |
| Chromium | `wide·warm-collapse` | UM / UM / – | UM / UM |
| Chromium | `wide·warm-expand` | UM / UM / – | UM / UM |
| Playwright WebKit | `anchor-end·warm-collapse` | F[window,anchor] / F[window,anchor] / – | F[window] / F[window] |
| Playwright WebKit | `anchor-end·warm-expand` | F[window,anchor] / F[window,anchor] / – | F[window] / F[window] |
| Playwright WebKit | `compaction` | F[leaving] / F[leaving] / – | F[leaving] / F[leaving] |
| Playwright WebKit | `content-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] / – | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] |
| Playwright WebKit | `content-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] / – | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] |
| Playwright WebKit | `first-expand` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] / – | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] |
| Playwright WebKit | `hidden-shown` | P / P / – | P / P |
| Playwright WebKit | `infanim` | P / P / – | P / P |
| Playwright WebKit | `lattice` | P / P / – | P / P |
| Playwright WebKit | `lead-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] / – | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] |
| Playwright WebKit | `lead-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] / – | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] |
| Playwright WebKit | `neighbour·warm-collapse` | P / P / P | F[neighbour] / F[neighbour] |
| Playwright WebKit | `neighbour·warm-expand` | P / P / P | F[neighbour] / F[neighbour] |
| Playwright WebKit | `reversal` | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] / – | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] |
| Playwright WebKit | `seat-transition` | F[window] / F[window] / – | F[window,trajectory] / F[window,trajectory] |
| Playwright WebKit | `stretch·lead-add` | F[seatStep] / F[seatStep] / – | F[seatStep] / F[seatStep] |
| Playwright WebKit | `swap-long` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / – | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] |
| Playwright WebKit | `swap-short` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / – | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] |
| Playwright WebKit | `ticking` | F / F / – | F / F |
| Playwright WebKit | `vagree·morph·warm-collapse` | – / F[vagree] / – | F[vagree] / F[vagree] |
| Playwright WebKit | `vagree·morph·warm-expand` | – / P / – | P / P |
| Playwright WebKit | `vagree·vmorph·warm-collapse` | – / P / – | P / P |
| Playwright WebKit | `vagree·vmorph·warm-expand` | – / P / – | P / P |
| Playwright WebKit | `viewport-resize` | P / P / – | P / P |
| Playwright WebKit | `warm-collapse` | F[window,seatOverlap,leaving] / F[window,seatOverlap,leaving] / – | F[window,seatOverlap,leaving] / F[window,seatOverlap,leaving] |
| Playwright WebKit | `warm-expand` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] / – | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] |
| Playwright WebKit | `wide·collapsed-rest` | UM / UM / – | UM / UM |
| Playwright WebKit | `wide·warm-collapse` | UM / UM / – | UM / UM |
| Playwright WebKit | `wide·warm-expand` | UM / UM / – | UM / UM |

counts (pass/counted, OB): final-light: Chromium 7/26 (0 OB), Playwright WebKit 7/26 (0 OB); final-dark: Chromium 7/26 (0 OB), Playwright WebKit 7/26 (0 OB)

**W4** (floor v1: p2-light / p2-dark; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `coarse·menu-holds` | P / P | P / – |
| Chromium | `coarse·no-hover-latch` | P / P | P / – |
| Chromium | `coarse·press-then-scroll` | P / P | P / – |
| Chromium | `coarse·tap-pins` | P / P | P / – |
| Chromium | `compact·compacts` | P / P | P / – |
| Chromium | `compact·engagement-expands` | P / P | P / – |
| Chromium | `compact·late-getter` | P / P | P / – |
| Chromium | `compact·no-threshold-bounce` | P / P | P / – |
| Chromium | `compact·non-first-current` | F / F | F / – |
| Chromium | `compact·seat-scale` | P / P | P / – |
| Chromium | `compact·shared-scroller` | P / P | P / – |
| Chromium | `prm·compact` | P / P | P / – |
| Chromium | `prm·posture-morph` | P / P | P / – |
| Playwright WebKit | `coarse·menu-holds` | P / P | P / – |
| Playwright WebKit | `coarse·no-hover-latch` | P / P | P / – |
| Playwright WebKit | `coarse·press-then-scroll` | P / P | P / – |
| Playwright WebKit | `coarse·tap-pins` | P / P | P / – |
| Playwright WebKit | `compact·compacts` | P / P | P / – |
| Playwright WebKit | `compact·engagement-expands` | P / P | P / – |
| Playwright WebKit | `compact·late-getter` | P / P | P / – |
| Playwright WebKit | `compact·no-threshold-bounce` | P / P | P / – |
| Playwright WebKit | `compact·non-first-current` | F / F | F / – |
| Playwright WebKit | `compact·seat-scale` | P / P | P / – |
| Playwright WebKit | `compact·shared-scroller` | P / P | P / – |
| Playwright WebKit | `prm·compact` | P / P | P / – |
| Playwright WebKit | `prm·posture-morph` | P / P | P / – |

counts (pass/counted, OB): final-light: Chromium 12/13 (0 OB), Playwright WebKit 12/13 (0 OB); final-dark: Chromium 0/0 (0 OB), Playwright WebKit 0/0 (0 OB)

**W5** (floor v1: p2-light / p2-dark; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `h·collapsed` | P / P | P / – |
| Chromium | `h·compact` | P / P | P / – |
| Chromium | `h·expanded` | P / P | P / – |
| Chromium | `h·expanded·el-source` | P / P | P / – |
| Chromium | `v·collapsed` | P / P | P / – |
| Chromium | `v·expanded` | P / P | P / – |
| Playwright WebKit | `h·collapsed` | P / P | P / – |
| Playwright WebKit | `h·compact` | P / P | P / – |
| Playwright WebKit | `h·expanded` | P / P | P / – |
| Playwright WebKit | `h·expanded·el-source` | P / P | P / – |
| Playwright WebKit | `v·collapsed` | P / P | P / – |
| Playwright WebKit | `v·expanded` | P / P | P / – |

counts (pass/counted, OB): final-light: Chromium 6/6 (0 OB), Playwright WebKit 6/6 (0 OB); final-dark: Chromium 0/0 (0 OB), Playwright WebKit 0/0 (0 OB)

**W6** (floor v1: p2-light / p2-dark; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `form·collapse` | F[window] / F[window] | F[window] / – |
| Chromium | `form·collapsed-rest` | P / P | P / – |
| Chromium | `form·expand` | F[window] / F[window] | F[window] / – |
| Chromium | `form·expanded-rest` | P / P | P / – |
| Playwright WebKit | `form·collapse` | F[window] / F[window] | F[window] / – |
| Playwright WebKit | `form·collapsed-rest` | P / P | P / – |
| Playwright WebKit | `form·expand` | F[window] / F[window] | F[window] / – |
| Playwright WebKit | `form·expanded-rest` | P / P | P / – |

counts (pass/counted, OB): final-light: Chromium 2/4 (0 OB), Playwright WebKit 2/4 (0 OB); final-dark: Chromium 0/0 (0 OB), Playwright WebKit 0/0 (0 OB)

**W7** (floor v1: base; floor v2: final-light / final-dark)

| engine | cell | floor v1 | floor v2 |
|---|---|---|---|
| Chromium | `canvas-clipped·dark·dpr2` | R | R / – |
| Chromium | `canvas-clipped·light·dpr2` | R | R / – |
| Chromium | `canvas·dark·dpr1` | F[gutter] | P / – |
| Chromium | `canvas·dark·dpr2` | F[gutter] | P / – |
| Chromium | `canvas·dark·dpr3` | F[gutter] | P / – |
| Chromium | `canvas·light·dpr1` | F[gutter] | P / – |
| Chromium | `canvas·light·dpr2` | F[gutter] | P / – |
| Chromium | `canvas·light·dpr3` | F[gutter] | P / – |
| Chromium | `side·dark·dpr1` | F[gutter,badge] | P / – |
| Chromium | `side·dark·dpr2` | F[gutter,badge] | P / – |
| Chromium | `side·dark·dpr3` | F[gutter,badge] | P / – |
| Chromium | `side·light·dpr1` | F[gutter,badge] | P / – |
| Chromium | `side·light·dpr2` | F[gutter,badge] | P / – |
| Chromium | `side·light·dpr3` | F[gutter,badge] | P / – |
| Chromium | `top·dark·dpr1` | P | P / – |
| Chromium | `top·dark·dpr2` | P | P / – |
| Chromium | `top·dark·dpr3` | P | P / – |
| Chromium | `top·light·dpr1` | P | P / – |
| Chromium | `top·light·dpr2` | P | P / – |
| Chromium | `top·light·dpr3` | P | P / – |
| Playwright WebKit | `canvas-clipped·dark·dpr2` | R | R / – |
| Playwright WebKit | `canvas-clipped·light·dpr2` | R | R / – |
| Playwright WebKit | `canvas·dark·dpr1` | F[gutter] | P / – |
| Playwright WebKit | `canvas·dark·dpr2` | F[gutter] | P / – |
| Playwright WebKit | `canvas·dark·dpr3` | F[gutter] | P / – |
| Playwright WebKit | `canvas·light·dpr1` | F[gutter] | P / – |
| Playwright WebKit | `canvas·light·dpr2` | F[gutter] | P / – |
| Playwright WebKit | `canvas·light·dpr3` | F[gutter] | P / – |
| Playwright WebKit | `side·dark·dpr1` | F[gutter,badge] | P / – |
| Playwright WebKit | `side·dark·dpr2` | F[gutter,badge] | P / – |
| Playwright WebKit | `side·dark·dpr3` | F[gutter,badge] | P / – |
| Playwright WebKit | `side·light·dpr1` | F[gutter,badge] | P / – |
| Playwright WebKit | `side·light·dpr2` | F[gutter,badge] | P / – |
| Playwright WebKit | `side·light·dpr3` | F[gutter,badge] | P / – |
| Playwright WebKit | `top·dark·dpr1` | P | P / – |
| Playwright WebKit | `top·dark·dpr2` | P | P / – |
| Playwright WebKit | `top·dark·dpr3` | P | P / – |
| Playwright WebKit | `top·light·dpr1` | P | P / – |
| Playwright WebKit | `top·light·dpr2` | P | P / – |
| Playwright WebKit | `top·light·dpr3` | P | P / – |

counts (pass/counted, OB): final-light: Chromium 18/18 (0 OB), Playwright WebKit 18/18 (0 OB); final-dark: Chromium 0/0 (0 OB), Playwright WebKit 0/0 (0 OB)
