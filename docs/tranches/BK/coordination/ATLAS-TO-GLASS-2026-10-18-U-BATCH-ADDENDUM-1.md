# ATLAS → GLASS · 2026-10-18 · U batch, addendum 1 (the G-4 seat census, R-K1-b/c, R-1, R-2)

This addendum is to `ATLAS-TO-GLASS-2026-10-17-U-BATCH.md`, which this directory already holds, from the sci-report / atlas U formation (build lane B5). It keeps the earlier letter's version basis: published `@mkbabb/glass-ui@10.1.0`, cited at tag `v10.1.0`. It adds the measurement the letter promised for G-4 and four new rows. No other U relay goes out ahead of or beside this one.

**Wave marking.**
- G-4 (measured) and R-K1-b/c are `D5A-W0 · glass-ui → 10.1.1`, the same car as G-1 to G-3.
- R-1 is `W-GLASS-RELAY · glass-ui → 10.1.1`.
- R-2 is a question and carries no vehicle.

**What changed on our side.** The atlas owner amended H-A1 (sci-report `atlas/docs/tranches/U/RULINGS-2026-09-23.md` §K, H-A1′):
- atlas `8.0.0-rc.1` now waits only on **G-1** (the sheet renders in page flow) and **G-2** (the menu z rung).
- G-3/G-4, the seat rule, now gate atlas **8.0.0 final**. The census below shows the rule still affects atlas.

---

## G-4 · measured: the dock run claims `role=toolbar` over 2–4 container seats on every route

**Instrument.** We used `seat-census.mjs`, which runs one browser per engine and opens a new context per cell, on 8 routes × 390/1440 × Chromium, Firefox and Playwright WebKit 2287. The build was atlas `u/build-atlas-rc` at 42999c2 on glass 10.1.0. Firefox and WebKit match Chromium in every cell. The evidence is in `~/Programming/.u-build/out/b5-atlas-check/` (`census-before/`, `census-after/`, `tools/`), and the write-up is sci-report `atlas/docs/tranches/U/build/B5-ATLAS-CHECK.md` §4.

**Who authors the claim.**
- `GlassDock` sets `role: "toolbar"` on `fullEl` (`dist/dock.js:870`).
- `useDockRun` roves that element (`dock.js:584-700, 749-753`).
- `inheritAttrs: false` (`dock.js:734`) means a consumer cannot pass a different role through.

Atlas's own toolbar claim, the source-data browser's control row, is now `role=group`, cured in atlas 42999c2. The dock census reads the same before and after that change.

**Seats per route.**

| Route | Seats / container seats at 390 | At 1440 | Focus targets the run writes to `tabindex=-1` |
|---|---|---|---|
| /sci, /usf, /usf-integrity | 4 / 3 | 4 / 4 | 390: filter trigger, gear · 1440: filter trigger, provenance handle, year range |
| /ecf, /demand | 4 / 3 | 4 / 4 | 390: filter trigger, gear · 1440: filter trigger, provenance handle, dark toggle |
| /bead, /speedtest | 4 / 2 | 4 / 3 | 390: gear · 1440: provenance handle, dark toggle |
| /vft-germination | 3 / 2 | 3 / 2 | 390: gear · 1440: dark toggle |

**What a reader meets.**
- A Chromium Tab walk at 1440 on /sci never reaches the year range, the filter trigger, the provenance handle or the dark toggle.
- ArrowDown in the chapter rail either jumps to the next seat or is swallowed (`preventDefault` with no move, when the next seat has no focus target). It never moves between chapters.

**Correction to the letter of 2026-10-17.** That letter inferred G-4 for the post-A-39 tree from a P2 census. This addendum replaces the inference with a measurement on the glass-10 build.

**Ask (unchanged).** Ship b-ii (a declared seat marker) or the third shape (no toolbar claim when a seat's focus target is not the seat itself) in 10.1.1, with `g-dock-seat-rule.test.ts` and `crit-seat-cx.test.ts` placed together. If it can only ship in 11.0.0, tell us, and atlas will re-seat its dock into single-control seats (design-loop work) rather than override yours.

---

## R-K1-b · `useSpringMount` unmounts only when the integrated value is `>= 1`

- **Located.** `dist/useSpringMount-*.js` (10.1.0) unmounts on `spring.value >= 1`.
- **Mechanism.** The keyframes.js spring rests at `origin + s·(target − origin)`. With origin −0.0069 at s = 1, that is `0.9999999999999999`, not 1. We have relayed this to keyframes.js as R-K1-a, in `keyframes.js/docs/tranches/V/coordination/ATLAS-INBOUND-2026-10-18-spring-settle-float.md`.
- **Effect.** About 1 close in 3 at 350 ms leaves the Sheet mounted, inert and `data-state=closed` until the next open. On 10.1.0 it is still painted in page flow (G-1).
- **Cure.** Gate unmount on the spring having settled with its target `>= 1`, not on the integrated value.
- **Acceptance.** 50 open/close cycles at 350 ms, run with keyframes' rest fixed and unfixed: 0 closed sheets left mounted.

## R-K1-c · SheetContent's synchronous focus return loses to the armed Reka trap

- **Effect.** With motion on, the return to the trigger runs while Reka's FocusScope trap is still armed. `inert` is then applied and drops focus to `BODY` for the length of the exit spring. This happened on 12 of 12 sheet closes in atlas's PlateAct spec (Chromium) before atlas compensated.
- **Cure.** Return focus after the trap releases (post-render), or release the trap before `inert` is applied.
- **Acceptance.** With motion on, after Escape or the close control, `document.activeElement` is the trigger on 12 of 12 closes, in three engines.
- **Note.** Atlas holds a focus watch in PlateAct (`watch(sheetOpen …)`) for its own act row. It will be deleted when this row lands.

## R-1 · ToggleGroupItem inactive ink on a glass surface is under 4.5:1 in light

- **Measured.** The off label (`--muted-foreground`) on the Sheet's graded halo, in light: 2.02:1 median in Chromium (1.70 at minimum) and 2.94:1 in Firefox. The on label (`--foreground` over a 12 % foreground mix) is 4.23:1 in Chromium.
- **Prior art.** Your own 10.0.0 cure for SegmentedTabs: MIGRATION, "Paint: three label sites clear 4.5:1", where `.glass-capsule-track` joins the `--on-glass-muted-strong` ladder.
- **Ask.** Give ToggleGroupItem the same on-glass ladder, and check the on state against the sheet halo.
- **Caveat.** We measured on an emulated G-1 cure. Please measure after G-1 lands, because the halo ground depends on it.
- **Evidence.** sci-report `atlas/docs/tranches/U/build/B5-SCI-FILTERS.md` §4; `pixel-contrast-table.txt`.

## R-2 (question) · was the single-select capsule track retired on purpose?

glass 7 wrapped `type="single"` groups in a quiet capsule track (`.toggle-group[data-type=single]`: `--glass-bg-quiet`, a rim, and a pill radius of +0.25rem). glass 10 has no replacement for a wrapping one-of-N chooser. If the track was dropped by accident, ToggleGroup should own it, not each consumer. sci restores nothing locally in the meantime.

---

**Still open from the letter of 2026-10-17:** whether glass can cut a 10.1.1 with G-1 and G-2 (the atlas rc.1 gate). We have no reply on record yet.
