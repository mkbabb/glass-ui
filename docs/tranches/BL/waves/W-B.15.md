# W-B.15 · Scroll glide decided: the dock run's glide to the dock loop; no scripted page scroller · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-14, the R3-01-16 split (`audit/REGISTRY.md:331-332`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat for R56's FOLD; the owner for R11's RETIRE (OW-9b), seat recommendation below |

## 1 · What it closes

| id | the owner's words (`BD/union/PROMPT-RECAP.md`) | HEAD |
|---|---|---|
| BDU R11 | "Scrolling not fluid / not slow enough" (`:25`), REGRESSED | the main scroller is native |
| BDU R56 | "Scroll fluidity — the slow continuous-position glide (re-home the deleted `useLiquidRail` `SCROLL_PX_PER_SLOT`)" (`:111`), REGRESSED | the dock run is native `overflow: auto` (`dock/styles/run.css`); `useDockSpring` keeps a run-glide spring beside the morph and crossfade springs (`design/dock/PORTFOLIO.md:371`) |

R3-01-16 measured the only library smoothing loop: `useScrollScene`'s `scrubToDamping` (`useScrollScene.ts:102-116`, damping ≈ 0.431, τ ≈ 39 ms, settle 225-265 ms on `/motion/scroll`). L05b marked both rows SUPERSEDED with no owner quote.

## 2 · The defect at HEAD

- Two owner asks without a terminal. R56's subject, the dock run's scroll, is D2's; W-I.1 carries it (§1 row, §3.1 item 7, G26).

## 3 · The cure

1. **R56: FOLD into W-I.1.** The rail's continuous-position glide is the dock run's motion, which D2 converges (its run/paint separation and its one clock, which replaces `useDockSpring`'s three instances, `PORTFOLIO.md:634`). PLAN §4 lists R56 among D2's obligations with the owner's words; D2 decides the mechanism and W-I.1 builds it under G26. This wave writes nothing under `design/`.
2. **R11: RETIRE a scripted page scroller (recommended; OW-9b).** Ground: native scrolling on the target engines already carries the platform's inertia and overscroll, it runs on the compositor (F-45's compositor-only law), and a script-driven glide on the main scroller breaks find-in-page, keyboard and assistive scrolling and the platform's momentum. What D-1 asks of scroll is met where the library owns the motion: programmatic scrolls ride W-K.7's arrival owner, scroll-linked chrome reads position (W-F.3), and scroll scenes keep `useScrollScene`. The owner docket asks once, with a capture: "Page scrolling stays native (platform inertia). Retire the 'slow glide' ask for the page, or name where it should apply?" Default on silence: RETIRE, recorded as "owner not ruled" at W-L.8.

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md` (R11, R56, OW-9b); `docs/tranches/BL/ledger/RECAP.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| ~~B15-G1~~ | struck (fix-3, FB-05): it grepped a loop document for a word. R56's gate is its receiver's, W-I.1 G26 | — | — |
| B15-G2 · the owner has ruled R11 | `! grep -qE '^\\| OW-9b \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (OW-9b `pending`; fix-2) |
| B15-G3 · the page scroller stays native (a guard on the RETIRE, not a born-RED) | `! git grep -nE "addEventListener\\(['\"](wheel\|touchmove)['\"]" -- src \| grep -v 'passive: true'` | exit 0 | hold line: exit 0 at HEAD; the one wheel listener is passive (`composables/sidebar/useSidebarFollow.ts:191`). No defect is live, so this is the RETIRE's regression line; it can fail: appending a non-passive `wheel` listener to any `src` file makes it exit 1. It enters W-A.2's roster with that plant as its bite |

## 6 · π and DELTA obligations

The R11 owner question carries one capture: a 2 s wheel fling on a long story page, Chromium and Playwright WebKit (labelled), with `scrollTop` per frame beside the screenshots. Real Safari UNMEASURED (OW-3).

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

BDU R11 (RETIRE recommended, OW-9b), BDU R56 (FOLD → W-I.1); R3-01-16.
