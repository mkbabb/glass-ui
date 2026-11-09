# 10.1.4 — critique 4 (fresh adversarial critic, round 4)

Critic: claude-opus-5-5. Branch `release/10.1.4` at 2934ae8a0 (19 commits over `v10.1.3`).
I read `implement.md`, `critique-1..3.md` and `fix-1..3.md` in full. Probe:
`docs/release-10.1.4/critique-4/` (`probe.html`, `probe.ts`, `critique.spec.ts`,
`critique.config.ts`, `chromium-chain.sh`, `webkit-chain.sh`, `webkit-all.sh`). Reads:
`critique-4/{branch,v1013}/reads-{chromium,webkit}.json`. The v10.1.3 arm checks out the four
cured files (`useResizeObserver.ts`, `capture.css`, `DataTable.vue`,
`useDataTableResponsive.ts`) from `v10.1.3` and restores them in a trap. `git status --short src`
was empty after both chains. Every run went through `guarded`. WebKit ran on build 2287 under
`guarded --exclusive webkit`.

The main target this round is fix-3's echo hold (d2dfc85b0). It is new since critique-3 and
assumes that the width measured post-flush equals the observer's next reading.

## Verdict: no defect reproduced

## (g) first observation, and the echo hold

"swaps" counts table/cards replacements. "frames" lists the first 8 painted frames
(t = table, c = cards).

| scene | Chromium 10.1.4 | WebKit 10.1.4 | v10.1.3 (both) |
|---|---|---|---|
| 320 / 390 fixed host, on mount | cards, 1 swap, 2 RO callbacks | same | table (RED) |
| 768 / 1440 fixed host, on mount | table, 0 swaps, 1 RO callback | same | same |
| `display:none` host, then shown at 390 | table while hidden (0x0 dispatched, the `width > 0` guard holds), then cards | same | same |
| fixed host whose `inline-size` transitions 900→400→900 over 400 ms | cards at 400, table at 900, 2 swaps in total (no hold taken mid-transition) | same | same |
| content-sized flex host (L=V=36), viewport 1280→700→1280→500→1280 | settles after every step (4 swaps over 5 steps) | same | loops after the first resize (441 / 225 swaps) |
| same host, body cell via `column.component` that fills its text in the next rAF / a microtask / 30 ms later | settles on table after 2 swaps | same | stable table, 0 swaps |
| same host, body cell is a width-less data-URL `<img>` | settles on cards, 1 swap | same | stable table |

The late-content cells are the direct attack on the hold. The post-flush measure sees the cell
empty, so the echo misses the held width by more than 1 px and decides again. That costs one
extra swap. The next projection's own hold catches its echo, and nothing loops. No
`ResizeObserver loop` error fired in either engine.

### Observations (not defects)
- O-6: in a content-sized host whose two projections straddle the breakpoint, the settled
  projection depends on history. At a 1280 px viewport it is cards on mount (root 763 / 724 px),
  cards after 700→1280, and table (root 384 px) after 500→1280. Each settle is the
  one-swap-then-hold behavior fix-3 documents, and either projection breaks the breakpoint rule
  for that box. Recorded so nobody files it later as a regression.
- O-3 (critique-3) still holds: at 320/390 the first two frames paint the table.

### Callers at the first dispatch
I read the callers again: `DockCrossfade.vue` (`measurePeak` is a monotone max, and its
reserve growth re-fires the observer without lowering the peak); `pager-dots/worm.ts`
(`nextTick(seatActive)` is idempotent); `useFadingScroll.ts`; `useGlassBackdropLuminance.ts`;
and `demo/.../useVirtualSectionWindow.ts`. None relied on the seed, and none loops on a repeat.
SSR: `critique-1/ssr.test.ts`, 3/3 (`critique-4/ssr.log`). Units: `useResizeObserver.test.ts` +
`DataTable.test.ts`, 22/22 (`critique-4/units.log`).

## (f) the `@page` scope

Chromium `page.pdf({ preferCSSPageSize: true })`, sizes in pt (960x540 = 1280x720 CSS px,
612x792 = Letter):

| scene | v10.1.3 | 10.1.4 |
|---|---|---|
| no deck | 960x540, `exact`, `#app` floor zeroed (RED) | 612x792, `economy`, `#app` keeps 50px |
| deck | 2 x 960x540 | 2 x 960x540; html/body/stage `page: deck`, resets on |
| deck mounted 300 ms later below prose | 3 x 960x540 | 3 x 960x540 |
| two decks | 4 x 960x540 | 4 x 960x540 |
| deck in the library `Dialog` | 1 x 960x540 | 1 x 960x540 |
| deck in a native `<dialog>` opened with `showModal()` (top layer) | 1 x 960x540 | 1 x 960x540 |
| deck removed 300 ms after mount | 960x540, `exact` | 612x792, `economy`, floor restored |

WebKit 2287 has no `page.pdf` and serializes `page` as `""`. It agrees on everything it can
read: `print-color-adjust` is `economy` with no deck (or after the deck is removed) and `exact`
with one, and the `#app` floor holds without a deck. On v10.1.3 it reads `exact` everywhere.

## Release specs and the patch surface

| run | result |
|---|---|
| `release-10-1-3.spec.ts` + `release-10-1-4.spec.ts`, Chromium (guarded) | 83/83 passed (`critique-4/branch/release-chromium.{log,json}`) |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 73 passed, 10 skipped (`page.pdf`, CDP swipe), 0 failed (`critique-4/branch/release-webkit.{log,json}`) |
| API/token | `git diff v10.1.3..HEAD -- src` touches 4 files. `useResizeObserver` keeps its signature. `cardAt` is added to the internal `useDataTableResponsive` return, which `src/components/data-table/index.ts` does not export. `capture.css` changes only its print block. No custom property changes value |

I did not re-run typecheck, build, the full vitest suite, verify:package or demo:dist:build.
fix-3.md records them GREEN on the cured tree, and 2934ae8a0 touches only docs after the
ratchet rebind 136c0b0ec.

## Conclusion
I could not refute either cure. (g) dispatches the first observation in both engines. The echo
hold settles every content-sized scene I built, including content that arrives after the flush.
Fixed-width hosts take no hold. (f) gives slide geometry only to pages with a deck, including a
deck mounted later, two decks, a modal deck and a top-layer native dialog. It hands the page back
when the deck unmounts.
