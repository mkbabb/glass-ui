**W3 (H3 rows on every seat-bearing strip; reading 1 base / reading 2 w3b)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `anchor-end·warm-collapse` | F[window,anchor] / F[window,anchor] | F[window,anchor] / F[window,anchor] | OB / OB | F[anchor] / F[window,anchor] |
| Chromium | `anchor-end·warm-expand` | F[landing,window,anchor] / F[landing,window,anchor] | F[window,anchor] / F[window,anchor] | OB / OB | F[anchor] / F[anchor] |
| Chromium | `compaction` | F[leaving,blank] / F[leaving,blank] | F[leaving] / F[leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving,blank] |
| Chromium | `content-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | UM / UM | UM / UM |
| Chromium | `content-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Chromium | `first-expand` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Chromium | `hidden-shown` | P / P | P / P | P / P | P / P |
| Chromium | `infanim` | P / P | P / P | F[errors,window] / F[errors,window] | F[window] / F[window] |
| Chromium | `lattice` | P / P | P / P | F[seatStep,seatOverlap,seatWidth] / F[seatStep,seatOverlap,seatWidth] | F[seatOverlap,seatWidth] / F[seatOverlap,seatWidth] |
| Chromium | `lead-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | UM / UM | UM / UM |
| Chromium | `lead-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Chromium | `neighbour·warm-collapse` | P / P | P / P | F[neighbour] / F[neighbour,overlap] | P / P |
| Chromium | `neighbour·warm-expand` | P / P | P / P | F[neighbour] / F[neighbour] | P / P |
| Chromium | `reversal` | F[landing,window,trajectory,seatOverlap] / F[landing,window,trajectory,seatOverlap] | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] | OB / OB | OB / OB |
| Chromium | `seat-transition` | F[window] / F[window] | F[window] / F[window,trajectory] | P / P | P / P |
| Chromium | `stretch·lead-add` | F[seatStep] / F[seatStep] | F[seatStep] / F[seatStep] | P / P | OB / OB |
| Chromium | `swap-long` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[blank,leaving] / F[blank,leaving] | F[blank,leaving] / F[blank,leaving] |
| Chromium | `swap-short` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[blank,leaving] / F[blank,leaving] | F[blank,leaving] / F[blank,leaving] |
| Chromium | `ticking` | F / F | F / F | P / P | P / P |
| Chromium | `vagree·morph·warm-collapse` | P / P | F[vagree] / F[vagree] | P / P | P / P |
| Chromium | `vagree·morph·warm-expand` | P / P | P / P | UM / P | P / P |
| Chromium | `vagree·vmorph·warm-collapse` | P / P | P / P | UM / P | P / P |
| Chromium | `vagree·vmorph·warm-expand` | P / P | P / P | UM / P | P / P |
| Chromium | `viewport-resize` | P / P | P / P | P / P | P / P |
| Chromium | `warm-collapse` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Chromium | `warm-expand` | F[landing,window,seatStep,seatOverlap,leaving] / F[landing,window,seatStep,seatOverlap,leaving] | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Chromium | `wide·collapsed-rest` | UM / UM | UM / UM | UM / UM | UM / UM |
| Chromium | `wide·warm-collapse` | UM / UM | UM / UM | UM / UM | UM / UM |
| Chromium | `wide·warm-expand` | UM / UM | UM / UM | UM / UM | UM / UM |
| Playwright WebKit | `anchor-end·warm-collapse` | F[window,anchor] / F[window,anchor] | F[window,anchor] / F[window,anchor] | P / P | F[anchor] / F[anchor] |
| Playwright WebKit | `anchor-end·warm-expand` | F[landing,window,anchor] / F[landing,window,anchor] | F[window,anchor] / F[window,anchor] | P / P | P / F[anchor] † |
| Playwright WebKit | `compaction` | F[leaving,blank] / F[leaving,blank] | F[leaving] / F[leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving,blank] |
| Playwright WebKit | `content-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[trajectory] / UM | UM / UM |
| Playwright WebKit | `content-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[leaving] / F[leaving] | UM / UM |
| Playwright WebKit | `first-expand` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[leaving] / UM | F[leaving] / F[leaving] |
| Playwright WebKit | `hidden-shown` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `infanim` | P / P | P / P | F[errors,window] / F[errors,window] | F[window] / F[window] |
| Playwright WebKit | `lattice` | P / P | P / P | F[seatStep,seatOverlap,seatWidth] / F[seatStep,seatOverlap,seatWidth] | F[seatOverlap,seatWidth,errors] / F[seatOverlap,seatWidth,errors] |
| Playwright WebKit | `lead-add` | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[continuity,window,trajectory,terminal,seatStep] / F[continuity,window,trajectory,terminal,seatStep] | F[window,trajectory] / UM | UM / UM |
| Playwright WebKit | `lead-remove` | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[continuity,window,trajectory,terminal,seatStep,leaving] / F[continuity,window,trajectory,terminal,seatStep,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Playwright WebKit | `neighbour·warm-collapse` | P / P | P / P | F[neighbour] / F[neighbour,overlap] | P / P |
| Playwright WebKit | `neighbour·warm-expand` | P / P | P / P | F[neighbour] / F[neighbour] | P / P |
| Playwright WebKit | `reversal` | F[landing,window,trajectory,seatOverlap] / F[landing,window,trajectory,seatOverlap] | F[window,trajectory,seatStep,seatOverlap] / F[window,trajectory,seatStep,seatOverlap] | F[window,trajectory] / P † | OB / OB |
| Playwright WebKit | `seat-transition` | F[window] / F[window] | F[window] / F[window] | P / P | P / P |
| Playwright WebKit | `stretch·lead-add` | F[seatStep] / F[seatStep] | F[seatStep] / F[seatStep] | P / P | P / P |
| Playwright WebKit | `swap-long` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F / F[blank,leaving] | F[blank,leaving] / F[blank,leaving] |
| Playwright WebKit | `swap-short` | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F[continuity,window,trajectory,terminal,seatStep,seatOverlap] / F[continuity,window,trajectory,terminal,seatStep,seatOverlap] | F / F[blank,leaving] | F[blank,leaving] / F[blank,leaving] |
| Playwright WebKit | `ticking` | F / F | F / F | P / P | P / P |
| Playwright WebKit | `vagree·morph·warm-collapse` | P / P | – / F[vagree] | P / P | P / P |
| Playwright WebKit | `vagree·morph·warm-expand` | P / P | – / P | P / P | UM / P |
| Playwright WebKit | `vagree·vmorph·warm-collapse` | P / P | – / P | P / P | P / P |
| Playwright WebKit | `vagree·vmorph·warm-expand` | P / P | – / P | P / P | P / P |
| Playwright WebKit | `viewport-resize` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `warm-collapse` | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[window,seatOverlap,leaving] / F[window,seatOverlap,leaving] | F[leaving] / F[leaving] | F[leaving] / F[leaving] |
| Playwright WebKit | `warm-expand` | F[landing,window,seatStep,seatOverlap,leaving] / F[landing,window,seatStep,seatOverlap,leaving] | F[window,seatStep,seatOverlap,leaving] / F[window,seatStep,seatOverlap,leaving] | F[leaving] / UM | F[leaving] / F[leaving] |
| Playwright WebKit | `wide·collapsed-rest` | UM / UM | UM / UM | UM / UM | UM / UM |
| Playwright WebKit | `wide·warm-collapse` | UM / UM | UM / UM | UM / UM | UM / UM |
| Playwright WebKit | `wide·warm-expand` | UM / UM | UM / UM | UM / UM | UM / UM |

**W3 `neighbour·*` with the overlap check (reading nb)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `neighbour·warm-collapse` | P | P | F[neighbour,overlap] | P |
| Chromium | `neighbour·warm-expand` | P | P | F[neighbour] | P |
| Playwright WebKit | `neighbour·warm-collapse` | P | P | F[neighbour,overlap] | P |
| Playwright WebKit | `neighbour·warm-expand` | P | P | F[neighbour] | P |

**ST, the stall row (reading 1 base, load 105-485 / reading 2 st2, load 21-110 / reading 3 st3)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `stall·100ms` | P / P / P | P / P / P | UM / P / P | P / P / P |
| Chromium | `stall·1raf` | F[leap] / F[leap] / F[leap] | UM / F[leap] / F[leap] | UM / P / P | F[leap] / F[leap] / F[leap] |
| Chromium | `stall·2raf` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] / F[leap] | UM / F[leap] / P † | P / P / P |
| Chromium | `stall·mid-flight` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] / F[leap] | P / P / P | UM / P / P |
| Chromium | `stall·same-task` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] / F[leap] | F[leap] / P / P † | F[leap] / F[leap] / F[leap] |
| Playwright WebKit | `stall·100ms` | P / P / P | P / P / P | P / P / P | F[leap] / P / P † |
| Playwright WebKit | `stall·1raf` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] / F[leap] | F[leap] / P / F[leap] † | F[leap] / F[leap] / F[leap] |
| Playwright WebKit | `stall·2raf` | F[leap] / F[leap] / F[leap] | F[leap] / F[leap] / F[leap] | F[leap] / P / P † | F[leap] / F[leap] / F[leap] |
| Playwright WebKit | `stall·mid-flight` | F[leap] / F[leap] / F[leap] | – / F[leap] / F[leap] | P / P / P | F[leap] / P / F[leap] † |
| Playwright WebKit | `stall·same-task` | P / P / P | P / P / P | P / P / P | F[leap] / UM / F[leap] |

