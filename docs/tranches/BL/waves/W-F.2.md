# W-F.2 · W-INTERRUPT: every interruption continues from the in-flight value, through one end-of-gesture helper · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree; demo built there and served on :5961; R4-01's dock harness (`audit/captures/R4-01/probes/harness/`) copied to scratch with `@glass` pointed at the worktree `src`, served by `vite` on :5962; a static build of the same harness with two added pages (`sheet.html` from R10-01's `P.vue.txt`, `drag.html`, appendix E) served by `vite preview` on :5964; a cross-site page on `127.0.0.1:5963` for the bfcache cells |
| ships in | 11.0.0 |
| families | F-78 (members R4-01-01..R4-01-06, R5-01-01, R10-01-01, R10-01-03) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

Machine load at the runs: 54 to 230 (other seats). The gates are sequences of events with a state check at the end, and each was also run as a control that passes at HEAD, so a RED reading is the defect and not the load.

## 1 · What it closes

| id | what |
|---|---|
| R4-01-01 | the reveal register: the exit is `@keyframes glass-reveal-out` from a fixed `scale: 1 1; opacity: 1` (`src/styles/animations.css:157-162`), bound on `.glass-reveal[data-state="closed"]` (`src/styles/glass/reveal.css:167`), with an `@starting-style` enter (`:155`). A close mid-enter jumps to the open pose; a reopen mid-exit lands open in one frame. Every `.glass-reveal` surface: Popover, DropdownMenu and submenu, Select, HoverCard, the Tooltip's exit, Toast |
| R4-01-02 | the disclosure keyframes run from a fixed `from` (`src/components/_shared/disclosure/disclosure.css:1-23`); a toggle mid-flight restarts from the other keyframe's `from` |
| R4-01-03 | the tab indicator's deform reads `buttonRefs[lastIdx]`, the previous target (`src/composables/motion/morph/useSelectionIndicator.ts:313-315`) |
| R4-01-04 | `pointercancel` commits: `useDragMorph.ts:362` binds it to `onPointerUpCapture`; `useSpringMount.ts:249` maps it to `releaseDrag`, which dismisses past 0.3 (`:220-232`); `EasingPicker.vue:455` binds it to `onUp` |
| R4-01-05 | the dock's click-away returns on `isTransitioning` before it tests the target (`src/components/dock/composables/useDockState.ts:373`) |
| R4-01-06 | `release()` arms an 800 ms grace, then `scheduleCollapse()`, without re-reading whether the pointer or focus is still inside (`useDockState.ts:342-358`); `useDockHold.ts:121-136` takes the same path |
| R5-01-01 | a held drag outlives a page hide: EasingPicker, SortableList (`sortable-list/drag.ts:521`), the tabs drag morph end only on `pointerup`/`pointercancel`; no `lostpointercapture`, `blur`, `visibilitychange`, `pagehide`, no `buttons` read |
| R10-01-01 | the detent release re-seats the spring from its pre-drag state: the drag writes `t` after `spring?.stop()` (`sheet/detents/use.ts:179`), and `settle()` reuses the live spring on an unchanged leg (`:141`), seeding velocity from the stopped spring (`:139`) |
| R10-01-03 | every end of the detent drag commits or never arrives: `pointercancel` routes to `onPointerup` (`:192`, `:209-226`); `onPointerdown` returns while `pointerId !== null` (`:171`) |
| census | `#32` W-TABS: the retarget deform (`census-register-a.md:44`); `#71` W-EYEGLASS: the writer's `:313` defect (`census-register-b.md:59`); recap D-1's interruption clause (`CENSUS.md:180`) |
| inbound | UIA-V-395 (a collapse after in-pane interaction, R4-01-06's path; `INBOUND-MAP.md:168`). UIA-F-11 and KFA-112 are NOT-REPRODUCED as stated; R4-01-06 is their live sibling (`INBOUND-MAP.md:151,508`) |

## 2 · The defect at HEAD

`node f2.mjs` (appendix A), Chromium, 1440×900 unless named: **7 rows, 7 FAIL** (load 54.2 → 82.5). `node f2b.mjs` (appendix B): **G8-G11, 7 rows, 7 FAIL** (load 99.9 → 206.3). `node f2-static.mjs` (appendix C): **FAIL**, exit 1.

| gate | HEAD reading | control that passes at HEAD |
|---|---|---|
| G1 Popover, Escape at +40 ms of the enter | opacity **0.284 → 1.000** after the Escape (`maxAfter` 1) | Escape at +700 ms: 1 → never above 1 (PASS) |
| G2 Popover reopened 80 ms into the exit | from 0.165, largest step after the reopen **0.877** | reopen after the exit landed: largest step 0.096 (PASS) |
| G3 Collapsible closed at +43 ms of the open | height **28.8 → 68.9 px** after the close | close at +700 ms: 68.9, never above (PASS) |
| G4 tab retarget 0 → 3 → 1 at +40 ms | peak width **172.4 px** against **138.8 px** for a direct 0 → 1 | the direct hop is the reference |
| G5 tabs drag morph, 112 px touch drag, then `touchCancel` | model **Grid → Kanban** | — (R4-01's release leg: Grid → Timeline) |
| G6 dock, outside press at +120 ms of an expand | **expanded** after 1.8 s | outside press at +1500 ms: collapsed (PASS) |
| G7 keep-dock-open Popover closed from its own trigger, pointer resting on it | dock **collapsed** within 7 s (`triggerHovered: false`: the trigger slid out from under the pointer) | pointer resting, no overlay, 7 s: expanded (PASS) |
| G8 SortableList, bfcache round trip mid-drag (released while away; `pageshow.persisted` true), six moves with no button, one click elsewhere | order **Draft spec · Review pull · Pair on dock → Review pull · Pair on dock · Draft spec** | dragged back to the origin and released on the page: order unchanged (PASS) |
| G9 Sheet open at d = 1, drag to dismiss, released at t ≈ 0 | 390×844: t **0.046 → 0.973** after the release; 844×390: **0.121 → 0.973** | press and release with no travel: never rises (PASS, both cells) |
| G10 Sheet at 0.36, `touchCancel` mid-drag | toward open (t 0.65): settles at **1**; toward dismissal (t 0.07): **closes** | the same drag returned to the origin and released: 0.36 (PASS, both) |
| G11 Sheet at 0.36, bfcache round trip mid-drag | the restored page is **still dragging** (`data-dragging`, t 0.656) | the same drag released on the page, then a fresh drag: moves (PASS) |
| G12 one end-of-gesture seam | helper **absent**; **19 files** bind a gesture end themselves (list in appendix C's output below) | — |

```
FAIL F2-G12 one end-of-gesture seam: helper absent, 19 other files bind a gesture end
  src/components/aurora/composables/useCursorInteraction.ts   src/components/button/Button.vue
  src/components/constellation/composables/useConstellation.ts src/components/deck/composables/useDeckSwipe.ts
  src/components/dock/DockControl.vue   src/components/dock/GlassDock.vue   src/components/dock/composables/useDockClickIntegrity.ts
  src/components/dock/composables/useDockHold.ts   src/components/easing/EasingPicker.vue   src/components/menu/DropdownMenuTrigger.vue
  src/components/pager-dots/PagerDots.vue   src/components/sheet/detents/use.ts   src/components/sortable-list/drag.ts
  src/components/timeline/Timeline.vue   src/composables/dom/useDragVelocity.ts   src/composables/motion/morph/useDragMorph.ts
  src/composables/motion/spring/useLiquidPress.ts   src/composables/motion/spring/useSpringMount.ts   src/composables/motion/spring/useSpringPress.ts
```

Two gate designs were tried and discarded at this seat: "largest per-frame step ≤ 2× median" (the registry's wording, `REG:1133`) fails the uninterrupted Popover open (0.185 against a 0.034 median) and the uninterrupted Collapsible open (6.1 against 2.1), because a spring's fast attack front-loads the steps. G1-G3 therefore assert the interruption invariant directly: after the interrupt the value never moves back toward the abandoned target. The tabs arm of R5-01-01 (the indicator stranded off its tab after a bfcache round trip) was also tried on the drag page and discarded: the control leg (an ordinary release) left the indicator 72 px off the active tab too, so that reading cannot separate the defect. G12's census covers the tabs drag morph and the EasingPicker structurally, and R5-01's recorded readings stand for them (`captures/R5-01/drag-bfcache*.json`: handle carried 72 px right and 36 px down; indicator 255 px off its tab).

## 3 · The cure

1. **The reveal register re-targets.** Every `.glass-reveal` surface (Popover, DropdownMenu and its submenu, Select, HoverCard, Tooltip, Toast; `_shared/overlay/content.ts:53-60`) mounts through `useSpringMount`, the kernel the Dialog already uses: the content is force-mounted while the kernel's scalar is above 0, the recipe reads the one scalar for its opacity, squish-scale, blur and slide, and a close or reopen re-targets the running spring from its current `(value, velocity)`. The `@starting-style` enter (`reveal.css:136-160`), the `[data-state="closed"]` exit binding (`:167-199`) and `@keyframes glass-reveal-out` and `glass-reveal-out-reduced` (`animations.css:146-200`) are deleted. The row is `present` (ζ 1.00, monotone), so an exit cannot overshoot past gone by construction; the "exit is a bezier" sentence in `scheme-spring.css:50-55` is rewritten to "an exit rides a ζ ≥ 1 row". Reduced motion: the kernel's existing snap (`SpringProgress` `_snapSettled`).
2. **One disclosure engine that re-targets its size.** Accordion, Collapsible and ConfiguratorLayer run on the `grid-template-rows: 0fr ↔ 1fr` transition `ConfiguratorLayer.vue:181-197` already uses: the content is always mounted, `inert` and `aria-hidden` while closed, and its inner `min-block-size: 0; overflow: hidden` body is the one clip. A CSS transition starts from the current computed value, so a reversal is continuous. `@keyframes disclosure-open`/`disclosure-close` are deleted, with the `--disclosure-content-size` measurement. The row is `present` (W-F.1 §3.6). The body wrapper is W-F.4's (the spacing it owns); this wave builds the engine.
3. **The indicator deform reads the painted position.** `squishOnTravel` takes `from` as the indicator's own painted rect centre (`indicatorEl.getBoundingClientRect()`) at the moment of the new target, not `buttonRefs[lastIdx]` (`useSelectionIndicator.ts:313-315`). `lastIdx` is deleted.
4. **One end-of-gesture helper.** `src/composables/dom/useGestureEnd.ts`:
   `useGestureEnd(target, { pointerId, onCommit, onCancel })` binds, for one held gesture: `pointerup` → `onCommit`; `pointercancel`, `lostpointercapture` on the capturing element, window `blur`, `visibilitychange` to hidden, `pagehide`, and a `pointermove` with `buttons === 0` → `onCancel`. Either end unbinds everything and clears the machine's latch. `onCancel` springs back to the gesture's origin through the machine's own `springStepper` and never commits. The 19 files of G12 consume it; the helper is the only file in `src` that names `pointercancel` or `lostpointercapture`. `useDockHold`'s window-`blur` release (`useDockHold.ts:126-137`) is folded into it.
5. **The dock's click-away tests the root first.** `onPointerDownOutside` checks `root.contains(target)` and the teleport test first; `isTransitioning` gates only a target inside the root (the case the comment at `useDockState.ts:371-372` describes). An outside press during a morph collapses.
6. **`release()` re-reads present state.** When the hold count reaches 0 in hover posture, `release()` reads `root.matches(":hover")` and `root.matches(":focus-within")`; if either holds, no collapse is armed, and the next `pointerleave` or `focusout` arms it as usual. The Slider's grasp hold goes through the same `release()`.
7. **Every detent release seats a fresh spring at `(t, release velocity)`.** `settle()` always calls `spring.reset(t.value, velocity)` before setting the target, whatever the leg; the reuse branch (`use.ts:141`) and the stopped spring's velocity (`:139`) are deleted. The release velocity is the finger's, in fraction/s, read from the detent engine's velocity reader as it stands at this wave's base; W-F.3 lands after this wave (PLAN §5) and replaces that reader with its windowed estimate, so this wave owns the seat and W-F.3 owns the velocity (fix-5, FD-03). The drag ends through `useGestureEnd`: `pointercancel` and every lifecycle edge spring back to `startT`'s rung and never dismiss; the `pointerId !== null` latch clears on any end.

## 4 · Files it touches

`src/styles/glass/reveal.css`, `src/styles/animations.css`, `src/components/_shared/overlay/content.ts`, the content SFCs of popover, menu (`DropdownMenuContent.vue`, `DropdownMenuSubContent.vue`), select, hover-card, tooltip, toast; `src/components/_shared/disclosure/disclosure.css`, `src/components/accordion/AccordionContent.vue`, `src/components/collapsible/CollapsibleContent.vue`, `src/components/configurator/ConfiguratorLayer.vue`; `src/composables/motion/morph/useSelectionIndicator.ts`; `src/composables/dom/useGestureEnd.ts` (new) and the 19 files of G12; `src/components/dock/composables/{useDockState.ts,useDockHold.ts}`; `src/components/sheet/detents/use.ts`; `src/styles/tokens/scheme-spring.css` (the exit sentence, via the generator's comment table in `scripts/regen-spring-tokens.mjs`). New: `tests-visual/wired/interrupt.spec.ts` (appendices A, B), `tests/gates/gesture-end-seam.test.ts` (appendix C). `MIGRATION.md` (§7).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| F2-G1 · reveal: close mid-enter | appendix A `--only G1`, Chromium, light and dark | after the Escape, opacity never exceeds its value at the Escape + 0.02 | **0.284 → 1.000** |
| F2-G2 · reveal: reopen mid-exit | appendix A `--only G2` | no opacity step > 0.25 after the reopen | **0.877** |
| F2-G3 · disclosure reversal | appendix A `--only G3` | after the close, height never exceeds its value at the close + 1 px | **28.8 → 68.9 px** |
| F2-G4 · indicator retarget | appendix A `--only G4` | 0 → 3 → 1 peak width ≤ direct 0 → 1 peak + 2 px | **172.4 vs 138.8** |
| F2-G5 · `pointercancel` never commits | appendix A `--only G5`, CDP touch | model unchanged | **Grid → Kanban** |
| F2-G6 · click-away during a morph | appendix A `--only G6` | collapsed 1.8 s after an outside press at +120 ms | **expanded** |
| F2-G7 · `release()` under a resting pointer | appendix A `--only G7` (R4-01 harness, `?scene=dock`) | expanded 7 s after the Popover closes | **collapsed** |
| F2-G8 · a hide mid-drag cancels | appendix B `--only G8` (bfcache-enabled Chromium) | list order unchanged | **reordered** |
| F2-G9 · detent release seats `(t, v)` | appendix B `--only G9`, 390×844 and 844×390 | t never rises > 0.02 after a dismiss release | **0.046 → 0.973; 0.121 → 0.973** |
| F2-G10 · detent `touchCancel` | appendix B `--only G10`, both directions | model and plate at the origin rung 0.36 | **→ 1; → closed** |
| F2-G11 · detent latch clears on a hide | appendix B `--only G11` | not dragging after restore, and a fresh 100 px drag moves t > 0.05 | **still dragging** |
| F2-G12 · one end-of-gesture seam | appendix C, `node f2-static.mjs` from the repo root | the helper exists and no other `src` file binds `pointercancel` or `lostpointercapture` | **helper absent; 19 files** |

Every row is RED at HEAD, and each of G1-G3, G6-G11 has a control leg that passes at HEAD (`CONTROL=1`), recorded in §2. G12 can pass: the helper is one file and the census is exact. Planted bites for the wired twins (W-A.3): G1 and G2, a style tag restoring `@keyframes glass-reveal-out` on `[data-state=closed]`; G3, a style tag restoring the `disclosure-close` keyframe; G9, an init script that forces `settle()`'s reuse branch (a `spring.reset` no-op). Each must redden its gate on its own assertion.

## 6 · π and DELTA obligations

- **Reveal (G1, G2):** `/containers/popover` and `/overlays/dropdown-menu` (the menu arm R4-01 measured: 0.513 → 1.000), 1440×900, light and dark. Paired capture at `<F2-base>` and at the wave: a frame strip from the click to +500 ms (every 16 ms) with the Escape at +40 ms, and the reopen strip. HEAD shows the plate snapping back to full before it fades; the wave shows the fade continuing from where it stood.
- **Disclosure (G3):** `/containers/collapsible` and `/containers/accordion`, the reversal at +43 ms, light and dark, frame strip.
- **Indicator (G4):** `/navigation/tabs`, the 0 → 3 → 1 strip beside the direct 0 → 1 strip, both themes.
- **Dock (G6, G7):** `/dock/overview` "Starts compact" (`[data-testid=dock-horizontal-collapsed-first-paint]`) and the R4-01 harness dock, one still at +1.8 s and one at +7 s; these stills are D2's born-REDs too, so the wave record cites the same files W-I.1 reads.
- **Sheet (G9-G11):** the harness `sheet.html` at 390×844 and 844×390, the release strip (40 ms before to 400 ms after), light. R10-01's stills are the HEAD half (`captures/R10-01/dismiss-p390-a-finger-at-bottom-before-release.png`, `dismiss-p390-b-40ms-after-release.png`).
- **Engines:** Chromium measured here. Playwright WebKit: not run at this seat. The demo routes crash Playwright WebKit (`W-F.1` §2, the known crash), CDP touch and the bfcache flags are Chromium-only, and the harness pages were not driven in WebKit. The wave runs G1-G4, G6, G7 and G12 in Playwright WebKit on the harness pages and records each cell as Playwright WebKit. Real Safari: UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `@keyframes glass-reveal-out`, `glass-reveal-out-reduced` | none; the reveal register is the spring mount kernel |
| `@keyframes disclosure-open`, `disclosure-close`; the `--disclosure-content-size` custom property | none; the disclosure is the `grid-template-rows` transition. A consumer that animated `--disclosure-content-size` has no hook to bind |
| `useSpringMount`'s `onPointercancel` dismissed past `dismissThreshold` | it now springs back to the origin and never dismisses (a behaviour break on a public composable, `composables/motion/index.ts:20`) |
| `CollapsibleContent`/`AccordionContent` unmount when closed | they are always mounted, `inert` and `aria-hidden` while closed. A consumer that relied on the closed content being absent from the DOM (a query, a `v-if` side effect) updates |

No alias. A consumer's own `pointercancel` handlers are untouched; only the library's machines route through the helper.

## 8 · Dependencies

PLAN §5, the one record of edges, with the reason for the W-F.3 order in its notes (this wave builds on the one `springStepper` and the Sheet's drag controller). W-I.1 (loop D2) is downstream: it keeps G6 and G7 as its born-REDs and builds the dock's gestures on `useGestureEnd`; this wave does not pre-empt the loop's plate, run or extent work.

## 9 · Ledger rows it closes

F-78 (all nine members); census `#32`'s retarget clause and `#71`'s `:313` clause; D-1's interruption clause; inbound UIA-V-395 (by R4-01-06's cure; the consumer re-measure is W-L.1's letter). UIA-F-11 and KFA-112 stay NOT-REPRODUCED with R4-01-06 named as their live sibling, now cured.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** every stateful surface now has three transitions: to open, to closed, and from wherever it is. The dock loop, W-K.3's focus lifecycle and W-L.4's drag-morph settle all build on `useGestureEnd`.
- **Wave:** F2-G1..G12 green in one run, both appendices, with the control legs still green.
- **Feature:** a Popover closed mid-bloom, a Collapsible reversed, a tab retargeted, a Sheet thrown and caught, each captured as a strip that shows no snap.

## Appendix A · `f2.mjs` (lands in `tests-visual/wired/interrupt.spec.ts`)

```js
// W-F.2 born-RED probe: interruption takes its transition from the in-flight value (F-78).
// node f2.mjs [--eng webkit] [--only G1,G2]
import { open, reporter, sleep, steps, median, DEMO, ENG, eng } from './lib.mjs';
const H = process.env.HARNESS || 'http://localhost:5962';
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const want = (g) => !only || only.includes(g);
const R = reporter('f2');
const rec = (sel, fn) => `window.__fl=[];window.__on=true;(function f(){if(!window.__on)return;const e=[...document.querySelectorAll('${sel}')].at(-1);window.__fl.push(e?(${fn})(e):null);requestAnimationFrame(f)})();`;
const stop = (p) => p.evaluate(() => { window.__on = false; return window.__fl; });

// G1/G2/G3 — an interruption continues from the in-flight value. CONTROL=1 runs the same gesture with the
// interrupt after the first transition has landed (+700 ms), which passes at HEAD, so each gate can pass.
const CTRL = !!process.env.CONTROL;
const mark = (p) => p.evaluate(() => { window.__m = window.__fl.length; });
const split = (fl, m) => ({ at: fl.slice(0, m).filter((x) => x !== null).at(-1), after: fl.slice(m).filter((x) => x !== null) });
if (want('G1') || want('G2')) for (const [id, label, act, judge] of [
  ['G1', `Popover Escape at +${CTRL ? 700 : 40} ms of the enter: opacity never rises past its value at the Escape`,
    async (p, t) => { await t.click(); await sleep(CTRL ? 700 : 40); await mark(p); await p.keyboard.press('Escape'); },
    ({ at, after }) => ({ atEscape: +at.toFixed(3), maxAfter: +Math.max(...after).toFixed(3), pass: Math.max(...after) <= at + 0.02 })],
  ['G2', `Popover reopened ${CTRL ? 'after the exit landed' : '80 ms into the exit'}: no opacity step > 0.25 after the reopen`,
    async (p, t) => { await t.click(); await sleep(700); await p.keyboard.press('Escape'); await sleep(CTRL ? 700 : 80); await mark(p); await t.focus(); await p.keyboard.press('Enter'); },
    ({ at, after }) => { const st = steps([at ?? 0, ...after]); const mx = Math.max(0, ...st); return { atReopen: at === undefined ? 'unmounted' : +at.toFixed(3), maxStepAfter: +mx.toFixed(3), pass: mx <= 0.25 }; }],
]) {
  const { browser, page } = await open('/containers/popover');
  const t = page.locator('main button[aria-haspopup=dialog]').first(); await t.scrollIntoViewIfNeeded(); await sleep(300);
  await page.evaluate(rec('[data-slot="popover-content"]', '(e)=>+getComputedStyle(e).opacity'));
  await act(page, t); await sleep(1000);
  const fl = await stop(page); const m = await page.evaluate(() => window.__m);
  const v = judge(split(fl, m));
  R.row(`F2-${id} ${label}`, v.pass, v); await browser.close();
}
if (want('G3')) {
  const { browser, page } = await open('/containers/collapsible');
  const t = page.locator('main button[data-slot$="-trigger"]').first(); await t.scrollIntoViewIfNeeded(); await sleep(300);
  if ((await t.getAttribute('aria-expanded')) === 'true') { await t.click(); await sleep(900); }
  const id = await t.getAttribute('aria-controls');
  await page.evaluate(([id]) => { window.__fl = []; window.__on = true; (function f() { if (!window.__on) return; const d = document.getElementById(id); window.__fl.push(d ? d.getBoundingClientRect().height : 0); requestAnimationFrame(f); })(); }, [id]);
  const bb = await t.boundingBox(); const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  await page.mouse.click(cx, cy); await sleep(CTRL ? 700 : 43); await mark(page); await page.mouse.click(cx, cy); await sleep(1000);
  const fl = await stop(page); const m = await page.evaluate(() => window.__m); const { at, after } = split(fl, m);
  const v = { atClose: +at.toFixed(1), maxAfter: +Math.max(...after).toFixed(1), pass: Math.max(...after) <= at + 1 };
  R.row(`F2-G3 Collapsible closed at +${CTRL ? 700 : 43} ms of the open: height never grows past its value at the close`, v.pass, v); await browser.close();
}
// G4 — the indicator deform reads the painted position (0 -> 3, back to 1 at +40 ms, vs a direct 0 -> 1)
if (want('G4')) {
  const { browser, page } = await open('/navigation/tabs');
  const peak = async (seq) => page.evaluate(async (seq) => {
    const ind = [...document.querySelectorAll('.segmented-indicator--js')].find((e) => e.getBoundingClientRect().width > 0);
    const tabs = [...ind.closest('.segmented-tabs').querySelectorAll('.segmented-tab')];
    tabs[0].click(); await new Promise((r) => setTimeout(r, 1000));
    let mx = 0, on = true; (function f() { if (!on) return; mx = Math.max(mx, ind.getBoundingClientRect().width); requestAnimationFrame(f); })();
    for (const [i, wait] of seq) { if (wait) await new Promise((r) => setTimeout(r, wait)); tabs[i].click(); }
    await new Promise((r) => setTimeout(r, 900)); on = false; return +mx.toFixed(1);
  }, seq);
  const direct = await peak([[1, 0]]); const retarget = await peak([[3, 0], [1, 40]]);
  R.row('F2-G4 tab 0->3->1 retarget peak width <= direct 0->1 peak + 2 px', retarget <= direct + 2, { direct, retarget }); await browser.close();
}
// G5 — pointercancel never commits (tabs drag morph, 112 px touch drag then touchCancel)
if (want('G5') && eng === 'chromium') {
  const { browser, page, ctx } = await open('/navigation/tabs', { touch: true, w: 1280, h: 900 });
  const strip = page.locator('.segmented-tabs:has(.glass-drag-grabbable)').first(); await strip.scrollIntoViewIfNeeded(); await sleep(400);
  const before = (await strip.locator('[data-active]').first().textContent()).trim();
  const ind = await strip.locator('.segmented-indicator').boundingBox(); const cdp = await ctx.newCDPSession(page);
  const x0 = ind.x + ind.width / 2, y0 = ind.y + ind.height / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0 }] });
  for (let i = 1; i <= 8; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + i * 14, y: y0 }] }); await sleep(16); }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] }); await sleep(1200);
  const after = (await strip.locator('[data-active]').first().textContent()).trim();
  R.row('F2-G5 touchCancel after a 112 px tab drag leaves the model unchanged', after === before, { before, after }); await browser.close();
}
// G6 — the dock's click-away is never gated when the target is outside the root
if (want('G6')) {
  const { browser, page } = await open('/dock/overview');
  const d = page.locator('[data-testid="dock-horizontal-collapsed-first-paint"]'); await d.scrollIntoViewIfNeeded(); await sleep(500);
  const bb = await d.boundingBox(); await page.mouse.move(5, 5);
  await page.mouse.click(bb.x + bb.width - 20, bb.y + bb.height / 2); await sleep(CTRL ? 1500 : 120); await page.mouse.click(20, bb.y + bb.height + 200); await sleep(1800);
  const state = await d.evaluate((e) => (e.classList.contains('expanded') ? 'expanded' : 'collapsed') + (e.classList.contains('pinned') ? '+pinned' : ''));
  R.row('F2-G6 outside press at +120 ms of an expand: dock collapsed after 1.8 s', state.startsWith('collapsed'), { state }); await browser.close();
}
// G7 — release() re-reads present state: a keep-dock-open Popover closed from its own trigger under a resting pointer
if (want('G7')) {
  const b = await ENG[eng].launch(); const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await c.newPage();
  await p.goto(H + '/?scene=dock', { waitUntil: 'networkidle' }); await sleep(1500);
  const center = async (sel) => { const bb = await p.locator(sel).first().boundingBox(); return [bb.x + bb.width / 2, bb.y + bb.height / 2]; };
  let [x, y] = await center('[aria-label="Edit contour"]'); await p.mouse.move(x, y); await sleep(700);
  [x, y] = await center('[data-testid=pop-trigger]'); await p.mouse.move(x, y, { steps: 3 }); await p.mouse.click(x, y); await sleep(800);
  await p.mouse.click(x, y); await sleep(7000);
  const s = await p.evaluate(() => { const A = document.querySelector('[data-testid=dockA]'); return { expanded: A.classList.contains('expanded'), triggerHovered: document.querySelector('[data-testid=pop-trigger]').matches(':hover') }; });
  R.row('F2-G7 7 s after a keep-dock-open Popover closes under a resting pointer: dock still expanded', s.expanded, s); await b.close();
}
R.done();
```

The G7 control (pointer resting on a seat, no overlay, 7 s → expanded) is the same harness sequence with the Popover steps removed.

## Appendix B · `f2b.mjs` (lands in `tests-visual/wired/interrupt.spec.ts`)

```js
// W-F.2 born-RED probe, part 2: every end of a held gesture (the shared end-of-gesture helper) and the
// Sheet detent release (R5-01-01, R10-01-01, R10-01-03). Chromium only: CDP touch and a bfcache-enabled launch.
// node f2b.mjs [--only G8,G9,...]    CONTROL=1 swaps each interrupt for an ordinary release.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import { reporter } from './lib.mjs';
import { openS, recOn, recOff, handle, tNow, driver, path, sleep } from './sheetlib.mjs';
const AWAY = process.env.AWAY || 'http://127.0.0.1:5963/';
const DRAG = process.env.DRAG || 'http://localhost:5964/drag.html';
const IG = ['--disable-back-forward-cache', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'];
const CTRL = !!process.env.CONTROL;
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const want = (g) => !only || only.includes(g);
const R = reporter(CTRL ? 'f2b-control' : 'f2b');
// G8 — a bfcache round trip mid-drag (button released while away), six moves with no button, one click elsewhere:
// the sortable order is unchanged.
if (want('G8')) {
  const b = await chromium.launch({ channel: 'chromium', ignoreDefaultArgs: IG });
  const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await c.newPage(); await p.addInitScript(() => addEventListener('pageshow', (e) => { window.__pagePersisted = e.persisted; })); const cdp = await c.newCDPSession(p);
  const sel = 'main .sortable-item [data-sortable-handle]';
  const read = () => p.evaluate(() => { const l = document.querySelector('main .sortable-item').parentElement; return { order: [...l.querySelectorAll(':scope > .sortable-item')].map((e) => e.textContent.trim().slice(0, 12)).join('|') }; });
  await p.goto(DRAG, { waitUntil: 'networkidle' }); await sleep(1500);
  await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }), sel); await sleep(600);
  const g = await p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, sel);
  const r0 = await read();
  const M = (type, x, y, buttons, button = 'left') => cdp.send('Input.dispatchMouseEvent', { type, x, y, button, buttons, clickCount: type === 'mouseMoved' ? 0 : 1 });
  await M('mouseMoved', g.x, g.y, 0, 'none'); await sleep(50); await M('mousePressed', g.x, g.y, 1); await sleep(30);
  for (let i = 1; i <= 6; i++) { await M('mouseMoved', g.x + i * 10, g.y + i * 12, 1); await sleep(20); }
  await sleep(150);
  if (CTRL) { for (let i = 5; i >= 0; i--) { await M('mouseMoved', g.x + i * 10, g.y + i * 12, 1); await sleep(20); } await M('mouseReleased', g.x, g.y, 0); await sleep(300); }
  else { await p.goto(AWAY, { waitUntil: 'load' }); await sleep(1500); await p.goBack({ waitUntil: 'commit' }); await sleep(900); }
  const restored = await p.evaluate(() => window.__pagePersisted ?? 'unknown');
  for (let i = 1; i <= 6; i++) { await M('mouseMoved', g.x + 60 + i * 12, g.y - 18 + i * 6, 0, 'none'); await sleep(40); }
  await sleep(600);
  const cx = g.x + 40, cy = g.y + 160; await M('mouseMoved', cx, cy, 0, 'none'); await M('mousePressed', cx, cy, 1); await sleep(60); await M('mouseReleased', cx, cy, 0); await sleep(300); await M('mouseMoved', 5, 5, 0, 'none'); await sleep(1200);
  const r1 = await read();
  R.row(`F2-G8 sortable: bfcache round trip mid-drag, ${CTRL ? 'CONTROL: dragged back to the origin and released on the page' : 'released while away'}; order unchanged`, r1.order === r0.order, { before: r0, after: r1, persisted: restored });
  await b.close();
}
// G9 — the detent release seats a spring at (t, release velocity): open at d=1 (a travel leg), then a
// drag-to-dismiss released at t ~ 0 (the same leg). After the release the scalar never rises past its value
// at the release. CONTROL=1 presses and releases the grip with no travel (R10-01's control), which passes at HEAD.
if (want('G9')) for (const [w, h] of [[390, 844], [844, 390]]) {
  const { browser, page, cdp } = await openS('chromium', { w, h, touch: true, qs: 'side=bottom&d=1' });
  const d = driver('touch', page, cdp); const g = await handle(page);
  await d.down(g.x, g.y); await sleep(30); if (!CTRL) await path(d, g.x, g.y, g.x, h - 4, 30, 16);
  await recOn(page); const t0 = (await tNow(page)).t;
  await d.up(); await sleep(1200);
  const r = await recOff(page);
  const ts = r.frames.filter((f) => !f.none && !f.drag).map((f) => +f.dt);
  const rise = ts.length ? Math.max(0, Math.max(...ts) - t0) : 0;
  R.row(`F2-G9 detent dismiss released at t=${t0} ${w}x${h}: t never rises after the release (<= 0.02)`, rise <= 0.02, { tAtRelease: t0, maxTAfter: ts.length ? +Math.max(...ts).toFixed(3) : null, rise: +rise.toFixed(3), framesAfter: ts.length, landed: r.state });
  await browser.close();
}
// G10 — touchCancel mid-drag leaves the sheet at the gesture's origin rung. CONTROL=1 drags back and releases.
if (want('G10')) for (const travel of [-0.3, 0.3]) {
  const { browser, page, cdp } = await openS('chromium', { w: 390, h: 844, touch: true, qs: 'side=bottom&d=0.36' });
  const d = driver('touch', page, cdp); const g = await handle(page);
  await d.down(g.x, g.y); await sleep(30); await path(d, g.x, g.y, g.x, g.y + travel * 844, 30, 20);
  const mid = await tNow(page);
  if (CTRL) { await path(d, g.x, g.y + travel * 844, g.x, g.y, 30, 20); await d.up(); } else await d.cancel();
  await sleep(1300); const s = await tNow(page);
  const pass = s.open && Math.abs(s.dv - 0.36) < 1e-6 && Math.abs(s.t - 0.36) < 0.01;
  R.row(`F2-G10 ${CTRL ? 'CONTROL return-and-release' : 'touchCancel'} ${travel < 0 ? 'toward open' : 'toward dismissal'} at t=${mid.t}: model and plate at the origin rung 0.36`, pass, { atCancel: mid, settled: s });
  await browser.close();
}
// G11 — after a bfcache round trip mid-drag, the sheet is not dragging and the next touch drags it
if (want('G11')) {
  const { browser, page, cdp } = await openS('chromium', { w: 390, h: 844, touch: true, qs: 'side=bottom&d=0.36', bfcache: true });
  const d = driver('touch', page, cdp); let g = await handle(page);
  await d.down(g.x, g.y); await sleep(30); await path(d, g.x, g.y, g.x, g.y - 250, 20, 20);
  if (CTRL) { await d.up(); await sleep(600); } else { await page.goto(AWAY, { waitUntil: 'load' }); await sleep(800); try { await d.up(); } catch {} await page.goBack({ waitUntil: 'commit' }); await sleep(900); }
  const before = await tNow(page); g = await handle(page);
  await d.down(g.x + 1, g.y); await sleep(30); await path(d, g.x + 1, g.y, g.x + 1, g.y + 100, 6, 16);
  const mid = await tNow(page); await d.up(); await sleep(900);
  const moved = Math.abs((mid.t ?? 0) - (before.t ?? 0));
  R.row('F2-G11 after a bfcache round trip mid-drag: not dragging, and a fresh 100 px touch drag moves the sheet', !before.drag && moved > 0.05, { before, duringNextDrag: mid, dt: +moved.toFixed(3) });
  await browser.close();
}
R.done();
```

The G8 block above is the run's code with its unused tabs branch removed (the run's list was `['sortable']`; §2 says why).

## Appendix C · `f2-static.mjs` (lands as `tests/gates/gesture-end-seam.test.ts`)

```js
// W-F.2 static gate: one end-of-gesture seam. Only the helper binds the ends of a held gesture
// (pointercancel, lostpointercapture); every machine consumes it. Run from the repo root.
import fs from 'node:fs'; import path from 'node:path';
const walk = (d, a = []) => { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p, a); else if (/\.(ts|vue)$/.test(e) && !/\.test\./.test(e)) a.push(p); } return a; };
const HELPER = 'src/composables/dom/useGestureEnd.ts';
const binders = walk('src').filter((p) => /pointercancel|onPointercancel|lostpointercapture/i.test(fs.readFileSync(p, 'utf8')));
const off = binders.filter((p) => p !== HELPER);
const helper = fs.existsSync(HELPER);
console.log(`${helper && off.length === 0 ? 'PASS' : 'FAIL'} F2-G12 one end-of-gesture seam: helper ${helper ? 'present' : 'absent'}, ${off.length} other files bind a gesture end`);
off.forEach((p) => console.log('  ' + p)); process.exitCode = helper && off.length === 0 ? 0 : 1;
```

When W-D.1 (loop D1) moves `src/composables/dom/`, the `HELPER` path follows the converged placement.

## Appendix D · `lib.mjs`, the band-F probe library

```js
// Band F probe library: the built demo (dist-demo of the scratch worktree) on :5961.
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import os from 'node:os';
import fs from 'node:fs';
export const DEMO = process.env.DEMO || 'http://localhost:5961';
const WAVE = process.env.WAVE; // the running wave's id: the one evidence root is .cache/evidence/<wave>/ (PLAN §1)
if (!/^W-[0-9A-L]\.[0-9]+$/.test(WAVE ?? '')) throw new Error('run as WAVE=<wave id> node <probe>');
export const CAP = `.cache/evidence/${WAVE}`;
export const load = () => os.loadavg().map((x) => x.toFixed(2)).join('/');
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const ENG = { chromium, webkit };
export const eng = process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium';
export async function open(route, o = {}) {
  const browser = await ENG[o.eng || eng].launch(o.launch || {});
  const ctx = await browser.newContext({ viewport: { width: o.w || 1440, height: o.h || 900 }, hasTouch: !!o.touch, isMobile: !!o.mobile, colorScheme: o.theme === 'dark' ? 'dark' : 'light', reducedMotion: 'no-preference' });
  if (o.init) await ctx.addInitScript(o.init);
  // o.htmlAttrs: served as a real document attribute (e.g. ' dir="rtl"'), rewritten into the HTML response
  if (o.htmlAttrs) await ctx.route((u) => !/\.[a-z0-9]+$/i.test(new URL(u).pathname), async (route) => { const r = await route.fetch(); const body = (await r.text()).replace(/<html([^>]*)>/i, `<html$1${o.htmlAttrs}>`); await route.fulfill({ response: r, body }); });
  const page = await ctx.newPage();
  await page.goto(DEMO + route, { waitUntil: 'networkidle' });
  if (o.theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
  await sleep(o.settle ?? 1200);
  return { browser, ctx, page };
}
export function reporter(name) {
  const out = { probe: name, eng, load0: load(), rows: [] };
  fs.mkdirSync(CAP, { recursive: true });
  return {
    row(id, pass, reading) { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); },
    done() { out.load1 = load(); fs.writeFileSync(`${CAP}/${name}-${eng}.json`, JSON.stringify(out, null, 1)); const f = out.rows.filter((r) => !r.pass).length; console.log(`${out.rows.length} rows, ${f} FAIL, load ${out.load0} -> ${out.load1}`); process.exitCode = f ? 1 : 0; },
  };
}
export const steps = (xs) => xs.slice(1).map((x, i) => Math.abs(x - xs[i]));
export const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
```

## Appendix E · the Sheet and drag kit

`sheetlib.mjs` (R10-01's recorder and pointer driver, `audit/captures/R10-01/probes/lib.mjs`, pointed at the harness page):

```js
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
export const SBASE = process.env.SBASE || 'http://localhost:5964/sheet.html';
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const REC = `(() => { window.__rec = { frames: [], on: false }; const tick = () => { if (__rec.on) { const el = document.querySelector('[data-slot=sheet-content]'); if (el) { const r = el.getBoundingClientRect(); __rec.frames.push({ t: +performance.now().toFixed(1), top: +r.top.toFixed(2), dt: el.style.getPropertyValue('--detent-t'), drag: el.hasAttribute('data-dragging'), dv: window.__getdv?.() }); } else __rec.frames.push({ none: 1, dv: window.__getdv?.() }); } requestAnimationFrame(tick); }; requestAnimationFrame(tick); })();`;
export async function openS(eng, { w, h, touch, qs, bfcache }) {
  const bt = { chromium, webkit }[eng];
  const browser = eng === 'chromium' ? await bt.launch({ channel: 'chromium', headless: true, ignoreDefaultArgs: bfcache ? ['--disable-back-forward-cache', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'] : [] }) : await bt.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: !!touch });
  const page = await ctx.newPage(); await page.addInitScript(REC);
  await page.goto(`${SBASE}?inj=fixed&${qs}`); await page.waitForFunction(() => window.__ready);
  const cdp = eng === 'chromium' ? await ctx.newCDPSession(page) : null;
  await page.evaluate(() => window.__set(true)); await sleep(900);
  return { browser, ctx, page, cdp };
}
export const recOn = (p) => p.evaluate(() => { __rec.frames = []; __rec.on = true; });
export const recOff = (p) => p.evaluate(() => { __rec.on = false; return { frames: __rec.frames, state: window.__state() }; });
export const handle = (p) => p.evaluate(() => { const e = document.querySelector('[data-slot=sheet-detent-handle]'); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
export const tNow = (p) => p.evaluate(() => { const e = document.querySelector('[data-slot=sheet-content]'); return e ? { t: +(+e.style.getPropertyValue('--detent-t')).toFixed(3), drag: e.hasAttribute('data-dragging'), dv: __getdv(), open: __state().open } : { none: true, open: __state().open }; });
export function driver(kind, page, cdp) {
  if (kind === 'touch') return { down: (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] }), move: (x, y) => cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y, id: 1 }] }), up: () => cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }), cancel: () => cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] }) };
  return { down: async (x, y) => { await page.mouse.move(x, y); await page.mouse.down(); }, move: (x, y) => page.mouse.move(x, y), up: () => page.mouse.up(), cancel: null };
}
export async function path(d, x0, y0, x1, y1, n, dt) { for (let i = 1; i <= n; i++) { await d.move(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n); await sleep(dt); } }
```

Harness pages, built with R4-01's `harness/vite.config.mjs` (aliases `@glass` → the worktree `src`; `build.rollupOptions.input` adds `sheet.html` and `drag.html`). The dev server's HMR websocket blocks bfcache (`Page.backForwardCacheNotUsed`: `WebSocket`, `/@vite/client`), so the bfcache cells run on the static build. The demo's own routes are refused bfcache too (`IgnoreEventAndEvict`), which is why G8 uses the harness page.

- `sheet.html` + `sheet.ts`: mounts `Sheet.vue`, which is `audit/captures/R10-01/probes/P.vue.txt` with its `@mkbabb/glass-ui/*` imports rewritten to `@glass/components/*`; `?inj=fixed` injects `[data-slot="sheet-content"]{position:fixed !important}` (W-E.2's cure, so the Sheet is on screen).
- `drag.html` + `drag.ts` → `Drag.vue`:

```vue
<script setup>
import { ref } from "vue";
import { SortableList, SortableItem, SortableHandle } from "@glass/components/sortable-list";
import { SegmentedTabs } from "@glass/components/tabs";
const tasks = ref(["Draft spec", "Review pull", "Pair on dock", "Tune cartoon", "Write change"].map((label, i) => ({ id: "t" + i, label })));
const view = ref("grid");
const viewOptions = [{ label: "Grid", value: "grid" }, { label: "List", value: "list" }, { label: "Timeline", value: "timeline" }, { label: "Kanban", value: "kanban" }];
window.__ready = true;
</script>
<template>
  <main style="padding:24px;display:grid;gap:32px;max-width:560px">
    <div data-probe="tabs"><SegmentedTabs v-model="view" :options="viewOptions" aria-label="Draggable view mode" /><span data-probe="view">{{ view }}</span></div>
    <SortableList data-probe="list" :items="tasks" :get-id="(t) => t.id" :get-label="(t) => t.label" label="Tasks" @reorder="tasks = $event">
      <SortableItem v-for="t in tasks" :key="t.id" :id="t.id"><SortableHandle>::</SortableHandle><span>{{ t.label }}</span></SortableItem>
    </SortableList>
  </main>
</template>
```

- `away.mjs`: `http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html' }); r.end('<!doctype html><title>away</title><p>away</p>'); }).listen(5963, '127.0.0.1');` (a cross-site origin, so the navigation swaps the browsing instance and the page enters bfcache).
