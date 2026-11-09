# 10.1.4 — critique 1 (fresh adversarial critic, round 1)

Critic: claude-opus-5-5. Branch `release/10.1.4` at 4b6559d00 (six commits over `v10.1.3`), plus `implement.md`, read in full.
Probe: `docs/release-10.1.4/critique-1/` (`probe.html`/`probe.ts`, `critique.spec.ts`, `critique.config.ts`, `ssr.test.ts`).
Reads: `critique-1/branch/reads-chromium.json`, `critique-1/v1013/reads-chromium.json`, `critique-1/ssr.log`.
Dev server on its own port (5291), served from the worktree.

## (g) useResizeObserver first observation

Chromium headless, on the branch and on a v10.1.3 source swap (restored to HEAD afterwards):

| cell | v10.1.3 | 10.1.4 |
|---|---|---|
| DataTable 320 px on mount | table (RED) | cards |
| DataTable 390 px on mount | table (RED) | cards |
| DataTable 768 / 1440 px | table | table |
| hidden (display:none) then shown at 390 | cards after show | before 0, after 1 |
| bare `useResizeObserver`, 200x100 box | no dispatch (RED) | exactly one dispatch `[200,100]` |
| bare, display:none box, then shown | — | `[0,0]` then `[300,50]`. The 0x0 dispatch is real. DataTable's `width > 0` guard absorbs it. The other callers are idempotent |
| DataTable + FadingScroll + PagerDots mounted together: platform RO callbacks over 1.5 s after settling | +0 | +0 (3 total, so no loop) |
| SSR (vitest node env, no window or ResizeObserver): DataTable renders `<table>`, `useResizeObserver` neither throws nor dispatches | — | 3/3 pass |

Callers I read: DataTable, useGlassBackdropLuminance, useFadingScroll, pager-dots worm, DockCrossfade, demo useVirtualSectionWindow. Each first-dispatch handler is idempotent or monotone, as `implement.md` says. I found no double dispatch: `disconnect` resets to NaN once per `observe`.

## (f) @page scope (Chromium `page.pdf`, preferCSSPageSize)

| scene | v10.1.3 | 10.1.4 |
|---|---|---|
| no deck | 960x540, `exact`, #app 0 (RED) | 612x792 Letter, `economy`, #app 50px |
| deck alone | 2 x 960x540 | 2 x 960x540, stage `page: deck` |
| prose then deck | 3 x 960x540 | Letter + 2 x 960x540 (the prose takes the reader's paper: as the cure intends) |
| deck mounted 300 ms later below prose | 3 x 960x540 | Letter + 2 x 960x540 |
| two decks | 4 x 960x540 | 4 x 960x540 |
| deck in a flex column / in a grid | 2 x 960x540 | 2 x 960x540 |
| deck inside a modal `<dialog>` (top layer) | 1 x 960x540 | **1 x 612x792** |
| deck in a display:none subtree beside prose | 1 x 960x540 | 1 x Letter, but the `:has` resets apply (`exact`, #app 0) |

### Finding F-1 (low): a deck outside normal flow loses slide geometry

A deck inside a modal `<dialog>` used to print on one 1280x720 sheet. It now prints on one Letter sheet. A named page applies only to in-flow block boxes, and a top-layer dialog's content is not in flow. Both versions print only one of the deck's two slides, so the dialog case was already broken at 10.1.3. 10.1.4 changes the sheet size and does not fix the truncation. The patch's claim "a deck page prints 1280x720" holds only for an in-flow stage. Proposed disposition: one sentence in CHANGELOG/implement.md naming this limit (it is the cure's own mechanism). Code change is optional for a patch. Printing a dialog deck belongs to W-E.13's print arm.

### Observation O-1 (not a defect)

A deck in a hidden subtree (v-show or KeepAlive) still turns on the document resets through `:has`. The page prints on the reader's paper, with `print-color-adjust: exact` and the #app floor zeroed. This is narrower than v10.1.3, where every page got this.

## Open (not run by this critic)

- The WebKit 2287 probe (`guarded --exclusive webkit`) was still queued behind another run's exclusive slot when this record closed. I have no WebKit reads of my own, and none here are claimed.
- I started `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts` in Chromium (log `critique-1/rel-chromium.log`), but it had not finished when this record closed. The WebKit release spec was not run.
- I did not re-run typecheck, build, verify:package or demo:dist:build. I checked the API/token diff by reading it: only `useResizeObserver.ts` (internal state) and `capture.css` (print block) changed in `src/`. No export or token moved.