**W1 `card·*` and `vmorph·*` (H3-11, H3-5; floor+G `card·*` read again: base / w1g)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `card·collapsed-rest` | F[corner] / – | P / – | P / – | P / P |
| Chromium | `card·expanded-rest` | P / – | P / – | P / – | UM / P |
| Chromium | `card·first-expand` | F[corner,moves,card] / – | OB / – | OB / – | UM / OB |
| Chromium | `card·warm-collapse` | F[corner,card] / – | F[card] / – | OB / – | UM / OB |
| Chromium | `card·warm-expand` | F[corner,card] / – | F[corner,card] / – | OB / – | UM / P |
| Chromium | `vmorph·collapsed-rest` | F[corner] / – | P / – | P / – | P / – |
| Chromium | `vmorph·expanded-rest` | P / – | P / – | P / – | P / – |
| Chromium | `vmorph·first-expand` | F[corner,moves] / – | P / – | P / – | P / – |
| Chromium | `vmorph·warm-collapse` | F[corner] / – | F[corner] / – | P / – | P / – |
| Chromium | `vmorph·warm-expand` | F[corner] / – | F[corner] / – | P / – | P / – |
| Playwright WebKit | `card·collapsed-rest` | F[corner] / – | P / – | P / – | P / P |
| Playwright WebKit | `card·expanded-rest` | P / – | P / – | P / – | P / P |
| Playwright WebKit | `card·first-expand` | F[corner,moves,card] / – | F[card] / – | OB / – | F[card] / F[card] |
| Playwright WebKit | `card·warm-collapse` | F[card] / – | F[corner,card] / – | OB / – | OB / OB |
| Playwright WebKit | `card·warm-expand` | F[corner,card] / – | F[card] / – | OB / – | F[card] / F[card] |
| Playwright WebKit | `vmorph·collapsed-rest` | F[corner] / – | P / – | P / – | P / – |
| Playwright WebKit | `vmorph·expanded-rest` | P / – | P / – | P / – | P / – |
| Playwright WebKit | `vmorph·first-expand` | F[corner,moves] / – | F[corner,moves] / – | F[moves] / – | P / – |
| Playwright WebKit | `vmorph·warm-collapse` | F[corner] / – | F[corner,moves] / – | F[moves] / – | P / – |
| Playwright WebKit | `vmorph·warm-expand` | F[corner] / – | F[corner,moves] / – | P / – | P / – |

