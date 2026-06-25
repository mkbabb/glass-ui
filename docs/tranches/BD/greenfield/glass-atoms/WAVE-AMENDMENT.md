# GLASS ATOMS — WAVE-AMENDMENT (reconciled vs the live 116-wave union set)

> The CONCRETE tranche amendment for the four small glass atoms (Badge + metric-badge · Slider ·
> IconChip · StackedIconGroup). Reference implementation: `glass-atoms/GOLDEN.md` (hardened by the
> three challenges + this assay's DELTA). Tranche-DEV only — author/converge on `prototype/liquid-dock`;
> NEVER a master-merge or publish (W-CUT is USER-gated). No dup vs the extant set; no second
> field/edge/motion/ink/caster/component minted. KISS · DRY · NO LEGACY.

---

## DISPOSITION — 1 NEW wave + 3 AUGMENT (one-line consumer enrollments) + 1 CROSS-LINK + 7 DEPEND + 0 PRUNE/EXCISE-of-a-wave

Every atom is the deft ≥Nth consumer of axes the union already ships or has BOOKED via the sibling
greenfield amendments. Zero new glass material, zero new motion register, zero new field, zero new
cartoon ink, zero new caster.

| action | wave | reconciliation |
|---|---|---|
| **NEW** | `BD.W-GLASS-ATOM-REGISTER` (Band 7 / Band B) | the `.glass-atom` consume-only recipe + `useDragVelocity` (the ONE honest bridge) + the slider weight-train + default-tint flip + `<Badge surface="glass">` + the `+N` glass re-host + the StackedIcon arc + the Badge loud-register rim/idle-cel/press-squish. Authored below. |
| **AUGMENT** | `BD.W-TAB-IOS-CAPSULE.md` | enroll `.glass-atom` as a `.glass-capsule` consumer (the atom recipe COMPOSES the layout-neutral capsule body; it is a PEER of `.glass-chip`, never `.glass-chip` itself). One-line consumer-list edit; expose nothing new (the tabs amendment already exposes `--glass-capsule-fill`). |
| **AUGMENT** | `BD.W-TINTED-CHIP.md` | enroll the glass atoms (badge-glass, slider fill, the `+N`) in the `--glass-fill-tint`/`-strength` consumer ledger (`docs/consumer-evidence/glass-fill-tint.md`). Strengthens the ≥2-consumer bar, never forks the axis. |
| **AUGMENT** | `BD.W-CARTOON-CASTER.md` (booked — cartoon-shadow amendment) | name the glass atoms (the loud Badge `data-cast`, the slider cast-lag, the `+N`/arc) as caster consumers of the inert `.cartoon-cast` child + `useCartoonCast`; widen its live-DEAD bite to `<Badge data-cast>`. The atom does NOT re-spike on `::after` (resolves ch#1 R1 / #2 R3 / #3 R1). |
| **CROSS-LINK** | `BD.W-ICONCHIP-GLASS.md` | NO edit — the IconChip glass arm IS that wave's `surface="glass"` register (consuming `--glass-fill-tint`); the `in srgb` brand plate stays owned there (AW.W26). This wave adds only the radius/√φ congruence note + the StackedIcon disc-register reconcile (the disc is the consumer's IconChip/avatar). |
| **DEPEND** | `BD.W-TAB-IOS-CAPSULE` · `BD.W-TINTED-CHIP` · `BD.W-GLASS-FIELD` · `BD.W-GLASS-KEY-EDGE` · `BD.W-MOTION-WEIGHT` · `BD.W-CARTOON-PUNCH` · `BD.W-CARTOON-CEL-INK` · `BD.W-CARTOON-CASTER` | the build-DAG. The first two are ON DISK; the rest are BOOKED by the sibling amendments (motion-spring-register / cartoon-shadow / glass-material / page-background). The gate ERRORS (no-such-token) until each merges to `src/`. |
| **PRUNE / EXCISE (of a WAVE)** | none | nothing is broken at the wave level. EXCISE from CODE: the `+N` `bg-[color-mix(…--background…)]`/`shadow-cartoon-sm` hardcode (`StackedIconGroup.vue:36`) + the slider `--primary` default tint (`Slider.vue:225`). EXCISE from SCOPE: any `::before`/`::after` cel cast + any new core drag composable beyond `useDragVelocity`. |

**Why 1 NEW + 3 AUGMENT (not 4 new, like the golden's first read):** the golden cites DEPEND wave
NAMES (`BD.W-GLASS-FIELD`/`-KEY-EDGE`/`-MOTION-WEIGHT`/`-CARTOON-PUNCH`/`-CARTOON-CEL-INK`) as if this
wave authored them. It does NOT — they are deliverables of the SIBLING greenfield amendments, each
with its own born-RED gate. This amendment DEPENDs on them. The atom's OWN net-new surface is the
ONE `.glass-atom` recipe + `useDragVelocity` + the four consumer wirings — everything else is a
consume of a booked or shipped axis. (Mirrors the tabs/buttons/cards/select amendments, which all
collapse the golden's per-item "4 new waves" onto 1 NEW + AUGMENTs + the shared booked DEPENDs.)

---

## THE NEW WAVE — `BD.W-GLASS-ATOM-REGISTER.md`

**File to author:** `docs/tranches/BD/union/waves/BD.W-GLASS-ATOM-REGISTER.md`.
**Band 7 (Cards / controls / glass-for-every-element) · Tier T7 · CRITICAL.**
**Reference implementation:** `docs/tranches/BD/greenfield/glass-atoms/GOLDEN.md` (hardened by
`challenge/1.md`, `2.md`, `3.md` + `DELTA-ASSAY.md`).

**Depends (HARD — the gate ERRORS no-such-token until each merges to `src/`):**
`BD.W-TAB-IOS-CAPSULE` (the `.glass-capsule` body + warm floor + `--glass-capsule-fill`),
`BD.W-TINTED-CHIP` (the `--glass-fill-tint` consume-wire), `BD.W-GLASS-FIELD` (the #1 §3-gray cure —
the warm field the chassis mounts), `BD.W-GLASS-KEY-EDGE` (the keyed rim — the defined edge),
`BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (the motion register), `BD.W-CARTOON-CEL-INK` (the warm
`--cartoon-ink`, K5 fix), `BD.W-CARTOON-CASTER` (the inert `.cartoon-cast` child + `useCartoonCast` +
the promotion/no-backdrop-inherit contract).

### The defect / the ask
Four small atoms each paint a gray/flat/melting/uniform-shrink defect (the born-RED ledger §below).
They share NO register today — each forks its own material. The ask: ONE shared `.glass-atom`
consume-only recipe (warm transmissive capsule + keyed rim + warm floor + warm cel cast + the
non-uniform punch), with the four atoms as its consumers in two registers (loud opaque identity vs
quiet transmissive glass), and the slider weight-train as the atom-scale proof of the
liquid-weight-universal law — composing only extant/booked axes + ONE honest velocity bridge.

### Starting state (HEAD, verified live + on disk — the born-RED anchor)
- Badge: `border-transparent` on every variant (`badge/index.ts`); live `backdropFilter:none`,
  `boxShadow:none`, `border rgba(0,0,0,0)/1px`; `secondary` = `rgb(237,230,222)` sand melts on cream.
- Slider fill: `.slider-range` bg `oklab(0.216 …/0.88)` C≈0.006 muddy-dark (`Slider.vue:225`
  `--slider-range-bg, var(--primary)`); press `transform: scale(0.97)` uniform (`:311`). The blur/rim/
  color-mix ARE extant (KEEP).
- metric-badge: hover `scale: 1.04` uniform, `:active scale: 0.96` (`utilities/components.css:7+`);
  hover cast `--shadow-cartoon-sm`.
- K5: `--shadow-cartoon` mixes `var(--foreground)` (`shadow.css:9`); dark `--shadow-color:--foreground`
  → `srgb 0.914 0.9 0.886/0.1` L≈0.90 near-white chroma≈0.
- `+N` chip: `bg-[color-mix(in_srgb,var(--background)_96%,transparent)]` + `shadow-cartoon-sm`
  (`StackedIconGroup.vue:36`), flat near-white, `transition-delay:0s`, `backdrop:none`.
- Stack fan: `group-hover/stack:translate-x-1.5 scale-105` on `ease-spring-snappy`
  (`StackedIconGroup.vue:20-21,42-43`) — flat, no rotate, no per-index delay.
- IconChip: `0 backdrop-filter` in `icon-chip.css`, no `surface` prop (owned by `BD.W-ICONCHIP-GLASS`).
- Build-DAG: `.glass-capsule`/`.glass-chip`/`.glass-atom`/`--motion-weight`/`--ease-cartoon-punch`/
  `--cartoon-ink` ALL 0 in `src/` (grep-verified by all 3 challenges).

### The mechanism (consume-only — declares ZERO own glass tokens)
1. **`.glass-atom`** (`src/styles/glass/glass-atom.css`, `@layer components`) COMPOSES `.glass-capsule`
   (body — `BD.W-TAB-IOS-CAPSULE`, a PEER of `.glass-chip`, NEVER `.glass-chip` itself) + the
   `--glass-fill-tint`/`-strength` axis + `--glass-material-rim` (`BD.W-GLASS-KEY-EDGE`) + the warm
   floor + the inert `.cartoon-cast` child (`BD.W-CARTOON-CASTER`) + the motion register. The warm
   floor is **NON-self-referential** (ch#1 R8): a separate input var —
   `--accent-fill-strength: max(var(--accent-fill-strength-in, 0%), var(--atom-tint-floor))`,
   `--atom-tint-floor: 12%` light / `15%` dark (PLAIN per-mode, NEVER `light-dark()` — the inset-shadow
   trap). The `:active` punch is non-uniform `scale: 1.04 0.94` (widen X, compress Y). The warm mixes
   spec `color-mix(in oklab, <warm> X%, oklch(.9 .05 60 / 0))` (transparent-WARM, not bare
   `transparent` — ch#1 R4 / #2 R4 the WebKit desaturation fix).
2. **The cartoon cast is UNIVERSAL-but-GRADED** (ch#1 R5 / #3 R5): every atom carries the press-squash
   + a hairline warm rim-cast at rest (the family floor, §L4-universal); `data-cast` INTENSIFIES the
   loud layered-offset stamp for the flagships (metric-badge, `+N`), it does NOT introduce it. The cast
   rides the inert `.cartoon-cast` child (promoted `will-change: transform`, no inherited
   backdrop-filter — `BD.W-CARTOON-CASTER`'s contract), NEVER `::before`/`::after` (OCCUPIED).
3. **Badge** — loud register gains the keyed rim (defined edge) + press-squish + idle-soft-cel/`data-cast`;
   NEW `<Badge surface="glass">` = the `.glass-atom` quiet capsule tinted via `--glass-fill-tint`
   (`secondary`/`outline` route quiet). NO `tone` CVA axis (design.md §867 — section ramp stays a
   `--section-color-N` consumer recipe). metric-badge consumes `.glass-atom` (DRY); hover = squash-lift
   `scale: 1.05 0.96` + `translate -2px` on `--ease-cartoon-punch × --motion-weight`, cast lag ~1.15×;
   K5 fixed UPSTREAM by `BD.W-CARTOON-CEL-INK` (no SFC edit); `data-just-resolved` catch-light KEPT.
4. **Slider** — REFINE not re-invent (ch R3): the fill keeps its extant blur/rim/color-mix; the
   default range tint flips `--primary`→the warm `--glass-fill-tint` floor (`--slider-range-bg` stays
   the consumer's loud override). Press → non-uniform squash (`scale: 0.98 1.03`). The **weight-train**
   (`:liquidDrag`, default on): anticipation dip on grab → **BOUNDED saturating smear**
   (`v_eff = tanh(k·v)` / clamp ~0.7, ch#3 R3) the cast lagging by `--motion-weight × velocity` → a
   ~22% follow-through overshoot (the punch curve's >1.0 knot) then settle. The track does NOT move
   (box-INVIOLATE). PRM → plain squish floor. `useDockHold`/`useTouchGate`/invisible-thumb/spectrum
   squircle = byte-preserved.
5. **`useDragVelocity`** (NEW, the ONE honest bridge — ch#1 R2 / #2 R1): a drag-window-gated rAF
   (`pointerdown` opens / `pointerup` tears down) that writes `--atom-drag-v` (0..1, PRM→0). It does
   NOT consume `usePointerVelocityField` (a no-own-rAF push-API with no CSS-var output, no slider frame
   loop). `useDragMorph`/`useLiquidFlex` are named ONLY if wired (verify at build or drop).
6. **StackedIcon** — the `+N` becomes a `.glass-atom` quiet capsule (EXCISE the hardcode). The fan-out
   becomes a **BOUNDED arc** (RE-INVENT, ch#3 R4): per-index `transition-delay` stagger + a fixed total
   sweep `rotate(calc(var(--i) / var(--n) * 18deg))` (≤18° regardless of N, NOT per-puck `* 2.4deg`) +
   bounded lift, each puck casting its own cel, on `--motion-weight × --ease-cartoon-punch`. `--n` is
   threaded to the consumer. The discs DROP `backdrop-filter` during the fan (or UA-floor the rotate)
   for the WebKit re-raster cliff (ch#2 R4).

### The gate — `proof:glass-atom` (NEW) + `tests-visual/glass-atom.spec.ts`, born-RED → GREEN
Born-RED, painted-pixel, **chromium + webkit, both modes** (a Chrome-only pass is NOT a pass). The
painted-composite reader parses `oklab()`/`color(srgb)`/`oklch()` (the paint-arm.mjs precedent).

- **A1 warm-not-gray** — each atom's PAINTED composite over a REAL field (canvas `drawImage` +
  `getImageData`, NOT `getComputedStyle().backgroundColor` over a hardcoded field) reads C ≥
  FIELD_FLOOR warm, H ∈ [45,85]. **Self-test (LITERAL): MUST fail on a flat-base field, PASS on the
  gradient field** (proves it reads the chroma layer). Born-RED: badge `backdrop:none`, slider fill
  C≈0.006, `+N` flat. ERRORS until `BD.W-GLASS-FIELD` + the floor land.
- **A2 defined-edge** — non-flat keyed rim + cast non-`none` + border α ≥ 8% warm-ink; the rim's
  lit-edge vs host ΔL ≥ 3:1 (WCAG 1.4.11). **A2b: under PRT + `prefers-contrast:more` the rim ΔL vs the
  OPAQUE body clears ≥3:1** (ch#2 R6). Born-RED: badge `border:transparent` melts; metric-badge 4%-α.
- **A3 cartoon-cast-not-white (K5)** — warm `--cartoon-ink` (chroma ≥ 0.09, 0-blur) in light AND a
  VISIBLE warm offset (|L_ink − L_host| ≥ 0.12) in dark. Born-RED: dark `--shadow-cartoon-sm`
  `srgb 0.914 0.9 0.886` L≈0.90 chroma≈0. Fixed by `BD.W-CARTOON-CEL-INK` (DEPEND).
- **A4 slider-fill-warm (PAINTED composite, ch R2)** — over the real field the fill clears BOTH an L
  floor (must lift) AND a C floor (NOT the dark muddy bar). NOT the isolated `backgroundColor` token.
  Born-RED: live `oklab(0.216 …)`.
- **A5 weight-train (BOUNDED, deterministic — ch#1 R7 / #3 R3 / #3 R6)** — mid-drag fill `scaleX ≠
  scaleY` AND displacement > rest AND BOUNDED (high-v sample < 1.3× mid-v, not 2× — the saturating
  smear); release overshoot via the STATIC assert (the `--ease-cartoon-punch` curve's computed output
  >1.0 at a FIXED progress fraction — overshoot is a property of the curve, provable without rAF
  sampling); a synthetic value transition drives it (not a live human ramp); the rAF sample is a soft
  corroborator. The cast lags the leading edge. Born-RED: live uniform `0.97`, no displacement.
- **A6 squash-not-shrink + end-cap (ch#2 R4)** — mid-press `scaleX ≠ scaleY` on metric-badge + slider;
  AND the end-cap aspect stays ≥ a circle tolerance under non-uniform scale on the pill radius (the
  `border-radius` tracks the scaled box). Born-RED: live uniform `0.97`/`1.04`.
- **A7 arc (BOUNDED — ch#3 R4)** — hover fan traces a non-zero `rotate` + per-index `transition-delay`
  stagger AND the outermost puck's rotation is INDEPENDENT of N (the fixed total sweep). A flat
  translate / per-puck-compounding rotate = FAIL. Born-RED: live flat `translate-x-1.5 scale-105`.
- **A8 paint-fence + A8b promotion (ch#2 R2)** — A8: NO box-shadow VALUE change per-frame
  (self-test: a planted animated-box-shadow REDS). A8b: a Chrome trace + a **webkit** trace over the
  drag window asserts ZERO Paint/Layerize on the cast layer during the smear (the un-promoted-translate
  repaint — a different failure than A8). The cast child is `will-change: transform`, NOT inheriting
  the fill's backdrop-filter (the `BD.W-CARTOON-CASTER` contract).
- **A9 cross-engine warm (ch#1 R4 / #2 R4)** — run BOTH engines; A1 (painted warm-not-gray) runs on
  **webkit** as a HARD arm. The warm mixes use `color-mix(in oklab, <warm>, oklch(.9 .05 60 / 0))`;
  self-test: a planted bare-`transparent` mix REDS the webkit warm arm. The spec asserts no
  `backdrop-filter:url` appears in the atom CSS. A rotated-backdrop-filter stack disc is traced on
  webkit for no per-frame re-raster.
- **A10 PRM/PRT + keep-dock-open + no-idle-rAF** — under PRM the displacement/squash/cast-lag hold at
  rest (zero) while the warm tint + rim + STATIC cast persist; under PRT the blur drops, the warm tint
  stays; `useDockHold` still acquires on `pointerdown` (byte-preserved), the train doesn't break the
  hold; **`useDragVelocity`'s rAF is GONE after `pointerup`** (a unit fails if any rAF survives — the
  no-idle-cost contract, ch#2 R1).
- **A11 axis-floor + no-self-cycle (ch#1 R8)** — the idle (no-field, no-accent) atom's resolved
  `--accent-fill-strength` ≥ `--atom-tint-floor` (12%/15%). Self-test: a self-referential
  `max(var(--accent-fill-strength), …)` REDS (proves the floor actually fires, not silently dropped).

**The build-DAG fence (the §0 honesty):** the gate ERRORS (not fails) on the glass/punch arms until
the DEPENDs land — the correct honest sequencing over the flat-field condition today.

**Overfit bar (honest count — ch#1 R9):** ≥2 cleared by metric-badge + `<Badge surface="glass">`
(both OWNED). Slider-fill + `+N` are additional OWNED; IconChip-glass is cross-linked (counted at
`BD.W-ICONCHIP-GLASS`).

### The binding π — tests-visual/glass-atom.spec.ts
VISUAL wave → a `proof:ba-gestalt` verdict + a captured DELTA, both modes × desktop+mobile, Chromium +
the **webkit project**. GREEN at THIS wave's OWN close (no "rides W-REFLECT"). LIVE MOTION (never
`reducedMotion`); the painted-composite reads parse `oklab()`/`color(srgb)`/`oklch()`; the two
self-test fields (flat-base + gradient) ship as FIXTURES, not prose. The captured DELTA at
`docs/tranches/BD/audit/visual/W-GLASS-ATOM-REGISTER-DELTA.md`.

### Fences
1. `.glass-atom` declares ZERO own glass tokens — composes only (the no-fork fence).
2. `.glass-atom` is a PEER of `.glass-chip` (both compose `.glass-capsule`), NEVER `.glass-chip`
   itself — `BD.W-TAB-IOS-CAPSULE` is a HARD ordered DEPEND (no build-time coin-flip; ch#1 R6 / #2 R5).
3. The cast rides the inert `.cartoon-cast` child (promoted, no inherited backdrop-filter), NEVER a
   pseudo (OCCUPIED).
4. `useDragVelocity` is the ONLY new composable; its rAF tears down on `pointerup` (no idle cost).
5. The slider is REFINED (one default-tint flip) — the blur/rim/color-mix are byte-untouched.
6. The smear + the arc are BOUNDED (saturating mass, fixed total sweep) — never unbounded rubber-band.
7. The loud Badge keeps its AA-ratified dark-destructive deepening (AY.W-PRIM-POLISH D4); the `+N`
   stays a focusable summary.
8. NO `backdrop-filter:url`, NO goo, NO metaball — flat capsule lenses, Safari-native.

---

## AUGMENT EDITS (one-line consumer enrollments — no re-author)

1. **`BD.W-TAB-IOS-CAPSULE.md`** — add to its `.glass-capsule` consumer list: *"`.glass-atom` (the
   glass-atoms register — `BD.W-GLASS-ATOM-REGISTER`) composes the layout-neutral capsule body as a
   PEER of `.glass-chip`."* No new export (the warm-floor RE-INVENT + `--glass-capsule-fill` are
   already in that amendment's scope).
2. **`BD.W-TINTED-CHIP.md`** — add to `docs/consumer-evidence/glass-fill-tint.md`: *"`<Badge
   surface=\"glass\">`, the slider fill (default range tint), the StackedIcon `+N` chip — the
   glass-atoms register tints via the ONE `--glass-fill-tint` axis (`BD.W-GLASS-ATOM-REGISTER`), never a
   forked atom tint."*
3. **`BD.W-CARTOON-CASTER.md`** (booked — cartoon-shadow amendment) — add the glass atoms as caster
   consumers (the loud Badge `data-cast`, the slider cast-lag, the `+N`/arc) of the inert
   `.cartoon-cast` child + `useCartoonCast`; widen the live-DEAD bite to `<Badge data-cast>`. The atom
   does NOT re-spike on `::after`.

## CROSS-LINK (no edit)
- **`BD.W-ICONCHIP-GLASS.md`** — the IconChip `surface="glass"` register IS that wave's deliverable
  (consuming `--glass-fill-tint`, the `in srgb` brand plate kept). This wave references it for the
  IconChip radius/√φ congruence note + the StackedIcon disc-register reconcile (the disc is the
  consumer's IconChip/avatar via the `icon` slot); it does NOT double-author the glass arm.

## NOT minted (the no-dup proof vs the 116-wave set)
- NO second field — `BD.W-GLASS-FIELD`/`BD.W-PAGE-FIELD` (glass-material + page-background amendments).
- NO second edge — `BD.W-GLASS-KEY-EDGE` (glass-material amendment).
- NO second motion register — `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` (motion-spring amendment).
- NO second ink/caster — `BD.W-CARTOON-CEL-INK`/`BD.W-CARTOON-CASTER` (cartoon-shadow amendment).
- NO second tint axis — `--glass-fill-tint` (`BD.W-TINTED-CHIP`, extant `glass.css:399`).
- NO second capsule — `BD.W-TAB-IOS-CAPSULE`.
- NO second velocity composable beyond `useDragVelocity` — `usePointerVelocityField` is the WRONG
  shape (push-API, no CSS var, no slider loop) and is NOT consumed.

---

## DELIVERABLES (this wave OWNS)
- `src/styles/glass/glass-atom.css` (the consume-only recipe).
- `src/composables/dom/useDragVelocity.ts` (the ONE honest bridge; no-idle-rAF teardown).
- `<Badge surface="glass">` (the opt-in + the loud-register rim/idle-cel/press-squish on `Badge.vue` +
  `badge/index.ts`).
- the slider weight-train wiring + default-tint flip (`Slider.vue`).
- the `+N` glass re-host + the bounded arc + the `--n` thread (`StackedIconGroup.vue`).
- metric-badge consuming `.glass-atom` (`utilities/components.css` / `MetricBadge.vue`).
- `scripts/proof-glass-atom.mjs` (born-RED, A1–A11) + `tests-visual/glass-atom.spec.ts` (Chromium +
  WebKit, both modes) + the two self-test field fixtures.
