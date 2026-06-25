# DELTA-ASSAY — dock-core (golden-vs-current + the UNION path)

The live delta between `GOLDEN.md` (hardened by `challenge/{1,2,3}.md`) and the SHIPPED
dock on `prototype/liquid-dock` HEAD. Orchestrator-owned, default-to-BROKEN, live-traced in
Chrome (chrome-devtools-mcp, :5173) + source-confirmed. The verdict drives `WAVE-AMENDMENT.md`.

---

## 0. THE LIVE WITNESS — the seizure is REAL, reproduced on the real route (the born-RED capture)

The three challenges all flagged that no born-RED artefact existed (the seizure rested on
prior-lens traces). **It exists now.** Firing the real hover gesture on the `/dock/overview`
"Collapsible (hover to expand)" dock (instance #1, rest w=224) and frame-sampling
`getBoundingClientRect().width` every rAF:

```
COLLAPSE (leave):  firstW 224 → maxW 2451.7px → minW 2.6px → lastW 59     cxRange 0
EXPAND  (enter):   59 → 198.6 → 33.2 → 44.7 → 44 → 224 (settles)         cxRange 0
```

- The **2451.7px** collapse detonation is the golden's cited `2452px` / `scaleX(55)` — EXACT.
- The expand path `59→198.6→33.2→44.7→…→224` is the golden's `59→200→33→41` balloon-then-implode
  — confirmed live, frame-for-frame.
- **`cxRange 0` both directions** — the centroid is PINNED. This is the cardinal finding proven:
  every prior judge measured the centroid (clean) and never the WIDTH (a seizure). The user
  rejected a "passing" morph because the WIDTH lurches while the center holds.

Source-confirmed root cause (`src/styles/dock/layers.css:129-160`, read live):
`--dock-root-ratio = from / max(to, 1px)`, then `--dock-root-scale = max(ratio + (1−ratio)·t, 0.06)`
— a **FLOOR with NO CEILING**. A degenerate per-swap `--dock-root-morph-to` (the FLIP measure
racing the content layout, `dockMorphMeasure.ts:measureAndArmMorph`) drives `ratio` to ~55 →
`scaleX(55)` = 2452px on collapse, or inverts at the spring's >1 overshoot on expand. The
golden's diagnosis is source-exact and live-exact. **This is the ONE true break.**

---

## 1. THE DELTA TABLE (KEEP / REFINE / RE-INVENT — survival of the fittest)

Live-confirmed dispositions. "KEEP" = fit, do not touch. "REFINE" = fit mechanism, evolve.
"RE-INVENT" = broken, replace.

| Item | Live finding (HEAD) | Disposition | Mechanism (union path) |
|---|---|---|---|
| **A3 size morph** | seizure 2452px / inverted (above) | **RE-INVENT** | the ONE break: ratio-free `--dock-live` convex blend of two positive endpoints + clamped size term (§2 below) |
| A3 centroid | `cxRange 0` both ways (live) | **KEEP** | `transform-origin: center` — center-out by construction, justify-agnostic |
| warm-cream plate | `srgb .944/.903/.865 /.52` every dock, both modes (live) | **KEEP** | R>G>B warm floor (BA.W-NO-GRAY); the colorful field rides behind, plate transmits |
| A4 self-blur | `backdrop blur(9px) saturate(1.4)`, rest `filter:none` (live) | **KEEP** | 9px calm backdrop; the 1.25px front-loaded self-blur clears by t≈0.5 |
| A1 live nav docks | BottomDock h=59 ONE row, `strayRailEls: 0` (live) | **KEEP** | the broken facets rail is already gone; box-INVIOLATE holds |
| A8 unified triggers | `.dock-trigger` shipped, 3× | **KEEP** | byte-identical recipe; open state rides `--dock-control-active` |
| A11 vertical pill | SidebarDock warm pill w=67 (live) | **KEEP** | `orientation="vertical"`; `--dock-live` blends block-size; φ-rung pad |
| A12 draggable items | `dock-items-draggable` class present (live, #2) | **KEEP + WIRE** | `useDockItemDrag` shipped; wire onto nav-dock items by default |
| A13 fission | engine 100%, assembly 0% | **RIDE** | `useDockFission`+`DockGooFilter`+`fission-bridge.css` shipped; compose `useScrollChrome`→fission |
| V↔H morph | `view-transition-name` present on showcase (live → crossfade facsimile) | **REFINE** | `useDockOrientationMorph` shipped; retire the VT crossfade default (BD.W-VH-COMPOSE) |
| `--motion-weight` | EMPTY on `:root` (live) | **SHIP** | phantom; ship as raw `@property <number>`, dock scope = 1 |
| `--ease-cartoon-punch` | EMPTY on `:root` (live) | **SHIP** | phantom; ship as raw `linear()` `--ease-*` token |
| `--dock-t` | EMPTY (the real token is `--dock-morph-t`) | **NO RENAME** | keep `--dock-morph-t` (challenge R5/R6) — strike every "--dock-t already exists" cite |
| the squish channel | `shape.css:127` folds `--stretch × --dock-root-scale` on ONE `scale:`; `--dock-morph-max-stretch: 1.14`; 6 JS owners of `--stretch` (live) | **RE-INVENT (separate channel)** | the punch needs its OWN `--dock-punch-stretch` (challenge R1/R3/R4), NOT shared `--stretch` |

---

## 2. THE UNION MECHANISM (deft integration — reuse extant primitives, KISS, no fork)

The golden's spine SURVIVED all three challenges (the size correctness leg is bulletproof by
construction — convex blend of two positive endpoints, clamped t, center-origin). The UNION
path is the golden mechanism with the FIVE challenge hardenings folded:

### (a) RE-INVENT the size leg — measure-ONCE + clamped convex blend (the ONE break)

DELETE the per-swap FLIP measure pipeline in `dockMorphMeasure.ts` (`measureAndArmMorph`,
`seatTargetSync`, `rebaseSiblingSpans`, `forceNestedMaxContent`, `nestedTargetsWithin`,
`measureTo`, `armRootMorphSpan`, `clearRootMorphSpan`, `morphMinFloorPx`) and the
`--dock-root-ratio`/`--dock-root-scale`/`--dock-root-morph-*` rules (`layers.css:129-160` +
the inner `60-94`). REPLACE with:

```css
/* layers.css — measure-ONCE endpoints (ResizeObserver-written), NO per-swap FLIP */
--dock-live: calc(var(--dock-collapsed-px) +
   (var(--dock-expanded-px) - var(--dock-collapsed-px)) * clamp(0, var(--dock-morph-t), 1));
--dock-size-scale: calc(var(--dock-live) / max(var(--dock-expanded-px), 1px));
```

A convex blend of two POSITIVE measured endpoints — monotone + bounded + center-pinned BY
CONSTRUCTION. The spring's >1 overshoot is invisible on size (`clamp(0,t,1)`); it routes to
the punch channel (c). The box RESERVES `--dock-expanded-px` (ONE layout solve, CDP-Layout-flat
— the kept good idea) and the visible size rides `scale: var(--dock-size-scale)` from
`transform-origin: center`. Keep the real token name **`--dock-morph-t`** (no rename — R5/R6).

**CHALLENGE FOLD (3·R2, freshness guard):** a measure-ONCE `--dock-expanded-px` can still be
stale/degenerate (read before `fonts.ready`, async icon SVGs, a `display:none`→0 route swap, a
`content-visibility:auto` collapsed parent → RO fires 0). The deleted floors masked a bad
measurement; do NOT re-introduce a magic floor, but DO gate freshness: floor
`--dock-expanded-px` at `max(measured, --dock-collapsed-px)` and re-measure on `fonts.ready` +
the FIRST non-zero RO callback + visibility-enter. Gate it (born-RED: mount hidden→reveal, assert
no detonation frame).

### (b) the spring drives `--dock-morph-t` 0→1; size clamps it (KEEP the clock)

`--dock-morph-t` (the shipped `@property`, `dock.css:83`) stays driven by the shipped
`SpringProgress` (ONE clock, the `dock` spring preset row). The size blend clamps `t` to [0,1];
the >1 overshoot rides the punch. **NO second size driver.**

### (c) the PUNCH — a DEDICATED `--dock-punch-stretch`, NOT shared `--stretch` (challenge R1/R3/R4)

The golden routed the punch through the existing `--stretch`. Live-confirmed this BREAKS:
`shape.css:127` already folds `--stretch × --dock-root-scale` on ONE `scale:`; `--stretch` has
**6 concurrent JS owners** (`useLiquidMorph`/`useGooMorph`/`useDockFission`/`useTabIndicator`/
`useTabDragMorph`/`useDragMorph`); and `--dock-morph-max-stretch: 1.14` (live) CAPS it below the
cartoon register. A fission-split fired mid-collapse (the golden's own A12 gesture) clobbers the
CSS-derived `--stretch` with the JS imperative writer — last-writer-wins. **The "boring channel
can't be exciting, exciting can't be wrong" guarantee is broken in the exact case the golden
nominates.** FOLD: mint a DISTINCT `@property --dock-punch-stretch` (CSS-only, NOT capped by
`--dock-morph-max-stretch`, which stays 1.14 for orientation/fission), and fold THREE factors on
the one `scale:`:

```css
/* shape.css — size × orientation/fission squish × cartoon punch, ONE compositor channel */
.glass-dock[data-morphing]:not(.vertical) {
  scale: calc(var(--dock-size-scale,1) * var(--stretch,1) * var(--dock-punch-stretch,1))
         calc(1 / (var(--stretch,1) * var(--dock-punch-stretch,1)));   /* reciprocal cross-axis */
}
```

`--dock-punch-stretch` is volume-preserving (reciprocal cross-axis) — it deforms the pill along
travel without moving the footprint or centroid. The orientation/fission squish keeps its 1.14
cap and its 6 JS owners; the collapse punch is orthogonal and CSS-owned → no clobber.

### (d) the punch DRIVER — a SEPARATE one-shot, NOT the damped spring (challenge 1·R1, 2·R1)

The boldest claim ("the pill ANTICIPATES") cannot ride `SpringProgress` — a damped spring
approaches monotonically from one side and CANNOT dip below origin (the golden states this at
line 50; the spike's anticipation was an artefact of a CSS `transition` over the `linear()`
curve that production does NOT use). FOLD: drive `--dock-punch-stretch` via a **separate WAAPI /
CSS `transition` on `--ease-cartoon-punch`** (the real ~4% pre-dip + ~22% overshoot `linear()`),
honestly a SECOND one-shot punch animation layered on the spring — NOT "one clock." It must
RETURN to 0 at settle (challenge 2·R1: the spike latched at +16% forever; the punch is a
transient that blooms then relaxes to `--dock-punch-stretch: 1`). `--motion-weight` (rest `1/φ`,
dock scope `1`) co-scales the punch depth + the cartoon-shadow travel; PRM → `--motion-weight: 0`
zeroes it (size snaps via clamped `t`, the confirm survives).

### (e) the cartoon CAST — a real bold rung + a NEW kinetic caster (challenge 1·R4, 2·R5)

The golden cited a "shipped `--shadow-cartoon`" cast; live-confirmed only `--shadow-cartoon-{sm,md,lg}`
exist and the spike's cast was a near-invisible `/0.10` drop. FOLD: use the real
`--shadow-cartoon-md/lg` layered offsets (bold, both modes, plain per-mode `.dark` arms — the
light-dark inset trap avoided) on an `::after`/inert-child caster; wire its `transform` travel to
`--motion-weight` (opposite-morph slide — paper morphism made kinetic). Mark the kinetic caster
NEW, not "shipped." This DEPENDS on the `cartoon-shadow` sibling greenfield's `BD.W-CARTOON-CASTER`
(the inert-child caster + registered props) — do not duplicate it.

### Why this is a UNION, not a fork

**KEEP (live-verified fit):** the `morph.css` plate/padding/border interp; the `.dock-layer`
3-state hit-test; the `@property --dock-morph-t` scalar (REAL name); the `shape.css` reciprocal
fold (extend with the 3rd factor); `transform-origin: center`; the reserved-footprint ONE-layout
idea; the center-out child stagger (`layers.css:373-433`); `SpringProgress` + the `dock` row;
`DockGooFilter`/`useDockFission`/`fission-bridge.css`; `useDockItemDrag`; `useDockHold`;
`.dock-trigger`. **RE-INVENT (the broken half only):** the measure→FLIP→ratio→scale WIDTH leg
(~120 lines deleted) → the measure-ONCE ResizeObserver + convex blend (~30 CSS lines + an RO).
**ADD:** `--motion-weight`/`--ease-cartoon-punch`/`--dock-punch-stretch` tokens + the separate
punch driver + the kinetic caster wire.

---

## 3. RECONCILIATION WITH THE EXTANT 116-WAVE SET (no duplicative work)

The golden cited `BB.W-DOCK-MORPH-FAMILY` / `BD.W-DOCK-CORE` as the waves to amend. Live audit
of `docs/tranches/BD/union/waves/`:

- **`BB.W-DOCK-MORPH-FAMILY` does NOT exist as a wave file** — it is an inline SOURCE comment tag
  (`layers.css`, `dockMorphMeasure.ts`). The real extant wave is **`W-DOCK-CORE.md`** (the A1–A13
  refine spec, with the `proof:no-gray` + `tests-visual/dock-core.spec.ts` gate already sketched).
  → AMEND `W-DOCK-CORE.md` (supersede its center-out/spring-retune MOVE-I with the ratio-free blend).
- **`W-DOCK-SCROLL-FISSION.md`** (the A13 assembly) — RIDES unchanged; the fission shares the
  re-tuned register, no second clock.
- **`BD.W-VH-COMPOSE.md`** — the V↔H crossfade-facsimile retire; live-confirmed the showcase still
  ships `view-transition-name`. UNTOUCHED by this amendment (it composes the shipped
  `useDockOrientationMorph`; the size-leg re-invent does not change its driver). Cross-link only.
- **`--motion-weight` / `--ease-cartoon-punch` are ALREADY BOOKED** by the Band-0
  `motion-spring-register` siblings: `BD.W-MOTION-WEIGHT` ships `--motion-weight`,
  `BD.W-CARTOON-PUNCH` ships `--ease-cartoon-punch` (per the §6 ledger rows for
  motion-spring-register + cartoon-shadow). dock-core is their FIRST consumer → **DEPEND, do not
  re-ship.** The golden's "NEW BD.W-MOTION-WEIGHT-CANON" is REDUNDANT — fold into the dependency.
- **The cartoon CASTER** is owned by `BD.W-CARTOON-CASTER` (cartoon-shadow sibling) → DEPEND for
  the kinetic-cast leg; this amendment only WIRES the dock as its loud consumer.

So the amendment is: **AUGMENT `W-DOCK-CORE`** (the size re-invent + the punch channel), **DEPEND**
on the already-booked motion tokens, **NEW** only the dedicated `--dock-punch-stretch` channel +
the born-RED width gate. No NEW motion-token wave (booked). No dup of fission/V↔H/caster.

---

## 4. CONVERGENCE

The correctness spine is **live-proven** (the seizure reproduced; the blend bounded by
construction). The audacity spine is **de-risked-on-paper but NOT yet built** (the 5 challenge
hardenings are folded into the union but the separate punch driver + dedicated channel + kinetic
caster need a real build + WebKit capture). Remaining gap is build-time: the real
`tests-visual/dock-core.spec.ts` born-RED capture (the width witness now exists — wire it into a
committed spec), the separate-driver punch re-spike, the Safari paint, the freshness guard.

**Convergence: ~86%** (golden synthesized + 3-challenge-hardened + delta live-assayed + union
written + the seizure live-reproduced as the born-RED witness; the 14% remainder is build-time
de-risk of the punch driver/channel/caster + the committed spec + WebKit).