**FM, the filmstrips (base: the beside-the-plate marker / fm2: the corner marker)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `film·content-add` | P / P | P / P | P / P | P / P |
| Chromium | `film·first-expand` | P / P | P / P | P / P | P / P |
| Chromium | `film·swap-long` | P / P | P / P | P / P | P / P |
| Chromium | `film·swap-short` | P / P | P / P | UM / P | P / P |
| Chromium | `film·warm-collapse` | P / P | P / P | P / P | P / P |
| Chromium | `film·warm-expand` | P / P | UM / P | UM / P | UM / P |
| Playwright WebKit | `film·content-add` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `film·first-expand` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `film·swap-long` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `film·swap-short` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `film·warm-collapse` | P / P | P / P | P / P | P / P |
| Playwright WebKit | `film·warm-expand` | P / P | P / P | P / P | P / P |

**W7 (H3-9)**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Chromium | `canvas-clipped·dark·dpr2` | R | R | R | R |
| Chromium | `canvas-clipped·light·dpr2` | R | R | R | R |
| Chromium | `canvas·dark·dpr1` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `canvas·dark·dpr2` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `canvas·dark·dpr3` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `canvas·light·dpr1` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `canvas·light·dpr2` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `canvas·light·dpr3` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Chromium | `side·dark·dpr1` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `side·dark·dpr2` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `side·dark·dpr3` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `side·light·dpr1` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `side·light·dpr2` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `side·light·dpr3` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Chromium | `top·dark·dpr1` | P | P | P | P |
| Chromium | `top·dark·dpr2` | P | P | P | P |
| Chromium | `top·dark·dpr3` | P | P | P | P |
| Chromium | `top·light·dpr1` | P | P | P | P |
| Chromium | `top·light·dpr2` | P | P | P | P |
| Chromium | `top·light·dpr3` | P | P | P | P |
| Playwright WebKit | `canvas-clipped·dark·dpr2` | R | R | R | R |
| Playwright WebKit | `canvas-clipped·light·dpr2` | R | R | R | R |
| Playwright WebKit | `canvas·dark·dpr1` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `canvas·dark·dpr2` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `canvas·dark·dpr3` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `canvas·light·dpr1` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `canvas·light·dpr2` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `canvas·light·dpr3` | F[gutter] | F[gutter] | F[gutter] | F[gutter] |
| Playwright WebKit | `side·dark·dpr1` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `side·dark·dpr2` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `side·dark·dpr3` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `side·light·dpr1` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `side·light·dpr2` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `side·light·dpr3` | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] | F[gutter,badge] |
| Playwright WebKit | `top·dark·dpr1` | P | P | P | P |
| Playwright WebKit | `top·dark·dpr2` | P | P | P | P |
| Playwright WebKit | `top·dark·dpr3` | P | P | P | P |
| Playwright WebKit | `top·light·dpr1` | P | P | P | P |
| Playwright WebKit | `top·light·dpr2` | P | P | P | P |
| Playwright WebKit | `top·light·dpr3` | P | P | P | P |

