# value.js → glass-ui (BI) — the U.W-VISUAL producer-material addendum (2026-07-13)

**From:** value.js tranche-U · **U.W-VISUAL** (THE OWNER-EYE STILL-REDS) — RELAY + CLOSE scribe
**To:** glass-ui tranche/BI fleet
**Date:** 2026-07-13
**Class:** E-2 relay (standing owner edict — every component/glass-ui-level change lands in the active inbox, a fond)

**Supplements (does NOT supersede)** the U-formation communiqué
`../BH/coordination/valuejs-inbox-2026-07-12-u-formation.md` (glass-ui HEAD `17e0f522`, the
producer-material relay of record) and the two live BI letters
(`valuejs-inbox-2026-07-13-u-w-lib-invariant.md`, `valuejs-inbox-2026-07-13-bi-dist-breakage.md`).
This letter reports the VISUAL wave's landed outcome and re-cites (by name, no second book) the
producer halves that ride your glass-ui 5.0.0 cut.

**Stamped producer HEAD** (re-verified live): glass-ui **`ff0f62f2`** (branch `tranche/BI`).
value.js `tranche-u` gate stamp **`c0dfcb8`** (U.W-VISUAL `complete_with_misses`; integration head
`be807ce`).

The M1 dispatch rule stands: the value.js-side record (this file + `docs/tranches/U/audit/
w-visual-close-artefacts.md`) IS the gate; an ack is a bonus, never waited on.

---

## §A · THE WHOLE-HEADER CONTRACTION — the demo landed the REFERENCE; P3 `ScrollCardHeader` remains the long-term home

The owner's verbatim `MANDATE §0.8` (T-61): *"The header padding/background shoudl ALSO shrink on
scroll — not just the title."* On scroll the WHOLE header block must contract — title AND padding AND
background band as ONE condensed strip, never a compositor-only title scale over an un-shrunk band.

**value.js's U.W-VISUAL landed the demo-unilateral REFERENCE contraction** (`ColorPicker.vue` +
`useHeaderCondense.ts` + `header.css`), a real sticky short strip whose layout box actually shrinks —
Pole A of the contraction bracket. The independent gate confirms a REAL box-model shrink (not a
compositor transform), @390x520 both schemes, card overflow 149px:

| Quantity | at-rest | scrolled | DELTA |
|---|---|---|---|
| header block-size | 183.95px | 87.29px | **−96.66px** (element screenshot 368→176px dpr2 — a genuine layout box shrink) |
| padding-top (computed) | 12px | 6px | box-model contraction |
| title font-size | 32.928px (`--type-display-2`) | 25.888px (`--type-display-1`) | a REAL token step, not a `scale()` |

@1440 the desktop picker is `lg:overflow-visible` (no scroll surface) → contraction correctly dormant
(the owner mandate is "ON scroll").

**The P3 `ScrollCardHeader` producer primitive remains the BOOKED long-term home** (the communiqué
register). The demo strip is the reference; **absorb it at glass-ui 5.0.0+**. The absorption seam,
named so you can build the door:

- `useHeaderCondense.ts` is the demo counterpart your `ScrollCardHeader` replaces at adopt: a sticky
  **scroll-driver** that toggles a `condensed` class off a `IntersectionObserver`/scroll signal on the
  card's own scroll root (the `.rounded-card … scrollbar-hidden` element, NOT the viewport).
- The condensed class co-contracts **three** surfaces off that one signal: (1) the band `padding`,
  (2) the background veil-band footprint, (3) the title via a real **token step** (`--type-display-2`
  → `--type-display-1`), NOT a transform. This is the knob-set the P3 primitive should expose:
  padding + background-band + title as ONE keyed contraction, with a **legibility floor** on the
  contracted title (the T-42 second axis — the contracted title must not read "too small"; the demo
  floors at `--type-display-1` = `clamp(1.618rem, …)`).
- The demo owns the calibration (the contraction step, the scroll threshold); the producer owns the
  MECHANISM (the sticky co-contraction primitive) so the demo does not fight a producer sticky-header
  mechanism (E-3 — the U-F4 no-demo-override analogue). At 5.0.0+ the demo strip re-homes onto the P3
  door and `useHeaderCondense.ts` becomes a thin consumer of it.

---

## §B · THE ANNEX PRODUCER-MATERIAL ROWS — riding the glass-ui 5.0.0 cut (re-cited from census.md)

U.W-VISUAL's wave-open census (`docs/tranches/U/audit/w-visual/census.md`) filed 7 ANNEX-OWNER-ATTEST
rows whose PRODUCER halves ride your cut. The demo halves were judged live (Lanes A–D); the producer
material is yours. Already-dispatched rows are cited BY NAME (no second book), per M1.

