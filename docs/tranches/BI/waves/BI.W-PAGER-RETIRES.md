# BI.W-PAGER-RETIRES — the pager/carousel retire list (clean break, no alias)

Band B4 (pager greenfield). Executes the §6 retire list once the driver + rebuild land: the content
barbell composable, the wrong clock, the whole-layer filter, the doc drift.

## §Mandate

Discharges (registry rows this wave OWNS):
- **D-PAGER PASS-1 §6** — the retire list (clean break, no alias, no dormant stub, no half-delete — the
  symmetric-closure discipline).
- **SUFFUSION-MAP R9** (`--pager-worm-duration: 1.8s` + the `--goo-t` transition-restart) · **R11** (the
  whole-layer pager filter → worm-scoped or absent; `useCarouselWorm.ts` DELETE).

## §Design

Decided mechanism — D-PAGER PASS-1 §6 (KEEP list explicit) + the no-dual-path discipline. Executes AFTER
W-PAGER-WORM (driver) + W-CAROUSEL-REBUILD (consumer removal) so no live reference dangles. NO
re-litigating.

- **DELETE wholesale** (no alias): `src/components/ui/carousel/composables/useCarouselWorm.ts`; the
  `.carousel-goo-layer`/`-body`/`-neck` + `#carousel-neck-throat` clip + the `.carousel-content-root::before`
  cartoon-cast in `CarouselContent.vue` (W-CAROUSEL-REBUILD removed the mount; this removes the CSS/token
  residue); the `--carousel-goo-flow`/`-duration`/`-max-stretch` tokens (`scheme-spring.css`); the
  whole-layer `.pager-goo-layer { filter }` over the bed.
- **The 1.8s clock:** `--pager-worm-duration: 1.8s` as a VALUE retires — release-at-arrival is emergent
  under W-PAGER-WORM's two-edge driver, so the `--pager-worm-flow` `linear()` + duration tokens retire too
  (the driver owns the settle). If W-PAGER-WORM shipped Arm B (clip-throat, driver-only) the retire is
  total; if it kept a filtered `--goo-t` read-back path the retire is scoped to the timer.
- **The `#pager-goo` id (plate scale, σ8/18/−7):** retires from the pager reference; the id survives ONLY
  for a LIVE plate consumer (the G8 fence — carousel-plate/deck-plate off `useGooMorph`). IF Arm B or the
  driver won the paint level, the pager's `useGooMorph` use retires FOR THE PAGER ONLY (`useGooMorph` +
  `gooBarbellGeometry` STAY — the plate/deck consumers).
- **Doc drift:** `src/components/custom/pager-dots/README.md` is STALE (describes 6px/24px dots on
  `--spring-dock`; HEAD was the 13px barbell on `--pager-worm-flow`) — reconciled with the shipped arm.

## §Work

- DELETE `src/components/ui/carousel/composables/useCarouselWorm.ts` (+ its barrel export if any).
- `src/components/ui/carousel/CarouselContent.vue` — remove the residual `.carousel-goo-*` CSS + the
  `#glass-goo` reference (symmetric with W-CAROUSEL-REBUILD's mount removal).
- `src/styles/tokens/scheme-spring.css` — DELETE `--carousel-goo-flow`/`-duration`/`-max-stretch` +
  `--pager-worm-duration` (+ `--pager-worm-flow` if the driver owns the settle).
- `src/styles/…` (pager) — remove the whole-layer `.pager-goo-layer { filter }` (W-PAGER-WORM moved the
  filter to the worm group; this deletes the dead bed rule).
- `src/components/custom/goo-filter/GooFilter.vue` — `#pager-goo` `LIBRARY_IDS:55` retires from the pager
  path; kept only if a live plate consumer references it (else excised under G8).
- `src/components/custom/pager-dots/README.md` — reconcile to the shipped arm.

## §Acceptance

Gate: **`proof:no-dual-path`** (EXTEND in place — the pager arm) + **`proof:pager-worm`** W3 (one arm).
Born-RED at HEAD: `useCarouselWorm.ts` exists, `--pager-worm-duration: 1.8s` exists, the whole-layer bed
filter exists. GREEN here.
- P1 — `useCarouselWorm.ts` DEFINITION-ABSENT; the `--carousel-goo-*` tokens absent; the `.carousel-goo-*`
  CSS absent (no half-delete — a broken reference REDs).
- P2 — `--pager-worm-duration: 1.8s` absent (the wrong clock gone); no `--goo-t` per-frame `getComputedStyle`
  read-back survives on the pager.
- P3 — the whole-layer bed filter absent; the filter (if any) scopes to the worm group id.
- P4 — README reconciled (no stale 6px/`--spring-dock` claim).
- Self-test bite: a planted `useCarouselWorm` import REDs; a planted dormant `--carousel-goo-duration` stub
  REDs; a planted whole-layer bed filter REDs.

## §π/DELTA

No new capture — this is a retire wave (a dead-mechanism cut changes ZERO paint where the successor already
paints; W-PAGER-WORM + W-CAROUSEL-REBUILD carry the visual verdicts). The `proof:pager-worm` /
`proof:carousel-rebuild` GREENs are the proof the retire left no live reference.

## §Obligations

- No device run (source-absence gate + the sibling waves' captures).
- No cross-repo ask — `useCarouselWorm`/`--carousel-goo-*`/`--pager-worm-duration` are internal (no
  published surface); `#pager-goo` retire is fenced to live plate consumers (G8).

## §Dispositions

- **The `#glass-goo` / `useGooMorph` deck-plate share (G8)** — the deck's own full-plate barbell is the SAME
  category error as Defect 2 but is the MOTION family's call, OUT of this charter — the fence is recorded, not
  actioned here. No re-book.
- Executes the §6 retire list terminally: no alias, no dormant stub, no half-delete survives the cut.