**HEAD, Playwright WebKit unshimmed**

| engine | cell | HEAD | floor v1 | floor+B′ | floor+G |
|---|---|---|---|---|---|
| Playwright WebKit | `anchor-end·warm-collapse` | X | – | – | – |
| Playwright WebKit | `anchor-end·warm-expand` | X | – | – | – |
| Playwright WebKit | `compaction` | X | – | – | – |
| Playwright WebKit | `content-add` | X | – | – | – |
| Playwright WebKit | `content-remove` | X | – | – | – |
| Playwright WebKit | `first-expand` | X | – | – | – |
| Playwright WebKit | `hidden-shown` | X | – | – | – |
| Playwright WebKit | `infanim` | X | – | – | – |
| Playwright WebKit | `lattice` | X | – | – | – |
| Playwright WebKit | `lead-add` | X | – | – | – |
| Playwright WebKit | `lead-remove` | X | – | – | – |
| Playwright WebKit | `neighbour·warm-collapse` | X | – | – | – |
| Playwright WebKit | `neighbour·warm-expand` | X | – | – | – |
| Playwright WebKit | `reversal` | X | – | – | – |
| Playwright WebKit | `seat-transition` | X | – | – | – |
| Playwright WebKit | `stretch·lead-add` | X | – | – | – |
| Playwright WebKit | `swap-long` | X | – | – | – |
| Playwright WebKit | `swap-short` | X | – | – | – |
| Playwright WebKit | `ticking` | X | – | – | – |
| Playwright WebKit | `vagree·morph·warm-collapse` | X | – | – | – |
| Playwright WebKit | `vagree·morph·warm-expand` | X | – | – | – |
| Playwright WebKit | `vagree·vmorph·warm-collapse` | X | – | – | – |
| Playwright WebKit | `vagree·vmorph·warm-expand` | X | – | – | – |
| Playwright WebKit | `viewport-resize` | X | – | – | – |
| Playwright WebKit | `warm-collapse` | X | – | – | – |
| Playwright WebKit | `warm-expand` | X | – | – | – |
| Playwright WebKit | `wide·collapsed-rest` | UM | – | – | – |
| Playwright WebKit | `wide·warm-collapse` | UM | – | – | – |
| Playwright WebKit | `wide·warm-expand` | UM | – | – | – |