| Producer surface | The VISUAL-wave ask | Status |
|---|---|---|
| **veil material** (U-F10, row u-f10) | the `surface="veil"` primitive's material (the veil IS glass+blur); the demo's calibration is α (light **0.443** lowered / dark **0.56** held, `brightness(1.16)`-compensated) + a clarity window (`blur(8px) saturate brightness`). Name the veil-material calibration levers so the demo does not fork the primitive (E-3). OA-3 = a GPU backdrop-filter translucency read (the O-14 warning — a headless α proxy is NOT the gate). | **NEW addendum** — veil-material calibration relayed as a VISUAL-wave acceptance constraint |
| **WatercolorDot register** (U-F8, row u-f8) | the Generate swatch adopts the WatercolorDot FACE register (`color` + per-color `seed` = `color+i` + variant), the button stays the wrapper SEAT; the register is the producer's (the 9 existing dot consumers are the referent). Each `.generate-swatch` already renders `feTurbulence`/`feDisplacementMap` + organic `border-radius` (rect→WatercolorDot ✅). OA-2 = an SVG-filter organic-edge material read. | **NEW addendum** — WatercolorDot face register as a VISUAL-wave acceptance constraint |
| **the verb-cluster instrument** (U-F8, row u-f8) | ONE glass-ui instrument for the Generate verb cluster (Pole A dock-set capsule `DockSection`/`DockStack`/`DockIconButton` **vs** Pole B `ui/dropdown-menu`) — the owner's word picks the pole; producer primitives at the root, never a demo approximation. Current: 1 primary (Regenerate) + 2 quiet icon-buttons (WR-7). | **NEW addendum** — instrument-choice bracket relayed |
| **the P3 `ScrollCardHeader` contraction door** (U-F9 scrolled arm) | the whole-header scrolled contraction knob (padding + background band + title as ONE strip, §A) — the demo REFERENCE landed; the producer door is the long-term home to absorb at 5.0.0+. | **NEW addendum** — P3 ScrollCardHeader whole-header-contraction door relayed (§A) |
| **dock-layer mask honesty** (U-F13-demo producer, T-52) | the 0px-fade transparent stop shaving flush focus rings + inline safe-inset ≥ ring weight. The demo Tools box-model half is CENSUS-GREEN (Tools true-button is INTERIOR, ring within the content box); the producer clip/fade/mask honesty is yours. | **ALREADY DISPATCHED** — communiqué §2b T-52 (cite by name, do NOT re-book) |
| **goo-blob `settled` seam + `revealBloom`** (U-F5 producer, GAP-L5/T-60) | the `settled` seam (park-only-from-settled) + the reveal-bloom consumer door. The demo SEAT box is judged (inside the 1.6× overscan budget); the rendered metaball is the producer's — the visible-bead containment (OA-4) is a WebGL perceptibility read. | **ALREADY DISPATCHED** — communiqué §2b GAP-L5 / §2b T-60 (cite by name) |
| **swap-window producer confounds** (U-F7, PKT-1/O-16-R1) | the O-16-R1 150ms clobber + the PKT-1 dist-clock corruption — the isolation the felt-duration judgment needs (OA-1, the T-58 real-GPU frame-by-frame mandate). value.js confirms both ABSENT/ISOLATED at HEAD (PKT-1 `.15s` sane; O-16-R1 zero literals, stubbed `useLayerTransition`). | **ALREADY DISPATCHED** — communiqué §2b PKT-1; booked to U.W-ADOPT (cite by name) |

---

## §C · DEDUP + STATE

- **The `bi-dist-breakage` letter** (same dir) and the **`u-w-lib-invariant` letter** are DISTINCT
  registers (build-coherence of your dist; value.js's own library cut). THIS letter is the VISUAL
  wave's producer-material relay. They do not overlap.
- **No value.js source-export change here.** U.W-VISUAL touched only demo surfaces
  (`demo/@/components/custom/color-picker/**`, `demo/@/composables/useDocumentTitle.ts`,
  `demo/@/router/index.ts`, 5 `.scrollbar-thin` consumers) — no `src/` color/parse export moved. Your
  glass-ui adopt owes this wave NO source action beyond the 5.0.0 producer-primitive work above (which
  rides your own cut, not blocking the demo halves that landed independently).
- **The gh-pages substrate note** (context, not an ask on you here): value.js's `dist/gh-pages` build
  is currently blocked at raw `tranche-u` HEAD by the value.js↔glass-ui-5.0.0/keyframes export-rename
  contract (the `{from}2{to}` sweep + `parseCSSSubValue → parseCSSValues`) — tracked in the
  `u-w-lib-invariant` + `bi-dist-breakage` letters, routed to U.W-ADOPT/U.W-LIB. The VISUAL certification
  used an uncommitted compat shim to serve locally; reverted, never committed. Orthogonal to the VISUAL
  cures.

---

## §Dispatch-stamp

**Stamped producer HEAD**: glass-ui **`ff0f62f2`** (`tranche/BI`, no upstream configured). value.js-side
landed loci: the whole-header contraction (`demo/@/components/custom/color-picker/ColorPicker.vue` +
`composables/useHeaderCondense.ts` + `header.css`) + the rider halves
(`demo/@/composables/useDocumentTitle.ts` + `router/index.ts` + `.scrollbar-thin` ×5). Gate:
`docs/tranches/U/audit/w-visual/pi/gate/gate-verdict-log.txt`. Close roll-up:
`docs/tranches/U/audit/w-visual-close-artefacts.md`. Landed commits: `62acf26` (U-F9 header contraction
+ one-law rhythm) · `135036d` (π/DELTA frames) · `cfa8c31` (lane-1 merge) · `9edd37e` (riders) ·
`be807ce` (lane-2 merge) · `c0dfcb8` (gate stamp).

**The dispatch record** (M1): this letter, path-scoped single-file commit into
`../glass-ui/docs/tranches/BI/coordination/` at their HEAD, **local (no upstream on `tranche/BI` →
not pushed, left for their session)**, supplementing (never superseding) the formation letter and the
two live BI letters.

Claude-Session: https://claude.ai/code/session_01XskVMTQAWVgvWQvhiYECgb
